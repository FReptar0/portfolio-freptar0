# Roadmap: Fernando Rodriguez Portfolio

## Milestones

- ✅ **v1.0 Case Study System** - Phases 1-3 (shipped 2026-03-16)
- 🚧 **v2.0 Swiss Precision Redesign** - Phases 4-6 (in progress)

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3...): Planned milestone work
- Decimal phases (4.1, 4.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

<details>
<summary>✅ v1.0 Case Study System (Phases 1-3) - SHIPPED 2026-03-16</summary>

### Phase 1: Visual Foundation
**Goal**: The existing SageConnect case study looks polished enough to represent the portfolio
**Plans:** 3/3 plans complete

Plans:
- [x] 01-01-PLAN.md — Visual polish: hero gradient background, text hierarchy, section separators
- [x] 01-02-PLAN.md — Diagram fix: replace CFDI Importer with Sage 300 Web API, add mobile scroll wrapper
- [x] 01-03-PLAN.md — Visual verification checkpoint

### Phase 2: New Case Studies
**Goal**: SageSync, Qardeal, and Gym Manager each have live case study pages
**Plans:** 1/1 plans complete

Plans:
- [x] 02-01-PLAN.md — Register new slugs, fix Qardeal metric, enable homepage links

### Phase 3: Evolution and Discovery
**Goal**: Recruiters can browse all case studies from one index page with evolution narratives
**Plans:** 3/3 plans complete

Plans:
- [x] 03-01-PLAN.md — Evolution sections
- [x] 03-02-PLAN.md — Discovery: projects index page
- [x] 03-03-PLAN.md — Visual verification checkpoint

</details>

### 🚧 v2.0 Swiss Precision Redesign (In Progress)

**Milestone Goal:** Replace the generic Claude Code design defaults with a distinctive Swiss Modernist visual identity — new typography, color system, layout patterns, and interaction design that no other AI portfolio has.

- [x] **Phase 4: Design Tokens & Typography** - Replace fonts, colors, CSS custom properties, dark mode tokens, and Tailwind theme — the visual DNA everything else builds on (completed 2026-03-16)
- [x] **Phase 5: Component Overhaul** - Rebuild Hero, Navigation, cards, layouts, and Projects section with Swiss design language; kill all glass morphism; apply premium spacing and visual rhythm (completed 2026-03-16)
- [ ] **Phase 6: Motion & Accessibility** - Add scroll-triggered animations, varied hover interactions, clean up bouncy defaults, and ensure reduced-motion support site-wide

## Phase Details

### Phase 4: Design Tokens & Typography
**Goal**: The site renders with its new visual identity — Swiss typography, black/white/green color system, clean dark mode — while all existing content and functionality continues working unchanged
**Depends on**: Phase 3 (v1.0 complete)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05
**Success Criteria** (what must be TRUE):
  1. Every page displays headings in Space Grotesk, body text in DM Sans, and code/labels in JetBrains Mono — no Geist font renders anywhere
  2. No blue or cyan gradient appears anywhere on the site — the only accent color visible is electric green (#22C55E or its tonal variants)
  3. Switching to dark mode shows a deliberately designed dark palette (not simply inverted light mode) — surfaces, text, and accents all feel intentional
  4. All existing pages load without errors, all links work, both EN and ES locales render correct content, and the build completes with no failures
**Plans:** 2/2 plans complete

Plans:
- [x] 04-01-PLAN.md — Replace fonts (Geist to Space Grotesk/DM Sans/JetBrains Mono) and rebuild all CSS custom properties with Swiss design tokens
- [x] 04-02-PLAN.md — Update Tailwind @theme inline block and verify production build

### Phase 5: Component Overhaul
**Goal**: Every section of the site uses the new Swiss design language — clean surfaces, asymmetric layouts, distinctive component patterns, premium spacing, and monospace accents — with zero glass morphism remaining
**Depends on**: Phase 4
**Requirements**: COMP-01, COMP-02, COMP-03, COMP-04, COMP-05, PLSH-01, PLSH-02, PLSH-03
**Success Criteria** (what must be TRUE):
  1. The Hero section uses large typographic statement with asymmetric layout — no centered gradient blob, no bounce scroll indicator
  2. Searching the codebase for "apple-glass", "glass-card", and "backdrop-blur" returns zero results — all cards use clean surfaces with subtle borders
  3. The Navigation shows a clean brand mark and does not use glass-on-scroll transparency effects
  4. At least 3 homepage sections break the center-aligned identical-grid pattern with asymmetric or varied layouts, and the Projects section uses a presentation pattern distinct from tab-buttons-to-detail-card
  5. Sections are separated by visible rhythm breaks (background color shifts, horizontal rules, or spacing changes), all spacing follows an 8px grid, and JetBrains Mono is used for tech labels, metrics, and stack badges throughout
**Plans:** 3/3 plans complete

Plans:
- [x] 05-01-PLAN.md — Hero redesign + Navigation rebuild + section divider CSS utilities
- [x] 05-02-PLAN.md — Global glass morphism removal + 8px spacing grid + JetBrains Mono accents across all components
- [x] 05-03-PLAN.md — Projects section rethink + asymmetric layouts for Skills/Timeline + alternating section backgrounds

### Phase 6: Motion & Accessibility
**Goal**: The site feels alive with purposeful scroll-triggered animations and varied interactions, while respecting users who prefer reduced motion — and all existing functionality remains intact as a final verification
**Depends on**: Phase 5
**Requirements**: MOTN-01, MOTN-02, MOTN-03, MOTN-04, PLSH-04
**Success Criteria** (what must be TRUE):
  1. Scrolling down the homepage triggers staggered entrance animations on each major section via Intersection Observer — elements animate in as they enter the viewport
  2. Different component types have distinct hover/interaction patterns (not uniform translateY(-2px) + border-color everywhere)
  3. The bounce scroll indicator is gone, the status badge pulse is subtle, and the hero entrance animation completes within 300-400ms
  4. Enabling "prefers-reduced-motion" in browser/OS settings disables or significantly reduces all animations site-wide
  5. Full regression check passes: i18n toggles between EN/ES correctly, all case study routes load, contact form works, SEO metadata is present, navigation works from every page
**Plans:** 2 plans

Plans:
- [ ] 06-01-PLAN.md — Create useScrollReveal hook + reduced-motion CSS + integrate scroll-triggered animations into all 8 homepage sections + fix Hero anti-patterns
- [ ] 06-02-PLAN.md — Varied hover/interaction patterns per component type + full regression verification checkpoint

## Progress

**Execution Order:**
Phases execute in numeric order: 4 → 5 → 6

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Visual Foundation | v1.0 | 3/3 | Complete | 2026-03-15 |
| 2. New Case Studies | v1.0 | 1/1 | Complete | 2026-03-15 |
| 3. Evolution and Discovery | v1.0 | 3/3 | Complete | 2026-03-16 |
| 4. Design Tokens & Typography | v2.0 | 2/2 | Complete | 2026-03-16 |
| 5. Component Overhaul | v2.0 | 3/3 | Complete | 2026-03-16 |
| 6. Motion & Accessibility | v2.0 | 0/2 | Not started | - |
