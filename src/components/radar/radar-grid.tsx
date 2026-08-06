"use client";

import { memo } from "react";

interface RadarGridProps {
  size: number;
}

function RadarGridBase({ size }: RadarGridProps) {
  const c = size / 2;
  const rings = [0.2, 0.4, 0.6, 0.8, 1].map((f) => f * (c - 2));
  const diagOffset = c * Math.SQRT1_2;

  return (
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
  );
}

export const RadarGrid = memo(RadarGridBase);
