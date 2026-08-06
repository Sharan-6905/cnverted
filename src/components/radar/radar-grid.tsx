"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";

interface RadarGridProps {
  size: number;
}

// Deterministic pseudo-random particle field so SSR and client render the
// same positions (avoids a hydration mismatch from Math.random()).
function seededParticles(count: number) {
  let seed = 42;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: 10 + rand() * 80,
    top: 10 + rand() * 80,
    size: 1 + rand() * 2,
    duration: 6 + rand() * 6,
    delay: rand() * 4,
  }));
}

const PARTICLES = seededParticles(13);

function RadarGridBase({ size }: RadarGridProps) {
  const c = size / 2;
  const rings = [0.2, 0.4, 0.6, 0.8, 1].map((f) => f * (c - 2));
  const diagOffset = c * Math.SQRT1_2;

  const glow = useMemo(
    () => (
      <div
        className="absolute -inset-10 -z-10 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(59,120,255,0.35) 0%, rgba(59,120,255,0.12) 45%, transparent 75%)",
          filter: "blur(30px)",
        }}
        aria-hidden="true"
      />
    ),
    []
  );

  return (
    <motion.div
      className="absolute inset-0"
      animate={{ scale: [1, 1.015, 1] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      {glow}

      {/* Core radar — geometry untouched. */}
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0"
      >
        <defs>
          <radialGradient id="radar-fill" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#7EB6FF" />
            <stop offset="35%" stopColor="#3F82FF" />
            <stop offset="75%" stopColor="#1759FF" />
            <stop offset="100%" stopColor="#0A46E4" />
          </radialGradient>
        </defs>

        <circle cx={c} cy={c} r={c - 2} fill="url(#radar-fill)" />
        <circle
          cx={c}
          cy={c}
          r={c - 2}
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth={1.5}
        />

        {rings.map((r) => (
          <circle
            key={r}
            cx={c}
            cy={c}
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth={1}
          />
        ))}

        <line x1={c} y1={2} x2={c} y2={size - 2} stroke="rgba(255,255,255,0.25)" strokeWidth={1} />
        <line x1={2} y1={c} x2={size - 2} y2={c} stroke="rgba(255,255,255,0.25)" strokeWidth={1} />
        <line
          x1={c - diagOffset}
          y1={c - diagOffset}
          x2={c + diagOffset}
          y2={c + diagOffset}
          stroke="rgba(255,255,255,0.25)"
          strokeWidth={1}
        />
        <line
          x1={c - diagOffset}
          y1={c + diagOffset}
          x2={c + diagOffset}
          y2={c - diagOffset}
          stroke="rgba(255,255,255,0.25)"
          strokeWidth={1}
        />
      </svg>

      {/* Very slow outer ring rotation — a faint reference tick. */}
      <motion.svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "50% 50%" }}
      >
        <circle
          cx={c}
          cy={c}
          r={c - 6}
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth={1}
          strokeDasharray="1 7"
        />
      </motion.svg>

      {/* Ambient floating particles. */}
      <div className="absolute inset-0 overflow-hidden rounded-full">
        {PARTICLES.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{ opacity: [0.08, 0.18, 0.08], y: [0, -6, 0] }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export const RadarGrid = memo(RadarGridBase);
