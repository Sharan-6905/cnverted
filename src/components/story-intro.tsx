"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface StoryIntroProps {
  headline: ReactNode;
  body: ReactNode;
}

/**
 * A single-question narrative beat: large centered headline, short
 * supporting copy, generous whitespace. No cards, no icons, no
 * background texture — typography and space carry the section.
 */
export function StoryIntro({ headline, body }: StoryIntroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="px-6 py-20 sm:py-32 lg:py-44">
      <motion.div
        className="mx-auto w-[92%] max-w-[960px] text-center sm:w-[85%]"
        initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="font-display text-[40px] font-bold leading-[0.98] tracking-tight text-ink sm:text-[56px] lg:text-[68px]">
          {headline}
        </h2>
        <p className="mx-auto mt-10 max-w-[820px] text-xl font-medium leading-[1.8] text-muted sm:mt-12">
          {body}
        </p>
      </motion.div>
    </section>
  );
}
