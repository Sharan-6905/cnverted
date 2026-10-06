import Link from "next/link";
import { IllustratedShell } from "@/components/illustrated/shell";
import { ClosingCTA } from "@/components/illustrated/closing-cta";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { FAQSchema } from "@/components/faq-schema";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata, absoluteUrl, SITE_URL, DEFAULT_SOCIAL_IMAGE } from "@/lib/seo";
import "@/components/illustrated/article.css";
import "../buying-signals/guide.css";

const path = "/learn/go-to-market-strategy";
const title = "How to build a go-to-market strategy";
const description = "Build a B2B go-to-market strategy: define your ICP, offer, channels, sales process, and success measures. Includes a sample GTM plan and where AI can help.";
const published = "2026-10-06";

const decisions = [
  { title: "Choose a customer and a problem", question: "Whose situation do you understand well enough to help?", action: "Define the company characteristics, recurring problem, and operating conditions that fit your offer. Record exclusions as carefully as positive criteria.", output: "A specific ICP with evidence and open questions." },
  { title: "Make the offer concrete", question: "What outcome will the customer pay for?", action: "Describe what you deliver, what is outside the scope, and how a customer would recognise value. Check what they do today and what switching would involve.", output: "An offer, a pricing hypothesis, and a reason to choose it." },
  { title: "Choose how to reach them", question: "Where can you start a useful conversation?", action: "Choose a channel your audience actually uses: founder-led outreach, partnerships, useful content, or another route you can test. Give the first experiment an owner and a fixed scope.", output: "One initial channel and a practical acquisition experiment." },
  { title: "Define the buying journey", question: "What happens after someone responds?", action: "Plan qualification, a discovery conversation or trial, the purchase decision, and onboarding. Identify who owns each handoff and which questions must be resolved before progressing.", output: "A sales process with clear next steps." },
  { title: "Connect fit with timing", question: "Why might this account want a conversation now?", action: "For a prospecting-led motion, look for relevant public changes such as a launch, a hiring plan, or a request for help. Check the source and date before forming an outreach angle.", output: "A small research shortlist with the evidence attached." },
  { title: "Decide what you will learn", question: "What result would support or challenge the plan?", action: "Choose measures before starting. Keep the audience, time window, message, and channel recorded so that you can understand what changed between experiments.", output: "A review date, success measures, and a decision about the next test." },
] as const;

const faqs = [
  { question: "What does GTM stand for?", answer: "In this guide, GTM means go-to-market: how a business chooses its customers, offer, channels, and path to revenue. In web analytics, GTM can also mean Google Tag Manager; that is a different topic." },
  { question: "What should a B2B go-to-market strategy include?", answer: "Include a target customer, a problem and offer, positioning and a pricing hypothesis, acquisition channels, a sales and onboarding process, and measures for learning. Assign owners and distinguish assumptions from evidence." },
  { question: "How is a GTM strategy different from a GTM play?", answer: "A GTM strategy sets the broader choices about the market, offer, and route to customers. A GTM play is a repeatable action within that strategy, such as reviewing a relevant hiring signal and contacting a suitable account with a specific question." },
  { question: "What is an AI GTM platform?", answer: "An AI GTM platform uses AI to support parts of a go-to-market workflow, such as research, account qualification, or outreach preparation. Products differ in scope. Cnvrted AI focuses on connecting public buying signals, ICP fit, and the context behind a prospect." },
  { question: "Can AI build the whole GTM strategy for me?", answer: "AI can help organise information and suggest hypotheses. You still need to validate the customer problem, pricing, delivery constraints, sources, and buying process. A generated plan is a starting point for research, not evidence of demand." },
] as const;

export const metadata = pageMetadata({
  title: "Go-to-Market (GTM) Strategy: Guide & Example | Cnvrted",
  description, path, publishedTime: published,
});

export default function GoToMarketStrategyGuide() {
  return (
    <IllustratedShell className="design-article-page signal-guide-page" faqItems={faqs} closingCTA={<ClosingCTA />}>
      <BreadcrumbSchema trail={[{ name: "Learn", path: "/learn" }, { name: "Go-to-market strategy" }]} />
      <FAQSchema path={path} items={faqs} />
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "Article", "@id": absoluteUrl(`${path}#article`),
        headline: title, description, inLanguage: "en", datePublished: published, dateModified: published,
        image: absoluteUrl(DEFAULT_SOCIAL_IMAGE.url),
        author: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Cnvrted", url: `${SITE_URL}/about` },
        publisher: { "@id": `${SITE_URL}/#organization` }, mainEntityOfPage: absoluteUrl(path),
      }} />
      <article className="design-article design-container signal-guide" aria-labelledby="guide-title">
        <header className="design-article-heading">
          <Link href="/learn" className="marketing-text-link">← All field notes</Link>
          <p className="marketing-eyebrow">The go-to-market field guide</p>
          <h1 id="guide-title">{title}</h1>
          <p className="design-article-dek">A clear customer. A useful offer. A plan you can test.</p>
          <div className="design-article-byline"><p>By <Link href="/about">the Cnvrted team</Link> · <time dateTime={published}>October 6, 2026</time></p></div>
        </header>
        <div className="design-article-content design-article-prose">
          <p className="signal-guide-answer"><strong>A go-to-market (GTM) strategy explains who you will sell to, what you will offer, and how you will reach and win those customers.</strong> For a B2B team, it connects customer research, positioning, pricing, acquisition, sales, and onboarding. Treat the first version as a set of choices to test, with evidence recorded as you learn.</p>
          <nav className="signal-guide-contents" aria-label="In this guide">
            <a href="#gtm-decisions">Build the strategy</a><a href="#gtm-example">A sample plan</a><a href="#gtm-measures">Measure the experiment</a><a href="#ai-gtm">Where AI helps</a><a href="#faq-title">Common questions</a>
          </nav>
          <section aria-labelledby="gtm-decisions">
            <h2 id="gtm-decisions">Six decisions to put on one page.</h2>
            <p>Start narrow enough to learn from actual conversations. Use these prompts to give each part of the plan a concrete output.</p>
            <div className="signal-guide-examples">{decisions.map((decision, i) => <section key={decision.title}>
              <span className="marketing-eyebrow" aria-hidden="true">0{i + 1}</span>
              <h3>{decision.title}</h3><p><strong>{decision.question}</strong> {decision.action}</p><p><strong>Write down:</strong> {decision.output}</p>
            </section>)}</div>
            <p>Our <Link href="/learn/ideal-customer-profile">ideal customer profile guide and worksheet</Link> helps with the account criteria. The <Link href="/learn/buying-signals">buying-signals guide</Link> explains how to evaluate timing without assuming that a company wants to buy.</p>
          </section>
          <section aria-labelledby="gtm-example">
            <h2 id="gtm-example">Example: a design studio’s first GTM plan.</h2>
            <p>This is a fictional planning example, not a customer result. The studio sells onboarding-design work to B2B software companies.</p>
            <dl className="guide-comparison">
              <div><dt>Customer</dt><dd>Self-serve B2B software teams in India with 20–200 employees and a live product. This is a sample segment, not a recommended size range for every studio.</dd></div>
              <div><dt>Problem and offer</dt><dd>Investigate friction between signup and first value. Offer a fixed-scope onboarding audit with prioritised design recommendations. Validate the problem, delivery scope, and price through discovery.</dd></div>
              <div><dt>Positioning</dt><dd>Focus the conversation on the onboarding journey. Explain the studio’s relevant experience and show work it has permission to share.</dd></div>
              <div><dt>First channel</dt><dd>Founder-led research and individual outreach. Start with a small set of accounts the founder can review personally, using a product launch or relevant hiring plan as a research prompt.</dd></div>
              <div><dt>Sales and delivery</dt><dd>Ask whether onboarding is a current priority and whether outside support is useful. If there is a fit, agree the scope, decision process, and next step before proposing paid work.</dd></div>
              <div><dt>Review</dt><dd>Review the experiment after a defined period, such as two weeks. Record positive replies, meetings held, qualified opportunities, and reasons the offer did not fit. This is a suggested test window, not a results claim.</dd></div>
            </dl>
            <p>A relevant opening might be:</p>
            <blockquote><p>“Saw your self-serve launch and the activation-design role. Is onboarding something you want outside help with while you hire?”</p></blockquote>
            <p>The launch and job posting support a question. They do not establish budget or a need for an agency. <Link href="/learn/signal-to-outreach">Explore the complete interactive example</Link> to see the sample sources, fit assessment, and outreach together.</p>
          </section>
          <section aria-labelledby="gtm-measures">
            <h2 id="gtm-measures">Measure learning as well as activity.</h2>
            <p>A large contact list says little about whether the strategy fits the market. Define the stages before counting them, and keep the same definitions between tests.</p>
            <ul className="design-article-bullets">
              <li><strong>Account fit:</strong> which researched companies met the ICP, and why were others excluded?</li>
              <li><strong>Positive replies:</strong> which responses opened a relevant conversation? Keep these separate from automatic replies, declines, and unsubscribe requests.</li>
              <li><strong>Meetings held:</strong> distinguish attendance from bookings, and record whether the discussion confirmed a relevant problem.</li>
              <li><strong>Qualified opportunities:</strong> record the need, decision process, and agreed next step, rather than counting every interested reply as pipeline.</li>
              <li><strong>Customer outcomes:</strong> follow whether the work was purchased, delivered successfully, and useful enough to continue or recommend.</li>
            </ul>
            <p>Keep a denominator and time window next to every rate. If the segment, offer, channel, and message all change at once, record that limitation before attributing the result to one change.</p>
          </section>
          <section aria-labelledby="ai-gtm">
            <h2 id="ai-gtm">Where does an AI GTM platform help?</h2>
            <p>AI can help organise market research, compare accounts with an ICP, surface relevant changes, and prepare possible outreach angles. The useful output connects the suggestion to a source you can inspect.</p>
            <p><Link href="/product">Cnvrted AI’s GTM platform</Link> supports this research and prospecting workflow. Describe your customer to Orka, review the public buying signals and company context, and choose which prospects deserve a conversation.</p>
            <p>Your team still owns the offer, pricing, customer validation, and outreach decision. Keep unknowns visible and check the original source before acting.</p>
            <p>Once the strategy is clear, a <Link href="/blogs/what-is-a-gtm-play">GTM play</Link> turns one situation into a repeatable action. <Link href="/book-demo">Book a Cnvrted GTM demo</Link> to explore the research workflow for your market.</p>
          </section>
        </div>
      </article>
    </IllustratedShell>
  );
}
