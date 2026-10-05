import Link from "next/link";
import { IllustratedShell } from "@/components/illustrated/shell";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { JsonLd } from "@/components/json-ld";
import { PRODUCT_EXAMPLE as example, PRODUCT_EXAMPLE_PATH as path } from "@/lib/product-example";
import { pageMetadata, absoluteUrl, SITE_URL } from "@/lib/seo";
import "./example.css";

const title = "From a buying signal to a first message";
const description = "Follow a detailed Cnvrted sample: a company’s hiring signal, the evidence behind its ICP fit, and the context that becomes a relevant outreach draft.";
const published = "2026-10-05";

export const metadata = pageMetadata({ title: "Buying Signal to Outreach: A Worked Example | Cnvrted", description, path, publishedTime: published });

export default function SignalToOutreachExample() {
  return (
    <IllustratedShell className="worked-example-page" faqItems={[]}>
      <BreadcrumbSchema trail={[{ name: "Learn", path: "/learn" }, { name: "Signal to outreach" }]} />
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "Article", "@id": absoluteUrl(`${path}#article`),
        headline: title, description, inLanguage: "en", datePublished: published, dateModified: published,
        author: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Cnvrted", url: `${SITE_URL}/about` },
        publisher: { "@id": `${SITE_URL}/#organization` }, mainEntityOfPage: absoluteUrl(path),
      }} />
      <article className="worked-example design-container">
        <header className="worked-example-heading">
          <Link href="/learn" className="marketing-text-link">← All field notes</Link>
          <p className="marketing-eyebrow">The product, in context · 5 min read</p>
          <h1>One company.<br />A reason to reach out.</h1>
          <p className="worked-example-dek">Follow a hiring signal through ICP fit, a working hypothesis, and a first message worth sending.</p>
          <p className="worked-example-disclosure"><strong>Sample data</strong> {example.disclosure}</p>
        </header>

        <section className="example-brief" aria-labelledby="example-brief-title">
          <div>
            <span className="marketing-eyebrow">Your brief to Orka</span>
            <h2 id="example-brief-title">Start with what you sell.</h2>
            <p>You run a product-design studio offering four-week onboarding sprints. Your ICP is B2B software companies in India with 20–200 employees and a self-serve product.</p>
            <blockquote>“Find companies in our ICP that are hiring product designers for activation or onboarding. Show the source and explain why the timing might matter.”</blockquote>
          </div>
          <aside className="example-company" aria-label="Sample company profile">
            <span className="example-company-mark" aria-hidden="true">A</span>
            <p className="marketing-eyebrow">Sample company</p>
            <h3>{example.company}</h3>
            <p>{example.profile}</p>
            <dl><div><dt>Product</dt><dd>Self-serve workflow software</dd></div><div><dt>Person to research</dt><dd>Head of Product</dd></div><div><dt>Decision</dt><dd>Worth reviewing</dd></div></dl>
          </aside>
        </section>

        <section className="example-step" aria-labelledby="example-evidence-title">
          <div className="example-step-heading"><span aria-hidden="true">01</span><div><p className="marketing-eyebrow">The observable signal</p><h2 id="example-evidence-title">Keep the evidence attached.</h2></div></div>
          <p>Orka’s research gives you a starting point. Open the original sources before deciding whether the company belongs on your shortlist. This sample shows what that review could contain.</p>
          <div className="example-sources">
            <article><span className="example-source-id">S1 · Careers page / sample extract</span><h3>Senior Product Designer, Activation</h3><blockquote>“Own the self-serve onboarding journey, from signup through the first completed workflow.”</blockquote><p>Sample posting: 1 October 2026<br />Sample review: 4 October 2026 · Role still open</p></article>
            <article><span className="example-source-id">S2 · Release notes / sample extract</span><h3>A self-serve beta goes live</h3><blockquote>“New teams can now create a workspace and try their first workflow without a sales call.”</blockquote><p>Sample release: 2 October 2026<br />Sample review: 4 October 2026 · Beta open</p></article>
          </div>
          <p className="example-source-note">In a real review, keep the original URLs, publication dates, and last-checked dates with each lead. These fictional extracts have no source links.</p>
        </section>

        <section className="example-step" aria-labelledby="example-fit-title">
          <div className="example-step-heading"><span aria-hidden="true">02</span><div><p className="marketing-eyebrow">ICP fit</p><h2 id="example-fit-title">A match you can explain.</h2></div></div>
          <div className="example-fit-table"><table><caption>How AsterOps matches this studio’s sample ICP</caption><thead><tr><th scope="col">Your criterion</th><th scope="col">Sample evidence</th><th scope="col">Fit</th></tr></thead><tbody>
            <tr><th scope="row">B2B software in India</th><td>Workflow software; Bengaluru, from the sample company profile.</td><td>Fits</td></tr>
            <tr><th scope="row">20–200 employees</th><td>84 people, from the sample company profile.</td><td>Fits</td></tr>
            <tr><th scope="row">A self-serve product</th><td>The beta release explicitly describes self-serve signup (S2).</td><td>Fits</td></tr>
            <tr><th scope="row">A relevant design priority</th><td>The role owns activation and onboarding (S1).</td><td>Relevant trigger</td></tr>
            <tr><th scope="row">Open to a design partner</th><td>Neither source mentions outside support, budget, or vendor selection.</td><td>Unknown — ask</td></tr>
          </tbody></table></div>
          <p>The company matches the target segment, and the two signals give you a specific question to investigate. That makes it worth reviewing for the shortlist.</p>
        </section>

        <section className="example-step" aria-labelledby="example-context-title">
          <div className="example-step-heading"><span aria-hidden="true">03</span><div><p className="marketing-eyebrow">Why now?</p><h2 id="example-context-title">Turn the evidence into a question.</h2></div></div>
          <div className="example-reasoning"><div><h3>What you know</h3><p>The sample team launched self-serve access and is hiring someone to own activation. Onboarding is explicitly part of the role.</p></div><div><h3>What you infer</h3><p>There may be onboarding work to tackle before a permanent designer joins. A focused sprint could be relevant.</p></div><div><h3>What you still need to ask</h3><p>Do they want external support? Is the work already covered? Who owns the decision? The signals don’t answer those questions.</p></div></div>
          <p>Research the Head of Product’s current responsibilities before choosing a contact. If the role is filled, the beta is paused, or the team wants only permanent hires, update the context or skip the outreach.</p>
        </section>

        <section className="example-step example-outreach" aria-labelledby="example-message-title">
          <div className="example-step-heading"><span aria-hidden="true">04</span><div><p className="marketing-eyebrow">From context to outreach</p><h2 id="example-message-title">Write the question the evidence supports.</h2></div></div>
          <div className="example-message-layout">
            <div className="example-message"><div className="example-message-top"><span>Outreach draft</span><span>Sample · Not sent</span></div><p className="example-message-subject"><span>Subject</span> {example.subject}</p><div>{example.outreach.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div>
            <aside className="example-message-notes" aria-label="Why this message works"><h3>Every line has a job.</h3><ol><li><strong>Name the actual trigger.</strong> The opening connects the hiring post to the beta launch.</li><li><strong>Explain the relevance.</strong> Onboarding support relates directly to the role’s stated work.</li><li><strong>Leave room for “no.”</strong> It asks about outside help instead of assuming a problem or budget.</li><li><strong>Offer one next step.</strong> A sprint outline is more concrete than a generic “quick chat.”</li></ol></aside>
          </div>
          <p className="example-review-note"><strong>You make the final call.</strong> Cnvrted helps surface the research and context. Review the sources, confirm the contact, and adapt the draft before sending it through your outreach workflow. Nothing on this page sends a message.</p>
        </section>

        <footer className="example-next"><h2>Try the same thinking on your market.</h2><p>Bring one target company and the problem you solve. We’ll walk through the signal, the fit, and the question it opens up.</p><div><Link href="/book-demo" className="design-button design-button-solid">Book a GTM demo <span aria-hidden="true">↗</span></Link><Link href="/#strategy-title" className="marketing-text-link">Explore the interactive canvas <span aria-hidden="true">↗</span></Link></div></footer>
      </article>
    </IllustratedShell>
  );
}
