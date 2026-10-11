"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowUp, Check, ClipboardPaste, Copy, FileText, LockKeyhole, Megaphone, RotateCcw, Sparkles, Target, Users } from "lucide-react";
import "./copy-prompt-walkthrough.css";

import type { Assistant } from "./prompt-assistants";

type Phase = "opening" | "ready" | "pasted" | "answer" | "done" | "copied" | "return" | "profile" | "building" | "recipe";
const profile = [
  { title: "What you sell", text: "Brand identity, UI/UX and web design; ongoing design retainers for product and marketing teams." },
  { title: "Who buys from you", text: "Seed to Series B startups. Founders and marketing leads without an in-house design team." },
  { title: "Buying signals", text: "New funding, hiring a designer, or launching a new product or website." },
  { title: "Not a fit", text: "Enterprises with large in-house design teams. Pricing and average deal size: no info." },
];
const answerText = "Sample business profile · falanadesigner\n\n" + profile.map(block => `${block.title}\n${block.text}`).join("\n\n");
const recipes = [
  { label: "GTM", icon: Target, title: "Win design retainers with newly funded startups", items: ["Target seed to Series B teams right after a raise", "Lead with a brand refresh ahead of launches", "Position as their on-demand design team"] },
  { label: "LEADS", icon: Users, title: "Reach buyers the week they show intent", items: ["Track funding rounds and design job posts", "Prioritise founders and marketing leads", "Get alerted when a product launch is announced"] },
  { label: "MARKETING", icon: Megaphone, title: "Show up where design decisions start", items: ["Share before-and-after case studies", "Launch-ready messaging for teams that just raised", "Nurture with a monthly portfolio drop"] },
];
const generationLabels = ["Reading your business profile", "Mapping your buying signals", "Building your GTM, leads and marketing goals"];

/** Native adaptation of the supplied Prompt copy.html; all AI responses are local sample content. */
export function CopyPromptWalkthrough({ assistant, onBack }: { assistant: Assistant; onBack: () => void }) {
  const [phase, setPhase] = useState<Phase>("opening");
  const [urlLength, setUrlLength] = useState(0);
  const [revealed, setRevealed] = useState(0);
  const [generated, setGenerated] = useState(0);
  const [copyFailed, setCopyFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const scene = ["return", "profile", "building"].includes(phase) ? "cnvrted" : phase === "recipe" ? "recipe" : "browser";

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  // One cancellable schedule per phase; reset/unmount cannot leave an old scene running.
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const after = (ms: number, action: () => void) => timers.push(setTimeout(action, reducedMotion ? 0 : ms));
    if (phase === "opening") {
      for (let i = 1; i <= assistant.url.length; i++) after(i * 38, () => setUrlLength(i));
      after(assistant.url.length * 38 + 200, () => setPhase("ready"));
    } else if (phase === "pasted") {
      after(1100, () => setPhase("answer"));
    } else if (phase === "answer") {
      profile.forEach((_, i) => after(350 + i * 650, () => setRevealed(i + 1)));
      after(350 + profile.length * 650, () => setPhase("done"));
    } else if (phase === "copied") {
      after(900, () => setPhase("return"));
    } else if (phase === "building") {
      generationLabels.forEach((_, i) => after(500 + i * 700, () => setGenerated(i + 1)));
      after(2800, () => setPhase("recipe"));
    }
    return () => timers.forEach(clearTimeout);
  }, [phase, assistant.url, reducedMotion]);

  useEffect(() => { heading.current?.focus({ preventScroll: true }); }, [scene]);

  async function copyAnswer() {
    if (phase !== "done") return;
    try {
      await navigator.clipboard.writeText(answerText);
      setPhase("copied");
    } catch {
      setCopyFailed(true);
    }
  }

  const showAnswer = ["answer", "done", "copied"].includes(phase);
  return <div className="prompt-walkthrough" style={{ "--assistant-accent": assistant.accent, "--assistant-bg": assistant.background } as CSSProperties}>
    <div className="prompt-walkthrough-toolbar">
      <button type="button" onClick={onBack}><ArrowLeft size={16} /> Choose another AI</button>
      <span>Interactive example</span>
    </div>
    <div className="prompt-walkthrough-scene" key={scene}>
      {scene === "browser" && <div className="prompt-browser">
        <div className="prompt-browser-chrome">
          <div className="prompt-window-dots" aria-hidden="true"><i /><i /><i /></div>
          <div className="prompt-address"><LockKeyhole size={13} /><span>{assistant.url.slice(0, urlLength)}</span>{phase === "opening" && <i className="prompt-caret" aria-hidden="true" />}</div>
          <span className="prompt-browser-demo">Demo</span>
        </div>
        <div className="prompt-ai-header"><h3 ref={heading} tabIndex={-1}><img src={assistant.logo} alt="" width={26} height={26} />{assistant.name}</h3><span className="prompt-user-avatar" aria-hidden="true">FD</span></div>
        <div className="prompt-chat-content">
          {!showAnswer ? <div className="prompt-ai-greeting"><img src={assistant.logo} alt="" width={40} height={40} /><p>{assistant.greeting}</p></div>
            : <div className="prompt-answer">
              <div className="prompt-user-message"><FileText size={17} /><span>Cnvrted setup prompt</span><Check size={15} /></div>
              <p>Here’s a sample business profile, ready to bring into Cnvrted.</p>
              <div className="prompt-profile-document">
                <div className="prompt-document-title"><FileText size={20} /><div><strong>falanadesigner · Business profile</strong><span>{phase === "answer" ? "Putting your context together" : "Document · Ready to copy"}</span></div></div>
                <div className="prompt-document-blocks">{profile.slice(0, revealed).map(block => <div key={block.title} className="prompt-reveal"><strong>{block.title}</strong><p>{block.text}</p></div>)}</div>
              </div>
              {(phase === "done" || phase === "copied") && <div className="prompt-answer-actions">
                <button type="button" className="prompt-primary" onClick={() => void copyAnswer()} disabled={phase === "copied"}>{phase === "copied" ? <Check size={17} /> : <Copy size={17} />}{phase === "copied" ? "Copied — back to Cnvrted" : "Copy answer & continue"}</button>
                {copyFailed && <><p role="status">Clipboard unavailable. You can continue with the sample profile.</p><button type="button" onClick={() => setPhase("return")}>Continue with sample</button></>}
              </div>}
            </div>}
        </div>
        {!showAnswer && <div className="prompt-composer-wrap">
          <p className="prompt-coach">{phase === "pasted" ? "Your prompt is ready to send" : "Click the text box to paste the sample prompt"}</p>
          <button type="button" className="prompt-composer" aria-label={`Paste sample prompt into ${assistant.name}`} disabled={phase !== "ready"} onClick={() => setPhase("pasted")}>
            {phase === "pasted" && <span className="prompt-pasted-file prompt-reveal"><FileText size={21} /><span>Cnvrted setup prompt<small>Pasted</small></span></span>}
            <span className="prompt-composer-line"><span>{assistant.placeholder}</span><span className="prompt-send" aria-hidden="true"><ArrowUp size={18} /></span></span>
          </button>
        </div>}
      </div>}
      {scene === "cnvrted" && <div className="prompt-cnvrted-scene">
        <div className="prompt-orka-icon"><Sparkles size={40} /></div>
        <h3 ref={heading} tabIndex={-1}>{phase === "building" ? "Turning context into your next move" : "Bring your context to Cnvrted"}</h3>
        <p>Nice work! Paste your AI’s answer here to build your growth recipe.</p>
        {phase === "return" ? <button type="button" className="prompt-paste-target" onClick={() => setPhase("profile")}><ClipboardPaste size={30} /><strong>Click here to paste answer</strong><span>Try it with the sample business profile</span></button>
          : <div className="prompt-pasted-profile prompt-reveal"><div><FileText size={19} /><strong>falanadesigner</strong><span><Check size={14} />4 sections detected</span></div><p>{profile[0].text}</p><p><strong>Buyers:</strong> Seed to Series B startups, founders and marketing leads.</p><p><strong>Signals:</strong> New funding · Design roles · Product launches</p></div>}
        {phase !== "building" ? <button className="prompt-primary" type="button" disabled={phase !== "profile"} onClick={() => setPhase("building")}><Sparkles size={18} />Generate recipe</button>
          : <ul className="prompt-building" aria-label="Building the sample recipe">{generationLabels.map((label, i) => <li key={label} data-done={generated > i}><Check size={17} /><span>{label}</span></li>)}</ul>}
      </div>}
      {scene === "recipe" && <div className="prompt-recipe-scene">
        <div className="prompt-recipe-title"><div><span className="prompt-ready-badge"><Check size={14} />Recipe ready</span><h3 ref={heading} tabIndex={-1}>Your growth recipe for falanadesigner</h3><p>Three goals built from the sample business profile.</p></div><button type="button" className="prompt-replay" onClick={onBack}><RotateCcw size={16} />Replay</button></div>
        <div className="prompt-recipe-grid">{recipes.map(({ label, icon: Icon, title, items }, i) => <article className="prompt-recipe-card" key={label} style={{ animationDelay: `${i * 120}ms` }}><div><span className="prompt-recipe-icon"><Icon size={23} /></span><span>{label}</span></div><h4>{title}</h4><ul>{items.map(item => <li key={item}><Check size={16} /><span>{item}</span></li>)}</ul></article>)}</div>
      </div>}
    </div>
    <span className="sr-only" role="status" aria-live="polite">{phase === "done" ? "Sample answer ready. Copy it to continue." : phase === "return" ? "Paste the sample answer into Cnvrted." : phase === "recipe" ? "Your sample growth recipe is ready." : ""}</span>
  </div>;
}
