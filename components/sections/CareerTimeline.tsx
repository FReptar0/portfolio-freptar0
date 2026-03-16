"use client";

import { useTranslations } from 'next-intl';

export default function CareerTimeline() {
  const t = useTranslations('timeline');

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
    <section id="timeline" className="py-24 relative">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        {/* Left-aligned header */}
        <div className="mb-16">
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
}: {
  year: string;
  role: string;
  highlight: string;
  description: string[];
  color: string;
  isLast: boolean;
}) {
  return (
    <div className={`flex items-start gap-8 ${isLast ? '' : 'border-b border-[var(--color-border)] pb-8 mb-8'}`}>
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
