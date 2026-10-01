import { CASE_STUDY_SUMMARIES } from "@/lib/case-studies";
import { AnimatedCard } from "@/components/ui/feature-block-animated-card";
import { SideStoryCarousel } from "./side-story-carousel";
import "./customer-stories.css";
import Link from "next/link";

// Original Figma artwork plus Sonet's official wordmark supplied by the user.
const clients = [
  { file: "client-fps.png", name: "FPS", width: 115.201, height: 115.201 },
  {
    file: "client-symbol.png",
    name: "Cnvrted client",
    width: 125,
    height: 125,
  },
  { file: "client-curato.png", name: "Curato", width: 133.084, height: 120.1 },
  { file: "client-365.png", name: "365", width: 104.487, height: 120.1 },
  {
    file: "client-abstract.png",
    name: "Cnvrted client",
    width: 115.984,
    height: 115.984,
  },
  {
    file: "client-social-tag.png",
    name: "Social Tag",
    width: 116.469,
    height: 116.469,
  },
  {
    file: "client-bahari.svg",
    name: "Bahari Services",
    width: 215.5,
    height: 116.25,
  },
  {
    file: "client-sonet.png",
    name: "Sonet Integrated Solutions",
    width: 1000,
    height: 350,
  },
];

export function CustomerStories() {
  return (
    <div className="design-customer-stories">
      <section
        className="design-side-stories design-container"
        aria-labelledby="side-story-title"
      >
        <div className="design-section-heading">
          <h2 id="side-story-title">Case Studies</h2>
          <p>How real teams put Cnvrted to work.</p>
        </div>
        <SideStoryCarousel stories={CASE_STUDY_SUMMARIES} />
        <Link
          className="marketing-text-link case-studies-all"
          href="/case-studies"
        >
          Explore all case studies <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </div>
  );
}

export function ClientProof() {
  return (
    <section
      className="design-clients design-client-proof"
      aria-labelledby="clients-title"
    >
      <div className="design-section-heading design-container">
        <h2 id="clients-title">Our Clients</h2>
        <p>
          Teams using Cnvrted to find relevant prospects and start better
          conversations.
        </p>
      </div>
      <AnimatedCard
        variant="strip"
        autoScroll
        scrollDirection="right"
        className="client-logos-animation"
        ariaLabel="Our clients. Logos scroll automatically to the right."
        icons={clients.map((client) => ({
          label: client.name,
          className: "client-glass-tile",
          icon: (
            <img
              className={
                client.width / client.height > 1.7
                  ? "client-logo-wide"
                  : undefined
              }
              src={`/figma/side-story/${client.file}`}
              alt={client.name}
              width={client.width}
              height={client.height}
              decoding="async"
            />
          ),
        }))}
      />
    </section>
  );
}
