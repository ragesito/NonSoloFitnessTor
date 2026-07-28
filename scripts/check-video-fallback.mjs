/** Verifica il pulsante di riproduzione manuale quando l'autoplay è bloccato. */
import { chromium, devices } from 'playwright';

const url = process.argv[2] ?? 'http://localhost:4321/';
const browser = await chromium.launch({ channel: 'chrome', headless: true });

for (const [label, rm] of [['autoplay consentito', 'no-preference'], ['reduce motion (autoplay bloccato)', 'reduce']]) {
  const ctx = await browser.newContext({ ...devices['iPhone 13'], reducedMotion: rm });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(4000);

  const state = () => page.evaluate(() => {
    const v = document.querySelector('.hero__bg video');
    const btn = document.querySelector('[data-video-play]');
    return {
      paused: v.paused,
      time: +v.currentTime.toFixed(1),
      opacity: getComputedStyle(v).opacity,
      btnVisible: !!btn && !btn.hidden,
    };
  });

  let s = await state();
  console.log(`\n${label}\n  iniziale: ${JSON.stringify(s)}`);

  if (s.btnVisible) {
    await page.click('[data-video-play]');
    await page.waitForTimeout(2500);
    s = await state();
    console.log(`  dopo il tocco: ${JSON.stringify(s)}`);
  }
  await ctx.close();
}

await browser.close();
