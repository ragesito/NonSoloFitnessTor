/**
 * Genera public/favicon.ico (48 + 96 px) con l'arte del fulmine.
 * Perché serve: il crawler dei favicon di Google prova /favicon.ico alla
 * radice dell'host — se manca, resta il globo grigio nei risultati anche
 * quando i <link rel="icon"> sono a posto.
 * L'ICO qui è un contenitore con dentro PNG (supportato da Vista in poi e
 * da tutti i browser moderni): ICONDIR + ICONDIRENTRY per ogni misura.
 */
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const SIZES = [48, 96];

const art = (size) => `<!doctype html><meta charset="utf-8">
<style>*{margin:0}body{width:${size}px;height:${size}px}</style>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}">
  <rect width="64" height="64" rx="14" fill="#0d0d10"/>
  <path d="M14 0 L1 23 h8 L6 40 L23 15 h-9 L14 0 Z" fill="#d90429" transform="translate(20 12)"/>
</svg>`;

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const pngs = [];
for (const size of SIZES) {
  const page = await browser.newPage({ viewport: { width: size, height: size } });
  await page.setContent(art(size));
  pngs.push({ size, buf: await page.screenshot({ omitBackground: true }) });
  await page.close();
}
await browser.close();

const HEADER = 6;
const ENTRY = 16;
const header = Buffer.alloc(HEADER);
header.writeUInt16LE(0, 0); // riservato
header.writeUInt16LE(1, 2); // 1 = icona
header.writeUInt16LE(pngs.length, 4);

let offset = HEADER + ENTRY * pngs.length;
const entries = [];
for (const { size, buf } of pngs) {
  const e = Buffer.alloc(ENTRY);
  e.writeUInt8(size >= 256 ? 0 : size, 0); // larghezza
  e.writeUInt8(size >= 256 ? 0 : size, 1); // altezza
  e.writeUInt8(0, 2); // palette
  e.writeUInt8(0, 3); // riservato
  e.writeUInt16LE(1, 4); // piani
  e.writeUInt16LE(32, 6); // bit per pixel
  e.writeUInt32LE(buf.length, 8);
  e.writeUInt32LE(offset, 12);
  entries.push(e);
  offset += buf.length;
}

const ico = Buffer.concat([header, ...entries, ...pngs.map((p) => p.buf)]);
writeFileSync('public/favicon.ico', ico);
console.log(`favicon.ico: ${SIZES.join(' + ')} px · ${ico.length} byte`);
