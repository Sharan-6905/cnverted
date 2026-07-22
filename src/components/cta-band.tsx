"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CtaBandProps {
  onWaitlistSubmit?: (email: string) => void;
}

export function CtaBand({ onWaitlistSubmit }: CtaBandProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    onWaitlistSubmit?.(email);
    setSubmitted(true);
  }

  return (
    <section id="pricing" className="px-6 py-24">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-hairline bg-surface-soft px-8 py-16 text-center shadow-soft md:px-16">
        <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          Get to buyers before your competition even knows they&apos;re looking.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-muted">
          Join the early-access list. Be first to see the accounts in your market
          that are ready to buy.
        </p>

        <div className="mx-auto mt-8 max-w-md">
          {submitted ? (
            <div className="flex items-center justify-center gap-3 rounded-xl border border-intent-high/30 bg-intent-high-bg px-4 py-3.5">
              <Check className="h-5 w-5 shrink-0 text-intent-high" />
              <p className="text-sm text-ink">You&apos;re on the list — talk soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 sm:flex-row">
              <label htmlFor="cta-email" className="sr-only">
                Work email
              </label>
              <Input
                id="cta-email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" variant="accent" size="md" className="shrink-0">
                Request access
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          )}
          <p className="mt-3 text-xs text-muted">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}
