import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Supported locales - Spanish is default
export const locales = ['es', 'en'] as const;
export const defaultLocale = 'es' as const;

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  // Load modular translation files
  const [
    navigation,
    hero,
    timeline,
    projects,
    skills,
    trustSignals,
    techStack,
    process,
    contact,
    footer,
    search,
    loading
  ] = await Promise.all([
    import(`./locales/${locale}/navigation.json`),
    import(`./locales/${locale}/hero.json`),
    import(`./locales/${locale}/timeline.json`),
    import(`./locales/${locale}/projects.json`),
    import(`./locales/${locale}/skills.json`),
    import(`./locales/${locale}/trustSignals.json`),
    import(`./locales/${locale}/techStack.json`),
    import(`./locales/${locale}/process.json`),
    import(`./locales/${locale}/contact.json`),
    import(`./locales/${locale}/footer.json`),
    import(`./locales/${locale}/search.json`),
    import(`./locales/${locale}/loading.json`)
  ]);

  return {
    locale,
    messages: {
      navigation: navigation.default,
      hero: hero.default,
      timeline: timeline.default,
      projects: projects.default,
      skills: skills.default,
      trustSignals: trustSignals.default,
      techStack: techStack.default,
      process: process.default,
      contact: contact.default,
      footer: footer.default,
      search: search.default,
      loading: loading.default
    }
  };
});
