"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Orka from "./Orka";
import { useLater } from "./hooks";

type FragType = "leads" | "email" | "social" | "lead" | "community" | "meeting" | "enrich";
type Item = { on: boolean; out: boolean; x: number; y: number; id: number };
const TYPES: FragType[] = ["leads", "email", "social", "lead", "community", "meeting", "enrich"];
// rendered size of each card (base size × 1.2 zoom, plus room for the bob and enter/exit motion)
const SIZES: Record<FragType, [number, number]> = { leads: [316, 124], email: [258, 104], social: [268, 100], lead: [328, 82], community: [356, 96], meeting: [294, 90], enrich: [246, 82] };
// centre content (face, heading, subtitle, chips + chat box) in a 1440-wide section, padded by 24 px
const BLOCKED: [number, number, number, number][] = [[597, 97, 246, 174], [516, 233, 408, 141], [456, 336, 528, 96], [296, 436, 848, 244]];
const ZOOM = 1.2, BASE_H = 777; // BLOCKED is drawn for a 1440 x 777 section; it's re-centred for the real size

const CHECK = (c = "#b8f2cf") => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10" /></svg>;

function Frag({ type, it }: { type: FragType; it: Item }) {
  const cls = `cg-frag${it.out ? " out" : ""}`;
  const pos = { left: Math.round(it.x / ZOOM), top: Math.round(it.y / ZOOM) };
  switch (type) {
    case "leads": return (
      <div className={cls} style={{ ...pos, width: 262 }}>
        <div className="cg-swap">
          <span className="cg-swap-out"><svg className="cg-wiggle" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>Searching fintechs hiring SDRs…</span>
          <span className="cg-swap-in">{CHECK()}Found <b>24 leads</b></span>
        </div>
        <span style={{ display: "block", marginTop: 8, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.2)", overflow: "hidden" }}><span className="cg-bar-fill" /></span>
        <div style={{ marginTop: 8, display: "flex" }}>
          {["#f3c6a5", "#c9b6f2", "#a7d8c4"].map((bg, i) => <span key={bg} className="cg-fpop" style={{ width: 20, height: 20, marginLeft: i ? -6 : 0, borderRadius: 10, background: bg, border: "1.5px solid rgba(0,0,0,0.15)", animationDelay: `${2.1 + i * 0.2}s` }} />)}
          <span className="cg-fpop" style={{ height: 20, marginLeft: 4, fontSize: 11, lineHeight: "20px", opacity: 0.85, animationDelay: "2.7s" }}>+21 more</span>
        </div>
      </div>
    );
    case "email": return (
      <div className={cls} style={{ ...pos, width: 214 }}>
        <div className="cg-swap" style={{ marginBottom: 8 }}>
          <span className="cg-swap-out"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>Drafting email to Meera…</span>
          <span className="cg-swap-in">{CHECK()}Draft ready to send</span>
        </div>
        <span className="cg-type" style={{ height: 5, width: "92%", borderRadius: 3, background: "rgba(255,255,255,0.4)", marginBottom: 5, animationDelay: ".3s" }} />
        <span className="cg-type" style={{ height: 5, width: "80%", borderRadius: 3, background: "rgba(255,255,255,0.32)", marginBottom: 5, animationDelay: "1.1s" }} />
        <span style={{ display: "flex", alignItems: "center", gap: 2 }}><span className="cg-type" style={{ height: 5, width: "52%", borderRadius: 3, background: "rgba(255,255,255,0.26)", animationDelay: "1.9s" }} /><span className="cg-fblink" style={{ width: 1.5, height: 10, background: "#fff" }} /></span>
      </div>
    );
    case "social": return (
      <div className={cls} style={{ ...pos, width: 222, overflow: "hidden" }}>
        <span className="cg-sweep" />
        <div className="cg-swap">
          <span className="cg-swap-out">Scanning social for signals…</span>
          <span className="cg-swap-in"><b>12</b>&nbsp;new buying signals</span>
        </div>
        <div style={{ marginTop: 8, display: "flex", gap: 6 }}>
          {[["in", "#0a66c2", 5, 10], ["r/", "#ff4500", 11, 10], ["X", "#000", 5, 11], ["wa", "#25d366", 11, 9]].map(([t, bg, r, fs], i) => (
            <span key={t as string} className="cg-fpop" style={{ width: 22, height: 22, borderRadius: r as number, background: bg as string, fontSize: fs as number, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", animationDelay: `${0.4 + i * 0.5}s` }}>{t}</span>
          ))}
        </div>
      </div>
    );
    case "lead": return (
      <div className={cls} style={{ ...pos, width: 272, display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ width: 28, height: 28, flex: "none", borderRadius: 14, background: "rgba(255,255,255,0.22)", fontSize: 10, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center" }}>AR</span>
        <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}><b>Arjun Rao</b><span style={{ opacity: 0.8, fontSize: 11 }}>Curated lead · hiring packaging</span></span>
        <span style={{ position: "relative", width: 32, height: 32, flex: "none" }}>
          <svg width="32" height="32" viewBox="0 0 32 32" style={{ position: "absolute", left: 0, top: 0, transform: "rotate(-90deg)" }}><circle cx="16" cy="16" r="14" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3" /><circle className="cg-ring" cx="16" cy="16" r="14" fill="none" stroke="#b8f2cf" strokeWidth="3" strokeLinecap="round" /></svg>
          <span className="cg-fpop" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--cg-mono)", fontSize: 11, color: "#b8f2cf", animationDelay: "1.9s" }}>91</span>
        </span>
      </div>
    );
    case "community": return (
      <div className={cls} style={{ ...pos, width: 296 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <span style={{ position: "relative", width: 16, height: 16, flex: "none" }}>
            <span className="cg-ping" style={{ position: "absolute", inset: 0, borderRadius: 8, background: "#ff4500" }} />
            <span style={{ position: "absolute", inset: 0, borderRadius: 8, background: "#ff4500" }} />
          </span>
          <span>Thread in <b>r/startups</b> matches your ICP</span>
        </div>
        <div style={{ marginTop: 8, display: "flex", gap: 5, flexWrap: "wrap" }}>
          {["eco packaging", "D2C founder"].map((t, i) => <span key={t} className="cg-fpop" style={{ padding: "2px 8px", borderRadius: 99, background: "rgba(255,255,255,0.16)", fontSize: 11, animationDelay: `${0.8 + i * 0.4}s` }}>{t}</span>)}
        </div>
      </div>
    );
    case "meeting": return (
      <div className={cls} style={{ ...pos, width: 244 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span>Booking with Olivia · Narasoft</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b8f2cf" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path className="cg-draw" d="M5 12l5 5 9-10" /></svg>
        </div>
        <div style={{ marginTop: 8, display: "flex", gap: 6, fontSize: 11 }}>
          <span style={{ padding: "3px 8px", borderRadius: 7, background: "rgba(255,255,255,0.12)" }}>Wed 4:00</span>
          <span className="cg-slot-pick" style={{ padding: "3px 8px", borderRadius: 7 }}>Thu 11:00</span>
          <span style={{ padding: "3px 8px", borderRadius: 7, background: "rgba(255,255,255,0.12)" }}>Fri 2:30</span>
        </div>
      </div>
    );
    case "enrich": return (
      <div className={cls} style={{ ...pos, width: 200 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}><span>Waterfall enrichment</span><span style={{ fontFamily: "var(--cg-mono)", fontSize: 11, opacity: 0.85 }}>6 sources</span></div>
        <div style={{ marginTop: 8, display: "flex", gap: 5 }}>
          {[0, 1, 2, 3, 4, 5].map((i) => <span key={i} className="cg-dot-on" style={{ flex: 1, height: 6, borderRadius: 3, animationDelay: `${0.3 + i * 0.4}s` }} />)}
        </div>
      </div>
    );
  }
}

const CHIPS: [string, React.ReactNode][] = [
  ["Fintechs hiring SDRs", <svg key="a" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e8743b" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" fill="#e8743b" /></svg>],
  ["Who needs a video editor?", <svg key="b" width="16" height="16" viewBox="0 0 24 24" fill="#a78bfa" aria-hidden="true"><path d="M13 2L4 14h7l-1 8 9-12h-7z" /></svg>],
  ["Communities for my ICP", <svg key="c" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6fbf73" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="8" r="3" /><circle cx="5" cy="10" r="2.2" /><circle cx="19" cy="10" r="2.2" /><path d="M7 19c.8-3 2.7-4.5 5-4.5s4.2 1.5 5 4.5M2 18c.4-2 1.6-3 3-3M22 18c-.4-2-1.6-3-3-3" /></svg>],
  ["Last cold list results", <svg key="d" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 3v18h18" /><path d="M7 15l4-4 3 3 6-6" /></svg>],
];

/** "Hi! I'm Orka": Orka at work in the background (status cards drift in and out at random, never over the
 *  middle), and an ask box. Focusing the box hushes the cards and Orka looks at what you type. */
export function OrkaSection({ appHref }: { appHref: string }) {
  const sec = useRef<HTMLElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const [text, setText] = useState("");
  const [items, setItems] = useState<Partial<Record<FragType, Item>>>({});
  const itemsRef = useRef(items);
  itemsRef.current = items;
  const later = useLater();
  const ids = useRef(0);

  const place = useCallback((type: FragType, cur: Partial<Record<FragType, Item>>) => {
    const W = sec.current?.clientWidth ?? 1440;
    const H = sec.current?.clientHeight ?? BASE_H;
    const dx = (W - 1440) / 2, dy = (H - BASE_H) / 2;
    const [w, h] = SIZES[type];
    const rects = BLOCKED.map(([x, y, rw, rh]) => [x + dx, y + dy, rw, rh]);
    TYPES.forEach((t) => { const it = cur[t]; if (it?.on) rects.push([it.x - 20, it.y - 20, SIZES[t][0] + 40, SIZES[t][1] + 40]); });
    for (let n = 0; n < 60; n++) {
      const x = 16 + Math.random() * (W - 32 - w), y = 16 + Math.random() * (H - 32 - h);
      if (!rects.some((r) => x < r[0] + r[2] && x + w > r[0] && y < r[1] + r[3] && y + h > r[1])) return { x: Math.round(x), y: Math.round(y) };
    }
    return null;
  }, []);

  useEffect(() => {
    if (window.matchMedia?.("(max-width: 900px)").matches) return; // cards are hidden on small screens
    const retire = (type: FragType, id: number) => {
      setItems((cur) => (cur[type]?.id === id ? { ...cur, [type]: { ...cur[type]!, out: true } } : cur));
      later(() => setItems((cur) => (cur[type]?.id === id ? { ...cur, [type]: { ...cur[type]!, on: false, out: false } } : cur)), 950);
    };
    const spawn = () => {
      const cur = itemsRef.current;
      if (TYPES.filter((t) => cur[t]?.on).length >= 4) return;
      const idle = TYPES.filter((t) => !cur[t]?.on);
      if (!idle.length) return;
      const type = idle[Math.floor(Math.random() * idle.length)];
      const pos = place(type, cur);
      if (!pos) return;
      const id = ++ids.current;
      const next = { ...cur, [type]: { on: true, out: false, ...pos, id } };
      itemsRef.current = next;
      setItems(next);
      later(() => retire(type, id), 4600 + Math.random() * 2600);
    };
    const loop = () => later(() => { spawn(); loop(); }, 1300 + Math.random() * 1500);
    later(spawn, 300); later(spawn, 1100); later(spawn, 1900);
    loop();
  }, [later, place]);

  useEffect(() => {
    if (!focused) return;
    const away = (e: PointerEvent) => { if (!(e.target as Element).closest?.(".cg-askbox, .cg-chip")) setFocused(false); };
    document.addEventListener("pointerdown", away);
    return () => document.removeEventListener("pointerdown", away);
  }, [focused]);

  // The marketing site can't run Orka itself, so asking takes you to the app to sign up.
  const submit = () => { window.location.href = appHref; };

  return (
    <section ref={sec} className={`cg-orka${focused ? " is-focused" : ""}`} aria-labelledby="cg-orka-title">
      <img className="cg-orka-bg" src="/crockedglass/orka-bg.webp" alt="" loading="lazy" decoding="async" />
      <div className="cg-frags" aria-hidden="true">
        {TYPES.map((t) => { const it = items[t]; return it?.on ? <Frag key={`${t}-${it.id}`} type={t} it={it} /> : null; })}
      </div>
      <div className="cg-orka-mid">
        <div className="cg-orka-hello">
          <div className="cg-orka-cat">
            <Orka mood={focused ? "curious" : "grumpy"} lookAt={focused ? (input as React.RefObject<Element>) : undefined} title="Orka, the Cnvrted cat" />
          </div>
          <h2 id="cg-orka-title">Hi! I’m Orka</h2>
          <p>Your GTM operator. Ask me to find leads, build lists, write outreach or check what’s working.</p>
        </div>
        <div className="cg-orka-ask">
          <div className="cg-chips">
            {CHIPS.map(([label, icon]) => (
              <button key={label} type="button" className="cg-chip" onClick={() => { setText(label); setFocused(true); input.current?.focus(); }}>{icon}{label}</button>
            ))}
          </div>
          <form className="cg-askbox" onClick={() => { setFocused(true); input.current?.focus(); }} onSubmit={(e) => { e.preventDefault(); submit(); }}>
            <label htmlFor="cg-orka-ask" className="cg-sr">Ask Orka</label>
            <input id="cg-orka-ask" ref={input} type="text" value={text} onChange={(e) => setText(e.target.value)} onFocus={() => setFocused(true)} placeholder="How can Orka help today?" autoComplete="off" />
            <div className="cg-askbar">
              <span>Model: GPT-4.0<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg></span>
              <span>
                <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></svg>Settings</span>
                <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M21 11l-8.5 8.5a5 5 0 01-7-7L14 4a3.3 3.3 0 014.7 4.7L10 17.4a1.7 1.7 0 01-2.4-2.4L15.5 7" /></svg>Attach</span>
                <button type="submit" className="cg-asksend" aria-label="Ask Orka">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6" /></svg>
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
