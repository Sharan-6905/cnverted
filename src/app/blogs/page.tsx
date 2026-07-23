import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Blog — Cnvrted",
  description: "Insights on outbound, buying intent, and go-to-market from the Cnvrted team.",
};

export default function BlogsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Section
          centered
          eyebrow="Blog"
          title="Insights on outbound, intent, and GTM."
          description="We're writing about buying signals, pipeline strategy, and everything in between. First posts are coming soon."
        >
          <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-3xl border border-hairline bg-surface-soft px-8 py-14 text-center">
            <Newspaper className="h-8 w-8 text-muted" />
            <p className="text-sm font-medium text-ink">No posts yet</p>
            <p className="text-sm leading-relaxed text-muted">
              Check back soon, or join the early-access list to get new posts in your inbox.
            </p>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
