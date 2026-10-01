import type { Metadata } from "next";
import { BOOKING_URL } from "@/lib/booking";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { IllustratedShell } from "@/components/illustrated/shell";
import { IllustratedHero, DesignLink } from "@/components/illustrated/hero";
import { MapArtwork } from "@/components/illustrated/artwork";
import { ScaledArtwork } from "@/components/illustrated/scaled-artwork";
import { FoundingTeam } from "@/components/illustrated/contact";

export const metadata: Metadata = {
  title: "About Us — Cnvrted",
  description:
    "Meet the founding team building Cnvrted in Bengaluru, and learn why we believe better outbound starts with timing.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <IllustratedShell className="design-about-page" faqItems={[]}>
      <BreadcrumbSchema trail={[{ name: "About Us" }]} />
      <IllustratedHero
        kind="about"
        title="About Us"
        description="What began around a coffee table became Cnvrted. Built in Bengaluru, around one question: how do you find buyers at the right moment?"
      >
        <DesignLink href={BOOKING_URL} secondary>
          Book a demo
        </DesignLink>
        <DesignLink href="/contact" arrow>
          Meet the team
        </DesignLink>
      </IllustratedHero>
      <section
        className="about-origin design-container"
        aria-labelledby="story-title"
      >
        <div>
          <span className="marketing-eyebrow">Why we’re building</span>
          <h2 id="story-title">
            A name is a start.
            <br />
            Timing makes it matter.
          </h2>
        </div>
        <div>
          <p>
            Sales teams told us the same thing: finding names wasn’t the hard
            part. Knowing who had a reason to talk, and when to reach out, was.
          </p>
          <p>
            We’re building Cnvrted to connect those dots. We look for buying
            signals, match them to your ideal customer, and bring the context
            into your next conversation.
          </p>
          <p>
            We use it for our own outreach, too. What we learn from those
            conversations shapes what we build next.
          </p>
          <a
            className="marketing-text-link"
            href="/case-studies/how-cnvrted-finds-its-customers"
          >
            See how we use Cnvrted <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
      <FoundingTeam />
      <section className="design-map" aria-labelledby="location-title">
        <div className="design-section-heading">
          <h2 id="location-title">Where to find us</h2>
          <p>
            From late nights in Indiranagar to early mornings in Kammanahalli,
            this is where Cnvrted was born.
          </p>
        </div>
        <ScaledArtwork
          width={1440}
          height={796}
          label="An illustrated map of Bengaluru, with a magnifying glass over Indiranagar and Kammanahalli."
        >
          <MapArtwork />
        </ScaledArtwork>
      </section>
    </IllustratedShell>
  );
}
