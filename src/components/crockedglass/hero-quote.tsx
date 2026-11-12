"use client";

import { useEffect, useRef, useState } from "react";

import { CUSTOMER_TESTIMONIALS } from "@/lib/testimonials";

type T = (typeof CUSTOMER_TESTIMONIALS)[number];

function Card({ t }: { t: T }) {
  return (
    <figure>
      <div className="cg-quote-who">
        <span className="cg-quote-av">
          <img src={t.image} alt="" loading="lazy" style={t.portrait ? { transform: `scale(${t.portrait.scale})`, objectPosition: `${t.portrait.x}% ${t.portrait.y}%` } : undefined} />
        </span>
        <div>
          <p className="cg-quote-name">{t.author}</p>
          <p className="cg-quote-role">{t.role ?? "Cnvrted customer"}</p>
        </div>
      </div>
      <blockquote>{t.quote}</blockquote>
    </figure>
  );
}

const HOLD_MS = 4200, SLIDE_MS = 700;

/**
 * The quote column beside "From the open web to booked meetings": the site's real testimonials as a slideshow,
 * one card at a time, sliding left to the next every few seconds, forever. A copy of the first card sits after
 * the last, so the slide from the last review lands on that copy and then snaps (unanimated) back to the real
 * first card: the loop always moves left with no rewind. Hover pauses it; the dots jump to a review; reduced
 * motion swaps cards without the slide.
 */
export function HeroQuote() {
  const n = CUSTOMER_TESTIMONIALS.length;
  const [i, setI] = useState(0);
  const [anim, setAnim] = useState(true);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const onVis = () => setHidden(document.hidden);
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // hold each card, then slide to the next; waits while hovered or while the tab is in the background
  useEffect(() => {
    if (paused || hidden || i === n) return;
    const id = window.setTimeout(() => { setAnim(!reduce.current); setI((v) => v + 1); }, HOLD_MS);
    return () => window.clearTimeout(id);
  }, [i, n, paused, hidden]);

  // landed on the copy of the first card: once the slide finishes, jump to the real one without animating
  useEffect(() => {
    if (i !== n) return;
    const id = window.setTimeout(() => { setAnim(false); setI(0); }, anim ? SLIDE_MS + 30 : 0);
    return () => window.clearTimeout(id);
  }, [i, n, anim]);

  const active = i % n;
  return (
    <div className="cg-quote" aria-label="What customers say" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="cg-quote-win">
        <div className="cg-quote-track" style={{ transform: `translateX(${-i * 100}%)`, transition: anim ? `transform ${SLIDE_MS}ms cubic-bezier(.65,0,.35,1)` : "none" }}>
          {CUSTOMER_TESTIMONIALS.map((t, k) => (
            <div className="cg-quote-slide" key={t.author} aria-hidden={k !== active}><Card t={t} /></div>
          ))}
          <div className="cg-quote-slide" aria-hidden="true"><Card t={CUSTOMER_TESTIMONIALS[0]} /></div>
        </div>
      </div>
      <div className="cg-quote-dots">
        {CUSTOMER_TESTIMONIALS.map((t, k) => (
          <button key={t.author} type="button" className={k === active ? "is-on" : undefined} aria-label={`Show review from ${t.author}`} aria-current={k === active}
            onClick={() => { setAnim(!reduce.current); setI(k); }} />
        ))}
      </div>
    </div>
  );
}
