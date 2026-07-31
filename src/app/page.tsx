"use client";

import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { IntentRadar } from "@/components/intent-radar";
import { IntentCapture } from "@/components/intent-capture";
import { IntegrationStack } from "@/components/integration-stack";
import { FeatureRows } from "@/components/feature-rows";
import { ContactReveal } from "@/components/contact-reveal";
import { CalendarProof } from "@/components/calendar-proof";
import { IcpEnrichmentTable } from "@/components/icp-enrichment-table";
import { Integrations } from "@/components/integrations";
import { Comparison } from "@/components/comparison";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { FEATURED_SIGNAL, INTEGRATIONS } from "@/lib/sample-data";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <Hero featuredSignal={FEATURED_SIGNAL} />
        <IntentRadar />
        <IntentCapture />
        <IntegrationStack />
        <FeatureRows />
        <Reveal>
          <ContactReveal />
        </Reveal>
        <Reveal>
          <CalendarProof />
        </Reveal>
        <IcpEnrichmentTable />
        <Reveal>
          <Integrations integrations={INTEGRATIONS} />
        </Reveal>
        <Reveal>
          <Comparison />
        </Reveal>
      </main>

      <SiteFooter />
    </div>
  );
}
