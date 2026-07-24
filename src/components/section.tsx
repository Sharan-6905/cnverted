import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** center the header block */
  centered?: boolean;
}

/** Editorial band with consistent vertical rhythm + optional header. */
export function Section({
  eyebrow,
  title,
  description,
  centered,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("px-5 py-14 sm:px-6 sm:py-20 md:py-28", className)}
      {...props}
    >
      <div className="mx-auto max-w-6xl">
        {(eyebrow || title || description) && (
          <div className={cn("mb-12 max-w-2xl", centered && "mx-auto text-center")}>
            {eyebrow && (
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="font-display text-display-md font-semibold text-ink">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-[15px] leading-relaxed text-body">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
