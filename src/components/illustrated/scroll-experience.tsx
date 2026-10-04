"use client";

import { useEffect, useRef } from "react";
import "./scroll-experience.css";

const revealGroups = [
  { selector: ".design-features-heading > *", kind: "heading", stagger: 80 },
  { selector: ".design-feature-card", kind: "card", stagger: 90 },
  { selector: ".design-strategies .design-section-heading > *", kind: "heading", stagger: 70 },
  { selector: ".strategy-canvas-preview, .product-demo", kind: "canvas", stagger: 0 },
  { selector: ".design-integrations-strip .design-section-heading > *", kind: "heading", stagger: 70 },
  { selector: ".integrations-strip-animation", kind: "strip", stagger: 0 },
  { selector: ".design-customer-stories .design-section-heading > *", kind: "heading", stagger: 70 },
  { selector: ".side-story-carousel, .client-logos-animation", kind: "quiet", stagger: 0 },
  { selector: ".design-faq > h2, .design-faq-list > details", kind: "quiet", stagger: 40 },
  { selector: ".design-footer-columns > *", kind: "quiet", stagger: 50 },
];

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const phase = (value: number, start: number, end: number) => {
  const position = clamp((value - start) / (end - start));
  return position * position * (3 - 2 * position);
};

/** Progressive enhancement for the homepage; server-rendered content stays visible. */
export function HomeScrollExperience() {
  const anchorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = anchorRef.current?.closest<HTMLElement>(".figma-site");
    if (!root) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposeMotion = () => {};

    function startMotion() {
      disposeMotion();
      if (!root || preference.matches) return;

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
            element.dataset.scrollKind = group.kind;
            element.style.setProperty(
              "--reveal-delay",
              `${(index % 2) * group.stagger}ms`,
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
      root.dataset.scrollEffects = "on";

      let frame = 0;
      let currentScroll = window.scrollY;
      let previousTime = 0;
      let lastHandoff = -1;
      let lastAmount = -1;

      function render(time: number) {
        frame = 0;
        if (!root?.isConnected || document.hidden) return;
        const scroll = window.scrollY;
        const elapsed = Math.min(64, previousTime ? time - previousTime : 16);
        previousTime = time;
        currentScroll +=
          (scroll - currentScroll) * (1 - Math.exp(-elapsed / 85));
        const correction = scroll - currentScroll;
        const viewport = window.innerHeight;
        const amount = window.innerWidth <= 720 ? 0.35 : 1;

        // Only the opening scene scrubs continuously. Later chapters reveal once
        // and settle, so reading and interacting never competes with parallax.
        const openingTop = opening?.getBoundingClientRect().top ?? 0;
        const heroHeight = heroPin?.offsetHeight ?? viewport;
        const handoff = clamp(
          -(openingTop + correction) / Math.max(1, heroHeight),
        );
        const recession = phase(handoff, 0, 0.82);
        const headingEntrance = phase(handoff, 0.06, 0.4);
        const flowEntrance = phase(handoff, 0.3, 0.94);
        const openingChanged = handoff !== lastHandoff || amount !== lastAmount;

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
          // Keep small diagram labels readable throughout the scroll transition.
          opening.style.setProperty("--story-flow-opacity", "1");
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

      // In-page links should land on readable content, including when a reveal
      // was still waiting below the fold before navigation.
      function revealAnchor() {
        if (!window.location.hash) return;
        let target: HTMLElement | null;
        try {
          target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
        } catch {
          return;
        }
        if (!target || !root?.contains(target)) return;
        for (const element of reveals) {
          if (element === target || element.contains(target)) {
            element.dataset.scrollReveal = "visible";
            observer.unobserve(element);
          }
        }
      }

      const resizeObserver = new ResizeObserver(schedule);
      resizeObserver.observe(root);
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule, { passive: true });
      document.addEventListener("visibilitychange", schedule);
      root.addEventListener("focusin", revealFocus);
      window.addEventListener("hashchange", revealAnchor);
      revealAnchor();
      schedule();

      disposeMotion = () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        resizeObserver.disconnect();
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        document.removeEventListener("visibilitychange", schedule);
        root.removeEventListener("focusin", revealFocus);
        window.removeEventListener("hashchange", revealAnchor);
        delete root.dataset.scrollEffects;
        opening?.removeAttribute("style");
        if (heroPin) heroPin.inert = false;
        for (const element of reveals) {
          delete element.dataset.scrollReveal;
          delete element.dataset.scrollKind;
          element.style.removeProperty("--reveal-delay");
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

  return <span ref={anchorRef} hidden aria-hidden="true" />;
}
