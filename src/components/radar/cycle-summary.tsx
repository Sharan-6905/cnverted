"use client";

import { motion } from "framer-motion";

export function CycleSummary() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex w-full flex-col items-center gap-1.5 rounded-3xl border border-black/5 bg-white px-6 py-6 text-center"
      style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
    >
      <span className="text-sm font-semibold text-ink">Cycle complete</span>
      <span className="text-xs text-muted-soft">5 companies qualified</span>
      <span className="text-xs text-muted-soft">18 signals correlated</span>
      <span className="text-xs text-muted-soft">Average intent 92%</span>
      <span className="mt-2 text-[11px] font-medium text-brand-teal">Restarting scan…</span>
    </motion.div>
  );
}
