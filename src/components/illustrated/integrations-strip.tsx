import Image from "next/image";
import { AnimatedCard } from "@/components/ui/feature-block-animated-card";
import styles from "./integrations-strip.module.css";

// Preserve the Figma card treatment with the requested platform list.
const integrations: Array<{ name: string; asset?: string; src?: string; width: number; height: number }> = [
  { name: "Gmail", asset: "imgImage657", width: 28.356, height: 28.356 },
  { name: "LinkedIn", asset: "imgImage645", width: 27.648, height: 27.648 },
  { name: "Google Sheets", src: "/brands/google-sheets.png", width: 34, height: 34 },
  { name: "Slack", asset: "imgImage656", width: 28.074, height: 28.074 },
  { name: "Google Calendar", src: "/brands/google-calendar.png", width: 34, height: 34 },
  { name: "X", asset: "imgImage100", width: 34.533, height: 34.533 },
  { name: "HubSpot", asset: "imgImage70", width: 33.126, height: 32.859 },
  { name: "Reddit", asset: "imgImage666", width: 38.15, height: 38.15 },
  { name: "Salesforce", asset: "imgImage643", width: 33.761, height: 25.2 },
  { name: "Google Ads", asset: "imgImage653", width: 37.194, height: 34.465 },
  { name: "Zoho", src: "/brands/zoho.svg", width: 38, height: 38 },
  { name: "WhatsApp", src: "/brands/whatsapp.svg", width: 34, height: 34 },
  { name: "Cal.com", asset: "imgImage661", width: 38.011, height: 38.011 },
  { name: "Calendly", src: "/brands/calendly.svg", width: 34, height: 34 },
  { name: "Apify", src: "/brands/apify.svg", width: 34, height: 34 },
  { name: "Icypass", asset: "imgImage671", width: 38.737, height: 38.737 },
  { name: "Apollo", asset: "imgImage665", width: 41.424, height: 41.424 },
  { name: "Microsoft Excel", asset: "imgImage667", width: 39.353, height: 39.353 },
  { name: "Attio", asset: "imgImage663", width: 32.626, height: 32.626 },
  { name: "Instantly", src: "/brands/instantly-optimized.webp", width: 36, height: 36 },
  { name: "HeyReach", asset: "imgImage68", width: 41.604, height: 41.604 },
];

function orderedFrom(start: number) {
  return [...integrations.slice(start), ...integrations.slice(0, start)];
}

export function IntegrationsStrip() {
  return (
    <section className={`design-integrations-strip design-container ${styles.section}`} aria-labelledby="integrations-title">
      <div className="design-section-heading">
        <h2 id="integrations-title">Integrations</h2>
        <p>Keep your tools in the workflow. Ask us about the connections your team needs.</p>
      </div>
      <div className={styles.rows}>
        {[0, 11].map((start, row) => (
          <AnimatedCard
            key={start}
            variant="strip"
            autoScroll
            animateIcons={false}
            scrollDirection={row === 0 ? "left" : "right"}
            className={styles.row}
            ariaLabel={`Integration tools, row ${row + 1}. Focus or hover to pause; scroll to explore.`}
            icons={orderedFrom(start).map((tool) => ({
              label: tool.name,
              className: styles.tile,
              icon: <>
                <span className={`${styles.logo} ${(tool.asset && styles[tool.asset]) ?? ""}`} style={{ width: tool.width, height: tool.height }}>
                  <Image src={tool.src ?? `/figma/integration-cards/${tool.asset}.png`} alt="" width={96} height={96} sizes="48px" loading="lazy" />
                </span>
                <span>{tool.name}</span>
              </>,
            }))}
          />
        ))}
      </div>
    </section>
  );
}
