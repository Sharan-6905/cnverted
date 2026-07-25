"use client";

import { useState } from "react";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export function IntentCapture() {
  const [sells, setSells] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("[okra] submit:", { sells, email });
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

      <div className="relative mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
          <Sparkles className="h-4 w-4" />
          Meet Okra
        </span>

        <h2 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
          Okra finds your Ideal Customer Profile.
          <br />
          <span className="text-blue-200">So your team stops guessing who to sell to.</span>
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 max-w-xl rounded-2xl bg-white p-2.5 text-left shadow-2xl"
        >
          <div className="flex items-center gap-2.5 px-3 py-2.5">
            <Logo className="h-5 w-5 shrink-0" />
            <input
              type="text"
              value={sells}
              onChange={(e) => setSells(e.target.value)}
              placeholder="What do you sell? E.g., B2B software, Consulting services"
              className="w-full bg-transparent text-sm text-ink placeholder:text-muted-soft focus:outline-none"
            />
          </div>

          <div className="mt-1 flex flex-col gap-2 border-t border-hairline pt-2.5 sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-2.5 rounded-xl border border-hairline px-3 py-2.5">
              <Mail className="h-4 w-4 shrink-0 text-muted-soft" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full bg-transparent text-sm text-ink placeholder:text-muted-soft focus:outline-none"
              />
            </div>
            <Button type="submit" variant="secondary" size="md" className="shrink-0 rounded-xl bg-surface-soft">
              Find My ICP
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
