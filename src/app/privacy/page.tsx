import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Privacy Policy — Cnvrted",
  description: "How Cnvrted collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Section eyebrow="Legal" title="Privacy Policy" description="Last updated: 2026">
          <div className="max-w-2xl space-y-6 text-[15px] leading-relaxed text-body">
            <div>
              <h2 className="font-display text-lg font-semibold text-ink">What we collect</h2>
              <p className="mt-2">
                When you join our early-access waitlist, we collect the email address you
                provide. When you apply for a role through our careers page, we collect your
                name, phone number, email address, and the role you applied for.
              </p>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-ink">How we use it</h2>
              <p className="mt-2">
                We use waitlist emails to let you know when early access opens and to send a
                one-time confirmation that you&apos;ve joined the list. We use career application
                details solely to review candidates and follow up about open roles. We don&apos;t
                sell your data, and we don&apos;t share it with third parties except the
                infrastructure providers (like our database and email delivery provider) needed
                to operate the site.
              </p>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-ink">Data storage</h2>
              <p className="mt-2">
                Submissions are stored securely with our database provider. You can request that
                we delete your data at any time by emailing{" "}
                <a href="mailto:work@cnvrted.com" className="text-ink underline underline-offset-2">
                  work@cnvrted.com
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-ink">Contact</h2>
              <p className="mt-2">
                Questions about this policy? Reach out at{" "}
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
