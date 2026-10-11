import type { Metadata } from "next";
import { NotFoundPageArtwork } from "@/components/illustrated/redesign-page-artwork";
import { IllustratedShell } from "@/components/illustrated/shell";
import { ScaledArtwork } from "@/components/illustrated/scaled-artwork";
import { DesignLink } from "@/components/illustrated/hero";
import "./not-found.css";

export const metadata: Metadata = {
  title: "Page not found — Cnvrted",
  description: "That page could not be found.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <IllustratedShell className="design-not-found-page">
      <section className="not-found-hero" aria-labelledby="not-found-title">
        <div className="not-found-artwork" aria-hidden="true">
          <ScaledArtwork width={1440} height={641}>
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
