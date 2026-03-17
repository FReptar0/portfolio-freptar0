import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CaseStudyCTAProps {
  slug: string;
  locale: string;
}

export default function CaseStudyCTA({ slug, locale }: CaseStudyCTAProps) {
  const t = useTranslations('caseStudy');

  return (
    <section className="py-12">
      <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
        <div className="bg-[var(--color-accent-muted)] border border-[var(--color-accent)]/20 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xl md:text-2xl font-bold mb-2">
                {t('cta.contactQuestion')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${locale}/#contact`}
                className="px-8 py-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-on-accent)] font-semibold rounded-xl transition-all duration-300 text-center"
              >
                {t('cta.contact')}
              </Link>
              <Link
                href={`/${locale}/projects/${slug}/tech`}
                className="group inline-flex items-center justify-center gap-2 px-8 py-3 bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-xl font-semibold transition-colors duration-300 hover:border-[var(--color-accent)]"
              >
                {t('cta.viewTech')}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
