import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

interface StoryIntroProps {
  headline: ReactNode;
  body: ReactNode;
}

/**
 * A single-question narrative beat: large centered headline, 2–3 lines of
 * supporting copy, generous whitespace. No cards, no icons — used between the
 * homepage's visual/product sections so each scroll explains one concept.
 */
export function StoryIntro({ headline, body }: StoryIntroProps) {
  return (
    <section className="px-6 py-20 sm:py-28">
      <Reveal className="mx-auto max-w-6xl text-center">
        <h2 className="mx-auto max-w-3xl font-display text-display-lg font-semibold tracking-tight text-ink">
          {headline}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-body">{body}</p>
      </Reveal>
    </section>
  );
}
