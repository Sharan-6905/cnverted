export const HELP_CATEGORIES = [
  "Getting started",
  "Signals & leads",
  "AI & strategy",
  "Plans & credits",
  "Account & support",
] as const;

export const HELP_ARTICLES = [
  {
    id: "buying-signals",
    category: "Signals & leads",
    question: "How does Cnvrted find buying signals?",
    answer: "We look across the open web and social platforms for funding, hiring, expansion, new tools, and leadership changes that reveal buying intent.",
  },
  {
    id: "lead-database",
    category: "Signals & leads",
    question: "How is Cnvrted different from a lead database?",
    answer: "A database gives you contact records. Cnvrted adds context and timing: what changed at an account, why it matters, and how well it fits your ICP.",
  },
  {
    id: "platforms",
    category: "Signals & leads",
    question: "Which platforms does Cnvrted use?",
    answer: "Signals come from LinkedIn, X, Reddit, Product Hunt, company websites, and other sources across the open web.",
  },
  {
    id: "icp",
    category: "Getting started",
    question: "What is an ideal customer profile (ICP)?",
    answer: "Your ICP describes the companies most likely to benefit from your product. Start with their industry, company size, target roles, and buying signals.",
  },
  {
    id: "qualification",
    category: "AI & strategy",
    question: "How does AI qualify leads?",
    answer: "Cnvrted uses AI to evaluate a company’s fit, buying intent, and timing against your ICP, helping you decide which accounts to focus on.",
  },
  {
    id: "start-free",
    category: "Plans & credits",
    question: "Can I try Cnvrted for free?",
    answer: "Yes. Spark includes 40 free credits to get started. Visit the beta app to explore Cnvrted.",
    link: { label: "Start free", href: "https://beta.cnvrted.com" },
  },
  {
    id: "plans",
    category: "Plans & credits",
    question: "Where can I compare plans and credits?",
    answer: "Compare Spark, Surge, and Dominion on our pricing page. For custom credit needs, talk to our team about Dominion.",
    link: { label: "View pricing", href: "/pricing" },
  },
  {
    id: "models",
    category: "AI & strategy",
    question: "Which AI models does Cnvrted work with?",
    answer: "Cnvrted’s AI workflows bring together models such as Claude, ChatGPT, Kimi, and Gemini to interpret signals and help qualify leads.",
  },
  {
    id: "privacy",
    category: "Account & support",
    question: "Where can I learn about data and privacy?",
    answer: "Our Privacy Policy explains what information we collect, how we use it, and the choices available to you.",
    link: { label: "Read our Privacy Policy", href: "/privacy" },
  },
  {
    id: "contact",
    category: "Account & support",
    question: "How can I get help with my account?",
    answer: "Email work@cnvrted.com with a description of the issue and any relevant screenshots. Please leave out passwords and other sensitive details.",
    link: { label: "Email the team", href: "mailto:work@cnvrted.com" },
  },
  {
    id: "community",
    category: "Account & support",
    question: "How can I join the Cnvrted Slack community?",
    answer: "Tell us your name, email, business name, and business domain. You can add a website too. Once your answers reach our team, you’ll get a link to join Slack.",
    link: { label: "Join our Slack community", href: "/join-slack" },
  },
  {
    id: "terms",
    category: "Account & support",
    question: "Where can I find the Terms & Conditions?",
    answer: "Our Terms & Conditions cover using Cnvrted, account responsibilities, plans, and support. Read them alongside our Privacy Policy.",
    link: { label: "Read the Terms & Conditions", href: "/terms" },
  },
] satisfies Array<{
  id: string;
  category: (typeof HELP_CATEGORIES)[number];
  question: string;
  answer: string;
  link?: { label: string; href: string };
}>;
