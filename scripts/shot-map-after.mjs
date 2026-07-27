import { chromium } from 'playwright';
const OUT = process.argv[2] ?? '.';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await (await browser.newContext({ viewport: { width: 1560, height: 950 } })).newPage();
page.on('pageerror', (e) => console.log('PAGEERROR:', e.message));
page.on('console', (m) => { if (m.type() === 'error') console.log('CONSOLE ERR:', m.text()); });

await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);
await page.evaluate(() => document.querySelector('#orari').scrollIntoView({ block: 'center' }));
await page.waitForTimeout(1500);

await page.click('[data-map-load]');
await page.waitForTimeout(5000);

const box = await page.evaluate(() => {
  const card = document.querySelector('.map-card');
  const ifr = card.querySelector('iframe');
  if (!ifr) return 'NO IFRAME';
  const r = ifr.getBoundingClientRect();
  const cs = getComputedStyle(ifr);
  return {
    rect: [Math.round(r.width), Math.round(r.height)],
    display: cs.display, opacity: cs.opacity, visibility: cs.visibility,
    filter: cs.filter.slice(0, 40),
    cardRect: [Math.round(card.getBoundingClientRect().width), Math.round(card.getBoundingClientRect().height)],
  };
});
console.log(JSON.stringify(box));
await page.screenshot({ path: `${OUT}/map-after-click.png` });
console.log('saved map-after-click.png');
await browser.close();
