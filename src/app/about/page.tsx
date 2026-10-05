import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { DEMO_PATH } from "@/lib/booking";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { IllustratedShell } from "@/components/illustrated/shell";
import { IllustratedHero, DesignLink } from "@/components/illustrated/hero";
import { FoundingTeam } from "@/components/illustrated/contact";

const neighborhoods = [
  {
    name: "Indiranagar",
    image: "/images/neighborhoods/indiranagar-sketch.webp",
    alt: "A light pen sketch of Indiranagar’s cafés, biriyani spots, and Halasuru Metro, connected by CMH Road, 100 ft Road, and Thippasandra.",
    streets: "CMH Road · Thippasandra · 100 ft Road · Halasuru Metro",
    places: ["Panjurli Cafe", "Mani’s Biriyani", "Third Wave", "Ela Matcha", "Chaayos", "Ambur Biriyani", "Meghana’s Biriyani"],
  },
  {
    name: "Kammanahalli",
    image: "/images/neighborhoods/kammanahalli-sketch.webp",
    alt: "A simple pen sketch of Aattutheeram, Got Tea, Starbucks, Big Bean Cafe, and Nahdi Mandi along Kammanahalli’s CMR Road.",
    streets: "CMR Road & the neighborhood",
    places: ["Aattutheeram", "Got Tea", "Starbucks", "Big Bean Cafe", "Nahdi Mandi"],
  },
] as const;

export const metadata: Metadata = pageMetadata({
  title: "About Cnvrted — Meet the Founding Team",
  description: "A better reason to reach out. Meet the team building Cnvrted in Bengaluru, and discover our approach to buying signals, context, and better conversations.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <IllustratedShell className="design-about-page" faqItems={[]}>
      <BreadcrumbSchema trail={[{ name: "About Us" }]} />
      <IllustratedHero
        kind="about"
        title={<>A better reason<br />to reach out.</>}
        description="Good outreach starts with something worth saying. We’re building Cnvrted to help you find the people, the context, and the moment that make a conversation matter."
      >
        <DesignLink href={DEMO_PATH} secondary>
          Book a demo
        </DesignLink>
        <DesignLink href="#founders-title" arrow>
          Meet the team
        </DesignLink>
      </IllustratedHero>
      <section
        className="about-origin design-container"
        aria-labelledby="story-title"
      >
        <div>
          <span className="marketing-eyebrow">The question behind Cnvrted</span>
          <h2 id="story-title">
            Why would they
            <br />
            care right now?
          </h2>
        </div>
        <div>
          <p>
            A job title tells you who someone is. It rarely tells you what
            they need today. That gap is where we started.
          </p>
          <p>
            Someone asks for a recommendation. A team starts hiring. A company
            changes direction. These moments can give you a reason to reach
            out, if you can find them and understand why they matter.
          </p>
          <p>
            Cnvrted brings those buying signals together, matches them to your
            ideal customer, and puts the context in front of you. So you can
            spend less time piecing together research and more time starting
            a thoughtful conversation.
          </p>
          <Link
            className="marketing-text-link"
            href="/#strategy-title"
          >
            See it in action <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <section className="about-principles design-container" aria-labelledby="principles-title">
        <div className="about-principles-heading">
          <span className="marketing-eyebrow">What we build around</span>
          <h2 id="principles-title">A few things we care about.</h2>
        </div>
        <div className="about-principles-grid">
          <article>
            <span className="about-principle-number" aria-hidden="true">01 /</span>
            <h3>Context comes first.</h3>
            <p>A useful signal answers three questions: what changed, why does it matter, and where did it come from? The evidence should be easy to check.</p>
          </article>
          <article>
            <span className="about-principle-number" aria-hidden="true">02 /</span>
            <h3>You make the call.</h3>
            <p>A signal is a starting point. Your judgment decides whether there’s a fit, what to say, and whether reaching out would actually be useful.</p>
          </article>
          <article>
            <span className="about-principle-number" aria-hidden="true">03 /</span>
            <h3>We use what we build.</h3>
            <p>We use Cnvrted for our own outreach. The useful discoveries, the awkward moments, and the feedback all find their way back into the product.</p>
            <Link className="marketing-text-link" href="/case-studies/how-cnvrted-finds-its-customers">
              Read our own story <span aria-hidden="true">↗</span>
            </Link>
          </article>
        </div>
      </section>
      <FoundingTeam description="Four people bringing product, engineering, design, and go-to-market together. A shared curiosity about what makes a good conversation happen." />
      <section className="about-neighborhoods design-container" aria-labelledby="location-title">
        <div className="about-neighborhoods-heading">
          <span className="marketing-eyebrow">Our little corner of the city</span>
          <h2 id="location-title">Bengaluru is home.</h2>
          <p>
            The streets, coffee stops, and biriyani breaks around Indiranagar
            and Kammanahalli. A little illustrated tour of our Bengaluru.
          </p>
        </div>
        <div className="about-neighborhood-grid">
          {neighborhoods.map((neighborhood) => (
            <figure className="about-neighborhood" key={neighborhood.name}>
              <h3 className="about-neighborhood-name">{neighborhood.name}</h3>
              <a
                className="about-neighborhood-art"
                href={neighborhood.image}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View the ${neighborhood.name} illustration at full size (opens in a new tab)`}
              >
                <Image
                  src={neighborhood.image}
                  alt={neighborhood.alt}
                  width={1536}
                  height={1024}
                  quality={95}
                  sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1240px) calc((100vw - 76px) / 2), 570px"
                />
              </a>
              <figcaption>
                <details className="about-neighborhood-places">
                  <summary>Places in {neighborhood.name}<span aria-hidden="true">+</span></summary>
                  <p>{neighborhood.streets}</p>
                  <ul>
                    {neighborhood.places.map((place) => <li key={place}>{place}</li>)}
                  </ul>
                </details>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="about-neighborhoods-footer">
          <p>A few familiar stops, loosely sketched.</p>
          <Link className="marketing-text-link" href="/contact">Say hello <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </IllustratedShell>
  );
}
