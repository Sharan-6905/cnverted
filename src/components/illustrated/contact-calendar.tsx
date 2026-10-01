"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { BOOKING_URL } from "@/lib/booking";

type CalendlyAPI = {
  initInlineWidget: (options: {
    url: string;
    parentElement: HTMLElement;
    resize: boolean;
  }) => void;
};

/** Live availability and invitee details stay in the existing Calendly event. */
export function ContactCalendar({ nonce }: { nonce?: string }) {
  const container = useRef<HTMLDivElement>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const [status, setStatus] = useState<"loading" | "ready" | "unavailable">("loading");

  useEffect(() => {
    // Loading the script (or iframe) does not mean the booking UI has rendered.
    // Keep the page compact if either request stalls or is blocked.
    const timeout = window.setTimeout(() => {
      setStatus((current) => current === "loading" ? "unavailable" : current);
    }, 12000);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const element = container.current;
    const calendly = (window as Window & { Calendly?: CalendlyAPI }).Calendly;
    if (!scriptReady || !element || !calendly) return;

    const onMessage = (event: MessageEvent) => {
      const iframe = element.querySelector("iframe");
      if (
        event.origin !== "https://calendly.com" ||
        !iframe || event.source !== iframe.contentWindow ||
        event.data?.event !== "calendly.event_type_viewed"
      ) return;

      // Do not expand a timed-out calendar later while someone reads the page.
      setStatus((current) => current === "loading" ? "ready" : current);
    };
    window.addEventListener("message", onMessage);

    calendly.initInlineWidget({ url: BOOKING_URL, parentElement: element, resize: true });
    const iframe = element.querySelector("iframe");
    if (iframe) iframe.title = "Book a 30-minute call with Cnvrted";
    return () => {
      window.removeEventListener("message", onMessage);
      element.replaceChildren();
    };
  }, [scriptReady]);

  return (
    <section className="contact-booking" aria-label="Book a demo">
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        nonce={nonce}
        onReady={() => setScriptReady(true)}
        onError={() => setStatus("unavailable")}
      />
      <div className="contact-calendar-stage" data-state={status}>
        <div ref={container} className="contact-calendar" inert={status !== "ready"} aria-hidden={status !== "ready"} />
        {status !== "ready" && (
          <div className="contact-calendar-fallback">
            <span className="contact-calendar-kicker">30 minutes · Google Meet</span>
            <h2>Let’s talk GTM.</h2>
            <p>Choose a time to talk about your team and your next stage of growth.</p>
            <div className="contact-calendar-actions">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Book a demo</a>
              {status === "unavailable" && <button type="button" onClick={() => window.location.reload()}>Retry calendar</button>}
            </div>
            <p className="contact-calendar-status" role="status">
              {status === "loading" ? "Loading available times…" : "The calendar couldn’t load here. You can book directly on Calendly."}
            </p>
          </div>
        )}
      </div>
      <noscript><style>{".contact-calendar, .contact-calendar-status { display: none; }"}</style></noscript>
      <p className="contact-booking-alternative">
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Open in Calendly</a>
        <span aria-hidden="true">·</span>
        <span>Prefer email? <a href="mailto:info@cnvrted.com">info@cnvrted.com</a></span>
      </p>
    </section>
  );
}
