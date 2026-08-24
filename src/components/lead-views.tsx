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
    alt: "The Company Leads tab: 21 leads scored 99 down to 70, each row showing the company, score, the trigger that fired — an $18M Series B, a product launch, a US expansion, hiring AI engineers — and the reasoning behind it.",
    aspectRatio: "1691 / 930",
  },
  {
    Icon: Flame,
    tag: "Stated intent",
    title: "Intent Leads",
    description:
      "Buyers who are asking for this right now, in their own words.",
    tone: "border-brand-coral/30 bg-brand-coral/10 text-brand-coral",
    image: "/banners/lead-intent.png",
    alt: "The Intent Leads tab: 25 leads, each with the buyer's own words about what they are building or hiring for — an AI copilot for construction, a founding engineer for a pair programmer, a telemedicine CTO — beside their LinkedIn contact.",
    aspectRatio: "1701 / 925",
  },
  {
    Icon: Snowflake,
    tag: "On-demand volume",
    title: "Cold Leads",
    description:
      "On-demand volume: every contact that matches your ICP, ready when you need scale.",
    tone: "border-brand-lavender/40 bg-brand-lavender/15 text-[#6B5FA8]",
    image: "/banners/lead-cold.png",
    alt: "The Cold Leads tab: 100 leads matching the ICP, each with a named contact and title such as Chief Human Resources Officer, and industry, founded, revenue and detail columns waiting on a Find Details lookup.",
    aspectRatio: "1699 / 926",
  },
  {
    Icon: ListChecks,
    tag: "Curated watchlist",
    title: "Target List",
    description:
      "Your curated watchlist of perfect-fit companies, monitored continuously so you never miss the moment they move.",
    tone: "border-intent-high/30 bg-intent-high-bg text-intent-high",
    image: "/banners/lead-target.png",
    alt: "The Target List tab: 90 accounts with the company, website, a precision-match reason for the ICP fit, the contact, their designation, a verified work email, and Generate and Save actions on every row.",
    aspectRatio: "1690 / 931",
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
