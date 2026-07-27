/** Verifica la struttura bilingue: rotte, hreflang, lang, contenuti tradotti. */
import { readFileSync, existsSync } from 'node:fs';

const read = (p) => readFileSync(`dist/${p}`, 'utf8');
let fails = 0;
const check = (name, cond, extra = '') => {
  if (!cond) fails++;
  console.log(`${cond ? '✓' : '✗ FAIL'} ${name}${extra ? ` — ${extra}` : ''}`);
};

// 1. tutte le rotte esistono nelle due lingue
const routes = ['index.html', 'prezzi/index.html', 'corsi/index.html', 'corsi/boxe/index.html',
  'chi-siamo/index.html', 'regolamento/index.html', 'contatti/index.html', 'privacy/index.html'];
for (const r of routes) {
  check(`IT /${r.replace('index.html', '')}`, existsSync(`dist/${r}`));
  check(`EN /en/${r.replace('index.html', '')}`, existsSync(`dist/en/${r}`));
}

// 2. attributo lang corretto
const it = read('index.html');
const en = read('en/index.html');
check('home IT lang="it"', /<html lang="it"/.test(it));
check('home EN lang="en"', /<html lang="en"/.test(en));

// 3. hreflang incrociati
check('IT ha hreflang en', it.includes('hreflang="en"') && it.includes('/en/'));
check('EN ha hreflang it', en.includes('hreflang="it"'));
check('x-default presente', it.includes('hreflang="x-default"'));

// 4. canonical distinti
const canon = (h) => /rel="canonical" href="([^"]+)"/.exec(h)?.[1];
check('canonical distinti', canon(it) !== canon(en), `${canon(it)} vs ${canon(en)}`);

// 5. contenuto davvero tradotto
check('EN home in inglese', en.includes('Open 7 days') || en.includes('days a week'));
check('IT home in italiano', it.includes('7 giorni su 7'));
check('EN nav tradotta', en.includes('Prices') && en.includes('About us'));
check('EN prezzi tradotti', read('en/prezzi/index.html').includes('3 Months'));
check('EN regolamento tradotto', read('en/regolamento/index.html').includes('Towel required'));
check('EN corso boxe tradotto', read('en/corsi/boxe/index.html').includes('Boxing'));
check('EN privacy tradotta', read('en/privacy/index.html').includes('Data controller'));

// 6. link interni della versione EN puntano a /en/
const enLinks = [...en.matchAll(/href="(\/[^"]*)"/g)].map((m) => m[1])
  .filter((h) => !h.startsWith('/en/') && !h.startsWith('/_astro') && !h.startsWith('/media')
    && !['/favicon.svg', '/sitemap-index.xml', '/og.jpg', '/'].includes(h));
check('EN: nessun link che esce dalla versione inglese', enLinks.length === 0, enLinks.join(' '));

// 7. selettore lingua presente
check('selettore lingua IT→EN', it.includes('lang-switch') && it.includes('href="/en/"'));
check('selettore lingua EN→IT', en.includes('lang-switch') && en.includes('href="/"'));

// 8. schema.org localizzato
check('schema EN in inglese', en.includes('"ExerciseGym"') && en.includes('Gym in Torvaianica'));

// 9. sitemap contiene entrambe
const sm = read('sitemap-0.xml');
check('sitemap con /en/', sm.includes('/en/prezzi/') && sm.includes('/prezzi/'));

console.log(fails ? `\n${fails} problemi` : '\n✓ Sito bilingue verificato.');
process.exit(fails ? 1 : 0);
