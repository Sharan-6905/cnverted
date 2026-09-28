"use client";

import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";

/** Fixed coordinates are confined to the illustrations, never the page layout. */
export function ScaledArtwork({
  width,
  height,
  children,
  className = "",
  label,
  animated = false,
}: {
  width: number;
  height: number;
  children: ReactNode;
  className?: string;
  label?: string;
  animated?: boolean;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const element = frame.current;
    if (!element) return;
    const resize = () => {
      if (canvas.current)
        canvas.current.style.transform = `scale(${element.clientWidth / width})`;
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    return () => observer.disconnect();
  }, [width]);
  useEffect(() => {
    const element = frame.current;
    if (!animated || !element) return;
    let inView = false;
    const update = () => {
      element.dataset.running = String(inView && !document.hidden);
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      delete element.dataset.running;
    };
  }, [animated]);
  return (
    <div
      ref={frame}
      className={`illustration ${className}`}
      data-motion={animated ? "signals" : undefined}
      style={{ aspectRatio: `${width} / ${height}` }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <div
        ref={canvas}
        className="illustration-canvas"
        style={{ width, height }}
      >
        {children}
      </div>
    </div>
  );
}
