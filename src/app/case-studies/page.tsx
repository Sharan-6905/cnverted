import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Section } from "@/components/section";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Case Studies — Cnvrted",
  description: "Case studies from teams using Cnvrted — coming soon as our first customers ship results.",
};

export default function CaseStudiesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Section
          centered
          eyebrow="Case studies"
          title="Coming soon."
          description="We're early — our first customers are just getting started with Cnvrted. Real results and case studies will land here as they come in."
        >
          <p className="mx-auto max-w-md text-center text-sm text-muted">
            Want to be one of the first stories on this page? Join the early-access list below.
          </p>
        </Section>
        <CtaBand />
      </main>
      <SiteFooter />
    </div>
  );
}
