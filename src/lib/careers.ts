export type CareerRoleSlug =
  | "marketing-lead"
  | "ai-ml-engineer"
  | "gtm-engineer"
  | "gtm-lead"
  | "founders-office-intern";

export interface CareerRole {
  slug: CareerRoleSlug;
  title: string;
  category: string;
  location: string;
  type: string;
  experience?: string;
  description: string;
}

/** Existing openings, plus the Marketing Lead role supplied in the Figma design. */
export const CAREER_ROLES: CareerRole[] = [
  {
    slug: "marketing-lead",
    title: "Marketing Lead",
    category: "Marketing",
    location: "Bengaluru",
    type: "Full-time",
    experience: "2–5 years",
    description:
      "Own Cnvrted’s story: founder-led LinkedIn, how we show up in answer engines, our own signal data, and the rooms where our buyers already gather. Be the first marketing hire and help shape the role.",
  },
  {
    slug: "ai-ml-engineer",
    title: "AI/ML Engineer",
    category: "Engineering",
    location: "Remote",
    type: "Full-time",
    description:
      "Build the data pipelines, LLM evaluations, and scoring systems that turn public business activity into relevant, explainable lead recommendations.",
  },
  {
    slug: "gtm-engineer",
    title: "GTM Engineer",
    category: "Engineering",
    location: "Remote",
    type: "Full-time",
    description:
      "Build the integrations and automations that turn buying signals into qualified accounts, CRM updates, and useful sales handoffs.",
  },
  {
    slug: "gtm-lead",
    title: "GTM Lead",
    category: "Go-to-market",
    location: "Remote",
    type: "Full-time",
    description:
      "Own ICP strategy, customer discovery, and pipeline. Turn early sales learning into a repeatable way to find and win the right customers.",
  },
  {
    slug: "founders-office-intern",
    title: "Founders Office Intern (In batches)",
    category: "Operations",
    location: "Remote",
    type: "Internship",
    description:
      "Work with the founders on market research, customer insights, and focused projects across product, GTM, and operations.",
  },
];
