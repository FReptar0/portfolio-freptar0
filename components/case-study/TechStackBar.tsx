import { useTranslations } from 'next-intl';

interface TechStackBarProps {
  slug: string;
}

export default function TechStackBar({ slug }: TechStackBarProps) {
  const t = useTranslations('caseStudy');

  const stack = t.raw(`projects.${slug}.tech.stack`) as string[];
  const architecture = t(`projects.${slug}.tech.architecture`);

  return (
    <section className="py-8">
      <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
        <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-2xl p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-4">
            <h3 className="text-lg font-bold mr-4">{t('sections.techStack')}</h3>
            <div className="flex flex-wrap gap-2">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-foreground/5 rounded-lg text-sm font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
            <span className="ml-auto text-sm text-foreground/60">
              {t('sections.architecture')}: {architecture}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
