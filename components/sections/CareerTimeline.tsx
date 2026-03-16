"use client";

import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function CareerTimeline() {
  const t = useTranslations('timeline');
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  const timelineData = [
    {
      year: t('roles.university.year'),
      role: t('roles.university.role'),
      highlight: t('roles.university.highlight'),
      description: [
        t('roles.university.description0'),
        t('roles.university.description1'),
        t('roles.university.description2')
      ],
      color: t('roles.university.color'),
    },
    {
      year: t('roles.sageconnect.year'),
      role: t('roles.sageconnect.role'),
      highlight: t('roles.sageconnect.highlight'),
      description: [
        t('roles.sageconnect.description0'),
        t('roles.sageconnect.description1'),
        t('roles.sageconnect.description2')
      ],
      color: t('roles.sageconnect.color'),
    },
    {
      year: t('roles.cardeal.year'),
      role: t('roles.cardeal.role'),
      highlight: t('roles.cardeal.highlight'),
      description: [
        t('roles.cardeal.description0'),
        t('roles.cardeal.description1'),
        t('roles.cardeal.description2')
      ],
      color: t('roles.cardeal.color'),
    },
    {
      year: t('roles.tersoft.year'),
      role: t('roles.tersoft.role'),
      highlight: t('roles.tersoft.highlight'),
      description: [
        t('roles.tersoft.description0'),
        t('roles.tersoft.description1'),
        t('roles.tersoft.description2')
      ],
      color: t('roles.tersoft.color'),
    },
  ];

  return (
    <section id="timeline" ref={sectionRef} className="py-24 relative">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        {/* Left-aligned header */}
        <div className={`mb-16 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            {t('title')} <span className="text-[var(--color-accent)]">{t('titleAccent')}</span>
          </h2>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            {t('subtitle')}
          </p>
        </div>

        {/* Left-aligned vertical timeline */}
        <div className="relative pl-16 md:pl-20">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-10 top-0 bottom-0 w-px bg-[var(--color-border)]" />

          {timelineData.map((item, index) => (
            <TimelineEntry
              key={item.year}
              {...item}
              isLast={index === timelineData.length - 1}
              index={index}
              isParentVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineEntry({
  year,
  role,
  highlight,
  description,
  color,
  isLast,
  index,
  isParentVisible,
}: {
  year: string;
  role: string;
  highlight: string;
  description: string[];
  color: string;
  isLast: boolean;
  index: number;
  isParentVisible: boolean;
}) {
  return (
    <div
      className={`flex items-start gap-8 transition-all duration-500 border-l-2 border-transparent hover:border-[var(--color-accent)] pl-4 ${
        isParentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      } ${isLast ? '' : 'border-b border-b-[var(--color-border)] pb-8 mb-8'}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Year circle - positioned over the vertical line */}
      <div
        className={`w-16 h-16 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold font-mono text-lg flex-shrink-0 -ml-16 md:-ml-20 shadow-lg`}
      >
        {year}
      </div>

      {/* Content */}
      <div className="flex-1 pt-1">
        <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${color} text-white mb-2`}>
          {highlight}
        </div>
        <h3 className="text-xl font-heading font-bold text-foreground mb-3">{role}</h3>
        <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
          {description.map((item: string, i: number) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-[var(--color-accent)] mt-1 flex-shrink-0">--</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
