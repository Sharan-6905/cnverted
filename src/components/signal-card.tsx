"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IntentMeter } from "@/components/ui/intent-meter";
import { CATEGORY_META } from "@/lib/signal-meta";
import { cn } from "@/lib/utils";
import type { Signal, IntentLevel } from "@/lib/types";

const LEVEL_BADGE: Record<IntentLevel, "high" | "medium" | "low"> = {
  high: "high",
  medium: "medium",
  low: "low",
};
const LEVEL_LABEL: Record<IntentLevel, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

interface SignalCardProps {
  signal: Signal;
  /** emphasized styling for the hero / winning card */
  highlighted?: boolean;
  onSelect?: (signal: Signal) => void;
}

export function SignalCard({ signal, highlighted, onSelect }: SignalCardProps) {
  const meta = CATEGORY_META[signal.category];
  const Icon = meta.icon;
  const interactive = Boolean(onSelect);

  return (
    <Card
      float={highlighted}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={interactive ? () => onSelect?.(signal) : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect?.(signal);
              }
            }
          : undefined
      }
      className={cn(
        "p-5 smooth-transition transition-[transform,box-shadow]",
        interactive &&
          "cursor-pointer hover:-translate-y-0.5 hover:shadow-float focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-peach",
        highlighted && "ring-1 ring-hairline"
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <Badge variant="clay" size="sm">
          <Icon className="h-3.5 w-3.5" />
          {meta.label}
        </Badge>
        <span className="font-mono text-xs text-muted">{signal.timestamp}</span>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted">
            {signal.description}
          </p>
        </div>
        <Badge variant={LEVEL_BADGE[signal.level]} size="sm" className="shrink-0">
          {LEVEL_LABEL[signal.level]}
        </Badge>
      </div>

      <div className="mt-4">
        <IntentMeter score={signal.score} level={signal.level} />
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-hairline pt-3">
        <span className="text-xs text-muted">
          via <span className="text-ink">{signal.source}</span>
        </span>
        <span className="font-mono text-[11px] uppercase tracking-wider text-brand-teal">
          Intent {signal.score}
        </span>
      </div>
    </Card>
  );
}
