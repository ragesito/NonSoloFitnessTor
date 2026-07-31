/** L'header deve restare visibile in cima sempre: scendendo e risalendo. */
import { chromium, devices } from 'playwright';

const url = process.argv[2] ?? 'http://localhost:4321/';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await (await browser.newContext({ ...devices['iPhone 13'] })).newPage();
await page.goto(url, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(5000);

const state = async (label) => {
  const s = await page.evaluate(() => {
    const h = document.getElementById('site-header');
    const r = h.getBoundingClientRect();
    return {
      top: Math.round(r.top),
      scrolled: h.classList.contains('is-scrolled'),
      hidden: h.classList.contains('is-hidden'),
      y: Math.round(window.scrollY),
    };
  });
  console.log(`${label.padEnd(22)} top=${String(s.top).padStart(4)}  scrollY=${String(s.y).padStart(5)}  is-scrolled=${s.scrolled}  is-hidden=${s.hidden}`);
  return s;
};

let ok = true;
const check = (s) => { if (s.top !== 0) ok = false; };

check(await state('in cima'));
for (const y of [400, 1200, 2500]) {
  await page.evaluate((v) => window.scrollTo(0, v), y);
  await page.waitForTimeout(700);
  check(await state(`scendendo a ${y}`));
}
for (const y of [1500, 600]) {
  await page.evaluate((v) => window.scrollTo(0, v), y);
  await page.waitForTimeout(700);
  check(await state(`risalendo a ${y}`));
}
console.log(ok ? '\n✓ header sempre ancorato in cima' : '\n✗ header si sposta');
await browser.close();
process.exit(ok ? 0 : 1);
