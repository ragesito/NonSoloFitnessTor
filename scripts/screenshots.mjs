import { chromium } from 'playwright';

const OUT = process.argv[2] ?? '.';
const base = 'http://localhost:4321';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })).newPage();

const errors = [];
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
page.on('console', (m) => { if (m.type() === 'error') errors.push(`console: ${m.text()}`); });

const shots = [
  ['/', 'home-hero', null],
  ['/', 'home-corsi', 800],
  ['/', 'home-reviews', 3200],
  ['/corsi/', 'corsi', 600],
  ['/corsi/boxe/', 'boxe', 500],
  ['/prezzi/', 'prezzi', 700],
  ['/contatti/', 'contatti', 700],
];

for (const [path, name, scrollY] of shots) {
  await page.goto(base + path, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1600); // deja terminar la animación de entrada
  if (scrollY) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), scrollY);
    await page.waitForTimeout(1400); // deja disparar los reveals
  }
  await page.screenshot({ path: `${OUT}/${name}.png` });
  console.log(`✓ ${name}.png`);
}

// móvil
const mob = await (await browser.newContext({ viewport: { width: 390, height: 844 } })).newPage();
await mob.goto(base + '/', { waitUntil: 'networkidle' });
await mob.waitForTimeout(1600);
await mob.screenshot({ path: `${OUT}/home-mobile.png` });
console.log('✓ home-mobile.png');

console.log(errors.length ? `ERRORES:\n${errors.join('\n')}` : 'Sin errores de consola.');
await browser.close();
