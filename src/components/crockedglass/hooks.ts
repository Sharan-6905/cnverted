"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** setTimeout that is cleared when the component unmounts. */
export function useLater() {
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>());
  useEffect(() => {
    const set = timers.current;
    return () => { set.forEach(clearTimeout); set.clear(); };
  }, []);
  return useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(() => { timers.current.delete(id); fn(); }, ms);
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
