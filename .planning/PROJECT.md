# Portfolio Case Study System

## What This Is

Fernando Rodriguez Memije's personal portfolio site, built with Next.js 16 and next-intl. The current milestone focuses on creating compelling, recruiter-focused case study pages for each project, with business narratives and technical deep-dives. The system is designed to be easily extensible — adding a new case study requires only JSON content, a slug entry, and a diagram component.

## Core Value

Each case study must tell a clear business story (Problem → Solution → Impact) backed by strong technical depth — giving recruiters confidence in both business thinking and engineering craft.

## Requirements

### Validated

- ✓ Case study route system (`/[locale]/projects/[slug]` + `/tech`) — existing
- ✓ SageConnect case study with accurate architecture data — existing
- ✓ i18n support for case study content (EN/ES) — existing
- ✓ Homepage "View Case Study" integration — existing
- ✓ Navigation works from sub-pages (`/${locale}/#section` pattern) — existing
- ✓ Architecture diagrams for all 5 projects — existing
- ✓ CLAUDE.md project documentation — existing
- ✓ Codebase mapped (.planning/codebase/) — existing

### Active

- [ ] Add SageSync, Qardeal, Gym Manager as full case study pages
- [ ] Create dedicated `/projects` index page listing all case studies
- [ ] Improve case study page visual weight — current `/sageconnect` is too text-heavy, needs better visual hierarchy, spacing, and emphasis on key content
- [ ] Fix "What's Next" / evolution CTA to also appear on tech deep-dive page, not just main case study
- [ ] Update SageConnect diagram to show Sage 300 Web API replacing the exe (CFDI Importer node → Web API integration)
- [ ] Add SageSync "What's Next" evolution section
- [ ] Make "whatNext" pattern easily extensible for future projects
- [ ] Modern minimal diagram styling across all 5 diagrams (Vercel/Linear docs aesthetic)
- [ ] Ensure all case study pages have proper SEO metadata
- [ ] Mobile responsiveness for case study pages and diagrams

### Out of Scope

- Odoo/Inova case study page — not included in this milestone, content already in JSON for future
- Blog or articles system — different feature entirely
- Authentication or user accounts — static portfolio site
- CMS integration — content stays in JSON translation files

## Context

- **Target audience:** Recruiters evaluating for senior engineering roles — need to see both business impact and technical depth equally weighted
- **Existing system:** SageConnect case study is live but text-heavy. 5 architecture diagrams exist but were recently redesigned for modern minimal style.
- **SageConnect evolution:** Migrating from black-box Windows exe (ImportaFacturasFocaltec.exe) to Sage 300 REST Web API. This eliminates Windows dependency and enables granular error handling. The diagram should reflect this future state.
- **SageSync evolution:** Has upcoming work (details to be gathered)
- **Locale pattern:** All content in `locales/{locale}/caseStudy.json` under `projects.{slug}`. Adding a project = add JSON content + slug to VALID_SLUGS array + diagram component + register in TechDeepDive.tsx
- **Tech stack:** Next.js 16, TypeScript, Tailwind CSS v4, next-intl, Lucide React, Vercel deployment

## Constraints

- **Tech stack**: Must stay within Next.js/React/Tailwind — no new frameworks
- **i18n**: All user-facing text must be in both EN and ES locale files
- **SSG**: All case study pages must be statically generated (generateStaticParams)
- **Performance**: Diagrams are inline SVG — no external charting libraries
- **Design consistency**: Must match existing glass-morphism/gradient design system

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Single caseStudy.json per locale (not per-project) | Simpler i18n.ts config, manageable size for 5 projects | — Pending |
| Dynamic [slug] route instead of hardcoded routes | Adding case studies only requires content + slug registration | ✓ Good |
| Pure inline SVG for diagrams | No library dependency, full theme integration, dark mode via CSS vars | ✓ Good |
| Server components for content, client only for interactive | Minimal JS shipped, better SEO | ✓ Good |
| "whatNext" section as optional (try/catch in component) | Not all projects have evolution stories — graceful fallback | — Pending |
| Dedicated /projects index page | Recruiters can browse all case studies without scrolling homepage | — Pending |

---
*Last updated: 2026-03-14 after initialization*
