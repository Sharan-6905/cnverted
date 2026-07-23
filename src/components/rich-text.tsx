import * as React from "react";
import Link from "next/link";

// Minimal inline renderer for the blog: **bold**, *italic*, and [text](url).
// Kept intentionally small — enough for editorial copy, not a full markdown parser.
export function RichText({ text }: { text: string }) {
  return <>{parseInline(text)}</>;
}

const TOKEN = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;

function parseInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let key = 0;

  for (const match of text.matchAll(TOKEN)) {
    const token = match[0];
    const start = match.index ?? 0;
    if (start > last) nodes.push(text.slice(last, start));

    if (token.startsWith("**")) {
      nodes.push(
        <strong key={key++} className="font-semibold text-ink">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith("*")) {
      nodes.push(
        <em key={key++} className="italic">
          {token.slice(1, -1)}
        </em>
      );
    } else {
      const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token);
      if (linkMatch) {
        const [, label, href] = linkMatch;
        const external = /^https?:\/\//.test(href);
        nodes.push(
          <Link
            key={key++}
            href={href}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="font-medium text-ink underline decoration-brand-peach decoration-2 underline-offset-4 transition-colors hover:text-brand-teal"
          >
            {label}
          </Link>
        );
      }
    }
    last = start + token.length;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}
