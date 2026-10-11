import { DeferredVisual } from "./deferred-visual";
import "./homepage-canvas.css";

export function StrategySection() {
  return (
    <section
      className="design-strategies design-strategies-canvas design-container"
      aria-labelledby="strategy-title"
    >
      <div className="design-section-heading">
        <h2 id="strategy-title">GTM Strategies</h2>
        <p>
          Tell Orka who you sell to. Follow the plan, company search, contacts,
          emails and deal progress—with your approval at each paid or sending step.
        </p>
      </div>
      <DeferredVisual kind="canvas" />
    </section>
  );
}
