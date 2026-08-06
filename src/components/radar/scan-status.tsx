"use client";

import { motion } from "framer-motion";

const STATUSES = ["Watching", "Analyzing", "Correlating", "Matching", "Qualified"] as const;

export function ScanStatus({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
      {STATUSES.map((label, i) => (
        <span key={label} className="flex items-center gap-2">
          <motion.span
            animate={{
              color: i <= activeIndex ? "#1759FF" : "#9CA3AF",
              opacity: i <= activeIndex ? 1 : 0.55,
            }}
            transition={{ duration: 0.4 }}
            className="text-[11px] font-medium"
          >
            {label}
          </motion.span>
          {i < STATUSES.length - 1 && <span className="text-[10px] text-muted-soft/50">/</span>}
        </span>
      ))}
    </div>
  );
}
