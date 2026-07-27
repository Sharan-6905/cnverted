import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Terms of Service — Cnvrted",
  description: "The terms that govern use of the Cnvrted website and product.",
};

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Section eyebrow="Legal" title="Terms of Service" description="Last updated: 2026">
          <div className="max-w-2xl space-y-6 text-[15px] leading-relaxed text-body">
            <div>
              <h2 className="font-display text-lg font-semibold text-ink">Overview</h2>
              <p className="mt-2">
                Cnvrted is currently in early access. By using this website or joining our
                waitlist, you agree to these terms. We may update them as the product evolves —
                we&apos;ll keep this page current.
              </p>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-ink">Early access</h2>
              <p className="mt-2">
                Joining the waitlist does not guarantee access to the product, a specific
                timeline, or any particular feature set. Pricing and functionality may change
                before general availability.
              </p>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-ink">Acceptable use</h2>
              <p className="mt-2">
                Don&apos;t use this site to submit false information, attempt to disrupt its
                operation, or misuse any form on the site (including the waitlist and careers
                application forms) for purposes other than their intended use.
              </p>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-ink">No warranty</h2>
              <p className="mt-2">
                This site and any early-access product are provided &quot;as is,&quot; without
                warranties of any kind, while we&apos;re still building.
              </p>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-ink">Contact</h2>
              <p className="mt-2">
                Questions about these terms? Reach out at{" "}
                <a href="mailto:work@cnvrted.com" className="text-ink underline underline-offset-2">
                  work@cnvrted.com
                </a>
                .
              </p>
            </div>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
