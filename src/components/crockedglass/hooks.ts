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
