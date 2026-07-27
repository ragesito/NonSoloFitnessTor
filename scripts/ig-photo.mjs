/**
 * Scarica una foto da un post pubblico di Instagram aprendo la pagina
 * e leggendo l'URL della CDN (yt-dlp gestisce solo i video).
 * uso: node scripts/ig-photo.mjs <url> <cartella>
 */
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const url = process.argv[2];
const outDir = process.argv[3] ?? '.';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const ctx = await browser.newContext({
  viewport: { width: 1400, height: 1000 },
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36',
});
const page = await ctx.newPage();

// raccoglie tutte le immagini della CDN viste durante il caricamento
const seen = new Map();
page.on('response', (r) => {
  const u = r.url();
  if (/cdninstagram|fbcdn/.test(u) && /\.(jpg|jpeg|webp)/.test(u) && !seen.has(u)) {
    seen.set(u, r);
  }
});

await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(4000);

const imgs = await page.evaluate(() =>
  [...document.querySelectorAll('img')]
    .map((i) => ({ src: i.currentSrc || i.src, w: i.naturalWidth, h: i.naturalHeight, alt: (i.alt || '').slice(0, 60) }))
    .filter((i) => i.w > 400 && /cdninstagram|fbcdn/.test(i.src))
);
console.log(`immagini grandi trovate: ${imgs.length}`);

let n = 0;
for (const img of imgs) {
  const buf = await (await ctx.request.get(img.src)).body();
  const dest = `${outDir}/ig-photo-${String(++n).padStart(2, '0')}.jpg`;
  writeFileSync(dest, buf);
  console.log(`${dest} — ${img.w}x${img.h} — ${Math.round(buf.length / 1024)} KB`);
}

await page.screenshot({ path: `${outDir}/ig-page.png` });
await browser.close();
