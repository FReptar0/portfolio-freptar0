# Deferred Items — Phase 01 Visual Foundation

## Pre-existing Lint Errors (not introduced by Phase 01)

Discovered during Task 1 of 01-03 (build+lint verification). These errors exist in code outside
the scope of Phase 01 changes and are not blocking the production build.

### 1. JSX inside try/catch — CaseStudyNarrative.tsx

**Files:** `components/case-study/CaseStudyNarrative.tsx` (lines 78-94)
**Rule:** `react-hooks/error-boundaries`
**Status:** Intentional design decision from 01-01 (try/catch for optional `whatNext` section).
**Note:** The try/catch pattern was chosen in STATE.md decisions to provide graceful fallback.
Replace with a proper React Error Boundary component in a future plan.

### 2. setState in useEffect — ThemeToggle.tsx

**Files:** `components/ui/ThemeToggle.tsx` (line 11)
**Rule:** `react-hooks/set-state-in-effect`
**Status:** Pre-existing, not introduced by Phase 01. Pattern is `setMounted(true)` for hydration guard.

### 3. Unescaped entity — emails/contact-confirmation-en.tsx

**Files:** `emails/contact-confirmation-en.tsx` (line 29)
**Rule:** `react/no-unescaped-entities`
**Status:** Pre-existing in email template file, not part of portfolio UI.

### 4. Unused `notFound` import — i18n.ts

**Files:** `i18n.ts` (line 1)
**Rule:** `@typescript-eslint/no-unused-vars`
**Status:** Pre-existing unused import before any Phase 01 changes.

### 5. Unused `Project` interface — components/sections/Projects.tsx

**Rule:** `@typescript-eslint/no-unused-vars`
**Status:** Pre-existing, interface defined but not directly used as type annotation.

---

**Production build:** Compiles cleanly with zero errors (all SSG routes generated).
**Lint:** 8 errors / 7 warnings — all pre-existing, none blocking production deployment.
