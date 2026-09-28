"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import "./live-headline.css";

const phrases = [
  { text: "buying signals", tone: "olive", icon: "M5 17V12M12 19V5M19 17V9" },
  {
    text: "live intent",
    tone: "ochre",
    icon: "M12 5L19 12L12 19L5 12Z M12 1V3M12 21V23M1 12H3M21 12H23",
  },
  {
    text: "better timing",
    tone: "sage",
    icon: "M4 13A8 8 0 1 0 7 6M3 4V9H8M12 7V12L15 14",
  },
];
const PHRASE_SECONDS = 3;
const CYCLE_SECONDS = phrases.length * PHRASE_SECONDS;
const INITIAL_OFFSET_SECONDS = 0.6;

/** A small, CSS-driven text loop; the rest of the hero remains server rendered. */
export function LiveHeadline() {
  const heading = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = heading.current;
    if (!element) return;
    const hero = element.closest<HTMLElement>(".design-hero-pin");
    let inView = false;
    const update = () => {
      element.dataset.running = String(
        inView && !document.hidden && !hero?.inert,
      );
    };
    const visibility = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        update();
      },
      { threshold: 0.15 },
    );
    const coverage = new MutationObserver(update);
    visibility.observe(element);
    if (hero)
      coverage.observe(hero, { attributes: true, attributeFilter: ["inert"] });
    document.addEventListener("visibilitychange", update);
    element.dataset.enhanced = "true";

    return () => {
      visibility.disconnect();
      coverage.disconnect();
      document.removeEventListener("visibilitychange", update);
      delete element.dataset.enhanced;
      delete element.dataset.running;
    };
  }, []);

  return (
    <span className="hero-live-title" ref={heading}>
      <span className="sr-only">Your GTM. Powered by buying signals.</span>
      <span aria-hidden="true">
        <span className="hero-live-lead">Your GTM. Powered by</span>
        <span
          className="hero-live-words"
          style={
            {
              "--headline-cycle": `${CYCLE_SECONDS}s`,
              "--headline-offset": `${-INITIAL_OFFSET_SECONDS}s`,
            } as CSSProperties
          }
        >
          {phrases.map((phrase, index) => (
            <span
              className="hero-live-frame"
              key={phrase.tone}
              data-tone={phrase.tone}
              style={
                {
                  // Start every frame on the same already-running cycle.
                  // No delayed first pass that behaves differently after wrapping.
                  "--phrase-delay": `${index * PHRASE_SECONDS - CYCLE_SECONDS - INITIAL_OFFSET_SECONDS}s`,
                } as CSSProperties
              }
            >
              <span className="hero-live-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={phrase.icon} />
                </svg>
              </span>
              <span>{phrase.text}</span>
            </span>
          ))}
        </span>
      </span>
    </span>
  );
}
