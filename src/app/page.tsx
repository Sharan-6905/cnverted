"use client";

import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { HowCnvrtedWorks } from "@/components/how-cnvrted-works";
import { StoryIntro } from "@/components/story-intro";
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
import { INTEGRATIONS } from "@/lib/sample-data";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <Hero />

        <HowCnvrtedWorks />

        <StoryIntro
          headline="The internet never stops changing."
          body={
            <>
              Every day, companies leave behind signals that reveal where they&apos;re headed.
              <br />
              New funding rounds, hiring activity, product launches, technology changes,
              <br />
              leadership moves, and public conversations all tell part of the story.
              <br />
              CNVRTED continuously watches these signals and transforms them into opportunities
              your sales team can act on.
            </>
          }
        />
        <IntentRadar />
        <StoryIntro
          headline="Millions of signals. One clear decision."
          body={
            <>
              Every signal is collected, analyzed, connected, and ranked by our intelligence
              engine.
              <br />
              Instead of asking your team to interpret hundreds of updates,
              <br />
              CNVRTED surfaces the companies most likely to be buying —
              <br />
              along with the evidence behind every recommendation.
            </>
          }
        />

        <IntentCapture />

        <StoryIntro
          headline="Research is only the beginning."
          body={
            <>
              Once high-intent companies are identified, ORKA transforms live company
              intelligence
              <br />
              into personalized outreach. Every message is grounded in real events
              <br />
              happening inside the account, making conversations more relevant from the very
              first interaction.
            </>
          }
        />
        <IntegrationStack />
        <FeatureRows />
        <Reveal>
          <ContactReveal />
        </Reveal>
        <Reveal>
          <CalendarProof />
        </Reveal>

        <StoryIntro
          headline="Every score comes with evidence."
          body={
            <>
              CNVRTED never gives you a number without explaining why.
              <br />
              Every recommendation is backed by real company activity,
              <br />
              allowing your team to understand what changed, when it changed,
              <br />
              and why it&apos;s relevant before reaching out.
            </>
          }
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
