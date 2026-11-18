import { PageSchema } from "@/components/page-schema";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { IllustratedShell } from "@/components/illustrated/shell";
import { AboutMembers } from "@/components/illustrated/about-members";
import { CgFooter } from "@/components/crockedglass/site-footer";
import { inter, mono } from "@/components/crockedglass/fonts";
import "@/components/crockedglass/home.css";
import "@/components/illustrated/careers.css";
import "@/components/illustrated/about.css";

export const metadata: Metadata = pageMetadata({
  title: "About Cnvrted AI | Founders & GTM Mission",
  description: "Meet the Bengaluru team behind Cnvrted AI. Learn why we build GTM intelligence around public buying signals, customer fit, and relevant conversations.",
  path: "/about",
});

// Figma "About Us" (Cnvrted_Design, node 7662:56068): the careers page's drifting gradient band in the frame's own
// green/pink (no hue shift) under a soft white fade, Our Story, the founding members (sticky wordmark, parallax
// cards), the site FAQ and the homepage footer. Figma's Our Story text and FAQ questions are placeholder copy, so
// the story uses Cnvrted's own words and the FAQ uses the site's questions.
export default function AboutPage() {
  return (
    <IllustratedShell
      className="design-about-page design-careers-page"
      headerTone="dark"
      footer={<div className={`cg careers-cg-footer ${inter.variable} ${mono.variable}`}><CgFooter /></div>}
    >
      <PageSchema path="/about" metadata={metadata} type="AboutPage" />
      <BreadcrumbSchema trail={[{ name: "About Us" }]} />

      <section className="about-hero" aria-labelledby="hero-title">
        <div className="about-hero-band" aria-hidden="true">
          <div className="about-hero-frame">
            <div className="careers-hero-gradient about-hero-gradient" />
            <div className="about-hero-fade">
              <Image src="/figma/about/hero-fade.svg" alt="" width={3085.79} height={807.548} unoptimized />
            </div>
          </div>
        </div>
        <div className="careers-hero-tone" data-header-tone="dark" aria-hidden="true" />
        <div className="about-hero-copy">
          <h1 id="hero-title">About Us</h1>
          <p>What began as a chat around a coffee table has turned into a seed funded company. That’s how our idea came to life from nowhere.</p>
          <div className="about-hero-actions">
            <Link href="/contact" className="about-btn-outline">Contact Us</Link>
            <Link href="#team" className="cv-cta careers-btn-solid about-btn-solid">
              Meet Team
              <Image src="/figma/careers-arrow-line.svg" width={46} height={18} alt="" />
            </Link>
          </div>
        </div>
      </section>

      <section className="about-story" aria-labelledby="story-title">
        <h2 id="story-title">Our Story</h2>
        <p>
          A job title tells you who someone is. It rarely tells you what they need today. That gap is where we started:
          Cnvrted finds the buying signals that matter, matches them to your ideal customer and puts the context in
          front of you.
        </p>
      </section>

      <AboutMembers />
    </IllustratedShell>
  );
}
