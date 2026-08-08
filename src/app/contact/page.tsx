import type { Metadata } from "next";
import { Mail, CalendarDays, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";
import { CalEmbed, CAL_BOOKING_URL } from "@/components/cal-embed";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

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
        <div className="absolute -right-24 top-24 h-96 w-96 rounded-full bg-blue-500/30 blur-[100px]" />
        <div className="absolute -left-24 top-[24rem] h-80 w-80 rounded-full bg-blue-400/25 blur-[100px]" />
        <div className="absolute bottom-8 right-1/4 h-72 w-72 rounded-full bg-brand-teal/20 blur-[110px]" />
      </div>
      <BreadcrumbSchema trail={[{ name: "Contact" }]} />
      <SiteHeader />
      <main className="flex-1">
        <Section className="py-10 sm:py-12 md:py-14">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center rounded-full border border-white/60 bg-canvas/50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-teal backdrop-blur-md">
              Contact us
            </span>
            <h1 className="mt-4 font-display text-display-md font-semibold text-ink">
              Talk to <span className="text-accent">an expert</span> at Cnvrted.
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-body">
              Have questions or need assistance? We&apos;re here to help — reach
              out and we&apos;ll get back to you shortly.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-5xl space-y-5">
            {/* Live calendar — full width so the month view can place its time
                slots beside the calendar (they appear once a date is picked)
                instead of stacking a long list underneath. */}
            <Card className="overflow-hidden border-white/60 bg-canvas/40 shadow-[0_10px_44px_-12px_rgba(20,16,8,0.22)] backdrop-blur-2xl">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-black/90 px-5 py-4 text-on-dark backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-blue-500/25 backdrop-blur-md">
                    <CalendarDays className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">Schedule a demo</p>
                    <p className="text-xs text-on-dark/70">
                      Book a walkthrough with our founding team.
                    </p>
                  </div>
                </div>
                <a
                  href={CAL_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden shrink-0 items-center gap-1 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-on-dark/90 backdrop-blur-md smooth-transition hover:bg-white/20 hover:text-on-dark sm:inline-flex"
                >
                  Open in Cal.com
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
              {/* Inline calendar only where the month view fits side-by-side.
                  Below that it stacks into a very tall slot list, so we show a
                  compact booking button instead. */}
              <div className="hidden bg-gradient-to-b from-blue-100/50 via-white/30 to-transparent p-2 lg:block">
                <CalEmbed className="w-full overflow-hidden rounded-2xl border border-white/60 shadow-soft" />
              </div>

              <div className="bg-gradient-to-b from-blue-100/50 via-white/30 to-transparent px-5 py-6 lg:hidden">
                <p className="text-sm leading-relaxed text-body">
                  Pick a time that works for you — 15 or 30 minutes, straight
                  into our calendar.
                </p>
                <a
                  href={CAL_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-black px-5 text-sm font-medium text-on-dark shadow-soft smooth-transition active:scale-[0.98]"
                >
                  Book a time slot
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </Card>

            {/* Email + leadership */}
            <div className="grid gap-5 md:grid-cols-[1fr_1.35fr]">
              <Card className="border-white/60 bg-canvas/40 p-5 shadow-[0_10px_44px_-12px_rgba(20,16,8,0.18)] backdrop-blur-2xl">
                <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <Mail className="h-4 w-4" />
                  Email us
                </div>
                <p className="mt-1 text-sm text-muted">
                  Speak to our friendly team.
                </p>
                <a
                  href={`mailto:${GENERAL_EMAIL}`}
                  className="mt-3.5 flex items-center gap-2.5 rounded-xl border border-white/60 bg-white/50 px-4 py-2.5 text-sm font-medium text-ink backdrop-blur-md smooth-transition hover:border-white/90 hover:bg-white/70"
                >
                  <Mail className="h-4 w-4 shrink-0 text-muted" />
                  {GENERAL_EMAIL}
                </a>
              </Card>

              <Card className="border-white/60 bg-canvas/40 p-5 shadow-[0_10px_44px_-12px_rgba(20,16,8,0.18)] backdrop-blur-2xl">
                <p className="text-sm font-semibold text-ink">Founding team</p>
                <p className="mt-1 text-sm text-muted">
                  Reach out to us directly.
                </p>
                <div className="mt-3 divide-y divide-white/50">
                  {LEADERSHIP.map((person) => (
                    <a
                      key={person.email}
                      href={`mailto:${person.email}`}
                      className="group -mx-2 flex items-center justify-between gap-3 rounded-lg px-2 py-2 smooth-transition hover:bg-white/50"
                    >
                      <p className="text-sm font-medium text-ink">
                        {person.role}
                      </p>
                      <span className="text-xs text-muted smooth-transition group-hover:text-ink">
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
