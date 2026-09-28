"use client";

import { useEffect, useState } from "react";

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
    <details className="legal-toc" open>
      <summary><h2>On this page</h2></summary>
      <nav aria-label="On this page">
      <ol>
        {items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
            >
              <span>{i + 1}</span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
      </nav>
    </details>
  );
}
