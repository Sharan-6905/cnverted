import type { CareerRoleSlug } from "./careers";

interface CareerDetails {
  overview: string;
  focusAreas: { title: string; description: string }[];
  responsibilities: string[];
  requirements: string[];
}

/** Full job descriptions stay out of the client-side role search and form. */
export const CAREER_DETAILS = {
  "marketing-lead": {
    overview:
      "Help the right buyers understand Cnvrted and why timing matters. You’ll work with the founders to turn product insights, customer conversations, and signal data into a clear story, useful content, and qualified demand.",
    focusAreas: [
      {
        title: "Content & discovery",
        description:
          "Build a recognizable voice across founder content, product explainers, comparison pages, and community discussions. Help buyers find useful answers through both search and answer engines.",
      },
      {
        title: "Community & demand",
        description:
          "Show up where sales, RevOps, and GTM teams already spend time. Turn small events, partnerships, and practical resources into conversations with people who could benefit from Cnvrted.",
      },
    ],
    responsibilities: [
      "Plan and publish founder-led content, adapting the story to LinkedIn, X, and relevant communities while keeping the founders’ voices intact.",
      "Turn customer interviews and product releases into clear explainers, customer stories, and practical GTM resources.",
      "Maintain useful, accurate comparison and educational pages for search and answer-engine discovery.",
      "Work with the product and data teams on research that helps buyers understand intent signals and account prioritization.",
      "Run focused campaigns, community collaborations, and small events that bring the right buyers into the funnel.",
      "Track qualified conversations and pipeline contribution, use the results to improve campaigns, and share what you learn with the team.",
    ],
    requirements: [
      "2–5 years of B2B marketing experience, ideally with a SaaS product serving sales, RevOps, or GTM teams.",
      "Strong writing and editing skills, with examples of content you have created and an ability to adapt to different voices.",
      "Experience taking a campaign from an idea through distribution, measurement, and iteration.",
      "An understanding of search and answer-engine discovery, or a clear approach to learning and testing both.",
      "Confidence talking with customers and turning their language and problems into useful content.",
      "Good judgment about priorities, budgets, and what a small team can execute well.",
    ],
  },
  "ai-ml-engineer": {
    overview:
      "Build the intelligence behind Cnvrted’s lead discovery and ranking. You’ll turn public business activity into structured signals, match companies to an ideal customer profile, and make lead scores reliable and explainable.",
    focusAreas: [
      {
        title: "From raw activity to reliable signals",
        description:
          "Work on extraction, enrichment, deduplication, and entity resolution across social platforms, communities, and company websites. Keep the source and timing of each signal clear so downstream decisions have evidence behind them.",
      },
      {
        title: "LLM scoring & evaluation",
        description:
          "Use language models to assess ICP fit, buying intent, and timing. Build evaluations that expose false positives and inconsistent rankings, and improve quality without losing sight of latency and inference cost.",
      },
    ],
    responsibilities: [
      "Build pipelines that turn unstructured company and contact information into validated, structured records.",
      "Develop entity matching and deduplication logic so signals from different sources resolve to the right company or person.",
      "Implement and improve LLM-based extraction, classification, and lead scoring using clear schemas and source evidence.",
      "Create representative evaluation datasets and measure extraction accuracy, ranking quality, and failure patterns.",
      "Design retries, fallbacks, monitoring, and data-quality checks for model calls and processing jobs.",
      "Work with product and GTM teams to translate customer feedback into better relevance, score explanations, and account recommendations.",
      "Document experiments and trade-offs, and monitor model quality, latency, and cost after changes ship.",
    ],
    requirements: [
      "Strong Python and SQL skills, with experience building data-processing services or pipelines.",
      "Practical experience integrating LLM APIs, validating structured outputs, and evaluating their behavior on real examples.",
      "An understanding of classification, ranking, and common evaluation metrics, including how to investigate false positives.",
      "Comfort working with messy, incomplete, or conflicting data and designing checks that make its limitations visible.",
      "Sound software engineering habits: version control, tests, debugging, and observability.",
      "Ability to explain technical trade-offs clearly and work with product and customer-facing teammates.",
    ],
  },
  "gtm-engineer": {
    overview:
      "Make buying signals useful inside a revenue team’s daily workflow. You’ll connect discovery, enrichment, scoring, and CRM actions so the right account reaches the right person with enough context to act.",
    focusAreas: [
      {
        title: "Signals into workflows",
        description:
          "Translate an ICP and a buying trigger into a working process: identify accounts, enrich the relevant details, apply qualification rules, and route the result. Keep each step visible and easy to troubleshoot.",
      },
      {
        title: "Integrations that teams can trust",
        description:
          "Connect Cnvrted with CRMs, communication tools, and automation platforms through APIs and webhooks. Handle field mappings, duplicate records, retries, and handoffs so teams can rely on the workflow.",
      },
    ],
    responsibilities: [
      "Build and maintain workflows that connect signal discovery, account enrichment, qualification, and sales handoff.",
      "Implement API and webhook integrations with CRMs and tools such as Slack and Zapier.",
      "Configure ICP filters, scoring rules, and trigger-based routing for specific customer use cases.",
      "Keep CRM data consistent through field mapping, validation, deduplication, and reliable updates.",
      "Add logging, alerts, retries, and safeguards against duplicate actions or noisy notifications.",
      "Work with customers and the GTM team to diagnose workflow issues, test improvements, and measure whether outputs are useful.",
      "Document repeatable setups and turn successful workflows into reusable templates.",
    ],
    requirements: [
      "Hands-on experience building automations or integrations using APIs, webhooks, and structured data.",
      "Ability to write and debug JavaScript, TypeScript, or Python, and use SQL to investigate data issues.",
      "A working understanding of CRM records, sales stages, lead routing, and account enrichment.",
      "Comfort with authentication, rate limits, retries, and idempotency in third-party integrations.",
      "Ability to turn a business request into a clear workflow and explain it to a nontechnical teammate or customer.",
      "Attention to data quality and a habit of checking that an automation produces the intended result.",
    ],
  },
  "gtm-lead": {
    overview:
      "Own how Cnvrted finds, wins, and learns from its customers. You’ll work with the founders to choose the right segments, validate the value proposition, build qualified pipeline, and turn early sales learning into a repeatable GTM motion.",
    focusAreas: [
      {
        title: "ICP & market strategy",
        description:
          "Identify the teams whose problems Cnvrted can solve well. Test positioning and use cases through customer conversations, and use evidence to decide which segments and channels deserve more attention.",
      },
      {
        title: "Pipeline & customer conversations",
        description:
          "Stay close to execution: prospecting, discovery, demos, follow-up, and handoffs. Build a clear view of the funnel and help the team understand what moves an opportunity forward or causes it to stall.",
      },
    ],
    responsibilities: [
      "Define and refine target segments, ideal customer profiles, buyer personas, and the use cases we prioritize.",
      "Develop and run outbound, inbound, and partnership experiments with clear goals and a way to measure results.",
      "Lead discovery calls and product demos, qualify opportunities, and manage follow-up through the buying process.",
      "Maintain a useful pipeline view, with clear opportunity stages, next steps, and reasons for wins and losses.",
      "Work with marketing on messaging and demand generation, and with the GTM Engineer on the workflows that support execution.",
      "Bring objections, onboarding friction, and customer requests back to product and help prioritize what matters.",
      "Build practical playbooks for prospecting, qualification, demos, and customer handoff as patterns become repeatable.",
    ],
    requirements: [
      "Experience taking a B2B product to market, with hands-on ownership of customer conversations and pipeline.",
      "Strong discovery and communication skills, including the ability to understand a buyer’s workflow and demonstrate relevant value.",
      "Ability to define an ICP, test a market hypothesis, and change direction when the evidence calls for it.",
      "Comfort using CRM and funnel data to understand conversion, sales-cycle bottlenecks, and channel performance.",
      "Experience collaborating with product, engineering, and marketing without losing ownership of commercial outcomes.",
      "Willingness to do the early execution yourself while building processes the team can repeat.",
    ],
  },
  "founders-office-intern": {
    overview:
      "Work alongside the founders on focused projects across research, product, GTM, and operations. You’ll help turn open questions into clear findings, keep projects organized, and take responsibility for useful pieces of work from start to finish.",
    focusAreas: [
      {
        title: "Research & decision support",
        description:
          "Research markets, customers, competitors, and potential partners. Organize what you find, check your sources, and turn the information into concise notes the team can use to make decisions.",
      },
      {
        title: "Projects & operations",
        description:
          "Help coordinate small launches, customer-learning projects, and internal processes. Keep track of owners and next steps, flag blockers early, and follow through on the work you take on.",
      },
    ],
    responsibilities: [
      "Research target markets, customer problems, and competitors, and summarize findings with clear sources.",
      "Help organize account research, customer feedback, and simple reports for product and GTM decisions.",
      "Support small experiments, launches, and outreach projects with the relevant team members.",
      "Maintain project trackers, meeting notes, and follow-ups so decisions turn into completed actions.",
      "Use spreadsheets and lightweight tools to clean up information, track progress, and spot gaps.",
      "Take ownership of a scoped project, ask for feedback, and share both the result and what you learned.",
    ],
    requirements: [
      "Curiosity about startups, B2B products, and how teams find and serve customers.",
      "Clear writing, careful research, and the ability to distinguish a useful finding from an unsupported assumption.",
      "Comfort with spreadsheets, documents, and learning unfamiliar tools.",
      "Good organization and follow-through, including communicating progress and asking for help when blocked.",
      "Evidence of initiative through coursework, personal projects, internships, or community work.",
      "Openness to feedback and a willingness to work across different functions as priorities change.",
    ],
  },
} satisfies Record<CareerRoleSlug, CareerDetails>;
