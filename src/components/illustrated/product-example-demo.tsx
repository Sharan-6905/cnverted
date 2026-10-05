"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowLeft, ArrowRight, Check, Copy, FileText, Mail, Paintbrush, Radar, Target, Users, Workflow } from "lucide-react";
import { PRODUCT_EXAMPLES, type ProductExample } from "@/lib/product-example";

const businessIcons = [Paintbrush, Workflow, Users];
const steps = [
  { label: "ICP fit", icon: Target },
  { label: "Buying signals", icon: Radar },
  { label: "Outreach", icon: Mail },
];

function OutreachDraft({ example }: { example: ProductExample }) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(`Subject: ${example.subject}\n\n${example.outreach.join("\n\n")}`);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }

  return (
    <>
      <div className="demo-panel-heading"><span className="marketing-eyebrow">03 / A conversation starter</span><h3>Give them a reason to reply.</h3><p>A draft grounded in the signals you just reviewed.</p></div>
      <div className="demo-email">
        <div className="demo-email-toolbar"><span><Mail size={15} aria-hidden="true" /> Sample email · Not sent</span><button className="demo-copy demo-interactive-only" type="button" onClick={copyDraft}>{copyState === "copied" ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}{copyState === "copied" ? "Copied" : "Copy draft"}</button></div>
        <p className="demo-email-subject"><span>Subject</span>{example.subject}</p>
        <div className="demo-email-body">{example.outreach.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      </div>
      <p className="demo-copy-status" role="status">{copyState === "copied" ? "Draft copied. Review and personalise it before use." : copyState === "failed" ? "Copy isn’t available in this browser. Select the draft text to copy it manually." : ""}</p>
      <details className="demo-message-notes"><summary>Why this message works <span aria-hidden="true">+</span></summary><ol>{example.notes.map((note) => <li key={note.title}><strong>{note.title}</strong><p>{note.text}</p></li>)}</ol></details>
      <p className="demo-footnote">In a real workflow, verify the sources and the contact’s role, then review the draft before sending. Nothing in this demo sends a message.</p>
    </>
  );
}

export function ProductExampleDemo() {
  const [business, setBusiness] = useState(0);
  const [step, setStep] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const businessChoices = useRef<(HTMLInputElement | null)[]>([]);
  const workbench = useRef<HTMLDivElement>(null);
  const example = PRODUCT_EXAMPLES[business];

  function changeStep(next: number, scroll = false) {
    setStep(next);
    tabs.current[next]?.focus({ preventScroll: true });
    if (scroll && workbench.current && workbench.current.getBoundingClientRect().top < 110) {
      workbench.current.scrollIntoView({ block: "start", behavior: "instant" });
    }
  }

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === "ArrowRight") next = (index + 1) % steps.length;
    else if (event.key === "ArrowLeft") next = (index + steps.length - 1) % steps.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = steps.length - 1;
    else return;
    event.preventDefault();
    changeStep(next);
  }

  return (
    <section className="product-demo" aria-label="Interactive signal-to-outreach example">
      <noscript><style>{".demo-interactive-only { display: none !important; } .demo-panel[hidden] { display: block !important; }"}</style><p className="demo-no-js">Here is the complete design-studio example. Enable JavaScript to try the other businesses.</p></noscript>
      <fieldset className="demo-businesses demo-interactive-only">
        <legend><span className="demo-pick-number">01</span> Choose your sample business</legend>
        <div className="demo-business-grid">
          {PRODUCT_EXAMPLES.map((item, index) => {
            const Icon = businessIcons[index];
            return <label className="demo-business-choice" key={item.id}>
              <input ref={(element) => { businessChoices.current[index] = element; }} type="radio" name="sample-business" value={item.id} checked={business === index} onChange={() => setBusiness(index)} />
              <span className="demo-business-card"><span className="demo-business-icon"><Icon size={21} aria-hidden="true" /></span><span className="demo-business-copy"><strong>{item.business}</strong><span>{item.offer}</span></span><span className="demo-choice-check" aria-hidden="true"><Check size={13} /></span></span>
            </label>;
          })}
        </div>
      </fieldset>

      <div className="demo-workbench">
        <aside className="demo-brief" aria-label={`${example.business} sample brief`}>
          <div className="demo-brief-intro"><span className="marketing-eyebrow">Your brief to Orka</span><p key={example.id} className="demo-enter">“{example.brief}”</p></div>
          <div className="demo-prospect" key={example.company}>
            <span className="marketing-eyebrow">Sample prospect</span>
            <div className="demo-prospect-name"><span className={`demo-company-mark demo-company-${example.id}`} aria-hidden="true">{example.company[0]}</span><div><h2>{example.company}</h2><p>{example.profile}</p></div></div>
            <dl><div><dt>Product</dt><dd>{example.product}</dd></div><div><dt>Person to research</dt><dd>{example.contact}</dd></div></dl>
            <span className="demo-prospect-verdict"><span aria-hidden="true" /> Worth reviewing</span>
          </div>
          <p className="demo-brief-note">A relevant signal gives you a reason to investigate. It doesn’t prove intent to buy.</p>
        </aside>

        <div className="demo-results" ref={workbench}>
          <div className="demo-tabs demo-interactive-only" role="tablist" aria-label="Explore the example">
            {steps.map(({ label, icon: Icon }, index) => <button key={label} ref={(element) => { tabs.current[index] = element; }} type="button" role="tab" id={`example-tab-${index}`} aria-controls={`example-panel-${index}`} aria-selected={step === index} tabIndex={step === index ? 0 : -1} onClick={() => changeStep(index)} onKeyDown={(event) => handleTabKey(event, index)}><Icon size={17} aria-hidden="true" /><span>{label}</span><span className="demo-tab-number" aria-hidden="true">0{index + 1}</span></button>)}
          </div>
          <p className="sr-only" role="status">Showing {example.business}: {example.company}.</p>
          <div className="demo-panel" id="example-panel-0" role="tabpanel" aria-labelledby="example-tab-0" tabIndex={0} hidden={step !== 0}>
            <div className="demo-enter" key={example.id}>
              <div className="demo-panel-heading"><span className="marketing-eyebrow">01 / Your ideal customer</span><h3>Start with a fit you can explain.</h3><p>{example.icp}</p></div>
              <ul className="demo-fit-list">{example.fit.map((fit) => <li key={fit.criterion}><span className="demo-fit-check" aria-hidden="true"><Check size={15} /></span><div><h4>{fit.criterion}</h4><p>{fit.evidence}</p></div></li>)}</ul>
              <div className="demo-open-question"><span className="marketing-eyebrow">Still an open question</span><p>{example.unknown}</p></div>
            </div>
          </div>
          <div className="demo-panel" id="example-panel-1" role="tabpanel" aria-labelledby="example-tab-1" tabIndex={0} hidden={step !== 1}>
            <div className="demo-enter" key={example.id}>
              <div className="demo-panel-heading"><span className="marketing-eyebrow">02 / Evidence & timing</span><h3>What changed. Why it might matter.</h3><p>Two sample sources give the conversation its context.</p></div>
              <div className="demo-sources">{example.sources.map((source, index) => <article key={source.title}><span className="demo-source-label"><FileText size={14} aria-hidden="true" /> S{index + 1} · {source.type} · Sample</span><h4>{source.title}</h4><blockquote>“{source.extract}”</blockquote><dl><div><dt>Published</dt><dd>{source.published}</dd></div><div><dt>Reviewed</dt><dd>{source.reviewed}</dd></div></dl></article>)}</div>
              <div className="demo-context"><div><h4>What you know</h4><p>{example.known}</p></div><div><h4>A working hypothesis</h4><p>{example.hypothesis}</p></div></div>
              <p className="demo-footnote">These fictional extracts have no source links. Real research should retain the original URLs and the dates each source was checked.</p>
            </div>
          </div>
          <div className="demo-panel" id="example-panel-2" role="tabpanel" aria-labelledby="example-tab-2" tabIndex={0} hidden={step !== 2}>
            <div className="demo-enter" key={example.id}><OutreachDraft key={example.id} example={example} /></div>
          </div>
          <div className="demo-step-footer demo-interactive-only"><span>Step {step + 1} of 3</span><div>{step > 0 && <button type="button" className="demo-back" aria-label="Previous step" onClick={() => changeStep(step - 1, true)}><ArrowLeft size={16} aria-hidden="true" /><span>Back</span></button>}{step < 2 ? <button type="button" className="demo-next" onClick={() => changeStep(step + 1, true)}>{step === 0 ? "See the signals" : "See the outreach"}<ArrowRight size={16} aria-hidden="true" /></button> : <button type="button" className="demo-next" onClick={() => businessChoices.current[business]?.focus()}>Try another business<ArrowRight size={16} aria-hidden="true" /></button>}</div></div>
        </div>
      </div>
    </section>
  );
}
