import type { ReactNode } from "react";
import Link from "next/link";
import { DEMO_PATH } from "@/lib/booking";
import Image from "next/image";
import { BlogLandscape, AboutLandscape, CareerLandscape } from "./artwork";
import { ScaledArtwork } from "./scaled-artwork";
import { assets } from "./assets";
import { HomeHeroVideo } from "./home-hero-video";

export function DesignLink({
  children,
  href,
  secondary = false,
  arrow = false,
  className = "",
}: {
  children: ReactNode;
  href: string;
  secondary?: boolean;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`design-button ${secondary ? "design-button-outline" : "design-button-solid"} ${className}`}
    >
      {children}
      {arrow && (
        <Image src={assets.home.imgArrow1} width={47} height={18} alt="" />
      )}
    </Link>
  );
}

const landscapes = {
  blogs: BlogLandscape,
  about: AboutLandscape,
  careers: CareerLandscape,
  role: CareerLandscape,
};
export function IllustratedHero({
  kind,
  title,
  description,
  children,
}: {
  kind: "home" | keyof typeof landscapes;
  title: ReactNode;
  description: string;
  children?: ReactNode;
}) {
  const Landscape = kind === "home" ? null : landscapes[kind];
  return (
    <section
      className={`design-hero design-hero-${kind}`}
      aria-labelledby="hero-title"
    >
      {Landscape ? (
        <div className="design-hero-landscape">
          <ScaledArtwork width={1440} height={641}>
            <Landscape />
          </ScaledArtwork>
        </div>
      ) : (
        <HomeHeroVideo />
      )}
      <div className="design-hero-content">
        <h1 id="hero-title">{title}</h1>
        <p>{description}</p>
        <div className="design-hero-actions">
          {children ?? (
            <>
              <DesignLink href="https://beta.cnvrted.com" secondary>
                Start free
              </DesignLink>
              <DesignLink href={DEMO_PATH} arrow>
                Book a demo
              </DesignLink>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
