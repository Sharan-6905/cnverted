import Image from "next/image";
import { HelpSearch } from "./help-search";
import { ScaledArtwork } from "./scaled-artwork";
import "./help-center.css";

function HelpArtwork() {
  return (
    <div className="help-artwork" aria-hidden="true" data-node-id="120:2754">
      <div className="help-artwork-background">
        <Image className="help-artwork-hands" src="/figma/help-hands.png" alt="" width={3524} height={1599} sizes="3524px" loading="eager" />
        <Image className="help-artwork-fade-bottom" src="/figma/help-fade-bottom.svg" alt="" width={4064.2} height={636.2} unoptimized loading="eager" />
        <Image className="help-artwork-fade-top" src="/figma/help-fade-top.svg" alt="" width={1946.2} height={441.2} unoptimized loading="eager" />
      </div>
    </div>
  );
}

export function IllustratedHelpCenter() {
  return (
    <div className="help-center-content">
      <div className="design-hero-landscape help-artwork-frame">
        <ScaledArtwork width={1440} height={641}><HelpArtwork /></ScaledArtwork>
      </div>
      <section className="help-hero" aria-labelledby="help-title">
        <h1 id="help-title">Help Center</h1>
        <p>Look through the common questions below, or reach out directly — we read every message.</p>
      </section>
      <HelpSearch />
    </div>
  );
}
