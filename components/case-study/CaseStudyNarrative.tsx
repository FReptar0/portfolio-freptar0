import { useTranslations } from 'next-intl';
import { Target, Settings, TrendingUp, Rocket } from 'lucide-react';

interface CaseStudyNarrativeProps {
  slug: string;
}

export default function CaseStudyNarrative({ slug }: CaseStudyNarrativeProps) {
  const t = useTranslations('caseStudy');

  const sections = [
    {
      key: 'problem',
      icon: Target,
      iconColor: 'text-red-500',
      borderColor: 'border-red-500/20',
    },
    {
      key: 'solution',
      icon: Settings,
      iconColor: 'text-blue-500',
      borderColor: 'border-blue-500/20',
    },
    {
      key: 'impact',
      icon: TrendingUp,
      iconColor: 'text-green-500',
      borderColor: 'border-green-500/20',
    },
  ] as const;

  return (
    <section className="py-12">
      <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
        {/* Overview */}
        <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-2xl p-8 md:p-12 mb-0">
          <h2 className="text-2xl font-bold mb-4">{t('sections.overview')}</h2>
          <p className="text-lg text-foreground/80 leading-relaxed">
            {t(`projects.${slug}.overview`)}
          </p>
        </div>

        {/* Section separator */}
        <div className="my-8 border-t border-foreground/[0.06]" aria-hidden="true" />

        {/* Problem / Solution / Impact */}
        <div className="space-y-8">
          {sections.map(({ key, icon: Icon, iconColor, borderColor }) => {
            const title = t(`projects.${slug}.${key}.title`);
            const paragraphs = t.raw(`projects.${slug}.${key}.paragraphs`) as string[];

            return (
              <div
                key={key}
                className={`bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-2xl p-8 md:p-12 border-l-4 ${borderColor}`}
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Icon className={`w-8 h-8 ${iconColor}`} />
                  {title}
                </h2>
                <div className="space-y-4">
                  {paragraphs.map((paragraph, i) => (
                    <p key={i} className="text-foreground/80 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}

          {/* What's Next - only render if the project has this section */}
          {(() => {
            try {
              const whatNextTitle = t(`projects.${slug}.whatNext.title`);
              const whatNextParagraphs = t.raw(`projects.${slug}.whatNext.paragraphs`) as string[];
              return (
                <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-2xl p-8 md:p-12 border-l-4 border-purple-500/20">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Rocket className="w-8 h-8 text-purple-500" />
                    {whatNextTitle}
                  </h2>
                  <div className="space-y-4">
                    {whatNextParagraphs.map((paragraph, i) => (
                      <p key={i} className="text-foreground/80 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-full text-sm font-medium text-purple-600 dark:text-purple-400">
                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                    {t('cta.evolution')}
                  </div>
                </div>
              );
            } catch {
              return null;
            }
          })()}
        </div>
      </div>
    </section>
  );
}
