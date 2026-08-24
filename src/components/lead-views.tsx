"use client";

import { Building2, Flame, Snowflake, ListChecks, ArrowRight, type LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { REVEAL_DURATION, REVEAL_EASE } from "@/components/reveal";

/**
 * The four tabs inside the CNVRTED dashboard, explained in funnel order:
 * Company Leads is the full universe; Intent and Cold Leads are that universe
 * scored by whether a signal fired; Target List is what you've promoted out
 * of either, once a contact is attached and it's ready for outreach.
 *
 * Screenshots of each tab land later — this ships as icon cards so the
 * section is complete on its own rather than shipping empty image slots.
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
    tag: "The universe",
    title: "Company Leads",
    description:
      "Every company in your ICP that CNVRTED has found on the open web — whether or not they're showing a buying signal yet. This is the full account list everything else is scored against.",
    tone: "border-brand-navy/20 bg-brand-navy/10 text-brand-navy",
  },
  {
    Icon: Flame,
    tag: "Signal fired",
    title: "Intent Leads",
    description:
      "Company Leads filtered down to accounts with a real-time buying signal right now — new funding, hiring surges, a tech-stack change, an exec move, or a pain signal. The ones worth working first.",
    tone: "border-brand-coral/30 bg-brand-coral/10 text-brand-coral",
  },
  {
    Icon: Snowflake,
    tag: "No signal — yet",
    title: "Cold Leads",
    description:
      "ICP-fit accounts with nothing active today. Not urgent, but kept on the radar — CNVRTED keeps watching, and moves an account into Intent Leads the moment a signal shows up.",
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
          Four views, <span className="text-accent">one pipeline</span>.
        </>
      }
      description="Every account CNVRTED finds moves through the same four tabs — from the full universe of ICP-fit companies down to a target list ready for outreach."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {VIEWS.map((view, i) => (
          <motion.article
            key={view.title}
            className="group relative flex flex-col rounded-3xl border border-hairline bg-canvas p-6 smooth-transition transition-[transform,border-color,box-shadow] hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-float"
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: REVEAL_DURATION, ease: REVEAL_EASE, delay: i * 0.08 }
            }
          >
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-xl border ${view.tone}`}
            >
              <view.Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </span>

            <Badge variant="outline" size="sm" className="mt-4 w-fit">
              {view.tag}
            </Badge>

            <h3 className="mt-3 font-display text-lg font-semibold leading-snug tracking-tight text-ink">
              {view.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-body">
              {view.description}
            </p>

            {/* funnel arrow between steps, desktop only */}
            {i < VIEWS.length - 1 && (
              <ArrowRight
                className="absolute right-[-22px] top-1/2 hidden h-4 w-4 -translate-y-1/2 text-muted-soft lg:block"
                aria-hidden="true"
              />
            )}
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
