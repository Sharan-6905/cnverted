"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { HeroDots } from "./hero-dots";

/** Scroll (in screen heights) over which the photo card opens to full-bleed and the window rises into place. */
const OPEN = 0.96;
/** Extra pinned scroll after it's fully open, before the section lets go (screen heights). */
const HOLD = 0.2;
/** The outer rounded inset closes a little sooner than the card's own (at OPEN / 1.2). */
const PANEL_RATE = 1.2;

const clamp = (v: number) => Math.max(0, Math.min(1, v));

/**
 * The hero and the app window share one pinned screen, the same scroll-linked reveal as save.design:
 *
 * - the hero copy sits on top; the night-street photo is clipped to a rounded card just under it
 *   (`inset(top side 0 side round r)`)
 * - as you scroll, the clip opens linearly to full-bleed. The photo itself never moves; the opening clip is what
 *   carries it up the screen
 * - the app window rises from below (translateY + scale 0.82, anchored at its bottom edge) to its resting place on
 *   the same timeline
 * - the copy fades and lifts away in the first ~100px
 *
 * Everything is a pure function of scroll position, so scrolling back reverses it exactly. On narrow screens the
 * card has no side inset (full width from the start).
 */
export function SplashWindow({ hero, children }: { hero: ReactNode; children: ReactNode }) {
  const run = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const win = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = run.current, pn = panel.current, cp = copy.current, cd = card.current, w = win.current;
    if (!el || !pn || !cp || !cd || !w) return;

    let top0 = 400, side0 = 20, panelSide0 = 32, raf = 0;
    const measure = () => {
      const vh = window.innerHeight, narrow = window.innerWidth < 720;
      // the card starts just under the copy (its Book Call button), but always leaves a good slice of photo showing
      const textBottom = (cp.querySelector(".cg-btn") ?? cp).getBoundingClientRect().bottom - pn.getBoundingClientRect().top;
      top0 = Math.round(Math.min(textBottom + 48, vh * 0.66));
      // the dot field runs down to where the card starts; the card covers it as it opens
      pn.style.setProperty("--cg-dots-h", `${top0}px`);
      side0 = narrow ? 0 : 20;
      panelSide0 = narrow ? 0 : 32;
    };
    const paint = () => {
      raf = 0;
      const vh = window.innerHeight;
      const scrolled = Math.max(0, -el.getBoundingClientRect().top);
      const p = clamp(scrolled / (vh * OPEN));
      const q = 1 - p, qp = 1 - clamp(p * PANEL_RATE);

      // save.design clips the panel (rounded, 32px sides) and the card inside it (20px sides) separately; on our white
      // page the panel's clip only shows on the photo, and would crop the headline, so both insets go on the card
      const side = (side0 * q + panelSide0 * qp).toFixed(2);
      cd.style.setProperty("--cg-card-clip", `inset(${(top0 * q).toFixed(2)}px ${side}px 0px ${side}px round ${(12 * qp).toFixed(2)}px)`);
      w.style.transform = p >= 1 ? "none" : `translateY(${(top0 * 0.7 * q).toFixed(2)}px) scale(${(0.82 + 0.18 * p).toFixed(5)})`;

      // the copy is gone within the first ~100px of scroll
      const f = clamp(scrolled / 100);
      cp.style.opacity = (1 - f).toFixed(3);
      cp.style.transform = f ? `translateY(${(-0.305 * Math.min(scrolled, 100)).toFixed(1)}px)` : "none";
      cp.style.pointerEvents = f >= 1 ? "none" : "auto";
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(paint); };
    const onResize = () => { measure(); onScroll(); };

    measure();
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    // fonts swap in after first paint and can move the button; re-measure once they're ready
    document.fonts?.ready.then(onResize).catch(() => {});
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={run} className="cg-splash-run" style={{ height: `calc(100svh + ${(OPEN + HOLD) * 100}svh)` }}>
      <div ref={panel} className="cg-splash-sticky">
        <HeroDots />
        <div ref={copy} className="cg-splash-hero">{hero}</div>
        <div ref={card} className="cg-splash" data-header-tone="dark">
          <div className="cg-splash-photo" aria-hidden="true" />
          <div className="cg-splash-stage">
            {/* the app UI in the window is light; without this the header reads the dark photo through it */}
            <div ref={win} className="cg-splash-win" data-header-tone="light">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
