import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LegalToc } from "@/components/legal-toc";
import { IllustratedShell } from "./shell";
import { SupportArtwork } from "./support-artwork";

export function IllustratedLegalPage({ variant, title, description, lastUpdated, intro, children }: {
  variant: "terms" | "privacy";
  title: string;
  description: string;
  lastUpdated: string;
  intro: ReactNode;
  children: ReactNode;
}) {
  return (
    <IllustratedShell faqItems={[]} className="design-legal-page">
      <div className="legal-content">
        <SupportArtwork variant={variant} />
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
