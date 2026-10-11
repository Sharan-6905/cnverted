import type { ReactNode } from "react";
import { homepageCanvasAssets } from "./homepage-canvas-assets";
import { AnimatedCard } from "@/components/ui/feature-block-animated-card";

const art = homepageCanvasAssets.integrations;
const logos = [
  { name: "HeyReach", asset: art.imgImage56, crop: true, width: 60, height: 50 },
  { name: "Slack", asset: art.imgSlackIcon20191 },
  { name: "Instantly", asset: art.imgImage57, width: 64, height: 64 },
  { name: "HubSpot", asset: art.imgHubspotIcon1 },
  { name: "Salesforce", asset: art.imgGroup },
  { name: "Microsoft Copilot", asset: art.imgCopilotIcon1 },
  { name: "Zapier", asset: art.imgCdnlogoComZapierLogo1 },
  { name: "Outreach", asset: art.imgImage58, width: 75, height: 75 },
  { name: "Composio", asset: { src: "/brands/composio.png", width: 180, height: 180 }, width: 60, height: 60 },
];

export function IntegrationsStrip({ decoration }: { decoration?: ReactNode }) {
  return (
    <section className="design-integrations-strip design-container" aria-labelledby="integrations-title">
      <div className="design-section-heading">
        <h2 id="integrations-title">Integrations</h2>
        <p>Keep your tools in the workflow. Ask us about the connections your team needs.</p>
      </div>
      <div className={decoration ? "integrations-logo-row" : undefined}>
      {decoration}
      <AnimatedCard
        variant="strip"
        autoScroll
        className="integrations-strip-animation"
        ariaLabel="Integrations. Logos scroll automatically."
        icons={logos.map((logo) => ({
          label: logo.name,
          className: "integrations-strip-tile",
          icon: logo.crop ? (
            <div className="integrations-strip-wordmark">
              <img src={logo.asset.src} alt={logo.name} width={221.718} height={50} loading="lazy" />
            </div>
          ) : (
            <img src={logo.asset.src} alt={logo.name} width={logo.width ?? logo.asset.width}
              height={logo.height ?? logo.asset.height} loading="lazy" />
          ),
        }))}
      />
      </div>
      <div className="integrations-strip-fade" aria-hidden="true">
        <img {...art.imgFrame1686561929} alt="" loading="lazy" />
      </div>
    </section>
  );
}
