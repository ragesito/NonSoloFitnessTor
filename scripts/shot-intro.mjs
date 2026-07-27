import { chromium } from 'playwright';
const OUT = process.argv[2] ?? '.';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await (await browser.newContext({ viewport: { width: 1560, height: 880 } })).newPage();
await page.goto('http://localhost:4321/');
const t0 = Date.now();
const at = async (ms, name) => {
  const wait = ms - (Date.now() - t0);
  if (wait > 0) await page.waitForTimeout(wait);
  await page.screenshot({ path: `${OUT}/${name}` });
  console.log('✓', name, `@${Date.now() - t0}ms`);
};
await at(950, 'split-1-brand.png');
await at(1500, 'split-2-strike.png');
await at(1800, 'split-3-crack.png');
await at(2050, 'split-4-open.png');
await browser.close();
