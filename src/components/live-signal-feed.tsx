"use client";

import { useMemo, useState } from "react";
import { Section } from "@/components/section";
import { SignalCard } from "@/components/signal-card";
import { cn } from "@/lib/utils";
import { CATEGORY_META } from "@/lib/signal-meta";
import type { Signal, SignalCategory } from "@/lib/types";

interface LiveSignalFeedProps {
  signals: Signal[];
  onSelectSignal?: (signal: Signal) => void;
}

type Filter = "all" | SignalCategory;

export function LiveSignalFeed({ signals, onSelectSignal }: LiveSignalFeedProps) {
  const [filter, setFilter] = useState<Filter>("all");

  // only offer tabs for categories that actually appear
  const categories = useMemo(() => {
    const present = new Set(signals.map((s) => s.category));
    return (Object.keys(CATEGORY_META) as SignalCategory[]).filter((c) =>
      present.has(c)
    );
  }, [signals]);

  const visible =
    filter === "all" ? signals : signals.filter((s) => s.category === filter);

  return (
    <Section
      id="signals"
      eyebrow="Live feed"
      title="Real signals, as they fire."
      description="A sample of what the intent stream looks like — each card is a scored account with the source and the why-now."
    >
      {/* Filter tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        <FilterTab active={filter === "all"} onClick={() => setFilter("all")}>
          All
        </FilterTab>
        {categories.map((c) => (
          <FilterTab
            key={c}
            active={filter === c}
            onClick={() => setFilter(c)}
          >
            {CATEGORY_META[c].label}
          </FilterTab>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((s) => (
          <SignalCard key={s.id} signal={s} onSelect={onSelectSignal} />
        ))}
      </div>
    </Section>
  );
}

function FilterTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full px-3.5 py-1.5 text-sm smooth-transition transition-colors",
        active
          ? "bg-ink text-canvas"
          : "border border-hairline bg-canvas text-muted hover:text-ink"
      )}
    >
      {children}
    </button>
  );
}
