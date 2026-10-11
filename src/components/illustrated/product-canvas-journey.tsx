"use client";

import { useState, type ReactNode } from "react";
import { ArrowRight, Check, CheckCircle2, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { PRODUCT_LEADS, type ProductScenario } from "./product-canvas-data";

export const JOURNEY_STEPS = [
  { title: "Say who you sell to", short: "Plan", phase: 0, text: "Type what you sell and who buys it. Orka drafts a plan on the canvas. Click Keep to accept it." },
  { title: "See where your buyers are", short: "Market", phase: 2, text: "Orka counts companies by place, size and kind. Pick or type the places and sizes you want." },
  { title: "Get a list of companies", short: "List", phase: 3, text: "Orka finds companies and checks each one fits. You see the cost and approve it first." },
  { title: "Choose who to contact", short: "Enrich", phase: 5, text: "Tick companies in the table and press Enrich to find a decision maker’s work email. This costs credits." },
  { title: "Email them", short: "Email", phase: 7, text: "Orka writes the email. Read it, edit it, and approve it. Nothing is sent without you." },
  { title: "Learn from replies", short: "Replies", phase: 9, text: "Check replies to see what worked. Orka suggests how to improve your next list." },
  { title: "Track the deal", short: "Deals", phase: 11, text: "Set the deal stage on each row: meeting, proposal, won or lost. Wins teach the next list." },
] as const;
export const JOURNEY_PHASES = [
  { step: 0, duration: 4200, status: "Tell Orka what you sell", reply: "Tell me what you sell and who buys it. I’ll draft a plan for you to keep or change." },
  { step: 0, duration: 5500, status: "Review your plan · Keep to continue", reply: "Here’s the plan: define your ICP, size the market, find matching companies, then choose contacts and prepare outreach. Keep this plan?" },
  { step: 1, duration: 6500, status: "Explore your market", reply: "Plan kept. Here’s the sample market by location, company size and business type. Adjust the filters before we search." },
  { step: 2, duration: 5000, status: "Company search · approval required", reply: "I’ll check each company against your filters and buying signals. Review the credit estimate before approving this search." },
  { step: 2, duration: 5500, status: "Company list ready", reply: "Search approved in this demo. Here’s the company list, with the reason each account fits. Choose which companies you want to contact." },
  { step: 3, duration: 6000, status: "Select companies · approve enrichment", reply: "Select the companies you want. I’ll find decision makers and work emails after you approve the enrichment cost." },
  { step: 3, duration: 5000, status: "Contacts enriched", reply: "Enrichment approved in this demo. Your selected contacts are ready. Next, let’s write a relevant first email." },
  { step: 4, duration: 8500, status: "Review the email · sending requires approval", reply: "I’ve drafted an email using the company’s buying signal. Edit it if you like. Sending always waits for your approval." },
  { step: 4, duration: 4000, status: "Email approved · simulated send", reply: "You approved the draft. In the product it would now send. This preview only simulates sending—no email leaves the page." },
  { step: 5, duration: 6500, status: "Read replies and find what worked", reply: "Here are example replies. The hiring signal opened a conversation; generic timing didn’t. Let’s use that feedback to improve your targeting." },
  { step: 5, duration: 5500, status: "Refine your next list", reply: "I suggest prioritising recent buying signals and excluding accounts that say the timing is wrong. Apply this learning to the next list?" },
  { step: 6, duration: 6500, status: "Track meetings, proposals, wins and losses", reply: "Move each responding account to the right deal stage. A win tells us which fit and signal combination deserves more attention." },
  { step: 6, duration: 5500, status: "A win feeds the next list", reply: "Win recorded in the sample pipeline. The next list can prioritise accounts with similar fit and buying signals. That’s the full loop." },
] as const;

const cities = ["Bengaluru", "Hyderabad", "Chennai"];
const kinds = ["B2B SaaS", "AI software", "Developer tools"];
const sizes = [84, 120, 46, 180, 63, 92, 110, 38, 150, 74, 28];
const dealStages = ["Replied", "Meeting", "Proposal", "Won", "Lost"];

export function ProductJourney({ phase, scenario, automatic, onInteract, onAdvance, children }: {
  phase: number; scenario: ProductScenario; automatic: boolean;
  onInteract: () => void; onAdvance: () => void; children: ReactNode;
}) {
  const [places, setPlaces] = useState(cities);
  const [customPlace, setCustomPlace] = useState("");
  const [size, setSize] = useState("all");
  const [kind, setKind] = useState("all");
  const [selected, setSelected] = useState(new Set(PRODUCT_LEADS.slice(0, 3).map(r => String(r[0]))));
  const [stages, setStages] = useState<Record<string, string>>({});
  const [subject, setSubject] = useState<string | null>(null);
  const [draft, setDraft] = useState<string | null>(null);
  const all = PRODUCT_LEADS.map(([company, contact, role], i) => ({ company, contact, role, city: cities[i % 3], kind: kinds[i % 3], size: scenario === "markets" ? sizes[i] * 10 : scenario === "icp" ? Math.round(sizes[i] / 5) : sizes[i], email: `${contact.split(" ")[0].toLowerCase()}@${company.toLowerCase()}.example` }));
  const rows = all.filter(r => places.includes(r.city) && (kind === "all" || r.kind === kind) && (size === "all" || (size === "small" ? r.size < (scenario === "markets" ? 1000 : scenario === "icp" ? 20 : 100) : r.size >= (scenario === "markets" ? 1000 : scenario === "icp" ? 20 : 100))));
  const chosen = rows.filter(r => selected.has(r.company));
  const recipient = chosen[0];
  const hasWin = chosen.some((row, i) => (stages[row.company] ?? (phase === 12 && i === 0 ? "Won" : "Replied")) === "Won");
  const signal = scenario === "markets" ? "Announced a new office" : scenario === "icp" ? "Launched its first AI product" : "Hiring a product designer";
  const defaultDraft = recipient ? `Hi ${recipient.contact.split(" ")[0]},\n\nI noticed ${recipient.company} ${scenario === "markets" ? "is expanding its offices" : scenario === "icp" ? "just launched an AI product" : "is hiring a product designer"}. ${scenario === "markets" ? "We help growing teams plan their next workspace." : "We help product teams improve onboarding while they grow."}\n\nWould a quick conversation next week be useful?\n\nBest,\nThe team` : "Select a company to draft an email.";
  const toggle = (company: string) => { onInteract(); setSelected(previous => { const next = new Set(previous); if (next.has(company)) next.delete(company); else next.add(company); return next; }); };
  const stage = JOURNEY_PHASES[phase].step;
  const approveNote = <p className="journey-approval-note"><ShieldCheck size={14} />{automatic ? "The loop demonstrates your approval. In the product, Orka waits for you." : "Your approval is required. This preview spends no credits and sends no mail."}</p>;
  const action = (label: string, disabled = false, before?: () => void) => <button className="journey-primary" type="button" onClick={() => { before?.(); onAdvance(); }} disabled={disabled}>{label}<ArrowRight size={15} /></button>;
  const cost = (amount: number, title: string) => <div className="journey-credit"><span>{title}<small>Illustrative estimate, not product pricing</small></span><strong>{amount} <small>demo credits</small></strong></div>;

  return <div className="product-journey" data-stage={stage}>
    <div className="journey-heading"><span>0{stage + 1} / 07 · {JOURNEY_STEPS[stage].short}</span><small>Sample data</small></div>
    {phase <= 1 ? <>
      <div className="journey-plan-graph">{children}</div>
      <div className="journey-plan-approval"><strong>{phase === 0 ? "Your brief becomes a plan" : "A plan you can review"}</strong><p>{phase === 0 ? "Orka is writing a sample brief. Try your own in the chat." : "ICP → market → companies → contacts → outreach. Nothing spends credits or sends mail yet."}</p>{action(phase === 0 ? "Show the plan" : "Keep this plan")}</div>
    </> : <div className="journey-content" key={phase}>
      <h3>{JOURNEY_STEPS[stage].title}</h3>
      {phase === 2 && <>
        <p className="journey-subtitle">Size your audience before spending credits.</p>
        <div className="journey-market-count"><strong>{rows.length}</strong><span>matching sample companies</span></div>
        <fieldset className="journey-places"><legend>Locations</legend>{[...cities, ...places.filter(p => !cities.includes(p))].map(city => <label key={city}><input type="checkbox" checked={places.includes(city)} onChange={() => { onInteract(); setPlaces(old => old.includes(city) ? old.filter(p => p !== city) : [...old, city]); }} />{city}<b>{all.filter(r => r.city === city).length}</b></label>)}</fieldset>
        <form className="journey-add-place" onSubmit={e => { e.preventDefault(); onInteract(); if (customPlace.trim()) setPlaces(old => [...new Set([...old, customPlace.trim()])]); setCustomPlace(""); }}><input aria-label="Add a location" placeholder="Type another location" value={customPlace} onChange={e => { onInteract(); setCustomPlace(e.target.value); }} /><button type="submit" disabled={!customPlace.trim()}>Add</button></form>
        <div className="journey-filters"><label>Company size<select value={size} onChange={e => { onInteract(); setSize(e.target.value); }}><option value="all">{scenario === "markets" ? "200–2,000" : scenario === "icp" ? "2–50" : "20–200"} people</option><option value="small">Under {scenario === "markets" ? "1,000" : scenario === "icp" ? "20" : "100"}</option><option value="large">{scenario === "markets" ? "1,000" : scenario === "icp" ? "20" : "100"} or more</option></select></label><label>Kind of company<select value={kind} onChange={e => { onInteract(); setKind(e.target.value); }}><option value="all">All software companies</option>{kinds.map(k => <option key={k} value={k}>{k} ({all.filter(r => r.kind === k).length})</option>)}</select></label></div>
        {!rows.length && <p className="journey-notice">No sample companies match. Try Bengaluru, Hyderabad or Chennai.</p>}
        {action("Use these filters", !rows.length)}
      </>}
      {phase === 3 && <>
        <p className="journey-subtitle">Find and check {rows.length} companies against your ICP and buying signals.</p>
        <ul className="journey-checklist"><li><Check size={14} />Company size, location and type</li><li><Check size={14} />Recent, relevant buying signal</li><li><Check size={14} />A reason each company fits</li></ul>
        {cost(rows.length, `Company search · ${rows.length} accounts`)}{approveNote}{action("Approve company search", !rows.length)}
      </>}
      {[4, 5, 6].includes(phase) && <>
        <p className="journey-subtitle">{phase === 6 ? "Work emails unlocked for the contacts you selected." : phase === 5 ? "Tick the companies you want to enrich." : `${rows.length} companies checked against your filters. Review the fit before choosing contacts.`}</p>
        <div className="journey-table-scroll"><table><caption className="sr-only">Sample companies, fit and contact information</caption><thead><tr><th>{phase === 5 ? <input type="checkbox" aria-label="Select all companies for enrichment" checked={rows.length > 0 && chosen.length === rows.length} onChange={e => { onInteract(); setSelected(e.target.checked ? new Set(rows.map(r => r.company)) : new Set()); }} /> : "Fit"}</th><th>Company</th><th>{phase === 6 ? "Decision maker · work email" : "Why it fits"}</th></tr></thead><tbody>{(phase === 6 ? chosen : rows).map(row => <tr key={row.company}><td>{phase === 5 ? <input type="checkbox" aria-label={`Enrich ${row.company}`} checked={selected.has(row.company)} onChange={() => toggle(row.company)} /> : <CheckCircle2 size={15} />}</td><td><b>{row.company}</b><small>{row.city} · {row.size} people</small></td><td>{phase === 6 ? <><b>{row.contact}</b><small>{row.role}</small><span className="journey-email">{row.email}</span></> : <><span>{signal}</span><small>{row.kind} · profile match</small></>}</td></tr>)}</tbody></table></div>
        {phase === 5 && <>{cost(chosen.length * 2, `Enrich ${chosen.length} selected ${chosen.length === 1 ? "company" : "companies"}`)}{approveNote}</>}
        {phase === 6 && <p className="journey-notice">Reserved .example addresses. These are fictional contacts.</p>}
        {action(phase === 4 ? "Choose who to contact" : phase === 5 ? `Approve & enrich ${chosen.length} ${chosen.length === 1 ? "company" : "companies"}` : "Draft an email", phase !== 4 && !chosen.length)}
      </>}
      {phase === 7 && <>
        <p className="journey-subtitle">An email grounded in a buying signal, ready for your review.</p>
        <div className="journey-email-editor"><div><span>To</span><b>{recipient?.email ?? "Select a company first"}</b></div><label>Subject<input aria-label="Demo email subject" value={subject ?? `A quick thought for ${recipient?.company ?? "your team"}`} onChange={e => { onInteract(); setSubject(e.target.value); }} /></label><textarea aria-label="Demo email draft" value={draft ?? defaultDraft} onChange={e => { onInteract(); setDraft(e.target.value); }} /></div>
        {approveNote}{action("Approve & send sample email", !recipient || !(draft ?? defaultDraft).trim() || !(subject ?? `A quick thought for ${recipient?.company}`).trim())}
      </>}
      {phase === 8 && <div className="journey-success"><Mail size={32} /><h4>Email approved</h4><p>Your approved draft to {recipient?.company} has been marked sent in the demo.</p><small>No email was sent. All activity stays in this preview.</small><details><summary>View approved email</summary><p className="journey-sent-draft">{draft ?? defaultDraft}</p></details>{action("View sample replies")}</div>}
      {phase === 9 && <>
        <p className="journey-subtitle">Example replies, shown instantly for this walkthrough.</p>
        <div className="journey-replies"><article><span>Interested · {recipient?.company ?? "Primer"}</span><p>“This is timely—we’re reviewing this now. Can we talk on Thursday?”</p><small>What worked: a specific signal and a relevant reason to reach out.</small></article><article><span>Not now · another sample account</span><p>“Thanks, but this isn’t a priority this quarter.”</p><small>What to learn: fit alone doesn’t mean the timing is right.</small></article></div>{action("Improve the next list")}
      </>}
      {phase === 10 && <><p className="journey-subtitle">Turn feedback into a more focused next search.</p><div className="journey-learning"><Sparkles size={22}/><h4>Recommended refinement</h4><p>Prioritise companies with a recent {scenario === "markets" ? "office expansion" : scenario === "icp" ? "product launch" : "hiring"} signal.</p><p>Exclude accounts that replied “not this quarter” from the next outreach list.</p><small>Suggested from sample replies. You decide what to keep.</small></div>{action("Apply learning & track deals")}</>}
      {phase >= 11 && <>
        <p className="journey-subtitle">Update the stage on each account. Keep the outcome with the signal that started it.</p>
        <div className="journey-deals">{chosen.slice(0, 3).map((row, i) => <div key={row.company}><span><b>{row.company}</b><small>{signal}</small></span><label><span className="sr-only">Deal stage for {row.company}</span><select value={stages[row.company] ?? (phase === 12 && i === 0 ? "Won" : i === 0 ? "Meeting" : i === 1 ? "Proposal" : "Replied")} onChange={e => { onInteract(); setStages(old => ({...old, [row.company]: e.target.value})); }}>{dealStages.map(s => <option key={s}>{s}</option>)}</select></label></div>)}</div>
        {hasWin && <div className="journey-learning"><CheckCircle2 size={22}/><h4>A win becomes a useful pattern</h4><p>Keep the winning account’s fit and buying signal as a reference for the next list.</p></div>}
        {action(phase === 11 ? "Record a sample win" : "Replay the full journey", !recipient, () => { if (phase === 11 && recipient) setStages(old => ({...old, [recipient.company]: "Won"})); })}
      </>}
    </div>}
  </div>;
}
