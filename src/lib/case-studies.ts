// Based on editorial copy from Figma frames 247:24650 and 247:24859.
// Do not attach a customer identity or add results without team confirmation.
export interface CaseStudySummary {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  updated?: string;
  readTime: number;
  cover: { src: string; alt: string };
  results?: readonly { value: string; label: string }[];
}

interface CaseStudy extends CaseStudySummary {
  overview?: readonly { label: string; value: string }[];
  measurementNotes?: {
    introduction: string;
    metrics: readonly { label: string; definition: string }[];
    limitations: string;
  };
  paragraphs: string[];
  sections: { heading: string; items?: string[]; paragraph?: string; paragraphs?: string[] }[];
  comparison?: {
    heading: string;
    rows: readonly { metric: string; before: string; after: string }[];
    note: string;
  };
}

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    "slug": "from-cold-emails-to-warm-conversations",
    "title": "From 200 cold emails to 11 warm ones. 6 replied.",
    "description": "A founder moved from 200 generic emails a day to 11 messages based on recent buying signals. Six prospects replied, and three booked demos that week.",
    "excerpt": "A founder replaced a daily 200-email routine with 11 messages grounded in recent buying signals. The campaign reported six replies and three demo bookings in a week.",
    "date": "2026-07-23",
    updated: "2026-10-06",
    "readTime": 5,
    results: [
      { value: "11", label: "targeted emails" },
      { value: "6", label: "replies" },
      { value: "3", label: "demo bookings" },
    ],
    "cover": {
      "src": "/images/case-studies/cold-emails-warm-conversations.webp",
      "alt": "A flurry of pale envelopes becomes a few warm, glowing conversations above an illustrated coastal landscape."
    },
    overview: [
      { label: "The challenge", value: "Find the prospects who had a reason to talk now, within an already defined ideal customer profile." },
      { label: "The workflow", value: "Review recent buying signals, check the original source, and write a relevant email to each prospect." },
      { label: "The reported result", value: "One batch of 11 emails received six replies and three demo bookings that week. One deal closed within the month." },
    ],
    "paragraphs": [
      "A founder already knew which companies were a good fit for his product. The harder question was who had a reason to talk that week.",
      "This story follows a change in his outreach: from a daily routine of 200 generic emails to one batch of 11 messages based on recent public buying signals. Six people replied, three booked demos that week, and one deal closed within the month."
    ],
    "sections": [
      {
        heading: "The challenge: a good fit, but no reason to reach out",
        paragraphs: [
          "Each morning, the founder pulled contacts from Apollo, loaded them into Instantly, and sent around 200 emails. The opener referred to the recipient’s role and company, but gave little reason for the conversation to happen now.",
          "That routine typically produced two or three replies. Most weeks, it produced no meetings. Finding contacts, cleaning the list, checking for duplicates, writing, and scheduling took nearly three hours a day.",
          "His ideal customer profile narrowed down who could benefit from the product. It did not tell him which of those people were actively dealing with the problem. That was the gap the team set out to address."
        ]
      },
      {
        heading: "Find recent evidence of a relevant problem",
        paragraph: "We used the founder’s existing ideal customer profile in Cnvrted and looked for public signals from the previous seven days. The team looked for three kinds of evidence:",
        items: [
          "Someone describing a problem the product could help solve.",
          "Someone asking publicly for a recommendation or an alternative.",
          "A company change that made the product newly relevant."
        ],
        paragraphs: [
          "Cnvrted surfaced 11 prospects, with the original source, the trigger, and a timestamp attached to each. The founder could review the evidence before deciding whether to reach out.",
          "A signal was a reason to investigate, not proof that someone would buy. The useful combination was a prospect who fit the customer profile and recent evidence that the problem mattered to them."
        ]
      },
      {
        heading: "Turn the source into a specific conversation",
        paragraphs: [
          "The founder wrote an individual email to each of the 11 prospects. Each message referenced the relevant thing that person had said or done and connected it to the problem the product could solve.",
          "The source gave him something concrete to respond to. He could explain why he was getting in touch, rather than opening with a generic observation about a job title or company.",
          "The founder still made the outreach decision and wrote the emails. Cnvrted supplied the shortlist and the evidence behind it."
        ]
      },
      {
        heading: "What happened after the 11 emails",
        paragraphs: [
          "The campaign reported six replies from 11 emails sent: a reply rate of 54.5%. Three prospects booked demos in the same week. One deal closed within the month.",
          "The founder reported spending about 20 minutes on prospecting for the targeted batch, compared with nearly three hours on the previous daily routine.",
          "These figures describe the batch in this story. The previous process was an ongoing daily routine; the new results came from one smaller campaign."
        ]
      },
      {
        heading: "How to apply the workflow to your own outreach",
        paragraph: "Start with a small batch you can review personally:",
        items: [
          "Define the companies and people your product can help. Be specific about the problem, not just the industry or job title.",
          "Choose a signal that gives you a reason to contact them now. Check the date and read the original source in context.",
          "Keep only prospects where the signal and the customer profile both fit. A larger list is not the objective.",
          "Write an email that connects what you saw to a useful next step. Let the source guide the message.",
          "Record how many messages you sent, how many people replied, and which conversations became demos or customers. Compare batches over a consistent period."
        ]
      }
    ],
    "comparison": {
      heading: "The results, in context",
      rows: [
        { metric: "Emails sent", before: "Around 200 per day", after: "11 in the targeted batch" },
        { metric: "Replies", before: "Typically 2–3 from 200 emails", after: "6 from 11 emails" },
        { metric: "Time spent", before: "Nearly 3 hours per day", after: "About 20 minutes for the batch" },
        { metric: "Demo bookings", before: "Most weeks, no meetings", after: "3 that week" },
        { metric: "Closed deals", before: "Not stated", after: "1 within the month" }
      ],
      note: "The baseline describes the founder’s previous daily routine. The new results cover one batch of 11 emails. These are different scopes, not a controlled test of the two approaches."
    },
    measurementNotes: {
      introduction: "These figures come from the campaign account published by Cnvrted. Read them as one founder’s reported experience, rather than a benchmark for all campaigns.",
      metrics: [
        { label: "Reply rate", definition: "Six replies divided by 11 emails sent equals 54.5%. The account does not provide a delivered-email count or distinguish positive replies from other responses." },
        { label: "Demo bookings", definition: "Three demos were booked in the week of the outreach. A booking is not a completed meeting; meeting attendance is not reported here." },
        { label: "Closed deal", definition: "One deal was reported within the month. The account does not state its value or include an attribution breakdown." },
        { label: "Prospecting time", definition: "About 20 minutes was reported for this batch, compared with nearly three hours for the former daily routine. The work and time windows differ, so this is not a measured percentage improvement." },
      ],
      limitations: "The customer’s name and exact campaign dates are not published. July 23, 2026 is the article’s publication date. This page does not include the underlying email or CRM records or an independent verification of the results. The small batch and different comparison periods do not establish what caused the change or predict another team’s results.",
    },
  },
  {
    "slug": "how-cnvrted-finds-its-customers",
    "title": "We use Cnvrted to find Cnvrted’s customers.",
    "description": "This is our journey, not just a customer story. Every client and demo call we've secured in recent months has been powered by Cnvrted, the same tool we want you to experience.",
    "excerpt": "This isn't a customer story. This is our story. Every client we've signed, every enterprise we've onboarded, every demo call we've booked in the last few months was sourced by the same tool we're asking you to try. We don't use a separate prospecting stack for ourselves. We use Cnvrted. The same dashboard, the same signal engine, the same workflow.",
    "date": "2026-07-23",
    "readTime": 5,
    "cover": {
      "src": "/images/case-studies/cnvrted-finds-its-customers.webp",
      "alt": "A lighthouse discovers golden signals across rolling hills, with an illuminated path returning to its source."
    },
    "paragraphs": [
      "This isn't a customer story. This is our story.",
      "Every client we've signed, every enterprise we've onboarded, every demo call we've booked in the last few months was sourced by the same tool we're asking you to try. We don't use a separate prospecting stack for ourselves. We use Cnvrted. The same dashboard, the same signal engine, the same workflow.",
      "Here's how that actually works day to day.",
      "Every morning, our team opens Cnvrted and checks what fired overnight. The system has been scanning the internet while we slept, looking for people who match our ICP and have shown intent in the last 24 hours. By the time we open the dashboard, there's a feed of leads waiting. Each one with a score, a trigger, and the source attached.",
      "Last month, for example, the system caught a founder on LinkedIn who posted about struggling with outbound. He was venting about low reply rates and asking if anyone had found a tool that actually worked. That post was public for about 12 minutes before Cnvrted flagged it.",
      "We didn't cold email him from a list. We reached out within the hour, referenced his exact post, and said: \"Saw what you wrote about outbound. We built something for exactly this. Want to see it?\"",
      "He replied in 20 minutes. We did a demo that afternoon. He signed up the next day.",
      "That's not a one-off. That's the daily motion.",
      "Another one from a few weeks ago. Cnvrted flagged a Series A company that had just posted three new sales roles on LinkedIn. That's a hiring signal. When a company goes from zero to three sales hires at once, they're about to build out their entire outbound motion. They're going to need tools. They're going to need leads. They're going to need exactly what we sell.",
      "We reached out to the Head of Sales before any other vendor even knew the project existed. Got a call booked within the week. They're now one of our enterprise users.",
      "And then there's the really meta one. We used Cnvrted to find a list of YC companies that matched our ICP. The system identified the companies, found the right contacts, pulled their verified emails, and attached the reason each one was worth reaching out to. We wrote personalised outreach for every single one, referencing their specific trigger. Not a mass blast. Not a template. Each email had a reason.",
      "The response rate on that batch was unlike anything we'd seen from traditional cold outreach. People replied because the email made sense. It wasn't \"hey, I noticed you're the CTO at a fast-growing company.\" It was \"your company just raised and you're hiring three engineers in a vertical that signals you're about to need this.\"",
      "The thing that makes this case study different from the others is that we have zero distance from the product. We're not hearing about results secondhand. We're living in the dashboard every day. When something doesn't work, we feel it immediately. When a signal fires and leads to a closed deal, we see the entire chain: the post that triggered it, the outreach that referenced it, the reply, the call, the close.",
      "That feedback loop is why the product keeps getting better. Every deal we close through Cnvrted teaches us which signals actually matter, which outreach angles land, and which ICPs convert. We're not just building a tool. We're using it to build the company that builds the tool.",
      "If that sounds circular, it is. And that's the point.",
      "We wouldn't ask you to trust a product we don't trust ourselves. Every lead on our pipeline came from the same system you'd be logging into. Same scans. Same scoring. Same outreach drafts.",
      "The best proof that Cnvrted works isn't a testimonial. It's the fact that you're reading this because Cnvrted found you."
    ],
    "sections": [
      {
        "heading": "How we use our own product",
        "items": [
          "Morning review: access the dashboard to assess overnight signals.",
          "Communication: ORKA crafts messages based on specific triggers, which we then review and dispatch.",
          "Monitoring: we track every reply, call, and deal back to the originating signal.",
          "Insights: understanding which signal types lead to closures helps refine our ideal customer profile, enhancing future targeting."
        ]
      },
      {
        "heading": "The numbers (our own)",
        "items": [
          "Outreach sourced by Cnvrted: 100% of our pipeline.",
          "Average time from signal to first outreach: under 1 hour.",
          "Reply rate on signal-sourced outreach: significantly higher than industry cold benchmarks.",
          "Enterprise clients acquired through the platform: multiple, and growing."
        ]
      },
      {
        "heading": "Why this matters for you",
        "paragraph": "If the tool works well enough for us to build an entire company's pipeline on it, it can work for your sales team too. We're not outsourcing our own prospecting to something else and then asking you to use ours. We eat our own cooking. Every day."
      }
    ]
  }
];

// Keep full article text out of the interactive homepage carousel's props.
export const CASE_STUDY_SUMMARIES: readonly CaseStudySummary[] = CASE_STUDIES.map(
  ({ slug, title, description, excerpt, date, readTime, cover, results }) =>
    ({ slug, title, description, excerpt, date, readTime, cover, results }),
);
