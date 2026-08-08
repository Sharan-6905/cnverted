import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Section } from "@/components/section";
import { EarlyAccessForm } from "@/components/early-access-form";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Early access — Cnvrted",
  description: "Tell us about your team to get early access to Cnvrted.",
};

export default function EarlyAccessPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <BreadcrumbSchema trail={[{ name: "Early Access" }]} />
      <SiteHeader />
      <main className="flex-1">
        <Section
          centered
          eyebrow="Early access"
          title={
            <>
              Tell us about <span className="text-accent">your team</span>.
            </>
          }
          description="Five short sections — a founder reads every submission and reaches out within 24 hours to lock a demo slot."
          className="pb-8"
        >
          <div className="mx-auto max-w-2xl">
            <EarlyAccessForm />
          </div>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
