"use client";

import { useEffect, useRef } from "react";

/**
 * The app demo inside the splash window: a silent 30s loop (the file has no audio track) with no player chrome.
 * No controls, no picture-in-picture, no casting, and the right-click menu (which offers "Show controls") is
 * blocked. `muted` is set here as well as in the markup because React doesn't reliably put it in the server
 * HTML, and browsers only autoplay muted video.
 *
 * Plays only while on screen. With reduced motion it stays on the poster frame.
 */
export function AppDemoVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) { v.pause(); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting) v.play().catch(() => {}); // autoplay refused (e.g. data saver): the poster stays
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="cg-splash-img"
      src="/crockedglass/app-demo-v2.mp4"
      poster="/crockedglass/app-demo-poster-v2.webp"
      width={1920}
      height={1080}
      muted
      loop
      playsInline
      preload="metadata"
      disablePictureInPicture
      disableRemotePlayback
      controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
      onContextMenu={(e) => e.preventDefault()}
      aria-label="The Cnvrted app: setting up a workspace by giving your AI assistant a quick prompt about your company"
    />
  );
}
