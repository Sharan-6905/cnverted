import { DesignLink } from "./hero";
import { StrategyCanvas } from "./strategy-canvas";
import "./strategy-canvas.css";

export function StrategySection() {
  return (
    <section
      className="design-strategies design-container gtm-section"
      aria-labelledby="strategy-title"
    >
      <div className="design-section-heading gtm-section-heading">
        <span className="gtm-eyebrow">THE STRATEGY CANVAS</span>
        <h2 id="strategy-title">
          Build your Go-to-Market
          <br />
          <em>in real time.</em>
        </h2>
        <p>
          Define your ICP, map your channels, and sharpen your positioning.
          Build a launch-ready strategy on a living canvas, with an AI copilot
          by your side.
        </p>
        <DesignLink href="https://beta.cnvrted.com" arrow>
          Try the canvas
        </DesignLink>
      </div>
      <StrategyCanvas />
      <div className="gtm-models">
        <p>Explore Fable 5, Opus, Sonnet, GPT, Gemini, and Kimi.</p>
        <span>Your strategy. Your workflow. Your AI.</span>
      </div>
    </section>
  );
}
