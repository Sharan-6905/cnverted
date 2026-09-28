"use client";

import { useEffect, useRef } from "react";
import { createFeatureHandoff } from "./feature-handoff";
import "./scroll-experience.css";

const revealGroups = [
  { selector: ".design-strategies .design-section-heading > *", stagger: 90 },
  { selector: ".design-integrations > div:first-child > *", stagger: 90 },
  { selector: ".design-faq > h2, .design-faq-list > details", stagger: 55 },
  { selector: ".design-footer-columns > *", stagger: 90 },
];

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const phase = (value: number, start: number, end: number) => {
  const position = clamp((value - start) / (end - start));
  return position * position * (3 - 2 * position);
};

/** Progressive enhancement for the homepage; server-rendered content stays visible. */
export function HomeScrollExperience() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const progress = progressRef.current;
    const root = progress?.closest<HTMLElement>(".figma-site");
    if (!root || !progress) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposeMotion = () => {};

    function startMotion() {
      disposeMotion();
      if (!root || !progress || preference.matches) return;

      const reveals: HTMLElement[] = [];
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            (entry.target as HTMLElement).dataset.scrollReveal = "visible";
            observer.unobserve(entry.target);
          }
        },
        { rootMargin: "0px 0px -7% 0px", threshold: 0 },
      );

      for (const group of revealGroups) {
        root
          .querySelectorAll<HTMLElement>(group.selector)
          .forEach((element, index) => {
            reveals.push(element);
            element.style.setProperty(
              "--reveal-delay",
              `${(index % 3) * group.stagger}ms`,
            );
            // Do not flash or hide content already visible on refresh / anchor navigation.
            element.dataset.scrollReveal =
              element.getBoundingClientRect().top < window.innerHeight
                ? "visible"
                : "pending";
            if (element.dataset.scrollReveal === "pending")
              observer.observe(element);
          });
      }

      const opening = root.querySelector<HTMLElement>(".design-opening-story");
      const heroPin = root.querySelector<HTMLElement>(".design-hero-pin");
      let featureHandoff = createFeatureHandoff(root);
      const strategy = root.querySelector<HTMLElement>(
        ".design-strategy-board",
      );
      const integration = root.querySelector<HTMLElement>(
        ".design-integrations > .illustration",
      );
      const footer = root.querySelector<HTMLElement>(".design-footer-art");
      const depthElements = [strategy, integration, footer].filter(
        (element): element is HTMLElement => element !== null,
      );
      root.dataset.scrollEffects = "on";

      let frame = 0;
      let currentScroll = window.scrollY;
      let previousTime = 0;
      let lastHandoff = -1;
      let lastAmount = -1;

      function render(time: number) {
        frame = 0;
        if (!root?.isConnected || !progress || document.hidden) return;
        const scroll = window.scrollY;
        const elapsed = Math.min(64, previousTime ? time - previousTime : 16);
        previousTime = time;
        currentScroll +=
          (scroll - currentScroll) * (1 - Math.exp(-elapsed / 85));
        const correction = scroll - currentScroll;
        const viewport = window.innerHeight;
        const amount = window.innerWidth <= 720 ? 0.35 : 1;

        // Read all layout before updating styles. Track the untransformed section,
        // never its moving artwork, so motion cannot feed back into its own position.
        const positions = depthElements.flatMap((element) => {
          const anchor = element.closest("section, footer");
          // A refresh or route transition can detach artwork before effect cleanup.
          return anchor && element.isConnected
            ? [{ element, rect: anchor.getBoundingClientRect() }]
            : [];
        });
        const openingTop = opening?.getBoundingClientRect().top ?? 0;
        const heroHeight = heroPin?.offsetHeight ?? viewport;
        const maxScroll = document.documentElement.scrollHeight - viewport;
        const handoff = clamp(
          -(openingTop + correction) / Math.max(1, heroHeight),
        );
        const recession = phase(handoff, 0, 0.82);
        const headingEntrance = phase(handoff, 0.06, 0.4);
        const flowEntrance = phase(handoff, 0.3, 0.94);
        const openingChanged = handoff !== lastHandoff || amount !== lastAmount;
        // A streamed section may arrive after this small client component mounts.
        featureHandoff ??= createFeatureHandoff(root);
        const featureFrame = featureHandoff?.measure(
          correction,
          viewport,
          window.innerWidth,
        );
        progress.style.transform = `scaleX(${clamp(scroll / Math.max(1, maxScroll))})`;

        if (opening && heroPin && openingChanged) {
          lastHandoff = handoff;
          lastAmount = amount;
          // The entire opening scene scrubs in both directions. Its stable outer
          // wrapper supplies progress, while the hero itself remains sticky.
          opening.style.setProperty(
            "--story-inset",
            `${recession * (amount === 1 ? 3 : 2)}%`,
          );
          opening.style.setProperty("--story-radius", `${recession * 44}px`);
          opening.style.setProperty(
            "--story-copy-y",
            `${recession * -100 * Math.max(0.6, amount)}px`,
          );
          opening.style.setProperty(
            "--story-copy-opacity",
            `${1 - phase(handoff, 0.1, 0.8)}`,
          );
          opening.style.setProperty("--story-image-y", `${recession * -32}px`);
          opening.style.setProperty(
            "--story-image-scale",
            `${1.015 + recession * 0.045}`,
          );
          opening.style.setProperty(
            "--story-cue-opacity",
            `${1 - phase(handoff, 0, 0.2)}`,
          );
          opening.style.setProperty(
            "--story-sheet-radius",
            `${(1 - phase(handoff, 0.52, 0.98)) * (amount === 1 ? 64 : 32)}px`,
          );
          opening.style.setProperty(
            "--story-heading-opacity",
            `${headingEntrance}`,
          );
          opening.style.setProperty(
            "--story-flow-opacity",
            `${0.65 + flowEntrance * 0.35}`,
          );
          opening.style.setProperty(
            "--story-flow-y",
            `${(1 - flowEntrance) * 55 * Math.max(0.5, amount)}px`,
          );
          opening.style.setProperty(
            "--story-flow-scale",
            `${0.965 + flowEntrance * 0.035}`,
          );
          // Hidden hero controls should not intercept pointer or keyboard input.
          heroPin.inert = handoff >= 0.6;
        }

        for (const { element, rect } of positions) {
          const top = rect.top + correction;
          const passage = clamp((viewport - top) / (viewport + rect.height));
          const travel =
            element === integration ? 90 : element === footer ? 48 : 60;
          element.style.setProperty(
            "--scroll-depth",
            `${(0.5 - passage) * travel * amount}px`,
          );
          if (element === strategy) {
            const entrance = clamp(passage * 2.2);
            element.style.setProperty(
              "--scroll-scale",
              `${1 - (1 - entrance) * 0.045 * amount}`,
            );
            element.style.setProperty(
              "--scroll-tilt",
              `${(1 - entrance) * 5 * amount}deg`,
            );
          }
        }

        featureHandoff?.apply(featureFrame ?? null);

        if (Math.abs(scroll - currentScroll) > 0.1)
          frame = requestAnimationFrame(render);
        else previousTime = 0;
      }

      function schedule() {
        if (!frame && !document.hidden) frame = requestAnimationFrame(render);
      }

      // Keyboard navigation must reveal a focused control immediately.
      function revealFocus(event: FocusEvent) {
        const target = event.target;
        if (!(target instanceof Element)) return;
        const panel = target.closest<HTMLElement>(
          '[data-scroll-reveal="pending"]',
        );
        if (panel) {
          panel.dataset.scrollReveal = "visible";
          observer.unobserve(panel);
        }
      }

      const resizeObserver = new ResizeObserver(schedule);
      resizeObserver.observe(root);
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule, { passive: true });
      document.addEventListener("visibilitychange", schedule);
      root.addEventListener("focusin", revealFocus);
      schedule();

      disposeMotion = () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        resizeObserver.disconnect();
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        document.removeEventListener("visibilitychange", schedule);
        root.removeEventListener("focusin", revealFocus);
        delete root.dataset.scrollEffects;
        opening?.removeAttribute("style");
        if (heroPin) heroPin.inert = false;
        featureHandoff?.dispose();
        for (const element of reveals) {
          delete element.dataset.scrollReveal;
          delete element.dataset.scrollKind;
          element.style.removeProperty("--reveal-delay");
        }
        for (const element of depthElements) {
          for (const property of [
            "--scroll-depth",
            "--scroll-scale",
            "--scroll-tilt",
          ]) {
            element.style.removeProperty(property);
          }
        }
      };
    }

    startMotion();
    preference.addEventListener("change", startMotion);
    return () => {
      preference.removeEventListener("change", startMotion);
      disposeMotion();
    };
  }, []);

  return (
    <div
      ref={progressRef}
      className="design-scroll-progress"
      aria-hidden="true"
    />
  );
}
