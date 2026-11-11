"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { WORLD_DOTS } from "./world-dots";
import { createDotGlow, type GlowDot } from "./dot-glow";
import { ScaleBox } from "./scale-box";
import { useLater } from "./hooks";

const MW = 1184, MH = 434;
// Stories as drawn in the design. Placeholder people: swap in real customers before this goes live.
const STORIES = [
  { n: "Marcus Ellery", ini: "ME", meta: "Head of Product, Layerpoint", city: "Austin", cc: "US", lat: 30.27, lng: -97.74, tone: 3, q: "We set up our ICP in one afternoon. By Friday the AI team had booked calls we did not have to chase." },
  { n: "Ana Ribeiro", ini: "AR", meta: "Head of Growth, Feira", city: "São Paulo", cc: "BR", lat: -23.55, lng: -46.63, tone: 4, q: "Buying signals plus context meant our reps opened with something real. Meetings went up without adding headcount." },
  { n: "Mlevine Good", ini: "MG", meta: "Head of Sales & Marketing", city: "London", cc: "GB", lat: 51.51, lng: -0.13, tone: 1, q: "Contextual leads really help me connect better with clients. I can't wait to see more updates in Cnvrted!" },
  { n: "Tom Becker", ini: "TB", meta: "Founder, PulseCore", city: "Berlin", cc: "DE", lat: 52.52, lng: 13.40, tone: 2, q: "The recipes do the research my team used to spend Mondays on. We just approve and send." },
  { n: "Sana Khan", ini: "SK", meta: "Growth Lead, Bloom Skin", city: "Dubai", cc: "AE", lat: 25.20, lng: 55.27, tone: 5, q: "A 31% reply rate on first outreach. The drafts sound like us, and the follow-ups never slip." },
  { n: "Meera Iyer", ini: "MI", meta: "Founder, Tiny Bites", city: "Bengaluru", cc: "IN", lat: 12.97, lng: 77.59, tone: 1, q: "Orka found buyers we would never have searched for. Our first WhatsApp intro turned into a store deal." },
  { n: "Kenji Sato", ini: "KS", meta: "Sales Director, Hikari Labs", city: "Tokyo", cc: "JP", lat: 35.68, lng: 139.69, tone: 3, q: "Orka scans the market overnight. By morning there is a short list worth calling, with the reason for each one." },
];
const xy = (t: { lat: number; lng: number }) => ({ x: (t.lng + 180) / 360 * MW, y: (76 - t.lat) / 132 * MH });
// where a point on the tilted plane lands on screen (rotateX 32deg about the bottom edge, perspective 1000)
const A = 32 * Math.PI / 180, PERSP = 1000, OX = MW / 2, OY = MH / 2;
function toScreen(q: { x: number; y: number }) {
  const dy = q.y - MH, Y = MH + dy * Math.cos(A), Z = dy * Math.sin(A), k = PERSP / (PERSP - Z);
  return { x: OX + (q.x - OX) * k, y: OY + (Y - OY) * k, s: k };
}
function toPlane(sx: number, sy: number) {
  const c = Math.cos(A), sn = Math.sin(A), u = sy - OY, Aa = MH - OY;
  const dy = (u * PERSP - PERSP * Aa) / (PERSP * c + u * sn), k = PERSP / (PERSP - dy * sn);
  return { x: OX + (sx - OX) / k, y: MH + dy };
}
const DOT_PATH = (() => { let d = ""; for (let i = 0; i < WORLD_DOTS.length; i += 2) d += `M${WORLD_DOTS[i]} ${WORLD_DOTS[i + 1]}h0`; return d; })();

/** User Stories: a dotted world map that tilts up into view, with a pin per customer story. The stories rotate
 *  on their own (hovering holds one); click a pin to read it. Hovering the map makes the dots glow. */
export function UserStories() {
  const map = useRef<HTMLDivElement>(null);
  const heat = useRef<HTMLCanvasElement>(null);
  const [i, setI] = useState(0);
  const [fade, setFade] = useState(false);
  const [inView, setInView] = useState(false);
  const [showBub, setShowBub] = useState(false);
  const hoverRef = useRef(false);
  const iRef = useRef(0);
  iRef.current = i;
  const later = useLater();
  const dots = useMemo<GlowDot[]>(() => { const o: GlowDot[] = []; for (let k = 0; k < WORLD_DOTS.length; k += 2) o.push({ x: WORLD_DOTS[k], y: WORLD_DOTS[k + 1] }); return o; }, []);

  const show = (n: number) => {
    if (iRef.current === n) return;
    setFade(true);
    later(() => { setI(n); setFade(false); }, 280);
  };

  useEffect(() => {
    const tick = () => later(() => { if (!hoverRef.current) show((iRef.current + 1) % STORIES.length); tick(); }, 4800);
    tick();
    const el = map.current;
    if (!el) return;
    const io = new IntersectionObserver((en) => {
      if (en[en.length - 1].isIntersecting) { setInView(true); later(() => setShowBub(true), 1700); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [later]);

  useEffect(() => {
    const el = map.current, cv = heat.current;
    if (!el || !cv || !inView) return;
    const glow = createDotGlow(cv, dots, { w: MW, h: MH, radius: 78, dpr: 2 });
    const move = (e: PointerEvent) => { const r = el.getBoundingClientRect(); glow.set(toPlane((e.clientX - r.left) * MW / r.width, (e.clientY - r.top) * MH / r.height)); };
    const leave = () => glow.set(null);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => { glow.stop(); el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
  }, [inView, dots]);

  const it = STORIES[i], pt = toScreen(xy(it)), W = 300;
  const left = Math.max(0, Math.min(MW - W, pt.x - W / 2));
  const above = pt.y > 200, off = 34 * pt.s + 8, hide = fade || !(inView && showBub);
  const bubStyle: React.CSSProperties = above
    ? { left, top: pt.y - off, transform: `translateY(calc(-100% + ${hide ? 8 : 0}px))` }
    : { left, top: pt.y + off, transform: `translateY(${hide ? -8 : 0}px)` };

  return (
    <section className="cg-wrap cg-us" aria-labelledby="cg-us-title">
      <div className="cg-head">
        <h2 id="cg-us-title" className="cg-h2">User stories</h2>
        <p className="cg-lede">What teams say after a few weeks of letting Orka find, reach and book for them.</p>
      </div>
      <ScaleBox width={MW} height={MH} className="cg-us-box">
        <div ref={map} className="cg-us-map" onPointerOver={(e) => { if ((e.target as Element).closest(".cg-us-bub, [data-us-pin]")) hoverRef.current = true; }}
          onPointerOut={(e) => { if ((e.target as Element).closest(".cg-us-bub, [data-us-pin]")) hoverRef.current = false; }}>
          <div className={`cg-us-plane${inView ? " in" : ""}`}>
            <svg className="cg-us-dots" width={MW} height={MH} viewBox={`0 0 ${MW} ${MH}`} aria-hidden="true">
              <path d={DOT_PATH} stroke="#cbc7bd" strokeWidth="4" strokeLinecap="round" fill="none" />
            </svg>
            <canvas ref={heat} className="cg-us-heat" width={MW * 2} height={MH * 2} aria-hidden="true" />
            {STORIES.map((t, k) => {
              const q = xy(t);
              return (
                <button key={t.n} type="button" data-us-pin={k} className={`cg-us-pin cg-us-tone-${t.tone}${k === i ? " is-on" : ""}`}
                  aria-label={`Show the story from ${t.n}, ${t.city}`} aria-pressed={k === i} style={{ left: q.x, top: q.y }} onClick={() => show(k)}>
                  <span className="cg-us-ping" aria-hidden="true" /><span className="cg-us-face">{t.ini}</span>
                </button>
              );
            })}
          </div>
          <figure className="cg-us-bub" aria-live="polite" style={{ ...bubStyle, opacity: hide ? 0 : 1, pointerEvents: hide ? "none" : "auto" }}>
            <blockquote>{it.q}</blockquote>
            <figcaption>
              <span><b>{it.n}</b> · {it.meta}</span>
              <span className="cg-us-city">{it.city}, {it.cc}</span>
            </figcaption>
          </figure>
        </div>
      </ScaleBox>
    </section>
  );
}
