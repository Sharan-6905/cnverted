"use client";

import { useEffect, useRef } from "react";
import { useLater, usePatch } from "./hooks";

const DATA = [
  { name: "Evan Cole", sub: "Head of Strategy · Vertex Dynamics", signal: "Changed jobs", tag: "Networking", time: "1m ago", av: ["#f3e5fb", "#7e22ce"], logo: "M12 3L21.5 20H2.5Z M12 9.2L16.6 17.5H7.4Z", ph: false, rd: true },
  { name: "fastxo", sub: "Payments · 50–200 employees", signal: "Raised funding", tag: "Fintech", time: "3m ago", av: ["#eef1fe", "#3346c9"], logo: "M13.5 2L4 14h6.5l-1.5 8L19 9.5h-6.5z", ph: false, rd: true },
  { name: "Neuraplex", sub: "AI infrastructure · Bengaluru", signal: "Hiring", tag: "Technology", time: "6m ago", av: ["#730071", "#ffffff"], logo: "M12 2l8.66 5v10L12 22l-8.66-5V7z M12 8.5a3.5 3.5 0 1 0 0.01 0z", ph: true, rd: true },
  { name: "Lexsoft", sub: "Legal tech · 200–500 employees", signal: "New product", tag: "Consulting", time: "9m ago", av: ["#f3e5fb", "#1c1f33"], logo: "M4 4h7v16H4z M13 4h7v7h-7z M13 13h7v7h-7z", ph: true, rd: false },
  { name: "bloomkart", sub: "D2C marketplace · Mumbai", signal: "Announcement", tag: "Cloud", time: "12m ago", av: ["#222122", "#f5c518"], logo: "M12 2a5 5 0 0 1 0 10a5 5 0 0 1 0-10z M12 12a5 5 0 0 1 0 10a5 5 0 0 1 0-10z M2 12a5 5 0 0 1 10 0a5 5 0 0 1-10 0z M12 12a5 5 0 0 1 10 0a5 5 0 0 1-10 0z", ph: false, rd: true },
  { name: "lintgo", sub: "Dev tools · 500+ employees", signal: "IPO listing", tag: "Technology", time: "15m ago", av: ["#2d2d2d", "#ffffff"], logo: "M9 5l-7 7 7 7 1.8-1.8L5.6 12l5.2-5.2z M15 5l-1.8 1.8 5.2 5.2-5.2 5.2L15 19l7-7z", ph: true, rd: true },
  { name: "Nina Patel", sub: "Chief Marketing Officer · Apex Systems", signal: "Posted on LinkedIn", tag: "Marketing", time: "18m ago", av: ["#fde7d4", "#9a3412"], logo: "M2 20L9 6.5l4.2 7.6L15.5 10.5 22 20z", ph: false, rd: true },
];
const N = DATA.length, RAD = 190, STEP = 34;
const rel = (i: number, a: number) => { const r = ((i - a) % N + N) % N; return r > N / 2 ? r - N : r; };

/** "Leads with context": the leads sit round a drum that turns on its horizontal axis. Spins on its own;
 *  a wheel/trackpad scroll over it turns it by hand, and auto-spin resumes 3 s later. */
export function LeadsWheel() {
  const [s, set, ref] = usePatch({ active: 3, prev: 3 });
  const later = useLater();
  const wheel = useRef<HTMLDivElement>(null);
  const userAt = useRef(0);

  useEffect(() => {
    const step = (dir: number) => { const cur = ref.current.active; set({ prev: cur, active: (cur + dir + N) % N }); };
    const tick = () => later(() => { if (Date.now() - userAt.current > 3000) step(1); tick(); }, 2800);
    tick();
    const el = wheel.current;
    if (!el) return;
    let acc = 0, lock = 0;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      userAt.current = Date.now();
      acc += e.deltaY;
      const now = Date.now();
      if (Math.abs(acc) >= 40 && now - lock > 450) { step(acc > 0 ? 1 : -1); acc = 0; lock = now; }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [later, set, ref]);

  return (
    <article className="cg-card cg-lw">
      <h3>Leads with context</h3>
      <div ref={wheel} className="cg-lw-wheel" title="Scroll to spin the wheel">
        <div className="cg-lw-drum">
          {DATA.map((d, i) => {
            const r = rel(i, s.active), pr = rel(i, s.prev), k = Math.abs(r), focus = r === 0;
            const op = k === 0 ? 1 : k === 1 ? 0.78 : k === 2 ? 0.4 : 0;
            return (
              <div key={d.name} className={`cg-lw-row${focus ? " is-focus" : ""}${Math.abs(r - pr) > 1 ? " is-jump" : ""}`} aria-hidden={!focus}
                style={{ opacity: op, zIndex: 10 - k, transform: `translateY(149px) translateZ(-${RAD}px) rotateX(${-r * STEP}deg) translateZ(${RAD}px)${focus ? " scale(1.04)" : ""}` }}>
                <div className="cg-lw-top">
                  <span className="cg-lw-logo" role="img" aria-label={`${d.name} logo`} style={{ background: d.av[0], color: d.av[1] }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d={d.logo} fill="currentColor" fillRule="evenodd" /></svg>
                  </span>
                  <span className="cg-lw-who"><b>{d.name}</b><span>{d.sub}</span></span>
                  <span className="cg-lw-chan">
                    <span title="Work email" style={{ background: "#e8f5ed" }}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg></span>
                    <span title="Mobile" style={{ background: d.ph ? "#e8f5ed" : "#f1f1f3" }}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={d.ph ? "#15803d" : "#b8b8c0"} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></svg></span>
                    <span title="LinkedIn" style={{ background: "#0a66c2" }}>in</span>
                    <span title="Reddit" style={{ borderRadius: 9, background: d.rd ? "#ff4500" : "#d4d4d8", fontSize: 8 }}>r/</span>
                  </span>
                </div>
                <div className="cg-lw-meta">
                  <span className="cg-lw-sig" style={{ background: focus ? "#4f65f5" : "#eef1fe", color: focus ? "#fff" : "#3346c9" }}>{d.signal}</span>
                  <span className="cg-lw-tag">{d.tag}</span>
                  <span className="cg-lw-time">{d.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}
