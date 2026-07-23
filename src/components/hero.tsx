import { ArrowRight, ShieldCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { HeroScene } from "@/components/hero-scene";
import type { Signal } from "@/lib/types";

interface HeroProps {
  /** a single high-intent signal shown floating in the hero */
  featuredSignal: Signal;
}

export function Hero({ featuredSignal }: HeroProps) {
  return (
    <section className="relative overflow-hidden px-6 pt-16 pb-20 md:pt-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
        {/* Copy + CTA */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
            Real-time buying signals
          </span>

          <h1 className="mt-6 max-w-xl font-display text-6xl font-semibold leading-[0.98] tracking-tight text-ink md:text-display-xl">
            Buyers, not names.
          </h1>

          <p className="mt-5 max-w-md text-lg leading-relaxed text-body">
            The complete sales dashboard. Cnvrted finds who&apos;s ready to buy,
            tells you why, and helps you close — all in one place.
          </p>

          {/* CTA buttons — the waitlist form lives at the bottom of the page */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="/early-access" className={buttonVariants({ variant: "primary", size: "lg" })}>
              Get early access
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-4 flex items-center gap-1.5 text-xs text-muted">
            <ShieldCheck className="h-3.5 w-3.5" />
            Be first to access. No signup pressure, no spam — ever.
          </p>
        </div>

        {/* Scroll-driven clay motion scene */}
        <HeroScene signal={featuredSignal} />
      </div>
    </section>
  );
}
