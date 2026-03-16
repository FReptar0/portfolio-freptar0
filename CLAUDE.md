# CLAUDE.md

## Project Overview
- This is Fernando Rodriguez Memije's personal portfolio site
- Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, next-intl for i18n
- Bilingual: Spanish (default) and English
- Deployed on Vercel

## Tech Stack
- Next.js 16.x with App Router (Turbopack)
- TypeScript
- Tailwind CSS v4 (using `@import "tailwindcss"` and `@theme inline`, NOT tailwind.config)
- next-intl for internationalization
- Lucide React for icons
- Vercel Analytics

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build (verifies SSG)
- `npm run lint` — ESLint

## Architecture
- `app/[locale]/` — locale-based routing (es, en)
- `components/sections/` — homepage sections (Hero, Projects, Skills, etc.)
- `components/ui/` — reusable UI (Navigation, ThemeToggle, LanguageToggle, etc.)
- `components/case-study/` — case study page components
- `components/diagrams/` — SVG architecture diagrams per project
- `locales/{en,es}/` — modular JSON translation files loaded in `i18n.ts`

## i18n Pattern
- All translations are JSON files in `locales/{locale}/`
- Loaded via `Promise.all` in `i18n.ts` and passed as `messages` object
- Adding a new translation file requires: create the JSON, add to the destructured array AND messages object in `i18n.ts`
- Server components use `getTranslations()`, client components use `useTranslations()`

## Styling Conventions
- Glass morphism: use `apple-glass` or `glass-card` classes
- Gradient text: `bg-gradient-to-r from-primary-blue to-accent-purple bg-clip-text text-transparent`
- Cards: `apple-glass rounded-3xl p-6 md:p-12`
- Tech badges: `px-3 py-1 bg-foreground/5 rounded-lg text-sm font-mono`
- CSS variables for theming: `--text-primary`, `--glass-bg`, `--primary-600`, `--accent-500`, etc.
- Dark mode via `.dark` class on root element

## Case Study System
- Dynamic route: `app/[locale]/projects/[slug]/page.tsx`
- Tech deep dive: `app/[locale]/projects/[slug]/tech/page.tsx`
- Valid slugs defined in `VALID_SLUGS` array in route files — add new projects there
- All case study content in `locales/{locale}/caseStudy.json` under `projects.{slug}`
- Architecture diagrams in `components/diagrams/{ProjectName}Diagram.tsx`

## Adding a New Case Study
1. Add project content to `locales/en/caseStudy.json` and `locales/es/caseStudy.json` under `projects.{slug}`
2. Add slug to `VALID_SLUGS` array in both `app/[locale]/projects/[slug]/page.tsx` and `tech/page.tsx`
3. Create diagram component in `components/diagrams/{ProjectName}Diagram.tsx`
4. Register diagram in `components/case-study/TechDeepDive.tsx` diagrams map
5. Optionally add "View Case Study" link in `components/sections/Projects.tsx`

## Key Files
- `i18n.ts` — translation loader, locale config
- `app/globals.css` — CSS variables, glass effects, dark mode
- `components/ui/Navigation.tsx` — nav uses `/${locale}/#section` pattern for cross-page compat
- `components/sections/Projects.tsx` — homepage project cards
