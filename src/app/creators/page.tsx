import type { Metadata } from "next";
import { PageSchema } from "@/components/page-schema";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { pageMetadata } from "@/lib/seo";
import Header from "@/components/crockedglass/Header";
import { PageDots } from "@/components/crockedglass/page-dots";
import { CgFooter } from "@/components/crockedglass/site-footer";
import { bricolage, inter, mono } from "@/components/crockedglass/fonts";
import "@/components/crockedglass/home.css";
import "./creators.css";

export const metadata: Metadata = pageMetadata({
  title: "Creators on Cnvrted | Reels, Posts & Reviews",
  description: "Builders and creators showing how they use Cnvrted AI to find B2B buyers from real buying signals: reels, LinkedIn posts and threads.",
  path: "/creators",
});

// Every embed is a plain iframe (no Instagram/LinkedIn/X scripts on the page); their origins are allowed in
// frame-src in src/proxy.ts. To add one: append it here; reels go in REELS, everything else in POSTS.
const REELS = [
  { id: "DfOjDLqzGKs", handle: "v.i.s.h.ai" },
  { id: "DfmpiI5OA3N", handle: "simranbuildss" },
  { id: "DcWAc8Cz3bm", handle: "v.i.s.h.ai" },
];

const POSTS = [
  {
    network: "LinkedIn",
    handle: "Himanshu K",
    src: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7526125059430785024",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7526139225113686016",
    height: 640,
  },
  {
    network: "X",
    handle: "@_HimanshuBuilds",
    src: "https://platform.twitter.com/embed/Tweet.html?id=2120378789620552102&dnt=true&theme=light",
    href: "https://x.com/_HimanshuBuilds/status/2120378789620552102",
    height: 640,
  },
];

const ARROW = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>;

export default function CreatorsPage() {
  return (
    <div className={`cg cg-creators ${bricolage.variable} ${inter.variable} ${mono.variable}`}>
      <PageSchema path="/creators" metadata={metadata} />
      <BreadcrumbSchema trail={[{ name: "Creators" }]} />
      <PageDots />
      <Header />
      <main id="main-content">
        <section className="cg-wrap cg-cr-hero" aria-labelledby="cg-cr-title">
          <span className="cg-cr-eyebrow">Creators</span>
          <h1 id="cg-cr-title">Builders showing how they find <span className="cg-hl">buyers</span> with Cnvrted.</h1>
          <p className="cg-lede">Reels, posts and threads from people who put Cnvrted to work. Their words, their pipelines.</p>
        </section>

        <section className="cg-wrap cg-cr-reels" aria-labelledby="cg-cr-reels-title">
          <h2 id="cg-cr-reels-title" className="cg-cr-label">On Instagram</h2>
          <div className="cg-cr-reel-row">
            {REELS.map((r, i) => (
              <figure key={r.id} className="cg-cr-reel" style={{ ["--tilt" as string]: `${(i - 1) * 2.5}deg` }}>
                <div className="cg-cr-phone">
                  <iframe
                    src={`https://www.instagram.com/reel/${r.id}/embed/`}
                    title={`Instagram reel by @${r.handle}`}
                    loading="lazy"
                    allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
                    allowFullScreen
                  />
                </div>
                <figcaption>
                  <span className="cg-cr-handle">@{r.handle}</span>
                  <a href={`https://www.instagram.com/reel/${r.id}/`} target="_blank" rel="noopener noreferrer">Watch on Instagram{ARROW}</a>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="cg-wrap cg-cr-posts" aria-labelledby="cg-cr-posts-title">
          <h2 id="cg-cr-posts-title" className="cg-cr-label">On LinkedIn &amp; X</h2>
          <div className="cg-cr-post-row">
            {POSTS.map((p) => (
              <figure key={p.href} className="cg-cr-post">
                <figcaption>
                  <span className="cg-cr-net">{p.network}</span>
                  <span className="cg-cr-handle">{p.handle}</span>
                  <a href={p.href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${p.handle}'s post on ${p.network}`}>Open{ARROW}</a>
                </figcaption>
                <div className="cg-cr-post-frame">
                  <iframe src={p.src} title={`${p.network} post by ${p.handle}`} loading="lazy" style={{ height: p.height }} />
                </div>
              </figure>
            ))}
          </div>
        </section>

        <section className="cg-wrap cg-cr-cta" aria-labelledby="cg-cr-cta-title">
          <h2 id="cg-cr-cta-title" className="cg-h2">Made something about Cnvrted?</h2>
          <p className="cg-lede">Send it over and we&rsquo;ll feature it here.</p>
          <a className="cg-btn" href="/contact">Get in touch</a>
        </section>
      </main>
      <CgFooter />
    </div>
  );
}
