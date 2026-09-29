"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** A local canvas overlay; the artwork and footer links remain ordinary HTML. */
export function FooterSpotlight({ children }: { children: ReactNode }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!scene || !canvas || !ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastTime = 0;
    let elapsed = 0;
    let visible = false;
    let hovered = false;
    let opacity = 0;
    const position = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const enabled = () => !reducedMotion.matches && finePointer.matches;
    const paint = () => {
      if (!width || !height) return;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";
      // Darkness is the resting state. Only the light reveals the original art.
      const shade = ctx.createLinearGradient(0, 0, 0, height);
      shade.addColorStop(0, "rgba(28, 28, 28, 0.99)");
      shade.addColorStop(0.4, "rgba(3, 6, 7, 0.98)");
      shade.addColorStop(1, "rgba(3, 6, 7, 0.975)");
      ctx.fillStyle = shade;
      ctx.fillRect(0, 0, width, height);

      const scale = width / 1440;
      const lampX = 166 * scale;
      const lampY = 76 * scale;
      const lampRadius = 86 * scale;
      const lampOpening = ctx.createRadialGradient(
        lampX, lampY, 0, lampX, lampY, lampRadius,
      );
      lampOpening.addColorStop(0, "rgba(255, 255, 255, 0.96)");
      lampOpening.addColorStop(0.26, "rgba(255, 255, 255, 0.7)");
      lampOpening.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = lampOpening;
      ctx.fillRect(0, 0, width, height);

      if (opacity > 0.002) {
        const radius = Math.min(290, Math.max(150, width * 0.18)) *
          (1 + 0.045 * Math.sin((elapsed / 3200) * Math.PI * 2));
        const distance = Math.hypot(position.x - lampX, position.y - lampY);

        // A faint, feathered beam gives the moving light a source in the scene.
        ctx.save();
        ctx.globalCompositeOperation = "source-over";
        ctx.translate(lampX, lampY);
        ctx.rotate(Math.atan2(position.y - lampY, position.x - lampX));
        ctx.filter = `blur(${8 * scale}px)`;
        const beam = ctx.createLinearGradient(0, 0, Math.max(1, distance), 0);
        beam.addColorStop(0, `rgba(255, 221, 150, ${0.1 * opacity})`);
        beam.addColorStop(0.7, `rgba(255, 235, 190, ${0.025 * opacity})`);
        beam.addColorStop(1, "rgba(255, 235, 190, 0)");
        ctx.fillStyle = beam;
        ctx.beginPath();
        ctx.moveTo(0, -3 * scale);
        ctx.lineTo(distance, -radius * 0.6);
        ctx.lineTo(distance, radius * 0.6);
        ctx.lineTo(0, 3 * scale);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        const opening = ctx.createRadialGradient(
          position.x, position.y, 0, position.x, position.y, radius,
        );
        opening.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
        opening.addColorStop(0.2, `rgba(255, 255, 255, ${0.98 * opacity})`);
        opening.addColorStop(0.55, `rgba(255, 255, 255, ${0.6 * opacity})`);
        opening.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = opening;
        ctx.fillRect(0, 0, width, height);

        const glow = ctx.createRadialGradient(
          position.x, position.y, 0, position.x, position.y, radius * 1.15,
        );
        glow.addColorStop(0, `rgba(255, 238, 190, ${0.08 * opacity})`);
        glow.addColorStop(0.45, `rgba(255, 238, 190, ${0.025 * opacity})`);
        glow.addColorStop(1, "rgba(255, 238, 190, 0)");
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);
      }

      const lampGlow = ctx.createRadialGradient(
        lampX, lampY, 0, lampX, lampY, lampRadius * 0.9,
      );
      lampGlow.addColorStop(0, "rgba(255, 222, 149, 0.45)");
      lampGlow.addColorStop(0.2, "rgba(255, 216, 128, 0.18)");
      lampGlow.addColorStop(1, "rgba(255, 216, 128, 0)");
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = lampGlow;
      ctx.fillRect(0, 0, width, height);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      hovered = false;
      opacity = 0;
      scene.dataset.spotlight = "idle";
      paint();
    };

    const render = (time: number) => {
      frame = 0;
      if (!visible || document.hidden || !enabled()) {
        stop();
        return;
      }
      const delta = lastTime ? Math.min(time - lastTime, 64) : 16.67;
      lastTime = time;
      elapsed += delta;
      // Frame-rate independent easing keeps the same feel on 60/120 Hz screens.
      const follow = 1 - Math.exp(-delta / 105);
      const fade = 1 - Math.exp(-delta / 240);
      position.x += (target.x - position.x) * follow;
      position.y += (target.y - position.y) * follow;
      opacity += ((hovered ? 1 : 0) - opacity) * fade;
      if (!hovered && opacity < 0.002) {
        stop();
        return;
      }
      paint();
      frame = requestAnimationFrame(render);
    };

    const start = () => {
      if (!frame && visible && !document.hidden && enabled()) {
        frame = requestAnimationFrame(render);
      }
    };
    const resize = () => {
      width = scene.clientWidth;
      height = scene.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paint();
      scene.dataset.spotlightReady = "true";
      if (hovered) start();
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch" || !enabled()) return;
      const bounds = scene.getBoundingClientRect();
      target.x = (event.clientX - bounds.left) * (width / bounds.width);
      target.y = (event.clientY - bounds.top) * (height / bounds.height);
      if (!hovered) {
        position.x = target.x;
        position.y = target.y;
      }
      hovered = true;
      scene.dataset.spotlight = "active";
      start();
    };
    const leave = () => {
      if (!hovered) return;
      hovered = false;
      scene.dataset.spotlight = "fading";
      start();
    };
    const syncAvailability = () => {
      if (document.hidden || !enabled()) stop();
    };

    const resizeObserver = new ResizeObserver(resize);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) stop();
      else if (hovered) start();
    });
    resize();
    resizeObserver.observe(scene);
    observer.observe(scene);
    scene.addEventListener("pointermove", move, { passive: true });
    scene.addEventListener("pointerleave", leave);
    scene.addEventListener("pointercancel", leave);
    document.addEventListener("visibilitychange", syncAvailability);
    window.addEventListener("blur", stop);
    reducedMotion.addEventListener("change", syncAvailability);
    finePointer.addEventListener("change", syncAvailability);

    return () => {
      stop();
      delete scene.dataset.spotlightReady;
      resizeObserver.disconnect();
      observer.disconnect();
      scene.removeEventListener("pointermove", move);
      scene.removeEventListener("pointerleave", leave);
      scene.removeEventListener("pointercancel", leave);
      document.removeEventListener("visibilitychange", syncAvailability);
      window.removeEventListener("blur", stop);
      reducedMotion.removeEventListener("change", syncAvailability);
      finePointer.removeEventListener("change", syncAvailability);
    };
  }, []);

  return (
    <div ref={sceneRef} className="design-footer-art" data-spotlight="idle">
      {children}
      <canvas ref={canvasRef} className="design-footer-spotlight" aria-hidden="true" />
    </div>
  );
}
