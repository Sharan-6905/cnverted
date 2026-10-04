import { CASE_STUDY_SUMMARIES } from "@/lib/case-studies";
import { AnimatedCard } from "@/components/ui/feature-block-animated-card";
import { SideStoryCarousel } from "./side-story-carousel";
import "./customer-stories.css";
import Link from "next/link";
import Image from "next/image";

import { CUSTOMERS } from "@/lib/customers";

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
        icons={CUSTOMERS.map((client) => ({
          label: client.name,
          className: "client-glass-tile",
          icon: (
            <Image
              className={
                client.width / client.height > 1.7
                  ? "client-logo-wide"
                  : undefined
              }
              src={`/figma/side-story/${client.file}`}
              alt={client.name}
              width={client.width}
              height={client.height}
              sizes={client.width / client.height > 1.7 ? "116px" : "112px"}
            />
          ),
        }))}
      />
      <Link className="marketing-text-link case-studies-all" href="/customers">
        Meet our customers <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}
