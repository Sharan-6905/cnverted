"use client";

import { useEffect, useRef } from "react";

/** Grid pitch and dot look (the same values as ramp.com's hero dot field). */
const PITCH = 12;
const DOT_R = 1.1;
const COLOR = "194, 194, 200";
/** Pointer push: radius, strength. Per-dot spring back home, and velocity damping (per 60Hz step). */
const RADIUS = 150, FORCE = 10, SPRING = 0.018, DAMPING = 0.8;
/** Click ripples: ring speed (px/s), width (squared-px falloff), strength, decay (/s), lifetime (s), max at once. */
const RIP_SPEED = 420, RIP_WIDTH = 500, RIP_FORCE = 10, RIP_DECAY = 2.2, RIP_LIFE = 2, RIP_MAX = 6;
/** Shimmer: three plane waves over the grid, averaged; alpha runs 0.35..1. */
const WAVES: [number, number, number][] = [[0.018, 0.009, 0.55], [-0.012, 0.016, 0.38], [0.006, -0.014, 0.22]];
/** Alpha levels the dots are batched into, so each frame is a handful of fills instead of one per dot. */
const LEVELS = 16;
const INTERACTIVE = 'a, button, input, select, textarea, label, [role="button"], form, video';

const hash = (n: number) => { const s = Math.sin(n) * 43758.5453; return s - Math.floor(s); };

/**
 * The hero's dot field, after ramp.com's: a 12px grid of soft grey dots that shimmer slowly, scatter away from the
 * pointer and spring back, and ripple out from a click. Every dot is a small spring (its own slightly different
 * stiffness, so the field settles unevenly instead of as one sheet). Runs at 60fps while something is moving, 30fps
 * for the idle shimmer, and stops off-screen. Reduced motion gets a still grid.
 */
export function HeroDots() {
  const box = useRef<HTMLDivElement>(null);
  const cvs = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = box.current, canvas = cvs.current;
    const ctx = canvas?.getContext("2d");
    if (!host || !canvas || !ctx) return;
    const reduce = !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, cols = 0, rows = 0, ox = 0, oy = 0;
    let homeX = new Float32Array(0), homeY = new Float32Array(0), k = new Float32Array(0);
    let offX = new Float32Array(0), offY = new Float32Array(0), velX = new Float32Array(0), velY = new Float32Array(0);
    const buckets: number[][] = Array.from({ length: LEVELS }, () => []);

    const layout = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2), r = host.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = Math.max(1, Math.floor(w * dpr)); canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ox = (w % PITCH) / 2 + PITCH / 2; oy = (h % PITCH) / 2 + PITCH / 2;
      cols = Math.max(1, Math.ceil((w + PITCH - ox) / PITCH)); rows = Math.max(1, Math.ceil((h + PITCH - oy) / PITCH));
      const n = cols * rows;
      homeX = new Float32Array(n); homeY = new Float32Array(n); k = new Float32Array(n);
      offX = new Float32Array(n); offY = new Float32Array(n); velX = new Float32Array(n); velY = new Float32Array(n);
      for (let row = 0, i = 0; row < rows; row++) for (let col = 0; col < cols; col++, i++) {
        homeX[i] = ox + col * PITCH; homeY[i] = oy + row * PITCH;
        k[i] = SPRING * (0.8 + hash(col * 1.7 + row * 73) * 0.4);
      }
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const b of buckets) b.length = 0;
      const n = cols * rows;
      for (let i = 0; i < n; i++) {
        let a = 0.6;
        if (!reduce) {
          const x = homeX[i], y = homeY[i];
          let s = 0;
          for (const [kx, ky, sp] of WAVES) s += Math.sin(x * kx + y * ky + time * sp);
          a = 0.35 + 0.65 * (0.5 + 0.5 * (s / 3));
        }
        buckets[Math.min(LEVELS - 1, Math.floor(a * LEVELS))].push(i);
      }
      for (let l = 0; l < LEVELS; l++) {
        const b = buckets[l];
        if (!b.length) continue;
        ctx.fillStyle = `rgba(${COLOR}, ${((l + 0.5) / LEVELS).toFixed(3)})`;
        ctx.beginPath();
        for (const i of b) {
          const x = homeX[i] + offX[i], y = homeY[i] + offY[i];
          ctx.moveTo(x + DOT_R, y); ctx.arc(x, y, DOT_R, 0, Math.PI * 2);
        }
        ctx.fill();
      }
    };

    layout();
    if (reduce) {
      draw(0);
      const ro = new ResizeObserver(() => { layout(); draw(0); });
      ro.observe(host);
      return () => ro.disconnect();
    }

    // ---- pointer + ripples ----
    let clock = 0;                              // simulation seconds
    const target = { x: -9999, y: -9999 }, mouse = { x: -9999, y: -9999 };
    let hovering = false, overUI = false, lastMove = -10, lastPoke = -100, uiCheckedAt = -1;
    const ripples: { x: number; y: number; born: number }[] = [];
    let rect = host.getBoundingClientRect();

    const onMove = (e: PointerEvent) => {
      rect = host.getBoundingClientRect();
      if (e.clientY < rect.top - RADIUS || e.clientY > rect.bottom + RADIUS) { hovering = false; return; }
      if (e.timeStamp - uiCheckedAt > 100) {    // only look up the element under the pointer every 100ms
        uiCheckedAt = e.timeStamp;
        overUI = e.target instanceof Element && !!e.target.closest(INTERACTIVE);
      }
      if (overUI) { hovering = false; return; }
      target.x = e.clientX - rect.left; target.y = e.clientY - rect.top;
      if (mouse.x < -9000) { mouse.x = target.x; mouse.y = target.y; }
      hovering = true; lastMove = clock; lastPoke = clock;
      wake();
    };
    const onLeave = () => { hovering = false; };
    const onDown = (e: PointerEvent) => {
      if (!e.isPrimary || overUI) return;
      rect = host.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
      ripples.push({ x, y, born: clock });
      if (ripples.length > RIP_MAX) ripples.shift();
      lastPoke = clock;
      wake();
    };

    const step = () => {
      mouse.x += ((hovering ? target.x : -9999) - mouse.x) * (hovering ? 0.8 : 0.08);
      mouse.y += ((hovering ? target.y : -9999) - mouse.y) * (hovering ? 0.8 : 0.08);
      const since = clock - lastMove;
      const push = hovering && since <= 1 ? Math.exp(-7 * since) : 0;   // fades once the pointer stops
      for (let r = ripples.length - 1; r >= 0; r--) if (clock - ripples[r].born >= RIP_LIFE) ripples.splice(r, 1);

      const n = cols * rows, r2 = RADIUS * RADIUS;
      for (let i = 0; i < n; i++) {
        let vx = velX[i] - offX[i] * k[i], vy = velY[i] - offY[i] * k[i];
        const px = homeX[i] + offX[i], py = homeY[i] + offY[i];
        if (push > 0.001) {
          const dx = px - mouse.x, dy = py - mouse.y, d2 = dx * dx + dy * dy;
          if (d2 < r2 && d2 > 0.01) {
            const d = Math.sqrt(d2), t = 1 - d / RADIUS, f = t * t * FORCE * push;
            vx += (dx / d) * f; vy += (dy / d) * f;
          }
        }
        for (const rip of ripples) {
          const age = clock - rip.born, dx = px - rip.x, dy = py - rip.y, d = Math.sqrt(dx * dx + dy * dy);
          const diff = d - age * RIP_SPEED;
          const amp = Math.exp(-(diff * diff) / RIP_WIDTH) * Math.exp(-age * RIP_DECAY) * RIP_FORCE;
          if (amp < 0.001) continue;
          if (d > 0.01) { vx += (dx / d) * amp; vy += (dy / d) * amp; }
          else { const ang = hash(i * 0.37 + rip.born) * Math.PI * 2; vx += Math.cos(ang) * amp; vy += Math.sin(ang) * amp; }
        }
        vx *= DAMPING; vy *= DAMPING;
        velX[i] = vx; velY[i] = vy; offX[i] += vx; offY[i] += vy;
      }
    };

    // ---- loop: 60Hz steps while anything moves, 30fps shimmer otherwise, nothing off-screen ----
    let raf = 0, last = 0, visible = true, acc = 0;
    const tick = (now: number) => {
      raf = 0;
      if (!visible) return;
      const busy = hovering || ripples.length > 0 || clock - lastPoke < 2.5;
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 1 / 60;
      if (!busy && last && now - last < 1000 / 30) { raf = requestAnimationFrame(tick); return; }
      last = now;
      clock += dt;
      if (busy) {
        acc += dt;
        let steps = 0;
        while (acc >= 1 / 60 && steps < 3) { step(); acc -= 1 / 60; steps++; }
        if (steps === 3) acc = 0;
      } else acc = 0;
      draw(clock);
      raf = requestAnimationFrame(tick);
    };
    const wake = () => { if (!raf && visible) raf = requestAnimationFrame(tick); };

    const io = new IntersectionObserver(([e]) => {
      visible = !!e?.isIntersecting;
      if (visible) { last = 0; wake(); } else if (raf) { cancelAnimationFrame(raf); raf = 0; }
    });
    io.observe(host);
    // ResizeObserver already fires once per rendered frame, so lay out and repaint right here
    const ro = new ResizeObserver(() => { layout(); draw(clock); });
    ro.observe(host);
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerdown", onDown, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    draw(0);   // first frame now, not on the first animation frame
    wake();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect(); ro.disconnect();
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={box} className="cg-hero-dots" aria-hidden="true">
      <canvas ref={cvs} />
    </div>
  );
}
