/** Verifica rapida dei marcatori SEO nell'HTML generato in dist/. */
import { readFileSync } from 'node:fs';

const checks = [];
const page = (p) => readFileSync(`dist/${p}`, 'utf8');

const home = page('index.html');
checks.push(['home <title>', /<title>([^<]+)<\/title>/.exec(home)?.[1] ?? 'MANCANTE']);
checks.push(['home schema ExerciseGym', home.includes('"ExerciseGym"')]);
checks.push(['home canonical', home.includes('rel="canonical"')]);
checks.push(['home og:image', home.includes('og:image')]);
checks.push(['home aggregateRating', home.includes('aggregateRating')]);
checks.push(['home h1 unico', (home.match(/<h1/g) || []).length === 1]);

const prezzi = page('prezzi/index.html');
checks.push(['prezzi FAQPage schema', prezzi.includes('"FAQPage"')]);

const boxe = page('corsi/boxe/index.html');
checks.push(['boxe BreadcrumbList', boxe.includes('"BreadcrumbList"')]);
checks.push(['boxe <title>', /<title>([^<]+)<\/title>/.exec(boxe)?.[1] ?? 'MANCANTE']);

const sitemap = readFileSync('dist/sitemap-index.xml', 'utf8');
checks.push(['sitemap ok', sitemap.includes('sitemap-0.xml')]);

for (const [name, value] of checks) console.log(`${String(value === true ? '✓' : value === false ? '✗ FAIL' : value).padEnd(60)} ← ${name}`);
const failed = checks.some(([, v]) => v === false || v === 'MANCANTE');
process.exit(failed ? 1 : 0);
