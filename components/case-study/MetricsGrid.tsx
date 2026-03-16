"use client";

interface MetricsGridProps {
  metrics: Array<{ value: string; label: string }>;
}

export default function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric, i) => (
            <div
              key={i}
              className="bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-2xl p-6 md:p-8 text-center hover:border-[var(--color-accent)] transition-colors duration-300"
            >
              <div className="text-3xl md:text-4xl font-bold font-mono text-[var(--color-accent)] mb-2">
                {metric.value}
              </div>
              <div className="text-sm text-foreground/60">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
