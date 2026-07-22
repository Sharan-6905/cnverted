"use client";

import * as React from "react";
import * as Progress from "@radix-ui/react-progress";
import * as Tooltip from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";
import type { IntentLevel } from "@/lib/types";

const LEVEL_STYLES: Record<IntentLevel, { bar: string; label: string }> = {
  high: { bar: "bg-intent-high", label: "High intent" },
  medium: { bar: "bg-intent-medium", label: "Medium intent" },
  low: { bar: "bg-intent-low", label: "Low intent" },
};

interface IntentMeterProps {
  score: number;
  level: IntentLevel;
  className?: string;
  /** show the numeric score to the right of the bar */
  showValue?: boolean;
}

/** Accessible intent bar built on Radix Progress + Tooltip. */
export function IntentMeter({
  score,
  level,
  className,
  showValue = true,
}: IntentMeterProps) {
  const style = LEVEL_STYLES[level];
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <Tooltip.Provider delayDuration={150}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Progress.Root
              value={score}
              className="relative h-1.5 w-full overflow-hidden rounded-full bg-surface-strong"
              aria-label={`${style.label}, score ${score} of 100`}
            >
              <Progress.Indicator
                className={cn("h-full rounded-full smooth-transition transition-[width]", style.bar)}
                style={{ width: `${score}%` }}
              />
            </Progress.Root>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              sideOffset={6}
              className="rounded-lg bg-ink px-2.5 py-1.5 text-xs font-medium text-canvas shadow-float"
            >
              {style.label} · {score}/100
              <Tooltip.Arrow className="fill-ink" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
      {showValue && (
        <span className="w-8 shrink-0 text-right font-mono text-xs tabular-nums text-ink">
          {score}
        </span>
      )}
    </div>
  );
}
