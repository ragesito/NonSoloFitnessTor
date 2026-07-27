import { chromium } from 'playwright';
const OUT = process.argv[2] ?? '.';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
for (const [w, h] of [[1680, 880], [1366, 700], [390, 780]]) {
  const page = await (await browser.newContext({ viewport: { width: w, height: h } })).newPage();
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1800);
  const m = await page.evaluate(() => {
    const r = document.querySelector('.hero .marquee').getBoundingClientRect();
    return { bottom: Math.round(r.bottom), vh: window.innerHeight, visible: r.bottom <= window.innerHeight + 1 };
  });
  console.log(`${w}x${h} → marquee bottom ${m.bottom}px / viewport ${m.vh}px → ${m.visible ? 'VISIBLE ✓' : 'CORTADO ✗'}`);
  await page.screenshot({ path: `${OUT}/hero-${w}x${h}.png` });
}
await browser.close();
