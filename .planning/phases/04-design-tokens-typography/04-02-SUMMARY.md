---
phase: 04-design-tokens-typography
plan: 02
subsystem: ui
tags: [tailwind-v4, theme-inline, design-tokens, css-custom-properties, swiss-design, typography]

# Dependency graph
requires:
  - phase: 04-design-tokens-typography
    plan: 01
    provides: CSS custom properties (--color-*, --text-*, --font-*) and next/font setup
provides:
  - Tailwind @theme inline block mapped to Swiss design tokens
  - Font utility classes (font-heading, font-body, font-sans, font-mono) resolving to Swiss typography
  - Accent-green Tailwind tokens (accent-green, accent-green-hover, accent-green-muted)
  - Surface Tailwind tokens (surface, surface-elevated, surface-sunken)
  - Legacy color aliases preserved (primary-blue, accent-purple, success-green, growth-orange)
  - shadcn/ui compatibility tokens in @theme inline
  - Verified production build passing with all pages generated
affects: [05-component-rewrite]

# Tech tracking
tech-stack:
  added: []
  patterns: [tailwind-v4-theme-inline-swiss-mapping, direct-font-values-avoid-circular-var]

key-files:
  created: []
  modified:
    - app/globals.css

key-decisions:
  - "Used direct font-family values in @theme inline to avoid circular var() references with next/font CSS variables"
  - "Exposed Swiss accent as accent-green in Tailwind to avoid collision with shadcn accent token"
  - "Pre-existing lint errors (23 total) documented as deferred items, not caused by this plan"

patterns-established:
  - "Tailwind font tokens use direct values; next/font CSS variables applied via body className override"
  - "Swiss accent exposed as accent-green-* in Tailwind; shadcn accent remains neutral"

requirements-completed: [FOUND-05]

# Metrics
duration: 2min
completed: 2026-03-16
---

# Phase 4 Plan 02: Tailwind Theme Inline Summary

**Tailwind v4 @theme inline mapped to Swiss design tokens with Space Grotesk/DM Sans/JetBrains Mono fonts, accent-green colors, and full backward compatibility**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-16T20:46:07Z
- **Completed:** 2026-03-16T20:48:31Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments
- Rewrote @theme inline block to map all Tailwind utility classes to Swiss design tokens
- Replaced Geist font references with Space Grotesk (heading), DM Sans (body/sans), JetBrains Mono (mono)
- Added Swiss accent-green, surface, and core color tokens to Tailwind
- Preserved legacy color aliases (primary-blue, accent-purple, success-green, growth-orange)
- Verified production build passes with all 33 static pages generated for both EN/ES locales

## Task Commits

Each task was committed atomically:

1. **Task 1: Rewrite @theme inline block with Swiss token mappings** - `3cba3b3` (feat)
2. **Task 2: Verify production build and site rendering** - verification only, no code changes

## Files Created/Modified
- `app/globals.css` - Complete rewrite of @theme inline block: fonts, colors, surfaces, legacy aliases, shadcn/ui compat

## Decisions Made
- Used direct font-family values (`'Space Grotesk', sans-serif` etc.) in @theme inline instead of `var(--font-heading)` to avoid circular CSS variable references. The next/font CSS variables set on body still apply at runtime via className specificity.
- Exposed Swiss accent green as `accent-green` / `accent-green-hover` / `accent-green-muted` in Tailwind namespace to avoid collision with shadcn/ui's `accent` token (which is a neutral color for hover states).
- Pre-existing lint errors (23 problems across 6 files) are unrelated to CSS/Tailwind changes; documented in deferred-items.md for future phases.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Used direct font-family values instead of var() references**
- **Found during:** Task 1 (rewrite @theme inline)
- **Issue:** `--font-heading: var(--font-heading)` would create a circular CSS variable reference in Tailwind v4's @theme inline block since it registers CSS custom properties directly
- **Fix:** Used direct font-family strings: `'Space Grotesk', sans-serif`, `'DM Sans', sans-serif`, `'JetBrains Mono', monospace`
- **Files modified:** app/globals.css
- **Verification:** Build passes, grep confirms font-heading present, no geist references
- **Committed in:** 3cba3b3

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Planned fix per the plan's own guidance in Task 2 action section. No scope creep.

## Issues Encountered
- Pre-existing MISSING_MESSAGE errors during build for gymmanager and cardeal whatNext translations (both locales). These do not prevent page generation and are unrelated to this plan.
- Pre-existing lint errors (23 problems) across multiple files, none caused by globals.css changes. Logged to deferred-items.md.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Tailwind utility classes now fully resolve to Swiss design tokens
- Both font and color systems are connected end-to-end: next/font -> CSS vars -> @theme inline -> Tailwind classes
- Components can use `font-heading`, `font-body`, `font-mono`, `bg-accent-green`, `bg-surface`, etc.
- Legacy class names (bg-primary-blue, bg-accent-purple, etc.) still resolve correctly
- Phase 05 (component rewrite) can proceed to update component markup to use the new token names

## Self-Check: PASSED

All files exist, all commits verified, all content checks pass.

---
*Phase: 04-design-tokens-typography*
*Completed: 2026-03-16*
