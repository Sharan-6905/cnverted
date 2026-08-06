"use client";

import { motion } from "framer-motion";

interface ConnectorProps {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export function Connector({ id, x1, y1, x2, y2 }: ConnectorProps) {
  const bend = Math.max(Math.abs(x2 - x1) * 0.55, 24);
  const c1x = x1 + bend;
  const c2x = x2 - bend;
  const d = `M ${x1} ${y1} C ${c1x} ${y1}, ${c2x} ${y2}, ${x2} ${y2}`;

  return (
    <g>
      <motion.path
        d={d}
        fill="none"
        stroke="#C9D8FF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeDasharray="4 6"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 1, 1, 0.6] }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut", times: [0, 0.5, 0.85, 1] }}
      />
      {/* brief brighten while the packet travels */}
      <motion.path
        d={d}
        fill="none"
        stroke="#2563FF"
        strokeWidth={2}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
        transition={{ duration: 0.65, ease: "easeInOut" }}
      />

      <motion.circle
        cx={x1}
        cy={y1}
        r={3.5}
        fill="#2563FF"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: [0.5, 1.6, 1] }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
      />
      <motion.circle
        cx={x2}
        cy={y2}
        r={3.5}
        fill="#2563FF"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: [0.5, 1.6, 1] }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, delay: 0.5 }}
      />

      <circle r={4.5} fill="#2563FF" id={`dot-${id}`} style={{ filter: "drop-shadow(0 0 3px #2563FF)" }}>
        <animateMotion dur="0.6s" fill="freeze" path={d} />
      </circle>
    </g>
  );
}
