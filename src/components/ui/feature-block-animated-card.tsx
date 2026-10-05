"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./feature-block-animated-card.module.css";

export interface AnimatedCardProps {
  className?: string;
  title?: ReactNode;
  description?: ReactNode;
  variant?: "card" | "strip";
  autoScroll?: boolean;
  scrollDirection?: "left" | "right";
  ariaLabel?: string;
  icons?: Array<{
    icon: ReactNode;
    label?: string;
    size?: "sm" | "md" | "lg";
    className?: string;
  }>;
}

// Fixed positions keep server and client markup identical.
const particles = [
  [12, 18], [42, 28], [23, 41], [61, 54],
  [8, 65], [48, 77], [71, 33], [30, 87],
];

export function AnimatedCard({
  className, title, description, variant = "card", autoScroll = false, scrollDirection = "left", icons = [],
  ariaLabel = "Connected tools. Scroll horizontally to explore.",
}: AnimatedCardProps) {
  const scope = useRef<HTMLDivElement>(null);
  const iconCount = icons.length;

  useEffect(() => {
    const root = scope.current;
    if (!root || !iconCount) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let controls: Animation[] = [];
    let inView = false;
    let hovered = false;
    let focused = false;

    const syncPlayback = () => {
      const running = inView && !document.hidden && !hovered && !focused && !reducedMotion.matches;
      root.dataset.motion = running ? "running" : "paused";
      if (running && !controls.length) buildSequence();
      controls.forEach((animation) => running ? animation.play() : animation.pause());
    };

    const buildSequence = () => {
      // Native transform animations preserve the sequence without shipping the
      // canvas animation library to visitors who only see the first screen.
      const step = 460;
      const duration = iconCount * step + 1200;
      root.querySelectorAll<HTMLElement>("[data-animated-icon]").forEach((icon) => {
        const index = Number(icon.dataset.animatedIcon);
        const animation = icon.animate([
          { transform: "translateY(0) scale(1)", offset: 0 },
          { transform: "translateY(-9px) scale(1.055)", offset: step / duration },
          { transform: "translateY(0) scale(1)", offset: step * 2 / duration },
          { transform: "translateY(0) scale(1)", offset: 1 },
        ], { duration, delay: index * step, iterations: Infinity, easing: "ease-in-out" });
        animation.pause();
        controls.push(animation);
      });
      const travel = iconCount * step / duration;
      root.querySelectorAll<HTMLElement>("[data-signal-sweep]").forEach((sweep) => {
        const animation = sweep.animate([
          { transform: "translateX(0%)", opacity: 0, offset: 0 },
          { transform: "translateX(12%)", opacity: 0.75, offset: travel * 0.12 },
          { transform: "translateX(88%)", opacity: 0.75, offset: travel * 0.88 },
          { transform: "translateX(100%)", opacity: 0, offset: travel },
          { transform: "translateX(100%)", opacity: 0, offset: 1 },
        ], { duration, delay: 200, iterations: Infinity, easing: "linear" });
        animation.pause();
        controls.push(animation);
      });
    };
    const preferenceChanged = () => {
      controls.forEach((animation) => animation.cancel());
      controls = [];
      syncPlayback();
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncPlayback();
    }, { threshold: 0.1 });
    const enter = (event: PointerEvent) => { hovered = !autoScroll && event.pointerType === "mouse"; syncPlayback(); };
    const leave = () => { hovered = false; syncPlayback(); };
    const focus = () => { focused = !autoScroll; syncPlayback(); };
    const blur = (event: FocusEvent) => {
      focused = !autoScroll && root.contains(event.relatedTarget as Node | null);
      syncPlayback();
    };

    observer.observe(root);
    document.addEventListener("visibilitychange", syncPlayback);
    reducedMotion.addEventListener("change", preferenceChanged);
    root.addEventListener("pointerenter", enter);
    root.addEventListener("pointerleave", leave);
    root.addEventListener("focusin", focus);
    root.addEventListener("focusout", blur);
    return () => {
      controls.forEach((animation) => animation.cancel());
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      reducedMotion.removeEventListener("change", preferenceChanged);
      root.removeEventListener("pointerenter", enter);
      root.removeEventListener("pointerleave", leave);
      root.removeEventListener("focusin", focus);
      root.removeEventListener("focusout", blur);
    };
  }, [autoScroll, iconCount]);

  return (
    <div ref={scope} className={cn(styles.root, variant === "card" && styles.card, autoScroll && styles.marquee, className)} data-motion="paused" data-scroll-direction={scrollDirection}>
      <div className={cn(styles.viewport, "animated-card-viewport")} tabIndex={0} role="region" aria-label={ariaLabel}>
        <div className={cn(autoScroll && styles.conveyor)} data-integration-conveyor={autoScroll || undefined}>
        {(autoScroll && iconCount ? [0, 1, 2] : [0]).map((copy) => (
        <div key={copy} className={cn(styles.track, "animated-card-track")} aria-hidden={copy > 0 ? true : undefined} inert={copy > 0 ? true : undefined}>
          {icons.map(({ icon, label, size = "lg", className: iconClassName }, index) => (
            <div key={`${label ?? "icon"}-${index}`} data-animated-icon={index}
              className={cn(styles.icon, styles[size], iconClassName)} title={label}>
              {icon}
            </div>
          ))}
          {iconCount > 0 ? (
            <div className={styles.sweepWindow} aria-hidden="true">
              <div className={styles.sweep} data-signal-sweep>
                <span className={styles.beam} />
                <span className={styles.sparkles}>
                  {particles.map(([left, top], index) => (
                    <span key={index} style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${index * -0.31}s` }} />
                  ))}
                </span>
              </div>
            </div>
          ) : null}
        </div>
        ))}
        </div>
      </div>
      {title ? <h3 className={styles.title}>{title}</h3> : null}
      {description ? <p className={styles.description}>{description}</p> : null}
    </div>
  );
}
