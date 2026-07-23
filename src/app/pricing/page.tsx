import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Section } from "@/components/section";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Pricing — Cnvrted",
  description: "Cnvrted pricing — currently in early access. Join the waitlist to be first in line.",
};

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Section
          centered
          eyebrow="Pricing"
          title="Simple, transparent pricing."
          description="Cnvrted is in early access — pricing plans open up as we roll out to new teams. Join the list below to lock in early-access rates."
        />
        <CtaBand />
      </main>
      <SiteFooter />
    </div>
  );
}
