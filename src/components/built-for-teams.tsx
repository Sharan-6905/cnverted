import { Target, Briefcase, LineChart, Compass, type LucideIcon } from "lucide-react";
import { Section } from "@/components/section";
import { cn } from "@/lib/utils";
import type { Persona } from "@/lib/types";

const ICONS: Record<string, LucideIcon> = {
  sdr: Target,
  ae: Briefcase,
  revops: LineChart,
  gtm: Compass,
};

// Clay feature-card palette, cycled so no two neighbours match.
const CARD_STYLES = [
  { bg: "bg-brand-teal", text: "text-on-dark", chip: "bg-white/15 text-on-dark" },
  { bg: "bg-brand-ochre", text: "text-ink", chip: "bg-ink/10 text-ink" },
  { bg: "bg-brand-lavender", text: "text-ink", chip: "bg-ink/10 text-ink" },
  { bg: "bg-brand-peach", text: "text-ink", chip: "bg-ink/10 text-ink" },
];

interface BuiltForTeamsProps {
  personas: Persona[];
}

export function BuiltForTeams({ personas }: BuiltForTeamsProps) {
  return (
    <Section
      id="teams"
      centered
      eyebrow="Built for modern revenue teams"
      title="One signal layer. Every seat on the floor."
      description="From first-touch prospecting to pipeline strategy — everyone works from the same real-time intent."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {personas.map((p, i) => {
          const Icon = ICONS[p.id] ?? Target;
          const style = CARD_STYLES[i % CARD_STYLES.length];
          return (
            <div
              key={p.id}
              className={cn(
                "flex flex-col rounded-4xl p-7 smooth-transition transition-transform hover:-translate-y-1",
                style.bg,
                style.text
              )}
            >
              <div
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-2xl",
                  style.chip
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold tracking-tight">
                {p.title}
              </h3>
              <p className={cn("mt-2 text-sm leading-relaxed", style.text === "text-ink" ? "text-body" : "text-on-dark/85")}>
                {p.blurb}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
