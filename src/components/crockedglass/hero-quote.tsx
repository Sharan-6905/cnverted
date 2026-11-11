"use client";

import { useState } from "react";
import { CUSTOMER_TESTIMONIALS } from "@/lib/testimonials";

/** The small quote card beside "From the open web to booked meetings", stepping through the site's real testimonials. */
export function HeroQuote() {
  const [i, setI] = useState(0);
  const t = CUSTOMER_TESTIMONIALS[i], n = CUSTOMER_TESTIMONIALS.length;
  return (
    <div className="cg-quote">
      <figure aria-live="polite">
        <div className="cg-quote-who">
          <span className="cg-quote-av">
            <img src={t.image} alt="" style={t.portrait ? { transform: `scale(${t.portrait.scale})`, objectPosition: `${t.portrait.x}% ${t.portrait.y}%` } : undefined} />
          </span>
          <div>
            <p className="cg-quote-name">{t.author}</p>
            <p className="cg-quote-role">{t.role ?? "Cnvrted customer"}</p>
          </div>
        </div>
        <blockquote>{t.quote}</blockquote>
      </figure>
      <div className="cg-quote-nav">
        <button type="button" aria-label="Previous testimonial" disabled={i === 0} onClick={() => setI(i - 1)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#18191b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
        </button>
        <button type="button" aria-label="Next testimonial" disabled={i === n - 1} onClick={() => setI(i + 1)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#18191b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </button>
      </div>
    </div>
  );
}
