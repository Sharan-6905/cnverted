import type { Signal, Persona, ProcessStep, Integration } from "@/lib/types";

export const SIGNALS: Signal[] = [
  {
    id: "sig-1",
    company: "Ramp",
    description: "Posted 6 new SDR roles — scaling outbound this quarter.",
    category: "hiring",
    source: "LinkedIn Jobs",
    timestamp: "12m ago",
    score: 88,
    level: "high",
  },
  {
    id: "sig-2",
    company: "Vanta",
    description: "Raised a $150M Series C led by Sequoia.",
    category: "funding",
    source: "TechCrunch",
    timestamp: "34m ago",
    score: 91,
    level: "high",
  },
  {
    id: "sig-3",
    company: "Linear",
    description: "Named a new CRO from a competitor two weeks ago.",
    category: "exec-move",
    source: "The Org",
    timestamp: "1h ago",
    score: 79,
    level: "medium",
  },
  {
    id: "sig-4",
    company: "Retool",
    description: "Migrated off a legacy CRM — new stack detected.",
    category: "tech-change",
    source: "BuiltWith",
    timestamp: "2h ago",
    score: 74,
    level: "medium",
  },
  {
    id: "sig-5",
    company: "Deel",
    description: "Head of Growth asked about intent tooling on X.",
    category: "pain-signal",
    source: "X / Twitter",
    timestamp: "3h ago",
    score: 69,
    level: "medium",
  },
  {
    id: "sig-6",
    company: "Mercury",
    description: "Shipped an outbound analytics feature — expanding GTM.",
    category: "product-update",
    source: "Product blog",
    timestamp: "5h ago",
    score: 61,
    level: "low",
  },
];

export const PERSONAS: Persona[] = [
  {
    id: "sdr",
    title: "Sales Development Reps",
    blurb: "Open with a reason to reach out — every account comes with its why-now.",
  },
  {
    id: "ae",
    title: "Account Executives",
    blurb: "Walk into calls already knowing what changed and where the urgency is.",
  },
  {
    id: "revops",
    title: "RevOps",
    blurb: "Route and score accounts on live intent, straight into your CRM.",
  },
  {
    id: "gtm",
    title: "GTM Leaders",
    blurb: "See where demand is forming across your market — and get there first.",
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "monitor",
    label: "Source monitoring",
    headline: "We watch the whole market, continuously.",
    detail:
      "Thousands of public sources — LinkedIn, Reddit, X, news, job boards, tech registries — streamed and normalized in real time.",
  },
  {
    id: "detect",
    label: "Signal detection",
    headline: "Intent gets separated from noise.",
    detail:
      "Our models flag the events that predict buying: funding, hiring, exec moves, tech changes, and expressed pain.",
  },
  {
    id: "score",
    label: "Intent scoring",
    headline: "Every account gets a score by urgency.",
    detail:
      "Signals are weighted and combined into a single 0–100 intent score, so reps always know who to work first.",
  },
  {
    id: "enrich",
    label: "Enrichment",
    headline: "Accounts arrive with full context.",
    detail:
      "We attach the decision-makers, the trigger, the source, and a suggested angle — everything needed to open.",
  },
  {
    id: "push",
    label: "CRM push",
    headline: "It lands where your team already works.",
    detail:
      "Scored, enriched accounts sync to Salesforce, HubSpot, and your sequencer automatically — no exports.",
  },
];

export const INTEGRATIONS: Integration[] = [
  { id: "salesforce", name: "Salesforce" },
  { id: "hubspot", name: "HubSpot" },
  { id: "outreach", name: "Outreach" },
  { id: "salesloft", name: "Salesloft" },
  { id: "apollo", name: "Apollo" },
  { id: "notion", name: "Notion" },
  { id: "slack", name: "Slack" },
  { id: "zapier", name: "Zapier" },
];
