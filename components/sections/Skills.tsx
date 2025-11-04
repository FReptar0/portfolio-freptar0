"use client";

const skillCategories = [
  {
    title: "Frontend Development",
    icon: "🎨",
    skills: [
      {
        name: "React / Next.js",
        experience: "4 years",
        level: 95,
        project: "Built e-commerce platform serving 100K users",
      },
      {
        name: "TypeScript",
        experience: "3 years",
        level: 90,
        project: "Type-safe systems reducing bugs by 60%",
      },
      {
        name: "Tailwind CSS",
        experience: "3 years",
        level: 90,
        project: "Rapid UI development with consistent design",
      },
    ],
  },
  {
    title: "Backend & Infrastructure",
    icon: "⚙️",
    skills: [
      {
        name: "Node.js / Express",
        experience: "5 years",
        level: 95,
        project: "APIs handling 1M+ requests daily",
      },
      {
        name: "Python / FastAPI",
        experience: "3 years",
        level: 85,
        project: "ML pipelines and data processing systems",
      },
      {
        name: "PostgreSQL / MongoDB",
        experience: "4 years",
        level: 90,
        project: "Optimized queries for 10TB+ databases",
      },
    ],
  },
  {
    title: "DevOps & Cloud",
    icon: "☁️",
    skills: [
      {
        name: "AWS / GCP",
        experience: "4 years",
        level: 90,
        project: "Cloud infrastructure saving $200K annually",
      },
      {
        name: "Docker / Kubernetes",
        experience: "3 years",
        level: 85,
        project: "Containerized apps for seamless scaling",
      },
      {
        name: "CI/CD Pipelines",
        experience: "4 years",
        level: 90,
        project: "Automated deployments, 50+ releases/month",
      },
    ],
  },
  {
    title: "Leadership & Architecture",
    icon: "🚀",
    skills: [
      {
        name: "Team Leadership",
        experience: "2 years",
        level: 85,
        project: "Led team of 5 developers on critical projects",
      },
      {
        name: "System Design",
        experience: "3 years",
        level: 90,
        project: "Architected systems handling millions of users",
      },
      {
        name: "Agile / Scrum",
        experience: "5 years",
        level: 95,
        project: "Delivered 20+ projects on time and budget",
      },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Skills in <span className="bg-gradient-to-r from-primary-blue to-accent-purple bg-clip-text text-transparent">Context</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Not just buzzwords - real experience with measurable impact
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
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
    <div className="apple-glass rounded-3xl p-8 hover:scale-[1.02] transition-transform duration-300">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl">{icon}</span>
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
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-semibold text-lg">{name}</h4>
          <p className="text-sm text-foreground/60">{experience}</p>
        </div>
        <span className="text-sm font-bold text-primary-blue">{level}%</span>
      </div>

      {/* Progress Bar */}
      <div className="relative h-2 bg-foreground/10 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-blue to-accent-purple rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${level}%` }}
        />
      </div>

      {/* Project Context */}
      <p className="text-sm text-foreground/70 italic">
        💼 {project}
      </p>
    </div>
  );
}
