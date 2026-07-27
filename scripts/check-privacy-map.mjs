/** Verifica: nessuna richiesta a Google prima del consenso + pagina privacy ok. */
import { chromium } from 'playwright';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const ctx = await browser.newContext({ viewport: { width: 1400, height: 900 } });
const page = await ctx.newPage();

const googleHits = [];
page.on('request', (r) => {
  const u = r.url();
  if (/google|gstatic|googleapis/.test(u)) googleHits.push(u.slice(0, 70));
});

await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await page.waitForTimeout(3000);
await page.evaluate(() => document.querySelector('#orari')?.scrollIntoView());
await page.waitForTimeout(2000);
console.log(`PRIMA del consenso → richieste a Google: ${googleHits.length}`, googleHits);

const cookiesBefore = (await ctx.cookies()).length;
console.log('cookie prima del consenso:', cookiesBefore);

await page.click('[data-map-load]');
await page.waitForTimeout(3000);
const hasIframe = await page.evaluate(() => !!document.querySelector('.map-card iframe'));
console.log('DOPO il clic → iframe caricato:', hasIframe, '| richieste Google:', googleHits.length);

// pagina privacy
const p2 = await ctx.newPage();
const resp = await p2.goto('http://localhost:4321/privacy/', { waitUntil: 'networkidle' });
const title = await p2.title();
const sections = await p2.evaluate(() => document.querySelectorAll('.legal__section').length);
console.log(`privacy: HTTP ${resp.status()} | "${title}" | ${sections} sezioni`);
await p2.screenshot({ path: process.argv[2] ? `${process.argv[2]}/privacy.png` : 'privacy.png' });

await browser.close();
