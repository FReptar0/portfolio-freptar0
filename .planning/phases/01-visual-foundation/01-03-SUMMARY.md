---
phase: 01-visual-foundation
plan: 03
subsystem: ui
tags: [nextjs, tailwind, i18n, svg, case-study, navigation, verification]

# Dependency graph
requires:
  - phase: 01-visual-foundation
    provides: "Plans 01 and 02 — visual hierarchy, gradient mesh, section separator, diagram node rewrite, mobile scroll"
provides:
  - "Human-verified sign-off on all six Phase 1 visual requirements (VIS-01 through VIS-05, ARCH-01)"
  - "Homepage 'View Case Study' link to SageConnect case study"
  - "Navigation routing fix for subpages back to homepage"
  - "Tech deep dive CTA section"
  - "Diagram SVG viewBox breathing room (480 -> 500)"
  - "SageConnect githubUrl set to empty string (private repo display)"
affects:
  - 02-content-depth
  - 03-projects-index

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "SVG viewBox adjusted by +20px to give legend breathing room without layout shift"
    - "Navigation uses /${locale}/#section anchor pattern for cross-page back-to-home compat"
    - "githubUrl: '' (empty string) to signal private repo — hides GitHub button gracefully"

key-files:
  created: []
  modified:
    - components/sections/Projects.tsx
    - components/ui/Navigation.tsx
    - components/diagrams/SageConnectDiagram.tsx
    - app/[locale]/projects/[slug]/tech/page.tsx
    - locales/en/projects.json
    - locales/es/projects.json

key-decisions:
  - "SVG viewBox expanded from '0 0 480 320' to '0 0 500 320' to give diagram legend breathing room"
  - "Navigation logo and links route to /${locale}/ (not /#section) when on subpages so back-to-home works"
  - "SageConnect githubUrl set to empty string, not null — component checks for truthy value before rendering button"
  - "CTA section added to tech deep dive page so recruiters have a clear next action after reading the diagram"

patterns-established:
  - "Checkpoint approval triggers gap-closure fixes before SUMMARY — deviations captured here, not in a separate plan"

requirements-completed: [VIS-01, VIS-02, VIS-03, VIS-04, VIS-05, ARCH-01]

# Metrics
duration: 45min
completed: 2026-03-15
---

# Phase 1 Plan 03: Visual Verification Summary

**All six Phase 1 visual requirements verified by human inspection on desktop and mobile, with four gap-closure fixes committed during the checkpoint session**

## Performance

- **Duration:** ~45 min (including gap-closure iteration)
- **Started:** 2026-03-15T00:15:00Z
- **Completed:** 2026-03-15T01:00:00Z
- **Tasks:** 2 (Task 1: build/lint; Task 2: human visual checkpoint)
- **Files modified:** 6

## Accomplishments

- Build and lint pass cleanly — zero errors across all Phase 1 changes
- User visually verified VIS-01 through VIS-05 and ARCH-01 on desktop (1440px) and mobile (375px iPhone SE emulation), in both light and dark mode
- Four gap-closure fixes identified during visual review and committed before approval: homepage case study link, diagram SVG spacing, navigation routing on subpages, and tech page CTA

## Task Commits

Each task was committed atomically:

1. **Task 1: Run full build and lint** - `34aec9c` (chore)
2. **Gap fix: Homepage case study link + diagram spacing** - `a76f73c` (fix)
3. **Gap fix: Nav routing, SageConnect privacy, tech page CTA** - `001ae59` (fix)
4. **Gap fix: Mark SageConnect githubUrl as empty string** - `e3fe909` (fix)
5. **Task 2: Visual checkpoint approved** — human-verify (no commit; approval captured in continuation context)

## Files Created/Modified

- `components/sections/Projects.tsx` — Added "View Case Study" link to SageConnect card
- `components/ui/Navigation.tsx` — Fixed logo and links to route to `/${locale}/` on subpages so back-navigation works
- `components/diagrams/SageConnectDiagram.tsx` — Expanded SVG viewBox from 480 to 500px wide for legend breathing room
- `app/[locale]/projects/[slug]/tech/page.tsx` — Added CTA section at the bottom of the tech deep dive page
- `locales/en/projects.json` — Added `caseStudyUrl` field for SageConnect
- `locales/es/projects.json` — Added `caseStudyUrl` field for SageConnect (Spanish)

## Decisions Made

- SVG viewBox width increased from 480 to 500 to give the "Planned Migration" legend chip room without clipping — a non-breaking visual fix
- Navigation on case study subpages now routes back to `/${locale}/` instead of `/#section` anchors — fixes dead links when already on a subpage
- SageConnect GitHub button hidden by setting `githubUrl` to empty string (not null/undefined) — component guards on truthiness, clean UX for private repos
- CTA section added to `/tech` page so recruiters have a clear path after reviewing the architecture diagram

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Added "View Case Study" homepage link to SageConnect**
- **Found during:** Task 2 (visual verification checkpoint)
- **Issue:** The SageConnect project card on the homepage had no link to the case study, making the case study effectively undiscoverable unless the URL was known
- **Fix:** Added a "View Case Study" CTA link to the SageConnect card in `Projects.tsx`, with the URL sourced from `locales/{locale}/projects.json`
- **Files modified:** `components/sections/Projects.tsx`, `locales/en/projects.json`, `locales/es/projects.json`
- **Verification:** Link visible on homepage, routes correctly to `/en/projects/sageconnect`
- **Committed in:** `a76f73c`

**2. [Rule 1 - Bug] Fixed SVG viewBox for diagram legend breathing room**
- **Found during:** Task 2 (visual verification checkpoint)
- **Issue:** "Planned Migration" legend chip in the SageConnect diagram was tight against the edge — viewBox `480` left no right margin for the label
- **Fix:** Changed viewBox width from `480` to `500` in `SageConnectDiagram.tsx`
- **Files modified:** `components/diagrams/SageConnectDiagram.tsx`
- **Verification:** Legend chip has visible right padding in both light and dark mode
- **Committed in:** `a76f73c`

**3. [Rule 1 - Bug] Fixed Navigation routing on subpages**
- **Found during:** Task 2 (visual verification checkpoint)
- **Issue:** Navigation logo and section links on case study subpages used `/#section` anchor format, which does not cross back to the homepage — clicking "Home" from `/projects/sageconnect` did nothing
- **Fix:** Updated `Navigation.tsx` to use `/${locale}/` for the logo and `/${locale}/#section` for section links, ensuring cross-page navigation works
- **Files modified:** `components/ui/Navigation.tsx`
- **Verification:** Logo click from case study page routes to homepage correctly
- **Committed in:** `001ae59`

**4. [Rule 2 - Missing Critical] Added CTA section to tech deep dive page**
- **Found during:** Task 2 (visual verification checkpoint)
- **Issue:** Tech deep dive page ended abruptly after the architecture diagram with no call to action — recruiters had nowhere to go next
- **Fix:** Added a CTA section at the bottom of `app/[locale]/projects/[slug]/tech/page.tsx` directing users back to the case study and the homepage
- **Files modified:** `app/[locale]/projects/[slug]/tech/page.tsx`
- **Verification:** CTA section visible at bottom of `/en/projects/sageconnect/tech`
- **Committed in:** `001ae59`

**5. [Rule 1 - Bug] Set SageConnect githubUrl to empty string**
- **Found during:** Task 2 (visual verification checkpoint)
- **Issue:** SageConnect is a private repo — the GitHub button should not appear, but the field had a placeholder value causing the button to render
- **Fix:** Set `githubUrl: ""` in the SageConnect case study data; component already guards on truthiness
- **Files modified:** `locales/en/caseStudy.json` (or equivalent source)
- **Verification:** GitHub button absent from SageConnect case study header
- **Committed in:** `e3fe909`

---

**Total deviations:** 5 auto-fixed (2 bugs, 2 missing critical, 1 bug — all surfaced during human visual review)
**Impact on plan:** All fixes necessary for discoverability, navigation correctness, and recruiter UX. No scope creep.

## Issues Encountered

None beyond the gap-closure items above. Build and lint were clean from the start.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- All six Phase 1 visual requirements (VIS-01, VIS-02, VIS-03, VIS-04, VIS-05, ARCH-01) are verified and complete
- Homepage links to SageConnect case study are live
- Navigation works correctly on all pages including subpages
- Phase 2 (Content Depth) can begin — SageConnect case study narrative is the primary target

---
*Phase: 01-visual-foundation*
*Completed: 2026-03-15*
