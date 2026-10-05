import Link from "next/link";
import { IllustratedShell } from "@/components/illustrated/shell";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { JsonLd } from "@/components/json-ld";
import { EXAMPLE_DISCLOSURE, PRODUCT_EXAMPLE_PATH as path } from "@/lib/product-example";
import { ProductExampleDemo } from "@/components/illustrated/product-example-demo";
import { pageMetadata, absoluteUrl, SITE_URL } from "@/lib/seo";
import "./example.css";

const title = "Your market. Your next conversation.";
const description = "Choose a sample business and explore its ideal customer, buying signals, and outreach draft. Try three interactive Cnvrted examples with clearly labelled fictional data.";
const published = "2026-10-05";

export const metadata = pageMetadata({ title: "Interactive GTM Demo: Signal to Outreach | Cnvrted", description, path, publishedTime: published });

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
          <p className="marketing-eyebrow">An interactive product example</p>
          <h1>Your market.<br />Your next conversation.</h1>
          <p className="worked-example-dek">Choose a business. Find the fit, follow the signal, and see what you could say next.</p>
          <p className="worked-example-disclosure"><strong>Sample data</strong> {EXAMPLE_DISCLOSURE}</p>
        </header>
        <ProductExampleDemo />
        <footer className="example-next">
          <div><span className="marketing-eyebrow">Now make it yours</span><h2>Bring your market to the table.</h2><p>Tell us what you sell and who you want to reach. We’ll walk through the signals and workflow that could work for your team.</p></div>
          <Link href="/book-demo" className="design-button design-button-solid">Book a GTM demo <span aria-hidden="true">↗</span></Link>
        </footer>
      </article>
    </IllustratedShell>
  );
}
