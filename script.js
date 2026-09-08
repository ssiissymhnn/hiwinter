/* =========================================================================
   HI WINTER — Ready for Your Winter.
   Interactive mobile web-app prototype  (Vanilla JS)
   ========================================================================= */
'use strict';

/* ------------------------------------------------------------------ utils */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c =>
  ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
const won = n => n.toLocaleString('ko-KR') + '원';
const manwon = n => (n % 10000 === 0 ? (n / 10000) + '만원' : won(n));

/* ------------------------------------------------------------------ icons */
const P = { fill:'none', sw:1.7 };
function ic(name, size = 22, sw = P.sw) {
  const b = `viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"`;
  const s = {
    search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>',
    bell:'<path d="M18 8a6 6 0 1 0-12 0c0 6-2 7-2 7h16s-2-1-2-7"/><path d="M13.7 20a2 2 0 0 1-3.4 0"/>',
    home:'<path d="M3 10.2 12 3.5l9 6.7"/><path d="M5.5 9.4V20h13V9.4"/><path d="M9.8 20v-5.4h4.4V20"/>',
    plan:'<rect x="5" y="4" width="14" height="17" rx="2.5"/><path d="M9 3h6v3H9z"/><path d="M8.8 11h6.4M8.8 15.4h4.4"/>',
    outfit:'<path d="M9 3.5 6 5.2 4 9l2.6 1.4V20h10.8v-9.6L20 9l-2-3.8-3-1.7"/><path d="M9 3.5a3 3 0 0 0 6 0"/>',
    users:'<circle cx="9.5" cy="8.5" r="3"/><path d="M3.8 19.2c.5-3 2.9-4.7 5.7-4.7s5.2 1.7 5.7 4.7"/><path d="M16.4 6.4a2.9 2.9 0 0 1 0 5.5"/><path d="M17.6 14.9c2 .5 3.3 1.9 3.7 4"/>',
    user:'<circle cx="12" cy="8" r="3.6"/><path d="M4.6 20c.6-3.7 3.6-5.8 7.4-5.8s6.8 2.1 7.4 5.8"/>',
    right:'<path d="m9.5 5.5 6.5 6.5-6.5 6.5"/>',
    left:'<path d="M14.5 5.5 8 12l6.5 6.5"/>',
    down:'<path d="m6 9.5 6 6 6-6"/>',
    plus:'<path d="M12 5v14M5 12h14"/>',
    check:'<path d="m5 12.5 4.5 4.5L19 7"/>',
    x:'<path d="M6 6l12 12M18 6 6 18"/>',
    heart:'<path d="M12 20s-7.5-4.4-7.5-9.4A4.1 4.1 0 0 1 12 8.1a4.1 4.1 0 0 1 7.5 2.5c0 5-7.5 9.4-7.5 9.4Z"/>',
    heartF:'<path d="M12 20s-7.5-4.4-7.5-9.4A4.1 4.1 0 0 1 12 8.1a4.1 4.1 0 0 1 7.5 2.5c0 5-7.5 9.4-7.5 9.4Z" fill="currentColor" stroke="none"/>',
    chat:'<path d="M20.5 11.6c0 4-3.8 7.2-8.5 7.2a10 10 0 0 1-2.6-.3L4.5 20l1.2-3.3a6.9 6.9 0 0 1-2.2-5.1c0-4 3.8-7.2 8.5-7.2s8.5 3.2 8.5 7.2Z"/>',
    bookmark:'<path d="M6.5 4.5h11v15.8l-5.5-3.6-5.5 3.6Z"/>',
    bookmarkF:'<path d="M6.5 4.5h11v15.8l-5.5-3.6-5.5 3.6Z" fill="currentColor" stroke="none"/>',
    share:'<path d="M8 12v7.5h8V12"/><path d="M12 15V4.5"/><path d="m8.4 8 3.6-3.6L15.6 8"/>',
    trash:'<path d="M5.5 7h13"/><path d="M9 7V5h6v2"/><path d="M7 7l.8 12.2h8.4L17 7"/>',
    cal:'<rect x="4" y="5.5" width="16" height="14.5" rx="2.5"/><path d="M4 10h16M8.5 3.5V7M15.5 3.5V7"/>',
    pin:'<path d="M12 21s6.2-6 6.2-10.4A6.2 6.2 0 1 0 5.8 10.6C5.8 15 12 21 12 21Z"/><circle cx="12" cy="10.4" r="2.2"/>',
    ticket:'<path d="M3.5 8.5V6.4h17v2.1a2.6 2.6 0 0 0 0 5.2v4.3h-17v-4.3a2.6 2.6 0 0 0 0-5.2Z"/><path d="M13.5 7.4v9.6"/>',
    mountain:'<path d="M3 19.5 9.7 7.2l3.4 5.9 2-3.1 5.9 9.5Z"/><path d="m8.2 10 3 1.6"/>',
    bed:'<path d="M3.5 19v-9"/><path d="M3.5 13.5h17V19"/><path d="M6.8 10.4h4.4v3.1H6.8z"/><path d="M20.5 13.5v-2.1a2.6 2.6 0 0 0-2.6-2.6h-4.3v4.7"/>',
    box:'<path d="M12 3.6 20.2 8v8L12 20.4 3.8 16V8Z"/><path d="M3.8 8 12 12.4 20.2 8M12 12.4v8"/>',
    cam:'<rect x="3.4" y="7" width="17.2" height="13" rx="3"/><circle cx="12" cy="13.5" r="3.6"/><path d="M8.6 7 10 4.5h4L15.4 7"/>',
    ai:'<path d="m12 3.6 1.9 4.6 4.6 1.9-4.6 1.9L12 16.6l-1.9-4.6L5.5 10.1l4.6-1.9Z"/><path d="M18.4 15.6l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8Z"/>',
    filter:'<path d="M4.5 7.5h15M7 12h10M10 16.5h4"/>',
    sliders:'<path d="M4.5 8h11M18 8h1.5M4.5 16h4M11 16h8.5"/><circle cx="16.4" cy="8" r="1.9"/><circle cx="9.4" cy="16" r="1.9"/>',
    gear:'<circle cx="12" cy="12" r="3.1"/><path d="M19.6 12a7.6 7.6 0 0 0-.1-1.2l2-1.5-2-3.4-2.3 1a7.5 7.5 0 0 0-2-1.2L14.8 3H9.2l-.4 2.7a7.5 7.5 0 0 0-2 1.2l-2.3-1-2 3.4 2 1.5a7.6 7.6 0 0 0 0 2.4l-2 1.5 2 3.4 2.3-1a7.5 7.5 0 0 0 2 1.2l.4 2.7h5.6l.4-2.7a7.5 7.5 0 0 0 2-1.2l2.3 1 2-3.4-2-1.5c.1-.4.1-.8.1-1.2Z"/>',
    edit:'<path d="M15.6 4.9 19 8.3 8.6 18.7l-4.2.8.8-4.2Z"/><path d="m13.6 6.9 3.4 3.4"/>',
    img:'<rect x="3.5" y="5" width="17" height="14" rx="2.6"/><circle cx="9" cy="10" r="1.7"/><path d="m4.6 17.4 4.6-4.3 3.2 2.7 3-2.6 4 3.7"/>',
    cart:'<path d="M3.5 4.5h2.3l2.2 10.2h9.3l1.9-7.4H6.6"/><circle cx="10" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/>',
    info:'<circle cx="12" cy="12" r="8.4"/><path d="M12 11v5.4M12 8.1v.1"/>',
    help:'<circle cx="12" cy="12" r="8.4"/><path d="M9.7 9.7a2.4 2.4 0 1 1 3.1 2.3c-.5.2-.8.7-.8 1.3v.4M12 16.6v.1"/>',
    clock:'<circle cx="12" cy="12" r="8.4"/><path d="M12 7.4V12l3 1.8"/>',
    snow:'<path d="M12 3.5v17M4.6 7.8l14.8 8.4M19.4 7.8 4.6 16.2"/><path d="m9.6 5.2 2.4 2 2.4-2M9.6 18.8l2.4-2 2.4 2"/>',
    star:'<path d="m12 4.4 2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4-3.9-3.8 5.4-.8Z"/>',
    shield:'<path d="M12 3.6 19 6v6c0 4.2-3 7.2-7 8.4-4-1.2-7-4.2-7-8.4V6Z"/><path d="m9.2 12 2 2 3.6-3.8"/>',
    logout:'<path d="M10 4.5H5.5v15H10"/><path d="M14.6 8.4 18.2 12l-3.6 3.6M18.2 12H9.4"/>',
    eye:'<path d="M2.8 12S6.4 6.2 12 6.2 21.2 12 21.2 12 17.6 17.8 12 17.8 2.8 12 2.8 12Z"/><circle cx="12" cy="12" r="2.8"/>',
    won:'<path d="M4 8h16M4 11.6h16"/><path d="m6.4 8 2.8 8.4L12 9.6l2.8 6.8L17.6 8"/>',
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6"/>',
    more:'<circle cx="6" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="18" cy="12" r="1.3" fill="currentColor" stroke="none"/>',
    flame:'<path d="M12 20.5c3.3 0 5.8-2.3 5.8-5.4 0-3.9-3.4-5.3-2.6-9.6-2.6.7-4.3 3-4.3 5.2 0 .9-.7 1.3-1.2.8-.7-.7-1-1.7-1-2.6-1.5 1.3-2.5 3.4-2.5 6.2 0 3.1 2.5 5.4 5.8 5.4Z"/>',
    lift:'<path d="M3 6.2 21 9"/><path d="M8 7.1v3.2M16 8.4v3.2"/><rect x="5.4" y="10.3" width="5.2" height="4" rx="1.2"/><rect x="13.4" y="11.6" width="5.2" height="4" rx="1.2"/>',
    board:'<path d="M12 3.2c2.6 2.4 3.6 5.2 3.6 8.8s-1 6.4-3.6 8.8c-2.6-2.4-3.6-5.2-3.6-8.8S9.4 5.6 12 3.2Z"/><path d="M12 8.2v7.6"/>',
    tshirt:'<path d="M9 4 5.5 5.6 3.6 9.2l2.8 1.4V20h11.2v-9.4l2.8-1.4-1.9-3.6L15 4a3 3 0 0 1-6 0Z"/>',
    glove:'<path d="M7 20.5v-5.8c-1.5-.4-2.4-1.5-2.4-2.8 0-1.2.8-2 1.9-2 .6 0 1.1.2 1.5.7V6.2c0-1 .7-1.7 1.6-1.7s1.6.7 1.6 1.7v3.9"/><path d="M11.2 10.1V5.4c0-1 .7-1.7 1.6-1.7s1.6.7 1.6 1.7v4.7"/><path d="M14.4 10.1V7c0-1 .7-1.6 1.5-1.6s1.6.6 1.6 1.6v7.6c0 3-1.4 5.9-3 5.9H7"/>',
    goggle:'<path d="M4 10.4c0-2 1.6-3.4 4-3.4h8c2.4 0 4 1.4 4 3.4 0 3.2-1.9 5.6-4.5 5.6-1.4 0-2.3-.8-3.5-.8s-2.1.8-3.5.8C5.9 16 4 13.6 4 10.4Z"/><path d="M4.4 8.6C6 7 8 6.2 10.2 6.2"/>',
    helmet:'<path d="M4 14.2a8 8 0 0 1 16 0v1.4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><path d="M4.3 12.6h15.4"/>',
    boot:'<path d="M7 4h4.6v8.4c0 1.6.8 2.6 2.4 3.2l3.6 1.4c1.2.5 1.9 1.2 1.9 2.2v.8H7Z"/><path d="M7 8.6h4.6"/>',
    pants:'<path d="M7.4 4h9.2l.9 16h-4l-1.5-9.6L10.5 20h-4Z"/>',
    wallet:'<rect x="3.5" y="6" width="17" height="13" rx="3"/><path d="M3.5 10h17"/><circle cx="16.4" cy="14.4" r="1.2" fill="currentColor" stroke="none"/>',
    doc:'<path d="M6 3.6h7.4L18.4 8v12.4H6Z"/><path d="M13.2 3.6V8h5"/><path d="M9 13h6M9 16.4h4"/>',
    hanger:'<path d="M12 8.4a2.2 2.2 0 1 1 2.2-2.2"/><path d="M12 8.4v2.2L4 15.6c-1 .6-.6 2.2.6 2.2h14.8c1.2 0 1.6-1.6.6-2.2L12 10.6"/>'
  }[name] || '';
  return `<svg ${b}>${s}</svg>`;
}

/* -------------------------------------------------- photo placeholder art */
let _phId = 0;
const PH_SETS = {
  mountain: [['#DCEBF7','#9FC4E0'], ['#E4EEF6','#AFCADD'], ['#D6E7F5','#94BDDC']],
  slope:    [['#EAF3FA','#BCD6E8'], ['#E2EEF8','#A9CBE4']],
  lift:     [['#DCEAF6','#A6C6DF'], ['#E6F0F8','#B6D0E2']],
  room:     [['#F3EDE4','#D6C4AC'], ['#F1E9DE','#CBB89E']],
  deck:     [['#EDF1F5','#CBD6E0'], ['#F0EEF6','#D2CCE2']],
  goggle:   [['#E9EEF3','#C3CFDA'], ['#EDEBF4','#CBC5DC']],
  jacket:   [['#E8EFF5','#C2D3E0'], ['#F2ECEE','#DCC7CD']],
  pants:    [['#ECEFF3','#C9D2DB'], ['#EAEEF4','#C4CFDC']],
  helmet:   [['#EDF0F4','#CAD3DC']],
  glove:    [['#EFEDF2','#D0CBD8']],
  boot:     [['#EEF0F3','#CCD2D9']],
  person:   [['#E7EEF5','#BBD0E1'], ['#F0EBE6','#D3C3B4']],
  rider:    [['#DCEBF7','#9CC1DE'], ['#E3EDF6','#A8C6DD']],
  gear:     [['#EDF1F5','#C9D4DE']]
};
function phPick(kind, seed) {
  const set = PH_SETS[kind] || PH_SETS.gear;
  return set[Math.abs(seed) % set.length];
}
function phArt(kind, c2) {
  const w = 'rgba(255,255,255,.86)', w2 = 'rgba(255,255,255,.55)';
  switch (kind) {
    case 'mountain': return `
      <circle cx="76" cy="22" r="9" fill="${w2}"/>
      <path d="M-4 78 26 34l20 26 12-14 34 32v26H-4Z" fill="${c2}" opacity=".55"/>
      <path d="M-4 84 30 44l22 28 14-15 40 34v14H-4Z" fill="${c2}"/>
      <path d="M30 44 18 58h24Z" fill="${w}"/><path d="m66 57-9 10h18Z" fill="${w}"/>`;
    case 'slope': return `
      <path d="M0 62c26 0 44 12 60 22s28 12 44 12v14H0Z" fill="${w}"/>
      <path d="M14 60l5-13 5 13Zm22-6 5-13 5 13Zm40 12 5-13 5 13Z" fill="${c2}" opacity=".7"/>
      <path d="M0 74c30 2 48 14 66 22s22 8 38 8v6H0Z" fill="${c2}" opacity=".35"/>`;
    case 'lift': return `
      <path d="M-2 26 102 44" stroke="${c2}" stroke-width="2.4" fill="none"/>
      <path d="M0 78c22 0 40 8 56 16h46v14H0Z" fill="${w}"/>
      <g fill="${c2}"><rect x="20" y="32" width="3" height="12" rx="1.4"/><rect x="12" y="43" width="20" height="14" rx="4"/>
      <rect x="68" y="40" width="3" height="12" rx="1.4"/><rect x="60" y="51" width="20" height="14" rx="4"/></g>`;
    case 'room': return `
      <rect x="0" y="58" width="100" height="42" fill="${c2}" opacity=".45"/>
      <rect x="16" y="18" width="40" height="30" rx="3" fill="${w}"/>
      <path d="M36 18v30M16 33h40" stroke="${c2}" stroke-width="1.6"/>
      <rect x="64" y="52" width="30" height="20" rx="4" fill="${w2}"/>`;
    case 'deck': return `
      <path d="M50 8c9 11 13 24 13 42s-4 31-13 42c-9-11-13-24-13-42S41 19 50 8Z" fill="${w}"/>
      <path d="M50 20v60" stroke="${c2}" stroke-width="2.6" stroke-linecap="round"/>
      <circle cx="50" cy="36" r="4" fill="${c2}" opacity=".6"/><circle cx="50" cy="64" r="4" fill="${c2}" opacity=".6"/>`;
    case 'goggle': return `
      <path d="M14 44c0-9 7-15 18-15h36c11 0 18 6 18 15 0 14-8 25-20 25-6 0-10-4-16-4s-10 4-16 4c-12 0-20-11-20-25Z" fill="${w}"/>
      <path d="M22 44c0-6 5-10 12-10h32c7 0 12 4 12 10 0 9-6 16-13 16-5 0-8-3-15-3s-10 3-15 3c-7 0-13-7-13-16Z" fill="${c2}" opacity=".75"/>
      <path d="M26 40c4-4 10-6 16-6" stroke="${w}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    case 'jacket': return `
      <path d="M38 20 22 27l-7 19 11 5v33h48V51l11-5-7-19-16-7Z" fill="${w}"/>
      <path d="M38 20a12 12 0 0 0 24 0" fill="none" stroke="${c2}" stroke-width="2.4"/>
      <path d="M50 27v57" stroke="${c2}" stroke-width="2" opacity=".7"/>`;
    case 'pants': return `
      <path d="M32 16h36l4 68H55l-5-38-5 38H28Z" fill="${w}"/>
      <path d="M32 30h36" stroke="${c2}" stroke-width="2"/><path d="M50 46v38" stroke="${c2}" stroke-width="1.6" opacity=".6"/>`;
    case 'helmet': return `
      <path d="M16 62a34 34 0 0 1 68 0v6a6 6 0 0 1-6 6H22a6 6 0 0 1-6-6Z" fill="${w}"/>
      <path d="M17 56h66" stroke="${c2}" stroke-width="3"/>`;
    case 'glove': return `
      <path d="M30 84V54c-6-2-10-7-10-12 0-5 3-8 8-8 3 0 5 1 7 3V22c0-4 3-7 7-7s7 3 7 7v18" fill="${w}"/>
      <path d="M49 40V18c0-4 3-7 7-7s7 3 7 7v22h4V26c0-4 3-7 7-7s7 3 7 7v32c0 14-6 26-13 26H30" fill="${w}"/>`;
    case 'boot': return `
      <path d="M28 16h22v38c0 7 3 11 11 14l16 6c5 2 8 5 8 9v5H28Z" fill="${w}"/>
      <path d="M28 34h22M28 48h22" stroke="${c2}" stroke-width="2"/>`;
    case 'person': return `
      <circle cx="50" cy="36" r="17" fill="${w}"/>
      <path d="M14 100c0-19 16-30 36-30s36 11 36 30Z" fill="${w}"/>`;
    case 'rider': return `
      <path d="M0 74c26 0 46 10 62 20h38v10H0Z" fill="${w}"/>
      <g fill="${c2}"><circle cx="46" cy="26" r="8"/>
      <path d="M40 34h14l6 18-7 4 3 16h-8l-4-14-8 6-4-8 8-8Z"/>
      <path d="M22 66c8-6 22-9 34-8" stroke="${c2}" stroke-width="4" fill="none" stroke-linecap="round"/></g>`;
    default: return `
      <rect x="26" y="30" width="48" height="40" rx="6" fill="${w}"/>
      <path d="M26 44h48M50 30v40" stroke="${c2}" stroke-width="2"/>`;
  }
}
function ph(kind, seed = 0, cls = '', style = '') {
  const [c1, c2] = phPick(kind, seed);
  const id = 'phg' + (_phId++);
  return `<div class="ph ${cls}" style="${style}">
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
      <defs><linearGradient id="${id}" x1="0" y1="0" x2="0.4" y2="1">
        <stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>
      <rect width="100" height="100" fill="url(#${id})"/>${phArt(kind, c2)}
    </svg></div>`;
}

/* ------------------------------------------------ virtual fitting artwork */
const NEUTRAL = { jacket:'#D8DEE5', pants:'#CFD6DE', goggle:'#C6CED6', helmet:'#D5DBE2', glove:'#D2D8DF' };
function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const f = v => Math.max(0, Math.min(255, Math.round(v + amt)));
  return '#' + [f(n >> 16), f((n >> 8) & 255), f(n & 255)].map(v => v.toString(16).padStart(2, '0')).join('');
}
function riderSvg(sel = {}, h = 400) {
  const c = k => (sel[k] && sel[k].color) || NEUTRAL[k];
  const J = c('jacket'), PA = c('pants'), G = c('goggle'), H = c('helmet'), GL = c('glove');
  return `<svg viewBox="0 0 220 420" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="110" cy="404" rx="78" ry="9" fill="#000" opacity=".07"/>
    <g><rect x="26" y="374" width="168" height="16" rx="8" fill="#2C333C"/>
       <rect x="26" y="374" width="168" height="6" rx="3" fill="#3E4854"/>
       <rect x="70" y="368" width="26" height="8" rx="3" fill="#1B2027"/>
       <rect x="124" y="368" width="26" height="8" rx="3" fill="#1B2027"/></g>
    <g fill="${PA}">
      <path d="M74 198h72l6 22-8 130h-30l-4-96-4 96H70l-2-130Z"/>
    </g>
    <path d="M110 240v110" stroke="${shade(PA,-22)}" stroke-width="2" opacity=".5"/>
    <g fill="#262B32"><rect x="64" y="342" width="44" height="30" rx="10"/><rect x="112" y="342" width="44" height="30" rx="10"/></g>
    <path d="M70 106 44 118 32 196l30 10 12-54Z" fill="${shade(J,-16)}"/>
    <path d="M150 106l26 12 12 78-30 10-12-54Z" fill="${shade(J,-16)}"/>
    <path d="M72 108c0-12 14-22 38-22s38 10 38 22l6 106H66Z" fill="${J}"/>
    <path d="M72 132h76" stroke="${shade(J,-20)}" stroke-width="2" opacity=".45"/>
    <path d="M110 92v122" stroke="${shade(J,-30)}" stroke-width="2.4" opacity=".55"/>
    <path d="M88 90h44l-8 16h-28Z" fill="${shade(J,-34)}"/>
    <rect x="26" y="188" width="40" height="34" rx="13" fill="${GL}"/>
    <rect x="154" y="188" width="40" height="34" rx="13" fill="${GL}"/>
    <rect x="98" y="76" width="24" height="20" rx="6" fill="#E8CFB8"/>
    <circle cx="110" cy="62" r="31" fill="#F0DAC5"/>
    <path d="M79 64a31 31 0 0 1 62 0Z" fill="${H}"/>
    <path d="M79 60h62v8H79Z" fill="${shade(H,-24)}"/>
    <rect x="74" y="52" width="72" height="8" rx="4" fill="${shade(G,-30)}"/>
    <rect x="76" y="48" width="68" height="30" rx="14" fill="${shade(G,-16)}"/>
    <rect x="82" y="53" width="56" height="20" rx="10" fill="${G}"/>
    <path d="M88 57c5-3 12-4 18-4" stroke="#fff" stroke-width="3" opacity=".55" fill="none" stroke-linecap="round"/>
    <path d="M100 88c4 3 16 3 20 0" stroke="#DFC3A8" stroke-width="2" fill="none"/>
  </svg>`;
}

/* ==========================================================================
   DUMMY DATA
   ========================================================================== */
const RESORTS = [
  { id:'phoenix',   name:'휘닉스 평창', region:'강원 평창', open:'12.19', dday:12, slopes:21, lifts:9, night:'~22:00',
    price:790000, sale:'~11.30', use:'12.19 ~ 3.9', time:'09:00 ~ 22:00', temp:-6, wx:'눈', snow:'상',
    perks:['주차 무료','렌탈 20%','동반 1인 할인','리프트 우선탑승'], art:'mountain', seed:1 },
  { id:'yongpyong', name:'용평 리조트', region:'강원 평창', open:'12.04', dday:27, slopes:28, lifts:14, night:'~23:00',
    price:850000, sale:'~11.20', use:'11.28 ~ 3.30', time:'08:30 ~ 23:00', temp:-8, wx:'맑음', snow:'상',
    perks:['곤돌라 이용','주차 무료','숙박 15%','슬로프 최다'], art:'slope', seed:2 },
  { id:'highone',   name:'하이원', region:'강원 정선', open:'12.11', dday:19, slopes:18, lifts:10, night:'~21:30',
    price:720000, sale:'~12.05', use:'12.11 ~ 3.22', time:'09:00 ~ 21:30', temp:-9, wx:'흐림', snow:'중',
    perks:['설질 우수','주차 무료','장비 보관'], art:'lift', seed:3 },
  { id:'alpensia',  name:'알펜시아', region:'강원 평창', open:'12.06', dday:21, slopes:6, lifts:3, night:'~22:00',
    price:590000, sale:'~11.25', use:'12.06 ~ 3.8', time:'09:00 ~ 22:00', temp:-7, wx:'눈', snow:'상',
    perks:['최저가','파크 운영','스키하우스'], art:'mountain', seed:4 },
  { id:'vivaldi',   name:'비발디파크', region:'강원 홍천', open:'11.29', dday:5, slopes:13, lifts:10, night:'~03:00',
    price:680000, sale:'~11.15', use:'11.29 ~ 3.15', time:'08:30 ~ 03:00', temp:-4, wx:'맑음', snow:'중',
    perks:['심야 운영','수도권 최근접','파크 강세'], art:'slope', seed:5 },
  { id:'konjiam',   name:'곤지암', region:'경기 광주', open:'12.02', dday:17, slopes:11, lifts:5, night:'~익일 02:00',
    price:990000, sale:'~11.18', use:'12.02 ~ 3.2', time:'09:00 ~ 02:00', temp:-3, wx:'맑음', snow:'상',
    perks:['인원 제한 운영','발렛 주차','대기 최소'], art:'lift', seed:6 }
];
const R = id => RESORTS.find(r => r.id === id) || RESORTS[0];

const ITEMS = {
  jacket: [
    { id:'j1', n:'오로라 3L 쉘 자켓', b:'BURTON', p:398000, color:'#1CB4FF' },
    { id:'j2', n:'미드나잇 아노락', b:'VOLCOM', p:329000, color:'#2C3E63' },
    { id:'j3', n:'스노우 화이트 다운', b:'686', p:459000, color:'#EDF1F5' },
    { id:'j4', n:'세이지 고어텍스', b:'DC', p:389000, color:'#7C8F6E' },
    { id:'j5', n:'블랙 미니멀 쉘', b:'ANALOG', p:298000, color:'#24282E' },
    { id:'j6', n:'코랄 오버핏 자켓', b:'ROXY', p:279000, color:'#F0784F' }
  ],
  pants: [
    { id:'p1', n:'블랙 카고 팬츠', b:'BURTON', p:239000, color:'#23272C' },
    { id:'p2', n:'라이트 그레이 빕', b:'686', p:289000, color:'#C3CAD2' },
    { id:'p3', n:'네이비 인슐레이티드', b:'VOLCOM', p:259000, color:'#2A3A56' },
    { id:'p4', n:'아이보리 와이드', b:'ROME', p:219000, color:'#E4DCCC' },
    { id:'p5', n:'올리브 카고', b:'DC', p:199000, color:'#6C7358' }
  ],
  goggle: [
    { id:'g1', n:'실버 크롬 렌즈', b:'OAKLEY', p:189000, color:'#B9C4CE' },
    { id:'g2', n:'블루 미러 렌즈', b:'ANON', p:159000, color:'#3FA7E8' },
    { id:'g3', n:'옐로우 로우라이트', b:'DRAGON', p:139000, color:'#E8C24A' },
    { id:'g4', n:'블랙 폴라라이즈드', b:'SMITH', p:219000, color:'#33383E' }
  ],
  helmet: [
    { id:'h1', n:'매트 블랙 헬멧', b:'GIRO', p:149000, color:'#22262B' },
    { id:'h2', n:'화이트 헬멧', b:'ANON', p:169000, color:'#EEF1F4' },
    { id:'h3', n:'스카이 블루 헬멧', b:'SMITH', p:179000, color:'#1CB4FF' }
  ],
  glove: [
    { id:'l1', n:'블랙 미튼', b:'BURTON', p:99000, color:'#2A2E34' },
    { id:'l2', n:'그레이 3핑거', b:'686', p:89000, color:'#9AA4AE' },
    { id:'l3', n:'브라운 레더 글러브', b:'HESTRA', p:159000, color:'#8A6244' }
  ]
};
const SLOTS = [
  { k:'jacket', label:'JACKET', art:'jacket', ko:'자켓' },
  { k:'pants',  label:'PANTS',  art:'pants',  ko:'팬츠' },
  { k:'goggle', label:'GOGGLE', art:'goggle', ko:'고글' },
  { k:'helmet', label:'HELMET', art:'helmet', ko:'헬멧' },
  { k:'glove',  label:'GLOVE',  art:'glove',  ko:'장갑' }
];
const itemOf = (k, id) => (ITEMS[k] || []).find(i => i.id === id);

const CATS = [
  { k:'all',    ko:'전체',       icon:'users',  art:'mountain' },
  { k:'mate',   ko:'라이딩 메이트', icon:'users',  art:'rider' },
  { k:'house',  ko:'시즌방/숙소', icon:'bed',    art:'room' },
  { k:'info',   ko:'정보/팁',     icon:'info',   art:'slope' },
  { k:'qna',    ko:'Q&A',        icon:'help',   art:'lift' },
  { k:'outfit', ko:'OUTFIT',     icon:'tshirt', art:'jacket' },
  { k:'gear',   ko:'GEAR',       icon:'board',  art:'deck' },
  { k:'market', ko:'마켓',        icon:'cart',   art:'gear' }
];
const CAT = k => CATS.find(c => c.k === k) || CATS[0];
const CAT_TAG = { mate:'violet', house:'', info:'green', qna:'amber', outfit:'violet', gear:'gray', market:'red' };

const POSTS = [
  { id:'t1', cat:'mate', t:'이번 주말 용평 같이 타실 분 구해요!', w:'라이딩곰', lv:'5년차 · 프리스타일',
    resort:'용평 리조트', time:'2분 전', likes:2, cmts:0, art:'lift', seed:1, hot:false, new:true,
    d:'1/18 (토) 하루 종일 용평에서 라이딩 예정입니다!\n실력 상관없이 즐겁게 타실 분 환영해요 🙌',
    form:{ '스키장':'용평 리조트', '날짜':'1월 18일 (토)', '라이딩 스타일':'프리스타일 / 그라운드트릭', '실력':'중급 이상', '모집 인원':'2 ~ 3명' },
    body:'안녕하세요! 이번 주말 용평에서 하루 종일 탈 예정입니다.\n\n오전 9시 렌탈샵 앞에서 만나서 같이 올라가면 좋을 것 같아요.\n중간에 점심 먹고 오후까지 천천히 타는 스타일입니다.\n\n장비는 각자 준비해 오시면 되고, 카풀 가능하신 분은 댓글 남겨주세요!\n실력은 크게 상관없지만 리프트 혼자 타실 수 있는 정도면 좋겠습니다 :)' },
  { id:'t2', cat:'house', t:'알펜시아 시즌방 남성 2명 구합니다', w:'파우더러', lv:'8년차 · 카빙',
    resort:'알펜시아', time:'15분 전', likes:4, cmts:6, art:'room', seed:2, hot:false,
    d:'알펜시아 도보 3분 거리! 관리비 포함 60만원\n장기 계약 우대합니다 :)',
    form:{ '스키장':'알펜시아', '위치':'평창군 대관령면 (도보 3분)', '기간':'12.01 ~ 3.15 (3.5개월)', '인원':'2명 모집 (현재 4명)', '성별':'남성', '비용':'60만원 (관리비 포함)' },
    body:'알펜시아 도보 3분 거리 빌라 시즌방입니다.\n\n· 방 3개 / 화장실 2개, 총 6인 생활\n· 주차 2대 가능, 장비 보관 창고 별도\n· 세탁기, 건조기, 정수기 완비\n\n주말 위주로 오시는 분들이 많아 평일은 여유롭습니다.\n금액은 시즌 전체 60만원이고 공과금은 인원수대로 나눕니다.\n관심 있으시면 채팅 주세요!' },
  { id:'t3', cat:'info', t:'24/25 스키장 개장일 정리 (최신)', w:'스노우노트', lv:'12년차 · 올라운드',
    resort:'전체 스키장', time:'1시간 전', likes:18, cmts:3, art:'slope', seed:3, hot:false,
    d:'개장 일정 업데이트 되었어요!\n이번 시즌도 안전하고 즐겁게 타요 🏂',
    body:'주요 스키장 개장 예정일 정리했습니다. (11월 기준, 기상 상황에 따라 변동될 수 있어요)\n\n· 비발디파크 — 11월 29일\n· 곤지암 — 12월 2일\n· 용평 리조트 — 12월 4일\n· 알펜시아 — 12월 6일\n· 하이원 — 12월 11일\n· 휘닉스 평창 — 12월 19일\n\n초반에는 슬로프가 일부만 열리는 곳이 많으니 방문 전 공지 꼭 확인하세요.\n시즌권 얼리버드는 대부분 11월 중순에 마감됩니다!' },
  { id:'t4', cat:'market', t:'[판매] 23-24 버튼 데크 155cm 팝니다', w:'덕스탠스', lv:'6년차 · 파크',
    resort:'홍대입구', time:'2시간 전', likes:7, cmts:2, art:'deck', seed:4, hot:false,
    d:'사용감 적고 상태 좋습니다.\n직거래 (홍대입구) 선호해요!',
    body:'23-24 시즌 두 달 정도 탄 데크입니다.\n엣지 상태 좋고 베이스 큰 손상 없습니다.\n\n· 사이즈 155cm / 캠버\n· 사용 기간: 2개월 (약 12회)\n· 정가 620,000원 → 320,000원\n\n직거래는 홍대입구역 선호하고, 택배도 가능합니다 (착불).' },
  { id:'t5', cat:'house', t:'휘닉스 평창 시즌방 여성 1명 구해요!', w:'평창러버', lv:'4년차 · 카빙',
    resort:'휘닉스 평창', time:'3시간 전', likes:12, cmts:8, art:'room', seed:5, hot:true,
    d:'여성 전용 시즌방 마지막 한 자리 남았습니다.',
    form:{ '스키장':'휘닉스 평창', '위치':'평창군 봉평면 (차량 5분)', '기간':'12.19 ~ 3.9', '인원':'1명 모집 (현재 5명)', '성별':'여성', '비용':'75만원 (관리비 별도)' },
    body:'휘닉스 평창 셔틀 정류장 근처 여성 전용 시즌방입니다.\n\n· 2인 1실 / 총 6인\n· 주방, 세탁기, 건조기 완비\n· 장비 보관 공간 넉넉합니다\n\n조용한 분위기 좋아하는 분들이 모여있어요.\n궁금한 점은 편하게 댓글 주세요!' },
  { id:'t6', cat:'mate', t:'12/21 (토) 휘닉스 같이 라이딩하실 분!', w:'그라운드킴', lv:'7년차 · 그라운드트릭',
    resort:'휘닉스 평창', time:'5시간 전', likes:24, cmts:6, art:'rider', seed:6, hot:true,
    d:'그라운드트릭 위주로 탑니다. 초보도 환영!',
    form:{ '스키장':'휘닉스 평창', '날짜':'12월 21일 (토)', '라이딩 스타일':'그라운드트릭', '실력':'무관', '모집 인원':'3 ~ 4명' },
    body:'개장 주간에 휘닉스에서 같이 타실 분 구합니다.\n\n오전 첫차로 올라가서 야간까지 풀로 탈 예정이에요.\n그라운드트릭 위주로 타지만 초보분들도 편하게 오세요, 알려드릴 수 있습니다!\n\n숙소는 각자 해결이고, 저녁은 같이 먹으면 좋을 것 같아요 🙂' },
  { id:'t7', cat:'info', t:'휘닉스 24/25 시즌권 얼리버드 정보 공유!', w:'시즌권요정', lv:'9년차 · 올라운드',
    resort:'휘닉스 평창', time:'8시간 전', likes:33, cmts:12, art:'mountain', seed:7, hot:true,
    d:'얼리버드 마감 임박! 가격 정리해드립니다.',
    body:'휘닉스 평창 시즌권 얼리버드 정보입니다.\n\n· 1차 얼리버드 — 종료\n· 2차 얼리버드 — 11월 30일까지 790,000원\n· 정상가 — 990,000원\n\n동반 1인 리프트권 할인, 렌탈 20% 할인 혜택이 포함됩니다.\n주차는 시즌 내내 무료이고, 스키하우스 라커는 별도 결제예요.\n\n작년보다 6만원 정도 올랐지만 야간 운영 시간이 늘어난 건 좋네요!' },
  { id:'t8', cat:'qna', t:'데크 길이 어떻게 고르는 게 맞을까요?', w:'첫시즌', lv:'1년차 · 입문',
    resort:'전체 스키장', time:'11시간 전', likes:9, cmts:15, art:'deck', seed:8,
    d:'키 172 / 몸무게 66인데 어느 정도가 적당한가요?',
    body:'올해 처음 장비를 사려고 하는데 데크 길이를 못 정하겠습니다.\n\n키 172cm, 몸무게 66kg이고 주로 카빙 위주로 배우고 싶어요.\n렌탈로는 152를 타봤는데 조금 짧게 느껴졌습니다.\n\n155 정도가 무난할까요? 아니면 157까지 가도 될까요?' },
  { id:'t9', cat:'outfit', t:'올 시즌 웨어 코디 자랑합니다 ☃️', w:'화이트룩', lv:'5년차 · 프리스타일',
    resort:'하이원', time:'14시간 전', likes:41, cmts:9, art:'jacket', seed:9, hot:true,
    d:'화이트 + 아이보리 톤온톤으로 맞춰봤어요.',
    body:'올 시즌은 화이트 톤으로 통일했습니다.\n\n· 자켓: 686 스노우 화이트 다운\n· 팬츠: 아이보리 와이드\n· 고글: 실버 크롬\n· 헬멧: 화이트\n\n가상 피팅으로 미리 맞춰보고 샀는데 실물도 딱 생각했던 느낌이라 만족스러워요!' },
  { id:'t10', cat:'gear', t:'바인딩 셋백 세팅 어떻게 하시나요?', w:'카빙장인', lv:'10년차 · 카빙',
    resort:'용평 리조트', time:'1일 전', likes:16, cmts:7, art:'gear', seed:10,
    d:'카빙 위주라면 셋백을 조금 주는 게 나을까요?',
    body:'카빙 위주로 타는데 셋백 세팅이 고민입니다.\n\n현재 앙각 +18 / -6 으로 타고 있고 셋백은 0입니다.\n디렉셔널 데크는 아니지만 카빙 때 뒷발 부하가 조금 아쉬워서요.\n\n비슷한 세팅 쓰시는 분들 의견 궁금합니다!' },
  { id:'t11', cat:'qna', t:'시즌방 계약할 때 확인할 것 정리해주실 분?', w:'초보시즌러', lv:'2년차 · 올라운드',
    resort:'전체 스키장', time:'1일 전', likes:22, cmts:11, art:'room', seed:11,
    d:'처음 시즌방 들어가려는데 뭘 봐야 할까요?',
    body:'올해 처음 시즌방을 들어가려고 합니다.\n\n계약 전에 꼭 확인해야 하는 것들이 있을까요?\n공과금 정산 방식이나 보증금 관련해서 조언 부탁드립니다!' },
  { id:'t12', cat:'mate', t:'평일 라이딩 메이트 구합니다 (비발디)', w:'평일러', lv:'6년차 · 올라운드',
    resort:'비발디파크', time:'2일 전', likes:11, cmts:4, art:'slope', seed:12,
    d:'평일 낮에 여유롭게 타실 분 찾아요.',
    form:{ '스키장':'비발디파크', '날짜':'매주 화 / 목', '라이딩 스타일':'올라운드', '실력':'중급', '모집 인원':'2명' },
    body:'평일 낮 시간에 여유롭게 타실 분 구합니다.\n\n주말은 사람이 너무 많아서 화, 목 위주로 다니고 있어요.\n한 번 만나서 잘 맞으면 시즌 내내 같이 타면 좋겠습니다!' }
];

const COMMENTS = {
  t1:[{ w:'슬로프덕후', t:'5분 전', b:'저 참여하고 싶습니다! 카풀도 가능해요 :)' }],
  t2:[{ w:'평창주민', t:'10분 전', b:'혹시 주차 자리 여유 있을까요?' },
      { w:'파우더러', t:'8분 전', b:'네 2대까지 가능합니다!' }],
  t5:[{ w:'봉평러', t:'1시간 전', b:'셔틀 정류장까지 도보 몇 분 걸릴까요?' },
      { w:'평창러버', t:'50분 전', b:'도보 5분 정도예요!' }],
  t7:[{ w:'첫시즌', t:'3시간 전', b:'정리 감사합니다! 바로 결제하러 갑니다 🙏' },
      { w:'카빙장인', t:'2시간 전', b:'야간 시간 늘어난 건 진짜 좋네요.' }],
  t8:[{ w:'카빙장인', t:'9시간 전', b:'155 무난합니다. 카빙 위주면 157도 괜찮아요.' },
      { w:'그라운드킴', t:'7시간 전', b:'트릭 생각 있으면 153~155 추천드려요!' }],
  t9:[{ w:'스노우노트', t:'10시간 전', b:'톤온톤 너무 예쁘네요 👏' }]
};

const PRODUCTS = [
  { id:'m1', n:'23-24 버튼 커스텀 데크 155cm', p:320000, cat:'gear', cond:'상태 좋음', area:'서울 마포구',
    seller:'덕스탠스', sellerLv:'거래 12회 · 매너 4.9', art:'deck', seed:1, time:'2시간 전',
    d:'23-24 시즌 두 달 정도 탄 데크입니다.\n엣지 상태 좋고 베이스 큰 손상 없습니다.\n직거래는 홍대입구역 선호하고, 택배도 가능합니다.' },
  { id:'m2', n:'오클리 플라이트 데크 고글 (실버)', p:145000, cat:'acc', cond:'거의 새것', area:'경기 성남시',
    seller:'고글수집가', sellerLv:'거래 31회 · 매너 5.0', art:'goggle', seed:2, time:'5시간 전',
    d:'두 번 착용했습니다. 렌즈 기스 없고 케이스, 여분 렌즈 모두 있습니다.' },
  { id:'m3', n:'686 GORE-TEX 자켓 M (화이트)', p:210000, cat:'wear', cond:'상태 좋음', area:'서울 강남구',
    seller:'화이트룩', sellerLv:'거래 8회 · 매너 4.8', art:'jacket', seed:3, time:'7시간 전',
    d:'지난 시즌 5회 착용했습니다. 오염 없고 방수 성능 그대로입니다.' },
  { id:'m4', n:'버튼 카고 팬츠 L (블랙)', p:135000, cat:'wear', cond:'보통', area:'강원 평창군',
    seller:'평창러버', sellerLv:'거래 5회 · 매너 4.7', art:'pants', seed:4, time:'11시간 전',
    d:'두 시즌 착용했습니다. 밑단 약간의 사용감 있지만 방수 이상 없습니다.' },
  { id:'m5', n:'살로몬 부츠 275mm', p:180000, cat:'gear', cond:'상태 좋음', area:'서울 송파구',
    seller:'카빙장인', sellerLv:'거래 22회 · 매너 4.9', art:'boot', seed:5, time:'1일 전',
    d:'한 시즌 사용했습니다. 이너 상태 깨끗하고 다이얼 정상 작동합니다.' },
  { id:'m6', n:'스미스 바이털 헬멧 M (매트 블랙)', p:98000, cat:'acc', cond:'거의 새것', area:'경기 용인시',
    seller:'그라운드킴', sellerLv:'거래 14회 · 매너 5.0', art:'helmet', seed:6, time:'1일 전',
    d:'세 번 착용했습니다. 충격 이력 없고 박스 포함입니다.' },
  { id:'m7', n:'유니온 스트라타 바인딩 M', p:175000, cat:'gear', cond:'상태 좋음', area:'서울 성동구',
    seller:'덕스탠스', sellerLv:'거래 12회 · 매너 4.9', art:'gear', seed:7, time:'2일 전', sold:true,
    d:'한 시즌 사용했습니다. 스트랩, 래칫 모두 정상입니다.' },
  { id:'m8', n:'볼컴 아노락 자켓 L (네이비)', p:165000, cat:'wear', cond:'상태 좋음', area:'인천 연수구',
    seller:'파우더러', sellerLv:'거래 19회 · 매너 4.8', art:'jacket', seed:8, time:'2일 전',
    d:'작년에 구매해서 6회 착용했습니다. 사이즈가 커서 판매합니다.' },
  { id:'m9', n:'헤스트라 레더 글러브 9', p:88000, cat:'acc', cond:'상태 좋음', area:'서울 마포구',
    seller:'스노우노트', sellerLv:'거래 27회 · 매너 5.0', art:'glove', seed:9, time:'3일 전',
    d:'왁싱 관리 꾸준히 했습니다. 가죽 상태 좋습니다.' },
  { id:'m10', n:'나이트로 데크 152cm (입문용)', p:145000, cat:'gear', cond:'보통', area:'강원 홍천군',
    seller:'평일러', sellerLv:'거래 6회 · 매너 4.6', art:'deck', seed:10, time:'3일 전',
    d:'입문용으로 좋습니다. 베이스 생활기스 있지만 라이딩에 지장 없습니다.' }
];
const MK_CATS = [{ k:'all', ko:'전체' }, { k:'gear', ko:'장비' }, { k:'wear', ko:'웨어' }, { k:'acc', ko:'액세서리' }];

const CHECK_CATS = [
  { k:'riding', ko:'RIDING', icon:'ticket', items:[
      { id:'r1', t:'시즌권 구매', link:'ticket', linkLabel:'가격 비교' },
      { id:'r2', t:'첫 라이딩 날짜 정하기', link:'planner', linkLabel:'시즌 플래너' },
      { id:'r3', t:'스키장 운영 일정 확인', link:'base', linkLabel:'베이스 스키장' } ] },
  { k:'gear', ko:'GEAR', icon:'board', items:[
      { id:'g1', t:'데크 점검 · 왁싱', link:'market', linkLabel:'MARKET' },
      { id:'g2', t:'바인딩 점검 · 세팅', link:'market', linkLabel:'MARKET' },
      { id:'g3', t:'부츠 상태 확인', link:'market', linkLabel:'MARKET' },
      { id:'g4', t:'장비 보관 · 운반 준비' } ] },
  { k:'outfit', ko:'OUTFIT', icon:'tshirt', items:[
      { id:'o1', t:'자켓 준비', link:'outfit', linkLabel:'가상 피팅' },
      { id:'o2', t:'팬츠 준비', link:'outfit', linkLabel:'가상 피팅' },
      { id:'o3', t:'고글 준비', link:'outfit', linkLabel:'가상 피팅' },
      { id:'o4', t:'장갑 · 비니 준비' } ] },
  { k:'stay', ko:'STAY', icon:'bed', items:[
      { id:'s1', t:'시즌방 구하기', link:'house', linkLabel:'COMMUNITY' },
      { id:'s2', t:'숙소 예약' } ] },
  { k:'mate', ko:'RIDE MATE', icon:'users', items:[
      { id:'m1', t:'같이 탈 사람 찾기', link:'mate', linkLabel:'COMMUNITY' } ] }
];

const PLANNER = [
  { m:'11월', t:'시즌권 얼리버드 마감', d:'대부분의 스키장 11월 중순 ~ 말 마감', done:true },
  { m:'11월', t:'장비 점검 · 왁싱', d:'데크 · 바인딩 · 부츠 상태 확인', done:true },
  { m:'12월 초', t:'스키장 개장', d:'비발디 11.29 · 용평 12.04 · 알펜시아 12.06', done:false },
  { m:'12월 중', t:'첫 라이딩', d:'휘닉스 평창 12.19 개장', done:false },
  { m:'1 ~ 2월', t:'시즌 피크', d:'설질 가장 좋은 시기', done:false },
  { m:'3월', t:'시즌 마감', d:'용평 3.30 폐장 예정', done:false }
];
const TRENDS = ['휘닉스 시즌권', '시즌방 평창', '버튼 데크', '라이딩 메이트', '고글 추천', '왁싱'];

/* ==========================================================================
   STORE  (localStorage)
   ========================================================================== */
const KEY = 'hiwinter.v2';
const DEFAULTS = {
  base: ['phoenix', 'yongpyong'],
  checked: { r2:true, g1:true, o4:true },
  custom: {},
  likes: {}, saved: {}, wish: { m2:true },
  looks: [],
  myPosts: [], myProducts: [], myItems: {},
  recent: ['휘닉스 시즌권', '시즌방 평창'],
  notif: { push:true, mate:true, market:false },
  profile: { name:'김라이더', years:'5년차', style:'프리스타일 / 카빙' }
};
let S;
try { S = Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem(KEY) || '{}')); }
catch (e) { S = Object.assign({}, DEFAULTS); }
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
function reset() { try { localStorage.removeItem(KEY); } catch (e) {} location.reload(); }

/* all checklist items = static + custom */
function catItems(cat) {
  return (cat.items || []).concat((S.custom[cat.k] || []).map(c => ({ id:c.id, t:c.t, custom:true })));
}
function progress() {
  let all = 0, on = 0;
  CHECK_CATS.forEach(c => catItems(c).forEach(i => { all++; if (S.checked[i.id]) on++; }));
  return { all, on, pct: all ? Math.round(on / all * 100) : 0 };
}
const allPosts = () => S.myPosts.concat(POSTS);
const allProducts = () => S.myProducts.concat(PRODUCTS);
const postOf = id => allPosts().find(p => p.id === id);
const prodOf = id => allProducts().find(p => p.id === id);

/* ==========================================================================
   SHELL:  toast / sheet / router
   ========================================================================== */
function toast(msg, icon) {
  const host = $('#toastHost');
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = (icon ? ic(icon, 15, 2) + ' ' : '') + esc(msg);
  el.style.display = 'flex'; el.style.alignItems = 'center'; el.style.gap = '6px';
  host.appendChild(el);
  setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 220); }, 1700);
}

let sheetOpen = null;
function sheet({ title, body, foot, full, center, mount }) {
  closeSheet(true);
  const host = $('#sheetHost');
  host.style.pointerEvents = 'auto';
  const wrap = document.createElement('div');
  wrap.innerHTML =
    `<div class="scrim" data-sheet-close></div>
     <div class="sheet ${full ? 'full' : ''}">
       ${full ? '' : '<div class="sh-grip"></div>'}
       <div class="sh-head ${center ? 'center' : ''}">
         ${full ? `<button class="icon-btn" data-sheet-close>${ic('left', 22)}</button>` : ''}
         <h3>${esc(title)}</h3>
         ${full ? '<span class="spacer" style="width:38px"></span>'
                : `<button class="icon-btn" data-sheet-close>${ic('x', 20)}</button>`}
       </div>
       <div class="sh-body">${body}</div>
       ${foot ? `<div class="sh-foot">${foot}</div>` : ''}
     </div>`;
  host.appendChild(wrap);
  sheetOpen = wrap;
  requestAnimationFrame(() => {
    wrap.querySelector('.scrim').classList.add('show');
    wrap.querySelector('.sheet').classList.add('show');
  });
  if (mount) mount(wrap);
  return wrap;
}
function closeSheet(now) {
  if (!sheetOpen) return;
  const w = sheetOpen; sheetOpen = null;
  const s = w.querySelector('.sheet'), sc = w.querySelector('.scrim');
  if (now) { w.remove(); $('#sheetHost').style.pointerEvents = 'none'; return; }
  s.classList.remove('show'); sc.classList.remove('show');
  setTimeout(() => { w.remove(); if (!sheetOpen) $('#sheetHost').style.pointerEvents = 'none'; }, 280);
}

/* ---------------------------------------------------------------- router */
const TABS = [
  { r:'home', ko:'HOME', icon:'home' },
  { r:'plan', ko:'PLAN', icon:'plan' },
  { r:'outfit', ko:'OUTFIT', icon:'outfit' },
  { r:'community', ko:'COMMUNITY', icon:'users' },
  { r:'my', ko:'MY', icon:'user' }
];
const TAB_ROUTES = TABS.map(t => t.r);
const NO_TAB = ['product'];
const V = {};          /* route -> fn(params) => html string */
let MOUNT = [];
const onMount = fn => MOUNT.push(fn);

let HIST = [{ r:'home', p:{}, s:0 }];

function cur() { return HIST[HIST.length - 1]; }
function go(r, p = {}) {
  const c = cur(); const sc = $('.screen .scroll'); if (sc) c.s = sc.scrollTop;
  HIST.push({ r, p, s:0 }); paint('push');
}
function back() {
  if (HIST.length <= 1) return;
  HIST.pop(); paint('pop');
}
function tabTo(r) {
  if (cur().r === r && HIST.length === 1) { const sc = $('.screen .scroll'); if (sc) sc.scrollTo({ top:0, behavior:'smooth' }); return; }
  HIST = [{ r, p:{}, s:0 }]; paint('tab');
}
function refresh() { const sc = $('.screen .scroll'); const t = sc ? sc.scrollTop : 0; cur().s = t; paint(null); }

function paint(anim) {
  const e = cur();
  MOUNT = [];
  const html = (V[e.r] || V.home)(e.p || {});
  const stack = $('#stack');
  stack.innerHTML = `<section class="screen ${anim ? 'anim-' + anim : ''}">${html}</section>`;
  const sc = $('.screen .scroll');
  if (sc && e.s) sc.scrollTop = e.s;
  const tb = $('#tabbar');
  const hide = NO_TAB.indexOf(e.r) >= 0;
  tb.classList.toggle('hide', hide);
  paintTabs();
  MOUNT.forEach(f => { try { f(); } catch (err) { console.error(err); } });
}
function paintTabs() {
  const active = HIST[0].r;
  $('#tabbar').innerHTML = TABS.map(t =>
    `<button class="tab ${t.r === active ? 'on' : ''}" data-tab="${t.r}">
       ${ic(t.icon, 23, t.r === active ? 2 : 1.7)}<span class="lb">${t.ko}</span></button>`
  ).join('') + '<div class="home-indicator"></div>';
}

/* --------------------------------------------------------- html builders */
function bigHdr(title, sub, acts, ko) {
  return `<header class="hdr"><div class="hdr-row"><div>
      <h1 class="${ko ? 'ko' : ''}">${esc(title)}</h1>
      ${sub ? `<p class="sub">${sub}</p>` : ''}</div>
      <div class="hdr-acts">${acts || ''}</div></div></header>`;
}
const HDR_ACTS = `<button class="icon-btn" data-go="search">${ic('search', 23)}</button>
  <button class="icon-btn" data-act="notif">${ic('bell', 23)}<i class="dot"></i></button>`;
function barHdr(title, right) {
  return `<header class="hdr bar"><button class="icon-btn" data-back>${ic('left', 23)}</button>
    <span class="t">${esc(title)}</span>${right || '<span class="spacer"></span>'}</header>`;
}
function secHead(t, moreLabel, action) {
  return `<div class="sec-head"><h2>${t}</h2>${
    moreLabel ? `<button class="more" ${action || ''}>${esc(moreLabel)}${ic('right', 14, 2)}</button>` : ''}</div>`;
}
function empt(icon, title, desc, btn) {
  return `<div class="empty"><div class="em-ic">${ic(icon, 26)}</div>
    <h3>${esc(title)}</h3><p>${esc(desc)}</p>${btn || ''}</div>`;
}
const countsHtml = (p) => `<div class="counts">
  <span class="${S.likes[p.id] ? 'liked' : ''}">${ic(S.likes[p.id] ? 'heartF' : 'heart', 14, 1.9)}${p.likes + (S.likes[p.id] ? 1 : 0)}</span>
  <span>${ic('chat', 14, 1.9)}${p.cmts + ((S.cmts && S.cmts[p.id]) ? S.cmts[p.id].length : 0)}</span></div>`;

/* ==========================================================================
   HOME
   ========================================================================== */
function baseCard(r, i) {
  return `<button class="base-card ${i % 2 ? 'alt' : ''}" data-go="resort:${r.id}">
    <span class="bc-deco">${ic('mountain', 96, 1.2)}</span>
    <span class="bc-top">${ic('pin', 13, 2)} ${esc(r.region)}</span>
    <span class="bc-n">${esc(r.name)}</span>
    <span class="bc-b"><span class="bc-d">D-${r.dday}</span>
      <span class="bc-sub">${esc(r.open)} 오픈 예정<br>${esc(r.wx)} · ${r.temp}°</span></span>
  </button>`;
}
function hotCard(p) {
  const c = CAT(p.cat);
  return `<button class="hot-card" data-go="post:${p.id}">
    ${ph(p.art, p.seed)}
    <span class="hc-b"><span class="tag ${CAT_TAG[p.cat] || ''}">${esc(c.ko)}</span>
      <span class="hc-t">${esc(p.t)}</span>${countsHtml(p)}</span></button>`;
}
function mateCard(p) {
  const f = p.form || {};
  return `<button class="mate-card" data-go="post:${p.id}">
    <span class="mc-h">${ph('person', p.seed, 'round', 'width:28px;height:28px')}
      <span style="font-size:12.5px;font-weight:600">${esc(p.w)}</span>
      <span class="tag violet" style="margin-left:auto">모집중</span></span>
    <span class="mc-t">${esc(p.t)}</span>
    <span class="mc-i">
      <div>${ic('pin', 13, 1.9)}${esc(f['스키장'] || p.resort)}</div>
      <div>${ic('cal', 13, 1.9)}${esc(f['날짜'] || p.time)}</div>
      <div>${ic('users', 13, 1.9)}${esc(f['모집 인원'] || '인원 협의')}</div>
    </span></button>`;
}
function prodCard(m) {
  return `<button class="prod-card" data-go="product:${m.id}">${ph(m.art, m.seed)}
    <span class="pc-n">${esc(m.n)}</span><span class="pc-p">${won(m.p)}</span>
    <span class="pc-m">${esc(m.area)} · ${esc(m.cond)}</span></button>`;
}
function lookMini(l) {
  return `<button class="look-mini" data-go="look:${l.id}">
    <span class="ph" style="height:150px;background:linear-gradient(180deg,#EEF4F9,#DEE9F1);display:grid;place-items:center">
      ${riderSvg(lookSel(l), 138)}</span>
    <span class="lm-t">${esc(l.name)}</span><span class="lm-s">${esc(l.date)}</span></button>`;
}
const lookSel = l => {
  const o = {};
  SLOTS.forEach(s => { const it = itemOf(s.k, (l.sel || {})[s.k]) || userItem(s.k, (l.sel || {})[s.k]); if (it) o[s.k] = it; });
  return o;
};

V.home = () => {
  const bases = S.base.map(R);
  const hot = POSTS.filter(p => p.hot);
  const mates = allPosts().filter(p => p.cat === 'mate').slice(0, 4);
  const houses = allPosts().filter(p => p.cat === 'house').slice(0, 2);
  const looks = S.looks.slice(0, 4);
  return `
  <header class="hdr"><div class="hdr-row"><div>
    <h1 style="letter-spacing:-.045em">HI WINTER</h1>
    <p class="sub" style="letter-spacing:.02em;font-weight:600;color:var(--pri)">Ready for Your Winter.</p>
  </div><div class="hdr-acts">${HDR_ACTS}</div></div></header>

  <div class="scroll">
    <div class="home-hero">
      <h1>다시 겨울을 <b>준비할 시간</b></h1>
      <button class="searchbar" data-go="search" style="width:100%;text-align:left">
        ${ic('search', 19, 1.9)}<span style="font-size:14px;font-weight:500">장비, 웨어, 시즌방, 라이딩 메이트 검색</span>
      </button>
    </div>

    <div class="quick">
      <button class="q" data-tab="plan"><span class="q-ic">${ic('plan', 21)}</span>
        <span class="q-t">PLAN</span><span class="q-s">시즌 준비</span></button>
      <button class="q" data-tab="outfit"><span class="q-ic">${ic('hanger', 21)}</span>
        <span class="q-t">OUTFIT</span><span class="q-s">가상 피팅</span></button>
      <button class="q" data-tab="community"><span class="q-ic">${ic('users', 21)}</span>
        <span class="q-t">COMMUNITY</span><span class="q-s">정보·라이더</span></button>
      <button class="q" data-go="market"><span class="q-ic">${ic('cart', 21)}</span>
        <span class="q-t">MARKET</span><span class="q-s">장비·웨어</span></button>
    </div>

    <div class="sec">
      ${secHead('MY BASE', '관리', 'data-go="base"')}
      <div class="base-scroll">
        ${bases.map(baseCard).join('')}
        <button class="base-add" data-act="addBase">${ic('plus', 20)}베이스 추가</button>
      </div>
    </div>

    <div class="sec">
      ${secHead('지금 뜨는 검색어')}
      <div class="trend">${TRENDS.map((t, i) =>
        `<button class="tr" data-act="trend|${esc(t)}"><i>${i + 1}</i>${esc(t)}</button>`).join('')}</div>
    </div>

    <div class="sec">
      ${secHead('🔥 인기 게시글', '더보기', 'data-tab="community"')}
      <div class="hscroll">${hot.map(hotCard).join('')}</div>
    </div>

    <div class="sec">
      ${secHead('라이딩 메이트', '더보기', 'data-go="community:mate"')}
      <div class="hscroll">${mates.map(mateCard).join('')}</div>
    </div>

    <div class="sec">
      ${secHead('시즌방 모집', '더보기', 'data-go="community:house"')}
      <div class="card" style="margin:0 20px;overflow:hidden">
        ${houses.map(p => {
          const f = p.form || {};
          return `<button class="row" style="padding:14px 16px">
            ${ph('room', p.seed, '', 'width:58px;height:58px;border-radius:12px')}
            <span class="rw-main"><span class="rw-t">${esc(p.t)}</span>
              <span class="rw-s">${esc(f['비용'] || '')} · ${esc(f['인원'] || '')}</span></span>
            ${ic('right', 18, 2)}</button>`.replace('<button class="row"', `<button class="row" data-go="post:${p.id}"`);
        }).join('')}
      </div>
    </div>

    <div class="sec">
      ${secHead('인기 장비 · 웨어', 'MARKET', 'data-go="market"')}
      <div class="hscroll">${PRODUCTS.slice(0, 6).map(prodCard).join('')}</div>
    </div>

    <div class="sec">
      ${secHead(looks.length ? '최근 본 OUTFIT' : 'AI 가상 피팅', looks.length ? '전체보기' : '', 'data-go="looks"')}
      ${looks.length
        ? `<div class="hscroll">${looks.map(lookMini).join('')}</div>`
        : `<button class="card card-btn" style="margin:0 20px;padding:18px;display:flex;align-items:center;gap:14px">
             <span class="ph" style="width:56px;height:56px;border-radius:16px;display:grid;place-items:center;background:var(--pri-weak)">
               <span style="color:var(--pri-dark);position:relative;z-index:1">${ic('ai', 26)}</span></span>
             <span style="flex:1;text-align:left">
               <span style="display:block;font-size:15px;font-weight:700;letter-spacing:-.03em">이번 겨울, 미리 입어보세요.</span>
               <span style="display:block;font-size:12.5px;color:var(--sub);margin-top:4px">사진 한 장으로 웨어 코디를 미리 확인</span>
             </span>${ic('right', 18, 2)}</button>`.replace('card-btn"', 'card-btn" data-tab="outfit"')}
    </div>

    <div style="height:12px"></div>
  </div>`;
};

/* ==========================================================================
   PLAN
   ========================================================================== */
const LINK_LABEL = { ticket:'가격 비교', planner:'시즌 플래너', base:'베이스 스키장', market:'MARKET', outfit:'가상 피팅', house:'COMMUNITY', mate:'COMMUNITY' };
function ckRow(it) {
  const on = !!S.checked[it.id];
  return `<div class="ck ${on ? 'on' : ''}">
    <button class="box" data-act="check|${it.id}">${ic('check', 14, 3)}</button>
    <button class="ck-t" style="text-align:left" data-act="check|${it.id}">${esc(it.t)}</button>
    ${it.link ? `<button class="link" data-act="jump|${it.link}">${esc(it.linkLabel || LINK_LABEL[it.link])}${ic('right', 12, 2.2)}</button>` : ''}
    ${it.custom ? `<button class="del" data-act="delItem|${it.id}">${ic('x', 16, 2)}</button>` : ''}
  </div>`;
}
V.plan = () => {
  const pg = progress();
  const first = R(S.base[0] || 'phoenix');
  return `
  ${bigHdr('PLAN', '시즌 준비, 하나씩 체크해요', HDR_ACTS)}
  <div class="scroll">
    <div class="plan-top">
      <div class="pt-l">SEASON 25 / 26</div>
      <div class="pt-v">${esc(first.name)} 오픈까지 <b style="color:#7FD8FF">D-${first.dday}</b></div>
      <div class="bar"><i style="width:${pg.pct}%"></i></div>
      <div class="pt-n">준비 ${pg.on} / ${pg.all} 완료 · ${pg.pct}%</div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:12px 20px 0">
      <button class="card card-btn" style="padding:13px 10px;text-align:center" data-go="ticket">
        <span style="color:var(--pri);display:block;margin:0 auto 7px;width:22px">${ic('ticket', 22)}</span>
        <span style="font-size:11.5px;font-weight:600">시즌권 비교</span></button>
      <button class="card card-btn" style="padding:13px 10px;text-align:center" data-go="planner">
        <span style="color:var(--pri);display:block;margin:0 auto 7px;width:22px">${ic('cal', 22)}</span>
        <span style="font-size:11.5px;font-weight:600">시즌 플래너</span></button>
      <button class="card card-btn" style="padding:13px 10px;text-align:center" data-go="base">
        <span style="color:var(--pri);display:block;margin:0 auto 7px;width:22px">${ic('mountain', 22)}</span>
        <span style="font-size:11.5px;font-weight:600">베이스 스키장</span></button>
    </div>

    ${CHECK_CATS.map(c => {
      const items = catItems(c);
      const done = items.filter(i => S.checked[i.id]).length;
      return `<div class="cat">
        <div class="cat-h"><span class="c-ic">${ic(c.icon, 15, 2)}</span>
          <span class="c-n">${c.ko}</span><span class="c-c">${done}/${items.length}</span></div>
        <div class="checks">${items.map(ckRow).join('')}
          <button class="add-item" data-act="addItem|${c.k}">${ic('plus', 16, 2.2)}항목 추가</button>
        </div></div>`;
    }).join('')}
    <div style="height:16px"></div>
  </div>`;
};

/* ------------------------------------------------------------- 시즌 플래너 */
V.planner = () => `
  ${barHdr('시즌 플래너')}
  <div class="scroll">
    <div class="notice">${ic('info', 17, 2)}<p>25/26 시즌 주요 일정입니다. 체크리스트와 함께 준비 상황을 확인해보세요.</p></div>
    <div style="padding:18px 20px 0;position:relative">
      ${PLANNER.map((p, i) => `
        <div style="display:flex;gap:14px;padding-bottom:${i === PLANNER.length - 1 ? 0 : '22px'};position:relative">
          <div style="flex:none;width:34px;display:flex;flex-direction:column;align-items:center">
            <span style="width:12px;height:12px;border-radius:50%;background:${p.done ? 'var(--pri)' : '#fff'};border:2px solid ${p.done ? 'var(--pri)' : '#D8DEE4'};margin-top:4px"></span>
            ${i === PLANNER.length - 1 ? '' : '<span style="flex:1;width:2px;background:#E7EBEF;margin-top:4px"></span>'}
          </div>
          <div style="flex:1;padding-bottom:2px">
            <span class="tag ${p.done ? 'green' : 'gray'}">${p.m}</span>
            <div style="font-size:15px;font-weight:700;letter-spacing:-.03em;margin-top:8px">${esc(p.t)}</div>
            <div style="font-size:12.5px;color:var(--sub);margin-top:4px;font-weight:500">${esc(p.d)}</div>
          </div>
        </div>`).join('')}
    </div>
    <div style="padding:18px 20px 0"><button class="btn ghost sm" data-back>PLAN으로 돌아가기</button></div>
  </div>`;

/* --------------------------------------------------------- 베이스 스키장 */
V.base = () => {
  const mine = S.base.map(R);
  const others = RESORTS.filter(r => S.base.indexOf(r.id) < 0);
  return `
  ${barHdr('베이스 스키장')}
  <div class="scroll">
    <div class="notice">${ic('info', 17, 2)}<p>자주 가는 스키장을 등록하면 홈에서 오픈일과 날씨를 바로 확인할 수 있어요.</p></div>
    <div class="sec">${secHead(`MY BASE · ${mine.length}`)}
      <div class="card" style="margin:0 20px;overflow:hidden">
        ${mine.length ? mine.map(r => `<div class="res-row">
            ${ph(r.art, r.seed)}
            <button class="rr-m" style="text-align:left" data-go="resort:${r.id}">
              <div class="rr-n">${esc(r.name)}</div>
              <div class="rr-s">${esc(r.region)} · ${esc(r.open)} 오픈</div></button>
            <span class="rr-d">D-${r.dday}</span>
            <button class="del" style="color:#C9D0D7;padding:6px" data-act="delBase|${r.id}">${ic('trash', 18)}</button>
          </div>`).join('')
        : `<div style="padding:34px;text-align:center;color:var(--sub);font-size:13px">등록된 베이스 스키장이 없습니다.</div>`}
      </div>
    </div>
    <div class="sec">${secHead('스키장 추가')}
      <div class="card" style="margin:0 20px;overflow:hidden">
        ${others.length ? others.map(r => `<div class="res-row">
            ${ph(r.art, r.seed)}
            <button class="rr-m" style="text-align:left" data-go="resort:${r.id}">
              <div class="rr-n">${esc(r.name)}</div>
              <div class="rr-s">${esc(r.region)} · 시즌권 ${manwon(r.price)}</div></button>
            <button class="btn xs soft" data-act="addBaseId|${r.id}">${ic('plus', 14, 2.4)} 추가</button>
          </div>`).join('')
        : `<div style="padding:30px;text-align:center;color:var(--sub-2);font-size:13px">모든 스키장을 등록했어요 🎉</div>`}
      </div>
    </div>
    <div style="height:20px"></div>
  </div>`;
};

/* ------------------------------------------------------ 베이스 스키장 상세 */
V.resort = ({ id }) => {
  const r = R(id);
  const on = S.base.indexOf(r.id) >= 0;
  const posts = allPosts().filter(p => p.resort === r.name).slice(0, 3);
  return `
  ${barHdr(r.name, `<button class="icon-btn" data-act="${on ? 'delBase' : 'addBaseId'}|${r.id}">${ic(on ? 'bookmarkF' : 'bookmark', 21)}</button>`)}
  <div class="scroll">
    <div class="rd-hero">${ph(r.art, r.seed)}<div class="rd-ov"></div>
      <div class="rd-tx"><h2>${esc(r.name)}</h2><p>${esc(r.region)} · 슬로프 ${r.slopes} · 리프트 ${r.lifts}</p></div>
      <span style="position:absolute;right:16px;top:14px" class="tag dark">D-${r.dday}</span>
    </div>
    <div class="wx">
      <div class="w"><div class="wl">현재 기온</div><div class="wv">${r.temp}°</div></div>
      <div class="w"><div class="wl">날씨</div><div class="wv">${esc(r.wx)}</div></div>
      <div class="w"><div class="wl">적설 상태</div><div class="wv">${esc(r.snow)}</div></div>
    </div>
    <div class="sec">${secHead('운영 정보')}
      <div class="card" style="margin:0 20px;overflow:hidden">
        <div class="row"><span class="rw-main"><span class="rw-t">오픈 예정일</span></span><span class="rw-v">${esc(r.open)} (D-${r.dday})</span></div>
        <div class="row"><span class="rw-main"><span class="rw-t">운영 기간</span></span><span class="rw-v">${esc(r.use)}</span></div>
        <div class="row"><span class="rw-main"><span class="rw-t">운영 시간</span></span><span class="rw-v">${esc(r.time)}</span></div>
        <div class="row"><span class="rw-main"><span class="rw-t">야간 운영</span></span><span class="rw-v">${esc(r.night)}</span></div>
      </div>
    </div>
    <div class="sec">${secHead('시즌권', '가격 비교', 'data-go="ticket"')}
      <button class="card card-btn" style="margin:0 20px;padding:16px;display:flex;align-items:center;gap:12px" data-go="ticket">
        <span style="width:40px;height:40px;border-radius:12px;background:var(--pri-weak);color:var(--pri-dark);display:grid;place-items:center">${ic('ticket', 20)}</span>
        <span style="flex:1;text-align:left"><span style="display:block;font-size:12px;color:var(--sub)">얼리버드 · ${esc(r.sale)} 판매</span>
          <span style="display:block;font-size:18px;font-weight:800;letter-spacing:-.04em;margin-top:3px">${won(r.price)}</span></span>
        ${ic('right', 18, 2)}</button>
      <div style="display:flex;flex-wrap:wrap;gap:5px;padding:12px 20px 0">
        ${r.perks.map(p => `<span class="tag gray">${esc(p)}</span>`).join('')}</div>
    </div>
    <div class="sec">${secHead('관련 게시글', '더보기', 'data-tab="community"')}
      <div class="card" style="margin:0 20px;overflow:hidden">
        ${posts.length ? posts.map(p => `<button class="row" data-go="post:${p.id}">
            <span class="rw-main"><span class="rw-t" style="font-weight:600">${esc(p.t)}</span>
              <span class="rw-s">${esc(CAT(p.cat).ko)} · ${esc(p.time)}</span></span>${ic('right', 18, 2)}</button>`).join('')
          : `<div style="padding:28px;text-align:center;color:var(--sub-2);font-size:13px">아직 관련 게시글이 없어요.</div>`}
      </div>
    </div>
    <div style="padding:22px 20px 0">
      <button class="btn ${on ? 'ghost' : ''}" data-act="${on ? 'delBase' : 'addBaseId'}|${r.id}">
        ${on ? '베이스 스키장에서 제거' : '내 베이스 스키장으로 추가'}</button>
    </div>
    <div style="height:20px"></div>
  </div>`;
};

/* ------------------------------------------------------- 시즌권 가격 비교 */
let tkSort = 'price';
V.ticket = () => {
  const list = RESORTS.slice().sort((a, b) =>
    tkSort === 'price' ? a.price - b.price : tkSort === 'open' ? a.dday - b.dday : b.slopes - a.slopes);
  const min = Math.min.apply(null, RESORTS.map(r => r.price));
  return `
  ${barHdr('시즌권 가격 비교')}
  <div class="seg" style="background:var(--bg);border-bottom:1px solid var(--line)">
    <button class="${tkSort === 'price' ? 'on' : ''}" data-act="tkSort|price">가격순</button>
    <button class="${tkSort === 'open' ? 'on' : ''}" data-act="tkSort|open">오픈 임박순</button>
    <button class="${tkSort === 'slope' ? 'on' : ''}" data-act="tkSort|slope">슬로프순</button>
  </div>
  <div class="scroll">
    <p class="sec-note" style="margin:14px 0 12px">25/26 시즌 · 성인 주중+주말권 기준 (프로토타입 더미 데이터)</p>
    ${list.map(r => `
      <div class="tk-card ${r.price === min ? 'best' : ''}">
        <div class="tk-h">${ph(r.art, r.seed)}
          <div><div class="tk-n">${esc(r.name)}${r.price === min ? ' <span class="tag" style="margin-left:4px">최저가</span>' : ''}</div>
            <div class="tk-r">${esc(r.region)} · 슬로프 ${r.slopes}면</div></div>
          <div class="tk-p"><b>${won(r.price)}</b><s>정상가 ${manwon(Math.round(r.price * 1.25 / 10000) * 10000)}</s></div>
        </div>
        <dl class="tk-b">
          <dt>판매 기간</dt><dd>${esc(r.sale)}까지</dd>
          <dt>이용 기간</dt><dd>${esc(r.use)}</dd>
          <dt>이용 시간</dt><dd>${esc(r.time)}</dd>
        </dl>
        <div class="tk-f">${r.perks.map(p => `<span class="tag gray">${esc(p)}</span>`).join('')}
          <button class="btn xs soft" style="margin-left:auto" data-go="resort:${r.id}">상세보기</button></div>
      </div>`).join('')}
    <div style="height:20px"></div>
  </div>`;
};

/* ==========================================================================
   OUTFIT — AI Virtual Fitting
   ========================================================================== */
let FIT = { jacket:'j1', pants:'p1', goggle:'g2', helmet:'h1', glove:'l1' };
let FIT_SLOT = 'jacket';
let LAST_RESULT = null;
const userItem = (k, id) => ((S.myItems[k] || []).find(i => i.id === id));
const anyItem = (k, id) => itemOf(k, id) || userItem(k, id);
function fitSel() {
  const o = {};
  SLOTS.forEach(s => { const it = anyItem(s.k, FIT[s.k]); if (it) o[s.k] = it; });
  return o;
}
function fitCount() { return SLOTS.filter(s => FIT[s.k]).length; }

V.outfit = () => {
  const slot = SLOTS.find(s => s.k === FIT_SLOT) || SLOTS[0];
  const list = (ITEMS[slot.k] || []).concat(S.myItems[slot.k] || []);
  const sel = fitSel();
  return `
  ${bigHdr('OUTFIT', '이번 겨울, 미리 입어보세요.', `<button class="icon-btn" data-go="looks">${ic('hanger', 23)}</button>${HDR_ACTS}`)}
  <div class="scroll">
    <div class="of-hero">
      <span class="oh-deco">${ic('ai', 120, .9)}</span>
      <div class="oh-k">AI VIRTUAL FITTING</div>
      <h2>사진 한 장으로<br>올 시즌 코디를 미리</h2>
      <p>내 사진과 웨어를 선택하면 AI가 코디를 만들어드려요.</p>
    </div>

    <div class="stage-box">
      <div class="model-wrap" id="modelWrap">
        <span class="model-badge">${ic('ai', 13, 2.2)} ${S.photo ? 'MY PHOTO' : 'MODEL'}</span>
        <button class="photo-btn" data-act="myPhoto">${ic('cam', 14, 2)} ${S.photo ? '사진 변경' : '내 사진 추가'}</button>
        ${riderSvg(sel, 264)}
      </div>
      <div class="sel-strip">
        ${SLOTS.map(s => {
          const it = anyItem(s.k, FIT[s.k]);
          return it ? `<span class="sl"><b>${s.label}</b>${esc(it.n)}
            <button data-act="clear|${s.k}" style="color:inherit;display:grid;place-items:center;opacity:.6">${ic('x', 13, 2.4)}</button></span>` : '';
        }).join('') || `<span style="font-size:12.5px;color:var(--sub-2);font-weight:500">아이템을 선택하면 여기에 표시돼요.</span>`}
      </div>
    </div>

    <div class="item-tabs">
      ${SLOTS.map(s => `<button class="${s.k === FIT_SLOT ? 'on' : ''}" data-act="slot|${s.k}">${s.label}</button>`).join('')}
    </div>

    <div class="item-grid">
      ${list.map(i => `<button class="it ${FIT[slot.k] === i.id ? 'on' : ''}" data-act="pick|${slot.k}|${i.id}">
        <span class="it-ck">${ic('check', 12, 3.4)}</span>
        <span class="ph" style="height:88px;background:linear-gradient(180deg,${i.color}22,${i.color}55);display:grid;place-items:center">
          <span style="position:relative;z-index:1;width:44px;height:44px;border-radius:12px;background:${i.color};box-shadow:inset 0 -8px 14px rgba(0,0,0,.12)"></span></span>
        <span class="it-b"><span class="it-n">${esc(i.n)}</span><span class="it-br">${esc(i.b)}${i.p ? ' · ' + manwon(i.p) : ''}</span></span>
      </button>`).join('')}
      <button class="it add" data-act="addCloth|${slot.k}">${ic('plus', 20)}옷 추가</button>
    </div>

    <div class="fit-bar">
      <button class="btn" data-act="fit" ${fitCount() < 2 ? 'disabled' : ''}>
        ${ic('ai', 19, 2)} AI FITTING ${fitCount() ? `(${fitCount()})` : ''}</button>
      <p style="text-align:center;font-size:11.5px;color:var(--sub-2);margin-top:10px;font-weight:500">
        ${fitCount() < 2 ? '아이템을 2개 이상 선택해주세요.' : '선택한 아이템으로 코디 이미지를 생성합니다.'}</p>
    </div>
    <div style="height:14px"></div>
  </div>`;
};

/* -------------------------------------------------------- AI 로딩 → 결과 */
const AI_STEPS = ['내 사진을 분석하고 있어요', '아이템을 매칭하고 있어요', '조명과 색감을 맞추고 있어요', '코디를 완성하는 중이에요'];
function runFitting() {
  const host = $('#sheetHost');
  host.style.pointerEvents = 'auto';
  const el = document.createElement('div');
  el.className = 'ai-load';
  el.innerHTML = `
    <div class="ai-ring"><div class="r1"></div><div class="r2"></div><div class="core">${ic('ai', 26, 2)}</div></div>
    <div style="text-align:center"><h3>AI가 코디를 만들고 있습니다...</h3>
      <p>선택한 아이템 ${fitCount()}개를 적용하는 중</p></div>
    <div class="ai-steps"><div class="bar"><i id="aiBar" style="width:6%"></i></div>
      <div class="st" id="aiStep">${AI_STEPS[0]}</div></div>`;
  host.appendChild(el);
  let i = 0;
  const tick = setInterval(() => {
    i++;
    const bar = $('#aiBar'), st = $('#aiStep');
    if (bar) bar.style.width = Math.min(100, 6 + i * 26) + '%';
    if (st && AI_STEPS[i]) st.textContent = AI_STEPS[i];
    if (i >= 4) {
      clearInterval(tick);
      setTimeout(() => {
        el.remove(); host.style.pointerEvents = sheetOpen ? 'auto' : 'none';
        LAST_RESULT = { sel: Object.assign({}, FIT), photo: !!S.photo };
        go('result');
      }, 420);
    }
  }, 620);
}

V.result = () => {
  const sel = fitSel();
  const picked = SLOTS.filter(s => sel[s.k]);
  return `
  ${barHdr('MY LOOK', `<button class="icon-btn" data-act="shareLook">${ic('share', 21)}</button>`)}
  <div class="scroll">
    <div class="look-hero">
      <span class="lh-tag tag dark">${ic('ai', 12, 2.4)} AI FITTING</span>
      ${riderSvg(sel, 340)}
    </div>
    <div style="padding:18px 20px 0">
      <div style="font-size:11px;font-weight:800;letter-spacing:.1em;color:var(--pri)">MY LOOK</div>
      <h2 style="font-size:22px;font-weight:800;letter-spacing:-.04em;margin-top:7px">
        ${esc(sel.jacket ? sel.jacket.n.split(' ')[0] : '')} ${picked.length}피스 코디</h2>
      <p style="font-size:12.5px;color:var(--sub);margin-top:6px;font-weight:500">
        ${S.photo ? '내 사진에 적용된 결과예요.' : '모델 이미지에 적용된 결과예요. 내 사진을 등록하면 더 정확해요.'}</p>
    </div>
    <div class="look-list">
      ${picked.map(s => {
        const it = sel[s.k];
        return `<div class="ll"><span class="lk">${s.label}</span>
          <span class="ph" style="width:38px;height:38px;border-radius:10px;background:${it.color}"></span>
          <span class="ln">${esc(it.n)}</span><span class="lp">${it.p ? manwon(it.p) : esc(it.b)}</span></div>`;
      }).join('')}
    </div>
    <div style="padding:20px 20px 0">
      <button class="btn" data-act="saveLook">${ic('bookmark', 18, 2)} SAVE LOOK</button>
      <div class="btn-row" style="margin-top:10px">
        <button class="btn ghost" data-act="shareLook">${ic('share', 17, 2)} SHARE</button>
        <button class="btn ghost" data-back>다시 만들기</button>
      </div>
    </div>
    <div style="height:24px"></div>
  </div>`;
};

/* ----------------------------------------------------------- MY LOOKS */
V.looks = () => `
  ${barHdr('MY LOOKS', `<button class="icon-btn" data-tab="outfit">${ic('plus', 22)}</button>`)}
  <div class="scroll">
    ${S.looks.length ? `<div class="look-grid">${S.looks.map(l => `
        <button class="look-cell" data-go="look:${l.id}">
          <span class="lc-img">${riderSvg(lookSel(l), 200)}</span>
          <span class="lc-t">${esc(l.name)}</span>
          <span class="lc-s">${esc(l.date)} · ${Object.keys(l.sel || {}).filter(k => l.sel[k]).length}피스</span>
        </button>`).join('')}</div>`
      : empt('hanger', '저장한 LOOK이 없어요', 'AI 가상 피팅으로 첫 코디를 만들어보세요.',
             `<button class="btn" data-tab="outfit">가상 피팅 시작하기</button>`)}
    <div style="height:24px"></div>
  </div>`;

V.look = ({ id }) => {
  const l = S.looks.find(x => x.id === id);
  if (!l) return `${barHdr('LOOK')}<div class="scroll">${empt('hanger', 'LOOK을 찾을 수 없어요', '삭제되었거나 존재하지 않습니다.')}</div>`;
  const sel = lookSel(l);
  const picked = SLOTS.filter(s => sel[s.k]);
  return `
  ${barHdr(l.name, `<button class="icon-btn" data-act="delLook|${l.id}">${ic('trash', 21)}</button>`)}
  <div class="scroll">
    <div class="look-hero">${riderSvg(sel, 340)}</div>
    <div style="padding:18px 20px 0">
      <h2 style="font-size:21px;font-weight:800;letter-spacing:-.04em">${esc(l.name)}</h2>
      <p style="font-size:12.5px;color:var(--sub);margin-top:6px;font-weight:500">${esc(l.date)} 저장 · ${picked.length}피스</p>
    </div>
    <div class="look-list">
      ${picked.map(s => { const it = sel[s.k];
        return `<div class="ll"><span class="lk">${s.label}</span>
          <span class="ph" style="width:38px;height:38px;border-radius:10px;background:${it.color}"></span>
          <span class="ln">${esc(it.n)}</span><span class="lp">${it.p ? manwon(it.p) : esc(it.b)}</span></div>`; }).join('')}
    </div>
    <div style="padding:20px 20px 0">
      <div class="btn-row">
        <button class="btn ghost" data-act="shareLook">${ic('share', 17, 2)} SHARE</button>
        <button class="btn" data-act="editLook|${l.id}">이 코디로 다시 피팅</button>
      </div>
    </div>
    <div style="height:24px"></div>
  </div>`;
};

/* ==========================================================================
   COMMUNITY
   ========================================================================== */
let cmCat = 'all', cmSort = 'new';
const SORTS = [{ k:'new', ko:'최신순' }, { k:'hot', ko:'인기순' }, { k:'cmt', ko:'댓글순' }];
function sortPosts(list) {
  const a = list.slice();
  if (cmSort === 'hot') a.sort((x, y) => (y.likes + (S.likes[y.id] ? 1 : 0)) - (x.likes + (S.likes[x.id] ? 1 : 0)));
  else if (cmSort === 'cmt') a.sort((x, y) => y.cmts - x.cmts);
  return a;
}
function postCard(p) {
  const c = CAT(p.cat);
  return `<button class="post" data-go="post:${p.id}">
    <span class="p-top"><span class="tag ${CAT_TAG[p.cat] || ''}">${esc(c.ko)}</span>
      ${p.new ? '<span class="new">NEW</span>' : ''}</span>
    <span class="p-body"><span class="p-main">
        <span class="p-t">${esc(p.t)}</span>
        <span class="p-d">${esc(p.d || p.body || '')}</span>
      </span>${ph(p.art, p.seed)}</span>
    <span class="p-foot">
      <span class="meta">${esc(p.time)}<i class="dotsep"></i>${esc(p.resort)}</span>
      ${countsHtml(p)}</span>
  </button>`;
}
V.community = () => {
  let base0 = cmCat === 'all' ? allPosts() : allPosts().filter(p => p.cat === cmCat);
  if (cmResort !== 'all') base0 = base0.filter(p => p.resort === cmResort);
  const list = sortPosts(base0);
  return `
  ${bigHdr('COMMUNITY', '함께라서 더 즐거운 겨울 ❄️', HDR_ACTS)}
  <div class="scroll" style="padding-bottom:0">
    <div class="cat-circles">
      ${CATS.map(c => `<button class="cc ${c.k === cmCat && c.k !== 'market' ? 'on' : ''}"
          data-act="${c.k === 'market' ? 'goMarket' : 'cmCat|' + c.k}">
        <span class="cc-ic">${ic(c.icon, 22)}${c.k === 'market' ? '<i class="nbadge">N</i>' : ''}</span>
        <span class="cc-l">${esc(c.ko)}</span></button>`).join('')}
    </div>

    ${cmCat === 'all' ? `<div class="sec" style="margin-top:8px">
      ${secHead('🔥 Hot 게시글', '더보기', 'data-act="cmSort|hot"')}
      <div class="hscroll">${POSTS.filter(p => p.hot).map(hotCard).join('')}</div>
    </div>` : ''}

    <div class="seg" style="margin-top:${cmCat === 'all' ? 22 : 10}px;position:sticky;top:0;z-index:4">
      ${SORTS.map(s => `<button class="${cmSort === s.k ? 'on' : ''}" data-act="cmSort|${s.k}">${s.ko}</button>`).join('')}
      <button class="fl" data-act="filter" style="${cmResort !== 'all' ? 'color:var(--pri)' : ''}">${ic('sliders', 16, 1.9)}${cmResort === 'all' ? '필터' : esc(cmResort)}</button>
    </div>

    <div style="background:#fff;border-bottom:1px solid var(--line)">
      ${list.length ? list.map(postCard).join('')
        : empt('doc', '게시글이 없어요', '첫 글을 남겨보세요.', `<button class="btn" data-act="compose|${cmCat === 'all' ? 'info' : cmCat}">글쓰기</button>`)}
    </div>
    <div style="height:20px;background:var(--bg)"></div>
  </div>
  <button class="fab" data-act="compose|${cmCat === 'all' ? 'info' : cmCat}">${ic('edit', 18, 2)} 글쓰기</button>`;
};

/* ------------------------------------------------------------ 게시글 상세 */
V.post = ({ id }) => {
  const p = postOf(id);
  if (!p) return `${barHdr('게시글')}<div class="scroll">${empt('doc', '게시글을 찾을 수 없어요', '삭제되었거나 존재하지 않습니다.')}</div>`;
  const c = CAT(p.cat);
  const liked = !!S.likes[p.id], saved = !!S.saved[p.id];
  const cs = (COMMENTS[p.id] || []).concat((S.cmts && S.cmts[p.id]) || []);
  return `
  ${barHdr(c.ko, `<button class="icon-btn" data-act="share">${ic('share', 21)}</button>`)}
  <div class="scroll" style="background:#fff">
    <div class="pd-head">
      <span class="tag ${CAT_TAG[p.cat] || ''}">${esc(c.ko)}</span>
      <h2>${esc(p.t)}</h2>
      <div class="pd-writer">${ph('person', p.seed, 'round')}
        <div><div class="w-n">${esc(p.w)}</div><div class="w-s">${esc(p.lv || '라이더')}</div></div>
        <div style="margin-left:auto" class="meta">${esc(p.time)}<i class="dotsep"></i>${ic('pin', 12, 2)}${esc(p.resort)}</div>
      </div>
    </div>
    ${p.form ? `<dl class="pd-info">${Object.keys(p.form).map(k =>
        `<dt>${esc(k)}</dt><dd>${esc(p.form[k])}</dd>`).join('')}</dl>` : ''}
    <div class="pd-body">${esc(p.body || p.d || '')}</div>
    <div class="pd-actions">
      <button class="ab ${liked ? 'on' : ''}" data-act="like|${p.id}">${ic(liked ? 'heartF' : 'heart', 17, 2)} 좋아요 ${p.likes + (liked ? 1 : 0)}</button>
      <button class="ab ${saved ? 'on sv' : ''}" data-act="savePost|${p.id}">${ic(saved ? 'bookmarkF' : 'bookmark', 17, 2)} ${saved ? '저장됨' : '저장'}</button>
      <button class="ab" data-act="share">${ic('share', 17, 2)} 공유</button>
    </div>
    ${p.cat === 'mate' || p.cat === 'house' ? `<div style="padding:0 20px 18px">
      <button class="btn" data-act="apply|${p.cat}">${p.cat === 'mate' ? '라이딩 메이트 신청하기' : '시즌방 문의하기'}</button></div>` : ''}
    <div class="hr" style="margin:0"></div>
    <div style="padding:16px 20px 4px;font-size:14px;font-weight:700">댓글 ${cs.length}</div>
    ${cs.length ? cs.map(x => `<div class="cmt"><div class="c-h">${ph('person', x.w.length, 'round')}
        <span class="c-n">${esc(x.w)}</span><span class="c-t">${esc(x.t)}</span></div>
        <div class="c-b">${esc(x.b)}</div></div>`).join('')
      : `<div style="padding:26px;text-align:center;color:var(--sub-2);font-size:13px">첫 댓글을 남겨보세요.</div>`}
    <div style="height:14px"></div>
  </div>
  <div class="bottom-cta" style="border-top:1px solid var(--line)">
    <input class="input" id="cmtInput" placeholder="댓글을 입력해주세요" style="height:46px;background:var(--bg);border-color:transparent">
    <button class="btn" style="width:auto;padding:0 18px;height:46px" data-act="sendCmt">등록</button>
  </div>`;
};

/* ------------------------------------------------------------ 게시글 작성 */
const COMPOSE = {
  mate: { title:'라이딩 메이트 모집', fields:[
    { id:'resort', label:'스키장', type:'select', opts:RESORTS.map(r => r.name), req:true },
    { id:'date', label:'날짜', type:'text', ph:'예) 12월 21일 (토)', req:true },
    { id:'style', label:'라이딩 스타일', type:'opt', opts:['카빙','그라운드트릭','파크','올라운드','입문'], req:true },
    { id:'level', label:'실력', type:'opt', opts:['무관','입문','초급','중급','상급'], req:true },
    { id:'count', label:'모집 인원', type:'opt', opts:['1명','2 ~ 3명','4명 이상'], req:true },
    { id:'title', label:'제목', type:'text', ph:'제목을 입력해주세요', req:true },
    { id:'body', label:'간단한 소개', type:'textarea', ph:'라이딩 스타일, 만나는 시간, 카풀 여부 등을 적어주세요.' } ] },
  house: { title:'시즌방 모집', fields:[
    { id:'resort', label:'스키장', type:'select', opts:RESORTS.map(r => r.name), req:true },
    { id:'loc', label:'위치', type:'text', ph:'예) 평창군 대관령면 (도보 3분)', req:true },
    { id:'period', label:'기간', type:'text', ph:'예) 12.01 ~ 3.15', req:true },
    { id:'people', label:'인원', type:'text', ph:'예) 2명 모집 (현재 4명)', req:true },
    { id:'gender', label:'성별', type:'opt', opts:['남성','여성','성별 무관'], req:true },
    { id:'cost', label:'비용', type:'text', ph:'예) 60만원 (관리비 포함)', req:true },
    { id:'title', label:'제목', type:'text', ph:'제목을 입력해주세요', req:true },
    { id:'body', label:'상세 내용', type:'textarea', ph:'방 구조, 주차, 생활 규칙 등을 적어주세요.' } ] },
  info: { title:'게시글 작성', fields:[
    { id:'cat', label:'카테고리', type:'opt', opts:['정보/팁','Q&A','OUTFIT','GEAR'], req:true },
    { id:'resort', label:'관련 스키장', type:'select', opts:['전체 스키장'].concat(RESORTS.map(r => r.name)) },
    { id:'title', label:'제목', type:'text', ph:'제목을 입력해주세요', req:true },
    { id:'body', label:'내용', type:'textarea', ph:'내용을 입력해주세요.', req:true } ] }
};
const CAT_BY_KO = { '정보/팁':'info', 'Q&A':'qna', 'OUTFIT':'outfit', 'GEAR':'gear' };
let FORM = {};
function fieldHtml(f) {
  if (f.type === 'opt') return `<div class="field"><label>${esc(f.label)}${f.req ? '<span class="req">*</span>' : ''}</label>
    <div class="opt-row" data-og="${f.id}">${f.opts.map((o, i) =>
      `<button class="opt ${FORM[f.id] === o || (!FORM[f.id] && i === 0 && false) ? 'on' : ''}" data-act="opt|${f.id}|${esc(o)}">${esc(o)}</button>`).join('')}</div></div>`;
  if (f.type === 'select') return `<div class="field"><label>${esc(f.label)}${f.req ? '<span class="req">*</span>' : ''}</label>
    <select class="select" id="f_${f.id}">${f.opts.map(o => `<option ${FORM[f.id] === o ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select></div>`;
  if (f.type === 'textarea') return `<div class="field"><label>${esc(f.label)}${f.req ? '<span class="req">*</span>' : ''}</label>
    <textarea class="textarea" id="f_${f.id}" placeholder="${esc(f.ph || '')}">${esc(FORM[f.id] || '')}</textarea></div>`;
  return `<div class="field"><label>${esc(f.label)}${f.req ? '<span class="req">*</span>' : ''}</label>
    <input class="input" id="f_${f.id}" placeholder="${esc(f.ph || '')}" value="${esc(FORM[f.id] || '')}"></div>`;
}
function bindForm() {
  onMount(() => {
    $$('[id^="f_"]').forEach(el => {
      const k = el.id.slice(2);
      if (FORM[k] != null && FORM[k] !== '') el.value = FORM[k]; else FORM[k] = el.value;
      el.addEventListener(el.tagName === 'SELECT' ? 'change' : 'input', () => { FORM[k] = el.value; });
    });
  });
}
V.compose = ({ cat }) => {
  bindForm();
  const spec = COMPOSE[cat] || COMPOSE.info;
  return `
  ${barHdr(spec.title, `<button class="icon-btn" data-act="submitPost|${cat}" style="width:auto;padding:0 10px;font-size:14px;font-weight:700;color:var(--pri)">등록</button>`)}
  <div class="scroll">
    <div class="notice">${ic('info', 17, 2)}<p>목적에 맞는 양식을 채우면 다른 라이더가 정보를 한눈에 볼 수 있어요.</p></div>
    <div style="padding:0 20px 10px">
      <div class="field" style="margin-top:14px"><label>사진</label>
        <div style="display:flex;gap:9px">
          <button class="card" style="width:78px;height:78px;display:grid;place-items:center;color:var(--sub-2);font-size:11px;font-weight:600;gap:4px" data-act="photoStub">
            <span style="display:block">${ic('cam', 20)}</span>0 / 5</button>
        </div></div>
      ${spec.fields.map(fieldHtml).join('')}
      <div style="margin-top:26px"><button class="btn" data-act="submitPost|${cat}">등록하기</button></div>
    </div>
    <div style="height:24px"></div>
  </div>`;
};

/* ==========================================================================
   MARKET
   ========================================================================== */
let mkCat = 'all';
function mkCell(m) {
  const on = !!S.wish[m.id];
  return `<div class="mk-cell">
    <button style="display:block;width:100%;text-align:left" data-go="product:${m.id}">
      ${ph(m.art, m.seed)}
      ${m.sold ? '<span class="sold tag dark">거래완료</span>' : ''}
      <span class="mk-n">${esc(m.n)}</span>
      <span class="mk-p">${won(m.p)}</span>
      <span class="mk-m">${ic('pin', 11, 2)}${esc(m.area)}<i class="dotsep"></i>${esc(m.time)}</span>
    </button>
    <button class="mk-h ${on ? 'on' : ''}" data-act="wish|${m.id}">${ic(on ? 'heartF' : 'heart', 17, 2)}</button>
  </div>`;
}
V.market = () => {
  const list = sortProducts(allProducts().filter(m => mkCat === 'all' || m.cat === mkCat));
  return `
  ${barHdr('MARKET', `<button class="icon-btn" data-go="search">${ic('search', 22)}</button>`)}
  <div class="scroll" style="padding-bottom:0">
    <div class="chips" style="padding-top:2px">
      ${MK_CATS.map(c => `<button class="chip ${mkCat === c.k ? 'on pri' : ''}" data-act="mkCat|${c.k}">${c.ko}</button>`).join('')}
      <button class="chip" data-act="filter">${ic('sliders', 13, 2)} 필터</button>
    </div>
    <p class="sec-note" style="margin:14px 0 0">총 ${list.length}개 · 개인 간 직거래 (프로토타입 더미 데이터)</p>
    ${list.length ? `<div class="mk-grid">${list.map(mkCell).join('')}</div>`
      : empt('cart', '등록된 상품이 없어요', '첫 상품을 등록해보세요.', `<button class="btn" data-go="sell">판매하기</button>`)}
    <div style="height:26px"></div>
  </div>
  <button class="fab" data-go="sell">${ic('plus', 18, 2.2)} 판매하기</button>`;
};

V.product = ({ id }) => {
  const m = prodOf(id);
  if (!m) return `${barHdr('상품')}<div class="scroll">${empt('cart', '상품을 찾을 수 없어요', '삭제되었거나 존재하지 않습니다.')}</div>`;
  const on = !!S.wish[m.id];
  const cat = { gear:'장비', wear:'웨어', acc:'액세서리' }[m.cat] || '기타';
  return `
  <div class="scroll" style="padding-bottom:0;background:#fff">
    <div class="pdt-hero">${ph(m.art, m.seed)}
      <div class="pdt-nav">
        <button class="rb" data-back>${ic('left', 21)}</button>
        <button class="rb" data-act="share">${ic('share', 19)}</button>
      </div>
      ${m.sold ? '<span class="sold tag dark" style="left:16px;top:56px">거래완료</span>' : ''}
    </div>
    <div class="pdt-price">
      <span class="tag gray">${cat}</span>
      <div class="pp-n">${esc(m.n)}</div>
      <div class="pp-p">${won(m.p)}</div>
      <div class="pp-m meta">${esc(m.time)}<i class="dotsep"></i>${ic('pin', 12, 2)}${esc(m.area)}<i class="dotsep"></i>찜 ${(m.id.length * 3) % 17 + 2}</div>
    </div>
    <div class="seller">${ph('person', m.seed, 'round')}
      <div><div class="s-n">${esc(m.seller)}</div><div class="s-s">${esc(m.sellerLv)}</div></div>
      <button class="s-b" data-act="chat">프로필</button></div>
    <div class="pdt-spec">
      <dl class="sp"><dt>상품 상태</dt><dd>${esc(m.cond)}</dd></dl>
      <dl class="sp"><dt>거래 지역</dt><dd>${esc(m.area)}</dd></dl>
    </div>
    <div class="pd-body" style="padding-top:20px">${esc(m.d)}</div>
    <div class="hr"></div>
    <div style="padding:0 20px 4px;font-size:14px;font-weight:700">비슷한 상품</div>
    <div class="hscroll" style="padding-top:12px">
      ${allProducts().filter(x => x.cat === m.cat && x.id !== m.id).slice(0, 5).map(prodCard).join('')}</div>
    <div style="height:26px"></div>
  </div>
  <div class="bottom-cta">
    <button class="heart ${on ? 'on' : ''}" data-act="wish|${m.id}">${ic(on ? 'heartF' : 'heart', 22, 2)}</button>
    <button class="btn ghost" style="flex:1" data-act="chat">판매자에게 문의</button>
    <button class="btn" style="flex:1" data-act="buy">구매 관련 문의</button>
  </div>`;
};

V.sell = () => { bindForm(); return `
  ${barHdr('판매하기', `<button class="icon-btn" data-act="submitProduct" style="width:auto;padding:0 10px;font-size:14px;font-weight:700;color:var(--pri)">등록</button>`)}
  <div class="scroll">
    <div style="padding:16px 20px 10px">
      <div class="field" style="margin-top:0"><label>상품 사진<span class="req">*</span></label>
        <div style="display:flex;gap:9px">
          <button class="card" style="width:82px;height:82px;display:grid;place-items:center;color:var(--sub-2);font-size:11px;font-weight:600" data-act="photoStub">
            <span style="display:block">${ic('cam', 20)}</span>0 / 10</button>
        </div></div>
      <div class="field"><label>상품명<span class="req">*</span></label>
        <input class="input" id="f_n" placeholder="예) 23-24 버튼 커스텀 데크 155cm"></div>
      <div class="field"><label>카테고리<span class="req">*</span></label>
        <div class="opt-row">${MK_CATS.filter(c => c.k !== 'all').map(c =>
          `<button class="opt ${FORM.mkcat === c.k ? 'on' : ''}" data-act="opt|mkcat|${c.k}">${c.ko}</button>`).join('')}</div></div>
      <div class="field"><label>상품 상태<span class="req">*</span></label>
        <div class="opt-row">${['새 상품','거의 새것','상태 좋음','보통','사용감 있음'].map(o =>
          `<button class="opt ${FORM.cond === o ? 'on' : ''}" data-act="opt|cond|${esc(o)}">${o}</button>`).join('')}</div></div>
      <div class="field"><label>가격<span class="req">*</span></label>
        <input class="input" id="f_p" type="number" inputmode="numeric" placeholder="숫자만 입력해주세요"></div>
      <div class="field"><label>거래 지역<span class="req">*</span></label>
        <input class="input" id="f_area" placeholder="예) 서울 마포구"></div>
      <div class="field"><label>상품 설명<span class="req">*</span></label>
        <textarea class="textarea" id="f_d" placeholder="구매 시기, 사용 기간, 하자 여부 등을 적어주세요."></textarea></div>
      <div style="margin-top:26px"><button class="btn" data-act="submitProduct">등록하기</button></div>
    </div>
    <div style="height:24px"></div>
  </div>`; };

/* ==========================================================================
   MY
   ========================================================================== */
V.my = () => {
  const pf = S.profile;
  const nSaved = Object.keys(S.saved).filter(k => S.saved[k]).length;
  const nWish = Object.keys(S.wish).filter(k => S.wish[k]).length;
  return `
  ${bigHdr('MY', '', `<button class="icon-btn" data-go="settings">${ic('gear', 23)}</button>`)}
  <div class="scroll">
    <div class="my-prof">${ph('person', 3, 'round')}
      <div style="flex:1"><div class="mp-n">${esc(pf.name)}</div>
        <div class="mp-s">${esc(pf.years)} · ${esc(pf.style)}</div>
        <div class="mp-tags">${S.base.map(b => `<span class="tag">${esc(R(b).name)}</span>`).join('') || '<span class="tag gray">베이스 미설정</span>'}</div>
      </div>
      <button class="icon-btn" data-act="editProfile">${ic('edit', 20)}</button>
    </div>
    <div class="my-stats">
      <button class="ms" data-go="myposts"><b>${S.myPosts.length}</b><span>내 게시글</span></button>
      <button class="ms" data-go="looks"><b>${S.looks.length}</b><span>MY LOOK</span></button>
      <button class="ms" data-go="wish"><b>${nWish}</b><span>찜한 상품</span></button>
      <button class="ms" data-go="savedposts"><b>${nSaved}</b><span>저장한 글</span></button>
    </div>

    <div class="menu-group"><div class="mg-t">MY OUTFIT</div><div class="menu">
      <button class="m" data-go="looks"><span class="m-ic">${ic('hanger', 18)}</span><span class="m-t">저장한 LOOK</span><span class="m-v">${S.looks.length}</span>${ic('right', 18, 2)}</button>
      <button class="m" data-tab="outfit"><span class="m-ic">${ic('ai', 18)}</span><span class="m-t">AI 가상 피팅</span>${ic('right', 18, 2)}</button>
    </div></div>

    <div class="menu-group"><div class="mg-t">SAVED</div><div class="menu">
      <button class="m" data-go="wish"><span class="m-ic">${ic('heart', 18)}</span><span class="m-t">찜한 상품</span><span class="m-v">${nWish}</span>${ic('right', 18, 2)}</button>
      <button class="m" data-go="savedposts"><span class="m-ic">${ic('bookmark', 18)}</span><span class="m-t">저장한 게시글</span><span class="m-v">${nSaved}</span>${ic('right', 18, 2)}</button>
    </div></div>

    <div class="menu-group"><div class="mg-t">MY ACTIVITY</div><div class="menu">
      <button class="m" data-go="myposts"><span class="m-ic">${ic('doc', 18)}</span><span class="m-t">내가 작성한 게시글</span><span class="m-v">${S.myPosts.length}</span>${ic('right', 18, 2)}</button>
      <button class="m" data-go="activity"><span class="m-ic">${ic('chat', 18)}</span><span class="m-t">댓글 · 활동 내역</span>${ic('right', 18, 2)}</button>
      <button class="m" data-go="trades"><span class="m-ic">${ic('wallet', 18)}</span><span class="m-t">거래 내역</span><span class="m-v">${S.myProducts.length}</span>${ic('right', 18, 2)}</button>
    </div></div>

    <div class="menu-group"><div class="mg-t">MY RESORT</div><div class="menu">
      <button class="m" data-go="base"><span class="m-ic">${ic('mountain', 18)}</span><span class="m-t">베이스 스키장</span><span class="m-v">${S.base.length}</span>${ic('right', 18, 2)}</button>
      <button class="m" data-go="ticket"><span class="m-ic">${ic('ticket', 18)}</span><span class="m-t">시즌권 가격 비교</span>${ic('right', 18, 2)}</button>
    </div></div>

    <div class="menu-group"><div class="mg-t">SETTINGS</div><div class="menu">
      <button class="m" data-go="settings"><span class="m-ic">${ic('gear', 18)}</span><span class="m-t">설정</span>${ic('right', 18, 2)}</button>
      <button class="m" data-act="resetAll"><span class="m-ic">${ic('logout', 18)}</span><span class="m-t">프로토타입 데이터 초기화</span>${ic('right', 18, 2)}</button>
    </div></div>
    <div style="height:26px"></div>
  </div>`;
};

V.wish = () => {
  const list = allProducts().filter(m => S.wish[m.id]);
  return `${barHdr('찜한 상품')}<div class="scroll">
    ${list.length ? `<div class="mk-grid">${list.map(mkCell).join('')}</div>`
      : empt('heart', '찜한 상품이 없어요', 'MARKET에서 마음에 드는 상품을 찜해보세요.', `<button class="btn" data-go="market">MARKET 둘러보기</button>`)}
    <div style="height:24px"></div></div>`;
};
V.savedposts = () => {
  const list = allPosts().filter(p => S.saved[p.id]);
  return `${barHdr('저장한 게시글')}<div class="scroll">
    ${list.length ? `<div style="background:#fff;border-bottom:1px solid var(--line);margin-top:2px">${list.map(postCard).join('')}</div>`
      : empt('bookmark', '저장한 게시글이 없어요', '나중에 볼 글을 저장해두면 여기에 모여요.', `<button class="btn" data-tab="community">COMMUNITY 가기</button>`)}
    <div style="height:24px"></div></div>`;
};
V.myposts = () => `${barHdr('내가 작성한 게시글')}<div class="scroll">
    ${S.myPosts.length ? `<div style="background:#fff;border-bottom:1px solid var(--line);margin-top:2px">${S.myPosts.map(postCard).join('')}</div>`
      : empt('doc', '작성한 게시글이 없어요', 'COMMUNITY에서 첫 글을 남겨보세요.', `<button class="btn" data-act="compose|mate">글쓰기</button>`)}
    <div style="height:24px"></div></div>`;
V.trades = () => `${barHdr('거래 내역')}<div class="scroll">
    ${S.myProducts.length ? `<div class="mk-grid">${S.myProducts.map(mkCell).join('')}</div>`
      : empt('wallet', '거래 내역이 없어요', 'MARKET에서 상품을 등록하거나 구매해보세요.', `<button class="btn" data-go="sell">판매하기</button>`)}
    <div style="height:24px"></div></div>`;
V.activity = () => {
  const acts = [];
  Object.keys(S.likes).filter(k => S.likes[k]).forEach(k => { const p = postOf(k); if (p) acts.push({ ic:'heart', t:'좋아요를 눌렀어요', s:p.t, id:p.id }); });
  Object.keys(S.saved).filter(k => S.saved[k]).forEach(k => { const p = postOf(k); if (p) acts.push({ ic:'bookmark', t:'게시글을 저장했어요', s:p.t, id:p.id }); });
  S.myPosts.forEach(p => acts.push({ ic:'edit', t:'게시글을 작성했어요', s:p.t, id:p.id }));
  return `${barHdr('활동 내역')}<div class="scroll">
    ${acts.length ? `<div style="background:#fff;border-top:1px solid var(--line);border-bottom:1px solid var(--line);margin-top:2px">
      ${acts.map(a => `<button class="row" data-go="post:${a.id}">
        <span style="width:34px;height:34px;border-radius:11px;background:var(--pri-weak);color:var(--pri-dark);display:grid;place-items:center;flex:none">${ic(a.ic, 17)}</span>
        <span class="rw-main"><span class="rw-t" style="font-weight:600">${esc(a.s)}</span><span class="rw-s">${esc(a.t)}</span></span>
        ${ic('right', 18, 2)}</button>`).join('')}</div>`
      : empt('chat', '활동 내역이 없어요', '좋아요, 저장, 글쓰기 활동이 여기에 쌓여요.')}
    <div style="height:24px"></div></div>`;
};
V.settings = () => `${barHdr('설정')}<div class="scroll">
  <div class="menu-group" style="margin-top:14px"><div class="mg-t">알림</div><div class="menu">
    ${[['push', '전체 알림'], ['mate', '라이딩 메이트 알림'], ['market', '마켓 거래 알림']].map(([k, ko]) =>
      `<div class="m"><span class="m-ic">${ic('bell', 18)}</span><span class="m-t">${ko}</span>
        <button class="switch ${S.notif[k] ? 'on' : ''}" data-act="notifToggle|${k}"><i></i></button></div>`).join('')}
  </div></div>
  <div class="menu-group"><div class="mg-t">계정</div><div class="menu">
    <button class="m" data-act="editProfile"><span class="m-ic">${ic('user', 18)}</span><span class="m-t">프로필 수정</span>${ic('right', 18, 2)}</button>
    <button class="m" data-go="base"><span class="m-ic">${ic('mountain', 18)}</span><span class="m-t">베이스 스키장 관리</span>${ic('right', 18, 2)}</button>
    <div class="m"><span class="m-ic">${ic('shield', 18)}</span><span class="m-t">개인정보 설정</span><span class="m-v">공개</span></div>
  </div></div>
  <div class="menu-group"><div class="mg-t">앱 설정</div><div class="menu">
    <div class="m"><span class="m-ic">${ic('info', 18)}</span><span class="m-t">버전</span><span class="m-v">1.0.0 (proto)</span></div>
    <button class="m" data-act="resetAll"><span class="m-ic">${ic('trash', 18)}</span><span class="m-t">저장된 데이터 초기화</span>${ic('right', 18, 2)}</button>
  </div></div>
  <div style="height:26px"></div></div>`;

/* ==========================================================================
   SEARCH
   ========================================================================== */
let SQ = '';
V.search = () => {
  const q = SQ.trim();
  const posts = q ? allPosts().filter(p => (p.t + p.d + p.resort).indexOf(q) >= 0) : [];
  const prods = q ? allProducts().filter(m => (m.n + m.area).indexOf(q) >= 0) : [];
  const res = q ? RESORTS.filter(r => r.name.indexOf(q) >= 0) : [];
  const none = q && !posts.length && !prods.length && !res.length;
  return `
  <header class="hdr bar"><button class="icon-btn" data-back>${ic('left', 23)}</button>
    <div class="searchbar" style="flex:1;height:42px">${ic('search', 18, 2)}
      <input id="sq" placeholder="장비, 웨어, 시즌방, 라이딩 메이트 검색" value="${esc(SQ)}">
      ${SQ ? `<button data-act="clearQ" style="color:#C3C9D0">${ic('x', 16, 2.4)}</button>` : ''}</div>
  </header>
  <div class="scroll">
    ${!q ? `<div class="sec" style="margin-top:14px">${secHead('최근 검색어')}
        <div class="recent">${S.recent.length ? S.recent.map(r =>
          `<span class="rc">${esc(r)}<button data-act="delRecent|${esc(r)}">${ic('x', 13, 2.6)}</button></span>`).join('')
          : '<span style="font-size:13px;color:var(--sub-2);font-weight:500">최근 검색어가 없어요.</span>'}</div></div>
      <div class="sec">${secHead('인기 검색어')}
        <div class="trend">${TRENDS.map((t, i) => `<button class="tr" data-act="trend|${esc(t)}"><i>${i + 1}</i>${esc(t)}</button>`).join('')}</div></div>`
    : none ? empt('search', `'${esc(q)}' 검색 결과가 없어요`, '다른 키워드로 검색해보세요.')
    : `${res.length ? `<div class="sec" style="margin-top:12px">${secHead('스키장')}
          <div class="card" style="margin:0 20px;overflow:hidden">${res.map(r => `<button class="row" data-go="resort:${r.id}">
            ${ph(r.art, r.seed, '', 'width:44px;height:44px;border-radius:12px')}
            <span class="rw-main"><span class="rw-t">${esc(r.name)}</span><span class="rw-s">${esc(r.region)} · D-${r.dday}</span></span>
            ${ic('right', 18, 2)}</button>`).join('')}</div></div>` : ''}
      ${prods.length ? `<div class="sec">${secHead(`상품 ${prods.length}`, 'MARKET', 'data-go="market"')}
          <div class="hscroll">${prods.map(prodCard).join('')}</div></div>` : ''}
      ${posts.length ? `<div class="sec">${secHead(`게시글 ${posts.length}`)}
          <div style="background:#fff;border-top:1px solid var(--line);border-bottom:1px solid var(--line)">${posts.map(postCard).join('')}</div></div>` : ''}`}
    <div style="height:24px"></div>
  </div>`;
};

/* ==========================================================================
   FILTER STATE  +  helpers used by views
   ========================================================================== */
let cmResort = 'all', mkSort = 'new';
if (!S.cmts) S.cmts = {};
function sortProducts(a) {
  const l = a.slice();
  if (mkSort === 'low') l.sort((x, y) => x.p - y.p);
  else if (mkSort === 'high') l.sort((x, y) => y.p - x.p);
  return l;
}
const today = () => { const d = new Date(); return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`; };
const uid = pre => pre + Math.random().toString(36).slice(2, 8);
const ART_BY_CAT = { mate:'rider', house:'room', info:'slope', qna:'lift', outfit:'jacket', gear:'deck', market:'gear' };
function addRecent(q) {
  q = q.trim(); if (!q) return;
  S.recent = [q].concat(S.recent.filter(r => r !== q)).slice(0, 8); save();
}

/* search input focus handling */
const _search = V.search;
V.search = p => {
  onMount(() => {
    const el = $('#sq'); if (!el) return;
    el.focus(); try { el.setSelectionRange(el.value.length, el.value.length); } catch (e) {}
    el.addEventListener('input', ev => { SQ = ev.target.value; refresh(); });
    el.addEventListener('keydown', ev => { if (ev.key === 'Enter') { addRecent(SQ); refresh(); } });
  });
  return _search(p);
};

/* ==========================================================================
   SHEETS
   ========================================================================== */
function sheetAddBase() {
  const others = RESORTS.filter(r => S.base.indexOf(r.id) < 0);
  sheet({ title:'베이스 스키장 추가', body: others.length ? others.map(r => `
      <div class="res-row" style="padding:14px 0;background:transparent">
        ${ph(r.art, r.seed)}
        <span class="rr-m"><span class="rr-n">${esc(r.name)}</span>
          <span class="rr-s">${esc(r.region)} · ${esc(r.open)} 오픈 · 시즌권 ${manwon(r.price)}</span></span>
        <button class="btn xs soft" data-act="addBaseId|${r.id}">추가</button></div>`).join('')
    : `<div style="padding:40px;text-align:center;color:var(--sub-2);font-size:13px">모든 스키장을 이미 등록했어요 🎉</div>` });
}
function sheetAddItem(catKey) {
  const c = CHECK_CATS.find(x => x.k === catKey);
  sheet({ title:`${c ? c.ko : ''} 항목 추가`,
    body:`<div class="field" style="margin-top:6px"><label>항목 이름</label>
      <input class="input" id="ni" placeholder="예) 시즌권 사진 등록하기" autocomplete="off"></div>`,
    foot:`<button class="btn" data-act="saveItem|${catKey}">추가하기</button>`,
    mount: w => setTimeout(() => { const i = w.querySelector('#ni'); if (i) i.focus(); }, 250) });
}
const SWATCH = ['#1CB4FF','#2C3E63','#EDF1F5','#7C8F6E','#24282E','#F0784F','#C3CAD2','#8A6244','#E8C24A','#6C7358'];
let newColor = SWATCH[0];
function sheetAddCloth(slotKey) {
  const s = SLOTS.find(x => x.k === slotKey) || SLOTS[0];
  newColor = SWATCH[0];
  sheet({ title:`${s.label} 추가`,
    body:`<div class="notice" style="margin:6px 0 0">${ic('info', 17, 2)}<p>프로토타입에서는 사진 대신 컬러로 아이템을 등록합니다.</p></div>
      <div class="field"><label>아이템 이름<span class="req">*</span></label>
        <input class="input" id="ci" placeholder="예) 화이트 3L 쉘 자켓"></div>
      <div class="field"><label>브랜드</label><input class="input" id="cb" placeholder="예) BURTON"></div>
      <div class="field"><label>컬러</label>
        <div class="opt-row" id="cw">${SWATCH.map((c, i) => `
          <button class="opt ${i === 0 ? 'on' : ''}" data-color="${c}" style="width:44px;height:44px;padding:0;display:grid;place-items:center">
            <span style="width:24px;height:24px;border-radius:8px;background:${c};border:1px solid rgba(0,0,0,.08)"></span></button>`).join('')}</div></div>`,
    foot:`<button class="btn" data-act="saveCloth|${slotKey}">내 옷장에 추가</button>`,
    mount: w => {
      w.querySelectorAll('#cw .opt').forEach(b => b.addEventListener('click', () => {
        w.querySelectorAll('#cw .opt').forEach(x => x.classList.remove('on'));
        b.classList.add('on'); newColor = b.dataset.color;
      }));
      setTimeout(() => { const i = w.querySelector('#ci'); if (i) i.focus(); }, 250);
    } });
}
function sheetPhoto() {
  sheet({ title:'내 사진 추가',
    body:`<div class="notice" style="margin:6px 0 14px">${ic('info', 17, 2)}<p>프로토타입에서는 준비된 샘플 이미지가 적용됩니다.</p></div>
      <button class="row card" style="border-radius:14px;margin-bottom:9px" data-act="setPhoto|1">
        <span style="width:40px;height:40px;border-radius:12px;background:var(--pri-weak);color:var(--pri-dark);display:grid;place-items:center">${ic('cam', 20)}</span>
        <span class="rw-main"><span class="rw-t">카메라로 촬영</span><span class="rw-s">전신이 나오도록 촬영해주세요</span></span>${ic('right', 18, 2)}</button>
      <button class="row card" style="border-radius:14px" data-act="setPhoto|1">
        <span style="width:40px;height:40px;border-radius:12px;background:var(--pri-weak);color:var(--pri-dark);display:grid;place-items:center">${ic('img', 20)}</span>
        <span class="rw-main"><span class="rw-t">앨범에서 선택</span><span class="rw-s">최근 사진 불러오기</span></span>${ic('right', 18, 2)}</button>
      ${S.photo ? `<button class="btn ghost sm" style="margin-top:14px" data-act="setPhoto|0">모델 이미지로 되돌리기</button>` : ''}` });
}
function sheetFilterCommunity() {
  sheet({ title:'필터',
    body:`<div class="field" style="margin-top:6px"><label>정렬</label>
        <div class="opt-row">${SORTS.map(s => `<button class="opt ${cmSort === s.k ? 'on' : ''}" data-act="cmSort|${s.k}">${s.ko}</button>`).join('')}</div></div>
      <div class="field"><label>스키장</label>
        <div class="opt-row"><button class="opt ${cmResort === 'all' ? 'on' : ''}" data-act="cmRes|all">전체</button>
          ${RESORTS.map(r => `<button class="opt ${cmResort === r.name ? 'on' : ''}" data-act="cmRes|${esc(r.name)}">${esc(r.name)}</button>`).join('')}
          <button class="opt ${cmResort === '전체 스키장' ? 'on' : ''}" data-act="cmRes|전체 스키장">전체 스키장 글</button></div></div>`,
    foot:`<button class="btn" data-sheet-close>적용</button>` });
}
function sheetFilterMarket() {
  sheet({ title:'정렬',
    body:`<div class="field" style="margin-top:6px"><label>정렬 기준</label>
      <div class="opt-row">
        <button class="opt ${mkSort === 'new' ? 'on' : ''}" data-act="mkSort|new">최신순</button>
        <button class="opt ${mkSort === 'low' ? 'on' : ''}" data-act="mkSort|low">낮은 가격순</button>
        <button class="opt ${mkSort === 'high' ? 'on' : ''}" data-act="mkSort|high">높은 가격순</button>
      </div></div>`,
    foot:`<button class="btn" data-sheet-close>적용</button>` });
}
function sheetNotif() {
  const items = [
    { i:'users', t:'라이딩 메이트 신청이 도착했어요', s:'그라운드킴 · 12/21 휘닉스', tm:'5분 전' },
    { i:'ticket', t:'휘닉스 평창 얼리버드가 곧 마감돼요', s:'11.30까지 790,000원', tm:'2시간 전' },
    { i:'cart', t:'찜한 상품의 가격이 내려갔어요', s:'오클리 플라이트 데크 고글', tm:'1일 전' }
  ];
  sheet({ title:'알림', body: items.map(n => `
    <div class="row" style="padding:14px 0;background:transparent">
      <span style="width:38px;height:38px;border-radius:12px;background:var(--pri-weak);color:var(--pri-dark);display:grid;place-items:center;flex:none">${ic(n.i, 18)}</span>
      <span class="rw-main"><span class="rw-t" style="font-weight:600">${esc(n.t)}</span><span class="rw-s">${esc(n.s)}</span></span>
      <span class="rw-v">${esc(n.tm)}</span></div>`).join('') });
}
function sheetProfile() {
  const p = S.profile;
  sheet({ title:'프로필 수정',
    body:`<div style="text-align:center;padding:6px 0 4px">${ph('person', 3, 'round', 'width:76px;height:76px;margin:0 auto')}
        <button class="btn xs ghost" style="margin:12px auto 0" data-act="photoStub">사진 변경</button></div>
      <div class="field"><label>이름</label><input class="input" id="pf_n" value="${esc(p.name)}"></div>
      <div class="field"><label>라이딩 경력</label><input class="input" id="pf_y" value="${esc(p.years)}"></div>
      <div class="field"><label>라이딩 스타일</label><input class="input" id="pf_s" value="${esc(p.style)}"></div>`,
    foot:`<button class="btn" data-act="saveProfile">저장하기</button>` });
}
function sheetReset() {
  sheet({ title:'데이터 초기화',
    body:`<p style="font-size:14px;color:var(--sub);line-height:1.6;padding:8px 0 4px">
      체크리스트, 베이스 스키장, 저장한 LOOK, 찜한 상품 등 이 기기에 저장된 프로토타입 데이터를 모두 삭제합니다.</p>`,
    foot:`<div class="btn-row"><button class="btn ghost" data-sheet-close>취소</button>
      <button class="btn" style="background:var(--danger)" data-act="doReset">초기화</button></div>` });
}

/* ==========================================================================
   EVENTS
   ========================================================================== */
function parseGo(v) {
  const i = v.indexOf(':');
  return i < 0 ? [v, null] : [v.slice(0, i), v.slice(i + 1)];
}
function navigate(v) {
  const [r, a] = parseGo(v);
  if (r === 'community') { if (a) cmCat = a; tabTo('community'); return; }
  if (r === 'compose') { FORM = {}; go('compose', { cat:a || 'info' }); return; }
  if (a) go(r, { id:a }); else go(r);
}
function val(id) { const e = $('#' + id); return e ? e.value.trim() : ''; }

function act(code, el) {
  const parts = code.split('|');
  const a = parts[0], x = parts[1], y = parts[2];
  switch (a) {

    /* ---- PLAN ---- */
    case 'check': S.checked[x] = !S.checked[x]; save(); refresh(); break;
    case 'addItem': sheetAddItem(x); break;
    case 'saveItem': {
      const t = val('ni');
      if (!t) { toast('항목 이름을 입력해주세요'); return; }
      (S.custom[x] = S.custom[x] || []).push({ id: uid('c'), t });
      save(); closeSheet(); refresh(); toast('항목이 추가되었습니다', 'check'); break;
    }
    case 'delItem': {
      Object.keys(S.custom).forEach(k => S.custom[k] = (S.custom[k] || []).filter(i => i.id !== x));
      delete S.checked[x]; save(); refresh(); toast('항목이 삭제되었습니다'); break;
    }
    case 'jump': {
      const m = { ticket:'ticket', planner:'planner', base:'base', market:'market' };
      if (m[x]) go(m[x]);
      else if (x === 'outfit') tabTo('outfit');
      else { cmCat = x; tabTo('community'); }
      break;
    }
    case 'tkSort': tkSort = x; refresh(); break;

    /* ---- BASE RESORT ---- */
    case 'addBase': sheetAddBase(); break;
    case 'addBaseId':
      if (S.base.indexOf(x) < 0) S.base.push(x);
      save(); closeSheet(); refresh(); toast(`${R(x).name} 추가됨`, 'check'); break;
    case 'delBase':
      S.base = S.base.filter(b => b !== x); save(); refresh(); toast('베이스 스키장에서 제거했습니다'); break;

    /* ---- OUTFIT ---- */
    case 'slot': FIT_SLOT = x; refresh(); break;
    case 'pick': FIT[x] = (FIT[x] === y ? null : y); refresh(); break;
    case 'clear': FIT[x] = null; refresh(); break;
    case 'addCloth': sheetAddCloth(x); break;
    case 'saveCloth': {
      const n = val('ci'); if (!n) { toast('아이템 이름을 입력해주세요'); return; }
      const it = { id: uid('u'), n, b: val('cb') || 'MY', color: newColor, p: 0 };
      (S.myItems[x] = S.myItems[x] || []).push(it);
      FIT[x] = it.id; FIT_SLOT = x; save(); closeSheet(); refresh(); toast('내 옷장에 추가되었습니다', 'check'); break;
    }
    case 'myPhoto': sheetPhoto(); break;
    case 'setPhoto': S.photo = x === '1'; save(); closeSheet(); refresh();
      toast(S.photo ? '내 사진이 적용되었습니다' : '모델 이미지로 변경되었습니다', 'check'); break;
    case 'fit': runFitting(); break;
    case 'saveLook': {
      const sel = {}; SLOTS.forEach(s => { if (FIT[s.k]) sel[s.k] = FIT[s.k]; });
      const l = { id: uid('L'), name: 'LOOK ' + String(S.looks.length + 1).padStart(2, '0'), date: today(), sel };
      S.looks.unshift(l); save(); toast('LOOK이 저장되었습니다', 'check');
      setTimeout(() => go('look', { id: l.id }), 380); break;
    }
    case 'delLook': S.looks = S.looks.filter(l => l.id !== x); save(); back(); toast('LOOK을 삭제했습니다'); break;
    case 'editLook': {
      const l = S.looks.find(v2 => v2.id === x);
      if (l) { FIT = { jacket:null, pants:null, goggle:null, helmet:null, glove:null }; Object.assign(FIT, l.sel); }
      tabTo('outfit'); toast('코디를 불러왔습니다'); break;
    }
    case 'shareLook': case 'share': toast('링크가 복사되었습니다', 'share'); break;

    /* ---- COMMUNITY ---- */
    case 'cmCat': cmCat = x; refresh(); break;
    case 'cmSort': cmSort = x; closeSheet(); refresh(); break;
    case 'cmRes': cmResort = x; refresh(); break;
    case 'goMarket': go('market'); break;
    case 'filter': (cur().r === 'market' ? sheetFilterMarket : sheetFilterCommunity)(); break;
    case 'like': S.likes[x] = !S.likes[x]; save(); refresh();
      if (S.likes[x]) toast('좋아요를 눌렀습니다', 'heartF'); break;
    case 'savePost': S.saved[x] = !S.saved[x]; save(); refresh();
      toast(S.saved[x] ? '게시글을 저장했습니다' : '저장을 취소했습니다', S.saved[x] ? 'bookmarkF' : null); break;
    case 'apply': toast(x === 'mate' ? '메이트 신청이 전달되었습니다' : '시즌방 문의가 전달되었습니다', 'check'); break;
    case 'sendCmt': {
      const t = val('cmtInput'); if (!t) { toast('댓글을 입력해주세요'); return; }
      const id = cur().p.id;
      (S.cmts[id] = S.cmts[id] || []).push({ w: S.profile.name, t: '방금 전', b: t });
      save(); refresh(); toast('댓글이 등록되었습니다', 'check'); break;
    }
    case 'compose': FORM = {}; 
      if (['info','qna','outfit','gear','market','all'].indexOf(x) >= 0) {
        FORM.cat = { info:'정보/팁', qna:'Q&A', outfit:'OUTFIT', gear:'GEAR' }[x] || '정보/팁';
        go('compose', { cat:'info' });
      } else go('compose', { cat:x });
      break;
    case 'opt': FORM[x] = y; refresh(); break;
    case 'submitPost': {
      const spec = COMPOSE[x] || COMPOSE.info;
      const get = f => f.type === 'opt' ? (FORM[f.id] || '') : val('f_' + f.id);
      for (const f of spec.fields) if (f.req && !get(f)) { toast(`${f.label}을(를) 입력해주세요`); return; }
      const g = {}; spec.fields.forEach(f => g[f.id] = get(f));
      const cat = x === 'info' ? (CAT_BY_KO[g.cat] || 'info') : x;
      const form = {};
      if (x === 'mate') Object.assign(form, { '스키장':g.resort, '날짜':g.date, '라이딩 스타일':g.style, '실력':g.level, '모집 인원':g.count });
      if (x === 'house') Object.assign(form, { '스키장':g.resort, '위치':g.loc, '기간':g.period, '인원':g.people, '성별':g.gender, '비용':g.cost });
      const p = {
        id: uid('p'), cat, t: g.title, w: S.profile.name, lv: `${S.profile.years} · ${S.profile.style}`,
        resort: g.resort || '전체 스키장', time: '방금 전', likes: 0, cmts: 0,
        art: ART_BY_CAT[cat] || 'slope', seed: Math.floor(Math.random() * 9), new: true, mine: true,
        d: (g.body || g.title).split('\n')[0], body: g.body || g.title
      };
      if (Object.keys(form).length) p.form = form;
      S.myPosts.unshift(p); save(); FORM = {};
      HIST.pop(); cmCat = cat; HIST = [{ r:'community', p:{}, s:0 }];
      paint('pop'); toast('게시글이 등록되었습니다', 'check');
      setTimeout(() => go('post', { id: p.id }), 380); break;
    }

    /* ---- MARKET ---- */
    case 'mkCat': mkCat = x; refresh(); break;
    case 'mkSort': mkSort = x; closeSheet(); refresh(); break;
    case 'wish': S.wish[x] = !S.wish[x]; save(); refresh();
      toast(S.wish[x] ? '찜한 상품에 추가했습니다' : '찜을 해제했습니다', S.wish[x] ? 'heartF' : null); break;
    case 'chat': toast('판매자에게 채팅을 보냈습니다', 'chat'); break;
    case 'buy': toast('구매 문의가 전달되었습니다', 'check'); break;
    case 'submitProduct': {
      const n = val('f_n'), p0 = val('f_p'), area = val('f_area'), d = val('f_d');
      if (!n) { toast('상품명을 입력해주세요'); return; }
      if (!FORM.mkcat) { toast('카테고리를 선택해주세요'); return; }
      if (!FORM.cond) { toast('상품 상태를 선택해주세요'); return; }
      if (!p0) { toast('가격을 입력해주세요'); return; }
      if (!area) { toast('거래 지역을 입력해주세요'); return; }
      const m = { id: uid('m'), n, p: parseInt(p0, 10) || 0, cat: FORM.mkcat, cond: FORM.cond, area,
        seller: S.profile.name, sellerLv: '거래 0회 · 신규 판매자', time: '방금 전',
        art: { gear:'deck', wear:'jacket', acc:'goggle' }[FORM.mkcat] || 'gear',
        seed: Math.floor(Math.random() * 9), d: d || '상품 설명이 없습니다.', mine: true };
      S.myProducts.unshift(m); save(); FORM = {};
      HIST.pop(); paint('pop'); toast('상품이 등록되었습니다', 'check');
      setTimeout(() => go('product', { id: m.id }), 380); break;
    }

    /* ---- MY / etc ---- */
    case 'notif': sheetNotif(); break;
    case 'notifToggle': S.notif[x] = !S.notif[x]; save(); refresh(); break;
    case 'editProfile': sheetProfile(); break;
    case 'saveProfile': {
      const n = val('pf_n'); if (!n) { toast('이름을 입력해주세요'); return; }
      S.profile = { name:n, years: val('pf_y') || '1년차', style: val('pf_s') || '올라운드' };
      save(); closeSheet(); refresh(); toast('프로필이 저장되었습니다', 'check'); break;
    }
    case 'resetAll': sheetReset(); break;
    case 'doReset': reset(); break;
    case 'photoStub': toast('프로토타입에서는 샘플 이미지가 사용됩니다'); break;

    /* ---- SEARCH ---- */
    case 'trend': SQ = code.slice(6); addRecent(SQ);
      if (cur().r === 'search') refresh(); else go('search'); break;
    case 'clearQ': SQ = ''; refresh(); break;
    case 'delRecent': S.recent = S.recent.filter(r => r !== code.slice(10)); save(); refresh(); break;

    default: break;
  }
}

document.addEventListener('click', e => {
  const t = e.target;
  if (t.closest('[data-sheet-close]')) { closeSheet(); return; }
  const A = t.closest('[data-act]');
  if (A) { e.preventDefault(); act(A.dataset.act, A); return; }
  const B = t.closest('[data-back]');
  if (B) { e.preventDefault(); if (sheetOpen) closeSheet(); else back(); return; }
  const T = t.closest('[data-tab]');
  if (T) { e.preventDefault(); closeSheet(); tabTo(T.dataset.tab); return; }
  const G = t.closest('[data-go]');
  if (G) { e.preventDefault(); closeSheet(); navigate(G.dataset.go); return; }
});

/* keyboard: Esc = back */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { if (sheetOpen) closeSheet(); else back(); }
});

/* ==========================================================================
   INIT  —  shell bootstrap + safe boot
   ========================================================================== */
const SHELL_HTML = `
<div class="stage">
  <div class="device" id="device">
    <div class="app" id="app">
      <div class="statusbar">
        <span class="sb-time">9:41</span>
        <span class="sb-island"></span>
        <span class="sb-right">
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none"><rect x="0" y="7.5" width="3" height="4.5" rx="1" fill="#111"/><rect x="4.5" y="5" width="3" height="7" rx="1" fill="#111"/><rect x="9" y="2.5" width="3" height="9.5" rx="1" fill="#111"/><rect x="13.5" y="0" width="3" height="12" rx="1" fill="#111"/></svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M8 10.5 5.6 8.1a3.4 3.4 0 0 1 4.8 0L8 10.5Z" fill="#111"/><path d="M3.2 5.7a6.8 6.8 0 0 1 9.6 0" stroke="#111" stroke-width="1.6" stroke-linecap="round"/><path d="M.9 3.1a10.1 10.1 0 0 1 14.2 0" stroke="#111" stroke-width="1.6" stroke-linecap="round"/></svg>
          <svg width="26" height="13" viewBox="0 0 26 13" fill="none"><rect x="0.6" y="0.6" width="21" height="11.8" rx="3.4" stroke="#111" stroke-opacity=".38" stroke-width="1.1"/><rect x="2.2" y="2.2" width="17.8" height="8.6" rx="2.2" fill="#111"/><path d="M23.2 4.4c1.1.4 1.1 3.8 0 4.2V4.4Z" fill="#111" fill-opacity=".4"/></svg>
        </span>
      </div>
      <div class="stack" id="stack"></div>
      <nav class="tabbar" id="tabbar"></nav>
      <div class="sheet-host" id="sheetHost"></div>
      <div class="toast-host" id="toastHost"></div>
    </div>
  </div>
  <p class="stage-hint">HI WINTER · Interactive Prototype · iPhone 16 (393 × 852)</p>
</div>`;

function setVh() {
  const h = (window.visualViewport && window.visualViewport.height) || window.innerHeight || 852;
  document.documentElement.style.setProperty('--appvh', h + 'px');
}
function ensureShell() {
  if (document.getElementById('stack')) return;
  const host = document.getElementById('device') ? document.getElementById('device').closest('.stage').parentNode : document.body;
  const stray = document.querySelector('.stage');
  if (stray) stray.remove();
  const d = document.createElement('div');
  d.innerHTML = SHELL_HTML;
  (host || document.body).appendChild(d.firstElementChild);
}
function boot() {
  try {
    setVh();
    ensureShell();
    if (!document.getElementById('stack')) throw new Error('app shell을 만들 수 없습니다');
    paint('tab');
    console.log('%cHI WINTER', 'color:#1CB4FF;font-weight:800;font-size:14px', 'prototype ready');
  } catch (err) {
    console.error(err);
    const box = document.createElement('div');
    box.style.cssText = 'position:fixed;left:16px;right:16px;top:16px;z-index:9999;background:#fff;border:1px solid #E5E7EB;border-radius:14px;padding:16px;font:500 13px/1.6 system-ui,sans-serif;color:#111;box-shadow:0 8px 24px rgba(0,0,0,.12)';
    box.textContent = '앱을 불러오지 못했습니다: ' + (err && err.message ? err.message : err);
    document.body.appendChild(box);
  }
}
window.addEventListener('resize', setVh);
if (window.visualViewport) window.visualViewport.addEventListener('resize', setVh);
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
