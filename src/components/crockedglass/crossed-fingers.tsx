"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ORKA_LEDGE_RATIO } from "./Orka";
import { useOrkaSlot } from "./orka-travel";
import { useEased } from "./hooks";

const PIN = 700;
const LEAD = "You can’t build ";
const REST = "a business on crossed fingers.";
/** grey (#cecece) to black as a letter's share of the fill goes 0 → 1, so letters fade in rather than flip */
const ink = (k: number) => { const g = Math.round(206 * (1 - Math.max(0, Math.min(1, k)))); return `rgb(${g},${g},${g})`; };

/** "You can't build a business on crossed fingers." holds still in the middle of the screen while you scroll,
 *  and the grey half fills in black letter by letter; then the page moves on. */
export function CrossedFingers() {
  const runway = useRef<HTMLElement>(null);
  const sticky = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(0);
  const [h, setH] = useState(0);
  const [p, setP] = useState(0);
  const catSlot = useOrkaSlot("from", { mood: p >= 1 ? "curious" : "sleepy", title: "Orka peeking over the line" });

  useLayoutEffect(() => {
    const el = sticky.current;
    if (!el) return;
    const measure = () => { const H = el.offsetHeight; setH(H); setTop(Math.max(80, (window.innerHeight - H) / 2)); };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  useEffect(() => {
    const read = () => {
      const r = runway.current?.getBoundingClientRect();
      if (!r) return;
      // fill over the first 85% of the hold, then rest a beat fully black before releasing
      setP(Math.round(Math.max(0, Math.min(1, (top - r.top) / (PIN * 0.85))) * 200) / 200);
    };
    read();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read, { passive: true });
    return () => { window.removeEventListener("scroll", read); window.removeEventListener("resize", read); };
  }, [top]);

  const eased = useEased(p, 0.14);
  const filled = eased * REST.length;
  return (
    <section ref={runway} className="cg-crossed" aria-labelledby="cg-crossed-title" style={{ height: h ? h + PIN : undefined }}>
      <div ref={sticky} className="cg-crossed-sticky cg-wrap" style={{ top }}>
        {/* Orka's spot over the line: the cat itself is the shared one from <OrkaTravel>, which docks in "Hi! I'm Orka" */}
        <div style={{ position: "relative" }}>
          <span className="cg-crossed-line" style={{ visibility: "hidden" }} /> {/* keeps the spacing; the bar itself travels with Orka */}
          <div ref={catSlot} aria-hidden="true" style={{ position: "absolute", top: 0, left: "50%", width: 184, marginLeft: -92, aspectRatio: "2 / 1", transform: `translateY(-${ORKA_LEDGE_RATIO * 100}%)` }} />
        </div>
        <h2 id="cg-crossed-title" aria-label={LEAD + REST}>
          <span aria-hidden="true">{LEAD}</span>
          {REST.split("").map((ch, i) => (
            <span key={i} aria-hidden="true" className="cg-fill-ch" style={{ color: ink(filled - i) }}>{ch}</span>
          ))}
        </h2>
      </div>
    </section>
  );
}
