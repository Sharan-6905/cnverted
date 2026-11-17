import { PageSchema } from "@/components/page-schema";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { IllustratedShell } from "@/components/illustrated/shell";
import { CareersHero } from "@/components/illustrated/careers-hero";
import { CgFooter } from "@/components/crockedglass/site-footer";
import { inter, mono } from "@/components/crockedglass/fonts";
import { CASE_STUDIES } from "@/lib/case-studies";
import { formatPostDate } from "@/lib/blog-posts";
import "@/components/crockedglass/home.css";
import "@/components/illustrated/careers.css";
import "@/components/illustrated/case-studies.css";

export const metadata: Metadata = pageMetadata({
  title: "GTM Case Studies | Signal-Led Outreach Results | Cnvrted",
  description: "Explore Cnvrted GTM case studies: a targeted email campaign and our own customer acquisition workflow. Read the results, methods, and measurement limits.",
  path: "/case-studies",
});

// Figma "Case Studies" (Cnvrted_Design, node 7686:40982): the careers hero with a blue/orange gradient, then the
// stories as glass cards. Covers stay the stories' own images.
export default function CaseStudiesPage() {
  return (
    <IllustratedShell
      className="design-careers-page design-case-studies-page"
      faqItems={[]}
      headerTone="dark"
      footer={<div className={`cg careers-cg-footer ${inter.variable} ${mono.variable}`}><CgFooter /></div>}
    >
      <PageSchema path="/case-studies" metadata={metadata} type="CollectionPage" items={CASE_STUDIES.map(story => ({ name: story.title, path: `/case-studies/${story.slug}` }))} />
      <BreadcrumbSchema trail={[{ name: "Case Studies" }]} />
      <CareersHero
        title="Our Case Studies"
        description="The signal, the conversation, and what happened next: how teams use Cnvrted to find buyers and start better conversations."
        gradientClassName="case-studies-hero-gradient"
        actions={(
          <>
            <Link href="/contact" className="careers-btn-outline">Contact</Link>
            <Link href="#stories" className="cv-cta careers-btn-solid">
              Read the stories
              <Image src="/figma/careers-arrow-line.svg" width={46} height={18} alt="" />
            </Link>
          </>
        )}
      />
      <section id="stories" className="cs-stories" aria-labelledby="stories-title">
        <div className="cs-stories-heading">
          <h2 id="stories-title">Case Studies</h2>
          <p>How real businesses found buyers with Cnvrted.</p>
        </div>
        <div className="cs-grid">
          {CASE_STUDIES.map(story => (
            <Link className="cs-card" href={`/case-studies/${story.slug}`} key={story.slug}>
              <div className="cs-card-cover">
                <Image src={story.cover.src} alt="" width={1774} height={887} sizes="(max-width: 767px) 100vw, 400px" />
              </div>
              <h3>{story.title}</h3>
              <p>{story.description}</p>
              <div className="cs-card-meta">
                <time dateTime={story.date}>{formatPostDate(story.date)}</time>
                <span>
                  <Image src="/figma/case-studies-clock.svg" width={12} height={12} alt="" />
                  {story.readTime} min
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </IllustratedShell>
  );
}
