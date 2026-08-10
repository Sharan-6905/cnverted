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

// Per-brand weight/spacing only — color comes from the shared whale-navy →
// intent-green gradient (.text-accent) instead of each brand's own hue.
const WORDMARK_STYLE: Record<string, { weight: string; tracking: string }> = {
  slack: { weight: "800", tracking: "-0.01em" },
  salesforce: { weight: "600", tracking: "-0.005em" },
  hubspot: { weight: "700", tracking: "-0.01em" },
  notion: { weight: "600", tracking: "-0.01em" },
  zapier: { weight: "800", tracking: "-0.01em" },
  outreach: { weight: "700", tracking: "-0.005em" },
  salesloft: { weight: "600", tracking: "0em" },
  apollo: { weight: "700", tracking: "-0.005em" },
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
        className="text-accent font-sans text-lg"
        style={{ fontWeight: style?.weight, letterSpacing: style?.tracking }}
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
