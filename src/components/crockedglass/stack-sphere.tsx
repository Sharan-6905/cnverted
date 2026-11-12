"use client";

import { useEffect, useRef } from "react";

const LOGOS: [string, string][] = [
  ["HubSpot", "/crockedglass/logo-hubspot.png"], ["LinkedIn", "/crockedglass/logo-linkedin.png"],
  ["Google Ads", "/crockedglass/logo-google-ads.png"], ["HeyReach", "/crockedglass/logo-heyreach.png"],
  ["Salesforce", "/crockedglass/logo-salesforce.png"], ["Google Analytics", "/crockedglass/logo-google-analytics.png"],
  ["Pipedrive", "/crockedglass/logo-pipedrive.png"],
];
type P3 = [number, number, number];
const fib = (n: number): P3[] => {
  const g = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: n }, (_, i) => { const y = 1 - (i + 0.5) * 2 / n, r = Math.sqrt(1 - y * y), th = g * i; return [Math.cos(th) * r, y, Math.sin(th) * r]; });
};
const DOTS = fib(300);
const LOGO_PTS = fib(28).map((p, i) => ({ p, name: LOGOS[i % 7][0], src: LOGOS[i % 7][1] }));

// big globe anchored bottom-right, cropped by the card edge
function project(p: P3, rx: number, ry: number) {
  const CX = 300, CY = 300, R = 230;
  const [x, y, z] = p;
  const cy = Math.cos(ry), sy = Math.sin(ry), cx = Math.cos(rx), sx = Math.sin(rx);
  const x1 = x * cy + z * sy, z1 = -x * sy + z * cy;
  const y1 = y * cx - z1 * sx, z2 = y * sx + z1 * cx;
  const s = 0.72 + 0.28 * (z2 + 1) / 2;
  return { tf: `translate(${(CX + x1 * R).toFixed(1)}px, ${(CY + y1 * R).toFixed(1)}px) scale(${s.toFixed(3)})`, d: (z2 + 1) / 2 };
}

/** "Works with your whole stack": a dotted globe carrying the integration logos. Spins on its own; drag to spin it. */
export function StackSphere() {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const nodes = Array.from(el.querySelectorAll<HTMLElement>("[data-i]"));
    const pts = nodes.map((n) => { const i = +n.dataset.i!; const logo = n.dataset.logo === "1"; return { n, logo, p: logo ? LOGO_PTS[i].p : DOTS[i] }; });
    let rx = -0.35, ry = 0.4, vx = 0, vy = 0.0016, raf = 0, vis = true;
    let drag: { x: number; y: number } | null = null;
    const reduce = !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const draw = () => {
      for (const q of pts) {
        const pr = project(q.p, rx, ry), s = q.n.style;
        s.transform = pr.tf;
        s.opacity = (q.logo ? 0.3 + 0.7 * pr.d : 0.18 + 0.62 * pr.d).toFixed(2);
        s.zIndex = String(Math.round(pr.d * 100));
      }
    };
    const frame = () => {
      raf = 0;
      if (!drag) {
        vy += (0.0016 - vy) * 0.015; vx += (0 - vx) * 0.04;
        ry += reduce ? 0 : vy; rx = Math.max(-1.2, Math.min(1.2, rx + vx));
      }
      draw();
      if (vis) raf = requestAnimationFrame(frame);
    };
    const down = (e: PointerEvent) => { drag = { x: e.clientX, y: e.clientY }; el.style.cursor = "grabbing"; el.setPointerCapture?.(e.pointerId); };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      drag = { x: e.clientX, y: e.clientY };
      vy = dx * 0.005; vx = -dy * 0.005;
      ry += vy; rx = Math.max(-1.2, Math.min(1.2, rx + vx));
    };
    const up = () => { drag = null; el.style.cursor = ""; };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    const io = new IntersectionObserver((es) => { vis = es[es.length - 1].isIntersecting; if (vis && !raf) raf = requestAnimationFrame(frame); });
    io.observe(el);
    draw();
    return () => {
      vis = false; cancelAnimationFrame(raf); io.disconnect();
      el.removeEventListener("pointerdown", down); el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up); el.removeEventListener("pointercancel", up);
    };
  }, []);

  return (
    <article className="cg-card cg-card--line">
      <h3>Works with your whole stack</h3>
      <div ref={box} className="cg-sph" title="Drag to spin">
        {DOTS.map((_, i) => <span key={`d${i}`} data-i={i} className="cg-sph-pt cg-sph-dot" />)}
        {LOGO_PTS.map((l, i) => (
          <span key={`l${i}`} data-i={i} data-logo="1" className="cg-sph-pt cg-sph-logo">
            <img src={l.src} alt={i < 7 ? l.name : ""} loading="lazy" decoding="async" draggable={false} />
          </span>
        ))}
      </div>
    </article>
  );
}
