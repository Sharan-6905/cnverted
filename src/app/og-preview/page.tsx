import type { Metadata } from "next";
import { RADAR_LEADS, RADAR_ROW_ORDER, polarToPercent } from "@/components/radar/radar-data";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/**
 * Static 1200x630 composition used to generate /og-cover.png (the link-preview
 * image). Not linked from the site — it exists so the OG image can be
 * re-rendered from real product data whenever the radar copy changes.
 *
 * Regenerate with:
 *   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
 *     --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=2 \
 *     --window-size=1200,630 --screenshot=public/og-cover.png \
 *     http://localhost:3099/og-preview
 */
export default function OgPreviewPage() {
  return (
    <div
      className="relative flex flex-col overflow-hidden bg-white"
      style={{ width: 1200, height: 630 }}
    >
      {/* keep the dev-tools badge out of the captured image */}
      <style
        dangerouslySetInnerHTML={{
          __html: "nextjs-portal,#__next-build-watcher{display:none!important}",
        }}
      />
      {/* grid + ambient wash */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="bg-grid-page absolute inset-0" />
        <div className="absolute -left-24 top-10 h-96 w-96 rounded-full bg-blue-400/25 blur-[110px]" />
        <div className="absolute -right-20 bottom-24 h-80 w-80 rounded-full bg-[#BEF264]/25 blur-[110px]" />
      </div>

      {/* brand */}
      <div className="relative flex items-center gap-3 px-14 pt-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/cnvrted-logo.png" alt="" className="h-11 w-auto" />
        <span className="font-display text-[26px] font-semibold tracking-tight text-ink">
          Cnvrted
        </span>
      </div>

      {/* main */}
      <div className="relative flex flex-1 items-center gap-10 px-14 pb-4">
        {/* radar */}
        <div className="relative h-[330px] w-[330px] shrink-0">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, #EEF4FF 0%, #C9DBFF 45%, #77A6FF 100%)",
            }}
          />
          {[0.35, 0.62, 0.85].map((r) => (
            <div
              key={r}
              className="absolute rounded-full border border-white/45"
              style={{
                inset: `${((1 - r) / 2) * 100}%`,
              }}
            />
          ))}
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/35" />
          <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/35" />

          {RADAR_LEADS.map((lead) => {
            const { left, top } = polarToPercent(lead.angle, lead.radiusFraction);
            return (
              <div
                key={lead.id}
                className="absolute flex h-[62px] w-[62px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  border: `3px solid ${lead.ring}`,
                  boxShadow: `0 0 0 6px rgba(255,255,255,0.55), 0 10px 24px -8px ${lead.glow}`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={lead.avatar}
                  alt=""
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
            );
          })}
        </div>

        {/* intent rows */}
        <div className="flex flex-1 flex-col gap-3">
          {RADAR_ROW_ORDER.map((lead) => (
            <div
              key={lead.id}
              className="flex items-center gap-4 rounded-2xl border border-white/70 bg-white/75 px-5 py-3 shadow-[0_8px_28px_-14px_rgba(20,16,8,0.28)] backdrop-blur-xl"
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white"
                style={{ border: `2px solid ${lead.ring}` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={lead.avatar}
                  alt=""
                  className="h-full w-full rounded-full object-cover"
                />
              </span>
              <p className="text-[17px] leading-snug text-muted">
                {lead.segments.map((s, i) =>
                  s.highlight ? (
                    <span key={i} className="font-medium text-blue-600">
                      {s.text}
                    </span>
                  ) : (
                    <span key={i}>{s.text}</span>
                  )
                )}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* footer strip */}
      <div className="relative flex items-center justify-between bg-[#0A0A0A] px-14 py-5">
        <p className="font-display text-[22px] font-semibold tracking-tight text-white">
          Buyers, not names.
        </p>
        <p className="text-[15px] text-white/60">
          Real-time buying signals from LinkedIn, Reddit &amp; X
        </p>
      </div>
    </div>
  );
}
