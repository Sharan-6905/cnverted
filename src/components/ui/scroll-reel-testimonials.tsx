"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import "./scroll-reel-testimonials.css";

export interface ScrollReelTestimonial {
  quote: string;
  author: string;
  image: string;
  alt?: string;
  role?: string;
  linkedinUrl?: string;
  portrait?: { scale: number; x: number; y: number };
}

export interface ScrollReelTestimonialsProps {
  testimonials: ScrollReelTestimonial[];
  charStaggerMs?: number;
  className?: string;
}

const CELL = 156;
const GAP = 8;
const STEP = 3 * (CELL + GAP);
const EXIT_MS = 140;
const SLIDE_MS = 600;
const AUTOPLAY_MS = 1000;
const EASE_INOUT = "cubic-bezier(0.65,0,0.35,1)";
const FEATURED_SHADOW = "0 2px 2px #20201812, 0 8px 8px #20201816, 0 20px 20px #2020181c, 0 40px 40px #20201808, inset 0 1px 0 #ffffffb3";

function Cell() {
  return <div className="scroll-reel-cell" style={{ width: CELL, height: CELL }} />;
}

function Featured({ src, alt, portrait = { scale: 1, x: 50, y: 50 } }: { src: string; alt?: string; portrait?: ScrollReelTestimonial["portrait"] }) {
  return (
    <div className="scroll-reel-featured" style={{ width: CELL, height: CELL, boxShadow: FEATURED_SHADOW }}>
      <Image src={src} alt={alt ?? ""} width={800} height={800} sizes={`${Math.ceil(CELL * portrait.scale)}px`} quality={95} loading="lazy" style={{ width: `${portrait.scale * 100}%`, height: `${portrait.scale * 100}%`, left: `${50 - portrait.x * portrait.scale}%`, top: `${50 - portrait.y * portrait.scale}%` }} />
    </div>
  );
}

function Chars({ text, startIndex, staggerMs }: { text: string; startIndex: number; staggerMs: number }) {
  let index = startIndex;
  const words = text.split(" ");
  return <>{words.map((word, wi) => {
    const letters = Array.from(word).map((character, ci) => {
      const delay = index++ * staggerMs;
      return <span key={ci} className="scroll-reel-char" style={{ animationDelay: `${delay}ms` }}>{character}</span>;
    });
    if (wi < words.length - 1) index++;
    return <React.Fragment key={wi}><span className="inline-block whitespace-nowrap">{letters}</span>{wi < words.length - 1 ? " " : null}</React.Fragment>;
  })}</>;
}

/** Counter-moving portrait columns with a staggered text reveal. */
export function ScrollReelTestimonials({ testimonials, charStaggerMs = 3, className }: ScrollReelTestimonialsProps) {
  // One duplicate portrait at either end lets the reel wrap by a single step.
  const [index, setIndex] = React.useState(1);
  const [snapping, setSnapping] = React.useState(false);
  const [displayIndex, setDisplayIndex] = React.useState(0);
  const [exiting, setExiting] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const [inView, setInView] = React.useState(false);
  const [pageVisible, setPageVisible] = React.useState(true);
  const [reducedMotion, setReducedMotion] = React.useState(true);
  const root = React.useRef<HTMLDivElement>(null);
  const animating = React.useRef(false);
  const timeouts = React.useRef<ReturnType<typeof setTimeout>[]>([]);
  const count = testimonials.length;
  const activeIndex = count ? ((index - 1) % count + count) % count : 0;
  const current = testimonials[displayIndex] ?? testimonials[0];
  const stagger = Math.max(0, Math.min(charStaggerMs, 20));

  React.useEffect(() => {
    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => setMounted(true));
    });
    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      timeouts.current.forEach(clearTimeout);
    };
  }, []);

  React.useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(motion.matches);
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateMotion();
    updateVisibility();
    motion.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.intersectionRatio >= 0.25), { threshold: 0.25 });
    if (root.current) observer.observe(root.current);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  React.useEffect(() => {
    if (!snapping) return;
    let secondFrame = 0;
    const frame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => setSnapping(false));
    });
    return () => { cancelAnimationFrame(frame); cancelAnimationFrame(secondFrame); };
  }, [snapping]);

  const paginate = (direction: 1 | -1) => {
    if (animating.current || snapping || count < 2) return;
    const next = (activeIndex + direction + count) % count;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIndex(next + 1);
      setDisplayIndex(next);
      return;
    }
    animating.current = true;
    setBusy(true);
    setIndex(index + direction);
    setExiting(true);
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [
      setTimeout(() => { setDisplayIndex(next); setExiting(false); }, EXIT_MS),
      setTimeout(() => {
        if (index + direction === 0 || index + direction === count + 1) {
          setSnapping(true);
          setIndex(next + 1);
        }
      }, SLIDE_MS),
      setTimeout(() => { animating.current = false; setBusy(false); timeouts.current = []; },
        Math.max(SLIDE_MS + 50, EXIT_MS + testimonials[next].quote.length * stagger + 450)),
    ];
  };

  const middleItems = React.useMemo(() => {
    const items: Array<{ type: "cell" } | { type: "featured"; i: number }> = [];
    for (let i = 0; i < 3; i++) items.push({ type: "cell" });
    const portraitIndices = count ? [count - 1, ...testimonials.map((_, i) => i), 0] : [];
    portraitIndices.forEach((i, position) => {
      items.push({ type: "featured", i });
      if (position < portraitIndices.length - 1) items.push({ type: "cell" }, { type: "cell" });
    });
    for (let i = 0; i < 3; i++) items.push({ type: "cell" });
    return items;
  }, [testimonials, count]);

  const autoAdvance = React.useEffectEvent(() => paginate(1));
  const autoPlaying = count > 1 && inView && pageVisible && !reducedMotion && !hovered && !focused;
  React.useEffect(() => {
    if (!autoPlaying) return;
    const timer = setInterval(() => autoAdvance(), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [autoPlaying]);

  if (!current) return null;
  const middleY = ((count + 1) / 2 - index) * STEP;
  const colStyle = (y: number): React.CSSProperties => ({
    transform: `translateY(${y}px)`,
    transition: mounted && !snapping ? `transform ${SLIDE_MS}ms ${EASE_INOUT}` : "none",
  });
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      paginate(event.key === "ArrowRight" ? 1 : -1);
    }
  };

  return (
    <div ref={root} role="region" aria-roledescription="carousel" aria-label="Testimonials" tabIndex={0} onKeyDown={onKeyDown} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }} className={cn("scroll-reel", className)}>
      <div aria-hidden="true" className="scroll-reel-portraits">
        <div className="scroll-reel-columns">
          <div className="scroll-reel-column" style={colStyle(-middleY)}>{Array.from({ length: 3 * (count + 2) + 4 }, (_, i) => <Cell key={i} />)}</div>
          <div className="scroll-reel-column" style={colStyle(middleY)}>{middleItems.map((item, i) => item.type === "featured" ? <Featured key={i} src={testimonials[item.i].image} alt={testimonials[item.i].alt} portrait={testimonials[item.i].portrait} /> : <Cell key={i} />)}</div>
          <div className="scroll-reel-column" style={colStyle(-middleY)}>{Array.from({ length: 3 * (count + 2) + 4 }, (_, i) => <Cell key={i} />)}</div>
        </div>
      </div>
      <div className="scroll-reel-content">
        <Quote className="scroll-reel-quote-mark" aria-hidden="true" />
        <div className="scroll-reel-text-stage">
          {/* Stack all copies invisibly to reserve the longest quote's height. */}
          <div className="scroll-reel-sizing" aria-hidden="true">{testimonials.map((item, i) => <div key={i} className="scroll-reel-text-block"><p className="scroll-reel-quote">{item.quote}</p><p className="scroll-reel-author"><span className="scroll-reel-author-name">{item.author}</span><small>{item.role ?? "Cnvrted customer"}</small></p></div>)}</div>
          <div key={displayIndex} className={cn("scroll-reel-text-block scroll-reel-active", exiting && "scroll-reel-exit")} style={{ animationDuration: `${EXIT_MS}ms` }}>
            <p className="scroll-reel-quote" aria-hidden="true"><Chars text={current.quote} startIndex={0} staggerMs={stagger} /></p>
            <p className="scroll-reel-author">
              {current.linkedinUrl ? <a className="scroll-reel-author-name" href={current.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label={`${current.author} on LinkedIn (opens in a new tab)`}>
                <span>{current.author}</span>
                <img src="/brands/linkedin.svg" width={20} height={20} alt="" />
              </a> : <span className="scroll-reel-author-name">{current.author}</span>}
              <small>{current.role ?? "Cnvrted customer"}</small>
            </p>
          </div>
          <p className="sr-only" aria-live={autoPlaying ? "off" : "polite"} aria-atomic="true">{current.quote} — {current.author}. Testimonial {Math.min(displayIndex + 1, count)} of {count}.</p>
        </div>
        <div className="scroll-reel-controls">
          <button type="button" onClick={() => paginate(-1)} disabled={count < 2} aria-disabled={busy || snapping || count < 2} aria-label="Previous testimonial"><ChevronLeft aria-hidden="true" /></button>
          <button type="button" onClick={() => paginate(1)} disabled={count < 2} aria-disabled={busy || snapping || count < 2} aria-label="Next testimonial"><ChevronRight aria-hidden="true" /></button>
          <span aria-hidden="true">{String(activeIndex + 1).padStart(2, "0")} <span>/</span> {String(count).padStart(2, "0")}</span>
        </div>
      </div>
    </div>
  );
}

export default ScrollReelTestimonials;
