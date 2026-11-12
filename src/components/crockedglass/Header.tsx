"use client";

/**
 * Cnvrted — site header
 *
 * Full-width, transparent bar at the top of the page. Once the user scrolls,
 * the logo and the nav glide inward and a glass panel fades in behind them,
 * so the header condenses into a centered floating bar.
 *
 * Logo mark: the owl, resized from /figma/redesign/499-651-imgImage93.png.
 * If you move it, update LOGO_MARK below. The "Cnvrted" wordmark is live text in Bricolage Grotesque.
 *
 * Font: Bricolage Grotesque — e.g. in Next.js:
 *   import { Bricolage_Grotesque } from "next/font/google";
 *   const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });
 */

import { useEffect, useRef, useState } from "react";
import "./header.css";

// 132px webp (3x the 44px it renders at). The source PNG it was cut from is 1268px / 942 KB, and this header
// is on every page.
const LOGO_MARK = "/crockedglass/logo-mark.webp";
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

export default function Header({ threshold = 8 }: { threshold?: number }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
    <header className="cv-header" data-scrolled={scrolled}>
      {/* every page using this header has <main id="main-content"> */}
      <a href="#main-content" className="cv-skip">Skip to content</a>
      <div className="cv-pill" aria-hidden="true" />
      <nav className="cv-row" aria-label="Main">
        <div className="cv-group cv-left">
          <a href="/" className="cv-brand" aria-label="Cnvrted home">
            <img src={LOGO_MARK} alt="" className="cv-brand-mark" width={44} height={43} fetchPriority="high" />
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
