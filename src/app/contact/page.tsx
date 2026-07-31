import type { Metadata } from "next";
import { Mail, CalendarDays, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";
import { CalEmbed, CAL_BOOKING_URL } from "@/components/cal-embed";

export const metadata: Metadata = {
  title: "Contact — Cnvrted",
  description:
    "Talk to an expert at Cnvrted. Book a demo, email the team, or reach our leadership directly.",
};

const GENERAL_EMAIL = "info@cnvrted.com";

const LEADERSHIP = [
  { name: "Dhruv Pradeep", role: "CEO", email: "dhruv@cnvrted.com" },
  { name: "Kailas", role: "CTO", email: "kailas@cnvrted.com" },
  { name: "Sharan", role: "COO", email: "sharan@cnvrted.com" },
];

export default function ContactPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="bg-grid-page absolute inset-0" />
        <div className="absolute -right-24 top-40 h-96 w-96 rounded-full bg-blue-500/20 blur-[110px]" />
        <div className="absolute -left-24 top-[28rem] h-80 w-80 rounded-full bg-blue-400/15 blur-[110px]" />
      </div>
      <SiteHeader />
      <main className="flex-1">
        <Section>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center rounded-full border border-hairline bg-surface-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-teal">
              Contact us
            </span>
            <h1 className="mt-6 font-display text-display-lg font-semibold tracking-tight text-ink">
              Talk to an expert at Cnvrted.
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-body">
              Have questions or need assistance? We&apos;re here to help. Reach out
              to us and we&apos;ll get back to you shortly.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-[1.3fr_1fr]">
            {/* Live calendar */}
            <Card className="overflow-hidden">
              <div className="flex items-center justify-between gap-4 border-b border-hairline bg-black px-6 py-5 text-on-dark">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/25">
                    <CalendarDays className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">Schedule a demo</p>
                    <p className="text-xs text-on-dark/75">
                      Book a personalized walkthrough with our founding team.
                    </p>
                  </div>
                </div>
                <a
                  href={CAL_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden shrink-0 items-center gap-1 text-xs font-medium text-on-dark/85 smooth-transition hover:text-on-dark sm:inline-flex"
                >
                  Open in Cal.com
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
              <div className="bg-gradient-to-b from-blue-50 to-canvas p-2">
                <CalEmbed className="w-full overflow-hidden rounded-2xl" />
              </div>
            </Card>

            {/* Email + leadership */}
            <div className="flex flex-col gap-6">
              <Card className="p-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <Mail className="h-4 w-4" />
                  Email address
                </div>
                <p className="mt-1.5 text-sm text-muted">
                  Speak to our friendly team.
                </p>
                <a
                  href={`mailto:${GENERAL_EMAIL}`}
                  className="mt-4 flex items-center gap-2.5 rounded-xl border border-hairline bg-surface-soft px-4 py-3 text-sm font-medium text-ink smooth-transition hover:border-muted-soft/50 hover:bg-surface-card"
                >
                  <Mail className="h-4 w-4 shrink-0 text-muted" />
                  {GENERAL_EMAIL}
                </a>
              </Card>

              <Card className="flex-1 p-6">
                <p className="text-sm font-semibold text-ink">Leadership</p>
                <p className="mt-1.5 text-sm text-muted">
                  Reach out to the founding team directly.
                </p>
                <div className="mt-5 space-y-1">
                  {LEADERSHIP.map((person) => (
                    <a
                      key={person.email}
                      href={`mailto:${person.email}`}
                      className="group -mx-2 flex items-center justify-between gap-3 rounded-lg px-2 py-2.5 smooth-transition hover:bg-surface-soft"
                    >
                      <div>
                        <p className="text-sm font-medium text-ink">
                          {person.name}
                        </p>
                        <p className="text-xs text-muted">{person.role}</p>
                      </div>
                      <span className="text-xs text-muted-soft smooth-transition group-hover:text-body">
                        {person.email}
                      </span>
                    </a>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
