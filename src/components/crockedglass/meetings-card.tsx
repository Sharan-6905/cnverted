"use client";

import { useEffect } from "react";
import { prefersReducedMotion, useLater, usePatch } from "./hooks";

const STEPS = [
  { title: "Outbound", sub: "Lead found · Priya Nair, Finlo", c: "#4f65f5",
    icon: <><path d="M22 2L2 9l9 4 4 9z" fill="#4f65f5" fillOpacity=".28" /><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" fill="none" stroke="#4f65f5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></> },
  { title: "Reach out", sub: "Email sent · meeting confirmed", c: "#8b5cf6",
    icon: <><path d="M3 6h18v12H3z" fill="#8b5cf6" fillOpacity=".28" /><path d="M3 6h18v12H3zM3 7l9 6 9-6" fill="none" stroke="#8b5cf6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></> },
  { title: "Updating CRM", sub: "Stage set to Meeting booked", c: "#0891b2",
    icon: <><path d="M4 7v10c0 1.7 3.6 3 8 3s8-1.3 8-3V7c0 1.7-3.6 3-8 3S4 8.7 4 7z" fill="#0891b2" fillOpacity=".28" /><path d="M12 4c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 7v10c0 1.7 3.6 3 8 3s8-1.3 8-3V7M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" fill="none" stroke="#0891b2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></> },
];

// The curved connectors between the cards (viewBox 344×46, stretched to the card column's width).
const LINKS = [
  ["M41.3 0C41.3 25.3 96.3 20.7 96.3 46", "M172.0 0C172.0 25.3 172.0 20.7 172.0 46", "M302.7 0C302.7 25.3 247.7 20.7 247.7 46"],
  ["M96.3 0C96.3 25.3 137.6 20.7 137.6 46", "M172.0 0C172.0 25.3 172.0 20.7 172.0 46", "M247.7 0C247.7 25.3 206.4 20.7 206.4 46"],
];
const DELAYS = ["-0s", "-0.51s", "-0.02s"];

/** "Meetings booked, CRM updated": three steps tick green in turn while the lines between them light up. */
export function MeetingsCard() {
  const [m, set] = usePatch({ k: 3, l: 2, reset: false });
  const later = useLater();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const cycle = () => {
      set({ k: 0, l: 0, reset: true });
      later(() => set({ reset: false }), 60);
      later(() => set({ k: 1 }), 700);
      later(() => set({ l: 1 }), 1300);
      later(() => set({ k: 2 }), 2150);
      later(() => set({ l: 2 }), 2750);
      later(() => set({ k: 3 }), 3600);
      later(cycle, 6600);
    };
    later(cycle, 600);
  }, [later, set]);

  return (
    <article className="cg-card cg-card--line cg-mt">
      <div className="cg-mt-layer" aria-hidden="true">
        {LINKS.map((paths, j) => (
          <svg key={j} className="cg-mt-links" style={{ top: 202 + j * 120 }} width="344" height="46" viewBox="0 0 344 46" preserveAspectRatio="none" fill="none">
            <g stroke="#e2dfd8" strokeWidth="1.2">{paths.map((d) => <path key={d} d={d} />)}</g>
            <g className="cg-mt-flow" stroke={m.l > j ? "#22c55e" : "#b9b5ac"} strokeWidth="2" strokeLinecap="round">
              {paths.map((d, i) => <path key={d} d={d} style={{ animationDelay: DELAYS[i] }} />)}
            </g>
          </svg>
        ))}
        {STEPS.map((s, i) => {
          const on = i < m.k;
          return (
            <div key={s.title} className="cg-mt-card" style={{ top: 128 + i * 120, boxShadow: on ? "0 8px 22px rgba(34,197,94,.12)" : "0 1px 2px rgba(13,13,13,.04)" }}>
              <span className="cg-mt-tick" style={{ background: on ? "#22c55e" : "transparent", borderColor: on ? "#22c55e" : "#d6d3cc" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12.5l4.5 4.5L19 7.5" strokeDasharray="24" strokeDashoffset={on ? 0 : 24} style={{ transition: m.reset ? "none" : "stroke-dashoffset .45s ease .1s" }} />
                </svg>
              </span>
              <span className="cg-mt-text"><b>{s.title}</b><span>{s.sub}</span></span>
              <span className="cg-mt-ico" style={{ boxShadow: `0 6px 16px rgba(13,13,13,.10), inset 0 0 0 1px ${s.c}33` }}>
                <svg width="20" height="20" viewBox="0 0 24 24">{s.icon}</svg>
              </span>
            </div>
          );
        })}
      </div>
      <h3>Meetings booked, CRM updated</h3>
      <p className="cg-sr">Orka finds the lead, reaches out until a meeting is confirmed, and sets the deal’s CRM stage to Meeting booked.</p>
    </article>
  );
}
