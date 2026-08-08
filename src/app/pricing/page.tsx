import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Section } from "@/components/section";
import { PricingPlans } from "@/components/pricing-plans";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Pricing — Cnvrted",
  description: "Cnvrted pricing — currently in early access. Join the waitlist to be first in line.",
};

export default function PricingPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Grid + ambient colour behind the frosted plan cards */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="bg-grid-page absolute inset-0" />
        <div className="absolute -left-20 top-48 h-80 w-80 rounded-full bg-blue-400/30 blur-[100px]" />
        <div className="absolute right-[-5rem] top-64 h-96 w-96 rounded-full bg-brand-teal/25 blur-[110px]" />
        <div className="absolute bottom-10 left-[38%] h-96 w-96 rounded-full bg-[#BEF264]/30 blur-[110px]" />
        <div className="absolute bottom-32 right-[10%] h-72 w-72 rounded-full bg-fuchsia-300/25 blur-[110px]" />
      </div>
      <BreadcrumbSchema trail={[{ name: "Pricing" }]} />
      <SiteHeader />
      <main className="flex-1">
        <Section
          centered
          eyebrow="Pricing"
          title={
            <>
              Simple, <span className="text-accent">transparent</span>{" "}
              pricing.
            </>
          }
          description="Cnvrted is in early access — join now to lock in these rates before general availability."
        >
          <PricingPlans />
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
