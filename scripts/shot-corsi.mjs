import { chromium } from 'playwright';
const out = process.argv[2] ?? 'corsi-fixed.png';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await (await browser.newContext({ viewport: { width: 1560, height: 900 } })).newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.goto('http://localhost:4321/corsi/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
await page.evaluate(() => document.querySelector('.courses-grid').scrollIntoView({ block: 'center' }));
await page.waitForTimeout(1500);

// controllo overflow: nessun titolo deve sporgere dalla propria card
const overflow = await page.evaluate(() =>
  [...document.querySelectorAll('.course-card')].map((c) => {
    const name = c.querySelector('.course-card__name');
    return { name: name.textContent.trim(), fits: name.getBoundingClientRect().right <= c.getBoundingClientRect().right + 1 };
  })
);
console.log(overflow.map((o) => `${o.fits ? '✓' : '✗ SBORDA'} ${o.name}`).join('\n'));
await page.screenshot({ path: out });
console.log('saved:', out, errors.length ? `ERRORES: ${errors}` : '(sin errores js)');
await browser.close();
