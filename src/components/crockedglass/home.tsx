import { Inter, JetBrains_Mono } from "next/font/google";
import { bricolage } from "./fonts";
import Header from "./Header";
import { SplashWindow } from "./splash-window";
import { AppDemoVideo } from "./app-demo-video";
import { HeroQuote } from "./hero-quote";
import { BrainCard } from "./brain-card";
import { WorkflowCard } from "./workflow-card";
import { ChatCard } from "./chat-card";
import { TrainBrainCard } from "./train-brain-card";
import { MeetingsCard } from "./meetings-card";
import { LeadsWheel } from "./leads-wheel";
import { OrkaSection } from "./orka-section";
import { CuratedLeads } from "./curated-leads";
import { StackSphere } from "./stack-sphere";
import { AgentsCard } from "./agents-card";
import { CgFaq } from "./faq";
import { CgFooter } from "./site-footer";
import { ScaleBox } from "./scale-box";
import { UserStories } from "./user-stories";
import { PageDots } from "./page-dots";
import { LogoCarousel, type Logo } from "@/components/ui/logo-carousel";
import { CrossedFingers } from "./crossed-fingers";
import { OrkaTravel } from "./orka-travel";
import { DEMO_PATH } from "@/lib/booking";
import { CASE_STUDIES } from "@/lib/case-studies";
import "./home.css";


const inter = Inter({ subsets: ["latin"], variable: "--font-cg-inter", weight: ["400", "500", "600"] });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-cg-mono", weight: ["500", "600"], preload: false });

const APP = "https://beta.cnvrted.com";
const ARROW = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
const LINK_ARROW = (c: string) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>;

// The two real stories from /case-studies (src/lib/case-studies.ts), drawn exactly as the Crockedglass design's
// case cards: a coloured folder (green, then amber) holding a report sheet, behind a frosted front. The link goes to
// the story; the numbers are the ones the story reports. The card's title and blurb are a short cut of the story's
// own (the design fits one line and two lines). Neither customer is named publicly, so no brand is invented.
const CASE_CARDS = {
  "from-cold-emails-to-warm-conversations": { mark: "F", brand: "B2B founder", sector: "Customer story", c: "#15803d", ink: "#14532d",
    img: "/crockedglass/case-luxsoft.webp", k1: ["Targeted emails", "11"], k2: ["Demos that week", "3", 129],
    bars: [23, 31, 27, 39, 47, 59, 73], big: "6 of 11", small: "prospects replied",
    title: "From 200 cold emails to 11 warm ones",
    desc: "A founder swapped 200 generic emails a day for 11 built on recent buying signals. Three booked demos that week." },
  "how-cnvrted-finds-its-customers": { mark: "C", brand: "Cnvrted", sector: "Inside Cnvrted", c: "#a16207", ink: "#713f12",
    img: "/crockedglass/case-tinybites.webp", k1: ["Post flagged in", "12 min"], k2: ["Founder replied in", "20 min", 120],
    bars: [19, 21, 29, 35, 34, 49, 62], big: "Next day", small: "from a LinkedIn post to a signup",
    title: "We use Cnvrted to find Cnvrted’s customers",
    desc: "How our own team reads overnight buying signals and reaches out within the hour, with the source in hand." },
} as const;

const CASES = CASE_STUDIES.flatMap((story) => {
  const card = CASE_CARDS[story.slug as keyof typeof CASE_CARDS];
  return card ? [{ ...card, slug: story.slug }] : [];
});

// Logo files in /public; unnamed ones are clients whose wordmark is the logo itself.
const CLIENTS: Logo[] = [
  { id: 1, name: "FPS", img: "/crockedglass/client-fps.png" },
  { id: 2, name: "", img: "/crockedglass/client-2.png" },
  { id: 3, name: "Curato", img: "/crockedglass/client-curato.png" },
  { id: 4, name: "", img: "/crockedglass/client-4.png" },
  { id: 5, name: "", img: "/crockedglass/client-5.png" },
  { id: 6, name: "SocialTag", img: "/crockedglass/client-socialtag.png" },
  { id: 7, name: "Bahari Services", img: "/crockedglass/client-bahari.svg" },
];

function CaseCard({ k }: { k: (typeof CASES)[number] }) {
  return (
    <ScaleBox width={530} height={434} className="cg-case-cell">
      <article className="cg-case">
        <img src={k.img} alt="" loading="lazy" decoding="async" />
        <span className="cg-case-back" />
        <div className="cg-case-sheet" aria-hidden="true">
          <span className="cg-case-mark" style={{ background: k.c }}>{k.mark}</span>
          <p style={{ left: 64, top: 19, fontWeight: 600, fontSize: 14, color: "#18191b" }}>{k.brand}</p>
          <p className="cg-case-l" style={{ left: 64, top: 36 }}>{k.sector}</p>
          <p className="cg-case-l" style={{ left: 23, top: 63 }}>{k.k1[0]}</p>
          <p className="cg-case-v" style={{ left: 23, top: 79 }}>{k.k1[1]}</p>
          <p className="cg-case-l" style={{ left: k.k2[2], top: 65 }}>{k.k2[0]}</p>
          <p className="cg-case-v" style={{ left: k.k2[2], top: 81 }}>{k.k2[1]}</p>
          <div className="cg-case-bars">{k.bars.map((h, i) => <span key={i} style={{ height: h, background: k.c, opacity: 0.35 + i * 0.09 }} />)}</div>
        </div>
        <div className="cg-case-glass" style={{ color: k.ink }}>
          <p className="cg-case-big">{k.big}</p>
          <p className="cg-case-small">{k.small}</p>
          <a className="cg-case-link" href={`/case-studies/${k.slug}`}>Read case study{LINK_ARROW(k.ink)}</a>
        </div>
        <h3>{k.title}</h3>
        <p className="cg-case-desc">{k.desc}</p>
      </article>
    </ScaleBox>
  );
}

export function CrockedglassHome() {
  return (
    <div className={`cg ${bricolage.variable} ${inter.variable} ${mono.variable}`}>
      <PageDots />
      <Header />
      <main id="main-content">
        {/* hero + app window, one pinned screen: the photo card under the copy opens to full-bleed as you scroll and
            the window rises into it (the save.design reveal) */}
        <SplashWindow
          // hero: the copy on plain white
          hero={
            <section className="cg-hero" aria-labelledby="cg-hero-title">
              <div className="cg-wrap cg-hero-copy">
                <h1 id="cg-hero-title">Get <span className="cg-hl cg-hl--hot">hot leads</span> within your first <span className="cg-hl cg-hl--time">24 hours</span> on Cnvrted.</h1>
                <p>Cnvrted finds brands that are launching, rebranding and hiring for growth, and tells you why each one needs a creative partner right now.</p>
                <a className="cg-btn cg-btn--sm" href={DEMO_PATH}>Book Call</a>
              </div>
            </section>
          }
        >
          <AppDemoVideo />
        </SplashWindow>

        {/* open web → booked meetings */}
        <section className="cg-wrap cg-feat" aria-labelledby="cg-feat-title">
          <div className="cg-feat-top">
            <div className="cg-head">
              <h2 id="cg-feat-title" className="cg-h2">From the open web to<br />booked meetings</h2>
              <p className="cg-lede">Define your ideal customer profile, understand your buyers’ buying signals, and give your team the context to start the right conversation.</p>
            </div>
            <HeroQuote />
          </div>
          <div className="cg-grid2">
            <BrainCard />
            <WorkflowCard />
          </div>
          <div className="cg-grid3">
            <TrainBrainCard />
            <ChatCard />
            <LeadsWheel />
          </div>
        </section>

        {/* crossed fingers: pins while the grey half fills in black */}
        {/* one Orka shared by both: he freezes on screen when the line scrolls away and docks above "Hi! I'm Orka" */}
        <OrkaTravel>
          <CrossedFingers />

          <OrkaSection appHref={APP} />
        </OrkaTravel>

        {/* case studies */}
        <section className="cg-wrap cg-cases" aria-labelledby="cg-cases-title">
          <div className="cg-head cg-head--center">
            <h2 id="cg-cases-title" className="cg-h2">Case studies</h2>
            <p className="cg-lede">Real teams, real pipelines, and the conversations Cnvrted started for them.</p>
          </div>
          <div className="cg-cases-row">{CASES.map((k) => <CaseCard key={k.slug} k={k} />)}</div>
        </section>

        {/* curated leads: pins while the story plays */}
        <div className="cg-wrap"><CuratedLeads /></div>

        {/* Cnvrted is Buffed */}
        <section className="cg-wrap cg-buffed" aria-labelledby="cg-buffed-title">
          <div className="cg-buffed-top">
            <div className="cg-head">
              <h2 id="cg-buffed-title" className="cg-h2">Cnvrted is Buffed</h2>
              <p className="cg-lede">We at Cnvrted are on our way to bringing every GTM tool you could need into one place, so your team can find, reach and close without switching apps.</p>
            </div>
            <a className="cg-btn" href="/product">Explore{ARROW}</a>
          </div>
          <div className="cg-grid3">
            <StackSphere />
            <AgentsCard />
            <MeetingsCard />
          </div>
        </section>

        <UserStories />

        {/* Cnvrted Collaboration */}
        <section className="cg-wrap cg-clients" aria-labelledby="cg-clients-title">
          <div className="cg-head cg-head--center">
            <h2 id="cg-clients-title" className="cg-h2">Cnvrted Collaboration</h2>
            <p className="cg-lede">The teams we build pipelines with, from first lead to booked meeting.</p>
          </div>
          <div className="cg-collab">
            <LogoCarousel columnCount={3} logos={CLIENTS} />
            <a className="cg-btn cg-collab-cta" href={DEMO_PATH}>Your team next{ARROW}</a>
          </div>
        </section>

        <CgFaq />

        <div className="cg-tree"><img src="/crockedglass/tree.webp" alt="" width={364} height={380} loading="lazy" decoding="async" draggable={false} /></div>
      </main>
      <CgFooter />
    </div>
  );
}
