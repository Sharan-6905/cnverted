import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-medium leading-none",
  {
    variants: {
      variant: {
        neutral: "bg-surface-card text-body",
        clay: "bg-surface-card text-ink",
        high: "bg-intent-high-bg text-intent-high",
        medium: "bg-intent-medium-bg text-intent-medium",
        low: "bg-intent-low-bg text-intent-low",
        outline: "bg-transparent text-ink border border-hairline",
      },
      size: {
        sm: "text-[11px] px-2 py-1",
        md: "text-xs px-2.5 py-1",
      },
    },
    defaultVariants: { variant: "neutral", size: "md" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}
