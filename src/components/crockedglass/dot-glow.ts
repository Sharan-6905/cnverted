/**
 * The "dots with a colour splash" effect from the User Stories map: dots near a point light up, green at the
 * centre and blue at the edge, stay lit for a moment and then fade slowly. Drawn on a canvas in its own
 * coordinate space (w x h); the caller decides where the point is.
 */
export type GlowDot = { x: number; y: number; a?: number; h?: number; peak?: number; t?: number };

const BLUE = [79, 101, 245], GREEN = [16, 185, 129];

export function createDotGlow(cv: HTMLCanvasElement, dots: GlowDot[], opts: {
  w: number; h: number; radius?: number; dpr?: number;
  /** also draw the resting dots (otherwise only the lit ones; the resting ones are drawn elsewhere) */
  base?: string; dotR?: number;
}) {
  const ctx = cv.getContext("2d");
  const R = opts.radius ?? 78, dpr = opts.dpr ?? 2, dotR = opts.dotR ?? 2;
  const HOLD = 1400, FADE = 2600;
  // the glow trails the pointer (eased each frame) instead of snapping to every pointer event
  let target: { x: number; y: number } | null = null, cur: { x: number; y: number } | null = null, raf = 0, last = 0, alive = true;
  if (!ctx) return { set() {}, stop() {}, draw() {} };

  const frame = (now: number) => {
    raf = 0;
    const dt = last ? Math.min(now - last, 64) : 16; last = now;
    if (target) {
      const k = 1 - Math.pow(1 - 0.2, dt / 16.7);
      cur = cur ? { x: cur.x + (target.x - cur.x) * k, y: cur.y + (target.y - cur.y) * k } : { ...target };
    } else cur = null;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, opts.w, opts.h);
    let live = false;
    for (const p of dots) {
      if (opts.base) {
        ctx.globalAlpha = p.a ?? 1;
        ctx.fillStyle = opts.base;
        ctx.beginPath(); ctx.arc(p.x, p.y, dotR, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 1;
      }
      if (cur) {
        const dist = Math.hypot(p.x - cur.x, p.y - cur.y);
        if (dist < R) {
          let t = 1 - dist / R; t = t * t * (3 - 2 * t);
          if (t >= (p.h ?? 0) - 0.02) { p.h = (p.h ?? 0) + (t - (p.h ?? 0)) * (1 - Math.pow(0.78, dt / 16.7)); p.peak = Math.max(p.peak ?? 0, p.h); p.t = now; }
        }
      }
      const hh = p.h ?? 0;
      if (hh > 0.01) {
        live = true;
        // after the hold, fade out on an ease rather than a straight line
        if (now - (p.t ?? 0) > HOLD) p.h = Math.max(0, hh - Math.max(0.15, hh / (p.peak || 1)) * (p.peak || 1) * dt / FADE);
        const w = Math.min(1, (p.h ?? 0) * 1.25), mix = Math.max(0, ((p.h ?? 0) - 0.35) / 0.65);
        const c = BLUE.map((b, k) => Math.round(b + (GREEN[k] - b) * mix));
        ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${w.toFixed(3)})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, dotR + 1.4 * (p.h ?? 0), 0, Math.PI * 2); ctx.fill();
      } else { p.h = 0; p.peak = 0; }
    }
    if (alive && (live || target)) raf = requestAnimationFrame(frame); else last = 0;
  };
  const kick = () => { if (!raf && alive) raf = requestAnimationFrame(frame); };
  return {
    /** move the glow to a point in canvas space, or null to let it fade */
    set(p: { x: number; y: number } | null) { target = p; kick(); },
    /** redraw once (e.g. after a resize) */
    draw() { kick(); },
    stop() { alive = false; cancelAnimationFrame(raf); },
  };
}
