"use client";

import type { ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StoryIntroProps {
  headline: ReactNode;
  body: ReactNode;
  image?: StaticImageData | string;
  imageAlt?: string;
}

/**
 * A single-question narrative beat: large headline, short supporting
 * copy, generous whitespace. No cards, no icons — just the site's
 * faint grid texture behind the type. With an image, the text sits
 * left and the image sits right on desktop instead of stacking below
 * (stacking below reads as too tall / consumes too much vertical
 * space).
 */
export function StoryIntro({ headline, body, image, imageAlt = "" }: StoryIntroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className={cn(
        "relative px-6",
        image ? "py-16 sm:py-20 lg:py-24" : "py-20 sm:py-32 lg:py-44"
      )}
    >
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <motion.div
        className={cn(
          "relative mx-auto w-[92%] sm:w-[85%]",
          image
            ? "max-w-[1240px] text-center lg:grid lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16 lg:text-left"
            : "max-w-[960px] text-center"
        )}
        initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.8, ease: "easeOut" }}
      >
        <div>
          <h2 className="font-display text-[40px] font-bold leading-[1.06] text-ink sm:text-[56px] lg:text-[52px]">
            {headline}
          </h2>
          <p
            className={cn(
              "mt-10 text-xl font-medium leading-[1.8] text-muted sm:mt-12",
              image ? "max-w-[520px] lg:mx-0" : "mx-auto max-w-[820px]"
            )}
          >
            {body}
          </p>
        </div>

        {image && (
          <div
            className="relative mx-auto mt-16 w-full max-w-[560px] overflow-hidden rounded-3xl shadow-float lg:mx-0 lg:mt-0 lg:max-w-none"
            style={{ aspectRatio: "1456 / 1080" }}
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 1024px) 92vw, 640px"
              className="object-cover"
            />
          </div>
        )}
      </motion.div>
    </section>
  );
}
