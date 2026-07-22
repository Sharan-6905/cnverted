"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { SignalCard } from "@/components/signal-card";
import type { Signal } from "@/lib/types";
import clayCard from "../../public/clay-card.png";
import clayPing from "../../public/clay-ping.png";

/**
 * Scroll-driven clay scene: a full, edge-to-edge looping claymation video with
 * floating transparent-cutout clay accents that parallax as the hero scrolls.
 * Falls back to static poster + no parallax when reduced-motion is set.
 */
export function HeroScene({ signal }: { signal: Signal }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Hooks run unconditionally; reduced-motion is applied when binding styles.
  const stageY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const cardY = useTransform(scrollYProgress, [0, 1], [30, -140]);
  const cardRot = useTransform(scrollYProgress, [0, 1], [-8, 6]);
  const pingY = useTransform(scrollYProgress, [0, 1], [-10, 120]);
  const pingScale = useTransform(scrollYProgress, [0, 1], [0.9, 1.25]);
  const signalY = useTransform(scrollYProgress, [0, 1], [20, -60]);

  const stageStyle = reduce ? {} : { y: stageY };
  const cardStyle = reduce ? {} : { y: cardY, rotate: cardRot };
  const pingStyle = reduce ? {} : { y: pingY, scale: pingScale };
  const signalStyle = reduce ? {} : { y: signalY };

  // gentle continuous float layered on top of the scroll parallax
  const float = reduce
    ? undefined
    : { y: [0, -10, 0], transition: { duration: 6, repeat: Infinity, ease: "easeInOut" } };
  const floatSlow = reduce
    ? undefined
    : { y: [0, 12, 0], transition: { duration: 7, repeat: Infinity, ease: "easeInOut" } };

  return (
    <div ref={ref} className="relative">
      {/* Full, covering clay video */}
      <motion.div
        style={stageStyle}
        className="relative aspect-square w-full overflow-hidden rounded-[32px] bg-surface-soft shadow-soft"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-clay.png"
          className="absolute inset-0 h-full w-full scale-[1.06] object-cover"
        >
          <source src="/hero-clay.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Floating clay chart card — parallax up + idle float */}
      <motion.div
        style={cardStyle}
        aria-hidden
        className="pointer-events-none absolute -top-6 -right-4 hidden h-32 w-32 sm:block md:h-36 md:w-36"
      >
        <motion.div animate={float}>
          <Image
            src={clayCard}
            alt=""
            className="h-full w-full object-contain drop-shadow-md"
          />
        </motion.div>
      </motion.div>

      {/* Floating clay signal ping — parallax down + idle float */}
      <motion.div
        style={pingStyle}
        aria-hidden
        className="pointer-events-none absolute -bottom-6 -right-2 hidden h-28 w-28 sm:block"
      >
        <motion.div animate={floatSlow}>
          <Image
            src={clayPing}
            alt=""
            className="h-full w-full object-contain drop-shadow-md"
          />
        </motion.div>
      </motion.div>

      {/* Live signal credibility card — gentle parallax */}
      <motion.div
        style={signalStyle}
        className="absolute -bottom-4 -left-2 w-[280px] max-w-[80%] sm:-left-6"
      >
        <SignalCard signal={signal} highlighted />
      </motion.div>
    </div>
  );
}
