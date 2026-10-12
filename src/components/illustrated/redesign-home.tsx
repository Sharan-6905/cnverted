import Image from "next/image";
import Link from "next/link";
import { DEMO_PATH } from "@/lib/booking";
import { DesignLink } from "./hero";
import { DeferredVisual } from "./deferred-visual";
import { IntegrationsStrip } from "./integrations-strip";
import { CustomerStories, ClientProof } from "./customer-stories";
import { UserTestimonials } from "./user-testimonials";
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
        <h1 id="hero-title"><span>Run GTM on signals,</span>{" "}<span>not spreadsheets.</span></h1>
        <p>Every play starts with proof someone’s ready.</p>
        <div className="redesign-hero-actions"><DesignLink href={DEMO_PATH} arrow>Book a call</DesignLink></div>
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
        <p>Turn public signals into a focused list of buyers. <Link className="redesign-guide-link" href="/learn/go-to-market-strategy">Build your GTM strategy</Link>.</p>
      </div>
      <MarketScrollStory />
    </section>
    <section className="redesign-features design-container" aria-labelledby="features-title">
      <div className="redesign-feature-heading"><h2 id="features-title">From the open web to<br />booked meetings</h2><div><p>Define your <Link className="redesign-guide-link" href="/learn/ideal-customer-profile">ideal customer profile</Link>, understand your buyers’ <Link className="redesign-guide-link" href="/learn/buying-signals">buying signals</Link>, and give your team the context to start the right conversation.</p><DesignLink href={DEMO_PATH} arrow>Book a call</DesignLink></div></div>
      <RedesignFeatureDeck />
    </section>
    <div className="redesign-logo-section"><IntegrationsStrip decoration={<Image className="integrations-toucan" {...art["499-1460-imgImage106"]} alt="" sizes="(max-width: 767px) 80px, 140px" />} /></div>
    <CopyPromptSection />
    <AutomatedWorkforce />
    <CustomerStories />
    <UserTestimonials />
    <ProductExampleLink />
  </>;
}
