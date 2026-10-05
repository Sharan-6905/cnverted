import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { IllustratedShell } from "@/components/illustrated/shell";
import { ClosingCTA } from "@/components/illustrated/closing-cta";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { ProductExampleLink } from "@/components/illustrated/product-example-link";

export const metadata: Metadata = pageMetadata({
  title: "Learn — Buying Signals & GTM Playbooks | Cnvrted",
  description: "Learn how to build a GTM play, understand buying signals, and choose the right prospecting approach for your team.",
  path: "/learn",
});

export default function LearnPage() {
  const guides = [...BLOG_POSTS].sort(
    (a, b) =>
      Number(b.slug === "what-is-a-gtm-play") -
      Number(a.slug === "what-is-a-gtm-play"),
  );
  return (
    <IllustratedShell
      className="design-library-page"
      faqItems={[]}
      closingCTA={<ClosingCTA />}
    >
      <BreadcrumbSchema trail={[{ name: "Learn" }]} />
      <header className="marketing-page-heading design-container">
        <span className="marketing-eyebrow">The field notes</span>
        <h1>
          Better context.
          <br />
          Better conversations.
        </h1>
        <p>
          Practical reading on buying signals, prospecting, and planning your
          next GTM play.
        </p>
      </header>
      <aside className="resource-help design-container">
        <div>
          <span className="marketing-eyebrow">Start here</span>
          <h2>What makes a buying signal useful?</h2>
          <p>Four examples, a five-step qualification checklist, and a worked outreach example.</p>
        </div>
        <Link className="marketing-text-link" href="/learn/buying-signals">
          Read the field guide <span aria-hidden="true">↗</span>
        </Link>
      </aside>
      <ProductExampleLink />
      <div className="resource-grid design-container">
        {guides.map((post) => (
          <article className="resource-card" key={post.slug}>
            <Link
              className="resource-cover"
              href={`/blogs/${post.slug}`}
              tabIndex={-1}
              aria-hidden="true"
            >
              <Image
                src={post.cover}
                alt=""
                width={1200}
                height={600}
                sizes="(max-width: 767px) 100vw, 580px"
              />
            </Link>
            <div className="resource-card-copy">
              <span className="marketing-eyebrow">{post.category}</span>
              <h2>
                <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
              </h2>
              <p>{post.dek}</p>
              <div className="resource-meta">
                <span>By {post.author.name}</span>
                <span>{post.readingMinutes} min read</span>
              </div>
              <Link
                className="marketing-text-link"
                href={`/blogs/${post.slug}`}
              >
                Read the guide <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
      <aside className="resource-help design-container">
        <div>
          <h2>Looking for product help?</h2>
          <p>Find answers about your account, credits, and getting started.</p>
        </div>
        <Link className="marketing-text-link" href="/help-center">
          Visit the Help Center <span aria-hidden="true">↗</span>
        </Link>
      </aside>
    </IllustratedShell>
  );
}
