import { DEMO_PATH } from "@/lib/booking";
import Link from "next/link";
import { IllustratedHero, DesignLink } from "./hero";
import {
  BrainArtwork,
  RecipeArtwork,
  WorkflowArtwork,
} from "./artwork";
import { ScaledArtwork } from "./scaled-artwork";
import { DeferredVisual } from "./deferred-visual";
import { HomeScrollExperience } from "./scroll-experience";
import { LiveHeadline } from "./live-headline";
import { StrategySection } from "./strategy-section-figma";
import { IntegrationsStrip } from "./integrations-strip";
import { CustomerStories, ClientProof } from "./customer-stories";
import { ProductExampleLink } from "./product-example-link";

export function IllustratedHome() {
  return (
    <>
      <HomeScrollExperience />
      <div className="design-opening-story">
        <div className="design-hero-pin">
          <IllustratedHero
            kind="home"
            title={<LiveHeadline />}
            description="Cnvrted AI helps your GTM team find buying signals, identify companies that fit your ICP, and reach out with relevant context."
          >
            <DesignLink href={DEMO_PATH} arrow>
              Book a call
            </DesignLink>
          </IllustratedHero>
          <a className="design-story-cue" href="#signals-title">
            <span>Follow the signals</span>
            <svg
              width="16"
              height="22"
              viewBox="0 0 16 22"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M8 1V19M2 13L8 19L14 13"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
        <div className="design-signal-pin">
          <section className="design-windmill" aria-labelledby="signals-title">
            <div className="design-section-heading">
              <h2 id="signals-title">Find buying signals in minutes</h2>
              <p>
                Turn buying signals into qualified leads, ranked and ready to
                reach.
              </p>
              <a className="marketing-text-link" href="/learn/buying-signals">
                What makes a useful buying signal? <span aria-hidden="true">↗</span>
              </a>
            </div>
            <DeferredVisual kind="flow" />
          </section>
        </div>
      </div>
      <ClientProof />
      <div className="design-feature-chapter">
        <section
          className="design-features design-container"
          aria-labelledby="features-title"
        >
          <div className="design-features-heading">
            <h2 id="features-title">
              From the open web to
              <br />
              booked meetings
            </h2>
            <div>
              <p>
                Find the accounts that match your business, understand their
                buying signals, and give your team the context to start the
                right conversation.
              </p>
              <DesignLink href={DEMO_PATH} arrow>
                Book a demo
              </DesignLink>
            </div>
          </div>
          <div className="design-feature-grid">
            <article className="design-feature-card">
              <ScaledArtwork width={605.5} height={185} animated>
                <BrainArtwork />
              </ScaledArtwork>
              <div className="design-feature-copy">
                <h3>ICP Brain</h3>
                <p>
                  Describe your ideal customer in plain English. Cnvrted
                  builds a living ICP from it — industry, role, company size,
                  buying signals — and keeps refining it from what actually
                  converts.
                </p>
              </div>
            </article>
            <article className="design-feature-card">
              <ScaledArtwork width={605.5} height={185} animated>
                <RecipeArtwork />
              </ScaledArtwork>
              <div className="design-feature-copy">
                <h3>ICP Recipe</h3>
                <p>
                  Point us at your top 10 customers. Cnvrted reverse-engineers
                  what they have in common — not just firmographics, but the
                  signals that showed up before they bought. That becomes your
                  recipe.
                </p>
              </div>
            </article>
            <article className="design-feature-card design-feature-wide">
              <div className="design-feature-copy">
                <h3>GTM Strategies</h3>
                <p>
                  Turn your ideal customer profile into a plan. Ask Orka to
                  research a market, find buying signals, and build a shortlist
                  you can review before reaching out.
                </p>
                <Link className="marketing-text-link" href="/learn/go-to-market-strategy">
                  How to build a GTM strategy <span aria-hidden="true">↗</span>
                </Link>
              </div>
              <ScaledArtwork width={613} height={325} animated>
                <div className="relative left-[-613px]">
                  <WorkflowArtwork />
                </div>
              </ScaledArtwork>
            </article>
          </div>
        </section>
      </div>
      <StrategySection />
      <ProductExampleLink />
      <IntegrationsStrip />
      <CustomerStories />
    </>
  );
}
