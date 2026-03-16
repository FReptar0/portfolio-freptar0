# Deferred Items - Phase 04

## Pre-existing Lint Errors (23 total: 16 errors, 7 warnings)

These were present before Phase 04 execution and are unrelated to design token changes.

- `app/[locale]/projects/[slug]/tech/page.tsx` - JSX within try/catch (react-hooks/error-boundaries)
- `components/case-study/CaseStudyNarrative.tsx` - JSX within try/catch (react-hooks/error-boundaries)
- `components/sections/Projects.tsx` - Unused `Project` type import
- `components/sections/TrustSignals.tsx` - Unused `setCount` variable
- `components/ui/ThemeToggle.tsx` - setState within useEffect (react-hooks/set-state-in-effect)
- `components/ui/tech-carousel.tsx` - Using `<img>` instead of `next/image` (4 instances)
- `emails/contact-confirmation-en.tsx` - Unescaped entity `'`
- `i18n.ts` - Unused `notFound` import

## Pre-existing Missing Translation Keys

- `caseStudy.projects.gymmanager.whatNext.title` (both EN and ES)
- `caseStudy.projects.gymmanager.whatNext.paragraphs` (both EN and ES)
- `caseStudy.projects.cardeal.whatNext.title` (both EN and ES)
- `caseStudy.projects.cardeal.whatNext.paragraphs` (both EN and ES)
