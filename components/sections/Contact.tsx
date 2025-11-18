"use client";

import { useState, useRef } from "react";
import { useTranslations } from 'next-intl';
import { Mail, Briefcase, Github, Calendar, Zap, ArrowRight } from 'lucide-react';
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';
import { frontendContactFormSchema } from '@/lib/validations/contact';
import type { FrontendContactFormData } from '@/lib/validations/contact';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const turnstileRef = useRef<TurnstileInstance>(null);
  const t = useTranslations('contact');
  // Allow bypass in development when NEXT_PUBLIC_TURNSTILE_BYPASS_DEV=true
  const bypassTurnstile = process.env.NEXT_PUBLIC_TURNSTILE_BYPASS_DEV === 'true';

  const copyEmail = () => {
    navigator.clipboard.writeText("hi@fernandomemije.dev");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationErrors({});
    
    if (!turnstileToken && !bypassTurnstile) {
      setFormStatus("error");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const formValues: FrontendContactFormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      project: formData.get('project') as string,
      message: formData.get('message') as string,
    };

    // Frontend validation using Zod
    const validation = frontendContactFormSchema.safeParse(formValues);
    
    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.errors.forEach((error) => {
        const field = error.path[0] as string;
        errors[field] = error.message;
      });
      setValidationErrors(errors);
      setFormStatus("error");
      return;
    }

    setFormStatus("sending");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
          body: JSON.stringify({
            ...validation.data,
            // When bypassing in dev, send a placeholder token so server-side Zod validation passes
            'cf-turnstile-response': turnstileToken ?? (bypassTurnstile ? 'bypass-dev' : ''),
          }),
      });

      const result = await response.json();

      if (response.ok) {
        setFormStatus("success");
        e.currentTarget.reset();
        setTurnstileToken(null);
        setValidationErrors({});
        turnstileRef.current?.reset();
        setTimeout(() => setFormStatus("idle"), 3000);
      } else {
        // Handle server validation errors
        if (result.details) {
          const serverErrors: Record<string, string> = {};
          result.details.forEach((detail: { field: string; message: string }) => {
            serverErrors[detail.field] = detail.message;
          });
          setValidationErrors(serverErrors);
        }
        setFormStatus("error");
        setTimeout(() => setFormStatus("idle"), 3000);
      }
    } catch {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 3000);
    }
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
                      hi@fernandomemije.dev
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm font-medium hidden sm:block" style={{ color: 'var(--accent-500)' }}>
                    {copied ? t('email.copied') : t('email.copy')}
                  </div>
                </button>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/in/fernando-rm"
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
                  name="name"
                  required
                  className={`w-full px-4 py-3 rounded-xl bg-foreground/5 border focus:outline-none transition-colors ${
                    validationErrors.name 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-foreground/10 focus:border-primary-blue'
                  }`}
                  placeholder={t('form.namePlaceholder')}
                />
                {validationErrors.name && (
                  <p className="mt-1 text-sm text-red-500">{validationErrors.name}</p>
                )}
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
                  name="email"
                  required
                  className={`w-full px-4 py-3 rounded-xl bg-foreground/5 border focus:outline-none transition-colors ${
                    validationErrors.email 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-foreground/10 focus:border-primary-blue'
                  }`}
                  placeholder={t('form.emailPlaceholder')}
                />
                {validationErrors.email && (
                  <p className="mt-1 text-sm text-red-500">{validationErrors.email}</p>
                )}
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
                  name="project"
                  className={`w-full px-4 py-3 rounded-xl bg-foreground/5 border focus:outline-none transition-colors ${
                    validationErrors.project 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-foreground/10 focus:border-primary-blue'
                  }`}
                >
                  <option value="">{t('form.projectOptions.select')}</option>
                  <option value={t('form.projectOptions.fulltime')}>{t('form.projectOptions.fulltime')}</option>
                  <option value={t('form.projectOptions.consulting')}>{t('form.projectOptions.consulting')}</option>
                  <option value={t('form.projectOptions.contract')}>{t('form.projectOptions.contract')}</option>
                  <option value={t('form.projectOptions.hello')}>{t('form.projectOptions.hello')}</option>
                </select>
                {validationErrors.project && (
                  <p className="mt-1 text-sm text-red-500">{validationErrors.project}</p>
                )}
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
                  name="message"
                  required
                  rows={4}
                  className={`w-full px-4 py-3 rounded-xl bg-foreground/5 border focus:outline-none transition-colors resize-none ${
                    validationErrors.message 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-foreground/10 focus:border-primary-blue'
                  }`}
                  placeholder={t('form.messagePlaceholder')}
                />
                {validationErrors.message && (
                  <p className="mt-1 text-sm text-red-500">{validationErrors.message}</p>
                )}
              </div>

              {/* Invisible Turnstile CAPTCHA */}
              {!bypassTurnstile && (
                <div className="hidden">
                  <Turnstile
                    ref={turnstileRef}
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                    onSuccess={(token) => setTurnstileToken(token)}
                    onError={() => {
                      setTurnstileToken(null);
                      setFormStatus("error");
                    }}
                    onExpire={() => setTurnstileToken(null)}
                    options={{
                      theme: 'light',
                      size: 'invisible',
                    }}
                  />
                </div>
              )}

              {/* Security Notice */}
              <div className="text-center">
                <p className="text-xs text-foreground/50 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  {t('form.securityNotice')}
                </p>
              </div>

              <button
                type="submit"
                disabled={formStatus === "sending" || (!turnstileToken && !bypassTurnstile)}
                className="w-full py-4 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:scale-100 disabled:opacity-50"
                style={{ background: formStatus === "sending" || (!turnstileToken && !bypassTurnstile) ? 'var(--primary-400)' : 'var(--primary-600)' }}
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
