"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

/**
 * setTimeout that is cleared when the component unmounts.
 *
 * Pass the element the timers animate and they also wait for it to be on screen: a timer that comes due while
 * it is off screen is held and runs when it scrolls back into view. The card demos' scripted loops are chains
 * of these, so a loop freezes on its current frame instead of re-rendering for the whole visit, and carries on
 * from there; on screen nothing changes.
 */
export function useLater(watch?: RefObject<Element | null>) {
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>());
  const held = useRef<(() => void)[]>([]);
  const onScreen = useRef(true);
  useEffect(() => {
    const set = timers.current;
    const el = watch?.current;
    let io: IntersectionObserver | undefined;
    if (el && typeof IntersectionObserver === "function") {
      io = new IntersectionObserver((es) => {
        onScreen.current = es[es.length - 1].isIntersecting;
        if (!onScreen.current || !held.current.length) return;
        const due = held.current;
        held.current = [];
        due.forEach((fn) => fn());
      }, { rootMargin: "200px 0px" });
      io.observe(el);
    }
    return () => { io?.disconnect(); set.forEach(clearTimeout); set.clear(); held.current = []; };
  }, [watch]);
  return useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(() => {
      timers.current.delete(id);
      if (onScreen.current) fn(); else held.current.push(fn);
    }, ms);
    timers.current.add(id);
  }, []);
}

/** Merge-style state, like the design's setState({ ...patch }). */
export function usePatch<T extends object>(initial: T) {
  const [state, setState] = useState(initial);
  const ref = useRef(state);
  ref.current = state;
  const patch = useCallback((p: Partial<T>) => setState((s) => ({ ...s, ...p })), []);
  return [state, patch, ref] as const;
}

/**
 * The viewport height with the browser's address bar showing (CSS `100svh`). On phones `innerHeight` changes as
 * the address bar slides in and out while you scroll (it fires `resize` each time), so anything pinned at
 * `(innerHeight - h) / 2` jumps up and down mid-scroll. This stays put until the screen really changes size.
 */
let svhProbe: HTMLDivElement | null = null;
export function stableViewportHeight() {
  if (typeof document === "undefined") return 0;
  if (!svhProbe) {
    svhProbe = document.createElement("div");
    svhProbe.setAttribute("aria-hidden", "true");
    svhProbe.style.cssText = "position:absolute;left:0;top:0;width:0;height:100svh;visibility:hidden;pointer-events:none";
    document.body.appendChild(svhProbe);
  }
  return svhProbe.offsetHeight || window.innerHeight;
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

/** Follows `target` with an exponential ease each frame, so scroll-driven progress glides instead of stepping
 *  with each wheel notch. Snaps straight there with reduced motion. */
export function useEased(target: number, rate = 0.12) {
  const [v, setV] = useState(target);
  const cur = useRef(target);
  useEffect(() => {
    if (prefersReducedMotion()) { cur.current = target; setV(target); return; }
    let raf = 0, last = 0;
    const tick = (now: number) => {
      const dt = last ? Math.min(64, now - last) : 16; last = now;
      cur.current += (target - cur.current) * (1 - Math.pow(1 - rate, dt / 16.7));
      if (Math.abs(target - cur.current) < 0.0008) cur.current = target;
      setV(cur.current);
      if (cur.current !== target) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, rate]);
  return v;
}
