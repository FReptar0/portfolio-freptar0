import { useTranslations } from 'next-intl';
import { ArrowLeft, Users } from 'lucide-react';
import Link from 'next/link';

interface CaseStudyHeroProps {
  slug: string;
  locale: string;
}

export default function CaseStudyHero({ slug, locale }: CaseStudyHeroProps) {
  const t = useTranslations('caseStudy');

  const headline = t(`projects.${slug}.headline`);
  const tagline = t(`projects.${slug}.tagline`);
  const role = t(`projects.${slug}.role`);
  const teamSize = t.raw(`projects.${slug}.teamSize`) as number;
  const tags = t.raw(`projects.${slug}.tags`) as string[];

  return (
    <section className="pt-32 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 apple-gradient-mesh pointer-events-none" aria-hidden="true" />
      <div className="relative z-10 container mx-auto px-6 lg:px-8 max-w-5xl">
        <Link
          href={`/${locale}/#projects`}
          className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          {t('nav.backToProjects')}
        </Link>

        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          <span className="bg-gradient-to-r from-primary-blue to-accent-purple bg-clip-text text-transparent">
            {headline}
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-foreground/70 mb-8 max-w-3xl">
          {tagline}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <span className="px-4 py-2 bg-primary-blue/20 rounded-full text-base font-bold">
            {role}
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm text-foreground/60">
            <Users className="w-4 h-4" />
            Team of {teamSize}
          </span>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 apple-glass rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
