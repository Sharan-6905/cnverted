import Link from "next/link";
import { IllustratedShell } from "@/components/illustrated/shell";
import { ClosingCTA } from "@/components/illustrated/closing-cta";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { FAQSchema } from "@/components/faq-schema";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata, absoluteUrl, SITE_URL } from "@/lib/seo";
import "@/components/illustrated/article.css";
import "./guide.css";

const path = "/learn/buying-signals";
const title = "What are B2B buying signals?";
const description = "Buying signals are observable actions or changes that suggest a company may need a solution. Learn how to check the source, timing, and fit before reaching out.";
const published = "2026-10-04";
const faqs = [
  { question: "Is a buying signal the same as a lead?", answer: "No. A lead is a person or company you may contact. A buying signal is evidence of something that happened, such as a relevant job posting or a request for recommendations. Attach the evidence to the lead and check whether it supports a useful conversation." },
  { question: "How are ICP fit and buying intent different?", answer: "An ideal customer profile describes the companies your product is suited to. Buying intent concerns a possible current need or interest. A company can fit your ICP without needing your product now, and a strong signal can come from a company you cannot serve." },
  { question: "How recent should a buying signal be?", answer: "There is no universal expiry date. A request for a recommendation can become outdated quickly; a hiring plan may stay relevant longer. Check the original date and whether the situation is still open before contacting someone." },
  { question: "Does a signal prove that a company is ready to buy?", answer: "No. It does not establish budget, authority, urgency, or a commitment to purchase. Use a signal to form a question, verify your assumptions, and decide whether contacting the person would be useful." },
] as const;

const examples = [
  { title: "A request for recommendations", signal: "A founder asks which customer-support tool other teams use.", check: "Read the full post. Check the company’s size, use case, and whether they are still looking. A specific question is more informative than a like or a follow." },
  { title: "A relevant hiring plan", signal: "A company posts several product-design roles.", check: "Confirm the jobs are current and relate to the team you serve. Hiring may mean growth, replacement, or work being brought in-house; it does not automatically mean they want an agency." },
  { title: "A funding announcement", signal: "A company announces a new round of investment.", check: "Look for a stated plan that connects to your offer. Funding alone does not tell you which team has a budget or when it intends to spend." },
  { title: "A technology or vendor change", signal: "A team publicly discusses moving away from an existing system.", check: "Identify the actual constraint, the person involved, and the timing. Make sure your product addresses that problem before proposing a replacement." },
];

export const metadata = pageMetadata({ title: "B2B Buying Signals: Examples & Qualification | Cnvrted", description, path, publishedTime: published });

export default function BuyingSignalsGuide() {
  return (
    <IllustratedShell className="design-article-page signal-guide-page" faqItems={faqs} closingCTA={<ClosingCTA />}>
      <BreadcrumbSchema trail={[{ name: "Learn", path: "/learn" }, { name: "Buying signals" }]} />
      <FAQSchema path={path} items={faqs} />
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "Article", "@id": absoluteUrl(`${path}#article`),
        headline: title, description, inLanguage: "en", datePublished: published, dateModified: "2026-10-05",
        author: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Cnvrted", url: `${SITE_URL}/about` },
        publisher: { "@id": `${SITE_URL}/#organization` }, mainEntityOfPage: absoluteUrl(path),
      }} />
      <article className="design-article design-container signal-guide" aria-labelledby="guide-title">
        <header className="design-article-heading">
          <Link href="/learn" className="marketing-text-link">← All field notes</Link>
          <p className="marketing-eyebrow">The prospecting field guide</p>
          <h1 id="guide-title">{title}</h1>
          <p className="design-article-dek">A useful clue. A little context. A better reason to start a conversation.</p>
          <div className="design-article-byline"><p>By <Link href="/about">the Cnvrted team</Link> · <time dateTime={published}>October 4, 2026</time></p></div>
        </header>
        <div className="design-article-content design-article-prose">
          <p className="signal-guide-answer"><strong>A B2B buying signal is an observable action or change that suggests a company may need a solution.</strong> It could be a public request for recommendations, a relevant job opening, or a change in technology. It becomes useful when you can connect the event to the problem your product solves.</p>
          <nav className="signal-guide-contents" aria-label="In this guide">
            <a href="#signal-examples">Examples</a><a href="#qualify-a-signal">Qualification checklist</a><a href="#signal-to-conversation">A worked example</a><a href="#cnvrted-workflow">Using Cnvrted</a><a href="#faq-title">Common questions</a>
          </nav>
          <section aria-labelledby="signal-examples">
            <h2 id="signal-examples">Four examples, and what to check.</h2>
            <p>These are illustrative scenarios. None is proof of a purchase decision.</p>
            <div className="signal-guide-examples">{examples.map((example, index) => (
              <section key={example.title}>
                <span className="marketing-eyebrow" aria-hidden="true">0{index + 1}</span>
                <h3>{example.title}</h3><p>{example.signal}</p><p><strong>Before reaching out:</strong> {example.check}</p>
              </section>
            ))}</div>
          </section>
          <section aria-labelledby="qualify-a-signal">
            <h2 id="qualify-a-signal">How do you qualify a buying signal?</h2>
            <p>Keep the source next to your reasoning. Use these five checks before turning a signal into outreach:</p>
            <ol className="signal-guide-checklist">
              <li><strong>Source:</strong> Open the original post, job listing, or announcement. Make sure it says what the summary claims.</li>
              <li><strong>Timing:</strong> Record the event date and when you checked it. Look for updates that change the situation.</li>
              <li><strong>Fit:</strong> Compare the company’s size, industry, location, and needs with your ideal customer profile.</li>
              <li><strong>Relevance:</strong> Write one sentence connecting the event to a problem you solve. If the connection needs several assumptions, investigate further.</li>
              <li><strong>Next step:</strong> Choose a suitable person and a useful question. Skip the outreach if the evidence is weak or the offer is not relevant.</li>
            </ol>
            <p>This is a review framework, not a validated scoring model. A high score in any prospecting tool still needs a human check.</p>
          </section>
          <section aria-labelledby="signal-to-conversation">
            <h2 id="signal-to-conversation">From a signal to a conversation.</h2>
            <p>Imagine you offer product-design support. You find a software company advertising two design roles. The roles match the kind of product you work on, but you do not yet know whether the company wants outside help.</p>
            <blockquote><p>“I saw the product-design openings on your careers page. Are you looking only for permanent hires, or would short-term help with the backlog be useful while you recruit?”</p></blockquote>
            <p>The message identifies the source, offers a relevant possibility, and leaves room for the answer to be no. It does not claim to know their budget or hiring difficulties.</p>
            <p><Link href="/learn/signal-to-outreach">Follow the complete product example</Link> for a sample company profile, source extracts, ICP checks, and an annotated outreach draft.</p>
            <p>To make this repeatable, connect your trigger, target segment, outreach motion, and intended outcome. That is the basis of a <Link href="/blogs/what-is-a-gtm-play">GTM play</Link>.</p>
          </section>
          <section aria-labelledby="cnvrted-workflow">
            <h2 id="cnvrted-workflow">Where does Cnvrted fit?</h2>
            <p>Cnvrted helps founders and B2B sales teams find public buying signals, match prospects to an ICP, and review the source and context before reaching out. Describe your target customer to Orka, inspect the research it produces, and decide which conversations to pursue.</p>
            <p><Link href="/#strategy-title">Explore the product demo</Link> to see the workflow. Our <Link href="/case-studies/from-cold-emails-to-warm-conversations">customer case study</Link> describes one batch of 11 emails that received six replies. That small campaign is an example, not a general reply-rate benchmark or a promise of results.</p>
            <p>For plans and credit details, use the <Link href="/pricing">current pricing page</Link>. For available integrations and your specific workflow, <Link href="/contact">talk to the team</Link>.</p>
          </section>
        </div>
      </article>
    </IllustratedShell>
  );
}
