/**
 * Verifica i marquee: lo shift del loop (-50% del track) deve essere un
 * multiplo esatto di (copia + gap) e il track deve coprire viewport + shift,
 * altrimenti si vedono buchi o scatti.
 */
import { chromium } from 'playwright';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
let fails = 0;

for (const w of [1920, 1671, 1280, 768, 390]) {
  const page = await (await browser.newContext({ viewport: { width: w, height: 900 } })).newPage();
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  const results = await page.evaluate(() => {
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const gap = 2.5 * rem;
    return [...document.querySelectorAll('.marquee')].map((m, i) => {
      const track = m.querySelector('.marquee__track');
      const copy = m.querySelector('.marquee__item');
      const shift = track.scrollWidth / 2;
      const unit = copy.offsetWidth + gap;
      const remainder = Math.abs(shift / unit - Math.round(shift / unit));
      const covered = track.scrollWidth - shift >= m.clientWidth - 1;
      return { i, seamless: remainder < 0.01, covered };
    });
  });
  for (const r of results) {
    const ok = r.seamless && r.covered;
    if (!ok) { fails++; console.log(`✗ ${w}px marquee#${r.i}: seamless=${r.seamless} covered=${r.covered}`); }
  }
  await page.context().close();
}
console.log(fails ? `${fails} problemi` : '✓ Loop esatto e nessun buco su tutte le larghezze.');
await browser.close();
process.exit(fails ? 1 : 0);
