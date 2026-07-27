import { chromium } from 'playwright';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);

for (const [x, y, zona] of [[720, 300, 'centro-alto'], [720, 500, 'centro'], [720, 700, 'centro-bajo']]) {
  const hit = await page.evaluate(([px, py]) => {
    const el = document.elementFromPoint(px, py);
    const a = el?.closest('a');
    return `${el?.className || el?.tagName}${a ? ` → <a href="${a.getAttribute('href')}">` : ' (sin enlace)'}`;
  }, [x, y]);
  console.log(`clic en ${zona} (${x},${y}): ${hit}`);
}
await browser.close();
