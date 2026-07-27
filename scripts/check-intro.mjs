import { chromium } from 'playwright';
const OUT = process.argv[2] ?? '.';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await (await browser.newContext({ viewport: { width: 1560, height: 880 } })).newPage();

// fase 1: intro visibile (wordmark + rayo)
await page.goto('http://localhost:4321/');
await page.waitForTimeout(900);
await page.screenshot({ path: `${OUT}/intro-mid.png` });

// fase 2: cortina a metà salita
await page.waitForTimeout(700);
await page.screenshot({ path: `${OUT}/intro-curtain.png` });

// fase 3: pagina rivelata, intro rimossa dal DOM
await page.waitForTimeout(1800);
const gone = await page.evaluate(() => !document.getElementById('intro'));
const heroVisible = await page.evaluate(() => {
  const l = document.querySelector('.hero__line');
  return getComputedStyle(l).transform === 'none' || l.getBoundingClientRect().height > 0;
});
await page.screenshot({ path: `${OUT}/intro-after.png` });
console.log('intro rimossa:', gone, '| hero animato:', heroVisible);

// fase 4: ricarica nella stessa sessione -> niente intro
await page.reload();
await page.waitForTimeout(400);
const skipped = await page.evaluate(() => {
  const i = document.getElementById('intro');
  return !i || getComputedStyle(i).display === 'none';
});
console.log('seconda visita senza intro:', skipped);
await browser.close();
