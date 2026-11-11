"use client";

import { useEffect } from "react";
import { useLater, usePatch } from "./hooks";
import { ScaleBox } from "./scale-box";

const GRIP = (
  <svg className="cg-wf-grip" width="12" height="12" viewBox="0 0 12 12" fill="#c9c6bd" aria-hidden="true">
    <circle cx="4" cy="3" r="1" /><circle cx="8" cy="3" r="1" /><circle cx="4" cy="6" r="1" /><circle cx="8" cy="6" r="1" /><circle cx="4" cy="9" r="1" /><circle cx="8" cy="9" r="1" />
  </svg>
);
const CHECK = <svg className="cg-popb" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10" /></svg>;

type NodeDef = { x: number; y: number; title: string; kicker: string; desc: string; descW: number; bg: string; fg: string; icon: React.ReactNode; ports: [number, number][] };
const NODES: NodeDef[] = [
  { x: 32, y: 28, title: "Find teams", kicker: "Account research", desc: "Startups hiring marketing roles.", descW: 150, bg: "#eef1fe", fg: "#4f65f5",
    icon: <><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></>, ports: [[-5, 62], [161, 62]] },
  { x: 312, y: 17, title: "Marketers", kicker: "Qualification", desc: "Rank CMOs and growth leads by fit.", descW: 154, bg: "#fdf3e1", fg: "#c2620a",
    icon: <><circle cx="9" cy="8" r="3.5" /><circle cx="17" cy="9" r="2.5" /><path d="M2.5 20c1-3.5 3.5-5.5 6.5-5.5s5.5 2 6.5 5.5M15 14.5c2.5 0 5 1.5 6 4.5" /></>, ports: [[-5, 62], [161, 62]] },
  { x: 320, y: 215, title: "Messages", kicker: "Outreach", desc: "Notes on their latest campaign.", descW: 147, bg: "#f3e8ff", fg: "#7e22ce",
    icon: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>, ports: [[-5, 62], [78, -5]] },
  { x: 70, y: 191.5, title: "Approval", kicker: "Review", desc: "Review each pitch to marketing.", descW: 150, bg: "#fef9c3", fg: "#a16207",
    icon: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>, ports: [[-5, 62], [161, 62]] },
];
const LINES = ["M198 94 C 250 94, 258 84, 311 84", "M479 84 C 540 92, 528 196, 403 214", "M320 282 C 276 282, 282 258, 237 258"];

/** "Finding contact to reaching out in one place": the graph builds step by step (find → rank → draft → approve), looping. */
export function WorkflowCard() {
  const [wf, set] = usePatch({ stage: 9, c: 0, press: false });
  const later = useLater();

  useEffect(() => {
    const count = (stage: number, to: number, ms: number, done: () => void) => {
      set({ stage, c: 0 });
      let i = 0; const steps = Math.min(to, 18);
      const step = () => { i++; set({ c: Math.round(to * i / steps) }); if (i < steps) later(step, ms / steps); else later(done, 350); };
      later(step, ms / steps);
    };
    const cycle = () => {
      set({ stage: 0, c: 0, press: false });
      later(() => count(1, 86, 1800, () => { set({ stage: 2 }); later(() => count(3, 24, 1500, () => { set({ stage: 4 }); later(() => count(5, 3, 1500, () => {
        set({ stage: 6 });
        later(() => { set({ stage: 7 }); later(() => { set({ press: true }); later(() => { set({ press: false, stage: 8 }); later(cycle, 2600); }, 200); }, 1500); }, 1000);
      }), 1000); }), 1000); }), 600);
    };
    cycle();
  }, [later, set]);

  const st = wf.stage, c = wf.c;
  const node = (work: number, workText: string, doneText: string) => {
    const spin = st === work, done = st > work, idle = st < work;
    return { spin, done, idle, cls: idle ? "is-hidden" : spin ? "is-on" : "", color: idle ? "#a19d94" : "#5f5c55", text: idle ? "Waiting" : spin ? workText : doneText };
  };
  const states = [
    node(1, `Searching… ${c} teams`, "86 teams found"),
    node(3, `Ranking… ${c} leads`, "24 leads listed"),
    node(5, `Drafting ${c} of 3…`, "3 drafts ready"),
  ];
  const n4 = { idle: st < 7, dot: st === 7, done: st >= 8, cls: st < 7 ? "is-hidden" : st === 7 ? "is-amber" : st === 8 ? "is-on" : "",
    color: st < 7 ? "#a19d94" : st >= 8 ? "#15803d" : "#7a6224", text: st < 7 ? "Waiting" : st >= 8 ? "Approved" : "3 ready" };
  const line = (s: number) => (st >= s ? 0 : 1);
  const dot = (s: number): React.CSSProperties => ({ offsetDistance: st >= s ? "100%" : "0%", opacity: st === s ? 1 : 0, transition: st < s ? "none" : undefined });

  return (
    <article className="cg-card cg-card--line">
      <h3>Finding contact to reaching out in one place</h3>
      <div className="cg-wf-box">
        <ScaleBox width={571} height={402}>
          <div className="cg-wf" aria-hidden="true">
            <svg className="cg-wf-lines" width="571" height="402" viewBox="0 0 571 402" fill="none">
              {LINES.map((d, i) => <path key={i} className="cg-wf-l" pathLength={1} strokeDashoffset={line(2 + i * 2)} d={d} stroke="#2f7d4f" strokeWidth="1.5" strokeLinecap="round" />)}
            </svg>
            <span className="cg-wf-dot cg-wf-d1" style={dot(2)} />
            <span className="cg-wf-dot cg-wf-d2" style={dot(4)} />
            <span className="cg-wf-dot cg-wf-d3" style={dot(6)} />
            {NODES.map((n, i) => {
              const s = i < 3 ? states[i] : null;
              return (
                <div key={n.title} className={`cg-wf-n ${s ? s.cls : n4.cls}`} style={{ left: n.x, top: n.y, borderColor: i === 3 && (n4.cls === "" || n4.cls === "is-hidden") ? "#e6d3a3" : undefined }}>
                  {n.ports.map(([x, y], k) => <span key={k} className="cg-wf-port" style={{ left: x, top: y }} />)}
                  <div className="cg-wf-ic" style={{ background: n.bg }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={n.fg} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{n.icon}</svg>
                  </div>
                  <p className="cg-wf-title">{n.title}</p>
                  {GRIP}
                  <p className="cg-wf-kick">{n.kicker}</p>
                  <p className="cg-wf-desc" style={{ width: n.descW }}>{n.desc}</p>
                  {s ? (
                    <span className="cg-wf-stat" style={{ color: s.color }}>
                      {s.spin && <span className="cg-spin" />}
                      {s.done && CHECK}
                      {s.idle && <span className="cg-wf-idle" />}
                      <span>{s.text}</span>
                    </span>
                  ) : (
                    <>
                      <span className="cg-wf-stat" style={{ color: n4.color }}>
                        {n4.idle && <span className="cg-wf-idle" />}
                        {n4.dot && <span className="cg-pulse" style={{ width: 6, height: 6, borderRadius: 3, background: "#d4a017" }} />}
                        {n4.done && CHECK}
                        <span>{n4.text}</span>
                      </span>
                      <span className="cg-wf-btn" style={{ display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${wf.press ? 0.88 : 1})`, opacity: st >= 7 ? 1 : 0.35 }}>{st >= 8 ? "Sent ✓" : "Approve"}</span>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </ScaleBox>
      </div>
    </article>
  );
}
