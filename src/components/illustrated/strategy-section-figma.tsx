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
          Enter the market confidently with our advanced AI model designed to
          help launch any
          <br className="strategy-heading-break" /> company or product.
        </p>
      </div>
      <ProductCanvasDemo />
    </section>
  );
}
