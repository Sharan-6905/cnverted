import { pageMetadata, absoluteUrl, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
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
    modifiedTime: story.updated,
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
        ...(story.updated ? { dateModified: story.updated } : {}),
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
            <p className="marketing-eyebrow">{story.results ? "Customer story · Email outreach" : "Inside Cnvrted"}</p>
            <h1 id="article-title" style={{ maxWidth: 704 }}>{story.title}</h1>
            <p className="design-article-dek">{story.description}</p>
            <div className="design-article-tags">
              <Link href="/about">By Cnvrted</Link>
              <span>Published <time dateTime={story.date}>{formatPostDate(story.date)}</time></span>
              {story.updated && <span>Updated <time dateTime={story.updated}>{formatPostDate(story.updated)}</time></span>}
              <span>{story.readTime} min read</span>
            </div>
          </header>
          <div className="design-article-content">
            {story.results && <CaseStudyResults results={story.results} />}
            <img className="case-study-cover" src={story.cover.src} alt={story.cover.alt} width={1774} height={887} />
            <div className="case-study-reading-grid">
              <nav className="case-study-contents" aria-label="In this case study">
                <p>In this story</p>
                <ol>
                  {story.sections.map((section, index) => (
                    <li key={section.heading}><a href={`#case-section-${index + 1}`}>{section.heading}</a></li>
                  ))}
                  {story.comparison && <li><a href="#case-study-numbers">Results at a glance</a></li>}
                  {story.measurementNotes && <li><a href="#case-measurement-notes">How to read these results</a></li>}
                </ol>
                <Link className="case-study-demo-link" href="/#strategy-title">Explore the product demo <span aria-hidden="true">↗</span></Link>
              </nav>
              <div className="design-article-prose">
                {story.overview && (
                  <section className="case-study-at-a-glance" aria-labelledby="case-overview-title">
                    <h2 id="case-overview-title">The story at a glance</h2>
                    <dl>{story.overview.map(({ label, value }) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
                  </section>
                )}
                {story.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                {story.sections.map((section, index) => (
                  <section key={section.heading} aria-labelledby={`case-section-${index + 1}`}>
                    <h2 id={`case-section-${index + 1}`}>{section.heading}</h2>
                    {section.paragraph ? <p>{section.paragraph}</p> : null}
                    {section.items ? <ul className="design-article-bullets">{section.items.map((item) => <li key={item}>{item}</li>)}</ul> : null}
                    {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </section>
                ))}
                {story.comparison ? (
                  <section aria-labelledby="case-study-numbers">
                    <h2 id="case-study-numbers">{story.comparison.heading}</h2>
                    <table className="case-study-table case-study-comparison">
                      <caption className="sr-only">The previous daily routine compared with one targeted outreach batch</caption>
                      <thead><tr><th scope="col">Measure</th><th scope="col">Previous routine</th><th scope="col">Targeted batch</th></tr></thead>
                      <tbody>{story.comparison.rows.map(({ metric, before, after }) => (
                        <tr key={metric}><th scope="row">{metric}</th><td>{before}</td><td>{after}</td></tr>
                      ))}</tbody>
                    </table>
                    <p className="case-study-method-note">{story.comparison.note}</p>
                  </section>
                ) : null}
                {story.measurementNotes && (
                  <section className="case-study-measurement" aria-labelledby="case-measurement-notes">
                    <h2 id="case-measurement-notes">How to read these results</h2>
                    <p>{story.measurementNotes.introduction}</p>
                    <dl>{story.measurementNotes.metrics.map(({ label, definition }) => (
                      <div key={label}><dt>{label}</dt><dd>{definition}</dd></div>
                    ))}</dl>
                    <p className="case-study-reporting-note">{story.measurementNotes.limitations}</p>
                  </section>
                )}
                <aside className="case-study-next" aria-labelledby="case-next-title">
                  <span className="marketing-eyebrow">Put it into practice</span>
                  <h2 id="case-next-title">Give each signal a next step.</h2>
                  <p>Follow a sample business from ICP to buying signal to outreach, then explore how the workflow fits together in Cnvrted.</p>
                  <div className="case-study-next-links">
                    <Link href="/learn/signal-to-outreach">Try the interactive example <span aria-hidden="true">↗</span></Link>
                    <Link href="/product">Explore the product <span aria-hidden="true">↗</span></Link>
                    <Link href="/blogs/what-is-a-gtm-play">Read the GTM play guide <span aria-hidden="true">↗</span></Link>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </article>
      </div>
    </IllustratedShell>
  );
}
