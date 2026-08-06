/** Verifica la pagina recensioni: spunto casuale, rotazione, link a Google. */
import { chromium, devices } from 'playwright';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const ctx = await browser.newContext({ ...devices['iPhone 13'] });
let fails = 0;

// 1. lo spunto cambia tra una visita e l'altra (= tra una scansione e l'altra)
const seen = new Set();
for (let i = 0; i < 8; i++) {
  const p = await ctx.newPage();
  await p.goto('http://localhost:4321/recensione/', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(1200);
  seen.add(await p.textContent('[data-prompt]'));
  await p.close();
}
console.log(`spunti diversi in 8 visite: ${seen.size}`);
if (seen.size < 3) { fails++; console.log('✗ ruota troppo poco'); }

// 2. il pulsante "un altro spunto" cambia davvero il testo
const page = await ctx.newPage();
await page.goto('http://localhost:4321/recensione/', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1200);
const before = await page.textContent('[data-prompt]');
await page.click('[data-prompt-next]');
await page.waitForTimeout(600);
const after = await page.textContent('[data-prompt]');
console.log(`tocco "un altro spunto": ${before !== after ? '✓ cambia' : '✗ identico'}`);
if (before === after) fails++;

// 3. il pulsante porta al riquadro recensioni di Google
const href = await page.getAttribute('.review-cta__btn', 'href');
const okHref = href?.includes('search.google.com/local/writereview') && href.includes('ChIJhZZNW6WVJRMRULKd7VBp62s');
console.log(`link Google: ${okHref ? '✓' : '✗'} ${href}`);
if (!okHref) fails++;

// 4. la pagina è fuori dai risultati di ricerca
const robots = await page.getAttribute('meta[name="robots"]', 'content');
console.log(`robots: ${robots === 'noindex, follow' ? '✓' : '✗'} ${robots}`);
if (robots !== 'noindex, follow') fails++;

// 5. la scorciatoia /r/ rimanda a Google (il reindirizzamento è immediato:
//    controlliamo l'indirizzo dove si finisce, non il tag meta)
const rp = await ctx.newPage();
await rp.goto('http://localhost:4321/r/', { waitUntil: 'domcontentloaded' }).catch(() => {});
await rp.waitForTimeout(2500);
const landed = rp.url();
const okRedirect = /google\.[a-z.]+/.test(landed);
console.log(`/r/ finisce su: ${okRedirect ? '✓' : '✗'} ${landed.slice(0, 76)}`);
if (!okRedirect) fails++;

// 6. versione inglese
const ep = await ctx.newPage();
await ep.goto('http://localhost:4321/en/recensione/', { waitUntil: 'domcontentloaded' });
await ep.waitForTimeout(1000);
const enPrompt = await ep.textContent('[data-prompt]');
const enCta = await ep.textContent('.review-cta__btn');
console.log(`EN: "${enPrompt?.trim().slice(0, 48)}…" · cta "${enCta?.trim()}"`);

await browser.close();
console.log(fails ? `\n${fails} problemi` : '\n✓ pagina recensioni verificata');
process.exit(fails ? 1 : 0);
