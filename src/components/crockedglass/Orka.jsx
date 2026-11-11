"use client";

import React, { useEffect, useId, useMemo, useRef } from "react";

/* ------------------------------------------------------------------ *
 *  Orka — Cnvrted's lazy-but-smart papercraft cat.
 *  Pure SVG, no dependencies beyond React 18+. Eyes follow the pointer.
 * ------------------------------------------------------------------ */

const VIEW_W = 1280;
const VIEW_H = 640;
/** y of the "ledge" Orka peeks over, in viewBox units (paws hang below it). */
export const ORKA_LEDGE_RATIO = 560 / VIEW_H;

const C = {
  fur: "#F28A2E",
  furLight: "#F79E45",
  furDark: "#E2672A",
  furShade: "#D85E1E",
  cream: "#F7D7AE",
  creamShade: "#EBC291",
  creamLine: "#D9A876",
  earPink: "#EE7482",
  earPinkDark: "#DD5A6B",
  eyeWhite: "#FBEBD8",
  pupil: "#24160F",
  brow: "#4B2717",
  nose: "#5B2C20",
};

// Eye geometry (viewBox units). Brows are [xLeft, yLeft, xRight, yRight].
const EYES = [
  { cx: 528, cy: 374, rx: 96, ry: 64, r: 41 },
  { cx: 787, cy: 364, rx: 88, ry: 62, r: 41 },
];

const MOODS = {
  grumpy: { brows: [[422, 322, 628, 358], [700, 360, 872, 300]], pupil: 1 },
  curious: { brows: [[425, 300, 628, 318], [698, 318, 868, 292]], pupil: 1.08 },
  sleepy: { brows: [[420, 350, 630, 372], [698, 372, 870, 346]], pupil: 0.95 },
  surprised: { brows: [[430, 282, 626, 290], [700, 292, 866, 276]], pupil: 0.72 },
};

// Where Orka looks when nobody is around: his signature side-eye.
const REST_TARGET = { x: 1320, y: 340 };

/* ---------- helpers ---------- */

function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Low-poly facet mesh: a jittered grid split into triangles. */
function buildFacets(seed = 7) {
  const rand = mulberry32(seed);
  const cell = 58;
  const x0 = 140, y0 = 80, x1 = 1150, y1 = 620;
  const cols = Math.ceil((x1 - x0) / cell);
  const rows = Math.ceil((y1 - y0) / cell);
  const pts = [];
  for (let j = 0; j <= rows; j++) {
    const row = [];
    for (let i = 0; i <= cols; i++) {
      const edge = i === 0 || j === 0 || i === cols || j === rows;
      const jx = edge ? 0 : (rand() - 0.5) * cell * 0.7;
      const jy = edge ? 0 : (rand() - 0.5) * cell * 0.7;
      row.push([x0 + i * cell + jx, y0 + j * cell + jy]);
    }
    pts.push(row);
  }
  const tris = [];
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const a = pts[j][i], b = pts[j][i + 1], c = pts[j + 1][i], d = pts[j + 1][i + 1];
      const flip = rand() > 0.5;
      const pair = flip ? [[a, b, d], [a, d, c]] : [[a, b, c], [b, d, c]];
      for (const t of pair) {
        const light = rand() > 0.5;
        tris.push({
          d: `M${t.map((p) => p.map((n) => n.toFixed(1)).join(",")).join("L")}Z`,
          fill: light ? "#fff" : "#000",
          opacity: (light ? 0.015 + rand() * 0.05 : 0.01 + rand() * 0.045).toFixed(3),
        });
      }
    }
  }
  return tris;
}

const lerp = (a, b, t) => a + (b - a) * t;

/** The visible part of the eye: everything below the (possibly lowered) brow line. */
function lidPath(b, eye, closed) {
  const [xl, yl0, xr, yr0] = b;
  const floor = eye.cy + eye.ry + 8;
  const yl = lerp(yl0, floor, closed);
  const yr = lerp(yr0, floor, closed);
  const m = (yr - yl) / (xr - xl);
  const ext = 80;
  const ya = (yl - m * ext).toFixed(2);
  const yb = (yr + m * ext).toFixed(2);
  return {
    open: `M${xl - ext},${ya}L${xr + ext},${yb}L${xr + ext},${eye.cy + 400}L${xl - ext},${eye.cy + 400}Z`,
    lash: `M${xl - ext},${ya}L${xr + ext},${yb}`,
  };
}

/** Tapered brow wedge: thinner at the outer end, heavier toward the nose. */
function browPath(b, outerIsLeft) {
  const [x1, y1, x2, y2] = b;
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len, ny = dx / len;
  const tL = outerIsLeft ? 7 : 14;
  const tR = outerIsLeft ? 14 : 7;
  const f = (n) => n.toFixed(1);
  return (
    `M${f(x1 + nx * tL)},${f(y1 + ny * tL)}` +
    `L${f(x2 + nx * tR)},${f(y2 + ny * tR)}` +
    `L${f(x2 - nx * tR * 0.5)},${f(y2 - ny * tR * 0.5)}` +
    `L${f(x1 - nx * tL * 0.5)},${f(y1 - ny * tL * 0.5)}Z`
  );
}

function resolveTarget(lookAt) {
  if (!lookAt) return null;
  const el = lookAt.current !== undefined ? lookAt.current : lookAt;
  if (el && typeof el.getBoundingClientRect === "function") {
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }
  if (typeof lookAt.x === "number" && typeof lookAt.y === "number") return lookAt;
  return null;
}

/* ---------- component ---------- */

/**
 * @param {object}  props
 * @param {"grumpy"|"curious"|"sleepy"|"surprised"} [props.mood="grumpy"]
 * @param {boolean} [props.track=true]     Eyes follow the pointer.
 * @param {boolean} [props.blink=true]     Occasional blinks.
 * @param {boolean} [props.parallax=true]  Face shifts slightly toward the pointer.
 * @param {boolean} [props.texture=true]   Low-poly paper facets.
 * @param {{x:number,y:number}|React.RefObject<Element>|Element} [props.lookAt]
 *        Force the gaze at a viewport point or an element (overrides the pointer).
 * @param {() => void} [props.onBoop]      Called when someone clicks his nose.
 * @param {string}  [props.title="Orka the cat"]
 */
export default function Orka({
  mood = "grumpy",
  track = true,
  blink = true,
  parallax = true,
  texture = true,
  lookAt,
  onBoop,
  title = "Orka the cat",
  className,
  style,
  ...rest
}) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const id = (s) => `orka-${uid}-${s}`;

  const svgRef = useRef(null);
  const faceRef = useRef(null);
  const pupilRefs = [useRef(null), useRef(null)];
  const lidRefs = [useRef(null), useRef(null)];
  const lashRefs = [useRef(null), useRef(null)];
  const browRefs = [useRef(null), useRef(null)];

  const facets = useMemo(() => (texture ? buildFacets(11) : []), [texture]);

  // Live props for the animation loop without restarting it.
  const live = useRef({});
  live.current = { mood, track, blink, parallax, lookAt };

  const boopUntil = useRef(0);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const pointer = { x: 0, y: 0, active: false };
    const onMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };
    const onLeave = (e) => {
      if (!e.relatedTarget) pointer.active = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    document.addEventListener("pointerout", onLeave);

    const start = MOODS[live.current.mood] || MOODS.grumpy;
    const state = {
      pupils: EYES.map(() => ({ x: 0, y: 0 })),
      brows: start.brows.map((b) => b.slice()),
      pupilScale: start.pupil,
      face: { x: 0, y: 0 },
      blinkStart: -1,
      nextBlink: performance.now() + 1500 + Math.random() * 2500,
      doubleBlink: false,
    };

    const toSvg = (cx, cy) => {
      const ctm = svg.getScreenCTM();
      if (!ctm) return null;
      const p = svg.createSVGPoint();
      p.x = cx;
      p.y = cy;
      return p.matrixTransform(ctm.inverse());
    };

    let raf = 0;
    let last = performance.now();

    const frame = (now) => {
      const dt = Math.min(64, now - last);
      last = now;
      const ease = (k) => 1 - Math.pow(1 - k, dt / 16.667);
      const L = live.current;

      const booping = now < boopUntil.current;
      const m = MOODS[booping ? "surprised" : L.mood] || MOODS.grumpy;

      // Gaze target in SVG units.
      let target = REST_TARGET;
      const forced = resolveTarget(L.lookAt);
      if (forced) target = toSvg(forced.x, forced.y) || REST_TARGET;
      else if (L.track && pointer.active) target = toSvg(pointer.x, pointer.y) || REST_TARGET;

      // Pupils.
      state.pupilScale = lerp(state.pupilScale, m.pupil, ease(0.2));
      EYES.forEach((eye, i) => {
        const dx = target.x - eye.cx;
        const dy = target.y - eye.cy;
        const dist = Math.hypot(dx, dy) || 1;
        const reach = Math.min(1, dist / 240);
        const r = eye.r * state.pupilScale;
        const mx = eye.rx - r * 0.7;
        const my = eye.ry - r * 0.55;
        const tx = (dx / dist) * mx * reach;
        const ty = (dy / dist) * my * reach;
        const p = state.pupils[i];
        p.x = lerp(p.x, tx, ease(reduceMotion ? 1 : 0.22));
        p.y = lerp(p.y, ty, ease(reduceMotion ? 1 : 0.22));
        const el = pupilRefs[i].current;
        if (el) {
          el.setAttribute("cx", (eye.cx + p.x).toFixed(2));
          el.setAttribute("cy", (eye.cy + p.y).toFixed(2));
          el.setAttribute("r", r.toFixed(2));
        }
      });

      // Face parallax.
      const cx = 640, cy = 400;
      const fdx = target.x - cx, fdy = target.y - cy;
      const fd = Math.hypot(fdx, fdy) || 1;
      const fr = Math.min(1, fd / 900);
      const wantFace = L.parallax && !reduceMotion
        ? { x: (fdx / fd) * 9 * fr, y: (fdy / fd) * 5 * fr }
        : { x: 0, y: 0 };
      state.face.x = lerp(state.face.x, wantFace.x, ease(0.08));
      state.face.y = lerp(state.face.y, wantFace.y, ease(0.08));
      if (faceRef.current) {
        faceRef.current.setAttribute(
          "transform",
          `translate(${state.face.x.toFixed(2)} ${state.face.y.toFixed(2)})`
        );
      }

      // Blink.
      let closed = 0;
      if (L.blink && !reduceMotion) {
        if (state.blinkStart < 0 && now >= state.nextBlink) {
          state.blinkStart = now;
          state.doubleBlink = Math.random() < 0.2;
        }
        if (state.blinkStart >= 0) {
          const t = (now - state.blinkStart) / 150;
          if (t >= 1) {
            if (state.doubleBlink) {
              state.doubleBlink = false;
              state.blinkStart = now + 60;
            } else {
              state.blinkStart = -1;
              state.nextBlink = now + 2500 + Math.random() * 4000;
            }
          } else if (t > 0) {
            closed = t < 0.5 ? t * 2 : (1 - t) * 2;
          }
        }
      }

      // Brows + lids.
      EYES.forEach((eye, i) => {
        const b = state.brows[i];
        const tb = m.brows[i];
        for (let k = 0; k < 4; k++) b[k] = lerp(b[k], tb[k], ease(reduceMotion ? 1 : 0.14));
        const { open, lash } = lidPath(b, eye, closed);
        lidRefs[i].current?.setAttribute("d", open);
        lashRefs[i].current?.setAttribute("d", lash);
        lashRefs[i].current?.setAttribute("opacity", closed > 0.05 ? "1" : "0");
        browRefs[i].current?.setAttribute("d", browPath(b, i === 0));
      });

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      document.removeEventListener("pointerout", onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Initial (SSR-safe) render values.
  const init = MOODS[mood] || MOODS.grumpy;
  const restOffsets = EYES.map((eye) => {
    const dx = REST_TARGET.x - eye.cx, dy = REST_TARGET.y - eye.cy;
    const d = Math.hypot(dx, dy);
    const r = eye.r * init.pupil;
    // rounded so the server and the browser print the same number (else React reports a hydration mismatch)
    const k = (v) => Math.round(v * 100) / 100;
    return { x: k((dx / d) * (eye.rx - r * 0.7)), y: k((dy / d) * (eye.ry - r * 0.55)) };
  });

  const boop = () => {
    boopUntil.current = performance.now() + 750;
    onBoop?.();
  };

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      role="img"
      aria-label={title}
      className={className}
      style={{ display: "block", width: "100%", height: "auto", overflow: "visible", ...style }}
      {...rest}
    >
      <defs>
        <clipPath id={id("silhouette")}>
          <path d={EAR_L} />
          <path d={EAR_R} />
          <path d={HEAD} />
        </clipPath>
        <clipPath id={id("paws")}>
          <path d={PAW_L} />
          <path d={PAW_R} />
        </clipPath>
        <clipPath id={id("muzzle")}>
          <path d={MUZZLE} />
        </clipPath>
        <clipPath id={id("head")}>
          <path d={HEAD} />
        </clipPath>
        {EYES.map((e, i) => (
          <React.Fragment key={i}>
            <clipPath id={id(`eye${i}`)}>
              <ellipse cx={e.cx} cy={e.cy} rx={e.rx} ry={e.ry} />
            </clipPath>
            <clipPath id={id(`open${i}`)}>
              <path ref={lidRefs[i]} d={lidPath(init.brows[i], e, 0).open} />
            </clipPath>
          </React.Fragment>
        ))}
      </defs>

      {/* Ears (behind the head) */}
      <g>
        <path d={EAR_L} fill={C.fur} />
        <path d="M381,104L552,226L490,236Z" fill={C.furDark} opacity="0.55" />
        <path d="M340,300L379,134L464,224Q396,250 340,300Z" fill={C.earPink} />
        <path d="M379,132L468,226L418,236Z" fill={C.earPinkDark} opacity="0.5" />

        <path d={EAR_R} fill={C.fur} />
        <path d="M899,104L728,226L790,236Z" fill={C.furLight} opacity="0.7" />
        <path d="M940,300L901,134L816,224Q884,250 940,300Z" fill={C.earPink} />
        <path d="M901,132L944,318L900,290Z" fill={C.earPinkDark} opacity="0.45" />
      </g>

      {/* Head / body */}
      <path d={HEAD} fill={C.fur} />
      <g clipPath={`url(#${id("head")})`}>
        {/* side shading + cheek stripes */}
        <path d="M150,560L205,450L300,560Z" fill={C.furShade} opacity="0.55" />
        <path d="M1130,560L1075,450L980,560Z" fill={C.furShade} opacity="0.45" />
        <path d="M240,345L345,368L300,398Z" fill={C.furDark} />
        <path d="M205,420L305,430L222,462Z" fill={C.furDark} />
        <path d="M1040,345L935,368L980,398Z" fill={C.furDark} />
        <path d="M1075,420L975,430L1058,462Z" fill={C.furDark} />
        <path d="M150,548L1130,548L1130,570L150,570Z" fill={C.furShade} opacity="0.35" />
      </g>

      <Facets show={texture} facets={facets} clip={id("silhouette")} />

      {/* Face features (parallax group) */}
      <g ref={faceRef}>
        {/* forehead stripes */}
        <path d="M546,214L598,206L604,276Z" fill={C.furDark} />
        <path d="M616,201L688,201L652,312Z" fill={C.furDark} />
        <path d="M706,206L752,214L700,276Z" fill={C.furDark} />

        {/* eyes */}
        {EYES.map((e, i) => (
          <g key={i}>
            <g clipPath={`url(#${id(`eye${i}`)})`}>
              <g clipPath={`url(#${id(`open${i}`)})`}>
                <ellipse cx={e.cx} cy={e.cy} rx={e.rx} ry={e.ry} fill={C.eyeWhite} />
                <circle
                  ref={pupilRefs[i]}
                  cx={e.cx + restOffsets[i].x}
                  cy={e.cy + restOffsets[i].y}
                  r={e.r * init.pupil}
                  fill={C.pupil}
                />
              </g>
              <path
                ref={lashRefs[i]}
                d=""
                stroke={C.brow}
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
                opacity="0"
              />
            </g>
            <path ref={browRefs[i]} d={browPath(init.brows[i], i === 0)} fill={C.brow} />
          </g>
        ))}

        {/* nose bridge */}
        <path d="M618,334L704,334L664,392Z" fill={C.furLight} />

        {/* muzzle */}
        <path
          d={MUZZLE}
          fill={C.cream}
        />
        <path d="M664,424L604,500L664,566L724,500Z" fill={C.creamShade} opacity="0.55" />
        <path d="M512,478Q506,408 582,398L604,500Z" fill="#fff" opacity="0.12" />
        <Facets show={texture} facets={facets} clip={id("muzzle")} />
        <path d="M664,428L664,452" stroke={C.creamLine} strokeWidth="4" strokeLinecap="round" />

        {/* nose (boopable) */}
        <path
          d="M628,384L700,384Q706,390 699,398L670,428Q664,433 658,428L629,398Q622,390 628,384Z"
          fill={C.nose}
          onClick={boop}
          style={{ cursor: "pointer" }}
        />

        {/* whiskers */}
        <path d="M330,398Q404,404 474,440Q402,420 332,412Z" fill={C.cream} />
        <path d="M338,464Q404,450 470,452Q404,464 340,476Z" fill={C.cream} />
        <path d="M970,384Q896,394 830,434Q900,410 972,398Z" fill={C.cream} />
        <path d="M968,452Q904,448 838,454Q904,462 966,466Z" fill={C.cream} />
      </g>

      {/* Paws */}
      <Paw d={PAW_L} toes={[272, 318, 362]} />
      <Paw d={PAW_R} toes={[918, 962, 1008]} />

      <Facets show={texture} facets={facets} clip={id("paws")} />
    </svg>
  );
}

const EAR_L = "M300,318L372,106Q381,96 391,108L552,226Z";
const EAR_R = "M728,226L889,108Q899,96 908,106L980,318Z";
const MUZZLE =
  "M512,478Q506,408 582,398Q640,390 664,418Q688,390 746,398Q818,408 812,478Q808,560 664,566Q516,560 512,478Z";
const HEAD =
  "M170,560L198,470Q232,382 300,324Q420,230 560,213Q650,197 740,213Q880,230 980,324Q1048,382 1082,470L1110,560Z";
const PAW_L =
  "M213,580L215,522Q217,462 300,458Q396,456 408,520L412,580Q411,600 390,600L236,600Q213,600 213,580Z";
const PAW_R =
  "M1067,580L1065,522Q1063,462 980,458Q884,456 872,520L868,580Q869,600 890,600L1044,600Q1067,600 1067,580Z";

function Facets({ show, facets, clip }) {
  if (!show) return null;
  return (
    <g clipPath={`url(#${clip})`} style={{ pointerEvents: "none" }} aria-hidden="true">
      {facets.map((t, i) => (
        <path key={i} d={t.d} fill={t.fill} opacity={t.opacity} />
      ))}
    </g>
  );
}

function Paw({ d, toes }) {
  return (
    <g>
      <path d={d} fill={C.cream} />
      <path d={d} fill="none" stroke={C.creamShade} strokeWidth="3" />
      {toes.map((x) => (
        <path
          key={x}
          d={`M${x},600Q${x - 3},560 ${x + 2},528`}
          stroke={C.creamLine}
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
      ))}
    </g>
  );
}

/* ------------------------------------------------------------------ *
 *  OrkaPeek — Orka hanging over the top edge of whatever you wrap.
 * ------------------------------------------------------------------ */

/**
 * @param {object} props
 * @param {number|string} [props.width=220]   Orka's width (px or any CSS length).
 * @param {"left"|"center"|"right"} [props.align="right"]
 * @param {number|string} [props.offset=24]   Distance from the aligned edge.
 * @param {object} [props.orkaProps]          Passed to <Orka />.
 * @param {import('react').ReactNode} [props.children]
 * @param {string} [props.className]
 * @param {import('react').CSSProperties} [props.style]
 */
export function OrkaPeek({
  children,
  width = 220,
  align = "right",
  offset = 24,
  orkaProps,
  className,
  style,
}) {
  const w = typeof width === "number" ? `${width}px` : width;
  const o = typeof offset === "number" ? `${offset}px` : offset;
  const pos =
    align === "left"
      ? { left: o }
      : align === "center"
      ? { left: "50%", marginLeft: `calc(${w} / -2)` }
      : { right: o };
  return (
    <div className={className} style={{ position: "relative", ...style }}>
      {children}
      <div
        style={{
          position: "absolute",
          top: 0,
          width: w,
          transform: `translateY(-${ORKA_LEDGE_RATIO * 100}%)`,
          zIndex: 2,
          pointerEvents: "none",
          ...pos,
        }}
      >
        <Orka {...orkaProps} style={{ pointerEvents: "auto", ...(orkaProps?.style || {}) }} />
      </div>
    </div>
  );
}
