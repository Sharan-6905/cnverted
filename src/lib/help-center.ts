export const HELP_SUPPORT_EMAIL = "info@cnvrted.com";

export const HELP_CATEGORIES = [
  "Getting started",
  "Signals & leads",
  "AI & strategy",
  "Plans & credits",
  "Account & support",
] as const;

export const HELP_ARTICLES = [
  { id: "account-access", category: "Account & support", question: "I can’t sign in or need to reset my password. What should I do?", answer: "Open the beta using the same sign-in method and email you used to register. If you still cannot access your account, email support with your account email and the error message. Never send your password or sign-in codes.", link: { label: "Get account help", href: "mailto:info@cnvrted.com" } },
  { id: "credit-usage", category: "Plans & credits", question: "My credits are low or a charge looks wrong. What should I do?", answer: "Before repeating an action, check your remaining allowance in the beta. Ask support to review the action, approximate time, and any error shown. Confirm action costs and your allowance with the team before moving to a paid plan.", link: { label: "Ask about credits", href: "mailto:info@cnvrted.com" } },
  { id: "gmail-connection", category: "Account & support", question: "Gmail disconnected or a reply is missing. What should I do?", answer: "Check that the message or reply is present in the Google mailbox you connected. If Cnvrted reports a connection error or does not show the reply, contact support with the error and approximate time. Avoid repeatedly sending the same email while the issue is being checked.", link: { label: "Get connection help", href: "mailto:info@cnvrted.com" } },
  { id: "export-help", category: "Account & support", question: "My Notion export failed. What should I do?", answer: "Check whether the records arrived before retrying, so you do not create duplicate entries. If the export is missing or incomplete, send support the destination name, approximate time, and any error message. Leave private lead data out of screenshots.", link: { label: "Get export help", href: "mailto:info@cnvrted.com" } },
  {
    id: "buying-signals",
    category: "Signals & leads",
    question: "How does Cnvrted find buying signals?",
    answer: "We look across the open web and social platforms for funding, hiring, expansion, new tools, and leadership changes that may indicate a relevant business need.",
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
    question: "Which AI assistants appear in the demos?",
    answer: "Our illustrative workflows show Claude, ChatGPT, Kimi, and Gemini. The examples do not guarantee that each assistant or model is included in your plan. Ask our team about the current production options.",
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
    answer: `Email ${HELP_SUPPORT_EMAIL} with a description of the issue and any relevant screenshots. Please leave out passwords and other sensitive details.`,
    link: { label: "Email the team", href: `mailto:${HELP_SUPPORT_EMAIL}` },
  },
  {
    id: "community",
    category: "Account & support",
    question: "How can I join the Cnvrted Slack community?",
    answer: "Tell us your name, email, business name, and industry. You can add a website too. After submitting, select “Join Slack” on the confirmation screen to finish joining.",
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
