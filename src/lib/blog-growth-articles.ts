import type { Author, BlogPost } from "./blog-posts";

const team: Author = {
  name: "Cnvrted team",
  type: "Organization",
  linkedin: "https://www.linkedin.com/company/cnvrted",
  x: "https://x.com/cnvrted",
};

// Search intent researched on 2026-10-15. These are editorial keyword targets,
// not measured search volumes or ranking forecasts. Examples are illustrative.
export const GROWTH_ARTICLES: BlogPost[] = [
  {
    slug: "first-b2b-customers-buying-signals",
    title: "How to find your first B2B customers using buying signals",
    searchTitle: "Find Your First B2B Customers Using Buying Signals",
    excerpt: "A practical founder-led sales plan: choose a narrow buyer, research buying signals, start useful conversations, and scope a paid pilot.",
    dek: "Start with one problem, a small set of accounts, and a reason to talk today.",
    category: "Founder-led sales",
    date: "2026-10-15",
    sitemapModified: "2026-10-15",
    showContents: true,
    readingMinutes: 5,
    author: team,
    cover: "/articles/first-customers.png",
    coverAlt: "Three connected steps: observe a buying signal, confirm the problem, and agree a small pilot.",
    body: [
      { type: "p", text: "To find your first B2B customers, choose a narrowly defined buyer, look for a recent event connected to a problem you solve, and use that evidence to start a conversation. Confirm the need before proposing a small paid engagement. A buying signal gives you a reason to ask; it does not tell you that a sale is waiting." },
      { type: "p", text: "Your earliest prospect list should also be a learning tool. You need to discover which problems people describe in their own words, who owns the work, and what they are willing to change. A list of thousands can make those questions harder to answer because every account introduces a different explanation." },
      { type: "h2", text: "Choose a problem you can deliver against now" },
      { type: "p", text: "Write a one-sentence offer with a buyer, a workflow, and a bounded outcome. For example: ‘We help small B2B software teams clean up lead routing when their first sales hires join.’ That is specific enough to guide research. ‘We help companies grow with AI’ leaves you guessing whom to contact and why." },
      { type: "p", text: "Check your delivery constraints before building the list. If you only support one CRM, need access to a particular data source, or cannot handle an enterprise procurement process, put that in your [ideal customer profile](/learn/ideal-customer-profile). Early enthusiasm is not a substitute for being able to do the work." },
      { type: "h2", text: "Build a small evidence-backed account list" },
      { type: "p", text: "Start with a manageable research batch, such as 20 accounts. This is a suggested workload, not a conversion benchmark. Look through your existing network, company announcements, public professional posts, and relevant communities. A warm introduction can still be your best route when you find a timely reason to talk." },
      { type: "table", caption: "What to record before contacting an account", headers: ["Field", "Useful entry"], rows: [
        ["Fit", "B2B software company using the CRM you support"],
        ["Observed event", "A sales leader describes duplicate lead assignments"],
        ["Evidence", "Original public source, event date, and date checked"],
        ["Working hypothesis", "Routing rules may need attention as the team grows"],
        ["Unknown", "Whether the problem is still open or already owned internally"],
        ["Next step", "Ask whether a routing review would be useful"]
      ] },
      { type: "p", text: "Separate observation from interpretation in every entry. ‘Hiring two account executives’ is something you can verify. ‘Has budget for our service’ is a conclusion that the job advertisement does not establish. If the original post says the issue has been solved, remove the account from this play rather than finding another excuse to pitch." },
      { type: "h2", text: "Turn one signal into a useful opening" },
      { type: "p", text: "Here is a fictional example. Northline Software’s sales lead posts about duplicate assignments after a team expansion. You provide CRM implementation services and have a relevant routing checklist. Your message can connect the event to that specific resource without pretending to know their internal setup." },
      { type: "callout", lines: ["Hi Priya — I saw your post about duplicate lead assignments as the sales team grows. Is routing still something you’re sorting out?", "I put together a short checklist for checking assignment rules and ownership gaps. Happy to send it if useful."] },
      { type: "p", text: "Only offer a checklist that you actually have. Make it concrete enough to be useful without a call: which rule to inspect, what a conflicting assignment looks like, and how to test a change safely. If someone says the issue is handled or asks you to stop, close the loop instead of moving them into another sequence." },
      { type: "h2", text: "Use discovery to find out what the signal missed" },
      { type: "bullets", items: [
        "Ask for a recent example of the problem. What happened, and who had to fix it?",
        "Understand the workaround. How is the team managing it today?",
        "Identify the owner. Who would approve changes and help implement them?",
        "Explore timing. Is there a real milestone, or is this a someday improvement?",
        "Agree on evidence of success. What would be visibly different after the work?"
      ] },
      { type: "p", text: "Keep their answers, including contradictions. A founder who likes your idea but cannot name a current problem belongs in a different queue from a sales manager who can show a recurring failure. Use the [pre-outreach qualification guide](/blogs/qualify-prospects-before-cold-email) to keep fit, evidence, and unknowns separate." },
      { type: "h2", text: "Offer a pilot with a clear finish line" },
      { type: "p", text: "For the fictional routing service, a pilot could cover one inbound form, one assignment workflow, a documented set of fixes, and a handover session. Agree on the price, access needed, responsibilities, and acceptance criteria before starting. Do not promise a revenue increase from a change you have not tested." },
      { type: "p", text: "If delivery is manual at first, say so. Paul Graham’s [essay on doing things that do not scale](https://paulgraham.com/ds.html) makes the case for founders recruiting and helping early users directly. For this plan, the practical application is to learn which parts of your service deserve to become repeatable before automating them." },
      { type: "h2", text: "Review the learning before increasing volume" },
      { type: "p", text: "After your first research batch, group the outcomes: wrong fit, stale problem, useful reply, discovery held, and paid pilot agreed. A polite reply is not a customer. If several people recognize the problem but reject the offer, inspect the scope and proof. If they do not recognize the problem, revisit the signal and buyer before rewriting the email." },
      { type: "p", text: "Can you do this without a large audience? Yes: this approach depends on identifying and helping specific accounts. Can you guarantee a customer from 20 accounts? No. The batch is a way to make your assumptions testable, not a promised timetable for revenue." },
      { type: "cta", text: "Next, use the [signal-based outreach measurement guide](/blogs/signal-based-outreach-metrics) to track what happens after the first conversation, or [explore Cnvrted](/product) to see its approach to signal-led prospecting." }
    ]
  },
  {
    slug: "hiring-signals-for-sales",
    title: "Hiring signals for sales: what a job opening actually tells you",
    searchTitle: "Hiring Signals for Sales: Job Posts Worth Acting On",
    excerpt: "Learn to read job openings as sales signals, distinguish expansion from replacement, and check whether an outside service would actually help.",
    dek: "Read the work behind the role. Then check whether your offer belongs in the conversation.",
    category: "Signal research",
    date: "2026-10-15",
    sitemapModified: "2026-10-15",
    showContents: true,
    readingMinutes: 4,
    author: team,
    cover: "/articles/hiring-signals.png",
    coverAlt: "A job description connects to three research questions: the work, the context, and the gap.",
    body: [
      { type: "p", text: "A hiring signal is a job opening or hiring announcement that suggests a company is investing in a particular kind of work. For sales research, the useful information is usually in the responsibilities, tools, and expected outcomes. A vacancy alone does not establish purchasing intent, an external vendor budget, or a willingness to outsource." },
      { type: "p", text: "Consider a company hiring a marketing operations manager. The role might exist to build a new function, replace someone, consolidate agencies, or maintain an established system. Those explanations lead to very different outreach decisions. Your research should narrow them before your message assumes one is true." },
      { type: "h2", text: "Read responsibilities before titles" },
      { type: "p", text: "Titles are inconsistent across companies. Instead, look for the task that overlaps with your offer: migrating a CRM, establishing lifecycle reporting, improving onboarding, or managing a new region. Save the original job URL and a short excerpt that supports your interpretation. Keep the date you checked it alongside any publication date the source provides." },
      { type: "table", caption: "Job requirements and the questions they create", headers: ["Observed requirement", "Question to investigate"], rows: [
        ["Own a CRM migration", "Is the platform chosen, and is outside implementation support wanted?"],
        ["Build the first customer-success process", "What exists today, and what must wait for the new hire?"],
        ["Launch a regional sales team", "Is there a confirmed launch, with a market you can serve?"],
        ["Bring paid acquisition in-house", "Would your agency conflict with the stated direction?"],
        ["Maintain existing reporting", "Is there a change underway, or ordinary ongoing work?"]
      ] },
      { type: "p", text: "The last two rows matter. Research should help you reject an attractive-looking account when your service is a poor match. A company hiring an internal specialist may want less outside support. Do not convert that evidence into ‘they are overwhelmed and need us’ without a separate reason." },
      { type: "h2", text: "Check freshness and find a second piece of context" },
      { type: "numbered", items: [
        { title: "Check the original careers page.", text: "Confirm the vacancy is still open. A copied listing on a job board can outlive the role. A refreshed listing date may reflect a repost rather than a new initiative." },
        { title: "Read the surrounding announcements.", text: "Look for a launch, a team expansion, or a leader describing the same project. Two job boards repeating one advertisement are still one source." },
        { title: "Identify the responsible function.", text: "The recruiter may know the vacancy but may not own the project you can help with. Find a credible workstream owner without assuming a senior title means purchase authority." },
        { title: "Look for evidence against your hypothesis.", text: "An already completed migration, a closed vacancy, or an explicit move in-house can change your decision. Record it instead of burying it in the notes." }
      ] },
      { type: "p", text: "You will not always establish whether a role is a backfill. Mark that as unknown. Uncertainty should change the wording of your question; it should not become a made-up fact in a personalized email." },
      { type: "h2", text: "A worked example: three accounts, three decisions" },
      { type: "p", text: "Imagine you provide onboarding documentation for B2B software teams. These companies and circumstances are fictional. Cedar Systems advertises a first customer-success hire and its founder discusses inconsistent handovers. That combination gives you a reason to ask whether documenting the current process would help the incoming hire." },
      { type: "p", text: "Harbor Apps advertises the same title but says the hire will maintain a mature onboarding library. You have no evidence that your documentation service addresses a current gap. Hold the account. Lumen Works explicitly says it is replacing outsourced onboarding support with an internal team. Exclude it from this particular offer unless new evidence changes the situation." },
      { type: "callout", lines: ["A possible opening for Cedar: ‘Your customer-success role mentions standardizing handovers, and your recent post raised the same issue. Would mapping the current handover before the new hire starts be useful, or is that already covered?’"] },
      { type: "p", text: "This opening describes the evidence and leaves room for correction. It does not claim that the company is struggling, that the hire has a fixed start date, or that you know its budget. If you offer a process map, be ready to explain what inputs you need and what the team would receive." },
      { type: "h2", text: "Save a research note another person can inspect" },
      { type: "bullets", items: [
        "Company and role; original job URL; date checked; current open or closed status.",
        "Relevant responsibility in the listing and the business problem it might indicate.",
        "Independent supporting context, with its own source and date.",
        "Contradicting evidence and questions you still cannot answer.",
        "Decision: contact, research further, hold, or exclude; with one sentence explaining why."
      ] },
      { type: "p", text: "How quickly should you act? There is no universal number of days. A current project with an unresolved gap deserves a different response from a months-old evergreen vacancy. Recheck the evidence before outreach. How many open roles make a company qualified? No count does that on its own: the work and your fit matter more than the number of advertisements." },
      { type: "cta", text: "Combine hiring with other [buying-signal examples](/learn/buying-signals), then use the [agency outbound playbook](/blogs/signal-based-outbound-for-agencies) to turn a verified gap into a bounded offer." }
    ]
  },
  {
    slug: "qualify-prospects-before-cold-email",
    title: "How to qualify a prospect before sending a cold email",
    searchTitle: "Qualify Prospects Before Cold Email: A Practical Checklist",
    excerpt: "Use fit, source evidence, timing, and ownership to decide whom to contact. Includes a qualification checklist, sample research note, and email.",
    dek: "Know enough to ask a useful question. Leave room for the buyer to correct your assumptions.",
    category: "Prospect qualification",
    date: "2026-10-15",
    sitemapModified: "2026-10-15",
    showContents: true,
    readingMinutes: 4,
    author: team,
    cover: "/articles/prospect-qualification.png",
    coverAlt: "Four qualification gates: fit, evidence, timing, and a useful next step.",
    body: [
      { type: "p", text: "Before sending a cold email, check whether the company fits your offer, whether there is credible evidence of a relevant problem, and whether the person is connected to that work. Record what you still do not know. The result is a decision about whether to start a conversation, not a claim that the prospect is ready to buy." },
      { type: "p", text: "This distinction prevents a common mistake: filling a spreadsheet with guessed budget, urgency, and authority, then treating it as qualification. Public research can establish some facts. Other questions require a conversation with the people doing the work." },
      { type: "h2", text: "Separate outreach readiness from sales qualification" },
      { type: "p", text: "[Salesforce describes BANT](https://www.salesforce.com/blog/sales/what-is-bant-lead-generation/) as budget, authority, need, and timeline. Those are useful areas to explore as a sales conversation develops. Before contact, you may only have partial evidence of need and timing. Funding is not the same as an allocated budget, and a department title does not confirm approval authority." },
      { type: "p", text: "Use a smaller pre-outreach decision: can you explain why this account, why this issue, and why your contribution would be useful? If the explanation depends on assumptions you cannot name, the account needs more research." },
      { type: "h2", text: "Use four gates before drafting" },
      { type: "numbered", items: [
        { title: "Fit: can we serve them?", text: "Check the business model, required tools, geography, and delivery constraints that matter to your offer. A strong signal cannot compensate for a requirement you cannot meet." },
        { title: "Evidence: what actually happened?", text: "Find the original source. Record the event and date, then write the possible implication separately. A direct request for help and a generic company announcement deserve different levels of confidence." },
        { title: "Timing: is the situation still open?", text: "Read updates and replies. Check whether the project was completed, the role filled, or a vendor selected. Do not manufacture urgency from an old event." },
        { title: "Relevance: can this person act on the message?", text: "Identify the function involved and a plausible owner. Define a helpful next step you can genuinely provide. ‘Book my demo’ is not a reason the buyer needs one." }
      ] },
      { type: "p", text: "Use gates rather than a score that hides serious failures. A prospect can earn points for company size, funding, and engagement while still requiring a capability you do not offer. That account should not reach the outreach queue because its total looks impressive." },
      { type: "h2", text: "Route the account into one of four queues" },
      { type: "table", caption: "A practical pre-outreach decision table", headers: ["Queue", "Decision rule", "Next action"], rows: [
        ["Contact", "Fit and evidence support a useful question", "Recheck the source and draft a specific opening"],
        ["Research", "One material fact could change the decision", "Name that fact and where to verify it"],
        ["Hold", "Relevant account, but no current reason to act", "Record the event that would justify revisiting"],
        ["Exclude", "Cannot serve them, or outreach is unwanted", "Record the reason and prevent repeat outreach"]
      ] },
      { type: "p", text: "Set a practical research limit for your team. If ten minutes is your starting budget per account, use it to answer the most consequential uncertainty first. This is an operating choice, not a best-practice benchmark. Repeatedly failing to find the same information may mean your selection criteria are too ambitious." },
      { type: "h2", text: "A research note that becomes a better email" },
      { type: "p", text: "Here is a fictional example for a service that helps software companies improve trial onboarding. MapleDesk’s product lead publicly asks how other teams investigate setup abandonment. Its product matches the workflow you support. You have not seen internal conversion data, and you do not know whether a project is funded." },
      { type: "callout", lines: ["Observed: product lead asked about investigating setup abandonment in a current public discussion.", "Hypothesis: the team may benefit from a structured review of the setup flow.", "Unknown: size of the problem, existing owner, access requirements, budget.", "Decision: contact with a diagnostic question and a small, relevant resource."] },
      { type: "p", text: "A suitable email could say: ‘Your question about investigating setup abandonment caught my attention. Are you trying to identify the sticking point, or have you already found it? I have a short walkthrough checklist for separating confusing steps from technical failures. Happy to send it.’ Use this only if the checklist exists and fits your actual expertise." },
      { type: "p", text: "Avoid claiming that you spotted lost revenue or that the team’s onboarding is broken. The public question supports neither claim. If the reply says the issue is already resolved, update the account record rather than trying to force a discovery call." },
      { type: "h2", text: "What to confirm once they respond" },
      { type: "p", text: "Move from public clues to the buyer’s account of the problem. Ask what happens today, why it matters, what they have already tried, and who would participate in a change. Then discuss commercial fit and timing in context. Preserve their language in your notes so the next person does not turn a tentative interest into an invented commitment." },
      { type: "p", text: "What if no budget is public? Mark it unknown; most public research will not answer that question. What if the contact is not the decision-maker? They may still understand the workflow, but ask how decisions are made before treating them as an approver. Qualification becomes more reliable when the record can distinguish a fact, an inference, and a buyer-confirmed answer." },
      { type: "cta", text: "See the [signal-to-outreach walkthrough](/learn/signal-to-outreach) for the broader flow, then [measure qualified conversations](/blogs/signal-based-outreach-metrics) instead of counting every reply as progress." }
    ]
  },
  {
    slug: "signal-based-outbound-for-agencies",
    title: "A signal-based outbound playbook for agencies",
    searchTitle: "Signal-Based Outbound for Agencies: Two Practical Plays",
    excerpt: "Build agency outreach around a specific service and a verified client need. Two example plays include evidence checks, offers, messages, and stop rules.",
    dek: "Two focused plays, a deliverable you can explain, and a clear rule for when to stop.",
    category: "Agency growth",
    date: "2026-10-15",
    sitemapModified: "2026-10-15",
    showContents: true,
    readingMinutes: 4,
    author: team,
    cover: "/articles/agency-outbound.png",
    coverAlt: "An agency play connects a trigger, a verified gap, a small offer, and an agreed next step.",
    body: [
      { type: "p", text: "Signal-based outbound for agencies starts with an observable client event, checks whether it creates a problem your service can solve, and proposes a specific next step. It works as a planning method when the agency has a clear offer and rejects accounts where the evidence does not support that offer. A recent announcement alone is not a brief." },
      { type: "p", text: "The examples below are fictional operating plans, not reported customer campaigns or conversion benchmarks. Adapt the service, delivery constraints, and messages to work your agency can actually perform. For the underlying structure of trigger, segment, motion, and outcome, start with [what a GTM play is](/blogs/what-is-a-gtm-play)." },
      { type: "h2", text: "Pick one service your team has room to deliver" },
      { type: "p", text: "An agency that offers websites, branding, paid acquisition, and operations support does not need to sell all four in one message. Choose a service with a recognizable starting problem, a defined deliverable, and credible proof. Confirm who would do the work if prospects said yes this week." },
      { type: "p", text: "A two-week landing-page messaging sprint is easier to evaluate than ‘a growth partnership.’ That does not make two weeks the right duration for every agency. The point is to specify the work and dependencies, including access, stakeholder availability, and revision limits, before creating demand for it." },
      { type: "h2", text: "Play one: a launch with an unresolved messaging gap" },
      { type: "bullets", items: [
        "Service: a messaging and landing-page sprint for B2B software companies.",
        "Trigger: a company announces a new product or audience it is entering.",
        "Evidence to check: the announcement and live page address different audiences, or the owner publicly asks for feedback on positioning.",
        "Offer: a short review of one page, followed by a scoped paid sprint if the problem is confirmed.",
        "Stop rule: the launch is cancelled, the owner says the work is covered, or your observation does not survive a closer read."
      ] },
      { type: "p", text: "An unfamiliar design is not evidence of a failing page. Look for a concrete mismatch you can describe respectfully. In a fictional example, Fern Analytics announces a finance-team product, while the linked landing page still explains only its older developer tool. You can ask about that mismatch without guessing its conversion rate." },
      { type: "callout", lines: ["‘I saw the finance-team launch. The linked page still leads with the developer workflow — is a separate finance page already on the way? If useful, I can send a short outline for explaining the new use case.’"] },
      { type: "p", text: "Prepare the outline before offering it. Keep it bounded: the audience, the problem, the proof required, and a proposed page structure. Do not spend days creating an unsolicited redesign or imply that a speculative mock-up is a commissioned project." },
      { type: "h2", text: "Play two: a new hire who may need a clean handover" },
      { type: "bullets", items: [
        "Service: documenting customer onboarding for small software teams.",
        "Trigger: a first customer-success role, paired with public discussion of inconsistent handovers.",
        "Evidence to check: the role is current, the responsibilities match the problem, and there is no indication that outside help is unwanted.",
        "Offer: a current-state handover map and a prioritized documentation plan.",
        "Stop rule: the role is a routine replacement, the process is already documented, or the company is deliberately moving the work away from agencies."
      ] },
      { type: "p", text: "Your service should complement the hire rather than suggest replacing them. Ask whether a process map would help the new owner start with fewer unknowns. Do not claim that recruiting proves a capacity crisis. The [hiring-signals guide](/blogs/hiring-signals-for-sales) explains how to distinguish useful context from assumptions." },
      { type: "h2", text: "Give each account a one-page brief" },
      { type: "p", text: "Before someone sends the first message, the brief should identify the account, service fit, source URL, event date, verified gap, and relevant owner. Add a sentence of counter-evidence, even if it is simply ‘we do not know whether an internal team already owns this.’ Finish with the proposed deliverable and the question that would confirm whether it is useful." },
      { type: "p", text: "Have the person responsible for delivery review the first few briefs. They may catch a missing dependency that a salesperson cannot see: a migration requiring specialist access, an approval chain that makes the proposed schedule unrealistic, or a problem that needs engineering before design work can help." },
      { type: "h2", text: "Run a bounded pilot and inspect the handoff" },
      { type: "numbered", items: [
        { title: "Research a manageable batch.", text: "Keep the service and audience consistent enough to learn from the results. Save rejected accounts and reasons as well as accepted ones." },
        { title: "Send the specific question.", text: "Use the source accurately, offer something real, and let the recipient correct your interpretation. Respect a request to stop." },
        { title: "Follow up only with a useful addition.", text: "For example, clarify the scope or share the promised resource. Close the outreach after your limited follow-up plan; silence does not justify indefinite contact." },
        { title: "Qualify the work before quoting.", text: "Confirm the owner, inputs, desired outcome, approval process, price fit, and capacity. A booked meeting alone does not make a good project." }
      ] },
      { type: "p", text: "At review, ask where the play failed: no relevant events, weak fit, a mistaken problem, an unwanted offer, or delivery constraints. Change the earliest broken step. Sending more messages will not fix a service that requires access clients cannot provide. Track meetings held and projects accepted alongside research and delivery hours." },
      { type: "cta", text: "Use the [outreach metrics guide](/blogs/signal-based-outreach-metrics) to compare plays on consistent terms. If you are still defining your audience, return to the [first-customer research plan](/blogs/first-b2b-customers-buying-signals)." }
    ]
  },
  {
    slug: "signal-based-outreach-metrics",
    title: "How to measure whether signal-based outreach is working",
    searchTitle: "Signal-Based Outreach Metrics: Replies, Meetings & Cost",
    excerpt: "Measure signal-led outreach with clear denominators, qualified meetings, research costs, and fair comparisons. Includes a worked funnel and review checklist.",
    dek: "Follow accounts from evidence to a real conversation, and keep the cost of finding them in view.",
    category: "GTM measurement",
    date: "2026-10-15",
    sitemapModified: "2026-10-15",
    showContents: true,
    readingMinutes: 5,
    author: team,
    cover: "/articles/outreach-metrics.png",
    coverAlt: "An illustrative account funnel: 80 reached, 12 positive replies, 8 meetings booked, and 5 qualified meetings held.",
    body: [
      { type: "p", text: "Measure signal-based outreach by tracking how many relevant accounts become useful conversations and qualified meetings, then compare that progress with the time and money spent finding them. Define each stage before the campaign starts. Otherwise a larger contact list, a different reply definition, or a longer observation window can make a weak campaign look better." },
      { type: "p", text: "A signal can improve the reason for outreach without improving the economics of the campaign. Research takes time. Some interesting signals turn out to be stale, and some replies are corrections rather than sales interest. Your measurement should make those losses visible." },
      { type: "h2", text: "Choose an account-level view and keep the denominator stable" },
      { type: "p", text: "For this guide, count unique companies, not messages or individual contacts. An account is reached when at least one outreach email is reported delivered; delivery does not prove that a human read it. Keep contact-level delivery and bounce reporting separately. If you use several channels, define and record each channel’s equivalent instead of mixing unlike events." },
      { type: "p", text: "Count an account once per stage in a campaign. Three contacts at one company should not become three opportunities. Keep campaign membership stable and record the first outreach date so every account gets the same amount of time to produce an outcome." },
      { type: "table", caption: "Definitions for an account-level campaign", headers: ["Metric", "Definition or calculation"], rows: [
        ["Signal acceptance", "Accounts passing research checks ÷ accounts researched"],
        ["Positive reply rate", "Reached accounts with explicit relevant interest ÷ accounts reached"],
        ["Meeting booking rate", "Reached accounts with a meeting booked ÷ accounts reached"],
        ["Qualified meeting yield", "Reached accounts with a qualified meeting held ÷ accounts reached"],
        ["Cost per qualified meeting", "Campaign research, outreach labor, and allocated tool cost ÷ qualified meetings held"]
      ] },
      { type: "p", text: "Define a positive reply with examples your team agrees on. ‘Send the checklist’ is interest in a resource; you can track it separately from willingness to discuss a project. An out-of-office message, an unsubscribe, and ‘wrong person’ are not positive replies. A referral becomes sales interest only when the referred person engages." },
      { type: "h2", text: "Use a worked funnel to expose the drop-offs" },
      { type: "p", text: "The following numbers are a fictional example, not Cnvrted customer results or industry benchmarks. A campaign researches 120 accounts, accepts 90, and reaches 80. Twelve accounts express relevant interest, eight book a meeting, six attend, and five meet the team’s qualification definition." },
      { type: "table", caption: "Illustrative campaign arithmetic", headers: ["Measure", "Calculation", "Result"], rows: [
        ["Signal acceptance", "90 ÷ 120", "75%"],
        ["Positive reply rate", "12 ÷ 80", "15%"],
        ["Meeting booking rate", "8 ÷ 80", "10%"],
        ["Meeting attendance", "6 ÷ 8", "75%"],
        ["Qualified meeting yield", "5 ÷ 80", "6.25%"]
      ] },
      { type: "p", text: "Suppose research and outreach take 18 hours at an internal cost of $40 per hour, plus $80 in allocated tool costs. Total campaign cost is $800. Dividing by five qualified meetings gives $160 per qualified meeting. Include time spent rejecting the other accounts; excluding that work would understate the cost of the method." },
      { type: "p", text: "If no qualified meetings occur, report zero meetings and the cost incurred. Cost per meeting is undefined, not $0. Track proposals, won revenue, and delivery margin as later outcomes when enough time has passed, rather than assigning speculative revenue to every booked call." },
      { type: "h2", text: "Decide what makes a meeting qualified" },
      { type: "p", text: "Use criteria a colleague can apply to the meeting notes: the account fits the service, a relevant problem is confirmed, someone can explain how a change would be evaluated, and there is an agreed next step. You may need stricter criteria for your sales model. Record the reason when a held meeting does not qualify." },
      { type: "p", text: "Keep ‘booked,’ ‘held,’ and ‘qualified’ as separate stages. If bookings are healthy but attendance is weak, inspect expectations and scheduling. If people attend but describe a different problem, revisit your signal interpretation and [qualification process](/blogs/qualify-prospects-before-cold-email). Those problems require different fixes." },
      { type: "h2", text: "Compare similar groups before crediting the signal" },
      { type: "p", text: "Compare campaigns with similar buyer profiles, offers, channels, senders, and observation windows. Record differences you cannot control. A founder contacting warm introductions should not be compared directly with a new salesperson emailing unfamiliar accounts. If you change the offer and the signal together, the result describes the whole play, not the isolated effect of the signal." },
      { type: "p", text: "Small batches are useful for finding operational problems, but a few additional replies do not establish a reliable lift. Report the underlying counts alongside percentages and repeat the observation. More persuasive evidence comes from comparable cohorts and consistent outcomes over time, with selection differences acknowledged." },
      { type: "h2", text: "Treat opens as a diagnostic, not the outcome" },
      { type: "p", text: "[Mailchimp explains](https://mailchimp.com/help/about-open-and-click-rates/) that open tracking depends on images, while bot activity and privacy features can distort open and click measurements. An apparent open does not establish human interest. Use those metrics cautiously when investigating delivery or messaging; prioritize actual replies and verified sales stages when evaluating the campaign." },
      { type: "h2", text: "Run a weekly decision review" },
      { type: "bullets", items: [
        "Check which signal sources produced accepted accounts and why others were rejected.",
        "Read a sample of positive, negative, and misclassified replies rather than trusting labels alone.",
        "Review no-shows and unqualified meetings separately.",
        "Reconcile research hours, outreach time, and allocated tool costs.",
        "Choose one change to test next and write down what result would justify keeping it."
      ] },
      { type: "cta", text: "Apply this measurement plan to the [agency outbound plays](/blogs/signal-based-outbound-for-agencies) or the [first B2B customer workflow](/blogs/first-b2b-customers-buying-signals). Judge each by the conversations and work it creates, with the effort required included." }
    ]
  }
];
