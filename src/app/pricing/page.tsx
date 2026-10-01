import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { IllustratedShell } from "@/components/illustrated/shell";
import { IllustratedPricing, pricingFAQs } from "@/components/illustrated/pricing";

export const metadata: Metadata = {
  alternates: { canonical: "/pricing" },
  title: "Pricing — Cnvrted",
  description:
    "Start with Spark and 40 free credits. Grow with Surge at $119 per month, or choose Dominion for custom credits.",
};

export default function PricingPage() {
  return (
    <IllustratedShell className="design-pricing-page" faqItems={pricingFAQs}>
      <BreadcrumbSchema trail={[{ name: "Pricing" }]} />
      <IllustratedPricing />
    </IllustratedShell>
  );
}
