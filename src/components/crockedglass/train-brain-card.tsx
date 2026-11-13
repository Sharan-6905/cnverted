"use client";

import { useEffect } from "react";
import { prefersReducedMotion, useLater, usePatch } from "./hooks";

type Mem = { t: string; c: string };

// Five kinds of signal feed the brain: your click, your prompt, a rival's post, a news trend, a rival's site.
// Each scene plays in the top card, a dot flies down into the brain, and what it learned joins the list.
const SCENES = [
  { label: "Your click", dot: "#4f65f5", mem: "Approves Heads of Growth at fintech startups" },
  { label: "Your prompt", dot: "#8b5cf6", mem: "Focus on fintech teams in India" },
  { label: "Competitor post · LinkedIn", dot: "#ec4899", mem: "Rivalyst pushes AI SDR → lead with human follow-up" },
  { label: "News trend", dot: "#d4a017", mem: "RevOps hiring is up 38% → add RevOps leads" },
  { label: "Competitor website", dot: "#0891b2", mem: "Rivalyst cut Pro to $79 → stress ROI in outreach" },
];
const MEM0: Mem[] = [
  { t: "Short emails get 2× more replies", c: "#15803d" },
  { t: "Tuesday mornings book the most calls", c: "#15803d" },
  { t: "Founders reply faster on LinkedIn", c: "#4f65f5" },
];
const PROMPT = "Only target fintech teams in India";

const INIT = {
  sc: 0, stIn: true, ok: false, press: false, typed: "", typing: false, scan: false, hl: false, draw: false, cut: false,
  fly: false, flyOn: false, curOn: false, curY: 150, pulse: false, n: 1284, mem: MEM0, memIn: true,
};

/** "Train your cnvrted brain": signals (click, prompt, rival post, news, rival site) feed the brain and become memories. */
export function TrainBrainCard() {
  const [t, set, ref] = usePatch(INIT);
  const later = useLater();

  useEffect(() => {
    if (prefersReducedMotion()) { set({ sc: 0, ok: true }); return; }
    const after = (i: number) => {
      set({ flyOn: true, fly: false });
      later(() => set({ fly: true }), 40);
      later(() => {
        const cur = ref.current;
        const mem = [{ t: SCENES[i].mem, c: SCENES[i].dot }, ...cur.mem.slice(0, 2)];
        set({ flyOn: false, pulse: true, n: cur.n + 1 + Math.floor(Math.random() * 3), mem, memIn: false });
        later(() => set({ memIn: true }), 60);
        later(() => set({ pulse: false }), 320);
        later(() => set({ stIn: false, curOn: false }), 1900);
        later(() => scene((i + 1) % SCENES.length), 2350);
      }, 700);
    };
    const scene = (i: number) => {
      set({ sc: i, stIn: false, ok: false, press: false, typed: "", typing: false, scan: false, hl: false, draw: false, cut: false, fly: false, flyOn: false, curOn: false, curY: 150 });
      later(() => set({ stIn: true }), 50);
      if (i === 0) {
        later(() => set({ curOn: true }), 400);
        later(() => set({ curY: 96 }), 500);
        later(() => set({ press: true }), 1550);
        later(() => set({ press: false, ok: true }), 1720);
        later(() => after(0), 2300);
      } else if (i === 1) {
        let k = 0;
        const step = () => {
          k++;
          set({ typed: PROMPT.slice(0, k) });
          if (k < PROMPT.length) later(step, 32 + Math.random() * 38);
          else later(() => { set({ press: true }); later(() => { set({ press: false, typing: false, typed: "" }); after(1); }, 180); }, 400);
        };
        later(() => { set({ typing: true }); later(step, 250); }, 500);
      } else if (i === 2) {
        later(() => set({ scan: true }), 600);
        later(() => set({ hl: true }), 1500);
        later(() => after(2), 2400);
      } else if (i === 3) {
        later(() => set({ draw: true }), 500);
        later(() => after(3), 2200);
      } else {
        later(() => set({ cut: true }), 1100);
        later(() => after(4), 2200);
      }
    };
    later(() => scene(0), 600);
  }, [later, set, ref]);

  const cur = SCENES[t.sc];
  const fade = (on: boolean, y: number) => ({ opacity: on ? 1 : 0, transform: `translateY(${on ? 0 : y}px)` });
  return (
    <article className="cg-card cg-card--photo cg-tb">
      <img src="/crockedglass/train-brain.webp" alt="" loading="lazy" decoding="async" />
      <div className="cg-tb-layer" aria-hidden="true">
        <div className="cg-tb-card">
          <div className="cg-tb-fade cg-tb-scene" style={fade(t.stIn, 6)}>
            <div className="cg-tb-head">
              <span className="cg-tb-dot" style={{ background: cur.dot }} /><span style={{ fontWeight: 500 }}>{cur.label}</span>
              <span className="cg-tb-step">{t.sc + 1} / 5</span>
            </div>

            {t.sc === 0 && (
              <div className="cg-tb-body" style={{ top: 38 }}>
                <div className="cg-tb-person">
                  <span className="cg-tb-av">PN</span>
                  <span className="cg-tb-col"><b>Priya Nair</b><span className="cg-tb-sub">Head of Growth · Finlo, fintech</span></span>
                </div>
                <div className="cg-tb-btns">
                  <span className="cg-tb-btn" style={{ border: "1px solid #e3e0d8", color: "#6b6862" }}>Skip</span>
                  <span className="cg-tb-btn" style={{ background: t.ok ? "#15803d" : "#0d0d0d", color: "#fff", transform: `scale(${t.press ? 0.9 : 1})` }}>{t.ok ? "Approved" : "Approve"}</span>
                </div>
              </div>
            )}

            {t.sc === 1 && (
              <div className="cg-tb-body cg-tb-prompt" style={{ top: 44 }}>
                <div className="cg-tb-input" style={{ color: t.typed ? "#0d0d0d" : "#a19d94" }}>
                  {t.typed || "Tell Orka who to target…"}{t.typing && <span className="cg-tb-caret" />}
                </div>
                <span className="cg-tb-send" style={{ transform: `scale(${t.press ? 0.86 : 1})` }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M6 11l6-6 6 6" /></svg>
                </span>
              </div>
            )}

            {t.sc === 2 && (
              <div className="cg-tb-body cg-tb-post" style={{ top: 38 }}>
                <div className="cg-tb-person" style={{ gap: 8 }}>
                  <span className="cg-tb-logo">R</span><b style={{ fontSize: 12.5 }}>Rivalyst</b><span className="cg-tb-sub">· 2h</span>
                </div>
                <p>We just launched an AI SDR that books <span className="cg-tb-hl" style={{ background: t.hl ? "rgba(236,72,153,.18)" : "transparent" }}>3× more meetings</span>.</p>
                <span className="cg-tb-fade cg-tb-scan" style={{ left: `${t.scan ? 100 : -20}%`, opacity: t.scan ? 1 : 0 }} />
              </div>
            )}

            {t.sc === 3 && (
              <div className="cg-tb-body cg-tb-trend" style={{ top: 42 }}>
                <span className="cg-tb-col" style={{ gap: 4 }}>
                  <b style={{ fontSize: 14, lineHeight: "17px" }}>RevOps hiring</b>
                  <span style={{ fontSize: 12, lineHeight: "15px", color: "#15803d", fontWeight: 500 }}>+38% this week</span>
                  <span style={{ fontSize: 11, lineHeight: "14px", color: "#6b6862" }}>B2B SaaS · India</span>
                </span>
                <svg width="130" height="52" viewBox="0 0 130 52" fill="none"><path d="M2 46 L22 40 L40 43 L58 32 L76 35 L94 20 L112 22 L128 6" stroke="#15803d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="160" strokeDashoffset={t.draw ? 0 : 160} style={{ transition: "stroke-dashoffset 1.4s ease-out" }} /></svg>
              </div>
            )}

            {t.sc === 4 && (
              <div className="cg-tb-body" style={{ top: 38 }}>
                <div className="cg-tb-url">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6b6862" strokeWidth="2.4"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>rivalyst.com/pricing
                </div>
                <div className="cg-tb-price">
                  <b>Pro plan</b>
                  <span style={{ marginLeft: "auto", fontSize: 13, color: t.cut ? "#a19d94" : "#0d0d0d", textDecoration: t.cut ? "line-through" : "none", transition: "color .3s ease" }}>$99</span>
                  <span className="cg-tb-fade" style={{ fontWeight: 600, fontSize: 16, color: "#15803d", ...fade(t.cut, 6) }}>$79</span>
                  <span style={{ fontSize: 11, color: "#6b6862" }}>/mo</span>
                </div>
              </div>
            )}
          </div>
          <span className="cg-tb-cursor" style={{ top: t.curY, opacity: t.curOn ? 1 : 0, transform: `scale(${t.press && t.sc === 0 ? 0.85 : 1})` }}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M5 3l14 7-6 2-2.5 6z" fill="#0d0d0d" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" /></svg>
          </span>
        </div>

        <span className="cg-tb-fade cg-tb-fly" style={{ top: t.fly ? 284 : 214, opacity: t.flyOn ? 1 : 0, background: cur.dot, boxShadow: `0 0 0 4px rgba(255,255,255,.7), 0 0 14px ${cur.dot}` }} />
        <div className="cg-tb-brain" style={{ transform: `translateX(-50%) scale(${t.pulse ? 1.07 : 1})` }}>
          <span className="cg-tb-orb" /><b>Cnvrted brain</b><span style={{ color: "#6b6862" }}>{t.n.toLocaleString("en-US")} signals learned</span>
        </div>
        <span className="cg-tb-learned">What it learned</span>
        {t.mem.map((m, i) => (
          <div key={i} className="cg-tb-mem cg-tb-fade" style={{ top: 348 + i * 40, ...(i === 0 ? fade(t.memIn, -8) : { opacity: i === 1 ? 0.9 : 0.65 }) }}>
            <span className="cg-tb-dot" style={{ background: m.c }} /><span>{m.t}</span>
          </div>
        ))}
      </div>
      <h3>Train your cnvrted brain</h3>
      <p className="cg-sr">Every signal teaches your Cnvrted brain: the leads you approve, what you tell Orka, competitors’ posts and pricing, and news trends.</p>
    </article>
  );
}
