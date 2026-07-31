"use client";

import { useState } from "react";
import { ArrowRight, Check, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/logo";
import { LinkedInIcon, XIcon, InstagramIcon, DiscordIcon } from "@/components/social-icons";
import { supabase } from "@/lib/supabase";

const COLUMNS = [
  {
    heading: "Platform",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "Request Demo", href: "/early-access" },
    ],
  },
  {
    heading: "Features",
    links: [
      { label: "Product Capabilities", href: "/#product" },
      { label: "Our Approach", href: "/about" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blog", href: "/blogs" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Help Center", href: "/help-center" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
      { label: "Learn from us", href: "/learn" },
    ],
  },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/cnvrted", Icon: LinkedInIcon },
  { label: "X", href: "https://x.com/cnvrted", Icon: XIcon },
  { label: "Instagram", href: "https://www.instagram.com/cnvrted", Icon: InstagramIcon },
  {
    label: "Discord",
    href: "https://join.slack.com/t/cnvrted/shared_invite/zt-4388qsrbr-x~RlkFSChnmWY7JojhV1fA",
    Icon: DiscordIcon,
  },
];

const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Contact", href: "/contact" },
];

function FooterWaitlistForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError(null);
    const { error } = await supabase.from("footer_waitlist_emails").insert({ email });
    setLoading(false);
    if (error) {
      setError(error.code === "23505" ? "You're already on the list." : "Something went wrong. Try again.");
      return;
    }
    setSubmitted(true);
    fetch("/api/waitlist-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }).catch(() => {});
  }

  if (submitted) {
    return (
      <div className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm text-on-dark">
        <Check className="h-4 w-4 shrink-0" />
        Thank you for registering — our team will get in touch with you.
      </div>
    );
  }

  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
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
        <Button type="submit" variant="primary" size="md" className="shrink-0" disabled={loading}>
          {loading ? "Joining…" : "Join"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>
      {error && <p className="mt-2 text-xs text-red-300">{error}</p>}
    </div>
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
      <div className="relative mx-auto max-w-6xl px-6 pt-8">
        <div className="mx-auto flex max-w-lg flex-col items-center rounded-2xl border border-white/25 bg-blue-400/10 px-6 py-6 text-center shadow-soft backdrop-blur-xl">
          <h2 className="mx-auto max-w-sm font-display text-base font-semibold tracking-tight text-on-dark md:text-lg">
            Get to buyers before your competition even knows they&apos;re looking.
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-on-dark/70">
            Join the early-access list. Be first to see the accounts ready to buy.
          </p>
          <FooterWaitlistForm />
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-16">
        <div className="grid grid-cols-4 gap-3 sm:gap-8 lg:gap-10">
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
            <Logo className="h-8 w-auto" />
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

          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-on-dark/60 smooth-transition transition-colors hover:text-on-dark"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <p className="text-xs text-on-dark/50">
            © {new Date().getFullYear()} Cnvrted. All rights reserved.
          </p>
        </div>

        {/* Made-with badge, sitting in the open space under the footer bar */}
        <div className="mt-12 flex justify-center">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.07] px-5 py-2.5 text-xs tracking-wide text-on-dark/70 shadow-soft backdrop-blur-md smooth-transition transition-colors hover:border-white/25 hover:bg-white/[0.12]">
            <Logo className="h-5 w-auto" />
            Build by{" "}
            <span className="font-semibold text-[#BEF264]">bangalore boys</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
