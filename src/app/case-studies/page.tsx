import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { IllustratedShell } from "@/components/illustrated/shell";
import { ClosingCTA } from "@/components/illustrated/closing-cta";
import { CASE_STUDIES } from "@/lib/case-studies";
import { formatPostDate } from "@/lib/blog-posts";
import { CaseStudyResults } from "@/components/illustrated/case-study-results";

export const metadata: Metadata = {
  title: "Case Studies — Cnvrted",
  description:
    "See how a founder turned 11 targeted emails into six replies, and how Cnvrted uses buying signals to find its own customers.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <IllustratedShell
      className="design-library-page"
      faqItems={[]}
      closingCTA={<ClosingCTA />}
    >
      <BreadcrumbSchema trail={[{ name: "Case Studies" }]} />
      <header className="marketing-page-heading design-container">
        <span className="marketing-eyebrow">In practice</span>
        <h1>Case Studies</h1>
        <p>The signal, the conversation, and what happened next.</p>
      </header>
      <div className="resource-grid design-container">
        {CASE_STUDIES.map((story, index) => (
          <article className="resource-card" key={story.slug}>
            <Link
              className="resource-cover"
              href={`/case-studies/${story.slug}`}
              tabIndex={-1}
              aria-hidden="true"
            >
              <Image
                src={story.cover.src}
                alt=""
                width={1774}
                height={887}
                sizes="(max-width: 767px) 100vw, 580px"
              />
            </Link>
            <div className="resource-card-copy">
              <span className="marketing-eyebrow">
                {index === 0 ? "Customer story" : "Inside Cnvrted"}
              </span>
              <h2>
                <Link href={`/case-studies/${story.slug}`}>{story.title}</Link>
              </h2>
              <p>{story.description}</p>
              {story.results && (
                <CaseStudyResults results={story.results} compact />
              )}
              <div className="resource-meta">
                <time dateTime={story.date}>{formatPostDate(story.date)}</time>
                <span>{story.readTime} min read</span>
              </div>
              <Link
                className="marketing-text-link"
                href={`/case-studies/${story.slug}`}
              >
                Read the story <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </IllustratedShell>
  );
}
