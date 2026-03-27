---
phase: 07-homepage-trust-signals
plan: "02"
subsystem: ui
tags: [i18n, trust-signals, skills, timeline, next-intl, content-accuracy]

requires: []
provides:
  - "Technologies section with honest tech names, no fake certification claims"
  - "Spring Boot skill entry with corrected project reference (no SageConnect association)"
  - "SageConnect timeline entry referencing Node.js/Express instead of Spring Boot"
  - "Java and Spring Boot experience years corrected to 2 years with accurate level values"
affects: [trustSignals, skills, timeline]

tech-stack:
  added: []
  patterns:
    - "CertBadge renamed to TechBadge: drop certification-implying CheckCircle icon from tech badges"

key-files:
  created: []
  modified:
    - locales/en/trustSignals.json
    - locales/es/trustSignals.json
    - locales/en/skills.json
    - locales/es/skills.json
    - locales/en/timeline.json
    - locales/es/timeline.json
    - components/sections/TrustSignals.tsx

key-decisions:
  - "Keep JSON key 'certifications' to avoid breaking t.raw() call; only the displayed title changes to 'Technologies'"
  - "Spring Boot remains in skills list but with generic project description, not SageConnect-specific"
  - "MySQL and Jenkins entries in skills.json legitimately reference SageConnect and were not changed"

patterns-established:
  - "Tech badge pattern: plain text only, no certification-implying icon"

requirements-completed: [CRED-01, CRED-02, CRED-03]

duration: 15min
completed: 2026-03-26
---

# Phase 7 Plan 02: Content Accuracy & Trust Signals Summary

**Removed fake certification claims (AWS Certified, React Expert, Node.js Specialist) from homepage and fixed Spring Boot-SageConnect false association across skills and timeline locale files**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-03-27T03:30:00Z
- **Completed:** 2026-03-27T03:45:00Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments
- "Certifications & Technologies" section renamed to "Technologies" in both EN and ES locales, stripping all certification-implying claims
- CheckCircle icon removed from TechBadge component — no more visual cue implying Fernando holds certifications he does not
- Spring Boot project field corrected from "SageConnect ERP integration platform" to generic "Enterprise Java backend services and REST APIs" in both locales
- SageConnect timeline description2 updated to reference Node.js/Express (the actual technology used), not Spring Boot
- Spring Boot and Java experience years corrected from 3 to 2 years; Spring Boot level corrected from 85 to 75

## Task Commits

Each task was committed atomically:

1. **Task 1: Rename Certifications to Technologies and clean up fake claims** - `e9c4523` (feat)
2. **Task 2: Fix Spring Boot-SageConnect association and audit skill accuracy** - `a65d55f` (fix)

**Plan metadata:** (pending docs commit)

## Files Created/Modified
- `locales/en/trustSignals.json` - Title renamed to "Technologies", array cleaned to honest tech names
- `locales/es/trustSignals.json` - Title renamed to "Tecnologías", array cleaned to honest tech names
- `components/sections/TrustSignals.tsx` - CertBadge renamed to TechBadge, CheckCircle import/usage removed
- `locales/en/skills.json` - Spring Boot project reference fixed, Java/Spring Boot years corrected
- `locales/es/skills.json` - Spring Boot project reference fixed, Java/Spring Boot years corrected
- `locales/en/timeline.json` - SageConnect description2 changed from Spring Boot to Node.js/Express
- `locales/es/timeline.json` - SageConnect description2 changed from Spring Boot to Node.js/Express

## Decisions Made
- Kept JSON key `"certifications"` in trustSignals.json intact to preserve the `t.raw('certifications')` component call — only the displayed title value changed to "Technologies"
- MySQL (SageConnect transaction processing) and Jenkins (SageConnect CI/CD pipeline) entries in skills.json were intentionally left unchanged as those associations are accurate
- Spring Boot stays in the general skills list with a corrected generic project description, not removed

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All trust signal content is now accurate and consistent across EN/ES locales
- No fake certifications, no false tech-to-project associations remain
- Ready for Phase 7 Plan 03 (if applicable) or Phase 8

---
*Phase: 07-homepage-trust-signals*
*Completed: 2026-03-26*
