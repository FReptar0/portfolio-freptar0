import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { contactFormSchema, turnstileVerificationSchema } from '@/lib/validations/contact';

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

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Send to external service (like Resend, SendGrid, etc.)
    
    // For now, we'll just log the contact attempt
    console.log('New contact form submission:', {
      timestamp: new Date().toISOString(),
      ...sanitizedData,
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
    });

    // TODO: Implement actual email sending or database storage
    // Example with a service like Resend:
    /*
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'hi@fernandomemije.dev',
      subject: `New contact from ${sanitizedData.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${sanitizedData.name}</p>
        <p><strong>Email:</strong> ${sanitizedData.email}</p>
        <p><strong>Project Type:</strong> ${sanitizedData.project}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedData.message.replace(/\n/g, '<br>')}</p>
      `,
    });
    */

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