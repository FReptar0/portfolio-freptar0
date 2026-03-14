# Technology Stack

**Analysis Date:** 2026-03-14

## Languages

**Primary:**
- TypeScript 5 - All application code, configuration, and build setup
- TSX - React component files with TypeScript

**Secondary:**
- JavaScript - PostCSS and ESLint configuration files

## Runtime

**Environment:**
- Node.js (version specified via package.json engine compatibility)

**Package Manager:**
- npm 10+ (inferred from package-lock.json v3 format)
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- Next.js 16.0.8 - Full-stack React framework with SSR, API routes, App Router
- React 19.2.0 - UI component library
- React DOM 19.2.0 - DOM rendering for React

**Internationalization:**
- next-intl 4.4.0 - Multi-language support with 'es' (Spanish) as default, 'en' (English) as secondary
- Translation files: `locales/{en,es}/*.json`

**UI & Styling:**
- TailwindCSS 4 - Utility-first CSS framework via PostCSS
- @tailwindcss/postcss 4 - New TailwindCSS v4 integration
- class-variance-authority 0.7.1 - Component variant utility
- clsx 2.1.1 - Conditional className handling
- tailwind-merge 3.4.0 - Merge Tailwind class conflicts
- lucide-react 0.553.0 - Icon library with React components
- shadcn/ui components - UI component library (New York style, configured in `components.json`)

**Theming:**
- next-themes 0.4.6 - Dark/light mode provider with localStorage persistence

**Carousel:**
- embla-carousel-react 8.6.0 - Lightweight carousel component
- embla-carousel-autoplay 8.6.0 - Autoplay plugin for carousels

**Email:**
- @react-email/components 1.0.1 - React email component library
- @react-email/tailwind 2.0.1 - TailwindCSS support in emails
- react-email 5.0.4 - Email template rendering and preview
- resend 6.4.2 - Email delivery service SDK (primary email provider)

**Form & Validation:**
- zod 3.25.76 - TypeScript-first schema validation with error handling

**Analytics & Monitoring:**
- @vercel/analytics 1.5.0 - Web analytics integrated via `components/AnalyticsClient.tsx`
- @vercel/speed-insights 1.2.0 - Core Web Vitals monitoring via `components/SpeedInsightsClient.tsx`

**CAPTCHA:**
- @marsidev/react-turnstile 1.3.1 - Cloudflare Turnstile widget integration

## Key Dependencies

**Critical:**
- zod 3.25.76 - Schema validation for contact form with i18n error messages
- @supabase/supabase-js 2.81.1 - PostgreSQL database client for contact submissions

**Infrastructure:**
- next-intl 4.4.0 - i18n routing and message loading
- resend 6.4.2 - SMTP-based email delivery
- @marsidev/react-turnstile 1.3.1 - Bot protection via Cloudflare

## Configuration

**Environment:**
- Configuration via `.env.local` file (template: `.env.example`)
- Uses both `NEXT_PUBLIC_*` (client-side) and private (server-side) env vars
- Key env vars:
  - `RESEND_API_KEY` - Email service authentication
  - `NEXT_PUBLIC_SUPABASE_URL` - Database URL
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase public key
  - `TELEGRAM_BOT_TOKEN` - Telegram notifications
  - `TELEGRAM_CHAT_ID` - Telegram channel ID
  - `NEXT_PUBLIC_TURNSTILE_SITE_KEY` - CAPTCHA client key
  - `TURNSTILE_SECRET_KEY` - CAPTCHA server verification key
  - `TURNSTILE_BYPASS_DEV` - Development mode CAPTCHA bypass

**Build:**
- `next.config.ts` - Next.js configuration with next-intl plugin
- `tsconfig.json` - TypeScript compiler options (ES2017 target, strict mode)
- `postcss.config.mjs` - PostCSS with TailwindCSS v4 plugin
- `components.json` - shadcn/ui configuration (New York style, Tailwind CSS, Lucide icons)
- `i18n.ts` - i18n configuration with dynamic locale loading

**Linting & Formatting:**
- ESLint 9 - Code linting via `eslint.config.mjs`
- eslint-config-next 16.0.1 - Next.js recommended rules

## Platform Requirements

**Development:**
- Node.js runtime
- npm package manager
- TypeScript compilation
- PostCSS/TailwindCSS build pipeline

**Production:**
- Vercel (implied by Next.js patterns and Vercel Analytics/Speed Insights)
- Node.js 18+ (inferred from Next.js 16 requirements)
- Environment variables for Supabase, Resend, Telegram, Cloudflare Turnstile

---

*Stack analysis: 2026-03-14*
