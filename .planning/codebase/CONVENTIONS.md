# Coding Conventions

**Analysis Date:** 2026-03-14

## Naming Patterns

**Files:**
- React components: PascalCase with `.tsx` extension (e.g., `Hero.tsx`, `Contact.tsx`, `TechCarousel.tsx`)
- Utility files: camelCase with `.ts` extension (e.g., `utils.ts`, `supabase.ts`, `telegram.ts`)
- Config files: kebab-case or camelCase (e.g., `eslint.config.mjs`, `next.config.ts`, `components.json`)
- API route files: Follow Next.js App Router pattern (e.g., `app/api/contact/route.ts`)

**Functions:**
- Components: PascalCase exported as default (e.g., `export default function Hero()`)
- Utility functions: camelCase (e.g., `cn()`, `validateField()`, `formatTelegramMessage()`)
- Private/helper functions: camelCase with underscore prefix discouraged; use scope-based privacy instead
- Async functions: camelCase with descriptive action verbs (e.g., `saveContactSubmission()`, `sendConfirmationEmail()`, `verifyTurnstileToken()`)

**Variables:**
- State variables: camelCase (e.g., `isVisible`, `formStatus`, `validationErrors`, `fieldStates`)
- Constants: camelCase (e.g., `defaultLocale`, `bypassTurnstile`)
- Component props: camelCase (e.g., `speed`, `className`, `maxLength`)
- Type instances: camelCase (e.g., `submission`, `result`, `data`)

**Types:**
- Interfaces: PascalCase (e.g., `TechCarouselProps`, `ContactFormData`, `TelegramMessage`, `TechLogo`)
- Type aliases: PascalCase (e.g., `Locale`, `ContactSubmissionInsert`)
- Union types: PascalCase when named (e.g., form status as `"idle" | "sending" | "success" | "error"`)
- Zod schemas: PascalCase with `Schema` suffix optional (e.g., `contactFormSchema`, `turnstileVerificationSchema`)

## Code Style

**Formatting:**
- No dedicated formatter configured (Prettier not in devDependencies)
- ESLint enforces Next.js and TypeScript best practices via `eslint-config-next`
- Code follows manual formatting patterns:
  - 2-space indentation (observed throughout)
  - Trailing commas in multi-line objects/arrays
  - Template literals for string interpolation

**Linting:**
- Tool: ESLint 9 with Next.js core-web-vitals and TypeScript configs
- Config file: `eslint.config.mjs`
- Key rules:
  - Extends `eslint-config-next/core-web-vitals` for performance and best practices
  - Extends `eslint-config-next/typescript` for strict TypeScript rules
  - Global ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`
- Run with: `npm run lint` (equivalent to `eslint`)

## Import Organization

**Order:**
1. React and core library imports (`import React`, `import { useState }`)
2. Third-party packages (`next/`, `next-intl`, `lucide-react`, `zod`)
3. Local absolute imports using `@/` path alias (`@/components/`, `@/lib/`)
4. Relative imports (rare, use `@/` pattern instead)

**Path Aliases:**
- `@/*` → root directory (configured in `tsconfig.json`)
- Examples: `@/components/ui/button`, `@/lib/utils`, `@/lib/validations/contact`

**Import Style:**
- Named imports preferred: `import { useTranslations } from 'next-intl'`
- Default imports for components: `import Hero from '@/components/sections/Hero'`
- Type imports with explicit `type` keyword: `import type { ContactFormData } from '@/lib/validations/contact'`
- Wildcard imports discouraged except for React: `import * as React from "react"`

## Error Handling

**Strategy:** Fail-safe with graceful degradation. Errors are caught, logged, and fallback behaviors are provided.

**Patterns:**

**Try-Catch Pattern:**
```typescript
// From app/api/contact/route.ts
try {
  const response = await fetch(verifyUrl, { /* ... */ });
  if (!response.ok) {
    console.error('Turnstile API request failed:', response.status, response.statusText);
    return false;
  }
  // Handle success
} catch (error) {
  console.error('Turnstile verification error:', error);
  return false;
}
```

**Zod Validation with SafeParse:**
```typescript
// From app/api/contact/route.ts
const validationResult = contactFormSchema.safeParse(body);
if (!validationResult.success) {
  const errorDetails = validationResult.error.errors.map(err => ({
    field: err.path.join('.'),
    message: err.message,
  }));
  return NextResponse.json({ error: 'Validation failed', details: errorDetails }, { status: 400 });
}
const data = validationResult.data;
```

**Environment Variable Validation:**
```typescript
// From lib/supabase.ts
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}
```

**Graceful Degradation:**
- Non-critical errors (email failures, Telegram notifications) are caught and logged but don't fail the response
- Form submission succeeds even if email notification fails
- Telegram notification is optional; missing credentials just log a skip message

**Logging:** Console-based with context-aware error messages

## Logging

**Framework:** `console` (no dedicated logging library)

**Patterns:**

**Success Logs:**
```typescript
console.log('Contact submission saved successfully with ID:', result.id);
console.log('Confirmation email sent successfully to:', data.email);
console.log('Telegram notification sent successfully');
```

**Error Logs:**
```typescript
console.error('Failed to save contact submission:', error);
console.error('Error saving contact submission:', error);
console.error('Turnstile verification error:', error);
```

**Informational Logs:**
```typescript
console.log('🔒 Turnstile Configuration:', { bypassEnabled, hasSiteKey, bypassEnvVar });
console.log('New contact form submission:', { timestamp, submissionId, ...sanitizedData, ip });
```

**Guidelines:**
- Log errors on catch blocks immediately
- Include relevant context (IDs, user data relevant to the operation)
- Use emoji prefixes for status/configuration logs (e.g., `🔒`, `🚀`, `🌍`)
- Log skipped operations (e.g., Telegram notification when not configured)
- No logging in frontend components (except console in development hooks)

## Comments

**When to Comment:**
- Complex business logic or non-obvious algorithms (e.g., carousel animation logic in `tech-carousel.tsx`)
- Integration setup and configuration steps
- Important warnings or gotchas (e.g., React event pooling in Contact.tsx line 154)
- Cross-browser compatibility notes (e.g., scrollbar hiding in tech-carousel.tsx)

**JSDoc/TSDoc:**
- Used for public functions and utilities, especially those with side effects or external dependencies
- Format: Multi-line with `@param` and `@returns` tags
- Example from `lib/telegram.ts`:
```typescript
/**
 * Sends a Telegram notification using the Bot API
 * @param data Contact form submission data
 * @returns Promise<boolean> - true if sent successfully, false otherwise
 */
export async function sendTelegramNotification(data: TelegramMessage): Promise<boolean> {
  // ...
}
```
- Inline comments used for non-obvious CSS classes or style overrides

**Comment Style:**
- Single-line: `// Comment`
- Multi-line: `/* Multi-line comment */`
- No trailing comments except for field labels in forms

## Function Design

**Size:** Functions are kept focused and reasonably scoped.
- API route handlers: 150-300 lines (example: `route.ts` POST handler)
- Component render functions: 50-200 lines (example: Hero.tsx at 125 lines)
- Utility functions: 10-50 lines
- Helper components: 30-80 lines

**Parameters:**
- Use object destructuring for multiple parameters: `function saveContactSubmission(data: { name: string; email: string }, request: NextRequest)`
- Include type annotations on all parameters
- Use default parameters for optional values: `{ speed = 50, className = "" }`

**Return Values:**
- Async functions explicitly return typed Promises
- Validation functions return union types for both success and error states
- Error handlers return `false` or `null` for failure cases (graceful degradation)
- Components return JSX.Element or null

**Dependency Injection:**
- Environment variables accessed via `process.env.*`
- Service clients (Supabase, Resend) instantiated on demand via utility functions
- Context passed through props or hooks (next-intl)

## Module Design

**Exports:**
- Named exports for utilities and types: `export function cn()`, `export interface ContactFormData`
- Default exports for React components: `export default function Hero()`
- Type exports with explicit `export type` keyword: `export type ContactFormData = z.infer<typeof contactFormSchema>`
- Mixed exports in utility files: `export { Button, buttonVariants }` (from button.tsx)

**Barrel Files:**
- Not used extensively; most imports use full paths with `@/` alias
- Component imports: `import Hero from '@/components/sections/Hero'`
- Utils imports: `import { cn } from '@/lib/utils'`

**Module Responsibilities:**
- `lib/utils.ts`: Shared CSS class merging utility (`cn()`)
- `lib/validations/contact.ts`: Zod schemas and types for contact form data
- `lib/supabase.ts`: Supabase client initialization and type definitions
- `lib/telegram.ts`: Telegram API integration with formatting and notification logic
- `components/ui/`: Reusable UI components (Button, Carousel, etc.)
- `components/sections/`: Page section components (Hero, Contact, Projects, etc.)
- `app/api/`: Next.js API routes with business logic

## TypeScript Configuration

**Compiler Options:**
- Target: ES2017
- Module: esnext
- Strict mode: enabled
- JSX: react-jsx
- Module resolution: bundler
- Path alias: `@/*` maps to root directory
- Isolated modules: enabled
- Incremental builds: enabled

**Notable Settings:**
- `resolveJsonModule: true` - Allows importing JSON files (used for locales)
- `noEmit: true` - Type checking only, no output files
- `skipLibCheck: true` - Skip type checking of declaration files for speed

---

*Convention analysis: 2026-03-14*
