import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";
import { BookingCard } from "@/components/booking-card";
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
            <BookingCard />

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
