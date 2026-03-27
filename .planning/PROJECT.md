# Fernando Rodriguez Portfolio

## What This Is

Fernando Rodriguez Memije's personal portfolio site, built with Next.js 16 and next-intl. A bilingual (ES/EN) portfolio showcasing senior engineering work through case studies with business narratives and technical deep-dives. Features a distinctive "Swiss Precision" design (Space Grotesk/DM Sans typography, black/white/green color system, clean surfaces, asymmetric layouts) and verified-accurate content — honest metrics, correct tech stacks, and team role attributions across all 7 projects.

## Core Value

The portfolio must visually differentiate Fernando from every other AI-generated developer portfolio — establishing a distinctive, memorable brand through intentional design choices that communicate precision, systems-thinking, and high-value delivery.

## Current State

v2.1 shipped. Portfolio has Swiss Precision design + verified-accurate content. No active milestone.

## Requirements

### Validated

- ✓ Case study route system (`/[locale]/projects/[slug]` + `/tech`) — v1.0
- ✓ SageConnect case study with accurate architecture data — v1.0
- ✓ i18n support for case study content (EN/ES) — v1.0
- ✓ Homepage "View Case Study" integration — v1.0
- ✓ Navigation works from sub-pages (`/${locale}/#section` pattern) — v1.0
- ✓ Architecture diagrams for all 5 projects — v1.0
- ✓ SageSync, Qardeal, Gym Manager case study pages — v1.0
- ✓ Projects index page — v1.0
- ✓ "What's Next" evolution sections — v1.0
- ✓ SEO metadata on all case study pages — v1.0
- ✓ Mobile responsiveness for case study pages — v1.0
- ✓ Honest Hero metrics (6+ Systems, 300+ Users, 99% Error Reduction, 5+ Years) — v2.1
- ✓ "Technologies" section (no fake certifications) — v2.1
- ✓ Spring Boot decoupled from SageConnect across all surfaces — v2.1
- ✓ CarryTrade labeled as paper trading experiment — v2.1
- ✓ Team roles shown instead of anonymous headcounts — v2.1
- ✓ Cross-content tech stack consistency (EN/ES) — v2.1

### Active

(No active milestone — run `/gsd:new-milestone` to start next)

### Out of Scope

- Odoo/Inova case study page — deferred to future milestone
- Blog or articles system — different feature entirely
- Authentication or user accounts — static portfolio site
- CMS integration — content stays in JSON translation files
- Page transitions between routes — complex, defer to future milestone
- 3D effects or WebGL — over-engineered for a portfolio

## Context

- **Target audience:** Recruiters evaluating for senior engineering roles
- **Design direction:** "Swiss Precision" — Space Grotesk/DM Sans typography, black/white/green color system, clean surfaces, asymmetric layouts, mathematical spacing
- **Content accuracy:** All metrics, tech stacks, team attributions, and project statuses verified accurate as of v2.1
- **Locale pattern:** All content in JSON translation files, loaded via i18n.ts
- **Tech stack:** Next.js 16, TypeScript, Tailwind CSS v4 (inline theme), next-intl, Lucide React, Vercel deployment
- **Known v2.0 gap:** Phase 6 has 2 pending requirements (MOTN-02 varied hover patterns, PLSH-04 full functionality preservation check)

## Constraints

- **Tech stack**: Must stay within Next.js/React/Tailwind — no new frameworks or heavy animation libraries
- **i18n**: All user-facing text must remain in both EN and ES locale files
- **SSG**: All pages must remain statically generated
- **Functionality**: All existing features (case studies, navigation, contact form, SEO) must continue working
- **Performance**: No heavy JS animation libraries — use CSS transitions + Intersection Observer
- **Fonts**: Google Fonts only (Space Grotesk, DM Sans, JetBrains Mono) — self-hosted via next/font
- **Design system**: Tailwind CSS v4 with `@theme inline` — no tailwind.config file

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Single caseStudy.json per locale | Simpler i18n.ts config, manageable size | ✓ Good |
| Dynamic [slug] route | Adding case studies only requires content + slug | ✓ Good |
| Pure inline SVG for diagrams | No library dependency, full theme integration | ✓ Good |
| Server components for content | Minimal JS shipped, better SEO | ✓ Good |
| Swiss Precision design direction | Distinctive, systems-thinker brand; avoids AI-generic patterns | ✓ Good |
| Space Grotesk + DM Sans + JetBrains Mono | Techy personality + readability + code credibility | ✓ Good |
| Black/white + electric green accent | High contrast, single accent = Swiss modernist; green = "run/go" developer energy | ✓ Good |
| Kill glass morphism entirely | #1 AI-generated pattern; clean surfaces with borders instead | ✓ Good |
| Intersection Observer for scroll animations | No library dependency, native API, progressive enhancement | ✓ Good |
| Honest metrics over impressive numbers | Recruiter trust > flashy claims; verifiable beats vague | ✓ Good |
| Team roles without personal names | Shows collaboration honestly without requiring teammate consent | ✓ Good |
| Keep Spring Boot in general skills | User has Spring Boot experience from other work, just not SageConnect | ✓ Good |

---
*Last updated: 2026-03-27 after v2.1 milestone*
