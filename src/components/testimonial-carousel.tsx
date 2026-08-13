"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Testimonial {
  quote: string;
  /** exact substrings from `quote` to render in the accent colour */
  highlights: string[];
  name: string;
  role: string;
  company: string;
  /** if set, the company name links out here */
  companyUrl?: string;
  /** hide company behind a blur — used for placeholder testimonials */
  blurCompany?: boolean;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Within the first week, we were getting high-intent leads that were actually ready to talk. It's changed how we prioritize outreach entirely.",
    highlights: ["high-intent leads", "ready to talk"],
    name: "Vishnu Vijayan",
    role: "MD",
    company: "11fps",
    companyUrl: "https://11fps.com",
  },
  {
    quote:
      "We stopped guessing which accounts to call first. Cnvrted tells us the moment someone's actually in-market, and our reply rates nearly doubled in a quarter.",
    highlights: ["in-market", "reply rates nearly doubled"],
    name: "Sarah Chen",
    role: "VP Sales",
    company: "Northbeam",
    blurCompany: true,
  },
  {
    quote:
      "Every other tool gave us a static list and called it intent. Cnvrted gives us the trigger — the actual reason to reach out today instead of next month.",
    highlights: ["the trigger"],
    name: "Marcus Webb",
    role: "Head of RevOps",
    company: "Loopline",
    blurCompany: true,
  },
];

/** Splits a quote on its highlight phrases and wraps each match in the accent colour. */
function renderQuote(quote: string, highlights: string[]) {
  if (highlights.length === 0) return quote;
  const escaped = highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const pattern = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = quote.split(pattern);
  return parts.map((part, i) =>
    highlights.some((h) => h.toLowerCase() === part.toLowerCase()) ? (
      <span key={i} className="text-accent">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (isHovered) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 3000);
    return () => clearInterval(id);
  }, [isHovered]);

  function goTo(index: number) {
    setActiveIndex(index);
  }

  function goPrev() {
    setActiveIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }

  function goNext() {
    setActiveIndex((i) => (i + 1) % TESTIMONIALS.length);
  }

  const active = TESTIMONIALS[activeIndex];

  return (
    <section
      className="relative overflow-hidden bg-canvas px-6 py-24 sm:py-32"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-2xl text-center">
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          Testimonials
        </span>
        <h2 className="font-display text-display-md font-semibold text-ink">
          What <span className="text-accent">our users</span> are telling.
        </h2>
      </div>

      <div className="relative mx-auto mt-14 max-w-2xl">
        <div className="overflow-hidden rounded-3xl border border-hairline bg-canvas p-8 shadow-soft sm:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <p className="font-display text-2xl font-normal leading-snug text-ink sm:text-[28px]">
                &ldquo;{renderQuote(active.quote, active.highlights)}&rdquo;
              </p>
              <div className="mt-8">
                <p className="text-sm font-semibold text-ink">{active.name}</p>
                <p className="mt-1 text-sm text-muted">
                  {active.role} at{" "}
                  {active.blurCompany ? (
                    <>
                      <span className="select-none blur-[4px]" aria-hidden="true">
                        {active.company}
                      </span>
                      <span className="sr-only">a company we&rsquo;re keeping confidential</span>
                    </>
                  ) : active.companyUrl ? (
                    <a
                      href={active.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-ink underline decoration-hairline underline-offset-2 smooth-transition transition-colors hover:text-brand-teal hover:decoration-brand-teal"
                    >
                      {active.company}
                    </a>
                  ) : (
                    active.company
                  )}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous testimonial"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-hairline bg-canvas text-brand-teal smooth-transition transition-colors hover:bg-surface-soft"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === activeIndex}
                className={cn(
                  "h-2 rounded-full smooth-transition transition-all",
                  i === activeIndex ? "w-6 bg-brand-teal" : "w-2 bg-hairline hover:bg-muted-soft/50"
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next testimonial"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-hairline bg-canvas text-brand-teal smooth-transition transition-colors hover:bg-surface-soft"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
