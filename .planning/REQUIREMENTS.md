# Requirements: Fernando Rodriguez Portfolio

**Defined:** 2026-03-14 (v1.0), updated 2026-03-16 (v2.0)
**Core Value:** The portfolio must visually differentiate Fernando from every other AI-generated developer portfolio — distinctive Swiss Precision brand.

## v1.0 Requirements (Complete)

### Case Studies

- [x] **CS-01**: SageSync has a full case study page — v1.0
- [x] **CS-02**: Qardeal has a full case study page — v1.0
- [x] **CS-03**: Gym Manager has a full case study page — v1.0
- [x] **CS-04**: Each new case study has a tech deep-dive page — v1.0
- [x] **CS-05**: All case study pages have proper SEO metadata — v1.0

### Evolution Sections

- [x] **EVO-01**: SageConnect "What's Next" section — v1.0
- [x] **EVO-02**: SageSync "What's Next" section — v1.0
- [x] **EVO-03**: "What's Next" on tech deep-dive pages — v1.0
- [x] **EVO-04**: Extensible whatNext pattern (JSON-only) — v1.0

### Visual Design (v1.0)

- [x] **VIS-01**: Case study visual hierarchy — v1.0
- [x] **VIS-02**: Section separators and spacing — v1.0
- [x] **VIS-03**: Hero gradient backgrounds — v1.0
- [x] **VIS-04**: Metric callout visual distinction — v1.0
- [x] **VIS-05**: Mobile responsive case studies — v1.0

### Discovery

- [x] **DISC-01**: Homepage "View Case Study" links — v1.0
- [x] **DISC-02**: Projects index page — v1.0

### Architecture

- [x] **ARCH-01**: SageConnect diagram Web API update — v1.0

## v2.0 Requirements

### Design Foundation

- [x] **FOUND-01**: Site uses Space Grotesk for headings, DM Sans for body, JetBrains Mono for code/labels — Geist font completely removed
- [x] **FOUND-02**: Color system uses black/white base with single electric green (#22C55E) accent — no blue-cyan gradients anywhere
- [x] **FOUND-03**: All CSS custom properties (globals.css) rebuilt with Swiss clean tokens — glass-morphism variables removed
- [x] **FOUND-04**: Dark mode uses desaturated tonal variants designed independently (not inverted light mode), light mode uses white/off-white surfaces
- [x] **FOUND-05**: Tailwind `@theme inline` block updated with new color/font tokens, all components reference new tokens

### Layout & Components

- [x] **COMP-01**: Hero section is asymmetric and typographic — large type as the statement, no centered gradient blob, no bounce scroll indicator
- [x] **COMP-02**: Navigation uses clean brand mark, no glass-on-scroll effect, visually distinct from generic AI nav patterns
- [x] **COMP-03**: All glass-card and apple-glass usage replaced with clean surfaces (subtle borders, clean backgrounds, no backdrop-blur)
- [x] **COMP-04**: At least 3 sections use asymmetric or varied layouts — not all content center-aligned in identical grids
- [x] **COMP-05**: Projects section uses a distinctive presentation pattern (not tab buttons → detail card)

### Motion & Interaction

- [ ] **MOTN-01**: All major sections use scroll-triggered entrance animations via Intersection Observer with staggered reveals
- [ ] **MOTN-02**: Hover/interaction patterns vary per component type (not uniform translateY(-2px) + border-color on everything)
- [ ] **MOTN-03**: Bounce scroll indicator removed, pulsing status badge made subtle, hero entrance animation reduced to 300-400ms
- [ ] **MOTN-04**: `prefers-reduced-motion` media query disables/reduces all animations site-wide

### Polish & Spacing

- [x] **PLSH-01**: Consistent 8px spacing grid applied — mathematical spacing between all elements, generous section padding
- [x] **PLSH-02**: JetBrains Mono used for tech labels, metrics values, stack badges, and code references throughout
- [x] **PLSH-03**: Bold visual dividers between sections — background color shifts, horizontal rules, or spacing changes that break the uniform rhythm
- [ ] **PLSH-04**: All existing functionality preserved: i18n (EN/ES), case studies, contact form, SEO metadata, navigation

## Future Requirements

### Enhanced Discovery

- **DISC-V2-01**: Filter/search on projects index page by tags or tech stack
- **DISC-V2-02**: Related projects suggestions at bottom of each case study

### Future Case Studies

- **CS-V2-01**: Odoo/Inova case study page

### Page Transitions

- **TRANS-01**: Smooth page transitions between routes (complex, deferred)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Blog / articles system | Different feature entirely |
| CMS integration | Content stays in JSON locale files |
| User auth / accounts | Static portfolio site |
| 3D effects / WebGL | Over-engineered for a portfolio |
| Page transitions | Complex, deferred to v2.1 |
| Heavy animation libraries (Framer Motion, GSAP) | CSS + Intersection Observer sufficient, no bundle bloat |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 4 | Complete |
| FOUND-02 | Phase 4 | Complete |
| FOUND-03 | Phase 4 | Complete |
| FOUND-04 | Phase 4 | Complete |
| FOUND-05 | Phase 4 | Complete |
| COMP-01 | Phase 5 | Complete |
| COMP-02 | Phase 5 | Complete |
| COMP-03 | Phase 5 | Complete |
| COMP-04 | Phase 5 | Complete |
| COMP-05 | Phase 5 | Complete |
| MOTN-01 | Phase 6 | Pending |
| MOTN-02 | Phase 6 | Pending |
| MOTN-03 | Phase 6 | Pending |
| MOTN-04 | Phase 6 | Pending |
| PLSH-01 | Phase 5 | Complete |
| PLSH-02 | Phase 5 | Complete |
| PLSH-03 | Phase 5 | Complete |
| PLSH-04 | Phase 6 | Pending |

**Coverage:**
- v2.0 requirements: 18 total
- Mapped to phases: 18
- Unmapped: 0

---
*Requirements defined: 2026-03-14 (v1.0)*
*Last updated: 2026-03-16 after v2.0 roadmap creation*
