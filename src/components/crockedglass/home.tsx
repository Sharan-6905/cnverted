import { Inter, JetBrains_Mono } from "next/font/google";
import { bricolage } from "./fonts";
import Header from "./Header";
import { SplashWindow } from "./splash-window";
import { HeroQuote } from "./hero-quote";
import { BrainCard } from "./brain-card";
import { WorkflowCard } from "./workflow-card";
import { ChatCard } from "./chat-card";
import { LeadsWheel } from "./leads-wheel";
import { OrkaSection } from "./orka-section";
import { CuratedLeads } from "./curated-leads";
import { StackSphere } from "./stack-sphere";
import { AgentsCard } from "./agents-card";
import { CgFaq } from "./faq";
import { CgFooter } from "./site-footer";
import { ScaleBox } from "./scale-box";
import { UserStories } from "./user-stories";
import { HeroGlow } from "./hero-glow";
import { PageDots } from "./page-dots";
import { ClientPile, type PileClient } from "./client-pile";
import { CrossedFingers } from "./crossed-fingers";
import { DEMO_PATH } from "@/lib/booking";
import "./home.css";


const inter = Inter({ subsets: ["latin"], variable: "--font-cg-inter", weight: ["400", "500", "600"] });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-cg-mono", weight: ["500", "600"], preload: false });

const APP = "https://beta.cnvrted.com";
const ARROW = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
const LINK_ARROW = (c: string) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>;

const CASES = [
  { mark: "L", brand: "Luxsoft", sector: "HR software", c: "#15803d", ink: "#14532d", img: "/crockedglass/case-luxsoft.webp",
    k1: ["Booked demos", "42"], k2: ["Time to first meeting", "6 days", 129], bars: [23, 31, 27, 39, 47, 59, 73], big: "3.2x", small: "more booked demos",
    title: "Luxsoft booked 42 demos in 60 days", desc: "How an HR software team used buying signals to find teams ready to switch, without adding a single SDR." },
  { mark: "T", brand: "Tiny Bites", sector: "D2C food", c: "#a16207", ink: "#713f12", img: "/crockedglass/case-tinybites.webp",
    k1: ["Buyers found", "300"], k2: ["Reply rate", "31%", 120], bars: [19, 21, 29, 35, 34, 49, 62], big: "12", small: "new retail partners",
    title: "Tiny Bites turned cold lists into warm intros", desc: "A kids’ food brand reached 300 retail buyers on WhatsApp and LinkedIn and closed 12 store partnerships in a quarter." },
] as const;

const CLIENTS: PileClient[] = [
  { n: "FPS", src: "/crockedglass/client-fps.png", h: 30 },
  { n: "", src: "/crockedglass/client-2.png", h: 48 },
  { n: "Curato", src: "/crockedglass/client-curato.png", h: 44 },
  { n: "", src: "/crockedglass/client-4.png", h: 52 },
  { n: "", src: "/crockedglass/client-5.png", h: 52, r: 12 },
  { n: "SocialTag", src: "/crockedglass/client-socialtag.png", h: 52, r: 10 },
  { n: "Bahari Services", src: "/crockedglass/client-bahari.svg", h: 46 },
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
          <a className="cg-case-link" href="/case-studies">Read case study{LINK_ARROW(k.ink)}</a>
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
          // hero: soft colour fields on the right, clean white behind the copy
          hero={
            <section className="cg-hero" aria-labelledby="cg-hero-title">
              <HeroGlow />
              <div className="cg-wrap cg-hero-copy">
                <h1 id="cg-hero-title">Find 40+ hot leads on your first day with Cnvrted.</h1>
                <p>Cnvrted finds brands that are launching, rebranding and hiring for growth, and tells you why each one needs a creative partner right now.</p>
                <a className="cg-btn cg-btn--sm" href={DEMO_PATH}>Book Call</a>
              </div>
            </section>
          }
        >
          <img className="cg-splash-img" src="/crockedglass/dashboard.webp" width={1213} height={857}
            alt="The Cnvrted app: build a target, cold or intent list, For You recommendations, and communities matched to your ICP" />
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
            <article className="cg-card cg-card--photo">
              <img src="/crockedglass/train-brain.webp" alt="" loading="lazy" decoding="async" />
              <h3>Train your cnvrted brain</h3>
            </article>
            <ChatCard />
            <LeadsWheel />
          </div>
        </section>

        {/* crossed fingers: pins while the grey half fills in black */}
        <CrossedFingers />

        <OrkaSection appHref={APP} />

        {/* case studies */}
        <section className="cg-wrap cg-cases" aria-labelledby="cg-cases-title">
          <div className="cg-head cg-head--center">
            <h2 id="cg-cases-title" className="cg-h2">Case studies</h2>
            <p className="cg-lede">Real teams, real pipelines, and the conversations Cnvrted started for them.</p>
          </div>
          <div className="cg-cases-row">{CASES.map((k) => <CaseCard key={k.brand} k={k} />)}</div>
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
            <article className="cg-card cg-card--photo">
              <img src="/crockedglass/train-brain.webp" alt="" loading="lazy" decoding="async" />
              <h3>Meetings booked, CRM updated</h3>
            </article>
          </div>
        </section>

        <UserStories />

        {/* Cnvrted Collaboration */}
        <section className="cg-wrap cg-clients" aria-labelledby="cg-clients-title">
          <div className="cg-head">
            <h2 id="cg-clients-title" className="cg-h2">Cnvrted Collaboration</h2>
            <p className="cg-lede">The teams we build pipeline with, from first lead to booked meeting.</p>
          </div>
          <ClientPile clients={CLIENTS} cta={{ label: "Your team next →", href: DEMO_PATH }} />
        </section>

        <CgFaq />

        <div className="cg-tree"><img src="/crockedglass/tree.webp" alt="" width={364} height={380} loading="lazy" decoding="async" draggable={false} /></div>
      </main>
      <CgFooter />
    </div>
  );
}
