"use client";

import { useEffect, useRef } from "react";
import { createDotGlow, type GlowDot } from "./dot-glow";

const GAP = 14;

/**
 * Fills the hero's empty space with the User Stories dot field and its colour splash. Dots fade out behind the
 * headline (left) and towards the bottom edge. The pointer lights them up; with no pointer around, a soft splash
 * wanders across the right side on its own so the field never sits dead (off for reduced motion).
 */
export function HeroDots() {
  const box = useRef<HTMLDivElement>(null);
  const cvRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = box.current, cv = cvRef.current;
    if (!el || !cv) return;
    const reduce = !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let glow: ReturnType<typeof createDotGlow> | null = null, W = 0, H = 0, pointerAt = 0, t0 = performance.now(), wander = 0;
    const smooth = (a: number, b: number, v: number) => { const t = Math.max(0, Math.min(1, (v - a) / (b - a))); return t * t * (3 - 2 * t); };

    const build = () => {
      W = el.clientWidth; H = el.clientHeight;
      if (!W || !H) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      const narrow = W < 900;
      const dots: GlowDot[] = [];
      for (let y = GAP / 2; y < H; y += GAP) for (let x = GAP / 2; x < W; x += GAP) {
        // quiet behind the copy on the left, full on the right, fading out at the bottom
        const side = narrow ? 0.35 : 0.12 + 0.88 * smooth(W * 0.42, W * 0.78, x);
        const a = side * (1 - smooth(H * 0.7, H, y)) * smooth(0, H * 0.18, y);
        if (a > 0.04) dots.push({ x, y, a });
      }
      glow?.stop();
      glow = createDotGlow(cv, dots, { w: W, h: H, radius: 96, dpr, base: "#cbc7bd", dotR: 1.8 });
      glow.draw();
    };
    build();
    const ro = new ResizeObserver(build);
    ro.observe(el);

    // the pointer anywhere over the hero (the dots sit behind the copy, so listen on the section)
    const host = el.parentElement ?? el;
    const move = (e: PointerEvent) => { const r = el.getBoundingClientRect(); pointerAt = performance.now(); glow?.set({ x: e.clientX - r.left, y: e.clientY - r.top }); };
    const leave = () => { glow?.set(null); pointerAt = 0; };
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);

    // idle wander: a slow figure-eight over the right half, only while nobody is pointing and the hero is on screen
    let vis = true;
    const io = new IntersectionObserver((es) => { vis = es[es.length - 1].isIntersecting; });
    io.observe(el);
    const step = () => {
      if (vis && glow && performance.now() - pointerAt > 2500) {
        const t = (performance.now() - t0) / 1000;
        glow.set({ x: W * (0.74 + 0.18 * Math.sin(t * 0.35)), y: H * (0.45 + 0.25 * Math.sin(t * 0.7)) });
      }
      wander = requestAnimationFrame(step); // every frame, so the idle splash glides
    };
    if (!reduce) wander = requestAnimationFrame(step);

    return () => { ro.disconnect(); io.disconnect(); cancelAnimationFrame(wander); glow?.stop(); host.removeEventListener("pointermove", move); host.removeEventListener("pointerleave", leave); t0 = 0; };
  }, []);

  return <div ref={box} className="cg-hero-dots" aria-hidden="true"><canvas ref={cvRef} /></div>;
}
