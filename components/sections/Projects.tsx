"use client";

import { useState } from "react";
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Target, User, Settings, TrendingUp, ArrowRight, Github, Lock, ChevronDown } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Project {
  id: string;
  title: string;
  githubUrl: string | null;
  businessProblem: string;
  myContribution: {
    role: string;
    teamSize: number;
    teamRoles: string[];
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
  const locale = useLocale();

  const projectsWithCaseStudy = new Set(['sageconnect', 'sagesync', 'cardeal', 'gymmanager', 'cleany', 'carrytrade']);

  const projects: Project[] = [
    {
      id: "sageconnect",
      title: t('items.sageconnect.title'),
      githubUrl: t.raw('items.sageconnect.githubUrl') as string | null,
      businessProblem: t('items.sageconnect.businessProblem'),
      myContribution: {
        role: t('items.sageconnect.myContribution.role'),
        teamSize: t.raw('items.sageconnect.myContribution.teamSize') as number,
        teamRoles: t.raw('items.sageconnect.myContribution.teamRoles') as string[],
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
      githubUrl: t.raw('items.sagesync.githubUrl') as string | null,
      businessProblem: t('items.sagesync.businessProblem'),
      myContribution: {
        role: t('items.sagesync.myContribution.role'),
        teamSize: t.raw('items.sagesync.myContribution.teamSize') as number,
        teamRoles: t.raw('items.sagesync.myContribution.teamRoles') as string[],
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
      githubUrl: t.raw('items.cardeal.githubUrl') as string | null,
      businessProblem: t('items.cardeal.businessProblem'),
      myContribution: {
        role: t('items.cardeal.myContribution.role'),
        teamSize: t.raw('items.cardeal.myContribution.teamSize') as number,
        teamRoles: t.raw('items.cardeal.myContribution.teamRoles') as string[],
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
      githubUrl: t.raw('items.odoo.githubUrl') as string | null,
      businessProblem: t('items.odoo.businessProblem'),
      myContribution: {
        role: t('items.odoo.myContribution.role'),
        teamSize: t.raw('items.odoo.myContribution.teamSize') as number,
        teamRoles: t.raw('items.odoo.myContribution.teamRoles') as string[],
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
      githubUrl: t.raw('items.gymmanager.githubUrl') as string | null,
      businessProblem: t('items.gymmanager.businessProblem'),
      myContribution: {
        role: t('items.gymmanager.myContribution.role'),
        teamSize: t.raw('items.gymmanager.myContribution.teamSize') as number,
        teamRoles: t.raw('items.gymmanager.myContribution.teamRoles') as string[],
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
    {
      id: "cleany",
      title: t('items.cleany.title'),
      githubUrl: t.raw('items.cleany.githubUrl') as string | null,
      businessProblem: t('items.cleany.businessProblem'),
      myContribution: {
        role: t('items.cleany.myContribution.role'),
        teamSize: t.raw('items.cleany.myContribution.teamSize') as number,
        teamRoles: t.raw('items.cleany.myContribution.teamRoles') as string[],
        responsibilities: [
          t('items.cleany.myContribution.responsibility0'),
          t('items.cleany.myContribution.responsibility1'),
          t('items.cleany.myContribution.responsibility2')
        ],
      },
      technicalSolution: {
        stack: t.raw('items.cleany.technicalSolution.stack') as string[],
        architecture: t('items.cleany.technicalSolution.architecture'),
        keyDecisions: [
          t('items.cleany.technicalSolution.keyDecision0'),
          t('items.cleany.technicalSolution.keyDecision1'),
          t('items.cleany.technicalSolution.keyDecision2')
        ],
      },
      businessImpact: {
        metrics: [
          { label: t('items.cleany.businessImpact.metric0.label'), value: t('items.cleany.businessImpact.metric0.value') },
          { label: t('items.cleany.businessImpact.metric1.label'), value: t('items.cleany.businessImpact.metric1.value') },
          { label: t('items.cleany.businessImpact.metric2.label'), value: t('items.cleany.businessImpact.metric2.value') },
          { label: t('items.cleany.businessImpact.metric3.label'), value: t('items.cleany.businessImpact.metric3.value') }
        ],
      },
      tags: t.raw('items.cleany.tags') as string[],
    },
    {
      id: "carrytrade",
      title: t('items.carrytrade.title'),
      githubUrl: t.raw('items.carrytrade.githubUrl') as string | null,
      businessProblem: t('items.carrytrade.businessProblem'),
      myContribution: {
        role: t('items.carrytrade.myContribution.role'),
        teamSize: t.raw('items.carrytrade.myContribution.teamSize') as number,
        teamRoles: t.raw('items.carrytrade.myContribution.teamRoles') as string[],
        responsibilities: [
          t('items.carrytrade.myContribution.responsibility0'),
          t('items.carrytrade.myContribution.responsibility1'),
          t('items.carrytrade.myContribution.responsibility2')
        ],
      },
      technicalSolution: {
        stack: t.raw('items.carrytrade.technicalSolution.stack') as string[],
        architecture: t('items.carrytrade.technicalSolution.architecture'),
        keyDecisions: [
          t('items.carrytrade.technicalSolution.keyDecision0'),
          t('items.carrytrade.technicalSolution.keyDecision1'),
          t('items.carrytrade.technicalSolution.keyDecision2')
        ],
      },
      businessImpact: {
        metrics: [
          { label: t('items.carrytrade.businessImpact.metric0.label'), value: t('items.carrytrade.businessImpact.metric0.value') },
          { label: t('items.carrytrade.businessImpact.metric1.label'), value: t('items.carrytrade.businessImpact.metric1.value') },
          { label: t('items.carrytrade.businessImpact.metric2.label'), value: t('items.carrytrade.businessImpact.metric2.value') },
          { label: t('items.carrytrade.businessImpact.metric3.label'), value: t('items.carrytrade.businessImpact.metric3.value') }
        ],
      },
      tags: t.raw('items.carrytrade.tags') as string[],
    },
  ];

  const [expandedId, setExpandedId] = useState<string | null>(projects[0].id);
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  const toggleProject = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <section id="projects" ref={sectionRef} className="py-24 relative">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        {/* Left-aligned header */}
        <div className={`mb-16 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            {t('title')}{' '}
            <span className="text-[var(--color-accent)]">{t('titleAccent')}</span>
          </h2>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            {t('subtitle')}
          </p>
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 font-mono text-sm mt-4 text-[var(--color-accent)] hover:underline"
          >
            {t('labels.viewAllCaseStudies')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Stacked project list */}
        <div>
          {projects.map((project, index) => {
            const isExpanded = expandedId === project.id;
            return (
              <div
                key={project.id}
                className={`border-b border-[var(--color-border)] transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {/* Collapsed row - always visible */}
                <button
                  onClick={() => toggleProject(project.id)}
                  className="w-full py-6 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-[var(--color-surface-elevated)] transition-colors duration-200 rounded-lg px-4 -mx-4"
                >
                  <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground">
                    {project.title}
                  </h3>

                  <div className="hidden md:flex items-center gap-2 flex-shrink-0">
                    {project.technicalSolution.stack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-sm px-3 py-1 bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-md"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 flex-shrink-0">
                    <span className="hidden sm:inline font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {project.myContribution.role}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-foreground/60 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>

                {/* Expanded detail - smooth height transition */}
                <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <div className="pt-6 pb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                      {/* Left column - 3/5 */}
                      <div className="lg:col-span-3 space-y-8">
                        {/* Business Problem */}
                        <div>
                          <h3 className="text-lg font-heading font-semibold text-foreground flex items-center gap-2 mb-3">
                            <Target className="w-5 h-5 text-[var(--color-accent)]" />
                            {t('sections.challenge')}
                          </h3>
                          <p className="text-foreground/80 leading-relaxed">
                            {project.businessProblem}
                          </p>
                        </div>

                        {/* Role */}
                        <div>
                          <h3 className="text-lg font-heading font-semibold text-foreground flex items-center gap-2 mb-3">
                            <User className="w-5 h-5 text-[var(--color-accent)]" />
                            {t('sections.role')}
                          </h3>
                          <div className="flex items-center gap-4 mb-3">
                            <span className="font-mono text-sm bg-[var(--color-accent-muted)] px-3 py-1 rounded-md">
                              {project.myContribution.role}
                            </span>
                            <span className="font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>
                              {project.myContribution.teamRoles.join(' / ')}
                            </span>
                          </div>
                          <ul className="space-y-2">
                            {project.myContribution.responsibilities.map((resp, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-[var(--color-accent)] mt-1 flex-shrink-0">--</span>
                                <span className="text-foreground/80">{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Technical Solution */}
                        <div>
                          <h3 className="text-lg font-heading font-semibold text-foreground flex items-center gap-2 mb-3">
                            <Settings className="w-5 h-5 text-[var(--color-accent)]" />
                            {t('sections.solution')}
                          </h3>
                          <p className="font-mono text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                            {t('labels.architecture')} {project.technicalSolution.architecture}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technicalSolution.stack.map((tech) => (
                              <span
                                key={tech}
                                className="font-mono px-3 py-1 bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-md text-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          <ul className="space-y-2">
                            {project.technicalSolution.keyDecisions.map((decision, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <span className="text-[var(--color-accent)] mt-1 flex-shrink-0">--</span>
                                <span className="text-foreground/70">{decision}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Right column - 2/5 */}
                      <div className="lg:col-span-2 space-y-8">
                        {/* Impact Metrics */}
                        <div>
                          <h3 className="text-lg font-heading font-semibold text-foreground flex items-center gap-2 mb-4">
                            <TrendingUp className="w-5 h-5 text-[var(--color-accent)]" />
                            {t('sections.impact')}
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            {project.businessImpact.metrics.map((metric, i) => (
                              <div key={i} className="text-left">
                                <div className="font-mono text-3xl font-bold text-[var(--color-accent)]">
                                  {metric.value}
                                </div>
                                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                  {metric.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="font-mono text-sm px-3 py-1 border border-[var(--color-border)] rounded-md"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Links */}
                        <div className="flex flex-col gap-3">
                          {projectsWithCaseStudy.has(project.id) && (
                            <Link
                              href={`/${locale}/projects/${project.id}`}
                              className="inline-flex items-center gap-2 font-mono text-sm text-[var(--color-accent)] hover:underline"
                            >
                              {t('labels.viewCaseStudy')}
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          )}
                          {project.githubUrl ? (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 font-mono text-sm text-foreground/70 hover:text-foreground hover:underline"
                            >
                              <Github className="w-4 h-4" />
                              {t('labels.viewCode')}
                              <ArrowRight className="w-4 h-4" />
                            </a>
                          ) : (
                            <span className="inline-flex items-center gap-2 font-mono text-sm text-foreground/40">
                              <Lock className="w-4 h-4" />
                              {t('labels.privateCode')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
