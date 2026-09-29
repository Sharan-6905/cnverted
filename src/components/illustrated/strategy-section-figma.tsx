import { Manrope } from "next/font/google";
import { StrategyCanvasPreview } from "./strategy-canvas-preview";
import { StrategyGraphArtwork } from "./strategy-graph-artwork";
import "./homepage-canvas.css";

const canvasFont = Manrope({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-canvas" });

export function StrategySection() {
  return (
    <section className={`design-strategies design-strategies-canvas design-container ${canvasFont.variable}`} aria-labelledby="strategy-title">
      <div className="design-section-heading">
        <h2 id="strategy-title">GTM Strategies</h2>
        <p>Enter the market confidently with our advanced AI model designed to help launch any<br className="strategy-heading-break" /> company or product.</p>
      </div>
      <StrategyCanvasPreview><StrategyGraphArtwork /></StrategyCanvasPreview>
    </section>
  );
}
