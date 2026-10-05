"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import Image from "next/image";
import {
  ArrowDown,
  Check,
  Globe2,
  Minus,
  TrendingUp,
  UsersRound,
  Building2,
  Rocket,
  Layers3,
  BriefcaseBusiness,
} from "lucide-react";
import { ScaledArtwork } from "./scaled-artwork";
import { assets } from "./assets";
import { MillMechanism } from "./mill-mechanism";
import "./lead-flow.css";

const CYCLE_SECONDS = 8;
const FLOW_PLAYBACK_RATE = 1.2;
// Six evenly spaced packets per original cycle keep two or three on each wire.
const PULSE_SECONDS = CYCLE_SECONDS / FLOW_PLAYBACK_RATE / 6;
const SWAP_SECONDS = 4;
type Source = {
  name: string;
  detail: string;
  image?: string;
  color: string;
  background: string;
};
const sourceLanes: Source[][] = [
  [
    {
      name: "LinkedIn",
      detail: "People & intent",
      image: "/brands/linkedin.svg",
      color: "#0A66C2",
      background: "#e4f1ff",
    },
    {
      name: "X",
      detail: "Live conversations",
      image: "/brands/x.svg",
      color: "#242424",
      background: "#f1f0ed",
    },
    {
      name: "Reddit",
      detail: "Problems & intent",
      image: "/brands/reddit.svg",
      color: "#FF4500",
      background: "#fff0e8",
    },
  ],
  [
    {
      name: "Product Hunt",
      detail: "Product launches",
      image: "/brands/producthunt.svg",
      color: "#da552f",
      background: "#fff0e9",
    },
    {
      name: "GitHub",
      detail: "Projects & tools",
      image: "/brands/github.svg",
      color: "#34383e",
      background: "#f0f1f2",
    },
    {
      name: "G2",
      detail: "Reviews & intent",
      image: "/brands/g2.svg",
      color: "#ff492c",
      background: "#fff0e9",
    },
  ],
  [
    {
      name: "Crunchbase",
      detail: "Funding & growth",
      image: "/brands/crunchbase.svg",
      color: "#0288d1",
      background: "#eaf5fb",
    },
    {
      name: "YouTube",
      detail: "Creator insights",
      image: "/brands/youtube.svg",
      color: "#FF0033",
      background: "#ffefef",
    },
    {
      name: "Company sites",
      detail: "Hiring & expansion",
      color: "#3984b3",
      background: "#e7f3fa",
    },
  ],
];
const models = [
  {
    name: "Claude",
    image: "/brands/claude-color.svg",
    detail: "Understand the context",
    color: "#D97757",
    background: "#fae8de",
    dark: false,
  },
  {
    name: "ChatGPT",
    image: "/brands/openai.svg",
    detail: "Evaluate buying intent",
    color: "#202020",
    background: "#f0f3ee",
    dark: false,
  },
  {
    name: "Kimi",
    image: "/brands/kimi-color.svg",
    detail: "Connect the signals",
    color: "#1783FF",
    background: "#e3efff",
    dark: true,
  },
  {
    name: "Gemini",
    image: "/brands/gemini-color.svg",
    detail: "Score the opportunity",
    color: "#3186FF",
    background: "#e9eeff",
    dark: false,
  },
];
const triggerPairs = [
  [
    { name: "Funding", Icon: TrendingUp },
    { name: "Hiring", Icon: UsersRound },
  ],
  [
    { name: "Expansion", Icon: Building2 },
    { name: "New launches", Icon: Rocket },
  ],
  [
    { name: "New tools", Icon: Layers3 },
    { name: "Leadership", Icon: BriefcaseBusiness },
  ],
];
const rankedLeads = [
  {
    rank: "01",
    score: 97,
    label: "Sales-ready",
    detail: "ICP fit · High intent",
  },
  {
    rank: "02",
    score: 92,
    label: "Strong fit",
    detail: "Growth · Right timing",
  },
  { rank: "03", score: 86, label: "Qualified", detail: "Relevant · In-market" },
];
const workflowTools = [
  {
    name: "HubSpot",
    image: assets.home.imgHubspotIcon1,
    color: "#FF7A59",
    background: "#fff0e9",
  },
  {
    name: "Slack",
    image: assets.home.imgSlackIcon20191,
    color: "#36C5F0",
    background: "#eaf6fb",
  },
  {
    name: "Zapier",
    image: assets.home.imgCdnlogoComZapierLogo1,
    color: "#FF4A00",
    background: "#fff0e7",
  },
];
const brandStyle = ({
  color,
  background,
}: {
  color: string;
  background: string;
}) => ({ "--brand-color": color, "--brand-tint": background }) as CSSProperties;

// Each source has a staggered journey through the mill.
// Straight socket exits turn into smooth curves, all behind the windmill artwork.
const scenes = {
  desktop: {
    width: 1440,
    height: 690,
    incoming: [
      "M 385 217 H 413 C 516 217, 548 425, 686 425 H 720",
      "M 385 329 H 435 C 544 329, 565 425, 686 425 H 720",
      "M 385 441 H 451 C 553 441, 589 425, 686 425 H 720",
    ],
    outgoing: [
      "M 790 425 H 826 C 917 425, 901 217, 1002 217 H 1030",
      "M 790 425 H 846 C 933 425, 921 329, 1002 329 H 1030",
      "M 790 425 H 846 C 926 425, 952 441, 1002 441 H 1030",
    ],
    rejected: "M 655 430 C 615 470, 555 490, 515 525",
  },
  mobile: {
    width: 480,
    height: 1640,
    incoming: [
      "M 396 138 H 408 Q 452 138, 452 182 V 545 C 452 633, 242 631, 242 736 V 760",
      "M 396 246 H 408 Q 438 246, 438 276 V 555 C 438 633, 242 631, 242 736 V 760",
      "M 396 354 H 408 Q 424 354, 424 378 V 565 C 424 633, 242 631, 242 736 V 760",
    ],
    outgoing: [
      "M 242 825 V 950 C 242 998, 20 982, 20 1040 V 1164 Q 20 1196, 40 1196 H 48",
      "M 242 825 V 958 C 242 1006, 28 992, 28 1052 V 1272 Q 28 1304, 40 1304 H 48",
      "M 242 825 V 966 C 242 1014, 36 1002, 36 1064 V 1380 Q 36 1412, 42 1412 H 48",
    ],
    rejected: "M 190 770 C 140 780, 82 813, 58 855",
  },
};

// CSS keeps logo changes on the same pausable timeline as the flowing signals.
// All frames are present up front, so the next logo never waits for a download.
function LogoCycle({
  children,
  phase = 0,
  className = "",
}: {
  children: ReactNode[];
  phase?: number;
  className?: string;
}) {
  return (
    <div
      className={`lead-flow-cycle lead-flow-cycle-${children.length} ${className}`}
    >
      {children.map((child, index) => (
        <div
          key={index}
          className="lead-flow-cycle-frame"
          style={
            {
              "--swap-duration": `${children.length * SWAP_SECONDS}s`,
              "--swap-delay": `${(index - children.length) * SWAP_SECONDS - phase - 0.8}s`,
            } as CSSProperties
          }
        >
          {child}
        </div>
      ))}
    </div>
  );
}

function FlowScene({ mobile = false }: { mobile?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const scene = mobile ? scenes.mobile : scenes.desktop;
  const speed = (mobile ? 180 : 134) * FLOW_PLAYBACK_RATE;
  const pitch = speed * PULSE_SECONDS;
  // Negative delays populate the flow immediately and avoid a blank first cycle.
  const timing = (index: number) =>
    ({ "--flow-delay": `${(-index * CYCLE_SECONDS) / 3}s` }) as CSSProperties;

  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    // Measure once. CSS moves a fixed-size pulse at a constant distance/second,
    // including around bends; port feedback starts when its head reaches the card.
    element
      .querySelectorAll<SVGGElement>("[data-flow-route]")
      .forEach((group) => {
        const path = group.querySelector<SVGPathElement>("path");
        if (!path) return;
        const distance = path.getTotalLength();
        const index = Number(group.dataset.lane);
        const incoming = group.dataset.flowRoute === "in";
        const launch = incoming
          ? 3.2 / FLOW_PLAYBACK_RATE - distance / speed
          : 3.6 / FLOW_PLAYBACK_RATE;
        const arrival = launch + distance / speed;
        const phase = (-index * PULSE_SECONDS) / 3;
        group.style.setProperty(
          "--pulse-delay",
          `${phase + launch - CYCLE_SECONDS / FLOW_PLAYBACK_RATE}s`,
        );
        group.style.setProperty("--pulse-rest", `${-distance * 0.55}px`);
        group.dataset.distance = distance.toFixed(2);
        group.dataset.launch = launch.toFixed(3);
        group.dataset.arrival = arrival.toFixed(3);
        const card = element.querySelector<HTMLElement>(
          incoming
            ? `.lead-flow-source-${index}`
            : `.lead-flow-result-${index}`,
        );
        card?.style.setProperty(
          incoming ? "--send-delay" : "--receive-delay",
          `${phase + (incoming ? launch : arrival) - CYCLE_SECONDS / FLOW_PLAYBACK_RATE}s`,
        );
        // Portraits retain their calmer eight-second cadence; sockets respond
        // to every packet, rather than making the entire card flash each time.
      });
    element.dataset.wiresReady = "true";
  }, [scene, speed]);

  return (
    <div
      ref={root}
      className={`lead-flow-scene lead-flow-scene-${mobile ? "mobile" : "desktop"}`}
      style={
        {
          "--pulse-pitch": `${pitch}px`,
          "--pulse-cycle": `${PULSE_SECONDS}s`,
          "--response-cycle": `${PULSE_SECONDS * 6}s`,
        } as CSSProperties
      }
    >
      <ScaledArtwork width={scene.width} height={scene.height}>
        <div className="lead-flow-backdrop" />
        <div className="lead-flow-output-panel" />
        <div className="lead-flow-heading lead-flow-heading-in">
          <span>01</span>
          <div>
            <strong>Find the signals</strong>
            <small>Social, communities & the open web</small>
          </div>
        </div>
        <div className="lead-flow-heading lead-flow-heading-out">
          <span>03</span>
          <div>
            <strong>Your best-fit leads</strong>
            <small>Qualified. Scored. Prioritized.</small>
          </div>
        </div>

        <svg
          className="lead-flow-tracks"
          viewBox={`0 0 ${scene.width} ${scene.height}`}
          fill="none"
          aria-hidden="true"
        >
          {(["in", "out"] as const).map((direction) =>
            (direction === "in" ? scene.incoming : scene.outgoing).map(
              (path, i) => (
                <g key={path} data-flow-route={direction} data-lane={i}>
                  <path d={path} className="lead-flow-track" />
                  <path
                    d={path}
                    className="lead-flow-pulse lead-flow-pulse-tail"
                  />
                  <path
                    d={path}
                    className="lead-flow-pulse lead-flow-pulse-head"
                  />
                </g>
              ),
            ),
          )}
          <path
            d={scene.rejected}
            className="lead-flow-track lead-flow-track-rejected"
          />
        </svg>

        {sourceLanes.map((lane, i) => (
          <div
            key={i}
            className={`lead-flow-source lead-flow-glass lead-flow-source-${i}`}
            style={timing(i)}
          >
            <LogoCycle phase={i * 0.7}>
              {lane.map((source) => (
                <div
                  key={source.name}
                  className="lead-flow-source-content"
                  style={brandStyle(source)}
                >
                  <span className="lead-flow-source-icon lead-flow-brand-badge">
                    {source.image ? (
                      <Image
                        src={source.image}
                        alt=""
                        width={28}
                        height={28}
                        unoptimized
                        loading="eager"
                      />
                    ) : (
                      <Globe2 aria-hidden="true" />
                    )}
                  </span>
                  <div className="lead-flow-source-copy">
                    <strong>{source.name}</strong>
                    <span>{source.detail}</span>
                  </div>
                </div>
              ))}
            </LogoCycle>
            <span className="lead-flow-source-live" />
            <span className="lead-flow-port" />
          </div>
        ))}
        <div className="lead-flow-triggers">
          <span className="lead-flow-eyebrow">Buying triggers detected</span>
          <LogoCycle phase={0.4} className="lead-flow-trigger-cycle">
            {triggerPairs.map((pair, i) => (
              <div key={i} className="lead-flow-trigger-pair">
                {pair.map(({ name, Icon }) => (
                  <span
                    key={name}
                    className="lead-flow-glass lead-flow-glass-chip"
                  >
                    <Icon aria-hidden="true" />
                    {name}
                  </span>
                ))}
              </div>
            ))}
          </LogoCycle>
        </div>
        <div className="lead-flow-filter-aura" />
        <div className="lead-flow-tower">
          <Image
            src="/figma/windmill-tower.png"
            alt=""
            width={1240}
            height={1268}
            sizes="(max-width: 1023px) 75vw, 520px"
          />
          <MillMechanism />
        </div>
        <div className="lead-flow-rotor-position">
          <Image
            className="lead-flow-rotor"
            src="/figma/windmill-sails.png"
            alt=""
            width={1254}
            height={1254}
            sizes="(max-width: 1023px) 65vw, 440px"
          />
        </div>
        <div className="lead-flow-rejected">
          <Minus aria-hidden="true" /> Low fit
        </div>

        {rankedLeads.map((lead, i) => (
          <div key={lead.rank}>
            <div
              className={`lead-flow-result lead-flow-result-${i}`}
              style={timing(i)}
            >
              <div className="lead-flow-rank-card lead-flow-glass">
                <span className="lead-flow-result-port" />
                <span className="lead-flow-rank">{lead.rank}</span>
                <div className="lead-flow-qualified-person">
                  <span className="lead-flow-avatar-crop">
                    {[0, 1].map((row) => (
                      <span
                        key={row}
                        className="lead-flow-avatar-frame"
                        style={{
                          animationDelay: `calc(var(--flow-delay) - ${row * CYCLE_SECONDS}s)`,
                        }}
                      >
                        <Image
                          className="lead-flow-avatar-sprite"
                          src="/avatars/lead-characters.png"
                          alt=""
                          width={1536}
                          height={1024}
                          sizes="144px"
                          loading="eager"
                          style={{
                            left: `${-i * 100}%`,
                            top: `${-row * 100}%`,
                          }}
                        />
                      </span>
                    ))}
                  </span>
                  <Check
                    className="lead-flow-avatar-check"
                    aria-hidden="true"
                  />
                </div>
                <div className="lead-flow-rank-copy">
                  <strong>{lead.label}</strong>
                  <span>{lead.detail}</span>
                </div>
                <div className="lead-flow-score">
                  <strong>{lead.score}</strong>
                  <span>fit score</span>
                </div>
                <div className="lead-flow-score-track">
                  <i style={{ width: `${lead.score}%` }} />
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="lead-flow-ground">
          <Image
            src={assets.home.imgImage51}
            alt=""
            width={2172}
            height={724}
            sizes="(max-width: 767px) 100vw, 1440px"
          />
        </div>
        <div className="lead-flow-filter-label lead-flow-glass">
          <div className="lead-flow-engine-heading">
            <span className="lead-flow-step">02</span>
            <strong>Cnvrted</strong>
            <span className="lead-flow-eyebrow">LLM scoring</span>
            <span className="lead-flow-processing">
              <i />
              <i />
              <i />
            </span>
          </div>
          <LogoCycle className="lead-flow-model-cycle">
            {models.map((model) => (
              <div
                key={model.name}
                className="lead-flow-model"
                style={brandStyle(model)}
              >
                <span
                  className="lead-flow-model-icon lead-flow-brand-badge"
                  data-dark={model.dark}
                >
                  <Image
                    src={model.image}
                    width={28}
                    height={28}
                    alt=""
                    unoptimized
                    loading="eager"
                  />
                </span>
                <div>
                  <strong>{model.name}</strong>
                  <span>{model.detail}</span>
                </div>
                <Check aria-hidden="true" />
              </div>
            ))}
          </LogoCycle>
          <div className="lead-flow-criteria">
            <span>ICP fit</span>
            <i />
            <span>Intent</span>
            <i />
            <span>Timing</span>
          </div>
        </div>
        <div className="lead-flow-workflow lead-flow-glass">
          <div className="lead-flow-workflow-label">
            <ArrowDown aria-hidden="true" /> Into your workflow
          </div>
          <div className="lead-flow-tools">
            {workflowTools.map((tool) => (
              <div key={tool.name} style={brandStyle(tool)}>
                <span className="lead-flow-tool-icon lead-flow-brand-badge">
                  <Image
                    src={tool.image}
                    alt=""
                    width={27}
                    height={27}
                    unoptimized
                  />
                </span>
                <span>{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </ScaledArtwork>
    </div>
  );
}

export function LeadFlow() {
  const root = useRef<HTMLDivElement>(null);
  const [mobile, setMobile] = useState<boolean | null>(null);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    const breakpoint = window.matchMedia("(max-width: 1023px)");
    const update = () => setMobile(breakpoint.matches);
    update();
    breakpoint.addEventListener("change", update);
    return () => breakpoint.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let inView = false;
    const update = () =>
      setRunning(inView && document.visibilityState === "visible");
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        update();
      },
      { threshold: 0.12 },
    );
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  return (
    <div
      ref={root}
      className="lead-flow"
      data-running={running}
      style={
        {
          "--flow-cycle": `${CYCLE_SECONDS}s`,
          "--avatar-cycle": `${CYCLE_SECONDS * 2}s`,
        } as CSSProperties
      }
      role="img"
      aria-label="An animated lead discovery flow: LinkedIn, X, Reddit, Product Hunt, GitHub, G2, Crunchbase, YouTube, and company sites supply signals such as funding, hiring, expansion, product launches, new tools, and leadership changes. Cnvrted uses LLMs including Claude, ChatGPT, Kimi, and Gemini to evaluate ICP fit, intent, and timing. Low-fit leads are filtered out; qualified leads are scored and ranked for your workflow."
    >
      {mobile !== null && <FlowScene key={String(mobile)} mobile={mobile} />}
    </div>
  );
}
