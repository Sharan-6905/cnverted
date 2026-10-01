import { ProductCanvasDemo } from "./product-canvas-demo";
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
          Tell Orka who you want to reach. Follow the research, buying signals,
          and shortlist it builds on your canvas.
        </p>
      </div>
      <ProductCanvasDemo />
    </section>
  );
}
