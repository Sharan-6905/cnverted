"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import Image from "next/image";
import { Logo } from "@/components/logo";

export function IntentCapture() {
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message) return;
    console.log("[orka] submit:", message);
  }

  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-32">
      <Image
        src="/story/story-06.png"
        alt=""
        fill
        className="object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/85 via-blue-900/75 to-blue-950/90" />

      <div className="relative mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
            <Logo className="h-4 w-4" />
            Meet Orka
          </span>

          <h2 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            Orka is our AI agent
            <br />
            <span className="text-blue-200">specialized in GTM, sales, and helping you find leads.</span>
          </h2>
        </div>

        <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl">
          <div className="flex items-center gap-2.5 border-b border-hairline px-4 py-3.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-soft">
              <Logo className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">Orka</p>
              <p className="flex items-center gap-1.5 text-xs text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-intent-high" />
                Online
              </p>
            </div>
          </div>

          <div className="space-y-3 px-4 py-5">
            <div className="flex items-start gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-soft">
                <Logo className="h-3 w-3" />
              </span>
              <p className="max-w-[85%] rounded-2xl rounded-tl-sm bg-surface-soft px-3.5 py-2.5 text-sm leading-relaxed text-ink">
                Hi, I&apos;m Orka 👋 Tell me what you sell and I&apos;ll find your Ideal Customer
                Profile.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-hairline p-3">
            <label htmlFor="orka-message" className="sr-only">
              What do you sell?
            </label>
            <input
              id="orka-message"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What do you sell?"
              className="w-full rounded-full border border-hairline bg-surface-soft px-4 py-2.5 text-sm text-ink placeholder:text-muted-soft focus:outline-none focus:ring-2 focus:ring-brand-teal/25"
            />
            <button
              type="submit"
              aria-label="Send"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-on-dark smooth-transition hover:bg-body-strong"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
