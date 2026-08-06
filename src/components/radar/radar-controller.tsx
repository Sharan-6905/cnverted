"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
/* Globe geometry — a dotted wireframe sphere, orthographic projection */
/* ------------------------------------------------------------------ */

const GLOBE_SIZE = 320;
const GLOBE_R = GLOBE_SIZE / 2 - 4;

interface GlobeDot {
  x: number;
  y: number;
  z: number;
}

// Rough continent bounding regions in [lonMin, lonMax, latMin, latMax] so the
// dot field reads as landmasses (like a real dot-matrix world map) rather
// than a uniform grid. Approximate on purpose — this is decorative.
const LAND_REGIONS: [number, number, number, number][] = [
  [-168, -52, 15, 72], // North America
  [-82, -34, -56, 13], // South America
  [-11, 40, 35, 71], // Europe
  [-18, 52, -35, 38], // Africa
  [40, 180, 5, 78], // Asia
  [95, 145, -11, 28], // SE Asia / Indonesia
  [112, 154, -44, -10], // Australia
];

function isLand(latDeg: number, lonDeg: number) {
  const lon = ((lonDeg + 180) % 360) - 180; // normalize to [-180, 180]
  return LAND_REGIONS.some(
    ([lonMin, lonMax, latMin, latMax]) =>
      lon >= lonMin && lon <= lonMax && latDeg >= latMin && latDeg <= latMax
  );
}

function buildGlobeDots(): GlobeDot[] {
  const dots: GlobeDot[] = [];
  for (let lat = -80; lat <= 80; lat += 6) {
    const latRad = (lat * Math.PI) / 180;
    for (let lon = 0; lon < 360; lon += 6) {
      if (!isLand(lat, lon)) continue;
      const lonRad = (lon * Math.PI) / 180;
      const x = Math.cos(latRad) * Math.sin(lonRad);
      const y = Math.sin(latRad);
      const z = Math.cos(latRad) * Math.cos(lonRad);
      if (z > 0.02) dots.push({ x, y, z });
    }
  }
  return dots;
}

const GLOBE_DOTS = buildGlobeDots();
const DOT_ORDER = seededShuffle(
  GLOBE_DOTS.map((_, i) => i),
  11
);

function project(d: GlobeDot) {
  return {
    left: 50 + d.x * 50,
    top: 50 - d.y * 50,
    r: 0.55 + d.z * 0.65,
    opacity: 0.28 + d.z * 0.45,
  };
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
const ORKA_POS = { left: 88, top: 62 }; // percent, within the globe stage

export function RadarController() {
  const [pulse, setPulse] = useState<ActivePulse | null>(null);
  const [pills, setPills] = useState<FloatingPill[]>([]);
  const [scoreIndex, setScoreIndex] = useState(0);
  const [lead, setLead] = useState<LeadCardData | null>(null);
  const [status, setStatus] = useState("Analyzing buying intent");

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
      const dot = GLOBE_DOTS[dotIdx];
      const { left, top } = project(dot);

      setPulse({ key: i, left, top });

      const label = SIGNAL_ORDER[i % SIGNAL_ORDER.length];
      recentSignalsRef.current = [label, ...recentSignalsRef.current].slice(0, 3);

      setPills((prev) => {
        const next = [
          ...prev,
          {
            key: i,
            text: label,
            left: Math.min(78, Math.max(8, left + (i % 2 === 0 ? 10 : -10))),
            top: Math.min(82, Math.max(6, top + (i % 3 === 0 ? -8 : 8))),
          },
        ];
        return next.slice(-5);
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

  const dots = useMemo(() => GLOBE_DOTS.map((d) => ({ ...project(d) })), []);
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

        {/* Right column — globe + ORKA */}
        <div className="relative mx-auto" style={{ width: "min(460px, 100%)" }}>
          <div className="relative" style={{ paddingTop: "88%" }}>
            <div className="absolute inset-0">
              {/* Globe stage */}
              <div
                className="absolute left-0 top-0"
                style={{ width: GLOBE_SIZE, height: GLOBE_SIZE }}
              >
                <svg
                  width="100%"
                  height="100%"
                  viewBox={`0 0 ${GLOBE_SIZE} ${GLOBE_SIZE}`}
                  className="absolute inset-0"
                >
                  <circle
                    cx={GLOBE_SIZE / 2}
                    cy={GLOBE_SIZE / 2}
                    r={GLOBE_R}
                    fill="none"
                    stroke="#E8E8E8"
                    strokeWidth={1}
                  />
                  {[-0.45, 0, 0.45].map((f) => (
                    <line
                      key={`lat${f}`}
                      x1={GLOBE_SIZE / 2 - Math.sqrt(Math.max(0, 1 - f * f * 4)) * GLOBE_R}
                      x2={GLOBE_SIZE / 2 + Math.sqrt(Math.max(0, 1 - f * f * 4)) * GLOBE_R}
                      y1={GLOBE_SIZE / 2 + f * GLOBE_R}
                      y2={GLOBE_SIZE / 2 + f * GLOBE_R}
                      stroke="#EDEDED"
                      strokeWidth={1}
                    />
                  ))}
                </svg>

                {/* slowly rotating meridians + dot field */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "50% 50%" }}
                >
                  <svg
                    width="100%"
                    height="100%"
                    viewBox={`0 0 ${GLOBE_SIZE} ${GLOBE_SIZE}`}
                    className="absolute inset-0"
                  >
                    {[0.22, 0.55, 0.85].map((f) => (
                      <ellipse
                        key={f}
                        cx={GLOBE_SIZE / 2}
                        cy={GLOBE_SIZE / 2}
                        rx={GLOBE_R * f}
                        ry={GLOBE_R}
                        fill="none"
                        stroke="#EEEEEE"
                        strokeWidth={1}
                      />
                    ))}
                  </svg>

                  {dots.map((d, i) => (
                    <span
                      key={i}
                      className="absolute rounded-full bg-[#B9BFC6]"
                      style={{
                        left: `${d.left}%`,
                        top: `${d.top}%`,
                        width: d.r,
                        height: d.r,
                        opacity: d.opacity,
                        transform: "translate(-50%,-50%)",
                      }}
                    />
                  ))}
                </motion.div>

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
                    className="absolute flex items-center gap-1.5 whitespace-nowrap rounded-full border border-hairline bg-white px-3 py-1.5 text-[11px] font-medium text-ink"
                    style={{
                      left: `${p.left}%`,
                      top: `${p.top}%`,
                      boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
                    }}
                    initial={{ opacity: 0, y: 6, scale: 0.9 }}
                    animate={{ opacity: 1, y: [6, -2, 0], scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: GREEN }}
                    />
                    {p.text}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* ORKA Intelligence panel */}
              <div
                className="absolute w-48 rounded-2xl border border-hairline bg-white p-4"
                style={{
                  left: `${ORKA_POS.left}%`,
                  top: `${ORKA_POS.top}%`,
                  transform: "translate(-50%,-50%)",
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
                    className="absolute left-1/2 w-56 -translate-x-1/2 rounded-2xl border border-hairline bg-white p-4"
                    style={{ bottom: "-8%", boxShadow: "0 16px 40px rgba(0,0,0,0.1)" }}
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
