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
        'x-default': `${BASE_URL}/es`,
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
          url: `${BASE_URL}/${locale}/opengraph-image`,
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
      images: [`${BASE_URL}/${locale}/opengraph-image`],
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
        worksFor: {
          "@type": "Organization",
          name: locale === 'es' ? "Disponible para Oportunidades" : "Available for Opportunities",
        },
        alumniOf: {
          "@type": "Organization",
          name: "UNAM",
        },
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
      {
        "@type": "FAQPage",
        "@id": `${BASE_URL}/${locale}/#faqpage`,
        url: `${BASE_URL}/${locale}`,
        inLanguage: locale,
        isPartOf: { "@id": `${BASE_URL}/#website` },
        mainEntity: locale === 'es'
          ? [
              {
                "@type": "Question",
                name: "¿En qué tecnologías se especializa Fernando Rodriguez Memije?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Fernando se especializa en React, Next.js, Node.js, TypeScript, Python, PostgreSQL, Docker y AWS. Con más de 5 años de experiencia, construye aplicaciones full-stack escalables y ha liderado equipos de ingeniería de hasta 12 desarrolladores.",
                },
              },
              {
                "@type": "Question",
                name: "¿Fernando Rodriguez Memije está disponible para consultoría o puestos de tiempo completo?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sí, Fernando está disponible tanto para proyectos de consultoría como para posiciones de ingeniería de software senior a tiempo completo. Tiene experiencia liderando equipos multifuncionales y entregando soluciones de nivel empresarial.",
                },
              },
              {
                "@type": "Question",
                name: "¿En qué tipo de proyectos ha trabajado Fernando?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Fernando ha construido integraciones ERP empresariales procesando datos para más de 200 empleados, plataformas de sincronización en tiempo real manejando más de 50,000 operaciones diarias, sistemas de pago fintech, plataformas SaaS de gestión de gimnasios y sistemas de trading algorítmico.",
                },
              },
              {
                "@type": "Question",
                name: "¿Dónde se encuentra Fernando Rodriguez Memije?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Fernando se encuentra en México y trabaja con equipos internacionales. Es fluido tanto en español como en inglés, lo que permite una colaboración efectiva en organizaciones globales.",
                },
              },
              {
                "@type": "Question",
                name: "¿Cuál es el enfoque de Fernando hacia la arquitectura de software?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Fernando sigue un enfoque de pensamiento sistémico, centrándose en la escalabilidad, mantenibilidad y rendimiento. Diseña arquitecturas orientadas a eventos, implementa pipelines de CI/CD y prioriza prácticas de código limpio con pruebas exhaustivas.",
                },
              },
            ]
          : [
              {
                "@type": "Question",
                name: "What technologies does Fernando Rodriguez Memije specialize in?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Fernando specializes in React, Next.js, Node.js, TypeScript, Python, PostgreSQL, Docker, and AWS. With 5+ years of experience, he builds scalable full-stack applications and has led engineering teams of up to 12 developers.",
                },
              },
              {
                "@type": "Question",
                name: "Is Fernando Rodriguez Memije available for consulting or full-time roles?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, Fernando is available for both consulting engagements and full-time senior software engineering positions. He has experience leading cross-functional teams and delivering enterprise-grade solutions.",
                },
              },
              {
                "@type": "Question",
                name: "What kind of projects has Fernando worked on?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Fernando has built enterprise ERP integrations processing data for 200+ staff, real-time synchronization platforms handling 50,000+ daily operations, fintech payment systems, gym management SaaS platforms, and algorithmic trading systems.",
                },
              },
              {
                "@type": "Question",
                name: "Where is Fernando Rodriguez Memije based?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Fernando is based in Mexico and works with international teams. He is fluent in both Spanish and English, enabling effective collaboration across global organizations.",
                },
              },
              {
                "@type": "Question",
                name: "What is Fernando's approach to software architecture?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Fernando follows a systems-thinking approach, focusing on scalability, maintainability, and performance. He designs event-driven architectures, implements CI/CD pipelines, and prioritizes clean code practices with comprehensive testing.",
                },
              },
            ],
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
