import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Careers — Cnvrted",
  description: "We're hiring. Open roles at Cnvrted.",
};

const ROLES = [
  {
    title: "AI Engineer",
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
    title: "Founding Engineer",
    location: "Remote",
    type: "Full-time",
    description:
      "Join early and help shape the core product across the stack, from data ingestion to the dashboard reps live in.",
  },
];

export default function CareersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Section
          eyebrow="Careers"
          title="Help us build the future of outbound."
          description="We're a small team moving fast. Here's what we're hiring for right now."
        >
          <div className="space-y-4">
            {ROLES.map((role) => (
              <Card key={role.title} className="p-6 sm:p-7">
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
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
