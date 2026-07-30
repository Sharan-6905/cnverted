export interface RadarLeadData {
  id: string;
  name: string;
  avatar: string;
  ring: string;
  glow: string;
  angle: number;
  radiusFraction: number;
  segments: { text: string; highlight?: boolean }[];
}

export const RADAR_LEADS: RadarLeadData[] = [
  {
    id: "jordan",
    name: "Jordan",
    avatar: "/avatars/lead-1.svg",
    ring: "#DCE8FF",
    glow: "rgba(79,140,255,0.55)",
    angle: 0,
    radiusFraction: 0.78,
    segments: [
      { text: "In need of a solution to " },
      { text: "enhance team collaboration", highlight: true },
    ],
  },
  {
    id: "priya",
    name: "Priya",
    avatar: "/avatars/lead-2.svg",
    ring: "#FFD9E0",
    glow: "rgba(255,120,150,0.55)",
    angle: 55,
    radiusFraction: 0.85,
    segments: [
      { text: "Wanting to improve " },
      { text: "customer communication channels", highlight: true },
    ],
  },
  {
    id: "marcus",
    name: "Marcus",
    avatar: "/avatars/lead-3.svg",
    ring: "#CFF3DE",
    glow: "rgba(60,200,130,0.55)",
    angle: 130,
    radiusFraction: 0.72,
    segments: [
      { text: "Searching for tools to " },
      { text: "automate processes", highlight: true },
    ],
  },
  {
    id: "diego",
    name: "Diego",
    avatar: "/avatars/lead-4.svg",
    ring: "#FFE6BF",
    glow: "rgba(255,175,60,0.55)",
    angle: 195,
    radiusFraction: 0.8,
    segments: [
      { text: "Looking for an analytics tool to " },
      { text: "track performance", highlight: true },
    ],
  },
  {
    id: "sofia",
    name: "Sofia",
    avatar: "/avatars/lead-5.svg",
    ring: "#E7DBFB",
    glow: "rgba(160,110,240,0.55)",
    angle: 268,
    radiusFraction: 0.52,
    segments: [
      { text: "Seeking a CRM system to " },
      { text: "manage clients better", highlight: true },
    ],
  },
];

export const SWEEP_DURATION_MS = 4000;
export const CYCLE_DURATION_MS = SWEEP_DURATION_MS * 2;
export const POST_DETECTION_PAUSE_MS = 2000;

function round(n: number) {
  return Math.round(n * 1000) / 1000;
}

export function polarToPercent(angleDeg: number, radiusFraction: number) {
  const rad = (angleDeg * Math.PI) / 180;
  const dx = Math.sin(rad) * radiusFraction * 50;
  const dy = -Math.cos(rad) * radiusFraction * 50;
  return { left: round(50 + dx), top: round(50 + dy) };
}

// Row display order sorted by each avatar's vertical position, so connector
// lines never cross (detection/scan order is independent and stays as-is).
export const RADAR_ROW_ORDER = [...RADAR_LEADS].sort((a, b) => {
  const ya = polarToPercent(a.angle, a.radiusFraction).top;
  const yb = polarToPercent(b.angle, b.radiusFraction).top;
  return ya - yb;
});
