const fs = require('fs');
const path = require('path');
const ROOT = __dirname;

/* ============================== SITE CONSTANTS ============================== */
const SITE = {
  name: 'Rolstoeltaxi Spoed',
  parentBrand: 'Rolstoeltaxi Holland',
  domain: 'https://rolstoeltaxispoed.nl',
  phoneDisplay: '06 2876 1078',
  phoneTel: '+31628761078',
  whatsapp: '31628761078',
  web3formsKey: '', // vul hier de Web3Forms access key in om e-mail te koppelen
  email: 'info@rolstoeltaxispoed.nl',
};

const SERVICES = require('./content/services.js');
const CITIES = [
  ...require('./content/cities-amsterdam.js'),
  ...require('./content/cities-noord.js'),
  ...require('./content/cities-zuid.js'),
  ...require('./content/cities-rest.js'),
];
const cityPath = c => c.path || `/rolstoeltaxi-${c.slug}`;
const cityBySlug = slug => CITIES.find(c => c.slug === slug);
const TOP_CITIES = ['amsterdam', 'schiphol', 'amstelveen', 'haarlem', 'hoofddorp', 'zaandam', 'leiden', 'den-haag', 'rotterdam', 'utrecht', 'alkmaar', 'zandvoort'];

/* ============================== SHARED SHELL ============================== */

const CSS = fs.readFileSync(path.join(ROOT, 'shared.css.txt'), 'utf8');

function breadcrumbLd(items) {
  return `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    ${items.map((it, i) => `{"@type":"ListItem","position":${i + 1},"name":${JSON.stringify(it.label)}${it.url ? `,"item":${JSON.stringify(it.url)}` : ''}}`).join(',\n    ')}
  ]
}
</script>`;
}

function breadcrumbNav(items) {
  return `<div class="breadcrumb reveal" role="navigation" aria-label="Kruimelpad">
  ${items.map((it, i) => it.href
      ? `<a href="${it.href}">${it.label}</a><span class="crumb-sep">/</span>`
      : `<span aria-current="page">${it.label}</span>`
    ).join('\n  ')}
</div>`;
}

function truncate(text, max) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return cut.slice(0, lastSpace > 0 ? lastSpace : max).trim() + '…';
}

function svgCheck() {
  return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>`;
}

function logoMark(prefix) {
  return `<span class="logo-icon"><img src="/img/logo-icoon.png" alt="" width="20" height="20" aria-hidden="true"></span><span class="logo-text">Rolstoeltaxi<b>Spoed</b></span>`;
}

const ICONS = {
  bolt: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"/></svg>`,
  clock: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>`,
  checkCircle: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M8.5 12.5l2.3 2.3L16 10"/></svg>`,
  badge: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l2.6 1.5L18 3l.6 3.4L21 9l-1.5 2.6L21 15l-2.4 2.6L18 21l-3.4-.5L12 22l-2.6-1.5L6 21l-.6-3.4L3 15l1.5-2.6L3 9l2.4-2.6L6 3l3.4.5L12 2z"/><path d="M9 12l2 2 4-4"/></svg>`,
  mapPin: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s7-6.6 7-12a7 7 0 10-14 0c0 5.4 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>`,
  phoneCall: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 3h3l2 5-2.5 1.5a11 11 0 005 5L14 12l5 2v3a2 2 0 01-2.2 2A17 17 0 013 5.2 2 2 0 015 3z"/></svg>`,
  wheelchair: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="17" cy="18" r="3.5"/><circle cx="8" cy="5" r="1.6" fill="currentColor" stroke="none"/><path d="M8 8v5l3 2 3 6M8 13h6l3-6"/></svg>`,
  plane: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 3L3 10.5l7 2.5m0 0l2.5 7L21 3M10 13l6.5-6.5"/></svg>`,
  medical: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>`,
  van: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 16V8a2 2 0 012-2h8l4 4h2a2 2 0 012 2v4"/><path d="M3 16h18"/><circle cx="7.5" cy="18" r="1.8"/><circle cx="17.5" cy="18" r="1.8"/></svg>`,
  calendarCheck: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/><path d="M8.5 15l2 2 4-4"/></svg>`,
  whatsapp: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2zm5.8 14.2c-.2.6-1.3 1.2-1.9 1.3-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-3-1.3-5-4.3-5.1-4.5-.2-.2-1.2-1.6-1.2-3.1s.8-2.2 1.1-2.5c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5.2.5.7 1.8.8 1.9.1.2.1.3 0 .5-.1.2-.1.3-.3.5-.1.2-.3.4-.4.5-.2.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.5 1.5.3.1.5.1.6-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.2.1 1.5.7 1.8.8.3.1.5.2.5.3.1.2.1.7-.1 1.3z"/></svg>`,
};

function head({ title, description, canonicalPath, prefix, extraLd }) {
  return `<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${SITE.domain}/${canonicalPath}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:type" content="website">
<meta property="og:locale" content="nl_NL">
<link rel="icon" type="image/png" href="${prefix}img/logo-icoon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<!-- GTM: paste container snippet here -->
${extraLd || ''}
<style>
${CSS}
</style>
</head>`;
}

function nav(prefix) {
  const svcLinks = SERVICES.map(s => `<li><a href="/diensten/${s.slug}">${s.nav}</a></li>`).join('');
  const cityLinks = TOP_CITIES.map(slug => { const c = cityBySlug(slug); return `<li><a href="${cityPath(c)}">${c.name}</a></li>`; }).join('');
  return `<nav id="nav">
  <div class="wrap nav-inner">
    <a href="/" class="logo">${logoMark(prefix)}</a>
    <ul class="nav-links">
      <li class="has-dd"><a href="/diensten">Diensten <span class="caret">▾</span></a>
        <div class="dd"><ul>${svcLinks}<li class="dd-all"><a href="/diensten">Alle diensten</a></li></ul></div></li>
      <li class="has-dd"><a href="/locaties">Locaties <span class="caret">▾</span></a>
        <div class="dd dd-wide"><ul>${cityLinks}<li class="dd-all"><a href="/locaties">Alle ${CITIES.length} locaties</a></li></ul></div></li>
      <li><a href="/diensten/spoedvervoer-rolstoeltaxi" class="nav-spoed"><span class="nav-spoed-dot"></span>Spoed nu</a></li>
      <li><a href="/tarieven">Tarieven</a></li>
      <li><a href="/over-ons">Over ons</a></li>
      <li><a href="tel:${SITE.phoneTel}" class="btn btn-nav">Bel direct</a></li>
    </ul>
    <button class="hamburger" id="hamburger" aria-label="Menu openen" aria-expanded="false">☰</button>
  </div>
</nav>

<div class="mobile-menu" id="mobileMenu" role="dialog" aria-label="Navigatiemenu">
  <button class="mobile-close" id="mobileClose" aria-label="Menu sluiten">✕</button>
  <a href="/diensten">Diensten</a>
  <a href="/locaties">Locaties</a>
  <a href="/diensten/spoedvervoer-rolstoeltaxi" class="nav-spoed"><span class="nav-spoed-dot"></span>Spoed nu</a>
  <a href="/tarieven">Tarieven</a>
  <a href="/over-ons">Over ons</a>
  <a href="/contact">Contact</a>
  <a href="tel:${SITE.phoneTel}" class="btn">Bel direct</a>
</div>`;
}

function footer(prefix) {
  const serviceLinks = SERVICES.map(s => `<li><a href="/diensten/${s.slug}">${s.nav}</a></li>`).join('\n          ');
  const cityLinks = TOP_CITIES.map(slug => { const c = cityBySlug(slug); return `<li><a href="${cityPath(c)}">${c.name}</a></li>`; }).join('\n          ');
  return `<footer>
  <div class="wrap">
    <div class="foot-grid">
      <div>
        <div class="foot-logo-row">${logoMark(prefix)}</div>
        <p>De spoedtak van ${SITE.parentBrand}: rolstoelvervoer in Nederland, 24 uur per dag bereikbaar voor ritten die niet kunnen wachten.</p>
      </div>
      <div>
        <h4>Diensten</h4>
        <ul>
          ${serviceLinks}
        </ul>
      </div>
      <div>
        <h4>Locaties</h4>
        <ul class="foot-areas">
          ${cityLinks}
          <li><a href="/locaties"><b>Alle locaties</b></a></li>
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul>
          <li><a href="tel:${SITE.phoneTel}">${SITE.phoneDisplay}</a></li>
          <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
          <li>Onderdeel van ${SITE.parentBrand}</li>
          <li style="margin-top:10px"><a href="/over-ons">Over ons</a></li>
          <li><a href="/contact">Direct reserveren</a></li>
          <li><a href="/tarieven">Tarieven</a></li>
          <li><a href="/veelgestelde-vragen">Veelgestelde vragen</a></li>
          <li><a href="/privacyverklaring">Privacyverklaring</a></li>
        </ul>
      </div>
    </div>
    <div class="foot-bottom">
      <span>© 2026 ${SITE.name}</span>
    </div>
  </div>
</footer>`;
}

function stickyCta({ hideBook } = {}) {
  return `<div class="cta-dock" id="ctaDock">
  <a href="tel:${SITE.phoneTel}" class="dock-call" data-cta="dock">${ICONS.phoneCall}<span><small>Bel direct</small><b>${SITE.phoneDisplay}</b></span></a>
  <a href="https://wa.me/${SITE.whatsapp}" class="dock-wa" aria-label="WhatsApp ons">${ICONS.whatsapp}</a>
  ${hideBook ? '' : '<a href="/contact#formulier" class="dock-book">Reserveren</a>'}
</div>`;
}

function cookieBanner() {
  return `<div class="cookie-banner" id="cookieBanner" role="dialog" aria-label="Cookiemelding">
  <p>Deze website gebruikt alleen functionele cookies om goed te werken. Meer weten? Lees onze <a href="/privacyverklaring">privacyverklaring</a>.</p>
  <div class="cb-actions"><button type="button" class="btn btn-yellow" id="cookieAccept">Akkoord</button></div>
</div>
<script>
(function () {
  var KEY = 'rtsCookieOk';
  var banner = document.getElementById('cookieBanner');
  var btn = document.getElementById('cookieAccept');
  if (!banner || !btn) return;
  var seen = false;
  try { seen = !!localStorage.getItem(KEY); } catch (e) {}
  if (!seen) setTimeout(function () { banner.classList.add('show'); }, 800);
  btn.addEventListener('click', function () {
    banner.classList.remove('show');
    try { localStorage.setItem(KEY, '1'); } catch (e) {}
  });
})();
</script>`;
}

function scripts({ skipSticky, skipFaq, useScrollThreshold } = {}) {
  return `<script>
// nav scroll state
const nav = document.getElementById('nav');
addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', scrollY > 40);
}, {passive:true});

// mobile menu
const menu = document.getElementById('mobileMenu');
const burger = document.getElementById('hamburger');
const closeBtn = document.getElementById('mobileClose');
const toggleMenu = open => {
  menu.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
  menuOpen = open;
  if (typeof updateSticky === 'function') updateSticky();
};
burger.addEventListener('click', () => toggleMenu(true));
closeBtn.addEventListener('click', () => toggleMenu(false));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));
let menuOpen = false;
${skipFaq ? '' : `
// faq accordion
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  q.addEventListener('click', () => {
    const open = item.classList.toggle('open');
    q.setAttribute('aria-expanded', open);
    a.style.maxHeight = open ? a.scrollHeight + 'px' : '0';
  });
});`}
// scroll reveals
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ambient particles (dark sections)
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('canvas.particles').forEach(canvas => {
    const ctx = canvas.getContext('2d');
    const section = canvas.closest('section,header');
    let w, h, drops, running = false, raf;
    const DENSITY = 9000;
    function resize() {
      w = canvas.width = section.offsetWidth;
      h = canvas.height = section.offsetHeight;
      const count = Math.max(14, Math.min(46, Math.round((w * h) / DENSITY)));
      drops = Array.from({ length: count }, makeDrop);
    }
    function makeDrop(existing) {
      return {
        x: Math.random() * w,
        y: existing ? h + Math.random() * 40 : Math.random() * h,
        r: 1 + Math.random() * 2.2,
        speed: 0.25 + Math.random() * 0.55,
        drift: (Math.random() - 0.5) * 0.3,
        alpha: 0.12 + Math.random() * 0.22,
      };
    }
    function tick() {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#bcd4ff';
      for (const d of drops) {
        d.y -= d.speed;
        d.x += d.drift;
        if (d.y < -10) Object.assign(d, makeDrop(true), { y: h + 10 });
        ctx.globalAlpha = d.alpha;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (running) raf = requestAnimationFrame(tick);
    }
    function start() { if (running) return; running = true; raf = requestAnimationFrame(tick); }
    function stop() { running = false; if (raf) cancelAnimationFrame(raf); }
    resize();
    addEventListener('resize', resize, {passive:true});
    new IntersectionObserver(([e]) => { e.isIntersecting ? start() : stop(); }, {threshold:0}).observe(section);
  });
}
</script>`;
}

function page({ title, description, canonicalPath, prefix, extraLd, bodyHtml, skipSticky, skipFaq, stickyLabel, useScrollThreshold }) {
  return `<!DOCTYPE html>
<html lang="nl">
${head({ title, description, canonicalPath, prefix, extraLd })}
<body>

${nav(prefix)}

${bodyHtml}

${footer(prefix)}

${stickyCta({ hideBook: canonicalPath === 'contact' })}

${cookieBanner()}

${scripts({ skipSticky, skipFaq, useScrollThreshold })}
</body>
</html>
`;
}

/* ============================== SERVICE PAGE BODY ============================== */

function serviceLd(svc) {
  return `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "${svc.h1}",
  "provider": { "@type": "TaxiService", "name": "${SITE.name}", "telephone": "${SITE.phoneTel}" },
  "areaServed": "Nederland",
  "url": "${SITE.domain}/diensten/${svc.slug}"
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    ${svc.faqs.map(f => `{"@type":"Question","name":${JSON.stringify(f.q)},"acceptedAnswer":{"@type":"Answer","text":${JSON.stringify(f.a)}}}`).join(',\n    ')}
  ]
}
</script>
${breadcrumbLd([
  { label: 'Home', url: `${SITE.domain}/` },
  { label: 'Diensten', url: `${SITE.domain}/#diensten` },
  { label: svc.nav },
])}`;
}

function buildServiceBody(svc) {
  const p = '../';
  return `<!-- PAGE HERO -->
<header class="page-hero has-photo" style="background-image:url('/img/${svc.hero || svc.images[0].src}');background-position:${svc.heroPosition || 'center'}">
  <div class="wrap">
    <div class="hero-box reveal">
      ${breadcrumbNav([{ label: 'Home', href: `/` }, { label: 'Diensten', href: `/#diensten` }, { label: svc.nav }])}
      <span class="eyebrow">${svc.eyebrow}</span>
      <h1>${svc.h1}</h1>
      <p class="lead">${svc.lead}</p>
      <div class="hero-cta">
        <a href="tel:${SITE.phoneTel}" class="btn btn-yellow">Bel direct: ${SITE.phoneDisplay}</a>
        <a href="/contact" class="btn btn-ghost">Of plan online</a>
      </div>
    </div>
  </div>
</header>

<!-- OVER DEZE DIENST -->
<section class="band-2">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">Achtergrond</span>
      <h2>${svc.about.title}</h2>
    </div>
    <div class="about-info-grid">
      <div class="reveal reveal-d1">
        ${svc.about.paragraphs.map(par => `<p>${par}</p>`).join('\n        ')}
      </div>
      <div class="signals-card reveal reveal-d2">
        <h4>Herkent u dit?</h4>
        <ul class="signals-list">
          ${svc.about.signals.map(s => `<li>${s}</li>`).join('\n          ')}
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- UITGEBREID -->
<section>
  <div class="wrap">
    <div class="split" style="align-items:start;margin-top:0">
      <div class="long reveal">
        ${(svc.sections || []).map(sec => `<h2>${sec.title}</h2>${sec.paragraphs.map(par => `<p>${par}</p>`).join('')}`).join('')}
      </div>
      <div class="reveal reveal-d1" style="display:grid;gap:18px">
        ${svc.images.map(img => `<figure class="photo-card landscape"><img src="/img/${img.src}" alt="${img.alt}" width="1000" height="750" loading="lazy"></figure>`).join('')}
      </div>
    </div>
  </div>
</section>

${svc.instapSteps ? `<!-- INSTAPPROCEDURE -->
<section>
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">Veiligheid</span>
      <h2>Zo gaat het <span class="serif-i">instappen</span></h2>
      <p>Stap voor stap, altijd op dezelfde manier, zodat de rolstoel en de gordel goed vastzitten voordat we wegrijden.</p>
    </div>
    <div class="steps-stack">
      ${svc.instapSteps.map((s, i) => `<div class="step-row reveal reveal-d${i % 4}">
        <div class="big">0${i + 1}</div>
        <div><h3>${s}</h3></div>
      </div>`).join('\n      ')}
    </div>
    <p class="reveal" style="margin-top:28px;color:var(--ink-dim);font-size:14.5px">Binnenkort staat hier een korte instructievideo die dit laat zien.</p>
  </div>
</section>` : ''}

<!-- WAT U KRIJGT -->
<section class="band-2">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">Wat u krijgt</span>
      <h2>Duidelijk <span class="serif-i">geregeld</span></h2>
    </div>
    <div class="grid-4">
      ${svc.deliverables.map((d, i) => `<div class="card reveal reveal-d${i % 4}">
        <span class="num">0${i + 1}</span>
        <h3>${d.t}</h3>
        <p>${d.d}</p>
      </div>`).join('\n      ')}
    </div>
  </div>
</section>

<!-- PRIJS -->
<section style="padding:64px 0">
  <div class="wrap">
    <div class="price-box reveal">
      <div>
        <span class="eyebrow">Prijsindicatie</span>
        <h3>${svc.priceText}</h3>
      </div>
      <p>${svc.priceNote}</p>
    </div>
  </div>
</section>

<!-- WERKWIJZE -->
<section>
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">Werkwijze</span>
      <h2>Zo pakken we <span class="serif-i">het aan</span></h2>
    </div>
    <div class="steps">
      ${svc.steps.map((s, i) => `<div class="step reveal reveal-d${i}">
        <div class="big">${i + 1}.</div>
        <h3>${s.t}</h3>
        <p>${s.d}</p>
      </div>`).join('\n      ')}
    </div>
  </div>
</section>

<!-- BESCHIKBAAR IN -->
<section>
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">Locaties</span>
      <h2>${svc.nav} <span class="serif-i">in de buurt</span></h2>
      <p>We rijden in Nederland. Dit zijn de plaatsen waar we het vaakst komen.</p>
    </div>
    <div class="area-list reveal">
      ${TOP_CITIES.map(slug => { const c = cityBySlug(slug); return `<a href="${cityPath(c)}">${c.name}</a>`; }).join('\n      ')}
      <a href="/locaties"><b>Alle locaties</b></a>
    </div>
  </div>
</section>

<!-- GERELATEERDE DIENSTEN -->
<section class="band-2">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">Ook interessant</span>
      <h2>Gerelateerde <span class="serif-i">diensten</span></h2>
    </div>
    <div class="related-grid">
      ${svc.related.map(slug => {
        const rel = SERVICES.find(s => s.slug === slug);
        return `<a href="/diensten/${rel.slug}" class="related-card reveal">
        <span>${rel.nav}</span><span class="arrow">→</span>
      </a>`;
      }).join('\n      ')}
    </div>
  </div>
</section>

<!-- FAQ -->
<section id="faq">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">Veelgestelde vragen</span>
      <h2>Goed om te <span class="serif-i">weten</span></h2>
    </div>
    <div class="faq-list">
      ${svc.faqs.map(f => `<div class="faq-item reveal">
        <button class="faq-q" aria-expanded="false">${f.q}</button>
        <div class="faq-a"><p>${f.a}</p></div>
      </div>`).join('\n      ')}
    </div>
  </div>
</section>

<!-- CTA -->
<section id="contact" class="cta-final night">
  <canvas class="particles"></canvas>
  <div class="wrap">
    <span class="eyebrow reveal">Direct geholpen worden</span>
    <h2 class="reveal reveal-d1">${svc.h1}? <span class="serif-i">Bel gerust.</span></h2>
    <p class="reveal reveal-d2">Bel direct voor spoed, of plan online een rit voor later.</p>
    <div class="reveal reveal-d3">
      <a href="tel:${SITE.phoneTel}" class="btn">Bel ${SITE.phoneDisplay}</a>
    </div>
    <p class="cta-sub reveal reveal-d3">Of <a href="/contact" style="color:var(--accent)">plan online een rit</a> · ook per WhatsApp bereikbaar</p>
  </div>
</section>`;
}

/* ============================== LOCATION PAGES ============================== */

function cityLd(c) {
  const url = `${SITE.domain}${cityPath(c)}`;
  return `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TaxiService",
  "name": "${SITE.name}",
  "serviceType": ${JSON.stringify(c.isService ? c.name : `Rolstoeltaxi ${c.name}`)},
  "telephone": "${SITE.phoneTel}",
  "image": "${SITE.domain}/img/logo-icoon.png",
  "areaServed": ${c.isService ? '"Amsterdam"' : JSON.stringify({ '@type': 'City', name: c.name })},
  "url": "${url}",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  }
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    ${c.faqs.map(f => `{"@type":"Question","name":${JSON.stringify(f.q)},"acceptedAnswer":{"@type":"Answer","text":${JSON.stringify(f.a)}}}`).join(',\n    ')}
  ]
}
</script>
${breadcrumbLd([
  { label: 'Home', url: `${SITE.domain}/` },
  { label: 'Locaties', url: `${SITE.domain}/locaties` },
  { label: c.name },
])}`;
}

function buildCityBody(c) {
  const loc = c.in || `in ${c.name}`;
  const introHead = c.isService ? `${c.name}, <span class="serif-i">zo geregeld</span>`
    : c.distant ? `Ritten naar en vanuit <span class="serif-i">${c.name}</span>`
    : `Rolstoelvervoer <span class="serif-i">${loc}</span>`;
  const h1 = c.isService ? `${c.name} <span class="serif-i">met spoedservice</span>` : `Rolstoeltaxi ${c.name} <span class="serif-i">met spoedservice</span>`;
  const eyebrow = c.isService ? 'Ziekenhuisvervoer · Amsterdam' : `Rolstoeltaxi · ${c.name}`;
  const nearby = c.nearby.map(cityBySlug).filter(Boolean);
  const photoClass = c.portrait ? 'portrait' : 'landscape';
  const photo2 = c.photo2 || (c.region === 'Amsterdam en omgeving' ? { src: 'spoedrit-amsterdam-centraal.jpg', alt: 'Rolstoelbus met uitgeklapte laadklep in de stad' } : { src: 'rolstoelbus-zijkant.jpg', alt: 'Rolstoelbus, zijaanzicht, met ruime zijruiten' });
  return `<!-- PAGE HERO -->
<header class="page-hero has-photo" style="background-image:url('/img/${c.photo.src}');background-position:${c.photo.pos || 'center'}">
  <div class="wrap">
    <div class="hero-box reveal">
      ${breadcrumbNav([{ label: 'Home', href: '/' }, { label: 'Locaties', href: '/locaties' }, { label: c.name }])}
      <span class="eyebrow">${eyebrow}</span>
      <h1>${h1}</h1>
      <div class="proof"><span><b>24/7</b> bereikbaar</span><span><b>10+</b> jaar ervaring</span><span><b>5000+</b> ritten</span></div>
      <div class="hero-cta">
        <a href="tel:${SITE.phoneTel}" class="btn btn-yellow" data-cta="primary">Bel direct: ${SITE.phoneDisplay}</a>
        <a href="/contact" class="btn btn-ghost">Of plan online</a>
      </div>
      <p class="lead">${c.lead}</p>
    </div>
  </div>
</header>

<!-- INTRO -->
<section>
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">${c.isService ? 'Ziekenhuisvervoer' : 'Rolstoelvervoer'}</span>
      <h2>${introHead}</h2>
    </div>
    <div class="split">
      <div class="reveal">
        ${c.intro.map(par => `<p>${par}</p>`).join('\n        ')}
        <p><a href="/diensten/spoedvervoer-rolstoeltaxi" style="color:var(--accent);font-weight:700">Meer over spoedvervoer →</a></p>
      </div>
      <figure class="photo-card ${photoClass} reveal reveal-d1">
        <img src="/img/${c.photo.src}" alt="${c.photo.alt}" width="${c.portrait ? 900 : 1000}" height="${c.portrait ? 1200 : 750}" loading="lazy" style="object-position:${c.photo.pos || 'center'}">
      </figure>
    </div>
  </div>
</section>

<!-- PLEKKEN -->
<section class="band-2">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">${c.isService ? 'Waarmee wij helpen' : 'Plekken en wijken'}</span>
      <h2>${c.isService ? 'Van afspraak tot <span class="serif-i">ontslag</span>' : `Waar wij u ophalen en <span class="serif-i">afzetten</span>`}</h2>
    </div>
    <div class="grid-3">
      ${c.plekken.map((pl, i) => `<div class="spot reveal reveal-d${i % 3}"><h3>${pl.t}</h3><p>${pl.d}</p></div>`).join('\n      ')}
    </div>
  </div>
</section>

<!-- RITTEN -->
<section>
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">Veelgevraagde ritten</span>
      <h2>${c.isService ? 'Ritten die wij <span class="serif-i">vaak rijden</span>' : c.distant ? `Vanaf en naar <span class="serif-i">${c.name}</span>` : `Ritten <span class="serif-i">${loc}</span>`}</h2>
    </div>
    <ul class="trip-list">
      ${c.ritten.map((r, i) => `<li class="reveal reveal-d${i % 2}"><span class="ar">→</span><div><b>${r.t}</b><span>${r.d}</span></div></li>`).join('\n      ')}
    </ul>
  </div>
</section>

<!-- SPOED -->
<section class="spoed-band night band-line" style="position:relative;overflow:hidden">
  <canvas class="particles"></canvas>
  <div class="wrap" style="position:relative;z-index:1">
    <span class="eyebrow reveal">Spoed</span>
    <h2 class="reveal reveal-d1">Spoed ${c.isService ? 'ziekenhuisvervoer' : loc}? <span class="serif-i">Bel direct.</span></h2>
    <p class="reveal reveal-d2">${c.spoed}</p>
    <div class="reveal reveal-d3"><a href="tel:${SITE.phoneTel}" class="btn btn-yellow">Bel ${SITE.phoneDisplay}</a></div>
  </div>
</section>

<!-- BEREIKBAARHEID -->
<section>
  <div class="wrap">
    <div class="split">
      <figure class="photo-card landscape reveal">
        <img src="/img/${photo2.src}" alt="${photo2.alt}" width="1000" height="750" loading="lazy">
      </figure>
      <div class="reveal reveal-d1">
        <span class="eyebrow">Ophalen en bereikbaarheid</span>
        <h2 style="font-size:clamp(26px,3.4vw,38px);margin-bottom:18px">${c.isService ? 'Bij de juiste ingang' : `Zo werkt het ${loc}`}</h2>
        <p>${c.bereik}</p>
        <p>Onze bussen hebben een elektrische laadklep en vaste bevestigingspunten. Een begeleider of familielid rijdt gewoon mee.</p>
      </div>
    </div>
  </div>
</section>

<!-- DIENSTEN -->
<section class="band-2">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">Diensten</span>
      <h2>Onze diensten <span class="serif-i">${c.isService ? 'in Amsterdam' : loc}</span></h2>
      <p>Alle diensten van Rolstoeltaxi Spoed zijn ${c.isService ? 'in Amsterdam' : c.distant ? `voor ritten naar en vanuit ${c.name}` : loc} beschikbaar.</p>
    </div>
    <div class="grid-4">
      ${SERVICES.map((sv, i) => `<a href="/diensten/${sv.slug}" class="card reveal reveal-d${i % 4}"><h3>${sv.nav}</h3><p>${truncate(sv.lead, 80)}</p></a>`).join('\n      ')}
    </div>
  </div>
</section>

<!-- STAPPEN -->
<section>
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">Zo werkt het</span>
      <h2>In drie stappen <span class="serif-i">geregeld</span></h2>
    </div>
    <div class="steps">
      <div class="step reveal"><div class="big">1.</div><h3>Bel of app ons</h3><p>Vertel waar u wordt opgehaald, waar u naartoe moet en of er hulpmiddelen mee gaan.</p></div>
      <div class="step reveal reveal-d1"><div class="big">2.</div><h3>Wij plannen de bus in</h3><p>U hoort direct de aankomsttijd en de prijs, voordat we vertrekken.</p></div>
      <div class="step reveal reveal-d2"><div class="big">3.</div><h3>Veilig vervoerd</h3><p>De chauffeur helpt bij het in- en uitstappen en zet de rolstoel vast.</p></div>
    </div>
  </div>
</section>

<!-- FAQ -->
<section id="faq" class="band-2">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">Veelgestelde vragen</span>
      <h2>Vragen over ${c.isService ? 'ziekenhuisvervoer in Amsterdam' : `rolstoeltaxi <span class="serif-i">${c.name}</span>`}</h2>
    </div>
    <div class="faq-list">
      ${c.faqs.map(f => `<div class="faq-item reveal">
        <button class="faq-q" aria-expanded="false">${f.q}</button>
        <div class="faq-a"><p>${f.a}</p></div>
      </div>`).join('\n      ')}
    </div>
  </div>
</section>

<!-- IN DE BUURT -->
<section style="padding:64px 0">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">Ook actief in de buurt</span>
      <h2>Rolstoeltaxi <span class="serif-i">in de omgeving</span></h2>
    </div>
    <div class="area-list reveal">
      ${nearby.map(n => `<a href="${cityPath(n)}">${n.name}</a>`).join('\n      ')}
      <a href="/locaties"><b>Alle locaties</b></a>
    </div>
  </div>
</section>

<!-- CTA -->
<section id="contact" class="cta-final night">
  <canvas class="particles"></canvas>
  <div class="wrap">
    <span class="eyebrow reveal">Direct geholpen worden</span>
    <h2 class="reveal reveal-d1">${c.isService ? 'Ziekenhuisvervoer' : `Rolstoeltaxi ${c.name}`}? <span class="serif-i">Bel gerust.</span></h2>
    <p class="reveal reveal-d2">Bel direct voor spoed, of plan online een rit voor later. U hoort de prijs vooraf.</p>
    <div class="reveal reveal-d3">
      <a href="tel:${SITE.phoneTel}" class="btn btn-yellow">Bel ${SITE.phoneDisplay}</a>
    </div>
    <p class="cta-sub reveal reveal-d3">Of <a href="/contact" style="color:var(--accent-2)">plan online een rit</a> · ook per <a href="https://wa.me/${SITE.whatsapp}" style="color:var(--accent-2)">WhatsApp</a></p>
  </div>
</section>`;
}

/* ============================== HUB PAGES ============================== */

function buildDienstenHub() {
  return `<header class="page-hero has-photo" style="background-image:url('/img/rolstoelbus-torenhof.jpg');background-position:center 60%">
  <div class="wrap">
    <div class="hero-box reveal">
      ${breadcrumbNav([{ label: 'Home', href: '/' }, { label: 'Diensten' }])}
      <span class="eyebrow">Diensten</span>
      <h1>Alle diensten van <span class="serif-i">Rolstoeltaxi Spoed</span></h1>
      <div class="proof"><span><b>24/7</b> bereikbaar</span><span><b>10+</b> jaar ervaring</span><span><b>${SERVICES.length}</b> diensten</span></div>
      <div class="hero-cta">
        <a href="tel:${SITE.phoneTel}" class="btn btn-yellow" data-cta="primary">Bel direct: ${SITE.phoneDisplay}</a>
        <a href="/contact" class="btn btn-ghost">Of plan online</a>
      </div>
      <p class="lead">Van spoedvervoer tot uitvaartvervoer: één telefoonnummer, dezelfde bussen en dezelfde chauffeurs voor elke rit.</p>
    </div>
  </div>
</header>

<section>
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">Kies uw dienst</span>
      <h2>Rolstoelvervoer voor <span class="serif-i">elke gelegenheid</span></h2>
      <p>Alle ritten worden gereden met een rolstoelbus met elektrische laadklep en een ervaren chauffeur. Kies de dienst die het best bij uw rit past, of bel en wij denken mee.</p>
    </div>
    <div class="grid-4">
      ${SERVICES.map((s, i) => `<a href="/diensten/${s.slug}" class="card reveal reveal-d${i % 4}">
        <span class="icon-badge${s.icon === 'wheelchair' ? ' is-logo' : ''}">${s.icon === 'wheelchair' ? '<img src="/img/logo-icoon.png" alt="" width="26" height="17" aria-hidden="true">' : ICONS[s.icon]}</span>
        <h3>${s.h1}</h3>
        <p>${truncate(s.lead, 110)}</p>
      </a>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="band-2">
  <div class="wrap long reveal">
    <h2>Eén partij voor spoed en gepland vervoer</h2>
    <p>Rolstoeltaxi Spoed is de spoedtak van Rolstoeltaxi Holland. Dat betekent dat u voor elke situatie bij dezelfde partij terechtkunt: een spoedrit op het laatste moment, een vaste rit naar dagbesteding, een vlucht vanaf Schiphol of een afscheid dat u wilt bijwonen. De bus, de chauffeur en de manier van werken zijn steeds hetzelfde: rustig, zorgvuldig en met de prijs vooraf.</p>
    <p>Wilt u weten in welke plaatsen we rijden? Bekijk dan de <a href="/locaties" style="color:var(--accent)">overzichtspagina met alle locaties</a>, of lees eerst de <a href="/tarieven" style="color:var(--accent)">tarievenpagina</a> voor de opbouw van de prijs.</p>
  </div>
</section>

<section id="contact" class="cta-final night">
  <canvas class="particles"></canvas>
  <div class="wrap">
    <span class="eyebrow reveal">Direct geholpen worden</span>
    <h2 class="reveal reveal-d1">Niet zeker welke dienst? <span class="serif-i">Bel gerust.</span></h2>
    <p class="reveal reveal-d2">We denken graag met u mee en noemen de prijs vooraf.</p>
    <div class="reveal reveal-d3"><a href="tel:${SITE.phoneTel}" class="btn btn-yellow">Bel ${SITE.phoneDisplay}</a></div>
    <p class="cta-sub reveal reveal-d3">Of <a href="/contact" style="color:var(--accent-2)">plan online een rit</a></p>
  </div>
</section>`;
}

const REGION_ORDER = [
  ['Amsterdam en omgeving', 'Amsterdam, Schiphol en de plaatsen rondom de hoofdstad.'],
  ['Kennemerland en Noord-Holland', 'Van de kust bij Zandvoort tot Alkmaar en de Zaanstreek.'],
  ['Zuid-Holland en Utrecht', 'De grote steden in het westen en midden van het land.'],
  ['Rest van Nederland', 'Ritten naar en vanuit de rest van Nederland.'],
];

function buildLocatiesHub() {
  return `<header class="page-hero has-photo" style="background-image:url('/img/rolstoelbus-rai-amsterdam.jpg');background-position:center 45%">
  <div class="wrap">
    <div class="hero-box reveal">
      ${breadcrumbNav([{ label: 'Home', href: '/' }, { label: 'Locaties' }])}
      <span class="eyebrow">Locaties</span>
      <h1>Rolstoeltaxi in <span class="serif-i">${CITIES.length} locaties</span></h1>
      <div class="proof"><span><b>24/7</b> bereikbaar</span><span><b>10+</b> jaar ervaring</span><span><b>5000+</b> ritten</span></div>
      <div class="hero-cta">
        <a href="tel:${SITE.phoneTel}" class="btn btn-yellow" data-cta="primary">Bel direct: ${SITE.phoneDisplay}</a>
        <a href="/contact" class="btn btn-ghost">Of plan online</a>
      </div>
      <p class="lead">Kies uw plaats en zie waar we u ophalen, welke ritten we vaak rijden en hoe u spoed regelt. Staat uw plaats er niet bij? Bel gerust, we bespreken de mogelijkheden.</p>
    </div>
  </div>
</header>

<section style="padding-top:60px">
  <div class="wrap">
    ${REGION_ORDER.map(([region, blurb]) => `<div class="hub-group">
      <h2 class="reveal">${region}</h2>
      <p class="reveal">${blurb}</p>
      <div class="grid-4">
        ${CITIES.filter(c => c.region === region).map((c, i) => `<a href="${cityPath(c)}" class="card reveal reveal-d${i % 4}">
          <h3>${c.name}</h3>
          <p>${truncate(c.lead, 100)}</p>
        </a>`).join('\n        ')}
      </div>
    </div>`).join('\n    ')}
  </div>
</section>

<section id="contact" class="cta-final night">
  <canvas class="particles"></canvas>
  <div class="wrap">
    <span class="eyebrow reveal">Direct geholpen worden</span>
    <h2 class="reveal reveal-d1">Uw plaats niet gevonden? <span class="serif-i">Bel gerust.</span></h2>
    <p class="reveal reveal-d2">We rijden in Nederland en bespreken graag de mogelijkheden voor uw rit. Bekijk ook onze <a href="/diensten" style="color:var(--accent-2)">diensten</a>.</p>
    <div class="reveal reveal-d3"><a href="tel:${SITE.phoneTel}" class="btn btn-yellow">Bel ${SITE.phoneDisplay}</a></div>
    <p class="cta-sub reveal reveal-d3">Of <a href="/contact" style="color:var(--accent-2)">plan online een rit</a></p>
  </div>
</section>`;
}

/* ============================== HOME PAGE ============================== */

function homeLd() {
  return `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TaxiService",
  "name": "${SITE.name}",
  "description": "Spoedtak van ${SITE.parentBrand}: rolstoelvervoer in Nederland, 24 uur per dag bereikbaar voor spoedritten, ziekenhuisvervoer en luchthavenvervoer.",
  "url": "${SITE.domain}/",
  "telephone": "${SITE.phoneTel}",
  "email": "${SITE.email}",
  "image": "${SITE.domain}/img/logo-icoon.png",
  "areaServed": "Nederland",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  }
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type":"Question","name":"Wat is het verschil tussen Rolstoeltaxi Spoed en regulier rolstoelvervoer?","acceptedAnswer":{"@type":"Answer","text":"Rolstoeltaxi Spoed is gericht op ritten die niet vooraf gepland konden worden: een spoedopname, een last-minute afspraak of vervoer dat vandaag nog geregeld moet zijn. Voor vooraf geplande, terugkerende ritten kunt u ons ook gewoon bellen."}},
    {"@type":"Question","name":"Is Rolstoeltaxi Spoed hetzelfde bedrijf als Rolstoeltaxi Holland?","acceptedAnswer":{"@type":"Answer","text":"Rolstoeltaxi Spoed is de spoedtak van Rolstoeltaxi Holland: dezelfde ervaren chauffeurs en dezelfde rolstoelbussen, speciaal ingericht op snel schakelen."}},
    {"@type":"Question","name":"Rijden jullie ook 's nachts en in het weekend?","acceptedAnswer":{"@type":"Answer","text":"Ja, we zijn 24 uur per dag, 7 dagen per week bereikbaar voor spoedritten."}},
    {"@type":"Question","name":"In welke regio's rijdt Rolstoeltaxi Spoed?","acceptedAnswer":{"@type":"Answer","text":"We rijden in Nederland, met extra veel ritten in en rond Amsterdam, Rotterdam, Den Haag, Utrecht, Amersfoort en Hilversum."}}
  ]
}
</script>`;
}

function buildHomeBody() {
  return `<!-- HERO -->
<header class="hero night" style="background-image:url('/img/spoedrit-amsterdam-centraal.jpg');background-position:center 55%">
  <canvas class="particles"></canvas>
  <div class="wrap">
    <div class="hero-box reveal">
      <span class="live-badge"><span class="live-dot"></span>24/7 spoedlijn bereikbaar</span>
      <h1 class="reveal-d1" style="margin-top:16px">Spoed rolstoelvervoer? <span class="serif-i">Wij komen nu.</span></h1>
      <p class="lead reveal-d2">Eén telefoontje en er staat een rolstoelbus voor u klaar. Snel, veilig en rustig, in Nederland.</p>
      <div class="phone-badge reveal-d2">
        ${ICONS.phoneCall}
        <span><span class="lbl">Direct even bellen</span><a href="tel:${SITE.phoneTel}">${SITE.phoneDisplay}</a></span>
      </div>
      <div class="hero-cta reveal-d3">
        <a href="tel:${SITE.phoneTel}" class="btn btn-yellow">Bel direct: ${SITE.phoneDisplay}</a>
        <a href="/contact" class="btn btn-ghost">Of plan online</a>
      </div>
      <div class="trust reveal-d3">
        <span class="trust-item">${svgCheck()}<b>24/7</b> bereikbaar</span>
        <span class="trust-item">${svgCheck()}Actief <b>in Nederland</b></span>
        <span class="trust-item">${svgCheck()}Onderdeel van <b>${SITE.parentBrand}</b></span>
      </div>
    </div>
  </div>
</header>

<!-- STAT BAND -->
<section class="stat-band" style="padding:0">
  <div class="wrap" style="padding:0">
    <div class="stat-row reveal">
      <div class="stat-col"><div class="num">24/7</div><h3>Bereikbaar</h3><p>Ook 's nachts en in het weekend voor spoedritten.</p></div>
      <div class="stat-col"><div class="num">10+</div><h3>Jaar ervaring</h3><p>Via ${SITE.parentBrand}, specialist in rolstoelvervoer.</p></div>
      <div class="stat-col"><div class="num">5000+</div><h3>Uitgevoerde ritten</h3><p>Onder de vlag van ${SITE.parentBrand}.</p></div>
      <div class="stat-col"><div class="num">NL</div><h3>Actief in Nederland</h3><p>Ook ritten buiten de eigen regio.</p></div>
    </div>
  </div>
</section>

<!-- MARQUEE -->
<div class="marquee" aria-hidden="true">
  <div class="marquee-track">
    <span>Spoedvervoer</span><span>Ziekenhuisvervoer</span><span>Rolstoelvervoer</span><span>Luchthavenvervoer</span><span>Scootmobiel vervoer</span><span>Bel direct</span><span>24/7 bereikbaar</span>
    <span>Spoedvervoer</span><span>Ziekenhuisvervoer</span><span>Rolstoelvervoer</span><span>Luchthavenvervoer</span><span>Scootmobiel vervoer</span><span>Bel direct</span><span>24/7 bereikbaar</span>
  </div>
</div>

<!-- CALL BANNER -->
<section class="call-banner">
  <div class="wrap">
    <span class="lbl">${ICONS.phoneCall} Bel nu, direct een chauffeur inplannen:</span>
    <a href="tel:${SITE.phoneTel}" class="num">${SITE.phoneDisplay}</a>
  </div>
</section>

<!-- HOE STAPT U IN -->
<section class="instap-section">
  <div class="wrap">
    <div class="split" style="align-items:center">
      <div class="reveal">
        <span class="eyebrow">Veiligheid</span>
        <h2>Hoe stapt u <span class="serif-i">in?</span></h2>
        <p style="color:var(--ink-dim);margin:12px 0 18px;max-width:44ch">Altijd dezelfde stappen, rustig en op uw tempo, tot alles vastzit.</p>
        <ul class="mini-steps instap-steps">
          <li><span class="n">1.</span><div><b>Rolstoel de bus in rijden</b></div></li>
          <li><span class="n">2.</span><div><b>Rolstoel op de juiste positie plaatsen</b></div></li>
          <li><span class="n">3.</span><div><b>Vier spanbanden aan de rolstoel bevestigen</b></div></li>
          <li><span class="n">4.</span><div><b>Spanbanden aan de vloer vastmaken en aantrekken</b></div></li>
          <li><span class="n">5.</span><div><b>Veiligheidsgordel om de passagier</b></div></li>
          <li><span class="n">6.</span><div><b>Eindcontrole van rolstoel en gordel</b></div></li>
          <li><span class="n">7.</span><div><b>Klaar voor vertrek</b></div></li>
        </ul>
      </div>
      <div class="reveal reveal-d1 instap-photos">
        <figure class="photo-card landscape"><img src="/img/instapklep-schiphol.jpg" alt="Rolstoelbus met uitgeklapte laadklep, klaar om in te stappen" width="1000" height="750" loading="lazy"></figure>
        <figure class="photo-card landscape"><img src="/img/rolstoel-vastgezet-bus.jpg" alt="Rolstoel veilig vastgezet in de rolstoelbus" width="1000" height="750" loading="lazy"></figure>
      </div>
    </div>
  </div>
</section>

<!-- HERKENBAAR (pain points) -->
<section>
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">Herkenbaar?</span>
      <h2>U wilt gewoon dat er <span class="serif-i">nu</span> een bus komt</h2>
    </div>
    <div class="pain-list">
      <div class="pain-item reveal">
        <div class="pain-emoji">😰</div>
        <div><h3>Vandaag ontslagen, geen vervoer geregeld</h3><p>Het ziekenhuis belt dat u vandaag nog naar huis mag, maar de vaste vervoerder kan pas over drie dagen.</p></div>
      </div>
      <div class="pain-item reveal reveal-d1">
        <div class="pain-emoji">📞</div>
        <div><h3>De reguliere rolstoeltaxi zit vol</h3><p>U belt de vaste vervoerder, maar die kan niet op tijd komen. Ondertussen tikt de klok door.</p></div>
      </div>
      <div class="pain-item reveal reveal-d2">
        <div class="pain-emoji">✈️</div>
        <div><h3>Vlucht omgeboekt, vervoer moet mee schuiven</h3><p>Een gewijzigde vertrektijd betekent ook een ander tijdstip voor het vervoer naar de luchthaven.</p></div>
      </div>
      <div class="pain-item reveal reveal-d3">
        <div class="pain-emoji">🌙</div>
        <div><h3>Het gebeurt natuurlijk 's avonds of in het weekend</h3><p>Spoed houdt geen rekening met kantooruren. Wij ook niet.</p></div>
      </div>
    </div>
  </div>
</section>

<!-- STATEMENT BAND -->
<section class="statement night band-line">
  <div class="wrap">
    <p class="big reveal">De meeste vervoerders willen dat u minstens een dag vooruit plant. <span class="serif-i">Wij zijn er juist voor het moment dat dat niet kan.</span></p>
  </div>
</section>

<!-- DIENSTEN -->
<section id="diensten" class="band-2">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">Diensten</span>
      <h2>Rolstoelvervoer, <span class="serif-i">spoed en gepland</span></h2>
      <p>Van een acute ziekenhuisrit tot een vaste wekelijkse afspraak: Rolstoeltaxi Spoed regelt het, met dezelfde bussen en chauffeurs.</p>
    </div>
    <div class="grid-4">
      ${SERVICES.map((s, i) => `<a href="/diensten/${s.slug}" class="card reveal reveal-d${i}">
        <span class="icon-badge${s.icon === 'wheelchair' ? ' is-logo' : ''}">${s.icon === 'wheelchair' ? '<img src="/img/logo-icoon.png" alt="" width="26" height="17" aria-hidden="true">' : ICONS[s.icon]}</span>
        <h3>${s.h1}</h3>
        <p>${truncate(s.lead, 90)}</p>
      </a>`).join('\n      ')}
    </div>
  </div>
</section>

<!-- WAAROM WIJ -->
<section id="waarom-wij">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">Waarom wij</span>
      <h2>Waarom mensen voor <span class="serif-i">Rolstoeltaxi Spoed</span> kiezen</h2>
      <p>Mooie beloftes maakt iedereen. Dit is wat wij anders doen.</p>
    </div>
    <div class="icon-list">
      <div class="icon-list-item reveal">
        <span class="icon-badge-solid">${ICONS.phoneCall}</span>
        <div><h3>Direct telefonisch contact</h3><p>Geen keuzemenu of callcenter: u spreekt meteen iemand die de rit kan inplannen.</p></div>
      </div>
      <div class="icon-list-item reveal reveal-d1">
        <span class="icon-badge-solid">${ICONS.clock}</span>
        <div><h3>24/7 bereikbaar</h3><p>Spoed houdt geen rekening met kantooruren, en wij dus ook niet.</p></div>
      </div>
      <div class="icon-list-item reveal reveal-d2">
        <span class="icon-badge-solid">${ICONS.badge}</span>
        <div><h3>10+ jaar ervaring in rolstoelvervoer</h3><p>Via ${SITE.parentBrand} bouwen we voort op ruime ervaring in veilig zorgvervoer.</p></div>
      </div>
      <div class="icon-list-item reveal reveal-d3">
        <span class="icon-badge-solid">${ICONS.mapPin}</span>
        <div><h3>Actief in Nederland</h3><p>Van Amsterdam tot Rotterdam en daarbuiten: ook ritten buiten de eigen regio zijn mogelijk.</p></div>
      </div>
    </div>
  </div>
</section>

<!-- WERKWIJZE -->
<section id="werkwijze" class="band-2">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">Werkwijze</span>
      <h2>Van telefoontje tot rit, <span class="serif-i">in drie stappen</span></h2>
    </div>
    <div class="steps-stack">
      <div class="step-row reveal">
        <div class="big">01</div>
        <div><h3>Bel of app de spoedlijn</h3><p>Vertel kort de situatie, de locatie en waar u naartoe moet.</p></div>
      </div>
      <div class="step-row reveal reveal-d1">
        <div class="big">02</div>
        <div><h3>Wij plannen direct een bus in</h3><p>We zoeken de dichtstbijzijnde beschikbare rolstoelbus en noemen de prijs vooraf.</p></div>
      </div>
      <div class="step-row reveal reveal-d2">
        <div class="big">03</div>
        <div><h3>Veilig en rustig vervoerd</h3><p>De chauffeur helpt bij het in- en uitstappen en zet alles veilig vast.</p></div>
      </div>
    </div>
  </div>
</section>

<!-- ONZE BUSSEN -->
<section id="ritten" style="padding-top:0">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">Onderweg</span>
      <h2>Onze bussen <span class="serif-i">in actie</span></h2>
      <p>Echte ritten, echte plekken: van de Amsterdamse grachten tot een landgoed in de buurt.</p>
    </div>
    <div class="gallery">
      <figure class="photo-card tall reveal"><img src="/img/interieur-rolstoelbus.jpg" alt="Interieur van de rolstoelbus met rolstoelplaats en laadklep" width="960" height="1280" loading="lazy"></figure>
      <figure class="photo-card reveal reveal-d1"><img src="/img/amsterdam-molen-gooyer.jpg" alt="Rolstoelbus met geopende deuren bij een molen in Amsterdam" width="1280" height="960" loading="lazy"></figure>
      <figure class="photo-card reveal reveal-d2"><img src="/img/rolstoelbus-baksteen-laadklep.jpg" alt="Rolstoelbus met laadklep voor een gebouw van rode baksteen" width="1280" height="960" loading="lazy"></figure>
      <figure class="photo-card reveal reveal-d1"><img src="/img/rolstoelbus-laadklep-hoogbouw.jpg" alt="Rolstoelbus met uitgeklapte laadklep, hoogbouw op de achtergrond" width="1280" height="960" loading="lazy"></figure>
      <figure class="photo-card reveal reveal-d2"><img src="/img/rolstoelbus-landgoed-poort.jpg" alt="Rolstoelbus bij een landgoedpoort met rode baksteen" width="1280" height="960" loading="lazy"></figure>
    </div>
  </div>
</section>

<!-- WERKGEBIED -->
<section id="werkgebied" class="band-2">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">Werkgebied</span>
      <h2>Wij rijden <span class="serif-i">in Nederland</span></h2>
      <p>Met extra veel ritten in en rond de grote steden. Staat uw plaats er niet bij? Bel gerust, dan bespreken we de mogelijkheden.</p>
    </div>
    <div class="area-list reveal">
      ${CITIES.filter(c => !c.isService).map(c => `<a href="${cityPath(c)}">${c.name}</a>`).join('\n      ')}
      <a href="/locaties"><b>Alle locaties</b></a>
    </div>
  </div>
</section>

<!-- OVER ONS -->
<section id="over-ons">
  <div class="wrap">
    <div class="about-grid">
      <div class="about-photo reveal" style="background:none;padding:0">
        <img src="/img/rolstoelbus-zijkant.jpg" alt="Rolstoelbus van Rolstoeltaxi Spoed, zijaanzicht" width="1600" height="1200" loading="lazy" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0">
      </div>
      <div class="about-copy">
        <span class="eyebrow reveal">Wie zijn wij</span>
        <h2 class="reveal reveal-d1">De spoedtak van <span class="serif-i">${SITE.parentBrand}</span></h2>
        <p class="reveal reveal-d2">Rolstoeltaxi Spoed is opgezet door ${SITE.parentBrand}, specialist in rolstoelvervoer in Nederland. Dezelfde ervaren chauffeurs en dezelfde volledig uitgeruste rolstoelbussen, maar dan speciaal ingericht op ritten die niet konden wachten.</p>
        <p class="reveal reveal-d2">Van een acute ziekenhuisrit tot een omgeboekte vlucht: we schakelen snel, zonder in te leveren op veiligheid of comfort.</p>
        <ul class="usp-list reveal reveal-d3">
          <li><div><b>10+ jaar ervaring</b><span>Via ${SITE.parentBrand} in veilig en professioneel rolstoelvervoer.</span></div></li>
          <li><div><b>24/7 bereikbaar</b><span>Spoed houdt geen rekening met kantooruren.</span></div></li>
          <li><div><b>Actief in Nederland</b><span>Ook ritten buiten de eigen regio zijn mogelijk.</span></div></li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- EERLIJK VERHAAL -->
<section id="vertrouwen" class="band-2">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">Eerlijk verhaal</span>
      <h2>Nieuw als <span class="serif-i">spoedmerk</span>, niet nieuw in het vak</h2>
      <p>Rolstoeltaxi Spoed is een nieuwe naam. De ervaring erachter niet.</p>
    </div>
    <div class="review-grid">
      <div class="review reveal">
        <span class="icon">${ICONS.badge}</span>
        <h3>Onderdeel van ${SITE.parentBrand}</h3>
        <p>Dezelfde chauffeurs, dezelfde rolstoelbussen, dezelfde ervaring. Alleen sneller te bereiken bij spoed.</p>
      </div>
      <div class="review reveal reveal-d1">
        <span class="icon">${ICONS.checkCircle}</span>
        <h3>Prijs altijd vooraf genoemd</h3>
        <p>Ook bij een spoedrit hoort u de prijs aan de telefoon, voordat we onderweg zijn.</p>
      </div>
      <div class="review reveal reveal-d2">
        <span class="icon">${ICONS.mapPin}</span>
        <h3>Referentie op aanvraag</h3>
        <p>Liever eerst iemand van ${SITE.parentBrand} spreken die eerder geholpen is? Vraag er gerust naar.</p>
      </div>
    </div>
  </div>
</section>

<!-- FAQ -->
<section id="faq">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">Veelgestelde vragen</span>
      <h2>Goed om te <span class="serif-i">weten</span></h2>
    </div>
    <div class="faq-list">
      <div class="faq-item reveal">
        <button class="faq-q" aria-expanded="false">Wat is het verschil tussen Rolstoeltaxi Spoed en regulier rolstoelvervoer?</button>
        <div class="faq-a"><p>Rolstoeltaxi Spoed is gericht op ritten die niet vooraf gepland konden worden: een spoedopname, een last-minute afspraak of vervoer dat vandaag nog geregeld moet zijn. Voor vooraf geplande, terugkerende ritten kunt u ons ook gewoon bellen.</p></div>
      </div>
      <div class="faq-item reveal">
        <button class="faq-q" aria-expanded="false">Is Rolstoeltaxi Spoed hetzelfde bedrijf als Rolstoeltaxi Holland?</button>
        <div class="faq-a"><p>Rolstoeltaxi Spoed is de spoedtak van Rolstoeltaxi Holland: dezelfde ervaren chauffeurs en dezelfde rolstoelbussen, speciaal ingericht op snel schakelen.</p></div>
      </div>
      <div class="faq-item reveal">
        <button class="faq-q" aria-expanded="false">Rijden jullie ook 's nachts en in het weekend?</button>
        <div class="faq-a"><p>Ja, we zijn 24 uur per dag, 7 dagen per week bereikbaar voor spoedritten.</p></div>
      </div>
      <div class="faq-item reveal">
        <button class="faq-q" aria-expanded="false">In welke regio's rijdt Rolstoeltaxi Spoed?</button>
        <div class="faq-a"><p>We rijden in Nederland, met extra veel ritten in en rond Amsterdam, Rotterdam, Den Haag, Utrecht, Amersfoort en Hilversum. Bekijk ook onze <a href="/veelgestelde-vragen" style="color:var(--accent)">volledige FAQ-pagina</a>.</p></div>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section id="contact" class="cta-final night">
  <canvas class="particles"></canvas>
  <div class="wrap">
    <span class="eyebrow reveal">Direct geholpen worden</span>
    <h2 class="reveal reveal-d1">Spoedvervoer <span class="serif-i">nodig?</span></h2>
    <p class="reveal reveal-d2">Bel direct voor spoed, of plan online een rit voor later. U weet vooraf waar u aan toe bent.</p>
    <div class="reveal reveal-d3">
      <a href="tel:${SITE.phoneTel}" class="btn">Bel ${SITE.phoneDisplay}</a>
    </div>
    <p class="cta-sub reveal reveal-d3">Of <a href="/contact" style="color:var(--accent-2)">plan online een rit</a> · ook per <a href="https://wa.me/${SITE.whatsapp}" style="color:var(--accent-2)">WhatsApp</a></p>
  </div>
</section>`;
}

/* ============================== CONTACT / BOOKING PAGE ============================== */

function contactLd() {
  return `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TaxiService",
  "name": "${SITE.name}",
  "telephone": "${SITE.phoneTel}",
  "areaServed": "Nederland"
}
</script>`;
}

function buildContactBody() {
  return `<!-- PAGE HERO -->
<header class="page-hero" style="padding-bottom:40px">
  <div class="wrap">
    ${breadcrumbNav([{ label: 'Home', href: '/' }, { label: 'Contact' }])}
    <span class="eyebrow reveal">Direct reserveren</span>
    <h1 class="reveal reveal-d1">Plan uw <span class="serif-i">rit</span></h1>
    <p class="lead reveal reveal-d2">Bij spoed belt u ons liever direct. Voor een geplande rit vult u hieronder het formulier in, dan nemen we snel contact op om de rit en de prijs te bevestigen.</p>
    <div class="hero-cta reveal reveal-d3">
      <a href="tel:${SITE.phoneTel}" class="btn btn-yellow" data-cta="primary">Spoed? Bel ${SITE.phoneDisplay}</a>
    </div>
  </div>
</header>

<!-- BOOKING -->
<section class="booking" id="formulier">
  <div class="wrap">
    <div class="booking-grid">

      <!-- FORM -->
      <div class="form-card reveal">
        <form id="bookingForm" novalidate>
          <input type="checkbox" name="botcheck" class="honeypot" tabindex="-1" autocomplete="off" aria-hidden="true">

          <fieldset class="fs">
            <legend><span class="fs-n">1</span> Uw gegevens</legend>
            <div class="form-row">
              <div class="field">
                <label for="naam">Naam</label>
                <input type="text" id="naam" name="Naam" placeholder="Voor- en achternaam" required autocomplete="name">
              </div>
              <div class="field">
                <label for="telefoon">Telefoonnummer</label>
                <input type="tel" id="telefoon" name="Telefoon" placeholder="06 12345678" required autocomplete="tel" inputmode="tel">
              </div>
            </div>
            <div class="field">
              <label for="email">E-mailadres <span class="opt">(voor de bevestiging, optioneel)</span></label>
              <input type="email" id="email" name="E-mail" placeholder="naam@voorbeeld.nl" autocomplete="email">
            </div>
          </fieldset>

          <fieldset class="fs">
            <legend><span class="fs-n">2</span> De rit</legend>
            <div class="field">
              <label for="type">Soort rit</label>
              <select id="type" name="Soort rit" required>
                <option value="" disabled selected>Maak een keuze</option>
                <option>Spoedrit, zo snel mogelijk</option>
                ${SERVICES.map(s => `<option>${s.nav}</option>`).join('\n                ')}
                <option>Iets anders</option>
              </select>
            </div>
            <div class="form-row">
              <div class="field">
                <label for="ophaal">Ophaaladres</label>
                <input type="text" id="ophaal" name="Ophaaladres" placeholder="Straat, huisnummer, plaats" required autocomplete="street-address">
              </div>
              <div class="field">
                <label for="bestemming">Bestemming</label>
                <input type="text" id="bestemming" name="Bestemming" placeholder="Adres of instelling, plaats" required>
              </div>
            </div>

            <div class="field">
              <span class="lbl">Wanneer moet de rit plaatsvinden?</span>
              <div class="seg" role="radiogroup" aria-label="Wanneer">
                <label class="seg-opt"><input type="radio" name="Moment" value="Zo snel mogelijk (spoed)" checked><span><b>Zo snel mogelijk</b><small>Spoed, direct inplannen</small></span></label>
                <label class="seg-opt"><input type="radio" name="Moment" value="Op een afgesproken moment"><span><b>Op een afgesproken moment</b><small>Kies datum en tijd</small></span></label>
              </div>
            </div>
            <div class="form-row when" id="whenRow" hidden>
              <div class="field">
                <label for="datum">Datum</label>
                <input type="date" id="datum" name="Datum">
              </div>
              <div class="field">
                <label for="tijd">Ophaaltijd</label>
                <input type="time" id="tijd" name="Ophaaltijd">
              </div>
            </div>

            <label class="check"><input type="checkbox" id="terugrit" name="Terugrit gewenst" value="Ja"><span>Ik wil ook een <b>terugrit</b> inplannen</span></label>
            <div class="field" id="terugRow" hidden>
              <label for="terugtijd">Gewenste tijd terugrit <span class="opt">(bij benadering)</span></label>
              <input type="text" id="terugtijd" name="Tijd terugrit" placeholder="Bijv. 15:30, of na de afspraak">
            </div>
          </fieldset>

          <fieldset class="fs">
            <legend><span class="fs-n">3</span> Reiziger en hulpmiddel</legend>
            <div class="form-row">
              <div class="field">
                <label for="hulpmiddel">Hulpmiddel</label>
                <select id="hulpmiddel" name="Hulpmiddel" required>
                  <option value="" disabled selected>Maak een keuze</option>
                  <option>Handbewogen rolstoel</option>
                  <option>Elektrische rolstoel</option>
                  <option>Scootmobiel</option>
                  <option>Opvouwbare rolstoel</option>
                  <option>Geen, alleen een begeleider</option>
                  <option>Weet ik niet zeker</option>
                </select>
              </div>
              <div class="field">
                <label for="personen">Aantal reizigers</label>
                <select id="personen" name="Aantal reizigers">
                  <option>1</option><option>2</option><option>3</option><option>4</option><option>5 of meer</option>
                </select>
              </div>
            </div>
            <div class="field">
              <label for="bericht">Opmerking <span class="opt">(optioneel)</span></label>
              <textarea id="bericht" name="Opmerking" placeholder="Bijv. bagage, infuus of zuurstof, trap of drempel bij de deur, contactpersoon."></textarea>
            </div>
          </fieldset>

          <label class="check consent"><input type="checkbox" id="akkoord" required><span>Ik ga akkoord met de <a href="/privacyverklaring" target="_blank" rel="noopener">privacyverklaring</a>. Mijn gegevens worden alleen gebruikt om contact op te nemen over deze rit.</span></label>

          <button type="submit" class="btn btn-yellow btn-full" id="submitBtn">Aanvraag versturen</button>
          <p class="form-note">Bij spoed reageren we zo snel mogelijk. Heeft u haast? Bel liever direct: <a href="tel:${SITE.phoneTel}">${SITE.phoneDisplay}</a>.</p>
          <p class="form-error" id="formError" role="alert" hidden></p>
        </form>

        <div class="form-success" id="formSuccess" role="status" hidden>
          <div class="ok-badge">${svgCheck()}</div>
          <h3>Bedankt, uw aanvraag is <span class="serif-i">ontvangen</span></h3>
          <p>We nemen zo snel mogelijk contact met u op om de rit en de prijs te bevestigen. Heeft u haast, bel dan direct:</p>
          <p><a class="btn btn-yellow" href="tel:${SITE.phoneTel}">Bel ${SITE.phoneDisplay}</a></p>
          <p class="demo-note" id="demoNote" hidden>Demo-modus: er is nog geen e-mailadres gekoppeld aan dit formulier, dus deze aanvraag is niet echt verstuurd.</p>
        </div>
      </div>

      <!-- SIDEBAR -->
      <aside>
        <div class="aside-card reveal reveal-d1">
          <h3>Hoe het <span class="serif-i">werkt</span></h3>
          <ul class="mini-steps">
            <li><span class="n">1.</span><div><b>U vult het formulier in</b><span>Duurt nog geen twee minuten.</span></div></li>
            <li><span class="n">2.</span><div><b>Wij bevestigen de rit</b><span>Inclusief prijs, voordat u definitief boekt.</span></div></li>
            <li><span class="n">3.</span><div><b>Veilig vervoerd</b><span>De chauffeur staat op tijd klaar.</span></div></li>
          </ul>
        </div>
        <div class="aside-card reveal reveal-d2">
          <p class="aside-alt">Spoed? Bel liever direct:<br><a href="tel:${SITE.phoneTel}">${SITE.phoneDisplay}</a><br>24/7 bereikbaar in Nederland.</p>
        </div>
        <div class="aside-card reveal reveal-d3">
          <p class="aside-alt">Liever appen?<br><a href="https://wa.me/${SITE.whatsapp}">${ICONS.whatsapp} WhatsApp ons</a></p>
        </div>
        <div class="aside-card reveal reveal-d3">
          <p class="aside-alt">Eerst meer weten?<br><a href="/diensten">Bekijk onze diensten</a><br><a href="/locaties">Bekijk alle locaties</a></p>
        </div>
      </aside>

    </div>
  </div>
</section>

<script>
(function () {
  var KEY = ${JSON.stringify(SITE.web3formsKey || '')};
  var form = document.getElementById('bookingForm');
  if (!form) return;
  var whenRow = document.getElementById('whenRow');
  var datum = document.getElementById('datum');
  var tijd = document.getElementById('tijd');
  var terug = document.getElementById('terugrit');
  var terugRow = document.getElementById('terugRow');
  var btn = document.getElementById('submitBtn');
  var err = document.getElementById('formError');
  var today = new Date(); today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  datum.min = today.toISOString().slice(0, 10);

  function syncWhen() {
    var planned = form.querySelector('input[name="Moment"]:checked').value.indexOf('afgesproken') > -1;
    whenRow.hidden = !planned;
    datum.required = planned; tijd.required = planned;
    if (!planned) { datum.value = ''; tijd.value = ''; }
  }
  form.querySelectorAll('input[name="Moment"]').forEach(function (r) { r.addEventListener('change', syncWhen); });
  terug.addEventListener('change', function () { terugRow.hidden = !terug.checked; });
  syncWhen();

  var q = new URLSearchParams(location.search);
  if (q.get('rit') === 'spoed') document.getElementById('type').selectedIndex = 1;

  function showError(msg) { err.textContent = msg; err.hidden = false; }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    err.hidden = true;
    if (form.botcheck.checked) return;
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      form.reportValidity();
      return;
    }
    var data = {};
    new FormData(form).forEach(function (v, k) { if (k !== 'botcheck' && v !== '') data[k] = v; });
    var payload = Object.assign({
      access_key: KEY,
      subject: 'Nieuwe ritaanvraag: ' + (data['Soort rit'] || 'rit') + ' (' + (data['Moment'] || '') + ')',
      from_name: 'Rolstoeltaxi Spoed website'
    }, data);
    if (data['E-mail']) payload.replyto = data['E-mail'];
    btn.disabled = true; var label = btn.textContent; btn.textContent = 'Bezig met versturen...';

    function done(demo) {
      location.href = '/bedankt' + (demo ? '?demo=1' : '');
    }

    if (!KEY) {
      setTimeout(function () { console.info('Demo: aanvraag niet verstuurd', data); done(true); }, 700);
      return;
    }
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    }).then(function (r) { return r.json(); }).then(function (j) {
      if (j && j.success) done(false); else throw new Error((j && j.message) || 'fout');
    }).catch(function () {
      btn.disabled = false; btn.textContent = label;
      showError('Versturen is niet gelukt. Probeer het opnieuw of bel direct naar ${SITE.phoneDisplay}.');
    });
  });
})();
</script>`;
}

/* ============================== OVER ONS PAGE ============================== */

function buildOverOnsBody() {
  return `<!-- PAGE HERO -->
<header class="page-hero has-photo" style="background-image:url('img/rolstoelbus-voorkant.jpg')">
  <div class="wrap">
    <div class="hero-box reveal">
      ${breadcrumbNav([{ label: 'Home', href: '/' }, { label: 'Over ons' }])}
      <span class="eyebrow">Over ons</span>
      <h1>De spoedtak van <span class="serif-i">${SITE.parentBrand}</span></h1>
      <p class="lead">Dezelfde ervaring en dezelfde bussen als ${SITE.parentBrand}, speciaal ingericht op ritten die niet konden wachten.</p>
    </div>
  </div>
</header>

<section style="padding-top:20px">
  <div class="wrap">
    <div class="about-grid">
      <div class="about-photo reveal" style="background:none;padding:0">
        <img src="/img/rolstoelbus-zijkant.jpg" alt="Rolstoelbus van Rolstoeltaxi Spoed, zijaanzicht" width="1600" height="1200" loading="lazy" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0">
      </div>
      <div class="about-copy">
        <span class="eyebrow reveal">Het verhaal</span>
        <h2 class="reveal reveal-d1">Ontstaan uit een simpele <span class="serif-i">behoefte</span></h2>
        <p class="reveal reveal-d2">${SITE.parentBrand} vervoert al meer dan 10 jaar mensen in een rolstoel, in Nederland, van ziekenhuisritten tot dagbesteding en privéafspraken. Daarbij merkten we telkens dezelfde vraag: kan er ook vervoer komen als het echt niet meer een paar dagen kan wachten?</p>
        <p class="reveal reveal-d2">Rolstoeltaxi Spoed is het antwoord daarop: dezelfde chauffeurs, dezelfde volledig uitgeruste rolstoelbussen, maar dan georganiseerd rond snel schakelen in plaats van dagen vooruit plannen.</p>
        <ul class="usp-list reveal reveal-d3">
          <li><div><b>Ervaren chauffeurs</b><span>Getraind in zorgvervoer, rustig en respectvol.</span></div></li>
          <li><div><b>Eigen wagenpark</b><span>Rolstoelbussen met elektrische laadklep, geschikt voor rolstoel én scootmobiel.</span></div></li>
          <li><div><b>Direct bereikbaar</b><span>Bel en er wordt meteen een rit voor u ingepland.</span></div></li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="band-2">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">Werkgebied</span>
      <h2>Wij rijden <span class="serif-i">in Nederland</span></h2>
    </div>
    <div class="area-list reveal">
      ${TOP_CITIES.map(slug => { const c = cityBySlug(slug); return `<a href="${cityPath(c)}">${c.name}</a>`; }).join('\n      ')}
      <a href="/locaties"><b>Alle locaties</b></a>
    </div>
  </div>
</section>

<!-- CTA -->
<section id="contact" class="cta-final night">
  <canvas class="particles"></canvas>
  <div class="wrap">
    <span class="eyebrow reveal">Maak kennis</span>
    <h2 class="reveal reveal-d1">Even <span class="serif-i">bellen</span>?</h2>
    <p class="reveal reveal-d2">Bel direct voor spoed, of plan online een rit voor later.</p>
    <div class="reveal reveal-d3">
      <a href="tel:${SITE.phoneTel}" class="btn">Bel ${SITE.phoneDisplay}</a>
    </div>
    <p class="cta-sub reveal reveal-d3">Of <a href="/contact" style="color:var(--accent)">plan online een rit</a></p>
  </div>
</section>`;
}

/* ============================== TARIEVEN PAGE ============================== */

function buildTarievenBody() {
  return `<!-- PAGE HERO -->
<header class="page-hero" style="padding-bottom:40px">
  <div class="wrap">
    ${breadcrumbNav([{ label: 'Home', href: '/' }, { label: 'Tarieven' }])}
    <span class="eyebrow reveal">Transparant</span>
    <h1 class="reveal reveal-d1">Onze <span class="serif-i">tarieven</span></h1>
    <p class="lead reveal reveal-d2">Ook bij spoed geldt: u hoort de prijs altijd vooraf aan de telefoon. Geen verrassingen achteraf.</p>
  </div>
</header>

<section style="padding-top:0">
  <div class="wrap">
    <div class="grid-4">
      <div class="card reveal">
        <span class="icon-badge">${ICONS.mapPin}</span>
        <h3>Afstand &amp; tijdstip</h3>
        <p>De ritprijs is opgebouwd uit de afstand tot de bestemming en het tijdstip van de rit.</p>
      </div>
      <div class="card reveal reveal-d1">
        <span class="icon-badge">${ICONS.bolt}</span>
        <h3>Spoedtoeslag</h3>
        <p>Voor ritten die op zeer korte termijn worden ingepland geldt een toeslag ten opzichte van vooraf geplande ritten.</p>
      </div>
      <div class="card reveal reveal-d2">
        <span class="icon-badge">${ICONS.checkCircle}</span>
        <h3>Vooraf genoemd</h3>
        <p>U hoort de prijs aan de telefoon voordat we vertrekken, ook bij spoed.</p>
      </div>
      <div class="card reveal reveal-d3">
        <span class="icon-badge">${ICONS.calendarCheck}</span>
        <h3>Geplande ritten voordeliger</h3>
        <p>Weet u de datum al ruim van tevoren? Dan is dat vaak voordeliger dan een spoedrit.</p>
      </div>
    </div>
    <p class="reveal" style="margin-top:26px;color:var(--ink-dim);max-width:70ch">Een begeleider die meereist en de wachttijd tijdens een afspraak of plechtigheid brengen we niet in rekening: dat zit bij ons gratis bij de rit in.</p>
  </div>
</section>

<section class="band-2" style="padding:64px 0">
  <div class="wrap">
    <div class="price-box reveal">
      <div>
        <span class="eyebrow">Vraag naar een prijsopgave</span>
        <h3>Bel voor een exacte prijs op maat</h3>
      </div>
      <p>Elke rit is anders: afstand, tijdstip, en of het om spoed of een geplande rit gaat. Bel of app ons met de details, dan noemen we direct een reële prijs, voordat u boekt.</p>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">Vergoeding</span>
      <h2>Wordt de rit <span class="serif-i">vergoed</span>?</h2>
    </div>
    <div class="about-info-grid">
      <div class="reveal reveal-d1">
        <p>Sommige zorgverzekeraars, de gemeente (bijvoorbeeld via Wmo-vervoer) of een zorginstelling vergoeden geheel of gedeeltelijk rolstoelvervoer. Of en hoeveel dat is, verschilt per situatie en per verzekeraar.</p>
        <p>Neem voor de zekerheid vooraf contact op met uw zorgverzekeraar, gemeente of zorginstelling om na te vragen wat in uw geval vergoed wordt. Wij verstrekken desgevraagd een factuur die u zelf kunt indienen.</p>
      </div>
      <div class="signals-card reveal reveal-d2">
        <h4>Handig om na te vragen</h4>
        <ul class="signals-list">
          <li>Of rolstoelvervoer onder uw aanvullende zorgverzekering valt</li>
          <li>Of u in aanmerking komt voor Wmo-vervoer via de gemeente</li>
          <li>Of uw zorginstelling vervoer vergoedt of zelf regelt</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section id="contact" class="cta-final night">
  <canvas class="particles"></canvas>
  <div class="wrap">
    <span class="eyebrow reveal">Prijs op maat</span>
    <h2 class="reveal reveal-d1">Wat kost uw <span class="serif-i">rit</span>?</h2>
    <p class="reveal reveal-d2">Bel of app ons, dan hoort u direct een reële prijsindicatie.</p>
    <div class="reveal reveal-d3">
      <a href="tel:${SITE.phoneTel}" class="btn">Bel ${SITE.phoneDisplay}</a>
    </div>
    <p class="cta-sub reveal reveal-d3">Of <a href="/contact" style="color:var(--accent-2)">plan online een rit</a></p>
  </div>
</section>`;
}

/* ============================== FAQ PAGE ============================== */

const FAQS_FULL = [
  { q: 'Wat is het verschil tussen Rolstoeltaxi Spoed en regulier rolstoelvervoer?', a: 'Rolstoeltaxi Spoed is gericht op ritten die niet vooraf gepland konden worden: een spoedopname, een last-minute afspraak of vervoer dat vandaag nog geregeld moet zijn. Voor vooraf geplande, terugkerende ritten kunt u ons ook gewoon bellen, zie onze pagina over rolstoelvervoer.' },
  { q: 'Hoe snel kan een rolstoelbus bij mij zijn?', a: 'Dat hangt af van waar u zich bevindt en welke bus het dichtstbij beschikbaar is. Aan de telefoon geven we altijd een realistische inschatting van de aankomsttijd.' },
  { q: 'Is Rolstoeltaxi Spoed hetzelfde bedrijf als Rolstoeltaxi Holland?', a: 'Rolstoeltaxi Spoed is de spoedtak van Rolstoeltaxi Holland: dezelfde ervaren chauffeurs en dezelfde rolstoelbussen, speciaal ingericht op snel schakelen bij spoed.' },
  { q: 'Rijden jullie ook \'s nachts en in het weekend?', a: 'Ja, we zijn 24 uur per dag, 7 dagen per week bereikbaar voor spoedritten, ook \'s nachts en in het weekend.' },
  { q: 'Kan mijn begeleider mee in de bus?', a: 'Ja, een familielid of begeleider kan gewoon meerijden. Geef dit door bij het boeken, dan houden we daar rekening mee.' },
  { q: 'Betaal ik voor een begeleider of voor wachttijd?', a: 'Nee. Een begeleider die meereist en de wachttijd tijdens uw afspraak of plechtigheid brengen we niet in rekening.' },
  { q: 'Wat kost een spoedrit?', a: 'De prijs is afhankelijk van afstand en tijdstip, en bij spoed geldt een toeslag ten opzichte van vooraf geplande ritten. U hoort de prijs altijd vooraf aan de telefoon. Bekijk ook onze tarievenpagina.' },
  { q: 'Vergoedt mijn zorgverzekeraar of gemeente de rit?', a: 'Dat verschilt per situatie. Vraag dit vooraf na bij uw zorgverzekeraar, gemeente (Wmo-vervoer) of zorginstelling. Wij verstrekken desgevraagd een factuur die u zelf kunt indienen.' },
  { q: 'Kan er ook een scootmobiel mee in plaats van een rolstoel?', a: 'Ja, de elektrische laadklep is geschikt voor zowel een rolstoel als een scootmobiel.' },
  { q: 'In welke regio\'s rijdt Rolstoeltaxi Spoed?', a: 'We rijden in Nederland, met extra veel ritten in en rond Amsterdam, Rotterdam, Den Haag, Utrecht, Amersfoort en Hilversum. Staat uw plaats er niet bij? Bel gerust, we bespreken de mogelijkheden.' },
  { q: 'Hoe reserveer ik een rit?', a: 'Bij spoed belt of appt u ons het liefst direct. Voor een geplande rit kunt u ook het contactformulier invullen, dan nemen we snel contact op om de rit en de prijs te bevestigen.' },
];

function faqLd() {
  return `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    ${FAQS_FULL.map(f => `{"@type":"Question","name":${JSON.stringify(f.q)},"acceptedAnswer":{"@type":"Answer","text":${JSON.stringify(f.a)}}}`).join(',\n    ')}
  ]
}
</script>`;
}

function buildFaqBody() {
  return `<!-- PAGE HERO -->
<header class="page-hero" style="padding-bottom:20px">
  <div class="wrap">
    ${breadcrumbNav([{ label: 'Home', href: '/' }, { label: 'Veelgestelde vragen' }])}
    <span class="eyebrow reveal">Veelgestelde vragen</span>
    <h1 class="reveal reveal-d1">Alles wat u wilt <span class="serif-i">weten</span></h1>
    <p class="lead reveal reveal-d2">Staat uw vraag er niet bij? Bel of app ons gerust, we denken graag mee.</p>
  </div>
</header>

<section style="padding-top:0">
  <div class="wrap">
    <div class="faq-list" style="max-width:820px">
      ${FAQS_FULL.map(f => `<div class="faq-item reveal">
        <button class="faq-q" aria-expanded="false">${f.q}</button>
        <div class="faq-a"><p>${f.a}</p></div>
      </div>`).join('\n      ')}
    </div>
  </div>
</section>

<!-- CTA -->
<section id="contact" class="cta-final night">
  <canvas class="particles"></canvas>
  <div class="wrap">
    <span class="eyebrow reveal">Nog een vraag?</span>
    <h2 class="reveal reveal-d1">Bel gerust, <span class="serif-i">we denken mee</span></h2>
    <p class="reveal reveal-d2">Geen standaardantwoord nodig? Aan de telefoon kijken we naar uw specifieke situatie.</p>
    <div class="reveal reveal-d3">
      <a href="tel:${SITE.phoneTel}" class="btn">Bel ${SITE.phoneDisplay}</a>
    </div>
    <p class="cta-sub reveal reveal-d3">Of <a href="/contact" style="color:var(--accent-2)">plan online een rit</a></p>
  </div>
</section>`;
}

/* ============================== PRIVACY PAGE ============================== */

function buildPrivacyBody() {
  return `<!-- PAGE HERO -->
<header class="page-hero" style="padding-bottom:20px">
  <div class="wrap">
    ${breadcrumbNav([{ label: 'Home', href: '/' }, { label: 'Privacyverklaring' }])}
    <span class="eyebrow reveal">Juridisch</span>
    <h1 class="reveal reveal-d1">Privacy<span class="serif-i">verklaring</span></h1>
    <p class="lead reveal reveal-d2">Laatst bijgewerkt: 2026. ${SITE.name} gaat zorgvuldig om met uw persoonsgegevens.</p>
  </div>
</header>

<section style="padding-top:20px">
  <div class="wrap prose reveal">
    <h2>Wie zijn wij</h2>
    <p>${SITE.name}, onderdeel van ${SITE.parentBrand}, is verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven in deze privacyverklaring. Vragen? Neem contact op via <a href="mailto:${SITE.email}" style="color:var(--accent)">${SITE.email}</a>.</p>

    <h2>Welke gegevens verwerken wij</h2>
    <ul>
      <li>Naam, telefoonnummer en (indien opgegeven) e-mailadres</li>
      <li>Ophaal- en bestemmingsadres die nodig zijn om een rit in te plannen</li>
      <li>Berichten die u ons stuurt via het contactformulier, telefoon of WhatsApp</li>
    </ul>

    <h2>Waarom verwerken wij deze gegevens</h2>
    <p>Wij gebruiken uw gegevens uitsluitend om contact met u op te nemen over uw aanvraag, een rit in te plannen en de overeengekomen rit uit te voeren en te factureren. Wij verkopen uw gegevens nooit aan derden.</p>

    <h2>Bewaartermijn</h2>
    <p>Wij bewaren uw gegevens niet langer dan noodzakelijk voor de doelen waarvoor ze zijn verzameld, tenzij een langere bewaartermijn wettelijk verplicht is, bijvoorbeeld voor de fiscale bewaarplicht.</p>

    <h2>Delen met derden</h2>
    <p>Wij delen uw gegevens alleen met derden als dat nodig is voor de uitvoering van onze dienstverlening, zoals de partij die ons contactformulier technisch verwerkt, of wanneer dit wettelijk verplicht is.</p>

    <h2>Uw rechten</h2>
    <p>U heeft het recht om uw gegevens in te zien, te corrigeren of te laten verwijderen. Neem hiervoor contact op via <a href="mailto:${SITE.email}" style="color:var(--accent)">${SITE.email}</a>.</p>

    <h2>Vragen over uw rit?</h2>
    <p>Voor vragen over vervoer, tarieven of vergoeding kunt u terecht op onze <a href="/veelgestelde-vragen" style="color:var(--accent)">pagina met veelgestelde vragen</a> of via het <a href="/contact" style="color:var(--accent)">contactformulier</a>.</p>

    <h2>Cookies</h2>
    <p>Deze website gebruikt alleen technisch noodzakelijke functionaliteit. Zodra er analytische of marketingcookies worden toegevoegd, wordt deze verklaring aangevuld en vragen wij waar nodig om uw toestemming.</p>
  </div>
</section>`;
}

/* ============================== BEDANKT PAGE ============================== */

function buildBedanktBody() {
  return `<header class="page-hero" style="min-height:60vh;display:flex;align-items:center">
  <div class="wrap" style="text-align:center;max-width:640px">
    <span class="eyebrow reveal">Aanvraag ontvangen</span>
    <h1 class="reveal reveal-d1">Bedankt, <span class="serif-i">we nemen contact op</span></h1>
    <p class="lead reveal reveal-d2" style="margin-left:auto;margin-right:auto">We reageren zo snel mogelijk om de rit en de prijs te bevestigen. Heeft u haast? Bel gerust direct.</p>
    <div class="hero-cta reveal reveal-d3" style="justify-content:center">
      <a href="tel:${SITE.phoneTel}" class="btn">Bel ${SITE.phoneDisplay}</a>
      <a href="/" class="btn btn-ghost">Terug naar de homepage</a>
    </div>
    <p class="demo-note" id="demoNote" hidden style="max-width:52ch;margin:18px auto 0">Demo-modus: er is nog geen e-mailadres gekoppeld aan het formulier, dus deze aanvraag is niet echt verstuurd.</p>
    <script>if (location.search.indexOf('demo=1') > -1) document.getElementById('demoNote').hidden = false;</script>
    <p class="cta-sub reveal reveal-d3" style="margin-top:18px">Ondertussen: bekijk onze <a href="/diensten" style="color:var(--accent)">diensten</a> of de <a href="/locaties" style="color:var(--accent)">locaties</a> waar we rijden.</p>
  </div>
</header>`;
}

function withBrand(t) {
  const full = `${t} | ${SITE.name}`;
  return full.length <= 68 ? full : t;
}

/* ============================== WRITE FILES ============================== */

fs.mkdirSync(path.join(ROOT, 'diensten'), { recursive: true });

const homeHtml = page({
  title: 'Rolstoeltaxi Spoed | Rolstoelvervoer in Nederland, bel direct',
  description: 'Acuut rolstoelvervoer nodig in Nederland? Rolstoeltaxi Spoed rukt 24/7 uit met een volledig uitgeruste rolstoelbus. Niet mailen, gewoon direct bellen.',
  canonicalPath: '',
  prefix: '',
  extraLd: homeLd(),
  bodyHtml: buildHomeBody(),
});
fs.writeFileSync(path.join(ROOT, 'index.html'), homeHtml);

for (const svc of SERVICES) {
  const html = page({
    title: withBrand(svc.metaTitle),
    description: svc.metaDescription,
    canonicalPath: `diensten/${svc.slug}`,
    prefix: '../',
    extraLd: serviceLd(svc),
    bodyHtml: buildServiceBody(svc),
    useScrollThreshold: true,
  });
  fs.writeFileSync(path.join(ROOT, 'diensten', `${svc.slug}.html`), html);
}

// remove stale generated pages from earlier structures
for (const old of ['spoed-ziekenhuisvervoer', 'luchthavenvervoer-spoed']) {
  try { fs.unlinkSync(path.join(ROOT, 'diensten', `${old}.html`)); } catch (e) { /* not present */ }
}
for (const f of fs.readdirSync(ROOT)) {
  if (/^rolstoeltaxi-.*\.html$/.test(f)) fs.unlinkSync(path.join(ROOT, f));
}

for (const c of CITIES) {
  const file = c.path ? c.path.slice(1) : `rolstoeltaxi-${c.slug}`;
  const html = page({
    title: c.isService ? `${c.name}: rolstoelvervoer met spoedservice` : `Rolstoeltaxi ${c.name} in de buurt: spoedvervoer 24/7`,
    description: c.metaDescription,
    canonicalPath: file,
    prefix: '',
    extraLd: cityLd(c),
    bodyHtml: buildCityBody(c),
    useScrollThreshold: true,
  });
  fs.writeFileSync(path.join(ROOT, `${file}.html`), html);
}

fs.writeFileSync(path.join(ROOT, 'diensten.html'), page({
  title: 'Diensten: rolstoelvervoer en spoedvervoer | Rolstoeltaxi Spoed',
  description: 'Alle diensten van Rolstoeltaxi Spoed: spoedvervoer, rolstoelvervoer, ziekenhuisvervoer, Schipholvervoer, evenementvervoer en meer. 24/7 bereikbaar, bel direct.',
  canonicalPath: 'diensten',
  prefix: '',
  extraLd: breadcrumbLd([{ label: 'Home', url: `${SITE.domain}/` }, { label: 'Diensten' }]),
  bodyHtml: buildDienstenHub(),
  useScrollThreshold: true,
  skipFaq: true,
}));

fs.writeFileSync(path.join(ROOT, 'locaties.html'), page({
  title: `Locaties: rolstoeltaxi in ${CITIES.length} plaatsen | Rolstoeltaxi Spoed`,
  description: 'Rolstoeltaxi Spoed rijdt in Amsterdam, Schiphol, Haarlem, Leiden, Utrecht, Rotterdam en meer. Kies uw plaats en bel direct voor spoedvervoer met rolstoelbus.',
  canonicalPath: 'locaties',
  prefix: '',
  extraLd: breadcrumbLd([{ label: 'Home', url: `${SITE.domain}/` }, { label: 'Locaties' }]),
  bodyHtml: buildLocatiesHub(),
  useScrollThreshold: true,
  skipFaq: true,
}));

fs.writeFileSync(path.join(ROOT, 'contact.html'), page({
  title: 'Direct reserveren | Rolstoeltaxi Spoed',
  description: 'Plan online een rit met Rolstoeltaxi Spoed, of bel direct bij spoed. 24/7 bereikbaar in Nederland, met rolstoelbus, elektrische laadklep en prijs vooraf.',
  canonicalPath: 'contact',
  prefix: '',
  extraLd: contactLd(),
  bodyHtml: buildContactBody(),
  skipSticky: true,
  skipFaq: true,
}));

fs.writeFileSync(path.join(ROOT, 'over-ons.html'), page({
  title: 'Over ons | Rolstoeltaxi Spoed, spoedtak van Rolstoeltaxi Holland',
  description: 'Maak kennis met Rolstoeltaxi Spoed: de spoedtak van Rolstoeltaxi Holland. Dezelfde ervaren chauffeurs, ingericht op snel schakelen bij spoed.',
  canonicalPath: 'over-ons',
  prefix: '',
  extraLd: '',
  bodyHtml: buildOverOnsBody(),
  useScrollThreshold: true,
  skipFaq: true,
}));

fs.writeFileSync(path.join(ROOT, 'tarieven.html'), page({
  title: 'Tarieven | Rolstoeltaxi Spoed',
  description: 'Hoe is de prijs van een rit bij Rolstoeltaxi Spoed opgebouwd? Transparant en altijd vooraf genoemd, ook bij spoed. Bel voor een prijs op maat.',
  canonicalPath: 'tarieven',
  prefix: '',
  extraLd: '',
  bodyHtml: buildTarievenBody(),
  useScrollThreshold: true,
  skipFaq: true,
}));

fs.writeFileSync(path.join(ROOT, 'veelgestelde-vragen.html'), page({
  title: 'Veelgestelde vragen | Rolstoeltaxi Spoed',
  description: 'Antwoord op de meest gestelde vragen over spoedvervoer, tarieven, vergoeding en reserveren bij Rolstoeltaxi Spoed. Staat uw vraag er niet bij? Bel gerust.',
  canonicalPath: 'veelgestelde-vragen',
  prefix: '',
  extraLd: faqLd(),
  bodyHtml: buildFaqBody(),
  useScrollThreshold: true,
}));

fs.writeFileSync(path.join(ROOT, 'privacyverklaring.html'), page({
  title: 'Privacyverklaring | Rolstoeltaxi Spoed',
  description: 'Lees hoe Rolstoeltaxi Spoed omgaat met uw persoonsgegevens: welke gegevens we verwerken, waarom, hoe lang we ze bewaren en welke rechten u heeft.',
  canonicalPath: 'privacyverklaring',
  prefix: '',
  extraLd: '',
  bodyHtml: buildPrivacyBody(),
  skipFaq: true,
}));

fs.writeFileSync(path.join(ROOT, 'bedankt.html'), page({
  title: 'Bedankt voor uw aanvraag | Rolstoeltaxi Spoed',
  description: 'Uw aanvraag is ontvangen. Rolstoeltaxi Spoed neemt zo snel mogelijk contact met u op om de rit en de prijs te bevestigen. Heeft u haast? Bel gerust direct.',
  canonicalPath: 'bedankt',
  prefix: '',
  extraLd: '<meta name="robots" content="noindex, follow">',
  bodyHtml: buildBedanktBody(),
  skipSticky: true,
  skipFaq: true,
}));

/* ============================== SITEMAP & ROBOTS ============================== */

const staticPages = ['', 'diensten', 'locaties', 'over-ons', 'tarieven', 'contact', 'veelgestelde-vragen', 'privacyverklaring'];
const urls = [
  ...staticPages.map(p => `${SITE.domain}/${p}`),
  ...SERVICES.map(s => `${SITE.domain}/diensten/${s.slug}`),
  ...CITIES.map(c => `${SITE.domain}${cityPath(c)}`),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${u}</loc></url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap);

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE.domain}/sitemap.xml
`;
fs.writeFileSync(path.join(ROOT, 'robots.txt'), robots);

const totalPages = staticPages.length + SERVICES.length + CITIES.length + 1 /* bedankt */;
console.log(`Generated ${SERVICES.length} service pages and ${CITIES.length} location pages.`);
console.log(`Total HTML pages: ${totalPages} (${staticPages.length} vaste pagina's, ${SERVICES.length} diensten, 1 bedankt-pagina)`);
console.log(`sitemap.xml: ${urls.length} URLs (bedankt.html excluded on purpose)`);

module.exports = { SITE, SERVICES, page, head, nav, footer, stickyCta, scripts, svgCheck };
