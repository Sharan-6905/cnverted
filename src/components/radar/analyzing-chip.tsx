"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const STEPS = ["18%", "36%", "59%", "82%", "Qualified"];

export function AnalyzingChip() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
    }, 70);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex w-full items-center gap-3 px-6 py-4 text-xs text-muted-soft"
      style={{ minHeight: 80 }}
    >
      <span className="shrink-0 font-medium">Analyzing…</span>
      <span className="relative h-1 flex-1 overflow-hidden rounded-full bg-surface-soft">
        <motion.span
          className="absolute inset-y-0 left-0 rounded-full bg-brand-teal"
          animate={{ width: STEPS[step] === "Qualified" ? "100%" : STEPS[step] }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        />
      </span>
      <span className="w-16 shrink-0 text-right font-mono font-medium text-ink">
        {STEPS[step]}
      </span>
    </motion.div>
  );
}
