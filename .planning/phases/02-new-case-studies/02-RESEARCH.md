# Phase 2: New Case Studies - Research

**Researched:** 2026-03-14
**Domain:** Next.js App Router slug routing, next-intl i18n, static site generation
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **Diagram accuracy:** Use existing SageSyncDiagram, QardealDiagram, and GymManagerDiagram as-is. Fix obvious issues only if found during implementation.
- **Content accuracy:** Qardeal booking conversion metric changes from "35% increase" / "35% aumento" to "45% increase" / "45% aumento" in both EN and ES locale files. All other metrics across SageSync, Qardeal, and GymManager are accurate — no changes needed.
- **Project privacy:** SageSync keeps its public GitHub URL (https://github.com/FReptar0/sagesync) — shows "View Code". Qardeal and GymManager remain private (empty githubUrl) — show "Private" badge. SageConnect remains private (already set in Phase 1).
- **Visual consistency:** All three new case studies use the identical layout as SageConnect. Same hero with gradient mesh background. Same metrics grid with gradient text. Same narrative section structure with separators. Same CTA sections on both case study and tech pages. No per-project visual customization.

### Claude's Discretion
- Any minor diagram corrections if obvious issues are found
- Order of slug registration in VALID_SLUGS array

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CS-01 | SageSync has a full case study page at `/[locale]/projects/sagesync` with Problem/Solution/Impact narrative | Slug 'sagesync' added to VALID_SLUGS in case study page.tsx; all JSON content already present |
| CS-02 | Qardeal has a full case study page at `/[locale]/projects/cardeal` with Problem/Solution/Impact narrative | Slug 'cardeal' added to VALID_SLUGS in case study page.tsx; all JSON content already present |
| CS-03 | Gym Manager has a full case study page at `/[locale]/projects/gymmanager` with Problem/Solution/Impact narrative | Slug 'gymmanager' added to VALID_SLUGS in case study page.tsx; all JSON content already present |
| CS-04 | Each new case study has a tech deep-dive page at `/[locale]/projects/[slug]/tech` with architecture diagram, data flow, code patterns, and system metrics | Same slugs added to VALID_SLUGS in tech/page.tsx; TechDeepDive already maps all three diagrams |
| CS-05 | All new case study pages have proper SEO metadata (title, description) in both locales | generateMetadata in both page.tsx files already derives title/description from caseStudy JSON via slug; no new code needed |
</phase_requirements>

## Summary

Phase 2 is almost entirely a wiring phase. All assets — content JSON, diagram components, generic page components, and i18n loader — were built in Phase 1. The work is precisely three categories: (1) add three slugs to two VALID_SLUGS arrays, (2) fix one metric value in two locale files, and (3) add three slugs to the `projectsWithCaseStudy` Set so homepage cards show "View Case Study" links.

The routing system (`generateStaticParams`) automatically generates all locale/slug combinations from VALID_SLUGS — no new params or page files needed. SEO metadata derives from `projects.${slug}.headline` and `projects.${slug}.tagline`, which are present in both locale files. TechDeepDive already registers all five diagrams (sagesync, cardeal, gymmanager, sageconnect, odoo) via dynamic imports.

**Primary recommendation:** Execute three targeted file edits. Do not touch any component files unless a diagram issue is found during inspection.

## Standard Stack

### Core (already in project, no installation required)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js App Router | 16.x | File-based routing with `generateStaticParams` | SSG for locale/slug pairs |
| next-intl | current | `getTranslations({ locale, namespace })` in server components | Already powers SageConnect |
| TypeScript | current | `as const` arrays for VALID_SLUGS type narrowing | Already in place |

### No New Dependencies
This phase requires zero new package installations. Every library needed is already installed and configured.

## Architecture Patterns

### Recommended Project Structure

No new directories or files are created. All changes are edits to existing files:

```
app/[locale]/projects/[slug]/page.tsx       ← edit: VALID_SLUGS
app/[locale]/projects/[slug]/tech/page.tsx  ← edit: VALID_SLUGS
components/sections/Projects.tsx            ← edit: projectsWithCaseStudy Set
locales/en/caseStudy.json                   ← edit: Qardeal metric value
locales/es/caseStudy.json                   ← edit: Qardeal metric value
```

### Pattern 1: VALID_SLUGS Type-Safe Array

**What:** A `const` array that simultaneously drives `generateStaticParams` (SSG), route validation via `notFound()`, and type checking.

**When to use:** Every time a new slug is activated.

**Current state (both page files):**
```typescript
// Source: app/[locale]/projects/[slug]/page.tsx (line 13)
const VALID_SLUGS = ['sageconnect'] as const;
```

**Target state after Phase 2:**
```typescript
const VALID_SLUGS = ['sageconnect', 'sagesync', 'cardeal', 'gymmanager'] as const;
```

The `as const` assertion ensures the array element type narrows to string literals. The `notFound()` guard uses `VALID_SLUGS.includes(slug as (typeof VALID_SLUGS)[number])` — this type cast is required because TypeScript narrows the `slug` param to `string`, not the union literal type. This pattern is identical in both `page.tsx` and `tech/page.tsx`.

### Pattern 2: generateStaticParams — Automatic

**What:** `locales.flatMap((locale) => VALID_SLUGS.map((slug) => ({ locale, slug })))` generates all locale/slug combinations.

**Impact of adding 3 slugs to VALID_SLUGS with 2 locales (`es`, `en`):** Adds 6 new static routes per route file (12 total across both page files).

**No code change needed** — `generateStaticParams` reads VALID_SLUGS directly.

### Pattern 3: generateMetadata — Slug-Based

**What:** Both `page.tsx` and `tech/page.tsx` use `t(`projects.${slug}.headline`)` and `t(`projects.${slug}.tagline`)` to produce the `<title>` and `<meta name="description">`.

**Verification:** All three new slugs have `headline` and `tagline` keys in both `locales/en/caseStudy.json` and `locales/es/caseStudy.json`. SEO metadata works automatically once slugs are in VALID_SLUGS.

### Pattern 4: Homepage Discovery Link

**What:** `projectsWithCaseStudy` is a `Set<string>` in `components/sections/Projects.tsx`. When a project's `id` is in the set, the "View Case Study" link renders.

**Current state (line 34):**
```typescript
// Source: components/sections/Projects.tsx (line 34)
const projectsWithCaseStudy = new Set(['sageconnect']);
```

**Target state:**
```typescript
const projectsWithCaseStudy = new Set(['sageconnect', 'sagesync', 'cardeal', 'gymmanager']);
```

The project IDs in the `projects` array match the slugs exactly (`sagesync`, `cardeal`, `gymmanager`), so no ID/slug mismatch risk exists.

### Pattern 5: Metric Value Edit (Qardeal)

**What:** The Qardeal "35%" booking conversion metric must change to "45%".

**EN location** (`locales/en/caseStudy.json`, `projects.cardeal.metrics[1]`):
```json
{ "value": "35%", "label": "More Bookings" }
```
Changes to:
```json
{ "value": "45%", "label": "More Bookings" }
```

**ES location** (`locales/es/caseStudy.json`, `projects.cardeal.metrics[1]`):
```json
{ "value": "35%", "label": "Más Reservas" }
```
Changes to:
```json
{ "value": "45%", "label": "Más Reservas" }
```

Impact paragraphs in both locales also reference "35%" in prose text and will need updating to match. EN impact paragraph 1 contains: `"Conversion rates improved by 35%"`. ES impact paragraph 1 contains: `"Las tasas de conversión mejoraron un 35%"`.

### Anti-Patterns to Avoid

- **Creating new page components:** All page logic is generic — driven by slug. Never duplicate `page.tsx` per project.
- **Hardcoding content in components:** All content stays in `locales/*/caseStudy.json`.
- **Modifying `i18n.ts`:** The `caseStudy` namespace is already loaded. No change needed.
- **Forgetting the tech page VALID_SLUGS:** There are two separate VALID_SLUGS arrays — one in `page.tsx` and one in `tech/page.tsx`. Both must be updated for CS-04.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| SEO per-slug metadata | Custom metadata function | Existing `generateMetadata` pattern | Already derives from `projects.${slug}.headline/tagline` |
| Diagram loading | Eager imports | Existing dynamic imports in `TechDeepDive.tsx` | Prevents diagram code from bloating main bundle |
| Route validation | Custom middleware | Existing `notFound()` guard pattern | Works with static generation + runtime validation |

**Key insight:** This phase is deliberately a wiring exercise. The system was built generically in Phase 1 to handle any valid slug. Adding slugs to VALID_SLUGS is the entire activation mechanism.

## Common Pitfalls

### Pitfall 1: Updating Only One VALID_SLUGS Array

**What goes wrong:** Case study main page works (`/projects/sagesync`) but tech page 404s (`/projects/sagesync/tech`), or vice versa.
**Why it happens:** Two separate files each have their own `VALID_SLUGS` constant — `page.tsx` and `tech/page.tsx` are independent route files.
**How to avoid:** Always treat VALID_SLUGS as a pair. Update both files in the same edit.
**Warning signs:** One route works, the other returns 404.

### Pitfall 2: Forgetting the Qardeal Prose Text "35%" Reference

**What goes wrong:** Metric card shows "45%" but the narrative paragraph still says "35%", creating a visible contradiction.
**Why it happens:** The metric value and the impact prose are separate JSON keys. Fixing one without the other leaves inconsistency.
**How to avoid:** Search both locale files for "35%" after editing the metric — update EN impact.paragraphs[0] and ES impact.paragraphs[0].
**Warning signs:** MetricsGrid shows 45%, CaseStudyNarrative impact section shows 35%.

### Pitfall 3: Homepage Link for Wrong Slug Key

**What goes wrong:** "View Case Study" link renders for sagesync but routes to a 404 because the Set uses a mismatched ID.
**Why it happens:** If the project `id` in the `projects` array does not match the slug in VALID_SLUGS, the Set check passes but the link destination 404s.
**How to avoid:** Confirm the IDs in the `Projects.tsx` `projects` array match the slugs exactly. All three (`sagesync`, `cardeal`, `gymmanager`) already match.
**Warning signs:** Link appears but clicking returns 404.

### Pitfall 4: TypeScript Type Error on VALID_SLUGS includes() Call

**What goes wrong:** Adding a new string to VALID_SLUGS triggers a type error on the `notFound()` guard if the cast is removed.
**Why it happens:** `slug` from params is typed as `string`, not the literal union from the `as const` array. The cast `slug as (typeof VALID_SLUGS)[number]` bridges this.
**How to avoid:** Keep the existing cast pattern intact. Only append to the string literal list.

## Code Examples

### VALID_SLUGS Update (identical pattern for both route files)

```typescript
// Source: app/[locale]/projects/[slug]/page.tsx (current line 13)
// Same pattern in app/[locale]/projects/[slug]/tech/page.tsx (current line 12)
const VALID_SLUGS = ['sageconnect', 'sagesync', 'cardeal', 'gymmanager'] as const;
```

### projectsWithCaseStudy Update

```typescript
// Source: components/sections/Projects.tsx (current line 34)
const projectsWithCaseStudy = new Set(['sageconnect', 'sagesync', 'cardeal', 'gymmanager']);
```

### Qardeal Metric Fix (EN)

```json
// Source: locales/en/caseStudy.json — projects.cardeal.metrics[1]
{ "value": "45%", "label": "More Bookings" }

// Source: locales/en/caseStudy.json — projects.cardeal.impact.paragraphs[0]
"The platform launched in 4 months, immediately capturing online bookings. Conversion rates improved by 45% compared to the phone-based process, with 99.2% payment success rate."
```

### Qardeal Metric Fix (ES)

```json
// Source: locales/es/caseStudy.json — projects.cardeal.metrics[1]
{ "value": "45%", "label": "Más Reservas" }

// Source: locales/es/caseStudy.json — projects.cardeal.impact.paragraphs[0]
"La plataforma se lanzó en 4 meses, capturando reservas en línea inmediatamente. Las tasas de conversión mejoraron un 45% comparado con el proceso telefónico, con 99.2% de éxito en transacciones de pago."
```

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| Per-project page file | Slug-based generic `page.tsx` | Adding a project = 1 VALID_SLUGS entry, not a new file |
| Separate translation namespace per page | Single `caseStudy` namespace for all case studies | All content in one JSON file, already loaded |
| Eager diagram imports | `next/dynamic` lazy imports in TechDeepDive | Diagrams don't increase main bundle size |

## Open Questions

None. All required information is verified from source code inspection.

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None detected (Next.js SSG project — no unit/integration test suite present) |
| Config file | None found |
| Quick run command | `npm run build` (verifies SSG compilation and static param generation) |
| Full suite command | `npm run build && npm run lint` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CS-01 | `/en/projects/sagesync` renders without 404 | smoke | `npm run build` (fails on notFound or missing translation key) | ✅ build exists |
| CS-02 | `/en/projects/cardeal` renders without 404 | smoke | `npm run build` | ✅ build exists |
| CS-03 | `/en/projects/gymmanager` renders without 404 | smoke | `npm run build` | ✅ build exists |
| CS-04 | `/en/projects/[slug]/tech` renders for all 3 slugs | smoke | `npm run build` | ✅ build exists |
| CS-05 | `<title>` and `<meta description>` unique per slug/locale | manual | Inspect page source after `npm run build` | manual-only |

**Note on CS-05 manual step:** `generateMetadata` derives title/description from translation keys that exist. The build will succeed, but visual verification of `<title>` uniqueness requires viewing page source. This is a 30-second manual check, not a code gap.

### Sampling Rate
- **Per task commit:** `npm run build` — catches any translation key miss or type error
- **Per wave merge:** `npm run build && npm run lint`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
None — existing build infrastructure covers all phase requirements. No test files to create. The `npm run build` command exercises SSG path generation, notFound guards, and translation key resolution.

## Sources

### Primary (HIGH confidence)
- Direct source code inspection of `app/[locale]/projects/[slug]/page.tsx` — VALID_SLUGS pattern, generateMetadata, generateStaticParams
- Direct source code inspection of `app/[locale]/projects/[slug]/tech/page.tsx` — identical VALID_SLUGS pattern
- Direct source code inspection of `components/sections/Projects.tsx` — projectsWithCaseStudy Set
- Direct source code inspection of `components/case-study/TechDeepDive.tsx` — diagrams map confirming all 5 slugs already registered
- Direct inspection of `locales/en/caseStudy.json` and `locales/es/caseStudy.json` — all content keys verified present for sagesync, cardeal, gymmanager
- Direct inspection of `i18n.ts` — caseStudy namespace already loaded, no change required

### Secondary (MEDIUM confidence)
- None needed — all findings from primary source inspection

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — verified from source code, no inference
- Architecture: HIGH — VALID_SLUGS pattern, generateStaticParams, and Set-based discovery all inspected directly
- Pitfalls: HIGH — derived from concrete discrepancies observed (two VALID_SLUGS arrays, prose/metric inconsistency)

**Research date:** 2026-03-14
**Valid until:** 2026-04-14 (stable architecture, no fast-moving dependencies)
