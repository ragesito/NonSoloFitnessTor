/** Cerca "buchi": zone della pagina dove si vede la tela scura al posto del crema. */
import { chromium, devices } from 'playwright';

const pages = ['/', '/corsi/', '/corsi/boxe/', '/prezzi/', '/chi-siamo/', '/regolamento/', '/contatti/', '/privacy/', '/404'];
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const ctx = await browser.newContext({ ...devices['iPhone 13'] });
const page = await ctx.newPage();
let problems = 0;

for (const p of pages) {
  await page.goto(`http://localhost:4321${p}`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);

  // ogni figlio diretto di <main> deve avere un fondo proprio (non trasparente)
  const naked = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll('main > *').forEach((el) => {
      const bg = getComputedStyle(el).backgroundColor;
      const r = el.getBoundingClientRect();
      const transparent = bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent';
      if (transparent && r.height > 4) {
        out.push(`${el.tagName.toLowerCase()}.${el.className.toString().split(' ')[0]} h=${Math.round(r.height)}`);
      }
    });
    return out;
  });

  if (naked.length) { problems += naked.length; console.log(`✗ ${p}: ${naked.join(' | ')}`); }
  else console.log(`✓ ${p}`);
}

console.log(problems ? `\n${problems} elementi senza fondo` : '\n✓ nessun buco: ogni blocco dipinge il suo fondo');
await browser.close();
process.exit(problems ? 1 : 0);
