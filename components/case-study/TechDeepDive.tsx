"use client";

import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

const diagrams: Record<string, React.ComponentType> = {
  sageconnect: dynamic(() => import('@/components/diagrams/SageConnectDiagram')),
  sagesync: dynamic(() => import('@/components/diagrams/SageSyncDiagram')),
  cardeal: dynamic(() => import('@/components/diagrams/QardealDiagram')),
  odoo: dynamic(() => import('@/components/diagrams/OdooDiagram')),
  gymmanager: dynamic(() => import('@/components/diagrams/GymManagerDiagram')),
  cleany: dynamic(() => import('@/components/diagrams/CleanyDiagram')),
  carrytrade: dynamic(() => import('@/components/diagrams/CarryTradeDiagram')),
};

interface TechDeepDiveProps {
  slug: string;
}

export default function TechDeepDive({ slug }: TechDeepDiveProps) {
  const t = useTranslations('caseStudy');

  const DiagramComponent = diagrams[slug];
  const dataFlow = t.raw(`projects.${slug}.tech.dataFlow`) as string[];
  const codePatterns = t.raw(`projects.${slug}.tech.codePatterns`) as Array<{
    title: string;
    description: string;
  }>;
  const systemMetrics = t.raw(`projects.${slug}.tech.systemMetrics`) as Array<{
    label: string;
    value: string;
  }>;

  return (
    <div className="space-y-12">
      {/* Architecture Diagram */}
      {DiagramComponent && (
        <section>
          <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
            <h2 className="text-2xl font-bold mb-6">{t('sections.architecture')}</h2>
            <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-2xl p-6 md:p-10 overflow-x-auto">
              <div className="min-w-[640px]">
                <DiagramComponent />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Data Flow */}
      <section>
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          <h2 className="text-2xl font-bold mb-6">{t('sections.dataFlow')}</h2>
          <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-2xl p-6 md:p-10">
            <ol className="space-y-4">
              {dataFlow.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center text-sm font-bold font-mono">
                    {i + 1}
                  </span>
                  <p className="text-foreground/80 pt-1">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Code Patterns */}
      <section>
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          <h2 className="text-2xl font-bold mb-6">{t('sections.codePatterns')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {codePatterns.map((pattern, i) => (
              <div key={i} className="bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-3">{pattern.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {pattern.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Metrics */}
      <section>
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          <h2 className="text-2xl font-bold mb-6">{t('sections.systemMetrics')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {systemMetrics.map((metric, i) => (
              <div
                key={i}
                className="bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-2xl p-6 text-center"
              >
                <div className="text-2xl font-bold font-mono text-[var(--color-accent)] mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-foreground/60">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
