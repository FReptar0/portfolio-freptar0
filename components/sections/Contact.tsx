"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useTranslations, useLocale } from 'next-intl';
import { Mail, Briefcase, Github, Calendar, Zap, ArrowRight, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';
import { frontendContactFormSchema } from '@/lib/validations/contact';
import type { FrontendContactFormData } from '@/lib/validations/contact';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [fieldStates, setFieldStates] = useState<Record<string, 'idle' | 'valid' | 'invalid'>>({});
  const [showFieldHelp, setShowFieldHelp] = useState<Record<string, boolean>>({});
  const [characterCounts, setCharacterCounts] = useState<Record<string, number>>({
    name: 0,
    message: 0
  });
  const turnstileRef = useRef<TurnstileInstance>(null);
  const t = useTranslations('contact');
  const locale = useLocale();
  // Allow bypass in development when NEXT_PUBLIC_TURNSTILE_BYPASS_DEV=true
  const bypassTurnstile = process.env.NEXT_PUBLIC_TURNSTILE_BYPASS_DEV === 'true';

  const copyEmail = () => {
    navigator.clipboard.writeText("hi@fernandomemije.dev");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Real-time field validation
  const validateField = useCallback((fieldName: string, value: string) => {
    const fieldSchema = frontendContactFormSchema.shape[fieldName as keyof FrontendContactFormData];
    if (!fieldSchema) return;

    const result = fieldSchema.safeParse(value);
    
    setValidationErrors(prev => {
      const newErrors = { ...prev };
      if (result.success) {
        delete newErrors[fieldName];
        setFieldStates(prevStates => ({ ...prevStates, [fieldName]: 'valid' }));
      } else {
        const errorMessage = result.error.errors[0]?.message || '';
        newErrors[fieldName] = t(errorMessage);
        setFieldStates(prevStates => ({ ...prevStates, [fieldName]: 'invalid' }));
      }
      return newErrors;
    });
  }, [t]);

  // Handle field changes with real-time validation
  const handleFieldChange = useCallback((fieldName: string, value: string) => {
    // Update character count for relevant fields
    if (fieldName === 'name' || fieldName === 'message') {
      setCharacterCounts(prev => ({ ...prev, [fieldName]: value.length }));
    }

    // Debounced validation (validate after user stops typing)
    const timeoutId = setTimeout(() => {
      validateField(fieldName, value);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [validateField]);

  // Handle field focus
  const handleFieldFocus = useCallback((fieldName: string) => {
    setShowFieldHelp(prev => ({ ...prev, [fieldName]: true }));
    setFieldStates(prevStates => ({ 
      ...prevStates, 
      [fieldName]: prevStates[fieldName] || 'idle' 
    }));
  }, []);

  // Handle field blur
  const handleFieldBlur = useCallback((fieldName: string, value: string) => {
    setShowFieldHelp(prev => ({ ...prev, [fieldName]: false }));
    // Immediate validation on blur
    validateField(fieldName, value);
  }, [validateField]);

  // Helper component for field icons
  const FieldIcon = ({ fieldName }: { fieldName: string }) => {
    const state = fieldStates[fieldName];
    if (state === 'valid') {
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    } else if (state === 'invalid') {
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    } else if (showFieldHelp[fieldName]) {
      return <Info className="w-5 h-5 text-blue-500" />;
    }
    return null;
  };

  // Helper component for character count
  const CharacterCount = ({ fieldName, maxLength }: { fieldName: string; maxLength: number }) => {
    const count = characterCounts[fieldName] || 0;
    const remaining = maxLength - count;
    const isOverLimit = remaining < 0;
    
    return (
      <div className={`text-xs transition-colors ${
        isOverLimit ? 'text-red-500' : remaining < 50 ? 'text-yellow-500' : 'text-foreground/50'
      }`}>
        {isOverLimit 
          ? t('characterCount.over', { count: Math.abs(remaining) })
          : t('characterCount.remaining', { count: remaining })
        }
      </div>
    );
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
      const fieldStatesUpdate: Record<string, 'idle' | 'valid' | 'invalid'> = {};
      validation.error.errors.forEach((error) => {
        const field = error.path[0] as string;
        errors[field] = t(error.message);
        fieldStatesUpdate[field] = 'invalid';
      });
      setValidationErrors(errors);
      setFieldStates(prev => ({ ...prev, ...fieldStatesUpdate }));
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
            locale: locale,
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
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="flex items-center justify-between text-sm font-medium"
                >
                  <span>{t('form.name')}</span>
                  <FieldIcon fieldName="name" />
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    maxLength={100}
                    className={`w-full px-4 py-3 pr-12 rounded-xl bg-foreground/5 border focus:outline-none transition-all duration-200 ${
                      fieldStates.name === 'valid'
                        ? 'border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                        : fieldStates.name === 'invalid'
                        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                        : 'border-foreground/10 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20'
                    }`}
                    placeholder={t('form.namePlaceholder')}
                    onFocus={() => handleFieldFocus('name')}
                    onBlur={(e) => handleFieldBlur('name', e.target.value)}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                  />
                </div>
                <div className="flex justify-between items-start min-h-[1rem]">
                  <div className="flex-1">
                    {showFieldHelp.name && (
                      <p className="text-xs text-foreground/60 animate-in fade-in slide-in-from-top-1 duration-200">
                        {t('fieldHelp.name')}
                      </p>
                    )}
                    {validationErrors.name && (
                      <p className="text-sm text-red-500 animate-in fade-in slide-in-from-top-1 duration-200 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {validationErrors.name}
                      </p>
                    )}
                  </div>
                  <CharacterCount fieldName="name" maxLength={100} />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="flex items-center justify-between text-sm font-medium"
                >
                  <span>{t('form.email')}</span>
                  <FieldIcon fieldName="email" />
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    maxLength={100}
                    className={`w-full px-4 py-3 pr-12 rounded-xl bg-foreground/5 border focus:outline-none transition-all duration-200 ${
                      fieldStates.email === 'valid'
                        ? 'border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                        : fieldStates.email === 'invalid'
                        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                        : 'border-foreground/10 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20'
                    }`}
                    placeholder={t('form.emailPlaceholder')}
                    onFocus={() => handleFieldFocus('email')}
                    onBlur={(e) => handleFieldBlur('email', e.target.value)}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                  />
                </div>
                <div className="min-h-[1rem]">
                  {showFieldHelp.email && (
                    <p className="text-xs text-foreground/60 animate-in fade-in slide-in-from-top-1 duration-200">
                      {t('fieldHelp.email')}
                    </p>
                  )}
                  {validationErrors.email && (
                    <p className="text-sm text-red-500 animate-in fade-in slide-in-from-top-1 duration-200 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {validationErrors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="project"
                  className="flex items-center justify-between text-sm font-medium"
                >
                  <span>{t('form.projectType')}</span>
                  <FieldIcon fieldName="project" />
                </label>
                <div className="relative">
                  <select
                    id="project"
                    name="project"
                    className={`w-full px-4 py-3 pr-12 rounded-xl bg-foreground/5 border focus:outline-none transition-all duration-200 ${
                      fieldStates.project === 'valid'
                        ? 'border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                        : fieldStates.project === 'invalid'
                        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                        : 'border-foreground/10 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20'
                    }`}
                    onFocus={() => handleFieldFocus('project')}
                    onBlur={(e) => handleFieldBlur('project', e.target.value)}
                    onChange={(e) => handleFieldChange('project', e.target.value)}
                  >
                    <option value="">{t('form.projectOptions.select')}</option>
                    <option value={t('form.projectOptions.fulltime')}>{t('form.projectOptions.fulltime')}</option>
                    <option value={t('form.projectOptions.consulting')}>{t('form.projectOptions.consulting')}</option>
                    <option value={t('form.projectOptions.contract')}>{t('form.projectOptions.contract')}</option>
                    <option value={t('form.projectOptions.hello')}>{t('form.projectOptions.hello')}</option>
                  </select>
                </div>
                <div className="min-h-[1rem]">
                  {showFieldHelp.project && (
                    <p className="text-xs text-foreground/60 animate-in fade-in slide-in-from-top-1 duration-200">
                      {t('fieldHelp.project')}
                    </p>
                  )}
                  {validationErrors.project && (
                    <p className="text-sm text-red-500 animate-in fade-in slide-in-from-top-1 duration-200 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {validationErrors.project}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="flex items-center justify-between text-sm font-medium"
                >
                  <span>{t('form.message')}</span>
                  <FieldIcon fieldName="message" />
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    maxLength={2000}
                    className={`w-full px-4 py-3 pr-12 rounded-xl bg-foreground/5 border focus:outline-none transition-all duration-200 resize-none ${
                      fieldStates.message === 'valid'
                        ? 'border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                        : fieldStates.message === 'invalid'
                        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                        : 'border-foreground/10 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20'
                    }`}
                    placeholder={t('form.messagePlaceholder')}
                    onFocus={() => handleFieldFocus('message')}
                    onBlur={(e) => handleFieldBlur('message', e.target.value)}
                    onChange={(e) => handleFieldChange('message', e.target.value)}
                  />
                </div>
                <div className="flex justify-between items-start min-h-[1rem]">
                  <div className="flex-1">
                    {showFieldHelp.message && (
                      <p className="text-xs text-foreground/60 animate-in fade-in slide-in-from-top-1 duration-200">
                        {t('fieldHelp.message')}
                      </p>
                    )}
                    {validationErrors.message && (
                      <p className="text-sm text-red-500 animate-in fade-in slide-in-from-top-1 duration-200 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {validationErrors.message}
                      </p>
                    )}
                  </div>
                  <CharacterCount fieldName="message" maxLength={2000} />
                </div>
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
