"use client";

import type { ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, useReducedMotion } from "framer-motion";

interface StoryIntroProps {
  headline: ReactNode;
  body: ReactNode;
  image?: StaticImageData | string;
  imageAlt?: string;
}

/**
 * A single-question narrative beat: large centered headline, short
 * supporting copy, generous whitespace. No cards, no icons — just the
 * site's faint grid texture behind the type.
 */
export function StoryIntro({ headline, body, image, imageAlt = "" }: StoryIntroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative px-6 py-20 sm:py-32 lg:py-44">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <motion.div
        className="relative mx-auto w-[92%] max-w-[960px] text-center sm:w-[85%]"
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

        {image && (
          <div
            className="relative mx-auto mt-16 w-full max-w-[880px] overflow-hidden rounded-3xl shadow-float"
            style={{ aspectRatio: "1456 / 1080" }}
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 900px) 92vw, 880px"
              className="object-cover"
            />
          </div>
        )}
      </motion.div>
    </section>
  );
}
