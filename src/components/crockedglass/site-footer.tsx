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
 *  word is full (or a while after the pointer leaves) the smoke fades and it resets.
 *
 *  The whole wordmark (outline, fill and smoke) is drawn in one canvas. It used to be SVG text with textLength,
 *  the same text again inside a clipPath, and the smoke canvas in a foreignObject. Firefox lays those out
 *  differently from Chrome, so its smoke and fill landed ~50px left of the outline and the letters came out doubled.
 *  One canvas draws every layer from the same text, so they can't drift apart. */
export function CgFooter() {
  const box = useRef<HTMLDivElement>(null);
  const cvRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = box.current, cv = cvRef.current, ctx = cv?.getContext("2d");
    if (!el || !cv || !ctx) return;
    // the word is laid out in a 1440 x 320 box; the canvas is that box scaled to the element at device resolution
    const W = 1440, H = 320, PAD = 24, BASE = 300;
    type Puff = { x: number; y: number; vx: number; vy: number; r: number; g: number; life: number; decay: number; s: number; c: number[] };
    const parts: Puff[] = [];
    let cur: { x: number; y: number } | null = null, prev: { x: number; y: number } | null = null, raf = 0;
    // acc: smoke builds up here. fx: acc after the wisp filter. lay: fx scaled up and cut to the letters.
    const mk = (w: number, h: number) => { const c = document.createElement("canvas"); c.width = w; c.height = h; return c; };
    const acc = mk(W, H), fx = mk(W, H), lay = mk(1, 1);
    const ax = acc.getContext("2d", { willReadFrequently: true })!, fxx = fx.getContext("2d")!, lx = lay.getContext("2d")!;
    const COLORS = [[96, 120, 255], [16, 200, 140], [245, 247, 255], [150, 100, 250], [40, 210, 240], [236, 90, 170]];
    const reduce = !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let st = { alpha: 1, phase: "fill", fullAt: 0, leftAt: 0, frames: 0, dirty: false };
    let font = "", x0 = PAD, k = 1, dpr = 1, hover = 0, hoverTo = 0, alive = true;
    const ink = getComputedStyle(el).getPropertyValue("--cg-ink").trim() || "#0d0d0d";

    // size the word so its ink (not its advance width) spans the box with PAD either side
    const layout = () => {
      const fam = getComputedStyle(el).getPropertyValue("--font-bricolage").trim() || "sans-serif";
      ax.font = `500 380px ${fam}`;
      let m = ax.measureText("Cnvrted");
      const size = 380 * (W - 2 * PAD) / (m.actualBoundingBoxLeft + m.actualBoundingBoxRight);
      font = `500 ${size.toFixed(2)}px ${fam}`;
      ax.font = font; m = ax.measureText("Cnvrted");
      x0 = PAD + m.actualBoundingBoxLeft;
    };
    const resize = () => {
      const r = el.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = lay.width = Math.max(1, Math.round(r.width * dpr));
      cv.height = lay.height = Math.max(1, Math.round(r.height * dpr));
      k = cv.width / W;
      paint();
    };
    const word = (c: CanvasRenderingContext2D) => { c.setTransform(k, 0, 0, k, 0, 0); c.font = font; c.textBaseline = "alphabetic"; };

    const paint = () => {
      if (!font) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, cv.width, cv.height);
      // Bricolage's glyphs are drawn from overlapping shapes (the "e"'s crossbar most of all), and a plain
      // outline strokes every inner edge. So: stroke at twice the width, then cover the inside with the
      // footer colour, leaving only the outer half of the stroke.
      word(ctx);
      ctx.lineJoin = "round";
      ctx.lineWidth = 3 * dpr / k;
      ctx.strokeStyle = `rgba(255,255,255,${(0.4 + 0.3 * hover).toFixed(3)})`;
      ctx.strokeText("Cnvrted", x0, BASE);
      ctx.fillStyle = ink;
      ctx.fillText("Cnvrted", x0, BASE);
      if (!st.dirty) return;
      // smoke: filter at the 1440 size, scale up, then keep only what's inside the letters
      fxx.clearRect(0, 0, W, H);
      fxx.filter = reduce ? "none" : "url(#cg-ft-wisp)";
      fxx.drawImage(acc, 0, 0);
      fxx.filter = "none";
      lx.setTransform(1, 0, 0, 1, 0, 0);
      lx.globalCompositeOperation = "source-over";
      lx.clearRect(0, 0, lay.width, lay.height);
      lx.globalAlpha = Math.max(0, st.alpha);
      lx.drawImage(fx, 0, 0, lay.width, lay.height);
      lx.globalAlpha = 1;
      lx.globalCompositeOperation = "destination-in";
      word(lx);
      lx.fillStyle = "#000";
      lx.fillText("Cnvrted", x0, BASE);
      lx.globalCompositeOperation = "source-over";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(lay, 0, 0);
    };

    const spawn = (x: number, y: number, vx: number, vy: number, n: number) => {
      for (let i = 0; i < n && parts.length < 260; i++) {
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
      // the outline brightens while the pointer is over the footer (~0.4s)
      hover += Math.sign(hoverTo - hover) * Math.min(Math.abs(hoverTo - hover), 1 / 24);
      paint();
      if (cur || parts.length || st.dirty || hover !== hoverTo) raf = requestAnimationFrame(frame);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
    const at = (e: PointerEvent) => { const r = el.getBoundingClientRect(); return { x: (e.clientX - r.left) * W / r.width, y: (e.clientY - r.top) * H / r.height }; };
    const enter = (e: PointerEvent) => { cur = at(e); prev = null; if (st.phase === "fill") spawn(cur.x, cur.y, 0, 0, 12); kick(); };
    const move = (e: PointerEvent) => { cur = at(e); kick(); };
    const leave = () => { cur = null; prev = null; st.leftAt = performance.now(); kick(); };
    const foot = el.closest("footer") ?? el;
    const fIn = () => { hoverTo = 1; kick(); }, fOut = () => { hoverTo = 0; kick(); };
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    foot.addEventListener("pointerenter", fIn);
    foot.addEventListener("pointerleave", fOut);
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    // measure with the real font, and again once every font has loaded (a swap changes the glyph widths)
    const fam = getComputedStyle(el).getPropertyValue("--font-bricolage").trim() || "sans-serif";
    const relayout = () => { if (alive) { layout(); resize(); } };
    relayout();
    document.fonts?.load(`500 380px ${fam}`).then(relayout, () => {});
    document.fonts?.ready.then(relayout, () => {});
    return () => {
      alive = false; cancelAnimationFrame(raf); ro.disconnect();
      el.removeEventListener("pointerenter", enter); el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave);
      foot.removeEventListener("pointerenter", fIn); foot.removeEventListener("pointerleave", fOut);
    };
  }, []);

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
        <canvas ref={cvRef} />
        {/* the smoke's wisp filter; the canvas applies it by id */}
        <svg width="0" height="0" focusable="false">
          <filter id="cg-ft-wisp" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves={3} seed={7} /><feDisplacementMap in="SourceGraphic" scale={38} xChannelSelector="R" yChannelSelector="G" /></filter>
        </svg>
      </div>
    </footer>
  );
}
