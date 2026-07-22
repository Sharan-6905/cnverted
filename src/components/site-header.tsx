"use client";

import { Slack } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

interface SiteHeaderProps {
  onEarlyAccess?: () => void;
  onSlackInvite?: () => void;
}

const NAV = [
  { label: "Product", href: "#product" },
  { label: "Signals", href: "#signals" },
  { label: "Why Us", href: "#why" },
  { label: "Pricing", href: "#pricing" },
];

export function SiteHeader({ onEarlyAccess, onSlackInvite }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2.5" aria-label="Cnvrted home">
          <Logo className="h-7 w-7" />
          <span className="text-[17px] font-semibold tracking-tight">Cnvrted</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-muted smooth-transition transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <Button
            variant="ghost"
            size="sm"
            className="hidden text-muted hover:text-ink sm:inline-flex"
            onClick={onSlackInvite}
          >
            <Slack className="h-4 w-4" />
            Community
          </Button>
          <Button variant="accent" size="sm" onClick={onEarlyAccess}>
            Early access
          </Button>
        </div>
      </div>
    </header>
  );
}
