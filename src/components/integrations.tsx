import { Section } from "@/components/section";
import {
  SlackColor,
  SalesforceColor,
  HubSpotColor,
  NotionColor,
  ZapierColor,
} from "@/components/brand-logos";
import type { Integration } from "@/lib/types";

type IconProps = { className?: string };
const MARKS: Record<string, (p: IconProps) => React.JSX.Element> = {
  salesforce: SalesforceColor,
  hubspot: HubSpotColor,
  slack: SlackColor,
  notion: NotionColor,
  zapier: ZapierColor,
};

// A neutral OS-default sans stack — deliberately NOT font-sans (Poppins) or
// font-display (Tinos), so these wordmarks stop reading as "the CNVRTED
// font." We can't embed each brand's actual licensed typeface (Larsseit,
// Salesforce Sans, etc.), so weight/tracking/color are tuned per brand to
// approximate how each name actually presents.
const NEUTRAL_STACK =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

const WORDMARK_STYLE: Record<string, { color: string; weight: string; tracking: string }> = {
  slack: { color: "#4A154B", weight: "800", tracking: "-0.01em" },
  salesforce: { color: "#00A1E0", weight: "600", tracking: "-0.005em" },
  hubspot: { color: "#FF7A59", weight: "700", tracking: "-0.01em" },
  notion: { color: "#000000", weight: "600", tracking: "-0.01em" },
  zapier: { color: "#FF4A00", weight: "800", tracking: "-0.01em" },
  outreach: { color: "#5A50FF", weight: "700", tracking: "-0.005em" },
  salesloft: { color: "#00A0B7", weight: "600", tracking: "0em" },
  apollo: { color: "#6D4AFF", weight: "700", tracking: "-0.005em" },
};

interface IntegrationsProps {
  integrations: Integration[];
}

function IntegrationLogo({ it }: { it: Integration }) {
  const Mark = MARKS[it.id];
  const style = WORDMARK_STYLE[it.id];
  return (
    <div className="flex shrink-0 items-center gap-2.5 opacity-90 smooth-transition transition-opacity hover:opacity-100">
      {Mark !== undefined ? <Mark className="h-8 w-8" /> : null}
      <span
        className="text-lg"
        style={{
          color: style?.color,
          fontWeight: style?.weight,
          letterSpacing: style?.tracking,
          fontFamily: NEUTRAL_STACK,
        }}
      >
        {it.name}
      </span>
    </div>
  );
}

export function Integrations({ integrations }: IntegrationsProps) {
  return (
    <Section
      centered
      eyebrow="Integrations"
      title={
        <>
          Scored accounts,{" "}
          <span className="text-accent">right where you already work</span>.
        </>
      }
      description="Cnvrted pushes enriched, high-intent accounts straight into your CRM and outreach stack — no CSV exports, no busywork."
    >
      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="animate-marquee flex w-max items-center gap-12">
          {[...integrations, ...integrations].map((it, i) => (
            <IntegrationLogo key={`${it.id}-${i}`} it={it} />
          ))}
        </div>
      </div>
    </Section>
  );
}
