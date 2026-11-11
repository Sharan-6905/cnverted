"use client";

import { useEffect, useRef, type ComponentType, type ReactNode, type RefAttributes } from "react";
import InkSplashRevealJs from "./InkSplashReveal";

type Handle = { play(): void };
// InkSplashReveal is plain JS; give it the props used here.
const InkSplashReveal = InkSplashRevealJs as unknown as ComponentType<{ children: ReactNode; className?: string; threshold?: number; zoomFrom?: number } & RefAttributes<Handle>>;

/** Extra scroll the section stays pinned for while the window comes in. */
const PIN = 700;

const smooth = (a: number, b: number, v: number) => { const t = Math.max(0, Math.min(1, (v - a) / (b - a))); return t * t * (3 - 2 * t); };

/**
 * The app window, one screen tall and pinned. Nothing shows at first: as you scroll in (from the second wheel
 * notch or so), ink splashes across the screen, then the window rises out of it and settles, all tied to the
 * scroll, and the section lets go. Progress is eased toward the scroll position each frame so it glides
 * instead of stepping with the wheel.
 */
export function SplashWindow({ children }: { children: ReactNode }) {
  const run = useRef<HTMLDivElement>(null);
  const win = useRef<HTMLDivElement>(null);
  const ink = useRef<Handle>(null);

  useEffect(() => {
    const el = run.current, w = win.current;
    if (!el || !w) return;
    const reduce = !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let target = 0, shown = 0, raf = 0, played = false;
    const paint = (p: number) => {
      const o = smooth(0.18, 0.55, p), z = smooth(0.18, 0.8, p);
      w.style.opacity = o.toFixed(3);
      w.style.transform = `translateY(${((1 - z) * 60).toFixed(1)}px) scale(${(1.1 - 0.1 * z).toFixed(4)})`;
      w.style.visibility = o < 0.002 ? "hidden" : "visible";
    };
    const read = () => {
      const r = el.getBoundingClientRect(), vh = window.innerHeight;
      // starts while the section is still coming up the screen (top at 60% of it), ends as the pin releases
      target = Math.max(0, Math.min(1, (vh * 0.6 - r.top) / (vh * 0.6 + PIN)));
      if (!played && target > 0.02) { played = true; ink.current?.play(); }
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
        <InkSplashReveal ref={ink} className="cg-splash" threshold={0.95} zoomFrom={1}>
          <div ref={win} className="cg-splash-win">{children}</div>
        </InkSplashReveal>
      </div>
    </div>
  );
}
