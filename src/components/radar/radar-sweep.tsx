"use client";

import { motion } from "framer-motion";
import { SWEEP_DURATION_MS } from "./radar-data";

export function RadarSweep() {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden rounded-full"
      style={{ transformOrigin: "50% 50%" }}
      animate={{ rotate: 360 }}
      transition={{
        duration: SWEEP_DURATION_MS / 1000,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(255,255,255,0.38) 0deg, rgba(255,255,255,0.14) 12deg, rgba(255,255,255,0) 22deg)",
          filter: "blur(2px)",
        }}
      />
    </motion.div>
  );
}
