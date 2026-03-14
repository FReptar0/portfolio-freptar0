# External Integrations

**Analysis Date:** 2026-03-14

## APIs & External Services

**Email Delivery:**
- Resend - Transactional email service
  - SDK/Client: `resend` 6.4.2
  - Auth: `RESEND_API_KEY` env var
  - Implementation: `lib/supabase.ts` creates client in route handler
  - Usage: Sends localized confirmation emails via `app/api/contact/route.ts` using `sendConfirmationEmail()` function
  - Email templates: `emails/contact-confirmation-en.tsx`, `emails/contact-confirmation-es.tsx`
  - From email: `CONTACT_FROM_EMAIL` env var (default: noreply@fernandomemije.dev)

**Bot Protection & CAPTCHA:**
- Cloudflare Turnstile - CAPTCHA service
  - Client SDK: `@marsidev/react-turnstile` 1.3.1
  - Auth: `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (client), `TURNSTILE_SECRET_KEY` (server)
  - Verify endpoint: `https://challenges.cloudflare.com/turnstile/v0/siteverify`
  - Implementation: `app/api/contact/route.ts` verifies token via `verifyTurnstileToken()` function
  - Development bypass: `TURNSTILE_BYPASS_DEV=true` env var skips verification in dev mode

**Notifications:**
- Telegram Bot API - Message notifications
  - SDK/Client: Native fetch API (no SDK)
  - Auth: `TELEGRAM_BOT_TOKEN` env var
  - Chat: `TELEGRAM_CHAT_ID` env var
  - Implementation: `lib/telegram.ts` with `sendTelegramNotification()` function
  - Usage: Notifies admin of new contact form submissions with formatted message
  - Message format: Markdown with emoji, includes sender details, submission ID, IP
  - Endpoint: `https://api.telegram.org/bot{TOKEN}/sendMessage`
  - Optional: Can test bot config via `testTelegramBot()` function

## Data Storage

**Databases:**
- Supabase (PostgreSQL)
  - Connection: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` env vars
  - Client: `@supabase/supabase-js` 2.81.1
  - Location: `lib/supabase.ts`
  - Tables: `contact_submissions` table for storing contact form data
  - Schema: Defined as TypeScript interfaces in `lib/supabase.ts`:
    - `id` (uuid, primary key)
    - `created_at` (timestamp)
    - `name`, `email`, `project`, `message`, `locale` (text fields)
    - `ip_address`, `user_agent` (optional tracking)
    - `turnstile_verified` (boolean)
    - `email_sent`, `email_sent_at` (email delivery tracking)
    - `status` (enum: new | read | replied | archived)
    - `notes` (optional admin notes)
  - Operations: Insert on form submission, update email_sent status after sending

**File Storage:**
- Not detected - Static assets served from `public/` directory

**Caching:**
- None detected - Relies on Next.js built-in caching

## Authentication & Identity

**Auth Provider:**
- Custom implementation via Turnstile verification
- No user authentication system detected
- Bot protection via Cloudflare Turnstile token verification
- Implementation: `verifyTurnstileToken()` in `app/api/contact/route.ts`

## Monitoring & Observability

**Error Tracking:**
- Not detected - Errors logged to console only

**Logs:**
- Console logging via `console.log()` and `console.error()`
- Captured during development; depends on hosting platform (Vercel) for production logs
- Key log points:
  - Contact form validation errors
  - Supabase insert/update operations
  - Email send attempts
  - Telegram notification sends
  - Turnstile verification results

**Analytics & Performance:**
- Vercel Web Analytics - Visitor analytics and engagement
  - SDK: `@vercel/analytics` 1.5.0
  - Implementation: Client-side component `components/AnalyticsClient.tsx` loaded dynamically
  - Tracks: Page views, user interactions, referrers

- Vercel Speed Insights - Core Web Vitals monitoring
  - SDK: `@vercel/speed-insights` 1.2.0
  - Implementation: Client-side component `components/SpeedInsightsClient.tsx` loaded dynamically
  - Tracks: Largest Contentful Paint (LCP), First Input Delay (FID), Cumulative Layout Shift (CLS)

## CI/CD & Deployment

**Hosting:**
- Vercel (inferred from next-intl plugin pattern, Vercel Analytics/Speed Insights, next.config.ts)
- Automatic deployments from git
- Serverless functions for API routes

**CI Pipeline:**
- Not detected - Likely using Vercel's built-in CI/CD

## Environment Configuration

**Required env vars:**

Server-side (private):
- `RESEND_API_KEY` - Resend email service API key
- `TURNSTILE_SECRET_KEY` - Cloudflare Turnstile secret for verification
- `TELEGRAM_BOT_TOKEN` - Telegram bot token for notifications
- `TELEGRAM_CHAT_ID` - Telegram chat/channel ID for notifications

Client-side (NEXT_PUBLIC_*):
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` - Cloudflare Turnstile site key
- `NEXT_PUBLIC_TURNSTILE_BYPASS_DEV` - Development CAPTCHA bypass flag

Optional:
- `CONTACT_FROM_EMAIL` - Email sender address (defaults to noreply@fernandomemije.dev)
- `TURNSTILE_BYPASS_DEV` - Server-side development CAPTCHA bypass
- `TURNSTILE_VERIFY_URL` - Custom Turnstile verification endpoint

**Secrets location:**
- `.env.local` file (gitignored)
- Template provided in `.env.example`

## Webhooks & Callbacks

**Incoming:**
- POST `/api/contact` - Contact form submission endpoint
  - Accepts: name, email, project, message, cf-turnstile-response, locale
  - Validation: Zod schema with i18n error messages
  - Responses: 200 (success), 400 (validation/CAPTCHA), 500 (server error)

**Outgoing:**
- Email callbacks: None (fire-and-forget)
- Telegram notifications: One-way notifications to admin channel
- Verification: Cloudflare Turnstile siteverify endpoint

---

*Integration audit: 2026-03-14*
