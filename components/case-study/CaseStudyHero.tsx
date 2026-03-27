import { useTranslations } from 'next-intl';
import { ArrowLeft, Users, Globe, Play, UserPlus, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  globe: Globe,
  play: Play,
  'user-plus': UserPlus,
};

interface CaseStudyHeroProps {
  slug: string;
  locale: string;
}

export default function CaseStudyHero({ slug, locale }: CaseStudyHeroProps) {
  const t = useTranslations('caseStudy');

  const headline = t(`projects.${slug}.headline`);
  const tagline = t(`projects.${slug}.tagline`);
  const role = t(`projects.${slug}.role`);
  const teamRoles = t.raw(`projects.${slug}.teamRoles`) as string[];
  const tags = t.raw(`projects.${slug}.tags`) as string[];

  let links: Array<{ label: string; url: string; icon: string }> = [];
  try {
    const raw = t.raw(`projects.${slug}.links`);
    if (Array.isArray(raw)) links = raw;
  } catch {
    // no links for this project
  }

  return (
    <section className="pt-32 pb-16 relative overflow-hidden">
      {/* Background removed — clean surface */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8 max-w-5xl">
        <Link
          href={`/${locale}/#projects`}
          className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          {t('nav.backToProjects')}
        </Link>

        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          <span className="text-[var(--color-accent)]">
            {headline}
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-foreground/70 mb-8 max-w-3xl">
          {tagline}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <span className="px-4 py-2 bg-[var(--color-accent-muted)] rounded-full text-base font-bold">
            {role}
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm text-foreground/60">
            <Users className="w-4 h-4" />
            {teamRoles.join(' / ')}
          </span>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-full text-sm font-medium font-mono"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {links.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-8">
            {links.map((link, i) => {
              const Icon = iconMap[link.icon] || ExternalLink;
              return (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    i === 0
                      ? 'bg-[var(--color-accent)] text-[var(--color-on-accent)] hover:bg-[var(--color-accent-hover)]'
                      : 'bg-[var(--color-surface-elevated)] border border-[var(--color-border)] hover:border-[var(--color-accent)]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                  <ExternalLink className="w-3.5 h-3.5 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
