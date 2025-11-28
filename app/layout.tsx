import * as React from "react";
import SpeedInsightsClient from "@/components/SpeedInsightsClient";
import AnalyticsClient from "@/components/AnalyticsClient";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";


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

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="scroll-smooth" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
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
