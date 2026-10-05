import Link from "next/link";
import { IllustratedShell } from "@/components/illustrated/shell";
import { ClosingCTA } from "@/components/illustrated/closing-cta";
import { ProductExampleLink } from "@/components/illustrated/product-example-link";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { FAQSchema } from "@/components/faq-schema";
import { SoftwareSchema } from "@/components/structured-data";
import { JsonLd } from "@/components/json-ld";
import { PRODUCT_PATH, PRODUCT_DESCRIPTION, PRODUCT_FAQS, PRODUCT_STEPS } from "@/lib/product-overview";
import { pageMetadata, SITE_URL, absoluteUrl } from "@/lib/seo";
import "./product.css";

export const metadata = pageMetadata({
  title: "Cnvrted Product — AI GTM Intelligence & Buying Signals",
  description: PRODUCT_DESCRIPTION,
  path: PRODUCT_PATH,
});

export default function ProductPage() {
  return (
    <IllustratedShell className="product-overview-page" faqItems={PRODUCT_FAQS} closingCTA={<ClosingCTA />}>
      <BreadcrumbSchema trail={[{ name: "Product" }]} />
      <FAQSchema path={PRODUCT_PATH} items={PRODUCT_FAQS} />
      <SoftwareSchema includeOffers={false} />
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "WebPage", "@id": absoluteUrl(`${PRODUCT_PATH}#webpage`),
        name: "Cnvrted product overview", description: PRODUCT_DESCRIPTION, url: absoluteUrl(PRODUCT_PATH),
        inLanguage: "en", isPartOf: { "@id": `${SITE_URL}/#website` }, mainEntity: { "@id": `${SITE_URL}/#software` },
      }} />
      <header className="product-intro design-container">
        <div className="product-intro-copy">
          <p className="marketing-eyebrow">Meet Cnvrted</p>
          <h1>A reason to<br />reach out.</h1>
          <p className="product-definition">{PRODUCT_DESCRIPTION}</p>
          <div className="product-actions">
            <Link href="/book-demo" className="design-button design-button-solid">Book a GTM demo <span aria-hidden="true">↗</span></Link>
            <Link href="/learn/signal-to-outreach" className="marketing-text-link">Try an example <span aria-hidden="true">↗</span></Link>
          </div>
          <p className="product-start-note">Start with 40 free credits. <Link href="/pricing">Explore the plans</Link>.</p>
        </div>
        <aside className="product-flow" aria-label="The Cnvrted workflow">
          <div className="product-flow-heading"><span className="marketing-eyebrow">From research to outreach</span><span className="product-flow-mark" aria-hidden="true">✦</span></div>
          <ol>{PRODUCT_STEPS.map((step, i) => <li key={step.id}>
            <span className="product-flow-number" aria-hidden="true">0{i + 1}</span>
            <div><h2>{step.input}</h2><p>{step.outcome}</p></div>
          </li>)}</ol>
          <div className="product-flow-footnote"><span aria-hidden="true">↳</span><p>You review the evidence and choose the next step.</p></div>
        </aside>
      </header>

      <nav className="product-contents design-container" aria-label="On this page">
        <a href="#product-workflow">How it works</a><a href="#product-audience">Who it’s for</a><a href="#product-evidence">Sources & judgment</a><a href="#product-story">In practice</a><a href="#faq-title">Questions</a>
      </nav>

      <section className="product-section design-container" aria-labelledby="product-workflow">
        <div className="product-section-heading"><span className="marketing-eyebrow">The workflow</span><h2 id="product-workflow">Fit. Timing. Context.</h2><p>Three connected decisions, with evidence at the centre.</p></div>
        <div className="product-steps">{PRODUCT_STEPS.map((step, i) => <section key={step.id}>
          <span className="product-step-number" aria-hidden="true">0{i + 1}</span><h3>{step.title}</h3><p>{step.description}</p>
          <div className="product-review-note"><span>Worth checking</span><p>{step.check}</p></div>
          <Link className="marketing-text-link" href={step.link.href}>{step.link.label} <span aria-hidden="true">↗</span></Link>
        </section>)}</div>
        <div className="product-orka"><div><h3>Start the conversation with Orka.</h3><p>Describe your target customer in plain language, then review the research and workflow in the GTM canvas.</p></div><Link className="marketing-text-link" href="/#strategy-title">Watch the canvas demo <span aria-hidden="true">↗</span></Link></div>
      </section>

      <section className="product-section product-audience design-container" aria-labelledby="product-audience">
        <div className="product-section-heading"><span className="marketing-eyebrow">Who it’s for</span><h2 id="product-audience">For teams that want<br />a better first conversation.</h2></div>
        <div className="product-audience-list">
          <section><h3>Founders</h3><p>Explore a narrow market, understand the problems showing up in it, and choose which prospects deserve a personal conversation.</p></section>
          <section><h3>B2B sales teams</h3><p>Bring the company’s fit and recent changes into account research, so the reason for reaching out travels with the prospect.</p></section>
          <section><h3>Service businesses</h3><p>Explore how a specific offer connects to a company’s current needs. Our examples cover design, RevOps, and recruiting using clearly labelled sample data.</p></section>
        </div>
      </section>

      <section className="product-section design-container" aria-labelledby="product-evidence">
        <div className="product-section-heading"><span className="marketing-eyebrow">Sources & judgment</span><h2 id="product-evidence">Keep the evidence<br />next to the idea.</h2><p>Public information provides a starting point. Your review gives it meaning.</p></div>
        <div className="product-evidence-grid">
          <section><h3>What you can investigate</h3><ul><li>Company announcements and funding news.</li><li>Open roles and changes in a hiring plan.</li><li>Public requests for advice, tools, or alternatives.</li><li>Product, technology, or organisational changes.</li></ul><p>Open the original source, check the date, and ask how it relates to your offer. <Link href="/help-center">Visit the Help Center</Link> for product questions.</p></section>
          <section><h3>What the signal cannot tell you</h3><ul><li>Whether there is an approved budget.</li><li>Who has authority to make a purchase.</li><li>Whether outside help is wanted.</li><li>Whether another partner already handles the work.</li></ul><p>Keep these as questions to explore. Source coverage and integration availability should be checked for your specific workflow in a <Link href="/book-demo">demo with the team</Link>.</p></section>
        </div>
      </section>

      <ProductExampleLink />

      <section className="product-section product-story design-container" aria-labelledby="product-story">
        <div><span className="marketing-eyebrow">One campaign, in context</span><h2 id="product-story">What changed when<br />the outreach had a reason?</h2><p>Our published customer story follows one founder’s batch of 11 targeted emails. It reports six replies and three demo bookings in that week.</p><p className="product-story-note">One reported campaign, with a different scope from the previous daily routine. Read the measurement notes alongside the results.</p><Link className="marketing-text-link" href="/case-studies/from-cold-emails-to-warm-conversations">Read the case study <span aria-hidden="true">↗</span></Link></div>
        <blockquote><p>“Why this company?”<br />“Why now?”<br />“What could I say?”</p><footer>The questions behind a useful GTM play.</footer></blockquote>
      </section>
    </IllustratedShell>
  );
}
