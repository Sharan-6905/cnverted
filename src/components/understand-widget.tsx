"use client";

// Homepage "understand my business" widget — see HANDOFF.md at the repo root for the full
// API contract and rate limits. Styling is ours; the fetch call is the part that has to
// stay as-is.
//
// Sits inside the hero, under the Product Hunt badge, so it stays compact: the hero already
// carries the display headline, and this only needs a label above the field.

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const API_BASE = "https://api.cnvrted.com";

export function UnderstandWidget() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [understanding, setUnderstanding] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const website_url = url.trim();
    if (!website_url || loading) return;
    setLoading(true);
    setError(null);
    setUnderstanding(null);
    try {
      const res = await fetch(`${API_BASE}/public/understand-website`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ website_url }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 429) {
          throw new Error("Too many tries — give it a few minutes and try again.");
        }
        throw new Error(data?.detail || "Couldn't read that site — try a different URL.");
      }
      setUnderstanding(data.understanding);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div id="understand" className="mt-8 max-w-xl">
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
        Try it on your site
      </span>

      <p className="mt-2 max-w-md text-sm leading-relaxed text-body">
        Paste your URL, we&rsquo;ll find your ICP.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://yourcompany.com"
          aria-label="Your website URL"
          autoComplete="url"
          disabled={loading}
          // Blue glow bleeding outside the border, in the accent blue the h1
          // gradient ends on. It sits at rest and brightens on focus, so the
          // field reads as the thing to use without waiting for a click.
          className="h-12 border-[#4FA8F5]/45 shadow-[0_0_18px_rgba(79,168,245,0.35)] transition-[border-color,box-shadow] focus:border-[#4FA8F5] focus:shadow-[0_0_26px_rgba(79,168,245,0.6)] focus:ring-[#4FA8F5]/30"
        />
        <Button type="submit" variant="accent" size="lg" disabled={loading || !url.trim()}>
          {loading ? "Reading…" : "See what we understand"}
        </Button>
      </form>

      {error && (
        <p className="mt-2.5 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}

      {understanding ? (
        <div className="mt-4 rounded-2xl border border-hairline bg-surface-soft p-5">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            What we understood
          </span>
          <p className="mt-2 text-[15px] leading-relaxed text-body">{understanding}</p>
        </div>
      ) : (
        <p className="mt-2.5 text-xs text-muted-soft">
          No signup, and nothing is saved — we read one page.
        </p>
      )}
    </div>
  );
}
