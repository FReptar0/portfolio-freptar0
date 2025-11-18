import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s\u00C0-\u017F-']+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters')
    .toLowerCase(),
  
  project: z
    .string()
    .min(1, 'Project type is required')
    .max(100, 'Project type must be less than 100 characters'),
  
  message: z
    .string()
    .min(1, 'Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters')
    .trim(),
  
  'cf-turnstile-response': z
    .string()
    .min(1, 'CAPTCHA verification is required')
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Frontend validation schema (without Turnstile token for real-time validation)
export const frontendContactFormSchema = contactFormSchema.omit({ 'cf-turnstile-response': true });
export type FrontendContactFormData = z.infer<typeof frontendContactFormSchema>;

// Turnstile verification response schema
export const turnstileVerificationSchema = z.object({
  success: z.boolean(),
  'error-codes': z.array(z.string()).optional(),
  'challenge_ts': z.string().optional(),
  hostname: z.string().optional(),
  action: z.string().optional(),
  cdata: z.string().optional()
});

export type TurnstileVerificationResponse = z.infer<typeof turnstileVerificationSchema>;