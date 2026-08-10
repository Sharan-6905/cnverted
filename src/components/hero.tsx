import { HeroScene } from "@/components/hero-scene";

/**
 * A restrained, hero-only emphasis treatment: solid brand-navy text plus a
 * thin, slightly irregular hand-drawn underline (not a CSS border-bottom, not
 * the shared .text-accent gradient used elsewhere on the page).
 */
function HighlightWord({ children }: { children: string }) {
  return (
    <span className="relative inline-block text-brand-navy">
      {children}
      <svg
        className="absolute left-0 w-full"
        style={{ bottom: "-0.1em", height: "0.11em" }}
        viewBox="0 0 100 12"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M1,7.5 C 16,3 32,10 48,5.5 C 63,1.5 78,9 99,4.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-8 pb-20 md:pt-12">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
        {/* Copy + CTA */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
            Real-time buying signals
          </span>

          <h1 className="mt-6 max-w-xl font-display text-display-xl font-semibold text-ink">
            Find <HighlightWord>buyers</HighlightWord> before your{" "}
            <HighlightWord>competitors</HighlightWord> do.
          </h1>

          <p className="mt-5 max-w-md text-lg leading-relaxed text-body">
            CNVRTED continuously scans the web for buying signals, identifies
            companies entering a purchase cycle, and shows exactly why
            they&apos;re ready—so your team reaches buyers before everyone else.
          </p>
        </div>

        {/* Scroll-driven clay motion scene */}
        <HeroScene />
      </div>
    </section>
  );
}
