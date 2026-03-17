import type { Metadata } from "next";
import * as React from "react";
import SpeedInsightsClient from "@/components/SpeedInsightsClient";
import AnalyticsClient from "@/components/AnalyticsClient";
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = {
    title: "Fernando Rodriguez Memije | Senior Software Engineer",
    description: "Senior Software Engineer specializing in scalable systems, team leadership, and modern web architecture. 5+ years building high-performance applications with React, Node.js, and cloud technologies.",
};

const spaceGrotesk = Space_Grotesk({
    variable: "--font-heading",
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
    variable: "--font-body",
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
    variable: "--font-mono",
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "700"],
});

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const locale = await getLocale();
    return (
        <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://cdn.jsdelivr.net" />
            </head>
            <body className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased`}>
                {/* Inline script to set theme class before React hydrates */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(){try{var t=localStorage.getItem('theme');if(t){if(t==='dark')document.documentElement.classList.add('dark');else document.documentElement.classList.remove('dark');}else{document.documentElement.classList.add('dark');}}catch(e){}})();`,
                    }}
                />

                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem={false}
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
                <SpeedInsightsClient />
                <AnalyticsClient />
            </body>
        </html>
    );
}
