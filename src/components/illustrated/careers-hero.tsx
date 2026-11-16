import Link from "next/link";
import Image from "next/image";

/** Careers hero, Figma "Careers" (Cnvrted_Design, node 7662:56946): a dark-to-red gradient band that fades to
 *  white behind left-aligned copy. The band drifts slowly (careers.css); reduced motion keeps it still. */
export function CareersHero({ title, description }: { title: string; description: string }) {
  return (
    <section className="careers-hero" aria-labelledby="hero-title">
      <div className="careers-hero-band" aria-hidden="true">
        <div className="careers-hero-gradient" />
      </div>
      <div className="careers-hero-tone" data-header-tone="dark" aria-hidden="true" />
      <div className="careers-hero-copy">
        <h1 id="hero-title">{title}</h1>
        <p>{description}</p>
        <div className="careers-hero-actions">
          <Link href="/contact" className="careers-btn-outline">Contact</Link>
          <Link href="#open-roles" className="cv-cta careers-btn-solid">
            Open Roles
            <Image src="/figma/careers-arrow-line.svg" width={46} height={18} alt="" />
          </Link>
        </div>
      </div>
    </section>
  );
}
