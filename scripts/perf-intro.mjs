/** Quando parte davvero l'intro e cosa la precede. */
import { chromium, devices } from 'playwright';

const url = process.argv[2] ?? 'http://localhost:4321/';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const ctx = await browser.newContext({ ...devices['iPhone 13'] });
const page = await ctx.newPage();
const cdp = await ctx.newCDPSession(page);
await cdp.send('Network.enable');
await cdp.send('Network.emulateNetworkConditions', {
  offline: false, downloadThroughput: (1.6 * 1024 * 1024) / 8,
  uploadThroughput: (750 * 1024) / 8, latency: 150,
});

await page.addInitScript(() => {
  window.__marks = {};
  document.addEventListener('astro:page-load', () => { window.__marks.pageLoad = performance.now(); });
  document.addEventListener('DOMContentLoaded', () => { window.__marks.dcl = performance.now(); });
  window.addEventListener('load', () => { window.__marks.load = performance.now(); });
  // primo fotogramma in cui il fulmine dell'intro è visibile (scala > 0)
  const iv = setInterval(() => {
    const b = document.querySelector('.intro__bolt');
    if (b && getComputedStyle(b).transform !== 'matrix(0, 0, 0, 0, 0, 0)' && !window.__marks.introMoving) {
      window.__marks.introMoving = performance.now();
      clearInterval(iv);
    }
    if (!document.getElementById('intro') && !window.__marks.introGone) {
      window.__marks.introGone = performance.now();
      clearInterval(iv);
    }
  }, 30);
});

const timings = [];
page.on('requestfinished', async (r) => {
  const t = r.timing();
  if (t && t.responseEnd > 0) {
    timings.push({ url: r.url().split('/').pop().slice(0, 34), end: Math.round(t.responseEnd), type: r.resourceType() });
  }
});

await page.goto(url, { waitUntil: 'load', timeout: 60000 });
await page.waitForFunction(() => window.__marks.introGone, null, { timeout: 30000 }).catch(() => {});
const m = await page.evaluate(() => window.__marks);

console.log('tappe (ms dal via):');
for (const [k, v] of Object.entries(m)) console.log(`  ${k.padEnd(12)} ${Math.round(v)}`);
console.log('\nrisorse finite prima del load:');
timings.filter((t) => t.end < (m.load ?? 9e9)).sort((a, b) => a.end - b.end)
  .forEach((t) => console.log(`  ${String(t.end).padStart(5)} ms  ${t.type.padEnd(10)} ${t.url}`));

await browser.close();
