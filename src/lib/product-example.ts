export const PRODUCT_EXAMPLE_PATH = "/learn/signal-to-outreach";

export const EXAMPLE_DISCLOSURE = "All companies, source extracts, dates, and messages in this demo are fictional. These are prepared examples, not live research or customer results.";

export type ProductExample = {
  id: string;
  business: string;
  offer: string;
  brief: string;
  icp: string;
  company: string;
  profile: string;
  product: string;
  contact: string;
  fit: { criterion: string; evidence: string }[];
  sources: { type: string; title: string; extract: string; published: string; reviewed: string }[];
  known: string;
  hypothesis: string;
  unknown: string;
  subject: string;
  outreach: string[];
  notes: { title: string; text: string }[];
};

export const PRODUCT_EXAMPLES: readonly ProductExample[] = [
  {
    id: "design", business: "Design studio", offer: "Onboarding & activation sprints",
    brief: "Find B2B software teams hiring for activation or onboarding. Show why a four-week design sprint could be relevant.",
    icp: "B2B software companies in India with 20–200 employees and a self-serve product.",
    company: "AsterOps", profile: "Bengaluru · 84 employees", product: "Self-serve workflow software", contact: "Head of Product",
    fit: [
      { criterion: "B2B software in India", evidence: "Workflow software based in Bengaluru, from the sample company profile." },
      { criterion: "20–200 employees", evidence: "An 84-person team, within the studio’s target range." },
      { criterion: "A self-serve product", evidence: "The beta release describes signup without a sales call (S2)." },
      { criterion: "A relevant design priority", evidence: "The open role explicitly owns activation and onboarding (S1)." },
    ],
    sources: [
      { type: "Careers page", title: "Senior Product Designer, Activation", extract: "Own the self-serve onboarding journey, from signup through the first completed workflow.", published: "1 Oct 2026", reviewed: "4 Oct 2026 · Role open" },
      { type: "Release notes", title: "A self-serve beta goes live", extract: "New teams can now create a workspace and try their first workflow without a sales call.", published: "2 Oct 2026", reviewed: "4 Oct 2026 · Beta open" },
    ],
    known: "AsterOps launched self-serve access and is hiring someone to own activation. Onboarding is explicitly part of the role.",
    hypothesis: "There may be onboarding work to tackle before a permanent designer joins. A focused sprint could help.",
    unknown: "Whether the team wants an outside design partner, has budget, or already has the work covered.",
    subject: "AsterOps’ self-serve onboarding",
    outreach: [
      "Hi [First name],",
      "I saw AsterOps’ opening for a product designer focused on activation, alongside your new self-serve beta.",
      "We help B2B software teams improve the journey from signup to first value. Is onboarding something you want outside help with while you hire, or are you keeping that work in-house?",
      "If it’s useful, I can share how we’d scope a four-week onboarding sprint.",
    ],
    notes: [
      { title: "Start with the evidence", text: "The hiring post and beta launch give the opening a specific reason." },
      { title: "Ask, don’t assume", text: "The question leaves room for the team to prefer an internal hire." },
      { title: "Offer a small next step", text: "A sprint outline gives them something concrete to consider." },
    ],
  },
  {
    id: "revops", business: "RevOps consultancy", offer: "CRM setup & sales handoffs",
    brief: "Find growing SaaS teams building a sales operation around HubSpot. Look for a reason to discuss lead routing and handoffs.",
    icp: "B2B SaaS companies in India with 50–250 employees, using HubSpot and expanding their sales team.",
    company: "MorrowDesk", profile: "Pune · 126 employees", product: "Customer-support software", contact: "VP of Sales",
    fit: [
      { criterion: "B2B SaaS in India", evidence: "Customer-support software based in Pune, from the sample company profile." },
      { criterion: "50–250 employees", evidence: "A 126-person team, within the consultancy’s target range." },
      { criterion: "HubSpot in the workflow", evidence: "The RevOps job description names HubSpot ownership (S2)." },
      { criterion: "A growing sales team", evidence: "The funding announcement describes expanding sales coverage (S1)." },
    ],
    sources: [
      { type: "Company announcement", title: "A Series A to expand sales coverage", extract: "Following our Series A, we’re expanding our sales team to serve more mid-market support teams.", published: "29 Sep 2026", reviewed: "4 Oct 2026 · Announcement reviewed" },
      { type: "Careers page", title: "First Revenue Operations Manager", extract: "Own HubSpot, lead assignment, and the handoff between marketing, sales, and customer success.", published: "2 Oct 2026", reviewed: "4 Oct 2026 · Role open" },
    ],
    known: "MorrowDesk is expanding sales and hiring its first RevOps manager. The role includes HubSpot and cross-team handoffs.",
    hypothesis: "A focused routing review may be useful while the team grows and the RevOps role is being filled.",
    unknown: "Whether the current process needs work, whether another partner is involved, or whether external support is a priority.",
    subject: "MorrowDesk’s HubSpot handoffs",
    outreach: [
      "Hi [First name],",
      "I read about MorrowDesk’s sales expansion and noticed your first RevOps hire will own HubSpot and cross-team handoffs.",
      "We help SaaS teams set up lead routing and sales handoffs. Is a review of that workflow useful while you hire, or is it already covered?",
      "Happy to share the checklist we’d use for a focused HubSpot routing review.",
    ],
    notes: [
      { title: "Connect two signals", text: "Sales expansion explains the timing; the role identifies the relevant work." },
      { title: "Avoid inventing a problem", text: "Hiring a RevOps manager doesn’t mean the existing CRM is broken." },
      { title: "Make the offer specific", text: "A routing checklist relates directly to the responsibilities in the post." },
    ],
  },
  {
    id: "recruiting", business: "Recruiting agency", offer: "Specialist engineering hiring",
    brief: "Find fintech teams hiring several backend engineers for a new product. Check the role requirements before suggesting recruiting support.",
    icp: "Fintech software companies in India with 30–150 employees and multiple open backend engineering roles.",
    company: "KiteLedger", profile: "Bengaluru · 92 employees", product: "Payment-reconciliation software", contact: "Head of Talent",
    fit: [
      { criterion: "Fintech software in India", evidence: "Payment-reconciliation software based in Bengaluru, from the sample profile." },
      { criterion: "30–150 employees", evidence: "A 92-person team, within the agency’s target range." },
      { criterion: "Several backend openings", evidence: "The careers page lists four backend roles for the payments team (S1)." },
      { criterion: "Relevant specialist skills", evidence: "The roles ask for Go and distributed-systems experience (S1)." },
    ],
    sources: [
      { type: "Careers page", title: "Four backend roles on the payments team", extract: "We’re hiring four backend engineers with Go and distributed-systems experience for our reconciliation product.", published: "30 Sep 2026", reviewed: "4 Oct 2026 · Roles open" },
      { type: "Product announcement", title: "Reconciliation beta opens to new teams", extract: "Our reconciliation beta is now available to finance teams managing payments across multiple providers.", published: "2 Oct 2026", reviewed: "4 Oct 2026 · Beta open" },
    ],
    known: "KiteLedger has four backend openings tied to its reconciliation product, which has just opened its beta.",
    hypothesis: "A specialist candidate search could be relevant to this hiring plan. The posts don’t establish hiring urgency.",
    unknown: "Whether agencies are accepted, which roles need support, and whether an internal recruiting team is already handling them.",
    subject: "KiteLedger’s backend engineering roles",
    outreach: [
      "Hi [First name],",
      "I noticed KiteLedger’s four Go backend openings for reconciliation, alongside the new beta announcement.",
      "We recruit backend engineers with payments and distributed-systems experience. Are you considering specialist recruiting support for any of these roles, or is the search fully in-house?",
      "If there’s a fit, I can share how we’d scope a search around the requirements in your posts.",
    ],
    notes: [
      { title: "Reference the actual roles", text: "The opening names the skills and product in the sample careers post." },
      { title: "Check permission to help", text: "An open job doesn’t mean the team wants an agency." },
      { title: "Keep the promise grounded", text: "It offers a search approach without inventing available candidates." },
    ],
  },
];
