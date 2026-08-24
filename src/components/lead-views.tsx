"use client";

import Image from "next/image";
import { Building2, Flame, Snowflake, ListChecks, type LucideIcon } from "lucide-react";
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
 */

interface LeadView {
  Icon: LucideIcon;
  tag: string;
  title: string;
  description: string;
  tone: string;
  image: string;
  alt: string;
  /** each screenshot's own width/height, so it renders at its native ratio */
  aspectRatio: string;
}

const VIEWS: LeadView[] = [
  {
    Icon: Building2,
    tag: "Company trigger",
    title: "Company Leads",
    description:
      "ICP-fit accounts flagged by a company-level trigger — new funding, a hiring surge, a tech-stack change, an exec move. Something changed at the company; that's what put it on your radar.",
    tone: "border-brand-navy/20 bg-brand-navy/10 text-brand-navy",
    image: "/banners/lead-company.png",
    alt: "The Company Leads tab: 19 leads scored 92 to 68, each row showing the company, score, the trigger that fired — Series B funding, a hiring surge, a product launch — the reasoning behind it, the contact's role, and their LinkedIn and email.",
    aspectRatio: "1619 / 972",
  },
  {
    Icon: Flame,
    tag: "Intent score",
    title: "Intent Leads",
    description:
      "The same universe ranked by a 0–100 intent score — how actively people at that account are researching a purchase like yours. High scorers are worth working first, trigger or not.",
    tone: "border-brand-coral/30 bg-brand-coral/10 text-brand-coral",
    image: "/banners/lead-intent.png",
    alt: "The Intent Leads tab: the same 19 accounts with a stated-intent line for each — what the account is actively evaluating or exploring — next to their role, LinkedIn contact, and a Save action.",
    aspectRatio: "1536 / 1024",
  },
  {
    Icon: Snowflake,
    tag: "No trigger or score",
    title: "Cold Leads",
    description:
      "ICP-fit accounts with no active trigger and a low intent score today. Not urgent, but kept on the radar — CNVRTED keeps scoring in the background and moves them up the moment either changes.",
    tone: "border-brand-lavender/40 bg-brand-lavender/15 text-[#6B5FA8]",
    image: "/banners/lead-cold.png",
    alt: "The Cold Leads tab: 19 ICP-fit accounts with a match reason and a confidence score in the 36-62 range, well below the Company and Intent Leads scores, and no role or email filled in yet.",
    aspectRatio: "1612 / 975",
  },
  {
    Icon: ListChecks,
    tag: "Ready to reach",
    title: "Target List",
    description:
      "The shortlist you've promoted out of Intent or Cold Leads, enriched with the right contact, their role, and a verified email — one Generate away from a personalized outreach message.",
    tone: "border-intent-high/30 bg-intent-high-bg text-intent-high",
    image: "/banners/target-list.png",
    alt: "The Target List tab: 96 accounts with the company, website, why it matches the ICP, the contact, their designation, a verified work email, and Generate and Save actions on every row.",
    aspectRatio: "1536 / 1024",
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

            <div
              className="relative w-full overflow-hidden rounded-3xl border border-hairline shadow-soft"
              style={{ aspectRatio: view.aspectRatio }}
            >
              <Image
                src={view.image}
                alt={view.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 640px"
                quality={95}
                className="object-contain"
              />
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
