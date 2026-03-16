# Roadmap: Portfolio Case Study System

## Overview

This milestone expands the existing SageConnect case study system into a full portfolio showcase covering four projects. Work proceeds in three phases: first fixing the visual and accuracy baseline on the existing case study, then building out all new case study pages, then layering evolution narratives and discovery surfaces that tie everything together for a recruiter audience.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (1.1, 1.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Visual Foundation** - Fix the SageConnect baseline — visual hierarchy, diagram accuracy, and mobile responsiveness across all existing case study UI (completed 2026-03-15)
- [x] **Phase 2: New Case Studies** - Add SageSync, Qardeal, and Gym Manager as full case study pages with tech deep-dives and SEO (completed 2026-03-15)
- [x] **Phase 3: Evolution and Discovery** - Add "What's Next" evolution sections to case studies, surface all case studies via homepage links and a dedicated projects index page (completed 2026-03-16)

## Phase Details

### Phase 1: Visual Foundation
**Goal**: The existing SageConnect case study looks polished enough to represent the portfolio — strong visual hierarchy, accurate architecture diagram, and responsive on mobile
**Depends on**: Nothing (first phase)
**Requirements**: VIS-01, VIS-02, VIS-03, VIS-04, VIS-05, ARCH-01
**Success Criteria** (what must be TRUE):
  1. A recruiter viewing `/projects/sageconnect` on desktop sees clear visual hierarchy — metrics, tags, and role are visually distinct from body text, not a wall of paragraphs
  2. A recruiter viewing `/projects/sageconnect` on a phone can read all content and diagrams scale or scroll horizontally without breaking layout
  3. The SageConnect architecture diagram shows the Sage 300 Web API node replacing the legacy exe node — the planned migration is represented accurately
  4. Section transitions use spacing, subtle backgrounds, or separators so the narrative does not feel like one continuous block of text
  5. Metric callouts have visual distinction (size, color, or card treatment) that draws the eye immediately
**Plans:** 3/3 plans complete

Plans:
- [x] 01-01-PLAN.md — Visual polish: hero gradient background, text hierarchy, section separators
- [x] 01-02-PLAN.md — Diagram fix: replace CFDI Importer with Sage 300 Web API, add mobile scroll wrapper
- [x] 01-03-PLAN.md — Visual verification checkpoint: human review of all requirements on desktop and mobile

### Phase 2: New Case Studies
**Goal**: SageSync, Qardeal, and Gym Manager each have a live case study page and tech deep-dive reachable at their respective slugs, with content in both EN and ES and proper SEO metadata
**Depends on**: Phase 1
**Requirements**: CS-01, CS-02, CS-03, CS-04, CS-05
**Success Criteria** (what must be TRUE):
  1. Navigating to `/en/projects/sagesync`, `/en/projects/cardeal`, and `/en/projects/gymmanager` each renders a Problem/Solution/Impact narrative page — no 404
  2. Each of the three new projects has a working `/tech` deep-dive page with architecture diagram, data flow description, code patterns, and system metrics
  3. The Spanish equivalent of each route (`/es/projects/[slug]` and `/es/projects/[slug]/tech`) renders fully translated content — no English strings appearing in ES locale
  4. Each new case study page has a unique `<title>` and meta description visible in page source for both EN and ES
**Plans:** 1/1 plans complete

Plans:
- [ ] 02-01-PLAN.md — Register new slugs in routing, fix Qardeal metric, enable homepage discovery links

### Phase 3: Evolution and Discovery
**Goal**: Recruiters can browse all case studies from one index page, see "What's Next" evolution narratives on relevant projects, and the pattern is extensible without code changes
**Depends on**: Phase 2
**Requirements**: EVO-01, EVO-02, EVO-03, EVO-04, DISC-01, DISC-02
**Success Criteria** (what must be TRUE):
  1. The SageConnect main case study page and its `/tech` page both show a "What's Next" section describing the exe-to-Web-API migration
  2. The SageSync case study shows a "What's Next" section describing its planned evolution
  3. Navigating to `/en/projects` shows a page listing all four case studies (SageConnect, SageSync, Qardeal, Gym Manager) with cards, tags, and clickable links to each
  4. The homepage Projects section shows a "View Case Study" link for all four projects with case study pages
  5. Adding evolution content to any future project requires only adding JSON keys — no React component changes needed
**Plans:** 3/3 plans complete

Plans:
- [ ] 03-01-PLAN.md — Evolution sections: SageSync whatNext content + tech page whatNext block
- [ ] 03-02-PLAN.md — Discovery: projects index page + navigation link + homepage "View All" link
- [ ] 03-03-PLAN.md — Visual verification checkpoint: human review of all Phase 3 requirements

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Visual Foundation | 3/3 | Complete    | 2026-03-15 |
| 2. New Case Studies | 1/1 | Complete   | 2026-03-15 |
| 3. Evolution and Discovery | 3/3 | Complete   | 2026-03-16 |
