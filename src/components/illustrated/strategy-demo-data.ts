import { assets } from "./assets";

export const STRATEGY_EXAMPLES = [
  {
    title: "Early-stage startup",
    description: "Zero to one — ICP, positioning, first 100 customers.",
    image: assets.home.imgVideo,
    brief: "Find our first 100 customers.",
    insight:
      "Start with one narrow audience. Learn what earns a reply before you scale your outreach.",
    nodes: [
      {
        title: "Founder-led B2B teams",
        text: "10–50 people · building their first sales motion",
        tag: "A focused first audience",
        detail:
          "Prioritize founders who still run sales themselves. Look for a first sales hire or recent funding as a reason to reach out now.",
        action: "Interview 10 founders about their current sales process.",
      },
      {
        title: "Context before contact",
        text: "Turn buying signals into a reason to start a conversation.",
        tag: "Lead with the problem",
        detail:
          "Position around the cost of reaching the wrong accounts at the wrong time. Test language from real customer conversations before polishing the pitch.",
        action: "Test two messages against the same customer problem.",
      },
      {
        title: "Founder-led outreach",
        text: "LinkedIn · email · niche communities",
        tag: "Start with two channels",
        detail:
          "Use LinkedIn to learn what your buyers care about, then follow up with a relevant email. Join the communities where they already ask for advice.",
        action: "Build a shortlist of 30 accounts with a timely signal.",
      },
      {
        title: "First 100, one step at a time",
        text: "Discover → pilot → learn → repeat",
        tag: "4-week learning sprint",
        detail:
          "Begin with discovery conversations, invite a small pilot group, and track replies, meetings, and activation. Use what you learn to refine your ICP.",
        action: "Set a weekly review of replies, meetings, and activation.",
      },
    ],
  },
  {
    title: "Scale social & content",
    description: "Channel mix, a content engine, and growth loops.",
    image: assets.home.imgVideo1,
    brief: "Turn our expertise into demand.",
    insight:
      "Make one useful idea work harder. Build a repeatable content loop around the questions your buyers already ask.",
    nodes: [
      {
        title: "Buyers asking for answers",
        text: "GTM leaders · founders · revenue teams",
        tag: "Follow the conversation",
        detail:
          "Map recurring questions from customer calls and relevant communities. Group them by job to be done and the buying stage behind the question.",
        action: "Collect 15 questions from customer calls and communities.",
      },
      {
        title: "Useful before promotional",
        text: "Practical answers, original insight, clear proof.",
        tag: "Own a point of view",
        detail:
          "Build around three themes your team can speak to with evidence. Show a useful outcome and the process behind it, rather than repeating broad growth advice.",
        action: "Choose three editorial themes grounded in customer needs.",
      },
      {
        title: "One idea, multiple formats",
        text: "LinkedIn · X · search · newsletter",
        tag: "A connected content engine",
        detail:
          "Start with a useful long-form answer. Adapt it into native social posts, a newsletter, and a search-friendly resource, linking each back to the next useful step.",
        action: "Repurpose one customer insight into three useful formats.",
      },
      {
        title: "Publish. Learn. Compound.",
        text: "Create → distribute → listen → refine",
        tag: "Weekly growth loop",
        detail:
          "Measure qualified conversations and assisted sign-ups alongside engagement. Feed meaningful replies back into the next week’s content plan.",
        action: "Review which content starts qualified conversations.",
      },
    ],
  },
  {
    title: "New product launch",
    description: "Market entry, pricing, launch sequence, and KPIs.",
    image: assets.home.imgVideo2,
    brief: "Take our next product to market.",
    insight:
      "Launch to a specific need, not everyone at once. Validate the promise with a small cohort, then expand what works.",
    nodes: [
      {
        title: "Your first adopter cohort",
        text: "A clear pain · an active need · a reason to switch",
        tag: "Validate the beachhead",
        detail:
          "Choose one segment with an urgent problem and a workable path to purchase. Invite potential customers who can give direct feedback on the value and onboarding.",
        action: "Recruit 10 design partners from one target segment.",
      },
      {
        title: "A clear reason to switch",
        text: "One promise, a differentiated offer, proof of value.",
        tag: "Message & pricing",
        detail:
          "Make the outcome concrete and explain what changes from the current alternative. Test pricing against value delivered and the buyer’s existing budget.",
        action: "Test the offer and pricing with your design partners.",
      },
      {
        title: "An audience ready to act",
        text: "Product Hunt · partners · email · communities",
        tag: "Coordinate the launch",
        detail:
          "Match channels to your actual buyers. Warm up partners and your email audience before launch day, and prepare community-specific messages.",
        action: "Assign an owner and launch message to each channel.",
      },
      {
        title: "From first look to first value",
        text: "Pre-launch → release → activate → measure",
        tag: "Activation over attention",
        detail:
          "Plan onboarding alongside the announcement. Track qualified sign-ups, time to first value, activation, and retention to learn whether the launch reached the right people.",
        action: "Define your activation event and a 30-day review.",
      },
    ],
  },
] as const;
