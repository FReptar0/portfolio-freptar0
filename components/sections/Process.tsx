"use client";

const processSteps = [
  {
    number: "1",
    title: "Discovery",
    description:
      "I analyze your business needs, technical constraints, and success criteria. No cookie-cutter solutions - every project is unique.",
    activities: [
      "Stakeholder interviews",
      "Technical audit",
      "Requirements gathering",
      "Success metrics definition",
    ],
    icon: "🔍",
    color: "from-blue-500 to-cyan-500",
  },
  {
    number: "2",
    title: "Architecture",
    description:
      "Design scalable, maintainable solutions with clear milestones and realistic timelines. You'll know exactly what to expect.",
    activities: [
      "System design",
      "Technology selection",
      "Risk assessment",
      "Roadmap creation",
    ],
    icon: "📐",
    color: "from-purple-500 to-pink-500",
  },
  {
    number: "3",
    title: "Implementation",
    description:
      "Agile development with continuous communication. You'll see progress every week, not just at the end.",
    activities: [
      "Iterative development",
      "Weekly demos",
      "Code reviews",
      "Quality assurance",
    ],
    icon: "⚡",
    color: "from-orange-500 to-red-500",
  },
  {
    number: "4",
    title: "Delivery",
    description:
      "Smooth deployment, comprehensive documentation, and knowledge transfer. Your team will be fully equipped to maintain and extend the system.",
    activities: [
      "Production deployment",
      "Documentation",
      "Team training",
      "Post-launch support",
    ],
    icon: "🚀",
    color: "from-green-500 to-emerald-500",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 apple-gradient-mesh opacity-30" />

      <div className="relative container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How I <span className="bg-gradient-to-r from-primary-blue to-accent-purple bg-clip-text text-transparent">Work</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            A proven process that delivers results on time and on budget
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
            <ProcessCardMobile key={index} {...step} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center apple-glass rounded-3xl p-8">
          <h3 className="text-2xl font-bold mb-4">
            Ready to start your project?
          </h3>
          <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
            Let's discuss your needs and create a custom plan that delivers real value to your business.
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-primary-blue hover:bg-primary-blue/90 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Schedule a Free Consultation
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
        <div className="text-4xl mb-4">{icon}</div>
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
    <div className="flex gap-4">
      {/* Left side - Number */}
      <div className="flex flex-col items-center">
        <div
          className={`w-14 h-14 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold text-xl shadow-lg flex-shrink-0`}
        >
          {number}
        </div>
        {index < processSteps.length - 1 && (
          <div className="w-1 flex-1 bg-gradient-to-b from-primary-blue to-transparent mt-2" />
        )}
      </div>

      {/* Right side - Content */}
      <div className="apple-glass rounded-2xl p-6 flex-1">
        <div className="text-3xl mb-3">{icon}</div>
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
