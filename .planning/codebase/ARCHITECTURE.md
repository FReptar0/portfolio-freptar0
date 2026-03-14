# Architecture

**Analysis Date:** 2026-03-14

## Pattern Overview

**Overall:** Next.js 16 Server/Client Components with Internationalization (i18n) and Jamstack-style static generation.

**Key Characteristics:**
- Static site generation with dynamic locale routing
- Hybrid server components (async/SSR) + client components (interactive features)
- Content-driven from JSON localization files, no database reads for public content
- API route for form submissions with multi-service integration (Supabase, Resend, Telegram)
- Dark/light theme support with client-side preference persistence

## Layers

**Presentation Layer (Components):**
- Purpose: Render UI sections and handle client interactions
- Location: `components/` (sections, ui, diagrams, case-study)
- Contains: React components (client and server), typography, interactive widgets
- Depends on: `lib/` utilities, `next-intl` for translations, Tailwind CSS
- Used by: Page routes in `app/[locale]/`

**Page/Route Layer:**
- Purpose: Define pages, metadata, and route parameters; compose components
- Location: `app/[locale]/page.tsx`, `app/[locale]/projects/[slug]/page.tsx`, `app/api/contact/route.ts`
- Contains: Server components for metadata, static params, content composition
- Depends on: Components, i18n config, Zod schemas
- Used by: Next.js router

**Internationalization Layer:**
- Purpose: Manage locales, load translation namespaces, provide translations to components
- Location: `i18n.ts`
- Contains: Locale configuration, dynamic JSON imports for each locale, namespace structure
- Depends on: `next-intl/server` for server-side translation access
- Used by: Layout components, all content-serving pages

**Business Logic & Validation Layer:**
- Purpose: Form validation, data transformation, external service integration
- Location: `lib/` (validations, supabase, telegram)
- Contains: Zod schemas, Supabase client setup, Telegram API integration, utility functions
- Depends on: External SDKs (@supabase/supabase-js, resend, zod)
- Used by: API routes, client components

**Email Template Layer:**
- Purpose: Generate HTML emails for contact confirmations
- Location: `emails/`
- Contains: React Email components (locale-specific)
- Depends on: `@react-email/components`, `@react-email/tailwind`
- Used by: Contact API route (via Resend)

**Data Access Layer:**
- Purpose: Supabase client initialization and type definitions
- Location: `lib/supabase.ts`
- Contains: Supabase client factory, TypeScript interfaces for contact_submissions table
- Depends on: `@supabase/supabase-js`
- Used by: Contact API route

## Data Flow

**Home Page Load:**
1. User navigates to `/{locale}/` → Next.js matches dynamic `[locale]` segment
2. `app/[locale]/layout.tsx` (server): Loads all translation namespaces via `i18n.ts`, wraps with `NextIntlClientProvider`
3. `app/[locale]/page.tsx` (server): Composes hero, timeline, projects, contact sections
4. Components render with translations via `useTranslations()` hook
5. Client components initialize theme, analytics, interactive features

**Contact Form Submission:**
1. User fills form in `Contact.tsx` (client component)
2. Real-time validation via Zod schema in `lib/validations/contact.ts`
3. Turnstile CAPTCHA verification on frontend
4. POST to `/api/contact/route.ts` with form data + token
5. API validates request, verifies Turnstile token with external service
6. Saves to Supabase `contact_submissions` table
7. Sends confirmation email via Resend (uses `ContactConfirmationEmailEn` or `ContactConfirmationEmailEs`)
8. Sends Telegram notification if configured
9. Returns 200 success or 400/500 error

**Case Study Page Load:**
1. User navigates to `/{locale}/projects/{slug}`
2. `app/[locale]/projects/[slug]/page.tsx` (server): Validates slug against `VALID_SLUGS`
3. Loads metadata and metrics from i18n via `getTranslations()`
4. Generates static params for all locales × valid slugs (pre-rendered at build)
5. Composes case study components (CaseStudyHero, TechStackBar, MetricsGrid, CaseStudyNarrative, CaseStudyCTA)
6. Components read locale-specific content from i18n

**State Management:**
- Global: Theme state (localStorage, managed by `next-themes`)
- Global: Locale state (URL segment, managed by `next-intl`)
- Component-local: Form validation state, UI toggles, navigation menu state (useState in client components)
- No centralized state container (Redux, Zustand, etc.)

## Key Abstractions

**Translation System:**
- Purpose: Provide multi-language support with modular namespace structure
- Examples: `locales/en/hero.json`, `locales/es/projects.json`
- Pattern: Dynamic imports per locale in `i18n.ts`, server-side `getTranslations()` or client-side `useTranslations()` hook
- Benefit: Content separated from components, easy to update copy without code changes

**Validation Schema (Zod):**
- Purpose: Single source of truth for form validation rules, used on both client and server
- Examples: `lib/validations/contact.ts` with `contactFormSchema` and `frontendContactFormSchema`
- Pattern: Shared schema with conditional fields (frontend schema omits CAPTCHA token)
- Benefit: Prevents validation mismatch between frontend and API

**Supabase Integration:**
- Purpose: Persist contact submissions and user interaction data
- Examples: `lib/supabase.ts` with client factory and TypeScript interfaces
- Pattern: Lazy initialization via `getSupabase()` to avoid errors during build time
- Benefit: Type-safe database operations with generated types from schema

**Telegram Notification:**
- Purpose: Real-time alerts for contact form submissions
- Examples: `lib/telegram.ts` with `formatTelegramMessage()` and `sendTelegramNotification()`
- Pattern: Graceful degradation if bot token/chat ID missing, doesn't break form submission
- Benefit: Immediate notification without polling database

**Project Data Structure:**
- Purpose: Type-safe representation of project portfolio items
- Examples: `Interface Project` in `components/sections/Projects.tsx` with nested objects for contribution, solution, impact
- Pattern: Data pulled from i18n, mapped to typed interface, rendered via components
- Benefit: Consistent shape across locale versions, type safety in templates

## Entry Points

**HTML Root:**
- Location: `app/layout.tsx`
- Triggers: Every page request
- Responsibilities: Load fonts, apply global CSS, initialize theme script, set up theme/analytics providers, structure HTML hierarchy

**Home/Portfolio Page:**
- Location: `app/[locale]/page.tsx`
- Triggers: Navigation to `/{locale}/`
- Responsibilities: Generate static params for all locales, compose sections, apply metadata

**Case Study Page:**
- Location: `app/[locale]/projects/[slug]/page.tsx`
- Triggers: Navigation to `/{locale}/projects/{slug}`
- Responsibilities: Validate slug, generate static/dynamic metadata, compose case study sections

**Contact API:**
- Location: `app/api/contact/route.ts`
- Triggers: POST request from contact form
- Responsibilities: Validate request, verify CAPTCHA, persist data, send emails, send notifications, error handling

**Navigation/Theme:**
- Location: `components/ui/Navigation.tsx`, `components/theme-provider.tsx`
- Triggers: App initialization, scroll events, theme toggle clicks
- Responsibilities: Render navigation UI, toggle theme/locale, smooth scroll to sections, keyboard shortcuts

## Error Handling

**Strategy:** Graceful degradation with logging; non-critical failures don't block user operations.

**Patterns:**
- **Form Submission Errors:** Validation errors shown in UI; database/email/Telegram failures logged but form marked as success (submission priority over notifications)
- **API Errors:** Zod validation errors returned as 400 with details; unexpected errors as 500; all logged to console
- **Missing Env Vars:** Services skip gracefully (Telegram notification skipped if token missing); client-side features work without env-specific features
- **Invalid Slug:** Case study page returns 404 via `notFound()` if slug not in `VALID_SLUGS`
- **Translation Fallback:** If namespace not found, default locale (Spanish) applied per `i18n.ts`

## Cross-Cutting Concerns

**Logging:** Console logging at key points (form submission, email send, Telegram send, validation errors); no centralized logging service.

**Validation:** Zod schemas applied at API boundary (`contactFormSchema`) and client-side real-time validation (`frontendContactFormSchema`); frontend and backend schemas differ only in CAPTCHA field.

**Authentication:** No user authentication system; contact form uses CAPTCHA (Turnstile) for bot prevention; Supabase uses anon key (public); Telegram and Resend use env-var secrets.

**Styling:** Tailwind CSS with custom CSS variables for theme colors (--primary-600, --accent-500, etc.); glass-morphism class applied throughout; responsive breakpoints (md, sm) for mobile-first design.

**Accessibility:** Semantic HTML (nav, main, section); ARIA labels on interactive elements (buttons, toggles); skip links via keyboard navigation; alt text on icons from lucide-react library.

---

*Architecture analysis: 2026-03-14*
