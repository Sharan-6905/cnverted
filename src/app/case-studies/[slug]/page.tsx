import { pageMetadata, absoluteUrl, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CASE_STUDIES } from "@/lib/case-studies";
import { IllustratedShell } from "@/components/illustrated/shell";
import { SupportArtwork } from "@/components/illustrated/support-artwork";
import { CaseStudyResults } from "@/components/illustrated/case-study-results";
import { ClosingCTA } from "@/components/illustrated/closing-cta";
import { formatPostDate } from "@/lib/blog-posts";
import "@/components/illustrated/article.css";
import "@/components/illustrated/customer-stories.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CASE_STUDIES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = CASE_STUDIES.find((item) => item.slug === slug);
  if (!story) notFound();
  return pageMetadata({
    title: `${story.title} — Cnvrted`,
    description: story.description,
    path: `/case-studies/${story.slug}`,
    image: story.cover.src,
    imageAlt: story.cover.alt,
    publishedTime: story.date,
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const story = CASE_STUDIES.find((item) => item.slug === slug);
  if (!story) notFound();

  return (
    <IllustratedShell faqItems={[]} className="design-article-page" closingCTA={<ClosingCTA />}>
      <BreadcrumbSchema trail={[{ name: "Case Studies", path: "/case-studies" }, { name: story.title }]} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": absoluteUrl(`/case-studies/${story.slug}#article`),
        headline: story.title,
        description: story.description,
        image: absoluteUrl(story.cover.src),
        datePublished: story.date,
        inLanguage: "en",
        author: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Cnvrted", url: SITE_URL },
        publisher: { "@id": `${SITE_URL}/#organization` },
        mainEntityOfPage: absoluteUrl(`/case-studies/${story.slug}`),
      }} />
      <div className="design-article-scene">
        <SupportArtwork variant="case-study" />
        <article className="design-article design-container" aria-labelledby="article-title">
          <header className="design-article-heading">
            <a className="design-article-back" href="/case-studies" aria-label="Back to Case Studies">
              <img src="/figma/blogs/back-arrow.svg" width={32} height={32} alt="" />
            </a>
            <h1 id="article-title" style={{ maxWidth: 704 }}>{story.title}</h1>
            <p className="design-article-dek">{story.description}</p>
            <div className="design-article-tags"><time dateTime={story.date}>{formatPostDate(story.date)}</time><span>{story.readTime} min read</span></div>
          </header>
          <div className="design-article-content">
            {story.results && <CaseStudyResults results={story.results} />}
            <img className="case-study-cover" src={story.cover.src} alt={story.cover.alt} width={1774} height={887} />
            <div className="design-article-prose">
              {story.results && <section className="case-study-at-a-glance" aria-labelledby="case-overview-title"><h2 id="case-overview-title">The story at a glance</h2><dl><div><dt>The challenge</dt><dd>Three hours of daily prospecting and 200 emails were producing only a handful of replies.</dd></div><div><dt>The change</dt><dd>Match the founder’s ICP to recent public buying signals, then write an individual email with the source and context in mind.</dd></div><div><dt>The outcome</dt><dd>Six replies from 11 emails, three demos that week, and one deal closed within the month.</dd></div></dl></section>}
              {story.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              {story.comparison ? (
                <section aria-labelledby="case-study-numbers">
                  <h2 id="case-study-numbers">{story.comparison.heading}</h2>
                  <table className="case-study-table">
                    <caption className="sr-only">Results before and after using Cnvrted</caption>
                    <thead><tr><th scope="col">Before Cnvrted</th><th scope="col">With Cnvrted</th></tr></thead>
                    <tbody>{story.comparison.before.map((before, index) => (
                      <tr key={before}><td>{before}</td><td>{story.comparison!.after[index]}</td></tr>
                    ))}</tbody>
                  </table>
                </section>
              ) : null}
              {story.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraph ? <p>{section.paragraph}</p> : null}
                  {section.items ? <ul className="design-article-bullets">{section.items.map((item) => <li key={item}>{item}</li>)}</ul> : null}
                </section>
              ))}
            </div>
          </div>
        </article>
      </div>
    </IllustratedShell>
  );
}
