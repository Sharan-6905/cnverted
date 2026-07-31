"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = ref.current;
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
    <span
      className={cn(
        "inline-flex items-center justify-center font-display font-bold tracking-tight text-ink",
        className
      )}
      aria-hidden="true"
    >
      C
    </span>
  );
}
