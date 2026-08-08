import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Section } from "@/components/section";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Learn — Cnvrted",
  description: "Guides, playbooks, and resources from Cnvrted. Coming soon.",
};

export default function LearnPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <BreadcrumbSchema trail={[{ name: "Learn" }]} />
      <SiteHeader />
      <main className="flex-1">
        <Section
          centered
          eyebrow="Learn from us"
          title={
            <>
              Coming <span className="text-accent">soon</span>.
            </>
          }
          description="We're putting together guides and playbooks on finding, reaching, and closing in-market buyers. Check back soon."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
