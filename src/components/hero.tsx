import { HeroScene } from "@/components/hero-scene";

function HighlightWord({ children }: { children: string }) {
  return <span className="text-accent">{children}</span>;
}

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-8 pb-20 md:pt-12">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
        {/* Copy + CTA */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
            Real-time buying signals
          </span>

          <h1 className="mt-6 max-w-2xl font-display text-display-xl font-normal text-ink">
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
