import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "About — Cnvrted",
  description: "Why we're building Cnvrted, and what we believe about outbound and buying intent.",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Section
          eyebrow="About us"
          title="Built for revenue teams who move fast."
          description="Cnvrted started with a simple observation: most outbound fails not because the message is wrong, but because the timing is. Lead databases sell static contact records — we sell timing."
        >
          <div className="max-w-2xl space-y-4 text-[15px] leading-relaxed text-body">
            <p>
              We built Cnvrted to monitor the open web — LinkedIn, Reddit, X, job boards, funding
              news, and more — for the exact moments a company becomes ready to buy, then hand
              that context straight to the reps who can act on it.
            </p>
            <p>
              We&apos;re a small team obsessed with the gap between &quot;this account looks
              interesting&quot; and &quot;this account is ready right now.&quot; Everything we
              build is in service of closing that gap.
            </p>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
