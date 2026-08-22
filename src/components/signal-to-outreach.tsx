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
 * product screenshots. Step 02 is markup rather than an image on purpose: it
 * carries the row the table selected (Katelyn at Anthropic) into the email
 * screenshot below, so the three steps read as one workflow.
 */

interface StepProps {
  number: string;
  title: string;
  line: string;
  /** draws the rail down into the next step */
  connect?: boolean;
  delay?: number;
  children: ReactNode;
}

function Step({ number, title, line, connect, delay = 0, children }: StepProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.li
      className="relative sm:pl-16"
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: REVEAL_DURATION, ease: REVEAL_EASE, delay }
      }
    >
      {connect && (
        <motion.span
          className="absolute -bottom-14 left-[18px] top-12 hidden w-px origin-top bg-hairline sm:block"
          aria-hidden="true"
          initial={reduceMotion ? { scaleY: 1 } : { scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.5, ease: REVEAL_EASE, delay: delay + 0.15 }
          }
        />
      )}

      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hairline bg-canvas font-mono text-xs font-semibold text-ink sm:absolute sm:left-0 sm:top-0">
          {number}
        </span>
        <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-ink">
          {title}
        </h3>
      </div>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-body">{line}</p>

      <div className="mt-6">{children}</div>
    </motion.li>
  );
}

/** Echoes the row the target list selected, so the email below has a subject. */
function SelectedContact() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex w-full max-w-md flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl border border-hairline bg-canvas p-4 shadow-soft">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-soft font-semibold text-ink">
        K
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-ink">Katelyn</p>
        <p className="text-xs text-muted">Head of Engineering · Anthropic</p>
      </div>
      <motion.span
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.4, ease: REVEAL_EASE, delay: 0.35 }}
      >
        <Badge variant="high" size="sm">
          <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2} />
          Verified
        </Badge>
      </motion.span>
      <p className="w-full font-mono text-xs text-body">katelyn@anthropic.com</p>
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
      <ol className="space-y-14">
        <Step
          number="01"
          title="Find the account"
          line="See which accounts match your ICP — and why."
          connect
        >
          <div
            className="relative w-full overflow-hidden rounded-3xl shadow-float"
            style={{ aspectRatio: "1536 / 1024" }}
          >
            <Image
              src="/banners/target-list.png"
              alt="The CNVRTED target list: 96 accounts with the company, website, why it matches the ICP, the contact, their designation, a verified work email, and Generate and Save actions on every row."
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1152px) 92vw, 1088px"
              quality={95}
              priority={false}
              className="object-contain"
            />
          </div>
        </Step>

        <Step
          number="02"
          title="Find the right person"
          line="Identify the decision-maker with verified contact information."
          connect
          delay={0.05}
        >
          <SelectedContact />
        </Step>

        <Step
          number="03"
          title="Reach out with context"
          line="Turn the signal into an outreach message grounded in what is actually happening at the account."
          delay={0.05}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl shadow-soft lg:ml-auto"
            style={{ aspectRatio: "1672 / 941" }}
          >
            <Image
              src="/banners/outreach-email.png"
              alt="The outreach email CNVRTED generated for Katelyn, opening with Anthropic's funding round and tying that moment to the product before asking for a short call."
              fill
              sizes="(max-width: 640px) 100vw, 768px"
              quality={95}
              className="object-contain"
            />
          </div>
        </Step>
      </ol>
    </Section>
  );
}
