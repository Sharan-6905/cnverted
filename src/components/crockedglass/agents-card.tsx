"use client";

import { useEffect } from "react";
import { useLater, usePatch } from "./hooks";

const AGENTS = [
  { ini: "Sc", name: "Scout", tile: ["#eef1fe", "#3346c9"] },
  { ini: "Qu", name: "Qualifier", tile: ["#fdf3e1", "#a16207"] },
  { ini: "Wr", name: "Writer", tile: ["#f3e8ff", "#7e22ce"] },
  { ini: "Bk", name: "Booker", tile: ["#e8f5ed", "#15803d"] },
];
const TASKS = ["Find leads", "Lead generation", "Email draft", "Follow-ups"];
const ICONS = [ // search · person-plus · mail · repeat
  "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4",
  "M9.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2.5 20c.8-3.6 3.5-5.5 7-5.5s6.2 1.9 7 5.5M19 8v6M16 11h6",
  "M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM3 7l9 6 9-6",
  "M17 2l3 3-3 3M4 11V9a4 4 0 0 1 4-4h12M7 22l-3-3 3-3M20 13v2a4 4 0 0 1-4 4H4",
];
const COLORS = ["#4f65f5", "#d4a017", "#7e22ce", "#0891b2"];
const geo = (i: number) => {
  const rowTop = 112 + i * 82, menuH = 4 * 32 + 12, menuTop = i < 2 ? rowTop + 58 : rowTop + 14 - menuH;
  return { chipY: rowTop + 36, menuTop, itemY: (k: number) => menuTop + 6 + k * 32 + 16 };
};

/** "Your AI agents, on task": a cursor opens each agent's task menu, hovers down to a task and picks it; the
 *  agent works and finishes. Loops. */
export function AgentsCard() {
  const [A, set, ref] = usePatch({ st: [3, 3, 3, 3], pick: [0, 1, 2, 3], menu: -1, hl: -1, cx: 300, cy: 400, press: false, hide: true });
  const later = useLater();

  useEffect(() => {
    const setArr = (key: "st" | "pick", i: number, v: number) => { const arr = ref.current[key].slice(); arr[i] = v; set({ [key]: arr }); };
    const click = (then: () => void) => { set({ press: true }); later(() => { set({ press: false }); then(); }, 180); };
    const agent = (i: number) => {
      if (i > 3) { set({ hide: true }); later(cycle, 4800); return; }
      const g = geo(i), j = i;
      set({ hide: false, cx: 290, cy: g.chipY });
      later(() => click(() => {
        set({ menu: i, hl: -1 });
        const hover = (k: number) => {
          set({ cx: 262, cy: g.itemY(k), hl: k });
          if (k < j) { later(() => hover(k + 1), 420); return; }
          later(() => click(() => {
            setArr("pick", i, j);
            set({ menu: -1, hl: -1 });
            setArr("st", i, 1);
            later(() => setArr("st", i, 3), 2400 + i * 300);
            later(() => agent(i + 1), 350);
          }), 450);
        };
        later(() => hover(0), 300);
      }), 800);
    };
    const cycle = () => { set({ st: [0, 0, 0, 0], pick: [0, 0, 0, 0], menu: -1, hl: -1, cx: 300, cy: 470, press: false, hide: true }); later(() => agent(0), 700); };
    cycle();
  }, [later, set, ref]);

  const m = A.menu >= 0 ? A.menu : 0, g = geo(m);
  return (
    <article className="cg-card cg-card--line">
      <h3>Your AI agents, on task</h3>
      <div className="cg-ag-list" aria-hidden="true">
        {AGENTS.map((d, i) => {
          const st = A.st[i], open = A.menu === i, chosen = st > 0, p = A.pick[i];
          return (
            <div key={d.name} className={`cg-ag-row${open ? " is-open" : ""}${st === 3 ? " is-done" : ""}`}>
              <span className="cg-ag-tile" style={{ background: d.tile[0], color: d.tile[1] }}>{d.ini}</span>
              <span className="cg-ag-mid">
                <span className="cg-ag-name">{d.name}</span>
                <span className="cg-ag-sub" style={{ color: st === 0 ? "#a19d94" : st === 3 ? "#0d0d0d" : "#5f5c55" }}>
                  {st === 1 && <span className="cg-spin" />}
                  {st === 3 && <svg className="cg-popb" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10" /></svg>}
                  {st === 2 ? <span className="cg-ag-review">Mark done</span> : <span>{st === 0 ? "Waiting for a task" : st === 1 ? "Working…" : "Done"}</span>}
                </span>
                <span className="cg-ag-track" style={{ opacity: st === 1 || st === 2 ? 1 : 0 }}>
                  <span style={{ background: COLORS[p], width: st >= 2 ? "100%" : st === 1 ? "100%" : "0%", transition: st === 1 ? "width 2.2s cubic-bezier(.45,0,.55,1)" : "none" }} />
                </span>
              </span>
              <span className={`cg-ag-dd${open ? " is-open" : ""}${chosen ? " is-chosen" : ""}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={chosen ? COLORS[p] : "#a19d94"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none" }}><path d={chosen ? ICONS[p] : "M4 7h16M4 12h16M4 17h10"} /></svg>
                <span>{chosen ? TASKS[p] : "Select task"}</span>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
              </span>
            </div>
          );
        })}
      </div>
      <span className="cg-ag-upcoming"><span className="cg-pulse" style={{ width: 6, height: 6, borderRadius: 3, background: "var(--cg-accent)" }} />Upcoming</span>
      <div className="cg-ag-menu" aria-hidden="true" style={{ top: g.menuTop, opacity: A.menu >= 0 ? 1 : 0, transform: `translateY(${A.menu >= 0 ? 0 : m < 2 ? -6 : 6}px) scale(${A.menu >= 0 ? 1 : 0.97})`, transformOrigin: m < 2 ? "80% 0" : "80% 100%" }}>
        {TASKS.map((label, k) => (
          <div key={label} className={`cg-ag-item${A.hl === k ? " is-hl" : ""}`}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={COLORS[k]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none" }}><path d={ICONS[k]} /></svg>{label}
          </div>
        ))}
      </div>
      <svg className="cg-ag-cursor" aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" style={{ opacity: A.hide ? 0 : 1, transform: `translate(${A.cx}px, ${A.cy}px) scale(${A.press ? 0.82 : 1})` }}>
        <path d="M4 2l15 8.5-6.6 1.6L9.6 19z" fill="#0d0d0d" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <p className="cg-sr">Four agents (Scout, Qualifier, Writer and Booker) each take a task: find leads, generate leads, draft emails and follow up.</p>
    </article>
  );
}
