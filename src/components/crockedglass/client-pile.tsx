"use client";

import { useEffect, useRef } from "react";
import { Bodies, Body, Composite, Constraint, Engine, type Body as MBody } from "matter-js";

export type PileClient = { n: string; src: string; h: number; r?: number };

type CardBody = MBody & { cardW: number; cardH: number };

/**
 * "Cnvrted Collaboration": client logos as physical cards that drop into a tray when it scrolls into view and pile
 * up at their own sizes. With a mouse you can grab one and throw it around. Built on Matter.js, but the cards are
 * plain DOM (so hover, alt text and links work); each frame copies a body's position/angle onto its card.
 *
 * Dragging is our own pointer code (a Constraint from the pointer to the grabbed body), not Matter's Mouse: that one
 * calls preventDefault on wheel and touchmove over the whole tray, which would trap page scrolling. Touch screens
 * get the drop but no dragging, so a swipe over the tray still scrolls. Reduced motion: the pile is settled in one
 * go and shown at rest.
 */
export function ClientPile({ clients, cta }: { clients: PileClient[]; cta: { label: string; href: string } }) {
  const tray = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tray.current;
    if (!el) return;
    // card widths come from the logos, so measure only once every image has its real size
    let dispose: (() => void) | null = null, cancelled = false;
    const imgs = [...el.querySelectorAll("img")];
    Promise.all(imgs.map((im) => (im.complete ? null : im.decode().catch(() => null)))).then(() => {
      if (!cancelled) dispose = startPile(el);
    });
    return () => { cancelled = true; dispose?.(); };
  }, []);

  return (
    <div ref={tray} className="cg-pile">
      {clients.map((c, i) => (
        <div key={i} className="cg-pile-card" title={c.n || undefined}>
          <img src={c.src} alt={c.n ? `${c.n} logo` : "Client logo"} style={{ height: c.h, borderRadius: c.r }} draggable={false} />
          {c.n && <span>{c.n}</span>}
        </div>
      ))}
      <a className="cg-pile-card cg-pile-cta" href={cta.href} draggable={false}>{cta.label}</a>
      <span className="cg-pile-hint" aria-hidden="true">Grab one</span>
    </div>
  );
}

const STEP = 1000 / 60;

function startPile(el: HTMLDivElement): () => void {
  const cards = [...el.querySelectorAll<HTMLElement>(".cg-pile-card")];
  const reduce = !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const fine = !!window.matchMedia?.("(pointer: fine)").matches;

  el.classList.add("is-live"); // cards switch from the no-JS wrapped row to absolutely placed bodies
  const engine = Engine.create({ enableSleeping: true });
  engine.gravity.y = 1.1;
  const T = 400; // wall thickness, so a hard throw can't tunnel through
  let W = el.clientWidth, H = el.clientHeight;
  const floor = Bodies.rectangle(W / 2, H + T / 2, W + 2 * T, T, { isStatic: true });
  const left = Bodies.rectangle(-T / 2, -H / 2, T, H * 4, { isStatic: true });
  const right = Bodies.rectangle(W + T / 2, -H / 2, T, H * 4, { isStatic: true });
  Composite.add(engine.world, [floor, left, right]);

  // one body per card at the card's own measured size, waiting above the tray in a shuffled, staggered column
  const order = cards.map((_, i) => i).sort(() => Math.random() - 0.5);
  const bodies = cards.map((card, i) => {
    const w = card.offsetWidth, h = card.offsetHeight;
    const slot = order[i] / Math.max(1, cards.length - 1);
    const x = Math.min(W - w / 2 - 8, Math.max(w / 2 + 8, W * (0.12 + 0.76 * slot)));
    const b = Bodies.rectangle(x, -h - order[i] * 110, w, h, {
      chamfer: { radius: Math.min(16, h / 2) }, restitution: 0.25, friction: 0.6, frictionAir: 0.012, density: 0.002,
      angle: (Math.random() - 0.5) * 0.5,
    }) as CardBody;
    b.cardW = w; b.cardH = h;
    return b;
  });

  const paint = () => bodies.forEach((b, i) => {
    cards[i].style.transform = `translate(${(b.position.x - b.cardW / 2).toFixed(1)}px, ${(b.position.y - b.cardH / 2).toFixed(1)}px) rotate(${b.angle.toFixed(4)}rad)`;
  });
  const settle = (n: number) => { for (let s = 0; s < n; s++) Engine.update(engine, STEP); paint(); };
  paint(); // parked above the tray (clipped by overflow) until it scrolls into view

  let raf = 0, visible = false, dropped = false, last = 0;
  const tick = (t: number) => {
    // fixed 60Hz steps, a few at most per frame, so a tab coming back from the background doesn't fling the pile
    const steps = last ? Math.min(4, Math.max(1, Math.round((t - last) / STEP))) : 1;
    last = t;
    for (let s = 0; s < steps; s++) Engine.update(engine, STEP);
    paint();
    raf = visible ? requestAnimationFrame(tick) : 0;
  };
  const run = () => { if (!raf && !reduce && visible) { last = 0; raf = requestAnimationFrame(tick); } };

  const drop = () => {
    if (dropped) return;
    dropped = true;
    Composite.add(engine.world, bodies);
    if (reduce) settle(900);
  };

  const io = new IntersectionObserver((es) => {
    visible = es[es.length - 1].isIntersecting;
    if (visible) { drop(); run(); }
  }, { threshold: 0.35 });
  io.observe(el);

  // keep the walls on the tray's edges when it resizes; pull back any card left outside
  const ro = new ResizeObserver(() => {
    const w = el.clientWidth, h = el.clientHeight;
    if (w === W && h === H) return;
    W = w; H = h;
    Body.setPosition(floor, { x: W / 2, y: H + T / 2 });
    Body.setPosition(left, { x: -T / 2, y: -H / 2 });
    Body.setPosition(right, { x: W + T / 2, y: -H / 2 });
    for (const b of bodies) {
      if (b.position.x > W - b.cardW / 2) Body.setPosition(b, { x: W - b.cardW / 2 - 4, y: Math.min(b.position.y, H - b.cardH) });
      Body.set(b, "isSleeping", false);
    }
    if (reduce) { if (dropped) settle(300); } else run();
  });
  ro.observe(el);

  // grab and throw: mouse/pen only
  let grab: { c: Constraint; id: number; x: number; y: number; moved: boolean } | null = null;
  const point = (e: PointerEvent) => { const r = el.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  const down = (e: PointerEvent) => {
    if (!fine || reduce || !dropped || e.pointerType === "touch" || e.button !== 0) return;
    const i = cards.findIndex((c) => c.contains(e.target as Node));
    if (i < 0) return;
    const b = bodies[i], p = point(e);
    // pin the grab to the spot under the pointer, in the body's own rotated frame, so the card swings from there
    const dx = p.x - b.position.x, dy = p.y - b.position.y, ca = Math.cos(-b.angle), sa = Math.sin(-b.angle);
    const c = Constraint.create({ pointA: p, bodyB: b, pointB: { x: dx * ca - dy * sa, y: dx * sa + dy * ca }, stiffness: 0.18, damping: 0.08, length: 0 });
    Composite.add(engine.world, c);
    Body.set(b, "isSleeping", false);
    grab = { c, id: e.pointerId, x: e.clientX, y: e.clientY, moved: false };
    el.setPointerCapture(e.pointerId);
    el.classList.add("is-grabbing");
    e.preventDefault(); // no text selection or native image drag
    run();
  };
  const move = (e: PointerEvent) => {
    if (!grab || e.pointerId !== grab.id) return;
    grab.c.pointA = point(e);
    if (Math.hypot(e.clientX - grab.x, e.clientY - grab.y) > 6) grab.moved = true;
  };
  const swallowClick = (ev: MouseEvent) => { ev.preventDefault(); ev.stopPropagation(); };
  const up = (e: PointerEvent) => {
    if (!grab || e.pointerId !== grab.id) return;
    Composite.remove(engine.world, grab.c);
    el.classList.remove("is-grabbing");
    // a fast flick can build up a huge velocity; cap the throw so one card can't scatter the whole pile
    const b = grab.c.bodyB, v = b && Math.hypot(b.velocity.x, b.velocity.y);
    if (b && v && v > 22) Body.setVelocity(b, { x: (b.velocity.x / v) * 22, y: (b.velocity.y / v) * 22 });
    if (b && Math.abs(b.angularVelocity) > 0.25) Body.setAngularVelocity(b, Math.sign(b.angularVelocity) * 0.25);
    // a drag that ends over the CTA card shouldn't also count as a click on it
    if (grab.moved) { el.addEventListener("click", swallowClick, { capture: true, once: true }); setTimeout(() => el.removeEventListener("click", swallowClick, true), 0); }
    grab = null;
  };
  el.addEventListener("pointerdown", down);
  el.addEventListener("pointermove", move);
  el.addEventListener("pointerup", up);
  el.addEventListener("pointercancel", up);

  return () => {
    cancelAnimationFrame(raf); io.disconnect(); ro.disconnect();
    el.removeEventListener("pointerdown", down); el.removeEventListener("pointermove", move);
    el.removeEventListener("pointerup", up); el.removeEventListener("pointercancel", up);
    Engine.clear(engine); el.classList.remove("is-live", "is-grabbing");
    cards.forEach((c) => { c.style.transform = ""; });
  };
}
