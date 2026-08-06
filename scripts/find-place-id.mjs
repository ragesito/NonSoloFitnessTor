/** Cerca il Place ID di Google della palestra (serve per il link recensioni). */
import { chromium } from 'playwright';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const ctx = await browser.newContext({
  locale: 'it-IT',
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36',
});
// salta il muro del consenso di Google
await ctx.addCookies([
  { name: 'SOCS', value: 'CAISNQgQEitib3FfaWRlbnRpdHlmcm9udGVuZHVpc2VydmVyXzIwMjQwNDA5LjA2X3AwGgJpdCADGgYIgOa_sQY', domain: '.google.com', path: '/' },
  { name: 'CONSENT', value: 'YES+cb.20240101-00-p0.it+FX+000', domain: '.google.com', path: '/' },
]);
const page = await ctx.newPage();

const found = new Set();
const grab = (txt) => {
  for (const m of txt.matchAll(/(ChIJ[A-Za-z0-9_-]{16,})/g)) found.add(m[1]);
  for (const m of txt.matchAll(/0x[0-9a-f]{16}:0x([0-9a-f]{16})/g)) found.add('cid:' + BigInt('0x' + m[1]).toString());
};
page.on('response', async (r) => {
  const u = r.url();
  grab(u);
  if (/maps|search/.test(u) && (r.headers()['content-type'] || '').includes('text')) {
    try { grab(await r.text()); } catch {}
  }
});

// l'embed della mappa è quello che usiamo già sul sito
const embed = 'https://maps.google.com/maps?q=' +
  encodeURIComponent('Nonsolofitness Torvaianica Viale Spagna, 62 Torvaianica') + '&z=16&hl=it&output=embed';
await page.goto(embed, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
await page.waitForTimeout(4000);
grab(await page.content());

console.log('trovati:', [...found].slice(0, 10));
await browser.close();
