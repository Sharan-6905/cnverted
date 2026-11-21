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
 *  reaches him, staying the same size.
 *
 *  The browser does the moving: he is `position: sticky` (top = the line's pinned screen y) inside an absolute
 *  track that runs from the line slot's resting place down to the "Hi! I'm Orka" slot. So he scrolls with the
 *  line until it pins, holds at that y, and scrolls on with the second slot once it arrives, all on the
 *  compositor, in step with the page. (He used to be position: fixed and moved from JS after each scroll, which
 *  phones draw a frame late: he shook against the page.) JS only measures the track when the layout changes,
 *  slides him sideways if the two slots aren't lined up, and swaps his mood halfway. */
export function OrkaTravel({ children }: { children: ReactNode }) {
  const slots = useRef<Record<SlotName, Slot>>({ from: { el: null, props: {} }, to: { el: null, props: {} } });
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const hold = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const side = useRef<SlotName>("from");
  const [, rerender] = useReducer((x: number) => x + 1, 0);

  const api = useMemo<Api>(() => ({
    el: (n, el) => { slots.current[n].el = el; },
    props: (n, p) => { slots.current[n].props = p; if (side.current === n) rerender(); },
  }), []);

  useEffect(() => {
    let geo: { pinY: number; dx: number } | null = null;
    let lastX = "";

    // layout only: where the track starts and ends, and the y he holds at
    const measure = () => {
      const a = slots.current.from.el, b = slots.current.to.el, w = wrap.current, t = track.current, q = hold.current, el = box.current;
      if (!a || !b || !w || !t || !q || !el) return;
      const sticky = a.closest<HTMLElement>(".cg-crossed-sticky");
      const runway = sticky?.parentElement;
      if (!sticky || !runway) return;
      const A = a.getBoundingClientRect(), B = b.getBoundingClientRect(), W = w.getBoundingClientRect();
      const S = sticky.getBoundingClientRect(), R = runway.getBoundingClientRect();
      const inSticky = A.top - S.top; // the slot's offset inside the pinned block
      const pinY = parseFloat(getComputedStyle(sticky).top) + inSticky;
      // the slot's resting place: the pinned block sits at the top of its runway until it pins
      const startY = R.top + inSticky - W.top;
      // the landing slot may sit in a pinned block too (the Orka section holds at the top for a while): measure its
      // resting place the same way, and how long it holds
      const pin = b.closest<HTMLElement>(".cg-orka");
      const pinned = !!pin && getComputedStyle(pin).position === "sticky" && !!pin.parentElement;
      let endY = B.top - W.top, holdPx = 0, holdY = 0;
      if (pin && pinned) {
        const P = pin.getBoundingClientRect(), PR = pin.parentElement!.getBoundingClientRect();
        const inPin = B.top - P.top;
        endY = PR.top + inPin - W.top;
        holdPx = Math.max(0, PR.height - P.height);
        holdY = parseFloat(getComputedStyle(pin).top) + inPin; // where the slot sits on screen while pinned
      }
      // Two stickies: the box holds at pinY inside `hold` until it reaches the bottom of `hold` (he's landed), so he
      // then rides with the slot; `hold` itself is sticky at a top that puts its bottom at holdY, so once the slot
      // pins, `hold` (and he) stay put with it for holdPx, then the track ends and they scroll away together.
      const span = Math.max(0, endY - startY) + A.height; // + his height, so his top can reach endY
      t.style.top = `${startY}px`;
      t.style.height = `${span + holdPx}px`;
      q.style.height = `${span}px`;
      q.style.top = `${holdY - span + A.height}px`;
      el.style.top = `${pinY}px`;
      el.style.width = `${A.width}px`;
      el.style.marginLeft = `${A.left - W.left}px`; // margin, not left: on a sticky box `left` is a sideways stick threshold
      t.style.visibility = "visible";
      geo = { pinY, dx: B.left - A.left };
      update();
    };

    // per scroll: no layout writes unless the slots are offset sideways; just the mood switch
    const update = () => {
      const a = slots.current.from.el, b = slots.current.to.el, el = box.current;
      if (!a || !b || !el || !geo) return;
      const A = a.getBoundingClientRect(), B = b.getBoundingClientRect();
      const gap = B.top - A.top; // how far he has to go: 0 → 1 as the line leaves and the second slot comes up
      const t = gap > 0 ? clamp((geo.pinY - A.top) / gap) : 1;
      const next = t < 0.5 ? "from" : "to";
      if (next !== side.current) { side.current = next; rerender(); }
      const x = Math.abs(geo.dx) < 0.5 ? "" : `translateX(${(geo.dx * smooth(t)).toFixed(1)}px)`;
      if (x !== lastX) { el.style.transform = x; lastX = x; }
    };

    const ro = new ResizeObserver(measure);
    let watched = false;
    const watch = () => {
      const a = slots.current.from.el, b = slots.current.to.el;
      if (watched || !a || !b) return;
      watched = true;
      ro.observe(document.body); // anything above or between the slots changing height moves them
      const sticky = a.closest(".cg-crossed-sticky");
      if (sticky) ro.observe(sticky);
      ro.observe(b);
      measure();
    };
    watch();
    const raf = requestAnimationFrame(watch); // slots register in their own effects, maybe after this one
    document.fonts?.ready.then(measure);
    window.addEventListener("scroll", update, { passive: true });
    // on a resize the line's pinned `top` is React state, committed after this event: measure again once it lands
    let r1 = 0, r2 = 0;
    const onResize = () => { measure(); cancelAnimationFrame(r1); cancelAnimationFrame(r2); r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(measure); }); };
    window.addEventListener("resize", onResize, { passive: true });
    return () => { cancelAnimationFrame(raf); cancelAnimationFrame(r1); cancelAnimationFrame(r2); ro.disconnect(); window.removeEventListener("scroll", update); window.removeEventListener("resize", onResize); };
  }, []);

  const p = slots.current[side.current].props;
  return (
    <Ctx.Provider value={api}>
      <div ref={wrap} style={{ position: "relative" }}>
        {children}
        <div ref={track} style={{ position: "absolute", left: 0, right: 0, top: 0, height: 0, zIndex: 3, pointerEvents: "none", visibility: "hidden" }}>
          <div ref={hold} style={{ position: "sticky", top: 0 }}>
          <div ref={box} style={{ position: "sticky", top: 0, pointerEvents: "auto" }}>
            {/* the surface he peeks over travels with him: a darker bar for the edge, and a soft shade falling away below it */}
            <span aria-hidden="true" style={{ position: "absolute", left: "50%", top: `${ORKA_LEDGE_RATIO * 100}%`, zIndex: -1, width: `${(342 / 184) * 100}%`, height: "70%", transform: "translateX(-50%)", background: "radial-gradient(ellipse 50% 100% at 50% 0, rgba(0,0,0,.12), rgba(0,0,0,.05) 45%, rgba(0,0,0,0) 100%)", pointerEvents: "none" }} />
            <span aria-hidden="true" style={{ position: "absolute", left: "50%", top: `${ORKA_LEDGE_RATIO * 100}%`, zIndex: -1, width: `${(342 / 184) * 100}%`, height: 6, transform: "translate(-50%, -1px)", borderRadius: "50%", background: "radial-gradient(closest-side, rgba(0,0,0,.32), rgba(0,0,0,0))", pointerEvents: "none" }} />
            <Orka mood={p.mood ?? "sleepy"} lookAt={p.lookAt} title={p.title ?? "Orka, the Cnvrted cat"} />
          </div>
          </div>
        </div>
      </div>
    </Ctx.Provider>
  );
}
