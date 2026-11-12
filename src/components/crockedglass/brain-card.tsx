"use client";

import { useEffect, useRef } from "react";

const BG = "/crockedglass/brain-bg.webp";

type Dot = { x: number; y: number; px: number; py: number; sp: number; sw: number; r: number; c: string; a: number; ab: number;
  vx?: number; vy?: number; tmp?: boolean; c0?: string; mix?: number };

/** "Brain which will learn your business": a liquid glass orb pulling dots in from all round, with a jelly
 *  reaction to the pointer. Some dots start out on the page, past the card's edge, and fly in. */
export function BrainCard() {
  const cardRef = useRef<HTMLElement>(null);
  const cvRef = useRef<HTMLCanvasElement>(null);
  const outRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const card = cardRef.current, cv = cvRef.current;
    const ctx = cv?.getContext("2d");
    if (!card || !cv || !ctx) return;
    const W = 584, H = 481, DPR = cv.width / W, cx = 521, cy = 404, R = 230, N = 72, TAU = Math.PI * 2;
    const reduce = !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const img = new Image(); img.src = BG;
    const off = new Float32Array(N), vel = new Float32Array(N), tgt = new Float32Array(N), pts = Array.from({ length: N }, () => ({ x: 0, y: 0 }));
    const ptr = { x: -999, y: -999, on: false, inside: false, moved: 0 };
    let emit = 0, hov = 0, core = 0, raf = 0, last = 0, vis = true;
    const cols = ["255,255,255", "255,218,190", "214,222,255", "255,240,222", "232,214,255"];
    const pick = (a: string[]) => a[(Math.random() * a.length) | 0];
    const wrap = (a: number) => { a = (a + Math.PI) % TAU; if (a < 0) a += TAU; return a - Math.PI; };
    const spawn = (p: Partial<Dot>, first: boolean): Dot => {
      const a = Math.PI * 0.6 + Math.random() * Math.PI * 1.3;
      const d = first ? 240 + Math.random() * 280 : 380 + Math.random() * 140;
      p.x = cx + Math.cos(a) * d; p.y = cy + Math.sin(a) * d * 0.9; p.px = p.x; p.py = p.y;
      p.sp = 0.45 + Math.random() * 0.8; p.sw = (Math.random() < 0.5 ? -1 : 1) * (0.2 + Math.random() * 0.4);
      p.r = 0.8 + Math.random() * 1.5; p.c = pick(cols); p.a = first ? Math.random() : 0; p.ab = 0;
      return p as Dot;
    };
    const parts: Dot[] = [];
    for (let i = 0; i < 120; i++) parts.push(spawn({}, true));

    const ocv = outRef.current, octx = ocv?.getContext("2d") ?? null;
    const OX = -128, OY = -64, OW = 712, OH = 569, ODPR = ocv ? ocv.width / OW : 2;
    const ocols = ["79,101,245", "124,92,214", "201,120,86", "92,96,112"];
    const ospawn = (p: Partial<Dot>, first: boolean): Dot => {
      if (Math.random() < 0.55) { p.x = OX + Math.random() * (-OX - 6); p.y = OY + Math.random() * OH; }
      else { p.x = OX + Math.random() * OW; p.y = OY + Math.random() * (-OY - 6); }
      if (!first) { if (p.x > -6) p.y = OY + 2; else p.x = OX + 2; }
      p.px = p.x; p.py = p.y; p.sp = 0.5 + Math.random() * 0.7; p.sw = (Math.random() - 0.5) * 0.5;
      p.r = 0.9 + Math.random() * 1.4; p.c = pick(ocols); p.a = first ? Math.random() : 0; p.ab = 0;
      return p as Dot;
    };
    const outs: Dot[] = [];
    if (octx) for (let i = 0; i < 46; i++) outs.push(ospawn({}, true));

    const kick = (phi: number, amt: number, width: number) => {
      for (let i = 0; i < N; i++) { const d = wrap(i / N * TAU - phi); vel[i] += amt * Math.exp(-d * d / (2 * width * width)); }
    };
    // the canvas is drawn at W x H and shown with object-fit: cover anchored bottom-right
    const local = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect(), k = Math.max(r.width / W, r.height / H) || 1;
      return { x: W - (r.right - e.clientX) / k, y: H - (r.bottom - e.clientY) / k };
    };
    const onMove = (e: PointerEvent) => {
      const q = local(e), dx = q.x - ptr.x, dy = q.y - ptr.y, sp = ptr.on ? Math.min(Math.hypot(dx, dy), 40) : 0;
      ptr.x = q.x; ptr.y = q.y; ptr.on = true; ptr.moved += sp;
      const dd = Math.hypot(q.x - cx, q.y - cy), phi = Math.atan2(q.y - cy, q.x - cx), inside = dd < R;
      if (!reduce) {
        if (dd < R * 1.7) kick(phi, sp * 0.09, 0.5);
        if (inside !== ptr.inside) { kick(phi, inside ? -7 : 7, 0.6); kick(phi + Math.PI, inside ? 3 : -3, 0.8); }
      }
      ptr.inside = inside;
    };
    const onLeave = () => { ptr.on = false; ptr.inside = false; };
    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onLeave);

    const path = () => {
      let a = pts[N - 1], b = pts[0];
      ctx.beginPath();
      ctx.moveTo((a.x + b.x) / 2, (a.y + b.y) / 2);
      for (let i = 0; i < N; i++) { a = pts[i]; b = pts[(i + 1) % N]; ctx.quadraticCurveTo(a.x, a.y, (a.x + b.x) / 2, (a.y + b.y) / 2); }
      ctx.closePath();
    };
    const dot = (x: number, y: number, r: number, rgb: string, al: number) => {
      ctx.fillStyle = `rgba(${rgb},${al.toFixed(3)})`; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
    };

    const frame = (now: number) => {
      raf = 0;
      const k = last ? Math.min(2.5, (now - last) / 16.7) : 1; last = now;
      const t = now / 1000, sf = reduce ? 0.35 : 1;
      let g: CanvasGradient;
      hov += ((ptr.on ? 1 : 0) - hov) * 0.06 * k;
      const phi = Math.atan2(ptr.y - cy, ptr.x - cx), dd0 = Math.hypot(ptr.x - cx, ptr.y - cy);
      const prox = ptr.on ? Math.max(0, 1 - Math.abs(dd0 - R) / (R * 1.3)) : 0;
      for (let i = 0; i < N; i++) {
        const th = i / N * TAU;
        const base = (3 * Math.sin(3 * th + t * 1.3) + 2.2 * Math.sin(2 * th - t * 0.9 + 1) + 1.5 * Math.sin(5 * th + t * 2.1)) * (1 + hov * 1.4) * sf;
        const df = wrap(th - phi);
        tgt[i] = base + (reduce ? 0 : 24 * prox * Math.exp(-df * df / (2 * 0.42 * 0.42)));
      }
      // The edge spring is only stable for steps up to ~2.1 frames. A slow frame (busy first load,
      // 30fps power-saving browsers) used to blow the orb apart, so step it at most one frame at a time.
      const steps = Math.ceil(k), h = k / steps, damp = Math.pow(0.88, h);
      for (let s = 0; s < steps; s++) {
        for (let i = 0; i < N; i++) {
          const lap = off[(i + N - 1) % N] + off[(i + 1) % N] - 2 * off[i];
          vel[i] = (vel[i] + ((tgt[i] - off[i]) * 0.05 + lap * 0.2) * h) * damp;
        }
        for (let i = 0; i < N; i++) off[i] += vel[i] * h;
      }
      for (let i = 0; i < N; i++) {
        if (!Number.isFinite(off[i])) { off[i] = 0; vel[i] = 0; } // never let one bad frame lose the orb for good
        const th2 = i / N * TAU, rr = R + off[i];
        pts[i].x = cx + Math.cos(th2) * rr; pts[i].y = cy + Math.sin(th2) * rr;
      }
      if (ptr.on && !ptr.inside) {
        emit += (0.45 + ptr.moved * 0.12) * k * sf; ptr.moved = 0;
        while (emit >= 1 && parts.length < 260) {
          emit -= 1;
          const ang = Math.random() * TAU, k0 = 0.6 + Math.random() * 1.8;
          parts.push({ x: ptr.x + Math.cos(ang) * 3, y: ptr.y + Math.sin(ang) * 3, px: ptr.x, py: ptr.y, vx: Math.cos(ang) * k0, vy: Math.sin(ang) * k0,
            sp: 0.9 + Math.random() * 0.9, sw: (Math.random() - 0.5) * 0.5, r: 0.9 + Math.random() * 1.5, c: pick(cols), a: 1, ab: 0, tmp: true });
        }
        if (emit > 1) emit = 1;
      } else emit = 0;
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i]; p.px = p.x; p.py = p.y;
        const dx = cx - p.x, dy = cy - p.y, d = Math.hypot(dx, dy) || 1, nx = dx / d, ny = dy / d;
        const v = p.sp * (0.7 + 70 / (d * 0.22 + 18)) * k * sf, swirl = p.sw * Math.min(1, d / 220);
        p.x += (nx - ny * swirl) * v; p.y += (ny + nx * swirl) * v;
        if (p.vx) { p.x += p.vx * k; p.y += (p.vy ?? 0) * k; const dmp = Math.pow(0.93, k); p.vx *= dmp; p.vy = (p.vy ?? 0) * dmp; }
        if (p.a < 1) p.a = Math.min(1, p.a + 0.02 * k);
        if (p.c0 && (p.mix ?? 0) < 1) p.mix = Math.min(1, (p.mix ?? 0) + 0.03 * k);
        if (d < R * 0.93 || p.ab > 0) p.ab += 0.035 * k;
        if (p.ab >= 1 || d < 4) { core = Math.min(1, core + (p.tmp ? 0.03 : 0.06)); if (p.tmp) parts.splice(i, 1); else spawn(p, false); }
      }
      core *= Math.pow(0.985, k);
      for (const p of outs) {
        p.px = p.x; p.py = p.y;
        const odx = cx - p.x, ody = cy - p.y, od = Math.hypot(odx, ody) || 1;
        const ov = p.sp * (0.9 + 70 / (od * 0.22 + 18)) * k * sf;
        p.x += (odx / od - ody / od * p.sw) * ov; p.y += (ody / od + odx / od * p.sw) * ov;
        if (p.a < 1) p.a = Math.min(1, p.a + 0.025 * k);
        if (p.x >= 0 && p.y >= 0 && p.x <= W && p.y <= H) {
          if (parts.length < 260) parts.push({ x: p.x, y: p.y, px: p.px, py: p.py, sp: p.sp, sw: p.sw, r: p.r, c: pick(cols), c0: p.c, mix: 0, a: 1, ab: 0, tmp: true });
          ospawn(p, false);
        }
      }

      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.save(); ctx.translate(cx, cy + R + 14); ctx.scale(1, 0.18);
      g = ctx.createRadialGradient(0, 0, 0, 0, 0, R * 1.05);
      g.addColorStop(0, "rgba(40,24,90,0.30)"); g.addColorStop(1, "rgba(40,24,90,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, R * 1.05, 0, TAU); ctx.fill(); ctx.restore();
      ctx.save(); ctx.translate(cx + R * 0.18, cy + R + 10); ctx.scale(1, 0.25);
      g = ctx.createRadialGradient(0, 0, 0, 0, 0, R * 0.45);
      g.addColorStop(0, `rgba(255,226,196,${(0.45 + core * 0.3).toFixed(3)})`); g.addColorStop(1, "rgba(255,226,196,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, R * 0.45, 0, TAU); ctx.fill(); ctx.restore();
      g = ctx.createRadialGradient(cx, cy, R * 0.8, cx, cy, R * 1.7);
      g.addColorStop(0, `rgba(255,255,255,${(0.12 + hov * 0.08 + core * 0.06).toFixed(3)})`); g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      if (ptr.on && !ptr.inside) {
        g = ctx.createRadialGradient(ptr.x, ptr.y, 0, ptr.x, ptr.y, 16);
        g.addColorStop(0, `rgba(255,255,255,${(0.35 * hov).toFixed(3)})`); g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g; ctx.fillRect(ptr.x - 16, ptr.y - 16, 32, 32);
      }
      for (const p of parts) {
        if (p.ab > 0) continue;
        const mx = p.c0 ? (p.mix ?? 0) : 1;
        if (mx < 1 && p.c0) dot(p.x, p.y, p.r, p.c0, (1 - mx) * 0.7);
        dot(p.x, p.y, p.r, p.c, p.a * 0.9 * mx);
      }
      path(); ctx.save(); ctx.clip();
      if (img.complete && img.naturalWidth) {
        ctx.save(); ctx.globalAlpha = 0.95;
        ctx.translate(cx + (ptr.on ? (ptr.x - cx) * 0.04 : 0), cy + (ptr.on ? (ptr.y - cy) * 0.04 : 0)); ctx.scale(-1, -1);
        ctx.drawImage(img, -(R + 90), -(R + 90), 2 * R + 180, 2 * R + 180); ctx.restore();
      }
      g = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.35, 0, cx, cy, R * 1.25);
      g.addColorStop(0, "rgba(255,255,255,0.22)"); g.addColorStop(0.55, "rgba(255,255,255,0.04)"); g.addColorStop(1, "rgba(46,30,110,0.32)");
      ctx.fillStyle = g; ctx.fillRect(cx - R * 1.5, cy - R * 1.5, R * 3, R * 3);
      ctx.globalCompositeOperation = "lighter";
      for (const p of parts) { if (p.ab <= 0) continue; const s = 1 - p.ab; dot(p.x, p.y, p.r * (0.6 + s * 0.8), p.c, s * 0.8); }
      g = ctx.createRadialGradient(cx, cy + 6, 0, cx, cy + 6, R * 0.62);
      g.addColorStop(0, `rgba(255,240,226,${(0.10 + core * 0.32 + hov * 0.06).toFixed(3)})`); g.addColorStop(1, "rgba(255,240,226,0)");
      ctx.fillStyle = g; ctx.fillRect(cx - R, cy - R, R * 2, R * 2);
      ctx.globalCompositeOperation = "source-over";
      g = ctx.createRadialGradient(cx, cy, R * 0.7, cx, cy, R * 1.08);
      g.addColorStop(0, "rgba(255,255,255,0)"); g.addColorStop(1, "rgba(255,255,255,0.5)");
      ctx.fillStyle = g; ctx.fillRect(cx - R * 1.5, cy - R * 1.5, R * 3, R * 3);
      ctx.restore();
      g = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
      g.addColorStop(0, "rgba(255,255,255,0.95)"); g.addColorStop(0.5, "rgba(255,255,255,0.18)"); g.addColorStop(1, "rgba(255,224,200,0.7)");
      path(); ctx.strokeStyle = g; ctx.lineWidth = 1.4; ctx.stroke();
      const hx = (off[Math.round(N * 0.625) % N] || 0) * 0.5;
      ctx.save(); ctx.translate(cx - R * 0.42 - hx, cy - R * 0.5 - hx); ctx.rotate(-0.62); ctx.scale(1, 0.52);
      g = ctx.createRadialGradient(0, 0, 0, 0, 0, R * 0.36);
      g.addColorStop(0, "rgba(255,255,255,0.9)"); g.addColorStop(0.45, "rgba(255,255,255,0.35)"); g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, R * 0.36, 0, TAU); ctx.fill(); ctx.restore();
      g = ctx.createRadialGradient(cx + R * 0.52, cy + R * 0.56, 0, cx + R * 0.52, cy + R * 0.56, 9);
      g.addColorStop(0, "rgba(255,255,255,0.7)"); g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g; ctx.fillRect(cx + R * 0.52 - 9, cy + R * 0.56 - 9, 18, 18);
      if (octx) {
        octx.setTransform(ODPR, 0, 0, ODPR, -OX * ODPR, -OY * ODPR);
        octx.clearRect(OX, OY, OW, OH);
        octx.save(); octx.beginPath(); octx.rect(OX, OY, OW, OH); octx.rect(0, 0, W, H); octx.clip("evenodd");
        for (const p of outs) {
          const fade = p.a * Math.min(1, (p.x - OX) / 40, (p.y - OY) / 40);
          if (fade <= 0) continue;
          octx.fillStyle = `rgba(${p.c},${(fade * 0.7).toFixed(3)})`;
          octx.beginPath(); octx.arc(p.x, p.y, p.r, 0, TAU); octx.fill();
        }
        octx.restore();
      }
      if (vis) raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver((es) => {
      vis = es[es.length - 1].isIntersecting;
      if (vis && !raf) { last = 0; raf = requestAnimationFrame(frame); }
    });
    io.observe(cv);
    raf = requestAnimationFrame(frame);
    return () => {
      vis = false; if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <article ref={cardRef} className="cg-card cg-brain">
      <img src={BG} alt="" />
      <canvas ref={cvRef} className="cg-brain-cv" width={1168} height={962} aria-hidden="true" />
      <h3>Brain which will learn your business</h3>
      <canvas ref={outRef} className="cg-brain-out" width={1424} height={1138} aria-hidden="true" />
    </article>
  );
}
