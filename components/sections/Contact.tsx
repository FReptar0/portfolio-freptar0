"use client";

import { useState } from "react";
import { useTranslations } from 'next-intl';
import { Mail, Briefcase, Github, Calendar, Zap, ArrowRight } from 'lucide-react';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const t = useTranslations('contact');

  const copyEmail = () => {
    navigator.clipboard.writeText("fmemije00@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("sending");

    // Simulate form submission
    setTimeout(() => {
      setFormStatus("success");
      setTimeout(() => setFormStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span style={{ background: 'var(--gradient-hero)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent' }}>{t('title')}</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column - Quick Actions */}
          <div className="space-y-6">
            <div className="apple-glass rounded-3xl p-6 sm:p-8">
              <h3 className="text-2xl font-bold mb-6">{t('quickContact')}</h3>

              <div className="space-y-4">
                {/* Email */}
                <button
                  onClick={copyEmail}
                  className="w-full glass-card rounded-2xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center text-white">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold">{t('email.label')}</div>
                    <div className="text-sm text-foreground/60 truncate">
                      fmemije00@gmail.com
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm font-medium hidden sm:block" style={{ color: 'var(--accent-500)' }}>
                    {copied ? t('email.copied') : t('email.copy')}
                  </div>
                </button>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/in/fernandomemije"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full apple-glass hover:bg-white/20 dark:hover:bg-black/40 rounded-2xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 transition-all duration-300 hover:scale-[1.02] group"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-blue to-accent-purple flex items-center justify-center text-white">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold">{t('linkedin.label')}</div>
                    <div className="text-sm text-foreground/60">
                      {t('linkedin.description')}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-foreground/60 group-hover:translate-x-1 transition-transform" />
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/freptar0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full apple-glass hover:bg-white/20 dark:hover:bg-black/40 rounded-2xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 transition-all duration-300 hover:scale-[1.02] group"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-blue to-accent-purple flex items-center justify-center text-white">
                    <Github className="w-6 h-6" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold">{t('github.label')}</div>
                    <div className="text-sm text-foreground/60">
                      {t('github.description')}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-foreground/60 group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Calendar - placeholder for now */}
                <a
                  href="#contact"
                  className="w-full apple-glass hover:bg-white/20 dark:hover:bg-black/40 rounded-2xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 transition-all duration-300 hover:scale-[1.02] group"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-blue to-accent-purple flex items-center justify-center text-white">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold">{t('calendar.label')}</div>
                    <div className="text-sm text-foreground/60">
                      {t('calendar.description')}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-foreground/60 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Response Time */}
            <div className="apple-glass rounded-2xl p-6 text-center">
              <div className="mb-2 text-yellow-500">
                <Zap className="w-8 h-8 mx-auto" />
              </div>
              <div className="font-semibold mb-1">{t('responseTime.title')}</div>
              <div className="text-sm text-foreground/60">
                {t('responseTime.description')}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="apple-glass rounded-3xl p-6 sm:p-8">
            <h3 className="text-2xl font-bold mb-6">{t('form.title')}</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  {t('form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-foreground/5 border border-foreground/10 focus:border-primary-blue focus:outline-none transition-colors"
                  placeholder={t('form.namePlaceholder')}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  {t('form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-foreground/5 border border-foreground/10 focus:border-primary-blue focus:outline-none transition-colors"
                  placeholder={t('form.emailPlaceholder')}
                />
              </div>

              <div>
                <label
                  htmlFor="project"
                  className="block text-sm font-medium mb-2"
                >
                  {t('form.projectType')}
                </label>
                <select
                  id="project"
                  className="w-full px-4 py-3 rounded-xl bg-foreground/5 border border-foreground/10 focus:border-primary-blue focus:outline-none transition-colors"
                >
                  <option>{t('form.projectOptions.fulltime')}</option>
                  <option>{t('form.projectOptions.consulting')}</option>
                  <option>{t('form.projectOptions.contract')}</option>
                  <option>{t('form.projectOptions.hello')}</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  {t('form.message')}
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-foreground/5 border border-foreground/10 focus:border-primary-blue focus:outline-none transition-colors resize-none"
                  placeholder={t('form.messagePlaceholder')}
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === "sending"}
                className="w-full py-4 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:scale-100"
                style={{ background: formStatus === "sending" ? 'var(--primary-400)' : 'var(--primary-600)' }}
              >
                {formStatus === "sending" && t('form.sending')}
                {formStatus === "success" && t('form.success')}
                {formStatus === "idle" && t('form.submit')}
                {formStatus === "error" && t('form.error')}
              </button>

              {formStatus === "success" && (
                <div className="text-center text-sm" style={{ color: 'var(--success-500)' }}>
                  {t('form.successMessage')}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: 'var(--success-500)' }}></span>
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: 'var(--success-500)' }}></span>
            </span>
            <span className="text-sm">{t('availability')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
