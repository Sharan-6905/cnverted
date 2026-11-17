import type { Metadata } from "next";
import { NotFoundPageArtwork } from "@/components/illustrated/not-found-artwork";
import { IllustratedShell } from "@/components/illustrated/shell";
import { ScaledArtwork } from "@/components/illustrated/scaled-artwork";
import { DesignLink } from "@/components/illustrated/hero";
import { CgFooter } from "@/components/crockedglass/site-footer";
import { inter, mono } from "@/components/crockedglass/fonts";
import "@/components/crockedglass/home.css";
import "@/components/illustrated/careers.css";
import "./not-found.css";

export const metadata: Metadata = {
  title: "Page not found — Cnvrted",
  description: "That page could not be found.",
  robots: { index: false, follow: true },
};

/* Figma "404 page" (Cnvrted_Design 7662:56755). Header and drifting gradient band are the careers page's
   (careers.css), with this page's green image swapped in. */
export default function NotFound() {
  return (
    <IllustratedShell className="design-careers-page design-not-found-page" headerTone="dark"
      footer={<div className={`cg careers-cg-footer ${inter.variable} ${mono.variable}`}><CgFooter /></div>}
    >
      <section className="not-found-hero" aria-labelledby="not-found-title">
        <div className="careers-hero-band not-found-band" aria-hidden="true">
          <div className="careers-hero-gradient not-found-hero-gradient" />
        </div>
        <div className="careers-hero-tone" data-header-tone="dark" aria-hidden="true" />
        <div className="not-found-artwork" aria-hidden="true">
          <ScaledArtwork width={1440} height={593}>
            <NotFoundPageArtwork />
          </ScaledArtwork>
        </div>
        <div className="not-found-copy design-container">
          <h1 id="not-found-title">
            <span className="sr-only">404: Page not found. </span>Oh sheet!
          </h1>
          <p>You’ve landed on an error page...</p>
          <div className="design-hero-actions">
            <DesignLink href="/" secondary>Go Home</DesignLink>
            <DesignLink href="/contact" arrow>Contact</DesignLink>
          </div>
        </div>
      </section>
    </IllustratedShell>
  );
}
