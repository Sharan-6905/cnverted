import Image from "next/image";
import { ScaledArtwork } from "./scaled-artwork";
import { redesignAssets as art } from "./redesign-assets";
import { FooterWater } from "./footer-water";

export function RedesignHeroArtwork() {
  return <div className="redesign-hero-art" aria-hidden="true">
    <ScaledArtwork width={1440} height={760}>
      <div className="redesign-hero-picture">
        <Image src="/figma/redesign/hero-bridge-enhanced.webp" alt="" fill preload quality={95} sizes="(max-width: 767px) 1462px, (max-width: 1100px) 1892px, (min-width: 1680px) 2890px, 172vw" />
      </div>
      <div className="redesign-hero-bottom-fade"><img {...art["499-637-imgEllipse4060"]} src="/figma/redesign/hero-bridge-bottom-fade.svg" alt="" /></div>
      <div className="redesign-hero-top-fade"><img {...art["499-637-imgEllipse4062"]} src="/figma/redesign/hero-bridge-top-fade.svg" alt="" /></div>
      <Image className="redesign-bird-left" {...art["499-2110-imgImage95"]} alt="" sizes="(max-width: 767px) 150px, 319px" />
    </ScaledArtwork>
  </div>;
}

export function RedesignFooterArtwork() {
  return <FooterWater />;
}
