"use client";

import { useTranslations } from 'next-intl';
import { Search, Compass, Zap, Rocket } from 'lucide-react';

const getIcon = (iconName: string, className?: string) => {
  const iconProps = { className: className || "w-6 h-6" };
  switch (iconName) {
    case 'search': return <Search {...iconProps} />;
    case 'compass': return <Compass {...iconProps} />;
    case 'zap': return <Zap {...iconProps} />;
    case 'rocket': return <Rocket {...iconProps} />;
    default: return null;
  }
};

export default function Process() {
  const t = useTranslations('process');

  const processSteps = [
    {
      number: "1",
      title: t('steps.discovery.title'),
      description: t('steps.discovery.description'),
      activities: [
        t('steps.discovery.activity0'),
        t('steps.discovery.activity1'),
        t('steps.discovery.activity2'),
        t('steps.discovery.activity3')
      ],
      icon: "search",
      color: "from-blue-500 to-cyan-500",
    },
    {
      number: "2",
      title: t('steps.architecture.title'),
      description: t('steps.architecture.description'),
      activities: [
        t('steps.architecture.activity0'),
        t('steps.architecture.activity1'),
        t('steps.architecture.activity2'),
        t('steps.architecture.activity3')
      ],
      icon: "compass",
      color: "from-purple-500 to-pink-500",
    },
    {
      number: "3",
      title: t('steps.implementation.title'),
      description: t('steps.implementation.description'),
      activities: [
        t('steps.implementation.activity0'),
        t('steps.implementation.activity1'),
        t('steps.implementation.activity2'),
        t('steps.implementation.activity3')
      ],
      icon: "zap",
      color: "from-orange-500 to-red-500",
    },
    {
      number: "4",
      title: t('steps.delivery.title'),
      description: t('steps.delivery.description'),
      activities: [
        t('steps.delivery.activity0'),
        t('steps.delivery.activity1'),
        t('steps.delivery.activity2'),
        t('steps.delivery.activity3')
      ],
      icon: "rocket",
      color: "from-green-500 to-emerald-500",
    },
  ];
  return (
    <section id="process" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 apple-gradient-mesh opacity-30" />

      <div className="relative container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('title')} <span className="bg-gradient-to-r from-primary-blue to-accent-purple bg-clip-text text-transparent">{t('titleAccent')}</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Desktop View - Horizontal */}
        <div className="hidden lg:block mb-24">
          <div className="grid grid-cols-4 gap-8 relative">
            {/* Connection Line - connecting circles only */}
            <div className="absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary-blue via-accent-purple to-success-green opacity-40 -z-10" />

            {processSteps.map((step, index) => (
              <ProcessCard key={index} {...step} index={index} />
            ))}
          </div>
        </div>

        {/* Mobile View - Vertical */}
        <div className="lg:hidden space-y-8 mb-24">
          {processSteps.map((step, index) => (
            <ProcessCardMobile key={index} {...step} index={index} total={processSteps.length} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center apple-glass rounded-3xl p-8">
          <h3 className="text-2xl font-bold mb-4">
            {t('cta.title')}
          </h3>
          <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-primary-blue hover:bg-primary-blue/90 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            {t('cta.button')}
          </a>
        </div>
      </div>
    </section>
  );
}

function ProcessCard({
  number,
  title,
  description,
  activities,
  icon,
  color,
  index,
}: {
  number: string;
  title: string;
  description: string;
  activities: string[];
  icon: string;
  color: string;
  index: number;
}) {
  return (
    <div className="group">
      {/* Number Badge */}
      <div className="flex justify-center mb-6">
        <div
          className={`w-16 h-16 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
        >
          {number}
        </div>
      </div>

      {/* Card */}
      <div className="apple-glass rounded-2xl p-6 h-full hover:scale-105 transition-all duration-300">
        <div className="mb-4">{getIcon(icon, "w-12 h-12 text-white")}</div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-sm text-foreground/70 leading-relaxed mb-4">
          {description}
        </p>

        {/* Activities */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wide">
            Key Activities
          </p>
          <ul className="space-y-1">
            {activities.map((activity, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-primary-blue mt-0.5">•</span>
                <span className="text-foreground/70">{activity}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ProcessCardMobile({
  number,
  title,
  description,
  activities,
  icon,
  color,
  index,
  total,
}: {
  number: string;
  title: string;
  description: string;
  activities: string[];
  icon: string;
  color: string;
  index: number;
  total: number;
}) {
  return (
    <div className="flex gap-4">
      {/* Left side - Number */}
      <div className="flex flex-col items-center">
        <div
          className={`w-14 h-14 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold text-xl shadow-lg flex-shrink-0`}
        >
          {number}
        </div>
        {index < total - 1 && (
          <div className="w-1 flex-1 bg-gradient-to-b from-primary-blue to-transparent mt-2" />
        )}
      </div>

      {/* Right side - Content */}
      <div className="apple-glass rounded-2xl p-6 flex-1">
        <div className="mb-3">{getIcon(icon, "w-8 h-8 text-white")}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm text-foreground/70 leading-relaxed mb-4">
          {description}
        </p>

        {/* Activities */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wide">
            Key Activities
          </p>
          <ul className="space-y-1">
            {activities.map((activity, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-primary-blue mt-0.5">•</span>
                <span className="text-foreground/70">{activity}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
