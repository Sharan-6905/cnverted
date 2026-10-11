import Image from "next/image";
import { redesignAssets as art } from "./redesign-assets";
import { FooterWater } from "./footer-water";

export function RedesignHeroArtwork() {
  return <div className="redesign-hero-art" aria-hidden="true">
    <link rel="preload" as="image" href="/figma/redesign/hero-bridge-enhanced.avif" type="image/avif" fetchPriority="high" />
    <div className="redesign-hero-frame">
      <div className="redesign-hero-picture">
        <picture>
          <source srcSet="/figma/redesign/hero-bridge-enhanced.avif" type="image/avif" />
          <img src="/figma/redesign/hero-bridge-enhanced.webp" alt="" width={2003} height={785} fetchPriority="high" decoding="async" />
        </picture>
      </div>
      <div className="redesign-hero-bottom-fade"><img {...art["499-637-imgEllipse4060"]} src="/figma/redesign/hero-bridge-bottom-fade.svg" alt="" /></div>
      <div className="redesign-hero-top-fade"><img {...art["499-637-imgEllipse4062"]} src="/figma/redesign/hero-bridge-top-fade.svg" alt="" /></div>
      <Image className="redesign-bird-left" {...art["499-2110-imgImage95"]} alt="" sizes="(max-width: 767px) 150px, 319px" />
    </div>
  </div>;
}

export function RedesignFooterArtwork() {
  return <FooterWater />;
}
