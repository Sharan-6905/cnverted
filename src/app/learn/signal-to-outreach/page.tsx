import Link from "next/link";
import { IllustratedShell } from "@/components/illustrated/shell";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { JsonLd } from "@/components/json-ld";
import { EXAMPLE_DISCLOSURE, PRODUCT_EXAMPLE_PATH as path } from "@/lib/product-example";
import { ProductExampleDemo } from "@/components/illustrated/product-example-demo";
import { pageMetadata, absoluteUrl, SITE_URL, DEFAULT_SOCIAL_IMAGE } from "@/lib/seo";
import "./example.css";

const title = "From buying signal to outreach.";
const description = "Try three signal-led outreach examples for design, RevOps, and recruiting. Connect ICP fit to buying evidence and a relevant first message using fictional data.";
const published = "2026-10-05";
const modified = "2026-10-11";

export const metadata = pageMetadata({ title: "Interactive GTM Demo: Signal to Outreach | Cnvrted", description, path, publishedTime: published, modifiedTime: modified });

export default function SignalToOutreachExample() {
  return (
    <IllustratedShell className="worked-example-page" faqItems={[]}>
      <BreadcrumbSchema trail={[{ name: "Learn", path: "/learn" }, { name: "Signal to outreach" }]} />
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "Article", "@id": absoluteUrl(`${path}#article`),
        headline: title, description, inLanguage: "en", datePublished: published, dateModified: modified,
        image: absoluteUrl(DEFAULT_SOCIAL_IMAGE.url),
        author: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Cnvrted", url: `${SITE_URL}/about` },
        publisher: { "@id": `${SITE_URL}/#organization` }, mainEntityOfPage: absoluteUrl(path),
      }} />
      <article className="worked-example design-container">
        <header className="worked-example-heading">
          <Link href="/learn" className="marketing-text-link">← All field notes</Link>
          <p className="marketing-eyebrow">An interactive product example</p>
          <h1>From buying signal<br />to outreach.</h1>
          <p className="worked-example-dek">Signal-led outreach connects a company’s fit with recent evidence of a need. Choose a sample business below to see how that evidence becomes a relevant first message.</p>
          <p className="worked-example-disclosure"><strong>Sample data</strong> {EXAMPLE_DISCLOSURE}</p>
          <p className="example-editorial-note">By <Link href="/about">the Cnvrted team</Link> · Published <time dateTime={published}>October 5, 2026</time> · Updated <time dateTime={modified}>October 11, 2026</time></p>
        </header>
        <ProductExampleDemo />
        <section className="example-method" aria-labelledby="example-method-title">
          <h2 id="example-method-title">How do you turn a signal into an outreach message?</h2>
          <ol>
            <li><strong>Check the fit.</strong> Compare the company’s size, market, and problem with your ideal customer profile.</li>
            <li><strong>Verify the signal.</strong> Read the original source and date. Separate what happened from what you think it could mean.</li>
            <li><strong>Ask a relevant question.</strong> Connect the change to a problem you can help with. Give the recipient room to correct your assumption.</li>
          </ol>
          <p>For example, a live design vacancy may justify asking whether onboarding work needs outside support while the team hires. It does not prove that the company wants an agency. The examples above illustrate this reasoning; they do not send messages or use live prospect data.</p>
        </section>
        <aside className="example-guide-links" aria-label="Related field guides">
          <p>Build the reasoning behind your next conversation.</p>
          <Link href="/learn/ideal-customer-profile">Define your ideal customer profile <span aria-hidden="true">↗</span></Link>
          <Link href="/learn/buying-signals">Learn how to qualify a buying signal <span aria-hidden="true">↗</span></Link>
        </aside>
        <footer className="example-next">
          <div><span className="marketing-eyebrow">Now make it yours</span><h2>Bring your market to the table.</h2><p>Tell us what you sell and who you want to reach. We’ll walk through the signals and workflow that could work for your team.</p></div>
          <Link href="/book-demo" className="design-button design-button-solid">Book a GTM demo <span aria-hidden="true">↗</span></Link>
        </footer>
      </article>
    </IllustratedShell>
  );
}
