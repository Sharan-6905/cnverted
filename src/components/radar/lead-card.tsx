"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { RadarLeadData } from "./radar-data";
import { TypingText } from "./typing-text";

interface LeadCardProps {
  lead: RadarLeadData;
}

export function LeadCard({ lead }: LeadCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: [0.96, 1.02, 1] }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 22, duration: 0.5 }}
      className="flex items-center gap-4 rounded-full border border-black/5 bg-white px-6 py-4"
      style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.08)", minHeight: 80 }}
    >
      <div
        className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full"
        style={{ backgroundColor: lead.ring }}
      >
        <Image src={lead.avatar} alt={lead.name} fill sizes="44px" className="object-cover" />
      </div>
      <TypingText segments={lead.segments} active />
    </motion.div>
  );
}
