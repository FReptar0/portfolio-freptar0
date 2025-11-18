import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, 'validation.name.required')
    .min(2, 'validation.name.tooShort')
    .max(100, 'validation.name.tooLong')
    .regex(/^[a-zA-Z\s\u00C0-\u017F-']+$/, 'validation.name.invalidChars'),
  
  email: z
    .string()
    .min(1, 'validation.email.required')
    .email('validation.email.invalid')
    .max(100, 'validation.email.tooLong')
    .toLowerCase(),
  
  project: z
    .string()
    .min(1, 'validation.project.required')
    .max(100, 'validation.project.tooLong'),
  
  message: z
    .string()
    .min(1, 'validation.message.required')
    .min(10, 'validation.message.tooShort')
    .max(2000, 'validation.message.tooLong')
    .trim(),
  
  'cf-turnstile-response': z
    .string()
    .min(1, 'validation.captcha.required')
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