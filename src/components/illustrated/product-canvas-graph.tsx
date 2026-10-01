"use client";

import {
  useLayoutEffect,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowUpRight,
  Check,
  GripVertical,
  ListFilter,
  Radar,
  ScanLine,
  Target,
  Users,
} from "lucide-react";
import { ProductIcon } from "./product-canvas-icon";
import type { ProductNode } from "./product-canvas-data";

type Point = { x: MotionValue<number>; y: MotionValue<number> };
type Side = "left" | "right" | "top" | "bottom";
const desktopPositions = [
  [56, 105],
  [354, 320],
  [657, 76],
  [641, 526],
  [641, 757],
];
const compactPositions = [
  [10, 42],
  [193, 253],
  [193, 42],
  [10, 464],
  [193, 676],
];
const phonePositions = [
  [18, 18],
  [42, 176],
  [18, 334],
  [42, 492],
  [18, 650],
];
const revealPhase = [2, 3, 4, 4, 5];
const nodeIcons = [Target, ScanLine, Radar, Users, ListFilter];
const metrics = [
  "Profile defined",
  "11 matches",
  "3 signal sources",
  "Buyers identified",
  "Ready to explore",
];
const tags = [
  "IDEAL CUSTOMER",
  "ACCOUNT RESEARCH",
  "INTENT SIGNALS",
  "QUALIFICATION",
  "YOUR NEXT MOVE",
];

function usePoint(x: number, y: number): Point {
  const mx = useMotionValue(x);
  const my = useMotionValue(y);
  return { x: mx, y: my };
}
function port(point: Point, side: Side, width: number, height: number) {
  const x = point.x.get();
  const y = point.y.get();
  return side === "left"
    ? [x, y + height / 2, -1, 0]
    : side === "right"
      ? [x + width, y + height / 2, 1, 0]
      : side === "top"
        ? [x + width / 2, y, 0, -1]
        : [x + width / 2, y + height, 0, 1];
}
function Cable({
  from,
  to,
  fromSide,
  toSide,
  compact,
  phone,
  output,
  visible,
  active,
}: {
  from: Point;
  to: Point;
  fromSide: Side;
  toSide: Side;
  compact: boolean;
  phone: boolean;
  output: boolean;
  visible: boolean;
  active: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const width = phone ? 260 : compact ? 144 : 198;
  const height = phone ? 124 : compact ? 170 : 178;
  const path = useTransform(() => {
    const [x1, y1, dx1, dy1] = port(from, fromSide, width, height);
    const [x2, y2, dx2, dy2] = port(
      to,
      toSide,
      width,
      output ? (phone ? 116 : 130) : height,
    );
    if (phone && fromSide === "left" && toSide === "left") {
      const lane = Math.max(4, Math.min(x1, x2) - 38);
      return `M${x1} ${y1} Q${lane} ${y1} ${lane} ${y1 + 20} L${lane} ${y2 - 20} Q${lane} ${y2} ${x2} ${y2}`;
    }
    const bend = Math.max(
      36,
      Math.min(160, Math.hypot(x2 - x1, y2 - y1) * 0.45),
    );
    return `M${x1} ${y1} C${x1 + dx1 * bend} ${y1 + dy1 * bend}, ${x2 + dx2 * bend} ${y2 + dy2 * bend}, ${x2} ${y2}`;
  });
  return (
    <g>
      <motion.path
        d={path}
        className="product-cable"
        initial={false}
        animate={{ pathLength: visible ? 1 : 0, opacity: visible ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.7 }}
      />
      {visible && (
        <motion.path
          d={path}
          className="product-cable-flow"
          data-active={active}
          pathLength={1}
        />
      )}
    </g>
  );
}

function CanvasNode({
  point,
  index,
  node,
  phase,
  compact,
  phone,
  scale,
  bounds,
  onNode,
  onMove,
}: {
  point: Point;
  index: number;
  node: ProductNode;
  phase: number;
  compact: boolean;
  phone: boolean;
  scale: number;
  bounds: [number, number];
  onNode: () => void;
  onMove: () => void;
}) {
  const drag = useRef<{
    x: number;
    y: number;
    px: number;
    py: number;
    moved: boolean;
  } | null>(null);
  const [dragging, setDragging] = useState(false);
  const reducedMotion = useReducedMotion();
  const visible = phase >= revealPhase[index];
  const working = phase === revealPhase[index] && phase < 5;
  const Icon = nodeIcons[index];
  const move = (x: number, y: number) => {
    point.x.stop();
    point.y.stop();
    point.x.set(
      Math.max(
        8,
        Math.min(bounds[0] - (phone ? 260 : compact ? 144 : 198) - 8, x),
      ),
    );
    point.y.set(
      Math.max(
        8,
        Math.min(
          bounds[1] -
            (index === 4
              ? phone
                ? 116
                : 130
              : phone
                ? 124
                : compact
                  ? 170
                  : 178) -
            8,
          y,
        ),
      ),
    );
  };
  const endDrag = (event: PointerEvent<HTMLButtonElement>) => {
    drag.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  };
  return (
    <motion.div
      className="product-node"
      data-output={index === 4}
      data-working={working}
      data-dragging={dragging}
      role="group"
      aria-hidden={!visible}
      aria-label={node.label}
      style={{
        x: point.x,
        y: point.y,
        pointerEvents: visible ? "auto" : "none",
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.95 }}
      transition={{ duration: reducedMotion ? 0 : 0.4 }}
    >
      <button
        type="button"
        className="product-node-drag"
        tabIndex={visible ? 0 : -1}
        aria-label={`Move ${node.label} node`}
        title="Drag to move. Use arrow keys when focused."
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          point.x.stop();
          point.y.stop();
          drag.current = {
            x: point.x.get(),
            y: point.y.get(),
            px: event.clientX,
            py: event.clientY,
            moved: false,
          };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          const current = drag.current;
          if (!current) return;
          const dx = (event.clientX - current.px) / scale;
          const dy = (event.clientY - current.py) / scale;
          if (!current.moved && Math.hypot(dx, dy) < 3) return;
          if (!current.moved) {
            current.moved = true;
            setDragging(true);
            onMove();
          }
          move(current.x + dx, current.y + dy);
        }}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={() => {
          drag.current = null;
          setDragging(false);
        }}
        onKeyDown={(event) => {
          const direction = {
            ArrowLeft: [-1, 0],
            ArrowRight: [1, 0],
            ArrowUp: [0, -1],
            ArrowDown: [0, 1],
          }[event.key];
          if (!direction) return;
          event.preventDefault();
          onMove();
          const step = event.shiftKey ? 24 : 12;
          move(
            point.x.get() + direction[0] * step,
            point.y.get() + direction[1] * step,
          );
        }}
      >
        <span className="product-node-symbol" data-kind={index}>
          <Icon size={15} strokeWidth={1.6} />
        </span>
        <span>{node.label}</span>
        <GripVertical size={12} className="product-node-grip" />
      </button>
      <button
        type="button"
        className="product-node-open"
        tabIndex={visible ? 0 : -1}
        aria-label={`Open ${node.detail}`}
        onClick={onNode}
      >
        {index === 4 ? (
          <span className="product-node-result">
            <strong>11</strong>
            <span>
              qualified
              <br />
              companies
            </span>
            <ArrowUpRight size={18} />
          </span>
        ) : (
          <>
            <span className="product-node-eyebrow">{tags[index]}</span>
            <span className="product-node-copy">{node.summary}</span>
          </>
        )}
        <span className="product-node-status">
          {working ? <i /> : <Check size={10} />}{" "}
          {working ? "Working…" : metrics[index]}
        </span>
      </button>
      <span className="product-node-port product-node-port-in" />
      <span className="product-node-port product-node-port-out" />
    </motion.div>
  );
}

function GraphScene({
  compact,
  phone,
  phase,
  cycle,
  nodes,
  scale,
  query,
  running,
  onNode,
  onInteract,
}: {
  compact: boolean;
  phone: boolean;
  phase: number;
  cycle: number;
  nodes: ProductNode[];
  scale: number;
  query: string;
  running: boolean;
  onNode: (index: number) => void;
  onInteract: () => void;
}) {
  const bases = phone
    ? phonePositions
    : compact
      ? compactPositions
      : desktopPositions;
  const p0 = usePoint(bases[0][0], bases[0][1]);
  const p1 = usePoint(bases[1][0], bases[1][1]);
  const p2 = usePoint(bases[2][0], bases[2][1]);
  const p3 = usePoint(bases[3][0], bases[3][1]);
  const p4 = usePoint(bases[4][0], bases[4][1]);
  const points = [p0, p1, p2, p3, p4];
  const manuallyMoved = useRef(new Set<number>());
  const reducedMotion = useReducedMotion();
  const width = phone ? 320 : compact ? 350 : 973;
  const height = phone ? 800 : compact ? 830 : 925;
  // Motion values drive both cards and SVG cables without a React render per frame.
  useEffect(() => {
    if (!running || reducedMotion) return;
    const drift = phone
      ? [
          [3, 0],
          [-3, 0],
          [3, 0],
          [-3, 0],
          [3, 0],
        ]
      : compact
        ? [
            [2, 0],
            [-3, 6],
            [0, 4],
            [3, 0],
            [-3, 0],
          ]
        : [
            [20, -12],
            [24, -20],
            [0, 18],
            [-15, -18],
            [-15, -22],
          ];
    const animations = points.flatMap((point, i) => {
      if (manuallyMoved.current.has(i)) return [];
      const target = phase >= 4 ? drift[i] : [0, 0];
      return [
        animate(point.x, bases[i][0] + target[0], {
          duration: 1.4,
          ease: [0.22, 1, 0.36, 1],
        }),
        animate(point.y, bases[i][1] + target[1], {
          duration: 1.4,
          ease: [0.22, 1, 0.36, 1],
        }),
      ];
    });
    return () => animations.forEach((animation) => animation.stop());
    // Points are stable motion values; a keyed scene resets them for each demo cycle.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, running, reducedMotion, compact, phone]);
  const cables: [number, number, Side, Side, number][] = phone
    ? [
        [0, 1, "bottom", "top", 3],
        [1, 2, "bottom", "top", 4],
        [1, 3, "left", "left", 4],
        [3, 4, "bottom", "top", 5],
      ]
    : compact
      ? [
          [0, 1, "right", "left", 3],
          [1, 2, "top", "bottom", 4],
          [1, 3, "left", "right", 4],
          [3, 4, "bottom", "left", 5],
        ]
      : [
          [0, 1, "right", "left", 3],
          [1, 2, "top", "left", 4],
          [1, 3, "right", "top", 4],
          [3, 4, "bottom", "top", 5],
        ];
  return (
    <div
      className="product-graph-scene"
      data-compact={compact}
      data-phone={phone}
      style={{ width, height, transform: `scale(${scale})` }}
    >
      <svg
        className="product-live-connections"
        width={width}
        height={height}
        fill="none"
        aria-hidden="true"
      >
        {cables.map(([from, to, fromSide, toSide, at], i) => (
          <Cable
            key={`${cycle}-${i}`}
            from={points[from]}
            to={points[to]}
            fromSide={fromSide}
            toSide={toSide}
            compact={compact}
            phone={phone}
            output={to === 4}
            visible={phase >= at}
            active={running && phase >= at && phase <= 5}
          />
        ))}
      </svg>
      {nodes.map((node, i) => (
        <div
          key={i}
          className="product-node-filter"
          data-match={
            !query ||
            `${node.label} ${node.text} ${node.detail}`
              .toLowerCase()
              .includes(query.toLowerCase())
          }
        >
          <CanvasNode
            point={points[i]}
            index={i}
            node={node}
            phase={phase}
            compact={compact}
            phone={phone}
            scale={scale}
            bounds={[width, height]}
            onNode={() => onNode(i)}
            onMove={() => {
              manuallyMoved.current.add(i);
              onInteract();
            }}
          />
        </div>
      ))}
      {phase < 2 && (
        <motion.div
          className="product-graph-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span className="product-graph-start-orbit">
            <ProductIcon name="imgGroup1437254398" size={30} />
          </span>
          <span>A brief. A plan. Your next move.</span>
          <small>Watch Orka connect the dots.</small>
        </motion.div>
      )}
    </div>
  );
}

export function ProductCanvasGraph({
  phase,
  cycle,
  nodes,
  zoom,
  query,
  running,
  onNode,
  onInteract,
}: {
  phase: number;
  cycle: number;
  nodes: ProductNode[];
  zoom: number;
  query: string;
  running: boolean;
  onNode: (index: number) => void;
  onInteract: () => void;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 700, height: 700, phone: false });
  useLayoutEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const resize = () => {
      if (element.clientWidth)
        setSize({
          width: element.clientWidth,
          height: element.clientHeight,
          phone: window.matchMedia("(max-width: 767px)").matches,
        });
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const phone = size.phone;
  const compact = phone || size.width < 600;
  const sceneWidth = phone ? 320 : compact ? 350 : 973;
  const sceneHeight = phone ? 800 : compact ? 830 : 925;
  const scale =
    Math.min(
      size.width / sceneWidth,
      size.height / sceneHeight,
      phone ? 1.15 : Infinity,
    ) * zoom;
  const found = nodes.filter((node) =>
    `${node.label} ${node.text} ${node.detail}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  ).length;
  return (
    <div
      ref={viewport}
      className="product-graph-viewport"
      data-zoomed={zoom > 1}
      tabIndex={zoom > 1 ? 0 : -1}
      aria-label="Workflow canvas. Drag node headers to move them, or use arrow keys on a focused header."
    >
      <div
        className="product-graph-extent"
        style={{
          width: sceneWidth * scale,
          height: sceneHeight * scale,
          marginInline: zoom === 1 ? "auto" : 0,
        }}
      >
        <GraphScene
          key={`${cycle}-${compact}-${phone}`}
          compact={compact}
          phone={phone}
          phase={phase}
          cycle={cycle}
          nodes={nodes}
          scale={scale}
          query={query}
          running={running}
          onNode={onNode}
          onInteract={onInteract}
        />
      </div>
      {query && (
        <div className="product-search-count" role="status">
          {found
            ? `${found} matching nodes`
            : "No matching nodes. Try “ICP” or “lead”."}
        </div>
      )}
    </div>
  );
}
