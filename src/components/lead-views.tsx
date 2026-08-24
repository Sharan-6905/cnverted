"use client";

import { Building2, Flame, Snowflake, ListChecks, ImageOff, type LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { REVEAL_DURATION, REVEAL_EASE } from "@/components/reveal";

/**
 * The four tabs inside the CNVRTED dashboard. Company and Intent Leads are two
 * independent ways an ICP-fit account gets flagged — a company-level trigger
 * (funding, hiring, a tech change, an exec move) versus a 0-100 intent score
 * from buyer behavior — not sequential steps. Cold Leads is the complement of
 * both; Target List is what's been promoted out of any of the three once a
 * contact is attached.
 *
 * Each row reserves the right column for a screenshot of that tab. Until those
 * land, it renders a placeholder — swap it for a real Image and the layout
 * doesn't need to change.
 */

interface LeadView {
  Icon: LucideIcon;
  tag: string;
  title: string;
  description: string;
  tone: string;
}

const VIEWS: LeadView[] = [
  {
    Icon: Building2,
    tag: "Company trigger",
    title: "Company Leads",
    description:
      "ICP-fit accounts flagged by a company-level trigger — new funding, a hiring surge, a tech-stack change, an exec move. Something changed at the company; that's what put it on your radar.",
    tone: "border-brand-navy/20 bg-brand-navy/10 text-brand-navy",
  },
  {
    Icon: Flame,
    tag: "Intent score",
    title: "Intent Leads",
    description:
      "The same universe ranked by a 0–100 intent score — how actively people at that account are researching a purchase like yours. High scorers are worth working first, trigger or not.",
    tone: "border-brand-coral/30 bg-brand-coral/10 text-brand-coral",
  },
  {
    Icon: Snowflake,
    tag: "No trigger or score",
    title: "Cold Leads",
    description:
      "ICP-fit accounts with no active trigger and a low intent score today. Not urgent, but kept on the radar — CNVRTED keeps scoring in the background and moves them up the moment either changes.",
    tone: "border-brand-lavender/40 bg-brand-lavender/15 text-[#6B5FA8]",
  },
  {
    Icon: ListChecks,
    tag: "Ready to reach",
    title: "Target List",
    description:
      "The shortlist you've promoted out of Intent or Cold Leads, enriched with the right contact, their role, and a verified email — one Generate away from a personalized outreach message.",
    tone: "border-intent-high/30 bg-intent-high-bg text-intent-high",
  },
];

export function LeadViews() {
  const reduceMotion = useReducedMotion();

  return (
    <Section
      centered
      eyebrow="Inside the platform"
      title={
        <>
          Two signals, <span className="text-accent">one target list</span>.
        </>
      }
      description="CNVRTED flags every ICP-fit account two ways — a company trigger and an intent score — and lets you promote the strongest of either into a target list ready for outreach."
    >
      <div className="space-y-12 lg:space-y-16">
        {VIEWS.map((view, i) => (
          <motion.article
            key={view.title}
            className="grid items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14"
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: REVEAL_DURATION, ease: REVEAL_EASE, delay: i * 0.05 }
            }
          >
            <div>
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl border ${view.tone}`}
              >
                <view.Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </span>

              <Badge variant="outline" size="sm" className="mt-4 w-fit">
                {view.tag}
              </Badge>

              <h3 className="mt-3 font-display text-2xl font-semibold leading-snug tracking-tight text-ink">
                {view.title}
              </h3>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-body">
                {view.description}
              </p>
            </div>

            {/* Screenshot of this tab goes here — placeholder until it lands. */}
            <div
              className="flex aspect-[4/3] w-full items-center justify-center rounded-3xl border-2 border-dashed border-hairline bg-surface-soft sm:aspect-video lg:aspect-[4/3]"
              aria-hidden="true"
            >
              <div className="flex flex-col items-center gap-2 text-muted-soft">
                <ImageOff className="h-6 w-6" strokeWidth={1.5} />
                <span className="text-xs font-medium">
                  {view.title} screenshot
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
