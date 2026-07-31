/** Geometria della testata: dove inizia davvero il video rispetto all'header. */
import { chromium, devices } from 'playwright';

const url = process.argv[2] ?? 'http://localhost:4321/';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await (await browser.newContext({ ...devices['iPhone 13'] })).newPage();
await page.goto(url, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(6000);

const geo = await page.evaluate(() => {
  const box = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return `${sel}: assente`;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      sel,
      top: Math.round(r.top), height: Math.round(r.height),
      display: cs.display, position: cs.position,
      bg: cs.backgroundColor,
      z: cs.zIndex,
    };
  };
  return [
    box('.hero'), box('.hero__bg'), box('.hero__bg video'),
    box('.header'), box('.header__inner'),
  ];
});
geo.forEach((g) => console.log(JSON.stringify(g)));

// che colore ha davvero il pixel dietro il navbar?
const shot = await page.screenshot({ clip: { x: 0, y: 0, width: 390, height: 200 } });
console.log('screenshot testata: ' + shot.length + ' byte');
await page.screenshot({ path: (process.argv[3] ?? '.') + '/navbar-seam.png', clip: { x: 0, y: 0, width: 390, height: 320 } });
await browser.close();
