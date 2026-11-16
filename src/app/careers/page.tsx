import { CAREER_ROLES } from "@/lib/careers";
import { PageSchema } from "@/components/page-schema";
import { pageMetadata } from "@/lib/seo";
import { careerFAQs } from "@/components/illustrated/faq";
import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { IllustratedShell } from "@/components/illustrated/shell";
import { CareersHero } from "@/components/illustrated/careers-hero";
import { CgFooter } from "@/components/crockedglass/site-footer";
import { inter, mono } from "@/components/crockedglass/fonts";
import "@/components/crockedglass/home.css";
import "@/components/illustrated/careers.css";
import { RoleList } from "@/components/illustrated/role-list";

export const metadata: Metadata = pageMetadata({
  title: "Cnvrted Careers | AI, Engineering & GTM Jobs",
  description: "Explore roles at Cnvrted in AI engineering, GTM, marketing, and the founders’ office. Review responsibilities, location, and application details.",
  path: "/careers",
});
export default function CareersPage() {
  return (
    <IllustratedShell
      faqItems={careerFAQs}
      className="design-careers-page"
      headerTone="dark"
      footer={<div className={`cg careers-cg-footer ${inter.variable} ${mono.variable}`}><CgFooter /></div>}
    >
      <PageSchema path="/careers" metadata={metadata} type="CollectionPage" items={CAREER_ROLES.map(role => ({ name: role.title, path: `/careers/${role.slug}` }))} />
      <BreadcrumbSchema trail={[{ name: "Careers" }]} />
      <CareersHero
        title="Join our team"
        description="Help us turn signals across the web into better customer conversations. Join our team across engineering, marketing, go-to-market, and operations."
      />
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
