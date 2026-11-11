"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { OrkaPeek } from "./Orka";

const PIN = 700;
const LEAD = "You can’t build ";
const REST = "a business on crossed fingers.";

/** "You can't build a business on crossed fingers." holds still in the middle of the screen while you scroll,
 *  and the grey half fills in black letter by letter; then the page moves on. */
export function CrossedFingers() {
  const runway = useRef<HTMLElement>(null);
  const sticky = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(0);
  const [h, setH] = useState(0);
  const [p, setP] = useState(0);

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

  const filled = p * REST.length;
  return (
    <section ref={runway} className="cg-crossed" aria-labelledby="cg-crossed-title" style={{ height: h ? h + PIN : undefined }}>
      <div ref={sticky} className="cg-crossed-sticky cg-wrap" style={{ top }}>
        <OrkaPeek width={184} align="center" orkaProps={{ mood: p >= 1 ? "curious" : "sleepy", title: "Orka peeking over the line" }}>
          <span className="cg-crossed-line" />
        </OrkaPeek>
        <h2 id="cg-crossed-title" aria-label={LEAD + REST}>
          <span aria-hidden="true">{LEAD}</span>
          {REST.split("").map((ch, i) => (
            <span key={i} aria-hidden="true" className="cg-fill-ch" style={{ color: i < filled ? "#000" : "#cecece" }}>{ch}</span>
          ))}
        </h2>
      </div>
    </section>
  );
}
