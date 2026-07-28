import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Section } from "@/components/section";
import { PricingPlans } from "@/components/pricing-plans";

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
          description="Cnvrted is in early access — join now to lock in these rates before general availability."
        >
          <PricingPlans />
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
