"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Linkedin,
  TrendingUp,
  Rocket,
  UserCog,
  MessageSquare,
  Globe2,
  Briefcase,
  Cpu,
  Newspaper,
} from "lucide-react";

const GREEN = "#1E9E5A";
const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const SOURCES = [
  { label: "LinkedIn Hiring", Icon: Linkedin },
  { label: "Funding News", Icon: TrendingUp },
  { label: "Product Launches", Icon: Rocket },
  { label: "Executive Changes", Icon: UserCog },
  { label: "Reddit Discussions", Icon: MessageSquare },
  { label: "Company Websites", Icon: Globe2 },
  { label: "Job Boards", Icon: Briefcase },
  { label: "Tech Stack Detection", Icon: Cpu },
  { label: "Press Releases", Icon: Newspaper },
];

const MODULES = [
  "Crawl sources",
  "Remove noise",
  "Deduplicate",
  "Enrich companies",
  "Detect buying signals",
  "Match ICP",
  "Calculate intent score",
];

const SIGNAL_CARDS = [
  { title: "Hiring SDR Team", confidence: 92, time: "2m ago" },
  { title: "Series A Raised", confidence: 97, time: "6m ago" },
  { title: "Opened London Office", confidence: 88, time: "11m ago" },
  { title: "Tech Stack Migration", confidence: 84, time: "14m ago" },
];

const ICP_LINES: [string, string][] = [
  ["Industry", "B2B SaaS"],
  ["Employees", "250"],
  ["Location", "United Kingdom"],
  ["Buying signals", "7"],
  ["ICP match", "96%"],
];

const PAIN_POINTS = ["Hiring sales team", "Geographic expansion", "Product launch"];

const SCORE_CHECKLIST = ["Hiring", "Funding", "Expansion", "Executive hire", "Product launch"];

const ACCOUNTS = [
  { company: "Acme Technologies", score: 94, priority: "High", owner: "A. Reyes", signal: "Series A raised", status: "Qualified" },
  { company: "Northwind Data", score: 88, priority: "High", owner: "J. Park", signal: "Hiring SDR team", status: "Qualified" },
  { company: "Bluepeak Labs", score: 74, priority: "Medium", owner: "S. Cole", signal: "Website relaunch", status: "Reviewing" },
  { company: "Fenwick Cloud", score: 61, priority: "Medium", owner: "A. Reyes", signal: "Tech stack migration", status: "Reviewing" },
  { company: "Orbital Health", score: 45, priority: "Low", owner: "J. Park", signal: "Exec change", status: "Watching" },
];

const PIPELINE_LABELS = [
  "Internet signals",
  "Signal collection",
  "Intelligence engine",
  "Signal extraction",
  "ICP qualification",
  "Intent scoring",
  "Qualified accounts",
];

/* ------------------------------------------------------------------ */
/* Timing — one full loop is ~19s, per spec (18-20s)                   */
/* ------------------------------------------------------------------ */

const T_COLLECT_END = 2200;
const T_STREAM_END = 4200;
const T_ENGINE_START = 4200;
const MODULE_STEP_MS = 680; // 7 modules ≈ 4760ms
const T_ENGINE_END = T_ENGINE_START + MODULES.length * MODULE_STEP_MS; // ~8960
const T_CARDS_END = T_ENGINE_END + 2200; // ~11160
const T_ICP_END = T_CARDS_END + ICP_LINES.length * 320 + 500; // ~13260
const T_SCORE_END = T_ICP_END + 1400 + SCORE_CHECKLIST.length * 220; // ~15760
const CYCLE_MS = 19200;

function stageForTime(t: number) {
  if (t < T_COLLECT_END) return 1;
  if (t < T_STREAM_END) return 0;
  if (t < T_ENGINE_END) return 2;
  if (t < T_CARDS_END) return 3;
  if (t < T_ICP_END) return 4;
  if (t < T_SCORE_END) return 5;
  return 6;
}

/* ------------------------------------------------------------------ */
/* Ambient flowing particles (decorative — always running, independent */
/* of the story timeline, tuned for a moderate/performant count).      */
/* ------------------------------------------------------------------ */

function seededRand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const PARTICLES = (() => {
  const rand = seededRand(5);
  return Array.from({ length: 22 }, (_, i) => ({
    id: i,
    top: 6 + rand() * 88,
    duration: 2.6 + rand() * 2.2,
    delay: rand() * 3,
  }));
})();

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

function StageLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-muted lg:text-left">
      {children}
    </p>
  );
}

function Card({
  children,
  className = "",
  active = false,
}: {
  children: ReactNode;
  className?: string;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border bg-white p-3 transition-shadow ${className}`}
      style={{
        borderColor: active ? GREEN : "#ECECEC",
        boxShadow: active ? `0 0 0 3px ${GREEN}1A, 0 8px 20px rgba(0,0,0,0.05)` : "0 4px 14px rgba(0,0,0,0.04)",
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Component                                                            */
/* ------------------------------------------------------------------ */

export function RadarController() {
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    let raf: number;
    startRef.current = performance.now();
    function tick(now: number) {
      const t = (now - startRef.current) % CYCLE_MS;
      setElapsed(Math.round(t / 40) * 40); // throttle re-renders to ~25fps of state churn
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const stage = stageForTime(elapsed);
  const activeSource = Math.floor(elapsed / 260) % SOURCES.length;

  const moduleIdx =
    elapsed >= T_ENGINE_START && elapsed < T_ENGINE_END
      ? Math.min(MODULES.length - 1, Math.floor((elapsed - T_ENGINE_START) / MODULE_STEP_MS))
      : elapsed >= T_ENGINE_END
        ? MODULES.length - 1
        : -1;

  const cardsRevealed =
    elapsed >= T_ENGINE_END
      ? Math.min(
          SIGNAL_CARDS.length,
          Math.floor((elapsed - T_ENGINE_END) / ((T_CARDS_END - T_ENGINE_END) / SIGNAL_CARDS.length)) + 1
        )
      : 0;

  const icpLinesRevealed =
    elapsed >= T_CARDS_END
      ? Math.min(ICP_LINES.length, Math.floor((elapsed - T_CARDS_END) / 320) + 1)
      : 0;
  const painRevealed = elapsed >= T_CARDS_END + ICP_LINES.length * 320 ? PAIN_POINTS.length : 0;

  const scoreProgress =
    elapsed >= T_ICP_END ? Math.min(1, (elapsed - T_ICP_END) / 1400) : 0;
  const scoreValue = Math.round(94 * (1 - Math.pow(1 - scoreProgress, 3)));
  const checklistRevealed =
    elapsed >= T_ICP_END + 1400
      ? Math.min(SCORE_CHECKLIST.length, Math.floor((elapsed - (T_ICP_END + 1400)) / 220) + 1)
      : 0;

  const rowsRevealed =
    elapsed >= T_SCORE_END
      ? Math.min(ACCOUNTS.length, Math.floor((elapsed - T_SCORE_END) / 320) + 1)
      : 0;

  return (
    <section className="relative overflow-hidden bg-white px-6 py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(10,10,10,0.05) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 85%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-hairline px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GREEN }} />
          Cnvrted
        </span>
        <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          From internet noise to qualified accounts.
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-body">
          Watch how Cnvrted continuously scans public signals, verifies and scores them with AI,
          and delivers sales-ready accounts — before your competitors even know they exist.
        </p>
      </div>

      {/* pipeline breadcrumb */}
      <div className="relative mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-x-2 gap-y-2">
        {PIPELINE_LABELS.map((label, i) => (
          <span key={label} className="flex items-center gap-2">
            <motion.span
              animate={{ color: i === stage ? GREEN : "#9CA3AF", opacity: i === stage ? 1 : 0.6 }}
              transition={{ duration: 0.3 }}
              className="text-[11px] font-medium"
            >
              {label}
            </motion.span>
            {i < PIPELINE_LABELS.length - 1 && (
              <span className="text-[10px] text-muted-soft/50">→</span>
            )}
          </span>
        ))}
      </div>

      {/* workflow */}
      <div className="relative mx-auto mt-14 flex max-w-[1400px] flex-col gap-10 overflow-x-auto pb-4 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
        {/* Stage 1 — sources */}
        <div className="mx-auto w-full max-w-[220px] shrink-0 lg:mx-0">
          <StageLabel>Internet signals</StageLabel>
          <div className="space-y-2">
            {SOURCES.slice(0, 6).map((s, i) => {
              const active = i === activeSource;
              const Icon = s.Icon;
              return (
                <div
                  key={s.label}
                  className="flex items-center gap-2 rounded-xl border px-2.5 py-2 transition-colors"
                  style={{
                    borderColor: active ? GREEN : "#ECECEC",
                    backgroundColor: active ? `${GREEN}0D` : "#fff",
                  }}
                >
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span
                      className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                      style={{ backgroundColor: GREEN }}
                    />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GREEN }} />
                  </span>
                  <Icon className="h-3.5 w-3.5 shrink-0 text-muted" />
                  <span className="truncate text-xs font-medium text-ink">{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stage 2 — particle stream */}
        <div className="relative mx-auto h-16 w-full max-w-[120px] shrink-0 overflow-hidden lg:h-40 lg:w-24">
          {PARTICLES.map((p) => (
            <motion.span
              key={p.id}
              className="absolute h-1 w-1 rounded-full lg:left-1/2"
              style={{ top: `${p.top}%`, backgroundColor: GREEN, opacity: 0.5 }}
              animate={{
                x: ["-10%", "410%"],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Stage 3 — engine */}
        <div className="relative mx-auto flex w-full max-w-[220px] shrink-0 flex-col items-center">
          <StageLabel>Intelligence engine</StageLabel>
          <div className="relative flex h-40 w-40 items-center justify-center">
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: "1px solid #ECECEC" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-3 rounded-full"
              style={{ border: `1px dashed ${GREEN}55` }}
              animate={{ rotate: -360 }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            />
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, ${GREEN}14 0%, transparent 70%)`,
              }}
              aria-hidden="true"
            />
            <div className="relative z-10 flex flex-col items-center rounded-2xl border border-hairline bg-white px-4 py-3 text-center shadow-soft">
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink">Cnvrted</span>
              <span className="text-[10px] text-muted">Intent intelligence engine</span>
            </div>
          </div>
          <div className="mt-4 w-full space-y-1.5">
            {MODULES.map((m, i) => (
              <div key={m} className="flex items-center gap-2">
                <motion.span
                  animate={{
                    backgroundColor: i <= moduleIdx ? GREEN : "#E5E5E5",
                    scale: i === moduleIdx ? 1.3 : 1,
                  }}
                  transition={{ duration: 0.25 }}
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                />
                <motion.span
                  animate={{ color: i === moduleIdx ? GREEN : i < moduleIdx ? "#6B7280" : "#B0B0B0" }}
                  transition={{ duration: 0.25 }}
                  className="text-[11px] font-medium"
                >
                  {m}
                </motion.span>
              </div>
            ))}
          </div>
        </div>

        {/* Stage 4 — signal cards */}
        <div className="mx-auto w-full max-w-[220px] shrink-0 lg:mx-0">
          <StageLabel>Signal extraction</StageLabel>
          <div className="space-y-2">
            <AnimatePresence>
              {SIGNAL_CARDS.map((c, i) =>
                i < cardsRevealed ? (
                  <motion.div
                    key={c.title}
                    initial={{ opacity: 0, x: -12, scale: 0.96 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    <Card>
                      <div className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: GREEN }} />
                        <span className="text-xs font-semibold text-ink">{c.title}</span>
                      </div>
                      <div className="mt-1 flex items-center justify-between text-[10px] text-muted">
                        <span>{c.confidence}% confidence</span>
                        <span>{c.time}</span>
                      </div>
                    </Card>
                  </motion.div>
                ) : null
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Stage 5 — ICP qualification */}
        <div className="mx-auto w-full max-w-[240px] shrink-0 lg:mx-0">
          <StageLabel>ICP qualification</StageLabel>
          <Card active={stage === 4}>
            <p className="text-xs font-semibold text-ink">Acme Technologies</p>
            <div className="mt-2 space-y-1">
              <AnimatePresence>
                {ICP_LINES.map(([label, value], i) =>
                  i < icpLinesRevealed ? (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center justify-between text-[11px]"
                    >
                      <span className="text-muted">{label}</span>
                      <span className="font-medium text-ink">{value}</span>
                    </motion.div>
                  ) : null
                )}
              </AnimatePresence>
            </div>
            {painRevealed > 0 && (
              <div className="mt-2.5 border-t border-hairline pt-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-soft">
                  Pain points
                </p>
                <ul className="mt-1 space-y-1">
                  {PAIN_POINTS.map((p) => (
                    <li key={p} className="flex items-center gap-1.5 text-[11px] text-body">
                      <span style={{ color: GREEN }}>✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        </div>

        {/* Stage 6 — intent score */}
        <div className="mx-auto w-full max-w-[200px] shrink-0 lg:mx-0">
          <StageLabel>Intent scoring</StageLabel>
          <Card active={stage === 5}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
              Buying intent score
            </p>
            <div className="relative mx-auto mt-2 flex h-24 w-24 items-center justify-center">
              <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#ECECEC" strokeWidth="7" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke={GREEN}
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 42}
                  animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - scoreProgress * 0.94) }}
                  transition={{ duration: 0.2 }}
                />
              </svg>
              <span className="font-display text-2xl font-semibold" style={{ color: GREEN }}>
                {scoreValue}
              </span>
            </div>
            <p className="mt-1 text-center text-[11px] font-medium" style={{ color: GREEN }}>
              Very high intent
            </p>
            <ul className="mt-2 space-y-1">
              {SCORE_CHECKLIST.map((s, i) =>
                i < checklistRevealed ? (
                  <motion.li
                    key={s}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center gap-1.5 text-[11px] text-body"
                  >
                    <span style={{ color: GREEN }}>✓</span>
                    {s}
                  </motion.li>
                ) : null
              )}
            </ul>
          </Card>
        </div>

        {/* Stage 7 — qualified accounts */}
        <div className="mx-auto w-full max-w-[420px] shrink-0 lg:mx-0">
          <StageLabel>Qualified accounts</StageLabel>
          <div className="overflow-x-auto rounded-2xl border border-hairline bg-white shadow-soft">
            <table className="w-full min-w-[400px] border-collapse text-left">
              <thead>
                <tr className="border-b border-hairline text-[9px] font-semibold uppercase tracking-[0.06em] text-muted-soft">
                  <th className="px-2.5 py-2">Company</th>
                  <th className="px-2.5 py-2">Score</th>
                  <th className="px-2.5 py-2">Priority</th>
                  <th className="px-2.5 py-2">Owner</th>
                  <th className="px-2.5 py-2">Latest signal</th>
                  <th className="px-2.5 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {ACCOUNTS.map((a, i) =>
                    i < rowsRevealed ? (
                      <motion.tr
                        key={a.company}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="border-b border-hairline last:border-0"
                        style={{ backgroundColor: a.score >= 85 ? `${GREEN}0D` : "transparent" }}
                      >
                        <td className="whitespace-nowrap px-2.5 py-2 text-[11px] font-medium text-ink">{a.company}</td>
                        <td
                          className="px-2.5 py-2 text-[11px] font-semibold"
                          style={{ color: a.score >= 85 ? GREEN : "#6B7280" }}
                        >
                          {a.score}
                        </td>
                        <td className="whitespace-nowrap px-2.5 py-2 text-[11px] text-muted">{a.priority}</td>
                        <td className="whitespace-nowrap px-2.5 py-2 text-[11px] text-muted">{a.owner}</td>
                        <td className="whitespace-nowrap px-2.5 py-2 text-[11px] text-muted">{a.signal}</td>
                        <td className="px-2.5 py-2 text-[11px] text-muted">{a.status}</td>
                      </motion.tr>
                    ) : null
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
