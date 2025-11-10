"use client";

import { useState } from "react";
import { useTranslations } from 'next-intl';
import { Target, User, Settings, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

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


export default function Projects() {
  const t = useTranslations('projects');
  
  const projects = [
    {
      id: "ecommerce",
      title: t('items.ecommerce.title'),
      businessProblem: t('items.ecommerce.businessProblem'),
      myContribution: {
        role: t('items.ecommerce.myContribution.role'),
        teamSize: t.raw('items.ecommerce.myContribution.teamSize') as number,
        responsibilities: [
          t('items.ecommerce.myContribution.responsibility0'),
          t('items.ecommerce.myContribution.responsibility1'),
          t('items.ecommerce.myContribution.responsibility2')
        ],
      },
      technicalSolution: {
        stack: t.raw('items.ecommerce.technicalSolution.stack') as string[],
        architecture: t('items.ecommerce.technicalSolution.architecture'),
        keyDecisions: [
          t('items.ecommerce.technicalSolution.keyDecision0'),
          t('items.ecommerce.technicalSolution.keyDecision1'),
          t('items.ecommerce.technicalSolution.keyDecision2')
        ],
      },
      businessImpact: {
        metrics: [
          { label: t('items.ecommerce.businessImpact.metric0.label'), value: t('items.ecommerce.businessImpact.metric0.value') },
          { label: t('items.ecommerce.businessImpact.metric1.label'), value: t('items.ecommerce.businessImpact.metric1.value') },
          { label: t('items.ecommerce.businessImpact.metric2.label'), value: t('items.ecommerce.businessImpact.metric2.value') },
          { label: t('items.ecommerce.businessImpact.metric3.label'), value: t('items.ecommerce.businessImpact.metric3.value') }
        ],
      },
      tags: t.raw('items.ecommerce.tags') as string[],
    },
    {
      id: "analytics", 
      title: t('items.analytics.title'),
      businessProblem: t('items.analytics.businessProblem'),
      myContribution: {
        role: t('items.analytics.myContribution.role'),
        teamSize: t.raw('items.analytics.myContribution.teamSize') as number,
        responsibilities: [
          t('items.analytics.myContribution.responsibility0'),
          t('items.analytics.myContribution.responsibility1'),
          t('items.analytics.myContribution.responsibility2')
        ],
      },
      technicalSolution: {
        stack: t.raw('items.analytics.technicalSolution.stack') as string[],
        architecture: t('items.analytics.technicalSolution.architecture'),
        keyDecisions: [
          t('items.analytics.technicalSolution.keyDecision0'),
          t('items.analytics.technicalSolution.keyDecision1'),
          t('items.analytics.technicalSolution.keyDecision2')
        ],
      },
      businessImpact: {
        metrics: [
          { label: t('items.analytics.businessImpact.metric0.label'), value: t('items.analytics.businessImpact.metric0.value') },
          { label: t('items.analytics.businessImpact.metric1.label'), value: t('items.analytics.businessImpact.metric1.value') },
          { label: t('items.analytics.businessImpact.metric2.label'), value: t('items.analytics.businessImpact.metric2.value') },
          { label: t('items.analytics.businessImpact.metric3.label'), value: t('items.analytics.businessImpact.metric3.value') }
        ],
      },
      tags: t.raw('items.analytics.tags') as string[],
    },
    {
      id: "mobile",
      title: t('items.mobile.title'),
      businessProblem: t('items.mobile.businessProblem'),
      myContribution: {
        role: t('items.mobile.myContribution.role'),
        teamSize: t.raw('items.mobile.myContribution.teamSize') as number,
        responsibilities: [
          t('items.mobile.myContribution.responsibility0'),
          t('items.mobile.myContribution.responsibility1'),
          t('items.mobile.myContribution.responsibility2')
        ],
      },
      technicalSolution: {
        stack: t.raw('items.mobile.technicalSolution.stack') as string[],
        architecture: t('items.mobile.technicalSolution.architecture'),
        keyDecisions: [
          t('items.mobile.technicalSolution.keyDecision0'),
          t('items.mobile.technicalSolution.keyDecision1'),
          t('items.mobile.technicalSolution.keyDecision2')
        ],
      },
      businessImpact: {
        metrics: [
          { label: t('items.mobile.businessImpact.metric0.label'), value: t('items.mobile.businessImpact.metric0.value') },
          { label: t('items.mobile.businessImpact.metric1.label'), value: t('items.mobile.businessImpact.metric1.value') },
          { label: t('items.mobile.businessImpact.metric2.label'), value: t('items.mobile.businessImpact.metric2.value') },
          { label: t('items.mobile.businessImpact.metric3.label'), value: t('items.mobile.businessImpact.metric3.value') }
        ],
      },
      tags: t.raw('items.mobile.tags') as string[],
    },
  ];

  const [selectedProject, setSelectedProject] = useState<string>(projects[0].id);
  const project = projects.find((p) => p.id === selectedProject) || projects[0];

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('title')} <span className="bg-gradient-to-r from-primary-blue to-accent-purple bg-clip-text text-transparent">{t('titleAccent')}</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            {t('subtitle')}
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
                  <Target className="w-8 h-8 text-red-500" />
                  {t('sections.challenge')}
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  {project.businessProblem}
                </p>
              </div>

              {/* My Role */}
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <User className="w-8 h-8 text-blue-500" />
                  {t('sections.role')}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-primary-blue/20 rounded-full text-sm font-medium">
                      {project.myContribution.role}
                    </span>
                    <span className="text-sm text-foreground/60">
                      {t('labels.teamOf')} {project.myContribution.teamSize}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {project.myContribution.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-foreground/80">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technical Solution */}
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Settings className="w-8 h-8 text-gray-600" />
                  {t('sections.solution')}
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground/60 mb-2">
                      {t('labels.architecture')} {project.technicalSolution.architecture}
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
                        <ArrowRight className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0" />
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
                <TrendingUp className="w-8 h-8 text-green-500" />
                {t('sections.impact')}
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
                  {t('labels.ctaQuestion')}
                </p>
                <a
                  href="#contact"
                  className="inline-block px-6 py-3 bg-primary-blue hover:bg-primary-blue/90 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                >
                  {t('labels.ctaButton')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
