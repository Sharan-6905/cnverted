import type { Metadata } from "next";
import { BOOKING_URL } from "@/lib/booking";
import Image from "next/image";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { IllustratedShell } from "@/components/illustrated/shell";
import { IllustratedHero, DesignLink } from "@/components/illustrated/hero";
import { MapArtwork } from "@/components/illustrated/artwork";
import { ScaledArtwork } from "@/components/illustrated/scaled-artwork";
import { assets } from "@/components/illustrated/assets";

export const metadata: Metadata = {
  title: "About Us — Cnvrted",
  description:
    "Meet the three founders behind Cnvrted — building the future of outbound from Bangalore.",
  alternates: { canonical: "/about" },
};
const art = assets.blogArticle;
const gallery = [
  { src: art.imgImageTheTeamAroundTheLongDeskLaptopsOpen, width: 309 },
  { src: art.imgImageAHandOfPokerPlayingOutOnTheBoardroomTable, width: 131 },
  { src: art.imgImageARooftopGroupPhotoWithTheCityLitUpBehind, width: 411 },
  { src: art.imgImageASelfieCrowdedInBesideTheCoffeeMachine, width: 227 },
  {
    src: art.imgImagePizzaOnTheConferenceTableATeammateDialledInOnTheScreen,
    width: 411,
  },
  { src: art.imgImageDessertPresentedToTheCameraInTheOfficePantry, width: 131 },
  { src: art.imgImageAPujaOnTheOfficeFloorEveryoneSittingTogether, width: 411 },
  { src: art.imgImageAPujaOnTheOfficeFloorEveryoneSittingTogether, width: 155 },
];
export default function AboutPage() {
  return (
    <IllustratedShell className="design-about-page">
      <BreadcrumbSchema trail={[{ name: "About Us" }]} />
      <IllustratedHero
        kind="about"
        title="About Us"
        description="What began as a chat around a coffee table became Cnvrted. Three Bangalore founders, one shared question, and a different way to find buyers."
      >
        <DesignLink href={BOOKING_URL} secondary>
          Book a call
        </DesignLink>
        <DesignLink href="/contact" arrow>
          Let’s Talk
        </DesignLink>
      </IllustratedHero>
      <section
        className="design-story design-container"
        aria-labelledby="story-title"
      >
        <div className="design-story-placeholder" aria-hidden="true" />
        <div>
          <h2 id="story-title">Our Story</h2>
          <p>
            They’re not pretending to have it all figured out. They’re building
            in public, shipping fast, and talking to every salesperson who’ll
            give them fifteen minutes. The conviction isn’t that they have the
            answers — it’s that nobody else is asking the right question:{" "}
            <strong>
              why is every sales team on earth still buying a list of names when
              what they actually need is timing?
            </strong>
          </p>
        </div>
      </section>
      <div className="design-gallery design-container" aria-hidden="true">
        {[gallery.slice(0, 4), gallery.slice(4)].map((row, rowIndex) => (
          <div className="design-gallery-row" key={rowIndex}>
            {row.map((image, index) => (
              <div key={index} style={{ flex: image.width }}>
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="(max-width: 767px) 40vw, 411px"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <section className="design-map" aria-labelledby="location-title">
        <div className="design-section-heading">
          <h2 id="location-title">Where you can find us?</h2>
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
