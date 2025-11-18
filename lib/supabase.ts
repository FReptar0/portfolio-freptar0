import { createClient } from '@supabase/supabase-js';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Type definitions for our contact submissions table
export interface ContactSubmission {
  id: string;
  created_at: string;
  name: string;
  email: string;
  project: string;
  message: string;
  locale: string;
  ip_address?: string;
  user_agent?: string;
  turnstile_verified: boolean;
  email_sent: boolean;
  email_sent_at?: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  notes?: string;
}

// Type for inserting new contact submissions (omits auto-generated fields)
export interface ContactSubmissionInsert {
  name: string;
  email: string;
  project: string;
  message: string;
  locale: string;
  ip_address?: string;
  user_agent?: string;
  turnstile_verified: boolean;
  email_sent?: boolean;
  email_sent_at?: string;
  status?: 'new' | 'read' | 'replied' | 'archived';
  notes?: string;
}