"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, CalendarDays, Check, ChevronDown, Mail, RotateCcw, Target, Users } from "lucide-react";
import "./automated-workforce.css";

const agents = [
  { id: "scout", name: "Scout", role: "Research agent", skin: "#E9B98F", hair: "#2B2420", front: "10,17 11,10 19,5 28,7 30,16 27,11 17,11 13,13", back: "", bun: "" },
  { id: "atlas", name: "Atlas", role: "Lead finder", skin: "#B97B52", hair: "#1A1714", front: "11,15 12,8 20,5.5 28,8 29,15 26,10 14,10", back: "", bun: "" },
  { id: "quill", name: "Quill", role: "Email writer", skin: "#F1CBA5", hair: "#6B3F22", front: "11,17 13,9 20,6.5 27,9 29,17 23,11 17,13", back: "9,31 9,13 20,5 31,13 31,31 28,31 28,16 12,16 12,31", bun: "" },
  { id: "echo", name: "Echo", role: "Scheduler", skin: "#8E5B3C", hair: "#141210", front: "10,17 12,9 20,6 28,9 30,17 26,12 14,12", back: "", bun: "16,7 18,2.5 22,2.5 24,7 20,8.5" },
];
const tasks = ["Research", "Leads", "Drafting emails", "Scheduling"];
const teams = [
  { name: "Growth Squad", members: [0, 1, 2, 3], score: 94 },
  { name: "Outbound Crew", members: [1, 2, 3], score: 88 },
  { name: "Research Duo", members: [0, 2], score: 76 },
];
const workflowSteps = [
  { label: "Doing market research", detail: "Market mapped", who: 0 },
  { label: "Finding leads", detail: "48 found", who: 1 },
  { label: "Building an intent list", detail: "19 high-intent leads", who: 1 },
  { label: "Creating your ICP", detail: "ICP ready", who: 0 },
  { label: "Drafting emails", detail: "48 drafts", who: 2 },
  { label: "Adding a booking link", detail: "Link added", who: 3 },
];
const followUps = ["Emails delivered to 48 sample leads", "Follow-ups set for day 3 and day 7", "CRM updated with 48 sample contacts"];

// Polygon portraits and interaction sequence adapted from the supplied Automated Work Force HTML.
function AgentFace({ index }: { index: number }) {
  const a = agents[index];
  return <span className="workforce-avatar" aria-hidden="true"><svg viewBox="6 3 28 30" width="40" height="40">
    {a.back && <polygon points={a.back} fill={a.hair} />}
    <polygon points="17,29 23,29 22,34 20,35 18,34" fill={a.skin} />
    <polygon points="11,14 20,9 29,14 29,24 20,32 11,24" fill={a.skin} />
    <polygon points="20,9 29,14 29,24 20,32" fill="#000" opacity=".09" />
    <polygon points="11,24 20,32 29,24 20,27.5" fill="#fff" opacity=".14" />
    <polygon points={a.front} fill={a.hair} />{a.bun && <polygon points={a.bun} fill={a.hair} />}
    <polygon points={a.front} fill="#fff" opacity=".07" />
    <g className="workforce-eyes" style={{ animationDelay: `${index * -1.1}s` }}><ellipse cx="16" cy="19" rx="2.4" ry="1.7" fill="#fff" /><ellipse cx="24" cy="19" rx="2.4" ry="1.7" fill="#fff" /><g className="workforce-pupils"><circle cx="16" cy="19" r="1.2" fill="#141414" /><circle cx="24" cy="19" r="1.2" fill="#141414" /></g></g>
    <polygon points="13.5,16 18,15.3 18,16.2 13.5,16.9" fill={a.hair} /><polygon points="22,15.3 26.5,16 26.5,16.9 22,16.2" fill={a.hair} /><polyline points="17.6,25 20,26.3 22.4,25" fill="none" stroke="#7A3B2E" strokeWidth=".9" strokeLinecap="round" />
  </svg></span>;
}

function BusinessSetup({ active, reduced }: { active: boolean; reduced: boolean }) {
  const [step, setStep] = useState(0);
  const replay = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!active || (reduced && step >= 5)) return;
    const timer = setTimeout(() => setStep(value => value === 5 ? 0 : value + 1), reduced ? 0 : step === 5 ? 3500 : step === 0 ? 500 : 1300);
    return () => clearTimeout(timer);
  }, [active, reduced, step]);
  function restart() { setStep(0); replay.current?.focus({ preventScroll: true }); }
  return <div className="workforce-surface workforce-setup">
    <button ref={replay} type="button" className="workforce-replay" aria-label="Replay business setup animation" onClick={restart}><RotateCcw size={14} /></button>
    <div className="workforce-setup-fields" data-complete={step === 5}>
      <div className="workforce-field"><small><i>1</i>Paste company email</small><div className="workforce-email"><span>{step > 0 ? "hello@northwind.example" : "Company email"}</span>{step > 0 && <Check size={13} />}</div></div>
      {step >= 2 && <div className="workforce-field workforce-enter"><small><i>2</i>Reading your business <Check size={12} /></small><p>Sells eco-friendly packaging to D2C brands.</p><p>Serves online stores across India.</p><p>Monthly plans and bulk quotes.</p></div>}
      {step >= 3 && <div className="workforce-field workforce-enter"><small><i>3</i>Add social media</small><div className="workforce-socials">{["LinkedIn", "Instagram", "X", "YouTube"].map(name => <span key={name}>{name}</span>)}</div></div>}
      {step >= 4 && <div className="workforce-field workforce-enter"><small><i>4</i>Your requirement</small><p>Book 20 qualified demos a month</p></div>}
    </div>
    {step === 5 && <div className="workforce-setup-overlay workforce-enter"><div><span className="workforce-success"><Check size={29} /></span><strong>All set</strong><p>Your AI workforce knows your business</p></div><button type="button" className="workforce-primary" onClick={restart}>Explore <ArrowRight size={16} /></button></div>}
  </div>;
}

function Teammates({ active, reduced }: { active: boolean; reduced: boolean }) {
  const [manual, setManual] = useState(false);
  const [assigned, setAssigned] = useState<Record<string, string>>({ scout: "Research" });
  useEffect(() => {
    if (!active || reduced || manual) return;
    const count = Object.values(assigned).filter(Boolean).length;
    const timer = setTimeout(() => {
      if (count === agents.length) setAssigned({ scout: "Research" });
      else setAssigned(previous => ({ ...previous, [agents[count].id]: tasks[count] }));
    }, count === agents.length ? 3500 : 1600);
    return () => clearTimeout(timer);
  }, [active, reduced, manual, assigned]);
  return <div className="workforce-surface workforce-team"><div className="workforce-team-heading"><strong>Your AI team</strong><span>{Object.values(assigned).filter(Boolean).length} of 4 assigned</span></div>
    {agents.map((agent, i) => <div key={agent.id} className="workforce-agent"><AgentFace index={i} /><div><strong>{agent.name}</strong><span>{agent.role}</span></div><select aria-label={`Assign task to ${agent.name}`} value={assigned[agent.id] || ""} onFocus={() => setManual(true)} onChange={event => setAssigned(previous => ({ ...previous, [agent.id]: event.target.value }))}><option value="">+ Assign</option>{tasks.map(task => <option key={task} value={task}>{task}</option>)}</select></div>)}
  </div>;
}

function SalesJourney({ active, reduced }: { active: boolean; reduced: boolean }) {
  const [teamIndex, setTeamIndex] = useState(0);
  const [manual, setManual] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [phase, setPhase] = useState<"select" | "run" | "approve" | "sent">("select");
  const [step, setStep] = useState(0);
  const [follow, setFollow] = useState(0);
  const team = teams[teamIndex];
  useEffect(() => {
    if (!active) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (!manual && !reduced && phase === "select") timer = setTimeout(() => {
      if (!pickerOpen) setPickerOpen(true);
      else { setTeamIndex(0); setStep(0); setPhase("run"); }
    }, pickerOpen ? 2400 : 1000);
    // Autoplay advances only the simulated preview; manual team selection waits for approval.
    if (!manual && !reduced && phase === "approve") timer = setTimeout(() => {
      setFollow(0); setPhase("sent");
    }, 3500);
    if (!manual && !reduced && phase === "sent" && follow === followUps.length) timer = setTimeout(() => {
      setPhase("select"); setStep(0); setFollow(0); setPickerOpen(false); setManual(false);
    }, 3500);
    if (phase === "run") timer = setTimeout(() => {
      if (step < workflowSteps.length) setStep(step + 1);
      else setPhase("approve");
    }, reduced ? 0 : 850);
    if (phase === "sent" && follow < followUps.length) timer = setTimeout(() => setFollow(follow + 1), reduced ? 0 : 1000);
    return () => clearTimeout(timer);
  }, [phase, step, follow, active, reduced, manual, pickerOpen]);
  function reset() { setPhase("select"); setStep(0); setFollow(0); setPickerOpen(false); setManual(false); }
  return <div className="workforce-surface workforce-journey">
    <div className="workforce-requirement"><small><Target size={12} />Sales requirement</small><p>Find D2C brands in India that need eco-friendly packaging and book intro calls with their founders.</p></div>
    {phase === "select" ? <details open={pickerOpen} className="workforce-team-picker"><summary onClick={event => { event.preventDefault(); setManual(true); setPickerOpen(value => !value); }}><Users size={14} /><span>Select a team to run this</span><ChevronDown size={14} /></summary><div className="workforce-team-options"><small>Teams · ranked by fit</small>{teams.map((option, i) => <button type="button" key={option.name} onClick={() => { setManual(true); setTeamIndex(i); setStep(0); setPhase("run"); }}><span className="workforce-face-stack">{option.members.map(index => <AgentFace key={index} index={index} />)}</span><span><strong>{option.name}</strong><small>{option.members.map(index => agents[index].name).join(" · ")}</small></span><b>{option.score}</b></button>)}</div></details>
      : <><div className="workforce-chosen"><span className="workforce-face-stack">{team.members.map(index => <AgentFace key={index} index={index} />)}</span><strong>{team.name} is on it</strong><button type="button" aria-label="Reset sales journey" onClick={reset}><RotateCcw size={14} /></button></div>
      <div className="workforce-steps" data-dimmed={phase !== "run"}>{workflowSteps.slice(0, Math.min(step + 1, workflowSteps.length)).map((item, i) => <div className="workforce-step workforce-enter" key={item.label}><AgentFace index={team.members.includes(item.who) ? item.who : team.members[0]} /><span>{item.label}</span>{i < step ? <><small>{item.detail}</small><Check size={12} /></> : <span className="workforce-working-dot" aria-label="In progress" />}</div>)}</div></>}
    {phase === "approve" && <div className="workforce-sheet workforce-enter"><div className="workforce-sheet-title"><Mail size={16} /><strong>Your outreach is ready</strong></div><p>48 sample drafts · personalised for each brand</p><blockquote>Hi [First name], saw [Brand] is scaling fast. We help D2C teams switch to eco packaging. Worth a quick chat?</blockquote><span className="workforce-booking"><CalendarDays size={13} />Sample booking link attached</span><button type="button" className="workforce-primary" onClick={() => { setManual(true); setFollow(0); setPhase("sent"); }}>Approve & send demo <ArrowRight size={14} /></button><small>Preview only · no real emails sent</small></div>}
    {phase === "sent" && <div className="workforce-sheet workforce-enter"><div className="workforce-sheet-title"><Check size={17} /><strong>{follow === followUps.length ? "All done · pipeline updated" : "Sending and following up"}</strong></div><ul>{followUps.slice(0, follow + 1).map((label, i) => <li key={label} className="workforce-enter"><Check size={14} style={{ opacity: i < follow ? 1 : .3 }} /><span>{label}</span></li>)}</ul><small>Simulated delivery · no real emails sent</small>{follow === followUps.length && <button type="button" className="workforce-secondary" onClick={reset}><RotateCcw size={14} />Run again</button>}</div>}
    <span className="sr-only" role="status">{!manual ? "" : phase === "approve" ? "Sample emails ready for approval." : phase === "sent" && follow === followUps.length ? "Sample outreach and follow-ups complete." : ""}</span>
  </div>;
}

export function AutomatedWorkforce() {
  const section = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync(); media.addEventListener("change", sync);
    let visible = false;
    const syncActive = () => setActive(visible && !document.hidden);
    document.addEventListener("visibilitychange", syncActive);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; syncActive(); }, { threshold: .08 });
    if (section.current) observer.observe(section.current);
    return () => { observer.disconnect(); media.removeEventListener("change", sync); document.removeEventListener("visibilitychange", syncActive); };
  }, []);
  return <section ref={section} className="automated-workforce design-container" aria-labelledby="workforce-title">
    <header className="workforce-heading"><span>Coming Soon</span><h2 id="workforce-title">Automated workforce</h2><p>Build your AI team for research, outreach, and follow-ups.</p></header>
    <div className="workforce-grid">
      <article><div className="workforce-frame workforce-violet"><BusinessSetup active={active} reduced={reduced} /></div><h3>Explain your business</h3><p>Preview how a business brief could guide your AI team. Add your offer, audience, and booking link, then review the plan before outreach.</p></article>
      <article><div className="workforce-frame workforce-green"><Teammates active={active} reduced={reduced} /></div><h3>Automated teammates</h3><p>AI agents act as your teammates. Configure them to collaborate, from market research and finding leads to writing emails and client scheduling.</p></article>
      <article><div className="workforce-frame workforce-lavender"><SalesJourney active={active} reduced={reduced} /></div><h3>Sales journey, end to end</h3><p>Bring your campaigns, outreach, follow-ups, and client bookings together. Review the plan, approve the messages, and keep your pipeline in one place.</p></article>
    </div>
  </section>;
}
