"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { Section } from "@/components/section";
import { REVEAL_DURATION, REVEAL_EASE } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";

/**
 * The account → person → message stretch of the story, told with the two
 * product screenshots. It reads left to right on desktop: the target list
 * holds the dominant column, and the contact it selects (Katelyn at Anthropic)
 * carries across the connector into the email drafted for her.
 */

/**
 * Steps drive their own connector and badge through variants rather than
 * letting those observe the viewport themselves: a hairline scaled to zero has
 * no area, so an intersection threshold on it would never be met.
 */
const STEP_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface StepProps {
  number: string;
  title: string;
  line: string;
  delay?: number;
  className?: string;
  children: ReactNode;
}

function Step({ number, title, line, delay = 0, className, children }: StepProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={STEP_VARIANTS}
      initial={reduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: REVEAL_DURATION, ease: REVEAL_EASE, delay }
      }
    >
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hairline bg-canvas font-mono text-xs font-semibold text-ink">
          {number}
        </span>
        <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-ink">
          {title}
        </h3>
      </div>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-body">{line}</p>

      <div className="mt-6">{children}</div>
    </motion.div>
  );
}

/** Hairline that draws itself once the step it belongs to enters view. */
function Connector({
  className,
  axis,
  delay = 0,
}: {
  className: string;
  axis: "x" | "y";
  delay?: number;
}) {
  return (
    <motion.span
      className={`absolute bg-hairline ${axis === "x" ? "origin-left" : "origin-top"} ${className}`}
      aria-hidden="true"
      variants={{
        hidden: axis === "x" ? { scaleX: 0 } : { scaleY: 0 },
        visible: { scaleX: 1, scaleY: 1 },
      }}
      transition={{ duration: 0.5, ease: REVEAL_EASE, delay }}
    />
  );
}

/** Echoes the row the target list selected, so the email below has a subject. */
function SelectedContact() {
  return (
    <div className="relative">
      {/* runs back across the gutter to the target list on desktop */}
      <Connector
        className="left-[-3rem] top-1/2 hidden h-px w-12 lg:block"
        axis="x"
        delay={0.2}
      />
      <div className="flex w-full max-w-md flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl border border-hairline bg-canvas p-4 shadow-soft">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-soft font-semibold text-ink">
          K
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-ink">Katelyn</p>
          <p className="text-xs text-muted">Head of Engineering · Anthropic</p>
        </div>
        <motion.span
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          transition={{ duration: 0.4, ease: REVEAL_EASE, delay: 0.35 }}
        >
          <Badge variant="high" size="sm">
            <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2} />
            Verified
          </Badge>
        </motion.span>
        <p className="w-full font-mono text-xs text-body">katelyn@anthropic.com</p>
      </div>
    </div>
  );
}

export function SignalToOutreach() {
  return (
    <Section
      centered
      eyebrow="From signal to outreach"
      title={
        <>
          Know who to reach.{" "}
          <span className="text-accent">Know why now</span>.
        </>
      }
      description="CNVRTED turns real-time buying signals into qualified accounts, identifies the people behind them, and gives your team the context to start the conversation."
    >
      <div className="grid items-start gap-12 lg:grid-cols-[1.55fr_1fr]">
        <Step
          number="01"
          title="Find the account"
          line="See which accounts match your ICP — and why."
        >
          <div
            className="relative w-full overflow-hidden rounded-3xl shadow-float"
            style={{ aspectRatio: "1536 / 1024" }}
          >
            <Image
              src="/banners/target-list.png"
              alt="The CNVRTED target list: 96 accounts with the company, website, why it matches the ICP, the contact, their designation, a verified work email, and Generate and Save actions on every row."
              fill
              sizes="(max-width: 1024px) 100vw, 700px"
              quality={95}
              className="object-contain"
            />
          </div>
        </Step>

        <div className="flex flex-col gap-10">
          <Step
            number="02"
            title="Find the right person"
            line="Identify the decision-maker with verified contact information."
            delay={0.05}
            className="relative"
          >
            {/* mobile keeps the progression vertical, since the columns stack */}
            <Connector
              className="-top-10 left-[18px] h-10 w-px lg:hidden"
              axis="y"
              delay={0.1}
            />
            <SelectedContact />
          </Step>

          <Step
            number="03"
            title="Reach out with context"
            line="Turn the signal into an outreach message grounded in what is actually happening at the account."
            delay={0.1}
            className="relative"
          >
            <Connector className="-top-10 left-[18px] h-10 w-px" axis="y" delay={0.1} />
            <div
              className="relative w-full overflow-hidden rounded-3xl shadow-soft"
              style={{ aspectRatio: "1672 / 941" }}
            >
              <Image
                src="/banners/outreach-email.png"
                alt="The outreach email CNVRTED generated for Katelyn, opening with Anthropic's funding round and tying that moment to the product before asking for a short call."
                fill
                sizes="(max-width: 1024px) 100vw, 440px"
                quality={95}
                className="object-contain"
              />
            </div>
          </Step>
        </div>
      </div>
    </Section>
  );
}
