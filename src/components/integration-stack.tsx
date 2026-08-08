"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CornerDownLeft } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    label: "Reply",
    step: "01",
    logo: "/logos/gmail.png",
    title: "A reply lands in Gmail",
    body: "The moment a prospect replies to your outreach, cnvrted reads it — no forwarding, no manual triage.",
    note: "Every reply is caught the second it arrives.",
  },
  {
    label: "Schedule",
    step: "02",
    logo: "/logos/cal-com.png",
    title: "The call books itself",
    body: "Cnvrted routes the reply straight into Cal.com, finds a slot, and gets the meeting on the books — automatically.",
    note: "No back-and-forth. No dropped threads.",
  },
  {
    label: "Meet",
    step: "03",
    logo: "/logos/google-meet.png",
    title: "You just show up on Google Meet",
    body: "A Meet link is generated and shared with the prospect automatically, and the call is logged against the deal — all you do is join and close.",
    note: "This is what a rep's day was always supposed to feel like.",
  },
];

function StepLogo({ step, className }: { step: (typeof STEPS)[number]; className?: string }) {
  return (
    <span className={cn("relative block", className)}>
      <Image src={step.logo} alt={step.label} fill className="object-contain" />
    </span>
  );
}

export function IntegrationStack() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative bg-canvas px-6 py-24 sm:py-32">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto mb-16 max-w-2xl text-center">
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          Automations
        </span>
        <h2 className="font-display text-display-md font-semibold text-ink">
          <span className="text-accent">One reply</span>. Cnvrted takes it from there.
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-body">
          A single email reply turns into a booked, calendared meeting — no one on your team has
          to touch it.
        </p>
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[180px_1fr_260px]">
        {/* Left: sticky step nav */}
        <nav className="hidden lg:sticky lg:top-32 lg:block lg:h-fit">
          <ul className="relative">
            {STEPS.map((s, i) => (
              <li key={s.label} className="relative flex items-start gap-3 pb-10 last:pb-0">
                {i < STEPS.length - 1 && (
                  <span
                    className={cn(
                      "absolute left-[13px] top-7 h-full w-px smooth-transition transition-colors",
                      i < active ? "bg-brand-teal" : "bg-hairline"
                    )}
                  />
                )}
                <span
                  className={cn(
                    "relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-semibold smooth-transition transition-colors",
                    i === active
                      ? "bg-brand-teal text-on-dark"
                      : i < active
                        ? "bg-brand-teal/20 text-brand-teal"
                        : "bg-surface-card text-muted-soft"
                  )}
                >
                  {s.step}
                </span>
                <span
                  className={cn(
                    "mt-0.5 text-sm font-medium smooth-transition transition-colors",
                    i === active ? "text-ink" : "text-muted-soft"
                  )}
                >
                  {s.label}
                </span>
              </li>
            ))}
          </ul>
        </nav>

        {/* Middle: step content */}
        <div className="space-y-16 lg:space-y-32">
          {STEPS.map((s, i) => (
            <StepBlock key={s.label} step={s} onActive={() => setActive(i)} />
          ))}
        </div>

        {/* Right: sticky crossfading logo */}
        <div className="hidden lg:sticky lg:top-32 lg:block lg:h-fit">
          <div className="relative flex h-72 w-72 items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={STEPS[active].label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <StepLogo step={STEPS[active]} className="h-44 w-44" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepBlock({
  step,
  onActive,
}: {
  step: (typeof STEPS)[number];
  onActive: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Drives the desktop sidebar/logo highlighting — needs to fire continuously
  // as the user scrolls past each step.
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  // Drives the fade-in itself — a one-time reveal so content never sits
  // dimmed while just scrolled past on short/mobile viewports.
  const revealed = useInView(ref, { margin: "-15% 0px -15% 0px", once: true });

  useEffect(() => {
    if (inView) onActive();
  }, [inView, onActive]);

  return (
    <div ref={ref}>
      <motion.div
        initial={false}
        animate={{ opacity: revealed ? 1 : 0.4, y: revealed ? 0 : 12 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-3 flex items-center gap-2 lg:hidden">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-teal px-2.5 py-1 text-[11px] font-semibold text-on-dark">
            Step {step.step.replace(/^0/, "")} of 3
          </span>
        </div>

        <span className="hidden items-center gap-1.5 rounded-full bg-surface-card px-3 py-1 text-xs font-semibold text-ink lg:inline-flex">
          <CornerDownLeft className="h-3.5 w-3.5" />
          {step.step}
        </span>

        <h3 className="mt-5 font-display text-2xl font-semibold text-ink sm:text-3xl lg:text-4xl">
          {step.title}
        </h3>

        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-body">{step.body}</p>

        <div className="mt-6 max-w-md border-t border-hairline pt-6">
          <p className="text-[15px] leading-relaxed text-muted">{step.note}</p>
        </div>

        <motion.div
          initial={false}
          animate={{ opacity: revealed ? 1 : 0.4, scale: revealed ? 1 : 0.85 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 flex h-24 w-52 items-center justify-center lg:hidden"
        >
          <StepLogo step={step} className="h-20 w-20" />
        </motion.div>
      </motion.div>
    </div>
  );
}
