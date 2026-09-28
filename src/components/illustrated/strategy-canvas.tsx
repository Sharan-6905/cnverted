"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type PointerEvent,
} from "react";
import Image from "next/image";
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  ChevronDown,
  Compass,
  Download,
  Flag,
  GitBranch,
  GripVertical,
  Layers2,
  Loader2,
  MessageSquare,
  RotateCcw,
  Play,
  Square,
  Target,
  X,
  BarChart3,
} from "lucide-react";
import { STRATEGY_EXAMPLES } from "./strategy-demo-data";
import {
  buildDemoPlan,
  DEMO_MODELS,
  initialDemoPlan,
  NODE_LABELS,
  type DemoPlan,
} from "./strategy-demo-engine";

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
  model?: string;
  updated?: boolean;
};
type Phase = "draft" | "running" | "ready" | "stopped";
type Run = { plan: DemoPlan; model: string };
type Position = { x: number; y: number };
const startingPositions: Position[] = [
  { x: 5, y: 35 },
  { x: 56, y: 35 },
  { x: 5, y: 275 },
  { x: 56, y: 275 },
  { x: 30.5, y: 515 },
];
const nodeIcons = [Target, Compass, GitBranch, Flag, BarChart3];
const runLabels = [
  "Defining your ideal customer",
  "Shaping the positioning",
  "Connecting the channels",
  "Mapping the launch",
  "Adding success metrics",
];
const refinements = [
  "Focus on LinkedIn",
  "Make it a 30-day plan",
  "Add success metrics",
];

export function StrategyCanvas() {
  const [modelId, setModelId] = useState<string>("sonnet");
  const [lastRunModel, setLastRunModel] = useState("Sonnet");
  const [plan, setPlan] = useState<DemoPlan>(() => initialDemoPlan());
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<Phase>("draft");
  const [run, setRun] = useState<Run | null>(null);
  const [completed, setCompleted] = useState(0);
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [positions, setPositions] = useState(startingPositions);
  const [canvasWidth, setCanvasWidth] = useState(720);
  const [canvasTab, setCanvasTab] = useState<"canvas" | "activity">("canvas");
  const [mobileTab, setMobileTab] = useState<"chat" | "canvas">("chat");
  const [announcement, setAnnouncement] = useState("");
  const sequence = useRef(0);
  const map = useRef<HTMLDivElement>(null);
  const transcript = useRef<HTMLDivElement>(null);
  const inspector = useRef<HTMLDivElement>(null);
  const drag = useRef<{
    index: number;
    clientX: number;
    clientY: number;
    position: Position;
  } | null>(null);
  const model =
    DEMO_MODELS.find((item) => item.id === modelId) ?? DEMO_MODELS[2];
  const busy = phase === "running";
  const mapHeight = plan.nodes.length > 4 ? 710 : 505;

  useEffect(() => {
    const element = map.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width > 0) setCanvasWidth(entry.contentRect.width);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [canvasTab, mobileTab]);

  useEffect(() => {
    if (!run) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const timers = run.plan.nodes.map((_, index) =>
      setTimeout(
        () => {
          setCompleted(index + 1);
          if (index === run.plan.nodes.length - 1) {
            setPhase("ready");
            setRun(null);
            setMessages((items) => [
              ...items,
              {
                id: ++sequence.current,
                role: "assistant",
                text: run.plan.response,
                model: run.model,
                updated: true,
              },
            ]);
            setAnnouncement(
              `Demo complete. ${run.plan.nodes.length} connected nodes are ready to explore.`,
            );
          }
        },
        reduced ? 0 : 800 * (index + 1),
      ),
    );
    return () => timers.forEach(clearTimeout);
  }, [run]);

  useEffect(() => {
    const element = transcript.current;
    if (element) element.scrollTop = element.scrollHeight;
  }, [messages, phase]);

  function execute(
    message: string,
    scenario?: number,
    existingPlan?: DemoPlan,
  ) {
    if (busy || !message.trim()) return;
    const next =
      existingPlan ??
      buildDemoPlan(message.trim().slice(0, 600), plan, scenario);
    setPlan(next);
    setInput("");
    setCompleted(0);
    setSelectedNode(null);
    if (scenario !== undefined || phase === "draft")
      setPositions(startingPositions);
    setCanvasTab("canvas");
    setPhase("running");
    setMessages((items) => [
      ...items.slice(-19),
      {
        id: ++sequence.current,
        role: "user",
        text: message.trim().slice(0, 600),
      },
    ]);
    setRun({ plan: next, model: model.name });
    setLastRunModel(model.name);
    setAnnouncement(
      `Running the ${model.name} demo. Building ${next.nodes.length} connected strategy nodes.`,
    );
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    execute(input);
  }
  function stop() {
    setRun(null);
    setPhase("stopped");
    setMessages((items) => [
      ...items,
      {
        id: ++sequence.current,
        role: "assistant",
        text: "Demo stopped. Your brief is still here. Run the canvas again, or send a new direction.",
        model: model.name,
      },
    ]);
    setAnnouncement("Demo stopped.");
  }
  function reset() {
    setRun(null);
    setPhase("draft");
    setPlan(initialDemoPlan());
    setMessages([]);
    setCompleted(0);
    setSelectedNode(null);
    setInput("");
    setPositions(startingPositions);
    setCanvasTab("canvas");
    setMobileTab("chat");
    setAnnouncement("Demo reset. Choose a playbook or send a brief.");
  }
  function openNode(index: number) {
    setSelectedNode(index);
    setAnnouncement(`${NODE_LABELS[index]} details opened.`);
    requestAnimationFrame(() => {
      if (window.matchMedia("(max-width: 700px)").matches)
        inspector.current?.scrollIntoView({
          block: "nearest",
          behavior: "auto",
        });
    });
  }
  function closeNode() {
    const index = selectedNode;
    setSelectedNode(null);
    requestAnimationFrame(() => {
      if (index !== null)
        map.current
          ?.querySelectorAll<HTMLButtonElement>(".gtm-execution-node-content")
          [index]?.focus({ preventScroll: true });
    });
  }
  function exportPlan() {
    const content = [
      `# GTM strategy — demo plan`,
      ``,
      `Brief: ${plan.brief}`,
      `Selected demo model: ${model.name}`,
      ``,
      ...plan.nodes.flatMap((node, index) => [
        `## ${NODE_LABELS[index]}`,
        node.title,
        node.detail,
        `Next step: ${node.action}`,
        ``,
      ]),
    ].join("\n");
    const url = URL.createObjectURL(
      new Blob([content], { type: "text/markdown;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "cnvrted-demo-strategy.md";
    link.hidden = true;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setAnnouncement(
      "Your Markdown export is ready. Check your browser downloads.",
    );
  }
  function beginDrag(event: PointerEvent<HTMLButtonElement>, index: number) {
    if (event.button !== 0 || event.pointerType === "touch") return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = {
      index,
      clientX: event.clientX,
      clientY: event.clientY,
      position: positions[index],
    };
  }
  function moveDrag(event: PointerEvent<HTMLButtonElement>) {
    const start = drag.current;
    if (!start) return;
    const x = Math.min(
      57,
      Math.max(
        2,
        start.position.x +
          ((event.clientX - start.clientX) / canvasWidth) * 100,
      ),
    );
    const y = Math.min(
      mapHeight - 170,
      Math.max(12, start.position.y + event.clientY - start.clientY),
    );
    setPositions((items) =>
      items.map((item, index) => (index === start.index ? { x, y } : item)),
    );
  }
  function wire(from: number, to: number, vertical = false) {
    const a = positions[from];
    const b = positions[to];
    const width = canvasWidth * 0.39;
    const ax = (canvasWidth * a.x) / 100;
    const bx = (canvasWidth * b.x) / 100;
    if (vertical) {
      const middle = (a.y + 150 + b.y) / 2;
      return `M${ax + width / 2} ${a.y + 150} C${ax + width / 2} ${middle} ${bx + width / 2} ${middle} ${bx + width / 2} ${b.y}`;
    }
    const middle = (ax + width + bx) / 2;
    return `M${ax + width} ${a.y + 75} C${middle} ${a.y + 75} ${middle} ${b.y + 75} ${bx} ${b.y + 75}`;
  }

  return (
    <div
      className="design-strategy-board gtm-demo"
      id="strategy-demo"
      data-mobile-tab={mobileTab}
    >
      <div className="gtm-demo-topbar">
        <div className="gtm-demo-brand">
          <span className="gtm-logo-mark">c</span>
          <strong>Cnvrted</strong>
          <span className="gtm-slash">/</span>
          <span>GTM workspace</span>
        </div>
        <div className="gtm-demo-top-actions">
          <span className="gtm-demo-badge">
            <i />
            Interactive demo
          </span>
          <button type="button" onClick={reset} aria-label="Reset demo">
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        </div>
      </div>
      <div
        className="gtm-mobile-tabs"
        role="group"
        aria-label="Demo workspace view"
      >
        <button
          type="button"
          aria-pressed={mobileTab === "chat"}
          aria-controls="gtm-chat-panel"
          onClick={() => setMobileTab("chat")}
        >
          <MessageSquare size={14} />
          Copilot
        </button>
        <button
          type="button"
          aria-pressed={mobileTab === "canvas"}
          aria-controls="gtm-canvas-panel"
          onClick={() => setMobileTab("canvas")}
        >
          <Layers2 size={14} />
          Canvas{" "}
          <span>
            {completed}/{plan.nodes.length}
          </span>
        </button>
      </div>
      <div className="gtm-demo-body">
        <div className="gtm-chat-panel" id="gtm-chat-panel">
          <div className="gtm-chat-header">
            <span className="gtm-chat-orb">
              <MessageSquare size={17} />
            </span>
            <div>
              <strong>Your GTM copilot</strong>
              <span>Think it through. Put it in motion.</span>
            </div>
          </div>
          <div
            className="gtm-transcript"
            ref={transcript}
            aria-label="Demo conversation"
          >
            {messages.length === 0 ? (
              <div className="gtm-chat-welcome">
                <span className="gtm-small-label">
                  A GOOD PLAN STARTS WITH A QUESTION.
                </span>
                <h3>
                  What are we
                  <br />
                  building next?
                </h3>
                <p>
                  Bring a goal. Pick a model. Let’s turn your next move into a
                  connected plan.
                </p>
                <div className="gtm-chat-starters">
                  {STRATEGY_EXAMPLES.map((item, index) => (
                    <button
                      type="button"
                      key={item.title}
                      onClick={() => execute(item.brief, index)}
                    >
                      <Image
                        src={item.image}
                        alt=""
                        width={46}
                        height={46}
                        sizes="46px"
                      />
                      <span>
                        <strong>{item.title}</strong>
                        <small>{item.description}</small>
                      </span>
                      <ArrowUpRight size={13} />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  className={`gtm-message gtm-message-${message.role}`}
                  key={message.id}
                >
                  <span className="gtm-message-label">
                    {message.role === "user"
                      ? "You"
                      : `Copilot · ${message.model} demo`}
                  </span>
                  <p>{message.text}</p>
                  {message.updated && (
                    <span className="gtm-message-check">
                      <Check size={12} />
                      Canvas updated
                    </span>
                  )}
                </div>
              ))
            )}
            {busy && (
              <div className="gtm-chat-running">
                <Loader2 size={15} />
                <span>
                  {runLabels[completed] ?? "Finishing your canvas"}
                  <small>Sample execution · {run?.model}</small>
                </span>
              </div>
            )}
          </div>
          {messages.length > 0 && !busy && (
            <div className="gtm-refinements" aria-label="Refine your demo plan">
              {refinements.map((prompt) => (
                <button
                  type="button"
                  key={prompt}
                  onClick={() => execute(prompt)}
                >
                  {prompt}
                  <ArrowUpRight size={11} />
                </button>
              ))}
            </div>
          )}
          <form className="gtm-composer" onSubmit={submit}>
            <label className="sr-only" htmlFor="gtm-demo-prompt">
              Message your GTM copilot
            </label>
            <textarea
              id="gtm-demo-prompt"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Describe your product or next goal…"
              maxLength={600}
              rows={3}
              disabled={busy}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" &&
                  !event.shiftKey &&
                  !event.nativeEvent.isComposing
                ) {
                  event.preventDefault();
                  execute(input);
                }
              }}
            />
            <div className="gtm-composer-controls">
              <div className="gtm-model-picker">
                {model.logo ? (
                  <Image src={model.logo} alt="" width={18} height={18} />
                ) : (
                  <span className="gtm-fable-mark">f</span>
                )}
                <label className="sr-only" htmlFor="gtm-demo-model">
                  Choose a demo model
                </label>
                <select
                  id="gtm-demo-model"
                  value={modelId}
                  disabled={busy}
                  onChange={(event) => {
                    setModelId(event.target.value);
                    setAnnouncement(
                      `Demo model changed to ${DEMO_MODELS.find((item) => item.id === event.target.value)?.name}.`,
                    );
                  }}
                >
                  {DEMO_MODELS.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.family} · {item.name}
                    </option>
                  ))}
                </select>
                <ChevronDown size={12} />
              </div>
              {busy ? (
                <button
                  type="button"
                  className="gtm-send"
                  onClick={stop}
                  aria-label="Stop demo execution"
                >
                  <Square size={14} fill="currentColor" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="gtm-send"
                  disabled={!input.trim()}
                  aria-label="Send message"
                >
                  <ArrowUp size={18} />
                </button>
              )}
            </div>
          </form>
          <p className="gtm-demo-disclosure">
            Demo mode · sample responses, no live AI calls.
          </p>
        </div>
        <div className="gtm-canvas-panel" id="gtm-canvas-panel">
          <div className="gtm-canvas-toolbar">
            <div
              className="gtm-view-switch"
              role="group"
              aria-label="Canvas view"
            >
              <button
                type="button"
                aria-pressed={canvasTab === "canvas"}
                onClick={() => setCanvasTab("canvas")}
              >
                <Layers2 size={14} />
                Canvas
              </button>
              <button
                type="button"
                aria-pressed={canvasTab === "activity"}
                onClick={() => setCanvasTab("activity")}
              >
                <GitBranch size={14} />
                Activity{busy && <i />}
              </button>
            </div>
            <div className="gtm-canvas-actions">
              <button
                type="button"
                className="gtm-icon-button"
                onClick={exportPlan}
                disabled={phase === "draft" || busy}
                aria-label="Export demo strategy"
              >
                <Download size={14} />
              </button>
              <button
                type="button"
                className="gtm-run-button"
                disabled={busy}
                onClick={() =>
                  execute("Run my current canvas", undefined, {
                    ...plan,
                    response:
                      "Your current demo canvas has finished running. Your edits and connected nodes are preserved. Choose a node to refine it, or export the plan.",
                  })
                }
              >
                {busy ? (
                  <Loader2 size={12} />
                ) : (
                  <Play size={12} fill="currentColor" />
                )}
                {busy ? "Running" : "Run canvas"}
              </button>
            </div>
          </div>
          <div className="gtm-canvas-context">
            <span>
              {phase === "draft" ? "YOUR NEXT MOVE" : "CURRENT BRIEF"}
            </span>
            <p>
              {phase === "draft"
                ? "A strategy you can actually work with."
                : plan.brief}
            </p>
            <small>
              {phase === "draft"
                ? "Choose a starter or send a message to bring this canvas to life."
                : "Select a node to refine its title and next action. Your changes stay in the plan."}
            </small>
          </div>
          <div className="gtm-canvas-scroll">
            {canvasTab === "activity" ? (
              <div className="gtm-activity">
                <h3>Execution, step by step.</h3>
                <p>
                  {phase === "draft"
                    ? "Send a brief to see the demo build your plan."
                    : `Selected model: ${lastRunModel} · sample execution`}
                </p>
                <ol>
                  {plan.nodes.map((node, index) => (
                    <li
                      key={index}
                      data-state={
                        completed > index
                          ? "done"
                          : busy && completed === index
                            ? "running"
                            : "queued"
                      }
                    >
                      <span>
                        {completed > index ? (
                          <Check size={14} />
                        ) : busy && completed === index ? (
                          <Loader2 size={14} />
                        ) : (
                          index + 1
                        )}
                      </span>
                      <div>
                        <strong>{runLabels[index]}</strong>
                        <small>
                          {completed > index
                            ? node.title
                            : busy && completed === index
                              ? "Building this node…"
                              : "Waiting for execution"}
                        </small>
                      </div>
                      <em>
                        {completed > index
                          ? "Done"
                          : busy && completed === index
                            ? "Running"
                            : "Queued"}
                      </em>
                    </li>
                  ))}
                </ol>
                {phase === "ready" && (
                  <div className="gtm-activity-result">
                    <Check size={16} />
                    {completed} nodes connected. Your demo plan is ready.
                  </div>
                )}
              </div>
            ) : (
              <div
                className="gtm-execution-map"
                ref={map}
                style={{ height: mapHeight }}
              >
                <svg
                  className="gtm-execution-wires"
                  viewBox={`0 0 ${canvasWidth} ${mapHeight}`}
                  fill="none"
                  aria-hidden="true"
                >
                  {[
                    [0, 1, false],
                    [1, 2, true],
                    [2, 3, false],
                    ...(plan.nodes.length > 4 ? [[3, 4, true]] : []),
                  ].map(([from, to, vertical], index) => (
                    <g
                      key={index}
                      data-active={busy && completed === Number(to)}
                      data-complete={completed > Number(to)}
                    >
                      <path
                        d={wire(Number(from), Number(to), !!vertical)}
                        className="gtm-wire-base"
                      />
                      <path
                        d={wire(Number(from), Number(to), !!vertical)}
                        className="gtm-wire-active"
                        pathLength="100"
                      />
                    </g>
                  ))}
                </svg>
                {plan.nodes.map((node, index) => {
                  const Icon = nodeIcons[index];
                  const state =
                    completed > index
                      ? "done"
                      : busy && completed === index
                        ? "running"
                        : "queued";
                  return (
                    <article
                      className="gtm-execution-node"
                      key={index}
                      data-index={index}
                      data-state={state}
                      data-selected={selectedNode === index}
                      style={{
                        left: `${positions[index].x}%`,
                        top: positions[index].y,
                      }}
                    >
                      <div className="gtm-execution-node-header">
                        <span>
                          <Icon size={14} />
                          {NODE_LABELS[index]}
                        </span>
                        <button
                          type="button"
                          className="gtm-drag-handle"
                          aria-label={`Move ${NODE_LABELS[index]} node`}
                          title="Drag to move, or use arrow keys"
                          onPointerDown={(event) => beginDrag(event, index)}
                          onPointerMove={moveDrag}
                          onPointerUp={() => {
                            drag.current = null;
                          }}
                          onPointerCancel={() => {
                            drag.current = null;
                          }}
                          onKeyDown={(event) => {
                            if (
                              ![
                                "ArrowLeft",
                                "ArrowRight",
                                "ArrowUp",
                                "ArrowDown",
                              ].includes(event.key)
                            )
                              return;
                            event.preventDefault();
                            setPositions((items) =>
                              items.map((item, i) =>
                                i === index
                                  ? {
                                      x: Math.min(
                                        57,
                                        Math.max(
                                          2,
                                          item.x +
                                            (event.key === "ArrowRight"
                                              ? 2
                                              : event.key === "ArrowLeft"
                                                ? -2
                                                : 0),
                                        ),
                                      ),
                                      y: Math.min(
                                        mapHeight - 170,
                                        Math.max(
                                          12,
                                          item.y +
                                            (event.key === "ArrowDown"
                                              ? 10
                                              : event.key === "ArrowUp"
                                                ? -10
                                                : 0),
                                        ),
                                      ),
                                    }
                                  : item,
                              ),
                            );
                          }}
                        >
                          <GripVertical size={13} />
                        </button>
                      </div>
                      <button
                        type="button"
                        className="gtm-execution-node-content"
                        onClick={() => openNode(index)}
                        aria-label={`Edit ${NODE_LABELS[index]} node`}
                      >
                        <strong>{node.title}</strong>
                        <span>{node.text}</span>
                        <small>
                          {state === "running" ? (
                            <>
                              <Loader2 size={11} />
                              Building…
                            </>
                          ) : state === "done" ? (
                            <>
                              <Check size={11} />
                              Ready to refine
                            </>
                          ) : (
                            <>
                              <span className="gtm-queued-dot" />
                              {phase === "draft" ? "Draft node" : "Queued"}
                            </>
                          )}
                          <ArrowUpRight size={12} />
                        </small>
                      </button>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
          <div className="gtm-canvas-status">
            <span>
              {busy ? (
                <Loader2 size={12} />
              ) : phase === "ready" ? (
                <Check size={12} />
              ) : (
                <span className="gtm-queued-dot" />
              )}
              {phase === "draft"
                ? "Ready for your first idea"
                : phase === "running"
                  ? runLabels[completed]
                  : phase === "stopped"
                    ? "Execution stopped"
                    : "Your plan is ready to refine"}
            </span>
            <span>
              {completed}/{plan.nodes.length} nodes
            </span>
          </div>
          {selectedNode !== null && (
            <div
              className="gtm-node-inspector"
              ref={inspector}
              role="region"
              aria-label={`${NODE_LABELS[selectedNode]} editor`}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  event.stopPropagation();
                  closeNode();
                }
              }}
            >
              <div className="gtm-inspector-heading">
                <span>{NODE_LABELS[selectedNode]}</span>
                <button
                  type="button"
                  onClick={closeNode}
                  aria-label="Close node editor"
                >
                  <X size={17} />
                </button>
              </div>
              <label>
                Node title
                <input
                  value={plan.nodes[selectedNode].title}
                  maxLength={90}
                  disabled={busy}
                  onChange={(event) =>
                    setPlan((current) => ({
                      ...current,
                      nodes: current.nodes.map((node, index) =>
                        index === selectedNode
                          ? { ...node, title: event.target.value }
                          : node,
                      ),
                    }))
                  }
                />
              </label>
              <p>{plan.nodes[selectedNode].detail}</p>
              <label>
                Next action
                <textarea
                  value={plan.nodes[selectedNode].action}
                  rows={3}
                  maxLength={300}
                  disabled={busy}
                  onChange={(event) =>
                    setPlan((current) => ({
                      ...current,
                      nodes: current.nodes.map((node, index) =>
                        index === selectedNode
                          ? { ...node, action: event.target.value }
                          : node,
                      ),
                    }))
                  }
                />
              </label>
              <div className="gtm-inspector-footer">
                <span>
                  <Check size={12} />
                  Edits stay in this demo
                </span>
                <button type="button" onClick={closeNode}>
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <span className="sr-only" role="status">
        {announcement}
      </span>
    </div>
  );
}
