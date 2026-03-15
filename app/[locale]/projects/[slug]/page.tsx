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
import { getTranslations } from 'next-intl/server';

const VALID_SLUGS = ['sageconnect', 'sagesync', 'cardeal', 'gymmanager'] as const;

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

  return {
    title: `${t(`projects.${slug}.headline`)} ${t('meta.titleSuffix')}`,
    description: t(`projects.${slug}.tagline`),
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

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <CaseStudyHero slug={slug} locale={locale} />
        <TechStackBar slug={slug} />
        <MetricsGrid metrics={metrics} />
        <CaseStudyNarrative slug={slug} />
        <CaseStudyCTA slug={slug} locale={locale} />
      </main>
      <Footer />
    </>
  );
}
