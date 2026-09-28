// Preserved before the interactive canvas experiment; swap the home import to restore.
import Link from "next/link";
import Image from "next/image";
import { assets } from "./assets";
import { StrategyArtwork } from "./artwork";
import { ScaledArtwork } from "./scaled-artwork";

export function StrategySection() {
  return (
    <section
      className="design-strategies design-container"
      aria-labelledby="strategy-title"
    >
      <div className="design-section-heading">
        <h2 id="strategy-title">GTM Strategies</h2>
        <p>
          Enter the market confidently with our advanced AI model designed to
          help launch any company or product.
        </p>
      </div>
      <div className="design-strategy-board">
        <ScaledArtwork width={1176} height={679}>
          <StrategyArtwork />
        </ScaledArtwork>
        <div className="design-strategy-links">
          <Link
            href="https://beta.cnvrted.com"
            aria-label="Explore an early-stage startup strategy"
          />
          <Link
            href="https://beta.cnvrted.com"
            aria-label="Explore a social media strategy"
          />
          <Link
            href="https://beta.cnvrted.com"
            aria-label="Explore a new product strategy"
          />
        </div>
      </div>
      <div className="design-strategy-mobile">
        {[
          {
            title: "Early-stage startup",
            description:
              "Find your first customers and build your go-to-market plan.",
            image: assets.home.imgVideo,
          },
          {
            title: "Scale social media",
            description:
              "Spot conversations that reveal your next opportunity.",
            image: assets.home.imgVideo1,
          },
          {
            title: "Launch a new product",
            description: "Reach the right audience when they are ready to buy.",
            image: assets.home.imgVideo2,
          },
        ].map((strategy) => (
          <Link
            href="https://beta.cnvrted.com"
            key={strategy.title}
            className="design-strategy-mobile-card"
          >
            <Image
              src={strategy.image}
              alt=""
              width={240}
              height={160}
              sizes="110px"
            />
            <div>
              <h3>{strategy.title}</h3>
              <p>{strategy.description}</p>
              <span>
                Explore strategy <span aria-hidden="true">↗</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
