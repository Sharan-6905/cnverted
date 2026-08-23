import { CalendarDays, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { CalEmbed, CAL_BOOKING_URL } from "@/components/cal-embed";
import { cn } from "@/lib/utils";

interface BookingCardProps {
  /** anchor target, so CTAs elsewhere on the page can link to `#{id}` */
  id?: string;
  className?: string;
}

/**
 * The inline cal.com calendar in its product chrome. Shared by the contact and
 * pricing pages so the booking surface — and the account behind it — stays in
 * one place.
 */
export function BookingCard({ id = "book", className }: BookingCardProps) {
  return (
    <Card
      id={id}
      className={cn(
        "scroll-mt-24 overflow-hidden border-white/60 bg-canvas/40 shadow-[0_10px_44px_-12px_rgba(20,16,8,0.22)] backdrop-blur-2xl",
        className
      )}
    >
      <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-black/90 px-5 py-4 text-on-dark backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-blue-500/25 backdrop-blur-md">
            <CalendarDays className="h-4.5 w-4.5" />
          </span>
          <div>
            <p className="text-sm font-semibold">Schedule a demo</p>
            <p className="text-xs text-on-dark/70">
              Book a walkthrough with our founding team.
            </p>
          </div>
        </div>
        <a
          href={CAL_BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden shrink-0 items-center gap-1 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-on-dark/90 backdrop-blur-md smooth-transition hover:bg-white/20 hover:text-on-dark sm:inline-flex"
        >
          Open in Cal.com
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* Inline calendar only where the month view fits side-by-side. Below that
          it stacks into a very tall slot list, so we show a compact booking
          button instead. */}
      <div className="relative hidden bg-gradient-to-b from-blue-100/50 via-white/30 to-transparent p-2 lg:block">
        <CalEmbed className="w-full overflow-hidden rounded-2xl border border-white/60 shadow-soft" />
      </div>

      <div className="bg-gradient-to-b from-blue-100/50 via-white/30 to-transparent px-5 py-6 lg:hidden">
        <p className="text-sm leading-relaxed text-body">
          Pick a time that works for you — 15 or 30 minutes, straight into our
          calendar.
        </p>
        <a
          href={CAL_BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-black px-5 text-sm font-medium text-on-dark shadow-soft smooth-transition active:scale-[0.98]"
        >
          Book a time slot
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </Card>
  );
}
