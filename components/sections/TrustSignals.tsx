"use client";

export default function TrustSignals() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <TestimonialCard
            quote="Fernando transformed our architecture, reducing costs by 40% while improving performance. His technical leadership was invaluable."
            author="Sarah Chen"
            role="CTO, TechCorp"
            company="TechCorp"
          />
          <TestimonialCard
            quote="Best engineering hire we've made. Fernando doesn't just write code - he solves business problems with elegant technical solutions."
            author="Michael Rodriguez"
            role="VP Engineering, DataFlow"
            company="DataFlow"
          />
        </div>

        {/* Certifications & Skills Badges */}
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-6" style={{ color: 'var(--text-secondary)' }}>
            Certifications & Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <CertBadge text="AWS Certified" />
            <CertBadge text="Google Cloud" />
            <CertBadge text="React Expert" />
            <CertBadge text="Node.js Specialist" />
            <CertBadge text="TypeScript" />
            <CertBadge text="Docker & K8s" />
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  quote,
  author,
  role,
  company,
}: {
  quote: string;
  author: string;
  role: string;
  company: string;
}) {
  return (
    <div className="glass-card rounded-3xl p-8">
      <div className="flex flex-col h-full">
        <div className="text-4xl mb-4" style={{ color: 'var(--primary-600)' }}>"</div>
        <p className="text-lg leading-relaxed mb-6 flex-grow" style={{ color: 'var(--text-secondary)' }}>
          {quote}
        </p>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center text-white font-bold">
            {author.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <div className="font-semibold text-foreground">{author}</div>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{role}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CertBadge({ text }: { text: string }) {
  return (
    <div className="px-6 py-3 glass rounded-full text-sm font-medium border hover:scale-105 transition-all duration-300 cursor-default" style={{ borderColor: 'var(--accent-500)' }}>
      <span className="mr-2" style={{ color: 'var(--success-500)' }}>✓</span>
      {text}
    </div>
  );
}
