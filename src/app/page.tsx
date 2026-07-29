"use client";

import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { IntentCapture } from "@/components/intent-capture";
import { IntegrationStack } from "@/components/integration-stack";
import { FeatureRows } from "@/components/feature-rows";
import { IcpEnrichmentTable } from "@/components/icp-enrichment-table";
import { BuiltForTeams } from "@/components/built-for-teams";
import { Integrations } from "@/components/integrations";
import { Comparison } from "@/components/comparison";
import { SiteFooter } from "@/components/site-footer";
import { FEATURED_SIGNAL, INTEGRATIONS } from "@/lib/sample-data";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <Hero featuredSignal={FEATURED_SIGNAL} />
        <IntentCapture />
        <IntegrationStack />
        <FeatureRows />
        <IcpEnrichmentTable />
        <BuiltForTeams />
        <Integrations integrations={INTEGRATIONS} />
        <Comparison />
      </main>

      <SiteFooter />
    </div>
  );
}
