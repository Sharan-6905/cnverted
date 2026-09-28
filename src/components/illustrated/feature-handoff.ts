const clamp = (value: number) => Math.min(1, Math.max(0, value));
const ease = (value: number, start = 0, end = 1) => {
  const p = clamp((value - start) / (end - start));
  return p * p * (3 - 2 * p);
};

type HandoffFrame = {
  progress: number;
  pinTop: number;
  mobile: boolean;
  cards: number[];
};

/** Shares the page's RAF, so the handoff never adds another scroll listener. */
export function createFeatureHandoff(root: HTMLElement) {
  const pin = root.querySelector<HTMLElement>(".design-signal-pin");
  const chapter = root.querySelector<HTMLElement>(".design-feature-chapter");
  const grid = chapter?.querySelector<HTMLElement>(".design-feature-grid");
  if (!pin || !chapter || !grid) return null;

  const cards = Array.from(
    grid.querySelectorAll<HTMLElement>(".design-feature-card"),
  );
  let previousFrame = "";

  function measure(
    correction: number,
    viewport: number,
    width: number,
  ): HandoffFrame | null {
    if (!pin?.isConnected || !chapter?.isConnected || !grid?.isConnected)
      return null;
    const chapterTop = chapter.getBoundingClientRect().top + correction;
    const gridTop = grid.getBoundingClientRect().top + correction;
    const mobile = width <= 1023;
    return {
      progress: clamp((viewport - chapterTop) / (viewport * 0.92)),
      // A tall mobile flow scrolls fully into view before its bottom holds.
      pinTop: Math.min(0, viewport - pin.offsetHeight),
      mobile,
      cards: cards.map((card, index) => {
        // offsetTop ignores our transforms; measuring the animated rectangle would
        // feed its own movement back into the scroll progress and cause jitter.
        const entry =
          (viewport - gridTop - card.offsetTop) /
          Math.min(440, viewport * 0.55);
        const delay = !mobile && index === 1 ? 0.08 : 0;
        return ease(entry, delay, 0.9 + delay);
      }),
    };
  }

  function apply(frame: HandoffFrame | null) {
    if (!frame || !pin || !chapter) return;
    const { progress, pinTop, mobile } = frame;
    const signature = [
      progress.toFixed(4),
      pinTop,
      mobile,
      ...frame.cards.map((p) => p.toFixed(4)),
    ].join("|");
    if (signature === previousFrame) return;
    previousFrame = signature;
    const departure = ease(progress, 0.02, 0.96);
    const heading = ease(progress, 0.03, 0.38);

    pin.style.setProperty("--signal-pin-top", `${pinTop}px`);
    pin.dataset.relayCovered = String(progress >= 1);
    pin.style.setProperty("--relay-surface-opacity", `${departure}`);
    pin.style.setProperty(
      "--relay-exit-y",
      `${departure * (mobile ? -20 : -46)}px`,
    );
    pin.style.setProperty(
      "--relay-exit-scale",
      `${1 - departure * (mobile ? 0.02 : 0.05)}`,
    );
    chapter.style.setProperty(
      "--relay-radius",
      `${(1 - ease(progress, 0.58, 1)) * (mobile ? 30 : 64)}px`,
    );
    chapter.style.setProperty(
      "--relay-heading-x",
      `${(1 - heading) * (mobile ? 0 : 28)}px`,
    );
    chapter.style.setProperty(
      "--relay-heading-y",
      `${(1 - heading) * (mobile ? 18 : 30)}px`,
    );
    chapter.style.setProperty(
      "--relay-heading-opacity",
      `${0.5 + heading * 0.5}`,
    );

    cards.forEach((card, index) => {
      const remaining = 1 - frame.cards[index];
      const direction = index === 0 ? -1 : index === 1 ? 1 : 0;
      card.style.setProperty(
        "--relay-card-x",
        `${remaining * direction * (mobile ? 0 : 44)}px`,
      );
      card.style.setProperty(
        "--relay-card-y",
        `${remaining * (mobile ? 32 : 76)}px`,
      );
      card.style.setProperty(
        "--relay-card-rotate",
        `${remaining * direction * (mobile ? 0.6 : 3.5)}deg`,
      );
      card.style.setProperty(
        "--relay-card-tilt",
        `${remaining * (mobile ? 0 : 5)}deg`,
      );
      card.style.setProperty(
        "--relay-card-scale",
        `${1 - remaining * (mobile ? 0.018 : 0.045)}`,
      );
      card.style.setProperty("--relay-card-opacity", `${1 - remaining * 0.35}`);
    });
  }

  function dispose() {
    if (pin) delete pin.dataset.relayCovered;
    const targets = [pin, chapter, ...cards];
    for (const target of targets) {
      if (!target) continue;
      for (const name of Array.from(target.style)) {
        if (name.startsWith("--relay-") || name === "--signal-pin-top")
          target.style.removeProperty(name);
      }
    }
  }

  return { measure, apply, dispose };
}
