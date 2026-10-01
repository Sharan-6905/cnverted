import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CASE_STUDIES } from "@/lib/case-studies";
import { IllustratedShell } from "@/components/illustrated/shell";
import { SupportArtwork } from "@/components/illustrated/support-artwork";
import "@/components/illustrated/article.css";
import "@/components/illustrated/customer-stories.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CASE_STUDIES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = CASE_STUDIES.find((item) => item.slug === slug);
  if (!story) return {};
  return {
    title: `${story.title} — Cnvrted`,
    description: story.description,
    alternates: { canonical: `/case-studies/${story.slug}` },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const story = CASE_STUDIES.find((item) => item.slug === slug);
  if (!story) notFound();

  return (
    <IllustratedShell className="design-article-page">
      <div className="design-article-scene">
        <SupportArtwork variant="case-study" />
        <article className="design-article design-container" aria-labelledby="article-title">
          <header className="design-article-heading">
            <a className="design-article-back" href="/#side-story-title" aria-label="Back to Cnvrted side stories">
              <img src="/figma/blogs/back-arrow.svg" width={32} height={32} alt="" />
            </a>
            <h1 id="article-title" style={{ maxWidth: 704 }}>{story.title}</h1>
            <p className="design-article-dek">{story.description}</p>
            <div className="design-article-tags"><span>{story.readTime} min read</span></div>
          </header>
          <div className="design-article-content">
            <img className="case-study-cover" src={story.cover.src} alt={story.cover.alt} width={1774} height={887} />
            <div className="design-article-prose">
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
