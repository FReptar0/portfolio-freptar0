"use client";

import dynamic from "next/dynamic";

// Load SpeedInsights only on the client (no SSR)
const SpeedInsights = dynamic(
    () => import("@vercel/speed-insights/next").then((mod) => mod.SpeedInsights),
    { ssr: false }
);

export default function SpeedInsightsClient() {
    return <SpeedInsights />;
}
