---
phase: 01-visual-foundation
plan: 01
subsystem: ui
tags: [nextjs, tailwind, css, case-study, i18n, next-intl]

# Dependency graph
requires: []
provides:
  - CaseStudyHero with apple-gradient-mesh background and stronger visual hierarchy
  - CaseStudyNarrative with section separator between Overview and narrative blocks
  - MetricsGrid confirmed with existing gradient treatment (no regressions)
  - caseStudy namespace registered in i18n.ts (fixes broken case study pages)
affects: [02-projects-index, 03-sagesync-content]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "apple-gradient-mesh: absolute-positioned mesh div inside overflow-hidden section, content in relative z-10 wrapper"
    - "Section separator: border-t border-foreground/[0.06] with my-8 between major narrative blocks"

key-files:
  created: []
  modified:
    - components/case-study/CaseStudyHero.tsx
    - components/case-study/CaseStudyNarrative.tsx
    - i18n.ts

key-decisions:
  - "MetricsGrid left unchanged — gradient card backgrounds (bg-gradient-to-br) and gradient text already meet VIS-04 requirements"
  - "Fixed pre-existing i18n bug (caseStudy not registered) as a blocking deviation — without this fix the build failed before any visual changes could be verified"

patterns-established:
  - "Gradient mesh hero: wrap section in overflow-hidden, add absolute apple-gradient-mesh div, wrap content in relative z-10"
  - "Narrative separators: use border-t border-foreground/[0.06] with my-8, change preceding card margin to mb-0"

requirements-completed: [VIS-01, VIS-02, VIS-03, VIS-04]

# Metrics
duration: 6min
completed: 2026-03-15
---

# Phase 1 Plan 01: Visual Hierarchy Summary

**Gradient mesh hero, larger headline (text-5xl/7xl), bolder role badge, and section separator on case study pages — plus i18n fix that unblocks all case study page builds**

## Performance

- **Duration:** 6 min
- **Started:** 2026-03-15T00:03:36Z
- **Completed:** 2026-03-15T00:09:40Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- Added `apple-gradient-mesh` absolute background to CaseStudyHero, giving the hero section visual weight behind headline and tags
- Bumped headline from `text-4xl md:text-6xl` to `text-5xl md:text-7xl` and role badge from `text-sm font-semibold` to `text-base font-bold`
- Added `border-t border-foreground/[0.06]` separator between the Overview glass card and the Problem/Solution/Impact block in CaseStudyNarrative
- Fixed pre-existing blocking bug: `caseStudy` namespace was missing from `i18n.ts` Promise.all loader, causing all case study pages to fail SSG prerender

## Task Commits

Each task was committed atomically:

1. **Task 1: Add gradient mesh background to CaseStudyHero and improve visual hierarchy** - `4acefa1` (feat)
2. **Task 2: Add section separators to CaseStudyNarrative and verify MetricsGrid prominence** - `faa2729` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified
- `components/case-study/CaseStudyHero.tsx` - Added apple-gradient-mesh background, bumped headline size, strengthened role badge
- `components/case-study/CaseStudyNarrative.tsx` - Added border-t separator between Overview and Problem/Solution/Impact blocks
- `i18n.ts` - Registered caseStudy namespace in Promise.all loader and messages object

## Decisions Made
- MetricsGrid.tsx left unchanged — confirmed `bg-gradient-to-br from-primary-blue/10 to-accent-purple/10` card backgrounds and gradient text already satisfy VIS-04 ("substantially complete" per research)
- Registered caseStudy in i18n.ts as a Rule 1 bug fix (blocking): the build was already broken due to missing namespace before my changes

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed missing caseStudy namespace in i18n.ts loader**
- **Found during:** Task 2 verification (build verification)
- **Issue:** `i18n.ts` loaded 12 translation namespaces via Promise.all but omitted `caseStudy.json`, causing `MISSING_MESSAGE: caseStudy (en)` error during SSG prerender of all case study pages
- **Fix:** Added `import('./locales/${locale}/caseStudy.json')` to the Promise.all array and `caseStudy: caseStudy.default` to the returned messages object
- **Files modified:** `i18n.ts`
- **Verification:** Build passes, all SSG pages for `/es/projects/sageconnect` and `/en/projects/sageconnect` rendered successfully
- **Committed in:** `faa2729` (part of Task 2 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - pre-existing bug blocking build verification)
**Impact on plan:** Bug was pre-existing and completely blocked build verification. Fix was necessary and minimal (2 lines in i18n.ts). No scope creep.

## Issues Encountered
- Next.js build lock file conflict from a prior incomplete build — resolved by removing the lock file and `.next` directory before clean rebuild

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Case study visual hierarchy complete; sageconnect page at `/projects/sageconnect` now renders correctly in both locales
- Pre-existing lint warnings in CaseStudyNarrative (react-hooks/error-boundaries on the whatNext try/catch pattern) are out of scope — the plan explicitly preserves this pattern
- Ready for plan 01-02 (projects index page or next visual foundation work)

## Self-Check: PASSED

- CaseStudyHero.tsx: FOUND with apple-gradient-mesh, text-5xl/text-7xl, text-base font-bold
- CaseStudyNarrative.tsx: FOUND with border-t separator
- i18n.ts: FOUND with caseStudy registered
- 01-01-SUMMARY.md: FOUND
- Commit 4acefa1: FOUND
- Commit faa2729: FOUND

---
*Phase: 01-visual-foundation*
*Completed: 2026-03-15*
