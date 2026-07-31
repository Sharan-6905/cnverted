"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    Cal?: any;
  }
}

/** cal.com username — full profile lives at https://cal.com/cnvrted */
const CAL_USERNAME = "cnvrted";
/** Default event type embedded inline, so visitors land straight on a date
 * calendar instead of an event-type picker list. */
const CAL_LINK = `${CAL_USERNAME}/30min`;

/**
 * Official Cal.com inline embed (vanilla snippet from cal.com/docs, no extra
 * dependency). Renders the live booking calendar directly on the page.
 */
export function CalEmbed({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (function (C: any, A: string, L: string) {
      let p = function (a: any, ar: any) {
        a.q.push(ar);
      };
      const d = C.document;
      C.Cal =
        C.Cal ||
        function () {
          const cal = C.Cal;
          const ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api: any = function () {
              p(api, arguments);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else {
              p(cal, ar);
            }
            return;
          }
          p(cal, ar);
        };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    window.Cal!("init", { origin: "https://cal.com" });

    if (ref.current) {
      window.Cal!("inline", {
        elementOrSelector: ref.current,
        calLink: CAL_LINK,
        config: {
          theme: "light",
          layout: "month_view",
          // Skip the host avatar/name panel — jump straight to the date calendar.
          hideEventTypeDetails: "true",
        },
      });
    }

    window.Cal!("ui", {
      theme: "light",
      styles: { branding: { brandColor: "#1A3A3A" } },
      hideEventTypeDetails: true,
      layout: "month_view",
    });
  }, []);

  return <div ref={ref} className={className} style={{ minHeight: 620 }} />;
}

export const CAL_BOOKING_URL = `https://cal.com/${CAL_USERNAME}`;
