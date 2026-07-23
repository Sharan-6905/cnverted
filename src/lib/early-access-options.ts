export const TEAM_SIZES = ["Just me", "2–10", "11–50", "51–200", "200+"] as const;

export const SALES_TOOLS = [
  "Apollo",
  "ZoomInfo",
  "Clay",
  "Lusha",
  "Sales Navigator",
  "Outreach / Salesloft",
  "Other",
] as const;

export const INTENT_OPTIONS = ["Actively looking", "Exploring", "Just curious"] as const;

export interface EarlyAccessData {
  fullName: string;
  phone: string;
  email: string;
  company: string;
  role: string;
  whatYouDo: string;
  teamSize: (typeof TEAM_SIZES)[number] | "";
  location: string;
  usedSalesTool: "yes" | "no" | "";
  tools: string[];
  toolsFeedback: string;
  findingAccountsToday: string;
  biggestChallenge: string;
  intent: (typeof INTENT_OPTIONS)[number] | "";
  demoTime: string;
}

export const EARLY_ACCESS_DEFAULTS: EarlyAccessData = {
  fullName: "",
  phone: "",
  email: "",
  company: "",
  role: "",
  whatYouDo: "",
  teamSize: "",
  location: "",
  usedSalesTool: "",
  tools: [],
  toolsFeedback: "",
  findingAccountsToday: "",
  biggestChallenge: "",
  intent: "",
  demoTime: "",
};
