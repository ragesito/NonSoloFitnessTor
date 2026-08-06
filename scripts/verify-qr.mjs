/**
 * Rilegge i QR generati (e quelli dentro i cartelli) per essere sicuri che
 * si scansionino davvero e portino dove devono, prima di mandarli in stampa.
 */
import { readFileSync } from 'node:fs';
import jsQR from 'jsqr';
import { PNG } from 'pngjs';
import { chromium } from 'playwright';

const expected = {
  diretto: '/r/',
  spunto: '/recensione/',
};

const decodePng = (path) => {
  const png = PNG.sync.read(readFileSync(path));
  return jsQR(new Uint8ClampedArray(png.data), png.width, png.height)?.data ?? null;
};

let fails = 0;
const check = (label, got, mustEnd) => {
  const ok = got && got.endsWith(mustEnd);
  if (!ok) fails++;
  console.log(`${ok ? '✓' : '✗ FAIL'} ${label.padEnd(34)} ${got ?? '(illeggibile)'}`);
};

// 1. i QR sciolti
for (const [id, tail] of Object.entries(expected)) {
  check(`qr-${id}.png`, decodePng(`public/qr/qr-${id}.png`), tail);
}

// 2. il QR come appare DENTRO il cartello (dimensione reale di stampa)
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await (await browser.newContext()).newPage();
for (const [id, tail] of Object.entries(expected)) {
  // rendo il PDF alla risoluzione di una fotocamera che inquadra un A5
  await page.goto('file:///' + process.cwd().replace(/\\/g, '/') + `/public/qr/cartello-${id}.png`);
  await page.setViewportSize({ width: 559, height: 794 });
  const shot = await page.screenshot({ path: `public/qr/.check-${id}.png` });
  check(`cartello-${id} (QR nel cartello)`, decodePng(`public/qr/.check-${id}.png`), tail);
}
await browser.close();

console.log(fails ? `\n${fails} QR da rifare` : '\n✓ tutti i QR si leggono e puntano dove devono');
process.exit(fails ? 1 : 0);
