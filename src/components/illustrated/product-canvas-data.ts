export const PRODUCT_MODELS = ["Opus 5.5", "Sonnet", "Gemini"];

export const PRODUCT_PROMPTS = [
  "Find new markets I can grow into",
  "Is my current ICP a good one?",
  "Where are my buyers?",
];

export const DEFAULT_PRODUCT_PROMPT =
  "Find 11 companies hiring a product designer";

export type ProductScenario = "hiring" | "markets" | "icp";
export type ProductNode = {
  label: string;
  text: string;
  summary: string;
  detail: string;
};

// Local, illustrative data. No model or prospecting service is called by this demo.
export function productScenario(prompt: string): ProductScenario {
  if (/market|grow|expand|office/i.test(prompt)) return "markets";
  if (/icp|ideal|customer profile/i.test(prompt)) return "icp";
  return "hiring";
}

export function productNodes(scenario: ProductScenario): ProductNode[] {
  const profiles = {
    hiring: [
      "B2B software companies in India, 20–200 employees, actively hiring product designers. Buyer: founder or design lead.",
      "Match company size, product maturity and open design roles. Focus on teams building or improving their product.",
      "New product designer roles, recent funding and a growing product team indicate a timely conversation.",
      "Identify founders and design leaders. Prioritize accounts with a clear hiring signal and a strong ICP fit.",
    ],
    markets: [
      "Corporate & IT occupiers in Hyderabad, Bengaluru and Chennai tech parks. 200–2,000 employees, expanding or relocating.",
      "Compare adjacent markets against the current ICP. Prioritize technology companies growing their teams.",
      "New offices, team expansion and relocation announcements reveal where demand is building.",
      "Map workplace, operations and procurement leaders. Rank accounts by expansion signals and market fit.",
    ],
    icp: [
      "Seed and pre-seed AI startups building a first product. Buyer: founder or head of product.",
      "Check company stage, team size and product needs. Separate strong-fit accounts from broad assumptions.",
      "Look for a recent raise, a product launch or an open design role. Match each signal to an actual need.",
      "Prioritize accounts with both a profile match and a current buying signal. Review the shortlist before outreach.",
    ],
  }[scenario];
  return [
    ...profiles.map((text, i) => ({
      label: [
        "Ideal customer",
        "Account research",
        "Buying signals",
        "Decision makers",
      ][i],
      text,
      summary: {
        hiring: [
          "B2B software · India\n20–200 people, hiring designers.",
          "Find teams investing in product and design.",
          "Hiring, fresh funding and growing product teams.",
          "Connect with founders and design leaders.",
        ],
        markets: [
          "Technology teams\n200–2,000 people, expanding offices.",
          "Compare growing teams across three new markets.",
          "New offices, hiring and relocation signals.",
          "Find workplace and operations leaders.",
        ],
        icp: [
          "Seed-stage AI startups\nBuilding their first product.",
          "Match company stage, team size and product needs.",
          "Recent funding, product launches and design roles.",
          "Rank founders by fit and buying intent.",
        ],
      }[scenario][i],
      detail: [
        "Your ideal customer profile",
        "Profile matching",
        "Buying signals",
        "Buyer qualification",
      ][i],
    })),
    {
      label: "Lead list",
      summary: "11 qualified companies",
      text: "Lead list · 11 companies",
      detail: "Your qualified shortlist",
    },
  ];
}

export const PRODUCT_LEADS = [
  ["Primer", "Alice Johnson", "Creative Director"],
  ["Northstar", "Michael Smith", "Lead Product Designer"],
  ["Forma", "Emma Brown", "Head of Product"],
  ["Orbit", "James Wilson", "Design Lead"],
  ["Arc", "Olivia Garcia", "Founder"],
  ["Fieldwork", "Liam Martinez", "Product Design Lead"],
  ["Layer", "Sophia Rodriguez", "Head of Design"],
  ["Vector", "Noah Lee", "Co-founder"],
  ["Outline", "Isabella Perez", "Design Research Lead"],
  ["Mosaic", "Ethan Taylor", "Product Lead"],
  ["Meridian", "Mia Anderson", "Design Director"],
] as const;

export const PRODUCT_PHASES = [
  "Writing a new brief",
  "Orka is reading the brief",
  "Defining your ideal customer",
  "Connecting buying signals",
  "Qualifying the shortlist",
  "Your shortlist is ready for approval",
  "11 example companies, ready to explore",
  "Skipped · try another prompt",
];
