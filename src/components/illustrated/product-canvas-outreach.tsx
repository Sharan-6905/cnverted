"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, CheckCheck, ChevronLeft, ChevronRight, CalendarDays, MessageCircle, GripVertical, Linkedin, Mail, Send, ShieldCheck, Sparkles, Table2 } from "lucide-react";
import { PRODUCT_LEADS, type ProductScenario } from "./product-canvas-data";
import "./product-canvas-outreach.css";

function EmailDraft({ content, sent, onInteract, onChange }: {
  content: string; sent: boolean; onInteract: () => void; onChange: (value: string) => void;
}) {
  const emailField = useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    const field = emailField.current;
    if (!field) return;
    const fitText = () => { field.style.height = "auto"; field.style.height = `${field.scrollHeight}px`; };
    fitText();
    let width = field.clientWidth;
    const observer = new ResizeObserver(() => {
      if (width !== field.clientWidth) { width = field.clientWidth; fitText(); }
    });
    observer.observe(field);
    return () => observer.disconnect();
  }, [content]);
  return <textarea ref={emailField} aria-label="Sample cold email draft" value={content} readOnly={sent} onFocus={onInteract} onChange={event => { onInteract(); onChange(event.target.value); }} />;
}

export function CanvasOutreach({ phase, scenario, onAdvance, onInteract, onBack }: {
  phase: number; scenario: ProductScenario; onAdvance: (phase: number) => void; onInteract: () => void; onBack: () => void;
}) {
  const reduced = useReducedMotion();
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<string[]>(PRODUCT_LEADS.slice(0,3).map(r => r[0]));
  const [draft, setDraft] = useState<string | null>(null);
  const [profile, setProfile] = useState<string | null>(null);
  type View = "leads" | "email" | "followups";
  const stage: View = phase >= 15 ? "followups" : phase >= 11 ? "email" : "leads";
  const [inspection, setInspection] = useState<{ stage: View; view: View } | null>(null);
  const view = inspection?.stage === stage ? inspection.view : stage;
  const inspect = (next: View) => { onInteract(); setInspection({ stage, view: next }); };
  const advance = (next: number) => { setInspection(null); onAdvance(next); };
  const enriched = phase >= 9;
  const outreach = phase >= 11;
  const sent = phase >= 13;
  const bookingLink = "https://calendly.com/sample-cnvrted/30min";
  const rows = PRODUCT_LEADS.slice(page * 3, page * 3 + 3);
  const chosen = PRODUCT_LEADS.filter(r => selected.includes(r[0]));
  const recipient = chosen[0];
  const signal = scenario === "markets" ? "Office expansion" : scenario === "icp" ? "Product launch" : "Hiring designers";
  const emailFor = (row: readonly string[]) => `${row[1].split(" ")[0].toLowerCase()}@${row[0].toLowerCase()}.example`;
  const content = draft ?? `Hi ${recipient?.[1].split(" ")[0] ?? "there"},\n\nI noticed ${recipient?.[0] ?? "your team"} ${scenario === "markets" ? "is expanding its offices. We help growing teams plan their next workspace." : scenario === "icp" ? "just launched a new product. We help teams improve onboarding as they grow." : "is hiring product designers. We help teams improve onboarding while they hire."}\n\nWould a quick conversation next week be useful? You can also pick a time using the booking link below.`;
  return <motion.div className="canvas-outreach" initial={{ opacity:0, scale:reduced ? 1 : .98, y:reduced ? 0 : 12 }} animate={{ opacity:1, scale:1, y:0 }} transition={{ duration:.45, ease:[.22,1,.36,1] }} data-sent={sent} data-view={view}>
    <button type="button" className="canvas-workflow-back" onClick={onBack}><ArrowLeft size={13}/>Back to workflow</button>
    <nav className="canvas-workflow-nodes" aria-label="Outreach workflow">
      {([{id:"leads", title:"Lead list", icon:Table2, detail:"11 qualified companies", status:enriched ? "Contacts enriched" : "Ready to enrich", available:true},
        {id:"email", title:"Cold outreach", icon:Mail, detail:`${chosen.length} personalised emails`, status:sent ? "Sent · demo" : outreach ? "Review draft" : "Waiting for contacts", available:outreach},
        {id:"followups", title:"Follow-ups", icon:MessageCircle, detail:"Day 3 · Day 7", status:phase>=18 ? "Reply received" : phase>=16 ? "Sequence running" : "Review before sending", available:phase>=15}] as const).map(node=><button key={node.id} type="button" className="canvas-workflow-node" data-active={view===node.id} aria-current={view===node.id ? "step" : undefined} disabled={!node.available} onClick={()=>inspect(node.id)}>
        <span className="canvas-workflow-node-title"><node.icon size={14}/>{node.title}<GripVertical size={10}/></span>
        <span className="canvas-workflow-node-detail">{node.detail}</span>
        <small><Check size={9}/>{node.status}</small>
      </button>)}
    </nav>
    <div className="canvas-workflow-wire" aria-hidden="true"/>
    <AnimatePresence mode="wait" initial={false}>
    <motion.div key={view} className="canvas-workflow-detail" initial={{opacity:0,y:reduced?0:7}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:reduced?0:.25}}>
    {view === "leads" && <>

    <header className="canvas-outreach-heading"><Table2 size={16}/><div><h3>Your lead list</h3><small>11 sample companies · {enriched ? "Contacts enriched" : "Ready to enrich"}</small></div><span>Sample data</span></header>
    <div className="canvas-outreach-table"><table><caption className="sr-only">Illustrative company leads with fictional contact profiles and email addresses</caption><thead><tr><th><span className="sr-only">Select</span></th><th>Company</th><th>Decision maker</th><th>Contact</th></tr></thead><tbody>{rows.map((row,i) => <motion.tr key={row[0]} initial={{ opacity:0, y:reduced ? 0 : 5 }} animate={{ opacity:1, y:0 }} transition={{ duration:.3, delay:reduced ? 0 : i*.09 }}><td><input type="checkbox" aria-label={`Select ${row[0]} for outreach`} checked={selected.includes(row[0])} disabled={sent} onChange={e=>{onInteract();setSelected(old=>e.target.checked?[...old,row[0]]:old.filter(c=>c!==row[0]));setDraft(null);}} /></td><td><b>{row[0]}</b><small>{signal}</small></td><td><div className="canvas-contact-person"><img src={`/avatars/lead-${(page*3+i)%5+1}.svg`} alt={`Fictional profile illustration for ${row[1]}`} width={30} height={30}/><div><b>{enriched ? row[1] : row[2]}</b><small>{enriched ? row[2] : "Contact preview"}</small></div></div></td><td>{enriched ? <div className="canvas-contact-links"><button type="button" title="View dummy LinkedIn profile" aria-label={`Sample LinkedIn for ${row[1]}`} onClick={()=>{onInteract();setProfile(`linkedin.com/in/sample-${row[1].toLowerCase().replaceAll(' ','-')}`);}}><Linkedin size={13}/><span>LinkedIn</span></button><button type="button" aria-label={`Sample email for ${row[1]}`} onClick={()=>{onInteract();setProfile(emailFor(row));}}><Mail size={13}/><span>{emailFor(row)}</span></button></div> : <span className="canvas-contact-pending">Find contact <ArrowRight size={11}/></span>}</td></motion.tr>)}</tbody></table></div>
    <div className="canvas-outreach-table-footer"><span>{selected.length} selected · {page*3+1}–{Math.min(page*3+3,11)} of 11</span><div><button type="button" aria-label="Previous sample leads" disabled={page===0} onClick={()=>{onInteract();setPage(p=>p-1);}}><ChevronLeft size={13}/></button><button type="button" aria-label="Next sample leads" disabled={page===3} onClick={()=>{onInteract();setPage(p=>p+1);}}><ChevronRight size={13}/></button></div></div>
    {profile && <div className="canvas-profile-note"><span>{profile}<small>Fictional profile · preview only</small></span><button type="button" onClick={()=>setProfile(null)}>Close</button></div>}
    <div className="canvas-outreach-next"><Sparkles size={16}/><p>{enriched ? "Contacts ready. Use their buying signals to write a relevant email." : "Find the people behind these companies."}</p><button type="button" className="canvas-outreach-primary" disabled={!chosen.length} onClick={()=>outreach ? inspect("email") : advance(enriched ? 10 : 8)}>{outreach ? "View outreach" : enriched ? "Run cold emails" : "Find contacts"}<ArrowRight size={13}/></button></div>
    </>}
      {view === "email" && <motion.section key="email" className="canvas-email-card" initial={{opacity:0,y:reduced?0:10}} animate={{opacity:1,y:0}} transition={{duration:.4}} aria-label="Sample cold email campaign">
        <header><span className="canvas-mail-mark"><Mail size={15}/></span><div><h4>{sent ? "Outreach sent" : "Cold outreach"}</h4><small>{sent ? `${chosen.length} sample emails · simulated delivery` : `${chosen.length} selected contacts · personalised by signal`}</small></div>{sent && <CheckCheck className="canvas-delivered" size={20}/>}</header>
        <div className="canvas-email-meta"><span>To</span><b>{recipient ? emailFor(recipient) : "Choose a contact above"}</b><span className="canvas-email-subject">A quick thought for {recipient?.[0] ?? "your team"}</span></div>
        <EmailDraft content={content} sent={sent} onInteract={onInteract} onChange={setDraft}/>
        <div className="canvas-booking-link"><CalendarDays size={15}/><div><b>Book a 30-minute call</b><span>{bookingLink}</span><small>Dummy Calendly link · preview only</small></div></div>
        <footer><span><ShieldCheck size={12}/>{sent ? "No real email was sent" : phase===12 ? "Sample approval received" : "Review before sending"}</span>{sent ? <span className="canvas-sent-badge"><Check size={12}/>Sent · demo</span> : <button type="button" className="canvas-outreach-primary" disabled={!chosen.length || !content.trim()} onClick={()=>advance(13)}><Send size={13}/>Approve & send demo</button>}</footer>
      </motion.section> }
    {view === "email" && sent && <button type="button" className="canvas-followup-start" onClick={()=>phase >= 15 ? inspect("followups") : advance(14)}><Send size={13}/>Review & run follow-ups<ArrowRight size={13}/></button>}
    {view === "followups" && <motion.section className="canvas-followup-sequence" aria-label="Sample follow-up sequence" initial={{opacity:0,y:reduced?0:8}} animate={{opacity:1,y:0}} transition={{duration:.35}}>
      <header><div><h4>Keep the conversation going</h4><small>Two follow-ups · days compressed for this demo</small></div><span>{phase >= 18 ? "Stopped on reply" : phase >= 16 ? "Approved · demo" : "Review sequence"}</span></header>
      {[{day:3,at:16,text:`Hi ${recipient?.[1].split(" ")[0] ?? "there"}, just following up. Happy to share a couple of ideas tailored to ${recipient?.[0] ?? "your team"}. Is this worth a quick conversation?`},{day:7,at:17,text:"One last check-in—happy to reconnect when the timing is right. If useful, you can choose a time below."}].map(item=><article key={item.day} data-delivered={phase>=item.at}><div><span>Day {item.day}</span><b>{phase>=item.at ? <><CheckCheck size={12}/>Sent · demo</> : "Scheduled after approval"}</b></div><p>{item.text}</p><span className="canvas-followup-booking"><CalendarDays size={12}/>{bookingLink}</span></article>)}
      {phase >= 18 ? <div className="canvas-followup-reply"><MessageCircle size={17}/><div><b>Sample reply · {recipient?.[1].split(" ")[0] ?? "Alice"}</b><p>“Thanks for following up. This looks useful—let’s find a time.”</p><small>Contact removed from the sequence. No further follow-ups.</small></div></div> : <button type="button" className="canvas-outreach-primary" onClick={()=>advance(phase===15 ? 16 : phase===16 ? 17 : 18)}>{phase===15 ? "Approve & run follow-ups" : phase===16 ? "Preview day 7" : "Show sample reply"}<ArrowRight size={13}/></button>}
    </motion.section>}
    </motion.div>
    </AnimatePresence>
    <p className="canvas-outreach-sample-note">Fictional people and profiles. Reserved .example emails. No external messages.</p>
  </motion.div>;
}
