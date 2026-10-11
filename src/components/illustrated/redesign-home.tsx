import Image from "next/image";
import { DEMO_PATH } from "@/lib/booking";
import { DesignLink } from "./hero";
import { DeferredVisual } from "./deferred-visual";
import { IntegrationsStrip } from "./integrations-strip";
import { CustomerStories, ClientProof } from "./customer-stories";
import { ProductExampleLink } from "./product-example-link";
import { RedesignHeroArtwork } from "./redesign-artwork";
import { RedesignFeatureDeck } from "./redesign-feature-deck";
import { AutomatedWorkforce } from "./automated-workforce";
import { CopyPromptSection } from "./copy-prompt-section";
import { MarketScrollStory } from "./market-scroll-story";
import { redesignAssets as art } from "./redesign-assets";
import "./redesign-home.css";

export function RedesignHome() {
  return <>
    <section className="redesign-hero" aria-labelledby="hero-title">
      <RedesignHeroArtwork />
      <div className="redesign-hero-copy">
        <h1 id="hero-title">Reinventing GTM</h1>
        <p>Find the right buyers. Turn signals into sales.</p>
        <div className="redesign-hero-actions"><DesignLink href="https://beta.cnvrted.com" secondary>Start free</DesignLink><DesignLink href={DEMO_PATH} arrow>Book a call</DesignLink></div>
      <small className="hero-credit-note">40 free credits to explore Cnvrted.</small>
      </div>
    </section>
    <section id="gtm-demo" className="redesign-hero-demo" aria-label="Interactive product walkthrough">
      <Image className="redesign-bird-right" {...art["499-2111-imgImage94"]} alt="" sizes="(max-width: 1024px) 240px, 335px" />
      <DeferredVisual kind="canvas" />
    </section>
    <div className="redesign-logo-section redesign-customer-section"><ClientProof /><Image className="redesign-toucan" {...art["499-1460-imgImage106"]} alt="" sizes="(max-width: 767px) 104px, 164px" /></div>
    <section className="redesign-market" aria-labelledby="market-title">
      <div className="redesign-market-heading">
        <h2 id="market-title">Find your next best-fit accounts</h2>
        <p>Turn public signals into a focused list of buyers.</p>
      </div>
      <MarketScrollStory />
    </section>
    <section className="redesign-features design-container" aria-labelledby="features-title">
      <div className="redesign-feature-heading"><h2 id="features-title">From the open web to<br />booked meetings</h2><div><p>Find the accounts that match your business, understand their buying signals, and give your team the context to start the right conversation.</p><DesignLink href={DEMO_PATH} arrow>Book a call</DesignLink></div></div>
      <RedesignFeatureDeck />
    </section>
    <div className="redesign-logo-section"><IntegrationsStrip decoration={<Image className="integrations-toucan" {...art["499-1460-imgImage106"]} alt="" sizes="(max-width: 767px) 80px, 140px" />} /></div>
    <CopyPromptSection />
    <AutomatedWorkforce />
    <CustomerStories />
    <ProductExampleLink />
  </>;
}
