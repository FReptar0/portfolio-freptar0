"use client";

import { useTranslations } from 'next-intl';
import { Palette, Cog, Cloud, Rocket, Briefcase } from 'lucide-react';
import { useScrollReveal, useStaggerChildren } from '@/hooks/useScrollReveal';

const getIcon = (iconName: string, className?: string) => {
  const iconProps = { className: className || "w-8 h-8" };
  switch (iconName) {
    case 'palette': return <Palette {...iconProps} />;
    case 'cog': return <Cog {...iconProps} />;
    case 'cloud': return <Cloud {...iconProps} />;
    case 'rocket': return <Rocket {...iconProps} />;
    default: return null;
  }
};

export default function Skills() {
  const t = useTranslations('skills');
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  const skillCategories = t.raw('categories');
  return (
    <section id="skills" ref={sectionRef} className="py-24 relative">
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

        {/* Full-width category list */}
        <div>
          {skillCategories.map((category: { title: string; icon: string; skills: Array<{ name: string; experience: string; level: number; project: string; }> }, index: number) => (
            <SkillCategory key={index} {...category} isFirst={index === 0} index={index} isParentVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCategory({
  title,
  icon,
  skills,
  isFirst,
  index,
  isParentVisible,
}: {
  title: string;
  icon: string;
  skills: Array<{
    name: string;
    experience: string;
    level: number;
    project: string;
  }>;
  isFirst: boolean;
  index: number;
  isParentVisible: boolean;
}) {
  const skillStagger = useStaggerChildren(30);

  return (
    <div
      className={`transition-all duration-500 ${isParentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${isFirst ? '' : 'border-t border-[var(--color-border)] pt-8 mt-8'}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      {/* Category title row */}
      <div className="flex items-center gap-3 mb-6">
        <div className="text-[var(--color-accent)]">{getIcon(icon, "w-8 h-8")}</div>
        <h3 className="text-2xl font-heading font-semibold text-foreground">{title}</h3>
      </div>

      {/* Skills grid - asymmetric 3-col on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, skillIndex) => (
          <SkillItem key={skillIndex} {...skill} index={skillIndex} isParentVisible={isParentVisible} stagger={skillStagger} categoryDelay={index * 60} />
        ))}
      </div>
    </div>
  );
}

function SkillItem({
  name,
  experience,
  level,
  project,
  index,
  isParentVisible,
  stagger,
  categoryDelay,
}: {
  name: string;
  experience: string;
  level: number;
  project: string;
  index: number;
  isParentVisible: boolean;
  stagger: { getDelay: (index: number) => { transitionDelay: string } };
  categoryDelay: number;
}) {
  const t = useTranslations('skills');

  const filledDots = Math.round(level / 20);
  const proficiencyLabel =
    level >= 90 ? t('proficiencyLabels.expert') :
    level >= 75 ? t('proficiencyLabels.advanced') :
    level >= 50 ? t('proficiencyLabels.intermediate') :
    t('proficiencyLabels.familiar');

  return (
    <div
      className={`space-y-2 transition-all duration-500 ${isParentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
      style={{ transitionDelay: `${categoryDelay + (index * 30)}ms` }}
    >
      <div>
        <h4 className="font-semibold text-lg text-foreground">{name}</h4>
        <p className="font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>{experience}</p>
      </div>

      {/* Proficiency dots + label */}
      <div className="flex items-center gap-3" aria-label={`${proficiencyLabel} proficiency`}>
        <div className="flex items-center gap-2" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full transition-colors ${
                i < filledDots
                  ? "bg-[var(--color-accent)]"
                  : "bg-foreground/20 ring-1 ring-foreground/6"
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-semibold font-mono" style={{ color: 'var(--text-secondary)' }}>{proficiencyLabel}</span>
      </div>

      {/* Project Context */}
      <p className="text-sm italic flex items-start gap-2" style={{ color: 'var(--text-secondary)' }}>
        <Briefcase className="w-4 h-4 text-[var(--color-accent)] mt-0.5 flex-shrink-0" />
        {project}
      </p>
    </div>
  );
}
