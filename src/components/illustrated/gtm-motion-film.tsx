"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { ArrowRight, ArrowUpRight, CalendarDays, Check, CheckCheck, Globe2, Flower2, Mail, MessageSquare, MousePointer2, Repeat2, ShieldCheck, Sparkles, Target, Users, Zap } from "lucide-react";

const CUES = [0, 7, 15, 23, 32, 40, 49, 57, 64, 72];
const LENGTH = 81;
const EMAIL = "Hi Maya,\n\nSaw Bloomcart’s new home collection. With the launch and your growing CX team, keeping support personal gets harder.\n\nHalcyon helps answer routine order questions, so your people can focus on customers who need them.\n\nWorth a quick look together?";
const PEOPLE = [
  { name: "Maya Chen", role: "Head of CX", company: "Bloomcart", mail: "maya@bloomcart.example", score: 94, avatar: 2 },
  { name: "Daniel Ortiz", role: "VP Operations", company: "Fernway", mail: "daniel@fernway.example", score: 87, avatar: 1 },
  { name: "Priya Nair", role: "CX Lead", company: "Kettle & Co", mail: "priya@kettle.example", score: 82, avatar: 3 },
];
function Logo({ name, src }: { name: string; src: string }) { return <img className="gm-logo" src={src} alt={name} width={24} height={24} />; }
function Portrait({ index = 2 }: { index?: number }) { return <img className="gm-portrait" src={`/avatars/lead-${index}.svg`} alt="" width={40} height={40} />; }
function Badge({ children, green = false }: { children: ReactNode; green?: boolean }) { return <span className={`gm-badge${green ? " gm-green" : ""}`}>{children}</span>; }
function Card({ children, className = "" }: { children: ReactNode; className?: string }) { return <div className={`gm-card ${className}`}>{children}</div>; }
function Bloom({ small = false }: { small?: boolean }) { return <span className={`gm-bloom ${small ? "small" : ""}`}><span><Flower2 aria-hidden="true" /></span> Bloomcart</span>; }
function Scene({ name, title, sub, children }: { name: string; title: string; sub: string; children: ReactNode }) {
  return <section className={`gm-scene gm-${name}`} data-scene={name} aria-hidden="true"><header className="gm-caption"><h3>{title}</h3><p>{sub}</p></header><div className="gm-composition">{children}</div></section>;
}
function Wires() { return <svg className="gm-wires" viewBox="0 0 1000 400" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M210 65 C470 65 480 200 690 200" /><path pathLength="1" d="M210 200 C470 200 480 200 690 200" /><path pathLength="1" d="M210 335 C470 335 480 200 690 200" /></svg>; }

export default function GTMMotionFilm() {
  const root = useRef<HTMLDivElement>(null);
  const toggle = useRef<() => void>(() => {});
  const [paused, setPaused] = useState(false);
  const [review, setReview] = useState(false);
  const seekReview = useRef<(index: number) => void>(() => {});

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const media = gsap.matchMedia();
    let inView = false;
    const reviewing = process.env.NODE_ENV === "development" && new URLSearchParams(window.location.search).has("motion-review");
    setReview(reviewing);
    let manualPause = reviewing;
    let timeline: gsap.core.Timeline | undefined;
    const syncPlayback = () => {
      const stopped = !inView || document.hidden || manualPause;
      el.dataset.playback = stopped ? "paused" : "playing";
      timeline?.paused(stopped);
    };
    toggle.current = () => { manualPause = !manualPause; setPaused(manualPause); syncPlayback(); };
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; syncPlayback(); }, { threshold: 0.15 });
    observer.observe(el);
    document.addEventListener("visibilitychange", syncPlayback);
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(el);
      const scenes = q(".gm-scene");
      const tl = gsap.timeline({ repeat: -1, paused: true, defaults: { ease: "power3.inOut" }, onRepeat: () => { el.dataset.cycle = String(Number(el.dataset.cycle || 0) + 1); } });
      timeline = tl;
      gsap.set(scenes, { autoAlpha: 0 });
      scenes.forEach((scene, i) => {
        const at = CUES[i];
        tl.addLabel(scene.dataset.scene!, at);
        tl.fromTo(scene, { autoAlpha: 0, y: 18, scale: .98 }, { autoAlpha: 1, y: 0, scale: 1, duration: .7 }, at);
        tl.call(() => { el.dataset.scene = scene.dataset.scene; }, [], at);
        const entrances = scene.querySelectorAll(".gm-enter");
        if (entrances.length) tl.fromTo(entrances, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, stagger: .16, duration: .65 }, at + .35);
        tl.to(scene, { autoAlpha: 0, y: -16, scale: 1.015, duration: .5 }, (CUES[i + 1] ?? LENGTH) - .5);
      });
      const reveal = (sel: string, at: number, stagger = .18) => tl.fromTo(q(sel), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: .65, stagger }, at);
      reveal(".gm-brief .gm-field", 1.2, .5);
      tl.fromTo(q(".gm-brief-arrow"), { autoAlpha: 0, x: -20 }, { autoAlpha: 1, x: 0, duration: .6 }, 2.4);
      reveal(".gm-brief .gm-icp-result", 2.8);
      reveal(".gm-deep .gm-satellite", 8.4, .65);
      tl.fromTo(q(".gm-deep .gm-orbit-line"), { scale: .3, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.8 }, 8);
      reveal(".gm-targets tbody tr", 16.2, .4);
      tl.to(q(".gm-rejected"), { opacity: .5, duration: .8 }, 19.8);
      reveal(".gm-target-result", 20.3);
      reveal(".gm-signal-card", 24, .7);
      tl.fromTo(q(".gm-signals .gm-wires path"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.5, stagger: .4 }, 25);
      reveal(".gm-signal-proof", 27, .4);
      tl.fromTo(q(".gm-intent-number"), { textContent: 0 }, { textContent: 94, snap: { textContent: 1 }, duration: 1.3 }, 28);
      reveal(".gm-enrich tbody tr", 33, .35);
      reveal(".gm-contact-proof", 35, .5);
      reveal(".gm-ready", 37);
      const typed = q(".gm-typed")[0];
      const writer = { length: 0 };
      tl.fromTo(writer, { length: 0 }, { length: EMAIL.length, duration: 3.5, ease: "none", onUpdate: () => { typed.textContent = EMAIL.slice(0, Math.round(writer.length)); } }, 41);
      reveal(".gm-approval", 44.8);
      tl.fromTo(q(".gm-cursor"), { autoAlpha: 0, x: 35, y: 35 }, { autoAlpha: 1, x: 0, y: 0, duration: .7 }, 45.5);
      tl.to(q(".gm-approve-button"), { scale: .96, yoyo: true, repeat: 1, duration: .16 }, 46.3);
      tl.to(q(".gm-cursor"), { autoAlpha: 0, duration: .3 }, 46.7);
      tl.to(q(".gm-approve-button"), { autoAlpha: 0, duration: .2 }, 46.7);
      reveal(".gm-sent", 46.7);
      reveal(".gm-followup-row", 50, .7);
      reveal(".gm-reply-card", 52.4);
      reveal(".gm-stopped", 54.5);
      reveal(".gm-meeting-reply", 57.5);
      reveal(".gm-calendar", 58);
      tl.fromTo(q(".gm-slot"), { backgroundColor: "#f6f3ed", color: "#777" }, { backgroundColor: "#4f65f5", color: "#fff", duration: .7 }, 59.5);
      reveal(".gm-confirmed", 61);
      reveal(".gm-deal-ticket", 64.7);
      // Measure the actual lanes, including responsive gaps and wrapped headers.
      const laneOffset = (index: number, axis: "x" | "y") => {
        const lanes = q(".gm-pipeline-columns > div:not(.gm-deal-ticket)") as HTMLElement[];
        return axis === "x" ? lanes[index].offsetLeft - lanes[0].offsetLeft : lanes[index].offsetTop - lanes[0].offsetTop;
      };
      tl.to(q(".gm-deal-ticket"), { x: () => laneOffset(1, "x"), y: () => laneOffset(1, "y"), duration: 1.1 }, 66);
      reveal(".gm-proposal-accepted", 67);
      tl.to(q(".gm-deal-ticket"), { x: () => laneOffset(2, "x"), y: () => laneOffset(2, "y"), backgroundColor: "#edf6ef", borderColor: "#91b49a", duration: 1.1 }, 68.4);
      tl.to(q(".gm-deal-ticket > strong"), { autoAlpha: () => el.clientWidth < 600 ? 0 : 1, duration: .2 }, 69.3);
      reveal(".gm-won-stamp", 69.4);
      reveal(".gm-crm-field", 73.2, .3);
      reveal(".gm-crm-synced", 75);
      reveal(".gm-learning", 75.5);
      tl.fromTo(q(".gm-loop-arrow"), { rotate: -180, autoAlpha: 0 }, { rotate: 0, autoAlpha: 1, duration: 1.3 }, 77);
      reveal(".gm-next-cycle", 78);
      seekReview.current = (index) => {
        manualPause = true;
        setPaused(true);
        tl.pause(0).seek((CUES[index + 1] ?? LENGTH) - 1, false);
        syncPlayback();
      };
      if (reviewing) seekReview.current(0);
      syncPlayback();
      let previousWidth = el.clientWidth;
      const resize = new ResizeObserver(() => {
        if (Math.abs(el.clientWidth - previousWidth) < 2) return;
        previousWidth = el.clientWidth;
        // Recalculate lane positions without losing the viewer's place.
        const time = tl.time();
        tl.pause(0).invalidate().time(time, false);
        syncPlayback();
      });
      resize.observe(el);
      return () => { resize.disconnect(); tl.kill(); timeline = undefined; };
    }, el);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", syncPlayback); media.revert(); toggle.current = () => {}; };
  }, []);

  return <div className="gtm-motion-film" ref={root} data-cycle="0" role="group" aria-label="Halcyon's complete GTM workflow, an animated demo">
    {review && <select aria-label="Review animation scene" onChange={event => seekReview.current(Number(event.target.value))} style={{position:"fixed",bottom:8,right:16,zIndex:9999,color:"#242a29",background:"white",padding:8}}>{["Brief","Deep ICP","Targets","Signals","Enrich","Outreach","Replies","Meeting","Deal","CRM"].map((name,index)=><option value={index} key={name}>{name}</option>)}</select>}
    <div className="gm-masthead"><span><img src="/demos/lead-discovery/logo.png" alt="" width={23} height={23} /> Cnvrted <span className="gm-mast-divider" /> <span className="gm-film-name">A signal becomes a customer.</span></span><span className="gm-demo-label">ILLUSTRATIVE WORKFLOW</span></div>
    <div className="gm-film-stage" aria-hidden="true">
      <Scene name="brief" title="A little context. A clear direction." sub="Start with what you sell. Orka finds the people who need it.">
        <div className="gm-two-up">
          <Card className="gm-company gm-enter"><div className="gm-company-top"><span className="gm-halcyon">h.</span><div><strong>Halcyon</strong><small>halcyon.example</small></div><Badge>Demo company</Badge></div><h4>More human support.<br />{" "}Less busywork.</h4><div className="gm-field"><span>PRODUCT</span><p>AI support for growing commerce brands</p></div><div className="gm-field"><span>VALUE</span><p>Resolve routine tickets. Give your team time back.</p></div><div className="gm-company-foot"><Globe2 size={15} /> Website → business context <Check size={15} /></div></Card>
          <span className="gm-brief-arrow"><ArrowRight /></span>
          <Card className="gm-icp-result gm-lavender"><div className="gm-card-title"><span className="gm-icon"><Target /></span><strong>Your ideal customer</strong><Badge>v1</Badge></div><div className="gm-field"><span>INDUSTRY</span><p>DTC home & lifestyle</p></div><div className="gm-field"><span>COMPANY SIZE</span><p>50–200 people</p></div><div className="gm-field"><span>BUYER</span><p>Head of Customer Experience</p></div><div className="gm-note"><Check size={15} /> A focused place to start</div></Card>
        </div>
      </Scene>
      <Scene name="deep" title="Go beyond a job title." sub="Understand the pain, the people and the reason to buy.">
        <div className="gm-constellation"><div className="gm-orbit-line" /><Card className="gm-icp-core gm-enter"><Target /><span>IDEAL CUSTOMER</span><h4>Growing brands.<br />{" "}Overstretched CX teams.</h4><Badge>Halcyon · ICP v1</Badge></Card>
        <Card className="gm-satellite gm-pain"><Zap /><div><b>What hurts</b><p>Launch-week ticket spikes.<br />{" "}Slow first responses.</p></div></Card>
        <Card className="gm-satellite gm-tools"><Globe2 /><div><b>What they use</b><p>Online storefront + helpdesk.<br />{" "}Repetitive order questions.</p></div></Card>
        <Card className="gm-satellite gm-buyer"><Users /><div><b>Who buys</b><p>Head of CX champions it.<br />{" "}VP Operations approves.</p></div></Card>
        <Card className="gm-satellite gm-fit"><ShieldCheck /><div><b>What makes a fit</b><p>Growing order volume.<br />{" "}A team ready to automate.</p></div></Card></div>
      </Scene>
      <Scene name="targets" title="Find your corner of the market." sub="Turn the profile into a focused list. Keep fit separate from intent.">
        <div className="gm-research-layout"><Card className="gm-reference gm-enter"><div className="gm-card-title"><Logo name="LinkedIn" src="/brands/linkedin.svg" /><span>Public profile reference</span></div><div className="gm-blueland">BLUELAND</div><p>Refillable cleaning essentials</p><div className="gm-reference-facts"><span>Retail · New York</span><span>51–200 employees</span><span>Sarah Paiji Yoo<br />{" "}<small>Co-founder & CEO</small></span></div><div className="gm-source-links"><a tabIndex={-1} href="https://www.linkedin.com/company/liveblueland" target="_blank" rel="noreferrer">Company profile <ArrowUpRight /></a><a tabIndex={-1} href="https://www.blueland.com/pages/about-us" target="_blank" rel="noreferrer">Official website <ArrowUpRight /></a></div><small>Segment reference, not a customer claim</small></Card>
        <Card className="gm-target-table gm-enter"><div className="gm-card-title"><Users /><strong>Target accounts</strong><Badge>Demo shortlist</Badge></div><table><thead><tr><th>Company</th><th>People</th><th>Fit</th></tr></thead><tbody>{[["Bloomcart","Home goods","84","Strong"],["Fernway","Lifestyle","120","Strong"],["Kettle & Co","Home goods","65","Strong"],["Northpine","Enterprise IT","1,200","Outside ICP"]].map((r,i)=><tr key={r[0]} className={i===3 ? "gm-rejected" : ""}><td><span className={`gm-company-monogram gm-mono-${i}`}>{r[0][0]}</span><div><b>{r[0]}</b><small>{r[1]}</small></div></td><td>{r[2]}</td><td><span className={i===3 ? "" : "gm-fit-text"}>{r[3]}</span></td></tr>)}</tbody></table><div className="gm-target-result gm-note"><Check /> Three accounts match. Now find why they’d buy.</div></Card></div>
      </Scene>
      <Scene name="signals" title="Find the why now." sub="Connect conversations, company updates and hiring signals.">
        <div className="gm-signal-layout"><Wires /><div className="gm-signal-stack">
          <Card className="gm-signal-card"><div className="gm-card-title"><Logo name="LinkedIn" src="/brands/linkedin.svg" /><b>Company update</b><small>Example</small></div><p>Bloomcart introduces a new home collection.</p><span>Product launch → more customer questions</span></Card>
          <Card className="gm-signal-card"><div className="gm-card-title"><Logo name="Reddit" src="/brands/reddit.svg" /><b>Buyer conversation</b><small>Example</small></div><p>“How do we handle support spikes after a launch?”</p><span>Category pain → a relevant conversation</span></Card>
          <Card className="gm-signal-card"><div className="gm-card-title"><Globe2 /><b>Careers page</b><small>Example</small></div><p>Two new customer-support roles.</p><span>Team investment → capacity matters</span></Card>
        </div><Card className="gm-signal-account gm-enter"><Bloom /><p className="gm-account-description">The account fits.<br />{" "}<strong>The timing fits, too.</strong></p><div className="gm-intent"><b className="gm-intent-number">94</b><span>illustrative<br />{" "}intent score</span></div><div className="gm-signal-proof"><Check /> ICP matched</div><div className="gm-signal-proof"><Check /> Company-level triggers</div><div className="gm-signal-proof"><Check /> Category context attached</div><Badge green>Prioritise for outreach</Badge></Card></div>
      </Scene>
      <Scene name="enrich" title="From companies to conversations." sub="Refine the shortlist. Find the buyer. Keep the context.">
        <Card className="gm-contact-table gm-enter"><div className="gm-card-title"><Users /><strong>Your qualified leads</strong><Badge green>3 high-fit accounts</Badge></div><table><thead><tr><th>Buyer / company</th><th>Contact</th><th>Priority</th></tr></thead><tbody>{PEOPLE.map(p=><tr key={p.name}><td><Portrait index={p.avatar} /><div><b>{p.name}</b><small>{p.role} · {p.company}</small></div></td><td><div className="gm-contact-proof"><Logo name="LinkedIn" src="/brands/linkedin.svg" /><span>Sample profile</span></div><div className="gm-contact-proof"><Mail /><span>{p.mail}</span></div></td><td><span className="gm-score">{p.score}</span></td></tr>)}</tbody></table><div className="gm-enrich-foot gm-ready"><ShieldCheck /><span>Buyer role + work email + source context</span><Badge green><Check /> Ready</Badge></div></Card>
        <div className="gm-enrich-chips gm-ready"><span><Logo name="LinkedIn" src="/brands/linkedin.svg" /> Launch context</span><span><Logo name="Reddit" src="/brands/reddit.svg" /> Buyer pain</span><span><Globe2 /> Hiring signal</span></div>
      </Scene>
      <Scene name="outreach" title="A reason to reach out. In every email." sub="Orka connects the buying signal to your offer. You approve the send.">
        <div className="gm-outreach-layout"><Card className="gm-buyer-context gm-enter"><Portrait /><h4>Maya Chen</h4><p>Head of CX</p><Bloom small /><div className="gm-context-trigger"><Logo name="LinkedIn" src="/brands/linkedin.svg" /><span>New home collection<br />{" "}<small>Launch + growing CX team</small></span></div><Badge green>94 · high intent</Badge></Card>
        <Card className="gm-email gm-enter"><div className="gm-card-title"><Logo name="Gmail" src="/logos/gmail.png" /><strong>New message</strong><Badge>Personalised</Badge></div><div className="gm-mail-meta"><span>To</span> maya@bloomcart.example</div><div className="gm-mail-meta"><span>Subject</span> A little breathing room for launch week</div><p className="gm-typed" /><div className="gm-email-actions"><span className="gm-approval"><ShieldCheck /> Reviewed & approved</span><span className="gm-approve-button">Approve & send <ArrowRight /><MousePointer2 className="gm-cursor" /></span><span className="gm-sent"><CheckCheck /> Sent · demo</span></div></Card></div>
      </Scene>
      <Scene name="replies" title="Keep the conversation moving." sub="Follow up thoughtfully. Stop the sequence as soon as someone replies.">
        <div className="gm-reply-layout"><Card className="gm-sequence gm-enter"><div className="gm-card-title"><Repeat2 /><strong>Maya’s sequence</strong><Badge>Bloomcart</Badge></div><div className="gm-followup-row"><span className="gm-day">Day 1</span><div><b>Personalised introduction</b><p>The launch-week support challenge</p></div><CheckCheck /></div><div className="gm-followup-row"><span className="gm-day">Day 3</span><div><b>A useful follow-up</b><p>“Happy to share two ideas for your team.”</p></div><CheckCheck /></div><div className="gm-followup-row gm-last-followup"><span className="gm-day">Day 7</span><div><b>One final check-in</b><p className="gm-stopped">Cancelled — Maya replied</p></div><span className="gm-stopped"><Check /></span></div></Card>
        <Card className="gm-reply-card"><div className="gm-card-title"><Portrait /><div><b>Maya Chen</b><small>Re: A little breathing room for launch week</small></div></div><MessageSquare /><blockquote>“This is good timing. Can you show me how it would work for our team?”</blockquote><div className="gm-note"><CheckCheck /> Reply received</div><Badge green>Sequence stopped</Badge></Card></div>
      </Scene>
      <Scene name="meeting" title="Turn interest into time on the calendar." sub="The context travels with the meeting. Your team starts prepared.">
        <div className="gm-meeting-layout"><div className="gm-meeting-reply"><Card><div className="gm-card-title"><Portrait /><b>Maya Chen</b><Badge green>Interested</Badge></div><p>“Thursday at 10:30 works for me.”</p></Card><Card className="gm-meeting-brief"><span className="gm-eyebrow">MEETING BRIEF</span><h4>Halcyon × Bloomcart</h4><p>Explore launch-week support automation.</p><div><Check /> New collection launch</div><div><Check /> Growing customer-support team</div></Card></div>
        <Card className="gm-calendar"><div className="gm-card-title"><CalendarDays /><strong>Choose a time</strong><span>30 min</span></div><div className="gm-calendar-days">{["Mon 12","Tue 13","Wed 14","Thu 15","Fri 16"].map((d,i)=><span className={i===3?"selected":""} key={d}>{d.split(" ")[0]}<b>{d.split(" ")[1]}</b></span>)}</div><div className="gm-times"><span>09:00</span><span className="gm-slot">10:30</span><span>14:00</span></div><div className="gm-confirmed"><span className="gm-confirm-icon"><Check /></span><h4>You’re booked.</h4><p>Thursday · 10:30–11:00</p><div><Logo name="Google Meet" src="/logos/google-meet.png" /> Halcyon × Bloomcart</div></div></Card></div>
      </Scene>
      <Scene name="deal" title="A conversation becomes a customer." sub="Keep the opportunity moving, from discovery to signed proposal.">
        <Card className="gm-pipeline gm-enter"><div className="gm-card-title"><Bloom /><Badge>Opportunity · $18,000 / year</Badge></div><div className="gm-pipeline-columns"><div><span>Discovery</span><small>Needs understood</small></div><div><span>Proposal</span><small>Scope & pricing agreed</small></div><div><span>Closed won</span><small>Let’s get to work</small></div><div className="gm-deal-ticket"><span className="gm-ticket-top"><Portrait /><div><b>Bloomcart</b><small>Maya Chen · Head of CX</small></div></span><strong>$18,000</strong><span>Annual contract</span><div className="gm-won-stamp"><CheckCheck /> Closed won</div></div></div></Card><div className="gm-proposal-accepted"><ShieldCheck /><span>Proposal accepted <b>Signature received</b></span><Check /></div>
      </Scene>
      <Scene name="crm" title="Every win makes the next list smarter." sub="Sync the deal, keep the history, and learn what your best customers share.">
        <div className="gm-crm-layout"><Card className="gm-crm-record gm-enter"><div className="gm-card-title"><Logo name="HubSpot" src="/figma/home-imgHubspotIcon1.svg" /><strong>HubSpot</strong><Badge green>Deal record</Badge></div><Bloom /><div className="gm-crm-field"><span>CONTACT</span><b>Maya Chen</b></div><div className="gm-crm-field"><span>STAGE</span><b>Closed won <Check /></b></div><div className="gm-crm-field"><span>AMOUNT</span><b>$18,000 / year</b></div><div className="gm-crm-field"><span>HISTORY</span><b>Signals, emails & meeting notes</b></div><div className="gm-crm-synced gm-note"><CheckCheck /> CRM updated · demo</div></Card><div className="gm-loop-arrow"><Repeat2 /></div><Card className="gm-learning gm-lavender"><div className="gm-card-title"><Target /><strong>A sharper ICP</strong><Badge>v2</Badge></div><h4>More brands like<br />{" "}your best customer.</h4><div className="gm-learning-rule"><Check /><span>DTC home & lifestyle</span></div><div className="gm-learning-rule"><Check /><span>New collection launching</span></div><div className="gm-learning-rule"><Check /><span>Investing in customer experience</span></div><div className="gm-next-cycle"><Sparkles /><span>The next cycle starts here.</span><ArrowRight /></div></Card></div>
      </Scene>
    </div>
    <div className="gm-accessible-summary"><h3>From ideal customer to closed deal</h3><p>Halcyon defines its ICP, researches accounts and connects buying signals from LinkedIn, Reddit and company websites. A qualified buyer becomes an approved email, a reply, a booked meeting and a won deal. The CRM sync feeds learning back into the next target list.</p><div>ICP <ArrowRight /> Signals <ArrowRight /> Outreach <ArrowRight /> Meeting <ArrowRight /> Won <Repeat2 /></div></div>
    <span className="gm-footnote">Halcyon & Bloomcart are fictional. Outreach and outcomes are simulated.</span>
    <button type="button" className="gm-pause" onClick={() => toggle.current()} aria-label={paused ? "Play GTM animation" : "Pause GTM animation"}>{paused ? "Play animation" : "Pause animation"}</button>
  </div>;
}
