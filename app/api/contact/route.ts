import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { Resend } from 'resend';
import { render } from '@react-email/components';
import { contactFormSchema, turnstileVerificationSchema } from '@/lib/validations/contact';
import ContactConfirmationEmail from '@/emails/contact-confirmation';

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendConfirmationEmail(data: {
  name: string;
  email: string;
  project: string;
  message: string;
}): Promise<void> {
  try {
    // Create a snippet of the message (first 100 characters + "...")
    const messageSnippet = data.message.length > 100 
      ? `${data.message.substring(0, 100)}...`
      : data.message;

    const emailHtml = await render(ContactConfirmationEmail({
      name: data.name,
      email: data.email,
      project: data.project,
      messageSnippet,
    }));

    await resend.emails.send({
      from: 'noreply@fmemije.com',
      to: data.email,
      subject: `Thanks for reaching out! - Fernando Rodriguez`,
      html: emailHtml,
    });

    console.log('Confirmation email sent successfully to:', data.email);
  } catch (error) {
    // Log the error but don't throw - we don't want email failures to break the form submission
    console.error('Failed to send confirmation email:', error);
  }
}

async function verifyTurnstileToken(token: string): Promise<boolean> {
  // Allow bypass in development when explicitly enabled via env var
  if (process.env.NODE_ENV === 'development' && process.env.TURNSTILE_BYPASS_DEV === 'true') {
    console.log('Turnstile verification bypass enabled (development).');
    return true;
  }

  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  const verifyUrl = process.env.TURNSTILE_VERIFY_URL;
  
  if (!secretKey) {
    console.error('TURNSTILE_SECRET_KEY is not configured');
    return false;
  }

  if (!verifyUrl) {
    console.error('TURNSTILE_VERIFY_URL is not configured');
    return false;
  }

  try {
    const response = await fetch(verifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    });

    if (!response.ok) {
      console.error('Turnstile API request failed:', response.status, response.statusText);
      return false;
    }

    const result: unknown = await response.json();
    
    // Validate the response structure using Zod
    const validatedResult = turnstileVerificationSchema.safeParse(result);
    
    if (!validatedResult.success) {
      console.error('Invalid Turnstile response structure:', validatedResult.error);
      return false;
    }

    return validatedResult.data.success === true;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();
    
    // Validate and parse the request body using Zod
    const validationResult = contactFormSchema.safeParse(body);
    
    if (!validationResult.success) {
      const errorDetails = validationResult.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: errorDetails 
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Verify Turnstile token
    const isValidToken = await verifyTurnstileToken(data['cf-turnstile-response']);
    
    if (!isValidToken) {
      return NextResponse.json(
        { error: 'Invalid CAPTCHA token' },
        { status: 400 }
      );
    }

    // Data is already validated and sanitized by Zod schema
    const sanitizedData = {
      name: data.name,
      email: data.email,
      project: data.project,
      message: data.message,
    };

    // Log the contact attempt
    console.log('New contact form submission:', {
      timestamp: new Date().toISOString(),
      ...sanitizedData,
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
    });

    // Send confirmation email to the user
    await sendConfirmationEmail(sanitizedData);

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    
    // Handle Zod validation errors
    if (error instanceof ZodError) {
      const errorDetails = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: errorDetails 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}