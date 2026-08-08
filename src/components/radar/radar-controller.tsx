"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  Send,
  Linkedin,
  UserCog,
  TrendingUp,
  Globe2,
  Cpu,
  Rocket,
  MessageSquare,
} from "lucide-react";

const ACCENT = "#2C456F";
const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const SIGNAL_CHIPS = [
  { label: "Hiring SDRs", Icon: Linkedin, color: "#0A66C2" }, // LinkedIn blue
  { label: "Executive Change", Icon: UserCog, color: "#7C3AED" }, // violet
  { label: "New Funding", Icon: TrendingUp, color: "#16A34A" }, // emerald
  { label: "Website Relaunch", Icon: Globe2, color: "#0EA5E9" }, // sky blue
  { label: "Tech Stack Adoption", Icon: Cpu, color: "#6366F1" }, // indigo
  { label: "Product Launch", Icon: Rocket, color: "#F97316" }, // orange
  { label: "Reddit Discussion", Icon: MessageSquare, color: "#FF4500" }, // Reddit orange
];

const STAGE_LABELS = ["Scanning", "Verifying", "Enriching", "Matching ICP", "Scoring intent"];

const COMPANY = {
  name: "Acme Technologies",
  industry: "B2B SaaS",
  employees: "250",
  region: "United Kingdom",
};

const OUTREACH_ACTIONS = [
  { label: "Push to CRM", Icon: Database },
  { label: "Send outreach", Icon: Send },
];

/* ------------------------------------------------------------------ */
/* Timing — one full loop ~10s                                         */
/* ------------------------------------------------------------------ */

const STAGE_MS = 1800;
const HOLD_MS = 1300;
const T1 = STAGE_MS; // verifying starts — company identity appears
const T2 = STAGE_MS * 2; // enriching starts — firmographics reveal
const T3 = STAGE_MS * 3; // matching ICP starts — intent bar reveal
const T4 = STAGE_MS * 4; // scoring starts — score counts up
const CYCLE_MS = STAGE_MS * STAGE_LABELS.length + HOLD_MS;

const FIRMOGRAPHIC_LINES: [string, string][] = [
  ["Industry", COMPANY.industry],
  ["Employees", COMPANY.employees],
  ["Region", COMPANY.region],
];

/* ------------------------------------------------------------------ */
/* Deterministic seeded float offsets (avoids Math.random hydration    */
/* mismatches)                                                         */
/* ------------------------------------------------------------------ */

function seededRand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const CHIP_MOTION = (() => {
  const rand = seededRand(11);
  return SIGNAL_CHIPS.map(() => ({
    duration: 3.4 + rand() * 1.8,
    delay: rand() * 2,
  }));
})();

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

function FloatingChip({
  label,
  Icon,
  color,
  index,
}: {
  label: string;
  Icon: typeof Linkedin;
  color: string;
  index: number;
}) {
  const m = CHIP_MOTION[index];
  return (
    <motion.div
      className="relative flex items-center gap-3 rounded-2xl border border-hairline bg-white py-2.5 pl-2.5 pr-4 shadow-soft"
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: m.duration, delay: m.delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-surface-soft">
        <Icon className="h-3.5 w-3.5" style={{ color }} />
        <span className="absolute -bottom-0.5 -right-0.5 flex h-2 w-2">
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
            style={{ backgroundColor: ACCENT }}
          />
          <span
            className="relative inline-flex h-2 w-2 rounded-full border border-white"
            style={{ backgroundColor: ACCENT }}
          />
        </span>
      </span>
      <span className="whitespace-nowrap text-[13px] font-medium text-ink">{label}</span>
    </motion.div>
  );
}

function OrbitRing({ duration, reverse, radius, size }: { duration: number; reverse?: boolean; radius: number; size: number }) {
  return (
    <motion.div
      className="absolute inset-0"
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      <span
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          backgroundColor: ACCENT,
          top: `calc(50% - ${radius}px - ${size / 2}px)`,
          left: `calc(50% - ${size / 2}px)`,
          opacity: 0.7,
        }}
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Component                                                            */
/* ------------------------------------------------------------------ */

export function RadarController() {
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef<number>(0);

  const canvasRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [canvasSize, setCanvasSize] = useState({ w: 0, h: 0 });
  const [chipPaths, setChipPaths] = useState<string[]>([]);
  const [accountPath, setAccountPath] = useState("");

  useEffect(() => {
    let raf: number;
    startRef.current = performance.now();
    function tick(now: number) {
      const t = (now - startRef.current) % CYCLE_MS;
      setElapsed(Math.round(t / 40) * 40);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    function measure() {
      const canvasEl = canvasRef.current;
      const engineEl = engineRef.current;
      if (!canvasEl || !engineEl) return;

      const canvasRect = canvasEl.getBoundingClientRect();
      setCanvasSize({ w: canvasRect.width, h: canvasRect.height });

      const engineRect = engineEl.getBoundingClientRect();
      const targetX = engineRect.left - canvasRect.left;
      const targetY = engineRect.top - canvasRect.top + engineRect.height / 2;

      setChipPaths(
        chipRefs.current.map((el) => {
          if (!el) return "";
          const r = el.getBoundingClientRect();
          const startX = r.right - canvasRect.left;
          const startY = r.top - canvasRect.top + r.height / 2;
          const midX = (startX + targetX) / 2;
          return `M${startX.toFixed(1)},${startY.toFixed(1)} C ${midX.toFixed(1)},${startY.toFixed(1)} ${midX.toFixed(1)},${targetY.toFixed(1)} ${targetX.toFixed(1)},${targetY.toFixed(1)}`;
        })
      );

      const accountEl = accountRef.current;
      if (accountEl) {
        const accountRect = accountEl.getBoundingClientRect();
        const engineStartX = engineRect.right - canvasRect.left;
        const engineStartY = targetY;
        const accountEndX = accountRect.left - canvasRect.left;
        const accountEndY = accountRect.top - canvasRect.top + accountRect.height / 2;
        const midX = (engineStartX + accountEndX) / 2;
        setAccountPath(
          `M${engineStartX.toFixed(1)},${engineStartY.toFixed(1)} C ${midX.toFixed(1)},${engineStartY.toFixed(1)} ${midX.toFixed(1)},${accountEndY.toFixed(1)} ${accountEndX.toFixed(1)},${accountEndY.toFixed(1)}`
        );
      }
    }

    measure();
    const timer = setTimeout(measure, 300); // re-measure once fonts/layout settle
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    if (canvasRef.current) ro.observe(canvasRef.current);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, []);

  const stageIdx = Math.min(STAGE_LABELS.length - 1, Math.floor(elapsed / STAGE_MS));

  const identityRevealed = elapsed >= T1;
  const linesRevealed =
    elapsed >= T2 ? Math.min(FIRMOGRAPHIC_LINES.length, Math.floor((elapsed - T2) / 250) + 1) : 0;

  const intentProgress = elapsed >= T3 ? Math.min(1, (elapsed - T3) / 800) : 0;

  const scoreProgress = elapsed >= T4 ? Math.min(1, (elapsed - T4) / 900) : 0;
  const scoreValue = Math.round(94 * (1 - Math.pow(1 - scoreProgress, 3)));
  const readyRevealed = elapsed >= T4 + 1050;

  return (
    <section className="relative overflow-hidden bg-white px-6 py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(10,10,10,0.05) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 85%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-hairline px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ACCENT }} />
          How Cnvrted works
        </span>
        <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          One connected <span className="text-accent">intelligence system</span>.
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-body">
          Signals become a qualified, ready-to-work account — continuously, without a single
          spreadsheet in sight.
        </p>
      </div>

      <div className="relative mx-auto mt-14 hidden max-w-[1300px] grid-cols-[240px_1fr_360px] gap-6 lg:grid">
        <p className="text-[13px] text-muted-soft">Continuously scanning the open web for buying signals.</p>
        <div aria-hidden="true" />
        <p className="text-right text-[13px] text-muted-soft">Matched against your ICP and scored in real time.</p>
      </div>

      <div
        ref={canvasRef}
        className="relative mx-auto mt-6 grid max-w-[1300px] grid-cols-1 gap-16 lg:min-h-[560px] lg:grid-cols-[240px_1fr_360px] lg:items-center lg:gap-6"
      >
        {/* precise connectors — one per signal chip, traced to the engine */}
        {canvasSize.w > 0 && (
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
            viewBox={`0 0 ${canvasSize.w} ${canvasSize.h}`}
            aria-hidden="true"
          >
            {chipPaths.map((d, i) =>
              d ? (
                <g key={i}>
                  <path
                    id={`chip-path-${i}`}
                    d={d}
                    fill="none"
                    stroke="rgba(10,10,10,0.08)"
                    strokeWidth="1"
                  />
                  {[0, 1].map((j) => (
                    <circle key={j} r="2" fill={ACCENT} opacity="0.7">
                      <animateMotion dur={`${3 + ((i + j) % 3) * 0.5}s`} begin={`${j * 1.5 + i * 0.2}s`} repeatCount="indefinite">
                        <mpath href={`#chip-path-${i}`} />
                      </animateMotion>
                    </circle>
                  ))}
                </g>
              ) : null
            )}
          </svg>
        )}

        {/* precise connector — engine to qualified account */}
        {accountPath && (
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
            viewBox={`0 0 ${canvasSize.w} ${canvasSize.h}`}
            aria-hidden="true"
          >
            <path id="account-path" d={accountPath} fill="none" stroke="rgba(10,10,10,0.1)" strokeWidth="1.25" />
            {[0, 1, 2].map((j) => (
              <circle key={j} r="2.2" fill={ACCENT} opacity="0.75">
                <animateMotion dur={`${3.4 + j * 0.5}s`} begin={`${j * 1.1}s`} repeatCount="indefinite">
                  <mpath href="#account-path" />
                </animateMotion>
              </circle>
            ))}
          </svg>
        )}

        {/* Left — live internet signals */}
        <div className="relative z-10 mx-auto flex w-full max-w-[240px] flex-col gap-4 lg:mx-0">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-muted lg:text-left">
            Live internet signals
          </p>
          {SIGNAL_CHIPS.map(({ label, Icon, color }, i) => (
            <div key={label} ref={(el) => { chipRefs.current[i] = el; }}>
              <FloatingChip label={label} Icon={Icon} color={color} index={i} />
            </div>
          ))}
        </div>

        {/* Middle — intelligence engine */}
        <div className="relative z-10 mx-auto flex flex-col items-center">
          <div ref={engineRef} className="relative flex h-64 w-64 items-center justify-center sm:h-72 sm:w-72 lg:h-80 lg:w-80">
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: `radial-gradient(circle, ${ACCENT}14 0%, transparent 70%)` }}
              aria-hidden="true"
            />
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.85, 0.5] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
              style={{ background: `radial-gradient(circle, ${ACCENT}1F 0%, transparent 65%)` }}
              aria-hidden="true"
            />

            <div className="absolute inset-0 rounded-full" style={{ border: "1px solid #ECECEC" }} />
            <motion.div
              className="absolute inset-6 rounded-full"
              style={{ border: "1px solid #ECECEC" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-12 rounded-full"
              style={{ border: `1px dashed ${ACCENT}55` }}
              animate={{ rotate: -360 }}
              transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
            />

            <OrbitRing duration={14} radius={118} size={5} />
            <OrbitRing duration={19} reverse radius={94} size={4} />
            <OrbitRing duration={11} radius={70} size={3} />

            <div className="relative z-10 flex flex-col items-center rounded-3xl border border-hairline bg-white px-7 py-5 text-center shadow-soft">
              <div className="relative h-12 w-12">
                <Image src="/cnvrted-logo.png" alt="" fill className="object-contain" aria-hidden="true" />
              </div>
              <span className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-ink">Cnvrted</span>
              <span className="mt-0.5 text-xs text-muted">Intent Intelligence</span>
            </div>
          </div>

          <div className="mt-7 flex flex-col items-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={STAGE_LABELS[stageIdx]}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="text-sm font-medium text-ink"
              >
                {STAGE_LABELS[stageIdx]}
              </motion.p>
            </AnimatePresence>
            <div className="mt-3 flex items-center gap-1.5">
              {STAGE_LABELS.map((label, i) => (
                <motion.span
                  key={label}
                  animate={{
                    backgroundColor: i === stageIdx ? ACCENT : "#E5E5E5",
                    scale: i === stageIdx ? 1.3 : 1,
                  }}
                  transition={{ duration: 0.25 }}
                  className="h-1.5 w-1.5 rounded-full"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right — qualified account */}
        <div className="relative z-10 mx-auto w-full max-w-[360px] lg:mx-0">
          <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-muted lg:text-left">
            Qualified account
          </p>

          <div ref={accountRef} className="relative">
            <div className="rounded-[1.75rem] border border-hairline bg-white p-7 shadow-soft">
              <AnimatePresence>
                {identityRevealed && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="flex items-center gap-3"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-soft font-display text-base font-semibold text-ink">
                      {COMPANY.name.charAt(0)}
                    </span>
                    <span className="text-base font-semibold text-ink">{COMPANY.name}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {linesRevealed > 0 && (
                <div className="mt-5 space-y-2.5 border-t border-hairline pt-5">
                  <AnimatePresence>
                    {FIRMOGRAPHIC_LINES.map(([label, value], i) =>
                      i < linesRevealed ? (
                        <motion.div
                          key={label}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center justify-between text-[13px]"
                        >
                          <span className="text-muted">{label}</span>
                          <span className="font-medium text-ink">{value}</span>
                        </motion.div>
                      ) : null
                    )}
                  </AnimatePresence>
                </div>
              )}

              {intentProgress > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-5 border-t border-hairline pt-5"
                >
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-muted">Buying intent</span>
                    <span className="font-medium text-ink">{intentProgress >= 1 ? "High" : "…"}</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-soft">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: ACCENT }}
                      animate={{ width: `${intentProgress * 86}%` }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                </motion.div>
              )}

              {scoreProgress > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-5 flex items-center gap-5 border-t border-hairline pt-5"
                >
                  <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
                    <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#ECECEC" strokeWidth="7" />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke={ACCENT}
                        strokeWidth="7"
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 42}
                        animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - scoreProgress * 0.94) }}
                        transition={{ duration: 0.2 }}
                      />
                    </svg>
                    <span className="font-display text-xl font-semibold" style={{ color: ACCENT }}>
                      {scoreValue}
                    </span>
                  </div>
                  <div>
                    <p className="text-[13px] font-medium" style={{ color: ACCENT }}>
                      Very high intent
                    </p>
                    <p className="mt-1 text-[12px] text-muted">98% confidence · 7 signals detected</p>
                  </div>
                </motion.div>
              )}

              <AnimatePresence>
                {readyRevealed && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="mt-5 flex items-center justify-between border-t border-hairline pt-5"
                  >
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold"
                      style={{ backgroundColor: `${ACCENT}14`, color: ACCENT }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ACCENT }} />
                      Ready for outreach
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-muted-soft">
                      <span>Detected</span>
                      <span>→</span>
                      <span>Scored</span>
                      <span>→</span>
                      <span className="font-semibold" style={{ color: ACCENT }}>
                        Ready
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {readyRevealed && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.15, ease: EASE }}
                  className="mt-3 flex items-center justify-center gap-2"
                >
                  {OUTREACH_ACTIONS.map(({ label, Icon }, i) => (
                    <div key={label} className="flex items-center gap-2">
                      {i > 0 && <span className="text-[11px] text-muted-soft">+</span>}
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-white px-3 py-1.5 text-[11px] font-medium text-ink shadow-soft">
                        <Icon className="h-3 w-3 text-muted" />
                        {label}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
