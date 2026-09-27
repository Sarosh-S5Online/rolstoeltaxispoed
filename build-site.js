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
  email: 'info@rolstoeltaxispoed.nl',
};

const REGIOS = ['Amsterdam', 'Rotterdam', 'Den Haag', 'Utrecht', 'Amersfoort', 'Hilversum'];

const SERVICES = [
  {
    slug: 'spoedvervoer-rolstoeltaxi',
    icon: 'bolt',
    related: ['spoed-ziekenhuisvervoer', 'luchthavenvervoer-spoed'],
    nav: 'Spoedvervoer',
    h1: 'Rolstoeltaxi spoedvervoer',
    eyebrow: 'Spoed · In Nederland',
    metaTitle: 'Rolstoeltaxi spoedvervoer | Rolstoeltaxi Spoed — 24/7 direct beschikbaar',
    metaDescription: 'Acuut rolstoelvervoer nodig? Rolstoeltaxi Spoed rukt 24/7 uit met een volledig uitgeruste rolstoelbus en een chauffeur die direct kan helpen, in Nederland.',
    lead: 'Sommige ritten kunt u niet twee dagen van tevoren plannen. Rolstoeltaxi Spoed is de spoedtak van Rolstoeltaxi Holland: één telefoontje en er wordt direct een rolstoelbus voor u ingepland, waar in Nederland u ook bent.',
    about: {
      title: 'Wanneer heeft u spoedvervoer nodig?',
      paragraphs: [
        'Een spoedopname, een onverwacht ontslag uit het ziekenhuis, een afspraak die opeens naar vandaag is verplaatst, of simpelweg een reguliere vervoerder die niet kan komen: er zijn genoeg situaties waarin rolstoelvervoer ineens niet meer "volgende week" is, maar "nu".',
        'Rolstoeltaxi Spoed is opgezet voor precies dat moment. Dezelfde ervaren chauffeurs en dezelfde volledig uitgeruste rolstoelbussen als Rolstoeltaxi Holland, maar dan ingericht op snel schakelen in plaats van dagen vooruit plannen.',
      ],
      signals: [
        'U heeft vervoer nodig binnen enkele uren, niet volgende week',
        'De vaste vervoerder kan niet op tijd komen',
        'Een ziekenhuis, revalidatiecentrum of zorginstelling vraagt om snel vertrek',
      ],
    },
    deliverables: [
      { t: 'Direct een bus onderweg', d: 'Na uw telefoontje plannen we meteen de dichtstbijzijnde beschikbare rolstoelbus in.' },
      { t: 'Volledig uitgeruste rolstoelbus', d: 'Elektrische laadklep, vaste bevestigingspunten en ruimte voor rolstoel én begeleider.' },
      { t: 'Chauffeur met zorgervaring', d: 'Rustige, professionele hulp bij in- en uitstappen, ook onder tijdsdruk.' },
      { t: 'Actief in Nederland', d: 'Ook ritten buiten de eigen regio zijn mogelijk.' },
    ],
    priceText: 'Spoedtarief, altijd genoemd voordat u boekt',
    priceNote: 'Bij spoed geldt een toeslag ten opzichte van vooraf geplande ritten. U hoort de prijs aan de telefoon, voordat we vertrekken. Zie ook onze pagina over tarieven.',
    steps: [
      { t: 'Bel de spoedlijn', d: 'U belt of appt, wij vragen kort naar de situatie en de locatie.' },
      { t: 'Bus wordt direct ingepland', d: 'We zoeken de dichtstbijzijnde beschikbare rolstoelbus en geven een reële aankomsttijd door.' },
      { t: 'Veilig en rustig vervoerd', d: 'De chauffeur helpt bij het in- en uitstappen en zet de rolstoel veilig vast.' },
    ],
    images: [
      { src: 'spoedrit-amsterdam-centraal.jpg', alt: 'Rolstoelbus met uitgeklapte laadklep bij Amsterdam Centraal' },
      { src: 'instappen-rolstoelbus.jpg', alt: 'Rolstoelbus met geopende achterdeuren, klaar voor instappen' },
    ],
    faqs: [
      { q: 'Hoe snel kan een rolstoelbus bij mij zijn?', a: 'Dat hangt af van waar u zich bevindt en welke bus het dichtstbij beschikbaar is. Aan de telefoon geven we altijd een realistische inschatting, zodat u weet waar u aan toe bent.' },
      { q: 'Kan ik ook \'s nachts of in het weekend bellen?', a: 'Ja, Rolstoeltaxi Spoed is 24 uur per dag, 7 dagen per week bereikbaar voor spoedritten.' },
    ],
  },
  {
    slug: 'spoed-ziekenhuisvervoer',
    icon: 'medical',
    related: ['spoedvervoer-rolstoeltaxi', 'rolstoelvervoer'],
    nav: 'Ziekenhuisvervoer',
    h1: 'Spoed ziekenhuisvervoer',
    eyebrow: 'Spoed · Ziekenhuis & zorginstelling',
    metaTitle: 'Spoed ziekenhuisvervoer rolstoel | Rolstoeltaxi Spoed',
    metaDescription: 'Onverwacht vervoer nodig van of naar het ziekenhuis? Rolstoeltaxi Spoed haalt u snel en veilig op, met een rolstoelbus en chauffeur die weten wat zorgvervoer vraagt.',
    lead: 'Een spoedopname, een vervroegd ontslag of een afspraak die net is omgezet: bij ziekenhuisvervoer telt elke minuut. Rolstoeltaxi Spoed haalt u op waar u bent en brengt u rustig en veilig naar waar u moet zijn.',
    about: {
      title: 'Vervoer rond het ziekenhuis, ook als het snel moet',
      paragraphs: [
        'Ziekenhuizen werken niet altijd volgens planning. Een bed dat vrijkomt, een onderzoek dat naar voren is gehaald, of een ontslag waarbij "vandaag nog" wordt gevraagd: het regulier vervoer is dan vaak al vol geboekt.',
        'Onze chauffeurs kennen de gang van zaken rond op- en afhalen bij ziekenhuizen en zorginstellingen, en houden rekening met infuuspalen, zuurstof of andere hulpmiddelen die mee moeten.',
      ],
      signals: [
        'U wordt vandaag nog ontslagen en er is nog geen vervoer geregeld',
        'Een onderzoek of behandeling is naar een ander tijdstip verplaatst',
        'De vaste vervoerder van de instelling zit vol',
      ],
    },
    deliverables: [
      { t: 'Ophalen bij de ingang', d: 'We komen tot bij de hoofdingang of een afgesproken punt, ook bij drukte.' },
      { t: 'Ruimte voor hulpmiddelen', d: 'Plek voor infuuspaal, zuurstof of andere benodigdheden, in overleg vooraf.' },
      { t: 'Rustige overdracht', d: 'Geen haastwerk: de chauffeur neemt de tijd voor een veilige overstap.' },
      { t: 'Eén aanspreekpunt', d: 'Familie of verpleging kan rechtstreeks met ons bellen over de planning.' },
    ],
    priceText: 'Spoedtarief, altijd genoemd voordat u boekt',
    priceNote: 'Ook bij ziekenhuisvervoer geldt: u hoort de prijs vooraf aan de telefoon. Bekijk onze tarievenpagina voor de opbouw van de prijs.',
    steps: [
      { t: 'Bel met de situatie', d: 'Vertel kort waar u wordt opgehaald en waar naartoe, en of er hulpmiddelen mee moeten.' },
      { t: 'Wij stemmen af met de afdeling', d: 'Indien nodig nemen we contact op met de verpleging over het beste ophaalmoment.' },
      { t: 'Veilig vervoerd', d: 'De chauffeur begeleidt u van deur tot deur, rustig en met aandacht.' },
    ],
    images: [
      { src: 'rolstoelbus-torenhof.jpg', alt: 'Rolstoelbus met laadklep bij de ingang van een zorginstelling' },
      { src: 'rolstoelbus-zorginstelling.jpg', alt: 'Rolstoelbus geparkeerd bij een zorgcentrum' },
    ],
    faqs: [
      { q: 'Nemen jullie contact op met de afdeling of verpleging?', a: 'Als dat nodig is wel. Geef dit gerust door aan de telefoon, dan stemmen we het ophaalmoment af met de zorgverlener.' },
      { q: 'Kan een infuuspaal of zuurstoffles mee?', a: 'In veel gevallen wel. Meld dit vooraf even, dan houden we daar rekening mee in de bus.' },
    ],
  },
  {
    slug: 'rolstoelvervoer',
    icon: 'wheelchair',
    related: ['spoedvervoer-rolstoeltaxi', 'luchthavenvervoer-spoed'],
    nav: 'Rolstoelvervoer',
    h1: 'Rolstoelvervoer, ook gepland',
    eyebrow: 'Rolstoelvervoer · In Nederland',
    metaTitle: 'Rolstoelvervoer (gepland) | Rolstoeltaxi Spoed',
    metaDescription: 'Niet elke rit is spoed. Rolstoeltaxi Spoed verzorgt ook vooraf geplande ritten voor dagbesteding, familiebezoek en afspraken, met dezelfde rolstoelbussen en chauffeurs.',
    lead: 'Niet elke rit is spoed, en dat hoeft ook niet. Rolstoeltaxi Spoed plant graag vooraf een vaste of eenmalige rit voor dagbesteding, familiebezoek of een afspraak, met dezelfde zorgvuldige aanpak als bij een spoedrit.',
    about: {
      title: 'Vaste ritten, net zo goed verzorgd',
      paragraphs: [
        'Regelmatig naar dagbesteding, een wekelijks familiebezoek of een terugkerende behandeling: veel rolstoelvervoer is prima vooraf te plannen. Wij denken dan graag mee over een vast schema, zodat u er niet telkens opnieuw over hoeft te bellen.',
        'Ook een scootmobiel kan mee: onze bussen zijn uitgerust met een elektrische laadklep die zowel een rolstoel als een scootmobiel veilig aan boord brengt.',
      ],
      signals: [
        'U weet de datum en tijd al ruim van tevoren',
        'Het gaat om een terugkerende rit, bijvoorbeeld wekelijks',
        'Er moet een scootmobiel mee in plaats van een rolstoel',
      ],
    },
    deliverables: [
      { t: 'Vaste ritten inplannen', d: 'Wekelijkse of terugkerende afspraken leggen we vast, zodat u er niet telkens naar hoeft te vragen.' },
      { t: 'Ook scootmobiel vervoer', d: 'De laadklep is geschikt voor zowel rolstoel als scootmobiel.' },
      { t: 'Begeleider kan mee', d: 'Een familielid of begeleider kan gewoon in de bus meerijden.' },
      { t: 'Deur-tot-deur service', d: 'We helpen van binnendeur tot binnendeur, niet alleen tot aan de stoep.' },
    ],
    priceText: 'Vaste ritprijs, afgesproken voordat u boekt',
    priceNote: 'Geplande ritten zijn voordeliger dan spoedritten, omdat we de planning ruim van tevoren kunnen inrichten. Bekijk de tarievenpagina voor de opbouw.',
    steps: [
      { t: 'Vertel uw wensen', d: 'Bel of app met de gewenste data, tijden en of het om een vaste rit gaat.' },
      { t: 'Wij plannen in', d: 'U ontvangt een bevestiging met tijdstip en prijs.' },
      { t: 'Op tijd opgehaald', d: 'De chauffeur staat klaar, met dezelfde zorg als bij een spoedrit.' },
    ],
    images: [
      { src: 'scootmobiel-laadklep.jpg', alt: 'Scootmobiel op de elektrische laadklep van de rolstoelbus' },
      { src: 'rolstoelbus-zijkant.jpg', alt: 'Rolstoelbus, zijaanzicht' },
    ],
    faqs: [
      { q: 'Kan ik een vaste wekelijkse rit afspreken?', a: 'Ja, dat plannen we graag in als terugkerende afspraak, zodat u er niet iedere keer opnieuw voor hoeft te bellen.' },
      { q: 'Kan er ook een scootmobiel mee?', a: 'Ja, de laadklep is geschikt voor scootmobielen. Geef dit door bij het boeken, dan houden we daar rekening mee.' },
    ],
  },
  {
    slug: 'luchthavenvervoer-spoed',
    icon: 'plane',
    related: ['spoedvervoer-rolstoeltaxi', 'rolstoelvervoer'],
    nav: 'Luchthavenvervoer',
    h1: 'Spoed luchthavenvervoer',
    eyebrow: 'Spoed · Schiphol & andere luchthavens',
    metaTitle: 'Spoed luchthavenvervoer rolstoel | Rolstoeltaxi Spoed',
    metaDescription: 'Vlucht omgeboekt of vervoer naar Schiphol op het laatste moment nodig? Rolstoeltaxi Spoed verzorgt rolstoelvervoer naar en van luchthavens, ook kort van tevoren.',
    lead: 'Een omgeboekte vlucht, een vroege ochtendvlucht of vervoer dat op het laatste moment alsnog geregeld moet worden: Rolstoeltaxi Spoed brengt en haalt u van Schiphol en andere luchthavens, ook als de tijd kort is.',
    about: {
      title: 'Vervoer naar de luchthaven, ook kort van tevoren',
      paragraphs: [
        'Vluchten veranderen weleens: een andere aankomsttijd, een omboeking, of een familielid dat toch met u mee wil naar de gate. Dan is er meestal geen tijd meer om dagen vooruit te plannen.',
        'We houden rekening met bagage, rolstoel of scootmobiel en ruime tijd voor de incheckprocedure, zodat u zonder stress bij de luchthaven aankomt of veilig weer thuis raakt.',
      ],
      signals: [
        'Uw vlucht is omgeboekt of vervroegd',
        'U heeft pas kort van tevoren vervoer kunnen regelen',
        'Er is bagage én een rolstoel of scootmobiel om te vervoeren',
      ],
    },
    deliverables: [
      { t: 'Op tijd voor het inchecken', d: 'We rekenen ruim de tijd voor verkeer en de afhandeling bij de luchthaven.' },
      { t: 'Plek voor bagage', d: 'Naast de rolstoel of scootmobiel is er ruimte voor koffers.' },
      { t: 'Ophalen bij aankomst', d: 'Ook voor de terugreis vanaf de luchthaven staan we klaar.' },
      { t: 'In Nederland', d: 'Vervoer van en naar Schiphol én andere Nederlandse luchthavens.' },
    ],
    priceText: 'Ritprijs op basis van afstand tot de luchthaven',
    priceNote: 'Bij spoedboekingen op het laatste moment geldt de spoedtoeslag. De prijs hoort u altijd vooraf aan de telefoon.',
    steps: [
      { t: 'Bel met vlucht en tijd', d: 'Geef door om welke vlucht het gaat en hoe laat u moet inchecken.' },
      { t: 'Wij plannen de rit terug', d: 'We rekenen terug vanaf de vereiste aankomsttijd bij de luchthaven.' },
      { t: 'Rustig naar de gate', d: 'De chauffeur helpt met bagage en begeleidt u tot aan de incheckbalie.' },
    ],
    images: [
      { src: 'luchthavenvervoer-bagage.jpg', alt: 'Rolstoelbus met laadklep bij een terminal, reizigers met bagage op de achtergrond' },
      { src: 'rolstoelbus-rai-amsterdam.jpg', alt: 'Rolstoelbus met uitgeklapte laadklep in Amsterdam' },
    ],
    faqs: [
      { q: 'Kunnen jullie ook heel vroeg in de ochtend rijden?', a: 'Ja, we zijn 24/7 bereikbaar, ook voor vroege ochtendvluchten of late aankomsten.' },
      { q: 'Rijden jullie alleen naar Schiphol?', a: 'Nee, we verzorgen vervoer naar en van luchthavens door Nederland.' },
    ],
  },
];

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
  return `<span class="logo-icon"><img src="${prefix || ''}img/logo-icoon.png" alt="" width="20" height="20"></span><span class="logo-text">Rolstoeltaxi<b>Spoed</b></span>`;
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
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23155fb0' stroke-width='2.4'%3E%3Ccircle cx='17' cy='18' r='3.5'/%3E%3Ccircle cx='8' cy='5' r='1.6' fill='%23155fb0' stroke='none'/%3E%3Cpath d='M8 8v5l3 2 3 6M8 13h6l3-6'/%3E%3C/svg%3E">
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
  return `<nav id="nav">
  <div class="wrap nav-inner">
    <a href="${prefix}index.html" class="logo">${logoMark(prefix)}</a>
    <ul class="nav-links">
      <li><a href="${prefix}index.html#diensten">Diensten</a></li>
      <li><a href="${prefix}diensten/spoedvervoer-rolstoeltaxi.html" class="nav-spoed"><span class="nav-spoed-dot"></span>Spoed nu</a></li>
      <li><a href="${prefix}tarieven.html">Tarieven</a></li>
      <li><a href="${prefix}over-ons.html">Over ons</a></li>
      <li><a href="${prefix}veelgestelde-vragen.html">FAQ</a></li>
      <li><a href="tel:${SITE.phoneTel}" class="btn btn-nav">Bel direct</a></li>
    </ul>
    <button class="hamburger" id="hamburger" aria-label="Menu openen" aria-expanded="false">☰</button>
  </div>
</nav>

<div class="mobile-menu" id="mobileMenu" role="dialog" aria-label="Navigatiemenu">
  <button class="mobile-close" id="mobileClose" aria-label="Menu sluiten">✕</button>
  <a href="${prefix}index.html#diensten">Diensten</a>
  <a href="${prefix}diensten/spoedvervoer-rolstoeltaxi.html" class="nav-spoed"><span class="nav-spoed-dot"></span>Spoed nu</a>
  <a href="${prefix}tarieven.html">Tarieven</a>
  <a href="${prefix}over-ons.html">Over ons</a>
  <a href="${prefix}veelgestelde-vragen.html">FAQ</a>
  <a href="tel:${SITE.phoneTel}" class="btn">Bel direct</a>
</div>`;
}

function footer(prefix) {
  const serviceLinks = SERVICES.map(s => `<li><a href="${prefix}diensten/${s.slug}.html">${s.nav}</a></li>`).join('\n          ');
  const regioLinks = REGIOS.map(r => `<li><a href="${prefix}contact.html#formulier">${r}</a></li>`).join('\n          ');
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
        <h4>Regio's</h4>
        <ul class="foot-areas">
          ${regioLinks}
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul>
          <li><a href="tel:${SITE.phoneTel}">${SITE.phoneDisplay}</a></li>
          <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
          <li>Onderdeel van ${SITE.parentBrand}</li>
          <li style="margin-top:10px"><a href="${prefix}over-ons.html">Over ons</a></li>
          <li><a href="${prefix}contact.html">Direct reserveren</a></li>
          <li><a href="${prefix}privacyverklaring.html">Privacyverklaring</a></li>
        </ul>
      </div>
    </div>
    <div class="foot-bottom">
      <span>© 2026 ${SITE.name}</span>
      <span>Website door <a href="https://s5onlinemarketing.com" style="color:var(--accent)">S5Online Marketing</a></span>
    </div>
  </div>
</footer>`;
}

function stickyCta(label) {
  return `<div class="sticky-cta" id="stickyCta" aria-hidden="true">
  <a href="tel:${SITE.phoneTel}" class="btn">${label || `Bel direct: ${SITE.phoneDisplay}`}</a>
</div>`;
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
${skipSticky ? '' : useScrollThreshold ? `
// sticky mobile cta (subpage): show after 600px scroll, hide near final CTA
const stickyCta = document.getElementById('stickyCta');
const ctaSection = document.getElementById('contact');
let nearEnd = false;
const updateSticky = () => {
  const show = scrollY > 300 && !nearEnd && !menuOpen;
  stickyCta.classList.toggle('show', show);
  stickyCta.setAttribute('aria-hidden', !show);
};
addEventListener('scroll', updateSticky, {passive:true});
if (ctaSection) new IntersectionObserver(([e]) => { nearEnd = e.isIntersecting; updateSticky(); }, {threshold:.1}).observe(ctaSection);
` : `
// sticky mobile cta (home): show once the hero is scrolled past
const stickyCta = document.getElementById('stickyCta');
const heroEl = document.querySelector('.hero');
const ctaSection = document.getElementById('contact');
let pastHero = false, nearEnd = false;
const updateSticky = () => {
  const show = pastHero && !nearEnd && !menuOpen;
  stickyCta.classList.toggle('show', show);
  stickyCta.setAttribute('aria-hidden', !show);
};
if (heroEl) new IntersectionObserver(([e]) => { pastHero = !e.isIntersecting; updateSticky(); }, {threshold:0}).observe(heroEl);
if (ctaSection) new IntersectionObserver(([e]) => { nearEnd = e.isIntersecting; updateSticky(); }, {threshold:.1}).observe(ctaSection);
`}
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

${skipSticky ? '' : stickyCta(stickyLabel)}

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
  "url": "${SITE.domain}/diensten/${svc.slug}.html"
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
  { label: 'Diensten', url: `${SITE.domain}/index.html#diensten` },
  { label: svc.nav },
])}`;
}

function buildServiceBody(svc) {
  const p = '../';
  return `<!-- PAGE HERO -->
<header class="page-hero has-photo" style="background-image:url('${p}img/${svc.images[0].src}')">
  <div class="wrap">
    <div class="hero-box reveal">
      ${breadcrumbNav([{ label: 'Home', href: `${p}index.html` }, { label: 'Diensten', href: `${p}index.html#diensten` }, { label: svc.nav }])}
      <span class="eyebrow">${svc.eyebrow}</span>
      <h1>${svc.h1}</h1>
      <p class="lead">${svc.lead}</p>
      <div class="hero-cta">
        <a href="tel:${SITE.phoneTel}" class="btn btn-yellow">Bel direct: ${SITE.phoneDisplay}</a>
        <a href="${p}contact.html" class="btn btn-ghost">Of plan online</a>
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

<!-- WAT U KRIJGT -->
<section>
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
<section class="band-2" style="padding:64px 0">
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

<!-- FOTO'S -->
<section style="padding-top:0">
  <div class="wrap">
    <div class="projects" style="grid-template-columns:repeat(2,1fr)">
      ${svc.images.map(img => `<div class="project" style="pointer-events:none">
        <img class="ph-img" src="${p}img/${img.src}" alt="${img.alt}" loading="lazy" width="1000" height="667">
      </div>`).join('\n      ')}
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
        return `<a href="${p}diensten/${rel.slug}.html" class="related-card reveal">
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
    <p class="cta-sub reveal reveal-d3">Of <a href="${p}contact.html" style="color:var(--accent)">plan online een rit</a> · ook per WhatsApp bereikbaar</p>
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
  "areaServed": "Nederland"
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
<header class="hero night" style="background-image:url('img/spoedrit-amsterdam-centraal.jpg')">
  <canvas class="particles"></canvas>
  <div class="wrap">
    <div class="hero-box reveal">
      <span class="live-badge"><span class="live-dot"></span>24/7 spoedlijn bereikbaar</span>
      <h1 class="reveal-d1" style="margin-top:16px">Spoed rolstoelvervoer wacht niet. <span class="serif-i">Wij ook niet.</span></h1>
      <p class="lead reveal-d2">Rolstoeltaxi Spoed is de spoedtak van Rolstoeltaxi Holland: één telefoontje en er staat een volledig uitgeruste rolstoelbus voor u klaar, in Nederland. Voor spoed, ziekenhuisvervoer, luchthavenritten en gewoon geplande ritten.</p>
      <div class="phone-badge reveal-d2">
        ${ICONS.phoneCall}
        <span><span class="lbl">Direct even bellen</span><a href="tel:${SITE.phoneTel}">${SITE.phoneDisplay}</a></span>
      </div>
      <div class="hero-cta reveal-d3">
        <a href="tel:${SITE.phoneTel}" class="btn btn-yellow">Bel direct: ${SITE.phoneDisplay}</a>
        <a href="contact.html" class="btn btn-ghost">Of plan online</a>
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
      ${SERVICES.map((s, i) => `<a href="diensten/${s.slug}.html" class="card reveal reveal-d${i}">
        <span class="icon-badge">${ICONS[s.icon]}</span>
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

<!-- RECENTE RITTEN -->
<section id="ritten" style="padding-top:0">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">Onderweg</span>
      <h2>Onze bussen <span class="serif-i">in actie</span></h2>
    </div>
    <div class="projects">
      <a href="diensten/spoedvervoer-rolstoeltaxi.html" class="project p1 reveal">
        <img class="ph-img" src="img/spoedrit-amsterdam-centraal.jpg" alt="Rolstoelbus met laadklep bij Amsterdam Centraal" loading="lazy" width="1000" height="1250">
        <div class="project-info">
          <span class="tag">Spoedvervoer · Amsterdam</span>
          <h3>Laadklep uitgeklapt, klaar voor vertrek</h3>
        </div>
      </a>
      <a href="diensten/spoed-ziekenhuisvervoer.html" class="project p2 reveal reveal-d1">
        <img class="ph-img" src="img/rolstoelbus-torenhof.jpg" alt="Rolstoelbus bij een zorginstelling" loading="lazy" width="1000" height="667">
        <div class="project-info">
          <span class="tag">Ziekenhuis &amp; zorg · regio</span>
          <h3>Ophalen bij de ingang van de instelling</h3>
        </div>
      </a>
      <a href="diensten/luchthavenvervoer-spoed.html" class="project p3 reveal reveal-d2">
        <img class="ph-img" src="img/luchthavenvervoer-bagage.jpg" alt="Rolstoelbus bij een terminal met reizigers en bagage" loading="lazy" width="1000" height="667">
        <div class="project-info">
          <span class="tag">Luchthavenvervoer</span>
          <h3>Op tijd bij de terminal, met bagage</h3>
        </div>
      </a>
    </div>
  </div>
</section>

<!-- WERKGEBIED -->
<section id="werkgebied" class="band-2">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">Werkgebied</span>
      <h2>Wij rijden <span class="serif-i">in Nederland</span></h2>
      <p>Met extra veel ritten in en rond de grote steden. Staat uw plaats er niet bij? Bel gerust, we rijden landelijk.</p>
    </div>
    <div class="area-list reveal">
      ${REGIOS.map(r => `<a href="contact.html#formulier">${r}</a>`).join('\n      ')}
    </div>
  </div>
</section>

<!-- OVER ONS -->
<section id="over-ons">
  <div class="wrap">
    <div class="about-grid">
      <div class="about-photo reveal" style="background:none;padding:0">
        <img src="img/rolstoelbus-zijkant.jpg" alt="Rolstoelbus van Rolstoeltaxi Spoed" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0">
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
        <div class="faq-a"><p>We rijden in Nederland, met extra veel ritten in en rond Amsterdam, Rotterdam, Den Haag, Utrecht, Amersfoort en Hilversum. Bekijk ook onze <a href="veelgestelde-vragen.html" style="color:var(--accent)">volledige FAQ-pagina</a>.</p></div>
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
    <p class="cta-sub reveal reveal-d3">Of <a href="contact.html" style="color:var(--accent-2)">plan online een rit</a> · ook per <a href="https://wa.me/${SITE.whatsapp}" style="color:var(--accent-2)">WhatsApp</a></p>
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
    ${breadcrumbNav([{ label: 'Home', href: 'index.html' }, { label: 'Contact' }])}
    <span class="eyebrow reveal">Direct reserveren</span>
    <h1 class="reveal reveal-d1">Plan uw <span class="serif-i">rit</span></h1>
    <p class="lead reveal reveal-d2">Bij spoed belt u ons liever direct. Voor een geplande rit vult u hieronder het formulier in, dan nemen we snel contact op.</p>
  </div>
</header>

<!-- BOOKING -->
<section class="booking" id="formulier">
  <div class="wrap">
    <div class="booking-grid">

      <!-- FORM -->
      <div class="form-card reveal">
        <form id="bookingForm" action="https://api.web3forms.com/submit" method="POST">
          <input type="hidden" name="access_key" value="VUL-HIER-UW-WEB3FORMS-ACCESS-KEY-IN">
          <input type="hidden" name="subject" value="Nieuwe ritaanvraag via rolstoeltaxispoed.nl">
          <input type="hidden" name="redirect" value="https://rolstoeltaxispoed.nl/bedankt.html">
          <input type="checkbox" name="botcheck" class="honeypot" tabindex="-1" autocomplete="off">
          <div class="form-row">
            <div class="field">
              <label for="naam">Naam</label>
              <input type="text" id="naam" name="naam" placeholder="Uw naam" required autocomplete="name">
            </div>
            <div class="field">
              <label for="telefoon">Telefoonnummer</label>
              <input type="tel" id="telefoon" name="telefoon" placeholder="06 12345678" required autocomplete="tel">
            </div>
          </div>
          <div class="form-row">
            <div class="field">
              <label for="ophaal">Ophaaladres</label>
              <input type="text" id="ophaal" name="ophaal" placeholder="Straat, plaats" required autocomplete="address-level2">
            </div>
            <div class="field">
              <label for="bestemming">Bestemming</label>
              <input type="text" id="bestemming" name="bestemming" placeholder="Waar naartoe?" required>
            </div>
          </div>
          <div class="form-row">
            <div class="field">
              <label for="type">Soort rit</label>
              <select id="type" name="type" required>
                <option value="" disabled selected>Maak een keuze</option>
                <option>Spoed, zo snel mogelijk</option>
                ${SERVICES.map(s => `<option>${s.nav}</option>`).join('\n                ')}
                <option>Iets anders</option>
              </select>
            </div>
            <div class="field">
              <label for="email">E-mailadres <span class="opt">(optioneel)</span></label>
              <input type="email" id="email" name="email" placeholder="naam@voorbeeld.nl" autocomplete="email">
            </div>
          </div>
          <div class="field">
            <label for="bericht">Vertel kort wat er speelt <span class="opt">(optioneel)</span></label>
            <textarea id="bericht" name="bericht" placeholder="Bijv. rolstoel of scootmobiel, begeleider mee, gewenst tijdstip."></textarea>
          </div>
          <button type="submit" class="btn btn-full">Aanvraag versturen</button>
          <p class="form-note">Bij spoed reageren we zo snel mogelijk. Uw gegevens gebruiken we alleen om contact met u op te nemen, nooit voor iets anders.</p>
        </form>
      </div>

      <!-- SIDEBAR -->
      <aside>
        <div class="aside-card reveal reveal-d1">
          <h3>Hoe het <span class="serif-i">werkt</span></h3>
          <ul class="mini-steps">
            <li><span class="n">1.</span><div><b>U vult het formulier in</b><span>Duurt nog geen minuut.</span></div></li>
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
      </aside>

    </div>
  </div>
</section>`;
}

/* ============================== OVER ONS PAGE ============================== */

function buildOverOnsBody() {
  return `<!-- PAGE HERO -->
<header class="page-hero has-photo" style="background-image:url('img/rolstoelbus-voorkant.jpg')">
  <div class="wrap">
    <div class="hero-box reveal">
      ${breadcrumbNav([{ label: 'Home', href: 'index.html' }, { label: 'Over ons' }])}
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
        <img src="img/rolstoelbus-zijkant.jpg" alt="Rolstoelbus van Rolstoeltaxi Spoed" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0">
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
      ${REGIOS.map(r => `<a href="contact.html#formulier">${r}</a>`).join('\n      ')}
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
    <p class="cta-sub reveal reveal-d3">Of <a href="contact.html" style="color:var(--accent)">plan online een rit</a></p>
  </div>
</section>`;
}

/* ============================== TARIEVEN PAGE ============================== */

function buildTarievenBody() {
  return `<!-- PAGE HERO -->
<header class="page-hero" style="padding-bottom:40px">
  <div class="wrap">
    ${breadcrumbNav([{ label: 'Home', href: 'index.html' }, { label: 'Tarieven' }])}
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
    <p class="cta-sub reveal reveal-d3">Of <a href="contact.html" style="color:var(--accent-2)">plan online een rit</a></p>
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
    ${breadcrumbNav([{ label: 'Home', href: 'index.html' }, { label: 'Veelgestelde vragen' }])}
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
    <p class="cta-sub reveal reveal-d3">Of <a href="contact.html" style="color:var(--accent-2)">plan online een rit</a></p>
  </div>
</section>`;
}

/* ============================== PRIVACY PAGE ============================== */

function buildPrivacyBody() {
  return `<!-- PAGE HERO -->
<header class="page-hero" style="padding-bottom:20px">
  <div class="wrap">
    ${breadcrumbNav([{ label: 'Home', href: 'index.html' }, { label: 'Privacyverklaring' }])}
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
      <a href="index.html" class="btn btn-ghost">Terug naar de homepage</a>
    </div>
  </div>
</header>`;
}

/* ============================== WRITE FILES ============================== */

fs.mkdirSync(path.join(ROOT, 'diensten'), { recursive: true });

const homeHtml = page({
  title: 'Rolstoeltaxi Spoed | Rolstoelvervoer in Nederland — bel direct',
  description: 'Acuut rolstoelvervoer nodig in Nederland? Rolstoeltaxi Spoed rukt 24/7 uit met een volledig uitgeruste rolstoelbus. Niet mailen, gewoon direct bellen.',
  canonicalPath: '',
  prefix: '',
  extraLd: homeLd(),
  bodyHtml: buildHomeBody(),
});
fs.writeFileSync(path.join(ROOT, 'index.html'), homeHtml);

for (const svc of SERVICES) {
  const html = page({
    title: svc.metaTitle,
    description: svc.metaDescription,
    canonicalPath: `diensten/${svc.slug}.html`,
    prefix: '../',
    extraLd: serviceLd(svc),
    bodyHtml: buildServiceBody(svc),
    useScrollThreshold: true,
  });
  fs.writeFileSync(path.join(ROOT, 'diensten', `${svc.slug}.html`), html);
}

fs.writeFileSync(path.join(ROOT, 'contact.html'), page({
  title: 'Direct reserveren | Rolstoeltaxi Spoed',
  description: 'Plan online een rit met Rolstoeltaxi Spoed, of bel direct bij spoed. 24/7 bereikbaar in Nederland.',
  canonicalPath: 'contact.html',
  prefix: '',
  extraLd: contactLd(),
  bodyHtml: buildContactBody(),
  skipSticky: true,
  skipFaq: true,
}));

fs.writeFileSync(path.join(ROOT, 'over-ons.html'), page({
  title: 'Over ons | Rolstoeltaxi Spoed — spoedtak van Rolstoeltaxi Holland',
  description: 'Maak kennis met Rolstoeltaxi Spoed: de spoedtak van Rolstoeltaxi Holland. Dezelfde ervaren chauffeurs, ingericht op snel schakelen bij spoed.',
  canonicalPath: 'over-ons.html',
  prefix: '',
  extraLd: '',
  bodyHtml: buildOverOnsBody(),
  useScrollThreshold: true,
  skipFaq: true,
}));

fs.writeFileSync(path.join(ROOT, 'tarieven.html'), page({
  title: 'Tarieven | Rolstoeltaxi Spoed',
  description: 'Hoe is de prijs van een rit bij Rolstoeltaxi Spoed opgebouwd? Transparant en altijd vooraf genoemd, ook bij spoed.',
  canonicalPath: 'tarieven.html',
  prefix: '',
  extraLd: '',
  bodyHtml: buildTarievenBody(),
  useScrollThreshold: true,
  skipFaq: true,
}));

fs.writeFileSync(path.join(ROOT, 'veelgestelde-vragen.html'), page({
  title: 'Veelgestelde vragen | Rolstoeltaxi Spoed',
  description: 'Antwoord op de meest gestelde vragen over spoedvervoer, tarieven, vergoeding en reserveren bij Rolstoeltaxi Spoed.',
  canonicalPath: 'veelgestelde-vragen.html',
  prefix: '',
  extraLd: faqLd(),
  bodyHtml: buildFaqBody(),
  useScrollThreshold: true,
}));

fs.writeFileSync(path.join(ROOT, 'privacyverklaring.html'), page({
  title: 'Privacyverklaring | Rolstoeltaxi Spoed',
  description: 'Lees hoe Rolstoeltaxi Spoed omgaat met uw persoonsgegevens.',
  canonicalPath: 'privacyverklaring.html',
  prefix: '',
  extraLd: '',
  bodyHtml: buildPrivacyBody(),
  skipFaq: true,
}));

fs.writeFileSync(path.join(ROOT, 'bedankt.html'), page({
  title: 'Bedankt voor uw aanvraag | Rolstoeltaxi Spoed',
  description: 'Uw aanvraag is ontvangen. Rolstoeltaxi Spoed neemt zo snel mogelijk contact met u op.',
  canonicalPath: 'bedankt.html',
  prefix: '',
  extraLd: '',
  bodyHtml: buildBedanktBody(),
  skipSticky: true,
  skipFaq: true,
}));

/* ============================== SITEMAP & ROBOTS ============================== */

const staticPages = ['', 'over-ons.html', 'tarieven.html', 'contact.html', 'veelgestelde-vragen.html', 'privacyverklaring.html'];
const urls = [
  ...staticPages.map(p => `${SITE.domain}/${p}`),
  ...SERVICES.map(s => `${SITE.domain}/diensten/${s.slug}.html`),
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

const totalPages = staticPages.length + SERVICES.length + 1 /* bedankt */;
console.log(`Generated ${SERVICES.length} service pages.`);
console.log(`Total HTML pages: ${totalPages} (${staticPages.length} vaste pagina's, ${SERVICES.length} diensten, 1 bedankt-pagina)`);
console.log(`sitemap.xml: ${urls.length} URLs (bedankt.html excluded on purpose)`);

module.exports = { SITE, SERVICES, page, head, nav, footer, stickyCta, scripts, svgCheck };
