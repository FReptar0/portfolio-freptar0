# Testing Patterns

**Analysis Date:** 2026-03-14

## Test Framework

**Status:** No automated testing framework configured

**Current State:**
- No test runner installed (Jest, Vitest, etc. not in devDependencies)
- No test configuration files present (jest.config.*, vitest.config.*, etc.)
- No `.test.*` or `.spec.*` files in application code (only in node_modules/zod dependencies)
- Only ESLint for static code analysis
- Manual testing via Next.js dev server (`npm run dev`)

**Package Manager:**
- npm with package-lock.json for dependency management

**Run Commands:**
```bash
npm run dev        # Start development server for manual testing
npm run build      # Production build (verifies compilation)
npm run lint       # Static code analysis with ESLint
npm start          # Start production server
```

## Testing Infrastructure Gaps

**Critical Missing Components:**

1. **Test Runner:** Not installed
   - Recommendation: Add Vitest or Jest for unit/integration testing
   - Next.js projects commonly use Vitest for faster development

2. **Assertion Library:** Not installed
   - Recommendation: Vitest includes assertions via Chai; or use Jest's built-in matchers

3. **Mocking Library:** Not installed
   - Recommendation: Vitest includes mocking; or add `jest.mock()` if using Jest
   - Critical for: API routes, external services (Supabase, Resend, Telegram)

4. **E2E Testing:** Not configured
   - Recommendation: Playwright or Cypress for end-to-end tests
   - Critical for: Contact form submission flow, multi-locale navigation

5. **Test Data Factories:** Not implemented
   - Currently: No fixture or factory files

## Code Patterns Suitable for Testing

**Testable Components:**

**Validation Layer (High Priority):**
Location: `lib/validations/contact.ts`
- Zod schemas are independently testable
- Should test: Valid/invalid email formats, name constraints, message length limits, locale validation
- Example schema patterns:
```typescript
email: z.string().min(1).email().max(100).toLowerCase()
name: z.string().min(2).max(100).regex(/^[a-zA-Z\s\u00C0-\u017F-']+$/)
message: z.string().min(10).max(2000).trim()
```

**API Route (High Priority):**
Location: `app/api/contact/route.ts`
- POST handler with multiple testable functions:
  - `verifyTurnstileToken()` - External CAPTCHA verification
  - `saveContactSubmission()` - Database operation
  - `sendConfirmationEmail()` - External email service
  - `sendTelegramNotification()` - External notification service
  - Main POST handler - Request validation and orchestration

**Integration Points to Mock:**

```typescript
// Supabase operations (lib/supabase.ts)
supabase.from('contact_submissions').insert([submission]).select('id').single()

// Resend email service (app/api/contact/route.ts)
resend.emails.send({ from, to, subject, html })

// Telegram API (lib/telegram.ts)
fetch('https://api.telegram.org/bot{token}/sendMessage', { ... })

// Turnstile CAPTCHA (app/api/contact/route.ts)
fetch(process.env.TURNSTILE_VERIFY_URL, { ... })
```

**Utility Functions (Medium Priority):**
Location: `lib/utils.ts`
- `cn()` - CSS class merging with Tailwind support
- Easy to test with pure function inputs/outputs

Location: `lib/telegram.ts`
- `formatTelegramMessage()` - Pure function formatting submission data
- `testTelegramBot()` - Configuration verification

**Frontend Components (Medium Priority):**
Location: `components/sections/Contact.tsx`
- Form state management: `formStatus`, `validationErrors`, `fieldStates`
- Real-time validation with debouncing
- Complex event handling (focus, blur, character count tracking)
- Turnstile token integration and reset

Location: `components/sections/Hero.tsx`
- Visibility animation with `useEffect` and state
- Simple enough to test animation trigger

## What Should NOT Be Tested

- **Third-party library internals:** Lucide React icons, Radix UI Slot, CVA, next-intl translation resolution
- **CSS/Tailwind styling:** Class application is verified by visual regression testing, not unit tests
- **Next.js framework behavior:** Routing, dynamic segments, layout nesting
- **External service implementations:** Supabase SDK, Resend SDK (mock these instead)

## Testing Strategy Recommendations

**Phase 1 - Immediate (Critical Paths):**
1. Unit tests for validation schemas (Zod safeParse)
2. API route tests with mocked external services
3. Contact form submission flow tests (frontend + API integration)

**Phase 2 - Short-term (Component Testing):**
1. Component state management tests (form state, visibility animations)
2. Real-time validation UI tests
3. Character count and field state displays

**Phase 3 - Long-term (E2E):**
1. Multi-locale contact form submission
2. Navigation and routing between locales
3. Entire project showcase flow (hero → projects → contact)

## Suggested Test Structure

**File Organization:**

```
app/
├── api/
│   └── contact/
│       ├── route.ts
│       └── route.test.ts          # NEW: API route tests
└── [locale]/
    ├── layout.tsx
    └── layout.test.tsx             # NEW: Layout tests

lib/
├── validations/
│   ├── contact.ts
│   └── contact.test.ts             # NEW: Schema validation tests
├── supabase.ts
├── supabase.test.ts                # NEW: Client initialization tests
├── telegram.ts
├── telegram.test.ts                # NEW: Telegram formatting & API tests
└── utils.ts
    └── utils.test.ts               # NEW: cn() utility tests

components/
├── sections/
│   ├── Contact.tsx
│   └── Contact.test.tsx            # NEW: Form state & validation tests
└── ui/
    ├── button.tsx
    └── button.test.tsx             # NEW: Button variant tests
```

## Mocking Patterns Needed

**External Service Mocking:**

```typescript
// Mock Supabase client
vi.mock('@/lib/supabase', () => ({
  getSupabase: vi.fn(() => ({
    from: vi.fn().mockReturnValue({
      insert: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({
            data: { id: 'test-123' },
            error: null
          })
        })
      })
    })
  }))
}))

// Mock fetch for external APIs (Turnstile, Telegram)
global.fetch = vi.fn((url) => {
  if (url.includes('api.cloudflare.com')) {
    return Promise.resolve(new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    ))
  }
  // ... other endpoints
})

// Mock Resend email client
vi.mock('resend', () => ({
  Resend: vi.fn(() => ({
    emails: {
      send: vi.fn().mockResolvedValue({ id: 'email-123' })
    }
  }))
}))
```

**Form Testing Pattern (Frontend):**

```typescript
// Mock next-intl for component tests
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en'
}))

// Test form validation with user interaction
test('shows validation error on invalid email', () => {
  render(<Contact />)
  const emailInput = screen.getByPlaceholderText('email-placeholder')
  fireEvent.change(emailInput, { target: { value: 'invalid' } })
  fireEvent.blur(emailInput)

  expect(screen.getByText(/validation\.email\.invalid/)).toBeInTheDocument()
})
```

## Current Manual Testing Approach

**Development Verification:**
- Start dev server: `npm run dev`
- Navigate to pages locally
- Manual form submission testing
- Browser DevTools console for error inspection
- Network tab for API call verification

**Build Verification:**
- Run: `npm run build`
- Confirms TypeScript compilation and Next.js optimization
- Catches some errors but not behavioral issues

**Linting Verification:**
- Run: `npm run lint`
- ESLint checks code quality and Next.js best practices
- Does not test functionality

## Coverage Goals (Not Currently Measured)

**Target Approach (if implementing tests):**

1. **Validation Layer:** 100% coverage
   - All schema paths and edge cases
   - Example: email with special characters, max/min lengths

2. **API Routes:** 80%+ coverage
   - Success and error paths
   - Mocked external service scenarios

3. **Components:** 60%+ coverage
   - State changes and user interactions
   - Form field validation and submission
   - Skip CSS-specific logic and animations

4. **Utilities:** 100% coverage
   - Pure functions like `cn()`, `formatTelegramMessage()`

---

*Testing analysis: 2026-03-14*

**Note:** This codebase currently relies on manual testing and ESLint static analysis. Adding a test framework (Vitest recommended for Next.js) would significantly improve code reliability, especially for API routes and form validation.
