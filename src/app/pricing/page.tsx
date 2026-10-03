import { SoftwareSchema } from "@/components/structured-data";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { IllustratedShell } from "@/components/illustrated/shell";
import { IllustratedPricing, pricingFAQs } from "@/components/illustrated/pricing";

export const metadata: Metadata = pageMetadata({
  title: "Pricing — Free Spark & Paid Plans | Cnvrted",
  description: "Start with Spark and 40 free credits. Grow with Surge at $119 per month, or choose Dominion for custom credits.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <IllustratedShell className="design-pricing-page" faqItems={pricingFAQs}>
      <BreadcrumbSchema trail={[{ name: "Pricing" }]} />
      <SoftwareSchema />
      <IllustratedPricing />
    </IllustratedShell>
  );
}
