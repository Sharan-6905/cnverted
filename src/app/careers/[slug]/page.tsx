import { careerFAQs } from "@/components/illustrated/faq";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CAREER_ROLES } from "@/lib/careers";
import { CAREER_DETAILS } from "@/lib/career-details";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { CareerApplicationForm } from "@/components/career-application-form";
import { IllustratedShell } from "@/components/illustrated/shell";
import { IllustratedHero, DesignLink } from "@/components/illustrated/hero";
import { RoleTags } from "@/components/illustrated/role-list";

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const role = CAREER_ROLES.find((role) => role.slug === slug);
  return {
    title: role
      ? `${role.title} — Careers at Cnvrted`
      : "Role not found — Cnvrted",
    description: role?.description,
    alternates: { canonical: `/careers/${slug}` },
  };
}
export default async function CareerDetailPage({ params }: Props) {
  const { slug } = await params;
  const role = CAREER_ROLES.find((role) => role.slug === slug);
  if (!role) notFound();
  const details = CAREER_DETAILS[role.slug];
  return (
    <IllustratedShell faqItems={careerFAQs} className="design-role-page">
      <BreadcrumbSchema
        trail={[{ name: "Careers", path: "/careers" }, { name: role.title }]}
      />
      <IllustratedHero
        kind="role"
        title={role.title}
        description={role.description}
      >
        <RoleTags role={role} />
        <span className="design-role-status">Open</span>
      </IllustratedHero>
      <div className="design-role-content">
        <div className="design-role-body">
          <section className="design-job-section">
            <h2>Learn more about us.</h2>
            <p>
              Cnvrted helps B2B revenue teams find companies with real buying
              intent. We bring together signals from social platforms,
              communities, and company websites, then use AI to evaluate ICP
              fit, intent, and timing. The goal is to help teams understand what
              changed, why it matters, and when to start a conversation.
            </p>
            <p>
              We’re a small team from Bangalore, building in public, shipping
              fast, and talking to salespeople, founders, and GTM teams. Our
              question is simple: why buy another list of names when what you
              need is timing?
            </p>
          </section>
          <section className="design-job-section">
            <h2 id="role-overview">About the {role.title} role.</h2>
            <p>{details.overview}</p>
          </section>
          <section className="design-job-section">
            <h2>How you will spend your time.</h2>
            <div className="design-job-columns">
              {details.focusAreas.map((area) => (
                <div key={area.title}>
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="design-job-section">
            <h2>Your responsibilities.</h2>
            <ul>
              {details.responsibilities.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
          </section>
          <section className="design-job-section">
            <h2>What we seek in a candidate.</h2>
            <ul>
              {details.requirements.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
          </section>
        </div>
        <aside className="design-apply-card" aria-label="Apply for this role">
          <h2>Apply for this role</h2>
          <p>Work from the front seat, with real ownership.</p>
          <DesignLink href="#apply" arrow>
            Apply now
          </DesignLink>
          <dl>
            {[
              ["Location", role.location],
              ["Employment", role.type],
              ...(role.experience ? [["Experience", role.experience]] : []),
              ["Department", role.category],
              ["Works with", "The founders"],
              ["Status", "Open"],
            ].map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <small>
            Have a question?{" "}
            <a href="mailto:info@cnvrted.com">info@cnvrted.com</a>
          </small>
        </aside>
      </div>
      <section
        className="design-application"
        id="apply"
        aria-labelledby="apply-title"
      >
        <h2 id="apply-title">Apply for {role.title}</h2>
        <CareerApplicationForm
          key={role.slug}
          initialRole={role.title}
          defaultOpen
        />
      </section>
    </IllustratedShell>
  );
}
