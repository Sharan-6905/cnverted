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
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(255,255,255,0.55) 0deg, rgba(255,255,255,0.32) 6deg, rgba(255,255,255,0.1) 14deg, rgba(255,255,255,0) 24deg)",
          filter: "blur(1.5px)",
        }}
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* leading edge highlight */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(255,255,255,0.9) 0deg, rgba(255,255,255,0) 3deg)",
          filter: "blur(0.5px)",
        }}
      />
    </motion.div>
  );
}
