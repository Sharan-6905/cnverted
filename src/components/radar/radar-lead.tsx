"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { RadarLeadData } from "./radar-data";
import { polarToPercent } from "./radar-data";

interface RadarLeadProps {
  lead: RadarLeadData;
  active: boolean;
  leadRef?: (el: HTMLDivElement | null) => void;
}

export function RadarLead({ lead, active, leadRef }: RadarLeadProps) {
  const { left, top } = polarToPercent(lead.angle, lead.radiusFraction);

  return (
    <div
      ref={leadRef}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${left}%`, top: `${top}%` }}
    >
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

      <motion.div
        className="relative h-14 w-14 overflow-hidden rounded-full border-[3px] border-white shadow-lg"
        style={{ boxShadow: `0 0 0 4px ${lead.ring}, 0 6px 18px rgba(10,30,80,0.35)` }}
        animate={active ? { scale: [1, 1.15, 1] } : { scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Image src={lead.avatar} alt={lead.name} fill sizes="56px" className="object-cover" />
      </motion.div>
    </div>
  );
}
