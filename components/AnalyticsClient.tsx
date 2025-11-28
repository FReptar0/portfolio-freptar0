"use client";

import dynamic from "next/dynamic";

// Load Analytics only on the client (no SSR)
const Analytics = dynamic(
    () => import("@vercel/analytics/next").then((mod) => mod.Analytics),
    { ssr: false }
);

export default function AnalyticsClient() {
    return <Analytics />;
}
