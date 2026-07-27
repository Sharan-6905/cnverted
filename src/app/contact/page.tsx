import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contact — Cnvrted",
  description: "Get in touch with the Cnvrted team.",
};

const TEAM = [
  { name: "Dhruv Pradeep", role: "CEO", email: "dhruv@cnvrted.com" },
  { name: "Kailas", role: "CTO", email: "kailas@cnvrted.com" },
  { name: "Sharan", role: "COO", email: "sharan@cnvrted.com" },
];

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Section
          eyebrow="Contact"
          title="Get in touch."
          description="Reach out directly to the team — we read every message."
        >
          <div className="grid gap-4 sm:grid-cols-3">
            {TEAM.map((person) => (
              <Card key={person.email} className="p-6">
                <h3 className="text-[15px] font-semibold text-ink">{person.name}</h3>
                <p className="mt-1 text-sm text-muted">{person.role}</p>
                <a
                  href={`mailto:${person.email}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ink smooth-transition hover:text-body"
                >
                  <Mail className="h-4 w-4" />
                  {person.email}
                </a>
              </Card>
            ))}
          </div>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
