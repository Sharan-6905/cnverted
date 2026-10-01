import type { ReactNode } from "react";
import { CalendarDays, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { BOOKING_URL } from "@/lib/booking";
import { cn } from "@/lib/utils";

interface BookingCardProps {
  /** anchor target, so CTAs elsewhere on the page can link to `#{id}` */
  id?: string;
  className?: string;
  /** Rendered beside the Calendly link; the dialog puts its close button here. */
  headerAction?: ReactNode;
}

/**
 * Shared Calendly handoff for contact and pricing, using the same destination
 * as the homepage call-to-action.
 */
export function BookingCard({
  id = "book",
  className,
  headerAction,
}: BookingCardProps) {
  return (
    <Card
      id={id}
      className={cn(
        "scroll-mt-24 overflow-hidden border-white/60 bg-canvas/40 shadow-[0_10px_44px_-12px_rgba(20,16,8,0.22)] backdrop-blur-2xl",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-black/90 px-5 py-4 text-on-dark backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-blue-500/25 backdrop-blur-md">
            <CalendarDays className="h-4.5 w-4.5" />
          </span>
          <div>
            <p className="text-sm font-semibold">Book a demo</p>
            <p className="text-xs text-on-dark/70">
              Talk through your GTM goals with our team.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-on-dark/90 backdrop-blur-md smooth-transition hover:bg-white/20 hover:text-on-dark sm:inline-flex"
          >
            Open in Calendly
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          {headerAction}
        </div>
      </div>

      <div className="bg-gradient-to-b from-blue-100/50 via-white/30 to-transparent px-5 py-6">
        <p className="text-sm leading-relaxed text-body">
          Choose a time that works for you on our Calendly.
        </p>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-black px-5 text-sm font-medium text-on-dark shadow-soft smooth-transition active:scale-[0.98]"
        >
          Book a demo
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </Card>
  );
}
