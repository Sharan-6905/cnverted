"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  Bookmark,
  Check,
  ChevronDown,
  Download,
  Maximize2,
  MessageSquare,
  Workflow,
  Pause,
  Play,
  RotateCcw,
  Search,
  X,
} from "lucide-react";
import {
  DemoTypewriter,
  DemoThinking,
  DemoToolLogos,
  DemoModelIcon,
} from "./product-canvas-chat";
import { ProductIcon } from "./product-canvas-icon";
import { ProductCanvasGraph } from "./product-canvas-graph";
import {
  DEFAULT_PRODUCT_PROMPT,
  PRODUCT_LEADS,
  PRODUCT_MODELS,
  PRODUCT_PHASES,
  PRODUCT_PROMPTS,
  productNodes,
  productScenario,
  type ProductScenario,
} from "./product-canvas-data";
import { productCanvasAssets } from "./product-canvas-assets";
import "./product-canvas.css";

type Run = {
  prompt: string;
  scenario: ProductScenario;
  model: string;
  phase: number;
  cycle: number;
};
type HistoryItem = Pick<Run, "prompt" | "scenario" | "model">;
type Panel = "history" | "leads" | "node" | null;
const PHASE_DELAYS = [2900, 1100, 1900, 1800, 2300, 1700, 6500, 3500];
const LOOP_PROMPTS = [
  DEFAULT_PRODUCT_PROMPT,
  "Find new markets for teams expanding their offices",
  "Is my current ICP a good one for AI startups?",
];

function Orka() {
  return (
    <div className="product-orka">
      <ProductIcon name="imgGroup1437254398" size={25.68} />
      <span>Orka</span>
    </div>
  );
}

function LeadTable({
  scenario,
  saved,
  onSavedChange,
}: {
  scenario: ProductScenario;
  saved: boolean;
  onSavedChange: () => void;
}) {
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const leads = PRODUCT_LEADS.filter((row) =>
    row.join(" ").toLowerCase().includes(filter.toLowerCase()),
  );
  const signal =
    scenario === "markets"
      ? "Expanding team"
      : scenario === "icp"
        ? "ICP match"
        : "Hiring designer";
  function exportLeads() {
    const rows = selected.size
      ? PRODUCT_LEADS.filter((row) => selected.has(row[0]))
      : leads;
    const csv = [
      ["Company", "Contact person", "Designation", "Example signal"],
      ...rows.map((row) => [...row, signal]),
    ]
      .map((row) =>
        row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(","),
      )
      .join("\r\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8;" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "cnvrted-demo-leads.csv";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <>
      <div className="product-table-actions">
        <span>
          Cold List <small>{PRODUCT_LEADS.length}</small>
        </span>
        <div>
          <button type="button" onClick={onSavedChange}>
            <Bookmark size={15} fill={saved ? "currentColor" : "none"} />
            {saved ? "Saved" : "Save"}
          </button>
          <button type="button" onClick={exportLeads}>
            <Download size={15} />
            Export
          </button>
        </div>
      </div>
      <label className="product-search-field">
        <Search size={16} />
        <input
          aria-label="Filter example leads"
          placeholder="Search companies or contacts"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </label>
      <div className="product-table-scroll">
        <table>
          <caption className="sr-only">
            11 illustrative companies and contacts. Not verified prospects.
          </caption>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  aria-label="Select all visible leads"
                  checked={
                    leads.length > 0 &&
                    leads.every((row) => selected.has(row[0]))
                  }
                  onChange={(e) =>
                    setSelected(
                      e.target.checked
                        ? new Set(leads.map((row) => row[0]))
                        : new Set(),
                    )
                  }
                />
              </th>
              <th>Company</th>
              <th>Contact person</th>
              <th>Designation</th>
              <th>Signal</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((row, i) => (
              <tr key={row[0]}>
                <td>
                  <input
                    type="checkbox"
                    aria-label={`Select ${row[0]}`}
                    checked={selected.has(row[0])}
                    onChange={(e) =>
                      setSelected((previous) => {
                        const next = new Set(previous);
                        if (e.target.checked) next.add(row[0]);
                        else next.delete(row[0]);
                        return next;
                      })
                    }
                  />
                </td>
                <td>
                  <span className="product-company-mark" data-tone={i % 4}>
                    {row[0][0]}
                  </span>
                  {row[0]}
                </td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
                <td>
                  <span className="product-table-signal">{signal}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!leads.length && (
          <p className="product-empty">No companies match that search.</p>
        )}
      </div>
      <p className="product-table-note" role="status">
        {saved ? "Saved in this demo session. " : ""}
        {selected.size ? `${selected.size} selected · ` : ""}Illustrative data
        only.
      </p>
    </>
  );
}

export function ProductCanvasDemo() {
  const root = useRef<HTMLDivElement>(null);
  const conversation = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const composer = useRef<HTMLTextAreaElement>(null);
  const [portal, setPortal] = useState<HTMLDivElement | null>(null);
  const [run, setRun] = useState<Run>({
    prompt: DEFAULT_PRODUCT_PROMPT,
    scenario: "hiring",
    model: PRODUCT_MODELS[0],
    phase: 0,
    cycle: 0,
  });
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState(PRODUCT_MODELS[0]);
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      prompt: DEFAULT_PRODUCT_PROMPT,
      scenario: "hiring",
      model: PRODUCT_MODELS[0],
    },
  ]);
  const [savedRuns, setSavedRuns] = useState<Set<string>>(new Set());
  const [historyQuery, setHistoryQuery] = useState("");
  const [panel, setPanel] = useState<Panel>(null);
  const [node, setNode] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [zoom, setZoom] = useState(1);
  const [settings, setSettings] = useState(false);
  const [askApproval, setAskApproval] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [view, setView] = useState<"chat" | "canvas">("canvas");
  const [paused, setPaused] = useState(false);
  const [automatic, setAutomatic] = useState(true);
  const [composing, setComposing] = useState(false);
  const progress = useMotionValue(0);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const reducedMotion = useReducedMotion();
  const nodes = useMemo(() => productNodes(run.scenario), [run.scenario]);
  const busy = run.phase < 5;
  const running =
    (automatic || busy) &&
    !paused &&
    inView &&
    pageVisible &&
    !panel &&
    !settings &&
    !composing &&
    !searchOpen &&
    !prompt.trim() &&
    !(reducedMotion && run.phase >= 6);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(element);
    const visibility = () => setPageVisible(!document.hidden);
    visibility();
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  useEffect(() => {
    progress.set(0);
  }, [run.phase, run.cycle, progress]);

  useEffect(() => {
    if (!running) return;
    // One clock keeps typed chat, the graph and progress in sync. Pausing preserves time.
    const playback = animate(progress, 1, {
      duration: reducedMotion
        ? 0
        : ((1 - progress.get()) * PHASE_DELAYS[run.phase]) / 1000,
      ease: "linear",
      onComplete: () =>
        setRun((current) => {
          if (reducedMotion) return { ...current, phase: 6 };
          if (current.phase >= 6 && automatic) {
            const nextPrompt =
              LOOP_PROMPTS[(current.cycle + 1) % LOOP_PROMPTS.length];
            return {
              prompt: nextPrompt,
              scenario: productScenario(nextPrompt),
              model,
              phase: 0,
              cycle: current.cycle + 1,
            };
          }
          return {
            ...current,
            phase:
              current.phase === 4 && !automatic && !askApproval
                ? 6
                : current.phase + 1,
          };
        }),
    });
    return () => playback.stop();
  }, [
    running,
    run.phase,
    run.cycle,
    reducedMotion,
    askApproval,
    automatic,
    model,
    progress,
  ]);

  useEffect(() => {
    const element = conversation.current;
    if (element)
      element.scrollTo({
        top: run.phase === 0 ? 0 : element.scrollHeight,
        behavior: reducedMotion ? "instant" : "smooth",
      });
  }, [run.phase, run.cycle, reducedMotion, view]);

  useEffect(() => {
    if (!settings) return;
    const close = (event: PointerEvent) => {
      if (
        !(event.target instanceof Element) ||
        !event.target.closest(
          ".product-approval-settings, .product-settings-button",
        )
      )
        setSettings(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [settings]);

  function start(message: string, chosenModel = model, autoplay = false) {
    const clean = message.trim();
    if (!clean) return;
    const scenario = productScenario(clean);
    setRun((current) => ({
      prompt: clean,
      scenario,
      model: chosenModel,
      phase: autoplay ? 0 : 1,
      cycle: current.cycle + 1,
    }));
    setHistory((previous) =>
      [
        { prompt: clean, scenario, model: chosenModel },
        ...previous.filter((item) => item.prompt !== clean),
      ].slice(0, 8),
    );
    setPrompt("");
    composer.current?.blur();
    setComposing(false);
    setAutomatic(autoplay);
    setPaused(false);
    setSettings(false);
    setPanel(null);
    setQuery("");
    setSearchOpen(false);
    setZoom(1);
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    start(prompt);
  }
  function openPanel(next: Exclude<Panel, null>) {
    lastFocus.current = document.activeElement as HTMLElement;
    setSettings(false);
    setPanel(next);
  }
  function approve() {
    setRun((current) => ({ ...current, phase: 6 }));
  }
  function replay() {
    start(run.prompt, run.model, true);
  }
  const historyItems = history.length
    ? history
    : [
        {
          prompt: DEFAULT_PRODUCT_PROMPT,
          scenario: "hiring" as const,
          model: PRODUCT_MODELS[0],
        },
      ];

  return (
    <div
      className="product-demo"
      ref={root}
      data-phase={run.phase}
      data-running={running}
      data-cycle={run.cycle}
      data-automatic={automatic}
      onKeyDown={(event) => {
        if (
          (event.metaKey || event.ctrlKey) &&
          event.key.toLowerCase() === "k"
        ) {
          event.preventDefault();
          setSearchOpen(true);
          setView("canvas");
        }
        if (event.key === "Escape") {
          setSettings(false);
          setSearchOpen(false);
          setQuery("");
        }
      }}
    >
      <div className="product-demo-controls" data-panel-open={!!panel}>
        <div className="product-demo-footer">
          <div className="product-playback-status">
            <span className="product-playback-eyebrow">
              <i data-busy={running} />
              {automatic ? "Product walkthrough" : "Your playground"}
              <small>
                {String(Math.min(run.phase + 1, 7)).padStart(2, "0")} / 07
              </small>
            </span>
            <span className="product-run-status" role="status">
              {paused ? "Paused · make it your own" : PRODUCT_PHASES[run.phase]}
            </span>
          </div>
          <button
            type="button"
            className="product-playback-button"
            data-paused={paused}
            aria-label={
              automatic || busy
                ? paused
                  ? "Play demo"
                  : "Pause demo"
                : "Replay demo"
            }
            onClick={() => (automatic || busy ? setPaused(!paused) : replay())}
          >
            <span className="product-playback-icon">
              {automatic || busy ? (
                paused ? (
                  <Play size={15} fill="currentColor" />
                ) : (
                  <Pause size={15} fill="currentColor" />
                )
              ) : (
                <RotateCcw size={16} />
              )}
            </span>
            <span>
              {automatic || busy
                ? paused
                  ? "Play demo"
                  : "Pause demo"
                : "Replay demo"}
            </span>
          </button>
        </div>
        <div className="product-timeline" aria-hidden="true">
          {PHASE_DELAYS.slice(0, 7).map((_, index) => (
            <span key={index}>
              <motion.i
                style={{
                  scaleX:
                    run.phase === index ? progress : run.phase > index ? 1 : 0,
                }}
              />
            </span>
          ))}
        </div>
        {!automatic && run.phase === 5 && (
          <button
            type="button"
            className="product-mobile-approve"
            onClick={() => {
              approve();
              openPanel("leads");
            }}
          >
            Review & approve shortlist <ArrowRight size={14} />
          </button>
        )}
      </div>
      <div className="product-demo-surface" ref={setPortal}>
        <div className="product-demo-layout">
          <aside
            className="product-app-rail"
            aria-label="Demo workspace navigation"
          >
            <div className="product-app-logo">
              <ProductIcon name="imgGroup1437254397" size={30.8} />
            </div>
            <button
              type="button"
              className="product-app-active"
              aria-label="Show canvas"
              onClick={() => {
                setView("canvas");
                setPanel(null);
              }}
            >
              <ProductIcon name="imgSidebar" />
            </button>
            <button
              type="button"
              aria-label="Open recent activities"
              onClick={() => openPanel("history")}
            >
              <ProductIcon name="imgClockClockwise" />
            </button>
            <button
              type="button"
              aria-label="Chat with Orka"
              onClick={() => {
                setView("chat");
                composer.current?.focus();
              }}
            >
              <ProductIcon name="imgCpu" />
            </button>
            <DemoToolLogos />
            <img
              className="product-avatar"
              src={productCanvasAssets.imgImage.src}
              alt="Demo user"
            />
          </aside>
          <div className="product-app-main">
            <header className="product-app-header">
              <span className="product-app-title">GTM Canvas</span>
              <span className="product-breadcrumb">
                Lead Generation <span>/</span> <b>GTM Canvas</b>
              </span>
              <span className="product-demo-label">
                <i data-playing={running} />
                {automatic ? "Live demo" : "Your playground"}
              </span>
            </header>
            <div className="product-mobile-tabs" aria-label="Demo view">
              <button
                type="button"
                aria-pressed={view === "chat"}
                onClick={() => setView("chat")}
              >
                <MessageSquare size={16} aria-hidden="true" /> Chat with Orka
              </button>
              <button
                type="button"
                aria-pressed={view === "canvas"}
                onClick={() => setView("canvas")}
              >
                <Workflow size={16} aria-hidden="true" /> Canvas{" "}
                {run.phase >= 2 && (
                  <span>
                    {run.phase >= 5 ? 5 : run.phase === 4 ? 4 : run.phase - 1}
                  </span>
                )}
              </button>
            </div>
            <div className="product-workspace" data-view={view}>
              <aside className="product-chat" aria-label="Orka chat">
                <div className="product-conversation" ref={conversation}>
                  <Orka />
                  <p className="product-intro">
                    Tell me who you want to reach. I’ll find the signals and
                    build your next move.
                  </p>
                  <div className="product-quick-prompts">
                    {PRODUCT_PROMPTS.map((text) => (
                      <button
                        type="button"
                        key={text}
                        onClick={() => start(text)}
                      >
                        {text}
                      </button>
                    ))}
                  </div>
                  <AnimatePresence initial={false}>
                    {run.phase >= 1 && (
                      <motion.div
                        key={`user-${run.cycle}`}
                        className="product-user-message"
                        initial={{ opacity: 0, y: reducedMotion ? 0 : 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: reducedMotion ? 0 : 0.25 }}
                      >
                        <p>{run.prompt}</p>
                        <img src={productCanvasAssets.imgImage.src} alt="" />
                      </motion.div>
                    )}
                    {run.phase >= 1 && (
                      <motion.div
                        key={`reply-${run.cycle}`}
                        className="product-reply"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: reducedMotion ? 0 : 0.3 }}
                      >
                        <Orka />
                        {run.phase === 1 ? (
                          <span
                            className="product-typing-dots"
                            aria-label="Orka is thinking"
                          >
                            <i />
                            <i />
                            <i />
                          </span>
                        ) : (
                          <>
                            <p>
                              <DemoTypewriter
                                key={`plan-${run.cycle}`}
                                text="On it. I’ll map your ideal customer, check the signals, and find the right people."
                                playing={running}
                                speed={16}
                              />
                            </p>
                            <DemoThinking phase={run.phase} />
                            {run.phase >= 5 && (
                              <motion.div
                                className="product-chat-result"
                                initial={{
                                  opacity: 0,
                                  y: reducedMotion ? 0 : 6,
                                }}
                                animate={{ opacity: 1, y: 0 }}
                              >
                                <p>
                                  <DemoTypewriter
                                    key={`result-${run.cycle}`}
                                    text={
                                      run.phase === 7
                                        ? "Skipped. Try another brief whenever you’re ready."
                                        : "11 companies fit your brief. Here’s your shortlist."
                                    }
                                    playing={
                                      running ||
                                      (!automatic &&
                                        !paused &&
                                        inView &&
                                        pageVisible &&
                                        !panel)
                                    }
                                    speed={20}
                                  />
                                </p>
                                {run.phase === 5 && (
                                  <div className="product-approval-actions">
                                    <div>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setRun((current) => ({
                                            ...current,
                                            phase: 7,
                                          }))
                                        }
                                      >
                                        Skip
                                      </button>
                                      <button
                                        type="button"
                                        className="product-black-button"
                                        onClick={approve}
                                      >
                                        Approve <Check size={12} />
                                      </button>
                                    </div>
                                    {automatic ? (
                                      <span className="product-auto-approval">
                                        Auto-approving in this demo…
                                      </span>
                                    ) : (
                                      <button
                                        type="button"
                                        className="product-approval-remember"
                                        onClick={() => {
                                          setAskApproval(false);
                                          approve();
                                        }}
                                      >
                                        Don’t ask me again
                                      </button>
                                    )}
                                  </div>
                                )}
                                {run.phase === 6 && (
                                  <>
                                    <button
                                      type="button"
                                      className="product-lead-link"
                                      onClick={() => openPanel("leads")}
                                    >
                                      <ProductIcon
                                        name="imgGridNine"
                                        size={18}
                                      />
                                      <span>Explore 11 companies</span>
                                      <ArrowRight size={18} />
                                    </button>
                                    <div
                                      className="product-mini-results"
                                      aria-label="Sample shortlist"
                                    >
                                      {PRODUCT_LEADS.slice(0, 3).map(
                                        ([company, , role], index) => (
                                          <motion.div
                                            key={company}
                                            initial={{
                                              opacity: 0,
                                              y: reducedMotion ? 0 : 6,
                                            }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                              delay: reducedMotion
                                                ? 0
                                                : 0.3 + index * 0.18,
                                            }}
                                          >
                                            <span>{company.charAt(0)}</span>
                                            <div>
                                              <b>{company}</b>
                                              <small>{role}</small>
                                            </div>
                                            <Check size={12} />
                                          </motion.div>
                                        ),
                                      )}
                                    </div>
                                  </>
                                )}
                              </motion.div>
                            )}
                          </>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="product-composer-wrap">
                  {settings && (
                    <div
                      className="product-approval-settings"
                      id="product-approval-settings"
                    >
                      <div>
                        <strong>Cnvrted Approval Setting</strong>
                        <button
                          type="button"
                          aria-label="Close approval settings"
                          onClick={() => setSettings(false)}
                        >
                          <X size={14} />
                        </button>
                      </div>
                      <fieldset>
                        <legend className="sr-only">
                          Approval preference for this demo
                        </legend>
                        {[true, false].map((ask) => (
                          <label
                            key={String(ask)}
                            data-selected={askApproval === ask}
                          >
                            <input
                              type="radio"
                              name="demo-approval"
                              checked={askApproval === ask}
                              onChange={() => setAskApproval(ask)}
                            />
                            <ProductIcon
                              name={
                                ask
                                  ? "imgFormatOutlineWeightRegular1"
                                  : "imgGitBranch"
                              }
                              size={18}
                            />
                            <span>
                              {ask ? "Ask for approval" : "Approve for me"}
                              <small>
                                {ask
                                  ? "Review the shortlist before opening it."
                                  : "Open example results automatically."}
                              </small>
                            </span>
                          </label>
                        ))}
                      </fieldset>
                    </div>
                  )}
                  <form className="product-composer" onSubmit={submit}>
                    <textarea
                      ref={composer}
                      aria-label="Chat with Orka in the demo"
                      placeholder={
                        automatic && run.phase === 0 && !composing
                          ? ""
                          : "Ask Orka anything…"
                      }
                      onFocus={() => setComposing(true)}
                      onBlur={() => setComposing(false)}
                      maxLength={500}
                      rows={2}
                      value={prompt}
                      onChange={(event) => setPrompt(event.target.value)}
                      onKeyDown={(event) => {
                        if (
                          event.key === "Enter" &&
                          !event.shiftKey &&
                          !event.nativeEvent.isComposing
                        ) {
                          event.preventDefault();
                          start(prompt);
                        }
                      }}
                    />
                    {automatic && run.phase === 0 && !composing && !prompt && (
                      <div
                        className="product-composer-preview"
                        aria-hidden="true"
                      >
                        <DemoTypewriter
                          key={run.cycle}
                          text={run.prompt}
                          playing={running}
                          speed={32}
                        />
                      </div>
                    )}
                    <div className="product-composer-tools">
                      <label className="product-model">
                        <DemoModelIcon />
                        <span>{model}</span>
                        <ChevronDown size={10} />
                        <select
                          aria-label="Demo AI model"
                          value={model}
                          onChange={(event) => setModel(event.target.value)}
                        >
                          {PRODUCT_MODELS.map((name) => (
                            <option key={name}>{name}</option>
                          ))}
                        </select>
                      </label>
                      <button
                        type="button"
                        className="product-settings-button"
                        aria-label="Approval settings"
                        aria-expanded={settings}
                        aria-controls="product-approval-settings"
                        onClick={() => setSettings(!settings)}
                      >
                        <ProductIcon
                          name="imgFormatOutlineWeightRegular1"
                          size={16}
                        />
                      </button>
                      <button
                        type="submit"
                        className="product-send"
                        aria-label="Send demo prompt"
                        disabled={!prompt.trim()}
                      >
                        <ProductIcon name="imgPaperPlaneTilt" />
                      </button>
                    </div>
                  </form>
                </div>
              </aside>
              <div className="product-mobile-narration" aria-hidden="true">
                <ProductIcon name="imgGroup1437254398" size={21} />
                <div>
                  <strong>
                    Orka <span>· {model}</span>
                  </strong>
                  <span>
                    {run.phase < 2 ? run.prompt : PRODUCT_PHASES[run.phase]}
                  </span>
                </div>
                {running && (
                  <span className="product-typing-dots">
                    <i />
                    <i />
                    <i />
                  </span>
                )}
              </div>
              <div className="product-canvas" aria-label="GTM workflow">
                <div className="product-canvas-tools">
                  <div>
                    <button
                      type="button"
                      aria-label="Search workflow"
                      aria-expanded={searchOpen}
                      onClick={() => {
                        setSearchOpen(!searchOpen);
                        setQuery("");
                      }}
                    >
                      <ProductIcon name="imgMagnifyingGlass" />
                    </button>
                    <button
                      type="button"
                      aria-label="Workflow history"
                      onClick={() => openPanel("history")}
                    >
                      <ProductIcon name="imgClockClockwise" />
                    </button>
                    <button
                      type="button"
                      aria-label="Replay workflow"
                      onClick={replay}
                    >
                      <ProductIcon name="imgGitBranch" />
                    </button>
                  </div>
                  <div className="product-zoom-tools">
                    <button
                      type="button"
                      aria-label="Zoom in"
                      disabled={zoom >= 2}
                      onClick={() =>
                        setZoom((value) => Math.min(2, value + 0.25))
                      }
                    >
                      <ProductIcon name="imgPlus" size={22} />
                    </button>
                    <button
                      type="button"
                      aria-label="Zoom out"
                      disabled={zoom <= 1}
                      onClick={() =>
                        setZoom((value) => Math.max(1, value - 0.25))
                      }
                    >
                      <ProductIcon
                        name="imgFormatOutlineWeightRegular"
                        size={22}
                      />
                    </button>
                    {zoom > 1 && (
                      <button
                        type="button"
                        aria-label="Fit workflow to canvas"
                        onClick={() => setZoom(1)}
                      >
                        <Maximize2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
                <div className="product-canvas-stage">
                  {searchOpen && (
                    <div className="product-canvas-search">
                      <Search size={15} />
                      <input
                        autoFocus
                        aria-label="Search workflow nodes"
                        placeholder="Search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                      />
                      <button
                        type="button"
                        aria-label="Close search"
                        onClick={() => {
                          setSearchOpen(false);
                          setQuery("");
                        }}
                      >
                        <X size={13} />
                      </button>
                    </div>
                  )}
                  <ProductCanvasGraph
                    running={running}
                    onInteract={() => setPaused(true)}
                    phase={run.phase}
                    cycle={run.cycle}
                    nodes={nodes}
                    zoom={zoom}
                    query={query}
                    onNode={(index) => {
                      setNode(index);
                      openPanel(
                        index === 4 && run.phase === 6 ? "leads" : "node",
                      );
                    }}
                  />
                  <div className="product-canvas-caption">
                    {zoom > 1
                      ? `${Math.round(zoom * 100)}% · scroll to explore`
                      : "Drag to arrange · click to explore"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Dialog.Root
          open={panel !== null}
          onOpenChange={(open) => {
            if (!open) setPanel(null);
          }}
        >
          {portal && (
            <Dialog.Portal
              container={
                mobile
                  ? (root.current?.closest<HTMLElement>(".figma-site") ??
                    undefined)
                  : portal
              }
            >
              <div className="product-demo product-dialog-root">
                <Dialog.Overlay className="product-panel-backdrop" />
                <Dialog.Content
                  className={`product-panel product-panel-${panel}`}
                  onCloseAutoFocus={(event) => {
                    event.preventDefault();
                    lastFocus.current?.focus({ preventScroll: true });
                  }}
                >
                  <Dialog.Close
                    className="product-panel-close"
                    aria-label="Close panel"
                  >
                    <X size={19} />
                  </Dialog.Close>
                  <Dialog.Title className="product-panel-title">
                    {panel === "history"
                      ? "Recent Activities"
                      : panel === "leads"
                        ? "11 Company Lead"
                        : nodes[node].detail}
                  </Dialog.Title>
                  <Dialog.Description className="product-panel-description">
                    {panel === "history"
                      ? "Revisit a workflow from this demo session."
                      : panel === "leads"
                        ? "Explore the sample shortlist. Search, select, save or export the example results."
                        : "A step in your connected GTM workflow."}
                  </Dialog.Description>
                  {panel === "history" && (
                    <>
                      <label className="product-search-field">
                        <Search size={16} />
                        <input
                          aria-label="Search recent activities"
                          placeholder="Search"
                          value={historyQuery}
                          onChange={(event) =>
                            setHistoryQuery(event.target.value)
                          }
                        />
                      </label>
                      <p className="product-history-date">This session</p>
                      <div className="product-history-list">
                        {historyItems
                          .filter((item) =>
                            item.prompt
                              .toLowerCase()
                              .includes(historyQuery.toLowerCase()),
                          )
                          .map((item) => (
                            <button
                              type="button"
                              key={item.prompt}
                              onClick={() => {
                                setModel(item.model);
                                start(item.prompt, item.model);
                              }}
                            >
                              <span>{item.prompt}</span>
                              <small>
                                {item.model}
                                <ArrowRight size={14} />
                              </small>
                            </button>
                          ))}
                      </div>
                      {!historyItems.some((item) =>
                        item.prompt
                          .toLowerCase()
                          .includes(historyQuery.toLowerCase()),
                      ) && (
                        <p className="product-empty">No matching workflows.</p>
                      )}
                    </>
                  )}
                  {panel === "leads" && (
                    <LeadTable
                      scenario={run.scenario}
                      saved={savedRuns.has(run.prompt)}
                      onSavedChange={() =>
                        setSavedRuns((previous) => {
                          const next = new Set(previous);
                          if (next.has(run.prompt)) next.delete(run.prompt);
                          else next.add(run.prompt);
                          return next;
                        })
                      }
                    />
                  )}
                  {panel === "node" && (
                    <div className="product-node-detail">
                      <span className="product-detail-eyebrow">
                        {nodes[node].label}
                      </span>
                      <p>{nodes[node].text}</p>
                      <span className="product-detail-status">
                        <Check size={14} />
                        {node === 4 && run.phase !== 6
                          ? "Review required"
                          : "Generated in the demo"}
                      </span>
                      {node === 4 && run.phase === 5 && (
                        <button
                          type="button"
                          className="product-black-button"
                          onClick={() => {
                            approve();
                            setPanel("leads");
                          }}
                        >
                          Approve & open lead list <ArrowRight size={15} />
                        </button>
                      )}
                    </div>
                  )}
                </Dialog.Content>
              </div>
            </Dialog.Portal>
          )}
        </Dialog.Root>
      </div>
      <p className="product-demo-disclaimer">
        Interactive preview · sample data and simulated AI.
      </p>
    </div>
  );
}
