# Phase 1: Visual Foundation - Research

**Researched:** 2026-03-14
**Domain:** Next.js case study UI — Tailwind CSS v4 glass morphism, SVG architecture diagrams, mobile responsiveness
**Confidence:** HIGH

## Summary

Phase 1 targets the SageConnect case study page at `/[locale]/projects/sageconnect`. The case study system is already substantially built: six dedicated components (`CaseStudyHero`, `TechStackBar`, `MetricsGrid`, `CaseStudyNarrative`, `CaseStudyCTA`, `TechDeepDive`) compose the full page. The visual foundation requirements are therefore **refinements to existing components**, not new builds.

The largest gap is **ARCH-01** (diagram accuracy): `SageConnectDiagram.tsx` currently shows a "CFDI Importer / ImportaFacturasFocaltec.exe / Windows Subprocess" node at the bottom. The requirement is to replace this with a "Sage 300 Web API" node representing the planned migration. The SVG is hand-authored, so this is a surgical coordinate-level edit inside the existing file.

For the visual requirements: VIS-03 (hero gradient background) is the clearest gap — `CaseStudyHero` has no background treatment, just padding. VIS-02 (section breathing room) is partially satisfied by `apple-glass` cards but could benefit from a subtle alternating background pattern. VIS-04 (metric callouts) is already implemented with gradient color treatment. VIS-01 (hierarchy) and VIS-05 (mobile) need targeted fixes.

**Primary recommendation:** Treat this phase as a series of component-level edits. No new components are needed. Edit `SageConnectDiagram.tsx` for ARCH-01, add a gradient/mesh background to `CaseStudyHero` for VIS-03, and verify mobile behavior of the SVG on narrow viewports.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| VIS-01 | Case study pages have clear visual hierarchy — key content (metrics, role, tags) has visual emphasis | Hero role badge uses `bg-primary-blue/20 rounded-full`. Tags use `apple-glass rounded-full`. MetricsGrid uses gradient text. Gaps: no font-size differentiation between role badge and body, hero headline could use size bump on mobile |
| VIS-02 | Section separators, subtle backgrounds, and spacing create visual breathing room between narrative sections | `py-12` spacing between sections. `apple-glass rounded-3xl` creates card boundaries. Gap: no alternating backgrounds or explicit dividers between Overview → Problem → Solution → Impact → whatNext blocks |
| VIS-03 | Hero sections have visual weight with gradient backgrounds or subtle imagery | `CaseStudyHero` uses `pt-32 pb-16 relative` but has NO background gradient or mesh. The `--gradient-mesh` and `apple-gradient-mesh` utility exist in `globals.css` but are not applied to the hero section |
| VIS-04 | Metric callouts are prominently displayed with clear visual distinction | `MetricsGrid` already has `bg-gradient-to-br from-primary-blue/10 to-accent-purple/10` cards with gradient text (`text-3xl md:text-4xl font-bold bg-gradient-to-r ... bg-clip-text text-transparent`). Considered substantially complete — verify contrast and size at mobile |
| VIS-05 | All case study pages and diagrams are mobile responsive — diagrams scale, layouts stack vertically | SVG uses `w-full h-auto` with `viewBox="0 0 900 480"`. On a 375px phone this renders at ~375×200px, making 9.5px font labels unreadable. Needs an `overflow-x-auto` wrapper with a `min-w-[640px]` inner div so small text stays legible |
| ARCH-01 | SageConnect diagram updated to show Sage 300 Web API replacing the CFDI Importer exe | `SageConnectDiagram.tsx` line 127–138: bottom node rect at `x="385" y="385" w="180" h="80"`, labeled "CFDI Importer / ImportaFacturasFocaltec.exe / Windows Subprocess". Must be relabeled to "Sage 300 Web API" with appropriate sub-labels; connecting arrow label from "Child Process" → "REST/JSON" |
</phase_requirements>

## Standard Stack

### Core (already in project — no installs needed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Tailwind CSS v4 | 4.x | Utility styling | Project standard — uses `@import "tailwindcss"` and `@theme inline` |
| Next.js App Router | 16.x | Page routing, SSG | Project standard |
| next-intl | current | i18n translations | Project standard |
| Lucide React | current | Icons | Project standard |

### CSS Utilities Already Available
| Utility | Defined In | Purpose |
|---------|-----------|---------|
| `apple-glass` | `globals.css:301` | Glass card background + border + shadow |
| `glass-card` | `globals.css:267` | Glass with hover lift |
| `apple-gradient-mesh` | `globals.css:316` | Radial gradient mesh background |
| `bg-gradient-hero` | `globals.css:321` | `--gradient-hero` linear blue→cyan |
| `bg-gradient-mesh` | `globals.css:329` | `--gradient-mesh` radial overlay |
| `--gradient-mesh` | `:root` CSS var | Three radial gradients composited |

**Installation:** None required. All styling utilities are already in `globals.css`.

## Architecture Patterns

### Existing Component Layout Order (page.tsx)
```
Navigation
main.min-h-screen
  CaseStudyHero          pt-32 pb-16 — headline, tagline, role badge, tags
  TechStackBar           py-8 — tech stack badges + architecture type
  MetricsGrid            py-12 — 4-column metric cards
  CaseStudyNarrative     py-12 — Overview + Problem + Solution + Impact + whatNext
  CaseStudyCTA           py-12 — contact + view tech links
Footer
```

### Pattern 1: Hero Background Treatment (VIS-03)
**What:** Add `apple-gradient-mesh` (or inline `bg-gradient-mesh`) as a pseudo-element or direct class to the hero `<section>` to give it visual weight without adding a solid color that would look heavy.
**When to use:** On any case study hero section.
**Example:**
```tsx
// components/case-study/CaseStudyHero.tsx
// Before:
<section className="pt-32 pb-16 relative">

// After:
<section className="pt-32 pb-16 relative overflow-hidden">
  {/* Background mesh */}
  <div className="absolute inset-0 apple-gradient-mesh pointer-events-none" aria-hidden="true" />
  <div className="relative z-10 container mx-auto px-6 lg:px-8 max-w-5xl">
    {/* ...existing content... */}
  </div>
```
Note: The inner container must be moved inside a `relative z-10` wrapper when an `absolute` background layer is added.

### Pattern 2: SVG Diagram Mobile Wrapper (VIS-05)
**What:** Wrap the SVG in an `overflow-x-auto` div with a `min-width` inner div so the diagram can scroll horizontally on mobile rather than shrinking text to illegibility.
**When to use:** Any wide SVG diagram (viewBox wider than ~500px).
**Example:**
```tsx
// In TechDeepDive.tsx, around <DiagramComponent />
<div className="apple-glass rounded-3xl p-6 md:p-10 overflow-x-auto">
  <div className="min-w-[640px]">
    <DiagramComponent />
  </div>
</div>
```
This preserves the SVG's natural aspect ratio at 640px minimum, keeping text labels at intended sizes.

### Pattern 3: Section Visual Separation (VIS-02)
**What:** Add alternating subtle background tints between the Overview card and the Problem/Solution/Impact/whatNext cards by using a `bg-foreground/[0.02]` strip or thin `<hr>` separator with `border-foreground/10`.
**When to use:** Between logically distinct narrative blocks.
**Example:**
```tsx
// Between sections in CaseStudyNarrative, before the Problem/Solution/Impact grid:
<div className="my-4 border-t border-foreground/10" />
// or wrap the outer narrative section with a faint bg:
<section className="py-12 bg-foreground/[0.02]">
```

### Pattern 4: ARCH-01 Diagram Node Replacement
**What:** Edit `SageConnectDiagram.tsx` to replace the CFDI Importer node with a Sage 300 Web API node. Keep all SVG coordinates identical to avoid reflow — only change labels and icon.
**Node to replace (lines 127–138):**
- rect: `x="385" y="385" width="180" height="80" rx="16"`
- Labels: "CFDI Importer", "ImportaFacturasFocaltec.exe", "Windows Subprocess"
- Arrow label from main node: "Child Process"

**Replacement content:**
- Title: "Sage 300 Web API"
- Sub-label 1: "REST / JSON (Planned)"
- Sub-label 2: "Native Integration"
- Arrow label: "REST API (Planned)"
- Use the same gear/process icon or substitute a network/link icon using SVG path elements

### Anti-Patterns to Avoid
- **Shrinking the diagram SVG to fit mobile**: SVG text at 9–10px renders as 4px on a 375px phone if the viewBox is 900px wide. Use `overflow-x-auto` instead.
- **Adding a `tailwind.config` file**: Project uses Tailwind v4 — config is via `globals.css` `@theme inline`. Any new custom utility must be added there, not in a config file.
- **Using `bg-clip-text` on elements with `overflow: hidden`**: The gradient text clip requires `overflow: visible` on the element or the text gradient will be clipped.
- **Modifying the SVG `viewBox`**: The diagram uses CSS variable colors (`var(--primary-600)`, `var(--accent-500)`, etc.) that work in both dark/light mode. Changing the viewBox dimensions will break node layout.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Hero gradient background | Custom CSS radial gradient | `apple-gradient-mesh` / `bg-gradient-mesh` classes | Already defined with correct dark mode awareness in `globals.css` |
| Glass card styling | Custom backdrop-filter CSS | `apple-glass` or `glass-card` classes | Tested cross-browser, includes `-webkit-backdrop-filter` |
| Gradient text | Inline style | `bg-gradient-to-r from-primary-blue to-accent-purple bg-clip-text text-transparent` | Project convention, picks up CSS var updates automatically |
| Mobile-responsive wide SVG | JavaScript resize observer | CSS `overflow-x-auto` wrapper + `min-w` | Simpler, no JS, works during SSR |

## Common Pitfalls

### Pitfall 1: CaseStudyHero Content Clipping After Adding Absolute Background
**What goes wrong:** Adding `absolute inset-0` background div inside `section` causes the headline and tagline to appear behind the overlay if `z-index` is not applied to the content container.
**Why it happens:** The section's default stacking context doesn't elevate children.
**How to avoid:** Wrap existing content in `<div className="relative z-10 container ...">` when introducing an `absolute` background layer.
**Warning signs:** Headline text invisible or faded after adding background overlay.

### Pitfall 2: SVG Diagram Text Unreadable on Mobile
**What goes wrong:** The SageConnect diagram SVG has text elements at `fontSize="9.5"` through `fontSize="17"`. At viewBox 900px on a 375px screen, the SVG scales to 42% — making 9.5px text render at ~4px.
**Why it happens:** `w-full h-auto` scales the entire SVG proportionally.
**How to avoid:** Use `overflow-x-auto` wrapper with `min-w-[640px]` on the inner container. At 640px minimum the 9.5px font renders at ~6.7px — still small but scrollable/readable.
**Warning signs:** On Chrome DevTools mobile emulation (375px), diagram text looks like horizontal lines.

### Pitfall 3: Tailwind v4 Class Registration
**What goes wrong:** Adding a new CSS utility class in `globals.css` without registering it under `@theme inline` — the class works in dev but Tailwind's scanner may not include it.
**Why it happens:** Tailwind v4 scans source for known utilities; arbitrary classes from external CSS files need to be reachable.
**How to avoid:** For utility classes used directly in JSX (like `apple-gradient-mesh`), keep them as raw CSS classes defined outside `@theme inline`. These are NOT Tailwind utilities — they are plain CSS classes that work in both v3 and v4. No registration needed.

### Pitfall 4: next-intl Client vs Server Components
**What goes wrong:** Using `useTranslations()` in a server component, or `getTranslations()` in a client component.
**Why it happens:** Both APIs look similar.
**How to avoid:** `CaseStudyHero`, `CaseStudyNarrative`, `TechStackBar`, `CaseStudyCTA` all use `useTranslations()` — they are client components (or must add `"use client"`). `MetricsGrid` already has `"use client"`. The page `page.tsx` uses `getTranslations()` for metrics data passed as props. Follow this existing split.

### Pitfall 5: ARCH-01 Diagram Arrow Label Coordinate Drift
**What goes wrong:** Changing the CFDI Importer node label text without updating the arrow label ("Child Process" at `x="510" y="365"`).
**Why it happens:** The arrow label is a separate `<text>` element disconnected from the node rect.
**How to avoid:** Search for "Child Process" in `SageConnectDiagram.tsx` (line ~160) and update it alongside the node labels. The arrow path itself (`M 475 335 C 475 355, 475 365, 475 385`) does not need to change since the node rect stays at the same coordinates.

## Code Examples

### Hero with Gradient Background (VIS-03)
```tsx
// Source: globals.css .apple-gradient-mesh pattern
// components/case-study/CaseStudyHero.tsx

<section className="pt-32 pb-16 relative overflow-hidden">
  <div
    className="absolute inset-0 apple-gradient-mesh pointer-events-none"
    aria-hidden="true"
  />
  <div className="relative z-10 container mx-auto px-6 lg:px-8 max-w-5xl">
    {/* back link, h1, tagline, role/tags */}
  </div>
</section>
```

### Diagram Mobile Wrapper (VIS-05)
```tsx
// Source: project convention — apple-glass + overflow-x-auto
// In TechDeepDive.tsx

<div className="apple-glass rounded-3xl p-6 md:p-10 overflow-x-auto">
  <div className="min-w-[640px]">
    <DiagramComponent />
  </div>
</div>
```

### ARCH-01: Replacement Node Labels in SVG
```tsx
// Source: SageConnectDiagram.tsx existing pattern
// Replace lines 127–165 block (CFDI Importer node + arrow label)

{/* ========== Sage 300 Web API Node (bottom center, planned) ========== */}
<g className="sc-node">
  <rect x="385" y="385" width="180" height="80" rx="16"
    fill="url(#sc-node-fill)"
    stroke="var(--primary-600)"
    strokeWidth="1.5"
    strokeDasharray="4 2"         // dashed border = "planned" signal
  />
  {/* Network/link icon (reuse gear path or use a simple diamond) */}
  <g transform="translate(454, 398)">
    <rect x="0" y="2" width="14" height="10" rx="2"
      fill="none" stroke="var(--primary-600)" strokeWidth="1" opacity="0.5" />
    <path d="M 3 0 L 3 4 M 7 0 L 7 4 M 11 0 L 11 4"
      stroke="var(--primary-600)" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
  </g>
  <text x="475" y="425" textAnchor="middle"
    fill="var(--text-primary)" fontSize="14" fontWeight="600"
    fontFamily="system-ui, -apple-system, sans-serif">
    Sage 300 Web API
  </text>
  <text x="475" y="443" textAnchor="middle"
    fill="var(--text-secondary)" fontSize="9.5"
    fontFamily="system-ui, -apple-system, sans-serif">
    REST / JSON
  </text>
  <text x="475" y="457" textAnchor="middle"
    fill="var(--accent-500)" fontSize="9.5" fontWeight="600"
    fontFamily="system-ui, -apple-system, sans-serif">
    Planned Migration
  </text>
</g>

{/* Arrow label — update from "Child Process" to "REST API (Planned)" */}
<text x="510" y="365" textAnchor="middle"
  fill="var(--accent-500)" fontSize="9.5" fontWeight="600"
  fontFamily="system-ui, -apple-system, sans-serif">
  REST API (Planned)
</text>
```

### Section Separator Pattern (VIS-02)
```tsx
// Thin separator between Overview and Problem/Solution/Impact in CaseStudyNarrative.tsx
// After the Overview card, before the space-y-8 block:
<div className="my-8 border-t border-foreground/[0.06]" aria-hidden="true" />
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.js` | `globals.css` with `@theme inline` | Tailwind v4 (2024) | No config file — CSS vars drive all theming |
| `getStaticProps` | `generateStaticParams` + async server components | Next.js App Router (2023) | Page already uses this correctly |
| Client-side translations | `getTranslations()` (server) + `useTranslations()` (client) | next-intl v3+ | Already split correctly in this project |

**Deprecated/outdated:**
- `tailwind.config.js` theme extension: Not used in this project. Do not create one. Add CSS vars to `globals.css` only.

## Open Questions

1. **Should the diagram "Planned Migration" node use a dashed border to signal it's not yet live?**
   - What we know: The `whatNext` section in `caseStudy.json` already describes the migration as planned/future
   - What's unclear: Whether a dashed SVG border (`strokeDasharray`) is visually clear enough or needs a badge
   - Recommendation: Use dashed border + "Planned Migration" text label in `--accent-500` color — consistent with the project's accent-for-callout convention

2. **VIS-02: How much separation is "enough" between narrative sections?**
   - What we know: `space-y-8` between cards in `CaseStudyNarrative` already gives 32px gaps
   - What's unclear: Whether a thin `<hr>` or subtle alternating bg is needed, or if spacing alone suffices
   - Recommendation: Add a single `border-t border-foreground/[0.06]` between the Overview card and the Problem/Solution/Impact block — minimal, non-distracting

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None detected — this is a Next.js portfolio site with no test files |
| Config file | None |
| Quick run command | `npm run build` (verifies SSG compilation) |
| Full suite command | `npm run build && npm run lint` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| VIS-01 | Hero role badge, tags, gradient headline visible | manual (visual) | `npm run build` — verifies no render errors | ❌ no automated visual test |
| VIS-02 | Section separators between narrative blocks | manual (visual) | `npm run build` | ❌ no automated visual test |
| VIS-03 | Hero has gradient background mesh | manual (visual) | `npm run build` | ❌ no automated visual test |
| VIS-04 | Metric cards have gradient text and color distinction | manual (visual) | `npm run build` | ❌ already implemented — verify on build |
| VIS-05 | Diagram scrolls horizontally on mobile (375px) | manual (DevTools) | `npm run build` — layout errors would fail build | ❌ no automated visual test |
| ARCH-01 | Diagram shows "Sage 300 Web API" node, not "CFDI Importer" | manual (visual) + grep | `grep -r "CFDI Importer" components/diagrams/SageConnectDiagram.tsx` should return no matches | ❌ Wave 0 gap |

### Sampling Rate
- **Per task commit:** `npm run build` — confirms SSG and TypeScript compile
- **Per wave merge:** `npm run build && npm run lint`
- **Phase gate:** `npm run build` green + manual visual review of `/projects/sageconnect` on 375px mobile emulation before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] No test framework exists in this project — visual requirements (VIS-01 through VIS-05) are validated by manual browser inspection only
- [ ] ARCH-01 can be verified with `grep "CFDI Importer" components/diagrams/SageConnectDiagram.tsx` returning empty
- [ ] `npm run build` is the primary automated gate — all Phase 1 changes must pass it

## Sources

### Primary (HIGH confidence)
- Direct codebase read — `components/case-study/*.tsx` — current component implementations
- Direct codebase read — `components/diagrams/SageConnectDiagram.tsx` — exact SVG node coordinates and labels
- Direct codebase read — `app/globals.css` — all CSS variables, utility class names, dark mode tokens
- Direct codebase read — `locales/en/caseStudy.json` — complete SageConnect content structure including `whatNext`
- Direct codebase read — `.planning/REQUIREMENTS.md` — requirement text verbatim
- Direct codebase read — `.planning/config.json` — `nyquist_validation: true`

### Secondary (MEDIUM confidence)
- Tailwind CSS v4 behavior: no `tailwind.config` — all config via `globals.css` and `@theme inline` (consistent with CLAUDE.md and observed file structure)

### Tertiary (LOW confidence)
- None

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries are already installed and in use; no new dependencies needed
- Architecture: HIGH — all components read directly; component structure, class names, and file locations confirmed
- Pitfalls: HIGH — derived from direct code inspection (z-index trap, SVG scaling, coordinate drift all visible in the actual files)
- Diagram edits: HIGH — exact coordinates and text strings sourced from the file

**Research date:** 2026-03-14
**Valid until:** 2026-04-14 (stable codebase — only changes if components are refactored independently)
