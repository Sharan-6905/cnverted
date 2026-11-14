import type { Metadata } from "next";
import { PageSchema } from "@/components/page-schema";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl, pageMetadata, SITE_URL } from "@/lib/seo";
import { DEMO_PATH } from "@/lib/booking";
import Header from "@/components/crockedglass/Header";
import { PageDots } from "@/components/crockedglass/page-dots";
import { CgFooter } from "@/components/crockedglass/site-footer";
import { bricolage, inter, mono } from "@/components/crockedglass/fonts";
import { REELS, POSTS } from "./creators-data";
import { ReelGallery } from "./reel-gallery";
import "@/components/crockedglass/home.css";
import "./creators.css";

const PATH = "/creators";

export const metadata: Metadata = pageMetadata({
  title: "Cnvrted Reviews from Creators | AI Lead Generation in Action",
  description: "Watch creators use Cnvrted AI to find high-intent B2B leads from real buying signals. Reels, LinkedIn posts and X threads on AI lead generation and GTM.",
  path: PATH,
  image: REELS[0].poster,
  imageAlt: REELS[0].alt,
});

const ARROW = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>;
const BTN_ARROW = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
const LINKEDIN = <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.33-1.96 2.7V21h-4z" /></svg>;
const X = <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.8 2h3.4l-7.4 8.5L22.5 22h-6.8l-5.3-6.9L4.3 22H.9l7.9-9.1L.5 2h7l4.8 6.3zm-1.2 18h1.9L6.5 3.9H4.5z" /></svg>;

const fmt = (d: string) => new Date(`${d}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

// Each reel as a VideoObject and each post as a SocialMediaPosting, so search engines can read who said what and when.
function CreatorsSchema() {
  const org = { "@id": `${SITE_URL}/#organization` };
  return <JsonLd data={{
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": absoluteUrl(`${PATH}#creator-content`),
    name: "Creators on Cnvrted",
    itemListElement: [
      ...REELS.map((r) => ({
        "@type": "VideoObject",
        name: r.title,
        description: r.summary,
        thumbnailUrl: absoluteUrl(r.poster),
        uploadDate: r.date,
        url: `https://www.instagram.com/reel/${r.id}/`,
        embedUrl: `https://www.instagram.com/reel/${r.id}/embed/`,
        creator: { "@type": "Person", alternateName: `@${r.handle}`, url: `https://www.instagram.com/${r.handle}/` },
        about: org,
      })),
      ...POSTS.map((p) => ({
        "@type": "SocialMediaPosting",
        headline: p.quote[0],
        articleBody: p.quote.join(" "),
        datePublished: p.date,
        url: p.url,
        author: { "@type": "Person", name: p.author },
        about: org,
      })),
    ].map((item, i) => ({ "@type": "ListItem", position: i + 1, item })),
  }} />;
}

export default function CreatorsPage() {
  return (
    <div className={`cg cg-creators ${bricolage.variable} ${inter.variable} ${mono.variable}`}>
      <PageSchema path={PATH} metadata={metadata} type="CollectionPage" />
      <BreadcrumbSchema trail={[{ name: "Creators" }]} />
      <CreatorsSchema />
      <PageDots />
      <Header />
      <main id="main-content">
        <section className="cg-wrap cg-cr-hero" aria-labelledby="cg-cr-title">
          <h1 id="cg-cr-title">Creators finding <span className="cg-hl">high-intent leads</span> with Cnvrted.</h1>
          <p className="cg-lede">Builders and agency owners show how they use Cnvrted, the AI lead generation platform, to find B2B buyers from real buying signals.</p>
        </section>

        <section className="cg-wrap cg-cr-sec" aria-labelledby="cg-cr-reels-title">
          <div className="cg-head cg-head--center">
            <h2 id="cg-cr-reels-title" className="cg-h2">Watch it in action</h2>
            <p className="cg-lede">Short reels from creators walking through their Cnvrted lead lists.</p>
          </div>
          <ReelGallery reels={REELS} />
        </section>

        <section className="cg-wrap cg-cr-sec" aria-labelledby="cg-cr-posts-title">
          <div className="cg-head cg-head--center">
            <h2 id="cg-cr-posts-title" className="cg-h2">In their words</h2>
            <p className="cg-lede">What creators wrote about Cnvrted on LinkedIn and X.</p>
          </div>
          <div className="cg-cr-posts">
            {POSTS.map((p) => (
              <figure key={p.url} className="cg-cr-post">
                <div className="cg-cr-post-top">
                  <span className="cg-cr-avatar" aria-hidden="true">{p.author[0]}</span>
                  <figcaption>
                    <b>{p.author}</b>
                    <span>{p.handle}</span>
                  </figcaption>
                  <span className="cg-cr-net" aria-label={`Posted on ${p.network}`}>{p.network === "X" ? X : LINKEDIN}</span>
                </div>
                <blockquote cite={p.url}>
                  {p.quote.map((q) => <p key={q}>{q}</p>)}
                </blockquote>
                <div className="cg-cr-post-foot">
                  <time dateTime={p.date}>{fmt(p.date)}</time>
                  <a href={p.url} target="_blank" rel="noopener noreferrer">Read on {p.network}{ARROW}</a>
                </div>
              </figure>
            ))}
          </div>
        </section>

        <section className="cg-wrap cg-cr-sec cg-cr-why" aria-labelledby="cg-cr-why-title">
          <div className="cg-head">
            <h2 id="cg-cr-why-title" className="cg-h2">Why creators talk about Cnvrted</h2>
          </div>
          <div className="cg-cr-why-grid">
            <article>
              <h3>Buying signals, not cold lists</h3>
              <p>Cnvrted reads the open web for <a href="/learn/buying-signals">buying signals</a> such as hiring, funding, launches and people asking for recommendations, and shows which companies are in-market now.</p>
            </article>
            <article>
              <h3>Matched to your ICP</h3>
              <p>Every lead is checked against your <a href="/learn/ideal-customer-profile">ideal customer profile</a>, with the reason it fits and the source it came from, so you can verify it before you reach out.</p>
            </article>
            <article>
              <h3>From signal to outreach</h3>
              <p>Orka, Cnvrted&rsquo;s AI agent, turns a signal into a relevant first message across email, LinkedIn and WhatsApp. See <a href="/learn/signal-to-outreach">how signal-based outreach works</a>.</p>
            </article>
          </div>
        </section>

        <section className="cg-wrap cg-cr-cta" aria-labelledby="cg-cr-cta-title">
          <h2 id="cg-cr-cta-title" className="cg-h2">Made something about Cnvrted?</h2>
          <p className="cg-lede">Send it over and we&rsquo;ll feature it here. Or see the leads for yourself.</p>
          <div className="cg-cr-cta-row">
            <a className="cg-btn" href="https://beta.cnvrted.com">Start free{BTN_ARROW}</a>
            <a className="cg-dark-btn" href={DEMO_PATH}>Book a demo</a>
            <a className="cg-cr-text-link" href="/contact">Share your post{ARROW}</a>
          </div>
        </section>
      </main>
      <CgFooter />
    </div>
  );
}
