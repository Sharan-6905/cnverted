"use client";

import { useEffect, useState } from "react";
import { Check, Loader2, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

/** Each message owns its typing state, so the canvas doesn't rerender per letter. */
export function DemoTypewriter({
  text,
  playing,
  speed = 22,
}: {
  text: string;
  playing: boolean;
  speed?: number;
}) {
  const [length, setLength] = useState(0);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (!playing || reducedMotion || length >= text.length) return;
    const timer = window.setTimeout(
      () => setLength((value) => value + 1),
      speed,
    );
    return () => window.clearTimeout(timer);
  }, [length, playing, reducedMotion, speed, text.length]);
  return (
    <span className="product-typewriter">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {reducedMotion ? text : text.slice(0, length)}
        {!reducedMotion && length < text.length && (
          <i className="product-type-caret" />
        )}
      </span>
    </span>
  );
}

const steps = [
  "Defining your ICP",
  "Matching companies",
  "Reading buying signals",
  "Building your shortlist",
];

export function DemoThinking({ phase }: { phase: number }) {
  const reducedMotion = useReducedMotion();
  return (
    <div className="product-thinking-steps">
      {steps.map((label, index) => {
        const at = index + 2;
        if (phase < at) return null;
        const done = phase > at || phase >= 5;
        return (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: reducedMotion ? 0 : 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="product-thinking-step"
            data-done={done}
          >
            {done ? (
              <Check size={13} />
            ) : (
              <Loader2 size={13} className="product-working-spinner" />
            )}
            <span>{label}</span>
            {done && <small>Done</small>}
          </motion.div>
        );
      })}
    </div>
  );
}

export function DemoToolLogos() {
  return (
    <div className="product-app-integrations" aria-label="Connected tools">
      <span className="product-tool-tile" title="HubSpot">
        <img
          src="/figma/home-canvas/integrations-imgHubspotIcon1.svg"
          alt="HubSpot"
        />
        <i />
      </span>
      <span className="product-tool-tile" title="Slack">
        <img
          src="/figma/home-canvas/integrations-imgSlackIcon20191.svg"
          alt="Slack"
        />
        <i />
      </span>
      <span className="product-tool-tile" title="Composio">
        <img src="/brands/composio.png" alt="Composio" />
        <i />
      </span>
    </div>
  );
}

export function DemoModelIcon() {
  return <Sparkles size={13} strokeWidth={1.6} aria-hidden="true" />;
}
