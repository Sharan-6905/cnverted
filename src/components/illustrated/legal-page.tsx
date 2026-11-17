import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LegalToc } from "@/components/legal-toc";
import { CgFooter } from "@/components/crockedglass/site-footer";
import { inter, mono } from "@/components/crockedglass/fonts";
import { IllustratedShell } from "./shell";
import { SupportArtwork } from "./support-artwork";
import "@/components/crockedglass/home.css";
import "./careers.css";
import "./privacy.css";

export function IllustratedLegalPage({ variant, title, description, lastUpdated, intro, children }: {
  variant: "terms" | "privacy";
  title: string;
  description: string;
  lastUpdated: string;
  intro: ReactNode;
  children: ReactNode;
}) {
  // Privacy follows Figma "Privacy Policy" (Cnvrted_Design, node 7662:55794): the careers page's drifting gradient
  // band in green/pink, the homepage header edges and footer. Terms keeps the illustrated artwork until it's redone.
  const gradient = variant === "privacy";
  return (
    <IllustratedShell
      faqItems={[]}
      className={`design-legal-page ${gradient ? "design-careers-page design-privacy-page" : ""}`}
      headerTone={gradient ? "dark" : undefined}
      footer={gradient ? <div className={`cg careers-cg-footer ${inter.variable} ${mono.variable}`}><CgFooter /></div> : undefined}
    >
      <div className="legal-content">
        {gradient ? (
          <>
            <div className="careers-hero-band" aria-hidden="true">
              <div className="careers-hero-gradient privacy-hero-gradient" />
            </div>
            <div className="careers-hero-tone" data-header-tone="dark" aria-hidden="true" />
          </>
        ) : (
          <SupportArtwork variant={variant} />
        )}
        <header className="legal-heading design-container">
          <Link href="/" className="legal-back" aria-label="Back to home"><ArrowLeft size={28} strokeWidth={1.25} /></Link>
          <h1>{title}</h1>
          <p className="legal-updated">Last updated: {lastUpdated}. {description}</p>
          <div className="legal-intro">{intro}</div>
        </header>
        <div className="legal-layout design-container">
          <article className="legal-prose">{children}</article>
          <LegalToc />
        </div>
      </div>
    </IllustratedShell>
  );
}
