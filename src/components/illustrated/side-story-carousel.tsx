"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { CaseStudySummary } from "@/lib/case-studies";
import { CaseStudyResults } from "./case-study-results";
import { formatPostDate } from "@/lib/blog-posts";

export function SideStoryCarousel({ stories }: { stories: readonly CaseStudySummary[] }) {
  const [{ active, cycle }, setSlide] = useState({ active: 0, cycle: 0 });
  const [canPlay, setCanPlay] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || stories.length < 2) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    let hovered = false;
    let focused = false;
    const sync = () => setCanPlay(inView && !document.hidden && !reducedMotion.matches && !hovered && !focused);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting && entry.intersectionRatio >= 0.5;
      sync();
    }, { threshold: 0.5 });
    const enter = (event: PointerEvent) => { hovered = event.pointerType === "mouse"; sync(); };
    const leave = () => { hovered = false; sync(); };
    const focus = () => { focused = true; sync(); };
    const blur = (event: FocusEvent) => { focused = root.contains(event.relatedTarget as Node | null); sync(); };
    observer.observe(root);
    document.addEventListener("visibilitychange", sync);
    reducedMotion.addEventListener("change", sync);
    root.addEventListener("pointerenter", enter);
    root.addEventListener("pointerleave", leave);
    root.addEventListener("focusin", focus);
    root.addEventListener("focusout", blur);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reducedMotion.removeEventListener("change", sync);
      root.removeEventListener("pointerenter", enter);
      root.removeEventListener("pointerleave", leave);
      root.removeEventListener("focusin", focus);
      root.removeEventListener("focusout", blur);
    };
  }, [stories.length]);

  function select(index: number) {
    setSlide((current) => ({ active: index, cycle: current.cycle + 1 }));
  }

  function move(direction: number) {
    setSlide((current) => ({
      active: Math.max(0, Math.min(stories.length - 1, current.active + direction)),
      cycle: current.cycle + 1,
    }));
  }

  return (
    <div
      ref={rootRef}
      className="side-story-carousel"
      data-autoplay={canPlay ? "running" : "paused"}
      role="region"
      aria-roledescription="carousel"
      aria-label="Cnvrted case studies"
      onKeyDown={(event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          move(event.key === "ArrowRight" ? 1 : -1);
        }
      }}
    >
      <div
        className="side-story-viewport"
        onTouchStart={(event) => {
          const touch = event.touches[0];
          touchStart.current = event.touches.length === 1 ? { x: touch.clientX, y: touch.clientY } : null;
        }}
        onTouchCancel={() => { touchStart.current = null; }}
        onTouchEnd={(event) => {
          const start = touchStart.current;
          touchStart.current = null;
          if (!start) return;
          const touch = event.changedTouches[0];
          const dx = touch.clientX - start.x;
          const dy = touch.clientY - start.y;
          if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx < 0 ? 1 : -1);
        }}
      >
        <div className="side-story-track" style={{ transform: `translateX(-${active * 100}%)` }}>
          {stories.map((story, index) => (
            <div
              className="side-story-slide"
              key={story.slug}
              id={`side-story-slide-${index}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${stories.length}`}
              aria-hidden={index !== active}
              inert={index !== active}
            >
              <Link className="side-story-card" href={`/case-studies/${story.slug}`} aria-labelledby={`side-story-card-title-${index}`}>
                <div className="side-story-image">
                  <img src={story.cover.src} alt={story.cover.alt} width={1774} height={887} loading="lazy" decoding="async" />
                </div>
                <div className="side-story-copy">
                  <h3 id={`side-story-card-title-${index}`}>{story.title}</h3>
                  <p className="side-story-excerpt">{story.excerpt}</p>
                  {story.results && <CaseStudyResults results={story.results} compact />}
                  <div className="side-story-meta">
                    <time dateTime={story.date}>{formatPostDate(story.date)}</time>
                    <span><img src="/figma/side-story/reading-time.svg" width={12} height={12} alt="" />{story.readTime} min</span>
                    <span className="side-story-read">Read <img src="/figma/side-story/read-arrow.svg" width={14} height={14} alt="" /></span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="side-story-pagination" aria-label="Choose a story">
        {stories.map((story, index) => (
          <button key={story.slug} type="button" aria-label={`Show story ${index + 1}: ${story.title}`}
            aria-current={index === active ? "true" : undefined} aria-controls={`side-story-slide-${index}`}
            onClick={() => select(index)}>
            <span className="side-story-progress-track">
              {index === active ? <span key={cycle} className="side-story-progress-fill" onAnimationEnd={(event) => {
                // The visible progress animation is also the five-second clock.
                if (event.animationName === "side-story-progress") select((active + 1) % stories.length);
              }} /> : null}
            </span>
          </button>
        ))}
      </div>
      <div className="side-story-arrows" data-last={active === stories.length - 1}>
        <img src="/figma/side-story/carousel-arrows.svg" width={147} height={14.7279} alt="" />
        <button type="button" aria-label="Previous story" disabled={active === 0} onClick={() => move(-1)} />
        <button type="button" aria-label="Next story" disabled={active === stories.length - 1} onClick={() => move(1)} />
      </div>
      <p className="sr-only" aria-live={canPlay ? "off" : "polite"} aria-atomic="true">Story {active + 1} of {stories.length}: {stories[active].title}</p>
    </div>
  );
}
