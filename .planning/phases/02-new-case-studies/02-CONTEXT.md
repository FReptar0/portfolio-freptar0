# Phase 2: New Case Studies - Context

**Gathered:** 2026-03-14
**Status:** Ready for planning

<domain>
## Phase Boundary

Add SageSync, Qardeal, and Gym Manager as full case study pages with tech deep-dives, bilingual content (EN/ES), and SEO metadata. All content and diagram components already exist — this phase wires them into the routing system and fixes one metric.

</domain>

<decisions>
## Implementation Decisions

### Diagram accuracy
- Claude's discretion — use existing SageSyncDiagram, QardealDiagram, and GymManagerDiagram as-is
- Fix obvious issues if found during implementation

### Content accuracy
- Qardeal booking conversion metric: change from "35% increase" / "35% aumento" to "45% increase" / "45% aumento" in both EN and ES locale files
- All other metrics across SageSync, Qardeal, and GymManager are accurate — no changes needed

### Project privacy
- SageSync keeps its public GitHub URL (https://github.com/FReptar0/sagesync) — shows "View Code"
- Qardeal and GymManager remain private (empty githubUrl) — show "Private" badge
- SageConnect remains private (already set in Phase 1)

### Visual consistency
- All three new case studies use the identical layout as SageConnect
- Same hero with gradient mesh background
- Same metrics grid with gradient text
- Same narrative section structure with separators
- Same CTA sections on both case study and tech pages
- No per-project visual customization

### Claude's Discretion
- Any minor diagram corrections if obvious issues are found
- Order of slug registration in VALID_SLUGS array

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `CaseStudyHero`, `CaseStudyNarrative`, `MetricsGrid`, `TechStackBar`, `CaseStudyCTA`, `TechDeepDive`: All fully generic — driven by slug prop + caseStudy JSON namespace
- `SageSyncDiagram.tsx`, `QardealDiagram.tsx`, `GymManagerDiagram.tsx`: SVG diagram components already exist
- `TechDeepDive.tsx` diagrams map: Already registers all 5 diagram components (sageconnect, sagesync, cardeal, odoo, gymmanager)
- `locales/en/caseStudy.json` and `locales/es/caseStudy.json`: Full content for all projects already present

### Established Patterns
- Slug-based routing: `app/[locale]/projects/[slug]/page.tsx` with `VALID_SLUGS` array
- Translation loading: `getTranslations({ locale, namespace: 'caseStudy' })` in server components
- SEO metadata: `generateMetadata` uses `projects.${slug}.headline` and `projects.${slug}.tagline`
- Case study link from homepage: `projectsWithCaseStudy` Set in `Projects.tsx`

### Integration Points
- `VALID_SLUGS` in `app/[locale]/projects/[slug]/page.tsx` — add 'sagesync', 'cardeal', 'gymmanager'
- `VALID_SLUGS` in `app/[locale]/projects/[slug]/tech/page.tsx` — same additions
- `projectsWithCaseStudy` Set in `components/sections/Projects.tsx` — add all three slugs
- `generateStaticParams` — automatically picks up new slugs from VALID_SLUGS

</code_context>

<specifics>
## Specific Ideas

- Qardeal metric label should say "Rental Increase" or similar (currently "Booking Conversion" in EN, "Conversión de Reservas" in ES) — the value changes to "45% increase" / "45% aumento"

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-new-case-studies*
*Context gathered: 2026-03-14*
