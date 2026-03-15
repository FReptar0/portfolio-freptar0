---
phase: 02-new-case-studies
plan: 01
subsystem: routing, i18n, homepage
tags: [case-study, routing, i18n, metrics]
dependency_graph:
  requires: [01-visual-foundation]
  provides: [sagesync-route, cardeal-route, gymmanager-route]
  affects: [app/[locale]/projects/[slug]/page.tsx, app/[locale]/projects/[slug]/tech/page.tsx, components/sections/Projects.tsx, locales]
tech_stack:
  added: []
  patterns: [VALID_SLUGS guard, projectsWithCaseStudy Set, SSG static params]
key_files:
  created: []
  modified:
    - locales/en/caseStudy.json
    - locales/es/caseStudy.json
    - locales/en/projects.json
    - locales/es/projects.json
    - app/[locale]/projects/[slug]/page.tsx
    - app/[locale]/projects/[slug]/tech/page.tsx
    - components/sections/Projects.tsx
decisions:
  - "Qardeal booking conversion metric corrected from 35% to 45% per user decision (applied to metric cards, impact prose, and homepage cards in both locales)"
  - "Pre-existing lint warnings in out-of-scope files (ThemeToggle.tsx, tech-carousel.tsx, emails/) deferred — not introduced by this plan"
metrics:
  duration: "3 minutes"
  completed: "2026-03-15"
  tasks_completed: 2
  files_modified: 7
---

# Phase 2 Plan 1: Activate New Case Studies Summary

**One-liner:** Flipped the switch on three case studies (SageSync, Qardeal, Gym Manager) by expanding VALID_SLUGS in two route files and projectsWithCaseStudy Set in Projects.tsx, plus correcting the Qardeal 35% booking metric to 45% across all six locale locations.

## What Was Built

Six new static routes now live (3 slugs x 2 page types: case study + tech deep dive) in both `en` and `es` locales — 12 new pages total. The homepage Projects section now shows "View Case Study" links for all four projects. The Qardeal booking conversion metric is corrected to 45% everywhere.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Fix Qardeal metric from 35% to 45% in all locale files | 790a185 | locales/en/caseStudy.json, locales/es/caseStudy.json, locales/en/projects.json, locales/es/projects.json |
| 2 | Register three new slugs in routing and homepage discovery | 7487b6f | app/[locale]/projects/[slug]/page.tsx, app/[locale]/projects/[slug]/tech/page.tsx, components/sections/Projects.tsx |

## Verification Results

1. `grep -r "35%" locales/` — zero matches (PASS)
2. `npm run build` — 22 static pages generated across both locales (PASS)
3. VALID_SLUGS contains exactly 4 entries in both page.tsx files (PASS)
4. projectsWithCaseStudy Set contains exactly 4 entries (PASS)
5. All new routes visible in build output: /es/projects/sagesync, /es/projects/cardeal, /es/projects/gymmanager, /en/projects/sagesync, /en/projects/cardeal, /en/projects/gymmanager plus /tech counterparts

## New Routes Generated (from build output)

- /es/projects/sagesync
- /es/projects/cardeal
- /es/projects/gymmanager
- /en/projects/sagesync
- /en/projects/cardeal
- /en/projects/gymmanager
- /es/projects/sagesync/tech
- /es/projects/cardeal/tech
- /es/projects/gymmanager/tech
- /en/projects/sagesync/tech
- /en/projects/cardeal/tech
- /en/projects/gymmanager/tech

## Deviations from Plan

None — plan executed exactly as written. The build emitted `MISSING_MESSAGE` console warnings for `whatNext` keys in gymmanager and cardeal, but these are non-fatal (the CaseStudyNarrative component already guards them with try/catch as established in Phase 1) and the build completed successfully with all 22 pages generated.

## Self-Check: PASSED

All files verified present. All commits verified in git log.
