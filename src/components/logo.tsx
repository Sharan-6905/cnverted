"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Cnvrted mark. Renders the brand logo image from /cnvrted-logo.png and falls
 * back to the original orbit glyph if that file isn't present yet, so the header
 * never shows a broken image (handles a 404 that happens before hydration too).
 */
export function Logo({ className }: { className?: string }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = ref.current;
    // If the image already errored before React attached onError, catch it here.
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (!failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        ref={ref}
        src="/cnvrted-logo.png"
        alt="Cnvrted"
        className={cn("object-contain", className)}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={cn("text-ink", className)}
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="5.5" fill="currentColor" />
      <path
        d="M25 11.5A11 11 0 0 1 30.5 21"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M15 28.5A11 11 0 0 1 9.5 19"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}
