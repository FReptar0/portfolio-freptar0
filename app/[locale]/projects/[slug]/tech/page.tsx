import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { locales } from '@/i18n';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import TechDeepDive from '@/components/case-study/TechDeepDive';
import TechStackBar from '@/components/case-study/TechStackBar';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Rocket } from 'lucide-react';

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

  const title = `${t(`projects.${slug}.headline`)} ${t('meta.techTitleSuffix')}`;
  return {
    title,
    description: t(`projects.${slug}.tagline`),
    alternates: {
      canonical: `https://fernandomemije.dev/${locale}/projects/${slug}/tech`,
      languages: {
        es: `https://fernandomemije.dev/es/projects/${slug}/tech`,
        en: `https://fernandomemije.dev/en/projects/${slug}/tech`,
        'x-default': `https://fernandomemije.dev/es/projects/${slug}/tech`,
      },
    },
    openGraph: {
      title,
      description: t(`projects.${slug}.tagline`),
      url: `https://fernandomemije.dev/${locale}/projects/${slug}/tech`,
      type: 'article',
      siteName: 'Fernando Rodriguez Memije Portfolio',
      locale: locale === 'es' ? 'es_MX' : 'en_US',
      images: [
        {
          url: `https://fernandomemije.dev/${locale}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${t(`projects.${slug}.headline`)} — Tech Deep Dive`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: t(`projects.${slug}.tagline`),
      images: [`https://fernandomemije.dev/${locale}/opengraph-image`],
    },
  };
}

export default async function TechDeepDivePage({
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

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-32 pb-16">
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl mb-12">
          <Link
            href={`/${locale}/projects/${slug}`}
            className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            {t('nav.backToCaseStudy')}
          </Link>

          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-blue to-accent-purple bg-clip-text text-transparent">
              {t(`projects.${slug}.headline`)}
            </span>
            {' '}<span className="text-foreground/60">— Tech Deep Dive</span>
          </h1>
          <p className="text-lg text-foreground/70">
            {t(`projects.${slug}.tagline`)}
          </p>
        </div>

        <TechStackBar slug={slug} />
        <TechDeepDive slug={slug} />

        {/* What's Next - only render if the project has this section */}
        {t.has(`projects.${slug}.whatNext.title`) && (
          <section className="py-12">
            <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
              <div className="apple-glass rounded-3xl p-8 md:p-12 border-l-4 border-purple-500/20">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Rocket className="w-8 h-8 text-purple-500" />
                  {t(`projects.${slug}.whatNext.title`)}
                </h2>
                <div className="space-y-4">
                  {(t.raw(`projects.${slug}.whatNext.paragraphs`) as string[]).map((paragraph: string, i: number) => (
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
        )}

        {/* CTA */}
        <section className="py-12">
          <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
            <div className="bg-gradient-to-r from-primary-blue/20 to-accent-purple/20 rounded-3xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <p className="text-xl md:text-2xl font-bold mb-2">
                    {t('cta.contactQuestion')}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={`/${locale}/#contact`}
                    className="px-8 py-3 bg-primary-blue hover:bg-primary-blue/90 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 text-center"
                  >
                    {t('cta.contact')}
                  </Link>
                  <Link
                    href={`/${locale}/projects/${slug}`}
                    className="group inline-flex items-center justify-center gap-2 px-8 py-3 apple-glass rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                  >
                    {t('nav.backToCaseStudy')}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
