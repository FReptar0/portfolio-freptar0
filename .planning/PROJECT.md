# Fernando Rodriguez Portfolio

## What This Is

Fernando Rodriguez Memije's personal portfolio site, built with Next.js 16 and next-intl. A bilingual (ES/EN) portfolio showcasing senior engineering work through case studies with business narratives and technical deep-dives. The v2.0 milestone is a complete visual identity overhaul — replacing the generic AI-generated design (glass morphism, blue-cyan gradients, Geist font) with a distinctive "Swiss Precision" aesthetic that communicates systems-thinking and premium engineering craft.

## Core Value

The portfolio must visually differentiate Fernando from every other AI-generated developer portfolio — establishing a distinctive, memorable brand through intentional design choices that communicate precision, systems-thinking, and high-value delivery.

## Current Milestone: v2.1 Content Accuracy & Trust

**Goal:** Fix all content accuracy issues, inflated metrics, fabricated certifications, and recruiter-visible trust gaps across the portfolio so every claim is honest and verifiable.

**Target features:**
- Fix Hero metrics: 300+ users impacted, 6+ systems shipped to prod, error/time reduction %
- Rename "Certifications" section to "Technologies" (no fake certs)
- Remove all Spring Boot references from SageConnect (keep in general skills)
- Show team roles without names instead of anonymous team sizes
- Replace $2M value claim with measurable operational impact metric
- Fix SageConnect timeline description (JS/Node.js, not Spring Boot)
- Clarify CarryTrade status (paper trading, not production)
- Address any additional recruiter-visible trust gaps

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

### Active

See REQUIREMENTS.md for v2.1 scoped requirements.

### Out of Scope

- Odoo/Inova case study page — deferred to future milestone
- Blog or articles system — different feature entirely
- Authentication or user accounts — static portfolio site
- CMS integration — content stays in JSON translation files
- Page transitions between routes — complex, defer to v2.1 if desired
- 3D effects or WebGL — over-engineered for a portfolio

## Context

- **Target audience:** Recruiters evaluating for senior engineering roles
- **The problem:** A partner built their portfolio with Claude Code and it looks identical — same blue-cyan gradients, glass morphism, Geist font, centered layouts, gradient text. The current design is the "Claude Code Default Stack" and is not unique.
- **Design direction:** "Swiss Precision" — strict grid system, Space Grotesk/DM Sans typography, black/white/green color system, clean surfaces instead of glass, mathematical spacing, monospace accents for tech credibility, asymmetric layouts, premium feel.
- **Design references:** Swiss Modernism 2.0, Exaggerated Minimalism style, with touches of Dark Premium (premium spacing, warm subtle accents)
- **Locale pattern:** All content in JSON translation files, loaded via i18n.ts
- **Tech stack:** Next.js 16, TypeScript, Tailwind CSS v4 (inline theme), next-intl, Lucide React, Vercel deployment

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
| Swiss Precision design direction | Distinctive, systems-thinker brand; avoids AI-generic patterns | — Pending |
| Space Grotesk + DM Sans + JetBrains Mono | Techy personality + readability + code credibility | — Pending |
| Black/white + electric green accent | High contrast, single accent = Swiss modernist; green = "run/go" developer energy | — Pending |
| Kill glass morphism entirely | #1 AI-generated pattern; clean surfaces with borders instead | — Pending |
| Intersection Observer for scroll animations | No library dependency, native API, progressive enhancement | — Pending |

---
*Last updated: 2026-03-26 after v2.1 milestone start*
