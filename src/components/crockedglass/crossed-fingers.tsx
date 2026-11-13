"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ORKA_LEDGE_RATIO } from "./Orka";
import { useOrkaSlot } from "./orka-travel";
import { prefersReducedMotion, useEased } from "./hooks";

/** Scroll distances (px) while the line is pinned: fill the grey half, hold it under Orka, then snap it to dust. */
const FILL = 700, HOLD = 420, SNAP = 760;
const PIN = FILL + HOLD + SNAP;
const TEXT = "You can’t build a business on crossed fingers.";
const LEAD = "You can’t build ".length; // the black half; the rest fills in
/** grey (#cecece) to black as a letter's share of the fill goes 0 → 1, so letters fade in rather than flip */
const ink = (k: number) => { const g = Math.round(206 * (1 - Math.max(0, Math.min(1, k)))); return `rgb(${g},${g},${g})`; };
const clamp = (v: number) => Math.max(0, Math.min(1, v));

/* ---------- the snap: each letter crumbles into dust that drifts up and to the right ---------- */

const PAD = 220;    // room around the heading for the dust to drift into
const GRAIN = 2;    // dust speck size (css px); letters are sampled on this grid so the specks rebuild the letter
const DRIFT = 0.32; // share of the snap one speck takes to blow away

type Dust = { x: Float32Array; y: Float32Array; dx: Float32Array; dy: Float32Array; wob: Float32Array; from: Float32Array; at: Float32Array; n: number };

/** Seeded so the snap plays the same way every time you scroll back and forth over it. */
function rng(seed: number) { return () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; }; }

/** When each letter crumbles: a loose left-to-right sweep. */
function letterStarts(n: number) {
  const r = rng(7);
  return Array.from({ length: n }, (_, i) => 0.5 * (i / Math.max(1, n - 1)) + 0.12 * r());
}

/** Sample every letter's pixels on a GRAIN grid, in `box` coordinates shifted by PAD. */
function buildDust(chars: HTMLElement[], box: DOMRect, starts: number[]): Dust {
  const xs: number[] = [], ys: number[] = [], dxs: number[] = [], dys: number[] = [], wobs: number[] = [], froms: number[] = [], ats: number[] = [];
  const c = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
  const r = rng(11);
  if (c) chars.forEach((el, i) => {
    const ch = el.textContent ?? "";
    if (!ch.trim()) return;
    const R = el.getBoundingClientRect();
    const w = Math.ceil(R.width) + 8, h = Math.ceil(R.height) + 8;
    c.canvas.width = w; c.canvas.height = h;
    c.font = getComputedStyle(el).font;
    c.fillStyle = "#000";
    c.textBaseline = "alphabetic";
    const m = c.measureText(ch);
    c.fillText(ch, 4, 4 + (m.fontBoundingBoxAscent ?? R.height * 0.8));
    const px = c.getImageData(0, 0, w, h).data;
    for (let y = 0; y < h; y += GRAIN) for (let x = 0; x < w; x += GRAIN) {
      if (px[(y * w + x) * 4 + 3] < 110) continue;
      xs.push(R.left - box.left + PAD + x - 4);
      ys.push(R.top - box.top + PAD + y - 4);
      const f = r();
      dxs.push(40 + 150 * f + 40 * r());
      dys.push(-(20 + 110 * f + 30 * r()));
      wobs.push(r() * Math.PI * 2);
      froms.push(starts[i]);
      ats.push(starts[i] + 0.16 * r());
    }
  });
  const F = (a: number[]) => Float32Array.from(a);
  return { x: F(xs), y: F(ys), dx: F(dxs), dy: F(dys), wob: F(wobs), from: F(froms), at: F(ats), n: xs.length };
}

/** "You can't build a business on crossed fingers." holds still in the middle of the screen while you scroll: the
 *  grey half fills in black letter by letter, it holds a beat under Orka, then snaps away into dust. */
export function CrossedFingers() {
  const runway = useRef<HTMLElement>(null);
  const sticky = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const dust = useRef<Dust | null>(null);
  const [starts] = useState(() => letterStarts(TEXT.length));
  const [calm, setCalm] = useState(false);
  const [top, setTop] = useState(0);
  const [h, setH] = useState(0);
  const [p, setP] = useState(0);
  const [s, setS] = useState(0);
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
      const d = top - r.top;
      // fill over the first 85% of FILL (then rest a beat fully black), hold, then snap
      setP(Math.round(clamp(d / (FILL * 0.85)) * 200) / 200);
      setS(Math.round(clamp((d - FILL - HOLD) / SNAP) * 400) / 400);
    };
    read();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read, { passive: true });
    return () => { window.removeEventListener("scroll", read); window.removeEventListener("resize", read); };
  }, [top]);

  // sample the letters into dust once fonts are in, and again whenever the heading reflows
  useEffect(() => {
    setCalm(prefersReducedMotion());
    const t = title.current, st = sticky.current;
    if (!t || !st) return;
    let alive = true;
    const build = () => {
      if (alive) dust.current = buildDust(Array.from(t.querySelectorAll<HTMLElement>(".cg-fill-ch")), st.getBoundingClientRect(), starts);
    };
    const ro = new ResizeObserver(() => { document.fonts ? document.fonts.ready.then(build) : build(); });
    ro.observe(t);
    return () => { alive = false; ro.disconnect(); };
  }, [starts]);

  const eased = useEased(p, 0.14);
  const snap = useEased(s, 0.16);

  // draw the dust for the current snap progress
  useEffect(() => {
    const cv = canvas.current, st = sticky.current, D = dust.current;
    if (!cv || !st || calm) return;
    const W = st.offsetWidth + PAD * 2, H = st.offsetHeight + PAD * 2, dpr = window.devicePixelRatio || 1;
    if (cv.width !== Math.round(W * dpr) || cv.height !== Math.round(H * dpr)) {
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      cv.style.width = `${W}px`; cv.style.height = `${H}px`;
    }
    const c = cv.getContext("2d");
    if (!c) return;
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.clearRect(0, 0, W, H);
    if (!D || snap <= 0 || snap >= 1) return;
    c.fillStyle = "#000";
    for (let i = 0; i < D.n; i++) {
      if (snap < D.from[i]) continue; // its letter is still whole
      const k = clamp((snap - D.at[i]) / DRIFT);
      if (k >= 1) continue; // already blown away
      const e = k * k; // a slow start, then the wind takes it
      c.globalAlpha = 1 - k;
      c.fillRect(D.x[i] + D.dx[i] * e + Math.sin(D.wob[i] + k * 6) * 6 * k, D.y[i] + D.dy[i] * e, GRAIN, GRAIN);
    }
    c.globalAlpha = 1;
  }, [snap, calm]);

  const filled = eased * (TEXT.length - LEAD);
  return (
    <section ref={runway} className="cg-crossed" aria-labelledby="cg-crossed-title" style={{ height: h ? h + PIN : undefined, overflowX: "clip" }}>
      <div ref={sticky} className="cg-crossed-sticky cg-wrap" style={{ top }}>
        {/* Orka's spot over the line: the cat itself is the shared one from <OrkaTravel>, which docks in "Hi! I'm Orka" */}
        <div style={{ position: "relative" }}>
          <span className="cg-crossed-line" style={{ visibility: "hidden" }} /> {/* keeps the spacing; the bar itself travels with Orka */}
          <div ref={catSlot} aria-hidden="true" style={{ position: "absolute", top: 0, left: "50%", width: 184, marginLeft: -92, aspectRatio: "2 / 1", transform: `translateY(-${ORKA_LEDGE_RATIO * 100}%)` }} />
        </div>
        <h2 ref={title} id="cg-crossed-title" aria-label={TEXT}>
          {TEXT.split("").map((ch, i) => {
            // a letter goes the moment it starts to crumble: its dust is drawn exactly where it stood
            const gone = calm ? clamp((snap - starts[i]) / 0.2) : snap > 0 && snap >= starts[i] ? 1 : 0;
            return <span key={i} aria-hidden="true" className="cg-fill-ch" style={{ color: i < LEAD ? undefined : ink(filled - (i - LEAD)), opacity: 1 - gone }}>{ch}</span>;
          })}
        </h2>
        <canvas ref={canvas} aria-hidden="true" style={{ position: "absolute", left: -PAD, top: -PAD, pointerEvents: "none" }} />
      </div>
    </section>
  );
}
