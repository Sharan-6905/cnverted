import { Section } from "@/components/section";

/**
 * The YouTube Short embedded on the homepage.
 *
 * Shorts are 9:16, so the frame is capped at phone width rather than stretched
 * across the section — a full-width vertical video would tower over everything
 * around it.
 *
 * It autoplays muted and loops, which is the only way a browser will start
 * playback without a user gesture; controls stay on so anyone can unmute.
 */
const VIDEO_ID = "1QtrdzKD6lE";

const PARAMS = new URLSearchParams({
  autoplay: "1",
  mute: "1",
  loop: "1",
  // loop is ignored on a single video unless it is also the playlist
  playlist: VIDEO_ID,
  playsinline: "1",
  rel: "0",
  modestbranding: "1",
});

export function ProductVideo() {
  return (
    /* Header lives inside the grid rather than in Section's own centered block,
       so the copy can sit beside the video. Text comes first in the DOM and the
       video is reordered left on desktop, so a phone reads the heading before
       it hits the player. */
    <Section>
      <div className="grid items-center gap-10 lg:grid-cols-[380px_1fr] lg:gap-16">
        <div className="lg:order-first">
          <div className="mx-auto w-full max-w-[340px] sm:max-w-[380px] lg:mx-0">
            <div className="relative aspect-[9/16] w-full overflow-hidden rounded-3xl border border-hairline bg-surface-soft shadow-float">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?${PARAMS}`}
                title="CNVRTED product walkthrough"
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* same type treatment Section uses for its own header */}
        <div className="order-first lg:order-none">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            See it in action
          </span>
          <h2 className="font-display text-display-md font-semibold text-ink">
            CNVRTED, <span className="text-accent">in fifty seconds</span>.
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-body">
            The clip follows one real signal end to end — someone on LinkedIn
            saying their team is growing, and a job post that proves it. That is
            the moment an account becomes worth your time, and it is the moment
            most teams find out about weeks too late.
          </p>

          <div className="mt-8 rounded-2xl border border-hairline bg-surface-soft p-5">
            <p className="text-sm font-semibold text-ink">
              We&apos;re live on Product Hunt.
            </p>
            <p className="mt-1.5 max-w-md text-sm leading-relaxed text-body">
              Follow along there to catch launch updates as they land.
            </p>
            <a
              href="https://www.producthunt.com/products/cnvrted?utm_source=badge-follow&utm_medium=badge&utm_source=badge-cnvrted"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/follow.svg?product_id=1298689&theme=light"
                alt="Cnvrted - Buyers, not names — real-time B2B buying intent | Product Hunt"
                width={250}
                height={54}
                style={{ width: 250, height: 54 }}
              />
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
