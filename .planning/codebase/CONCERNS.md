# Codebase Concerns

**Analysis Date:** 2026-03-14

## Tech Debt

**Excessive Console Logging in Production**
- Issue: The contact API endpoint (`/app/api/contact/route.ts`) contains 20+ console.log and console.error statements. These statements expose sensitive submission data including names, emails, and full message content to server logs, which is a data exposure risk.
- Files: `app/api/contact/route.ts` (lines 44, 48, 51, 68, 71, 111, 114, 121, 129, 134, 151, 161, 167, 220, 224, 237, 259, 263, 272); `lib/telegram.ts` (lines 78, 111-114, 145-150); `components/sections/Contact.tsx` (lines 40-44, 207-208)
- Impact:
  - Unintended data exposure in production logs
  - Performance overhead from excessive logging
  - Difficulty debugging when logs are cluttered
  - Sensitive information (email, message content) visible to anyone with log access
- Fix approach:
  - Implement structured logging with appropriate severity levels
  - Remove/minimize console.log statements in production code
  - Log only non-sensitive metadata (submission ID, timestamps, error types)
  - Use environment-based log filtering to disable verbose logging in production

**Missing Sitemap Configuration**
- Issue: The robots.txt file contains a TODO comment about adding a sitemap URL (line 4 in `public/robots.txt`)
- Files: `public/robots.txt`
- Impact: Search engine crawlers lack proper sitemap guidance, reducing discoverability and SEO effectiveness
- Fix approach:
  - Generate a sitemap.xml file using Next.js
  - Reference it in robots.txt (`Sitemap: https://fernandomemije.dev/sitemap.xml`)
  - Ensure all important routes are indexed

**Hardcoded LinkedIn and GitHub URLs**
- Issue: URLs are hardcoded in multiple components instead of being extracted to a configuration file or constants
- Files:
  - `components/sections/Contact.tsx` (lines 311, 330)
  - `components/ui/SearchBar.tsx` (lines 26-28)
- Impact: Makes it harder to maintain and test; URL changes require code modifications in multiple places
- Fix approach:
  - Create a `lib/config/social-links.ts` configuration file with all social media URLs
  - Import and use these constants throughout the codebase
  - Makes updates centralized and reduces duplication

**Incomplete Contact Form Modal Features**
- Issue: The SearchBar contains placeholder contact links with generic URLs (not real endpoints)
- Files: `components/ui/SearchBar.tsx` (lines 25-29)
- Impact: Calendar and some contact shortcuts don't lead to functional endpoints
- Fix approach:
  - Implement calendar booking integration (Calendly, Cal.com, or similar)
  - Replace placeholder href="#contact" with actual calendar link
  - Update LinkedIn/GitHub links to actual profile URLs

## Known Bugs

**Turnstile Bypass in Development Creates Security Gap**
- Symptoms: The Contact form bypasses CAPTCHA verification in development, allowing unverified submissions to be stored
- Files:
  - `components/sections/Contact.tsx` (lines 30, 146, 194)
  - `app/api/contact/route.ts` (lines 120-122)
  - `lib/validations/contact.ts` (line 32)
- Trigger: When `NEXT_PUBLIC_TURNSTILE_BYPASS_DEV=true` or when `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is not set
- Current behavior:
  - Frontend sends a placeholder token `'bypass-dev'` when bypassing
  - Server-side verification allows development bypass via `TURNSTILE_BYPASS_DEV` env var
  - No distinction in database between verified and unverified submissions in development
- Workaround:
  - Always configure Turnstile properly in development
  - Set proper env vars: `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `TURNSTILE_VERIFY_URL`
- Recommendation: Implement a better development testing approach that doesn't bypass security controls entirely

**Potential Unhandled Null Returns in Contact Submission**
- Symptoms: Contact form might continue processing even if database save fails silently
- Files: `app/api/contact/route.ts` (lines 45, 52, 216-221)
- Trigger: When Supabase connection fails or returns null
- Current behavior:
  - `saveContactSubmission()` returns `null` on error but doesn't throw
  - Code continues to send emails even when database save failed (line 234)
  - Submission ID may be undefined when updating email status (line 241)
- Workaround: None - form submission appears successful even if data wasn't saved
- Risk: Contact information lost without user awareness

**Hardcoded Email Address Across Components**
- Symptoms: Email address `hi@fernandomemije.dev` appears in multiple places
- Files:
  - `components/sections/Contact.tsx` (line 301)
  - `components/ui/SearchBar.tsx` (line 28)
- Trigger: If email changes, multiple files need updating
- Current behavior: Manual updates required across codebase
- Impact: Easy to miss updates and have inconsistent email addresses
- Fix approach: Extract to `lib/config/contact.ts` with a single source of truth

## Security Considerations

**Development Environment Secrets in Source Code**
- Risk: `.env.local` file exists but sensitive configuration may be tracked or shared insecurely
- Files: `.env.local` (not read per policy, but existence noted)
- Current mitigation: `.gitignore` should prevent commits
- Recommendations:
  - Ensure `.env.local` is in `.gitignore`
  - Use `.env.example` for documenting required variables without secrets
  - Never commit actual API keys, tokens, or secrets

**Turnstile Token Validation Can Be Bypassed in Development**
- Risk: Unverified submissions can reach the database and be sent as confirmation emails
- Files: `app/api/contact/route.ts` (lines 118-170)
- Current mitigation: Environment variable check `TURNSTILE_BYPASS_DEV`
- Impact: Spam/abuse possible in development; frontend validation is insufficient alone
- Recommendations:
  - Remove bypass in production (verify `NODE_ENV !== 'production'` strictly)
  - Implement rate limiting on `/api/contact` endpoint
  - Add server-side IP-based rate limiting to prevent spam
  - Store and monitor failed Turnstile verifications

**Contact Submission Data Exposure in Logs**
- Risk: Full contact details (name, email, message) logged to console without filtering
- Files: `app/api/contact/route.ts` (line 224-229)
- Current mitigation: None - logs may expose PII
- Impact: GDPR/privacy compliance risk
- Recommendations:
  - Never log PII (full names, complete email addresses, or message content)
  - Log only submission ID and timestamp
  - Implement structured logging with log levels and production filtering

## Performance Bottlenecks

**Large Contact Component (680 lines)**
- Problem: `Contact.tsx` is the largest single component in the codebase, making it difficult to maintain and test
- Files: `components/sections/Contact.tsx`
- Cause: Component handles form rendering, validation, state management, and error handling all in one file
- Current performance: No reported issues, but code complexity is high
- Improvement path:
  - Extract form fields into smaller components (`NameField`, `EmailField`, `ProjectField`, `MessageField`)
  - Extract validation logic into custom hooks (`useFormValidation`, `useTurnstileToken`)
  - Extract toast/notification into separate component (`FormToast`)
  - Reduces bundle size and improves maintainability

**Multiple Language File Imports in i18n.ts**
- Problem: 13 separate dynamic imports in a Promise.all pattern (lines 20-48 in `i18n.ts`)
- Cause: Each locale requires individual imports for 13 different JSON files
- Impact: Slow i18n initialization with 26+ parallel fetch operations (2 locales × 13 files)
- Improvement path:
  - Consider bundling related translations together
  - Implement lazy loading for less-critical translations
  - Cache compiled translation files

**Repeated State Validation in Contact Form**
- Problem: Contact form validates same fields multiple times (focus, blur, change, and on submit)
- Files: `components/sections/Contact.tsx` (lines 73-104)
- Impact: Unnecessary validation cycles and re-renders
- Improvement path: Consolidate validation logic to specific trigger points (blur and submit only)

## Fragile Areas

**Form Submission Error Recovery**
- Files: `components/sections/Contact.tsx` (lines 136-268)
- Why fragile:
  - Multiple async operations (Turnstile validation, email sending, Telegram notification) without proper transaction semantics
  - Form state reset happens after email success, but email failure doesn't prevent state reset
  - If Turnstile token expires during form fill, user sees disabled button without clear explanation
  - Network errors during submission leave form in inconsistent state
- Safe modification approach:
  - Add comprehensive error logging at each stage
  - Implement error recovery strategy (retry mechanism)
  - Use Promise.all with explicit error handling instead of independent try-catch blocks
  - Add test coverage for error scenarios
- Test coverage gaps: No test files exist for Contact component

**Supabase Client Initialization**
- Files: `lib/supabase.ts` (lines 3-19)
- Why fragile:
  - `createSupabaseClient()` throws errors synchronously if env vars missing
  - Called at route handler runtime without graceful degradation
  - No fallback mechanism if Supabase is unavailable
  - Database errors silently fail in `saveContactSubmission()` (returns null instead of throwing)
- Safe modification approach:
  - Implement graceful error handling with user feedback
  - Add retry logic for transient failures
  - Log database errors with context
  - Add health check endpoint for monitoring

**Translation Key Dependencies**
- Files: `i18n.ts`, all locale JSON files in `locales/`
- Why fragile:
  - No type safety for translation keys
  - Typos in translation keys cause silent fallbacks
  - Adding new translations requires changes across 2+ files
  - String keys like `'validation.email.invalid'` are not validated at compile time
- Safe modification approach:
  - Use type-safe translation keys with TypeScript
  - Implement translation key validation
  - Consider using i18next validation tooling
  - Test that all keys exist in both locales before deployment

**Hardcoded Navigation Links in SearchBar**
- Files: `components/ui/SearchBar.tsx` (lines 16-29)
- Why fragile:
  - Keyboard shortcuts hardcoded without validation
  - Contact URLs are generic placeholders
  - Adding new sections requires changes in multiple places
- Safe modification approach:
  - Extract navigation configuration to `lib/config/navigation.ts`
  - Validate all section IDs match actual page sections
  - Add TypeScript types for navigation items

## Scaling Limits

**Form Submission Rate and Abuse Prevention**
- Current capacity: No rate limiting implemented
- Limit: Can receive unlimited submissions from same IP/user
- Scaling path:
  - Implement rate limiting (e.g., 5 requests per hour per IP)
  - Use Upstash Redis or similar for distributed rate limiting
  - Add CAPTCHA to prevent automated abuse
  - Monitor submission patterns for spam

**Translation File Growth**
- Current capacity: 13 files × 2 locales = 26 files
- Limit: Adding more languages requires exponential growth in JSON files
- Scaling path:
  - Consider switching to translation management system (Crowdin, Lokalise)
  - Implement automatic translation with AI for new locales
  - Lazy load locales not currently in use

**Email Service Capacity**
- Current: Using Resend for email delivery
- Limit: Subject to Resend's rate limits and quota
- Scaling path:
  - Monitor email sending failures
  - Implement queue system for bulk emails (Bull, RabbitMQ)
  - Consider multi-provider email setup for redundancy

## Dependencies at Risk

**Next.js Major Version (16.0.8)**
- Risk: Next.js is on a major version that may have breaking changes in minor updates
- Impact: React 19 is pre-release, unexpected compatibility issues possible
- Migration plan:
  - Monitor Next.js release notes closely
  - Test updates in staging before production
  - Pin exact versions in package.json rather than using caret (^)

**React 19.2.0 (New Release)**
- Risk: React 19 is relatively new; ecosystem support may lag
- Impact: Library compatibility issues possible; limited community solutions
- Migration plan:
  - Keep dependencies updated
  - Monitor for React 19 specific issues in libraries
  - Have rollback plan to React 18 if critical issues arise

**next-intl Translation Library**
- Risk: Custom translation system with tight coupling to i18n.ts
- Impact: Changing translation approach requires refactor
- Migration plan:
  - Consider standardizing on industry solution if scaling translation needs
  - Document translation system thoroughly

## Missing Critical Features

**No Email Template Verification**
- Problem: Email templates hardcoded in components without visual testing
- Files: `emails/contact-confirmation-en.tsx`, `emails/contact-confirmation-es.tsx`
- Blocks: Unable to verify email rendering across clients without sending
- Recommendation: Implement email preview/testing system

**No Database Backup Strategy**
- Problem: Contact submissions stored in Supabase with no documented backup approach
- Files: `lib/supabase.ts`, `app/api/contact/route.ts`
- Blocks: Risk of data loss if Supabase experiences outage
- Recommendation: Implement automated backup strategy; document disaster recovery

**No Analytics for Form Abandonment**
- Problem: Form has no tracking of where users drop off
- Files: `components/sections/Contact.tsx`
- Blocks: Cannot identify UX pain points
- Recommendation: Integrate form analytics (Hotjar, Mixpanel)

**No Admin Dashboard for Submissions**
- Problem: Contact submissions stored but no interface to manage them
- Files: `lib/supabase.ts`, database schema
- Blocks: Cannot mark as read, reply status, or archive submissions
- Recommendation: Build admin dashboard for submission management

## Test Coverage Gaps

**No Tests for Contact API Route**
- What's not tested:
  - Form submission happy path
  - Validation error handling
  - Turnstile verification flow
  - Email sending on success
  - Telegram notification sending
  - Database error scenarios
  - Concurrent submission handling
- Files: `app/api/contact/route.ts` (294 lines, 0% coverage)
- Risk: High - critical path for user engagement
- Priority: **High**

**No Tests for Contact Form Component**
- What's not tested:
  - Field validation in real-time
  - Form state transitions
  - Error message display
  - Toast notifications
  - Keyboard navigation
  - Accessibility features
- Files: `components/sections/Contact.tsx` (680 lines, 0% coverage)
- Risk: High - most complex component
- Priority: **High**

**No Tests for Utility Functions**
- What's not tested:
  - Telegram message formatting
  - Email template rendering
  - Translation key resolution
- Files: `lib/telegram.ts`, `emails/`, `i18n.ts`
- Risk: Medium - can break silently
- Priority: **Medium**

**No E2E Tests for Form Submission Flow**
- What's not tested:
  - Complete user journey from form fill to confirmation
  - Multi-step validation
  - Browser compatibility
  - Mobile responsiveness
- Risk: Medium - integration issues with external services
- Priority: **Medium**

---

*Concerns audit: 2026-03-14*
