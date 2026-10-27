/** Run the supplied standalone animation inside one React-owned root.
 * @param {HTMLElement} root
 */
export function mountProductTour(root) {
  const controller = new AbortController();
  const timers = new Set();
  const frames = new Set();
  const setTimeout = (callback, delay) => {
    const id = window.setTimeout(() => { timers.delete(id); callback(); }, delay);
    timers.add(id);
    return id;
  };
  const requestAnimationFrame = (callback) => {
    const id = window.requestAnimationFrame((time) => { frames.delete(id); callback(time); });
    frames.add(id);
    return id;
  };


  const stage = root.querySelector('.stage');
  const TEMPLATE = stage.innerHTML;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let scale = 1, runId = 0, visible = true;
  const ABORT = {};

  const fit = () => { scale = root.clientWidth / 1280; stage.style.transform = 'scale(' + scale + ')'; };
  const resizeObserver = new ResizeObserver(fit);
  resizeObserver.observe(root); fit();
  const visibilityObserver = new IntersectionObserver(e => { visible = e[0].isIntersecting; }, { threshold: 0.15 });
  visibilityObserver.observe(root);

  const $ = s => stage.querySelector(s);
  const $$ = (s, c) => [...(c || stage).querySelectorAll(s)];

  /* ---------- logo (from the Cnvrted loader) ---------- */
  const logo = p => `<svg class="lg" viewBox="-40 -40 692 746" aria-hidden="true"><defs>
<linearGradient id="${p}gg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7f8a45"/><stop offset=".55" stop-color="#626430"/><stop offset="1" stop-color="#4b4f22"/></linearGradient>
<linearGradient id="${p}go" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f0c95f"/><stop offset=".5" stop-color="#d1ae58"/><stop offset="1" stop-color="#b8861f"/></linearGradient>
<radialGradient id="${p}ge" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#55525a"/><stop offset=".6" stop-color="#302d2f"/><stop offset="1" stop-color="#1c1a1b"/></radialGradient>
<mask id="${p}ml" maskUnits="userSpaceOnUse" x="-40" y="-40" width="692" height="746"><path class="roll roll-l" pathLength="1" d="M-6 26.2A341 306.4 0 0 1 -6 638.9" stroke="#fff" stroke-width="84" fill="none"/></mask>
<mask id="${p}mr" maskUnits="userSpaceOnUse" x="-40" y="-40" width="692" height="746"><path class="roll roll-r" pathLength="1" d="M617 248.8A222.2 199.7 0 0 0 617 648.1" stroke="#fff" stroke-width="64" fill="none"/></mask></defs>
<path fill="url(#${p}gg)" mask="url(#${p}ml)" d="M0 665.143C98.1384 665.144 192.257 630.105 261.652 567.736C331.046 505.366 370.031 420.775 370.031 332.572C370.031 244.368 331.046 159.777 261.652 97.4081C192.257 35.0388 98.1385 2.20812e-05 0.000131252 0L0.000103985 52.2584C82.7176 52.2585 162.047 81.7914 220.537 134.36C279.027 186.929 311.887 258.228 311.887 332.572C311.887 406.916 279.027 478.214 220.537 530.783C162.047 583.352 82.7175 612.885 5.08316e-06 612.885L0 665.143Z"/>
<path fill="url(#${p}gg)" mask="url(#${p}mr)" d="M611.13 231.756C547.187 231.756 485.862 254.586 440.648 295.223C395.433 335.861 370.031 390.978 370.031 448.448C370.031 505.918 395.433 561.035 440.647 601.672C485.862 642.31 547.187 665.14 611.13 665.14L611.13 631.09C557.235 631.09 505.546 611.847 467.436 577.595C429.326 543.343 407.916 496.888 407.916 448.448C407.916 400.008 429.326 353.552 467.436 319.3C505.546 285.048 557.235 265.806 611.13 265.806V231.756Z"/>
<path fill="url(#${p}go)" d="M388.968 322.338C401.445 221.991 318.039 129.769 274.676 90.1462L607.998 221.991C537.307 206.46 433.331 267.514 388.968 322.338Z"/>
<path fill="url(#${p}go)" d="M348.071 506.125C368.651 583.103 459.12 643.197 515.932 665.144H100.608C168.9 663.366 320.565 556.474 348.071 506.125Z"/>
<g class="trk tl"><circle class="eye eye-l" fill="url(#${p}ge)" cx="86.103" cy="332.573" r="86.103"/></g>
<g class="trk tr"><circle class="eye eye-r" fill="url(#${p}ge)" cx="557.315" cy="449.973" r="53.8177"/></g></svg>`;

  // eyes follow the visitor's pointer, like the loader
  root.addEventListener('pointermove', ev => {
    $$('.ov.on .lg').forEach(svg => {
      const b = svg.getBoundingClientRect(), s = b.width / 692;
      [['.tl', 86.103, 332.573, 42], ['.tr', 557.315, 449.973, 26]].forEach(([sel, cx, cy, max]) => {
        const dx = (ev.clientX - (b.left + (cx + 40) * s)) / s, dy = (ev.clientY - (b.top + (cy + 40) * s)) / s;
        const d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / 400) * max / d;
        svg.querySelector(sel).style.transform = `translate(${(dx * k).toFixed(1)}px,${(dy * k).toFixed(1)}px)`;
      });
    });
  }, { signal: controller.signal });

  /* ---------- data ---------- */
  const T_ROWS = [
    ['N','#fdf1e3','#c2410c','Northwind Labs','Senior Product Designer','Software','2018','Priya S. · Founder',92],
    ['B','#e9f3e6','#3f8a43','Bloom Health','Product Designer','Healthtech','2021','Arjun M. · CEO',88],
    ['F','#eef0ff','#5b62e0','Finch Capital','Founding Designer','Fintech','2012','Neha R. · CPO',85],
    ['E','#1f1e1b','#fff','EduFlow','Product Designer','Edtech','2019','Karan V. · Founder',81],
    ['G','#e6f2f5','#0f766e','EcoGrid','Design Lead','Energy','2020','Meera J. · CTO',79],
    ['T','#fbf7d9','#8a7300','TravelFlow','UI/UX Designer','Travel','2022','Rohan D. · Founder',76],
    ['M','#fdeee6','#c2410c','MediaMix','Product Designer','Media','2011','Sara K. · VP Product',72],
    ['F','#f3eafa','#8a3fb5','FreshBite','Brand Designer','Food','2024','Vikram P. · Founder',70],
  ];
  const PEOPLE = [
    ['rhea','fl','li','Rhea Kapoor','Founder, CEO · Framelight Studio','Film & documentary production',82,'LinkedIn','','2h ago','Seeking a freelance video editor (Final Cut Pro)','Needs a freelance FCP editor for short documentaries, someone who can pull strong stories out of long footage.','rhea@framelight.co'],
    ['marcus','pp','x','Marcus Lee','Head of Growth · Pillow Pay','Fintech',76,'X.com','x','5h ago','Looking for a lifecycle email partner','Wants an outside team to rebuild onboarding and win-back email flows this quarter.','marcus@pillowpay.com'],
    ['ana','tw','li','Ana Silva','Product Lead · Tidewater Health','Digital health',71,'LinkedIn','','1d ago','Hiring a contract product designer for 3 months','Short-term design contract: mobile refresh plus a design system before fundraising.','ana.silva@tidewater.health'],
    ['jonah','bb','rd','Jonah Weiss','Co-founder · Brightbeam','B2B SaaS',64,'Reddit','rd','1d ago','Any recommendations for an outbound SDR agency?','Ready to fund a 2-month outbound pilot with an SDR agency before hiring in-house.','jonah@brightbeam.io'],
  ];
  const INTS = [
    ['G','#ea4335','Gmail','Email','Send outreach and follow-ups from your own inbox, and let Orka read the replies.',false,'mail'],
    ['#','#611f69','Slack','Messaging','Get lead alerts and approve Orka\'s drafts without leaving Slack.',true],
    ['H','#ff7a59','HubSpot','CRM','Sync contacts, companies and deal stages both ways.'],
    ['S','#00a1e0','Salesforce','CRM','Push qualified leads and log every touch to the right account.'],
    ['in','#0a66c2','LinkedIn','Social','Find decision-makers and send connection notes from your account.',false,'li'],
  ];
  const CRUMB = {
    home: ['#f6ecf6','#c2185b','<path d="M3 5h6a3 3 0 0 1 3 3v11a2 2 0 0 0-2-2H3zM21 5h-6a3 3 0 0 0-3 3v11a2 2 0 0 1 2-2h7z"/>','<div><small>Active recipe</small>Luxury hospitality &amp; destination wedding venues ▾</div>'],
    orka: ['#eef0ff','#5b62e0','<path d="M12 2l2 6.5L20.5 10.5 14 12.5 12 19l-2-6.5L3.5 10.5 10 8.5z"/>','Ask Orka'],
    target: ['#fdeceb','#e8564a','<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/>','Target list ▾ <span class="in">in Early-stage startup GTM</span>'],
    intent: ['#efeaff','#7c5cf0','<path d="M13 2L5 13h6l-1 9 8-12h-6z"/>','Intent list ▾ <span class="in">in Early-stage startup GTM</span>'],
    comm: ['#e9f3e6','#3f8a43','<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 19c0-3 3-5 6-5s6 2 6 5"/>','Communities'],
    hist: ['#fdf1e3','#d97706','<path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1L3.5 8.5"/><path d="M12 7.5V12l3 2"/>','History'],
    int: ['#e8effd','#2563eb','<path d="M9 9.5l-2 2a3.5 3.5 0 0 0 5 5l2-2zM15 14.5l2-2a3.5 3.5 0 0 0-5-5l-2 2z"/>','Integrations'],
  };
  const NAV = { home:'recipe', orka:'ask', target:'recipe', intent:'recipe', comm:'comm', hist:'hist', int:'int' };
  const CAPS = 8;

  const IC = {
    li: '<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#0A66C2"/><path fill="#fff" d="M6.6 9.8h2.6V18H6.6zM7.9 5.6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM10.8 9.8h2.5v1.1c.4-.7 1.3-1.3 2.6-1.3 2.2 0 2.9 1.4 2.9 3.4v5h-2.6v-4.4c0-1-.2-1.9-1.3-1.9s-1.5.8-1.5 1.9V18h-2.6z"/></svg>',
    x: '<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#111"/><path fill="#fff" d="M6.5 6h3.4l2.7 3.8L15.8 6h1.9l-4.2 4.9L18 18h-3.4l-3-4.2L8 18H6.1l4.6-5.3z"/></svg>',
    mail: '<svg viewBox="0 0 24 24"><defs><linearGradient id="cmmg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff7a59"/><stop offset="1" stop-color="#ea4335"/></linearGradient></defs><rect width="24" height="24" rx="5" fill="url(#cmmg)"/><rect x="5.5" y="7.5" width="13" height="9" rx="1.6" fill="none" stroke="#fff" stroke-width="1.6"/><path d="M6 8.5l6 4.3 6-4.3" fill="none" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    rd: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#FF4500"/><ellipse cx="12" cy="14" rx="6" ry="4" fill="#fff"/><circle cx="9.6" cy="13.6" r="1" fill="#FF4500"/><circle cx="14.4" cy="13.6" r="1" fill="#FF4500"/><circle cx="16.5" cy="7.5" r="1.3" fill="#fff"/><path d="M12 10l1-3.5 3.5 1" fill="none" stroke="#fff" stroke-width="1"/></svg>',
  };
  // illustrated profile photo: [bg1,bg2,skin,hair,shirt,longHair]
  const face = (a, uid) => {
    const [b1, b2, sk, hr, sh, lg] = a;
    return `<svg viewBox="0 0 40 40"><defs><linearGradient id="cmf${uid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${b1}"/><stop offset="1" stop-color="${b2}"/></linearGradient></defs><rect width="40" height="40" fill="url(#cmf${uid})"/>` +
      (lg ? `<path d="M10.5 18.5C10.5 11 14.5 7.5 20 7.5s9.5 3.5 9.5 11V31h-19z" fill="${hr}"/>` : '') +
      `<path d="M5 42c1-8.5 7-12.5 15-12.5S34 33.5 35 42z" fill="${sh}"/><path d="M16.8 24h6.4v6.5c0 1.8-1.4 3-3.2 3s-3.2-1.2-3.2-3z" fill="${sk}"/><path d="M16.8 27.5c2 1 4.4 1 6.4 0v-2h-6.4z" fill="#000" opacity=".08"/>` +
      `<ellipse cx="20" cy="18" rx="7.4" ry="8.2" fill="${sk}"/>` +
      (lg ? `<path d="M12.4 16.5c.8-5.3 3.8-8 7.6-8s7 2.7 7.6 8c-3.2-.4-6.2-2-7.6-4.2-1.4 2.2-4.4 3.8-7.6 4.2z" fill="${hr}"/>`
          : `<path d="M12.3 17.5c-.6-6 3-9.6 7.7-9.6s8.3 3.3 7.7 9.6c-.6-2.6-2.2-4.4-4.4-5.1-2.4 1.3-6.4 1.6-8.9.6-1.3.9-1.9 2.6-2.1 4.5z" fill="${hr}"/>`) +
      `<circle cx="17.3" cy="19" r=".9" fill="#2b2522"/><circle cx="22.7" cy="19" r=".9" fill="#2b2522"/><path d="M18 22.6c1.2.8 2.8.8 4 0" fill="none" stroke="#2b2522" stroke-width=".8" stroke-linecap="round" opacity=".7"/></svg>`;
  };
  const photo = (a, uid, co, src) => `<div class="pph">${face(a, uid)}<span class="cl" style="background:${co[1]}">${co[0]}</span>${src ? `<span class="sl2">${IC[src]}</span>` : ''}</div>`;
  const FACES = {
    rhea: ['#ffd9c2', '#f7a8b8', '#e8b48f', '#2a1d1a', '#d9485f', 1],
    marcus: ['#cfe6ff', '#9ec5f8', '#8d5a3b', '#1b1412', '#2f5fb3', 0],
    ana: ['#d8f2e0', '#9fd8b4', '#f1c9a5', '#7a4a2a', '#2f8a5f', 1],
    jonah: ['#ffe9a8', '#ffc66b', '#f0c7a0', '#c4772f', '#5a4fcf', 0],
  };
  const CO = { fl: ['F', 'linear-gradient(135deg,#ff8a3d,#e8456b)'], pp: ['P', 'linear-gradient(135deg,#8b6cf6,#5b3fd1)'], tw: ['T', 'linear-gradient(135deg,#25b5a8,#0f766e)'], bb: ['B', 'linear-gradient(135deg,#ffcf3d,#f29a1f)'] };
  const DM_FACES = [
    ['#ffe0ea', '#f9b3c8', '#c99372', '#2a1d1a', '#c2185b', 1], ['#dbeaff', '#a8c8f5', '#a7704d', '#191210', '#334155', 0],
    ['#e6f6e9', '#b5e2c0', '#e4b38c', '#3a2618', '#3f8a43', 1], ['#fff1cc', '#ffd27a', '#b97c56', '#1f1712', '#a16207', 0],
    ['#efe7ff', '#cdb9fb', '#d9a37f', '#2b1b14', '#7c3aed', 1], ['#e1f5f3', '#a9e0d9', '#8a5638', '#120d0b', '#0f766e', 0],
    ['#ffe7dc', '#ffb89a', '#efc39d', '#5b3a22', '#ea580c', 1], ['#e8eefc', '#b9c9f2', '#c38b62', '#241a14', '#1d4ed8', 0],
  ];

  const ring = p => `<div class="ring${p < 70 ? ' amb' : ''}" data-p="${p}"><svg viewBox="0 0 44 44"><circle class="rb" cx="22" cy="22" r="18"/><circle class="rf" cx="22" cy="22" r="18"/></svg><span>0%</span></div>`;

  function build() {
    stage.innerHTML = TEMPLATE;
    $$('.lgslot').forEach((el, i) => el.dataset.p = 'cm' + i);
    $('#cm-dots').innerHTML = '<i></i>'.repeat(CAPS);
    $('#cm-gt').insertAdjacentHTML('beforeend', T_ROWS.map((r, i) =>
      `<tr class="rv"><td><div class="co"><span class="lt" style="background:${r[1]};color:${r[2]}">${r[0]}</span>${r[3]}</div></td><td>${r[4]}</td><td>${r[5]}</td><td><span class="ver" data-v="${r[7]}" data-i="${i}">Not enriched</span></td><td style="text-align:right"><span class="fit">${r[8]}%</span></td></tr>`).join(''));
    $('#cm-pg').innerHTML = PEOPLE.map((p, i) =>
      `<div class="card pc rv"><div class="pc-h">${photo(FACES[p[0]], 'p' + i, CO[p[1]], p[2])}<div><b>${p[3]}</b><small>${p[4]}</small><small style="color:#9a978e">${p[5]}</small></div>${ring(p[6])}</div>
      <div class="src"><i class="${p[8]}"><span class="si">${IC[p[2]]}</span>${p[7]}</i>· ${p[9]}</div><div class="pt">${p[10]}</div>
      <div class="ins"><b>✦ Insight</b>${p[11]}</div>
      <div class="pf"><div class="soc"><span>${IC.li}</span><span>${IC.mail}</span><span>${IC.x}</span></div><span class="btn">↗ View post</span><span class="btn g"${i === 0 ? ' id="cm-reach"' : ''}>Reach out</span></div></div>`).join('');
    $('#cm-dph').outerHTML = photo(FACES.rhea, 'dr', CO.fl, 'li');
    $('#cm-tomini').innerHTML = face(FACES.rhea, 'to');
    $$('#cm-seg span').forEach(x => x.insertAdjacentHTML('afterbegin', `<i class="si" style="width:15px;height:15px">${IC[x.dataset.i]}</i>`));
    $('#cm-ig').innerHTML = INTS.map(t =>
      `<div class="card ic2 rv${t[5] ? ' on' : ''}"><div class="ic2-h"><span class="lt" style="color:${t[1]}">${t[6] ? `<span style="width:24px;height:24px;display:block">${IC[t[6]]}</span>` : t[0]}</span><em>${t[3]}</em></div><b>${t[2]}</b><p>${t[4]}</p>
      <div class="ft"><div class="plug"><svg viewBox="0 0 26 14"><rect x="1" y="2" width="12" height="10" rx="3"/><path d="M13 5h6M13 9h6"/></svg><svg viewBox="0 0 26 14"><rect x="13" y="2" width="12" height="10" rx="3"/><path d="M1 7h12"/></svg></div><span class="btn">${t[5] ? '✓ Connected' : 'Connect'}</span></div></div>`).join('') +
      `<div class="req2 rv"><div class="lt" style="background:#f3f2ee;width:34px;height:34px;font-size:18px;font-weight:400">+</div><b>Don't see your tool?</b>Tell us what you use.<span>Request an integration →</span></div>`;
  }

  /* ---------- helpers ---------- */
  function scene(name) {
    $$('.sc').forEach(x => x.classList.toggle('on', x.dataset.s === name));
    $$('[data-nav]').forEach(x => x.classList.toggle('on', x.dataset.nav === NAV[name]));
    $('#cm-ask').classList.toggle('on', NAV[name] === 'ask');
    const c = CRUMB[name];
    $('#cm-crumb').innerHTML = `<span class="ic" style="background:${c[0]}"><svg viewBox="0 0 24 24" stroke="${c[1]}">${c[2]}</svg></span>${c[3]}`;
  }
  function caption(i, text) {
    const cap = $('#cm-cap');
    cap.classList.add('out');
    setTimeout(() => {
      $('#cm-capn').textContent = String(i).padStart(2, '0');
      $('#cm-capt').textContent = text;
      $$('#cm-dots i').forEach((d, k) => d.classList.toggle('on', k === i - 1));
      cap.classList.remove('out');
    }, 280);
  }
  function countTo(el, from, to, dur, fmt) {
    const t0 = performance.now(); fmt = fmt || (v => Math.round(v).toLocaleString('en-US'));
    const f = t => { const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3); el.textContent = fmt(from + (to - from) * e); if (k < 1) requestAnimationFrame(f); };
    requestAnimationFrame(f);
  }
  let credits = 2480;
  function spend(n) {
    const el = $('#cm-cred'); countTo(el.querySelector('span'), credits, credits - n, 900); credits -= n;
    el.classList.remove('tick'); void el.offsetWidth; el.classList.add('tick');
  }
  function fillRing(r) {
    const p = +r.dataset.p;
    r.querySelector('.rf').style.strokeDashoffset = (113.1 * (1 - p / 100)).toFixed(1);
    countTo(r.querySelector('span'), 0, p, 1100, v => Math.round(v) + '%');
  }
  function pos(el, ox, oy) {
    const s = stage.getBoundingClientRect(), r = el.getBoundingClientRect();
    return [(r.left - s.left) / scale + (ox ?? r.width / scale / 2), (r.top - s.top) / scale + (oy ?? r.height / scale / 2)];
  }

  async function run(first) {
    const id = ++runId;
    const s = ms => new Promise((res, rej) => {
      let left = ms;
      const step = () => {
        if (id !== runId) return rej(ABORT);
        if (!visible || document.hidden) return setTimeout(step, 200);
        if (left <= 0) return res();
        const d = Math.min(50, left); left -= d; setTimeout(step, d);
      };
      step();
    });
    const reveal = async (els, gap) => { for (const e of els) { e.classList.add('in'); await s(gap); } };
    const cur = () => $('#cm-cur');
    const moveTo = async (el, ox, oy, wait) => { const [x, y] = pos(el, ox, oy); cur().style.transform = `translate(${x - 4}px,${y - 3}px)`; await s(wait ?? 850); };
    const click = async el => { cur().classList.add('down'); el && el.classList.add('pressed'); await s(170); el && el.classList.remove('pressed'); await s(130); cur().classList.remove('down'); };
    const type = async (el, text, ms) => { for (let i = 0; i < text.length; i++) { el.textContent += text[i]; await s(ms + (text[i] === ' ' ? ms * .6 : 0)); } };

    build(); credits = 2480;
    try {
      /* 0 · loader */
      if (first) {
        const ld = $('#cm-load'); ld.querySelector('.lgslot').innerHTML = logo('a'); ld.classList.add('on');
        await s(2900);
        ld.classList.remove('on');
      }
      cur().style.transform = 'translate(760px,520px)';

      /* 1 · home */
      scene('home'); caption(1, 'Pick a recipe. Orka already knows your ICP.');
      await s(350);
      await reveal($$('[data-s="home"] .rv'), 110);
      cur().classList.add('on');
      await s(400);
      await moveTo($('#cm-lc-intent'), null, null, 900);
      $('#cm-lc-intent').classList.add('hot');
      await s(500);
      await moveTo($('#cm-ask'), 60, null, 900);
      await click($('#cm-ask'));

      /* 2 · ask orka */
      scene('orka'); caption(2, 'Ask Orka in plain words');
      await s(700);
      await moveTo($('.comp'), 200, 30, 700);
      $('#cm-ph').style.display = 'none'; $('#cm-caret').style.display = '';
      await type($('#cm-typed'), 'Find 11 companies hiring a product designer. Early-stage, India.', 26);
      $('#cm-send').classList.add('ready');
      await moveTo($('#cm-send'), null, null, 550);
      await click($('#cm-send'));
      $('#cm-typed').textContent = ''; $('#cm-caret').style.display = 'none'; $('#cm-ph').style.display = ''; $('#cm-send').classList.remove('ready');
      $('#cm-hero').classList.add('gone');
      await s(250);
      $('#cm-umsg').classList.add('in'); await s(400);
      $('#cm-omsg').classList.add('in'); await s(200);
      for (const st of $$('.st')) { st.classList.add('in'); await s(650); st.classList.add('done'); await s(120); }
      spend(60);
      $('#cm-say').classList.add('in'); await s(350);
      $('#cm-res').classList.add('in'); await s(300);
      await reveal($$('#cm-res tr.rv'), 140);
      await s(300);
      await moveTo($('#cm-open'), null, null, 850);
      await click($('#cm-open'));

      /* 3 · target list */
      scene('target'); caption(3, 'Target lists in about a minute');
      await s(500);
      countTo($('#cm-tcount'), 0, 21, 1200);
      await reveal($$('#cm-gt tr.rv'), 90);
      $('#cm-nx').classList.add('in');
      await s(300);
      await moveTo($('#cm-approve'), null, null, 900);
      await click($('#cm-approve'));
      $('#cm-nx').style.opacity = '.45';
      spend(110);
      for (const v of $$('#cm-gt .ver')) { v.innerHTML = `<span class="dm"><span class="mini">${face(DM_FACES[+v.dataset.i], 'd' + v.dataset.i)}</span>${v.dataset.v}<span class="si">${IC.li}</span></span>`; v.classList.add('done'); await s(110); }
      await s(900);

      /* 4 · intent list */
      scene('intent'); caption(4, 'Spot buyers posting a real need, right now');
      await s(500);
      countTo($('#cm-icount'), 0, 6, 900);
      for (const c of $$('#cm-pg .pc')) { c.classList.add('in'); fillRing(c.querySelector('.ring')); await s(160); }
      await s(900);
      await moveTo($('#cm-reach'), null, null, 900);
      await click($('#cm-reach'));

      /* 5 · reach out */
      caption(5, 'Outreach that mentions what they actually posted');
      $('#cm-shade').classList.add('on'); $('#cm-drw').classList.add('on');
      await s(700);
      await moveTo($('#cm-gen'), null, null, 700);
      await click($('#cm-gen'));
      await type($('#cm-subj'), 'Quick idea after your post', 18);
      const b1 = 'Hi Rhea, saw your post about needing a freelance Final Cut Pro editor.';
      const b2 = ' We help teams like yours move on this in days, not weeks.\n\nWould a 15-minute call next week work?\n\nBest,\nDave';
      const chars = $('#cm-chars');
      for (const [el, t] of [[$('#cm-b1'), b1], [$('#cm-b2'), b2]]) for (const ch of t) { el.textContent += ch; chars.textContent = $('#cm-b1').textContent.length + $('#cm-b2').textContent.length; await s(11); }
      await s(300);
      const sm = $('#cm-sendmail');
      await moveTo(sm, null, null, 800);
      await click(sm);
      sm.textContent = '✓ Sent';
      $('#cm-toast').classList.add('on');
      await s(1300);
      $('#cm-toast').classList.remove('on');
      $('#cm-drw').classList.remove('on'); $('#cm-shade').classList.remove('on');
      await s(450);

      /* 6 · communities */
      scene('comm'); caption(6, 'Join the rooms where your buyers talk');
      await s(500);
      for (const c of $$('#cm-cg .cc2')) { c.classList.add('in'); fillRing(c.querySelector('.ring')); await s(150); }
      await reveal($$('[data-s="comm"] .cc3'), 110);
      for (const b of $$('#cm-cg .btn')) {
        await moveTo(b, null, null, 650); await click(b);
        b.textContent = '✓ Joined'; b.classList.add('jn');
      }
      await s(700);

      /* 7 · history + credits */
      scene('hist'); caption(7, 'Every chat and every credit, accounted for');
      await s(500);
      await reveal($$('[data-s="hist"] .hr'), 90);
      await moveTo($('#cm-hsel'), 160, null, 800);
      await click($('#cm-hsel'));
      $('#cm-hsel').classList.add('sel');
      $('#cm-hd').classList.add('in');
      await s(350);
      countTo($('#cm-hc'), 0, -140, 1100, v => v < -0.5 ? '−' + Math.round(-v) : '0');
      $$('#cm-hd .bar i').forEach(b => b.style.width = b.dataset.w);
      await s(2000);

      /* 8 · integrations */
      scene('int'); caption(8, 'Plugs into the tools you already use');
      await s(500);
      await reveal($$('[data-s="int"] .rv'), 90);
      let n = 1;
      for (const c of $$('#cm-ig .ic2:not(.on)')) {
        const b = c.querySelector('.btn');
        await moveTo(b, null, null, 520); await click(b);
        c.classList.add('on'); b.textContent = '✓ Connected';
        $('#cm-ncon').textContent = ++n;
        await s(150);
      }
      await s(800);

      /* outro */
      cur().classList.remove('on');
      $('#cm-cap').classList.add('out');
      const out = $('#cm-out'); out.querySelector('.lgslot').innerHTML = logo('b'); out.classList.add('on');
      await s(4800);
      run(false);
    } catch (e) { if (e !== ABORT) throw e; }
  }

  if (reduce) {
    build(); scene('intent');
    $$('.rv').forEach(e => e.classList.add('in'));
    $$('.ring').forEach(fillRing);
    $('#cm-icount').textContent = '6';
    $('#cm-cap').classList.remove('out'); $('#cm-capt').textContent = 'Spot buyers posting a real need, right now'; $('#cm-capn').textContent = '04';
  } else {
    run(true);
  }

  return () => {
    runId++;
    controller.abort();
    resizeObserver.disconnect();
    visibilityObserver.disconnect();
    timers.forEach(window.clearTimeout);
    frames.forEach(window.cancelAnimationFrame);
  };
}
