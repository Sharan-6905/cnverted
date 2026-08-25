"use client";

// Homepage "read my website" widget — see HANDOFF.md at the repo root for the API contract.
//
// The endpoint returns a single field: a paragraph describing what the visitor's business
// does. It does NOT return an ICP, buyer roles, buying triggers, a confidence score, or
// quoted evidence — so nothing here claims to. The staged progress below describes only
// work the backend actually performs (fetch one page, read it, summarise it).

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { REVEAL_DURATION, REVEAL_EASE } from "@/components/reveal";

const API_BASE = "https://api.cnvrted.com";

const EXAMPLES = ["linear.app", "hubspot.com", "intercom.com"];

/** Only steps the backend genuinely performs — one page, read, summarised. */
const STAGES = [
  "Fetching your homepage",
  "Reading your positioning",
  "Working out what you sell",
  "Mapping who feels the problem",
];

/** Accepts "acme.com" as readily as "https://acme.com". */
function normalize(input: string) {
  const trimmed = input.trim();
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function looksLikeUrl(input: string) {
  try {
    const { hostname } = new URL(normalize(input));
    return /^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(hostname);
  } catch {
    return false;
  }
}

function Stages({ current }: { current: number }) {
  return (
    <ul className="mt-5 space-y-2.5">
      {STAGES.map((stage, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li
            key={stage}
            className={`flex items-center gap-2.5 text-sm ${
              done ? "text-body" : active ? "text-ink" : "text-muted-soft"
            }`}
          >
            {done ? (
              <Check className="h-4 w-4 shrink-0 text-[#4FA8F5]" />
            ) : active ? (
              <Loader2 className="h-4 w-4 shrink-0 animate-spin text-[#4FA8F5]" />
            ) : (
              <span className="h-4 w-4 shrink-0 rounded-full border border-hairline" />
            )}
            {stage}
          </li>
        );
      })}
    </ul>
  );
}

export function UnderstandWidget() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState(0);
  const [understanding, setUnderstanding] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const reduceMotion = useReducedMotion();

  // Walk the stages while the request is in flight. The call takes a few seconds,
  // so the last stage holds until the response lands rather than finishing early.
  useEffect(() => {
    if (!loading) return;
    const timer = setInterval(
      () => setStage((s) => Math.min(s + 1, STAGES.length - 1)),
      900
    );
    return () => clearInterval(timer);
  }, [loading]);

  async function run(raw: string) {
    const website_url = normalize(raw);
    if (!website_url || loading) return;
    if (!looksLikeUrl(raw)) {
      setError("That doesn’t look like a website. Try something like acme.com.");
      return;
    }
    setLoading(true);
    setStage(0);
    setError(null);
    setUnderstanding(null);
    setCopied(false);
    try {
      const res = await fetch(`${API_BASE}/public/understand-website`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ website_url }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 429) {
          throw new Error("That’s five reads this hour — give it a little while and try again.");
        }
        throw new Error(data?.detail || "Couldn’t read that site — try a different URL.");
      }
      setUnderstanding(data.understanding);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function copyResult() {
    if (!understanding) return;
    await navigator.clipboard.writeText(understanding);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      id="understand"
      className="mt-8 max-w-xl rounded-3xl border border-hairline bg-canvas p-6 shadow-float sm:p-7"
    >
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
        Try it on your site
      </span>

      <p className="mt-2 text-sm leading-relaxed text-body">
        Paste your URL, we&rsquo;ll find your ICP.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          run(url);
        }}
        className="mt-5 flex flex-col gap-3 sm:flex-row"
      >
        <Input
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            if (error) setError(null);
          }}
          placeholder="yourcompany.com"
          aria-label="Your website URL"
          autoComplete="url"
          disabled={loading}
          className="h-12 border-[#4FA8F5]/45 shadow-[0_0_18px_rgba(79,168,245,0.35)] transition-[border-color,box-shadow] focus:border-[#4FA8F5] focus:shadow-[0_0_26px_rgba(79,168,245,0.6)] focus:ring-[#4FA8F5]/30"
        />
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={loading || !url.trim()}
          // md sizing for a lighter button, but held at h-12 so it still lines
          // up with the field beside it
          className="h-12 shrink-0 bg-gradient-to-r from-brand-navy to-[#4FA8F5] hover:opacity-90"
        >
          {loading ? "Reading…" : "Read my website"}
        </Button>
      </form>

      {error && (
        <p className="mt-2.5 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}

      {!loading && !understanding && (
        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-soft">
          <span>Try an example:</span>
          {EXAMPLES.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => {
                setUrl(example);
                run(example);
              }}
              className="font-mono text-[#2C456F] underline-offset-4 hover:underline"
            >
              {example}
            </button>
          ))}
        </div>
      )}

      {loading && <Stages current={stage} />}

      {understanding && (
        <motion.div
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: REVEAL_DURATION, ease: REVEAL_EASE }}
          className="mt-5 rounded-2xl border border-[#4FA8F5]/45 bg-canvas p-5 shadow-[0_0_18px_rgba(79,168,245,0.3)]"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            What your site says you do
          </span>
          <p className="mt-2 text-[15px] leading-relaxed text-body">{understanding}</p>

          <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-hairline pt-4">
            <a
              href="https://beta.cnvrted.com"
              className="inline-flex h-11 items-center rounded-xl bg-gradient-to-r from-brand-navy to-[#4FA8F5] px-5 text-sm font-medium text-on-dark smooth-transition hover:opacity-90"
            >
              Find companies showing this signal
            </a>
            <button
              type="button"
              onClick={copyResult}
              className="text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
            >
              {copied ? "Copied" : "Copy result"}
            </button>
          </div>
        </motion.div>
      )}

      <p className="mt-3 text-xs text-muted-soft">
        No signup. We only read publicly available pages, and nothing is saved.
      </p>
    </div>
  );
}
