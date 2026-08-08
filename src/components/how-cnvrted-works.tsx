"use client";

import { Globe2, Radar, TrendingUp, Layers, Send, CalendarCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal, REVEAL_DURATION, REVEAL_EASE } from "@/components/reveal";
import { cn } from "@/lib/utils";

// One clay tint per step, walking the palette in loop order. Written as whole
// class strings because Tailwind only sees literals when it scans this file.
const STEPS = [
  {
    title: "Watch the Market",
    body: "We continuously monitor the open web for signs a company is about to buy.",
    Icon: Globe2,
    tint: "border-brand-lavender/50 bg-brand-lavender/30 group-hover:bg-brand-lavender/60",
  },
  {
    title: "Collect Buying Signals",
    body: "Hiring, funding, technology changes, and public conversations, captured in real time.",
    Icon: Radar,
    tint: "border-brand-mint/60 bg-brand-mint/35 group-hover:bg-brand-mint/70",
  },
  {
    title: "Rank Company Intent",
    body: "Every account is scored, so your team always knows who to work first.",
    Icon: TrendingUp,
    tint: "border-brand-ochre/50 bg-brand-ochre/30 group-hover:bg-brand-ochre/60",
  },
  {
    title: "Build Company Intelligence",
    body: "Decision makers, context, and evidence are compiled into one profile.",
    Icon: Layers,
    tint: "border-brand-peach/60 bg-brand-peach/35 group-hover:bg-brand-peach/70",
  },
  {
    title: "Generate Personalized Outreach",
    body: "ORKA drafts messages grounded in what's actually happening at the account.",
    Icon: Send,
    tint: "border-brand-coral/45 bg-brand-coral/25 group-hover:bg-brand-coral/50",
  },
  {
    title: "Book More Meetings",
    body: "Warm, relevant outreach turns into conversations — and conversations turn into pipeline.",
    Icon: CalendarCheck,
    tint: "border-brand-pink/40 bg-brand-pink/20 group-hover:bg-brand-pink/45",
  },
];

export function HowCnvrtedWorks() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative px-6 py-10 sm:py-14">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <Reveal className="relative mx-auto max-w-2xl text-center">
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          The full loop
        </span>
        <h2 className="font-display text-display-md font-semibold text-ink">
          From open web to <span className="text-accent">booked meeting</span>.
        </h2>
      </Reveal>

      <div className="relative mx-auto mt-16 max-w-6xl">
        {/* connecting line — horizontal on desktop, vertical on mobile */}
        <div
          className="absolute left-6 top-6 bottom-6 w-px bg-hairline sm:left-0 sm:right-0 sm:top-6 sm:h-px sm:w-auto sm:bottom-auto"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-6 sm:gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              className="group relative flex gap-4 sm:flex-col sm:items-center sm:gap-0"
              initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: REVEAL_DURATION, ease: REVEAL_EASE, delay: i * 0.08 }}
            >
              <span
                className={cn(
                  "relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-brand-teal smooth-transition transition-colors",
                  step.tint
                )}
              >
                <step.Icon className="h-5 w-5" />
              </span>
              <div className="sm:mt-4 sm:text-center">
                <h3 className="text-sm font-semibold text-ink">{step.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{step.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
