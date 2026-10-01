"use client";

import { useEffect, type ReactNode } from "react";
import { useAnimate, type AnimationPlaybackControls, type AnimationSequence } from "framer-motion";
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
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const iconCount = icons.length;

  useEffect(() => {
    const root = scope.current;
    if (!root || !iconCount) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let controls: AnimationPlaybackControls | undefined;
    let inView = false;
    let hovered = false;
    let focused = false;

    const syncPlayback = () => {
      const running = inView && !document.hidden && !hovered && !focused && !reducedMotion.matches;
      root.dataset.motion = running ? "running" : "paused";
      if (running) controls?.play();
      else controls?.pause();
    };

    const buildSequence = () => {
      controls?.stop();
      controls = undefined;
      if (!reducedMotion.matches) {
        const step = 0.46;
        const sequence: AnimationSequence = Array.from({ length: iconCount }, (_, index) => [
          `[data-animated-icon="${index}"]`,
          { y: [0, -9, 0], scale: [1, 1.055, 1] },
          { at: index * step, duration: 0.92, ease: "easeInOut" },
        ]);
        sequence.push(
          ["[data-signal-sweep]", { x: ["0%", "12%", "88%", "100%"], opacity: [0, 0.75, 0.75, 0] },
            { at: 0.2, duration: iconCount * step, ease: "linear", times: [0, 0.12, 0.88, 1] }],
          // A quiet beat makes the loop settle before the next signal passes.
          ["[data-signal-sweep]", { opacity: 0 }, { at: iconCount * step + 1.2, duration: 0 }],
        );
        controls = animate(sequence, { repeat: Infinity });
      }
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

    buildSequence();
    observer.observe(root);
    document.addEventListener("visibilitychange", syncPlayback);
    reducedMotion.addEventListener("change", buildSequence);
    root.addEventListener("pointerenter", enter);
    root.addEventListener("pointerleave", leave);
    root.addEventListener("focusin", focus);
    root.addEventListener("focusout", blur);
    return () => {
      controls?.stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      reducedMotion.removeEventListener("change", buildSequence);
      root.removeEventListener("pointerenter", enter);
      root.removeEventListener("pointerleave", leave);
      root.removeEventListener("focusin", focus);
      root.removeEventListener("focusout", blur);
    };
  }, [animate, autoScroll, iconCount, scope]);

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
