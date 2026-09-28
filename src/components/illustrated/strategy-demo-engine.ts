import { STRATEGY_EXAMPLES } from "./strategy-demo-data";

export const DEMO_MODELS = [
  { id: "fable", name: "Fable 5", family: "Cnvrted", logo: null },
  {
    id: "opus",
    name: "Opus",
    family: "Claude",
    logo: "/brands/claude-color.svg",
  },
  {
    id: "sonnet",
    name: "Sonnet",
    family: "Claude",
    logo: "/brands/claude-color.svg",
  },
  { id: "gpt", name: "GPT", family: "OpenAI", logo: "/brands/openai.svg" },
  {
    id: "gemini",
    name: "Gemini",
    family: "Google",
    logo: "/brands/gemini-color.svg",
  },
  {
    id: "kimi",
    name: "Kimi",
    family: "Moonshot",
    logo: "/brands/kimi-color.svg",
  },
] as const;

export const NODE_LABELS = [
  "Ideal customer",
  "Positioning",
  "Channel mix",
  "Launch plan",
  "Success metrics",
];

export type DemoNode = {
  title: string;
  text: string;
  tag: string;
  detail: string;
  action: string;
};
export type DemoPlan = {
  scenario: number;
  brief: string;
  nodes: DemoNode[];
  response: string;
};

export function initialDemoPlan(scenario = 0): DemoPlan {
  const example = STRATEGY_EXAMPLES[scenario];
  return {
    scenario,
    brief: example.brief,
    nodes: example.nodes.map((node) => ({ ...node })),
    response: example.insight,
  };
}

/** Deliberately local, deterministic demo. Model choice never implies a provider call. */
export function buildDemoPlan(
  message: string,
  current: DemoPlan,
  scenario?: number,
): DemoPlan {
  const isMetrics = /\b(metrics?|kpis?|measure|measurement)\b/i.test(message);
  const isLinkedIn = /\blinkedin\b/i.test(message);
  const isTimeline = /\b30[ -]?days?\b|\bmonth\b/i.test(message);
  const startsNewPlan =
    /\b(build|create|start|design)\b.*\b(launch|product|social|content|startup)\b/i.test(
      message,
    );
  const refinement =
    scenario === undefined &&
    !startsNewPlan &&
    (isMetrics || isLinkedIn || isTimeline);
  const nextScenario =
    scenario ??
    (refinement
      ? current.scenario
      : /\b(launch|pricing|market entry)\b/i.test(message)
        ? 2
        : /\b(social|content|newsletter)\b/i.test(message)
          ? 1
          : 0);
  const plan = refinement
    ? { ...current, nodes: current.nodes.map((node) => ({ ...node })) }
    : initialDemoPlan(nextScenario);
  if (!refinement) plan.brief = message;
  const changes: string[] = [];
  if (isLinkedIn) {
    plan.nodes[2] = {
      title: "LinkedIn, with a purpose",
      text: "Founder posts → relevant conversations → qualified meetings",
      tag: "Primary channel: LinkedIn",
      detail:
        "Build a focused account list, share useful answers to buyer questions, and follow up when there is a relevant signal. Keep email as a supporting channel.",
      action:
        "Publish two useful posts and start five relevant conversations this week.",
    };
    changes.push("made LinkedIn the primary channel");
  }
  if (isTimeline) {
    plan.nodes[3] = {
      title: "Your 30-day launch sprint",
      text: "Days 1–7: validate · 8–14: prepare · 15–21: launch · 22–30: learn",
      tag: "A focused 30-day plan",
      detail:
        "Use week one for customer interviews, week two for positioning and channel preparation, week three for a small launch, and the final week to review activation and qualified conversations.",
      action: "Assign an owner and one measurable outcome to each week.",
    };
    changes.push("mapped a 30-day execution plan");
  }
  if (isMetrics) {
    plan.nodes[4] = {
      title: "Measure what moves the business",
      text: "Qualified replies · meetings · activation · retention",
      tag: "Review every week",
      detail:
        "Track conversations and activation alongside channel activity. Compare each experiment with a baseline and record what to keep, change, or stop. These are example metrics, not forecasts.",
      action: "Set a baseline and review results with the team each Friday.",
    };
    changes.push("added a connected success-metrics node");
  }
  plan.response = changes.length
    ? `In this demo plan, I’ve ${changes.join(", and ")}. Open any node to inspect or edit the next step.`
    : `Here’s an example ${STRATEGY_EXAMPLES[nextScenario].title.toLowerCase()} plan for your brief. ${STRATEGY_EXAMPLES[nextScenario].insight} Try a channel, timeline, or metrics refinement next.`;
  return plan;
}
