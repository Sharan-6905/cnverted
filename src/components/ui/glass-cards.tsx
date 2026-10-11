"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import "./glass-cards.css";

export interface StackedCardItem {
  id: string;
  content: ReactNode;
}

/** Scroll stacking adapted from the supplied GSAP component; content stays in the DOM. */
export function StackedCards({ cards, className }: { cards: readonly StackedCardItem[]; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
        if (disposed) return;
        gsap.registerPlugin(ScrollTrigger);
        const surfaces = Array.from(element.querySelectorAll<HTMLElement>("[data-stack-surface]"));
        const markers = Array.from(element.querySelectorAll<HTMLElement>("[data-stack-marker]"));
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
        let context: ReturnType<typeof gsap.context> | undefined;
        let frame = 0;
        let dimensions = "";
        const update = () => {
          const styles = getComputedStyle(element);
          const top = parseFloat(styles.getPropertyValue("--stack-top"));
          const step = parseFloat(styles.getPropertyValue("--stack-step"));
          const height = Math.max(...surfaces.map(surface => surface.offsetHeight));
          const key = `${element.clientWidth}:${height}:${window.innerHeight}:${top}:${step}:${reducedMotion.matches}`;
          if (key === dimensions) return;
          dimensions = key;
          context?.revert();
          // Tall cards scroll into view completely before they stick, even on short screens.
          const pinTop = Math.min(top, window.innerHeight - height - step * (cards.length - 1) - 20);
          element.style.setProperty("--stack-pin-top", `${pinTop}px`);
          const enabled = !reducedMotion.matches && window.innerWidth >= 1024;
          element.dataset.stacked = String(enabled);
          if (!enabled) return;
          context = gsap.context(() => {
            surfaces.slice(0, -1).forEach((surface, index) => {
              gsap.to(surface, {
                scale: 1 - (cards.length - 1 - index) * 0.05,
                transformOrigin: "center top",
                ease: "none",
                scrollTrigger: {
                  trigger: markers[index + 1],
                  start: "top bottom",
                  end: () => `top ${pinTop + step * (index + 1)}`,
                  scrub: 1,
                  invalidateOnRefresh: true,
                },
              });
            });
          }, element);
          ScrollTrigger.refresh();
        };
        const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
        const resize = new ResizeObserver(schedule);
        resize.observe(element);
        surfaces.forEach(surface => resize.observe(surface));
        window.addEventListener("resize", schedule);
        reducedMotion.addEventListener("change", schedule);
        update();
        cleanup = () => {
          cancelAnimationFrame(frame);
          resize.disconnect();
          window.removeEventListener("resize", schedule);
          reducedMotion.removeEventListener("change", schedule);
          context?.revert();
          delete element.dataset.stacked;
          element.style.removeProperty("--stack-pin-top");
        };
      }).catch(() => {
        // The readable, non-stacking layout also works if the animation fails to load.
        if (!disposed) element.dataset.stacked = "false";
      });
    }, { rootMargin: "800px" });
    observer.observe(element);
    return () => { disposed = true; observer.disconnect(); cleanup?.(); };
  }, [cards]);

  return <div ref={root} className={cn("stacked-cards", className)}>
    {cards.map((card, index) => <div key={card.id} className="stacked-card-entry" style={{ "--stack-index": index } as CSSProperties}>
      <div id={`feature-title-${card.id}`} data-stack-marker aria-hidden="true" />
      <div className="stacked-card-slot">
        <div data-stack-surface>{card.content}</div>
      </div>
    </div>)}
  </div>;
}
