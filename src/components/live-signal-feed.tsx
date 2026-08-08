"use client";

import { Section } from "@/components/section";
import { SignalCard } from "@/components/signal-card";
import type { Signal } from "@/lib/types";

interface LiveSignalFeedProps {
  signals: Signal[];
  onSelectSignal?: (signal: Signal) => void;
}

export function LiveSignalFeed({ signals, onSelectSignal }: LiveSignalFeedProps) {
  return (
    <Section
      id="signals"
      eyebrow="Live feed"
      title={
        <>
          Real signals, <span className="text-accent">as they fire</span>.
        </>
      }
      description="A sample of what the intent stream looks like — each card is a scored account with the source and the why-now."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {signals.map((s) => (
          <SignalCard key={s.id} signal={s} onSelect={onSelectSignal} />
        ))}
      </div>
    </Section>
  );
}
