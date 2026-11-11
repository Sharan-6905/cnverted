"use client";

import { useEffect } from "react";
import { useLater, usePatch } from "./hooks";

const M1 = "Can you schedule meeting with narasoft?";
const M2 = "Yup, tell me what date and time proposal I should send to Olivia (CFO, Narasoft)";
const M3 = "Um, send her cal link and ask her if she can give me a date and time";

const TICKS = <svg width="16" height="11" viewBox="0 0 16 11" role="img" aria-label="Read"><path d="M11.07.65 4.77 8.41 2.17 6.01l-.98 1.06 3.72 3.43L12.18 1.56zM15.6.65 9.3 8.41l-.92-.85-.98 1.06 2.04 1.88 7.27-8.94z" fill="#53bdeb" /></svg>;
const TAIL_ME = <svg className="cg-bub-tail" width="8" height="13" viewBox="0 0 8 13" aria-hidden="true"><path d="M0 0h6.2c1.6 0 2.3 1.9 1.1 2.9L0 9.5z" fill="#d9fdd3" /></svg>;
const TAIL_THEM = <svg className="cg-bub-tail" width="8" height="13" viewBox="0 0 8 13" aria-hidden="true"><path d="M8 0H1.8C.2 0-.5 1.9.7 2.9L8 9.5z" fill="#fff" /></svg>;

/** "Few messages are enough": a WhatsApp-style chat with Orka that types itself out and loops. */
export function ChatCard() {
  const [c, set] = usePatch({ b1: true, b2: true, b3: true, dots: false, input: "", typing: false, press: false });
  const later = useLater();

  useEffect(() => {
    const type = (text: string, done: () => void) => {
      let i = 0;
      set({ typing: true, input: "" });
      const step = () => {
        i++;
        set({ input: text.slice(0, i) });
        if (i < text.length) later(step, 34 + Math.random() * 40);
        else later(() => { set({ press: true }); later(() => { set({ press: false, typing: false, input: "" }); done(); }, 180); }, 450);
      };
      later(step, 300);
    };
    const cycle = () => {
      set({ b1: false, b2: false, b3: false, dots: false, input: "", typing: false });
      later(() => type(M1, () => {
        set({ b1: true });
        later(() => set({ dots: true }), 500);
        later(() => {
          set({ dots: false, b2: true });
          later(() => type(M3, () => { set({ b3: true }); later(cycle, 3800); }), 1100);
        }, 2100);
      }), 700);
    };
    cycle();
  }, [later, set]);

  const has = !!c.input;
  return (
    <article className="cg-card cg-chat">
      <h3>Few messages are enough</h3>
      <div className="cg-chat-body" aria-hidden="true">
        <div className="cg-chat-log">
          {c.b1 && <div className="cg-bub cg-bub--me cg-pop">{TAIL_ME}<span>{M1}</span><span className="cg-bub-meta">10:41{TICKS}</span></div>}
          {c.dots && <div className="cg-bub cg-bub--them cg-typing cg-pop">{TAIL_THEM}<span className="cg-chdot" /><span className="cg-chdot" style={{ animationDelay: ".15s" }} /><span className="cg-chdot" style={{ animationDelay: ".3s" }} /></div>}
          {c.b2 && <div className="cg-bub cg-bub--them cg-pop">{TAIL_THEM}<span>{M2}</span><span className="cg-bub-meta">10:41</span></div>}
          {c.b3 && <div className="cg-bub cg-bub--me cg-pop">{TAIL_ME}<span>{M3}</span><span className="cg-bub-meta">10:42{TICKS}</span></div>}
        </div>
        <div className="cg-compose">
          <div className="cg-compose-in">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8696a0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none" }}><circle cx="12" cy="12" r="9" /><path d="M8.5 14.5c.9 1.2 2.1 1.8 3.5 1.8s2.6-.6 3.5-1.8" /><path d="M9 9.5h.01M15 9.5h.01" /></svg>
            <p style={{ color: has ? "#111b21" : "#8696a0" }}>{has ? c.input : "Message"}{c.typing && <span className="cg-caret" />}</p>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8696a0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none" }}><path d="M20.5 11.5l-8.2 8.2a5 5 0 0 1-7.1-7.1l8.2-8.2a3.4 3.4 0 0 1 4.8 4.8l-8.2 8.2a1.7 1.7 0 0 1-2.4-2.4l7.5-7.5" /></svg>
          </div>
          <span className="cg-compose-send" style={{ transform: `scale(${c.press ? 0.88 : 1})` }}>
            {has
              ? <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M3.4 20.4 21 12 3.4 3.6 3.4 10l12.6 2-12.6 2z" /></svg>
              : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" /></svg>}
          </span>
        </div>
      </div>
      <p className="cg-sr">Example: you ask Orka on WhatsApp to schedule a meeting with Narasoft, and Orka asks which time to propose to their CFO.</p>
    </article>
  );
}
