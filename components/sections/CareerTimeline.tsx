"use client";

import { useState } from "react";
import { useTranslations } from 'next-intl';

export default function CareerTimeline() {
  const [activeIndex, setActiveIndex] = useState(3);
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
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('title')} <span className="bg-gradient-to-r from-primary-blue to-accent-purple bg-clip-text text-transparent">{t('titleAccent')}</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative">
          <div className="flex justify-between items-start relative gap-4 max-w-6xl mx-auto">
            {/* Timeline Line - connecting circles only; use percentage insets like Process to match length */}
            <div className="absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary-blue via-accent-purple to-primary-blue opacity-40 -z-10" />

            {timelineData.map((item, index) => (
              <TimelineNode
                key={item.year}
                {...item}
                isActive={activeIndex === index}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden space-y-8">
          {timelineData.map((item, index) => (
            <MobileTimelineNode
              key={item.year}
              {...item}
              isActive={activeIndex === index}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineNode({
  year,
  role,
  highlight,
  description,
  color,
  isActive,
  onClick,
}: {
  year: string;
  role: string;
  highlight: string;
  description: string[];
  color: string;
  isActive: boolean;
  onClick: () => void;
}) {
  // Handle both array and translated array format
  const descriptionArray = Array.isArray(description) ? description : description;
  return (
    <div className="flex flex-col items-center flex-1 group cursor-pointer" onClick={onClick}>
      {/* Year Badge */}
      <div
        className={`w-20 h-20 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold text-xl mb-4 transition-all duration-300 shadow-lg group-hover:scale-110 ${
          isActive ? "scale-110 shadow-2xl ring-4 ring-white/20" : ""
        }`}
      >
        {year}
      </div>

      {/* Content Card */}
      <div
        className={`apple-glass rounded-2xl p-6 w-full max-w-xs transition-all duration-300 group-hover:scale-105 ${
          isActive ? "ring-2 ring-primary-blue/50 shadow-xl" : ""
        }`}
      >
        <div className="text-center mb-3">
          <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${color} text-white mb-2`}>
            {highlight}
          </div>
          <h3 className="text-xl font-bold">{role}</h3>
        </div>
        <ul className="space-y-2 text-sm text-foreground/70">
          {descriptionArray.map((item: string, i: number) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-primary-blue mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MobileTimelineNode({
  year,
  role,
  highlight,
  description,
  color,
  isActive,
  onClick,
}: {
  year: string;
  role: string;
  highlight: string;
  description: string[];
  color: string;
  isActive: boolean;
  onClick: () => void;
}) {
  // Handle both array and translated array format
  const descriptionArray = Array.isArray(description) ? description : description;
  return (
    <div className="flex gap-4 cursor-pointer" onClick={onClick}>
      {/* Timeline indicator */}
      <div className="flex flex-col items-center">
        <div
          className={`w-16 h-16 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold transition-all duration-300 shadow-lg ${
            isActive ? "scale-110 shadow-2xl ring-4 ring-white/20" : ""
          }`}
        >
          {year}
        </div>
        <div className="w-1 flex-1 bg-gradient-to-b from-primary-blue to-transparent mt-2" />
      </div>

      {/* Content */}
      <div
        className={`apple-glass rounded-2xl p-6 flex-1 transition-all duration-300 ${
          isActive ? "ring-2 ring-primary-blue/50 shadow-xl" : ""
        }`}
      >
        <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${color} text-white mb-2`}>
          {highlight}
        </div>
        <h3 className="text-xl font-bold mb-3">{role}</h3>
        <ul className="space-y-2 text-sm text-foreground/70">
          {descriptionArray.map((item: string, i: number) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-primary-blue mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
