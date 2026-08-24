"use client";

import Image from "next/image";
import { Building2, Flame, Snowflake, ListChecks, type LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { REVEAL_DURATION, REVEAL_EASE } from "@/components/reveal";

/**
 * The four tabs inside the CNVRTED dashboard, laid out two per row: Company
 * and Intent Leads are the two ways an account gets flagged, then Cold Leads
 * and Target List sit beneath them as the volume and the curated watchlist.
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
      "Companies showing a real trigger — funding, hiring, launching — that signals they're about to need you.",
    tone: "border-brand-navy/20 bg-brand-navy/10 text-brand-navy",
    image: "/banners/lead-company.png",
    alt: "The Company Leads tab: 19 leads scored 92 to 68, each row showing the company, score, the trigger that fired — Series B funding, a hiring surge, a product launch — the reasoning behind it, the contact's role, and their LinkedIn and email.",
    aspectRatio: "1619 / 972",
  },
  {
    Icon: Flame,
    tag: "Stated intent",
    title: "Intent Leads",
    description:
      "Buyers who are asking for this right now, in their own words.",
    tone: "border-brand-coral/30 bg-brand-coral/10 text-brand-coral",
    image: "/banners/lead-intent.png",
    alt: "The Intent Leads tab: the same 19 accounts with a stated-intent line for each — what the account is actively evaluating or exploring — next to their role, LinkedIn contact, and a Save action.",
    aspectRatio: "1536 / 1024",
  },
  {
    Icon: Snowflake,
    tag: "On-demand volume",
    title: "Cold Leads",
    description:
      "On-demand volume: every contact that matches your ICP, ready when you need scale.",
    tone: "border-brand-lavender/40 bg-brand-lavender/15 text-[#6B5FA8]",
    image: "/banners/lead-cold.png",
    alt: "The Cold Leads tab: 19 ICP-fit accounts with a match reason and a confidence score in the 36-62 range, well below the Company and Intent Leads scores, and no role or email filled in yet.",
    aspectRatio: "1612 / 975",
  },
  {
    Icon: ListChecks,
    tag: "Curated watchlist",
    title: "Target List",
    description:
      "Your curated watchlist of perfect-fit companies, monitored continuously so you never miss the moment they move.",
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
      <div className="grid gap-x-10 gap-y-14 md:grid-cols-2">
        {VIEWS.map((view, i) => (
          <motion.article
            key={view.title}
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: REVEAL_DURATION, ease: REVEAL_EASE, delay: (i % 2) * 0.08 }
            }
          >
            <div
              className="relative w-full overflow-hidden rounded-3xl border border-hairline shadow-soft"
              style={{ aspectRatio: view.aspectRatio }}
            >
              <Image
                src={view.image}
                alt={view.alt}
                fill
                /* These are dense table screenshots in a ~560px column, so the
                   hint deliberately overstates the display width — it makes the
                   browser pull a near-native-resolution file and keeps the row
                   text legible instead of soft on both 1x and 2x screens. */
                sizes="(max-width: 768px) 100vw, 1200px"
                quality={95}
                className="object-contain"
              />
            </div>

            <div className="mt-6 flex items-center gap-3">
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${view.tone}`}
              >
                <view.Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </span>
              <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-ink">
                {view.title}
              </h3>
              <Badge variant="outline" size="sm" className="ml-auto shrink-0">
                {view.tag}
              </Badge>
            </div>

            <p className="mt-3 text-[15px] leading-relaxed text-body">
              {view.description}
            </p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
