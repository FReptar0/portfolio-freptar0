"use client";

import { useTranslations } from 'next-intl';
import { Palette, Cog, Cloud, Rocket, Briefcase } from 'lucide-react';

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

  const skillCategories = t.raw('categories');
  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('title')} <span className="bg-gradient-to-r from-primary-blue to-accent-purple bg-clip-text text-transparent">{t('titleAccent')}</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category: { title: string; icon: string; skills: Array<{ name: string; experience: string; level: number; project: string; }> }, index: number) => (
            <SkillCategory key={index} {...category} />
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
}: {
  title: string;
  icon: string;
  skills: Array<{
    name: string;
    experience: string;
    level: number;
    project: string;
  }>;
}) {
  return (
    <div className="apple-glass rounded-3xl p-6 sm:p-8 hover:scale-[1.02] transition-transform duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-primary-blue">{getIcon(icon, "w-10 h-10")}</div>
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>

      <div className="space-y-6">
        {skills.map((skill, index) => (
          <SkillItem key={index} {...skill} />
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
}: {
  name: string;
  experience: string;
  level: number;
  project: string;
}) {
  const t = useTranslations('skills');
  
  // Map numeric level to a human-friendly label and a 0-5 dot indicator
  const filledDots = Math.round(level / 20); // 0-5
  const proficiencyLabel =
    level >= 90 ? t('proficiencyLabels.expert') : 
    level >= 75 ? t('proficiencyLabels.advanced') : 
    level >= 50 ? t('proficiencyLabels.intermediate') : 
    t('proficiencyLabels.familiar');

  return (
  <div className="space-y-3">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-semibold text-lg">{name}</h4>
          <p className="text-sm text-foreground/60">{experience}</p>
        </div>

        {/* Dots + label instead of percent */}
        <div className="flex items-center gap-3" aria-label={`${proficiencyLabel} proficiency`}>
          <div className="flex items-center gap-2" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={`w-3 h-3 rounded-full transition-colors transform ${
                  i < filledDots
                    ? "bg-primary-blue shadow-md scale-100"
                    : "bg-foreground/20 ring-1 ring-foreground/6"
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-foreground/70">{proficiencyLabel}</span>
        </div>
      </div>

      {/* Project Context */}
      <p className="text-sm text-foreground/70 italic flex items-start gap-2">
        <Briefcase className="w-4 h-4 text-primary-blue mt-0.5 flex-shrink-0" />
        {project}
      </p>
    </div>
  );
}
