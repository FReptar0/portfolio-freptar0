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
      id: "sageconnect",
      title: t('items.sageconnect.title'),
      businessProblem: t('items.sageconnect.businessProblem'),
      myContribution: {
        role: t('items.sageconnect.myContribution.role'),
        teamSize: t.raw('items.sageconnect.myContribution.teamSize') as number,
        responsibilities: [
          t('items.sageconnect.myContribution.responsibility0'),
          t('items.sageconnect.myContribution.responsibility1'),
          t('items.sageconnect.myContribution.responsibility2')
        ],
      },
      technicalSolution: {
        stack: t.raw('items.sageconnect.technicalSolution.stack') as string[],
        architecture: t('items.sageconnect.technicalSolution.architecture'),
        keyDecisions: [
          t('items.sageconnect.technicalSolution.keyDecision0'),
          t('items.sageconnect.technicalSolution.keyDecision1'),
          t('items.sageconnect.technicalSolution.keyDecision2')
        ],
      },
      businessImpact: {
        metrics: [
          { label: t('items.sageconnect.businessImpact.metric0.label'), value: t('items.sageconnect.businessImpact.metric0.value') },
          { label: t('items.sageconnect.businessImpact.metric1.label'), value: t('items.sageconnect.businessImpact.metric1.value') },
          { label: t('items.sageconnect.businessImpact.metric2.label'), value: t('items.sageconnect.businessImpact.metric2.value') },
          { label: t('items.sageconnect.businessImpact.metric3.label'), value: t('items.sageconnect.businessImpact.metric3.value') }
        ],
      },
      tags: t.raw('items.sageconnect.tags') as string[],
    },
    {
      id: "sagesync", 
      title: t('items.sagesync.title'),
      businessProblem: t('items.sagesync.businessProblem'),
      myContribution: {
        role: t('items.sagesync.myContribution.role'),
        teamSize: t.raw('items.sagesync.myContribution.teamSize') as number,
        responsibilities: [
          t('items.sagesync.myContribution.responsibility0'),
          t('items.sagesync.myContribution.responsibility1'),
          t('items.sagesync.myContribution.responsibility2')
        ],
      },
      technicalSolution: {
        stack: t.raw('items.sagesync.technicalSolution.stack') as string[],
        architecture: t('items.sagesync.technicalSolution.architecture'),
        keyDecisions: [
          t('items.sagesync.technicalSolution.keyDecision0'),
          t('items.sagesync.technicalSolution.keyDecision1'),
          t('items.sagesync.technicalSolution.keyDecision2')
        ],
      },
      businessImpact: {
        metrics: [
          { label: t('items.sagesync.businessImpact.metric0.label'), value: t('items.sagesync.businessImpact.metric0.value') },
          { label: t('items.sagesync.businessImpact.metric1.label'), value: t('items.sagesync.businessImpact.metric1.value') },
          { label: t('items.sagesync.businessImpact.metric2.label'), value: t('items.sagesync.businessImpact.metric2.value') },
          { label: t('items.sagesync.businessImpact.metric3.label'), value: t('items.sagesync.businessImpact.metric3.value') }
        ],
      },
      tags: t.raw('items.sagesync.tags') as string[],
    },
    {
      id: "cardeal",
      title: t('items.cardeal.title'),
      businessProblem: t('items.cardeal.businessProblem'),
      myContribution: {
        role: t('items.cardeal.myContribution.role'),
        teamSize: t.raw('items.cardeal.myContribution.teamSize') as number,
        responsibilities: [
          t('items.cardeal.myContribution.responsibility0'),
          t('items.cardeal.myContribution.responsibility1'),
          t('items.cardeal.myContribution.responsibility2')
        ],
      },
      technicalSolution: {
        stack: t.raw('items.cardeal.technicalSolution.stack') as string[],
        architecture: t('items.cardeal.technicalSolution.architecture'),
        keyDecisions: [
          t('items.cardeal.technicalSolution.keyDecision0'),
          t('items.cardeal.technicalSolution.keyDecision1'),
          t('items.cardeal.technicalSolution.keyDecision2')
        ],
      },
      businessImpact: {
        metrics: [
          { label: t('items.cardeal.businessImpact.metric0.label'), value: t('items.cardeal.businessImpact.metric0.value') },
          { label: t('items.cardeal.businessImpact.metric1.label'), value: t('items.cardeal.businessImpact.metric1.value') },
          { label: t('items.cardeal.businessImpact.metric2.label'), value: t('items.cardeal.businessImpact.metric2.value') },
          { label: t('items.cardeal.businessImpact.metric3.label'), value: t('items.cardeal.businessImpact.metric3.value') }
        ],
      },
      tags: t.raw('items.cardeal.tags') as string[],
    },
    {
      id: "odoo",
      title: t('items.odoo.title'),
      businessProblem: t('items.odoo.businessProblem'),
      myContribution: {
        role: t('items.odoo.myContribution.role'),
        teamSize: t.raw('items.odoo.myContribution.teamSize') as number,
        responsibilities: [
          t('items.odoo.myContribution.responsibility0'),
          t('items.odoo.myContribution.responsibility1'),
          t('items.odoo.myContribution.responsibility2')
        ],
      },
      technicalSolution: {
        stack: t.raw('items.odoo.technicalSolution.stack') as string[],
        architecture: t('items.odoo.technicalSolution.architecture'),
        keyDecisions: [
          t('items.odoo.technicalSolution.keyDecision0'),
          t('items.odoo.technicalSolution.keyDecision1'),
          t('items.odoo.technicalSolution.keyDecision2')
        ],
      },
      businessImpact: {
        metrics: [
          { label: t('items.odoo.businessImpact.metric0.label'), value: t('items.odoo.businessImpact.metric0.value') },
          { label: t('items.odoo.businessImpact.metric1.label'), value: t('items.odoo.businessImpact.metric1.value') },
          { label: t('items.odoo.businessImpact.metric2.label'), value: t('items.odoo.businessImpact.metric2.value') },
          { label: t('items.odoo.businessImpact.metric3.label'), value: t('items.odoo.businessImpact.metric3.value') }
        ],
      },
      tags: t.raw('items.odoo.tags') as string[],
    },
    {
      id: "gymmanager",
      title: t('items.gymmanager.title'),
      businessProblem: t('items.gymmanager.businessProblem'),
      myContribution: {
        role: t('items.gymmanager.myContribution.role'),
        teamSize: t.raw('items.gymmanager.myContribution.teamSize') as number,
        responsibilities: [
          t('items.gymmanager.myContribution.responsibility0'),
          t('items.gymmanager.myContribution.responsibility1'),
          t('items.gymmanager.myContribution.responsibility2')
        ],
      },
      technicalSolution: {
        stack: t.raw('items.gymmanager.technicalSolution.stack') as string[],
        architecture: t('items.gymmanager.technicalSolution.architecture'),
        keyDecisions: [
          t('items.gymmanager.technicalSolution.keyDecision0'),
          t('items.gymmanager.technicalSolution.keyDecision1'),
          t('items.gymmanager.technicalSolution.keyDecision2')
        ],
      },
      businessImpact: {
        metrics: [
          { label: t('items.gymmanager.businessImpact.metric0.label'), value: t('items.gymmanager.businessImpact.metric0.value') },
          { label: t('items.gymmanager.businessImpact.metric1.label'), value: t('items.gymmanager.businessImpact.metric1.value') },
          { label: t('items.gymmanager.businessImpact.metric2.label'), value: t('items.gymmanager.businessImpact.metric2.value') },
          { label: t('items.gymmanager.businessImpact.metric3.label'), value: t('items.gymmanager.businessImpact.metric3.value') }
        ],
      },
      tags: t.raw('items.gymmanager.tags') as string[],
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
        <div className="apple-glass rounded-3xl p-6 sm:p-8 md:p-12">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
