import { PageSchema } from "@/components/page-schema";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { EarlyAccessForm } from "@/components/early-access-form";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { IllustratedShell } from "@/components/illustrated/shell";

export const metadata: Metadata = pageMetadata({
  title: "Cnvrted Early Access | AI GTM Waitlist",
  description: "Join the Cnvrted early-access waitlist and tell us about your GTM workflow. Looking to try the current beta? Start with 400 introductory credits.",
  path: "/early-access",
});

export default function EarlyAccessPage() {
  return (
    <IllustratedShell className="design-early-access-page" faqItems={[]}>
      <PageSchema path="/early-access" metadata={metadata} type="WebPage" />
      <BreadcrumbSchema trail={[{ name: "Early Access" }]} />
      <header className="marketing-page-heading design-container">
        <span className="marketing-eyebrow">Early access</span>
        <h1>
          Build your next
          <br />
          GTM workflow with us.
        </h1>
        <p>
          Tell us about the workflow you want to build. We’ll follow up about
          future access and the right setup. The existing beta is available now;
          you do not need to join this list to try it.
        </p>
        <a className="marketing-text-link" href="https://beta.cnvrted.com">
          Want to explore now? Start free with 400 introductory credits{" "}
          <span aria-hidden="true">↗</span>
        </a>
      </header>
      <section
        className="early-access-layout design-container"
        aria-labelledby="early-access-form-title"
      >
        <aside className="early-access-intro">
          <span className="marketing-eyebrow">A little context first</span>
          <h2 id="early-access-form-title">
            Tell us about
            <br />
            your team.
          </h2>
          <p>
            Five short sections about your business, current tools, and what you
            want to improve.
          </p>
          <p>
            Your answers go to the Cnvrted team. Read our{" "}
            <Link href="/privacy">Privacy Policy</Link> for how we handle your
            information.
          </p>
          <p>
            Prefer a conversation?
            <br />
            <Link href="/contact">Talk to us</Link>
          </p>
        </aside>
        <EarlyAccessForm />
      </section>
    </IllustratedShell>
  );
}
