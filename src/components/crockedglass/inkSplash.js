/*
  Ink splash reveal: the engine.
  The WebGL fluid is adapted from "The fluid menu" by Animorio (https://animorio.com), used under its licence for
  your own site. No dependencies: no GSAP, no ScrollTrigger.

  When the section scrolls into view (the same trigger rule as React Bits' AnimatedContent: the section's top passes
  `threshold` of the way up the viewport), ink pours out from all round the edges of the window in jets that curl into
  eddies, spreads and thickens until it fills the section, and the window, which started zoomed in, zooms out to its
  resting size. The ink is drawn in a coarse pixel grain, like the stippled backdrop of the Cnvrted home screen.

  It is the same solver as the menu (Stam's stable fluids on a small GPU grid: semi-Lagrangian advection, vorticity
  confinement, Jacobi pressure), with three inks instead of two and the source moved from a button to the window.
*/

const DEFAULTS = {
  threshold: 0.3,     /* how far up the viewport the section's top must come before it plays (0 to 1) */
  once: true,         /* play once; false = the ink draws back in and the window zooms back when you scroll up past it */
  delay: 0,           /* seconds between the trigger and the first jet */
  splash: 1.5,        /* seconds the ink takes to fill the section */
  close: 1.0,         /* seconds it takes to be drawn back in (only when once is false) */
  zoomAt: 0.4,        /* when the window starts to zoom out, as a share of `splash` */
  swirl: 14,          /* how hard the ink curls into eddies (0 = smooth) */
  jets: 8,            /* jets of ink round the window's edge each frame while it pours */
  stir: 0.7,          /* how much the pointer stirs the ink afterwards (0 = off) */
  orange: 0.26,       /* how much of the ink is orange, 0 to 1 */
  pink: 0.36,         /* how much of the ink is pink, 0 to 1 */
  grain: 3,           /* size of the stipple, in CSS pixels */
  dither: 0.8,        /* how strong the stipple is, 0 (smooth ink) to 1 */
  grid: 112,          /* cells of the simulation across the short side (fewer is faster) */
  iterations: 18,     /* pressure passes */
  image: null,        /* optional photo URL: the ink then reveals this picture instead of drawing in colour */
  onSplash: null,     /* called when the ink starts */
  onReveal: null,     /* called when the window starts to zoom out */
};

export function createInkSplash(root, options = {}) {
  const O = { ...DEFAULTS, ...options };
  const cleanups = [];
  let alive = true;
  let raf = 0;
  const on = (t, ...a) => { t.addEventListener(...a); cleanups.push(() => t.removeEventListener(...a)); };

  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const TOUCH = matchMedia('(hover: none), (pointer: coarse)').matches;
  const cv = root.querySelector(':scope > [data-ink]');
  const win = root.querySelector(':scope > [data-window]');

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const easeIn = (t) => t * t;
  const easeOut = (t) => 1 - (1 - t) * (1 - t);
  const inOut = (t) => (t < 0.5 ? 2 * t * t : 1 - 2 * (1 - t) * (1 - t));

  /* ---------------------------------------------------------------- WebGL2, with half float targets */
  function context() {
    if (REDUCED || !cv) return null;
    let g = null;
    try {
      g = cv.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false });
    } catch (e) { g = null; }
    if (!g || g.isContextLost()) return null;
    g.getExtension('EXT_color_buffer_float');
    g.getExtension('EXT_color_buffer_half_float');
    const t = g.createTexture();
    g.bindTexture(g.TEXTURE_2D, t);
    g.texImage2D(g.TEXTURE_2D, 0, g.RGBA16F, 4, 4, 0, g.RGBA, g.HALF_FLOAT, null);
    const f = g.createFramebuffer();
    g.bindFramebuffer(g.FRAMEBUFFER, f);
    g.framebufferTexture2D(g.FRAMEBUFFER, g.COLOR_ATTACHMENT0, g.TEXTURE_2D, t, 0);
    const ok = g.checkFramebufferStatus(g.FRAMEBUFFER) === g.FRAMEBUFFER_COMPLETE;
    g.bindFramebuffer(g.FRAMEBUFFER, null);
    g.deleteFramebuffer(f);
    g.deleteTexture(t);
    return ok ? g : null;
  }
  let gl = context();

  const VERT = `#version 300 es
in vec2 aPos;
uniform vec2 uTexel;
out vec2 vUv, vL, vR, vT, vB;
void main() {
  vUv = aPos * 0.5 + 0.5;
  vL = vUv - vec2(uTexel.x, 0.0);
  vR = vUv + vec2(uTexel.x, 0.0);
  vT = vUv + vec2(0.0, uTexel.y);
  vB = vUv - vec2(0.0, uTexel.y);
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;
  const HEAD = `#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv, vL, vR, vT, vB;
out vec4 o;
`;
  const F_SPLAT = HEAD + `
uniform sampler2D uTarget;
uniform float uAspect, uRadius;
uniform vec2 uPoint;
uniform vec3 uValue;
void main() {
  vec2 p = vUv - uPoint;
  p.x *= uAspect;
  o = vec4(texture(uTarget, vUv).xyz + exp(-dot(p, p) / uRadius) * uValue, 1.0);
}`;
  const F_ADVECT = HEAD + `
uniform sampler2D uVelocity, uSource;
uniform vec2 uCell;
uniform float uDt, uKeep;
void main() {
  vec2 from = vUv - uDt * texture(uVelocity, vUv).xy * uCell;
  o = uKeep * texture(uSource, from);
}`;
  /* the ink (r = blue, g = orange, b = pink): carried by the fluid, plus a push out from the window's middle while it
     pours, or a spiral pull back into it as it closes; it thickens where it is, and fades from the far side on closing */
  const F_INK = HEAD + `
uniform sampler2D uVelocity, uSource;
uniform vec2 uCell, uOrigin;
uniform float uDt, uAspect, uOut, uIn, uGrow, uFade, uTime, uCells, uReach;
void main() {
  vec2 d = vUv - uOrigin;
  d.x *= uAspect;
  float r = length(d) + 1e-4;
  vec2 dir = d / r;
  float a = atan(d.y, d.x);
  float uneven = 1.0 + 0.45 * sin(5.0 * a + uTime * 1.3) + 0.25 * sin(9.0 * a - uTime * 2.1);
  vec2 push = dir * uOut * uneven * (0.45 + 0.05 / (0.04 + r)) * uCells;
  vec2 pull = (-dir * 0.5 * (0.3 + r) + vec2(-dir.y, dir.x) * 0.7 * (0.15 + r)) * uIn * uCells;
  vec2 v = texture(uVelocity, vUv).xy + push + pull;
  vec2 from = vUv - uDt * v * uCell;
  vec3 c = (from.x < 0.0 || from.x > 1.0 || from.y < 0.0 || from.y > 1.0) ? vec3(0.0) : texture(uSource, from).rgb;
  float s = c.r + c.g + c.b;
  float grow = uGrow * uDt * smoothstep(0.03, 0.5, s) * max(0.0, 0.8 - s);
  c += c / (s + 1e-4) * grow;
  float t2 = c.r + c.g + c.b;
  if (t2 > 1.8) c *= 1.8 / t2;
  float edge = uReach * (1.0 + 0.22 * sin(4.0 * a + r * 9.0 + uTime * 2.0) + 0.12 * sin(7.0 * a - uTime * 3.0));
  c *= exp(-uDt * uFade * smoothstep(edge - 0.22, edge, r));
  o = vec4(c, 1.0);
}`;
  const F_DIVERGENCE = HEAD + `
uniform sampler2D uVelocity;
void main() {
  float L = texture(uVelocity, vL).x;
  float R = texture(uVelocity, vR).x;
  float T = texture(uVelocity, vT).y;
  float B = texture(uVelocity, vB).y;
  vec2 C = texture(uVelocity, vUv).xy;
  if (vL.x < 0.0) L = -C.x;
  if (vR.x > 1.0) R = -C.x;
  if (vT.y > 1.0) T = -C.y;
  if (vB.y < 0.0) B = -C.y;
  o = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
}`;
  const F_CURL = HEAD + `
uniform sampler2D uVelocity;
void main() {
  float L = texture(uVelocity, vL).y;
  float R = texture(uVelocity, vR).y;
  float T = texture(uVelocity, vT).x;
  float B = texture(uVelocity, vB).x;
  o = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
}`;
  const F_VORTICITY = HEAD + `
uniform sampler2D uVelocity, uCurl;
uniform float uStrength, uDt;
void main() {
  float L = texture(uCurl, vL).x;
  float R = texture(uCurl, vR).x;
  float T = texture(uCurl, vT).x;
  float B = texture(uCurl, vB).x;
  float C = texture(uCurl, vUv).x;
  vec2 f = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  f /= length(f) + 0.0001;
  f *= uStrength * C;
  f.y *= -1.0;
  o = vec4(clamp(texture(uVelocity, vUv).xy + f * uDt, -1000.0, 1000.0), 0.0, 1.0);
}`;
  const F_PRESSURE = HEAD + `
uniform sampler2D uPressure, uDivergence;
void main() {
  float L = texture(uPressure, vL).x;
  float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x;
  float B = texture(uPressure, vB).x;
  o = vec4((L + R + B + T - texture(uDivergence, vUv).x) * 0.25, 0.0, 0.0, 1.0);
}`;
  const F_GRADIENT = HEAD + `
uniform sampler2D uPressure, uVelocity;
void main() {
  float L = texture(uPressure, vL).x;
  float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x;
  float B = texture(uPressure, vB).x;
  o = vec4(texture(uVelocity, vUv).xy - vec2(R - L, T - B), 0.0, 1.0);
}`;
  const F_SCALE = HEAD + `
uniform sampler2D uSource;
uniform float uValue;
void main() { o = uValue * texture(uSource, vUv); }`;
  /* the screen: each block of grain pixels takes one colour, picked at random in proportion to the inks there, and
     thin ink breaks up into scattered blocks instead of fading, so the edge of the splash is stippled */
  const F_SHOW = HEAD + `
uniform sampler2D uInk;
uniform vec2 uInkCell;
uniform vec3 uBlue, uOrange, uPink;
uniform float uGrain, uDither;
uniform sampler2D uPhoto;
uniform float uUsePhoto;
uniform vec2 uPhotoScale, uPhotoOffset;
float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float amount(vec2 uv) { vec3 c = texture(uInk, uv).rgb; return c.r + c.g + c.b; }
void main() {
  vec3 c = max(texture(uInk, vUv).rgb, 0.0);
  float s = c.r + c.g + c.b;
  float a = 1.0 - exp(-6.0 * s);
  if (a < 0.004) { o = vec4(0.0); return; }
  vec3 w = c / max(s, 1e-4);
  vec3 soft = uBlue * w.r + uOrange * w.g + uPink * w.b;
  vec2 id = floor(gl_FragCoord.xy / uGrain);
  float h1 = hash(id);
  float h2 = hash(id * 1.71 + 3.1);
  float h3 = hash(id * 0.73 + 9.2);
  vec3 pick = h1 < w.g ? uOrange : (h1 < w.g + w.b ? uPink : uBlue);
  vec3 col = mix(soft, pick, uDither * 0.5);
  col *= 1.0 + (h2 - 0.5) * 0.10 * uDither;
  /* photo mode: the ink is only a mask, the picture underneath supplies the colour */
  col = mix(col, texture(uPhoto, vUv * uPhotoScale + uPhotoOffset).rgb, uUsePhoto);
  float dx = amount(vUv + vec2(uInkCell.x, 0.0)) - amount(vUv - vec2(uInkCell.x, 0.0));
  float dy = amount(vUv + vec2(0.0, uInkCell.y)) - amount(vUv - vec2(0.0, uInkCell.y));
  vec3 n = normalize(vec3(-dx * 1.2, -dy * 1.2, 1.0));
  col *= 0.95 + 0.07 * dot(n, normalize(vec3(-0.4, 0.5, 0.75)));
  float aa = mix(a, step(h3 * 0.96 + 0.02, a), uDither);
  o = vec4(clamp(col, 0.0, 1.0) * aa, aa);
}`;
  const F_COVER = HEAD + `
uniform sampler2D uInk;
void main() {
  vec3 c = texture(uInk, vUv).rgb;
  o = vec4(1.0 - exp(-6.0 * (c.r + c.g + c.b)), 0.0, 0.0, 1.0);
}`;

  let prog = null;
  let vel;
  let pressure;
  let divergence;
  let curl;
  let ink;
  let cover;
  let colours = null;
  let photo = null;                          /* { tex, w, h } once the picture has loaded */
  const made = { programs: [], buffers: [], vaos: [] };

  function compile(type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh));
    return sh;
  }
  function program(frag) {
    const p = gl.createProgram();
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, frag);
    gl.attachShader(p, vs);
    gl.attachShader(p, fs);
    gl.bindAttribLocation(p, 0, 'aPos');
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    made.programs.push(p);
    const u = {};
    const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < n; i++) {
      const nm = gl.getActiveUniform(p, i).name;
      u[nm] = gl.getUniformLocation(p, nm);
    }
    return { p, u };
  }
  function target(w, h, filter, internal = gl.RGBA16F, format = gl.RGBA, type = gl.HALF_FLOAT) {
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internal, w, h, 0, format, type, null);
    const fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    gl.viewport(0, 0, w, h);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    return {
      tex, fbo, w, h, cell: [1 / w, 1 / h],
      bind(unit) { gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, tex); return unit; },
      clear() { gl.bindFramebuffer(gl.FRAMEBUFFER, fbo); gl.viewport(0, 0, w, h); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); },
      drop() { gl.deleteTexture(tex); gl.deleteFramebuffer(fbo); },
    };
  }
  function pair(w, h, filter) {
    let a = target(w, h, filter);
    let b = target(w, h, filter);
    return {
      w, h, cell: [1 / w, 1 / h],
      get read() { return a; },
      get write() { return b; },
      swap() { [a, b] = [b, a]; },
      clear() { a.clear(); b.clear(); },
      drop() { a.drop(); b.drop(); },
    };
  }
  function blit(dest) {
    if (dest) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, dest.fbo);
      gl.viewport(0, 0, dest.w, dest.h);
    } else {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    }
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  function use(pr, cell) {
    gl.useProgram(pr.p);
    if (pr.u.uTexel) gl.uniform2f(pr.u.uTexel, cell ? cell[0] : 0, cell ? cell[1] : 0);
    return pr.u;
  }
  function rgb(nameVar, fallback) {
    let h = getComputedStyle(root).getPropertyValue(nameVar).trim().replace('#', '');
    if (!/^[0-9a-f]{3}([0-9a-f]{3})?$/i.test(h)) h = fallback;
    const n = parseInt(h.length === 3 ? [...h].map((x) => x + x).join('') : h.slice(0, 6), 16) || 0;
    return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
  }
  function setup() {
    prog = {
      splat: program(F_SPLAT), advect: program(F_ADVECT), ink: program(F_INK), divergence: program(F_DIVERGENCE),
      curl: program(F_CURL), vorticity: program(F_VORTICITY), pressure: program(F_PRESSURE),
      gradient: program(F_GRADIENT), scale: program(F_SCALE), show: program(F_SHOW), cover: program(F_COVER),
    };
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.disable(gl.BLEND);
    made.vaos.push(vao);
    made.buffers.push(buf);
    readColours();
    if (O.image) loadPhoto(O.image);
  }
  function loadPhoto(url) {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => {
      if (!alive || !gl) return;
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      photo = { tex, w: img.naturalWidth, h: img.naturalHeight };
      wake();
    };
    img.src = url;
  }
  function readColours() {
    colours = { blue: rgb('--ink-blue', '5d6cb9'), orange: rgb('--ink-orange', 'ff9a5e'), pink: rgb('--ink-pink', 'dc9fb2') };
  }

  /* ---------------------------------------------------------------- sizes */
  let W = 0;
  let H = 0;
  let dpr = 1;
  const origin = { x: 0.5, y: 0.5 };          /* the middle of the window, in the section's uv (y up) */
  const half = { x: 0.4, y: 0.4 };            /* the window's half size as it is drawn now, in uv */
  const coverPx = new Uint8Array(48 * 32 * 4);
  function sides(n) {
    const r = W > H ? W / H : H / W;
    const a = Math.round(n);
    const b = Math.round(n * r);
    return W > H ? [b, a] : [a, b];
  }
  function measureWindow() {
    if (!win || !W || !H) return;
    const sr = root.getBoundingClientRect();
    const wr = win.getBoundingClientRect();
    origin.x = (wr.left + wr.width / 2 - sr.left) / W;
    origin.y = 1 - (wr.top + wr.height / 2 - sr.top) / H;
    half.x = wr.width / 2 / W;
    half.y = wr.height / 2 / H;
  }
  function size() {
    const nw = root.clientWidth;
    const nh = root.clientHeight;
    const changed = nw !== W || nh !== H;
    W = nw;
    H = nh;
    measureWindow();
    if (!gl || !prog || !changed || !W || !H) return;
    dpr = Math.min(window.devicePixelRatio || 1, 1.5, Math.sqrt(1.4e6 / (W * H)));
    cv.width = Math.round(W * dpr);
    cv.height = Math.round(H * dpr);
    [vel, pressure, divergence, curl, ink, cover].forEach((t) => t && t.drop());
    const n = Math.max(32, O.grid * (TOUCH ? 0.72 : 1));
    const [gw, gh] = sides(n);
    const [iw, ih] = sides(n * 2.2);
    vel = pair(gw, gh, gl.LINEAR);
    pressure = pair(gw, gh, gl.NEAREST);
    divergence = target(gw, gh, gl.NEAREST);
    curl = target(gw, gh, gl.NEAREST);
    ink = pair(iw, ih, gl.LINEAR);
    cover = target(48, 32, gl.LINEAR, gl.RGBA8, gl.RGBA, gl.UNSIGNED_BYTE);
    if (phase === 'open' || phase === 'opening') fillAll();
    wake();
  }
  /* a new size after the splash: the section starts full of ink, already settled, with a few veins of colour */
  function fillAll() {
    const blobs = [
      [0.5, 0.5, 3.0, [1.0, 0.12, 0.16]],
      [0.08, 0.12, 0.08, [0.1, 0.9 * O.orange * 2, 0.2]],
      [0.95, 0.55, 0.06, [0.1, 0.2, 0.9 * O.pink * 2]],
      [0.15, 0.85, 0.06, [0.2, 0.1, 0.8 * O.pink * 2]],
      [0.85, 0.1, 0.07, [0.1, 0.8 * O.orange * 2, 0.1]],
    ];
    blobs.forEach(([x, y, r, v]) => splat(ink, x, y, v, r));
  }

  /* ---------------------------------------------------------------- the fluid */
  function splat(field, x, y, value, radius) {
    const u = use(prog.splat);
    gl.uniform1f(u.uAspect, W / H);
    gl.uniform2f(u.uPoint, x, y);
    gl.uniform1f(u.uRadius, radius);
    gl.uniform1i(u.uTarget, field.read.bind(0));
    gl.uniform3f(u.uValue, value[0], value[1], value[2] || 0);
    blit(field.write);
    field.swap();
  }
  const fx = { out: 0, inn: 0, grow: 0, fade: 0, reach: 9 };
  let clock = 0;
  function simulate(dt) {
    const c = vel.cell;
    let u;
    if (O.swirl > 0) {
      u = use(prog.curl, c);
      gl.uniform1i(u.uVelocity, vel.read.bind(0));
      blit(curl);
      u = use(prog.vorticity, c);
      gl.uniform1i(u.uVelocity, vel.read.bind(0));
      gl.uniform1i(u.uCurl, curl.bind(1));
      gl.uniform1f(u.uStrength, O.swirl);
      gl.uniform1f(u.uDt, dt);
      blit(vel.write);
      vel.swap();
    }
    u = use(prog.divergence, c);
    gl.uniform1i(u.uVelocity, vel.read.bind(0));
    blit(divergence);
    u = use(prog.scale, c);
    gl.uniform1i(u.uSource, pressure.read.bind(0));
    gl.uniform1f(u.uValue, 0.8);
    blit(pressure.write);
    pressure.swap();
    u = use(prog.pressure, c);
    gl.uniform1i(u.uDivergence, divergence.bind(1));
    for (let i = 0; i < O.iterations; i++) {
      gl.uniform1i(u.uPressure, pressure.read.bind(0));
      blit(pressure.write);
      pressure.swap();
    }
    u = use(prog.gradient, c);
    gl.uniform1i(u.uPressure, pressure.read.bind(0));
    gl.uniform1i(u.uVelocity, vel.read.bind(1));
    blit(vel.write);
    vel.swap();
    u = use(prog.advect, c);
    gl.uniform2f(u.uCell, c[0], c[1]);
    gl.uniform1f(u.uDt, dt);
    gl.uniform1i(u.uVelocity, vel.read.bind(0));
    gl.uniform1i(u.uSource, vel.read.bind(0));
    gl.uniform1f(u.uKeep, Math.pow(0.975, dt * 60));
    blit(vel.write);
    vel.swap();
    u = use(prog.ink, ink.cell);
    gl.uniform2f(u.uCell, c[0], c[1]);
    gl.uniform2f(u.uOrigin, origin.x, origin.y);
    gl.uniform1f(u.uDt, dt);
    gl.uniform1f(u.uAspect, W / H);
    gl.uniform1f(u.uOut, fx.out);
    gl.uniform1f(u.uIn, fx.inn);
    gl.uniform1f(u.uGrow, fx.grow);
    gl.uniform1f(u.uFade, fx.fade);
    gl.uniform1f(u.uTime, clock);
    gl.uniform1f(u.uCells, vel.h);
    gl.uniform1f(u.uReach, fx.reach);
    gl.uniform1i(u.uVelocity, vel.read.bind(0));
    gl.uniform1i(u.uSource, ink.read.bind(1));
    blit(ink.write);
    ink.swap();
  }
  function show() {
    let u = use(prog.show);
    gl.uniform1i(u.uInk, ink.read.bind(0));
    gl.uniform2f(u.uInkCell, ink.cell[0], ink.cell[1]);
    gl.uniform3fv(u.uBlue, colours.blue);
    gl.uniform3fv(u.uOrange, colours.orange);
    gl.uniform3fv(u.uPink, colours.pink);
    gl.uniform1f(u.uGrain, Math.max(1, O.grain * dpr));
    gl.uniform1f(u.uDither, clamp(O.dither, 0, 1));
    gl.uniform1f(u.uUsePhoto, photo ? 1 : 0);
    if (photo) {
      /* cover-fit the picture to the section */
      const r = (W / H) / (photo.w / photo.h);
      const sc = r > 1 ? [1, 1 / r] : [r, 1];
      gl.uniform2f(u.uPhotoScale, sc[0], sc[1]);
      gl.uniform2f(u.uPhotoOffset, (1 - sc[0]) / 2, (1 - sc[1]) / 2);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, photo.tex);
      gl.uniform1i(u.uPhoto, 1);
    }
    blit(null);
    u = use(prog.cover);
    gl.uniform1i(u.uInk, ink.read.bind(0));
    blit(cover);
  }

  /* the jets: spaced round the window's edge, aimed outwards and swinging, mostly blue with bursts of orange and pink.
     They start just inside the edge, so the ink seems to spill out from under the window */
  let jetT = 0;
  function jets(dt, strength) {
    jetT += dt;
    measureWindow();
    const short = Math.min(W, H);
    const cellsPerPx = Math.max(vel.w, vel.h) / Math.max(W, H);
    const n = Math.max(1, Math.round(O.jets));
    for (let i = 0; i < n; i++) {
      const th = (i / n) * Math.PI * 2 + jetT * 0.35;
      /* a point on the window's outline (a rounded box, as a superellipse), pulled in a little */
      const cx = Math.cos(th);
      const sy = Math.sin(th);
      const k = 1 / Math.pow(Math.pow(Math.abs(cx), 4) + Math.pow(Math.abs(sy), 4), 0.25);
      const px = clamp(origin.x + cx * k * half.x * 0.94, 0.015, 0.985);
      const py = clamp(origin.y + sy * k * half.y * 0.94, 0.015, 0.985);
      /* outwards from the window's middle, in screen terms, then swung */
      const out = Math.atan2((py - origin.y) * H, (px - origin.x) * W);
      const a = out + 0.7 * Math.sin(jetT * 5.3 + i * 2.4) + 0.25 * Math.sin(jetT * 13.1 + i);
      const speed = (760 + 380 * Math.sin(jetT * 7 + i * 1.7)) * strength * (short / 600) * cellsPerPx;
      const which = i % 3;
      const share = which === 1 ? O.orange : which === 2 ? O.pink : 0;
      const pulse = which && Math.sin(jetT * 3.4 + i * 0.9) > 1 - 2 * share ? 1 : 0;
      const ink3 = [0.5 * strength * (1 - pulse), which === 1 ? 1.5 * strength * pulse : 0, which === 2 ? 1.5 * strength * pulse : 0];
      splat(vel, px, py, [Math.cos(a) * speed, Math.sin(a) * speed], 0.0016);
      splat(ink, px, py, ink3, 0.0024);
    }
  }

  /* the well under the window: while the push carries ink outwards, ink keeps welling up behind the window, so the
     middle never empties and the splash spreads out as rings of changing colour */
  function pour(dt) {
    const k = clamp(fx.out / 1.3, 0, 1);
    if (k <= 0.001) return;
    const r = Math.max(0.01, Math.min(half.x * (W / H), half.y) * 0.7);
    const amt = 4.5 * dt * k;
    /* the colour comes in turns (blue, orange, blue, pink...), so it spreads as bands, not as an even mix */
    const wave = Math.sin(clock * 2.6);
    const po = clamp((wave - (1 - 2 * O.orange)) / 0.25, 0, 1);
    const pp = clamp((-wave - (1 - 2 * O.pink)) / 0.25, 0, 1);
    splat(ink, origin.x, origin.y, [amt * (1 - 0.85 * Math.max(po, pp)), amt * po, amt * 1.35 * pp], r * r);
  }

  /* ---------------------------------------------------------------- every frame */
  let running = false;
  let lastT = 0;
  let quietSince = 0;
  let phase = 'closed';                   /* closed, waiting, opening, open, closing */
  const stir = [];
  function wake() {
    if (running || !alive || !gl || !prog) return;
    running = true;
    lastT = performance.now();
    quietSince = lastT;
    raf = requestAnimationFrame(frame);
  }
  function frame(now) {
    if (!alive) return;
    const dt = Math.min((now - lastT) / 1000, 1 / 30);
    lastT = now;
    if (!gl || !vel) { running = false; return; }
    clock += dt;
    schedule(dt);
    if (phase === 'opening') {
      if (jetsOn > 0) jets(dt, jetsOn);
      pour(dt);
    }
    while (stir.length) {
      const [x, y, dx, dy, k] = stir.shift();
      splat(vel, x, y, [dx, dy], 0.0014);
      if (k > 0) splat(ink, x, y, [0.02 * k, 0.12 * k * (O.orange > 0 ? 1 : 0), 0.08 * k * (O.pink > 0 ? 1 : 0)], 0.0016);
    }
    simulate(dt);
    show();
    if (phase === 'opening') readCover();
    if (phase === 'closed' || phase === 'waiting') { running = false; return; }
    /* settled and left alone, the frames stop */
    if (phase === 'open' && now - quietSince > 3800) { running = false; return; }
    raf = requestAnimationFrame(frame);
  }

  let phaseT = 0;
  let filled = false;
  let filledAt = -1;
  let jetsOn = 0;
  let zoomed = false;
  function schedule(dt) {
    if (phase !== 'opening' && phase !== 'closing') return;
    phaseT += dt;
    const t = phaseT;
    const OPEN = O.splash;
    if (phase === 'opening') {
      const k = 1.3 * (t < 0.2 ? easeOut(t / 0.2) : 1 - inOut(clamp((t - 0.2) / OPEN, 0, 1)));
      if (filled && filledAt < 0) filledAt = t;
      const letGo = filledAt < 0 ? 1 : 1 - clamp((t - filledAt) / 0.6, 0, 1);
      fx.out = Math.max(k, 0.45 * letGo) * (filledAt < 0 ? 1 : letGo);
      fx.grow = 2.4 * easeIn(clamp((t - OPEN * 0.1) / (OPEN * 0.6), 0, 1));
      jetsOn = 1 - easeIn(clamp(t / (OPEN * 0.9), 0, 1));
      if (!zoomed && t >= OPEN * O.zoomAt) zoomOut();
      if ((filledAt >= 0 && t - filledAt > 0.6 && t >= OPEN * 0.8) || t > OPEN * 4) {
        phase = 'open';
        fx.out = 0;
        jetsOn = 0;
        if (!zoomed) zoomOut();
        quietSince = performance.now();
      }
    } else {
      fx.grow = Math.max(0, fx.grow - dt * 12);
      fx.inn = 0.5 * easeOut(clamp(t / (O.close * 0.4), 0, 1));
      fx.fade = 26;
      fx.reach = 1.9 * (1 - inOut(clamp(t / O.close, 0, 1))) - 0.15;
      if (t >= O.close + 0.2) {
        phase = 'closed';
        ink.clear();
        vel.clear();
        pressure.clear();
        Object.assign(fx, { out: 0, inn: 0, grow: 0, fade: 0, reach: 9 });
      }
    }
  }

  /* how covered the section is, from a 48 x 32 picture read back every few frames */
  let readTick = 0;
  function readCover() {
    if (++readTick % 4) return;
    gl.bindFramebuffer(gl.FRAMEBUFFER, cover.fbo);
    gl.readPixels(0, 0, 48, 32, gl.RGBA, gl.UNSIGNED_BYTE, coverPx);
    let least = 255;
    for (let j = 1; j < 31; j++) for (let i = 1; i < 47; i++) least = Math.min(least, coverPx[(j * 48 + i) * 4]);
    filled = least > 240;
  }

  /* ---------------------------------------------------------------- the window */
  function zoomOut() {
    zoomed = true;
    root.classList.add('is-zoomed');
    if (O.onReveal) O.onReveal();
  }
  function zoomBack() {
    zoomed = false;
    root.classList.remove('is-zoomed');
  }

  /* ---------------------------------------------------------------- playing and reversing */
  let delayTimer = 0;
  let played = false;
  function play() {
    if (!alive || phase === 'opening' || phase === 'open' || phase === 'waiting') return;
    played = true;
    root.classList.add('is-splashed');
    phase = 'waiting';
    clearTimeout(delayTimer);
    delayTimer = setTimeout(start, Math.max(0, O.delay) * 1000);
  }
  function start() {
    if (!alive) return;
    if (O.onSplash) O.onSplash();
    if (!gl || !prog) {
      /* reduced motion, or no WebGL: a still stippled wash fades in (CSS), and the window zooms with no ink behind */
      phase = 'open';
      zoomOut();
      return;
    }
    size();
    measureWindow();
    phase = 'opening';
    phaseT = 0;
    filled = false;
    filledAt = -1;
    jetT = 0;
    readTick = 0;
    Object.assign(fx, { out: 0, inn: 0, grow: 0, fade: 0, reach: 9 });
    wake();
  }
  function reverse() {
    if (!alive) return;
    clearTimeout(delayTimer);
    root.classList.remove('is-splashed');
    zoomBack();
    if (!gl || !prog || phase === 'closed' || phase === 'waiting') { phase = 'closed'; return; }
    phase = 'closing';
    phaseT = 0;
    fx.out = 0;
    jetsOn = 0;
    wake();
  }
  /* back to the start at once, with no closing animation (for a replay button) */
  function reset() {
    clearTimeout(delayTimer);
    root.classList.remove('is-splashed', 'is-zoomed');
    zoomed = false;
    phase = 'closed';
    played = false;
    if (gl && ink) {
      ink.clear(); vel.clear(); pressure.clear();
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }
  }

  /* ---------------------------------------------------------------- the trigger: AnimatedContent's rule */
  let io = null;
  if ('IntersectionObserver' in window) {
    const t = clamp(O.threshold, 0, 0.95);
    io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          play();
          if (O.once) { io.disconnect(); io = null; }
        } else if (!O.once && played && e.boundingClientRect.top > 0) {
          /* only when it leaves downwards, i.e. the reader scrolled back up past it */
          reverse();
        }
      });
    }, { rootMargin: `0px 0px -${Math.round(t * 100)}% 0px`, threshold: 0 });
    io.observe(root);
  } else {
    play();
  }

  /* the pointer stirs the ink round the window (not over it: the window is for working in) */
  let lastP = null;
  on(root, 'pointermove', (e) => {
    if (!gl || !prog || !O.stir || (phase !== 'open' && phase !== 'opening')) return;
    if (win && win.contains(e.target)) { lastP = null; return; }
    const r = root.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = 1 - (e.clientY - r.top) / r.height;
    if (lastP) {
      const cellsPerPx = Math.max(vel.w, vel.h) / Math.max(W, H);
      const dx = (x - lastP[0]) * W * cellsPerPx;
      const dy = (y - lastP[1]) * H * cellsPerPx;
      const sp = Math.hypot(dx, dy);
      if (sp > 0.05) stir.push([x, y, dx * 22 * O.stir, dy * 22 * O.stir, clamp((sp - 1.2) / 6, 0, 1)]);
      if (stir.length > 8) stir.shift();
    }
    lastP = [x, y];
    quietSince = performance.now();
    wake();
  });
  on(root, 'pointerleave', () => { lastP = null; });

  /* ---------------------------------------------------------------- it starts */
  if (gl) {
    try { setup(); } catch (e) { gl = null; prog = null; }
  }
  if (!gl) root.classList.add('is-still');
  size();
  const ro = new ResizeObserver(() => size());
  ro.observe(root);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => alive && size());
  if (gl) {
    on(cv, 'webglcontextlost', (e) => { e.preventDefault(); running = false; cancelAnimationFrame(raf); });
  }

  return {
    play,
    reverse,
    reset,
    replay() { reset(); requestAnimationFrame(() => play()); },
    destroy() {
      alive = false;
      cancelAnimationFrame(raf);
      clearTimeout(delayTimer);
      if (io) io.disconnect();
      ro.disconnect();
      cleanups.forEach((undo) => undo());
      if (gl && !gl.isContextLost()) {
        [vel, pressure, divergence, curl, ink, cover].forEach((t) => t && t.drop());
        if (photo) gl.deleteTexture(photo.tex);
        made.programs.forEach((p) => gl.deleteProgram(p));
        made.buffers.forEach((b) => gl.deleteBuffer(b));
        made.vaos.forEach((v) => gl.deleteVertexArray(v));
      }
      root.classList.remove('is-splashed', 'is-zoomed', 'is-still');
    },
  };
}
