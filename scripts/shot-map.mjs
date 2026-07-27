import { chromium } from 'playwright';
const out = process.argv[2] ?? 'map.png';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await (await browser.newContext({ viewport: { width: 1560, height: 900 } })).newPage();
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);
await page.evaluate(() => document.querySelector('#orari').scrollIntoView({ block: 'center' }));
await page.waitForTimeout(4000); // lascia caricare l'iframe di Google Maps
await page.screenshot({ path: out });
console.log('saved:', out);
await browser.close();
