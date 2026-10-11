"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import "./market-scroll-story.css";
import "./gtm-motion-film.css";

const GTMMotionFilm = dynamic(() => import("./gtm-motion-film"), { ssr: false });

/** The film plays in normal page flow and never captures scrolling. */
export function MarketScrollStory() {
  const frame = useRef<HTMLDivElement>(null);
  const [requested, setRequested] = useState(false);
  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const near = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setRequested(true); near.disconnect(); }
    }, { rootMargin: "600px" });
    near.observe(el);
    return () => near.disconnect();
  }, []);
  return <div className="market-story-player" ref={frame}>
    <div className="redesign-market-stage">
      <Image src="/figma/redesign/551-6482-market-paper.webp" alt="" fill sizes="100vw" className="redesign-market-texture" />
      <div className="redesign-market-media">
        {requested && <GTMMotionFilm />}
      </div>
    </div>
    <noscript><p className="market-story-fallback">Define your ideal customer, research accounts, refine leads, connect buying signals, enrich contacts, approve outreach, book meetings, close deals, and sync the learning to your CRM.</p></noscript>
  </div>;
}
