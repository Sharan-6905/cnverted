import { StackedCards } from "@/components/ui/glass-cards";
import Image from "next/image";
import Link from "next/link";
import { redesignAssets as art } from "./redesign-assets";
import { FeatureWorkflow } from "./feature-workflow";
import { FeatureMotion } from "./redesign-feature-motion";
import "./redesign-feature-motion.css";


const features = [
  { id: "recipe", title: "ICP Recipe", description: "Start with your best customers—or the buyers you want to reach. Find the shared traits and buying signals that shape your ideal customer profile (ICP)." },
  { id: "strategy", title: "GTM Strategies", description: "Turn your ideal customer profile into a plan. Ask Orka to research a market, find buying signals, and build a shortlist you can review before reaching out." },
  { id: "brain", title: "ICP Brain", description: "Keep what you learn in one living profile. Refine the industries, roles, and signals that matter as new accounts and conversations add context." },
] as const;
const samples = [
  { key: "imgImage102", title: "Find your first buyers", body: "Find companies that need your offer.", style: "startup" },
  { key: "imgImage103", title: "Spot buying conversations", body: "See what buyers are asking for.", style: "social" },
  { key: "imgImage104", title: "Launch a new offer", body: "Reach the right people for your next launch.", style: "product" },
  { key: "imgImage105", title: "Explore a new market", body: "Explore, learn, and refine your next move.", style: "infinity" },
] as const;

export function RedesignFeatureDeck() {
  const cards = features.map(feature => ({
    id: feature.id,
    content: <FeatureMotion labelledBy={`feature-heading-${feature.id}`} className={`redesign-feature-panel redesign-panel-${feature.id}`}>
      <div className="redesign-feature-intro"><h3 id={`feature-heading-${feature.id}`}>{feature.title}</h3><p>{feature.description}</p></div>
      {feature.id === "recipe" ? <div className="redesign-recipe-cards">{samples.map(sample => <div className={`redesign-recipe-card redesign-recipe-${sample.style}`} key={sample.key}>
        <div className="redesign-recipe-image"><Image {...art[`499-1227-${sample.key}`]} alt="" sizes="(max-width: 767px) 120px, 196px" /></div>
        <h4>{sample.title}</h4><p>{sample.body}</p>
      </div>)}</div> : <FeatureWorkflow kind={feature.id} />}
    </FeatureMotion>,
  }));
  return <div className="redesign-deck">
    <StackedCards cards={cards} />
    <Link href="/learn/go-to-market-strategy" className="marketing-text-link redesign-deck-link">How to build a GTM strategy <span aria-hidden="true">↗</span></Link>
  </div>;
}
