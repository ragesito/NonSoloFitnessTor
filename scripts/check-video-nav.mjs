import { chromium } from 'playwright';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await (await browser.newContext({ viewport: { width: 390, height: 815 } })).newPage();
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);

const state = () => page.evaluate(() => {
  const v = document.querySelector('.hero__bg video');
  return v ? { paused: v.paused, time: +v.currentTime.toFixed(1), rate: v.playbackRate, fadedIn: v.classList.contains('is-playing') } : 'no video';
});

console.log('carga inicial:', JSON.stringify(await state()));
await page.click('#nav-toggle');
await page.waitForTimeout(500);
await page.click('.mobile-nav__link[href="/corsi/"]');
await page.waitForTimeout(1500);
await page.click('.wordmark');
await page.waitForTimeout(2000);
console.log('tras navegar y volver:', JSON.stringify(await state()));
await browser.close();
