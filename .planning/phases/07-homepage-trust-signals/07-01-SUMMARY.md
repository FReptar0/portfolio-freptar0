---
phase: 07-homepage-trust-signals
plan: 01
subsystem: ui
tags: [next-intl, i18n, hero, metrics, trust-signals]

# Dependency graph
requires: []
provides:
  - Hero section with four honest, verifiable metrics (5+ years, 6+ systems, 300+ users, 99% error reduction)
  - Updated EN and ES locale metric keys (experience, systems, users, accuracy)
affects: [07-02-homepage-trust-signals]

# Tech tracking
tech-stack:
  added: []
  patterns: []

key-files:
  created: []
  modified:
    - components/sections/Hero.tsx
    - locales/en/hero.json
    - locales/es/hero.json

key-decisions:
  - "Replaced '20+ Projects Shipped' with '6+ Systems Shipped' to reflect named deployable systems (SageConnect, SageSync, Qardeal, GymManager, Inova/Odoo, portfolio)"
  - "Replaced '$2M+ Value Delivered' with '99% Error Reduction' (SageConnect reduced manual errors to near-zero)"
  - "Added '300+ Users Impacted' as fourth metric per user direction"
  - "Kept '5+ Years Experience' unchanged (2021 start, 2026 current = accurate)"
  - "Used 'Reducción de Errores' with proper Spanish accent in ES locale"

patterns-established: []

requirements-completed: [HERO-01, HERO-02, HERO-03, HERO-04]

# Metrics
duration: 12min
completed: 2026-03-26
---

# Phase 7 Plan 01: Hero Metrics Honesty Summary

**Four truthful Hero metrics replacing inflated claims: 5+ years, 6+ systems shipped, 300+ users impacted, 99% error reduction — with matching EN/ES translations**

## Performance

- **Duration:** 12 min
- **Started:** 2026-03-26T00:00:00Z
- **Completed:** 2026-03-26T00:12:00Z
- **Tasks:** 1
- **Files modified:** 3

## Accomplishments
- Replaced `$2M+ Value Delivered` (fabricated/unverifiable) with `99% Error Reduction` (substantiated by SageConnect docs)
- Replaced `20+ Projects Shipped` (inflated) with `6+ Systems Shipped` (verifiable: SageConnect, SageSync, Qardeal, GymManager, Inova/Odoo, portfolio)
- Added `300+ Users Impacted` as a fourth metric per user direction
- Updated both `locales/en/hero.json` and `locales/es/hero.json` with new keys (`systems`, `users`, `accuracy`) and removed obsolete keys (`projects`, `value`)
- Build passes cleanly with all four metrics rendered

## Task Commits

Each task was committed atomically:

1. **Task 1: Update Hero metric values and locale labels** - `cc6b9fd` (feat)

**Plan metadata:** (pending final docs commit)

## Files Created/Modified
- `components/sections/Hero.tsx` - Changed 3 MetricItem lines to 4, updated translation keys
- `locales/en/hero.json` - Replaced metrics object: removed projects/value, added systems/users/accuracy
- `locales/es/hero.json` - Matching Spanish translations with proper accents (Reducción)

## Decisions Made
- Used `99%` as the accuracy value since SageConnect documentation states it "reduced manual errors to zero"
- Added proper Spanish diacritic: `Reducción` (not `Reduccion`) matching the existing accent standard in the ES locale file

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Hero section now displays honest, verifiable metrics
- Ready for Phase 07-02 (TrustSignals content accuracy)

---
*Phase: 07-homepage-trust-signals*
*Completed: 2026-03-26*
