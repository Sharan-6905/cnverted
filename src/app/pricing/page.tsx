import { PageSchema } from "@/components/page-schema";
import { SoftwareSchema } from "@/components/structured-data";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { IllustratedShell } from "@/components/illustrated/shell";
import { IllustratedPricing, pricingFAQs } from "@/components/illustrated/pricing";

export const metadata: Metadata = pageMetadata({
  title: "Cnvrted Pricing | Free GTM Credits & Paid Plans",
  description: "Compare Cnvrted GTM plans: Spark includes 40 free credits, Surge costs $119 per month, and Dominion offers custom credits. Find the right plan for your team.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <IllustratedShell className="design-pricing-page" faqItems={pricingFAQs}>
      <PageSchema path="/pricing" metadata={metadata} type="WebPage" />
      <BreadcrumbSchema trail={[{ name: "Pricing" }]} />
      <SoftwareSchema />
      <IllustratedPricing />
    </IllustratedShell>
  );
}
