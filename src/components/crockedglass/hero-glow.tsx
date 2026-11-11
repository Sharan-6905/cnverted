"use client";

import { useEffect, useRef } from "react";

/**
 * Hero background: soft, blurred colour fields drifting slowly on the right, masked out of the left side so the
 * headline and copy always sit on clean white. Colours are the brand accent plus the ink splash's pink and orange,
 * so the hero hands over to the app window below without a colour jump.
 *
 * The fields lean gently towards the pointer, each by a different amount for a little depth. The page sets
 * --gx/--gy (-1..1) on the container and CSS does the easing; the drift keyframes live on the inner span, so the
 * two transforms never fight. Both are off for reduced motion.
 */
export function HeroGlow() {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    const host = el?.parentElement;
    if (!el || !host || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0, x = 0, y = 0;
    const apply = () => { raf = 0; el.style.setProperty("--gx", x.toFixed(3)); el.style.setProperty("--gy", y.toFixed(3)); };
    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = host.getBoundingClientRect();
      x = ((e.clientX - r.left) / r.width) * 2 - 1;
      y = ((e.clientY - r.top) / r.height) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const leave = () => { x = 0; y = 0; if (!raf) raf = requestAnimationFrame(apply); };
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    return () => { cancelAnimationFrame(raf); host.removeEventListener("pointermove", move); host.removeEventListener("pointerleave", leave); };
  }, []);

  return (
    <div ref={box} className="cg-hero-glow" aria-hidden="true">
      <i className="cg-hero-glow-a"><span /></i>
      <i className="cg-hero-glow-b"><span /></i>
      <i className="cg-hero-glow-c"><span /></i>
    </div>
  );
}
