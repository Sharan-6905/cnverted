"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Finish hash navigation after deferred sections settle; never fight user scrolling. */
export function SectionAnchor() {
  const pathname = usePathname();
  useEffect(() => {
    let stop = () => {};
    function navigate() {
      stop();
      let id: string;
      try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      if (!id) return;
      const target = document.getElementById(id);
      const main = document.getElementById("main-content");
      if (!target || !main) return;
      let timer: ReturnType<typeof setTimeout>;
      let stopped = false;
      const align = () => {
        if (stopped) return;
        const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 120;
        window.scrollTo({ top: Math.max(0, window.scrollY + target.getBoundingClientRect().top - margin), behavior: "instant" });
      };
      const schedule = () => { clearTimeout(timer); timer = setTimeout(align, 100); };
      const observer = new ResizeObserver(schedule);
      observer.observe(main);
      const finish = setTimeout(() => stop(), 3500);
      const abort = () => stop();
      const inputs = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
      stop = () => {
        stopped = true;
        clearTimeout(timer); clearTimeout(finish); observer.disconnect();
        inputs.forEach(event => window.removeEventListener(event, abort));
      };
      inputs.forEach(event => window.addEventListener(event, abort, { passive: true, once: true }));
      schedule();
      void document.fonts.ready.then(() => { if (!stopped) schedule(); });
    }
    navigate();
    window.addEventListener("hashchange", navigate);
    return () => { stop(); window.removeEventListener("hashchange", navigate); };
  }, [pathname]);
  return null;
}
