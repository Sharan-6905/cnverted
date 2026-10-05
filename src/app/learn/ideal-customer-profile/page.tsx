import Link from "next/link";
import { IllustratedShell } from "@/components/illustrated/shell";
import { ClosingCTA } from "@/components/illustrated/closing-cta";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { FAQSchema } from "@/components/faq-schema";
import { JsonLd } from "@/components/json-ld";
import { PRODUCT_EXAMPLES } from "@/lib/product-example";
import { pageMetadata, absoluteUrl, SITE_URL, DEFAULT_SOCIAL_IMAGE } from "@/lib/seo";
import "@/components/illustrated/article.css";
import "../buying-signals/guide.css";

const path = "/learn/ideal-customer-profile";
const title = "What is an ideal customer profile?";
const description = "Define your B2B ideal customer profile with a six-field worksheet, three sample ICPs, and a practical way to separate company fit from buying signals.";
const published = "2026-10-06";
const faqs = [
  { question: "What does ICP mean in sales?", answer: "ICP stands for ideal customer profile. In B2B sales, it describes the kind of company that your offer is suited to, using criteria such as its problem, business model, size, location, and operating requirements." },
  { question: "How is an ICP different from a buyer persona?", answer: "An ICP describes a company. A buyer persona describes a person involved in a decision, including their responsibilities, goals, and concerns. Use the ICP to choose accounts and the persona to understand who to speak with." },
  { question: "Can a business have more than one ICP?", answer: "Yes, when its offers serve meaningfully different customers. Keep a separate profile for each distinct problem and offer so that the targeting criteria and outreach stay specific." },
  { question: "How do you build an ICP before you have customers?", answer: "Start with a testable hypothesis about the problem you solve and the companies that experience it. Use customer interviews and a small research sample to challenge that hypothesis. Label assumptions and revise the profile as you learn; do not present it as validated customer evidence." },
  { question: "Does matching an ICP mean a company is ready to buy?", answer: "No. Fit describes whether you can help; a buying signal suggests why a conversation might be timely. Neither confirms budget, authority, or willingness to work with you. Check those separately." },
] as const;

const fields = [
  { name: "Problem and outcome", prompt: "What recurring problem can you solve, and what would improve?", example: "Help self-serve B2B software teams improve the journey from signup to first value." },
  { name: "Company characteristics", prompt: "Which business model, size, and location can you serve well?", example: "B2B software companies in India with 20–200 employees." },
  { name: "Operating requirements", prompt: "What must already be true for your offer to work?", example: "A live self-serve product and a team able to implement design changes." },
  { name: "Exclusions", prompt: "Which conditions make the account unsuitable, even if it looks promising?", example: "Exclude businesses without a live product or those seeking only a permanent hire." },
  { name: "People to learn from", prompt: "Which roles own the problem, and who else influences the decision?", example: "Start with the Head of Product; confirm the decision process rather than assuming it." },
  { name: "Evidence and unknowns", prompt: "What supports each criterion, and what still needs a conversation?", example: "Check the company site and product signup. Record the source and review date; ask about budget and outside support." },
];

export const metadata = pageMetadata({
  title: "Ideal Customer Profile (ICP): Examples & Template | Cnvrted",
  description, path, publishedTime: published,
});

export default function IdealCustomerProfileGuide() {
  return (
    <IllustratedShell className="design-article-page signal-guide-page" faqItems={faqs} closingCTA={<ClosingCTA />}>
      <BreadcrumbSchema trail={[{ name: "Learn", path: "/learn" }, { name: "Ideal customer profile" }]} />
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
          <p className="marketing-eyebrow">The prospecting field guide</p>
          <h1 id="guide-title">{title}</h1>
          <p className="design-article-dek">Know who you can help. Then look for a reason to talk.</p>
          <div className="design-article-byline"><p>By <Link href="/about">the Cnvrted team</Link> · <time dateTime={published}>October 6, 2026</time></p></div>
        </header>
        <div className="design-article-content design-article-prose">
          <p className="signal-guide-answer"><strong>An ideal customer profile (ICP) describes the kind of company that is a strong fit for your offer.</strong> In B2B sales, it combines the problem you solve with practical criteria such as company size, business model, location, and operating needs. It helps you decide which accounts to research—and which to leave out.</p>
          <nav className="signal-guide-contents" aria-label="In this guide">
            <a href="#fit-persona-signal">Fit, people, and timing</a><a href="#icp-worksheet">Build your ICP</a><a href="#icp-examples">Three examples</a><a href="#validate-your-icp">Test the profile</a><a href="#faq-title">Common questions</a>
          </nav>
          <section aria-labelledby="fit-persona-signal">
            <h2 id="fit-persona-signal">ICP, buyer persona, or buying signal?</h2>
            <p>They answer different questions. Keep them separate so a recent event does not distract you from whether you can actually help.</p>
            <dl className="guide-comparison">
              <div><dt>ICP · Which company?</dt><dd>A self-serve B2B software company with 20–200 employees. These are account-level fit criteria.</dd></div>
              <div><dt>Buyer persona · Which person?</dt><dd>A Head of Product responsible for activation. This suggests someone to learn from, not proof of purchasing authority.</dd></div>
              <div><dt>Buying signal · Why now?</dt><dd>A new self-serve launch and an open activation-design role. These suggest a timely question, not a confirmed need for an agency.</dd></div>
            </dl>
            <p>Our <Link href="/learn/buying-signals">buying-signals guide</Link> explains how to check the event, its source, and its relevance before reaching out.</p>
          </section>
          <section aria-labelledby="icp-worksheet">
            <h2 id="icp-worksheet">A six-field ICP worksheet.</h2>
            <p>Start with the offer, then work outward. The example below is for a fictional design studio selling onboarding sprints; adapt the fields to what you can deliver.</p>
            <div className="signal-guide-examples">{fields.map((field, index) => <section key={field.name}>
              <span className="marketing-eyebrow" aria-hidden="true">0{index + 1}</span>
              <h3>{field.name}</h3><p>{field.prompt}</p><p><strong>Example:</strong> {field.example}</p>
            </section>)}</div>
            <aside className="guide-download">
              <div><h3>Make a copy for your team.</h3><p>A blank answer column, the six prompts, and a worked example. Opens in Excel or Google Sheets.</p></div>
              <a href="/downloads/cnvrted-icp-worksheet.csv" download className="marketing-text-link">Download the worksheet <span aria-hidden="true">↓</span><span className="sr-only"> (CSV)</span></a>
            </aside>
          </section>
          <section aria-labelledby="icp-examples">
            <h2 id="icp-examples">Three offers. Three different profiles.</h2>
            <p>These are illustrative profiles from our interactive demo, using fictional companies. The team sizes are sample targeting choices, not benchmarks.</p>
            <div className="guide-profile-list">{PRODUCT_EXAMPLES.map((example) => <section key={example.id}>
              <h3>{example.business}</h3><p><strong>Offer:</strong> {example.offer}.</p><p><strong>Sample ICP:</strong> {example.icp}</p><p><strong>Still unknown:</strong> {example.unknown}</p>
            </section>)}</div>
            <p><Link href="/learn/signal-to-outreach">Try these businesses in the interactive example</Link> to see the company profile, source extracts, fit checks, and a suggested first message.</p>
          </section>
          <section aria-labelledby="validate-your-icp">
            <h2 id="validate-your-icp">How do you know the profile is useful?</h2>
            <ol className="signal-guide-checklist">
              <li><strong>Start with evidence.</strong> If you have customers, examine who gets value, what they needed, and where delivery was difficult. A memorable logo is not enough to define a segment.</li>
              <li><strong>Research a small sample.</strong> Write down which criteria you can verify from public sources and which require an interview. Keep unknown values as unknown; do not turn them into a fit score.</li>
              <li><strong>Talk to the people doing the work.</strong> Ask how they handle the problem now, what a change would involve, and whether the outcome you offer matters.</li>
              <li><strong>Review what happened.</strong> Track qualified conversations and delivery fit, alongside why accounts were ruled out. A reply alone does not validate an ICP.</li>
              <li><strong>Revise deliberately.</strong> Record what changed and why. Keep different offers in separate profiles if their requirements conflict.</li>
            </ol>
            <p>A useful profile makes it easier to say both “worth exploring” and “not for us.” It stays a working hypothesis until your research and customer experience support it.</p>
          </section>
          <section aria-labelledby="icp-next-step">
            <h2 id="icp-next-step">Turn the profile into a GTM play.</h2>
            <p>Use the ICP to set the account boundaries, a signal to investigate timing, and a relevant question to open the conversation. Our <Link href="/blogs/what-is-a-gtm-play">GTM play guide</Link> connects those pieces into a repeatable process.</p>
            <p>In Cnvrted, describe your target customer to Orka and review the companies and context it returns. Check the evidence before choosing whom to contact. <Link href="/book-demo">Book a GTM demo</Link> if you want to work through your own market with the team.</p>
          </section>
        </div>
      </article>
    </IllustratedShell>
  );
}
