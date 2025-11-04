import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { locales } from '@/i18n';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

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
    url: "https://fmemije.com",
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
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
