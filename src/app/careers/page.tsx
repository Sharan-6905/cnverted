import { careerFAQs } from "@/components/illustrated/faq";
import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { IllustratedShell } from "@/components/illustrated/shell";
import { IllustratedHero, DesignLink } from "@/components/illustrated/hero";
import { RoleList } from "@/components/illustrated/role-list";

export const metadata: Metadata = {
  title: "Careers — Cnvrted",
  description:
    "Join the Cnvrted team. Explore open roles in marketing, engineering, go-to-market and operations.",
  alternates: { canonical: "/careers" },
};
export default function CareersPage() {
  return (
    <IllustratedShell faqItems={careerFAQs} className="design-careers-page">
      <BreadcrumbSchema trail={[{ name: "Careers" }]} />
      <IllustratedHero
        kind="careers"
        title="Join our team"
        description="Help us turn signals across the web into better customer conversations. Join our team across engineering, marketing, go-to-market, and operations."
      >
        <DesignLink href="/contact" secondary>
          Contact
        </DesignLink>
        <DesignLink href="#open-roles">Open Roles</DesignLink>
      </IllustratedHero>
      <section
        id="open-roles"
        className="design-open-roles design-container"
        aria-labelledby="roles-title"
      >
        <div className="design-section-heading">
          <h2 id="roles-title">Open Roles</h2>
          <p>
            Help us build the future of outbound. Find your place on the Cnvrted
            team.
          </p>
        </div>
        <RoleList />
      </section>
    </IllustratedShell>
  );
}
