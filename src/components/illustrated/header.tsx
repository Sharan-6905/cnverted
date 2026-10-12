"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DEMO_PATH } from "@/lib/booking";
import { redesignAssets } from "./redesign-assets";

const productLink = { label: "Product", href: "/product", icon: "product", width: 46.413, height: 42.415 };
const links = [
  { label: "Help Center", href: "/help-center", icon: "help-center", width: 38.563, height: 27.796 },
  { label: "Blogs", href: "/blogs", icon: "blogs", width: 38.104, height: 35.115 },
  { label: "Case Studies", href: "/case-studies", icon: "case-studies", width: 53.228, height: 53.228 },
  { label: "Learn", href: "/learn", icon: "learn", width: 43.892, height: 40.111 },
  { label: "About Us", href: "/about", icon: "about", width: 41.323, height: 41.323 },
  { label: "Join Slack", href: "/join-slack", icon: "slack", width: 38.105, height: 38.105 },
];

function ResourceIcon({ link }: { link: typeof productLink }) {
  return <span className="design-resource-icon" aria-hidden="true">
    <Image src={`/figma/navigation/${link.icon}.png`} alt="" width={Math.ceil(link.width)} height={Math.ceil(link.height)} sizes="54px" style={{ width: link.width, height: link.height }} />
  </span>;
}

export function IllustratedHeader({ redesign = false }: { redesign?: boolean }) {
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const resources = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const mobileTrigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeMenu = () => { setMobileOpen(false); setResourcesOpen(false); };
    desktop.addEventListener("change", closeMenu);
    return () => desktop.removeEventListener("change", closeMenu);
  }, []);
  useEffect(() => {
    if (!resourcesOpen) return;
    function dismiss(event: PointerEvent) {
      if (!resources.current?.contains(event.target as Node))
        setResourcesOpen(false);
    }
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [resourcesOpen]);
  useEffect(() => {
    if (!mobileOpen) return;
    const dismiss = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setMobileOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [mobileOpen]);
  return (
    <header ref={header} className="illustrated-header" onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget)) setMobileOpen(false);
    }} onKeyDown={event => {
      if (event.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
        mobileTrigger.current?.focus();
      }
    }}>
      <a href="#main-content" className="design-skip-link">
        Skip to content
      </a>
      <nav className="design-nav" aria-label="Main navigation">
        <Link href="/" className="design-home-link" aria-label="Cnvrted home">
          {redesign ? <><Image {...redesignAssets["499-651-imgImage93"]} alt="" sizes="60px" /><img {...redesignAssets["499-651-imgVector"]} alt="Cnvrted" /></> : <span>Cnvrted</span>}
        </Link>
        <div className="design-desktop-nav">
          {!redesign && <><Link href={DEMO_PATH}>Book a call</Link><Link href="/product">Product</Link></>}
          <Link href="/pricing">Pricing</Link>
          <div
            className="design-resources"
            ref={resources}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget))
                setResourcesOpen(false);
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setResourcesOpen(false);
                trigger.current?.focus();
              }
            }}
          >
            <button
              ref={trigger}
              aria-expanded={resourcesOpen}
              aria-controls="resource-links"
              onClick={() => setResourcesOpen(!resourcesOpen)}
            >
              Resources <ChevronDown size={17} aria-hidden="true" />
            </button>
            <div
              id="resource-links"
              className="design-resource-links"
              hidden={!resourcesOpen}
            >
              {(redesign ? [productLink, ...links] : links).map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setResourcesOpen(false)}
                  {...(link.href.startsWith("https")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <ResourceIcon link={link} />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <a
          href="https://beta.cnvrted.com"
          className="design-button design-button-solid design-nav-cta"
        >
          Get Started
        </a>
        <Button
          ref={mobileTrigger}
          variant="ghost"
          className="design-mobile-toggle"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </Button>
      </nav>
      <nav
        hidden={!mobileOpen}
        id="mobile-navigation"
        className="design-mobile-nav"
        aria-label="Mobile navigation"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setMobileOpen(false);
            mobileTrigger.current?.focus();
          }
        }}
      >
        {[
          { label: "Home", href: "/" },
          { label: "Book a call", href: DEMO_PATH },
          productLink,
          { label: "Pricing", href: "/pricing" },
          ...links,
          { label: "Careers", href: "/careers" },
          { label: "Contact", href: "/contact" },
        ].map((link) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={() => setMobileOpen(false)}
          >
            {"icon" in link && <ResourceIcon link={link} />}
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
