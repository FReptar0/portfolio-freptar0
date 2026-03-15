import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { locales } from '@/i18n';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import TechDeepDive from '@/components/case-study/TechDeepDive';
import TechStackBar from '@/components/case-study/TechStackBar';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const VALID_SLUGS = ['sageconnect'] as const;

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
    title: `${t(`projects.${slug}.headline`)} ${t('meta.techTitleSuffix')}`,
    description: t(`projects.${slug}.tagline`),
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
