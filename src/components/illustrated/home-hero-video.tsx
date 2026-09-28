"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function HomeHeroVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const element = video.current;
    if (!element) return;
    const resumeWhenVisible = () => {
      // Autoplay may begin before React attaches its playback event handlers.
      if (
        !element.paused &&
        element.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA
      ) {
        setPlaying(true);
      }
      if (
        document.visibilityState === "visible" &&
        !reducedMotion.matches &&
        element.paused
      ) {
        element.muted = true;
        element.play().catch(() => setPlaying(false));
      }
    };
    const respectMotionPreference = () => {
      if (reducedMotion.matches) element.pause();
      else resumeWhenVisible();
    };
    respectMotionPreference();
    reducedMotion.addEventListener("change", respectMotionPreference);
    element.addEventListener("canplay", resumeWhenVisible);
    document.addEventListener("visibilitychange", resumeWhenVisible);
    window.addEventListener("pageshow", resumeWhenVisible);
    window.addEventListener("focus", resumeWhenVisible);
    return () => {
      reducedMotion.removeEventListener("change", respectMotionPreference);
      element.removeEventListener("canplay", resumeWhenVisible);
      document.removeEventListener("visibilitychange", resumeWhenVisible);
      window.removeEventListener("pageshow", resumeWhenVisible);
      window.removeEventListener("focus", resumeWhenVisible);
    };
  }, []);

  return (
    <div
      className="design-hero-video"
      data-playing={playing}
      aria-hidden="true"
    >
      <video
        ref={video}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/videos/home-hero-detail-poster.webp"
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setPlaying(false)}
        tabIndex={-1}
      >
        <source
          src="/videos/home-hero-detail-4k-hevc.mp4"
          type='video/mp4; codecs="hvc1"'
        />
        <source src="/videos/home-hero-detail-4k.mp4" type="video/mp4" />
      </video>
      {/* WebKit can discard a paused video surface when a preview is reopened.
            Keep a real image above it until playback has actually started. */}
      <Image
        className="design-hero-video-poster"
        src="/videos/home-hero-detail-poster.webp"
        alt=""
        width={3840}
        height={2160}
        loading="eager"
        unoptimized
      />
    </div>
  );
}
