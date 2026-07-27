import { chromium } from 'playwright';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await (await browser.newContext({ viewport: { width: 390, height: 815 } })).newPage();
page.on('console', (m) => console.log('[console]', m.text()));
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);
await page.click('#nav-toggle');
await page.waitForTimeout(500);
await page.click('.mobile-nav__link[href="/corsi/"]');
await page.waitForTimeout(1200);
await page.click('.wordmark');
await page.waitForTimeout(1500);

const diag = await page.evaluate(async () => {
  const v = document.querySelector('.hero__bg video');
  const out = {
    paused: v.paused,
    muted: v.muted,
    readyState: v.readyState,
    networkState: v.networkState,
    error: v.error && v.error.message,
    currentSrc: v.currentSrc,
    autoplayAttr: v.hasAttribute('autoplay'),
    display: getComputedStyle(v.closest('.hero__bg')).display,
  };
  try {
    await v.play();
    out.playResult = 'ok, paused=' + v.paused;
  } catch (e) {
    out.playResult = `${e.name}: ${e.message}`;
  }
  return out;
});
console.log(JSON.stringify(diag, null, 1));
await browser.close();
