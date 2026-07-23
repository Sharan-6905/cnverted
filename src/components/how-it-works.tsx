"use client";

import Image, { type StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { Section } from "@/components/section";
import stepScan from "../../public/step-scan.png";
import stepExtract from "../../public/step-extract.png";
import stepScore from "../../public/step-score.png";
import stepDeliver from "../../public/step-deliver.png";

const STEPS: { img: StaticImageData; step: string; title: string; body: string }[] = [
  {
    img: stepScan,
    step: "01",
    title: "Scan continuously",
    body: "We monitor thousands of sources across the open web and social in real time — around the clock.",
  },
  {
    img: stepExtract,
    step: "02",
    title: "Extract intent",
    body: "NLP pulls the moments that matter: funding, hiring, tech changes, exec moves, and pain signals.",
  },
  {
    img: stepScore,
    step: "03",
    title: "Score & prioritize",
    body: "Every account gets an intent score by urgency, so your team knows exactly who to work first.",
  },
  {
    img: stepDeliver,
    step: "04",
    title: "Deliver context",
    body: "Enriched accounts land in your stack with the why-now context reps need to open the conversation.",
  },
];

export function HowItWorks() {
  return (
    <Section
      id="how"
      centered
      eyebrow="How it works"
      title="From noise to a ready-to-work account in four steps."
    >
      <div className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {/* Connecting line — sits behind the step cards, only visible at the 4-col breakpoint */}
        <div
          aria-hidden
          className="absolute left-0 right-0 top-16 hidden h-px bg-hairline lg:block"
          style={{ marginInline: "12.5%" }}
        />
        {STEPS.map((s, i) => (
          <motion.div
            key={s.step}
            className="relative text-center md:text-left"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative mx-auto h-32 w-32 md:mx-0">
              <Image
                src={s.img}
                alt={s.title}
                className="h-full w-full object-contain mix-blend-multiply"
              />
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 md:justify-start">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-teal/15 font-mono text-xs text-brand-teal">
                {s.step}
              </span>
              <h3 className="text-base font-semibold text-ink">{s.title}</h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
