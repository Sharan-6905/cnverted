"use client";

import { useEffect, useState } from "react";

interface Segment {
  text: string;
  highlight?: boolean;
}

interface TypingTextProps {
  segments: Segment[];
  active: boolean;
}

export function TypingText({ segments, active }: TypingTextProps) {
  const full = segments.map((s) => s.text).join("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }
    setCount(0);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= full.length) clearInterval(id);
    }, 20);
    return () => clearInterval(id);
  }, [active, full]);

  let consumed = 0;
  return (
    <p className="text-[15px] font-semibold leading-snug" style={{ color: "#202B55" }}>
      {segments.map((seg, i) => {
        const start = consumed;
        consumed += seg.text.length;
        const visible = seg.text.slice(0, Math.max(0, Math.min(seg.text.length, count - start)));
        return (
          <span key={i} style={seg.highlight ? { color: "#2563FF" } : undefined}>
            {visible}
          </span>
        );
      })}
    </p>
  );
}
