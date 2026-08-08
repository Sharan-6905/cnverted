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
      id="why"
      centered
      eyebrow="Why us"
      title={
        <>
          Not another <span className="text-accent">lead database</span>.
        </>
      }
      description="Lead databases sell you static contact data. Cnvrted sells you timing — the single thing that decides whether outreach lands."
    >
      <div className="overflow-hidden rounded-2xl border border-hairline">
        <div className="grid grid-cols-[1.1fr_1fr_1fr] bg-surface-soft text-xs font-medium sm:text-sm">
          <div className="px-3 py-3.5 text-muted sm:px-5 sm:py-4" />
          <div className="px-3 py-3.5 text-muted sm:px-5 sm:py-4">Traditional lead database</div>
          <div className="flex items-center gap-2 border-l border-hairline bg-brand-lavender/25 px-3 py-3.5 text-ink sm:px-5 sm:py-4">
            Cnvrted
          </div>
        </div>
        {ROWS.map((row, i) => (
          <div
            key={row.label}
            className={cn(
              "grid grid-cols-[1.1fr_1fr_1fr] text-xs sm:text-sm",
              i % 2 === 1 && "bg-surface-soft/50"
            )}
          >
            <div className="px-3 py-3.5 font-medium text-ink sm:px-5 sm:py-4">{row.label}</div>
            <div className="flex items-start gap-1.5 px-3 py-3.5 text-muted sm:gap-2 sm:px-5 sm:py-4">
              <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-intent-low sm:h-4 sm:w-4" />
              <span>{row.legacy}</span>
            </div>
            <div className="flex items-start gap-1.5 border-l border-hairline bg-brand-lavender/10 px-3 py-3.5 text-ink sm:gap-2 sm:px-5 sm:py-4">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-intent-high sm:h-4 sm:w-4" />
              <span>{row.cnvrted}</span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
