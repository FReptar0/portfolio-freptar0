# Codebase Structure

**Analysis Date:** 2026-03-14

## Directory Layout

```
portfolio-freptar0/
├── app/                           # Next.js app router
│   ├── layout.tsx                 # Root HTML layout (fonts, theme, analytics)
│   ├── not-found.tsx              # 404 fallback page
│   ├── api/                       # API routes
│   │   └── contact/
│   │       └── route.ts           # POST /api/contact for form submissions
│   └── [locale]/                  # Dynamic locale segment
│       ├── layout.tsx             # Locale layout (i18n provider, metadata)
│       ├── page.tsx               # Home page (hero, sections, footer)
│       └── projects/
│           └── [slug]/            # Dynamic project slug
│               ├── page.tsx       # Case study detail page
│               └── tech/
│                   └── page.tsx    # Project tech deep-dive page
│
├── components/                    # React components
│   ├── ui/                        # Reusable UI components
│   │   ├── Navigation.tsx         # Header nav with locale/theme toggles
│   │   ├── Footer.tsx             # Site footer
│   │   ├── button.tsx             # Base button component (shadcn-style)
│   │   ├── carousel.tsx           # Embla carousel wrapper
│   │   ├── tech-carousel.tsx      # Tech stack carousel
│   │   ├── ThemeToggle.tsx        # Dark/light theme toggle
│   │   ├── LanguageToggle.tsx     # Language (es/en) switcher
│   │   ├── SearchBar.tsx          # Search functionality
│   │   ├── LoadingScreen.tsx      # Splash screen on mount
│   ├── sections/                  # Full-page sections (home page)
│   │   ├── Hero.tsx               # Banner with headline, metrics, CTAs
│   │   ├── TrustSignals.tsx       # Trust/credibility indicators
│   │   ├── TechStack.tsx          # Technologies and expertise
│   │   ├── CareerTimeline.tsx     # Work history chronological view
│   │   ├── Projects.tsx           # Portfolio projects grid + details
│   │   ├── Skills.tsx             # Skills by category
│   │   ├── Process.tsx            # How I work section
│   │   ├── Contact.tsx            # Contact form with validation
│   ├── diagrams/                  # Project architecture diagrams
│   │   ├── SageConnectDiagram.tsx
│   │   ├── SageSyncDiagram.tsx
│   │   ├── QardealDiagram.tsx
│   │   ├── GymManagerDiagram.tsx
│   │   └── OdooDiagram.tsx
│   ├── case-study/                # Case study page components
│   │   ├── CaseStudyHero.tsx      # Case study header
│   │   ├── CaseStudyNarrative.tsx # Story/narrative section
│   │   ├── MetricsGrid.tsx        # Key metrics display
│   │   ├── TechDeepDive.tsx       # Technical implementation details
│   │   ├── TechStackBar.tsx       # Technology tags
│   │   └── CaseStudyCTA.tsx       # Call-to-action
│   ├── theme-provider.tsx         # next-themes wrapper
│   ├── AnalyticsClient.tsx        # Vercel Analytics (client component)
│   └── SpeedInsightsClient.tsx    # Vercel Speed Insights (client component)
│
├── lib/                           # Utilities and business logic
│   ├── utils.ts                   # Helper: cn() for class merging
│   ├── supabase.ts                # Supabase client + types for contact_submissions
│   ├── telegram.ts                # Telegram Bot API integration
│   └── validations/
│       └── contact.ts             # Zod schemas for contact form validation
│
├── emails/                        # React Email templates
│   ├── contact-confirmation-en.tsx
│   └── contact-confirmation-es.tsx
│
├── locales/                       # i18n translation files (JSON)
│   ├── en/                        # English translations
│   │   ├── hero.json
│   │   ├── projects.json
│   │   ├── skills.json
│   │   ├── timeline.json
│   │   ├── trustSignals.json
│   │   ├── techStack.json
│   │   ├── process.json
│   │   ├── contact.json
│   │   ├── footer.json
│   │   ├── navigation.json
│   │   ├── search.json
│   │   ├── loading.json
│   │   └── caseStudy.json
│   └── es/                        # Spanish translations (same structure)
│       ├── hero.json
│       ├── projects.json
│       ├── ... (etc)
│
├── public/                        # Static assets
│   └── (images, favicons, etc.)
│
├── .planning/                     # GSD internal documentation
│   └── codebase/
│       ├── ARCHITECTURE.md        # Architecture and patterns
│       └── STRUCTURE.md           # This file
│
├── i18n.ts                        # Internationalization config (next-intl setup)
├── proxy.ts                       # Utility/proxy module
├── next.config.ts                 # Next.js configuration
├── tsconfig.json                  # TypeScript compiler options
├── tailwind.config.js             # Tailwind CSS configuration
├── postcss.config.mjs             # PostCSS configuration
├── package.json                   # Dependencies and scripts
└── package-lock.json              # Locked dependency versions
```

## Directory Purposes

**`app/`:**
- Purpose: Next.js App Router pages and API routes
- Contains: Server/client components for pages, layout wrapping, API endpoint handlers
- Key files: `layout.tsx` (root and locale-scoped), `page.tsx` (home), `route.ts` (contact API)

**`components/`:**
- Purpose: Reusable React components organized by purpose
- Contains: UI widgets, full-page sections, project diagrams, case study templates
- Key files: All client components marked with `"use client"` directive

**`lib/`:**
- Purpose: Utilities, business logic, external service integrations
- Contains: Validation schemas, database client, notification APIs, helper functions
- Key files: `supabase.ts` (Supabase setup), `telegram.ts` (notifications), `validations/contact.ts` (form rules)

**`emails/`:**
- Purpose: Email template components (React Email format)
- Contains: Locale-specific email HTML templates
- Key files: `contact-confirmation-en.tsx`, `contact-confirmation-es.tsx`

**`locales/`:**
- Purpose: Internationalization translation files
- Contains: JSON files with content strings, organized by locale and namespace
- Key files: `en/hero.json`, `es/projects.json` (modular per section)

**`public/`:**
- Purpose: Static assets served directly by web server
- Contains: Images, favicons, fonts, robots.txt
- Generated: No, committed to repo

**`.planning/`:**
- Purpose: GSD (Guided Software Development) documentation
- Contains: ARCHITECTURE.md, STRUCTURE.md, and future analysis docs
- Generated: No, written by analysis tools

## Key File Locations

**Entry Points:**
- `app/layout.tsx`: Root HTML, fonts, theme script, providers
- `app/[locale]/layout.tsx`: Locale-specific layout, i18n setup, metadata
- `app/[locale]/page.tsx`: Home page composition
- `app/api/contact/route.ts`: Contact form API handler

**Configuration:**
- `tsconfig.json`: TypeScript paths alias `@/*` → root
- `next.config.ts`: Next.js with `next-intl` plugin
- `i18n.ts`: Locale config, translation namespace imports
- `tailwind.config.js`: Theme variables (custom CSS), plugin setup
- `package.json`: Scripts (`dev`, `build`, `start`, `lint`)

**Core Logic:**
- `lib/supabase.ts`: Database client initialization and types
- `lib/telegram.ts`: Telegram notification formatting and sending
- `lib/validations/contact.ts`: Zod schema for form validation
- `app/api/contact/route.ts`: Form submission handler with multi-service coordination

**Testing:**
- No test files present (testing not yet implemented)
- Would go in `__tests__/` or `.test.ts` files alongside source

## Naming Conventions

**Files:**
- Components: PascalCase (e.g., `Hero.tsx`, `Navigation.tsx`)
- Utilities: camelCase (e.g., `supabase.ts`, `utils.ts`)
- Locales: lowercase with hyphen (e.g., `contact-confirmation-en.tsx`)
- Directories: kebab-case for multi-word dirs (e.g., `case-study/`, `tech-stack/`)

**Directories:**
- Dynamic segments: Square brackets (e.g., `[locale]`, `[slug]`)
- API routes: Nested under `api/` with `route.ts` file
- Feature-based: Organized by purpose (`sections/`, `ui/`, `diagrams/`)

**Exports:**
- Components: Default export (e.g., `export default function Hero() {}`)
- Utilities/Types: Named exports (e.g., `export const getSupabase = ()`, `export interface ContactSubmission {}`)
- Schemas: Named exports (e.g., `export const contactFormSchema = z.object({})`)

**Imports:**
- Absolute paths via `@/*` alias (e.g., `import Hero from '@/components/sections/Hero'`)
- Consistent import order: external libs → relative imports → types
- Client components marked with `"use client"` directive at top

## Where to Add New Code

**New Feature (e.g., new home section):**
- Implementation: `components/sections/FeatureName.tsx` (client component with `"use client"`)
- Content: Add JSON namespace to `locales/en/featureName.json` and `locales/es/featureName.json`
- Integration: Import and compose in `app/[locale]/page.tsx`
- Add to i18n: Update `i18n.ts` to import the new namespace

**New Component/Module (reusable):**
- UI component: `components/ui/ComponentName.tsx`
- Business logic: `lib/moduleName.ts` with utilities and types
- Validation: `lib/validations/moduleName.ts` with Zod schemas
- Export from index if creating shared interface

**Utilities:**
- Shared helpers: `lib/utils.ts` (keep small; split into modules if growing)
- Service integrations: `lib/serviceName.ts` (e.g., `telegram.ts`)
- Type definitions: `lib/types.ts` or module-specific (e.g., `supabase.ts` includes types)

**API Endpoints:**
- Route handler: `app/api/featureName/route.ts`
- Validation schema: `lib/validations/featureName.ts`
- Follow pattern in `app/api/contact/route.ts` (validate → process → respond)

**Internationalization:**
- New locale strings: Create `locales/en/namespace.json` and `locales/es/namespace.json`
- Mirror namespace in both locales (Spanish and English parity required)
- Import in `i18n.ts` alongside other namespace imports
- Use `useTranslations('namespace')` in client components or `getTranslations()` in server components

## Special Directories

**`app/[locale]/`:**
- Purpose: Dynamic locale routing segment
- Generated: No (static params pre-generated at build time)
- Committed: Yes
- Note: All routes under this directory inherit locale context; layout wraps with i18n provider

**`[slug]` in Projects:**
- Purpose: Dynamic project route for case studies
- Generated: No (static params pre-generated at build time)
- Committed: Yes
- Note: Valid slugs hardcoded in `VALID_SLUGS` constant; invalid slugs return 404

**`.next/`:**
- Purpose: Next.js build output (compiled code, cache)
- Generated: Yes (during `npm run build`)
- Committed: No (in .gitignore)

**`node_modules/`:**
- Purpose: Installed npm packages
- Generated: Yes (via `npm install`)
- Committed: No (in .gitignore)

**`public/`:**
- Purpose: Static assets with direct URL access
- Generated: No (manually added)
- Committed: Yes
- Example: `public/images/project.png` accessible at `/images/project.png`

---

*Structure analysis: 2026-03-14*
