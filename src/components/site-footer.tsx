"use client";

import { useState } from "react";
import { ArrowRight, Check, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/logo";

const COLUMNS = [
  {
    heading: "Platform",
    links: [
      { label: "Finding leads", href: "/#product" },
      { label: "Web scraping", href: "/#product" },
      { label: "Dashboard", href: "/#product" },
      { label: "CoPilot", href: "/#product" },
      { label: "Deal intelligence", href: "/#product" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "Sales Development Reps", href: "/#teams" },
      { label: "Account Executives", href: "/#teams" },
      { label: "RevOps", href: "/#teams" },
      { label: "GTM Leaders", href: "/#teams" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Blogs", href: "/blogs" },
      { label: "Pricing", href: "/pricing" },
      { label: "About Us", href: "/about" },
    ],
  },
];

const LEGAL_LINKS = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Contact", href: "#" },
];

function FooterWaitlistForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    console.log("[footer-waitlist] submit:", email);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm text-on-dark">
        <Check className="h-4 w-4 shrink-0" />
        You&apos;re on the list — talk soon.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-2 sm:flex-row">
      <label htmlFor="footer-cta-email" className="sr-only">
        Work email
      </label>
      <div className="relative flex-1">
        <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-soft" />
        <Input
          id="footer-cta-email"
          type="email"
          required
          autoComplete="email"
          placeholder="Enter your mail id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-white/25 bg-white/90 pl-10"
        />
      </div>
      <Button type="submit" variant="primary" size="md" className="shrink-0">
        Join
        <ArrowRight className="h-4 w-4" />
      </Button>
    </form>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-surface-dark text-on-dark/70">
      <Image
        src="/story/story-05.png"
        alt=""
        fill
        className="object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-surface-dark/55" />
      <div className="relative mx-auto max-w-6xl px-6 pt-16">
        <div className="mx-auto max-w-md rounded-2xl border border-white/25 bg-blue-400/10 px-6 py-7 text-center shadow-soft backdrop-blur-xl">
          <h2 className="mx-auto max-w-xs font-display text-lg font-semibold tracking-tight text-on-dark md:text-xl">
            Get to buyers before your competition even knows they&apos;re looking.
          </h2>
          <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-on-dark/70">
            Join the early-access list. Be first to see the accounts ready to buy.
          </p>
          <FooterWaitlistForm />
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-10 sm:grid-cols-3">
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="text-sm font-semibold text-on-dark">{col.heading}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-on-dark/60 smooth-transition transition-colors hover:text-on-dark"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-on-dark/10 pt-8 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <Logo className="h-6 w-6" />
            <span className="text-sm font-semibold tracking-tight text-on-dark">Cnvrted</span>
          </div>

          <nav className="flex items-center gap-6">
            {LEGAL_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-on-dark/60 smooth-transition transition-colors hover:text-on-dark"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <p className="text-xs text-on-dark/50">
            © {new Date().getFullYear()} Cnvrted. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
