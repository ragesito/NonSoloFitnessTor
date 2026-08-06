/** Cerca il link breve delle recensioni (g.page/r/.../review) nella scheda pubblica. */
import { chromium, devices } from 'playwright';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const ctx = await browser.newContext({ ...devices['Pixel 7'], locale: 'it-IT' });
await ctx.addCookies([
  { name: 'SOCS', value: 'CAISNQgQEitib3FfaWRlbnRpdHlmcm9udGVuZHVpc2VydmVyXzIwMjQwNDA5LjA2X3AwGgJpdCADGgYIgOa_sQY', domain: '.google.com', path: '/' },
]);
const page = await ctx.newPage();

const hits = new Set();
const scan = (txt, where) => {
  for (const m of txt.matchAll(/g\.page\/r\/[A-Za-z0-9_-]+\/review/g)) hits.add(`g.page  ${m[0]}  (${where})`);
  for (const m of txt.matchAll(/maps\.app\.goo\.gl\/[A-Za-z0-9]+/g)) hits.add(`short   ${m[0]}  (${where})`);
  for (const m of txt.matchAll(/writereview\?[^"'\\ ]{10,80}/g)) hits.add(`review  ${m[0]}  (${where})`);
};

page.on('response', async (r) => {
  scan(r.url(), 'url');
  const ct = r.headers()['content-type'] || '';
  if (/text|json|javascript/.test(ct)) {
    try { scan(await r.text(), 'body'); } catch {}
  }
});

for (const url of [
  'https://www.google.com/maps/place/?q=place_id:ChIJhZZNW6WVJRMRULKd7VBp62s',
  'https://maps.google.com/?cid=7776424977890128464',
]) {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(4000);
  scan(await page.content(), 'html');
}

console.log(hits.size ? [...hits].join('\n') : 'nessun link breve trovato nella scheda pubblica');
await browser.close();
