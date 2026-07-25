"use client";

import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { IntentCapture } from "@/components/intent-capture";
import { HowItWorks } from "@/components/how-it-works";
import { FeatureRows } from "@/components/feature-rows";
import { LiveSignalFeed } from "@/components/live-signal-feed";
import { BuiltForTeams } from "@/components/built-for-teams";
import { Integrations } from "@/components/integrations";
import { Comparison } from "@/components/comparison";
import { SiteFooter } from "@/components/site-footer";
import { FEATURED_SIGNAL, SIGNALS, PERSONAS, INTEGRATIONS } from "@/lib/sample-data";
import type { Signal } from "@/lib/types";

export default function Home() {
  // Presentational-only wiring: log the callbacks the real app will implement.
  const handleSelectSignal = (s: Signal) =>
    console.log("[signal] select:", s.company);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <Hero featuredSignal={FEATURED_SIGNAL} />
        <IntentCapture />
        <HowItWorks />
        <FeatureRows />
        <LiveSignalFeed signals={SIGNALS} onSelectSignal={handleSelectSignal} />
        <BuiltForTeams personas={PERSONAS} />
        <Integrations integrations={INTEGRATIONS} />
        <Comparison />
      </main>

      <SiteFooter />
    </div>
  );
}
