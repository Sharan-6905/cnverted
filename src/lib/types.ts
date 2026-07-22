/* Shared, presentational data shapes. No API layer — screens receive these as props. */

export type IntentLevel = "high" | "medium" | "low";

export type SignalCategory =
  | "funding"
  | "hiring"
  | "tech-change"
  | "exec-move"
  | "pain-signal"
  | "product-update";

export interface Signal {
  id: string;
  company: string;
  /** short one-line description of what happened */
  description: string;
  category: SignalCategory;
  /** publication / platform the signal was detected on */
  source: string;
  /** human-readable relative time, e.g. "12m ago" */
  timestamp: string;
  /** 0–100 intent score */
  score: number;
  level: IntentLevel;
}

export interface Persona {
  id: string;
  title: string;
  blurb: string;
}

export interface ProcessStep {
  id: string;
  label: string;
  headline: string;
  detail: string;
}

export interface Integration {
  id: string;
  name: string;
}
