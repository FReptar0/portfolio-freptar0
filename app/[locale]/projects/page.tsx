import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales } from '@/i18n';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';

const CASE_STUDY_SLUGS = ['sageconnect', 'sagesync', 'cardeal', 'gymmanager', 'cleany', 'carrytrade'] as const;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'caseStudy' });

  const title = `${t('index.title')} | Fernando Rodriguez`;
  return {
    title,
    description: t('index.subtitle'),
    alternates: {
      canonical: `https://fernandomemije.dev/${locale}/projects`,
      languages: {
        es: 'https://fernandomemije.dev/es/projects',
        en: 'https://fernandomemije.dev/en/projects',
        'x-default': 'https://fernandomemije.dev/es/projects',
      },
    },
    openGraph: {
      title,
      description: t('index.subtitle'),
      url: `https://fernandomemije.dev/${locale}/projects`,
      siteName: 'Fernando Rodriguez Memije Portfolio',
      locale: locale === 'es' ? 'es_MX' : 'en_US',
      images: [
        {
          url: `https://fernandomemije.dev/${locale}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: 'Fernando Rodriguez Memije — Projects',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: t('index.subtitle'),
      images: [`https://fernandomemije.dev/${locale}/opengraph-image`],
    },
  };
}

export default async function ProjectsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'caseStudy' });

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-32 pb-16">
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('index.title')}
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              {t('index.subtitle')}
            </p>
          </div>

          {/* 2-column card grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {CASE_STUDY_SLUGS.map((slug) => (
              <Link
                key={slug}
                href={`/${locale}/projects/${slug}`}
                className="group apple-glass rounded-3xl p-6 md:p-8 flex flex-col gap-4 hover:scale-[1.02] transition-transform duration-300"
              >
                {/* Title + tagline */}
                <div>
                  <h2 className="text-xl font-bold mb-1">
                    {t(`projects.${slug}.headline`)}
                  </h2>
                  <p className="text-foreground/70 text-sm">
                    {t(`projects.${slug}.tagline`)}
                  </p>
                </div>

                {/* 2 key metrics */}
                <div className="grid grid-cols-2 gap-3">
                  {(
                    t.raw(`projects.${slug}.metrics`) as Array<{
                      label: string;
                      value: string;
                    }>
                  )
                    .slice(0, 2)
                    .map((m, i) => (
                      <div
                        key={i}
                        className="bg-gradient-to-br from-primary-blue/10 to-accent-purple/10 rounded-xl p-3 text-center"
                      >
                        <div className="text-2xl font-bold bg-gradient-to-r from-primary-blue to-accent-purple bg-clip-text text-transparent">
                          {m.value}
                        </div>
                        <div className="text-xs text-foreground/60">{m.label}</div>
                      </div>
                    ))}
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {(t.raw(`projects.${slug}.tech.stack`) as string[]).map(
                    (tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-foreground/5 rounded-lg text-sm font-mono"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>

                {/* Category tags */}
                <div className="flex flex-wrap gap-2">
                  {(t.raw(`projects.${slug}.tags`) as string[]).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 apple-glass rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Arrow indicator */}
                <div className="flex items-center gap-1 text-sm font-medium text-primary-blue mt-auto pt-2">
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
