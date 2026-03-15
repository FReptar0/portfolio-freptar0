# Phase 3: Evolution and Discovery - Context

**Gathered:** 2026-03-14
**Status:** Ready for planning

<domain>
## Phase Boundary

Add "What's Next" evolution sections to case studies (main + tech pages), create a dedicated `/[locale]/projects` index page listing all case studies, and surface discovery links from the homepage and navigation. The pattern must be extensible via JSON-only — no code changes to add evolution content to future projects.

</domain>

<decisions>
## Implementation Decisions

### Projects index page layout
- Card grid layout, 2-column on desktop (stacks to 1 on mobile)
- Each card shows: title, tagline, 1-2 key metrics, and tech stack tags
- Only the 4 projects with case study pages (SageConnect, SageSync, Qardeal, Gym Manager) — no Odoo
- Simple header with title + subtitle — no gradient mesh hero
- Cards link to the respective case study page (`/[locale]/projects/[slug]`)

### Evolution section on tech pages
- Identical "What's Next" section as the main case study page — same glass card, Rocket icon, purple border, "Active Development" badge
- Placed before the existing CTA section on the tech deep-dive page
- Reuse the same try/catch pattern — renders only if `projects.{slug}.whatNext` exists in JSON

### Evolution extensibility (EVO-04)
- JSON-only — adding evolution content to any project requires only adding `whatNext` keys to caseStudy.json
- No slug registration, no "projectsWithEvolution" Set — the existing try/catch pattern in CaseStudyNarrative handles presence detection
- Same try/catch pattern on the tech page for the new whatNext block

### Homepage discovery links
- "View All Case Studies" link/button in the homepage Projects section header area, linking to `/[locale]/projects`
- Navigation bar gets a "Projects" or "Case Studies" item linking to `/[locale]/projects`
- DISC-01 already satisfied from Phase 2 — all 4 projects already in `projectsWithCaseStudy` Set

### Claude's Discretion
- Exact card styling and gradient treatment on the projects index page
- Navigation item label ("Projects" vs "Case Studies")
- Exact placement/styling of the "View All Case Studies" link within the Projects section
- SageSync whatNext content — EVO-02 needs content (flagged in STATE.md as blocker)

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `CaseStudyNarrative.tsx`: Already has whatNext try/catch block (lines 72-99) — same pattern needed on tech page
- `CaseStudyCTA.tsx`: Existing CTA component used on both main and tech pages
- `projectsWithCaseStudy` Set in `Projects.tsx:34`: Already contains all 4 slugs
- `locales/*/caseStudy.json`: SageConnect already has `whatNext` content with title + paragraphs array
- Glass card design system: `apple-glass rounded-3xl p-8 md:p-12` pattern used throughout

### Established Patterns
- Slug-based routing: `app/[locale]/projects/[slug]/page.tsx` with `VALID_SLUGS` + `generateStaticParams`
- Translation loading: `getTranslations({ locale, namespace })` in server components, `useTranslations()` in client components
- SEO metadata: `generateMetadata` derives title/description from translation keys
- Navigation: `components/ui/Navigation.tsx` uses `/${locale}/#section` pattern for cross-page compatibility

### Integration Points
- New route file: `app/[locale]/projects/page.tsx` for the index page
- Navigation.tsx: Add "Projects" link pointing to `/[locale]/projects`
- Projects.tsx: Add "View All Case Studies" link in section header
- Tech page (`app/[locale]/projects/[slug]/tech/page.tsx`): Add whatNext block before CTA
- `locales/*/caseStudy.json`: Add `whatNext` content for SageSync (EVO-02)

</code_context>

<specifics>
## Specific Ideas

- Projects index page cards should feel consistent with the existing case study hero cards — glass morphism, gradient accents
- The whatNext section on tech pages should be visually identical to the main page version — same purple border, Rocket icon, "Active Development" badge
- Navigation link should work from any page (same cross-page compat pattern as existing nav items)

</specifics>

<deferred>
## Deferred Ideas

- Odoo/Inova case study page — CS-V2-01, not part of this milestone
- Filter/search on projects index page by tags — DISC-V2-01
- Related projects suggestions at bottom of case studies — DISC-V2-02

</deferred>

---

*Phase: 03-evolution-and-discovery*
*Context gathered: 2026-03-14*
