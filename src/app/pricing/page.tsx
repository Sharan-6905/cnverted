import { PageSchema } from "@/components/page-schema";
import { SoftwareSchema } from "@/components/structured-data";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { IllustratedShell } from "@/components/illustrated/shell";
import { IllustratedPricing, pricingFAQs } from "@/components/illustrated/pricing";
import { CgFooter } from "@/components/crockedglass/site-footer";
import { inter, mono } from "@/components/crockedglass/fonts";
import "@/components/crockedglass/home.css";

export const metadata: Metadata = pageMetadata({
  title: "Cnvrted Pricing | Free GTM Credits & Paid Plans",
  description: "Compare Starter at $49/month with 1,750 credits and Pro at $199/month with 7,250 credits. Start with 400 introductory credits; top up 550 credits for $15.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <IllustratedShell
      className="design-pricing-page"
      faqItems={pricingFAQs}
      footer={<div className={`cg pricing-cg-footer ${inter.variable} ${mono.variable}`}><CgFooter /></div>}
    >
      <PageSchema path="/pricing" metadata={metadata} type="WebPage" />
      <BreadcrumbSchema trail={[{ name: "Pricing" }]} />
      <SoftwareSchema />
      <IllustratedPricing />
    </IllustratedShell>
  );
}
