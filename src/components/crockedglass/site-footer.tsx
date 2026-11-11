"use client";

import { useEffect, useRef } from "react";

const COLS: { h: string; links: [string, string][] }[] = [
  { h: "Product", links: [["Product", "/product"], ["Pricing", "/pricing"], ["Book a demo", "/book-demo"], ["Start free", "https://beta.cnvrted.com"]] },
  { h: "Learn", links: [["GTM strategy", "/learn/go-to-market-strategy"], ["Ideal customer profile", "/learn/ideal-customer-profile"], ["Buying signals", "/learn/buying-signals"], ["Signal to outreach", "/learn/signal-to-outreach"], ["All guides", "/learn"]] },
  { h: "Resources", links: [["Blog", "/blogs"], ["Case studies", "/case-studies"], ["Our customers", "/customers"], ["Help center", "/help-center"], ["Join our Slack", "/join-slack"]] },
  { h: "Company", links: [["About us", "/about"], ["Careers", "/careers"], ["Contact", "/contact"]] },
  { h: "Legal", links: [["Terms & conditions", "/terms"], ["Privacy policy", "/privacy"], ["Refund policy", "/refund-policy"], ["Data deletion", "/data-deletion"], ["Sitemap", "/sitemap.xml"]] },
];

/** Footer. The outlined wordmark at the bottom fills with coloured smoke from wherever the pointer is; once the
 *  word is full (or a while after the pointer leaves) the smoke fades and it resets. */
export function CgFooter() {
  const box = useRef<HTMLDivElement>(null);
  const cvRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = box.current, cv = cvRef.current, ctx = cv?.getContext("2d");
    if (!el || !cv || !ctx) return;
    const W = 1440, H = 320;
    type Puff = { x: number; y: number; vx: number; vy: number; r: number; g: number; life: number; decay: number; s: number; c: number[] };
    const parts: Puff[] = [];
    let cur: { x: number; y: number } | null = null, prev: { x: number; y: number } | null = null, raf = 0;
    const acc = document.createElement("canvas"); acc.width = W; acc.height = H;
    const ax = acc.getContext("2d", { willReadFrequently: true })!;
    const COLORS = [[96, 120, 255], [16, 200, 140], [245, 247, 255], [150, 100, 250], [40, 210, 240], [236, 90, 170]];
    const reduce = !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let st = { alpha: 1, phase: "fill", fullAt: 0, leftAt: 0, frames: 0, dirty: false };
    const spawn = (x: number, y: number, vx: number, vy: number, n: number) => {
      for (let k = 0; k < n && parts.length < 260; k++) {
        const a = Math.random() * Math.PI * 2, sp = 0.5 + Math.random() * 1.4;
        parts.push({ x: x + (Math.random() - 0.5) * 18, y: y + (Math.random() - 0.5) * 18, vx: vx * 0.4 + Math.cos(a) * sp, vy: vy * 0.4 + Math.sin(a) * sp - 0.2,
          r: 12 + Math.random() * 16, g: 0.7 + Math.random() * 0.9, life: 1, decay: 0.006 + Math.random() * 0.006, s: Math.random() * 1000, c: COLORS[(Math.random() * COLORS.length) | 0] });
      }
    };
    const coverage = () => {
      const d = ax.getImageData(0, 0, W, H).data; let hit = 0, tot = 0;
      for (let y = 8; y < H; y += 16) for (let x = 8; x < W; x += 16) { tot++; if (d[(y * W + x) * 4 + 3] > 70) hit++; }
      return hit / tot;
    };
    const frame = (now: number) => {
      raf = 0;
      const tt = now / 1000;
      if (cur && st.phase === "fill") {
        spawn(cur.x, cur.y, prev ? cur.x - prev.x : 0, prev ? cur.y - prev.y : 0, reduce ? 1 : 3);
        prev = { ...cur };
      }
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.vx += Math.sin(p.y * 0.012 + tt * 1.3 + p.s) * 0.05;
        p.vy += Math.cos(p.x * 0.01 + tt * 1.1 + p.s) * 0.04 - 0.004;
        p.vx *= 0.975; p.vy *= 0.975;
        p.x += p.vx; p.y += p.vy; p.r += p.g; p.life -= p.decay;
        if (p.life <= 0) { parts.splice(i, 1); continue; }
        const al = Math.min(1, p.life * 1.5) * 0.045, [r, g, b] = p.c;
        const grd = ax.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        grd.addColorStop(0, `rgba(${r},${g},${b},${al.toFixed(3)})`); grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ax.fillStyle = grd; ax.beginPath(); ax.arc(p.x, p.y, p.r, 0, Math.PI * 2); ax.fill();
        st.dirty = true;
      }
      if (st.phase === "fill" && st.dirty && ++st.frames % 20 === 0 && coverage() > 0.72) { st.phase = "hold"; st.fullAt = now; }
      if (st.phase === "fill" && !cur && st.dirty && now - st.leftAt > 4000) { st.phase = "hold"; st.fullAt = now - 1600; }
      if (st.phase === "hold" && now - st.fullAt > 1600) st.phase = "fade";
      if (st.phase === "fade") {
        st.alpha -= 1 / 110;
        if (st.alpha <= 0) { ax.clearRect(0, 0, W, H); parts.length = 0; st = { alpha: 1, phase: "fill", fullAt: 0, leftAt: now, frames: 0, dirty: false }; }
      }
      ctx.clearRect(0, 0, W, H);
      ctx.globalAlpha = Math.max(0, st.alpha);
      ctx.drawImage(acc, 0, 0);
      ctx.globalAlpha = 1;
      if (cur || parts.length || st.dirty) raf = requestAnimationFrame(frame);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
    const at = (e: PointerEvent) => { const r = el.getBoundingClientRect(); return { x: (e.clientX - r.left) * W / r.width, y: (e.clientY - r.top) * H / r.height }; };
    const enter = (e: PointerEvent) => { cur = at(e); prev = null; if (st.phase === "fill") spawn(cur.x, cur.y, 0, 0, 12); kick(); };
    const move = (e: PointerEvent) => { cur = at(e); kick(); };
    const leave = () => { cur = null; prev = null; st.leftAt = performance.now(); kick(); };
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => { cancelAnimationFrame(raf); el.removeEventListener("pointerenter", enter); el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
  }, []);

  const word = { x: 1, y: 306, textLength: 1438, lengthAdjust: "spacingAndGlyphs" as const, fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif", fontWeight: 500, fontSize: 380, letterSpacing: -8 };
  return (
    <footer className="cg-footer">
      <div className="cg-wrap">
        <div className="cg-ft-top">
          <div className="cg-ft-brand">
            <a href="/" aria-label="Cnvrted home">Cnvrted</a>
            <p>Cnvrted is the AI go-to-market platform for B2B teams. Orka, our AI agent, finds buyers that fit your ICP, reads their buying signals and books meetings across email, LinkedIn and WhatsApp.</p>
          </div>
          <div className="cg-ft-news">
            <p style={{ fontSize: 15 }}>See who’s ready to buy this week</p>
            <div>
              <a className="cg-btn" href="https://beta.cnvrted.com">Start free</a>
              <a href="/book-demo" style={{ height: 44, padding: "0 20px", display: "inline-flex", alignItems: "center", borderRadius: 23, border: "1px solid #2c2c2c", color: "#fff", fontSize: 14 }}>Book a call</a>
            </div>
          </div>
        </div>
        <nav aria-label="Footer" className="cg-ft-cols">
          {COLS.map((col) => (
            <div key={col.h}>
              <h3>{col.h}</h3>
              {col.links.map(([t, href]) => <a key={href} className="cg-ft-link" href={href}>{t}</a>)}
            </div>
          ))}
        </nav>
        <div className="cg-ft-bottom">
          <span>© 2026 Cnvrted. AI lead generation &amp; GTM automation for B2B teams.</span>
          <div className="cg-ft-soc">
            <a href="https://www.linkedin.com/company/cnvrted" aria-label="Cnvrted on LinkedIn" target="_blank" rel="noopener noreferrer"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.33-1.96 2.7V21h-4z" /></svg></a>
            <a href="https://x.com/cnvrted" aria-label="Cnvrted on X" target="_blank" rel="noopener noreferrer"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.8 2h3.4l-7.4 8.5L22.5 22h-6.8l-5.3-6.9L4.3 22H.9l7.9-9.1L.5 2h7l4.8 6.3zm-1.2 18h1.9L6.5 3.9H4.5z" /></svg></a>
          </div>
        </div>
      </div>
      <div ref={box} className="cg-ft-word" aria-hidden="true">
        <svg className="cg-ft-outline" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <defs>
            <filter id="cg-ft-wisp" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves={3} seed={7} /><feDisplacementMap in="SourceGraphic" scale={38} xChannelSelector="R" yChannelSelector="G" /></filter>
            <clipPath id="cg-ft-clip"><text {...word}>Cnvrted</text></clipPath>
          </defs>
          <foreignObject x="0" y="0" width="1440" height="320" clipPath="url(#cg-ft-clip)">
            <canvas ref={cvRef} width={1440} height={320} style={{ display: "block", width: 1440, height: 320, filter: "url(#cg-ft-wisp)" }} />
          </foreignObject>
          <text {...word} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={1.5} vectorEffect="non-scaling-stroke">Cnvrted</text>
        </svg>
      </div>
    </footer>
  );
}
