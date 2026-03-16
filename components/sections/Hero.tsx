"use client";

import { useTranslations } from 'next-intl';
import { useScrollReveal, useStaggerChildren } from '@/hooks/useScrollReveal';

export default function Hero() {
  const t = useTranslations('hero');
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const stagger = useStaggerChildren(100);

  return (
    <section className="relative min-h-[90vh] flex items-end overflow-hidden pb-24 pt-32">
      <div className="px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div
          ref={ref}
          className={`transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
            {/* Left column -- typographic poster */}
            <div className="lg:col-span-7">
              <h1 className="text-6xl md:text-7xl lg:text-[6rem] xl:text-[7.5rem] font-bold tracking-tight leading-[0.9] font-heading text-foreground">
                {t('title')}
              </h1>
              <p className="text-3xl md:text-4xl lg:text-5xl font-heading font-medium mt-4" style={{ color: 'var(--text-secondary)' }}>
                {t('titleAccent')}
              </p>
              <p className="text-lg max-w-xl mt-6" style={{ color: 'var(--text-secondary)' }}>
                {t('description')}
              </p>
            </div>

            {/* Right column -- metrics, status, CTAs */}
            <div className="lg:col-span-5 space-y-8">
              {/* Status badge */}
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ background: 'var(--color-accent-muted)', ...stagger.getDelay(0) }}
              >
                <span className="relative flex h-3 w-3">
                  <span className="relative inline-flex rounded-full h-3 w-3" style={{ background: 'var(--color-accent)' }}></span>
                </span>
                <span className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>
                  {t('status')}
                </span>
              </div>

              {/* Metrics -- vertical stack */}
              <div
                className={`space-y-6 transition-all duration-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={stagger.getDelay(1)}
              >
                <MetricItem value="5+" label={t('metrics.experience')} />
                <MetricItem value="20+" label={t('metrics.projects')} />
                <MetricItem value="$2M+" label={t('metrics.value')} />
              </div>

              {/* CTAs */}
              <div
                className={`flex flex-col sm:flex-row gap-4 transition-all duration-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={stagger.getDelay(2)}
              >
                <a
                  href="#projects"
                  className="px-8 py-4 text-white font-semibold rounded-lg transition-all duration-200 text-center hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: 'var(--color-accent)' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-accent-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-accent)'}
                >
                  {t('cta.primary')}
                </a>
                <a
                  href="#contact"
                  className="group px-8 py-4 font-semibold rounded-lg transition-all duration-200 text-center border hover:scale-[1.02] active:scale-[0.98]"
                  style={{ borderColor: 'var(--color-border-strong)' }}
                >
                  {t('cta.secondary')}
                  <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
                    &rarr;
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="group cursor-default">
      <div className="font-mono text-4xl font-bold transition-colors duration-200 text-[var(--color-accent)] group-hover:text-[var(--color-accent-hover)]">
        {value}
      </div>
      <div className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{label}</div>
    </div>
  );
}
