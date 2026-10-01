"use client";

import { useEffect, useRef, type ReactNode } from "react";

type SpotlightConfig = {
  spotlightSize?: number;
  spotlightIntensity?: number;
  fadeSpeed?: number;
  glowColor?: string;
  pulseSpeed?: number;
};

/** The supplied spotlight effect, scoped to its scene rather than the document. */
function useSpotlightEffect({
  spotlightSize = 207,
  spotlightIntensity = 0.88,
  fadeSpeed = 0.1,
  glowColor = "255, 233, 193",
  pulseSpeed = 3600,
}: SpotlightConfig = {}) {
  const sceneRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!scene || !canvas || !ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let frame = 0;
    let elapsed = 0;
    let lastTime = 0;
    let visible = false;
    let following = false;
    let strength = 0.68;
    const position = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const paint = () => {
      if (!width || !height) return;
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(8, 11, 12, 0.96)";
      ctx.fillRect(0, 0, width, height);

      const pulse = reducedMotion.matches
        ? 1
        : 1 + 0.035 * Math.sin((elapsed / pulseSpeed) * Math.PI * 2);
      const radius =
        Math.min(spotlightSize, Math.max(108, width * 0.162)) * pulse;
      const intensity = spotlightIntensity * strength;
      const opening = ctx.createRadialGradient(
        position.x,
        position.y,
        0,
        position.x,
        position.y,
        radius,
      );
      opening.addColorStop(0, `rgba(255, 255, 255, ${intensity})`);
      opening.addColorStop(0.22, `rgba(255, 255, 255, ${intensity * 0.92})`);
      opening.addColorStop(0.55, `rgba(255, 255, 255, ${intensity * 0.46})`);
      opening.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = opening;
      ctx.beginPath();
      ctx.arc(position.x, position.y, radius, 0, Math.PI * 2);
      ctx.fill();

      const glow = ctx.createRadialGradient(
        position.x,
        position.y,
        0,
        position.x,
        position.y,
        radius * 1.2,
      );
      glow.addColorStop(0, `rgba(${glowColor}, ${intensity * 0.055})`);
      glow.addColorStop(1, `rgba(${glowColor}, 0)`);
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(position.x, position.y, radius * 1.2, 0, Math.PI * 2);
      ctx.fill();
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      scene.dataset.spotlightRunning = "false";
    };

    const render = (time: number) => {
      frame = 0;
      if (!visible || document.hidden || reducedMotion.matches) {
        stop();
        return;
      }
      const delta = lastTime ? Math.min(time - lastTime, 64) : 16.67;
      lastTime = time;
      elapsed += delta;
      if (!following) {
        target.x = width * (0.5 + 0.17 * Math.sin(elapsed / 11000));
        target.y = height * (0.43 + 0.025 * Math.sin(elapsed / 7800));
      }
      const ease = 1 - Math.pow(1 - fadeSpeed, delta / 16.67);
      position.x += (target.x - position.x) * ease;
      position.y += (target.y - position.y) * ease;
      strength +=
        ((following ? 1 : 0.68) - strength) * (1 - Math.exp(-delta / 280));
      paint();
      frame = requestAnimationFrame(render);
    };

    const start = () => {
      if (frame || !visible || document.hidden || reducedMotion.matches) return;
      scene.dataset.spotlightRunning = "true";
      frame = requestAnimationFrame(render);
    };

    const resize = () => {
      width = scene.clientWidth;
      height = scene.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      position.x = target.x = width * 0.5;
      position.y = target.y = height * 0.43;
      paint();
      scene.dataset.spotlightReady = "true";
    };

    const move = (event: PointerEvent) => {
      if (reducedMotion.matches) return;
      const bounds = scene.getBoundingClientRect();
      target.x = event.clientX - bounds.left;
      target.y = event.clientY - bounds.top;
      following = true;
      scene.dataset.spotlight = "following";
      start();
    };
    const leave = () => {
      following = false;
      scene.dataset.spotlight = reducedMotion.matches ? "still" : "ambient";
    };
    const endTouch = (event: PointerEvent) => {
      if (event.pointerType === "touch") leave();
    };
    const sync = () => {
      stop();
      leave();
      if (reducedMotion.matches) {
        position.x = target.x = width * 0.5;
        position.y = target.y = height * 0.43;
        strength = 0.68;
        paint();
      }
      start();
    };
    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else {
        stop();
        leave();
      }
    });
    resize();
    leave();
    resizeObserver.observe(scene);
    intersectionObserver.observe(scene);
    scene.addEventListener("pointermove", move, { passive: true });
    scene.addEventListener("pointerdown", move, { passive: true });
    scene.addEventListener("pointerleave", leave);
    scene.addEventListener("pointercancel", leave);
    scene.addEventListener("pointerup", endTouch);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("blur", leave);
    reducedMotion.addEventListener("change", sync);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      scene.removeEventListener("pointermove", move);
      scene.removeEventListener("pointerdown", move);
      scene.removeEventListener("pointerleave", leave);
      scene.removeEventListener("pointercancel", leave);
      scene.removeEventListener("pointerup", endTouch);
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("blur", leave);
      reducedMotion.removeEventListener("change", sync);
      delete scene.dataset.spotlightReady;
      delete scene.dataset.spotlightRunning;
      delete scene.dataset.spotlight;
    };
  }, [spotlightSize, spotlightIntensity, fadeSpeed, glowColor, pulseSpeed]);

  return { sceneRef, canvasRef };
}

export function NotFoundSpotlight({ children }: { children: ReactNode }) {
  const { sceneRef, canvasRef } = useSpotlightEffect();
  return (
    <section
      ref={sceneRef}
      className="not-found-hero"
      aria-labelledby="not-found-title"
    >
      {children}
      <canvas
        ref={canvasRef}
        className="not-found-spotlight"
        aria-hidden="true"
      />
    </section>
  );
}
