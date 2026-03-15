---
phase: 03-evolution-and-discovery
plan: 02
subsystem: ui
tags: [nextjs, next-intl, i18n, ssg, navigation, case-studies]

# Dependency graph
requires:
  - phase: 02-new-case-studies
    provides: "caseStudy.json content for all 4 projects (sageconnect, sagesync, cardeal, gymmanager)"
  - phase: 01-visual-foundation
    provides: "apple-glass, Navigation, Footer components and styling conventions"
provides:
  - "/[locale]/projects SSG index page listing all 4 case studies with cards"
  - "Case Studies nav link using absolute /${locale}/projects path"
  - "View All Case Studies pill link in homepage Projects section header"
affects: [future-case-study-additions, navigation-updates]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "SSG index page without slug: generateStaticParams returns locales only (no flatMap with slugs)"
    - "Nav link to page route uses absolute /${locale}/path, not prefix-based (prefix is for hash anchors only)"
    - "t.raw() for metrics array and tech.stack array in server component"

key-files:
  created:
    - "app/[locale]/projects/page.tsx"
  modified:
    - "components/ui/Navigation.tsx"
    - "components/sections/Projects.tsx"
    - "locales/en/navigation.json"
    - "locales/es/navigation.json"
    - "locales/en/projects.json"
    - "locales/es/projects.json"

key-decisions:
  - "caseStudy.json already contained index.title and index.subtitle keys from a prior session — no addition needed"
  - "DISC-01 confirmed satisfied from Phase 2: all 4 homepage project cards already show View Case Study links"
  - "Case Studies nav link uses absolute path (not prefix-based) to correctly include locale on all pages"

patterns-established:
  - "Projects index page: server component, generateStaticParams(locales only), t.raw() for arrays"
  - "Discovery surface: nav link (absolute path) + homepage section CTA (pill button with ArrowRight)"

requirements-completed: [DISC-01, DISC-02]

# Metrics
duration: 61min
completed: 2026-03-15
---

# Phase 3 Plan 02: Projects Index Page and Discovery Links Summary

**SSG /[locale]/projects index listing all 4 case studies with metrics cards, plus Case Studies nav link and homepage CTA pill using absolute locale-prefixed paths**

## Performance

- **Duration:** 61 min
- **Started:** 2026-03-15T16:10:22Z
- **Completed:** 2026-03-15T17:11:24Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments

- New `/en/projects` and `/es/projects` SSG pages listing all 4 case studies with 2-column card grid (headline, tagline, 2 key metrics, tech stack, category tags)
- "Case Studies" nav link added to Navigation.tsx using correct absolute `/${locale}/projects` path (not prefix-based)
- "View All Case Studies" pill link added to homepage Projects section header, linking to the new index page

## Task Commits

Each task was committed atomically:

1. **Task 1: Create projects index page** - `4494976` (feat)
2. **Task 2: Add discovery links to navigation and homepage** - `ef134bb` (feat)

## Files Created/Modified

- `app/[locale]/projects/page.tsx` - New SSG projects index page with 4 case study cards
- `components/ui/Navigation.tsx` - Added caseStudies nav link with absolute path
- `components/sections/Projects.tsx` - Added View All Case Studies pill link in section header
- `locales/en/navigation.json` - Added caseStudies key
- `locales/es/navigation.json` - Added caseStudies key
- `locales/en/projects.json` - Added viewAllCaseStudies label
- `locales/es/projects.json` - Added viewAllCaseStudies label

## Decisions Made

- The `"index"` keys (`index.title` and `index.subtitle`) were already present in both caseStudy.json files from a prior session — no modifications needed.
- DISC-01 (homepage project cards with View Case Study links) was confirmed satisfied from Phase 2 — `projectsWithCaseStudy` Set on line 34 of Projects.tsx already contained all 4 slugs.
- The Case Studies nav link uses an absolute `/${locale}/projects` path rather than the `${prefix}` variable, which is reserved for hash anchor links only. This ensures the locale prefix is always present from any page.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None. The expected non-fatal `MISSING_MESSAGE: caseStudy.projects.gymmanager.whatNext.paragraphs` error appears during SSG but is handled by the try/catch IIFE pattern established in Phase 3 Plan 01 — 24/24 pages generate successfully.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- DISC-01 and DISC-02 requirements satisfied
- All 4 projects discoverable via: homepage card links, nav bar, homepage CTA, and direct URL
- Phase 3 complete — all planned evolution and discovery requirements addressed
- Remaining known gap: SageSync evolution content details (EVO-02) pending content gathering before deeper narrative expansion

## Self-Check: PASSED

- app/[locale]/projects/page.tsx: FOUND
- 03-02-SUMMARY.md: FOUND
- Commit 4494976 (Task 1): FOUND
- Commit ef134bb (Task 2): FOUND

---
*Phase: 03-evolution-and-discovery*
*Completed: 2026-03-15*
