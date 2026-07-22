import { cn } from "@/lib/utils";

/**
 * Cnvrted mark: a solid core with two orbiting arcs — signals converging on a buyer.
 * Recreated from the brand logo, themed for light surfaces.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={cn("text-ink", className)}
      aria-hidden="true"
    >
      {/* core */}
      <circle cx="20" cy="20" r="5.5" fill="currentColor" />
      {/* upper-right orbit arc */}
      <path
        d="M25 11.5A11 11 0 0 1 30.5 21"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        opacity="0.55"
      />
      {/* lower-left orbit arc */}
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
