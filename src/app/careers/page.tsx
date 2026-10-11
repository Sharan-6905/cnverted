import { CAREER_ROLES } from "@/lib/careers";
import { PageSchema } from "@/components/page-schema";
import { pageMetadata } from "@/lib/seo";
import { careerFAQs } from "@/components/illustrated/faq";
import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { IllustratedShell } from "@/components/illustrated/shell";
import { IllustratedHero, DesignLink } from "@/components/illustrated/hero";
import { RoleList } from "@/components/illustrated/role-list";

export const metadata: Metadata = pageMetadata({
  title: "Cnvrted Careers | AI, Engineering & GTM Jobs",
  description: "Explore roles at Cnvrted in AI engineering, GTM, marketing, and the founders’ office. Review responsibilities, location, and application details.",
  path: "/careers",
});
export default function CareersPage() {
  return (
    <IllustratedShell faqItems={careerFAQs} className="design-careers-page">
      <PageSchema path="/careers" metadata={metadata} type="CollectionPage" items={CAREER_ROLES.map(role => ({ name: role.title, path: `/careers/${role.slug}` }))} />
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
