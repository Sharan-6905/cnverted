import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** floating elevation (used for hero / emphasized cards) */
  float?: boolean;
}

/** Cream product-mockup card with hairline border — the Clay content-card look. */
export function Card({ className, float, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-hairline bg-canvas shadow-soft",
        float && "shadow-float",
        className
      )}
      {...props}
    />
  );
}
