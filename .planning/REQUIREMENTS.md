# Requirements: Portfolio Case Study System

**Defined:** 2026-03-14
**Core Value:** Each case study tells a clear business story backed by strong technical depth — giving recruiters confidence in both business thinking and engineering craft.

## v1 Requirements

### Case Studies

- [ ] **CS-01**: SageSync has a full case study page at `/[locale]/projects/sagesync` with Problem/Solution/Impact narrative
- [ ] **CS-02**: Qardeal has a full case study page at `/[locale]/projects/cardeal` with Problem/Solution/Impact narrative
- [ ] **CS-03**: Gym Manager has a full case study page at `/[locale]/projects/gymmanager` with Problem/Solution/Impact narrative
- [ ] **CS-04**: Each new case study has a tech deep-dive page at `/[locale]/projects/[slug]/tech` with architecture diagram, data flow, code patterns, and system metrics
- [ ] **CS-05**: All new case study pages have proper SEO metadata (title, description) in both locales

### Evolution Sections

- [ ] **EVO-01**: SageConnect case study shows "What's Next" section describing exe → Web API migration (main page)
- [ ] **EVO-02**: SageSync case study shows "What's Next" evolution section
- [ ] **EVO-03**: "What's Next" section and evolution CTA appear on tech deep-dive pages, not just main case study pages
- [ ] **EVO-04**: "whatNext" pattern is extensible — adding evolution content to any project requires only JSON content, no code changes

### Visual Design

- [ ] **VIS-01**: Case study pages have clear visual hierarchy — not a wall of text. Key content (metrics, role, tags) has visual emphasis
- [ ] **VIS-02**: Section separators, subtle backgrounds, and spacing create visual breathing room between narrative sections
- [ ] **VIS-03**: Hero sections have visual weight with gradient backgrounds or subtle imagery
- [ ] **VIS-04**: Metric callouts are prominently displayed with clear visual distinction
- [x] **VIS-05**: All case study pages and diagrams are mobile responsive — diagrams scale, layouts stack vertically

### Discovery

- [ ] **DISC-01**: Homepage Projects section shows "View Case Study" link for all projects that have case study pages (SageConnect, SageSync, Qardeal, Gym Manager)
- [ ] **DISC-02**: Dedicated `/[locale]/projects` index page lists all available case studies with project cards, tags, and links

### Architecture Accuracy

- [x] **ARCH-01**: SageConnect diagram updated to show Sage 300 Web API replacing the CFDI Importer exe — reflects the planned architecture migration

## v2 Requirements

### Future Case Studies

- **CS-V2-01**: Odoo/Inova case study page (content already exists in JSON, needs slug registration and potential evolution section)

### Enhanced Discovery

- **DISC-V2-01**: Filter/search on projects index page by tags or tech stack
- **DISC-V2-02**: Related projects suggestions at bottom of each case study

### Analytics

- **AN-V2-01**: Track case study page views and engagement per project

## Out of Scope

| Feature | Reason |
|---------|--------|
| Blog / articles system | Different feature, not part of case study milestone |
| CMS integration | Content stays in JSON locale files — simple, version-controlled |
| User auth / accounts | Static portfolio site |
| Animated diagram interactions | Modern minimal style — keep diagrams clean, not flashy |
| Video / media embeds in case studies | Text + diagrams sufficient for recruiter audience |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| VIS-01 | Phase 1 | Pending |
| VIS-02 | Phase 1 | Pending |
| VIS-03 | Phase 1 | Pending |
| VIS-04 | Phase 1 | Pending |
| VIS-05 | Phase 1 | Complete |
| ARCH-01 | Phase 1 | Complete |
| CS-01 | Phase 2 | Pending |
| CS-02 | Phase 2 | Pending |
| CS-03 | Phase 2 | Pending |
| CS-04 | Phase 2 | Pending |
| CS-05 | Phase 2 | Pending |
| EVO-01 | Phase 3 | Pending |
| EVO-02 | Phase 3 | Pending |
| EVO-03 | Phase 3 | Pending |
| EVO-04 | Phase 3 | Pending |
| DISC-01 | Phase 3 | Pending |
| DISC-02 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 17 total
- Mapped to phases: 17
- Unmapped: 0 (complete)

---
*Requirements defined: 2026-03-14*
*Last updated: 2026-03-14 — traceability mapped after roadmap creation*
