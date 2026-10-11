"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import "./footer-water.css";

const VERTEX = `
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = vec2(position.x * .5 + .5, .5 - position.y * .5);
  gl_Position = vec4(position, 0., 1.);
}`;

const FRAGMENT = `
precision highp float;
uniform sampler2D image;
uniform vec2 size;
uniform float time;
uniform vec4 ripples[8];
varying vec2 uv;
vec2 imageUV(vec2 p) {
  // Matches the responsive image's CSS crop, including its natural aspect ratio.
  return vec2((p.x + .12) / 1.24, (p.y + .28) / (1.24 * 809. / 1942. * 3.6));
}
void main() {
  vec3 original = texture2D(image, imageUV(uv)).rgb;
  float water = smoothstep(.03, .22, min(original.g, original.b) - original.r);
  vec2 displacement = vec2(0.);
  float light = 0.;
  for (int i = 0; i < 8; i++) {
    float age = time - ripples[i].z;
    if (age >= 0. && age < 2.6 && ripples[i].w > 0.) {
      vec2 delta = uv * size - ripples[i].xy * size;
      float distance = length(delta);
      float front = distance - age * 115.;
      float envelope = exp(-front * front / 1800.) * pow(1. - age / 2.6, 2.);
      float wave = sin(front * .17) * envelope * ripples[i].w;
      displacement += delta / max(distance, 1.) * wave * 4.;
      light += cos(front * .17) * envelope * ripples[i].w * .055;
    }
  }
  vec3 color = texture2D(image, imageUV(uv + displacement * water / size)).rgb;
  gl_FragColor = vec4(color + light * water, 1.);
}`;

/** A static Figma image enhanced with short, pointer-driven refraction waves. */
export function FooterWater() {
  const hostRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const image = imageRef.current;
    const canvas = canvasRef.current;
    if (!host || !image || !canvas) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = matchMedia("(any-pointer: fine)");
    let frame = 0;
    let visible = false;
    let lastDrop = -Infinity;
    let nextDrop = 0;
    let previous = { x: -1000, y: -1000 };
    const drops = new Float32Array(32);
    let gl: WebGLRenderingContext | null = null;
    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    let texture: WebGLTexture | null = null;
    let timeUniform: WebGLUniformLocation | null = null;
    let dropsUniform: WebGLUniformLocation | null = null;
    let sizeUniform: WebGLUniformLocation | null = null;
    let failed = false;

    function stop() {
      cancelAnimationFrame(frame);
      frame = 0;
      drops.fill(0);
      if (canvas) canvas.style.opacity = "0";
    }

    function initialize() {
      if (!canvas || !image || failed || !image.complete || !image.naturalWidth) return false;
      if (program) return true;
      gl = canvas.getContext("webgl", { alpha: false, antialias: false, depth: false });
      if (!gl) { failed = true; return false; }
      const shaders: WebGLShader[] = [];
      for (const [type, source] of [[gl.VERTEX_SHADER, VERTEX], [gl.FRAGMENT_SHADER, FRAGMENT]] as const) {
        const shader = gl.createShader(type);
        if (!shader) { failed = true; break; }
        shaders.push(shader);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { failed = true; break; }
      }
      program = gl.createProgram();
      if (program && !failed) {
        shaders.forEach(shader => gl!.attachShader(program!, shader));
        gl.linkProgram(program);
        failed = !gl.getProgramParameter(program, gl.LINK_STATUS);
      } else failed = true;
      shaders.forEach(shader => gl!.deleteShader(shader));
      if (failed || !program) return false;
      gl.useProgram(program);
      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      const position = gl.getAttribLocation(program, "position");
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      timeUniform = gl.getUniformLocation(program, "time");
      dropsUniform = gl.getUniformLocation(program, "ripples[0]");
      sizeUniform = gl.getUniformLocation(program, "size");
      return true;
    }

    function render(now: number) {
      frame = 0;
      if (!canvas || !host || !gl || !visible || document.hidden || motion.matches || now - lastDrop > 2600) { stop(); return; }
      const { width, height } = host.getBoundingClientRect();
      const density = Math.min(devicePixelRatio || 1, 1.5);
      const w = Math.round(width * density), h = Math.round(height * density);
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(sizeUniform, width, height);
      gl.uniform1f(timeUniform, now / 1000);
      gl.uniform4fv(dropsUniform, drops);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      canvas.style.opacity = "1";
      frame = requestAnimationFrame(render);
    }

    function ripple(event: PointerEvent) {
      if (!host || !visible || document.hidden || motion.matches || !pointer.matches || event.pointerType === "touch") return;
      const now = performance.now();
      const bounds = host.getBoundingClientRect();
      const x = event.clientX - bounds.left, y = event.clientY - bounds.top;
      const click = event.type === "pointerdown";
      if (!click && (now - lastDrop < 90 || Math.hypot(x - previous.x, y - previous.y) < 14)) return;
      if (!initialize()) return;
      previous = { x, y };
      lastDrop = now;
      drops.set([x / bounds.width, y / bounds.height, now / 1000, click ? 1.3 : .8], nextDrop * 4);
      nextDrop = (nextDrop + 1) % 8;
      if (!frame) frame = requestAnimationFrame(render);
    }

    function refreshTexture() {
      stop();
      if (gl && texture && image?.naturalWidth) {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      }
    }
    function contextLost() {
      failed = true;
      stop();
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) stop();
    });
    observer.observe(host);
    host.addEventListener("pointermove", ripple, { passive: true });
    host.addEventListener("pointerdown", ripple, { passive: true });
    image.addEventListener("load", refreshTexture);
    canvas.addEventListener("webglcontextlost", contextLost);
    document.addEventListener("visibilitychange", stop);
    window.addEventListener("blur", stop);
    motion.addEventListener("change", stop);
    pointer.addEventListener("change", stop);
    return () => {
      stop();
      observer.disconnect();
      host.removeEventListener("pointermove", ripple);
      host.removeEventListener("pointerdown", ripple);
      image.removeEventListener("load", refreshTexture);
      canvas.removeEventListener("webglcontextlost", contextLost);
      document.removeEventListener("visibilitychange", stop);
      window.removeEventListener("blur", stop);
      motion.removeEventListener("change", stop);
      pointer.removeEventListener("change", stop);
      if (gl) { gl.deleteTexture(texture); gl.deleteBuffer(buffer); gl.deleteProgram(program); }
    };
  }, []);

  return <div ref={hostRef} className="footer-water" aria-hidden="true">
    <Image ref={imageRef} className="footer-water-image" src="/figma/redesign/footer-island-wordmark.png" alt="" width={1942} height={809} sizes="124vw" draggable={false} />
    <canvas ref={canvasRef} />
  </div>;
}
