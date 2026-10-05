"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import "./deferred-visual.css";

/** Keep below-the-fold demo code, styles and artwork off the first-load path. */
export function DeferredVisual({ kind }: { kind: "flow" | "canvas" }) {
  const root = useRef<HTMLDivElement>(null);
  const [requested, setRequested] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [Visual, setVisual] = useState<ComponentType | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setRequested(true);
      observer.disconnect();
    }, { rootMargin: kind === "flow" ? "120px" : "600px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, [kind]);

  useEffect(() => {
    if (!requested) return;
    let cancelled = false;
    const load = kind === "flow"
      ? import("./lead-flow").then((module) => module.LeadFlow)
      : import("./product-canvas-demo").then((module) => module.ProductCanvasDemo);
    load.then((Component) => {
      if (!cancelled) setVisual(() => Component);
    }).catch(() => {
      if (!cancelled) setFailed(true);
    });
    return () => { cancelled = true; };
  }, [requested, kind, attempt]);

  return (
    <div ref={root} className={`deferred-visual deferred-visual-${kind}`} data-loaded={Boolean(Visual)}>
      {Visual ? <Visual /> : (
        <div className="deferred-visual-poster">
          <div>
            <span className="marketing-eyebrow">{kind === "flow" ? "Find · Match · Prioritize" : "Interactive product walkthrough"}</span>
            <h3>{kind === "flow" ? "Follow a signal to your next conversation." : "A brief. A plan. Your next move."}</h3>
            <p>{kind === "flow" ? "Public signals meet ICP fit, intent, and timing. Review the context behind each qualified lead." : "Watch Orka turn a customer brief into a research workflow and a shortlist you can explore."}</p>
            <button type="button" disabled={requested && !failed} onClick={() => {
              setFailed(false);
              setRequested(true);
              setAttempt((value) => value + 1);
            }}>
              {failed ? "Retry walkthrough" : requested ? "Loading walkthrough…" : "Play walkthrough"}
            </button>
            {failed && <p role="status">The animation couldn’t load. You can still <a href="/learn/signal-to-outreach">read the worked example</a>.</p>}
            <noscript><p><a href="/learn/signal-to-outreach">Read the signal-to-outreach example</a>. Enable JavaScript to play the animation.</p></noscript>
          </div>
        </div>
      )}
    </div>
  );
}
