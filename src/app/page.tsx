"use client";

import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { HowCnvrtedWorks } from "@/components/how-cnvrted-works";
import { ProductVideo } from "@/components/product-video";
import { LeadViews } from "@/components/lead-views";
import { StoryIntro } from "@/components/story-intro";
import { IntentRadar } from "@/components/intent-radar";
import { IntentCapture } from "@/components/intent-capture";
import { IntegrationStack } from "@/components/integration-stack";
import { SignalOpportunities } from "@/components/signal-opportunities";
import { SignalToOutreach } from "@/components/signal-to-outreach";
import { CalendarProof } from "@/components/calendar-proof";
import { IcpEnrichmentTable } from "@/components/icp-enrichment-table";
import { Integrations } from "@/components/integrations";
import { Comparison } from "@/components/comparison";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { INTEGRATIONS } from "@/lib/sample-data";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <Hero />

        <ProductVideo />

        <HowCnvrtedWorks />

        <LeadViews />

        <IntentRadar />

        <IntentCapture />

        <IntegrationStack />
        <TestimonialCarousel />
        <SignalOpportunities />
        <SignalToOutreach />
        <Reveal>
          <CalendarProof />
        </Reveal>

        <StoryIntro
          headline={
            <>
              Every score comes with{" "}
              <span className="text-accent">evidence</span>.
            </>
          }
          body="CNVRTED never gives you a number without explaining why. Every recommendation is backed by real company activity, allowing your team to understand what changed, when it changed, and why it's relevant before reaching out."
          image="/radar-scan.png"
          imageAlt="A radar dish scanning a field, illuminating the companies it detects as buying signals."
        />
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
