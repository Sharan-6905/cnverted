import { Check, X } from "lucide-react";
import { Section } from "@/components/section";
import { cn } from "@/lib/utils";

const ROWS: { label: string; legacy: string; cnvrted: string }[] = [
  { label: "Data freshness", legacy: "Static, often months out of date", cnvrted: "Real-time, updated continuously" },
  { label: "What you're buying", legacy: "Contact records", cnvrted: "Timing & intent" },
  { label: "Why-now context", legacy: "None — you guess the reason", cnvrted: "Every account, with the trigger" },
  { label: "Reply rates", legacy: "Low — cold, untimed outreach", cnvrted: "Higher — you reach in-market buyers" },
  { label: "Reps' time", legacy: "Spent researching & qualifying", cnvrted: "Spent selling to ready accounts" },
];

export function Comparison() {
  return (
    <Section
      centered
      eyebrow="Why us"
      title="Not another lead database."
      description="Lead databases sell you static contact data. Cnvrted sells you timing — the single thing that decides whether outreach lands."
    >
      <div className="overflow-hidden rounded-2xl border border-hairline">
        <div className="grid grid-cols-[1.2fr_1fr_1fr] bg-surface-soft text-sm font-medium">
          <div className="px-5 py-4 text-muted" />
          <div className="px-5 py-4 text-muted">Traditional lead database</div>
          <div className="flex items-center gap-2 border-l border-hairline bg-brand-lavender/25 px-5 py-4 text-ink">
            Cnvrted
          </div>
        </div>
        {ROWS.map((row, i) => (
          <div
            key={row.label}
            className={cn(
              "grid grid-cols-[1.2fr_1fr_1fr] text-sm",
              i % 2 === 1 && "bg-surface-soft/50"
            )}
          >
            <div className="px-5 py-4 font-medium text-ink">{row.label}</div>
            <div className="flex items-start gap-2 px-5 py-4 text-muted">
              <X className="mt-0.5 h-4 w-4 shrink-0 text-intent-low" />
              <span>{row.legacy}</span>
            </div>
            <div className="flex items-start gap-2 border-l border-hairline bg-brand-lavender/10 px-5 py-4 text-ink">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-intent-high" />
              <span>{row.cnvrted}</span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
