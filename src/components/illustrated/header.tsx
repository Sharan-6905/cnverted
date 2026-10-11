"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { assets } from "./assets";
import { DEMO_PATH } from "@/lib/booking";
import { redesignAssets } from "./redesign-assets";

const links = [
  { label: "Help Center", href: "/help-center", icon: assets.home.imgInfo },
  { label: "Blogs", href: "/blogs", icon: assets.home.imgBookOpenText },
  {
    label: "Case Studies",
    href: "/case-studies",
    icon: assets.home.imgBookOpenText,
  },
  { label: "Learn", href: "/learn", icon: assets.home.imgBookOpenText },
  { label: "About Us", href: "/about", icon: assets.home.imgInfo },
  {
    label: "Join Slack",
    href: "/join-slack",
    icon: assets.home.imgGroup1437254394,
  },
];

export function IllustratedHeader({ redesign = false }: { redesign?: boolean }) {
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const resources = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const mobileTrigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeMenu = () => setMobileOpen(false);
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
              {(redesign ? [{ label: "Product", href: "/product", icon: assets.home.imgInfo }, ...links] : links).map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setResourcesOpen(false)}
                  {...(link.href.startsWith("https")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <span>
                    <Image src={link.icon} alt="" width={20} height={20} />
                  </span>
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
          { label: "Product", href: "/product" },
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
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
