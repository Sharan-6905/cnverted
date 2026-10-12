import Image from "next/image";
import { redesignAssets as art } from "./redesign-assets";
import { FooterWater } from "./footer-water";

const heroSizes = "(max-width: 680px) 1169px, (min-width: 1600px) 2889px, 172vw";
const heroSources = (format: string) => [1280, 2003, 4006]
  .map((width) => `/figma/redesign/hero-bridge-exact-${width}.${format} ${width}w`).join(", ");

export function RedesignHeroArtwork() {
  return <div className="redesign-hero-art" aria-hidden="true">
    <link rel="preload" as="image" imageSrcSet={heroSources("avif")} imageSizes={heroSizes} type="image/avif" fetchPriority="high" />
    <div className="redesign-hero-frame">
      <div className="redesign-hero-picture">
        <picture>
          <source srcSet={heroSources("avif")} sizes={heroSizes} type="image/avif" />
          <img src="/figma/redesign/hero-bridge-exact-2003.webp" srcSet={heroSources("webp")} sizes={heroSizes} alt="" width={4006} height={1570} fetchPriority="high" decoding="async" />
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
