import { chromium } from 'playwright';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await (await browser.newContext({ viewport: { width: 1671, height: 900 } })).newPage();
await page.goto('http://localhost:4321/chi-siamo/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1800);
await page.evaluate(() => document.querySelector('.team-grid')?.scrollIntoView());
await page.waitForTimeout(1500);

const data = await page.evaluate(() => {
  return [...document.querySelectorAll('.team-card')].map((card) => {
    const ph = card.querySelector('.team-card__photo');
    const svg = card.querySelector('svg');
    const r = (el) => { const b = el.getBoundingClientRect(); return `${Math.round(b.width)}x${Math.round(b.height)} @y${Math.round(b.top)}`; };
    const cs = getComputedStyle(ph);
    return {
      card: r(card),
      ph: r(ph),
      svg: r(svg),
      phClass: ph.className,
      aspect: cs.aspectRatio,
      overflow: cs.overflow,
      svgW: getComputedStyle(svg).width,
      svgH: getComputedStyle(svg).height,
    };
  });
});
console.log(JSON.stringify(data, null, 1));
await browser.close();
