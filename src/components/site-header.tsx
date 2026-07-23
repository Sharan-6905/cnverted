"use client";

import { useState } from "react";
import Link from "next/link";
import { Slack, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { ProductMenu } from "@/components/product-menu";
import { PRODUCT_GROUPS } from "@/lib/product-features";
import { cn } from "@/lib/utils";

interface SiteHeaderProps {
  onSlackInvite?: () => void;
}

const NAV = [
  { label: "Blogs", href: "/blogs" },
  { label: "Pricing", href: "/pricing" },
  { label: "About Us", href: "/about" },
];

export function SiteHeader({ onSlackInvite }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Cnvrted home">
          <Logo className="h-7 w-7" />
          <span className="text-[17px] font-semibold tracking-tight">Cnvrted</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <ProductMenu />
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm text-muted smooth-transition transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-2.5">
          <Button
            variant="ghost"
            size="sm"
            className="hidden text-muted hover:text-ink sm:inline-flex"
            onClick={onSlackInvite}
          >
            <Slack className="h-4 w-4" />
            Community
          </Button>
          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-lg text-ink md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-hairline bg-canvas md:hidden"
          >
            <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto px-4 py-4 sm:px-6">
              {/* Product accordion */}
              <button
                onClick={() => setMobileProductOpen((v) => !v)}
                className="flex w-full items-center justify-between py-2.5 text-sm font-medium text-ink"
              >
                Product
                <ChevronDown
                  className={cn(
                    "h-4 w-4 smooth-transition transition-transform",
                    mobileProductOpen && "rotate-180"
                  )}
                />
              </button>
              <AnimatePresence>
                {mobileProductOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.18 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-4 py-2">
                      {PRODUCT_GROUPS.map((group) => (
                        <div key={group.label}>
                          <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-muted-soft">
                            {group.label}
                          </p>
                          <ul className="space-y-0.5">
                            {group.features.map((feature) => (
                              <li key={feature.title}>
                                <span className="flex items-center gap-1.5 py-1 text-sm text-body">
                                  {feature.title}
                                  {feature.soon !== false && (
                                    <span className="rounded-full bg-brand-teal/10 px-1.5 py-0.5 font-mono text-[10px] font-medium text-brand-teal">
                                      Soon
                                    </span>
                                  )}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-1 space-y-1 border-t border-hairline pt-3">
                {NAV.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2.5 text-sm font-medium text-ink"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-3 border-t border-hairline pt-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-center text-muted hover:text-ink"
                  onClick={onSlackInvite}
                >
                  <Slack className="h-4 w-4" />
                  Community
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
