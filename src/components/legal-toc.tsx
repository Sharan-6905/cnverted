"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Item = { id: string; label: string };

/**
 * Sticky contents rail for the legal pages, filling the column the prose leaves
 * empty on wide screens. It reads the clause headings out of the DOM rather than
 * taking a list of titles, so renaming a clause can't leave the rail stale.
 */
export function LegalToc() {
  const [items, setItems] = useState<Item[]>([]);
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main section[id^='s']")
    );

    setItems(
      sections.map((section) => ({
        id: section.id,
        // the heading carries its number in a leading span — drop it, the rail numbers itself
        label: (section.querySelector("h2")?.textContent ?? section.id)
          .replace(/^\s*\d+\s*/, "")
          .trim(),
      }))
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (top) setActive(top.target.id);
      },
      // only count a clause as current once it reaches the upper third of the viewport
      { rootMargin: "-96px 0px -68% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="On this page"
      className="sticky top-24 hidden self-start lg:block"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-soft">
        On this page
      </p>
      <ol className="space-y-1.5 border-l border-hairline">
        {items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "-ml-px flex gap-2 border-l py-0.5 pl-3 text-[13px] leading-snug smooth-transition transition-colors",
                active === item.id
                  ? "border-[#4FA8F5] text-ink"
                  : "border-transparent text-muted hover:border-muted-soft hover:text-ink"
              )}
            >
              <span className="font-mono text-[11px] text-muted-soft">{i + 1}</span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
