# Phase 3: Evolution and Discovery - Research

**Researched:** 2026-03-14
**Domain:** Next.js App Router static routing, next-intl server components, Tailwind CSS v4 glass morphism
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Projects index page layout**
- Card grid layout, 2-column on desktop (stacks to 1 on mobile)
- Each card shows: title, tagline, 1-2 key metrics, and tech stack tags
- Only the 4 projects with case study pages (SageConnect, SageSync, Qardeal, Gym Manager) — no Odoo
- Simple header with title + subtitle — no gradient mesh hero
- Cards link to the respective case study page (`/[locale]/projects/[slug]`)

**Evolution section on tech pages**
- Identical "What's Next" section as the main case study page — same glass card, Rocket icon, purple border, "Active Development" badge
- Placed before the existing CTA section on the tech deep-dive page
- Reuse the same try/catch pattern — renders only if `projects.{slug}.whatNext` exists in JSON

**Evolution extensibility (EVO-04)**
- JSON-only — adding evolution content to any project requires only adding `whatNext` keys to caseStudy.json
- No slug registration, no "projectsWithEvolution" Set — the existing try/catch pattern in CaseStudyNarrative handles presence detection
- Same try/catch pattern on the tech page for the new whatNext block

**Homepage discovery links**
- "View All Case Studies" link/button in the homepage Projects section header area, linking to `/[locale]/projects`
- Navigation bar gets a "Projects" or "Case Studies" item linking to `/[locale]/projects`
- DISC-01 already satisfied from Phase 2 — all 4 projects already in `projectsWithCaseStudy` Set

### Claude's Discretion
- Exact card styling and gradient treatment on the projects index page
- Navigation item label ("Projects" vs "Case Studies")
- Exact placement/styling of the "View All Case Studies" link within the Projects section
- SageSync whatNext content — EVO-02 needs content (flagged in STATE.md as blocker)

### Deferred Ideas (OUT OF SCOPE)
- Odoo/Inova case study page — CS-V2-01, not part of this milestone
- Filter/search on projects index page by tags — DISC-V2-01
- Related projects suggestions at bottom of case studies — DISC-V2-02
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| EVO-01 | SageConnect case study shows "What's Next" section describing exe → Web API migration (main page) | JSON already has `whatNext` content for sageconnect in both locales; `CaseStudyNarrative` already renders it via try/catch — verify it works, no new code needed |
| EVO-02 | SageSync case study shows "What's Next" evolution section | `sagesync` has no `whatNext` key in either locale JSON — must author content and add to both `en/caseStudy.json` and `es/caseStudy.json` |
| EVO-03 | "What's Next" section appears on tech deep-dive pages, not just main case study pages | Tech page (`app/[locale]/projects/[slug]/tech/page.tsx`) has no whatNext block — need to add the same try/catch inline block before the CTA section |
| EVO-04 | "whatNext" pattern is extensible — adding evolution content to any project requires only JSON content, no code changes | Confirmed: try/catch pattern in CaseStudyNarrative is already data-driven; same pattern on tech page maintains this contract |
| DISC-01 | Homepage Projects section shows "View Case Study" link for all projects that have case study pages | `projectsWithCaseStudy` Set in `Projects.tsx:34` already contains all 4 slugs; link already rendered conditionally — verify rendering for all 4, may already be complete |
| DISC-02 | Dedicated `/[locale]/projects` index page lists all available case studies with project cards, tags, and links | No file exists at `app/[locale]/projects/page.tsx` — must create new route with `generateStaticParams`, `generateMetadata`, and grid of 4 project cards |
</phase_requirements>

---

## Summary

Phase 3 is primarily a content + routing addition phase, not a new-patterns phase. The codebase already has the complete whatNext infrastructure in `CaseStudyNarrative.tsx` — the try/catch block on lines 72-99 gracefully renders the evolution section when `projects.{slug}.whatNext` JSON keys exist and silently skips it otherwise. EVO-01 (SageConnect whatNext on main page) is structurally already working because the JSON exists in both locales; verification is the only required action for that requirement.

The three remaining work items are: (1) author SageSync whatNext content and add to both locale JSONs, (2) copy the try/catch whatNext block into `tech/page.tsx` before the CTA section, and (3) create `app/[locale]/projects/page.tsx` as the new index page with a 2-column card grid. Navigation and homepage discovery links require small additions to `Navigation.tsx`, `Projects.tsx`, and both locale `navigation.json` / `projects.json` files. No new libraries are needed — everything reuses the existing Next.js App Router, next-intl, and Tailwind patterns.

The key risk is EVO-02: SageSync whatNext content must be authored in both EN and ES. The content is flagged as a blocker in STATE.md. The planner must budget a dedicated task for content authoring before the tech page or index page work can be fully verified.

**Primary recommendation:** Implement in this order — (1) EVO-01 verify, (2) EVO-02 content + JSON, (3) EVO-03 tech page block, (4) EVO-04 verified by design, (5) DISC-01 verify, (6) DISC-02 new index page + nav + homepage link.

---

## Standard Stack

### Core (already in project — no new installs)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js App Router | 16.x | File-based routing, SSG, `generateStaticParams` | Project foundation |
| next-intl | Current | `getTranslations` server-side, `useTranslations` client-side | Project i18n system |
| Tailwind CSS v4 | Current | `apple-glass`, gradient utilities, responsive grid | Project styling system |
| Lucide React | Current | `Rocket`, `ArrowRight`, `FileText` icons | Project icon library |

**Installation:** No new packages needed.

---

## Architecture Patterns

### Established Project Structure

```
app/[locale]/projects/
├── page.tsx                  # NEW: index page for DISC-02
└── [slug]/
    ├── page.tsx              # EXISTS: individual case study
    └── tech/
        └── page.tsx          # EXISTS: tech deep dive
```

### Pattern 1: Static Route Page (Server Component)

The index page follows the identical pattern to the existing `[slug]/page.tsx`.

**What:** Server component with `generateStaticParams` returning all `locales`, `generateMetadata` for SEO, and `getTranslations` for i18n.

**When to use:** Any new App Router page that must be statically generated.

**Template (from existing `app/[locale]/projects/[slug]/page.tsx`):**
```typescript
// Pattern established in [slug]/page.tsx
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { locales } from '@/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'caseStudy' });
  return {
    title: `${t('index.title')} ${t('meta.titleSuffix')}`,
    description: t('index.subtitle'),
  };
}

export default async function ProjectsIndexPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  // render card grid
}
```

**Key difference from slug page:** No slug param, no `notFound()` guard, no VALID_SLUGS check. `generateStaticParams` returns `locales.map((locale) => ({ locale }))` — one entry per locale.

### Pattern 2: whatNext Block (try/catch in client component)

The `CaseStudyNarrative.tsx` already implements this pattern. The tech page must replicate it inline as a server-component-rendered section.

**Note:** `tech/page.tsx` is a server component — it calls `getTranslations` directly. The whatNext block should be added in the page's JSX, not in a new client component, to stay consistent with the existing pattern on the tech page.

```typescript
// In tech/page.tsx — add this block before the CTA section
{(() => {
  try {
    const whatNextTitle = t(`projects.${slug}.whatNext.title`);
    const whatNextParagraphs = t.raw(`projects.${slug}.whatNext.paragraphs`) as string[];
    return (
      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          <div className="apple-glass rounded-3xl p-8 md:p-12 border-l-4 border-purple-500/20">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Rocket className="w-8 h-8 text-purple-500" />
              {whatNextTitle}
            </h2>
            <div className="space-y-4">
              {whatNextParagraphs.map((paragraph, i) => (
                <p key={i} className="text-foreground/80 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-full text-sm font-medium text-purple-600 dark:text-purple-400">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              {t('cta.evolution')}
            </div>
          </div>
        </div>
      </section>
    );
  } catch {
    return null;
  }
})()}
```

**Note on `t.raw` in server components:** `getTranslations` returns a `t` function where `.raw()` works identically to the client-side `useTranslations` hook. The try/catch handles missing keys — when `projects.{slug}.whatNext` doesn't exist, next-intl throws and the catch returns null.

### Pattern 3: Projects Index Card Grid

Each card uses the established glass morphism system, showing title, tagline, 2 key metrics, and tech stack tags.

**Data source for index page:** The index page reads from `caseStudy` namespace — not the `projects` namespace — because that's where canonical metadata (headline, tagline, metrics, tech.stack, tags) is already defined per slug.

**The 4 slugs to render (hardcoded, no loop over VALID_SLUGS):**
```typescript
const CASE_STUDY_SLUGS = ['sageconnect', 'sagesync', 'cardeal', 'gymmanager'] as const;
```

**Card data per slug (from caseStudy.json):**
- Title: `t(`projects.${slug}.headline`)`
- Tagline: `t(`projects.${slug}.tagline`)`
- Metrics (first 2): `(t.raw(`projects.${slug}.metrics`) as Array<...>).slice(0, 2)`
- Tags: `t.raw(`projects.${slug}.tags`) as string[]`
- Tech stack: `t.raw(`projects.${slug}.tech.stack`) as string[]`

**Card layout:**
```typescript
<Link href={`/${locale}/projects/${slug}`} className="group apple-glass rounded-3xl p-6 md:p-8 flex flex-col gap-4 hover:scale-[1.02] transition-transform duration-300">
  <div>
    <h2 className="text-xl font-bold mb-1">{headline}</h2>
    <p className="text-foreground/70 text-sm">{tagline}</p>
  </div>
  {/* 2 key metrics */}
  <div className="grid grid-cols-2 gap-3">
    {metrics.slice(0, 2).map((m) => (
      <div className="bg-gradient-to-br from-primary-blue/10 to-accent-purple/10 rounded-xl p-3 text-center">
        <div className="text-2xl font-bold bg-gradient-to-r from-primary-blue to-accent-purple bg-clip-text text-transparent">{m.value}</div>
        <div className="text-xs text-foreground/60">{m.label}</div>
      </div>
    ))}
  </div>
  {/* Tech stack tags */}
  <div className="flex flex-wrap gap-2">
    {stack.map((tech) => (
      <span className="px-3 py-1 bg-foreground/5 rounded-lg text-sm font-mono">{tech}</span>
    ))}
  </div>
  {/* Category tags */}
  <div className="flex flex-wrap gap-2">
    {tags.map((tag) => (
      <span className="px-3 py-1 apple-glass rounded-full text-xs font-medium">{tag}</span>
    ))}
  </div>
</Link>
```

**Grid layout:**
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
  {CASE_STUDY_SLUGS.map((slug) => ( /* card */ ))}
</div>
```

### Pattern 4: Navigation Link Addition

Navigation.tsx is a client component. The `navLinks` array is built from `useTranslations('navigation')`. Adding a new link requires:

1. Add translation key to both `locales/en/navigation.json` and `locales/es/navigation.json`
2. Add entry to the `navLinks` array in `Navigation.tsx`

**Current nav array (line 28-34 of Navigation.tsx):**
```typescript
const navLinks = [
  { label: t('about'), href: `${prefix}#timeline` },
  { label: t('projects'), href: `${prefix}#projects` },   // existing hash-based
  { label: t('skills'), href: `${prefix}#skills` },
  { label: t('process'), href: `${prefix}#process` },
  { label: t('contact'), href: `${prefix}#contact` },
];
```

**New link to add** — a direct page link (not an anchor hash) requires using `Link` from next/link or an `<a>` tag with an absolute path. Since `navLinks` renders plain `<a>` tags, a direct path like `/${locale}/projects` works directly as an `href`. However, the navigation renders links as `<a>` elements with the `href` string — an absolute path like `/${locale}/projects` will work because it's not a hash but a full path.

**Approach:** Add `caseStudies` key to both navigation JSONs, then add to navLinks:
```typescript
{ label: t('caseStudies'), href: `/${locale}/projects` },
```

This bypasses the `prefix` variable (which adds `/${locale}/` on non-home pages) because the new link always points to an absolute path, never a hash. The existing `prefix` logic is for `#hash` anchors only.

**Mobile menu:** The mobile menu renders the same `navLinks` array automatically — no separate change needed for mobile.

### Pattern 5: "View All Case Studies" in Projects Section

`Projects.tsx` is a client component (`"use client"`). The section header area (lines 210-217) has title + subtitle. The new link goes between the subtitle and the project selector tabs.

**Location:** After the subtitle `<p>` and before the `{/* Project Selector */}` div.

**Using `Link` from next/link** — `Projects.tsx` already imports `Link` (line 6).

**Translation key:** Add `viewAllCaseStudies` to `locales/{locale}/projects.json` under `labels`.

```typescript
// In the section header div, after subtitle p:
<div className="flex justify-center mt-4">
  <Link
    href={`/${locale}/projects`}
    className="group inline-flex items-center gap-2 px-6 py-2.5 apple-glass rounded-full font-medium text-sm transition-all duration-300 hover:scale-105"
  >
    {t('labels.viewAllCaseStudies')}
    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
  </Link>
</div>
```

### Pattern 6: SageSync whatNext Content (EVO-02)

The content is Claude's discretion. The pattern from sageconnect gives us the structure:

```json
"whatNext": {
  "title": "What's Next",
  "paragraphs": [
    "paragraph 1...",
    "paragraph 2...",
    "paragraph 3..."
  ]
}
```

**Recommended SageSync evolution narrative (EN):** SageSync's planned evolution involves migrating from the current polling-based approach toward a webhook-driven architecture — eliminating the polling interval delay and enabling true sub-second sync latency. Additionally, containerizing the service with Docker Compose and adding a dedicated alert notification channel (email/Slack) for dead-letter queue escalations would complete the observability story.

**Recommended SageSync evolution narrative (ES):** Mirror of the EN content, translated.

### Anti-Patterns to Avoid

- **Creating a new `WhatNext` React component:** The decision is to inline the try/catch block — don't extract it into a shared component. The pattern is intentionally inline so it's zero-config for the data-driven extensibility story.
- **Adding a `projectsWithEvolution` Set or conditional registration:** The locked decision explicitly prohibits this. The try/catch IS the evolution detection mechanism.
- **Using `<a>` instead of `<Link>` for the index page links:** Cards linking to `/[locale]/projects/[slug]` must use Next.js `<Link>` for client-side navigation (already used in the existing nav for cross-page links).
- **Fetching caseStudy data client-side on the index page:** The index page is a server component — use `getTranslations` and build all card data server-side.
- **Hardcoding locale-specific strings in TSX:** All user-facing text goes through translation keys, even for the index page section labels.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Missing key detection | Custom JSON key-exists check | next-intl try/catch (already established) | next-intl throws on missing keys — the catch IS the existence check |
| Static page generation | Custom build script | `generateStaticParams` with `locales` array | Already used in every other page in the project |
| Cross-page locale links | Manual locale URL construction | `useLocale()` / `locale` param from `params` | Already used throughout — consistent pattern |
| Card hover transitions | Custom CSS | Tailwind `hover:scale-[1.02] transition-transform duration-300` | Established pattern from existing metric cards |

**Key insight:** This phase adds zero new infrastructure. Every pattern needed is already in the codebase — the work is applying existing patterns to new files and JSON keys.

---

## Common Pitfalls

### Pitfall 1: Tech Page Server Component — `t.raw` vs `useTranslations`

**What goes wrong:** Developer imports `useTranslations` in `tech/page.tsx` (server component) — breaks at runtime because it's a server component.

**Why it happens:** `CaseStudyNarrative` uses `useTranslations` (client component). The tech page uses `getTranslations` (server). The whatNext block on the tech page must use the existing server-side `t` object from `getTranslations`, not a new hook call.

**How to avoid:** The tech page already has `const t = await getTranslations(...)` at the top — pass `t` through or use it directly in the JSX. The try/catch block calls `t()` and `t.raw()` on the existing `t` — no new hook needed.

**Warning signs:** ESLint "hooks can only be called inside function components" error.

### Pitfall 2: Index Page Data Loading — Wrong Namespace

**What goes wrong:** Index page loads from `projects` namespace (`locales/{locale}/projects.json`) expecting slug-level data, but project cards need `caseStudy` namespace for `headline`, `tagline`, `metrics`, and `tech.stack`.

**Why it happens:** `Projects.tsx` uses the `projects` namespace. Developer copies that pattern to the index page.

**How to avoid:** Index page uses `getTranslations({ locale, namespace: 'caseStudy' })`. Card data reads from `projects.{slug}.headline`, `projects.{slug}.tagline`, etc.

**Warning signs:** Missing translation key errors for `metrics` or `tech.stack` arrays.

### Pitfall 3: Navigation Link — `prefix` Variable Breaks Absolute Path

**What goes wrong:** Using `${prefix}projects` instead of `/${locale}/projects` for the nav link. `prefix` is `''` on home page (so link becomes `/projects` — wrong) and `/${locale}/` on other pages (becomes `/${locale}/projects` — correct but by accident).

**Why it happens:** Developer follows the pattern of existing hash-based nav links that use `${prefix}#section`.

**How to avoid:** Always use `/${locale}/projects` (absolute path) for the new nav link. Never use `prefix` for absolute page links.

**Warning signs:** On the home page (`isHomePage === true`), clicking "Case Studies" goes to `/projects` (missing locale).

### Pitfall 4: Missing `generateStaticParams` on Index Page

**What goes wrong:** Index page builds in dev but fails in `npm run build` because it's a dynamic route (`[locale]`) without `generateStaticParams`.

**Why it happens:** Easy to forget — dev mode uses dynamic rendering, but production requires static generation.

**How to avoid:** `generateStaticParams` must return `locales.map((locale) => ({ locale }))` — one entry per locale.

**Warning signs:** Build error: "Page couldn't be rendered statically" or missing page in Vercel deployment.

### Pitfall 5: EVO-01 Already Working — Double-Counting

**What goes wrong:** Developer creates new code for EVO-01 when the requirement is already satisfied structurally (SageConnect `whatNext` JSON exists in both locales, `CaseStudyNarrative` already renders it).

**Why it happens:** Requirement says "pending" — developer assumes code work is needed.

**How to avoid:** Verify EVO-01 first with `npm run dev` → navigate to `/en/projects/sageconnect`. If the purple "What's Next" section renders, EVO-01 is done. Only create a verification commit.

**Warning signs:** Unnecessary code duplication.

---

## Code Examples

Verified patterns from existing codebase:

### Server Component Page with generateStaticParams (from `[slug]/page.tsx`)
```typescript
// Pattern: app/[locale]/projects/page.tsx follows this exactly
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    VALID_SLUGS.map((slug) => ({ locale, slug }))
  );
}
// For index page: return locales.map((locale) => ({ locale }))
```

### Glass Card Link (combining existing patterns)
```typescript
// apple-glass + hover scale — established in MetricsGrid and Projects.tsx
<Link href={`/${locale}/projects/${slug}`} className="apple-glass rounded-3xl p-6 md:p-8 hover:scale-[1.02] transition-transform duration-300 flex flex-col gap-4 group">
```

### Try/Catch Pattern for Optional Section (from `CaseStudyNarrative.tsx` lines 72-99)
```typescript
{(() => {
  try {
    const whatNextTitle = t(`projects.${slug}.whatNext.title`);
    const whatNextParagraphs = t.raw(`projects.${slug}.whatNext.paragraphs`) as string[];
    return ( /* JSX */ );
  } catch {
    return null;
  }
})()}
```

### Metric Display Card (from `Projects.tsx` lines 349-358)
```typescript
<div className="bg-gradient-to-br from-primary-blue/10 to-accent-purple/10 rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
  <div className="text-3xl font-bold bg-gradient-to-r from-primary-blue to-accent-purple bg-clip-text text-transparent mb-2">
    {metric.value}
  </div>
  <div className="text-sm text-foreground/60">{metric.label}</div>
</div>
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `generateStaticParams` returning array with `{ locale, slug }` | Same pattern for index page — returns `{ locale }` only | Already established | Index page SSG works identically |
| Client component for project cards | Server component index page | Phase 3 | Zero client JS on index page — faster load |

**No deprecated patterns involved in Phase 3.**

---

## Open Questions

1. **EVO-02 SageSync evolution content — who authors it?**
   - What we know: The structure is clear (title + paragraphs array, bilingual), the narrative theme is planned evolution toward webhook-driven sync and better observability
   - What's unclear: Exact wording for ES locale; whether to mention specific tech (e.g., Docker, webhook endpoint) or keep it abstract
   - Recommendation: Claude authors content during EVO-02 task — the CONTEXT.md marks this as "Claude's Discretion" — use the architectural description from `sagesync.tech.codePatterns` and `sagesync.tech.dataFlow` as source material for the evolution narrative

2. **Navigation label — "Projects" vs "Case Studies"?**
   - What we know: Existing nav already has a "Projects" item (hash link to `#projects` section). Adding another "Projects" would be confusing.
   - Recommendation: Use "Case Studies" in EN (`caseStudies` key) and "Casos de Estudio" in ES. This differentiates from the existing hash-based "Projects" nav link.

3. **Nav link ordering — where does "Case Studies" go?**
   - What we know: Current order is About, Projects, Skills, Process, Contact
   - Recommendation: Place "Case Studies" immediately after "Projects" — keeps related items adjacent. Order becomes: About, Projects, Case Studies, Skills, Process, Contact.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None detected — Next.js build (`npm run build`) serves as integration gate |
| Config file | none |
| Quick run command | `npm run lint` |
| Full suite command | `npm run build` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| EVO-01 | SageConnect main page shows purple "What's Next" glass card | smoke | `npm run build && echo "then verify /en/projects/sageconnect visually"` | ✅ (verify existing) |
| EVO-02 | SageSync main page shows "What's Next" section | smoke | `npm run build` — build fails if JSON malformed | ❌ Wave 0: add sagesync whatNext JSON |
| EVO-03 | Tech pages show "What's Next" before CTA for projects with content | smoke | `npm run build` | ❌ Wave 0: add whatNext block to tech/page.tsx |
| EVO-04 | No projectsWithEvolution registration in code | manual | `grep -r "projectsWithEvolution" src/` returns empty | ✅ by design |
| DISC-01 | All 4 projects show "View Case Study" link on homepage | smoke | `npm run build` + visual inspect | ✅ (verify existing `projectsWithCaseStudy` Set) |
| DISC-02 | `/en/projects` and `/es/projects` render 4 project cards | smoke | `npm run build` | ❌ Wave 0: create `app/[locale]/projects/page.tsx` |

### Sampling Rate
- **Per task commit:** `npm run lint`
- **Per wave merge:** `npm run build`
- **Phase gate:** `npm run build` green + visual spot-check of all new pages before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `app/[locale]/projects/page.tsx` — covers DISC-02
- [ ] `whatNext` keys in `locales/en/caseStudy.json` under `projects.sagesync` — covers EVO-02
- [ ] `whatNext` keys in `locales/es/caseStudy.json` under `projects.sagesync` — covers EVO-02
- [ ] whatNext block in `app/[locale]/projects/[slug]/tech/page.tsx` — covers EVO-03

---

## Sources

### Primary (HIGH confidence)
- Direct codebase inspection — `components/case-study/CaseStudyNarrative.tsx` (lines 72-99): confirmed try/catch pattern
- Direct codebase inspection — `app/[locale]/projects/[slug]/page.tsx`: confirmed `generateStaticParams` + `getTranslations` pattern
- Direct codebase inspection — `app/[locale]/projects/[slug]/tech/page.tsx`: confirmed no whatNext block exists yet
- Direct codebase inspection — `locales/en/caseStudy.json` + `locales/es/caseStudy.json`: confirmed sageconnect has `whatNext`, sagesync does not
- Direct codebase inspection — `components/ui/Navigation.tsx`: confirmed `navLinks` array pattern and `prefix` variable behavior
- Direct codebase inspection — `components/sections/Projects.tsx` line 34: confirmed `projectsWithCaseStudy` Set contains all 4 slugs
- `app/[locale]/projects/` directory listing: confirmed no `page.tsx` exists at index level

### Secondary (MEDIUM confidence)
- next-intl documentation pattern: `getTranslations` in server components, `useTranslations` in client components — consistent with project usage

### Tertiary (LOW confidence)
- None

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries already in project, no new dependencies
- Architecture: HIGH — all patterns verified directly in existing code
- Pitfalls: HIGH — derived from actual code inspection, not assumptions
- Content (EVO-02): MEDIUM — content theme is clear, exact wording is Claude's discretion

**Research date:** 2026-03-14
**Valid until:** 2026-04-14 (stable stack — no fast-moving dependencies)
