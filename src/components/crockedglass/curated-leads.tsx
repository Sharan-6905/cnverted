"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ScaleBox } from "./scale-box";

/** Extra scroll distance the section stays pinned for while the story plays from 0 to 1. */
const PIN = 1700;
const STORY_W = 1112, STORY_H = 640;

const PROMPT = "Find D2C brands in India switching to eco-friendly packaging, and get me their founders.";
const KEYWORDS = ["D2C brands", "India", "Eco packaging", "Founders", "Switching now"];
const SOURCES: [string, string][] = [["Company graph", "firmographics"], ["Hiring signals", "open roles"], ["Funding rounds", "last 12 months"], ["Social profiles", "founders"], ["Work email check", "deliverable"], ["Phone check", "reachable"]];
const LEADS = [
  { name: "Meera Iyer", first: "Meera", role: "Founder · Tiny Bites", company: "Tiny Bites", signal: "Launched a kids’ food line", score: 94, why: [["Launched a new kids’ food line this month", "Launch post"], ["Hiring a packaging and ops lead", "Hiring signal"], ["Founder posts about plastic-free goals", "Social profile"]] },
  { name: "Arjun Rao", first: "Arjun", role: "Co-founder · FitLoop", company: "FitLoop", signal: "Hiring a packaging lead", score: 91, why: [["Open role for a packaging lead", "Hiring signal"], ["Raised a seed round in the last quarter", "Funding round"], ["Verified work email and phone", "Contact check"]] },
  { name: "Sana Khan", first: "Sana", role: "Founder · Bloom Skin", company: "Bloom Skin", signal: "Moving to refill packs", score: 88, why: [["Announced refill packs for its core range", "Launch post"], ["Ships 500+ orders a month across India", "Company graph"], ["Active founder on LinkedIn", "Social profile"]] },
  { name: "Vikram Shah", first: "Vikram", role: "CEO · UrbanNest", company: "UrbanNest", signal: "Raised a seed round", score: 84, why: [["Raised a seed round to expand categories", "Funding round"], ["Hiring for supply chain", "Hiring signal"], ["Verified work email", "Contact check"]] },
  { name: "Neha Gupta", first: "Neha", role: "Founder · PlayPal", company: "PlayPal", signal: "Festive launch next month", score: 79, why: [["Teasing a festive gift range", "Launch post"], ["Asked about sustainable boxes in a founder group", "Social profile"], ["Reachable on WhatsApp", "Contact check"]] },
];
const CHECK_P = "M7.5 12.5l3 3 6-6.5", DASH_P = "M8 12h8";

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

/**
 * Curated leads. When the section reaches the middle of the screen it holds still (position: sticky inside a
 * runway PIN px taller than itself) and the scroll inside that runway plays the story: the prompt types, keywords
 * light up, Orka matches the ICP, the waterfall confirms each source, and five leads land and get scored. Once it
 * has finished the page scrolls on, and the leads stay interactive: hover for the reasons, reach out, send.
 */
export function CuratedLeads() {
  const runway = useRef<HTMLDivElement>(null);
  const sticky = useRef<HTMLDivElement>(null);
  const [P, setP] = useState(0);
  const [top, setTop] = useState(0);
  const [h, setH] = useState(0);
  const [ui, setUi] = useState({ hover: -1, sel: -1, sent: false, cal: true });

  useLayoutEffect(() => {
    const el = sticky.current;
    if (!el) return;
    const measure = () => {
      const vh = window.innerHeight, H = el.offsetHeight;
      setH(H);
      // centred below the fixed header (~96 px) if it fits; otherwise pinned with its bottom 24 px above the fold
      setTop(vh >= H + 120 ? Math.max(96, (vh - H) / 2) : vh - H - 24);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  useEffect(() => {
    // scroll events already arrive once per frame; reading here (not in a rAF) keeps the story in step even
    // where frames are paused, and React skips the render when P hasn't changed
    const read = () => {
      const r = runway.current?.getBoundingClientRect();
      if (!r) return;
      const t = clamp(top - r.top, 0, PIN);
      setP(Math.round((t / PIN) * 1000) / 1000);
    };
    read();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read, { passive: true });
    return () => { window.removeEventListener("scroll", read); window.removeEventListener("resize", read); };
  }, [top]);

  const seg = (a: number, b: number) => clamp((P - a) / (b - a), 0, 1);
  const tp = seg(0, 0.12);
  const typed = PROMPT.slice(0, Math.round(PROMPT.length * tp));
  const l = [1 - seg(0.12, 0.14), 1 - seg(0.2, 0.28), 1 - seg(0.28, 0.32), 1 - seg(0.62, 0.68)];
  const orkaOn = P >= 0.27;
  const done = P >= 0.97;
  let orkaStatus = "Waiting for a prompt";
  if (P >= 0.12) orkaStatus = "Reading keywords";
  if (P >= 0.27) orkaStatus = "Matching your ICP";
  if (P >= 0.32) orkaStatus = "Running waterfall";
  if (P >= 0.68) orkaStatus = "Ranking leads";
  if (done) orkaStatus = "5 leads ready";
  let srcCount = 0;
  const sources = SOURCES.map(([label, note], i) => {
    const a = 0.32 + i * 0.05, sp = seg(a, a + 0.05);
    const ok = sp >= 0.7, scan = sp > 0 && !ok;
    if (ok) srcCount++;
    return { label, note, ok, scan, idle: sp <= 0, bar: scan ? clamp(sp / 0.7, 0, 1) : 0 };
  });
  const dt = seg(0.78, 0.96) * 5;
  const { hover, sel, sent, cal } = ui;
  const ci = sel >= 0 ? sel : hover;
  const c = LEADS[ci >= 0 ? ci : 0];
  const panel = done && sel >= 0 ? (sent ? "sent" : "compose") : done && hover >= 0 ? "why" : "wait";
  const body = `Hi ${c.first}, saw that ${c.company} ${c.signal.charAt(0).toLowerCase()}${c.signal.slice(1)}. We help D2C brands move to eco-friendly packaging without slowing a launch. Worth 15 minutes this week?${cal ? "\nPick a time: cal.com/you/intro" : ""}`;
  const dotY = 40 + 28 + clamp(dt, 0, 4) * 56;
  const lineD = ["M190 124 C 190 132, 190 132, 190 140", "M380 196 C 416 196, 404 138, 440 138", "M620 138 C 655 138, 655 138, 690 138", "M900 276 C 900 302, 560 294, 560 320"];

  return (
    <section className="cg-cl" aria-labelledby="cg-cl-title">
      <div className="cg-head cg-head--center">
        <h2 id="cg-cl-title" className="cg-h2">Curated leads</h2>
        <p className="cg-lede">Every lead we provide is specially selected for your business and your activity on Cnvrted.</p>
      </div>
      <div ref={runway} className="cg-cl-runway" style={{ height: h ? h + PIN : undefined }}>
      <div ref={sticky} className="cg-cl-sticky" style={{ top }}>
        <ScaleBox width={STORY_W} height={STORY_H} style={{ maxWidth: STORY_W, marginInline: "auto" }}>
          <div className="cg-story">
            <svg width={STORY_W} height={STORY_H} viewBox={`0 0 ${STORY_W} ${STORY_H}`} fill="none" aria-hidden="true" style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
              {lineD.map((d) => <path key={d} d={d} stroke="#e5e3dd" strokeWidth="1.5" />)}
              {lineD.map((d, i) => <path key={`a${d}`} d={d} stroke={i === 3 ? "#15803d" : "#4f65f5"} strokeWidth="1.5" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={l[i].toFixed(3)} />)}
            </svg>

            {/* 1 · prompt, typed as you scroll */}
            <div className="cg-story-card cg-st-prompt">
              <div>
                <p className="cg-story-lbl">You</p>
                <p style={{ marginTop: 6, minHeight: 40, fontSize: 14, lineHeight: "20px", color: "#2b2a26" }}>{typed}{tp < 1 && <span className="cg-caret" />}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p className="cg-story-lbl">Ask Orka</p>
                <span className="cg-st-send" style={{ background: tp >= 1 ? "var(--cg-accent)" : "#f1efea", color: tp >= 1 ? "#fff" : "#c9c6bd", boxShadow: tp >= 1 ? "-1.5px 2px 0 0 #000" : "none" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
              </div>
            </div>

            {/* 2 · keywords */}
            <div className="cg-story-card cg-st-kw">
              <p className="cg-story-lbl" style={{ marginBottom: 8 }}>Keywords</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {KEYWORDS.map((k, i) => <span key={k} className={`cg-st-chip${P >= 0.13 + i * 0.016 ? " is-on" : ""}`}>{k}</span>)}
              </div>
            </div>

            {/* 3 · Orka */}
            <div className={`cg-story-card cg-st-orka${orkaOn ? " is-on" : ""}${orkaOn && !done ? " is-busy" : ""}`}>
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true"><circle cx="15" cy="15" r="14" fill="#eef1fe" stroke="#c9d0fb" /><circle cx="15" cy="15" r="7" stroke="#4f65f5" strokeWidth="1.5" /><circle cx="15" cy="15" r="2.5" fill="#4f65f5" /></svg>
              <p style={{ marginTop: 10, fontWeight: 600, fontSize: 15 }}>Orka</p>
              <p style={{ fontSize: 12, color: "#8a867e" }}>ICP brain</p>
              <p style={{ marginTop: 8, fontWeight: 500, fontSize: 12, color: "#3346c9" }} aria-live="polite">{orkaStatus}</p>
            </div>

            {/* 4 · waterfall enrichment */}
            <div className="cg-st-wf">
              <div style={{ marginBottom: 8, display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                <p style={{ fontWeight: 600, fontSize: 15 }}>Waterfall enrichment</p>
                <p style={{ fontFamily: "var(--cg-mono)", fontWeight: 500, fontSize: 12, color: "#8a867e" }}>{srcCount}/6 confirmed</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {sources.map((s, i) => (
                  <div key={s.label} className={`cg-st-src${s.scan ? " is-scan" : ""}`}>
                    <span style={{ width: 22, fontFamily: "var(--cg-mono)", fontWeight: 500, fontSize: 11, color: "#8a867e" }}>0{i + 1}</span>
                    <span style={{ flex: 1, fontWeight: 500, fontSize: 13, color: "#2b2a26" }}>{s.label}</span>
                    <span style={{ marginRight: 10, fontSize: 12, color: "#8a867e" }}>{s.note}</span>
                    {s.ok && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label="confirmed"><circle cx="12" cy="12" r="10" /><path d={CHECK_P} /></svg>}
                    {s.idle && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d9d6cf" strokeWidth="2" strokeDasharray="3 3" aria-hidden="true"><circle cx="12" cy="12" r="10" /></svg>}
                    {s.scan && <span className="cg-st-spin" role="img" aria-label="checking" />}
                    <span className="cg-st-src-bar" style={{ width: `${(s.bar * 100).toFixed(1)}%`, opacity: s.scan ? 1 : 0 }} />
                  </div>
                ))}
              </div>
            </div>

            {/* 5 · leads */}
            <div className="cg-story-card cg-st-leads">
              <div className="cg-st-grid cg-st-lhead"><span>Lead</span><span>Why now</span><span style={{ textAlign: "right", paddingRight: 10 }}>Score</span><span /></div>
              {LEADS.map((ld, i) => {
                const shown = P >= 0.68 + i * 0.02, scored = dt >= i + 0.5 || done, active = done && (hover === i || sel === i);
                return (
                  <div key={ld.name} className={`cg-st-grid cg-st-row${shown ? " is-shown" : ""}${active ? " is-active" : ""}`}
                    onMouseEnter={() => { if (done && hover !== i) setUi((u) => ({ ...u, hover: i })); }}>
                    <span style={{ minWidth: 0, display: "flex", alignItems: "center", gap: 10 }}>
                      <span className="cg-st-ini">{ld.name.split(" ").map((w) => w[0]).join("")}</span>
                      <span style={{ minWidth: 0, display: "flex", flexDirection: "column" }}>
                        <span style={{ fontWeight: 500, fontSize: 14 }}>{ld.name}</span>
                        <span style={{ fontSize: 12, color: "#8a867e", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ld.role}</span>
                      </span>
                    </span>
                    <span style={{ paddingRight: 8, fontSize: 13, color: "#5f5c55", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ld.signal}</span>
                    <span className={`cg-st-score${scored ? " is-on" : ""}`}>{scored ? ld.score : "–"}</span>
                    <button type="button" className={`cg-st-reach${done ? " is-ready" : ""}${sel === i ? " is-sel" : ""}`} disabled={!done} aria-label={`Reach out to ${ld.name}`}
                      onFocus={() => { if (done) setUi((u) => ({ ...u, hover: i })); }}
                      onClick={() => setUi((u) => ({ ...u, sel: i, hover: i, sent: false }))}>Reach out</button>
                  </div>
                );
              })}
              <span className="cg-st-dot" aria-hidden="true" style={{ top: dotY, opacity: P >= 0.78 && !done ? 1 : 0 }} />
            </div>

            {/* 6 · detail panel: waiting → why this lead → email → sent */}
            <div className="cg-story-card cg-st-panel" aria-live="polite">
              {panel === "wait" && <p style={{ margin: "auto 0", fontSize: 14, lineHeight: 1.5, color: "#8a867e", textAlign: "center" }}>{done ? "Hover a lead to see why it is on your list." : "Leads land here once Orka finishes the waterfall."}</p>}
              {panel === "why" && (
                <div key={`why${ci}`} className="cg-pop" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <p className="cg-story-lbl">Why this lead</p>
                  <div style={{ marginTop: 6, display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 600, fontSize: 18 }}>{c.name}</span>
                    <span style={{ fontFamily: "var(--cg-mono)", fontWeight: 600, fontSize: 18, color: "#15803d" }}>{c.score}</span>
                  </div>
                  <p style={{ fontSize: 13, color: "#8a867e" }}>{c.role}</p>
                  <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                    {c.why.map(([text, src]) => (
                      <div key={text} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <span style={{ width: 6, height: 6, marginTop: 7, flex: "none", borderRadius: 3, background: "#4f65f5" }} />
                        <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                          <span style={{ fontSize: 13, lineHeight: 1.4, color: "#2b2a26" }}>{text}</span>
                          <span style={{ fontFamily: "var(--cg-mono)", fontWeight: 500, fontSize: 11, color: "#8a867e" }}>{src}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                  <button type="button" className="cg-green" style={{ marginTop: "auto", width: "100%" }} onClick={() => setUi((u) => ({ ...u, sel: ci >= 0 ? ci : 0, sent: false }))}>Reach out to {c.first}</button>
                </div>
              )}
              {panel === "compose" && (
                <div key={`compose${ci}`} className="cg-pop" style={{ height: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span className="cg-story-lbl">Email to <span style={{ color: "#0d0d0d" }}>{c.name}</span> · {c.company}</span>
                    <button type="button" onClick={() => setUi((u) => ({ ...u, sel: -1 }))} style={{ padding: "6px 0", border: 0, background: "none", color: "#8a867e", fontWeight: 500, fontSize: 12, cursor: "pointer" }}>Back</button>
                  </div>
                  <p style={{ fontWeight: 600, fontSize: 14 }}>Packaging for {c.company}’s next launch</p>
                  <p style={{ flex: 1, overflow: "hidden", fontSize: 12.5, lineHeight: 1.5, color: "#2b2a26", whiteSpace: "pre-line" }}>{body}</p>
                  <div style={{ padding: "8px 0", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #ece9e3" }}>
                    <span style={{ fontWeight: 500, fontSize: 13, color: "#2b2a26" }}>Add my Cal link</span>
                    <button type="button" role="switch" aria-checked={cal} aria-label="Add my Cal link" className="cg-switch" onClick={() => setUi((u) => ({ ...u, cal: !u.cal }))}><span /></button>
                  </div>
                  <button type="button" className="cg-green" style={{ width: "100%" }} onClick={() => setUi((u) => ({ ...u, sent: true }))}>Send and update CRM</button>
                </div>
              )}
              {panel === "sent" && (
                <div key={`sent${ci}`} className="cg-pop" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <p className="cg-story-lbl">Done</p>
                  <p style={{ marginTop: 6, fontWeight: 600, fontSize: 18 }}>{c.first} is in your pipeline</p>
                  <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                    {[
                      { text: `Email sent to ${c.first}`, ok: true },
                      { text: cal ? "Cal link attached" : "No Cal link this time", ok: cal },
                      { text: "CRM updated · stage set to Contacted", ok: true },
                    ].map((r, i) => (
                      <div key={r.text} className="cg-pop" style={{ display: "flex", gap: 10, alignItems: "center", animationDelay: `${i * 160}ms` }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={r.ok ? "#15803d" : "#c9c6bd"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d={r.ok ? CHECK_P : DASH_P} /></svg>
                        <span style={{ fontSize: 14, color: "#2b2a26" }}>{r.text}</span>
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => setUi((u) => ({ ...u, sel: -1, sent: false, hover: -1 }))}
                    style={{ marginTop: "auto", height: 44, border: "1px solid #d9d6cf", borderRadius: 12, background: "#fff", color: "#0d0d0d", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Reach out to another lead</button>
                </div>
              )}
            </div>
          </div>
        </ScaleBox>
      </div>
      </div>
    </section>
  );
}
