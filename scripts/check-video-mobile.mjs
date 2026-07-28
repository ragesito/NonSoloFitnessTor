/** Diagnostica il video di sfondo del hero in emulazione mobile. */
import { chromium, devices } from 'playwright';

const url = process.argv[2] ?? 'http://localhost:4321/';
const browser = await chromium.launch({ channel: 'chrome', headless: true });

for (const [name, opts] of [
  ['iPhone 13 (default)', devices['iPhone 13']],
  ['Pixel 7 (default)', devices['Pixel 7']],
  ['iPhone 13 + reduce motion', { ...devices['iPhone 13'], reducedMotion: 'reduce' }],
]) {
  const ctx = await browser.newContext(opts);
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', (e) => errs.push(e.message));
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000);

  const st = await page.evaluate(() => {
    const v = document.querySelector('.hero__bg video');
    if (!v) return { error: 'nessun video di sfondo' };
    const cs = getComputedStyle(v);
    const wrap = getComputedStyle(v.closest('.hero__bg'));
    return {
      paused: v.paused,
      time: +v.currentTime.toFixed(1),
      readyState: v.readyState, // 4 = può riprodurre fino alla fine
      networkState: v.networkState,
      mediaError: v.error?.message ?? null,
      muted: v.muted,
      isPlayingClass: v.classList.contains('is-playing'),
      opacity: cs.opacity,
      wrapDisplay: wrap.display,
      videoBox: [Math.round(v.getBoundingClientRect().width), Math.round(v.getBoundingClientRect().height)],
    };
  });
  console.log(`\n${name}`);
  console.log(' ', JSON.stringify(st));
  if (errs.length) console.log('  JS errors:', errs);
  await ctx.close();
}

await browser.close();
