"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { RadarLeadData } from "./radar-data";
import { polarToPercent } from "./radar-data";

interface RadarLeadProps {
  lead: RadarLeadData;
  active: boolean;
  approaching?: boolean;
  leadRef?: (el: HTMLDivElement | null) => void;
}

export function RadarLead({ lead, active, approaching, leadRef }: RadarLeadProps) {
  const { left, top } = polarToPercent(lead.angle, lead.radiusFraction);
  const illuminated = active || approaching;

  return (
    <div
      ref={leadRef}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${left}%`, top: `${top}%` }}
    >
      {/* sonar ripple — two rings, staggered */}
      <AnimatePresence>
        {active &&
          [0, 0.18].map((delay) => (
            <motion.div
              key={delay}
              className="absolute inset-0 rounded-full"
              style={{ border: `1.5px solid ${lead.glow}` }}
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 2.3, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeOut", delay }}
            />
          ))}
      </AnimatePresence>

      <AnimatePresence>
        {active && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: lead.glow }}
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 2.6, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* idle float */}
      <motion.div
        animate={{ y: [-2, 2, -2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="relative h-14 w-14 overflow-hidden rounded-full border-[3px] border-white"
          animate={{
            scale: active ? [1, 1.15, 1] : 1,
            boxShadow: illuminated
              ? `0 0 0 4px ${lead.ring}, 0 0 22px 4px ${lead.glow}, 0 6px 18px rgba(10,30,80,0.35)`
              : `0 0 0 4px ${lead.ring}, 0 6px 18px rgba(10,30,80,0.35)`,
            filter: illuminated
              ? "brightness(1.12) saturate(1.15)"
              : "brightness(1) saturate(1)",
          }}
          transition={{ duration: active ? 0.5 : 0.4, ease: "easeInOut" }}
        >
          <Image src={lead.avatar} alt={lead.name} fill sizes="56px" className="object-cover" />
          {/* glass highlight */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 40%)",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
