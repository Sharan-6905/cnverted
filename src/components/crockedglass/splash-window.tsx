"use client";

import { useEffect, useRef, type ComponentType, type ReactNode, type RefAttributes } from "react";
import InkSplashRevealJs from "./InkSplashReveal";

type Handle = { play(): void; reverse(): void };
// InkSplashReveal is plain JS; give it the props used here.
const InkSplashReveal = InkSplashRevealJs as unknown as ComponentType<{ children: ReactNode; className?: string; threshold?: number; zoomFrom?: number; dither?: number; grain?: number; close?: number; grid?: number; orange?: number; pink?: number; colors?: { blue?: string; orange?: string; pink?: string } } & RefAttributes<Handle>>;

const PALETTE = { blue: "#1E1B4B", orange: "#6366F1", pink: "#C7D2FE" };

/** Extra scroll the section stays pinned for while the window comes in. */
const PIN = 700;

const smooth = (a: number, b: number, v: number) => { const t = Math.max(0, Math.min(1, (v - a) / (b - a))); return t * t * (3 - 2 * t); };

/**
 * The app window, one screen tall and pinned. Nothing shows at first: as you scroll in (from the second wheel
 * notch or so), ink splashes across the screen, then the window rises out of it and settles, all tied to the
 * scroll, and the section lets go. Scrolling back up runs it all in reverse. The ink is drawn smooth (no
 * stipple). Progress is eased toward the scroll position each frame so it glides instead of stepping with the wheel.
 */
export function SplashWindow({ children }: { children: ReactNode }) {
  const run = useRef<HTMLDivElement>(null);
  const win = useRef<HTMLDivElement>(null);
  const glass = useRef<HTMLDivElement>(null);
  const ink = useRef<Handle>(null);

  useEffect(() => {
    const el = run.current, w = win.current, g = glass.current;
    if (!el || !w || !g) return;
    const reduce = !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let target = 0, shown = 0, raf = 0, played = false;
    const paint = (p: number) => {
      const o = smooth(0.18, 0.55, p), z = smooth(0.18, 0.8, p);
      w.style.opacity = o.toFixed(3);
      w.style.transform = `translateY(${((1 - z) * 60).toFixed(1)}px) scale(${(1.1 - 0.1 * z).toFixed(4)})`;
      w.style.visibility = o < 0.002 ? "hidden" : "visible";
      // the glass frosts over the ink a moment before the window lands on it
      const go = smooth(0.12, 0.45, p);
      g.style.opacity = go.toFixed(3);
      g.style.transform = `scale(${(1.04 - 0.04 * go).toFixed(4)})`;
      g.style.visibility = go < 0.002 ? "hidden" : "visible";
    };
    const read = () => {
      const r = el.getBoundingClientRect(), vh = window.innerHeight;
      // starts while the section is still coming up the screen (top at 60% of it), ends as the pin releases
      target = Math.max(0, Math.min(1, (vh * 0.6 - r.top) / (vh * 0.6 + PIN)));
      // ink runs forward as you scroll in, and draws back in if you scroll back up above where it started
      if (!played && target > 0.02) { played = true; ink.current?.play(); }
      else if (played && target <= 0.005) { played = false; ink.current?.reverse(); }
      if (reduce) { shown = target; paint(shown); return; }
      if (!raf) raf = requestAnimationFrame(tick);
    };
    let last = 0;
    const tick = (now: number) => {
      const dt = last ? Math.min(64, now - last) : 16; last = now;
      shown += (target - shown) * (1 - Math.pow(1 - 0.14, dt / 16.7));
      if (Math.abs(target - shown) < 0.0005) shown = target;
      paint(shown);
      raf = shown !== target ? requestAnimationFrame(tick) : (last = 0, 0);
    };
    paint(0);
    read();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", read); window.removeEventListener("resize", read); };
  }, []);

  return (
    <div ref={run} className="cg-splash-run" style={{ height: `calc(100svh + ${PIN}px)` }}>
      <div className="cg-splash-sticky">
        {/* threshold 0.95: the component's own trigger is only a late fallback; the scroll above starts it */}
        <InkSplashReveal ref={ink} className="cg-splash" threshold={0.95} zoomFrom={1} dither={0} grain={1} close={0.9} grid={176}
          // the engine's three inks (named blue / orange / pink) carry this palette: a deep indigo base, with
          // violet and soft lavender running through it
          colors={PALETTE} orange={0.42} pink={0.3}>
          {/* frosted glass behind the window, much larger than it: the ink shows round the edges and softly through
              it, but no longer competes with the screenshot. A sibling of the window, not inside it, because the
              window's fade (opacity) would stop anything inside it from blurring what's behind. */}
          <div ref={glass} className="cg-splash-glass" aria-hidden="true" />
          <div ref={win} className="cg-splash-win">{children}</div>
        </InkSplashReveal>
      </div>
    </div>
  );
}
