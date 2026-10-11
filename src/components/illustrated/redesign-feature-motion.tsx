"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Each illustration keeps its own clock and pauses outside the viewport. */
export function FeatureMotion({ children, className, labelledBy }: { children: ReactNode; className: string; labelledBy: string }) {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let visible = false;
    const update = () => { element.dataset.motionActive = String(visible && !document.hidden); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);
  return <section ref={root} className={className} aria-labelledby={labelledBy} data-motion-active="false">{children}</section>;
}

const models = [
  { name: "Gemini", src: "/brands/gemini-color.svg" },
  { name: "Claude", src: "/brands/claude-color.svg" },
  { name: "ChatGPT", src: "/brands/openai.svg" },
  { name: "Kimi", src: "/brands/kimi-color.svg" },
];

export function FeatureModelCycle({ compact = false }: { compact?: boolean }) {
  return <span className={compact ? "feature-model-cycle feature-model-compact" : "feature-model-cycle feature-model-tile"} aria-hidden="true">
    {models.map(model => <span className="feature-model" data-provider={model.name} key={model.name}>
      <span className="feature-model-mark"><img src={model.src} alt="" width={36} height={36} loading="lazy" /></span>
      <span>{model.name}</span>
    </span>)}
  </span>;
}
