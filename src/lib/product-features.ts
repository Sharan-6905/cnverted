export interface ProductFeature {
  title: string;
  description: string;
  /** false once a feature has shipped — hides the "Soon" badge */
  soon?: boolean;
}

export interface ProductGroup {
  label: string;
  features: ProductFeature[];
}

export const PRODUCT_GROUPS: ProductGroup[] = [
  {
    label: "Lead sourcing",
    features: [
      {
        title: "Finding leads",
        description: "Automatically surfaces new leads that match your ICP across the open web.",
        soon: false,
      },
      {
        title: "Enrichments",
        description: "Every lead is enriched with firmographic and contact data before it reaches you.",
        soon: false,
      },
      {
        title: "Web scraping",
        description: "Scrapes public sources in real time to catch signals the moment they appear.",
        soon: false,
      },
    ],
  },
  {
    label: "Tracking & workflow",
    features: [
      {
        title: "Dashboard",
        description: "One view for mail tracking, conversations, and account status.",
      },
      {
        title: "Status tracking",
        description: "See stalled leads and get automatic weekly follow-up reminders.",
      },
      {
        title: "Transcribing & listening",
        description: "Transcribes and listens to calls, powered by Granola.",
      },
      {
        title: "WhatsApp bot",
        description: "Tracks conversations, supports manual chat, or runs as a fully automated bot.",
      },
      {
        title: "Mail tracking",
        description: "Know the moment your emails are opened and acted on.",
      },
      {
        title: "Calendar",
        description: "Two-way sync with Google Calendar and Notion.",
      },
      {
        title: "CoPilot",
        description: "An AI chat assistant available on every screen, with shared context across the product.",
      },
    ],
  },
  {
    label: "Intelligence",
    features: [
      {
        title: "Deal intelligence",
        description: "Analyzes live deals to surface risk and the next best action.",
      },
      {
        title: "Pipeline intelligence",
        description: "Tracks deal progress in real time, end to end.",
      },
      {
        title: "Call intelligence",
        description: "Listens in on calls to help with closing, talking points, and drafting follow-ups.",
      },
      {
        title: "Customized planner",
        description: "A customized workflow planner that manages and automates your day.",
      },
    ],
  },
];
