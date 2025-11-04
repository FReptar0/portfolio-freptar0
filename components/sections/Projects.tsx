"use client";

import { useState } from "react";

interface Project {
  id: string;
  title: string;
  businessProblem: string;
  myContribution: {
    role: string;
    teamSize: number;
    responsibilities: string[];
  };
  technicalSolution: {
    stack: string[];
    architecture: string;
    keyDecisions: string[];
  };
  businessImpact: {
    metrics: Array<{ label: string; value: string }>;
  };
  tags: string[];
}

const projects: Project[] = [
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform Transformation",
    businessProblem:
      "Legacy e-commerce system causing $50K/month in lost revenue due to 8-second page loads and frequent crashes during peak traffic.",
    myContribution: {
      role: "Lead Developer",
      teamSize: 5,
      responsibilities: [
        "Architected microservices migration strategy",
        "Led frontend performance optimization",
        "Implemented real-time inventory system",
      ],
    },
    technicalSolution: {
      stack: ["React", "Next.js", "Node.js", "PostgreSQL", "Redis", "AWS"],
      architecture: "Microservices",
      keyDecisions: [
        "Migrated to Next.js for SSR and better SEO",
        "Implemented edge caching with CloudFront",
        "Real-time inventory with Redis pub/sub",
      ],
    },
    businessImpact: {
      metrics: [
        { label: "Performance", value: "75% faster load times" },
        { label: "Revenue", value: "$200K annual savings" },
        { label: "Scale", value: "100K daily active users" },
        { label: "Uptime", value: "99.9% availability" },
      ],
    },
    tags: ["Full-Stack", "Performance", "E-Commerce"],
  },
  {
    id: "data-analytics",
    title: "Real-Time Analytics Dashboard",
    businessProblem:
      "Marketing team unable to make data-driven decisions due to 24-hour data lag and complex reporting process.",
    myContribution: {
      role: "Tech Lead",
      teamSize: 3,
      responsibilities: [
        "Designed real-time data pipeline",
        "Built interactive dashboard UI",
        "Optimized query performance",
      ],
    },
    technicalSolution: {
      stack: ["React", "TypeScript", "Python", "Kafka", "TimescaleDB", "Docker"],
      architecture: "Event-Driven",
      keyDecisions: [
        "Used Kafka for real-time event streaming",
        "TimescaleDB for time-series data optimization",
        "WebSocket connections for live updates",
      ],
    },
    businessImpact: {
      metrics: [
        { label: "Data Freshness", value: "Real-time (< 1s)" },
        { label: "Decision Speed", value: "10x faster" },
        { label: "Cost Reduction", value: "40% lower infra costs" },
        { label: "User Adoption", value: "95% team usage" },
      ],
    },
    tags: ["Data Engineering", "Real-Time", "Leadership"],
  },
  {
    id: "mobile-app",
    title: "Cross-Platform Mobile App",
    businessProblem:
      "Company needed mobile presence but couldn't afford separate iOS and Android teams. Time to market was critical.",
    myContribution: {
      role: "Senior Engineer",
      teamSize: 4,
      responsibilities: [
        "Led mobile architecture design",
        "Implemented core features",
        "Set up CI/CD pipeline",
      ],
    },
    technicalSolution: {
      stack: ["React Native", "TypeScript", "GraphQL", "AWS Amplify", "Jest"],
      architecture: "Serverless",
      keyDecisions: [
        "React Native for code sharing (90% shared)",
        "GraphQL for efficient data fetching",
        "AWS Amplify for rapid backend setup",
      ],
    },
    businessImpact: {
      metrics: [
        { label: "Development Time", value: "6 months vs 12" },
        { label: "Code Sharing", value: "90% between platforms" },
        { label: "App Store Rating", value: "4.8/5 stars" },
        { label: "Active Users", value: "50K+ downloads" },
      ],
    },
    tags: ["Mobile", "Cross-Platform", "Serverless"],
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<string>(projects[0].id);
  const project = projects.find((p) => p.id === selectedProject) || projects[0];

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Success <span className="bg-gradient-to-r from-primary-blue to-accent-purple bg-clip-text text-transparent">Stories</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Real projects, measurable results, lasting impact
          </p>
        </div>

        {/* Project Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {projects.map((proj) => (
            <button
              key={proj.id}
              onClick={() => setSelectedProject(proj.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                selectedProject === proj.id
                  ? "bg-primary-blue text-white shadow-lg shadow-primary-blue/30"
                  : "apple-glass hover:scale-105"
              }`}
            >
              {proj.title}
            </button>
          ))}
        </div>

        {/* Project Details */}
        <div className="apple-glass rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Problem */}
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-3xl">🎯</span> The Challenge
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  {project.businessProblem}
                </p>
              </div>

              {/* My Role */}
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-3xl">👤</span> My Role
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-primary-blue/20 rounded-full text-sm font-medium">
                      {project.myContribution.role}
                    </span>
                    <span className="text-sm text-foreground/60">
                      Team of {project.myContribution.teamSize}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {project.myContribution.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary-blue mt-1">✓</span>
                        <span className="text-foreground/80">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technical Solution */}
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-3xl">⚙️</span> Solution
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground/60 mb-2">
                      Architecture: {project.technicalSolution.architecture}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technicalSolution.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-foreground/5 rounded-lg text-sm font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {project.technicalSolution.keyDecisions.map((decision, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-accent-purple mt-1">→</span>
                        <span className="text-foreground/70">{decision}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column - Impact */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="text-3xl">📈</span> Business Impact
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {project.businessImpact.metrics.map((metric, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-primary-blue/10 to-accent-purple/10 rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300"
                  >
                    <div className="text-3xl font-bold bg-gradient-to-r from-primary-blue to-accent-purple bg-clip-text text-transparent mb-2">
                      {metric.value}
                    </div>
                    <div className="text-sm text-foreground/60">{metric.label}</div>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="mt-8">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 apple-glass rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 p-6 bg-gradient-to-r from-primary-blue/20 to-accent-purple/20 rounded-2xl">
                <p className="text-lg font-semibold mb-4">
                  Want similar results for your project?
                </p>
                <a
                  href="#contact"
                  className="inline-block px-6 py-3 bg-primary-blue hover:bg-primary-blue/90 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                >
                  Let's Talk
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
