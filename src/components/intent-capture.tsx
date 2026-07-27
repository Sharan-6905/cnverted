"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Logo } from "@/components/logo";

const DOT_TRANSITION = (delay: number) => ({
  duration: 0.9,
  repeat: Infinity,
  ease: "easeInOut" as const,
  delay,
});

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function IntentCapture() {
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message) return;
    console.log("[orka] submit:", message);
  }

  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-32">
      <motion.div
        className="absolute inset-0"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/story/story-06.png"
          alt=""
          fill
          className="object-cover"
          aria-hidden="true"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/85 via-blue-900/75 to-blue-950/90" />

      <div className="relative mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
            <Logo className="h-4 w-4" />
            Meet Orka
          </span>

          <h2 className="mt-6 font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
            Orka is our AI agent
            <br />
            <span className="text-blue-200">specialized in GTM, sales, and helping you find leads.</span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md"
        >
          {/* soft glow behind the widget */}
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-brand-teal/30 blur-3xl" />

          {/* Orka mascot peeking in from the top-left corner */}
          <div className="pointer-events-none absolute -left-8 -top-16 z-10 h-32 w-32 -rotate-6 drop-shadow-xl sm:-left-12 sm:-top-20 sm:h-40 sm:w-40">
            <Image src="/cnvrted-logo.png" alt="Orka" fill className="object-contain" />
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-white/40 bg-white shadow-2xl">
            <div className="flex items-center gap-3 border-b border-hairline px-5 py-4">
              <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-soft">
                <Image src="/cnvrted-logo.png" alt="" fill className="object-contain p-1" />
              </span>
              <div>
                <p className="text-[15px] font-semibold text-ink">Orka</p>
                <p className="flex items-center gap-1.5 text-xs text-muted">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-intent-high opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-intent-high" />
                  </span>
                  Online
                </p>
              </div>
            </div>

            <div className="space-y-3 px-5 py-6">
              {/* Orka's greeting */}
              <motion.div {...fadeUp(0.2)} className="flex items-start gap-2.5">
                <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-soft">
                  <Image src="/cnvrted-logo.png" alt="" fill className="object-contain p-1" />
                </span>
                <p className="max-w-[85%] rounded-2xl rounded-tl-sm bg-surface-soft px-4 py-3 text-[15px] leading-relaxed text-ink">
                  Hi, I&apos;m Orka 👋 Tell me what you sell and I&apos;ll find your Ideal Customer
                  Profile.
                </p>
              </motion.div>

              {/* placeholder for the prospect's reply */}
              <motion.div {...fadeUp(1.0)} className="flex justify-end">
                <div className="max-w-[70%] rounded-2xl rounded-tr-sm border border-dashed border-brand-teal/40 bg-brand-teal/5 px-4 py-3 text-[15px] text-muted-soft">
                  You: <span className="italic">what you sell…</span>
                </div>
              </motion.div>

              {/* Orka composing a reply */}
              <motion.div {...fadeUp(1.7)} className="flex items-start gap-2.5">
                <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-soft">
                  <Image src="/cnvrted-logo.png" alt="" fill className="object-contain p-1" />
                </span>
                <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-surface-soft px-4 py-3.5">
                  {[0, 0.15, 0.3].map((delay) => (
                    <motion.span
                      key={delay}
                      className="h-1.5 w-1.5 rounded-full bg-muted-soft"
                      animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                      transition={DOT_TRANSITION(delay)}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-hairline p-3.5"
            >
              <label htmlFor="orka-message" className="sr-only">
                What do you sell?
              </label>
              <input
                id="orka-message"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What do you sell?"
                className="w-full rounded-full border border-hairline bg-surface-soft px-4 py-3 text-sm text-ink placeholder:text-muted-soft focus:outline-none focus:ring-2 focus:ring-brand-teal/25"
              />
              <button
                type="submit"
                aria-label="Send"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-on-dark smooth-transition hover:bg-body-strong"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
