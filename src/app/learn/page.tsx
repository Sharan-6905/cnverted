import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Learn — Cnvrted",
  description: "Guides, playbooks, and resources from Cnvrted. Coming soon.",
};

export default function LearnPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Section
          centered
          eyebrow="Learn from us"
          title="Coming soon."
          description="We're putting together guides and playbooks on finding, reaching, and closing in-market buyers. Check back soon."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
