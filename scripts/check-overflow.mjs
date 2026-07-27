/**
 * Verifica che nessun titolo sporga dalla propria card,
 * su più larghezze di viewport e su tutte le griglie di card.
 */
import { chromium } from 'playwright';

const checks = [
  ['/corsi/', '.course-card', '.course-card__name'],
  ['/chi-siamo/', '.team-card', '.team-card__name'],
  ['/corsi/boxe/', '.related__card', '.related__card .display--sm'],
];
const widths = [1671, 1480, 1280, 1024, 768, 390];

const browser = await chromium.launch({ channel: 'chrome', headless: true });
let fails = 0;

for (const w of widths) {
  const page = await (await browser.newContext({ viewport: { width: w, height: 900 } })).newPage();
  for (const [path, cardSel, nameSel] of checks) {
    await page.goto(`http://localhost:4321${path}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1200);
    const bad = await page.evaluate(([cs]) =>
      [...document.querySelectorAll(cs)].flatMap((card) => {
        const cr = card.getBoundingClientRect();
        return [...card.querySelectorAll('h1,h2,h3,.display')]
          .filter((el) => el.getBoundingClientRect().right > cr.right + 1)
          .map((el) => `"${el.textContent.trim().slice(0, 30)}" sporge di ${Math.round(el.getBoundingClientRect().right - cr.right)}px`);
      }), [cardSel, nameSel]);
    if (bad.length) { fails += bad.length; console.log(`✗ ${w}px ${path}: ${bad.join(' | ')}`); }
  }
  await page.context().close();
}
console.log(fails ? `\n${fails} overflow trovati` : '✓ Nessun overflow su tutte le larghezze e pagine.');
await browser.close();
process.exit(fails ? 1 : 0);
