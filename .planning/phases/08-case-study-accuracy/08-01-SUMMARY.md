---
phase: 08-case-study-accuracy
plan: "01"
subsystem: content
tags: [i18n, locale, json, carrytrade, sageconnect, content-accuracy]

# Dependency graph
requires:
  - phase: 07-homepage-trust-signals
    provides: Spring Boot removed from skills/timeline; honest hero metrics in place
provides:
  - CarryTrade locale files with paper trading framing in title, tagline, businessProblem, and tags (EN + ES)
  - SageConnect case study verified free of Spring Boot references (EN + ES)
affects: [case-study pages, project cards, any recruiter-facing content for CarryTrade and SageConnect]

# Tech tracking
tech-stack:
  added: []
  patterns: []

key-files:
  created: []
  modified:
    - locales/en/projects.json
    - locales/es/projects.json
    - locales/en/caseStudy.json
    - locales/es/caseStudy.json

key-decisions:
  - "CarryTrade: replaced 'Live Experiment'/'Experimento en Vivo' tags with 'Paper Trading' in all 4 locale files"
  - "CarryTrade: businessProblem in projects.json now opens with explicit paper trading disclaimer"
  - "SageConnect: confirmed zero Spring Boot references in caseStudy.json (Phase 7 already cleaned them)"

patterns-established: []

requirements-completed: [TRST-02, TRST-03]

# Metrics
duration: 2min
completed: 2026-03-27
---

# Phase 8 Plan 01: Case Study Accuracy Summary

**CarryTrade paper trading framing applied to all 4 locale files (title, tagline, businessProblem intro, and tags); SageConnect case study confirmed Spring Boot-free in EN and ES**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-03-27T04:39:19Z
- **Completed:** 2026-03-27T04:41:03Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- CarryTrade project card title changed from "Forex Strategy" to "Paper Trading Experiment" in EN and ES
- CarryTrade businessProblem intro now explicitly states "OANDA paper trading (no real money at risk)" in both locales
- CarryTrade tags replaced: "Live Experiment" / "Experimento en Vivo" -> "Paper Trading" across all 4 files
- CarryTrade case study taglines updated: no longer say "Live" or "en Vivo" — now say "Paper Trading Validation"
- SageConnect case study verified: zero Spring Boot references in either locale (Phase 7 completeness confirmed)

## Task Commits

Each task was committed atomically:

1. **Task 1: Clarify CarryTrade as paper trading experiment in all locale files** - `a7d197b` (feat)
2. **Task 2: Verify SageConnect case study has no Spring Boot references** - verification only, no file changes needed

## Files Created/Modified
- `locales/en/projects.json` - CarryTrade title, businessProblem intro, and tag updated
- `locales/es/projects.json` - CarryTrade title, businessProblem intro, and tag updated
- `locales/en/caseStudy.json` - CarryTrade tagline and tag updated
- `locales/es/caseStudy.json` - CarryTrade tagline and tag updated

## Decisions Made
- Phase 7 already removed Spring Boot from SageConnect case study — Task 2 was a pure verification confirming completeness
- Kept the businessProblem body intact; only prepended the paper trading disclaimer sentence per plan
- Used "Paper Trading" (English) as the tag in both the EN and ES locale files (Spanish locale keeps "Paper Trading" as a technical term, matching the ES case study tag)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Phase 8 Plan 01 complete; recruiter-facing CarryTrade content now unambiguously describes a paper trading experiment
- No blockers for any subsequent phase

---
*Phase: 08-case-study-accuracy*
*Completed: 2026-03-27*
