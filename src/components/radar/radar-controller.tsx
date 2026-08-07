"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const SIGNAL_LABELS = [
  "VP Sales Hired",
  "Raised Series A",
  "Pricing Page Updated",
  "Technology Migration",
  "Hiring SDRs",
  "Executive Change",
  "Product Launch",
  "Salesforce Installed",
  "HubSpot Added",
  "Security Page Updated",
  "Opened London Office",
  "AI Team Expansion",
];

const COMPANIES = [
  "Stripe",
  "Linear",
  "Rippling",
  "Vanta",
  "Notion",
  "ClickUp",
  "Ramp",
  "Mercury",
  "Retool",
  "Clerk",
];

const SCORE_STEPS = [42, 58, 71, 86, 94, 100];
const GREEN = "#1E9E5A";

// Deterministic shuffle (fixed seed) — never repeats the same order twice in
// a row, but stays identical between server and client renders.
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const SIGNAL_ORDER = [...seededShuffle(SIGNAL_LABELS, 7), ...seededShuffle(SIGNAL_LABELS, 19)];
const COMPANY_ORDER = seededShuffle(COMPANIES, 3);

/* ------------------------------------------------------------------ */
/* Globe geometry — a true CSS 3D point-cloud sphere.                  */
/* perspective + preserve-3d + translateZ per dot, rotated as a whole  */
/* group so the browser's own 3D engine handles occlusion/foreshorten-*/
/* ing natively (no canvas, no three.js, no per-frame JS recompute).   */
/* ------------------------------------------------------------------ */

// The sphere's transforms are expressed relative to a fixed "design" size,
// then the whole stage is uniformly scaled to whatever the container
// actually measures — see `stageSize`/`scale` in the component below. This
// keeps the sphere fully visible and centered at any viewport width instead
// of relying on cropping/overflow tricks.
const GLOBE_SIZE = 460;
const GLOBE_R = GLOBE_SIZE / 2;
const PERSPECTIVE = 1400;

interface GlobeDot {
  lat: number;
  lon: number;
  land: boolean;
}

// Rough continent bounding regions in [lonMin, lonMax, latMin, latMax] —
// approximate on purpose, this is a decorative abstraction, not a map.
const LAND_REGIONS: [number, number, number, number][] = [
  [-168, -140, 55, 72], // Alaska
  [-140, -95, 48, 72], // Canada north
  [-125, -95, 25, 48], // US / Canada south
  [-105, -85, 15, 25], // Mexico
  [-90, -60, 42, 62], // eastern Canada
  [-82, -60, -20, 13], // northern South America
  [-72, -34, -56, -20], // southern South America
  [-10, 32, 43, 71], // Europe mainland + Scandinavia
  [-9, 3, 36, 44], // Iberia
  [7, 19, 36, 47], // Italy
  [19, 40, 34, 47], // Balkans/Greece/Turkey edge
  [-18, 52, -35, 15], // Africa south
  [10, 52, 15, 32], // Africa north
  [40, 60, 12, 55],
  [60, 100, 5, 55],
  [100, 145, 18, 55],
  [130, 180, 42, 78], // Siberia / Russia east
  [95, 145, -11, 28], // SE Asia / Indonesia
  [112, 154, -44, -10], // Australia
];

function isLand(latDeg: number, lonDeg: number) {
  const lon = ((lonDeg + 180) % 360) - 180;
  return LAND_REGIONS.some(
    ([lonMin, lonMax, latMin, latMax]) =>
      lon >= lonMin && lon <= lonMax && latDeg >= latMin && latDeg <= latMax
  );
}

function buildGlobeDots(): GlobeDot[] {
  const dots: GlobeDot[] = [];
  for (let lat = -84; lat <= 84; lat += 6.5) {
    for (let lon = 0; lon < 360; lon += 6.5) {
      dots.push({ lat, lon, land: isLand(lat, lon) });
    }
  }
  return dots;
}

const GLOBE_DOTS = buildGlobeDots();

// Only front-facing dots (at the sphere's resting orientation) make sense as
// pulse origins, since the pulse/pill overlay is a flat 2D layer drawn on
// top of the (independently rotating) 3D sphere.
const FRONT_DOTS = GLOBE_DOTS.filter((d) => {
  const latRad = (d.lat * Math.PI) / 180;
  const lonRad = (d.lon * Math.PI) / 180;
  return Math.cos(latRad) * Math.cos(lonRad) > 0.25;
});
const DOT_ORDER = seededShuffle(
  FRONT_DOTS.map((_, i) => i),
  11
);

function round(n: number) {
  return Math.round(n * 1000) / 1000;
}

// Orthographic projection used only for the pulse/pill/connector overlay
// (which sits on top of the CSS-3D sphere and needs simple 2D percent
// coordinates matching the sphere's *resting* orientation).
function projectStatic(lat: number, lon: number) {
  const latRad = (lat * Math.PI) / 180;
  const lonRad = (lon * Math.PI) / 180;
  const x = Math.cos(latRad) * Math.sin(lonRad);
  const y = Math.sin(latRad);
  return { left: round(50 + x * 50), top: round(50 - y * 50) };
}

/* ------------------------------------------------------------------ */
/* Count-up stat                                                       */
/* ------------------------------------------------------------------ */

function CountUp({
  target,
  decimals = 0,
  suffix = "",
}: {
  target: number;
  decimals?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1100;
    const start = performance.now();
    let raf: number;
    function tick(now: number) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  const formatted =
    decimals > 0
      ? value.toFixed(decimals)
      : Math.round(value).toLocaleString("en-US");

  return (
    <span ref={ref}>
      {formatted}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

interface FloatingPill {
  key: number;
  text: string;
  left: number;
  top: number;
  anchorLeft: number;
  anchorTop: number;
}

interface ActivePulse {
  key: number;
  left: number;
  top: number;
}

interface LeadCardData {
  key: number;
  company: string;
  score: number;
  signals: string[];
}

const PULSE_INTERVAL_MS = 2400;
const ORKA_POS = { left: 90, top: 76 }; // percent, just outside the sphere's bottom-right edge

export function RadarController() {
  const [pulse, setPulse] = useState<ActivePulse | null>(null);
  const [pills, setPills] = useState<FloatingPill[]>([]);
  const [scoreIndex, setScoreIndex] = useState(0);
  const [lead, setLead] = useState<LeadCardData | null>(null);
  const [status, setStatus] = useState("Analyzing buying intent");
  const [scale, setScale] = useState(1);
  const stageRef = useRef<HTMLDivElement>(null);

  // Uniformly scale the whole (fixed-design-size) stage to whatever the
  // container actually measures, so the full sphere is always visible —
  // never cropped — at any viewport width.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width) setScale(width / GLOBE_SIZE);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const tickRef = useRef(0);
  const recentSignalsRef = useRef<string[]>([]);
  const companyIndexRef = useRef(0);

  useEffect(() => {
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    function fireTick() {
      if (cancelled) return;
      const i = tickRef.current++;

      const dotIdx = DOT_ORDER[i % DOT_ORDER.length];
      const dot = FRONT_DOTS[dotIdx];
      const { left, top } = projectStatic(dot.lat, dot.lon);

      setPulse({ key: i, left, top });

      const label = SIGNAL_ORDER[i % SIGNAL_ORDER.length];
      recentSignalsRef.current = [label, ...recentSignalsRef.current].slice(0, 3);

      setPills((prev) => {
        // Push the pill outward along the same direction from the sphere's
        // center as its anchor point, so it floats just outside the visible
        // circle instead of sitting on top of the dots or the copy column.
        const dx = left - 50;
        const dy = top - 50;
        const dist = Math.hypot(dx, dy) || 1;
        const outward = 74;
        const pillLeft = 50 + (dx / dist) * outward;
        const pillTop = 50 + (dy / dist) * outward;

        const next = [
          ...prev,
          {
            key: i,
            anchorLeft: left,
            anchorTop: top,
            text: label,
            left: round(pillLeft),
            top: round(pillTop),
          },
        ];
        // Keep at most two signals active at once, per spec.
        return next.slice(-2);
      });

      setStatus("Verifying signal");
      timeouts.push(
        setTimeout(() => {
          if (cancelled) return;
          setStatus("Analyzing buying intent");
          setScoreIndex((prevIdx) => {
            const nextIdx = Math.min(prevIdx + 1, SCORE_STEPS.length - 1);
            if (SCORE_STEPS[nextIdx] === 100) {
              timeouts.push(
                setTimeout(() => {
                  if (cancelled) return;
                  const company = COMPANY_ORDER[companyIndexRef.current % COMPANY_ORDER.length];
                  companyIndexRef.current += 1;
                  setLead({
                    key: i,
                    company,
                    score: 92 + (i % 7),
                    signals: recentSignalsRef.current,
                  });
                  setStatus("Qualified account surfaced");

                  timeouts.push(
                    setTimeout(() => {
                      if (cancelled) return;
                      setLead(null);
                      setScoreIndex(0);
                      setStatus("Analyzing buying intent");
                    }, 3000)
                  );
                }, 500)
              );
            }
            return nextIdx;
          });
        }, 600)
      );

      // clear this pulse's ring after it plays
      timeouts.push(
        setTimeout(() => {
          if (!cancelled) setPulse((p) => (p?.key === i ? null : p));
        }, 1400)
      );
      // clear this pill after it has had time to be read
      timeouts.push(
        setTimeout(() => {
          if (!cancelled) setPills((prev) => prev.filter((p) => p.key !== i));
        }, 4200)
      );
    }

    fireTick();
    const interval = setInterval(fireTick, PULSE_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
      timeouts.forEach(clearTimeout);
    };
  }, []);

  const score = SCORE_STEPS[scoreIndex];

  return (
    <section className="bg-white px-6 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[0.82fr_1fr]">
        {/* Left column */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-hairline px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GREEN }} />
            Cnvrted
          </span>

          <h2 className="mt-6 font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
            Every company leaves buying signals.
          </h2>

          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-body">
            Cnvrted continuously monitors hiring, funding, technology adoption,
            executive changes, product launches, website updates, and public
            conversations across the internet. Every verified signal
            contributes to a company&apos;s buying intent score, helping your
            sales team discover opportunities before competitors do.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-hairline pt-8">
            <div>
              <p className="font-display text-2xl font-semibold text-ink">
                <CountUp target={12.4} decimals={1} suffix="M+" />
              </p>
              <p className="mt-1 text-xs text-muted">Signals processed today</p>
            </div>
            <div>
              <p className="font-display text-2xl font-semibold text-ink">
                <CountUp target={480} suffix="K+" />
              </p>
              <p className="mt-1 text-xs text-muted">Companies monitored</p>
            </div>
            <div>
              <p className="font-display text-2xl font-semibold text-ink">
                <CountUp target={1850} />
              </p>
              <p className="mt-1 text-xs text-muted">High intent accounts</p>
            </div>
          </div>
        </div>

        {/* Right column — globe + ORKA. This outer box is the only
            responsive element: width is the real layout constraint (~45-50%
            of the hero via the grid track + this max-width), and the fixed
            -design-size stage inside it is scaled uniformly to fit — so the
            full circular sphere is always visible, never cropped. */}
        <div
          className="mx-auto flex items-center justify-center lg:mx-0 lg:ml-auto"
          style={{ width: "100%", maxWidth: GLOBE_SIZE, aspectRatio: "1 / 1" }}
        >
          <div ref={stageRef} className="relative h-full w-full">
            <div
              className="absolute left-1/2 top-1/2"
              style={{
                width: GLOBE_SIZE,
                height: GLOBE_SIZE,
                transform: `translate(-50%, -50%) scale(${scale})`,
              }}
            >
              {/* Globe stage */}
              <div className="absolute inset-0" style={{ width: GLOBE_SIZE, height: GLOBE_SIZE }}>
              {/* soft spherical shading for depth */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 26%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 45%), radial-gradient(circle at 70% 80%, rgba(0,0,0,0.06) 0%, transparent 55%)",
                    zIndex: 2,
                  }}
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ border: "1px solid #E8E8E8" }}
                  aria-hidden="true"
                />

                {/* true 3D point-cloud sphere, rotating forever, very slowly */}
                <div
                  className="absolute inset-0 overflow-hidden rounded-full"
                  style={{ perspective: PERSPECTIVE }}
                >
                  <motion.div
                    className="absolute inset-0"
                    style={{ transformStyle: "preserve-3d" }}
                    animate={{ rotateY: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    {GLOBE_DOTS.map((d, i) => (
                      <span
                        key={i}
                        className="absolute rounded-full"
                        style={{
                          left: "50%",
                          top: "50%",
                          width: d.land ? 3.2 : 2.2,
                          height: d.land ? 3.2 : 2.2,
                          marginLeft: d.land ? -1.6 : -1.1,
                          marginTop: d.land ? -1.6 : -1.1,
                          backgroundColor: d.land ? "#9AA2AC" : "#D3D8DD",
                          transform: `rotateY(${d.lon}deg) rotateX(${-d.lat}deg) translateZ(${GLOBE_R}px)`,
                          backfaceVisibility: "hidden",
                        }}
                      />
                    ))}
                  </motion.div>
                </div>

                {/* pulse */}
                <AnimatePresence>
                  {pulse && (
                    <motion.div
                      key={pulse.key}
                      className="absolute rounded-full"
                      style={{
                        left: `${pulse.left}%`,
                        top: `${pulse.top}%`,
                        border: `1.5px solid ${GREEN}`,
                        translateX: "-50%",
                        translateY: "-50%",
                      }}
                      initial={{ width: 4, height: 4, opacity: 0.9 }}
                      animate={{ width: 46, height: 46, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.3, ease: "easeOut" }}
                    />
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {pulse && (
                    <motion.div
                      key={`dot-${pulse.key}`}
                      className="absolute rounded-full"
                      style={{
                        left: `${pulse.left}%`,
                        top: `${pulse.top}%`,
                        backgroundColor: GREEN,
                        translateX: "-50%",
                        translateY: "-50%",
                      }}
                      initial={{ width: 3, height: 3, opacity: 1 }}
                      animate={{ width: 6, height: 6, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>

                {/* signal path -> ORKA panel */}
                <svg
                  width="100%"
                  height="100%"
                  viewBox={`0 0 ${GLOBE_SIZE} ${GLOBE_SIZE}`}
                  className="pointer-events-none absolute inset-0 overflow-visible"
                >
                  <AnimatePresence>
                    {pulse &&
                      (() => {
                        const x1 = (pulse.left / 100) * GLOBE_SIZE;
                        const y1 = (pulse.top / 100) * GLOBE_SIZE;
                        const x2 = (ORKA_POS.left / 100) * GLOBE_SIZE;
                        const y2 = (ORKA_POS.top / 100) * GLOBE_SIZE;
                        const mx = (x1 + x2) / 2;
                        const d = `M ${x1} ${y1} Q ${mx} ${y1}, ${x2} ${y2}`;
                        return (
                          <motion.g key={`path-${pulse.key}`}>
                            <motion.path
                              d={d}
                              fill="none"
                              stroke="#D6E9DC"
                              strokeWidth={1}
                              strokeDasharray="3 5"
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.9, ease: "easeInOut" }}
                            />
                            <circle r={2.5} fill={GREEN}>
                              <animateMotion dur="1s" fill="freeze" path={d} />
                            </circle>
                          </motion.g>
                        );
                      })()}
                  </AnimatePresence>
                </svg>
              </div>

              {/* Floating signal pills */}
              <AnimatePresence>
                {pills.map((p) => (
                  <motion.div
                    key={p.key}
                    className="absolute"
                    style={{ left: `${p.left}%`, top: `${p.top}%` }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    {/* continuous gentle float, independent of entrance/exit */}
                    <motion.div
                      className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-hairline bg-white px-3 py-1.5 text-[11px] font-medium text-ink"
                      style={{ boxShadow: "0 6px 20px rgba(0,0,0,0.06)" }}
                      animate={{ y: [-3, 3, -3] }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: GREEN }}
                      />
                      {p.text}
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* ORKA Intelligence panel */}
              <div
                className="absolute w-48 rounded-2xl border border-hairline bg-white p-4"
                style={{
                  left: `${ORKA_POS.left}%`,
                  top: `${ORKA_POS.top}%`,
                  transform: "translate(-50%, -50%)",
                  boxShadow: "0 12px 34px rgba(0,0,0,0.08)",
                }}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink">
                  Orka Intelligence
                </p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={status}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-1 text-[11px] text-muted"
                  >
                    {status}
                  </motion.p>
                </AnimatePresence>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-soft">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: GREEN }}
                    animate={{ width: `${score}%` }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  />
                </div>

                <div className="mt-3 flex items-baseline justify-between">
                  <span className="text-[10px] uppercase tracking-[0.08em] text-muted">
                    Intent score
                  </span>
                  <motion.span
                    key={score}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="font-display text-lg font-semibold"
                    style={{ color: GREEN }}
                  >
                    {score}
                  </motion.span>
                </div>
              </div>

              {/* Lead card */}
              <AnimatePresence>
                {lead && (
                  <motion.div
                    key={lead.key}
                    className="absolute w-56 rounded-2xl border border-hairline bg-white p-4"
                    style={{
                      left: "6%",
                      bottom: "2%",
                      boxShadow: "0 16px 40px rgba(0,0,0,0.1)",
                    }}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ type: "spring", stiffness: 220, damping: 24 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-ink">{lead.company}</span>
                      <span
                        className="rounded-full px-2 py-0.5 text-[11px] font-semibold"
                        style={{ backgroundColor: "#E6F5EC", color: GREEN }}
                      >
                        {lead.score}
                      </span>
                    </div>
                    <ul className="mt-2 space-y-1">
                      {lead.signals.map((s) => (
                        <li key={s} className="flex items-center gap-1.5 text-[11px] text-muted">
                          <span style={{ color: GREEN }}>✓</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2 text-[11px] font-medium" style={{ color: GREEN }}>
                      Confidence: Very high
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
