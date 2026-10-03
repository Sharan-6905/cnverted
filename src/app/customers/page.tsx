import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { IllustratedShell } from "@/components/illustrated/shell";
import { ClosingCTA } from "@/components/illustrated/closing-cta";
import { CaseStudyResults } from "@/components/illustrated/case-study-results";
import { CUSTOMERS } from "@/lib/customers";
import { CASE_STUDIES } from "@/lib/case-studies";
import "./customers.css";

export const metadata: Metadata = pageMetadata({
  title: "Our Customers — Cnvrted",
  description: "Meet the teams using Cnvrted, from creative studios to technology companies. Explore our customer community and read practical case studies.",
  path: "/customers",
});

export default function CustomersPage() {
  const customerStory = CASE_STUDIES.find(
    (story) => story.slug === "from-cold-emails-to-warm-conversations",
  )!;
  const insideStory = CASE_STUDIES.find(
    (story) => story.slug === "how-cnvrted-finds-its-customers",
  )!;

  return (
    <IllustratedShell
      className="design-customers-page"
      faqItems={[]}
      closingCTA={<ClosingCTA />}
    >
      <BreadcrumbSchema trail={[{ name: "Our Customers" }]} />
      <header className="customers-hero design-container">
        <span className="marketing-eyebrow">Our customers</span>
        <div className="customers-hero-row">
          <h1>
            Good companies.
            <br />
            <em>Better conversations.</em>
          </h1>
          <div className="customers-hero-intro">
            <p>
              Meet the teams choosing a more thoughtful way to find their next
              customers.
            </p>
            <Link
              className="marketing-text-link"
              href="#customer-directory-title"
            >
              Meet our customers <ArrowDown size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </header>

      <section
        className="customer-directory design-container"
        aria-labelledby="customer-directory-title"
      >
        <div className="customer-directory-heading">
          <h2 id="customer-directory-title">The companies behind the logos</h2>
          <span>
            {CUSTOMERS.length.toString().padStart(2, "0")} teams. Different
            ambitions.
          </span>
        </div>
        <ul className="customer-grid">
          {CUSTOMERS.map((customer) => (
            <li className="customer-card" key={customer.name}>
              <div className="customer-logo-space">
                <Image
                  src={`/figma/side-story/${customer.file}`}
                  alt=""
                  width={customer.width}
                  height={customer.height}
                  className={
                    customer.width / customer.height > 1.7
                      ? "customer-logo-wide"
                      : undefined
                  }
                  sizes="200px"
                />
              </div>
              <div className="customer-card-copy">
                {customer.category && (
                  <span className="customer-category">{customer.category}</span>
                )}
                <h3>{customer.name}</h3>
                {customer.description && <p>{customer.description}</p>}
                {customer.website && (
                  <a
                    href={customer.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="customer-website"
                    aria-label={`Explore ${customer.name} (opens in a new tab)`}
                  >
                    Explore {customer.name}{" "}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="customer-stories-section design-container"
        aria-labelledby="customer-stories-heading"
      >
        <div className="customer-stories-heading">
          <div>
            <span className="marketing-eyebrow">
              From signal to conversation
            </span>
            <h2 id="customer-stories-heading">A closer look at the work.</h2>
          </div>
          <Link className="marketing-text-link" href="/case-studies">
            All case studies <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <article className="customer-featured-story">
          <div className="customer-story-art">
            <Image
              src={customerStory.cover.src}
              alt={customerStory.cover.alt}
              width={1774}
              height={887}
              sizes="(max-width: 767px) 100vw, 600px"
            />
            <span className="customer-story-caption">
              One founder. A different approach to outreach.
            </span>
          </div>
          <div className="customer-story-copy">
            <span className="marketing-eyebrow">
              Customer story · {customerStory.readTime} min read
            </span>
            <h3>
              <Link href={`/case-studies/${customerStory.slug}`}>
                {customerStory.title}
              </Link>
            </h3>
            <p>{customerStory.excerpt}</p>
            {customerStory.results && (
              <CaseStudyResults results={customerStory.results} compact />
            )}
            <Link
              className="marketing-text-link"
              href={`/case-studies/${customerStory.slug}`}
            >
              Read the story <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </article>
        <article className="customer-inside-story">
          <span className="marketing-eyebrow">Inside Cnvrted</span>
          <div>
            <h3>{insideStory.title}</h3>
            <p>
              The same signals, research, and outreach workflow we use
              ourselves.
            </p>
          </div>
          <Link
            className="marketing-text-link"
            href={`/case-studies/${insideStory.slug}`}
          >
            See our approach <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </article>
      </section>
    </IllustratedShell>
  );
}
