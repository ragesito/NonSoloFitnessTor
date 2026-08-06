/**
 * Cartello stampabile col QR delle recensioni.
 * Genera un PDF A5 (pronto per la stampa) e un PNG di anteprima.
 * Uso: node scripts/make-poster.mjs [variante: diretto|spunto] [cartella]
 */
import { readFileSync, mkdirSync } from 'node:fs';
import { chromium } from 'playwright';

const variant = process.argv[2] === 'spunto' ? 'spunto' : 'diretto';
const outDir = process.argv[3] || 'public/qr';
mkdirSync(outDir, { recursive: true });

const qrSvg = readFileSync(`public/qr/qr-${variant}.svg`, 'utf8')
  .replace(/<\?xml[^>]*\?>/, '')
  .replace(/width="[^"]*"/, 'width="100%"')
  .replace(/height="[^"]*"/, 'height="100%"');

const fontCss = (() => {
  const b64 = readFileSync('node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2').toString('base64');
  const i64 = readFileSync('node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-italic.woff2').toString('base64');
  return `
    @font-face{font-family:'Archivo';font-style:normal;font-weight:100 900;font-stretch:62% 125%;
      src:url(data:font/woff2;base64,${b64}) format('woff2-variations')}
    @font-face{font-family:'Archivo';font-style:italic;font-weight:100 900;font-stretch:62% 125%;
      src:url(data:font/woff2;base64,${i64}) format('woff2-variations')}`;
})();

const html = `<!doctype html><html lang="it"><head><meta charset="utf-8"><style>
  ${fontCss}
  @page { size: A5; margin: 0; }
  * { box-sizing: border-box; margin: 0; }
  body {
    width: 148mm; height: 210mm;
    font-family: 'Archivo', system-ui, sans-serif;
    background: #0d0d10; color: #f2eee5;
    display: flex; flex-direction: column;
    padding: 14mm 13mm 11mm;
    position: relative; overflow: hidden;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  /* bagliore rosso in alto a destra, come sul sito */
  body::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(70mm 50mm at 88% -6%, rgba(217,4,41,.42), transparent 62%),
                radial-gradient(60mm 45mm at -8% 104%, rgba(232,182,32,.16), transparent 58%);
  }
  .wrap { position: relative; display: flex; flex-direction: column; height: 100%; }
  .brand {
    font-stretch: 118%; font-weight: 860; font-size: 5.4mm;
    letter-spacing: .06em;
  }
  .brand i { color: #d90429; font-style: normal; }
  .place {
    margin-top: 1.4mm; font-size: 2.7mm; font-weight: 700; font-stretch: 82%;
    letter-spacing: .34em; color: rgba(242,238,229,.5); text-transform: uppercase;
  }
  .title {
    margin-top: 11mm;
    font-stretch: 120%; font-weight: 860; text-transform: uppercase;
    font-size: 15mm; line-height: .87; letter-spacing: -.015em;
  }
  .title .o { color: transparent; -webkit-text-stroke: .5mm #f2eee5; }
  .title .ac { color: #d90429; }
  .sub {
    margin-top: 5mm; font-size: 3.9mm; line-height: 1.35;
    color: rgba(242,238,229,.72); max-width: 88mm; font-weight: 480;
  }
  .qr-block {
    margin-top: auto; display: flex; align-items: center; gap: 7mm;
  }
  .qr {
    width: 46mm; height: 46mm; flex: none;
    background: #fff; border-radius: 3mm; padding: 3mm;
  }
  .qr svg { display: block; }
  .steps { display: grid; gap: 3.2mm; }
  .step { display: flex; gap: 3mm; align-items: baseline; }
  .step b {
    color: #d90429; font-size: 3.2mm; font-weight: 800; font-stretch: 85%;
    letter-spacing: .1em; flex: none;
  }
  .step span { font-size: 3.5mm; line-height: 1.3; color: rgba(242,238,229,.9); }
  .foot {
    margin-top: 9mm; padding-top: 4mm;
    border-top: .35mm solid rgba(242,238,229,.18);
    display: flex; justify-content: space-between; align-items: baseline;
    font-size: 2.7mm; color: rgba(242,238,229,.45);
    letter-spacing: .12em; text-transform: uppercase; font-weight: 640; font-stretch: 85%;
  }
  .stars { color: #e8b620; letter-spacing: .18em; font-size: 4.2mm; }
</style></head><body><div class="wrap">
  <div>
    <p class="brand">NONSOLO<i>✱</i>FITNESS</p>
    <p class="place">Torvaianica</p>
  </div>

  <p class="title">Ti è<br>piaciuto<br><span class="o">allenarti</span><br>qui<span class="ac">?</span></p>
  <p class="sub">Raccontalo in due righe su Google. Ci vogliono meno di due minuti e aiuti chi sta cercando una palestra in zona.</p>

  <div class="qr-block">
    <div class="qr">${qrSvg}</div>
    <div class="steps">
      <div class="step"><b>01</b><span>Inquadra il codice<br>con la fotocamera</span></div>
      <div class="step"><b>02</b><span>Tocca le stelle</span></div>
      <div class="step"><b>03</b><span>Scrivi com'è andata,<br>con parole tue</span></div>
    </div>
  </div>

  <div class="foot">
    <span>Viale Spagna 62 · Torvaianica</span>
    <span class="stars">★★★★★</span>
  </div>
</div></body></html>`;

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await (await browser.newContext()).newPage();
await page.setContent(html, { waitUntil: 'networkidle' });
await page.pdf({ path: `${outDir}/cartello-${variant}.pdf`, format: 'A5', printBackground: true });
await page.setViewportSize({ width: 559, height: 794 }); // A5 a 96dpi
await page.screenshot({ path: `${outDir}/cartello-${variant}.png` });
await browser.close();
console.log(`${outDir}/cartello-${variant}.pdf  +  .png`);
