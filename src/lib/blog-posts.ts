// Blog content lives here as structured blocks so the article page can render
// consistent editorial typography and the listing can pull metadata.

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "callout"; lines: string[] }
  | { type: "numbered"; items: { title: string; text: string }[] }
  | { type: "bullets"; items: string[] }
  | { type: "cta"; text: string };

export interface Author {
  name: string;
  /** Public profiles linked in the byline and Article schema. */
  linkedin: string;
  x: string;
}

export const DHRUV_PRADEEP: Author = {
  name: "Dhruv Pradeep",
  linkedin: "https://www.linkedin.com/in/dhruvprad/",
  x: "https://x.com/dhruvprad",
};

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** Short deck shown under the title on the article page. */
  dek: string;
  category: string;
  date: string; // ISO
  /** Actual editorial revision date, never the build time. */
  updated?: string;
  readingMinutes: number;
  author: Author;
  /** Path to the cover image under /public. */
  cover: string;
  body: Block[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "apollo-vs-cnvrted",
    title: "Cnvrted vs Apollo: Names vs. Buyers",
    excerpt:
      "Compare Apollo’s prospecting and intent tools with Cnvrted’s approach to public buying signals. Choose based on evidence, workflow, and your team’s needs.",
    dek: "Compare the evidence behind a prospect, the workflow around it, and the tools your team needs to turn context into a conversation.",
    category: "Comparison",
    date: "2026-07-24",
    updated: "2026-10-04",
    readingMinutes: 7,
    author: DHRUV_PRADEEP,
    cover: "/figma/blogs/apollo-comparison.png",
    body: [
      {
        type: "p",
        text: "Choosing a prospecting tool starts with the work your team needs to do. This comparison looks at Apollo’s prospecting and engagement tools alongside Cnvrted’s approach to public buying signals. We build Cnvrted, so this is our perspective, with links to Apollo’s own documentation for its capabilities.",
      },
      {
        type: "p",
        text: "Both products can help a team decide whom to contact. The useful question is what evidence you can inspect and how that evidence fits your outreach workflow.",
      },
      { type: "h2", text: "What Apollo is genuinely great at" },
      { type: "p", text: "Apollo earned its place. Credit where it's due:" },
      {
        type: "p",
        text: "**Prospecting.** Apollo offers contact and company search, enrichment, and filters for building prospect lists.",
      },
      {
        type: "p",
        text: "**Consolidation.** Apollo combines prospecting with sequencing, calling, and integrations. Its [pricing page](https://www.apollo.io/pricing) describes the current plans, credit rules, and feature availability; check the billing period and limits when comparing costs.",
      },
      {
        type: "p",
        text: "**It's a complete outbound stack.** Find, sequence, dial, track — all in one place. That's not nothing. For a lot of SMB teams, it's exactly right.",
      },
      {
        type: "p",
        text: "If your bottleneck is *coverage and consolidation* — you need volume, and you need it cheap and in one place — Apollo is a fine answer. Genuinely.",
      },
      { type: "h2", text: "What does the intent data tell you?" },
      { type: "p", text: "Start by asking what you can verify about each prospect." },
      {
        type: "p",
        text: "Apollo’s [Buying Intent documentation](https://www.apollo.io/product/buying-intent) describes company-level topic signals and says intent is available on all plans, including free, with topic limits varying by plan. It should not be described as a tool with no intent data.",
      },
      {
        type: "p",
        text: "For any tool, ask: can I inspect the source, identify the person or company involved, and see when the event happened? A topic-level signal and a direct request for a recommendation provide different kinds of evidence.",
      },
      {
        type: "p",
        text: "Evaluate that evidence against your own product. An account researching a topic may be relevant, but it does not establish who controls the budget or whether a purchase is planned.",
      },
      { type: "h2", text: "Coverage vs. timing: two different bets" },
      {
        type: "p",
        text: "This is the real distinction, and it's worth naming plainly:",
      },
      {
        type: "p",
        text: "**Apollo is a bet on coverage.** More contacts, more filters, more reach. The theory: if you can reach enough of the right-shaped people, some fraction will be in-market. It's a volume game, and Apollo plays it well.",
      },
      {
        type: "p",
        text: "**Cnvrted is a bet on timing.** We read LinkedIn, Reddit, and X in real time and surface actual buying-intent signals — a specific person complaining about their current vendor, a founder posting three times this week about the exact pain you solve, a leadership hire that just unlocked a mandate. Not “this account is probably researching your category.” *This person, this post, this window, right now.*",
      },
      {
        type: "p",
        text: "Cnvrted’s aim is to connect the signal, its source, and your ICP in one research workflow. A signal is a reason to investigate; it does not prove someone will buy.",
      },
      { type: "h2", text: "So which do you need?" },
      { type: "p", text: "Honestly? It depends on what your bottleneck is." },
      {
        type: "p",
        text: "**Use Apollo if** your problem is reach — you need a big list, a sequencer, and a dialer in one affordable place, and you're comfortable running a volume motion. It's the right tool for that job.",
      },
      {
        type: "p",
        text: "**Use Cnvrted if** your problem is *timing* — you're already reaching people, but you're reaching them cold, at the wrong moment, and your reply rates show it. If the question keeping you up isn't “who could I email?” but “who's worth emailing *today*?” — that's the gap we were built for.",
      },
      {
        type: "p",
        text: "If you already use an outreach platform, assess whether Cnvrted adds useful research context to that workflow. [Book a conversation with our team](/contact) to confirm the integrations and handoffs you need.",
      },
      { type: "h2", text: "How to make the choice" },
      {
        type: "p",
        text: "Compare both tools with the same small set of target accounts. Check source quality, relevance, missing information, and the time your team spends verifying each lead.",
      },
      {
        type: "p",
        text: "Measure replies, qualified conversations, and time spent in your own trial. We do not have a controlled, head-to-head benchmark showing that one platform produces a particular conversion multiple.",
      },
      { type: "p", text: "Choose the workflow that gives your team a defensible reason to reach out." },
      { type: "p", text: "**Better evidence. More relevant conversations.**" },
      {
        type: "cta",
        text: "[Explore Cnvrted’s plans](/pricing), [learn how to qualify buying signals](/learn/buying-signals), or [see a customer campaign](/case-studies/from-cold-emails-to-warm-conversations).",
      },
    ],
  },
  {
    slug: "what-is-a-gtm-play",
    title: "What Is a GTM Play (and Why Your Signals Are Useless Without One)",
    excerpt:
      "A go-to-market play is the smallest unit of GTM that actually compounds — trigger, segment, motion, outcome. Here's the anatomy, and why signals and plays only work together.",
    dek: "The smallest unit of go-to-market that actually compounds — and why a signal with no play is trivia, while a play with no signal is spam.",
    category: "Go-to-market",
    date: "2026-07-23",
    readingMinutes: 6,
    author: DHRUV_PRADEEP,
    cover: "/figma/blogs/gtm-play.png",
    body: [
      {
        type: "p",
        text: "Most GTM teams don't have a strategy. They have an engine — one big outbound sequence, pointed at one big list, running at full volume, hoping the numbers work out. It's the sales equivalent of praying at scale.",
      },
      {
        type: "p",
        text: "A GTM play is the opposite of that. It's the smallest unit of go-to-market that actually compounds.",
      },
      { type: "h2", text: "The definition" },
      {
        type: "p",
        text: "A go-to-market play is a repeatable motion that fires off a specific trigger, targets a specific segment, runs a specific sequence, and drives toward a specific, measurable outcome.",
      },
      {
        type: "p",
        text: "Read that again, because every word is load-bearing. If any one of those four things is missing, you don't have a play — you have activity.",
      },
      { type: "p", text: "Here's the anatomy:" },
      {
        type: "numbered",
        items: [
          {
            title: "A trigger.",
            text: "The thing that makes an account worth touching right now. A funding round. A leadership hire into a buying role. A competitor sunsetting a product. A spike in intent — someone in the account posting about the exact problem you solve, three times this week, on LinkedIn and Reddit. The trigger is what turns “someday” into “today.”",
          },
          {
            title: "A segment.",
            text: "Who exactly this play is for. Persona plus fit. A play built for a Series B VP of Sales is not the same play you run at a bootstrapped founder, and pretending otherwise is why your reply rates are what they are.",
          },
          {
            title: "A motion.",
            text: "The actual sequence of touches. Outbound email plus a coordinated ad retarget. A personalized LinkedIn note referencing the trigger. An in-product nudge. A warm intro request. Whatever it is, it's scripted around the trigger — not generic copy with a first name swapped in.",
          },
          {
            title: "An outcome.",
            text: "Meetings booked. Pipeline created. Expansion revenue. If you can't measure whether the play worked, you can't kill it when it doesn't, and you can't clone it when it does.",
          },
        ],
      },
      { type: "h2", text: "A play looks like this" },
      {
        type: "callout",
        lines: [
          "When a contact at a target account changes jobs into a VP+ revenue role,",
          "target the account within their first 45 days,",
          "run a personalized outbound sequence referencing their new mandate plus a case-study ad retarget on the company,",
          "to book a first meeting.",
        ],
      },
      {
        type: "p",
        text: "That's it. Trigger, segment, motion, outcome. Named, written down, runnable a hundred times.",
      },
      {
        type: "p",
        text: "Notice what it is *not*: it's not “do more outbound.” It's not “target VPs.” It's a specific bet on a specific window of buying energy, with a specific plan for what to do with it.",
      },
      { type: "h2", text: "Why most teams never get here" },
      {
        type: "p",
        text: "Because plays require a reason to reach out, and most GTM stacks can't supply one.",
      },
      {
        type: "p",
        text: "The average sales tool hands you names. Titles, emails, a firmographic filter, maybe a phone number. That's a list. A list has no trigger baked into it — everyone on it is equally cold, which means everyone on it is equally ignorable. You can only run one play against a list: “you exist, so I'm emailing you.” And buyers have learned to delete that play on sight.",
      },
      {
        type: "p",
        text: "This is the whole problem with name-based selling. Contact data tells you who *could* theoretically buy. It says nothing about who is moving *right now*. So teams compensate with volume, volume tanks reply rates, and the engine grinds louder for less.",
      },
      { type: "h2", text: "Signals are the trigger layer" },
      {
        type: "p",
        text: "A play is only as good as the trigger that starts it. And triggers don't live in a static contact database — they live in the open, in real time, in what buyers are actually saying and doing.",
      },
      {
        type: "p",
        text: "Someone complaining about their current vendor on X. A hiring spree that implies a new initiative. A founder posting three times this week about the exact pain you kill. A thread on Reddit where your ICP is comparing tools out loud. That's not noise. That's a starting gun.",
      },
      {
        type: "p",
        text: "This is the entire premise behind **Cnvrted**. We read LinkedIn, Reddit, and X in real time and surface the buying-intent signals — so every play in your library has a trigger to fire on. Buyers, not names. Think of it as a Bloomberg terminal for buying intent: not a directory of who exists, but a live feed of who's in motion.",
      },
      {
        type: "p",
        text: "Because here's the uncomfortable truth — a signal with no play attached is trivia, and a play with no signal is spam. They only work together.",
      },
      { type: "h2", text: "Build a library, not an engine" },
      {
        type: "p",
        text: "The teams that win don't run one play louder. They run a library of small, sharp plays, each wired to a different signal:",
      },
      {
        type: "bullets",
        items: [
          "**Job-change play** → fires on a buyer moving into a target role",
          "**Competitor-churn play** → fires when someone's publicly griping about a rival",
          "**Funding play** → fires on a raise, when budget just unlocked",
          "**Intent-spike play** → fires when an account lights up across multiple channels in a short window",
          "**Expansion play** → fires on a usage threshold inside an existing account",
        ],
      },
      {
        type: "p",
        text: "Each one is small. Each one is measurable. Each one gets refined or retired on its own numbers. And because they're all triggered by real movement, none of them feels like a cold blast to the person on the receiving end.",
      },
      {
        type: "p",
        text: "That's the shift: from spraying a list to responding to the market. From volume to timing. From names to buyers.",
      },
      { type: "h2", text: "The takeaway" },
      {
        type: "p",
        text: "A GTM play isn't a campaign or a channel or a tactic. It's a repeatable bet on a moment — trigger, segment, motion, outcome. The engine model tries to manufacture those moments through sheer force. The play model catches them, because it's listening.",
      },
      {
        type: "p",
        text: "Your CRM can hold the plays. But something has to supply the triggers.",
      },
      { type: "p", text: "That's the part we built." },
      {
        type: "cta",
        text: "Cnvrted surfaces real-time buying-intent signals from LinkedIn, Reddit, and X, so your GTM plays fire on buyers who are actually moving — not names on a list. [Buyers, not names.](https://cnvrted.com/)",
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
