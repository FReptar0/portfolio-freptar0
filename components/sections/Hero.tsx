"use client";

import { useState, useEffect } from "react";
import { useTranslations } from 'next-intl';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations('hero');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0">
      {/* Animated gradient background */}
      <div className="absolute inset-0 apple-gradient-mesh opacity-50" />

      {/* Glass morphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      <div className="relative z-10 container mx-auto px-6 lg:px-8 max-w-6xl">
        <div
          className={`text-center space-y-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border backdrop-blur-xl mt-12 mb-6" style={{ borderColor: 'var(--success-500)' }}>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: 'var(--success-500)' }}></span>
              <span className="relative inline-flex rounded-full h-3 w-3" style={{ background: 'var(--success-500)' }}></span>
            </span>
            <span className="text-sm font-medium" style={{ color: 'var(--success-600)' }}>
              {t('status')}
            </span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <p className="text-lg md:text-xl text-foreground/70 font-medium tracking-wide">
              {t('subtitle')}
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span style={{ background: 'var(--gradient-hero)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent' }}>
                {t('title')}
              </span>
              <br />
              <span className="text-foreground">{t('titleAccent')}</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              {t('description')}
            </p>
          </div>

          {/* Metrics Bar */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 py-2">
            <MetricItem value="5+" label={t('metrics.experience')} />
            <MetricItem value="20+" label={t('metrics.projects')} />
            <MetricItem value="$2M+" label={t('metrics.value')} />
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <a
              href="#projects"
              className="group relative px-8 py-4 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 min-w-[200px] overflow-hidden"
              style={{ background: 'var(--primary-600)' }}
            >
              <span className="relative z-10">{t('cta.primary')}</span>
              <div className="absolute inset-0 rounded-2xl bg-gradient-hero opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a
              href="#contact"
              className="group px-8 py-4 glass hover:bg-white/20 dark:hover:bg-black/40 font-semibold rounded-2xl transition-all duration-300 hover:scale-105 min-w-[200px]"
            >
              {t('cta.secondary')}
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>

          {/* Value Props Pills */}
          <div className="flex flex-wrap justify-center gap-3 pt-2 mb-12">
            <ValuePropPill text={t('valueProps.fullStack')} />
            <ValuePropPill text={t('valueProps.leadership')} />
            <ValuePropPill text={t('valueProps.architecture')} />
            <ValuePropPill text={t('valueProps.devops')} />
          </div>
        </div>
      </div>

      {/* Scroll Indicator (hidden on mobile to avoid overlapping value chips) */}
      <div aria-hidden="true" className="hidden sm:block absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce pointer-events-none">
        <div className="w-6 h-10 rounded-full border-2 border-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-3 rounded-full bg-foreground/30 animate-pulse" />
        </div>
      </div>
    </section>
  );
}

function MetricItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold" style={{ background: 'var(--gradient-hero)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent' }}>
        {value}
      </div>
      <div className="text-sm md:text-base mt-1" style={{ color: 'var(--text-secondary)' }}>{label}</div>
    </div>
  );
}

function ValuePropPill({ text }: { text: string }) {
  return (
    <div className="px-4 py-2 glass rounded-full text-sm font-medium transition-all duration-300 hover:scale-105" style={{ borderColor: 'var(--accent-500)' }}>
      {text}
    </div>
  );
}
