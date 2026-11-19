// The creator content on /creators. Posters live in public/creators/ (the reel's own 720px cover, saved as webp,
// because Instagram's CDN links expire). Dates come from the posts themselves. To add a reel: save its cover there
// and append it to REELS; for a LinkedIn or X post, append to POSTS with a short verbatim excerpt.

export type Reel = {
  id: string;
  handle: string;
  title: string;
  summary: string;
  alt: string;
  poster: string;
  date: string;
};

export type Post = {
  network: "LinkedIn" | "X";
  author: string;
  handle: string;
  url: string;
  date: string;
  quote: string[];
};

export const REELS: readonly Reel[] = [
  {
    id: "DfOjDLqzGKs",
    handle: "v.i.s.h.ai",
    title: "This tool gives you high-intent leads",
    summary: "A walkthrough of a Cnvrted target list of remote-first companies, saved and ready for outreach.",
    alt: "Creator @v.i.s.h.ai presenting a Cnvrted target list with the caption “This tool gives you high-intent leads”.",
    poster: "/creators/vishai-high-intent-leads.webp",
    date: "2026-11-02",
  },
  {
    id: "DfmpiI5OA3N",
    handle: "simranbuildss",
    title: "I use this platform called Cnvrted",
    summary: "How agencies use Cnvrted to find high-intent leads, fill their sales pipeline and win clients faster.",
    alt: "Creator @simranbuildss holding a microphone below the Cnvrted login screen, with the caption “I use this platform called Cnvrted”.",
    poster: "/creators/simranbuildss-cnvrted-leads.webp",
    date: "2026-11-11",
  },
  {
    id: "DcWAc8Cz3bm",
    handle: "v.i.s.h.ai",
    title: "The AI tool for high-quality leads",
    summary: "A Cnvrted lead list of funded tech companies, each with the reason it fits the ideal customer profile.",
    alt: "Creator @v.i.s.h.ai in front of a Cnvrted lead list of tech companies, with the caption “AI tool for high quality leads”.",
    poster: "/creators/vishai-ai-tool-quality-leads.webp",
    date: "2026-08-22",
  },
  {
    id: "Df7GDPazkAZ",
    handle: "startkabir",
    title: "I got replies from 10 YC companies",
    summary: "Define your ideal customer profile, read your buyers’ buying signals and start the right conversation with Cnvrted.",
    alt: "Creator @startkabir talking to camera, with the caption “I got replies from 10 YC companies”.",
    poster: "/creators/startkabir-yc-replies.webp",
    date: "2026-11-19",
  },
  {
    id: "DfzaWWICcIA",
    handle: "cnvrtedai",
    title: "Haven’t you tried Cnvrted yet?",
    summary: "Traditional outreach next to lead generation with Cnvrted, for B2B sales and GTM teams.",
    alt: "A man at a laptop in front of a dot grid labelled “Traditional outreach”, from the @cnvrtedai reel “Haven’t you tried Cnvrted yet?”.",
    poster: "/creators/cnvrtedai-tried-cnvrted-yet.webp",
    date: "2026-11-16",
  },
];

export const POSTS: readonly Post[] = [
  {
    network: "LinkedIn",
    author: "Himanshu K.",
    handle: "AI Enthusiast · Tech Tips & Tools",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7526139225113686016",
    date: "2026-11-11",
    quote: [
      "Finding potential B2B customers is one thing. Knowing who’s actually ready to buy is another.",
      "Instead of spending hours searching for prospects, teams can focus on companies that are already showing signs of needing their solution.",
    ],
  },
  {
    network: "X",
    author: "Himanshu",
    handle: "@_HimanshuBuilds",
    url: "https://x.com/_HimanshuBuilds/status/2120378789620552102",
    date: "2026-11-11",
    quote: [
      "Finding B2B leads is easy. Finding companies that are actually ready to buy? That’s the real challenge.",
      "Cnvrtd helps sales teams identify prospects through real-time buying signals.",
    ],
  },
];
