"use client";
// Homepage "understand my business" widget — see HANDOFF.md at the repo root for the full
// API contract, rate limits, and a wiring note. Self-contained (no dependency on the rest of
// this repo's components), so it's safe to move/restyle freely — the fetch call is the only
// part that needs to stay as-is.

import { useState } from "react";

const API_BASE = "https://api.cnvrted.com";

export default function UnderstandWidget() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [understanding, setUnderstanding] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
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
    <div className="w-full max-w-md">
      <div className="flex gap-2">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="https://yourcompany.com"
          disabled={loading}
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-gray-500"
        />
        <button
          onClick={submit}
          disabled={loading || !url.trim()}
          className="rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
        >
          {loading ? "Reading..." : "See what we understand"}
        </button>
      </div>

      {error && <p className="mt-2.5 text-sm text-red-600">{error}</p>}

      {understanding && (
        <div className="mt-4 rounded-xl bg-blue-50 p-4 text-sm leading-relaxed text-gray-800">
          {understanding}
        </div>
      )}
    </div>
  );
}
