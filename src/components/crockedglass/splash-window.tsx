"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Extra scroll the section stays pinned for while the window comes in. */
const PIN = 700;

const clamp = (v: number) => Math.max(0, Math.min(1, v));
const smooth = (a: number, b: number, v: number) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };

/**
 * The app window, one screen tall and pinned, over a photo seen through frosted glass. All of it is tied to the
 * scroll, in order: frosted glass, already showing below the hero; the photo unblurs; the screenshot rises in over the
 * sharp photo; the photo blurs back to frosted glass before the section lets go. Scrolling back up reverses it.
 *
 * The unblur steps through three pre-blurred copies of the photo (8, 20, 40px) stacked on the sharp one, plus a
 * milky tint, so each frame only changes opacities (an animated blur or backdrop-filter would repaint the whole
 * screen every frame).
 * Progress is eased toward the scroll position each frame so it glides instead of stepping with the wheel.
 */
export function SplashWindow({ children }: { children: ReactNode }) {
  const run = useRef<HTMLDivElement>(null);
  const blurs = useRef<(HTMLDivElement | null)[]>([]);
  const tint = useRef<HTMLDivElement>(null);
  const win = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = run.current, t = tint.current, w = win.current, layers = blurs.current;
    if (!el || !t || !w || layers.some((l) => !l)) return;
    const reduce = !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let target = 0, shown = 0, raf = 0;
    const paint = (p: number) => {
      // 1. the frosted glass is there from the start: the section tucks up under the hero (see .cg-splash-run), so
      //    its blurred colours already rise from the bottom of the first screen, fading into the page at the top
      // 2. the photo unblurs (0.08-0.36), 4. and blurs again at the end (0.7-0.95)
      const blur = 1 - smooth(0.08, 0.36, p) * (1 - smooth(0.7, 0.95, p));
      // blur 0..1 steps through the pre-blurred copies, each fading in on top of the one below
      const level = blur * layers.length;
      layers.forEach((l, i) => { l!.style.opacity = clamp(level - i).toFixed(3); });
      // the frosted sheen goes with the blur: glassy at both ends, gone while the photo is sharp. Lighter at the
      // start so the blurred photo's colours already show through; milkier at the end as the section hands off
      t.style.opacity = (blur * (p < 0.5 ? 0.4 : 0.85)).toFixed(3);
      // 3. only once the photo is sharp, the screenshot fades and rises in (0.36-0.62)
      const o = smooth(0.36, 0.56, p), z = smooth(0.36, 0.62, p);
      w.style.opacity = o.toFixed(3);
      w.style.transform = `translateY(${((1 - z) * 60).toFixed(1)}px) scale(${(1.1 - 0.1 * z).toFixed(4)})`;
      w.style.visibility = o < 0.002 ? "hidden" : "visible";
    };
    const read = () => {
      const r = el.getBoundingClientRect(), vh = window.innerHeight;
      // starts while the section is still coming up the screen (top at 60% of it), ends as the pin releases
      target = clamp((vh * 0.6 - r.top) / (vh * 0.6 + PIN));
      if (reduce) { shown = target; paint(shown); return; }
      if (!raf) raf = requestAnimationFrame(tick);
    };
    let last = 0;
    const tick = (now: number) => {
      const dt = last ? Math.min(64, now - last) : 16; last = now;
      shown += (target - shown) * (1 - Math.pow(1 - 0.12, dt / 16.7));
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
        <section className="cg-splash">
          <div className="cg-glass" aria-hidden="true">
            <div className="cg-glass-photo" />
            {[0, 1, 2].map((i) => (
              <div key={i} ref={(n) => { blurs.current[i] = n; }} className={`cg-glass-photo cg-glass-blur cg-glass-blur--${i}`} />
            ))}
            <div ref={tint} className="cg-glass-tint" />
          </div>
          <div ref={win} className="cg-splash-win">{children}</div>
        </section>
      </div>
    </div>
  );
}
