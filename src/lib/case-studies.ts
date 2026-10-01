// Editorial copy from Figma case-study frames 247:24650 and 247:24859.
export interface CaseStudySummary {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  readTime: number;
  cover: { src: string; alt: string };
}

interface CaseStudy extends CaseStudySummary {
  paragraphs: string[];
  sections: { heading: string; items?: string[]; paragraph?: string }[];
  comparison?: { heading: string; before: string[]; after: string[] };
}

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    "slug": "from-cold-emails-to-warm-conversations",
    "title": "From 200 cold emails to 11 warm ones. 6 replied.",
    "description": "An influencer founder we collaborated with sent out 200 cold emails daily using the same script, but only received 2–3 replies on good days. His domain reputation was declining, leading to fewer meetings booked each month.",
    "excerpt": "An influencer founder we work with was doing what most founders do. Every morning, he'd pull a list from Apollo, load it into Instantly, and fire off 200 cold emails before lunch. Same script. Same opener. Same results.",
    "date": "2026-07-23",
    "readTime": 6,
    "cover": {
      "src": "/images/case-studies/cold-emails-warm-conversations.webp",
      "alt": "A flurry of pale envelopes becomes a few warm, glowing conversations above an illustrated coastal landscape."
    },
    "paragraphs": [
      "A founder we work with was doing what most founders do. Every morning, he'd pull a list from Apollo, load it into Instantly, and fire off 200 cold emails before lunch. Same script. Same \"Hey {{first_name}}, I noticed you're the VP of Sales at {{company}}\" opener. Same results.",
      "Out of 200, maybe 2 would reply. On a good day, 3. Most weeks, zero meetings booked. His domain reputation was slowly dying and he could feel it. Reply rates were dropping month over month.",
      "The worst part wasn't the low numbers. It was the time. He was spending nearly three hours every morning just on the prospecting and sending routine. Finding the contacts, cleaning the list, deduplicating against his CRM, writing the emails, scheduling them out. Three hours of work before he could even start selling.",
      "He came to us and said, \"I know my ICP. I just don't know which of them actually care right now.\"",
      "That was the problem. He had 10,000 people who matched his ideal customer profile. But on any given week, maybe 30 of them were actively looking for what he sold. He was emailing all 10,000 to reach those 30, and burning the other 9,970 in the process.",
      "We ran his ICP through Cnvrted. Instead of pulling a list of names, we scanned for people who had shown real buying intent in the last 7 days. People who had posted about the problem his product solves. People who were publicly asking for recommendations. People whose companies had just made a move that signalled they were about to buy.",
      "Cnvrted found 11 people.",
      "Not 10,000. Not 200. Eleven.",
      "Each one came with the receipt. The actual post, the actual trigger, the timestamp. He could see exactly why each person was worth reaching out to.",
      "He wrote 11 emails. Each one referenced the specific thing that person had said or done. No template. No merge tags. Real messages with real reasons.",
      "6 replied. Not 6 out of 200. 6 out of 11.",
      "Three of those turned into demo calls that same week. One closed within the month.",
      "The math changed completely. Before Cnvrted, he was running a 1% reply rate on 200 emails and spending 3 hours a day to get there. After, he was running a 55% reply rate on 11 emails and spending about 20 minutes.",
      "He told us later that the thing that surprised him most wasn't the reply rate. It was how different the conversations felt. When you reach out to someone and reference the exact thing they said two days ago, they don't treat you like a cold emailer. They treat you like someone who was paying attention. The entire dynamic shifts from \"who is this person and why are they in my inbox\" to \"oh, you actually know what I'm dealing with.\"",
      "That's the difference between a name and a buyer. A name is a row in a spreadsheet. A buyer is a person who told the internet they're ready. You just have to be watching when they do."
    ],
    "sections": [],
    "comparison": {
      "heading": "The numbers",
      "before": [
        "200 emails/day",
        "1% reply rate",
        "3 hours/day prospecting",
        "0–1 meetings/week"
      ],
      "after": [
        "11 targeted emails",
        "55% reply rate",
        "20 minutes prospecting",
        "3 meetings in the first week"
      ]
    }
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
  ({ slug, title, description, excerpt, date, readTime, cover }) =>
    ({ slug, title, description, excerpt, date, readTime, cover }),
);
