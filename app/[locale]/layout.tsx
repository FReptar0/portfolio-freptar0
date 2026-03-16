import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { locales } from '@/i18n';

const BASE_URL = 'https://fernandomemije.dev';

const meta = {
  en: {
    title: "Fernando Rodriguez Memije | Senior Software Engineer",
    description: "Senior Software Engineer specializing in scalable systems, team leadership, and modern web architecture. 5+ years building high-performance applications with React, Node.js, and cloud technologies. Available for consulting and full-time opportunities.",
    ogDescription: "Senior Software Engineer specializing in scalable systems and modern web architecture. Available for consulting and full-time opportunities.",
    locale: "en_US",
  },
  es: {
    title: "Fernando Rodriguez Memije | Ingeniero de Software Senior",
    description: "Ingeniero de Software Senior especializado en sistemas escalables, liderazgo técnico y arquitectura web moderna. 5+ años construyendo aplicaciones de alto rendimiento con React, Node.js y tecnologías cloud. Disponible para consultoría y oportunidades de tiempo completo.",
    ogDescription: "Ingeniero de Software Senior especializado en sistemas escalables y arquitectura web moderna. Disponible para consultoría y oportunidades.",
    locale: "es_MX",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = (locale === 'es' ? meta.es : meta.en);
  const altLocale = locale === 'es' ? 'en' : 'es';

  return {
    title: l.title,
    description: l.description,
    keywords: [
      "software engineer",
      "full stack developer",
      "system architect",
      "react developer",
      "node.js expert",
      "team leadership",
      "Fernando Rodriguez Memije",
      "web development",
      "cloud architecture",
      "ingeniero de software",
      "desarrollador full stack",
    ],
    authors: [{ name: "Fernando Rodriguez Memije" }],
    creator: "Fernando Rodriguez Memije",
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        es: `${BASE_URL}/es`,
        en: `${BASE_URL}/en`,
      },
    },
    openGraph: {
      title: l.title,
      description: l.ogDescription,
      url: `${BASE_URL}/${locale}`,
      siteName: "Fernando Rodriguez Memije Portfolio",
      locale: l.locale,
      alternateLocale: altLocale === 'es' ? 'es_MX' : 'en_US',
      type: "website",
      images: [
        {
          url: `${BASE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: "Fernando Rodriguez Memije — Senior Software Engineer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: l.title,
      description: l.ogDescription,
      images: [`${BASE_URL}/opengraph-image`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// Generate static params for all supported locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  // JSON-LD: Person + WebSite schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${BASE_URL}/#person`,
        name: "Fernando Rodriguez Memije",
        url: BASE_URL,
        jobTitle: "Senior Software Engineer",
        description: meta.en.ogDescription,
        knowsAbout: [
          "React", "Next.js", "Node.js", "TypeScript", "Python",
          "PostgreSQL", "Docker", "AWS", "System Architecture",
          "Team Leadership", "Full-Stack Development"
        ],
        sameAs: [
          "https://github.com/FReptar0",
          "https://linkedin.com/in/fernando-rm",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "Fernando Rodriguez Memije Portfolio",
        description: meta.en.description,
        inLanguage: ["en", "es"],
        author: { "@id": `${BASE_URL}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${BASE_URL}/${locale}/#profilepage`,
        url: `${BASE_URL}/${locale}`,
        name: locale === 'es' ? meta.es.title : meta.en.title,
        description: locale === 'es' ? meta.es.description : meta.en.description,
        inLanguage: locale,
        isPartOf: { "@id": `${BASE_URL}/#website` },
        about: { "@id": `${BASE_URL}/#person` },
        mainEntity: { "@id": `${BASE_URL}/#person` },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </>
  );
}
