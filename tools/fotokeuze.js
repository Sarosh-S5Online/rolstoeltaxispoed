// Genereert _fotokeuze.html: alle foto's met de pagina's waar ze nu staan. Alleen lokaal (staat in .gitignore).
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const services = require(path.join(ROOT, 'content/services.js'));
const cities = [
  ...require(path.join(ROOT, 'content/cities-amsterdam.js')),
  ...require(path.join(ROOT, 'content/cities-noord.js')),
  ...require(path.join(ROOT, 'content/cities-zuid.js')),
  ...require(path.join(ROOT, 'content/cities-rest.js')),
];
const imgDir = path.join(ROOT, 'img');
const files = fs.readdirSync(imgDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f) && f !== 'logo-icoon.png').sort();

const usage = {};
const add = (f, label) => { (usage[f] = usage[f] || []).push(label); };
add('amsterdam-gracht-laadklep.jpg', 'Home (hero)');
add('amsterdam-molen-gooyer.jpg', 'Home (galerij)');
add('rolstoelbus-baksteen-laadklep.jpg', 'Home (galerij)');
add('rolstoelbus-laadklep-hoogbouw.jpg', 'Home (galerij)');
add('rolstoelbus-landgoed-poort.jpg', 'Home (galerij)');
add('interieur-rolstoelbus.jpg', 'Home (galerij)');
add('rolstoelbus-zijkant.jpg', 'Home (over ons)');
add('rolstoelbus-voorkant.jpg', 'Over ons (hero)');
add('amsterdam-gracht-laadklep.jpg', 'Diensten (hub hero)');
add('amsterdam-molen-gooyer.jpg', 'Locaties (hub hero)');
for (const s of services) {
  add(s.hero || s.images[0].src, `Dienst: ${s.nav} (hero)`);
  s.images.forEach(i => add(i.src, `Dienst: ${s.nav}`));
}
for (const c of cities) {
  add(c.photo.src, `Locatie: ${c.name} (hero + foto)`);
  if (c.photo2) add(c.photo2.src, `Locatie: ${c.name} (tweede foto)`);
  else add(c.region === 'Amsterdam en omgeving' ? 'spoedrit-amsterdam-centraal.jpg' : 'rolstoelbus-zijkant.jpg', `Locatie: ${c.name} (tweede foto)`);
}

const reserved = {
  'spoedpost-haarlem.jpg': 'Gereserveerd: Spaarne Gasthuis Haarlem (ziekenhuispagina, nu buiten scope)',
  'spoedpost-haarlem-2.jpg': 'Gereserveerd: Spaarne Gasthuis Haarlem (ziekenhuispagina, nu buiten scope)',
};
const notes = {
  'amsterdam-molen-gooyer.jpg': 'Klantfoto "Mooie 1" (640px, opgeschaald)',
  'amsterdam-gracht-laadklep.jpg': 'Klantfoto "Mooie 2" (640px, opgeschaald)',
  'interieur-rolstoelbus.jpg': 'Klantfoto "Mooie 3" (480px, opgeschaald)',
  'rolstoelbus-baksteen-laadklep.jpg': 'Klantfoto "Mooie 4" (640px, opgeschaald)',
  'rolstoelbus-landgoed-poort.jpg': 'Klantfoto "Mooie 5" (640px, opgeschaald)',
  'rolstoelbus-voorkant-baksteen.jpg': 'Klantfoto "Mooie 6" (480px, opgeschaald)',
  'rolstoelbus-laadklep-hoogbouw.jpg': 'Klantfoto "Mooie 7" (640px, opgeschaald)',
  'haarlem-grote-markt.jpg': 'Klantfoto "Haarlem grote markt"',
  'amsterdam-hilton-bagage.jpg': 'Klantfoto "hilton amsterdam"',
};

const cards = files.map(f => {
  const u = usage[f] || [];
  const uniq = [...new Set(u)];
  return `<figure>
  <img src="/img/${f}" alt="${f}" loading="lazy">
  <figcaption>
    <b>${f}</b>
    ${notes[f] ? `<span class="note">${notes[f]}</span>` : ''}
    ${reserved[f] ? `<span class="res">${reserved[f]}</span>` : ''}
    <span class="cnt">${uniq.length} plek${uniq.length === 1 ? '' : 'ken'}</span>
    <ul>${uniq.map(x => `<li>${x}</li>`).join('') || '<li class="none">Nergens gebruikt</li>'}</ul>
  </figcaption>
</figure>`;
}).join('\n');

const html = `<!DOCTYPE html><html lang="nl"><head><meta charset="utf-8"><title>Fotokeuze Rolstoeltaxi Spoed</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body{font-family:system-ui,sans-serif;background:#f4f6fa;color:#0f1a2e;margin:0;padding:28px}
h1{margin:0 0 6px}p.sub{color:#5b6b85;margin:0 0 24px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:18px}
figure{margin:0;background:#fff;border:1px solid #dfe5f0;border-radius:10px;overflow:hidden}
figure img{display:block;width:100%;aspect-ratio:4/3;object-fit:cover;background:#dfe5f0}
figcaption{padding:14px 16px;font-size:14px}
figcaption b{display:block;word-break:break-all;margin-bottom:4px}
.note{display:block;color:#155fb0;font-size:12.5px;margin-bottom:4px}
.res{display:block;color:#b25e00;font-size:12.5px;margin-bottom:4px}
.cnt{display:inline-block;background:#eef2fb;border-radius:6px;padding:2px 8px;font-size:12px;margin-bottom:6px}
ul{margin:6px 0 0;padding-left:18px;color:#3d4a63;font-size:13px}li.none{color:#b00020}
</style></head><body>
<h1>Fotokeuze</h1><p class="sub">${files.length} foto's. Onder elke foto staat waar hij nu op de site staat. Geef door welke je ergens anders wilt (bestandsnaam + pagina).</p>
<div class="grid">${cards}</div></body></html>`;
fs.writeFileSync(path.join(ROOT, '_fotokeuze.html'), html);
console.log('_fotokeuze.html geschreven met', files.length, 'foto\'s');
