"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, type ReactNode, type RefObject } from "react";
import Orka, { ORKA_LEDGE_RATIO } from "./Orka";

type SlotName = "from" | "to";
type SlotProps = { mood?: "grumpy" | "curious" | "sleepy" | "surprised"; lookAt?: RefObject<Element>; title?: string };
type Slot = { el: HTMLElement | null; props: SlotProps };
type Api = { el: (n: SlotName, el: HTMLElement | null) => void; props: (n: SlotName, p: SlotProps) => void };

const Ctx = createContext<Api | null>(null);
const clamp = (v: number) => Math.max(0, Math.min(1, v));
const smooth = (t: number) => t * t * (3 - 2 * t);

/** Marks where Orka sits in a section. The slot itself stays empty: one shared cat is drawn over it. */
export function useOrkaSlot(name: SlotName, props: SlotProps) {
  const api = useContext(Ctx);
  const { mood, lookAt, title } = props;
  useEffect(() => { api?.props(name, { mood, lookAt, title }); }, [api, name, mood, lookAt, title]);
  return useCallback((el: HTMLElement | null) => api?.el(name, el), [api, name]);
}

/** One Orka for "You can't build a business…" and "Hi! I'm Orka". He rides the crossed-fingers line while it's
 *  pinned, stays frozen on screen when the line scrolls away, and docks above "Hi! I'm Orka" once that slot
 *  reaches him, staying the same size. */
export function OrkaTravel({ children }: { children: ReactNode }) {
  const slots = useRef<Record<SlotName, Slot>>({ from: { el: null, props: {} }, to: { el: null, props: {} } });
  const box = useRef<HTMLDivElement>(null);
  const side = useRef<SlotName>("from");
  const [, rerender] = useReducer((x: number) => x + 1, 0);

  const api = useMemo<Api>(() => ({
    el: (n, el) => { slots.current[n].el = el; },
    props: (n, p) => { slots.current[n].props = p; if (side.current === n) rerender(); },
  }), []);

  useEffect(() => {
    let raf = 0;
    let last = "";
    const update = () => {
      const a = slots.current.from.el, b = slots.current.to.el, el = box.current;
      if (!a || !b || !el) return;
      const A = a.getBoundingClientRect(), B = b.getBoundingClientRect();
      // the screen y the line pins at: its sticky container's `top` plus the slot's offset inside it
      const sticky = a.closest<HTMLElement>(".cg-crossed-sticky");
      const pinY = sticky ? parseFloat(getComputedStyle(sticky).top) + (A.top - sticky.getBoundingClientRect().top) : A.top;
      const gap = B.top - A.top; // fixed distance in the document between the two slots
      const t = gap > 0 ? clamp((pinY - A.top) / gap) : 1;
      const y = Math.max(A.top, Math.min(pinY, B.top));
      const k = smooth(t);
      const x = A.left + (B.left - A.left) * k;
      const w = A.width; // same size the whole way; the landing slot is drawn at this width too
      const off = y > window.innerHeight || y + w < 0;
      const next = t < 0.5 ? "from" : "to";
      if (next !== side.current) { side.current = next; rerender(); }
      const css = `${x.toFixed(1)},${y.toFixed(1)},${w.toFixed(1)},${off}`;
      if (css === last) return;
      last = css;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      el.style.width = `${w}px`;
      el.style.visibility = off ? "hidden" : "visible";
    };
    // scroll events keep him in step with the page; the frame loop catches layout shifts (fonts, images, resizes)
    const frame = () => { update(); raf = requestAnimationFrame(frame); };
    raf = requestAnimationFrame(frame);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  const p = slots.current[side.current].props;
  return (
    <Ctx.Provider value={api}>
      {children}
      <div ref={box} style={{ position: "fixed", left: 0, top: 0, zIndex: 3, visibility: "hidden", willChange: "transform" }}>
        {/* the bar he peeks over travels with him, sized to him (342 px wide at the line's 184 px cat) */}
        {/* the surface he peeks over travels with him: a darker bar for the edge, and a soft shade falling away below it */}
        <span aria-hidden="true" style={{ position: "absolute", left: "50%", top: `${ORKA_LEDGE_RATIO * 100}%`, zIndex: -1, width: `${(342 / 184) * 100}%`, height: "70%", transform: "translateX(-50%)", background: "radial-gradient(ellipse 50% 100% at 50% 0, rgba(0,0,0,.12), rgba(0,0,0,.05) 45%, rgba(0,0,0,0) 100%)", pointerEvents: "none" }} />
        <span aria-hidden="true" style={{ position: "absolute", left: "50%", top: `${ORKA_LEDGE_RATIO * 100}%`, zIndex: -1, width: `${(342 / 184) * 100}%`, height: 6, transform: "translate(-50%, -1px)", borderRadius: "50%", background: "radial-gradient(closest-side, rgba(0,0,0,.32), rgba(0,0,0,0))", pointerEvents: "none" }} />
        <Orka mood={p.mood ?? "sleepy"} lookAt={p.lookAt} title={p.title ?? "Orka, the Cnvrted cat"} />
      </div>
    </Ctx.Provider>
  );
}
