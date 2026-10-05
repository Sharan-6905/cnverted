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
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean };
    }).connection;
    let inView = false;
    let ready = false;
    let startTimer = 0;
    const resumeWhenVisible = () => {
      if (!ready || !inView || document.hidden || reducedMotion.matches || connection?.saveData) {
        element.pause();
        return;
      }
      // Load motion only after the first screen has loaded. Phones use the
      // original 720p loop rather than downloading an 11–18 MB 4K upscale.
      if (!element.getAttribute("src")) {
        element.src = window.matchMedia("(max-width: 767px)").matches
          ? "/videos/home-hero-loop.mp4"
          : window.matchMedia("(max-width: 1920px)").matches
            ? "/videos/home-hero-detail-1080p.mp4"
            : element.canPlayType('video/mp4; codecs="hvc1"')
              ? "/videos/home-hero-detail-4k-hevc.mp4"
              : "/videos/home-hero-detail-4k.mp4";
      }
      if (
        !element.paused &&
        element.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA
      ) {
        setPlaying(true);
      }
      if (element.paused) {
        element.muted = true;
        element.play().catch(() => setPlaying(false));
      }
    };
    const startAfterLoad = () => {
      startTimer = window.setTimeout(() => {
        ready = true;
        resumeWhenVisible();
      }, 500);
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      resumeWhenVisible();
    });
    observer.observe(element);
    if (document.readyState === "complete") startAfterLoad();
    else window.addEventListener("load", startAfterLoad, { once: true });
    reducedMotion.addEventListener("change", resumeWhenVisible);
    document.addEventListener("visibilitychange", resumeWhenVisible);
    window.addEventListener("pageshow", resumeWhenVisible);
    window.addEventListener("focus", resumeWhenVisible);
    return () => {
      clearTimeout(startTimer);
      observer.disconnect();
      window.removeEventListener("load", startAfterLoad);
      reducedMotion.removeEventListener("change", resumeWhenVisible);
      document.removeEventListener("visibilitychange", resumeWhenVisible);
      window.removeEventListener("pageshow", resumeWhenVisible);
      window.removeEventListener("focus", resumeWhenVisible);
      element.pause();
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
        muted
        loop
        playsInline
        preload="none"
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setPlaying(false)}
        tabIndex={-1}
      />
      {/* WebKit can discard a paused video surface when a preview is reopened.
            Keep a real image above it until playback has actually started. */}
      <Image
        className="design-hero-video-poster"
        src="/videos/home-hero-detail-poster.webp"
        alt=""
        width={3840}
        height={2160}
        loading="eager"
        fetchPriority="high"
        quality={60}
        sizes="(max-width: 767px) 800px, 100vw"
      />
    </div>
  );
}
