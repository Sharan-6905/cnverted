"use client";

/**
 * Cnvrted — site header
 *
 * Full-width, transparent bar at the top of the page. Once the user scrolls,
 * the logo and the nav glide inward and a glass panel fades in behind them,
 * so the header condenses into a centered floating bar.
 *
 * Tone: the header reads what is under its left half (logo) and right half (nav) and turns each one light or
 * dark to match, so the glass bar becomes a left-to-right gradient while the splash card opens under it. A
 * section that is dark only because of a photo (no solid background colour) says so with data-header-tone="dark";
 * otherwise the first opaque background-color under the header decides.
 *
 * Logo mark: the colour mark on light backgrounds, the white one on dark (both 132px webp, cut from the brand
 * files with the same ~14px transparent margin the old mark had). The "Cnvrted" wordmark is live text.
 *
 * Font: Bricolage Grotesque — e.g. in Next.js:
 *   import { Bricolage_Grotesque } from "next/font/google";
 *   const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });
 */

import { useEffect, useRef, useState } from "react";
import "./header.css";

// 132px webp (3x the 44px it renders at); this header is on every page, so keep them small.
const LOGO_LIGHT_BG = "/crockedglass/logo-mark-color.webp";
const LOGO_DARK_BG = "/crockedglass/logo-mark-white.webp";
const CTA_HREF = "https://beta.cnvrted.com";

const RESOURCES = [
  { label: "Product", href: "/product" },
  { label: "Help Center", href: "/help-center" },
  { label: "Blogs", href: "/blogs" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Learn", href: "/learn" },
  { label: "About Us", href: "/about" },
  { label: "Join Slack", href: "/join-slack" },
];

type Tone = "light" | "dark";

/** sRGB relative luminance of a computed colour, or null when it's mostly transparent */
function luminance(color: string): number | null {
  const m = color.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const [r, g, b, a = 1] = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
  if (a < 0.5) return null;
  const lin = (c: number) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/** tone of whatever is painted under (x, y), skipping the header itself */
function toneAt(x: number, y: number, header: HTMLElement): Tone {
  for (const el of document.elementsFromPoint(x, y)) {
    if (header.contains(el)) continue;
    const hinted = (el as HTMLElement).dataset?.headerTone;
    if (hinted === "dark" || hinted === "light") return hinted;
    const l = luminance(getComputedStyle(el).backgroundColor);
    if (l !== null) return l < 0.35 ? "dark" : "light";
  }
  return "light";
}

export default function Header({ threshold = 8 }: { threshold?: number }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [tone, setTone] = useState<{ left: Tone; right: Tone }>({ left: "light", right: "light" });
  const dropRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // a timer, not requestAnimationFrame: ~20 checks a second is plenty under 300ms colour fades, and it keeps
    // working in tabs where rAF is paused
    let timer = 0;
    const update = () => {
      timer = 0;
      const isScrolled = window.scrollY > threshold;
      setScrolled(isScrolled);
      const header = headerRef.current;
      if (!header) return;
      // the row's vertical middle (the header drops 12px once scrolled); one sample inside each half's content
      const y = 36 + (isScrolled ? 12 : 0);
      const w = window.innerWidth;
      const left = toneAt(Math.min(w * 0.18, 140), y, header);
      const right = toneAt(Math.max(w * 0.82, w - 160), y, header);
      setTone((t) => (t.left === left && t.right === right ? t : { left, right }));
    };
    const schedule = () => { if (!timer) timer = window.setTimeout(update, 50); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [threshold]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!dropRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header ref={headerRef} className="cv-header" data-scrolled={scrolled} data-tone-left={tone.left} data-tone-right={tone.right}>
      {/* every page using this header has <main id="main-content"> */}
      <a href="#main-content" className="cv-skip">Skip to content</a>
      <div className="cv-pill" aria-hidden="true" />
      <nav className="cv-row" aria-label="Main">
        <div className="cv-group cv-left">
          <a href="/" className="cv-brand" aria-label="Cnvrted home">
            <span className="cv-brand-marks">
              <img src={LOGO_LIGHT_BG} alt="" className="cv-brand-mark cv-mark-on-light" width={44} height={44} fetchPriority="high" />
              <img src={LOGO_DARK_BG} alt="" className="cv-brand-mark cv-mark-on-dark" width={44} height={43} />
            </span>
            <span className="cv-brand-word">Cnvrted</span>
          </a>
        </div>

        <div className="cv-group cv-right">
          <div className="cv-links">
            <a href="/pricing" className="cv-link cv-hide-sm">Pricing</a>
            <div className="cv-dropdown" ref={dropRef}>
              <button
                type="button"
                className="cv-link cv-trigger"
                aria-haspopup="menu"
                aria-expanded={open}
                aria-controls="cv-resources"
                onClick={() => setOpen((o) => !o)}
              >
                Resources
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
              </button>
              <div id="cv-resources" className="cv-menu" role="menu" data-open={open}>
                {/* Pricing sits in the bar on wider screens; on phones the bar hides it, so it lives here */}
                <a href="/pricing" role="menuitem" className="cv-menu-item cv-show-sm" onClick={() => setOpen(false)}>Pricing</a>
                {RESOURCES.map((r) => (
                  <a key={r.href} href={r.href} role="menuitem" className="cv-menu-item" onClick={() => setOpen(false)}>
                    {r.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <a href={CTA_HREF} className="cv-cta">Get Started</a>
        </div>
      </nav>
    </header>
  );
}
