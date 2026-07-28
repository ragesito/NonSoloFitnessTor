/** Misura i tempi di caricamento e le risorse più pesanti della home. */
import { chromium, devices } from 'playwright';

const url = process.argv[2] ?? 'http://localhost:4321/';
const throttle = process.argv[3] === 'slow';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const ctx = await browser.newContext({ ...devices['iPhone 13'] });
const page = await ctx.newPage();

if (throttle) {
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Network.enable');
  // 4G lento: 1,6 Mbps down, 150 ms RTT
  await cdp.send('Network.emulateNetworkConditions', {
    offline: false, downloadThroughput: (1.6 * 1024 * 1024) / 8,
    uploadThroughput: (750 * 1024) / 8, latency: 150,
  });
}

const res = [];
page.on('response', async (r) => {
  try {
    const len = Number(r.headers()['content-length'] || 0);
    res.push({ url: r.url().split('/').pop().slice(0, 40), type: r.request().resourceType(), kb: Math.round(len / 1024) });
  } catch {}
});

const t0 = Date.now();
await page.goto(url, { waitUntil: 'load', timeout: 60000 });
const loadMs = Date.now() - t0;

// attende che l'intro sia finita (la pagina è "usabile")
await page.waitForFunction(() => !document.getElementById('intro'), null, { timeout: 30000 }).catch(() => {});
const introDoneMs = Date.now() - t0;

const nav = await page.evaluate(() => {
  const n = performance.getEntriesByType('navigation')[0];
  const lcp = performance.getEntriesByType('largest-contentful-paint').pop();
  const fcp = performance.getEntriesByName('first-contentful-paint')[0];
  return {
    ttfb: Math.round(n.responseStart),
    domContentLoaded: Math.round(n.domContentLoadedEventEnd),
    load: Math.round(n.loadEventEnd),
    fcp: fcp ? Math.round(fcp.startTime) : null,
    lcp: lcp ? Math.round(lcp.startTime) : null,
  };
});

console.log(`rete: ${throttle ? '4G lento (1,6 Mbps)' : 'senza limiti'}`);
console.log(`TTFB ${nav.ttfb} ms | FCP ${nav.fcp} ms | LCP ${nav.lcp} ms`);
console.log(`DOMContentLoaded ${nav.domContentLoaded} ms | load ${nav.load} ms`);
console.log(`intro conclusa (pagina usabile): ${introDoneMs} ms\n`);

const top = res.filter((r) => r.kb > 20).sort((a, b) => b.kb - a.kb).slice(0, 12);
console.log('risorse più pesanti:');
for (const r of top) console.log(`  ${String(r.kb).padStart(5)} KB  ${r.type.padEnd(10)} ${r.url}`);
const total = res.reduce((s, r) => s + r.kb, 0);
console.log(`\ntotale scaricato: ${Math.round(total / 1024 * 10) / 10} MB su ${res.length} richieste`);

await browser.close();
