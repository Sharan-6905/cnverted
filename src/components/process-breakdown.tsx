"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ProcessStep } from "@/lib/types";

interface ProcessBreakdownProps {
  steps: ProcessStep[];
  /** index of the step open by default */
  defaultStep?: number;
  onStepChange?: (step: ProcessStep, index: number) => void;
}

export function ProcessBreakdown({
  steps,
  defaultStep = 0,
  onStepChange,
}: ProcessBreakdownProps) {
  const [active, setActive] = useState(defaultStep);
  const current = steps[active];

  function select(i: number) {
    setActive(i);
    onStepChange?.(steps[i], i);
  }

  return (
    <Section
      id="pipeline"
      eyebrow="Under the hood"
      title={
        <>
          Five steps from raw web to{" "}
          <span className="text-accent">CRM-ready pipeline</span>.
        </>
      }
      description="Click through the pipeline that turns scattered public activity into scored, enriched accounts in your system of record."
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Steps rail */}
        <ol className="space-y-2">
          {steps.map((s, i) => {
            const isActive = i === active;
            const isDone = i < active;
            return (
              <li key={s.id}>
                <button
                  onClick={() => select(i)}
                  className={cn(
                    "flex w-full items-center gap-4 rounded-xl border px-4 py-3.5 text-left smooth-transition transition-colors",
                    isActive
                      ? "border-ink/15 bg-surface-card"
                      : "border-hairline bg-canvas hover:bg-surface-soft"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-xs",
                      isActive
                        ? "bg-ink text-canvas"
                        : isDone
                        ? "bg-intent-high text-canvas"
                        : "border border-hairline bg-canvas text-muted"
                    )}
                  >
                    {isDone ? <Check className="h-3.5 w-3.5" /> : i + 1}
                  </span>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isActive ? "text-ink" : "text-muted"
                    )}
                  >
                    {s.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* Detail panel */}
        <Card className="relative min-h-[220px] overflow-hidden p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="font-mono text-sm text-brand-teal">
                Step {active + 1} / {steps.length}
              </span>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink">
                {current.headline}
              </h3>
              <p className="mt-3 max-w-md leading-relaxed text-muted">
                {current.detail}
              </p>
            </motion.div>
          </AnimatePresence>
        </Card>
      </div>
    </Section>
  );
}
