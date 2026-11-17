"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";

const A = "/figma/not-found/v2";

/*
 * Figma 404 hero art (Cnvrted_Design 7662:56906), drawn in a 614×324 box. The two 4s stay put; the 0 + cat
 * (Group 1437254438) floats. The strings are drawn live from a fixed point on a 4 to a knot on the 0, so they
 * stay tied while the 0 moves: each sags under its own slack and swings a little behind the 0 (a damped spring).
 * The digits are frosted glass: a blurred backdrop clipped to the glyph, a faint fill and a thin rim.
 */

type Pt = { x: number; y: number };
// Endpoints from the Figma string groups (7662:56913 / 7662:56917), in this box's coordinates.
const STRINGS: { anchor: Pt; knot: Pt; slack: number }[] = [
  { anchor: { x: 145.3, y: 249.0 }, knot: { x: 218.8, y: 97.5 }, slack: 1.025 },
  { anchor: { x: 172.8, y: 275.0 }, knot: { x: 226.8, y: 170.0 }, slack: 1.025 },
  { anchor: { x: 149.3, y: 100.5 }, knot: { x: 220.3, y: 94.3 }, slack: 1.03 },
  { anchor: { x: 468.9, y: 249.5 }, knot: { x: 395.9, y: 98.5 }, slack: 1.025 },
  { anchor: { x: 442.4, y: 276.0 }, knot: { x: 388.4, y: 171.0 }, slack: 1.025 },
  { anchor: { x: 531.9, y: 99.0 }, knot: { x: 395.9, y: 95.2 }, slack: 1.03 },
];
const ZERO_CENTER = { x: 220 + 178.717 / 2, y: 234.311 / 2 };
const REST_LEN = STRINGS.map(s => Math.hypot(s.knot.x - s.anchor.x, s.knot.y - s.anchor.y) * s.slack);

function glass(mask: string): CSSProperties {
  return {
    WebkitMaskImage: `url(${mask})`,
    maskImage: `url(${mask})`,
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
  };
}

export function NotFoundPageArtwork() {
  const zero = useRef<HTMLDivElement>(null);
  const paths = useRef<(SVGPathElement | null)[]>([]);
  const grads = useRef<(SVGLinearGradientElement | null)[]>([]);
  const knots = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Per-string swing (offset along the sag direction) with velocity, for a little lag behind the 0.
    const swing = STRINGS.map(() => ({ v: 0, x: 0 }));
    let frame = 0;
    let last = performance.now();
    // Mouse pull: the 0 leans toward the pointer (capped), eased by a spring so it feels weighty.
    const pull = { tx: 0, ty: 0, x: 0, y: 0, vx: 0, vy: 0 };
    const onMove = (e: PointerEvent) => {
      const el = zero.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const ox = e.clientX - (r.left + r.width / 2);
      const oy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(ox, oy);
      const reach = 420; // px around the 0 where it notices the pointer
      const k = Math.max(0, 1 - dist / reach);
      const scale = el.offsetWidth ? r.width / el.offsetWidth : 1; // screen px -> art px
      pull.tx = (ox / (dist || 1)) * 22 * k / Math.max(scale, 0.5) * Math.min(1, dist / 60);
      pull.ty = (oy / (dist || 1)) * 16 * k / Math.max(scale, 0.5) * Math.min(1, dist / 60);
    };
    const onLeave = () => { pull.tx = 0; pull.ty = 0; };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    const start = last;

    const draw = (dx: number, dy: number, rot: number, dt: number) => {
      const r = (rot * Math.PI) / 180;
      const cos = Math.cos(r);
      const sin = Math.sin(r);
      STRINGS.forEach((s, i) => {
        // The knot rides on the 0: rotate about its centre, then translate.
        const kx0 = s.knot.x - ZERO_CENTER.x;
        const ky0 = s.knot.y - ZERO_CENTER.y;
        const kx = ZERO_CENTER.x + kx0 * cos - ky0 * sin + dx;
        const ky = ZERO_CENTER.y + kx0 * sin + ky0 * cos + dy;
        const ax = s.anchor.x;
        const ay = s.anchor.y;
        const vx = kx - ax;
        const vy = ky - ay;
        const d = Math.hypot(vx, vy);
        // Normal that points down (gravity side); sag shows most on flatter strings.
        let nx = -vy / d;
        let ny = vx / d;
        if (ny < 0) { nx = -nx; ny = -ny; }
        const slackSag = Math.sqrt(Math.max(0, REST_LEN[i] ** 2 - d * d)) * 0.55;
        const target = slackSag * (0.35 + 0.65 * Math.abs(vx) / d);
        // Damped spring towards the resting sag: tightening snaps, loosening drops then settles.
        const w = swing[i];
        w.v += ((target - w.x) * 90 - w.v * 9) * dt;
        w.x += w.v * dt;
        const cx = (ax + kx) / 2 + nx * w.x * 2;
        const cy = (ay + ky) / 2 + ny * w.x * 2;
        paths.current[i]?.setAttribute("d", `M${ax.toFixed(2)} ${ay.toFixed(2)}Q${cx.toFixed(2)} ${cy.toFixed(2)} ${kx.toFixed(2)} ${ky.toFixed(2)}`);
        const g = grads.current[i];
        if (g) {
          g.setAttribute("x1", String(ax)); g.setAttribute("y1", String(ay));
          g.setAttribute("x2", String(kx)); g.setAttribute("y2", String(ky));
        }
        knots.current[i]?.setAttribute("cx", kx.toFixed(2));
        knots.current[i]?.setAttribute("cy", ky.toFixed(2));
      });
    };

    const tick = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      const t = (now - start) / 1000;
      pull.vx += ((pull.tx - pull.x) * 40 - pull.vx * 7) * dt;
      pull.vy += ((pull.ty - pull.y) * 40 - pull.vy * 7) * dt;
      pull.x += pull.vx * dt;
      pull.y += pull.vy * dt;
      const dx = 5 * Math.sin(t * 0.7) + pull.x;
      const dy = 10 * Math.sin(t * 1.1) + pull.y;
      const rot = 1.5 * Math.sin(t * 0.9 + 1) + pull.vx * 0.04;
      if (zero.current)
        zero.current.style.transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg)`;
      draw(dx, dy, rot, dt);
      frame = requestAnimationFrame(tick);
    };

    const run = () => {
      cancelAnimationFrame(frame);
      if (reduced.matches) {
        if (zero.current) zero.current.style.transform = "";
        // settle the strings at rest
        for (let k = 0; k < 120; k++) draw(0, 0, 0, 1 / 60);
        return;
      }
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };
    run();
    reduced.addEventListener("change", run);
    return () => {
      cancelAnimationFrame(frame);
      reduced.removeEventListener("change", run);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="absolute h-[324.21px] left-[388px] top-[122px] w-[614.353px]">
      {/* Fixed 4s: frosted glass */}
      <div className="absolute h-[226.21px] left-0 top-[98px] w-[614.353px]">
        <div className="not-found-glass absolute inset-0" style={glass(`${A}/fours-mask.svg`)} />
        <Image unoptimized alt="" className="absolute block inset-0 max-w-none size-full" src={`${A}/fours-rim.svg`} width={614.353} height={226.21} />
      </div>

      {/* Strings, tied from the 4s to the 0 */}
      <svg className="absolute inset-0 overflow-visible" width="614.353" height="324.21" viewBox="0 0 614.353 324.21" fill="none">
        <defs>
          {STRINGS.map((_, i) => (
            <linearGradient key={i} id={`nf-string-${i}`} gradientUnits="userSpaceOnUse" ref={el => { grads.current[i] = el; }}>
              <stop offset="0" stopColor="#fff" stopOpacity="0.08" />
              <stop offset="0.55" stopColor="#fff" stopOpacity="0.55" />
              <stop offset="1" stopColor="#fff" stopOpacity="0.95" />
            </linearGradient>
          ))}
          <filter id="nf-string-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.2" stdDeviation="0.8" floodColor="#0a1a08" floodOpacity="0.25" />
          </filter>
        </defs>
        <g filter="url(#nf-string-shadow)">
          {STRINGS.map((s, i) => (
            <path
              key={i}
              ref={el => { paths.current[i] = el; }}
              d={`M${s.anchor.x} ${s.anchor.y}L${s.knot.x} ${s.knot.y}`}
              stroke={`url(#nf-string-${i})`}
              strokeWidth="0.9"
              strokeLinecap="round"
            />
          ))}
          {STRINGS.map((s, i) => (
            <circle key={i} ref={el => { knots.current[i] = el; }} cx={s.knot.x} cy={s.knot.y} r="2.4" fill="#fff" fillOpacity="0.95" />
          ))}
        </g>
      </svg>

      {/* Floating 0 + cat (Group 1437254438): the cat sits behind the glass 0 */}
      <div ref={zero} className="absolute h-[234.311px] left-[220px] top-0 w-[178.717px] will-change-transform">
        <div className="absolute h-[47px] left-[63px] top-[171px] w-[52px] opacity-80">
          <Image alt="" fill sizes="104px" className="object-cover pointer-events-none" src={`${A}/cat.png`} />
        </div>
        <div className="not-found-glass absolute inset-0" style={glass(`${A}/zero-mask.svg`)} />
        <Image unoptimized alt="" className="absolute block inset-0 max-w-none size-full" src={`${A}/zero-rim.svg`} width={178.717} height={234.311} />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[66.472px] items-center justify-center left-[91.87px] top-[147.24px] w-[95.739px]">
          <p className="rotate-[-20.55deg] w-[88px] text-center text-white text-[14px] leading-normal" style={{ fontFamily: "'Figma Hand', 'Caveat', 'Comic Sans MS', cursive" }}>
            Who are you?
          </p>
        </div>
      </div>
    </div>
  );
}
