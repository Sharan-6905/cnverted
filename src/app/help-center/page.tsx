import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Help Center — Cnvrted",
  description: "Get help with Cnvrted. Reach out and we'll get back to you.",
};

const FAQS = [
  {
    question: "How does Cnvrted find buying signals?",
    answer:
      "We monitor thousands of sources across the open web and social — funding news, hiring activity, tech changes, exec moves, and more — in real time.",
  },
  {
    question: "What's the difference between Cnvrted and a lead database?",
    answer:
      "Lead databases sell you static contact records. Cnvrted sells you timing — the moment an account becomes ready to buy, plus the why-now context to reach out with.",
  },
  {
    question: "Is Cnvrted available yet?",
    answer:
      "Cnvrted is currently in early access. Join the waitlist from the homepage to be first in line.",
  },
];

export default function HelpCenterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <BreadcrumbSchema trail={[{ name: "Help Center" }]} />
      <SiteHeader />
      <main className="flex-1">
        <Section
          eyebrow="Help center"
          title="Have a question? We're here to help."
          description="Look through the common questions below, or reach out directly — we read every message."
        >
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <Card key={faq.question} className="p-6">
                <h3 className="text-[15px] font-semibold text-ink">{faq.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{faq.answer}</p>
              </Card>
            ))}
          </div>

          <Card className="mt-8 flex flex-col items-start gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-[15px] font-semibold text-ink">Still need help?</h3>
              <p className="mt-1 text-sm text-muted">
                Email us and we&apos;ll get back to you as soon as we can.
              </p>
            </div>
            <a
              href="mailto:work@cnvrted.com"
              className="inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-sm font-medium text-on-dark smooth-transition hover:bg-body-strong"
            >
              <Mail className="h-4 w-4" />
              work@cnvrted.com
            </a>
          </Card>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
