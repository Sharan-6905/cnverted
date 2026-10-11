import { ArrowRight, Check, Sparkles, Target } from "lucide-react";
import { FeatureModelCycle } from "./redesign-feature-motion";

/** Readable, responsive cards retain the illustrated pipeline without scaling down text. */
export function FeatureWorkflow({ kind }: { kind: "brain" | "strategy" }) {
  const brain = kind === "brain";
  return <div className={`feature-workflow feature-workflow-${kind}`}>
    <div className="feature-workflow-card feature-workflow-input">
      <span className="feature-workflow-eyebrow">{brain ? "Your working profile" : "Your market brief"}</span>
      <h4>{brain ? "Design partners for growing teams" : "Find the next right conversation"}</h4>
      <p>{brain ? "Seed to Series B software companies, with a product launch ahead." : "Find software companies hiring designers, then review the signals behind each match."}</p>
      <div className="feature-workflow-chips"><span>{brain ? "50–200 people" : "Software teams"}</span><span>{brain ? "Founders & product leads" : "Hiring + launches"}</span></div>
    </div>
    <div className="feature-workflow-connection" aria-hidden="true">
      <svg viewBox="0 0 600 60" preserveAspectRatio="none"><path d="M0 30 H600"/><path className="feature-workflow-current" d="M0 30 H600"/></svg>
      {brain ? <FeatureModelCycle /> : <span className="feature-workflow-hub"><Sparkles size={22}/> Orka</span>}
      <ArrowRight className="feature-workflow-arrow" size={22}/>
    </div>
    <div className="feature-workflow-card feature-workflow-result">
      <span className="feature-workflow-eyebrow">{brain ? "A stronger match" : "Your shortlist"} <span>Sample</span></span>
      <div className="feature-workflow-person"><img className={`feature-workflow-avatar${brain ? " feature-workflow-avatar-person" : ""}`} src={brain ? "/avatars/maya-demo.webp" : "/brands/primer-demo.svg"} alt={brain ? "Fictional profile photo for Maya Chen" : "Primer sample company logo"} width={44} height={44} loading="lazy" /><div><h4>{brain ? "Maya Chen" : "Primer"}</h4><p>{brain ? "Product lead · Bloomcart" : "Product & design team"}</p></div></div>
      <ul>
        {(brain ? ["Fits your company profile", "New product launch", "Hiring a product designer"] : ["Company fits your target market", "Design hiring signal found", "Ready for your review"]).map(item=><li key={item}><Check size={16}/>{item}</li>)}
      </ul>
      <div className="feature-workflow-outcome"><Target size={17}/>{brain ? "New context refines your ICP" : "From buying signal to target account"}</div>
    </div>
  </div>;
}
