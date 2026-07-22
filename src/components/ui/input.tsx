import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "h-11 w-full rounded-xl border border-hairline bg-canvas px-4 text-sm text-ink smooth-transition transition-colors placeholder:text-muted-soft",
        "focus:border-ink focus:outline-none focus:ring-2 focus:ring-brand-teal/25",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
