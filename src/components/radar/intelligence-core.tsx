"use client";

import { motion } from "framer-motion";

interface IntelligenceCoreProps {
  pulseKey: number;
}

export function IntelligenceCore({ pulseKey }: IntelligenceCoreProps) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-2xl border border-white/25 bg-white/10 px-4 py-3 text-center backdrop-blur-md"
      key={pulseKey}
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{ boxShadow: "0 4px 24px rgba(10,30,80,0.25)" }}
    >
      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
        Cnvrted
      </span>
      <span className="text-[10px] text-white/70">Intent Engine</span>
      <span className="mt-1 inline-flex items-center gap-1.5 text-[10px] font-semibold text-white">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </span>
        LIVE
      </span>
      <span className="text-[9px] text-white/60">Watching 1,248 sources</span>
    </motion.div>
  );
}
