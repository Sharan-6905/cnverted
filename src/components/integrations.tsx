import { Section } from "@/components/section";
import {
  SlackColor,
  SalesforceColor,
  HubSpotColor,
  NotionColor,
  ZapierColor,
  ColorWordmark,
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
// brand hues for the wordmark-only tools
const WORDMARK_COLORS: Record<string, string> = {
  outreach: "#5A50FF",
  salesloft: "#00A0B7",
  apollo: "#6D4AFF",
};

interface IntegrationsProps {
  integrations: Integration[];
}

function IntegrationLogo({ it }: { it: Integration }) {
  const Mark = MARKS[it.id];
  return (
    <div className="flex shrink-0 items-center gap-2.5 opacity-90 smooth-transition transition-opacity hover:opacity-100">
      {Mark !== undefined ? <Mark className="h-8 w-8" /> : null}
      {Mark !== undefined ? (
        <span className="font-display text-lg font-semibold tracking-tight text-ink">
          {it.name}
        </span>
      ) : (
        <ColorWordmark name={it.name} color={WORDMARK_COLORS[it.id] ?? "#3A3A3A"} />
      )}
    </div>
  );
}

export function Integrations({ integrations }: IntegrationsProps) {
  return (
    <Section
      centered
      eyebrow="Integrations"
      title="Scored accounts, right where you already work."
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
