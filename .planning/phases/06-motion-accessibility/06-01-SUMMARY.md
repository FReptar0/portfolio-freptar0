---
phase: 06-motion-accessibility
plan: 01
subsystem: ui
tags: [intersection-observer, scroll-animation, reduced-motion, accessibility, react-hooks]

# Dependency graph
requires:
  - phase: 05-component-overhaul
    provides: Swiss design section components to animate
provides:
  - useScrollReveal hook with IntersectionObserver and reduced-motion support
  - useStaggerChildren helper for staggered entrance animations
  - CSS scroll-reveal utility classes
  - Global prefers-reduced-motion media query killing all animations/transitions
  - All 8 homepage sections wired with staggered scroll-triggered entrances
affects: [06-02-PLAN]

# Tech tracking
tech-stack:
  added: []
  patterns: [intersection-observer-scroll-reveal, staggered-entrance-animation, reduced-motion-first]

key-files:
  created:
    - hooks/useScrollReveal.ts
  modified:
    - app/globals.css
    - components/sections/Hero.tsx
    - components/sections/TrustSignals.tsx
    - components/sections/TechStack.tsx
    - components/sections/CareerTimeline.tsx
    - components/sections/Projects.tsx
    - components/sections/Skills.tsx
    - components/sections/Process.tsx
    - components/sections/Contact.tsx

key-decisions:
  - "Removed animate-ping entirely from status badges (Hero + Contact) for Swiss restrained aesthetic -- static green dot only"
  - "Hero entrance uses 300ms duration (down from 500ms) per requirement MOTN-03"
  - "useScrollReveal uses callback ref pattern for clean observer lifecycle management"

patterns-established:
  - "Scroll reveal pattern: useScrollReveal({ threshold }) returns { ref, isVisible }, attach ref to container, conditionally apply opacity/translate classes"
  - "Stagger pattern: parent gets useScrollReveal, children get transitionDelay via index * delayMs inline style"
  - "Reduced motion: hook returns isVisible=true immediately, global CSS kills all animation/transition durations"

requirements-completed: [MOTN-01, MOTN-03, MOTN-04]

# Metrics
duration: 7min
completed: 2026-03-16
---

# Phase 6 Plan 01: Scroll Animations & Reduced Motion Summary

**useScrollReveal hook with IntersectionObserver, staggered entrance animations on all 8 homepage sections, and comprehensive prefers-reduced-motion support**

## Performance

- **Duration:** 7 min
- **Started:** 2026-03-16T21:49:47Z
- **Completed:** 2026-03-16T21:57:26Z
- **Tasks:** 3
- **Files modified:** 10

## Accomplishments
- Created reusable useScrollReveal hook using IntersectionObserver API with configurable threshold, rootMargin, and once behavior
- Integrated scroll-triggered staggered entrance animations into all 8 homepage sections (Hero, TrustSignals, TechStack, CareerTimeline, Projects, Skills, Process, Contact)
- Removed animate-ping anti-pattern from Hero status badge and Contact availability badge
- Added global prefers-reduced-motion media query that disables all animations and transitions site-wide
- Reduced Hero entrance animation from 500ms to 300ms

## Task Commits

Each task was committed atomically:

1. **Task 1: Create useScrollReveal hook and CSS animation infrastructure** - `efc708b` (feat)
2. **Task 2: Integrate scroll reveal into Hero through CareerTimeline and fix anti-patterns** - `f8bbe32` (feat)
3. **Task 3: Integrate scroll reveal into Projects through Contact** - `5301a57` (feat)

## Files Created/Modified
- `hooks/useScrollReveal.ts` - Reusable IntersectionObserver hook with reduced-motion check, plus useStaggerChildren helper
- `app/globals.css` - Added scroll-reveal CSS utilities and global prefers-reduced-motion media query
- `components/sections/Hero.tsx` - Replaced setTimeout with useScrollReveal, 300ms duration, removed animate-ping, staggered right column
- `components/sections/TrustSignals.tsx` - Scroll reveal on header, carousel, staggered cert badges
- `components/sections/TechStack.tsx` - Scroll reveal on header, carousel container, additional info paragraph
- `components/sections/CareerTimeline.tsx` - Scroll reveal header, timeline entries stagger by 80ms
- `components/sections/Projects.tsx` - Scroll reveal header, project rows stagger by 50ms
- `components/sections/Skills.tsx` - Scroll reveal header, categories stagger by 60ms, skills stagger by 30ms within categories
- `components/sections/Process.tsx` - Scroll reveal header, process cards stagger by 50ms, CTA at 250ms delay
- `components/sections/Contact.tsx` - Scroll reveal header, left/right columns with 100ms stagger, removed animate-ping from availability badge

## Decisions Made
- Removed animate-ping entirely from both Hero and Contact status badges (static green dot only) -- most Swiss-restrained approach
- Used callback ref pattern in useScrollReveal for clean observer attachment/detachment lifecycle
- Hero entrance duration changed from 500ms to 300ms per MOTN-03 requirement
- Used inline transitionDelay styles for stagger instead of CSS animation-delay -- works cleanly with conditional opacity/translate classes

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All 8 sections have scroll-triggered entrance animations ready
- useScrollReveal hook established as the animation pattern for the project
- Ready for Plan 06-02 (micro-interactions, hover states, and focus improvements)

---
*Phase: 06-motion-accessibility*
*Completed: 2026-03-16*
