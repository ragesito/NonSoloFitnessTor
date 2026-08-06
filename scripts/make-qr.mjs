/**
 * Genera i due QR per le recensioni.
 *   A = diretto   -> /r/            (salta subito su Google)
 *   B = con spunto -> /recensione/  (una domanda diversa a ogni scansione)
 * Entrambi puntano al SITO, non a Google: se un domani il link Google
 * cambia si aggiorna il sito e i cartelli stampati restano validi.
 *
 * Uso: node scripts/make-qr.mjs [dominio] [suffisso]
 *   node scripts/make-qr.mjs                                  -> definitivi
 *   node scripts/make-qr.mjs https://…vercel.app -test        -> di prova
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import QRCode from 'qrcode';

const site = (process.argv[2] || 'https://www.nonsolofitnesstorvaianica.com').replace(/\/$/, '');
const suffix = process.argv[3] || '';
const outDir = 'public/qr';
mkdirSync(outDir, { recursive: true });

const INK = '#0d0d10';

const codes = [
  { id: 'diretto', url: `${site}/r/`, label: 'A — diretto a Google' },
  { id: 'spunto', url: `${site}/recensione/`, label: 'B — con spunto casuale' },
];

// correzione d'errore alta: il QR resta leggibile anche stampato male,
// piegato o con il logo sopra
const opts = { errorCorrectionLevel: 'H', margin: 2, color: { dark: INK, light: '#ffffff' } };

for (const c of codes) {
  const name = `qr-${c.id}${suffix}`;
  const svg = await QRCode.toString(c.url, { ...opts, type: 'svg' });
  writeFileSync(`${outDir}/${name}.svg`, svg);
  await QRCode.toFile(`${outDir}/${name}.png`, c.url, { ...opts, width: 1200 });
  console.log(`${c.label.padEnd(26)} ${c.url}`);
  console.log(`  ${outDir}/${name}.svg  +  .png`);
}
