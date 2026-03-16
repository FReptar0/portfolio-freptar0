import type { MetadataRoute } from 'next';

const BASE_URL = 'https://fernandomemije.dev';

const LOCALES = ['es', 'en'] as const;
const CASE_STUDY_SLUGS = ['sageconnect', 'sagesync', 'cardeal', 'gymmanager', 'cleany', 'carrytrade'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  // Homepage per locale
  for (const locale of LOCALES) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          es: `${BASE_URL}/es`,
          en: `${BASE_URL}/en`,
          'x-default': `${BASE_URL}/es`,
        },
      },
    });
  }

  // Projects index per locale
  for (const locale of LOCALES) {
    entries.push({
      url: `${BASE_URL}/${locale}/projects`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          es: `${BASE_URL}/es/projects`,
          en: `${BASE_URL}/en/projects`,
          'x-default': `${BASE_URL}/es/projects`,
        },
      },
    });
  }

  // Case study pages + tech pages per locale
  for (const slug of CASE_STUDY_SLUGS) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}/projects/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: {
          languages: {
            es: `${BASE_URL}/es/projects/${slug}`,
            en: `${BASE_URL}/en/projects/${slug}`,
            'x-default': `${BASE_URL}/es/projects/${slug}`,
          },
        },
      });

      entries.push({
        url: `${BASE_URL}/${locale}/projects/${slug}/tech`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: {
            es: `${BASE_URL}/es/projects/${slug}/tech`,
            en: `${BASE_URL}/en/projects/${slug}/tech`,
            'x-default': `${BASE_URL}/es/projects/${slug}/tech`,
          },
        },
      });
    }
  }

  return entries;
}
