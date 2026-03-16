import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { locales } from '@/i18n';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import CaseStudyHero from '@/components/case-study/CaseStudyHero';
import CaseStudyNarrative from '@/components/case-study/CaseStudyNarrative';
import MetricsGrid from '@/components/case-study/MetricsGrid';
import TechStackBar from '@/components/case-study/TechStackBar';
import CaseStudyCTA from '@/components/case-study/CaseStudyCTA';
import LiveResultsGallery from '@/components/case-study/LiveResultsGallery';
import { getTranslations } from 'next-intl/server';

const BASE_URL = 'https://fernandomemije.dev';
const VALID_SLUGS = ['sageconnect', 'sagesync', 'cardeal', 'gymmanager', 'cleany', 'carrytrade'] as const;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    VALID_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'caseStudy' });

  const headline = t(`projects.${slug}.headline`);
  const tagline = t(`projects.${slug}.tagline`);
  const title = `${headline} ${t('meta.titleSuffix')}`;

  return {
    title,
    description: tagline,
    alternates: {
      canonical: `${BASE_URL}/${locale}/projects/${slug}`,
      languages: {
        es: `${BASE_URL}/es/projects/${slug}`,
        en: `${BASE_URL}/en/projects/${slug}`,
        'x-default': `${BASE_URL}/es/projects/${slug}`,
      },
    },
    openGraph: {
      title,
      description: tagline,
      url: `${BASE_URL}/${locale}/projects/${slug}`,
      type: 'article',
      siteName: 'Fernando Rodriguez Memije Portfolio',
      locale: locale === 'es' ? 'es_MX' : 'en_US',
      images: [
        {
          url: `${BASE_URL}/${locale}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${headline} — Fernando Rodriguez Memije`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: tagline,
      images: [`${BASE_URL}/${locale}/opengraph-image`],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!VALID_SLUGS.includes(slug as (typeof VALID_SLUGS)[number])) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'caseStudy' });
  const metrics = t.raw(`projects.${slug}.metrics`) as Array<{
    value: string;
    label: string;
  }>;

  const headline = t(`projects.${slug}.headline`);
  const tagline = t(`projects.${slug}.tagline`);
  const overview = t(`projects.${slug}.overview`);
  const role = t(`projects.${slug}.role`);
  const techStack = t.raw(`projects.${slug}.tech.stack`) as string[];

  // JSON-LD: CreativeWork + BreadcrumbList
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        name: headline,
        description: tagline,
        abstract: overview,
        url: `${BASE_URL}/${locale}/projects/${slug}`,
        inLanguage: locale,
        author: {
          "@type": "Person",
          name: "Fernando Rodriguez Memije",
          url: BASE_URL,
        },
        contributor: {
          "@type": "Person",
          name: "Fernando Rodriguez Memije",
          jobTitle: role,
        },
        keywords: techStack.join(", "),
        about: techStack.map((tech) => ({
          "@type": "Thing",
          name: tech,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: locale === 'es' ? "Inicio" : "Home",
            item: `${BASE_URL}/${locale}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: locale === 'es' ? "Proyectos" : "Projects",
            item: `${BASE_URL}/${locale}/projects`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: headline,
            item: `${BASE_URL}/${locale}/projects/${slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <main className="min-h-screen">
        <CaseStudyHero slug={slug} locale={locale} />
        <TechStackBar slug={slug} />
        <MetricsGrid metrics={metrics} />
        <CaseStudyNarrative slug={slug} />
        <LiveResultsGallery slug={slug} />
        <CaseStudyCTA slug={slug} locale={locale} />
      </main>
      <Footer />
    </>
  );
}
