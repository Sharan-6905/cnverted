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
    <Section
      centered
      eyebrow="See it in action"
      title={
        <>
          CNVRTED, <span className="text-accent">in ninety seconds</span>.
        </>
      }
      description="A quick look at how a buying signal becomes an account, a contact, and a message your team can send."
    >
      <div className="mx-auto w-full max-w-[340px] sm:max-w-[380px]">
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
    </Section>
  );
}
