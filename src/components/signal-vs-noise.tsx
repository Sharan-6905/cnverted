import { ArrowRight } from "lucide-react";
import { Section } from "@/components/section";
import { SignalCard } from "@/components/signal-card";
import type { Signal } from "@/lib/types";

interface SignalVsNoiseProps {
  /** the one account worth acting on */
  signal: Signal;
  /** generic static leads to contrast against */
  noise?: string[];
}

const DEFAULT_NOISE = [
  "Acme Corp — Director of Ops",
  "Globex — VP Marketing",
  "Initech — IT Manager",
  "Umbrella — Procurement Lead",
  "Hooli — Growth Associate",
  "Soylent — Head of People",
  "Vehement — Sales Manager",
];

export function SignalVsNoise({ signal, noise = DEFAULT_NOISE }: SignalVsNoiseProps) {
  return (
    <Section
      id="why"
      eyebrow="Signal, not noise"
      title={
        <>
          A database gives you names. We give you{" "}
          <span className="text-accent">timing</span>.
        </>
      }
      description="Static lead lists are a wall of contacts with no reason to reach out. Cnvrted surfaces the one account that just entered the market — with the context to open the conversation."
    >
      <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
        {/* Noise */}
        <div className="rounded-2xl border border-hairline bg-surface-soft p-5">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-muted">
            Traditional lead list
          </p>
          <ul className="space-y-2">
            {noise.map((row, i) => (
              <li
                key={row}
                className="flex items-center gap-3 rounded-lg bg-canvas px-3.5 py-2.5 text-sm text-muted"
                style={{ opacity: 1 - i * 0.1 }}
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-hairline" />
                <span className="truncate">{row}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Arrow */}
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-canvas text-brand-teal shadow-soft lg:rotate-0">
          <ArrowRight className="h-4 w-4" />
        </div>

        {/* Signal */}
        <div className="relative">
          <div className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-brand-teal">
            The signal worth calling
          </div>
          <SignalCard signal={signal} highlighted />
        </div>
      </div>
    </Section>
  );
}
