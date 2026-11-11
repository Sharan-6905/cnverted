"use client";

import { useId, useState } from "react";
import { CG_FAQS } from "./faq-data";


export function CgFaq() {
  const [open, setOpen] = useState(0);
  const id = useId();
  return (
    <section className="cg-wrap cg-faq" aria-labelledby={`${id}-t`}>
      <div className="cg-faq-side">
        <h2 id={`${id}-t`} className="cg-h2">Questions, answered</h2>
        <p className="cg-lede">Everything teams ask before letting Orka find, reach and book for them.</p>
        <a href="/contact" className="cg-dark-btn">Talk to our team
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </a>
      </div>
      <div className="cg-faq-list">
        {CG_FAQS.map(([q, a], i) => (
          <div key={q} className={`cg-faq-item${open === i ? " is-open" : ""}`}>
            <h3 style={{ margin: 0, font: "inherit" }}>
              <button type="button" className="cg-faq-q" aria-expanded={open === i} aria-controls={`${id}-a${i}`} onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{q}</span><span className="cg-faq-ic" aria-hidden="true" />
              </button>
            </h3>
            <div id={`${id}-a${i}`} className="cg-faq-a" role="region"><div><p>{a}</p></div></div>
          </div>
        ))}
      </div>
    </section>
  );
}
