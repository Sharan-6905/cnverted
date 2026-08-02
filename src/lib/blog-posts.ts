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
  /** Public profile the byline links to, and the sameAs used in Article schema. */
  linkedin: string;
}

export const DHRUV_PRADEEP: Author = {
  name: "Dhruv Pradeep",
  linkedin: "https://www.linkedin.com/in/dhruvprad/",
};

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** Short deck shown under the title on the article page. */
  dek: string;
  category: string;
  date: string; // ISO
  readingMinutes: number;
  author: Author;
  /** Path to the cover image under /public. */
  cover: string;
  body: Block[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "apollo-vs-cnvrted",
    title: "Apollo vs. Cnvrted: Names vs. Buyers",
    excerpt:
      "An honest comparison — where Apollo genuinely wins, where it structurally can't, and how to tell which one your team actually needs. Coverage is a bet on reach; timing is a bet on now.",
    dek: "Where Apollo genuinely wins, where it structurally can't, and how to tell which your team needs. One is a bet on coverage; the other on timing.",
    category: "Comparison",
    date: "2026-07-24",
    readingMinutes: 7,
    author: DHRUV_PRADEEP,
    cover: "/blog-apollo-vs-cnvrted.svg?v=2",
    body: [
      {
        type: "p",
        text: "If you're running B2B outbound, you've used Apollo — or you've at least had the tab open. It's the default. So let's do the honest comparison, not the hit piece: where Apollo genuinely wins, where it structurally can't, and how to tell which one your team actually needs.",
      },
      {
        type: "p",
        text: "Spoiler: they're not really the same category. And pretending Apollo has no strengths would be the fastest way to lose your trust, so we won't.",
      },
      { type: "h2", text: "What Apollo is genuinely great at" },
      { type: "p", text: "Apollo earned its place. Credit where it's due:" },
      {
        type: "p",
        text: "**Coverage.** A database of 200M+ contacts and 30M+ companies is a serious asset. If your job is “find me every Director of Sales at a Series B SaaS company in North America,” Apollo will hand you a list in seconds. That breadth is real and it's hard to build.",
      },
      {
        type: "p",
        text: "**Consolidation.** For $49–119 per user per month, you get a contact database, email sequencing, a dialer, CRM sync, and an AI assistant under one roof. For an early-stage team that would otherwise stitch together four tools, that's a genuinely good deal, and the free tier is one of the most generous in the category.",
      },
      {
        type: "p",
        text: "**It's a complete outbound stack.** Find, sequence, dial, track — all in one place. That's not nothing. For a lot of SMB teams, it's exactly right.",
      },
      {
        type: "p",
        text: "If your bottleneck is *coverage and consolidation* — you need volume, and you need it cheap and in one place — Apollo is a fine answer. Genuinely.",
      },
      { type: "h2", text: "The one thing it structurally can't do" },
      { type: "p", text: "Here's the line." },
      {
        type: "p",
        text: "Apollo tells you **who exists**. At its best — on the higher tiers, where intent data is unlocked — it tells you which *topics* an account is broadly researching. That intent is **topic-level and account-level**: aggregated, gated by plan tier, and generally inferred from third-party web activity. It's a probability that *someone somewhere* at a company has been reading about your category.",
      },
      {
        type: "p",
        text: "What it does not tell you is: **which specific person is voicing that intent, in their own words, right now.**",
      },
      {
        type: "p",
        text: "That's not a knock on Apollo's execution — it's a limit of the model. A static database is a snapshot. It's updated, sure, but its native question is *“who fits?”* — not *“who's moving today?”* Topic-level intent is a blurry heat map of a building. It doesn't point at the person standing at the window waving.",
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
        text: "One is a directory. The other is a live feed. Apollo answers *who could buy*. Cnvrted answers *who's buying* — the trigger you actually build a play around.",
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
        text: "And plenty of teams run both: Apollo for the reach and the send, Cnvrted for the trigger that tells you *when* the send is worth making. A signal that fires into an Apollo sequence is worth ten cold ones.",
      },
      { type: "h2", text: "The honest bottom line" },
      {
        type: "p",
        text: "Apollo isn't bad. It's the best version of a static-database, coverage-first tool, and that model has a real place in a GTM stack.",
      },
      {
        type: "p",
        text: "But coverage was never the hard part of modern selling. *Timing* is. The buyer who's moving right now converts at a multiple of the buyer who merely fits your ICP — and no amount of database size tells you which is which. That takes listening to the market as it speaks, in real time, in the open.",
      },
      { type: "p", text: "Apollo gives you names. We give you buyers." },
      { type: "p", text: "**Buyers, not names.**" },
      {
        type: "cta",
        text: "Cnvrted surfaces real-time buying-intent signals from LinkedIn, Reddit, and X — so your outbound fires on people who are actually moving, not names on a list. [See what's firing in your market.](https://cnvrted.com)",
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
    cover: "/blog-gtm-play.svg?v=3",
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
