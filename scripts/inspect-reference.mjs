/** Legge come è costruita la testata di un sito di riferimento. */
import { chromium, devices } from 'playwright';

const url = process.argv[2];
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await (await browser.newContext({ ...devices['iPhone 13'] })).newPage();
await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(2500);
await page.evaluate(() => window.scrollTo(0, 1200));
await page.waitForTimeout(1200);

const info = await page.evaluate(() => {
  // trova l'elemento fisso in cima alla pagina
  const fixed = [...document.querySelectorAll('body *')].filter((el) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return cs.position === 'fixed' && r.top <= 2 && r.height > 20 && r.width > window.innerWidth * 0.8;
  });
  const describe = (el) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      tag: el.tagName.toLowerCase(),
      cls: el.className.toString().slice(0, 60),
      top: Math.round(r.top), height: Math.round(r.height),
      bg: cs.backgroundColor, backdrop: cs.backdropFilter,
      paddingTop: cs.paddingTop, z: cs.zIndex,
    };
  };
  return {
    header: fixed.map(describe),
    html: { bg: getComputedStyle(document.documentElement).backgroundColor, colorScheme: getComputedStyle(document.documentElement).colorScheme },
    body: { bg: getComputedStyle(document.body).backgroundColor },
    // primo elemento in cima al viewport, sotto l'header fisso
    topmost: (() => {
      const el = document.elementFromPoint(window.innerWidth / 2, 2);
      return el ? { tag: el.tagName.toLowerCase(), cls: el.className.toString().slice(0, 50), bg: getComputedStyle(el).backgroundColor } : null;
    })(),
    bodyChildren: [...document.body.children].map((el) => ({
      tag: el.tagName.toLowerCase(), cls: el.className.toString().slice(0, 40),
      bg: getComputedStyle(el).backgroundColor, pos: getComputedStyle(el).position,
    })),
  };
});
console.log(JSON.stringify(info, null, 1));
await browser.close();
