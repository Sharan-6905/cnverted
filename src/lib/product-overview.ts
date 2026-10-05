export const PRODUCT_PATH = "/product";
export const PRODUCT_DESCRIPTION = "Cnvrted is an AI go-to-market intelligence platform for founders and B2B sales teams. Find public buying signals, check ICP fit, and use the source and context to plan relevant outreach.";

export const PRODUCT_FAQS = [
  { question: "What does Cnvrted do?", answer: PRODUCT_DESCRIPTION },
  { question: "Who is Cnvrted for?", answer: "Cnvrted is built for founders and B2B sales teams researching their next prospects. Service businesses can also explore the workflow; the interactive examples show a design studio, a RevOps consultancy, and a recruiting agency using fictional data." },
  { question: "What is Orka?", answer: "Orka is the AI assistant in Cnvrted’s GTM workflow. Describe the customers you want to reach in plain language, then review the research and workflow on the canvas. Check the underlying evidence before deciding what to do next." },
  { question: "Where does the information come from?", answer: "Cnvrted looks for public information across the open web and social platforms. Examples include company announcements, careers pages, and public posts. Check the original source and date for each finding; confirm coverage for your market with the team." },
  { question: "How is Cnvrted different from a contact database?", answer: "A contact database helps you find company and person records. Cnvrted focuses on connecting a prospect to what changed, why it may be relevant to your offer, and how well the company fits your ICP. Contact information and buying context answer different questions." },
  { question: "Does a buying signal mean a prospect wants to buy?", answer: "No. A signal suggests a reason to investigate. It does not establish budget, purchasing authority, a need for an outside partner, or a commitment to buy. Separate what the source says from what you infer." },
  { question: "How can I try Cnvrted?", answer: "Spark includes 40 free credits in the Cnvrted beta. You can also book a 30-minute GTM demo to discuss your market, workflow, pricing, credit usage, and integration availability." },
] as const;

export const PRODUCT_STEPS = [
  { id: "define", title: "Define the customer.", input: "Your offer and ICP", outcome: "A clear research brief", description: "Tell Orka what you sell, the companies you can help, and what makes an account a good fit. Include the conditions that rule a company out.", check: "Be specific about the problem you solve, not just an industry or job title.", link: { label: "Build your ICP", href: "/learn/ideal-customer-profile" } },
  { id: "research", title: "Find the reason now.", input: "Public buying signals", outcome: "A prospect with supporting context", description: "Look for a relevant change: a hiring plan, a funding announcement, a technology change, or someone asking for help. Review the source alongside the company’s fit.", check: "Read the original source and check whether the situation is still current.", link: { label: "Understand buying signals", href: "/learn/buying-signals" } },
  { id: "review", title: "Make the next move.", input: "The source, fit, and timing", outcome: "A relevant outreach angle", description: "Connect what you found to a useful question or offer. Review the message, decide whom to approach, and keep track of what happens after the conversation starts.", check: "A hiring plan can be real while the need for an agency is still unknown.", link: { label: "Try a complete example", href: "/learn/signal-to-outreach" } },
] as const;
