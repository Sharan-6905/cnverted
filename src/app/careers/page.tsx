import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CareerApplicationForm } from "@/components/career-application-form";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Careers — Cnvrted",
  description: "We're hiring. Open roles at Cnvrted.",
};

const ROLES = [
  {
    title: "AI/ML Engineer",
    location: "Remote",
    type: "Full-time",
    description:
      "Build and ship the models and pipelines that turn raw signal into scored, ready-to-work accounts.",
  },
  {
    title: "GTM Engineer",
    location: "Remote",
    type: "Full-time",
    description:
      "Sit between product and revenue — build the workflows and integrations that get signal into reps' hands, fast.",
  },
  {
    title: "GTM Lead",
    location: "Remote",
    type: "Full-time",
    description:
      "Own go-to-market strategy end to end — from positioning to pipeline — as one of our earliest hires.",
  },
  {
    title: "Founders Office Intern (In batches)",
    location: "Remote",
    type: "Internship",
    description:
      "Work directly with the founders across product, GTM, and ops — high ownership, fast learning.",
  },
];

export default function CareersPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url(/banners/careers-bg.png)" }}
        aria-hidden="true"
      />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-white/90" aria-hidden="true" />
      <BreadcrumbSchema trail={[{ name: "Careers" }]} />
      <SiteHeader />
      <main className="flex-1">
        <Section
          eyebrow="Careers"
          title="Help us build the future of outbound."
          description="We're a small team moving fast. Here's what we're hiring for right now."
        >
          <div className="space-y-4">
            {ROLES.map((role) => (
              <Card key={role.title} className="border-blue-200/50 bg-blue-50/60 p-6 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{role.title}</h3>
                    <p className="mt-1 text-sm text-muted">
                      {role.location} · {role.type}
                    </p>
                  </div>
                  <Badge variant="clay" size="sm">
                    Hiring
                  </Badge>
                </div>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-body">
                  {role.description}
                </p>
              </Card>
            ))}
          </div>

          <div className="mt-16">
            <CareerApplicationForm />
          </div>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
