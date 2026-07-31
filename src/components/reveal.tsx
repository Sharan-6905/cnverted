"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Shared so section reveals and staggered card reveals stay in step. */
export const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;
export const REVEAL_DURATION = 0.55;

interface RevealProps {
  children: ReactNode;
  /** Seconds to hold after the element enters view — used to stagger siblings. */
  delay?: number;
  className?: string;
}

/**
 * Fades and lifts its children into place the first time they scroll into view.
 * Only opacity and transform animate, so the reveal never reflows the page, and
 * prefers-reduced-motion collapses it to a no-op without changing the markup.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: REVEAL_DURATION, ease: REVEAL_EASE, delay }
      }
    >
      {children}
    </motion.div>
  );
}
