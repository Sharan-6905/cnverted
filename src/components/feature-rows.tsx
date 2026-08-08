"use client";

import Image, { type StaticImageData } from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/section";
import { REVEAL_DURATION, REVEAL_EASE } from "@/components/reveal";
import { cn } from "@/lib/utils";
import featureBuyer from "../../public/feature-buyer.png";
import stepScan from "../../public/step-scan.png";
import stepDeliver from "../../public/step-deliver.png";
import featureDashboard from "../../public/feature-dashboard.png";
import featureAnalytics from "../../public/feature-analytics.png";

type Feature = {
  n: string;
  title: string;
  body: string;
  img: StaticImageData;
  cardBg: string;
};

const FEATURES: Feature[] = [
  {
    n: "01",
    title: "High-intent leads, ready to buy now",
    body: "Real people actively in-market today — not a stale contact list. We catch buyers the moment they start looking, so you reach them before your competitors do.",
    img: featureBuyer,
    cardBg: "bg-brand-peach/15",
  },
  {
    n: "02",
    title: "The whole internet, scraped in real time",
    body: "We scan LinkedIn, Reddit, X, and beyond for live signals — and every lead comes with the receipt: the exact post that proves they're ready. Not a blackbox score.",
    img: stepScan,
    cardBg: "bg-brand-teal/10",
  },
  {
    n: "03",
    title: "Automated outreach that runs itself",
    body: "From signal to sent. Cnvrted drafts and fires personalized outreach that references why the buyer is in-market, so every message lands warm. Set it once.",
    img: stepDeliver,
    cardBg: "bg-brand-lavender/20",
  },
  {
    n: "04",
    title: "Every lead tracked in one dashboard",
    body: "Your entire pipeline, live — from first signal to closed deal. No manual entry, no spreadsheet graveyard. See what's moving, what's stalling, and what to do next.",
    img: featureDashboard,
    cardBg: "bg-brand-ochre/15",
  },
  {
    n: "05",
    title: "Know what actually converts",
    body: "Cnvrted closes the loop — connecting the signal that sourced a deal to the revenue it becomes. See which signals turn into money, and double down on what works.",
    img: featureAnalytics,
    cardBg: "bg-brand-mint/20",
  },
];

export function FeatureRows() {
  const reduceMotion = useReducedMotion();

  return (
    <Section
      id="product"
      eyebrow="The complete sales dashboard"
      title={
        <>
          Find <span className="text-accent">who&apos;s ready</span>, know
          why, and close them.
        </>
      }
      description="One place for the whole motion — from the first buying signal on the open web to the revenue it becomes."
    >
      <div className="grid gap-4 lg:grid-cols-6">
        {FEATURES.map((f, i) => {
          const wide = i >= 3; // last two cards span wider and go horizontal
          return (
            <motion.article
              key={f.n}
              className={cn(
                "rounded-3xl border border-hairline p-6 md:p-7",
                f.cardBg,
                wide ? "lg:col-span-3" : "lg:col-span-2",
                wide && "sm:flex sm:items-center sm:gap-6"
              )}
              initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      duration: REVEAL_DURATION,
                      ease: REVEAL_EASE,
                      // cascade left-to-right within each grid row
                      delay: (i % 3) * 0.08,
                    }
              }
            >
              <div
                className={cn(
                  "flex items-center justify-center",
                  wide
                    ? "mb-4 h-28 shrink-0 sm:mb-0 sm:h-32 sm:w-32"
                    : "mb-5 h-32 md:h-36"
                )}
              >
                <Image
                  src={f.img}
                  alt={f.title}
                  className="h-full w-auto object-contain drop-shadow-lg"
                />
              </div>
              <div>
                <span className="font-mono text-xs font-medium text-brand-teal">
                  {f.n}
                </span>
                <h3 className="mt-1 font-display text-lg font-semibold leading-snug tracking-tight text-ink">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{f.body}</p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}
