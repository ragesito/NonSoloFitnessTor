/**
 * Helper i18n. L'italiano vive nella radice (/), l'inglese sotto /en/.
 * Le pagine usano getStaticPaths con LANGS per generare entrambe le versioni
 * da un unico file .astro.
 */
import it from './it.js';
import en from './en.js';

export const DEFAULT_LANG = 'it';
export const dict = { it, en };

/**
 * Params per getStaticPaths: /pagina/ (it) e /en/pagina/ (en).
 * È una FUNZIONE: ogni route deve ricevere oggetti nuovi, altrimenti Astro
 * riusa (e svuota) lo stesso array e i props arrivano undefined.
 */
export const langPaths = () => [
  { params: { lang: undefined }, props: { lang: 'it' } },
  { params: { lang: 'en' }, props: { lang: 'en' } },
];

/** Dizionario della lingua richiesta (fallback: italiano) */
export function t(lang) {
  return dict[lang] ?? dict[DEFAULT_LANG];
}

/**
 * URL localizzata: path('en', '/prezzi/') → '/en/prezzi/'
 * path('it', '/prezzi/') → '/prezzi/'
 */
export function path(lang, p = '/') {
  const clean = p.startsWith('/') ? p : `/${p}`;
  return lang === DEFAULT_LANG ? clean : `/${lang}${clean}`;
}

/** Lingua a partire dal pathname (per i componenti condivisi) */
export function langFromUrl(url) {
  const [, first] = url.pathname.split('/');
  return first in dict ? first : DEFAULT_LANG;
}

/** Rimuove il prefisso di lingua: '/en/prezzi/' → '/prezzi/' */
export function stripLang(pathname) {
  const [, first, ...rest] = pathname.split('/');
  return first in dict && first !== DEFAULT_LANG ? `/${rest.join('/')}` : pathname;
}
