"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * Renders a fixed-size piece of the design (drawn at `width` x `height` px) and scales it down to fit
 * its container on narrow screens. At or above `width` it renders at 1:1.
 */
export function ScaleBox({ width, height, children, className = "", style }: {
  width: number; height: number; children: ReactNode; className?: string; style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => setScale(Math.min(1, el.clientWidth / width));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);
  return (
    <div ref={ref} className={`cg-scale ${className}`} style={{ height: height * scale, ...style }}>
      <div className="cg-scale-in" style={{ width, height, transform: scale === 1 ? undefined : `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}
