import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { locales } from '@/i18n';

// Fonts and global styles are provided by the root app/layout.tsx

export const metadata: Metadata = {
  title: "Fernando Rodriguez Memije | Senior Software Engineer",
  description:
    "Senior Software Engineer specializing in scalable systems, team leadership, and modern web architecture. 5+ years building high-performance applications with React, Node.js, and cloud technologies. Available for consulting and full-time opportunities.",
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
  ],
  authors: [{ name: "Fernando Rodriguez Memije" }],
  creator: "Fernando Rodriguez Memije",
  openGraph: {
    title: "Fernando Rodriguez Memije | Senior Software Engineer",
    description:
      "Senior Software Engineer specializing in scalable systems and modern web architecture. Available for consulting and full-time opportunities.",
    url: "https://fernandomemije.dev/",
    siteName: "Fernando Rodriguez Memije Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fernando Rodriguez Memije | Senior Software Engineer",
    description:
      "Senior Software Engineer specializing in scalable systems and modern web architecture.",
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

  return (
    <>
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </>
  );
}
