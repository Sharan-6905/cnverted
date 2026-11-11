"use client";

import { useEffect, useRef } from "react";

/**
 * Page-wide dot grid for the empty side margins: the same 14px dot field as the hero used to have and User Stories'
 * world map, in the paper grey, faded out towards the content column so it never sits behind copy. Sections with
 * their own background (the splash, Orka, the footer) simply cover it.
 *
 * A second, accent-coloured copy of the grid shows only in a soft circle around the mouse, so the margins light up
 * a little as you move through them. Pure CSS layers (styles in home.css); this only feeds the pointer position in
 * page coordinates. Mouse only; nothing moves on its own, so there's nothing to turn off for reduced motion.
 */
export function PageDots() {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el || !window.matchMedia?.("(pointer: fine)").matches) return;
    let raf = 0, x = 0, y = 0;
    const apply = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--px", `${(x - r.left).toFixed(0)}px`);
      el.style.setProperty("--py", `${(y - r.top).toFixed(0)}px`);
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX; y = e.clientY;
      el.classList.add("is-lit");
      if (!raf) raf = requestAnimationFrame(apply);
    };
    // keep the glow under a still pointer while the page scrolls
    const scroll = () => { if (!raf && el.classList.contains("is-lit")) raf = requestAnimationFrame(apply); };
    const leave = () => el.classList.remove("is-lit");
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <div ref={box} className="cg-page-dots" aria-hidden="true"><i /></div>;
}
