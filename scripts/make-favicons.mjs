/**
 * Genera TUTTI i file del favicon dall'arte del fulmine.
 *   node scripts/make-favicons.mjs
 *
 * Ricetta copiata da fentriq.app, dove il favicon compare nei risultati
 * Google dal primo giorno: .ico multi-size + PNG a 48/32/16 + apple-touch
 * + icona 512 per il manifest. NIENTE SVG: Google sceglie UN solo favicon
 * per sito con delle euristiche, e un SVG senza width/height (come il
 * nostro) puo' vincere la scelta e poi non essere rasterizzabile — da li'
 * il globo grigio.
 */
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const art = (size, radius = 14) => `<!doctype html><meta charset="utf-8">
<style>*{margin:0}body{width:${size}px;height:${size}px}</style>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}">
  <rect width="64" height="64" rx="${radius}" fill="#0d0d10"/>
  <path d="M14 0 L1 23 h8 L6 40 L23 15 h-9 L14 0 Z" fill="#d90429" transform="translate(20 12)"/>
</svg>`;

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const png = async (size, radius) => {
  const page = await browser.newPage({ viewport: { width: size, height: size } });
  await page.setContent(art(size, radius));
  const buf = await page.screenshot({ omitBackground: true });
  await page.close();
  return buf;
};

// PNG dichiarati nel head + icona grande per il manifest
for (const size of [16, 32, 48, 96]) {
  writeFileSync(`public/favicon-${size}.png`, await png(size));
}
writeFileSync('public/icon-512.png', await png(512, 112));
// Apple arrotonda da se': niente raggio, altrimenti si vedono gli angoli
writeFileSync('public/apple-touch-icon.png', await png(180, 0));

// favicon.ico: contenitore con dentro i PNG.
// ORDINE DECRESCENTE, non crescente: Google richiede un favicon di almeno
// 48px e alcuni parser leggono la PRIMA voce della directory dell'ICO — se
// trovavano il 16x16 lo scartavano come troppo piccolo. Col 48 in testa
// qualunque parser prende una misura valida.
const sizes = [48, 32, 16];
const parts = [];
for (const size of sizes) parts.push({ size, buf: await png(size) });
await browser.close();

const HEADER = 6, ENTRY = 16;
const header = Buffer.alloc(HEADER);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(parts.length, 4);
let offset = HEADER + ENTRY * parts.length;
const entries = parts.map(({ size, buf }) => {
  const e = Buffer.alloc(ENTRY);
  e.writeUInt8(size, 0);
  e.writeUInt8(size, 1);
  e.writeUInt16LE(1, 4);
  e.writeUInt16LE(32, 6);
  e.writeUInt32LE(buf.length, 8);
  e.writeUInt32LE(offset, 12);
  offset += buf.length;
  return e;
});
writeFileSync('public/favicon.ico', Buffer.concat([header, ...entries, ...parts.map((p) => p.buf)]));
console.log(`fatto: favicon.ico (${sizes.join('/')}) + PNG 16/32/48/96 + apple-touch-icon + icon-512`);
