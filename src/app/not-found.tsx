import type { Metadata } from "next";
import Image from "next/image";
import { IllustratedShell } from "@/components/illustrated/shell";
import { ScaledArtwork } from "@/components/illustrated/scaled-artwork";
import { DesignLink } from "@/components/illustrated/hero";
import { NotFoundSpotlight } from "@/components/illustrated/not-found-spotlight";
import "./not-found.css";

export const metadata: Metadata = {
  title: "Page not found — Cnvrted",
  description: "That page could not be found.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <IllustratedShell className="design-not-found-page">
      <NotFoundSpotlight>
        <div className="not-found-artwork" aria-hidden="true">
          <ScaledArtwork width={1440} height={641}>
            <Image
              className="not-found-landscape"
              src="/figma/not-found/landscape.png"
              alt=""
              width={3548}
              height={1774}
              sizes="(max-width: 767px) 900px, (max-width: 1023px) 1024px, 103vw"
              quality={95}
              priority
            />
            <Image
              className="not-found-fade-top"
              src="/figma/not-found/fade-top.svg"
              alt=""
              width={3709.81}
              height={689.137}
              unoptimized
              loading="eager"
            />
            <Image
              className="not-found-fade-bottom"
              src="/figma/not-found/fade-bottom.svg"
              alt=""
              width={3142}
              height={622.891}
              unoptimized
              loading="eager"
            />
          </ScaledArtwork>
        </div>
        <div className="not-found-copy design-container">
          <h1 id="not-found-title">
            <span className="sr-only">404: Page not found. </span>Oh sheet!
          </h1>
          <p>You’ve landed on an error page...</p>
          <DesignLink href="/" arrow>
            Go Home
          </DesignLink>
        </div>
      </NotFoundSpotlight>
    </IllustratedShell>
  );
}
