"use client";

import { useEffect } from "react";

/** How fast a card's gradient gets up to speed when the pointer arrives, and how long it keeps coasting after the
 *  pointer leaves (seconds to cover ~95% of the change). */
const SPIN_UP = 0.35, COAST = 2.4;

/**
 * Drives the pricing cards' gradient drift (the `pricing-art-drift` CSS animation in pricing.css). Hover or focus a
 * card and its animation speeds up to full; leave and it slows down over a couple of seconds and comes to rest where
 * it is, instead of stopping dead. The CSS keeps the animation paused, so without this nothing moves; with reduced
 * motion the CSS removes the animation and there is nothing to drive.
 */
export function PricingCardMotion() {
  useEffect(() => {
    const cards = [...document.querySelectorAll<HTMLElement>(".pricing-plan")];
    const state = cards.flatMap((card) => {
      const art = card.querySelector<HTMLElement>(".pricing-plan-art");
      const anim = art?.getAnimations()[0];
      if (!anim) return [];
      anim.playbackRate = 0;
      anim.play();   // runs from here on; speed is all playbackRate
      return [{ card, anim, rate: 0, target: 0 }];
    });
    if (!state.length) return;

    let raf = 0, last = 0;
    const tick = (now: number) => {
      raf = 0;
      const dt = last ? Math.min((now - last) / 1000, 0.1) : 1 / 60;
      last = now;
      let moving = false;
      for (const s of state) {
        const tau = (s.target > s.rate ? SPIN_UP : COAST) / 3;
        s.rate += (s.target - s.rate) * (1 - Math.exp(-dt / tau));
        if (Math.abs(s.target - s.rate) < 0.005) s.rate = s.target;
        s.anim.playbackRate = s.rate;
        if (s.rate !== s.target) moving = true;
      }
      if (moving) raf = requestAnimationFrame(tick);
      else last = 0;
    };
    const set = (s: (typeof state)[number], target: number) => {
      s.target = target;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const offs = state.flatMap((s) => {
      const on = () => set(s, 1);
      const off = () => { if (!s.card.matches(":hover, :focus-within")) set(s, 0); };
      const blur = () => requestAnimationFrame(off);   // focus may be moving to another element in the same card
      s.card.addEventListener("pointerenter", on);
      s.card.addEventListener("pointerleave", off);
      s.card.addEventListener("focusin", on);
      s.card.addEventListener("focusout", blur);
      return [() => {
        s.card.removeEventListener("pointerenter", on);
        s.card.removeEventListener("pointerleave", off);
        s.card.removeEventListener("focusin", on);
        s.card.removeEventListener("focusout", blur);
      }];
    });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      offs.forEach((f) => f());
    };
  }, []);

  return null;
}
