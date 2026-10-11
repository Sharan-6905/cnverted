"use client";

// Adapted from the user-supplied Lead Gen Scroll Story HTML.
// Keep its choreography and sample content isolated from the page shell.
import { Component, Fragment } from "react";
import "./lead-discovery-artwork.css";

export default class LeadDiscoveryArtwork extends Component {
  state = {};
  componentDidMount() {
    this._alive = true;
    this._onResize = () => this._measure();
    this._measure();
    this._resizeObserver = new ResizeObserver(this._onResize);
    if (this._pin) this._resizeObserver.observe(this._pin);
    this.props.onReady?.();
  }

  componentWillUnmount() {
    this._alive = false;
    this._resizeObserver?.disconnect();
  }

  _measure() {
    const vw = this._pin?.clientWidth || 1200;
    const vh = this._pin?.clientHeight || 720;
    const mob = window.matchMedia("(max-width: 639px)").matches;
    const k = Math.round(Math.max(0.2, Math.min(
      (vw - (mob ? 12 : 56)) / (mob ? 460 : 1200),
      (vh - (mob ? 12 : 40)) / (mob ? 1000 : 720),
      mob ? 1.4 : 1.25,
    )) * 1000) / 1000;
    if (this.state.k !== k || this.state.mob !== mob) this.setState({ k, mob });
  }

  renderVals() {
    var self = this;
    if (!this._refs) {
      this._refs = {
        root: function (el) { if (el) self._root = el; },
        sec: function (el) { if (el) self._sec = el; },
        pin: function (el) { if (el) self._pin = el; }
      };
    }
    var S = this.state || {};
    var PR = Math.max(0, Math.min(17, (this.props.progress || 0) * 17 / 0.96));
    /* P drives the original 16-stage timeline; stage 7 (waterfall) is inserted by holding P at 6 while PR runs 6 -> 7. */
    var P = PR < 6 ? PR : PR < 7 ? 6 : PR - 1;
    var intro = this.props.intro || 0;
    var M = !!S.mob;
    var RM = !!S.rm;
    var W = M ? 460 : 1200;
    var H = M ? 1000 : 720;
    var k = typeof S.k === 'number' && S.k > 0 ? S.k : 1;
    var len = Number(this.props.stageLength);
    if (!(len >= 40 && len <= 240)) len = 85;
    var i, j;

    function cl(v, a, b) { return v < a ? a : v > b ? b : v; }
    function ease(t) { t = cl(t, 0, 1); return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
    function backOut(t) { t = cl(t, 0, 1); var c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); }
    function lin(v, a, b) { return cl((v - a) / (b - a), 0, 1); }
    function sg(v, a, b) { return ease((v - a) / (b - a)); }
    function lerp(a, b, t) { return a + (b - a) * t; }
    function at(v) { return Array.isArray(v) ? (M ? v[1] : v[0]) : v; }
    function kf(keys) {
      if (P <= keys[0][0]) return at(keys[0][1]);
      for (var q = 1; q < keys.length; q++) {
        if (P <= keys[q][0]) {
          var ka = keys[q - 1], kb = keys[q];
          return lerp(at(ka[1]), at(kb[1]), ease((P - ka[0]) / (kb[0] - ka[0])));
        }
      }
      return at(keys[keys.length - 1][1]);
    }
    function io(a, b, c, d) { var v = sg(P, a, b); if (c !== undefined) v *= 1 - sg(P, c, d); return v; }
    function f(n, d) { return (isFinite(n) ? n : 0).toFixed(d === undefined ? 2 : d); }
    function op(v) { return f(cl(v, 0, 1), 3); }
    function tr(x, y, s) {
      return 'translate3d(calc(' + f(x + W / 2, 1) + 'px - 50%), calc(' + f(y + H / 2, 1) + 'px - 50%), 0) scale(' + f(s, 4) + ')';
    }
    function A(o, x, y, s) {
      var oo = cl(o, 0, 1);
      var sc = s === undefined ? 1 : s;
      return { o: f(oo, 3), t: tr(x, y, sc), v: oo < 0.004 ? 'hidden' : 'visible', x: x, y: y, s: sc, op: oo };
    }
    function rvAt(v, a, b) { var t = sg(v, a, b); return { o: f(t, 3), t: 'translate3d(0, ' + f((1 - t) * 8) + 'px, 0)' }; }
    function rv(a, b) { return rvAt(P, a, b); }
    function ctrl(x1, y1, x2, y2, vert) {
      if (vert) { var my = (y2 - y1) * 0.5; return [x1, y1 + my, x2, y2 - my]; }
      var mx = (x2 - x1) * 0.5;
      return [x1 + mx, y1, x2 - mx, y2];
    }
    function wire(x1, y1, x2, y2, o, draw, vert) {
      var c = ctrl(x1, y1, x2, y2, vert);
      var ox = W / 2, oy = H / 2;
      var d = 'M' + f(x1 + ox, 1) + ' ' + f(y1 + oy, 1) + ' C' + f(c[0] + ox, 1) + ' ' + f(c[1] + oy, 1) + ' ' + f(c[2] + ox, 1) + ' ' + f(c[3] + oy, 1) + ' ' + f(x2 + ox, 1) + ' ' + f(y2 + oy, 1);
      var dr = draw === undefined ? 1 : cl(draw, 0, 1);
      var oo = cl(o, 0, 1);
      return { d: d, o: f(oo, 3), off: f((1 - dr) * 1400, 1), fo: f(oo * dr * dr, 3) };
    }
    function bez(x1, y1, x2, y2, t, vert) {
      var c = ctrl(x1, y1, x2, y2, vert);
      var u = 1 - t;
      return {
        x: u * u * u * x1 + 3 * u * u * t * c[0] + 3 * u * t * t * c[2] + t * t * t * x2,
        y: u * u * u * y1 + 3 * u * u * t * c[1] + 3 * u * t * t * c[3] + t * t * t * y2
      };
    }
    function pt2(p) { return f(p[0], 1) + ' ' + f(p[1], 1); }
    function metaball(x1, y1, r1, x2, y2, r2) {
      var dx = x2 - x1, dy = y2 - y1, d = Math.sqrt(dx * dx + dy * dy);
      if (r1 <= 0 || r2 <= 0 || d > r1 + r2 * 2.5 || d <= Math.abs(r1 - r2) + 1) return 'M0 0';
      var u1 = 0, u2 = 0;
      if (d < r1 + r2) {
        u1 = Math.acos(cl((r1 * r1 + d * d - r2 * r2) / (2 * r1 * d), -1, 1));
        u2 = Math.acos(cl((r2 * r2 + d * d - r1 * r1) / (2 * r2 * d), -1, 1));
      }
      var ang = Math.atan2(dy, dx), ms = Math.acos(cl((r1 - r2) / d, -1, 1)), v = 0.5, HP = Math.PI / 2;
      var a1 = ang + u1 + (ms - u1) * v, a2 = ang - u1 - (ms - u1) * v;
      var a3 = ang + Math.PI - u2 - (Math.PI - u2 - ms) * v, a4 = ang - Math.PI + u2 + (Math.PI - u2 - ms) * v;
      function pv(cx, cy, a, r) { return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; }
      var p1 = pv(x1, y1, a1, r1), p2 = pv(x1, y1, a2, r1), p3 = pv(x2, y2, a3, r2), p4 = pv(x2, y2, a4, r2);
      var d13 = Math.sqrt((p1[0] - p3[0]) * (p1[0] - p3[0]) + (p1[1] - p3[1]) * (p1[1] - p3[1]));
      var hk = Math.min(v * 2.4, d13 / (r1 + r2)) * Math.min(1, (d * 2) / (r1 + r2));
      var h1 = pv(p1[0], p1[1], a1 - HP, r1 * hk), h2 = pv(p2[0], p2[1], a2 + HP, r1 * hk);
      var h3 = pv(p3[0], p3[1], a3 + HP, r2 * hk), h4 = pv(p4[0], p4[1], a4 - HP, r2 * hk);
      return 'M' + pt2(p1) + ' C' + pt2(h1) + ' ' + pt2(h3) + ' ' + pt2(p3) + ' A' + f(r2, 1) + ' ' + f(r2, 1) + ' 0 ' + (d > r1 ? 1 : 0) + ' 0 ' + pt2(p4) + ' C' + pt2(h4) + ' ' + pt2(h2) + ' ' + pt2(p2) + ' Z';
    }
    function lensPath(x1, y1, x2, y2, r) {
      var dx = x2 - x1, dy = y2 - y1, d = Math.sqrt(dx * dx + dy * dy);
      if (d >= 2 * r - 1 || d < 1) return 'M0 0';
      var h = Math.sqrt(r * r - (d * d) / 4), mx = (x1 + x2) / 2, my = (y1 + y2) / 2, nx = -dy / d, ny = dx / d;
      var a = [mx + nx * h, my + ny * h], b = [mx - nx * h, my - ny * h];
      return 'M' + pt2(a) + ' A' + f(r, 1) + ' ' + f(r, 1) + ' 0 0 0 ' + pt2(b) + ' A' + f(r, 1) + ' ' + f(r, 1) + ' 0 0 0 ' + pt2(a) + ' Z';
    }
    var NW = { d: 'M0 0', o: '0', off: '1400', fo: '0' };
    var w = {};
    var IC = {
      market: 'M3 17l6-6 4 4 8-8 M15 7h6v6',
      chat: 'M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-4 3.5V17H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z M8 11h.01 M12 11h.01 M16 11h.01',
      doc: 'M6 3h9l4 4v14H6z M14 3v5h5 M9 12h7 M9 16h5',
      people: 'M9 11a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4z M3 20c0-3.3 2.7-5.8 6-5.8s6 2.5 6 5.8 M17 11a2.4 2.4 0 1 0 0-4.8 M17 14c2.4.4 4 2.6 4 5.2',
      hash: 'M9 4L7 20 M17 4l-2 16 M4 9h16 M3 15h16',
      bldg: 'M4 20h16 M6 20V9l6-4 6 4v11 M10 20v-5h4v5'
    };

    // Close framing for the URL, profile and single ICP card. Wider scenes retain
    // their original safe bounds so connected cards never get cropped.
    var cameraZoom = kf([[0, [1.12, 1.72]], [1.85, [1.12, 1.72]],
      [2.3, 1], [3.3, 1], [3.55, [1.25, 1.65]],
      [3.95, [1.25, 1.65]], [4.3, 1]]);
    k *= cameraZoom;
    var cameraX = M ? 0 : kf([[0, 0], [9.15, 0], [9.5, 150], [10.9, 150], [11.4, 0]]);

    /* ---------- chrome: stage label + progress rail ---------- */
    var fadeK = Math.max(sg(intro, 0, 0.3), sg(PR, 0, 0.1));
    var NS = 17;
    var cs = Math.min(NS - 1, Math.floor(PR));
    var TITLES = ['Drop a link', 'Understand the business', 'Product and market', 'Find the ICP', 'ICP in detail', 'Scan for signals', 'Waterfall enrichment', 'Find leads', 'Refine the ICP', 'Personalise outreach', 'Pick the channel', 'Send the campaign', 'Replies and meetings', 'Follow up', 'Push to CRM', 'Agent steps in', 'Revenue and the next loop'];
    var hud = [];
    for (i = 0; i < NS; i++) {
      var hin = i === 0 ? 1 : sg(PR, i - 0.04, i + 0.1);
      var hout = i === NS - 1 ? 0 : sg(PR, i + 0.9, i + 1.0);
      hud.push({ n: (i < 9 ? '0' : '') + (i + 1), title: TITLES[i], o: op(hin * (1 - hout)), t: 'translate3d(0, ' + f((1 - hin) * 8 - hout * 8) + 'px, 0)' });
    }
    var railW = M ? 380 : 560;
    var railY = H / 2 - 29;
    var loopGlow = sg(PR, 16.86, 16.97);
    var ticks = [];
    for (i = 0; i < NS; i++) {
      var tc = 'tk';
      if (fadeK > 0.5 && i <= cs) tc += ' on';
      if (fadeK > 0.5 && i === cs) tc += ' cur';
      if (i === 3 && loopGlow > 0.5) tc += ' loop';
      ticks.push({ cls: tc, l: f((i / (NS - 1)) * 100, 3) });
    }
    var railFill = f(fadeK > 0.5 ? cl(PR / (NS - 1), 0, 1) : 0, 4);

    /* ---------- 01 drop a link -> 02 company profile ---------- */
    var URL = 'cnvrted.com';
    var typeK = Math.max(lin(intro, 0.3, 0.72), lin(P, 0.02, 0.45));
    var nch = Math.round(URL.length * typeK);
    var goOn = intro >= 0.86 || P > 0.5;
    var hero = A(fadeK * (1 - sg(P, 2.0, 2.32)), kf([[2.0, 0], [2.38, [-200, 0]]]), kf([[2.0, 0], [2.38, [0, -150]]]), lerp(0.97, 1, fadeK) * kf([[2.0, 1], [2.38, 0.45]]));
    hero.w = f(kf([[0.8, [520, 400]], [1.22, 400]]), 1);
    hero.h = f(kf([[0.8, 64], [1.22, 430]]), 1);
    var heroIn = op(1 - sg(P, 0.82, 1.0));
    var caretO = op(nch < URL.length || P < 0.7 ? 1 - sg(P, 0.66, 0.8) : 0);
    var phO = op(nch === 0 ? 1 : 0);
    var goCls = 'go' + (goOn ? ' on' : '');
    var profO = op(sg(P, 0.98, 1.18));
    var pr0 = rv(1.05, 1.22), pr1 = rv(1.22, 1.38), pr2 = rv(1.36, 1.52), pr3 = rv(1.5, 1.66);
    var profA = op(io(1.05, 1.15, 1.62, 1.72)), profB = op(sg(P, 1.66, 1.76));
    var scanV = io(1.05, 1.15, 1.7, 1.85);
    var scanO = op(scanV);
    var scanCls = 'scan' + (scanV > 0.01 && !RM ? ' run' : '');
    var CH = [{ p: '/', k: 'Homepage' }, { p: '/pricing', k: 'Plans' }, { p: '/customers', k: 'Case studies' }, { p: '/careers', k: 'Open roles' }];
    var CHP = M ? [[-112, -250], [112, -250], [-112, 250], [112, 250]] : [[-330, -95], [330, -60], [-320, 95], [330, 105]];
    var chips = [];
    for (i = 0; i < 4; i++) {
      var ca0 = 1.3 + i * 0.07;
      var cin = sg(P, ca0, ca0 + 0.2);
      var cout = sg(P, 1.85, 2.05);
      var chx = lerp(CHP[i][0] * 1.12, CHP[i][0], cin);
      var chy = lerp(CHP[i][1] * 1.08, CHP[i][1], cin);
      chx = lerp(chx, chx * 0.45, cout);
      chy = lerp(chy, chy * 0.45, cout);
      var chA = A(cin * (1 - cout), chx, chy, lerp(0.9, 1, cin));
      chA.p = CH[i].p;
      chA.k = CH[i].k;
      chips.push(chA);
      w['c' + i] = wire(chx, chy, M ? chx * 0.3 : 0, M ? 0 : chy * 0.3, chA.op * 0.9, cin, M);
    }

    /* ---------- 03 product + market: solid liquid merge ---------- */
    var icpW = M ? 360 : 320;
    var R0 = M ? 120 : 170;
    var bIn = sg(P, 2.08, 2.36);
    var bR = R0 * kf([[2.1, 0.86], [2.6, 1], [3.0, 1], [3.26, 0.8]]);
    var b1x = kf([[2.1, [-320, 0]], [2.62, [-115, 0]], [3.0, [-115, 0]], [3.26, 0]]);
    var b1y = kf([[2.1, [0, -240]], [2.62, [0, -72]], [3.0, [0, -72]], [3.26, 0]]);
    var b2x = -b1x, b2y = -b1y;
    var morphT = sg(P, 3.18, 3.42);
    var bl = {
      o: op(bIn * (1 - sg(P, 3.22, 3.27))),
      x1: f(b1x + W / 2, 1), y1: f(b1y + H / 2, 1), x2: f(b2x + W / 2, 1), y2: f(b2y + H / 2, 1), r: f(bR, 1),
      br: metaball(b1x + W / 2, b1y + H / 2, bR, b2x + W / 2, b2y + H / 2, bR),
      lens: lensPath(b1x + W / 2, b1y + H / 2, b2x + W / 2, b2y + H / 2, bR),
      lo: op(io(2.55, 2.8, 3.0, 3.16))
    };
    var mw = lerp(2 * bR, icpW, morphT), mh = lerp(2 * bR, 249, morphT);
    bl.mw = f(mw, 1);
    bl.mh = f(mh, 1);
    bl.mx = f(W / 2 - mw / 2, 1);
    bl.my = f(H / 2 - mh / 2, 1);
    bl.mr = f(lerp(bR, 16, morphT), 1);
    bl.mo = op(sg(P, 3.15, 3.19) * (1 - sg(P, 3.44, 3.52)));
    bl.mp = f((1 - morphT) * 100, 1);
    var tO = io(2.35, 2.55, 2.92, 3.06);
    var ptx = A(tO, M ? b1x : b1x - 55, M ? b1y - 52 : b1y, 1);
    var mtx = A(tO, M ? b2x : b2x + 55, M ? b2y + 52 : b2y, 1);
    var lensL = A(io(2.68, 2.86, 2.96, 3.08), 0, 0, 1);

    /* ---------- 04 ICP (recurring card) ---------- */
    var icpO = io(3.34, 3.46, 8.05, 8.32) + (M ? 0 : io(14.3, 14.55, 15.0, 15.28));
    icpO *= 1 - sg(PR, 6.0, 6.2) * (1 - sg(PR, 6.98, 7.12));
    var icp = A(icpO,
      kf([[3.1, 0], [5.02, 0], [5.35, [-340, 0]], [6.02, [-340, 0]], [6.35, [-470, 0]], [7.02, [-470, 0]], [7.35, [-390, 0]], [8.02, [-390, 0]], [8.35, [-520, 0]], [14.2, [40, 0]], [15.0, [40, 0]], [15.3, [-120, 0]]]),
      kf([[3.1, 0], [5.02, 0], [5.35, [0, -250]], [6.02, [0, -250]], [6.35, [0, -318]], [7.02, [0, -318]], [7.35, [0, -262]], [8.02, [0, -262]], [8.35, [0, -262]], [14.2, [170, 250]], [15.3, [170, 250]]]),
      kf([[3.1, 1], [5.02, 1], [5.35, [0.92, 0.82]], [6.02, [0.92, 0.82]], [6.35, [0.72, 0.5]], [7.02, [0.72, 0.5]], [7.35, [0.96, 0.72]], [8.02, [0.96, 0.72]], [8.35, 0.85], [14.2, [0.62, 0.5]], [15.0, [0.62, 0.5]], [15.3, [0.5, 0.4]]]));
    var ir0 = rv(3.42, 3.54), ir1 = rv(3.52, 3.64), ir2 = rv(3.62, 3.74), ir3 = rv(4.15, 4.35);
    var icpU = sg(P, 7.4, 7.65);
    var icpOld = op(1 - icpU), icpNew = op(icpU);
    var icpB1 = op(1 - icpU), icpB2 = op(icpU);
    var icpEm = f(sg(P, 7.5, 7.72), 3);
    var regO = op(1 - 0.6 * sg(P, 7.42, 7.6));
    var regS = f(sg(P, 7.45, 7.65), 3);
    var icpExH = f(45 * sg(P, 4.15, 4.35) + 28 * sg(P, 7.58, 7.78), 1);
    var icpNote = rv(7.62, 7.8);
    var icpGlow = op(io(7.3, 7.45, 7.7, 7.95));
    var icpHH = (249 + 45 * sg(P, 4.15, 4.35) + 28 * sg(P, 7.58, 7.78)) / 2;

    /* ---------- 05 ICP in detail ---------- */
    var DP = M ? [[-113, -262], [113, -262], [-113, 262], [113, 262]] : [[-375, -150], [375, -150], [-375, 150], [375, 150]];
    var detW = M ? 214 : 260;
    var dets = [];
    for (i = 0; i < 4; i++) {
      var da1 = 4.12 + i * 0.08;
      var din = sg(P, da1, da1 + 0.33);
      var dout = sg(P, 4.95, 5.22);
      var dxx = lerp(lerp(0, DP[i][0], din), icp.x, dout);
      var dyy = lerp(lerp(0, DP[i][1], din), icp.y, dout);
      var dA = A(din * (1 - dout), dxx, dyy, lerp(0.6, 1, din) * lerp(1, 0.5, dout));
      dets.push(dA);
      w['d' + i] = wire(icp.x, icp.y, dxx, dyy, dA.op * 0.9, din, M);
    }

    /* ---------- 06 scan for signals (real time PR) ---------- */
    var HUB = M ? { x: 0, y: 105 } : { x: 170, y: 0 };
    var SR = M ? 150 : 180;
    var fd = Math.round((SR + 34) * 2);
    var fh = fd / 2;
    var fIn = sg(PR, 5.05, 5.3), fOut = sg(PR, 6.02, 6.3);
    var scanF = A(fIn * (1 - fOut), HUB.x, HUB.y, lerp(0.9, 1, fIn) * lerp(1, 0.85, fOut));
    var scanFCls = 'act field' + (scanF.op > 0.01 && !RM ? ' run' : '');
    var trR = SR * 0.62;
    var trC = 2 * Math.PI * trR;
    var trD1 = f(trC * 0.06, 1) + ' ' + f(trC, 1);
    var trD2 = f(trC * 0.24, 1) + ' ' + f(trC, 1);
    var trO1 = f(-trC * 0.18, 1);
    var sparks = [];
    var seed = 11;
    function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
    for (j = 0; j < 22; j++) {
      var sa = rnd() * Math.PI * 2;
      var srad = lerp(SR * 0.34, SR * 1.08, rnd());
      var big = rnd() < 0.27;
      var sz = big ? 6 : 2.5 + rnd() * 1.5;
      sparks.push({ cls: 'spx' + (big ? ' hi' : ''), x: f(fh + Math.cos(sa) * srad - sz / 2, 1), y: f(fh + Math.sin(sa) * srad - sz / 2, 1), z: f(sz, 1), d: f(rnd() * 2.8, 2), u: f(2.2 + rnd() * 1.8, 2) });
    }
    var SRC = [
      { name: 'Market signals', res: '3 signals found', ic: IC.market },
      { name: 'Reddit discussions', res: '2 threads found', ic: IC.chat, logo: '/brands/reddit.svg' },
      { name: 'LinkedIn posts', res: '4 posts found', ic: IC.doc, logo: '/brands/linkedin.svg' },
      { name: 'LinkedIn activity', res: '2 updates found', ic: IC.people, logo: '/brands/linkedin.svg' },
      { name: 'Social conversations', res: '1 mention found', ic: IC.hash },
      { name: 'Public business data', res: '2 records found', ic: IC.bldg }
    ];
    var ANG = [-90, -30, 30, 90, 150, 210];
    var POSC = ['t', 'r', 'r', 'b', 'l', 'l'];
    var FR = M ? [[-150, -240], [0, -240], [150, -240]] : [[-120, -205], [90, -205], [300, -205]];
    var FRAG_OF = [2, 0, 1, 1, 0, 2];
    var srcs = [];
    var doneN = 0;
    for (i = 0; i < 6; i++) {
      var an = (ANG[i] * Math.PI) / 180;
      var nx = HUB.x, ny = M ? -60 + i * 66 : -180 + i * 72;
      var ni = sg(PR, 5.12 + i * 0.06, 5.36 + i * 0.06);
      var s0 = 5.34 + i * 0.085;
      var prg = ease(lin(PR, s0, s0 + 0.15));
      var dn = sg(PR, s0 + 0.15, s0 + 0.19);
      var ckT = lin(PR, s0 + 0.16, s0 + 0.22);
      var bt = lin(PR, s0 + 0.15, s0 + 0.32);
      var pend = 1 - sg(PR, s0 - 0.03, s0);
      var scn = (1 - pend) * (1 - dn);
      if (PR >= s0 + 0.17) doneN++;
      var fo = sg(PR, 6.0 + i * 0.02, 6.24 + i * 0.02);
      var fr = FR[FRAG_OF[i]];
      var sx0 = nx, sy0 = ny + (1 - ni) * 70;
      var nA = A(ni * (1 - fo), lerp(sx0, fr[0], fo), lerp(sy0, fr[1], fo), lerp(0.96, 1, ni) * lerp(1, 0.4, fo));
      nA.cls = 'act card src';
      nA.oks = f(ckT > 0 ? backOut(ckT) : 0.6, 3);
      var pinX = M ? -150 : icp.x + 160 * icp.s, pinY = M ? icp.y + icpHH * icp.s : icp.y;
      var scw = wire(pinX, pinY, nA.x - (M ? 200 : 190) * nA.s, nA.y, nA.op * 0.9, sg(PR, 5.14 + i * 0.06, 5.4 + i * 0.06), M);
      scw.fo = op(nA.op * Math.max(scn, 0.25 * dn));
      w['sc' + i] = scw;
      nA.name = SRC[i].name;
      nA.res = SRC[i].res;
      nA.ic = SRC[i].ic;
      nA.logo = SRC[i].logo;
      nA.icCls = 'src-ic ic' + (scn > 0.5 ? ' on' : '');
      nA.pend = op(pend);
      nA.trk = op(1 - pend);
      nA.off = f(125.66 * (1 - prg), 2);
      nA.disc = op(dn);
      nA.ico = op(1 - dn);
      var dang = ((-90 + 360 * prg) * Math.PI) / 180;
      nA.dx = f(24 + 20 * Math.cos(dang) - 4, 2);
      nA.dy = f(24 + 20 * Math.sin(dang) - 4, 2);
      nA.dotO = op(prg > 0.001 && prg < 0.999 ? 1 : 0);
      nA.cko = f(26 * (1 - ease(ckT)), 2);
      nA.cks = f(ckT > 0 ? backOut(ckT) : 0.4, 3);
      nA.bo = op(bt > 0 && bt < 1 ? (1 - bt) * 0.6 : 0);
      nA.bs = f(lerp(1, 2.3, bt), 3);
      nA.q = op(pend);
      nA.sc = op(scn);
      nA.dn = op(dn);
      srcs.push(nA);
    }
    var fGlow = op(0.25 + 0.75 * (doneN / 6));
    var sparkO = op(0.45 + 0.55 * (doneN / 6));
    var scanDone = String(doneN);
    var srcW = M ? 400 : 380;
    var scanHd = A(fIn * (1 - fOut), HUB.x, M ? -112 : -250, 1);
    var icpPin = A(fIn * (1 - fOut), M ? -150 : icp.x + 160 * icp.s, M ? icp.y + icpHH * icp.s : icp.y, 1);

    /* ---------- 07 waterfall enrichment (real time PR) ---------- */
    var FR2Y = M ? -150 : -112;
    var fragW = M ? 140 : 190;
    var FRG = [
      { src: 'Reddit discussion', tx: 'Peak-season ticket backlog', ic: IC.chat },
      { src: 'LinkedIn post', tx: 'Bloomcart launches home line', ic: IC.doc },
      { src: 'Market signal', tx: 'Hiring 4 support roles', ic: IC.market }
    ];
    var WFC = M ? { x: 0, y: 110 } : { x: 90, y: 90 };
    var wfcW = 420;
    var wfcHH = M ? 175 : 155;
    var NODE = M ? { x: 0, y: -215 } : { x: -290, y: 0 };
    var frags = [];
    for (j = 0; j < 3; j++) {
      var fi = sg(PR, 6.08 + j * 0.05, 6.28 + j * 0.05);
      var fdrop = sg(PR, 6.3 + j * 0.04, 6.44 + j * 0.04);
      var fm = sg(PR, 6.5 + j * 0.03, 6.66 + j * 0.03);
      var gx = lerp(FR[j][0], WFC.x, fm);
      var gy = lerp(lerp(FR[j][1], FR2Y, fdrop), WFC.y - 60, fm) - (1 - fi) * 16;
      var gA = A(fi * (1 - fm), gx, gy, lerp(1, 0.6, fm));
      var vt = lin(PR, 6.42 + j * 0.04, 6.5 + j * 0.04);
      gA.vo = op(vt > 0 ? 1 : 0);
      gA.vs = f(vt > 0 ? backOut(vt) : 0.5, 3);
      gA.src = FRG[j].src;
      gA.tx = FRG[j].tx;
      gA.ic = FRG[j].ic;
      frags.push(gA);
      w['wf' + j] = wire(FR[j][0], FR2Y + 30, WFC.x + (j - 1) * 90, WFC.y - wfcHH, sg(PR, 6.36, 6.46) * (1 - sg(PR, 6.62, 6.72)), sg(PR, 6.36, 6.52), true);
    }
    var wci = sg(PR, 6.55, 6.7), wce = sg(PR, 7.0, 7.28);
    var wfc = A(wci * (1 - wce), lerp(WFC.x, NODE.x, wce), lerp(WFC.y, NODE.y, wce), lerp(0.94, 1, wci) * lerp(1, 0.2, wce));
    var we0 = rvAt(PR, 6.66, 6.74), we1 = rvAt(PR, 6.71, 6.79), we2 = rvAt(PR, 6.76, 6.84);
    var wsk = ease(lin(PR, 6.8, 6.92));
    var wfScore = String(Math.round(92 * wsk));
    var wfOff = f(175.93 * (1 - 0.92 * wsk), 2);
    var wfGlow = op(sg(PR, 6.9, 6.96));
    var wfFoot = rvAt(PR, 6.92, 6.98);
    var TH = [6.05, 6.32, 6.55, 6.8, 6.93];
    var STEPS = ['Signal discovery', 'Source verification', 'Data enrichment', 'Intent scoring', 'Qualified lead'];
    var wIdx = 0;
    for (j = 0; j < 5; j++) if (PR >= TH[j]) wIdx = j;
    var allDone = PR >= 6.98;
    var wfSteps = [];
    var fillv = 0;
    for (j = 0; j < 5; j++) {
      if (j < 4) fillv += sg(PR, TH[j + 1] - 0.08, TH[j + 1]) / 4;
      var scl = 'wf-s' + (j < wIdx || (allDone && j === 4) ? ' done' : j === wIdx ? ' cur' : '');
      var pon = sg(PR, TH[j], TH[j] + 0.04) * (j < 4 ? 1 - sg(PR, TH[j + 1], TH[j + 1] + 0.04) : 1);
      if (j === 0 && PR < TH[0]) pon = 1;
      wfSteps.push({ cls: scl, y: j * 86, n: '0' + (j + 1), t: STEPS[j], po: op(pon) });
    }
    var wfFill = f(fillv, 3);
    var wfVis = sg(PR, 6.02, 6.2) * (1 - sg(PR, 7.0, 7.2));
    var wfRail = A(M ? 0 : wfVis, -455, 0, 1);
    var wfPill = A(M ? wfVis : 0, 0, -335, 1);
    var wfIdx = String(wIdx + 1);

    /* ---------- 08 find leads, with intent scores ---------- */
    var node = A(io(6.05, 6.25, 7.0, 7.25), NODE.x, NODE.y, kf([[6.05, 0.7], [6.3, 1]]));
    w.f0 = wire(icp.x, icp.y, NODE.x, NODE.y, io(6.1, 6.25, 6.95, 7.15), sg(P, 6.1, 6.3), M);
    var colX = M ? [-150, 0, 150] : [-85, 165, 415];
    var colY = M ? -130 : -150;
    var slotY0 = M ? -72 : -85, slotDY = M ? 66 : 72;
    var colW = M ? 140 : 232;
    var COLN = ['Cold', 'Target', 'Intent'], COLC = ['cold', 'tgt', 'int'];
    var cols = [];
    for (i = 0; i < 3; i++) {
      var hcin = sg(P, 6.25 + i * 0.05, 6.45 + i * 0.05);
      var hdim = i < 2 ? 1 - 0.65 * sg(P, 7.05, 7.3) : 1;
      var colA = A(hcin * hdim * (1 - sg(P, 8.0, 8.22)), colX[i], colY + (1 - hcin) * 6, 1);
      colA.cls = 'colh ' + COLC[i];
      colA.name = COLN[i];
      colA.n = i === 2 ? '3' : '2';
      cols.push(colA);
    }
    var LEADS = [
      { n: 'Tom Becker', i: 'TB', co: 'Northpine', r: 'Support Mgr', g: 0, sc: 48, src: 'Public data' },
      { n: 'Lucas Meyer', i: 'LM', co: 'Saltbox', r: 'Ops Director', g: 0, sc: 41, src: 'Market signal' },
      { n: 'Daniel Ortiz', i: 'DO', co: 'Fernway', r: 'VP Operations', g: 1, sc: 76, src: 'LinkedIn activity' },
      { n: 'Hana Sato', i: 'HS', co: 'Verdana Home', r: 'CX Manager', g: 1, sc: 71, src: 'LinkedIn post' },
      { n: 'Maya Chen', i: 'MC', co: 'Bloomcart', r: 'Head of CX', g: 2, sc: 92, src: '3 sources' },
      { n: 'Priya Nair', i: 'PN', co: 'Kettle & Co', r: 'CX Lead', g: 2, sc: 88, src: 'Market signal' },
      { n: 'Aisha Bello', i: 'AB', co: 'Loopwear', r: 'Support Lead', g: 2, sc: 84, src: 'Reddit' }
    ];
    var leadW = M ? 140 : 232;
    var MAYA9 = M ? { x: 0, y: -300 } : { x: -380, y: -10 };
    var ROUTE = M ? { x: 0, y: -322 } : { x: -250, y: 0 };
    var rowIdx = [0, 0, 0];
    var leads = [];
    for (i = 0; i < 7; i++) {
      var LD = LEADS[i];
      var rr = rowIdx[LD.g]++;
      var sx = colX[LD.g], sy = slotY0 + rr * slotDY;
      var lt = sg(P, 6.3 + i * 0.05, 6.62 + i * 0.05);
      var lx = lerp(NODE.x, sx, lt), ly = lerp(NODE.y, sy, lt), ls = lerp(0.5, 1, lt), lo = lt;
      if (LD.g < 2) lo *= 1 - 0.65 * sg(P, 7.05, 7.3);
      if (i === 4) {
        var m9 = sg(P, 8.02, 8.35);
        lx = lerp(lx, MAYA9.x, m9);
        ly = lerp(ly, MAYA9.y, m9);
        ls = lerp(ls, M ? 1.12 : 1.1, m9);
        var m10 = sg(P, 9.0, 9.25);
        lx = lerp(lx, ROUTE.x, m10);
        ly = lerp(ly, ROUTE.y, m10);
        ls = lerp(ls, 0.4, m10);
        lo *= 1 - m10;
      } else {
        lo *= 1 - sg(P, 8.0, 8.22);
      }
      var lA = A(lo, lx, ly, ls);
      var lsk = ease(lin(P, 6.45 + i * 0.05, 6.78 + i * 0.05));
      lA.n = LD.n;
      lA.i = LD.i;
      lA.sd = LD.co + ' · ' + LD.src;
      lA.sc = String(Math.round(LD.sc * lsk));
      lA.ro = f(100.53 * (1 - (LD.sc / 100) * lsk), 2);
      lA.rc = 'rp' + (LD.sc < 60 ? ' lo' : '');
      lA.cls = 'act card lead g' + LD.g;
      leads.push(lA);
    }

    /* ---------- 09 refine the ICP (feedback streams) ---------- */
    var stO = io(7.12, 7.3, 7.85, 8.05), stD = sg(P, 7.12, 7.42);
    for (j = 0; j < 3; j++) {
      var LJ = leads[4 + j];
      w['s' + j] = M
        ? wire(LJ.x, LJ.y - 28, icp.x + (j - 1) * 60, icp.y + icpHH * icp.s, stO, stD, true)
        : wire(LJ.x - leadW / 2, LJ.y, icp.x + (icpW / 2) * icp.s, icp.y + (j - 1) * 40, stO, stD, false);
    }

    /* ---------- 10 personalise outreach (interactive demo composer) ---------- */
    var compW = M ? 420 : 470;
    var CB = M ? { x: 0, y: 40 } : { x: 140, y: -10 };
    var cpin = sg(P, 8.12, 8.38), cpout = sg(P, 9.0, 9.28);
    var cpx = lerp(CB.x + (M ? 0 : 60), CB.x, cpin), cpy = lerp(CB.y + (M ? 40 : 0), CB.y, cpin);
    var comp = A(cpin * (1 - cpout), lerp(cpx, ROUTE.x, cpout), lerp(cpy, ROUTE.y, cpout), lerp(1, 0.25, cpout));
    var SEG = ['Hi Maya, saw your ', 'product launch last week', '. Thought Halcyon could help your team absorb the ', 'launch-week ticket spike', ' and build on that momentum.'];
    var total = SEG.join('').length;
    var tk = lin(P, 8.36, 8.84);
    var vis = Math.round(total * tk);
    var acc = 0;
    var segs = [];
    for (j = 0; j < SEG.length; j++) {
      var sl = SEG[j].length;
      var shown = SEG[j].slice(0, Math.max(0, Math.min(sl, vis - acc)));
      var endP = 8.36 + ((acc + sl) / total) * 0.48;
      var hk = j % 2 === 1 ? sg(P, endP, endP + 0.06) : 0;
      segs.push({ t: shown, pct: f(hk * 14, 2), cls: j % 2 === 1 ? 'hl' : 'pl' });
      acc += sl;
    }
    var compCaret = op(tk < 1 ? comp.op : 0);
    var gm = P >= 8.48 ? 'on' : 'off';
    var sd = P >= 8.9 ? 'sent' : 'idle';
    var gmLabel = gm === 'on' ? 'Gmail connected' : gm === 'connecting' ? 'Connecting…' : 'Connect Gmail';
    var gmCls = 'btn gm' + (gm === 'on' ? ' ok' : '');
    var gmDis = true;
    var sendLabel = sd === 'sent' ? 'Sent' : sd === 'sending' ? 'Sending…' : 'Send';
    var sendDis = true;
    var compSt = sd === 'sent' ? 'Demo only, no email was delivered'
      : sd === 'sending' ? 'Sending (demo)…'
      : gm === 'on' ? 'Demo connection, no email will be sent'
      : gm === 'connecting' ? 'Authorising (demo)…'
      : 'Sample outreach · simulated delivery';
    var mayaL = leads[4];
    var cmO = io(8.25, 8.42, 8.92, 9.08), cmD = sg(P, 8.25, 8.45);
    w.cm = M
      ? wire(mayaL.x, mayaL.y + 30 * mayaL.s, comp.x, comp.y - 150 * comp.s, cmO, cmD, true)
      : wire(mayaL.x + (leadW / 2) * mayaL.s, mayaL.y, comp.x - (compW / 2) * comp.s, comp.y, cmO, cmD, false);

    /* ---------- 11 pick the channel ---------- */
    var route = A(io(9.08, 9.3, 11.0, 11.25), ROUTE.x, ROUTE.y, kf([[9.08, 0.7], [9.32, 1]]));
    var chW = M ? 214 : 360, chH = M ? 260 : 236;
    var IB = M ? { x: -113, y: 0 } : { x: 400, y: -150 };
    var DB = M ? { x: 113, y: 0 } : { x: 400, y: 150 };
    var chOut = sg(P, 13.02, 13.28);
    var inIn = sg(P, 9.42, 9.68), dmIn = sg(P, 9.5, 9.76);
    var inbox = A(inIn * (1 - chOut), IB.x + (M ? 0 : 40 * (1 - inIn) + 40 * chOut), IB.y + (M ? 30 * (1 - inIn) + 30 * chOut : 0), lerp(0.96, 1, inIn));
    var dm = A(dmIn * (1 - chOut), DB.x + (M ? 0 : 40 * (1 - dmIn) + 40 * chOut), DB.y + (M ? 30 * (1 - dmIn) + 30 * chOut : 0), lerp(0.96, 1, dmIn));
    var inPrev = op(io(9.5, 9.7, 10.0, 10.12)), inList = op(sg(P, 10.02, 10.15));
    var dmPrev = op(io(9.58, 9.78, 10.0, 10.12)), dmList = op(sg(P, 10.02, 10.15));
    var rO = io(9.2, 9.32, 11.0, 11.22), rD = sg(P, 9.22, 9.55);
    var RS = M ? { x: ROUTE.x, y: ROUTE.y + 28 } : { x: ROUTE.x + 28, y: ROUTE.y };
    var IE = M ? { x: IB.x, y: IB.y - chH / 2 } : { x: IB.x - chW / 2, y: IB.y };
    var DE = M ? { x: DB.x, y: DB.y - chH / 2 } : { x: DB.x - chW / 2, y: DB.y };
    w.r0 = wire(RS.x, RS.y, IE.x, IE.y, rO, rD, M);
    w.r1 = wire(RS.x, RS.y, DE.x, DE.y, rO, rD, M);

    /* ---------- 12 send the campaign ---------- */
    var ORDER = [['in', 0], ['dm', 0], ['in', 1], ['dm', 1], ['in', 2], ['dm', 2], ['in', 3]];
    var IN_L = [4, 2, 0, 1], DM_L = [5, 6, 3];
    var REP = { 4: 11.14, 5: 11.24, 2: 12.5, 6: 12.58 };
    var trav = [];
    var arrive = {};
    var delivered = 0;
    for (j = 0; j < 7; j++) {
      var a3 = 10.1 + j * 0.1;
      var tt = lin(P, a3, a3 + 0.3);
      var tE = ORDER[j][0] === 'in' ? IE : DE;
      var ptb = bez(RS.x, RS.y, tE.x, tE.y, ease(tt), M);
      var to = tt > 0 && tt < 1 ? cl(Math.sin(Math.PI * tt) * 1.8, 0, 1) : 0;
      trav.push(A(to, ptb.x, ptb.y, 1));
      arrive[ORDER[j][0] + ORDER[j][1]] = a3;
      if (P >= a3 + 0.36) delivered++;
    }
    function mkRow(li, a) {
      var L = LEADS[li];
      var ap = sg(P, a + 0.22, a + 0.32);
      var dl = sg(P, a + 0.3, a + 0.4);
      var rAt = REP[li];
      var rp = rAt ? sg(P, rAt, rAt + 0.1) : 0;
      var early = !!rAt && rAt < 12;
      var nr = early ? 0 : io(12.05, 12.15, 12.36, 12.44);
      var fu = early ? 0 : sg(P, 12.38, 12.48) * (1 - rp);
      var dsh = dl * (1 - Math.max(nr, fu, rp));
      var dim = early ? 1 : 1 - 0.42 * sg(P, 12.05, 12.15) * (1 - rp);
      return { n: L.n, i: L.i, c: L.co, o: op(ap * dim), t: 'translate3d(' + f((1 - ap) * -6) + 'px, 0, 0)', d: op(dsh), nr: op(nr), fu: op(fu), rp: op(rp), tint: op(rp * 0.9) };
    }
    var inRows = [], dmRows = [];
    for (j = 0; j < IN_L.length; j++) inRows.push(mkRow(IN_L[j], arrive['in' + j]));
    for (j = 0; j < DM_L.length; j++) dmRows.push(mkRow(DM_L[j], arrive['dm' + j]));
    var progW = M ? 300 : 230;
    var PG = M ? { x: 0, y: 172 } : { x: -250, y: 104 };
    var prog = A(io(10.05, 10.2, 11.0, 11.2), PG.x, PG.y, 1);
    var progN = String(delivered);
    var progB = f(delivered / 7, 3);

    /* ---------- 13 replies and meetings ---------- */
    var replyW = M ? 380 : 290;
    var RPE = M ? { x: 0, y: 205 } : { x: 20, y: -205 };
    var rin = sg(P, 11.2, 11.42);
    var reply = A(rin * (1 - sg(P, 12.0, 12.2)), lerp(IB.x, RPE.x, rin), lerp(IB.y, RPE.y, rin), lerp(0.6, 1, rin));
    var replyInv = rv(11.55, 11.68);
    var calW = M ? 420 : 340, calH = M ? 242 : 274, rowH = M ? 34 : 42;
    var cal = A(io(11.32, 11.55, 13.45, 13.7),
      kf([[11.3, [-310, 0]], [11.55, [-330, 0]], [13.0, [-330, 0]], [13.35, [-460, 0]]]),
      kf([[11.3, [40, -242]], [11.55, [40, -262]], [13.0, [40, -262]], [13.35, [-60, -272]]]),
      kf([[11.3, 0.94], [11.55, 1], [13.0, 1], [13.35, [0.78, 0.86]]]));
    var cw = (calW - 32 - 34 - 20) / 5;
    function slot(c, r) {
      return {
        x: cal.x + (-calW / 2 + 16 + 34 + 4 + c * (cw + 4) + cw / 2) * cal.s,
        y: cal.y + (-calH / 2 + 56 + 18 + 4 + r * (rowH + 4) + rowH / 2) * cal.s
      };
    }
    var DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], TIMES = ['9:00', '10:30', '13:00', '15:30'];
    var BUSY = { '0-0': 1, '1-2': 1, '2-1': 1, '3-3': 1, '4-0': 1, '0-3': 1 };
    var selThu = sg(P, 11.62, 11.72), fillThu = sg(P, 11.76, 11.9);
    var selFri = sg(P, 12.6, 12.68), fillFri = sg(P, 12.68, 12.8);
    function cell(cls, tx, so, fo, ev) {
      return { cls: cls, tx: tx, so: op(so), fo: op(fo), ft: 'scale(' + f(lerp(0.85, 1, cl(fo, 0, 1)), 3) + ')', ev: ev };
    }
    var calCells = [cell('cc hd', '', 0, 0, '')];
    for (j = 0; j < 5; j++) calCells.push(cell('cc hd', DAYS[j], 0, 0, ''));
    for (var r2 = 0; r2 < 4; r2++) {
      calCells.push(cell('cc tm', TIMES[r2], 0, 0, ''));
      for (var c2 = 0; c2 < 5; c2++) {
        var key = c2 + '-' + r2;
        var ccls = 'cc sl' + (BUSY[key] ? ' busy' : '');
        if (c2 === 3 && r2 === 1) calCells.push(cell(ccls, '', selThu * (1 - fillThu), fillThu, 'Bloomcart'));
        else if (c2 === 4 && r2 === 2) calCells.push(cell(ccls, '', selFri * (1 - fillFri), fillFri, 'Fernway'));
        else calCells.push(cell(ccls, '', 0, 0, ''));
      }
    }
    var thu = slot(3, 1);
    w.rp = M ? NW : wire(reply.x - 60, reply.y + 50, thu.x, thu.y - rowH / 2, io(11.5, 11.6, 11.95, 12.1), sg(P, 11.5, 11.7), true);

    /* ---------- 14 follow up ---------- */
    var FU = M ? { x: 0, y: 190 } : { x: 400, y: 0 };
    var fuc = A(io(12.1, 12.28, 12.9, 13.1), FU.x, FU.y, kf([[12.1, 0.9], [12.3, 1]]));
    var fuA = op(1 - sg(P, 12.34, 12.42)), fuB = op(sg(P, 12.36, 12.44));

    /* ---------- 15 push to CRM ---------- */
    var pipeW = M ? 440 : 760, pipeH = M ? 464 : 330;
    var pipeO = io(13.12, 13.4, 15.3, 15.52);
    var pipeDim = 1 - 0.12 * sg(P, 14.0, 14.3);
    var pipe = A(pipeO * pipeDim,
      kf([[13.12, [170, 0]], [13.42, [130, 0]], [14.02, [130, 0]], [14.35, [-300, 0]]]),
      kf([[13.12, [40, 90]], [13.42, [40, 60]], [14.02, [40, 60]], [14.35, [-40, -250]]]),
      kf([[13.12, 0.97], [13.42, 1], [14.02, 1], [14.35, [0.66, 0.6]], [15.3, [0.66, 0.6]], [15.55, 0.5]]));
    var syncO = op(sg(P, 13.75, 13.9));
    var dealW = M ? 146 : 155;
    var PCX = [-274.5, -91.5, 91.5, 274.5], PRY = [-29, 55];
    var MLY = [-130, -30, 70, 170], MCX = [-29, 125];
    function ploc(col, row) { return M ? { x: MCX[row], y: MLY[col] } : { x: PCX[col], y: PRY[row] }; }
    function pglob(lc) { return { x: pipe.x + lc.x * pipe.s, y: pipe.y + lc.y * pipe.s }; }
    var DEALS = [
      { co: 'Bloomcart', who: 'Maya Chen', val: '$18,000', st: 'Meeting · Thu 10:30' },
      { co: 'Fernway', who: 'Daniel Ortiz', val: '$12,400', st: 'Meeting · Fri 13:00' },
      { co: 'Kettle & Co', who: 'Priya Nair', val: '$9,600', st: 'Replied' },
      { co: 'Loopwear', who: 'Aisha Bello', val: '$8,200', st: 'Replied' }
    ];
    var dealsOut = sg(P, 15.3, 15.52);
    var deals = [];
    var landed = 0, won = 0, qual = 0;
    for (j = 0; j < 2; j++) {
      var sp = j === 0 ? thu : slot(4, 2);
      var dap = sg(P, 13.22 + j * 0.06, 13.34 + j * 0.06);
      var mv = sg(P, 13.36 + j * 0.08, 13.7 + j * 0.08);
      var wn = sg(P, 15.02 + j * 0.06, 15.22 + j * 0.06);
      var lc0 = ploc(1, j), lc1 = ploc(3, j);
      var gp = pglob({ x: lerp(lc0.x, lc1.x, wn), y: lerp(lc0.y, lc1.y, wn) });
      var dX = lerp(sp.x, gp.x, mv);
      var dY = lerp(sp.y, gp.y, mv) - Math.sin(Math.PI * mv) * (M ? 30 : 46);
      var dealA = A(dap * (1 - dealsOut) * pipeDim, dX, dY, lerp(0.4, pipe.s, mv));
      dealA.co = DEALS[j].co;
      dealA.who = DEALS[j].who;
      dealA.val = DEALS[j].val;
      dealA.st = DEALS[j].st;
      dealA.s1 = op(1 - wn);
      dealA.s2 = op(wn);
      deals.push(dealA);
      if (mv > 0.95) landed++;
      if (wn > 0.5) won++;
    }
    for (j = 0; j < 2; j++) {
      var dq = sg(P, 13.45 + j * 0.07, 13.66 + j * 0.07);
      var gq = pglob(ploc(0, j));
      var qA = A(dq * (1 - dealsOut) * pipeDim, gq.x, gq.y - (1 - dq) * 26 * pipe.s, pipe.s);
      qA.co = DEALS[2 + j].co;
      qA.who = DEALS[2 + j].who;
      qA.val = DEALS[2 + j].val;
      qA.st = DEALS[2 + j].st;
      qA.s1 = '1.000';
      qA.s2 = '0.000';
      deals.push(qA);
      if (dq > 0.6) qual++;
    }
    var pcols = [
      { name: 'Qualified', n: String(qual) },
      { name: 'Meeting booked', n: String(Math.max(0, landed - won)) },
      { name: 'Proposal', n: '0' },
      { name: 'Closed won', n: String(won) }
    ];

    /* ---------- 16 agent steps in ---------- */
    var ORB = M ? { x: 176, y: -150 } : { x: -30, y: -205 };
    var orb = A(io(14.25, 14.45, 15.05, 15.3), ORB.x, ORB.y, kf([[14.25, 0.6], [14.5, 1]]));
    var recW = M ? 420 : 400;
    var RECB = M ? { x: 0, y: -10 } : { x: 330, y: -150 };
    var recIn = sg(P, 14.4, 14.6);
    var rec = A(recIn * (1 - sg(P, 15.05, 15.28)), RECB.x, RECB.y + (1 - recIn) * 14, 1);
    var agO = io(14.42, 14.55, 15.0, 15.2), agD = sg(P, 14.42, 14.62);
    w.ag = M ? wire(ORB.x, ORB.y + 20, ORB.x - 26, RECB.y - 89, agO, agD, true) : wire(ORB.x + 20, ORB.y, RECB.x - recW / 2, ORB.y, agO, agD, false);
    var NT = [{ k: 'Seed rounds', tx: 'Subscription-box brands' }, { k: 'EU expansion', tx: 'Home-goods brands' }];
    var NTP = M ? [[-112, 135], [112, 135]] : [[228, -10], [436, -10]];
    var ntW = M ? 214 : 200;
    var nts = [];
    var nicpW = M ? 380 : 340;
    var nin = sg(P, 14.72, 14.95);
    var nicp = A(nin,
      kf([[15.3, [330, 0]], [15.6, [250, 0]]]),
      kf([[15.3, [168, 290]], [15.6, [-10, 118]]]),
      kf([[14.72, [0.92, 0.82]], [14.95, [1, 0.9]], [15.3, [1, 0.9]], [15.6, 1]]));
    var nExt = sg(P, 15.62, 15.8);
    var nicpExH = f(46 * nExt, 1);
    var nicpHH = (237 + 46 * nExt) / 2;
    var nB1 = op(1 - sg(P, 15.55, 15.65)), nB2 = op(sg(P, 15.57, 15.67));
    var nBtn = rv(15.68, 15.84);
    for (j = 0; j < 2; j++) {
      var na = 14.6 + j * 0.08;
      var ntin = sg(P, na, na + 0.2);
      var ntA = A(ntin * (1 - sg(P, 15.05, 15.28)), NTP[j][0], NTP[j][1] + (1 - ntin) * 10, lerp(0.94, 1, ntin));
      ntA.hl = op(sg(P, na + 0.12, na + 0.24));
      ntA.k = NT[j].k;
      ntA.tx = NT[j].tx;
      nts.push(ntA);
      w['n' + j] = wire(NTP[j][0], NTP[j][1] + 26, nicp.x + (j === 0 ? -60 : 60), nicp.y - nicpHH * nicp.s, io(14.78, 14.9, 15.05, 15.25), sg(P, 14.78, 14.98), true);
    }

    /* ---------- 17 revenue and the next loop ---------- */
    var sumW = M ? 420 : 380;
    var SB = M ? { x: 0, y: -200 } : { x: -280, y: -10 };
    var sIn = sg(P, 15.3, 15.55);
    var sum = A(sIn, SB.x, SB.y, lerp(0.92, 1, sIn));
    var revV = Math.round(30400 * ease(lin(P, 15.35, 15.75)));
    var rev = '$' + revV.toLocaleString('en-US');
    var sparkW = sumW - 40;
    var SPK = [[0, 50], [0.14, 47], [0.28, 44], [0.42, 38], [0.56, 33], [0.7, 24], [0.85, 15], [1, 6]];
    var sparkD = '';
    for (j = 0; j < SPK.length; j++) sparkD += (j === 0 ? 'M' : ' L') + f(2 + SPK[j][0] * (sparkW - 4), 1) + ' ' + f(SPK[j][1], 1);
    var sparkBase = 'M2 54 L' + f(sparkW - 2, 1) + ' 54';
    var sparkOff = f((1 - sg(P, 15.35, 15.8)) * 700, 1);
    var t4x = -railW / 2 + (3 * railW) / (NS - 1);
    var nBot = nicp.y + nicpHH * nicp.s + 4;
    w.lp = wire(nicp.x, nBot, t4x, railY - 10, sg(P, 15.6, 15.7), sg(P, 15.62, 15.95), true);
    var loopL = A(sg(P, 15.84, 15.96), (nicp.x + t4x) / 2, (nBot + railY - 10) / 2, 1);

    var WK = ['c0', 'c1', 'c2', 'c3', 'd0', 'd1', 'd2', 'd3', 'sc0', 'sc1', 'sc2', 'sc3', 'sc4', 'sc5', 'wf0', 'wf1', 'wf2', 'f0', 's0', 's1', 's2', 'cm', 'r0', 'r1', 'rp', 'ag', 'n0', 'n1', 'lp'];
    for (j = 0; j < WK.length; j++) if (!w[WK[j]]) w[WK[j]] = NW;

    return {
      refs: this._refs,
      cameraX: cameraX,
      rootCls: (M ? 'mob' : 'desk') + (RM ? ' rm' : ''),
      secH: f(100 + (NS + 0.5) * len, 1) + 'vh',
      W: W, H: H, k: f(k, 4),
      hudO: op(fadeK), hud: hud, railW: railW, railFill: railFill, ticks: ticks,
      w: w,
      hero: hero, heroIn: heroIn, url: URL.slice(0, nch), caretO: caretO, phO: phO, goCls: goCls,
      profO: profO, pr0: pr0, pr1: pr1, pr2: pr2, pr3: pr3, profA: profA, profB: profB, scanO: scanO, scanCls: scanCls,
      chips: chips,
      bl: bl, ptx: ptx, mtx: mtx, lensL: lensL,
      icpW: icpW, icp: icp, ir0: ir0, ir1: ir1, ir2: ir2, ir3: ir3, icpOld: icpOld, icpNew: icpNew, icpB1: icpB1, icpB2: icpB2,
      icpEm: icpEm, regO: regO, regS: regS, icpExH: icpExH, icpNote: icpNote, icpGlow: icpGlow,
      detW: detW, det0: dets[0], det1: dets[1], det2: dets[2], det3: dets[3],
      fd: fd, fh: f(fh, 1), scanF: scanF, scanFCls: scanFCls, trR: f(trR, 1), trD1: trD1, trD2: trD2, trO1: trO1,
      srcW: srcW, scanHd: scanHd, icpPin: icpPin, sparks: sparks, sparkO: sparkO, fGlow: fGlow, scanDone: scanDone, srcs: srcs,
      wfRail: wfRail, wfFill: wfFill, wfSteps: wfSteps, wfPill: wfPill, wfIdx: wfIdx,
      fragW: fragW, frags: frags, wfcW: wfcW, wfc: wfc, we0: we0, we1: we1, we2: we2,
      wfScore: wfScore, wfOff: wfOff, wfGlow: wfGlow, wfFoot: wfFoot,
      node: node, colW: colW, cols: cols, leadW: leadW, leads: leads,
      compW: compW, comp: comp, segs: segs, compCaret: compCaret,
      gmLabel: gmLabel, gmCls: gmCls, gmDis: gmDis,
      sendLabel: sendLabel, sendDis: sendDis, compSt: compSt,
      route: route, chW: chW, chH: chH, inbox: inbox, dm: dm, inPrev: inPrev, inList: inList, dmPrev: dmPrev, dmList: dmList,
      inRows: inRows, dmRows: dmRows, trav: trav, progW: progW, prog: prog, progN: progN, progB: progB,
      replyW: replyW, reply: reply, replyInv: replyInv, calW: calW, calH: calH, cal: cal, calCells: calCells,
      fuc: fuc, fuA: fuA, fuB: fuB,
      pipeW: pipeW, pipeH: pipeH, pipe: pipe, syncO: syncO, pcols: pcols, dealW: dealW, deals: deals,
      orb: orb, recW: recW, rec: rec, ntW: ntW, nts: nts,
      nicpW: nicpW, nicp: nicp, nicpExH: nicpExH, nB1: nB1, nB2: nB2, nBtn: nBtn,
      sumW: sumW, sum: sum, rev: rev, sparkW: sparkW, sparkD: sparkD, sparkBase: sparkBase, sparkOff: sparkOff,
      loopL: loopL
    };
  }
  render() {
    const v = this.renderVals();
    return <div className="market-story-artwork" data-active={this.props.visible}><div className={"lg " + String(v.rootCls)} data-lg-root={"1"} ref={v.refs.root} data-canvas-width={"1280"} data-canvas-height={"820"} data-document-role={"page"} data-label={"Lead-gen workflow \u2014 product film"}>
<ol className={"sr"}>
<li>{"01 Drop a link: a company website URL starts the workflow."}</li>
<li>{"02 Understand the business: the site is analysed into a company profile."}</li>
<li>{"03 Product and market: the product and the market merge into one shape."}</li>
<li>{"04 Find the ICP: the merged shape becomes an ideal customer profile."}</li>
<li>{"05 ICP in detail: pain points, tools, decision-makers and approvals."}</li>
<li>{"06 Scan for signals: market signals, Reddit discussions, LinkedIn posts, LinkedIn activity, social conversations and public business data are scanned one by one and each is checked off."}</li>
<li>{"07 Waterfall enrichment: signals pass through source verification, data enrichment and intent scoring to become a qualified lead with a 92% intent score."}</li>
<li>{"08 Find leads: leads are grouped into cold, target and intent, each with an intent score."}</li>
<li>{"09 Refine the ICP: intent leads feed back into a sharper profile."}</li>
<li>{"10 Personalise outreach: a message is written around the lead's buying trigger, followed by a simulated Gmail connection and send."}</li>
<li>{"11 Pick the channel: each message is routed to email or a LinkedIn direct message."}</li>
<li>{"12 Send the campaign: messages are delivered across both channels."}</li>
<li>{"13 Replies and meetings: a reply becomes a booked meeting."}</li>
<li>{"14 Follow up: unanswered leads get a second message and another meeting is booked."}</li>
<li>{"15 Push to CRM: qualified and booked leads land in the pipeline."}</li>
<li>{"16 Agent steps in: the agent recommends new triggers and the next ICP."}</li>
<li>{"17 Revenue and the next loop: revenue grows and the loop returns to finding the ICP."}</li>
</ol>
<section className={"seq"} data-lg-sec={"1"} ref={v.refs.sec} style={{"height": v.secH}} aria-label={"Cnvrted lead discovery, from a company URL to revenue, in seventeen automatically played scenes. All names and figures are sample data."}>
<div className={"pin"} ref={v.refs.pin}>
<div className={"stage"} style={{"width": String(v.W) + "px", "height": String(v.H) + "px", "transform": "translate(-50%, -50%) scale(" + String(v.k) + ") translateX(" + String(-v.cameraX) + "px)"}}>
<div className={"deco"} aria-hidden={"true"}>
<svg className={"wires"} width={v.W} height={v.H}>
<path className={"wire"} d={v.w.c0.d} style={{"opacity": v.w.c0.o, "strokeDashoffset": v.w.c0.off}}></path>
<path className={"flow"} d={v.w.c0.d} style={{"opacity": v.w.c0.fo}}></path>
<path className={"wire"} d={v.w.c1.d} style={{"opacity": v.w.c1.o, "strokeDashoffset": v.w.c1.off}}></path>
<path className={"flow"} d={v.w.c1.d} style={{"opacity": v.w.c1.fo}}></path>
<path className={"wire"} d={v.w.c2.d} style={{"opacity": v.w.c2.o, "strokeDashoffset": v.w.c2.off}}></path>
<path className={"flow"} d={v.w.c2.d} style={{"opacity": v.w.c2.fo}}></path>
<path className={"wire"} d={v.w.c3.d} style={{"opacity": v.w.c3.o, "strokeDashoffset": v.w.c3.off}}></path>
<path className={"flow"} d={v.w.c3.d} style={{"opacity": v.w.c3.fo}}></path>
<path className={"wire"} d={v.w.d0.d} style={{"opacity": v.w.d0.o, "strokeDashoffset": v.w.d0.off}}></path>
<path className={"flow"} d={v.w.d0.d} style={{"opacity": v.w.d0.fo}}></path>
<path className={"wire"} d={v.w.d1.d} style={{"opacity": v.w.d1.o, "strokeDashoffset": v.w.d1.off}}></path>
<path className={"flow"} d={v.w.d1.d} style={{"opacity": v.w.d1.fo}}></path>
<path className={"wire"} d={v.w.d2.d} style={{"opacity": v.w.d2.o, "strokeDashoffset": v.w.d2.off}}></path>
<path className={"flow"} d={v.w.d2.d} style={{"opacity": v.w.d2.fo}}></path>
<path className={"wire"} d={v.w.d3.d} style={{"opacity": v.w.d3.o, "strokeDashoffset": v.w.d3.off}}></path>
<path className={"flow"} d={v.w.d3.d} style={{"opacity": v.w.d3.fo}}></path>
<path className={"wire"} d={v.w.sc0.d} style={{"opacity": v.w.sc0.o, "strokeDashoffset": v.w.sc0.off}}></path>
<path className={"flow"} d={v.w.sc0.d} style={{"opacity": v.w.sc0.fo}}></path>
<path className={"wire"} d={v.w.sc1.d} style={{"opacity": v.w.sc1.o, "strokeDashoffset": v.w.sc1.off}}></path>
<path className={"flow"} d={v.w.sc1.d} style={{"opacity": v.w.sc1.fo}}></path>
<path className={"wire"} d={v.w.sc2.d} style={{"opacity": v.w.sc2.o, "strokeDashoffset": v.w.sc2.off}}></path>
<path className={"flow"} d={v.w.sc2.d} style={{"opacity": v.w.sc2.fo}}></path>
<path className={"wire"} d={v.w.sc3.d} style={{"opacity": v.w.sc3.o, "strokeDashoffset": v.w.sc3.off}}></path>
<path className={"flow"} d={v.w.sc3.d} style={{"opacity": v.w.sc3.fo}}></path>
<path className={"wire"} d={v.w.sc4.d} style={{"opacity": v.w.sc4.o, "strokeDashoffset": v.w.sc4.off}}></path>
<path className={"flow"} d={v.w.sc4.d} style={{"opacity": v.w.sc4.fo}}></path>
<path className={"wire"} d={v.w.sc5.d} style={{"opacity": v.w.sc5.o, "strokeDashoffset": v.w.sc5.off}}></path>
<path className={"flow"} d={v.w.sc5.d} style={{"opacity": v.w.sc5.fo}}></path>
<path className={"wire"} d={v.w.wf0.d} style={{"opacity": v.w.wf0.o, "strokeDashoffset": v.w.wf0.off}}></path>
<path className={"flow"} d={v.w.wf0.d} style={{"opacity": v.w.wf0.fo}}></path>
<path className={"wire"} d={v.w.wf1.d} style={{"opacity": v.w.wf1.o, "strokeDashoffset": v.w.wf1.off}}></path>
<path className={"flow"} d={v.w.wf1.d} style={{"opacity": v.w.wf1.fo}}></path>
<path className={"wire"} d={v.w.wf2.d} style={{"opacity": v.w.wf2.o, "strokeDashoffset": v.w.wf2.off}}></path>
<path className={"flow"} d={v.w.wf2.d} style={{"opacity": v.w.wf2.fo}}></path>
<path className={"wire"} d={v.w.f0.d} style={{"opacity": v.w.f0.o, "strokeDashoffset": v.w.f0.off}}></path>
<path className={"flow"} d={v.w.f0.d} style={{"opacity": v.w.f0.fo}}></path>
<path className={"wire"} d={v.w.s0.d} style={{"opacity": v.w.s0.o, "strokeDashoffset": v.w.s0.off}}></path>
<path className={"flow"} d={v.w.s0.d} style={{"opacity": v.w.s0.fo}}></path>
<path className={"wire"} d={v.w.s1.d} style={{"opacity": v.w.s1.o, "strokeDashoffset": v.w.s1.off}}></path>
<path className={"flow"} d={v.w.s1.d} style={{"opacity": v.w.s1.fo}}></path>
<path className={"wire"} d={v.w.s2.d} style={{"opacity": v.w.s2.o, "strokeDashoffset": v.w.s2.off}}></path>
<path className={"flow"} d={v.w.s2.d} style={{"opacity": v.w.s2.fo}}></path>
<path className={"wire"} d={v.w.cm.d} style={{"opacity": v.w.cm.o, "strokeDashoffset": v.w.cm.off}}></path>
<path className={"flow"} d={v.w.cm.d} style={{"opacity": v.w.cm.fo}}></path>
<path className={"wire"} d={v.w.r0.d} style={{"opacity": v.w.r0.o, "strokeDashoffset": v.w.r0.off}}></path>
<path className={"flow"} d={v.w.r0.d} style={{"opacity": v.w.r0.fo}}></path>
<path className={"wire"} d={v.w.r1.d} style={{"opacity": v.w.r1.o, "strokeDashoffset": v.w.r1.off}}></path>
<path className={"flow"} d={v.w.r1.d} style={{"opacity": v.w.r1.fo}}></path>
<path className={"wire"} d={v.w.rp.d} style={{"opacity": v.w.rp.o, "strokeDashoffset": v.w.rp.off}}></path>
<path className={"flow"} d={v.w.rp.d} style={{"opacity": v.w.rp.fo}}></path>
<path className={"wire"} d={v.w.ag.d} style={{"opacity": v.w.ag.o, "strokeDashoffset": v.w.ag.off}}></path>
<path className={"flow"} d={v.w.ag.d} style={{"opacity": v.w.ag.fo}}></path>
<path className={"wire"} d={v.w.n0.d} style={{"opacity": v.w.n0.o, "strokeDashoffset": v.w.n0.off}}></path>
<path className={"flow"} d={v.w.n0.d} style={{"opacity": v.w.n0.fo}}></path>
<path className={"wire"} d={v.w.n1.d} style={{"opacity": v.w.n1.o, "strokeDashoffset": v.w.n1.off}}></path>
<path className={"flow"} d={v.w.n1.d} style={{"opacity": v.w.n1.fo}}></path>
</svg>
<svg className={"blobs"} width={v.W} height={v.H}>
<g style={{"opacity": v.bl.o}}>
<path className={"blob"} d={v.bl.br}></path>
<circle className={"blob"} cx={v.bl.x1} cy={v.bl.y1} r={v.bl.r}></circle>
<circle className={"blob"} cx={v.bl.x2} cy={v.bl.y2} r={v.bl.r}></circle>
</g>
<path className={"blens"} d={v.bl.lens} style={{"opacity": v.bl.lo}}></path>
<rect className={"bmorph"} x={v.bl.mx} y={v.bl.my} width={v.bl.mw} height={v.bl.mh} rx={v.bl.mr} style={{"opacity": v.bl.mo, "fill": "color-mix(in oklab, var(--ac) " + String(v.bl.mp) + "%, #ffffff)"}}></rect>
</svg>
<div className={"act btx"} style={{"opacity": v.ptx.o, "transform": v.ptx.t, "visibility": v.ptx.v}}>
<span className={"lbl"}>{"Product"}</span>
<b><span>{"GTM strategy and"}</span><span>{"lead generation"}</span></b>
</div>
<div className={"act btx"} style={{"opacity": v.mtx.o, "transform": v.mtx.t, "visibility": v.mtx.v}}>
<span className={"lbl"}>{"Market"}</span>
<b><span>{"People who"}</span><span>{"need clients"}</span></b>
</div>
<div className={"act blbl"} style={{"opacity": v.lensL.o, "transform": v.lensL.t, "visibility": v.lensL.v}}>
<span className={"lbl"}>{"Overlap"}</span>
<b>{"Market opportunity"}</b>
</div>
<div className={"act card hero"} style={{"width": String(v.hero.w) + "px", "height": String(v.hero.h) + "px", "opacity": v.hero.o, "transform": v.hero.t, "visibility": v.hero.v}}>
<div className={"hero-in"} style={{"opacity": v.heroIn}}>
<svg className={"ic"} width={"18"} height={"18"} viewBox={"0 0 24 24"}><circle cx={"12"} cy={"12"} r={"9"}></circle><path d={"M3 12h18"}></path><path d={"M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9s1.3-6.4 3.8-9z"}></path></svg>
<div className={"url-w stk"}>
<span className={"url-ph"} style={{"opacity": v.phO}}>{"Paste a company website"}</span>
<span className={"url"}><span className={"url-p"}>{"https://"}</span>{v.url}<span className={"caret"} style={{"opacity": v.caretO}}></span></span>
</div>
<span className={v.goCls}><svg className={"ic"} width={"18"} height={"18"} viewBox={"0 0 24 24"}><path d={"M5 12h14"}></path><path d={"M13 6l6 6-6 6"}></path></svg></span>
</div>
<div className={"prof"} style={{"opacity": v.profO}}>
<div className={"prof-h"} style={{"opacity": v.pr0.o, "transform": v.pr0.t}}>
<span className={"logo-big"}><img src={"/demos/lead-discovery/logo.png"} alt={"Cnvrted logo"} width={"64"} height={"64"} /></span>
<span className={"prof-id"}><b>{"Cnvrted"}</b><span>{"cnvrted.com"}</span></span>
<span className={"stk prof-st"}>
<span className={"pill acc"} style={{"opacity": v.profA}}><span className={"dotp"}></span>{"Analysing"}</span>
<span className={"pill acc"} style={{"opacity": v.profB}}><svg className={"ic"} width={"12"} height={"12"} viewBox={"0 0 24 24"}><path d={"M5 12.5l4.5 4.5L19 7.5"}></path></svg>{"Profiled"}</span>
</span>
</div>
<div className={"prof-hr"} style={{"opacity": v.pr0.o}}></div>
<div className={"prow"} style={{"opacity": v.pr1.o, "transform": v.pr1.t}}><span className={"lbl"}>{"What they do"}</span><span className={"val"}>{"Strategy creation and lead generation"}</span></div>
<div className={"prow"} style={{"opacity": v.pr2.o, "transform": v.pr2.t}}><span className={"lbl"}>{"Who they sell to"}</span><span className={"val"}>{"People who need clients every day"}</span></div>
<div className={"prow"} style={{"opacity": v.pr3.o, "transform": v.pr3.t}}><span className={"lbl"}>{"Company size"}</span><span className={"val"}>{"0\u201310 employees"}</span></div>
</div>
<span className={v.scanCls} style={{"opacity": v.scanO}}></span>
</div>
{v.chips.map((c, cIndex) => <Fragment key={cIndex}>
<div className={"act chip"} style={{"opacity": c.o, "transform": c.t, "visibility": c.v}}><span className={"chip-dot"}></span><b>{c.p}</b><span className={"chip-k"}>{c.k}</span></div>
</Fragment>)}
<div className={"act card det"} style={{"width": String(v.detW) + "px", "opacity": v.det0.o, "transform": v.det0.t, "visibility": v.det0.v}}>
<div className={"det-h"}><svg className={"ic"} width={"16"} height={"16"} viewBox={"0 0 24 24"}><path d={"M12 4l9 16H3z"}></path><path d={"M12 10v4.5"}></path><path d={"M12 17.5v.01"}></path></svg><span className={"lbl"}>{"Pain points"}</span></div>
<p>{"Ticket backlog during peak sales"}</p>
<p>{"Slow first-response times"}</p>
</div>
<div className={"act card det"} style={{"width": String(v.detW) + "px", "opacity": v.det1.o, "transform": v.det1.t, "visibility": v.det1.v}}>
<div className={"det-h"}><svg className={"ic"} width={"16"} height={"16"} viewBox={"0 0 24 24"}><rect x={"4"} y={"4"} width={"7"} height={"7"} rx={"1.5"}></rect><rect x={"13"} y={"4"} width={"7"} height={"7"} rx={"1.5"}></rect><rect x={"4"} y={"13"} width={"7"} height={"7"} rx={"1.5"}></rect><rect x={"13"} y={"13"} width={"7"} height={"7"} rx={"1.5"}></rect></svg><span className={"lbl"}>{"Tools they use"}</span></div>
<p>{"Shopify \u00b7 Zendesk \u00b7 Klaviyo"}</p>
<p>{"Macros, little automation"}</p>
</div>
<div className={"act card det"} style={{"width": String(v.detW) + "px", "opacity": v.det2.o, "transform": v.det2.t, "visibility": v.det2.v}}>
<div className={"det-h"}><svg className={"ic"} width={"16"} height={"16"} viewBox={"0 0 24 24"}><circle cx={"9"} cy={"8"} r={"3.2"}></circle><path d={"M3 19.5c0-3.3 2.7-5.8 6-5.8s6 2.5 6 5.8"}></path><circle cx={"17"} cy={"9"} r={"2.4"}></circle><path d={"M16.5 13.8c2.6.3 4.5 2.6 4.5 5.4"}></path></svg><span className={"lbl"}>{"Decision-makers"}</span></div>
<p>{"Head of CX \u2014 champion"}</p>
<p>{"VP Operations \u2014 budget owner"}</p>
</div>
<div className={"act card det"} style={{"width": String(v.detW) + "px", "opacity": v.det3.o, "transform": v.det3.t, "visibility": v.det3.v}}>
<div className={"det-h"}><svg className={"ic"} width={"16"} height={"16"} viewBox={"0 0 24 24"}><circle cx={"5"} cy={"12"} r={"2"}></circle><circle cx={"12"} cy={"12"} r={"2"}></circle><circle cx={"19"} cy={"12"} r={"2"}></circle><path d={"M7 12h3"}></path><path d={"M14 12h3"}></path></svg><span className={"lbl"}>{"Approval process"}</span></div>
<p>{"CX lead \u2192 Ops \u2192 Finance"}</p>
<p>{"Usually two to three weeks"}</p>
</div>
<div className={"act card icp"} style={{"width": String(v.icpW) + "px", "opacity": v.icp.o, "transform": v.icp.t, "visibility": v.icp.v}}>
<span className={"glow"} style={{"opacity": v.icpGlow}}></span>
<div className={"icp-h"}>
<span className={"ic-b"}><svg className={"ic"} width={"16"} height={"16"} viewBox={"0 0 24 24"}><circle cx={"12"} cy={"12"} r={"9"}></circle><circle cx={"12"} cy={"12"} r={"5"}></circle><circle cx={"12"} cy={"12"} r={"1.2"}></circle></svg></span>
<b>{"Ideal customer profile"}</b>
<span className={"stk"}><span className={"badge"} style={{"opacity": v.icpB1}}>{"v1"}</span><span className={"badge acc"} style={{"opacity": v.icpB2}}>{"v2 \u00b7 refined"}</span></span>
</div>
<div className={"icp-r"} style={{"opacity": v.ir0.o, "transform": v.ir0.t}}>
<span className={"lbl"}>{"Industry"}</span>
<span className={"stk val"}><span style={{"opacity": v.icpOld}}>{"DTC e-commerce"}</span><span style={{"opacity": v.icpNew}}>{"DTC apparel & home"}</span></span>
</div>
<div className={"icp-r"} style={{"opacity": v.ir1.o, "transform": v.ir1.t}}>
<span className={"lbl"}>{"Company size"}</span>
<span className={"stk val"}><span style={{"opacity": v.icpOld}}>{"20\u2013200 employees"}</span><span style={{"opacity": v.icpNew}}>{"50\u2013150, scaling fast"}</span></span>
</div>
<div className={"icp-r"} style={{"opacity": v.ir2.o, "transform": v.ir2.t}}>
<span className={"lbl"}>{"Buyer role"}</span>
<span className={"val emw"}>{"Head of Customer Experience"}<span className={"emph"} style={{"transform": "scaleX(" + String(v.icpEm) + ")"}}></span></span>
</div>
<div className={"icp-x"} style={{"height": String(v.icpExH) + "px"}}>
<div className={"icp-r"} style={{"opacity": v.ir3.o, "transform": v.ir3.t}}>
<span className={"lbl"}>{"Region"}</span>
<span className={"val"}><span className={"reg"} style={{"opacity": v.regO}}>{"Global"}<span className={"strike"} style={{"transform": "scaleX(" + String(v.regS) + ")"}}></span></span></span>
</div>
<div className={"icp-note"} style={{"opacity": v.icpNote.o, "transform": v.icpNote.t}}><svg className={"ic"} width={"12"} height={"12"} viewBox={"0 0 24 24"}><path d={"M5 12.5l4.5 4.5L19 7.5"}></path></svg>{"Learned from 3 intent leads"}</div>
</div>
</div>
<div className={v.scanFCls} style={{"width": String(v.fd) + "px", "height": String(v.fd) + "px", "opacity": v.scanF.o, "transform": v.scanF.t, "visibility": v.scanF.v}}>
<div className={"sparks"} style={{"opacity": v.sparkO}}>
{v.sparks.map((s, sIndex) => <Fragment key={sIndex}><span className={s.cls} style={{"left": String(s.x) + "px", "top": String(s.y) + "px", "width": String(s.z) + "px", "height": String(s.z) + "px", "animationDelay": String(s.d) + "s", "animationDuration": String(s.u) + "s"}}></span></Fragment>)}
</div>
</div>
<div className={"act pin-dot"} style={{"opacity": v.icpPin.o, "transform": v.icpPin.t, "visibility": v.icpPin.v}}></div>
<div className={"act scan-hd"} style={{"width": String(v.srcW) + "px", "opacity": v.scanHd.o, "transform": v.scanHd.t, "visibility": v.scanHd.v}}>
<span className={"lbl"}>{"Scanning sources"}</span>
<b className={"num"}>{v.scanDone}{" of 6 complete"}</b>
</div>
{v.srcs.map((n, nIndex) => <Fragment key={nIndex}>
<div className={n.cls} style={{"width": String(v.srcW) + "px", "opacity": n.o, "transform": n.t, "visibility": n.v}}>
<span className={"src-pin"}></span>
<span className={"src-ico"}>
<span className={"src-burst"} style={{"opacity": n.bo, "transform": "scale(" + String(n.bs) + ")"}}></span>
<span className={"src-base"}></span>

<svg className={"src-ring"} width={"48"} height={"48"}><circle className={"sr-pend"} cx={"24"} cy={"24"} r={"20"} style={{"opacity": n.pend}}></circle><circle className={"sr-track"} cx={"24"} cy={"24"} r={"20"} style={{"opacity": n.trk}}></circle><circle className={"sr-prog"} cx={"24"} cy={"24"} r={"20"} style={{"strokeDashoffset": n.off}}></circle></svg>
{n.logo ? <img className="src-brand" src={n.logo} alt="" width="24" height="24" /> : <svg className={n.icCls} width="20" height="20" viewBox="0 0 24 24"><path d={n.ic}></path></svg>}
<span className={"src-dot"} style={{"opacity": n.dotO, "transform": "translate(" + String(n.dx) + "px, " + String(n.dy) + "px)"}}></span>

</span>
<span className={"src-l"}><b>{n.name}</b><span className={"stk src-st"}><span style={{"opacity": n.q}}>{"Queued"}</span><span className={"scn"} style={{"opacity": n.sc}}>{"Scanning\u2026"}</span><span className={"dn"} style={{"opacity": n.dn}}>{n.res}</span></span></span>
<span className={"src-ok"} style={{"opacity": n.dn, "transform": "scale(" + String(n.oks) + ")"}}><svg className={"ic"} width={"12"} height={"12"} viewBox={"0 0 24 24"}><path d={"M5 12.5l4.5 4.5L19 7.5"}></path></svg>{"Verified"}</span>
</div>
</Fragment>)}
<div className={"act wf-rail"} style={{"opacity": v.wfRail.o, "transform": v.wfRail.t, "visibility": v.wfRail.v}}>
<span className={"wf-line"}></span>
<span className={"wf-fill"} style={{"transform": "scaleY(" + String(v.wfFill) + ")"}}></span>
{v.wfSteps.map((s, sIndex) => <Fragment key={sIndex}>
<div className={s.cls} style={{"top": String(s.y) + "px"}}><span className={"wf-dot"}><svg className={"ic"} width={"14"} height={"14"} viewBox={"0 0 24 24"}><path d={"M5 12.5l4.5 4.5L19 7.5"}></path></svg></span><span className={"wf-tx"}><span className={"lbl"}>{"Step "}{s.n}</span><b>{s.t}</b></span></div>
</Fragment>)}
</div>
<div className={"act card wf-pill"} style={{"opacity": v.wfPill.o, "transform": v.wfPill.t, "visibility": v.wfPill.v}}>
<span className={"lbl"}>{"Step "}{v.wfIdx}{" of 5"}</span>
<b className={"stk"}>{v.wfSteps.map((s, sIndex) => <Fragment key={sIndex}><span style={{"opacity": s.po}}>{s.t}</span></Fragment>)}</b>
</div>
{v.frags.map((g, gIndex) => <Fragment key={gIndex}>
<div className={"act card frag"} style={{"width": String(v.fragW) + "px", "opacity": g.o, "transform": g.t, "visibility": g.v}}>
<span className={"frag-h"}><svg className={"ic"} width={"14"} height={"14"} viewBox={"0 0 24 24"}><path d={g.ic}></path></svg><span className={"lbl"}>{g.src}</span></span>
<span className={"frag-t"}>{g.tx}</span>
<span className={"frag-v"} style={{"opacity": g.vo, "transform": "scale(" + String(g.vs) + ")"}}><svg className={"ic"} width={"11"} height={"11"} viewBox={"0 0 24 24"}><path d={"M5 12.5l4.5 4.5L19 7.5"}></path></svg><span>{"Source matched"}</span></span>
</div>
</Fragment>)}
<div className={"act card wfc"} style={{"width": String(v.wfcW) + "px", "opacity": v.wfc.o, "transform": v.wfc.t, "visibility": v.wfc.v}}>
<div className={"wfc-h"}>
<span className={"av lg2"}>{"MC"}</span>
<span className={"wfc-id"}><b>{"Maya Chen"}</b><span>{"Head of CX \u00b7 Bloomcart"}</span></span>
<span className={"score"}>
<span className={"score-r"}>
<span className={"sc-glow"} style={{"opacity": v.wfGlow}}></span>
<svg width={"64"} height={"64"}><circle className={"sc-t"} cx={"32"} cy={"32"} r={"28"}></circle><circle className={"sc-p"} cx={"32"} cy={"32"} r={"28"} style={{"strokeDashoffset": v.wfOff}}></circle></svg>
<span className={"sc-v num"}>{v.wfScore}</span>
</span>
<span className={"lbl"}>{"Intent score"}</span>
</span>
</div>
<div className={"wfc-r"} style={{"opacity": v.we0.o, "transform": v.we0.t}}><span className={"lbl"}>{"Company"}</span><span className={"val"}>{"Bloomcart \u00b7 DTC home goods \u00b7 50\u2013150 people"}</span></div>
<div className={"wfc-r"} style={{"opacity": v.we1.o, "transform": v.we1.t}}><span className={"lbl"}>{"Contact"}</span><span className={"val"}>{"Work email matched \u00b7 LinkedIn profile linked"}</span></div>
<div className={"wfc-r"} style={{"opacity": v.we2.o, "transform": v.we2.t}}><span className={"lbl"}>{"Traceable sources"}</span><span className={"wfc-src"}><span className={"tag"}>{"Reddit discussion"}</span><span className={"tag"}>{"LinkedIn post"}</span><span className={"tag"}>{"Market signal"}</span></span></div>
<div className={"wfc-f"} style={{"opacity": v.wfFoot.o, "transform": v.wfFoot.t}}><span className={"qual"}><svg className={"ic"} width={"13"} height={"13"} viewBox={"0 0 24 24"}><path d={"M5 12.5l4.5 4.5L19 7.5"}></path></svg>{"Qualified lead"}</span><span className={"wfc-n"}>{"Strong intent \u00b7 illustrative score, higher means stronger buying intent"}</span></div>
</div>
<div className={"act node"} style={{"opacity": v.node.o, "transform": v.node.t, "visibility": v.node.v}}>
<span className={"node-c"}><svg className={"ic"} width={"20"} height={"20"} viewBox={"0 0 24 24"}><path d={"M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9z"}></path><path d={"M18.5 16.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"}></path></svg></span>
<span className={"lbl under"}>{"Scoring"}</span>
</div>
{v.cols.map((c, cIndex) => <Fragment key={cIndex}>
<div className={"act " + String(c.cls)} style={{"width": String(v.colW) + "px", "opacity": c.o, "transform": c.t, "visibility": c.v}}><span className={"cdot"}></span><b>{c.name}</b><span className={"ccount num"}>{c.n}</span></div>
</Fragment>)}
{v.leads.map((l, lIndex) => <Fragment key={lIndex}>
<div className={l.cls} style={{"width": String(v.leadW) + "px", "opacity": l.o, "transform": l.t, "visibility": l.v}}>
<span className={"av"}>{l.i}</span>
<span className={"lead-tx"}><b>{l.n}</b><span>{l.sd}</span></span>
<span className={"ring"}><svg width={"38"} height={"38"}><circle className={"rt"} cx={"19"} cy={"19"} r={"16"}></circle><circle className={l.rc} cx={"19"} cy={"19"} r={"16"} style={{"strokeDashoffset": l.ro}}></circle></svg><span className={"ring-v num"}>{l.sc}</span></span>
</div>
</Fragment>)}
<div className={"act route"} style={{"opacity": v.route.o, "transform": v.route.t, "visibility": v.route.v}}>
<span className={"route-c"}><svg className={"ic"} width={"22"} height={"22"} viewBox={"0 0 24 24"}><path d={"M3 12h6"}></path><path d={"M9 12c4 0 5-6 10-6"}></path><path d={"M9 12c4 0 5 6 10 6"}></path><path d={"M16.5 3.5L19 6l-2.5 2.5"}></path><path d={"M16.5 15.5L19 18l-2.5 2.5"}></path></svg></span>
<span className={"lbl under"}>{"Best channel per lead"}</span>
</div>
<div className={"act card ch"} style={{"width": String(v.chW) + "px", "height": String(v.chH) + "px", "opacity": v.inbox.o, "transform": v.inbox.t, "visibility": v.inbox.v}}>
<div className={"ch-h"}><svg className={"ic"} width={"16"} height={"16"} viewBox={"0 0 24 24"}><rect x={"3"} y={"5"} width={"18"} height={"14"} rx={"2.5"}></rect><path d={"M4 7.5l8 5.5 8-5.5"}></path></svg><b>{"Email"}</b><span className={"ch-s"}>{"Inbox"}</span></div>
<div className={"ch-body"}>
<div className={"ch-prev"} style={{"opacity": v.inPrev}}>
<span className={"lbl"}>{"Subject"}</span>
<b className={"ch-subj"}>{"Your launch + the ticket spike"}</b>
<p className={"ch-p"}>{"Hi Maya, saw your product launch last week. Thought Halcyon could help your team absorb the launch-week ticket spike\u2026"}</p>
</div>
<div className={"ch-list"} style={{"opacity": v.inList}}>
{v.inRows.map((r, rIndex) => <Fragment key={rIndex}>
<div className={"row"} style={{"opacity": r.o, "transform": r.t}}>
<span className={"tint"} style={{"opacity": r.tint}}></span>
<span className={"av"}>{r.i}</span>
<span className={"rtx"}><b>{r.n}</b><i>{r.c}</i></span>
<span className={"rst stk"}>
<span className={"st-d"} style={{"opacity": r.d}}><svg className={"ic"} width={"18"} height={"14"} viewBox={"0 0 22 20"}><path d={"M2 10.5l4 4L14 6"}></path><path d={"M10.5 14l.5.5L19 6"}></path></svg></span>
<span className={"st-nr"} style={{"opacity": r.nr}}>{"No reply"}</span>
<span className={"st-fu"} style={{"opacity": r.fu}}>{"Followed up"}</span>
<span className={"st-rp"} style={{"opacity": r.rp}}>{"Replied"}</span>
</span>
</div>
</Fragment>)}
</div>
</div>
</div>
<div className={"act card ch"} style={{"width": String(v.chW) + "px", "height": String(v.chH) + "px", "opacity": v.dm.o, "transform": v.dm.t, "visibility": v.dm.v}}>
<div className={"ch-h"}><svg className={"ic"} width={"16"} height={"16"} viewBox={"0 0 24 24"}><path d={"M5 4.5h14a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2h-8l-5 4v-4H5a2 2 0 0 1-2-2V6.5a2 2 0 0 1 2-2z"}></path></svg><b>{"Direct message"}</b><span className={"ch-s"}>{"LinkedIn"}</span></div>
<div className={"ch-body"}>
<div className={"ch-prev"} style={{"opacity": v.dmPrev}}>
<span className={"lbl"}>{"To Maya Chen"}</span>
<div className={"bub"}>{"Congrats on the launch, Maya! Curious how the team is handling the extra tickets this week?"}</div>
</div>
<div className={"ch-list"} style={{"opacity": v.dmList}}>
{v.dmRows.map((r, rIndex) => <Fragment key={rIndex}>
<div className={"row"} style={{"opacity": r.o, "transform": r.t}}>
<span className={"tint"} style={{"opacity": r.tint}}></span>
<span className={"av"}>{r.i}</span>
<span className={"rtx"}><b>{r.n}</b><i>{r.c}</i></span>
<span className={"rst stk"}>
<span className={"st-d"} style={{"opacity": r.d}}><svg className={"ic"} width={"18"} height={"14"} viewBox={"0 0 22 20"}><path d={"M2 10.5l4 4L14 6"}></path><path d={"M10.5 14l.5.5L19 6"}></path></svg></span>
<span className={"st-nr"} style={{"opacity": r.nr}}>{"No reply"}</span>
<span className={"st-fu"} style={{"opacity": r.fu}}>{"Followed up"}</span>
<span className={"st-rp"} style={{"opacity": r.rp}}>{"Replied"}</span>
</span>
</div>
</Fragment>)}
</div>
</div>
</div>
{v.trav.map((m, mIndex) => <Fragment key={mIndex}>
<div className={"act trav"} style={{"opacity": m.o, "transform": m.t, "visibility": m.v}}><svg className={"ic"} width={"14"} height={"14"} viewBox={"0 0 24 24"}><rect x={"3"} y={"5"} width={"18"} height={"14"} rx={"2.5"}></rect><path d={"M4 7.5l8 5.5 8-5.5"}></path></svg></div>
</Fragment>)}
<div className={"act card prog"} style={{"width": String(v.progW) + "px", "opacity": v.prog.o, "transform": v.prog.t, "visibility": v.prog.v}}>
<div className={"prog-h"}><span className={"live"}></span><b>{"Campaign live"}</b><span className={"prog-n num"}>{v.progN}{"/7 delivered"}</span></div>
<div className={"bar"}><span style={{"transform": "scaleX(" + String(v.progB) + ")"}}></span></div>
</div>
<div className={"act card cal"} style={{"width": String(v.calW) + "px", "height": String(v.calH) + "px", "opacity": v.cal.o, "transform": v.cal.t, "visibility": v.cal.v}}>
<div className={"cal-h"}><svg className={"ic"} width={"16"} height={"16"} viewBox={"0 0 24 24"}><rect x={"3.5"} y={"5"} width={"17"} height={"15"} rx={"2.5"}></rect><path d={"M3.5 10h17"}></path><path d={"M8 3v4"}></path><path d={"M16 3v4"}></path></svg><b>{"This week"}</b><span className={"muted"}>{"Oct 12 \u2013 16"}</span></div>
<div className={"cal-g"}>
{v.calCells.map((c, cIndex) => <Fragment key={cIndex}>
<div className={c.cls}><span className={"cal-sel"} style={{"opacity": c.so}}></span><span className={"cal-ev"} style={{"opacity": c.fo, "transform": c.ft}}>{c.ev}</span><span className={"cal-tx"}>{c.tx}</span></div>
</Fragment>)}
</div>
</div>
<div className={"act card reply"} style={{"width": String(v.replyW) + "px", "opacity": v.reply.o, "transform": v.reply.t, "visibility": v.reply.v}}>
<div className={"reply-h"}><span className={"av xs"}>{"MC"}</span><b>{"Maya Chen"}</b><span className={"muted"}>{"replied \u00b7 email"}</span></div>
<p>{"Timing\u2019s perfect \u2014 could we talk Thursday morning?"}</p>
<div className={"reply-inv"} style={{"opacity": v.replyInv.o, "transform": v.replyInv.t}}><svg className={"ic"} width={"14"} height={"14"} viewBox={"0 0 24 24"}><rect x={"3.5"} y={"5"} width={"17"} height={"15"} rx={"2.5"}></rect><path d={"M3.5 10h17"}></path><path d={"M8 3v4"}></path><path d={"M16 3v4"}></path></svg><span>{"Invite sent \u00b7 Thu 10:30"}</span></div>
</div>
<div className={"act card fu"} style={{"opacity": v.fuc.o, "transform": v.fuc.t, "visibility": v.fuc.v}}>
<span className={"fu-ic"}><svg className={"ic"} width={"14"} height={"14"} viewBox={"0 0 24 24"}><path d={"M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9z"}></path></svg></span>
<span className={"stk"}><span style={{"opacity": v.fuA}}>{"Writing follow-ups\u2026"}</span><span style={{"opacity": v.fuB}}>{"Follow-up sent \u00b7 5 leads"}</span></span>
</div>
<div className={"act card pipe"} style={{"width": String(v.pipeW) + "px", "height": String(v.pipeH) + "px", "opacity": v.pipe.o, "transform": v.pipe.t, "visibility": v.pipe.v}}>
<div className={"pipe-h"}><b>{"Pipeline"}</b><span className={"muted"}>{"CRM"}</span><span className={"sync"} style={{"opacity": v.syncO}}><svg className={"ic"} width={"12"} height={"12"} viewBox={"0 0 24 24"}><path d={"M5 12.5l4.5 4.5L19 7.5"}></path></svg>{"Synced to CRM"}</span></div>
<div className={"pipe-cols"}>
{v.pcols.map((c, cIndex) => <Fragment key={cIndex}>
<div className={"pcol"}><div className={"pcol-h"}><span>{c.name}</span><span className={"muted num"}>{c.n}</span></div></div>
</Fragment>)}
</div>
</div>
{v.deals.map((d, dIndex) => <Fragment key={dIndex}>
<div className={"act card deal"} style={{"width": String(v.dealW) + "px", "opacity": d.o, "transform": d.t, "visibility": d.v}}>
<b>{d.co}</b>
<span className={"muted"}>{d.who}{" \u00b7 "}{d.val}</span>
<span className={"stk dst"}><span className={"dpill"} style={{"opacity": d.s1}}>{d.st}</span><span className={"dpill won"} style={{"opacity": d.s2}}>{"Closed won"}</span></span>
</div>
</Fragment>)}
<div className={"act orb"} style={{"opacity": v.orb.o, "transform": v.orb.t, "visibility": v.orb.v}}>
<span className={"orb-c"}><span className={"orb-d"}></span></span>
<span className={"orb-l"}><b>{"Agent"}</b><span className={"muted"}>{"Reviewing pipeline"}</span></span>
</div>
<div className={"act card rec"} style={{"width": String(v.recW) + "px", "opacity": v.rec.o, "transform": v.rec.t, "visibility": v.rec.v}}>
<div className={"rec-h"}><span className={"rec-ic"}><svg className={"ic"} width={"14"} height={"14"} viewBox={"0 0 24 24"}><path d={"M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9z"}></path></svg></span><span className={"lbl"}>{"Agent recommendation"}</span></div>
<p className={"rec-p"}>{"You\u2019ve covered this ICP. New market triggers detected. Explore these opportunities next."}</p>
<div className={"rec-b"}><span className={"btn pri"}>{"Explore"}</span><span className={"btn"}>{"Not now"}</span></div>
</div>
{v.nts.map((g, gIndex) => <Fragment key={gIndex}>
<div className={"act card trig"} style={{"width": String(v.ntW) + "px", "opacity": g.o, "transform": g.t, "visibility": g.v}}>
<span className={"trig-hl"} style={{"opacity": g.hl}}></span>
<span className={"trig-d"}><i style={{"opacity": g.hl}}></i></span>
<span className={"trig-tx"}><span className={"lbl"}>{g.k}</span><span className={"trig-v"}>{g.tx}</span></span>
</div>
</Fragment>)}
<div className={"act card icp"} style={{"width": String(v.nicpW) + "px", "opacity": v.nicp.o, "transform": v.nicp.t, "visibility": v.nicp.v}}>
<div className={"icp-h"}>
<span className={"ic-b"}><svg className={"ic"} width={"16"} height={"16"} viewBox={"0 0 24 24"}><circle cx={"12"} cy={"12"} r={"9"}></circle><circle cx={"12"} cy={"12"} r={"5"}></circle><circle cx={"12"} cy={"12"} r={"1.2"}></circle></svg></span>
<b>{"Next ICP"}</b>
<span className={"stk"}><span className={"badge acc"} style={{"opacity": v.nB1}}>{"Suggested"}</span><span className={"badge acc"} style={{"opacity": v.nB2}}>{"Loop 2"}</span></span>
</div>
<div className={"icp-r"}><span className={"lbl"}>{"Industry"}</span><span className={"val"}>{"Subscription-box brands"}</span></div>
<div className={"icp-r"}><span className={"lbl"}>{"Company size"}</span><span className={"val"}>{"30\u2013100, recently funded"}</span></div>
<div className={"icp-r"}><span className={"lbl"}>{"Buyer role"}</span><span className={"val"}>{"Head of Operations"}</span></div>
<div className={"nicp-f"} style={{"height": String(v.nicpExH) + "px", "opacity": v.nBtn.o}}><span className={"btn pri"}>{"Start next loop"}</span></div>
</div>
<div className={"act card sum"} style={{"width": String(v.sumW) + "px", "opacity": v.sum.o, "transform": v.sum.t, "visibility": v.sum.v}}>
<div className={"sum-h"}><span className={"lbl"}>{"This loop"}</span><span className={"pill acc"}>{"+2 deals won"}</span></div>
<span className={"sum-l"}>{"Closed-won revenue"}</span>
<b className={"sum-v"}>{v.rev}</b>
<svg className={"spark"} width={v.sparkW} height={"56"}><path className={"spk-b"} d={v.sparkBase}></path><path className={"spk"} d={v.sparkD} style={{"strokeDashoffset": v.sparkOff}}></path></svg>
<div className={"sum-s"}>
<div><b>{"4"}</b><span>{"Replies"}</span></div>
<div><b>{"2"}</b><span>{"Meetings"}</span></div>
<div><b>{"$17,800"}</b><span>{"Open pipeline"}</span></div>
</div>
</div>
<div className={"act loopl"} style={{"opacity": v.loopL.o, "transform": v.loopL.t, "visibility": v.loopL.v}}>
<svg className={"ic"} width={"14"} height={"14"} viewBox={"0 0 24 24"}><path d={"M4 12a8 8 0 0 1 14-5.3"}></path><path d={"M18 3v4h-4"}></path><path d={"M20 12a8 8 0 0 1-14 5.3"}></path><path d={"M6 21v-4h4"}></path></svg>
<span>{"Next loop \u2192 04 Find the ICP"}</span>
</div>
</div>
<div className={"act card comp"} role={"group"} aria-label={"New message, demo composer"} style={{"width": String(v.compW) + "px", "opacity": v.comp.o, "transform": v.comp.t, "visibility": v.comp.v}}>
<div className={"comp-h"}><span className={"lbl"}>{"New message"}</span><span className={"pill acc"}><svg className={"ic"} width={"12"} height={"12"} viewBox={"0 0 24 24"}><path d={"M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9z"}></path></svg>{"Personalised"}</span></div>
<div className={"comp-to"}><span className={"lbl"}>{"To"}</span><span className={"av xs"}>{"MC"}</span><span>{"Maya Chen \u00b7 Head of CX, Bloomcart"}</span></div>
<div className={"comp-b stk"}>
<p className={"ghost"} aria-hidden={"true"}>{"Hi Maya, saw your product launch last week. Thought Halcyon could help your team absorb the launch-week ticket spike and build on that momentum."}</p>
<p>{v.segs.map((s, sIndex) => <Fragment key={sIndex}><span className={s.cls} style={{"backgroundColor": "color-mix(in oklab, var(--ac) " + String(s.pct) + "%, #ffffff)", "boxShadow": "0 0 0 2px color-mix(in oklab, var(--ac) " + String(s.pct) + "%, #ffffff)"}}>{s.t}</span></Fragment>)}<span className={"caret"} style={{"opacity": v.compCaret}}></span></p>
</div>
<div className={"comp-a"}>
<button className={v.gmCls} type={"button"} disabled={v.gmDis}><svg className={"ic"} width={"15"} height={"15"} viewBox={"0 0 24 24"}><rect x={"3"} y={"5"} width={"18"} height={"14"} rx={"2.5"}></rect><path d={"M4 7.5l8 5.5 8-5.5"}></path></svg><span>{v.gmLabel}</span></button>
<span className={"comp-st"} role={"status"}>{v.compSt}</span>
<button className={"btn pri send"} type={"button"} disabled={v.sendDis}><span>{v.sendLabel}</span><svg className={"ic"} width={"15"} height={"15"} viewBox={"0 0 24 24"}><path d={"M5 12h14"}></path><path d={"M13 6l6 6-6 6"}></path></svg></button>
</div>
</div>
</div>
</div>
</section>
<div className={"tail"}></div>
</div>
</div>;
  }

}
