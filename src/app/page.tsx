"use client";

import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { FeatureRows } from "@/components/feature-rows";
import { LiveSignalFeed } from "@/components/live-signal-feed";
import { BuiltForTeams } from "@/components/built-for-teams";
import { Integrations } from "@/components/integrations";
import { Comparison } from "@/components/comparison";
import { CtaBand } from "@/components/cta-band";
import { SiteFooter } from "@/components/site-footer";
import { FEATURED_SIGNAL, SIGNALS, PERSONAS, INTEGRATIONS } from "@/lib/sample-data";
import type { Signal } from "@/lib/types";

export default function Home() {
  // Presentational-only wiring: log the callbacks the real app will implement.
  const handleWaitlist = (email: string) =>
    console.log("[waitlist] join:", email);
  const handleSelectSignal = (s: Signal) =>
    console.log("[signal] select:", s.company);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader
        onEarlyAccess={() => console.log("[cta] early access")}
        onSlackInvite={() => console.log("[cta] slack invite")}
      />

      <main className="flex-1">
        <Hero featuredSignal={FEATURED_SIGNAL} />
        <FeatureRows />
        <LiveSignalFeed signals={SIGNALS} onSelectSignal={handleSelectSignal} />
        <BuiltForTeams personas={PERSONAS} />
        <Integrations integrations={INTEGRATIONS} />
        <Comparison />
        <CtaBand onWaitlistSubmit={handleWaitlist} />
      </main>

      <SiteFooter />
    </div>
  );
}
