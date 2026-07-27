# Nonsolofitness Torvaianica — sito web

Sito statico premium (Astro + GSAP): niente backend, niente database, SEO locale completo.

## Comandi

```bash
npm install        # prima volta
npm run dev        # sviluppo → http://localhost:4321
npm run build      # produzione → cartella dist/
npm run preview    # anteprima della build
node scripts/make-og.mjs      # rigenera l'immagine social og.jpg
node scripts/screenshots.mjs . # screenshot automatici (serve `npm run preview` attivo)
```

## ⚠️ DATI DA CONFERMARE COL CLIENTE

Tutto il contenuto vive in **`src/data/gym.js`** (un solo file). Cerca `DA CONFERMARE`
nel progetto per l'elenco completo. In ordine di importanza:

| Dato | Stato attuale | Dove |
|---|---|---|
| **Prezzi** | INVENTATI (struttura realistica) | `gym.js` → `pricing` |
| **Orari** | Fonti pubbliche discordanti | `gym.js` → `gym.hours` |
| **Recensioni** | Riscritte dai temi reali di Google — sostituire con testi originali | `gym.js` → `reviews` |
| **Email** | Segnaposto | `gym.js` → `gym.email` |
| **Numero WhatsApp** | Ora punta al fisso | `gym.js` → `gym.whatsapp` |
| **Staff** | Solo Davide e Dominica (nomi reali), resto segnaposto | `gym.js` → `staff` |
| **Anno di fondazione / storia** | Ipotesi | `gym.js` → `foundingYear`, `timeline` |
| **Orari dei corsi** | Segnaposto | `gym.js` → `courses[].schedule` |
| **Regolamento** | Bozza standard da validare | `gym.js` → `rules` |
| **P.IVA** | Mancante | `src/components/Footer.astro` |
| **Dominio** | Ipotizzato `nonsolofitnesstorvaianica.it` | `astro.config.mjs` (una riga) |
| **Foto reali** | Segnaposto SVG con etichetta "FOTO REALE IN ARRIVO" | hero, sala pesi, team |

### Modulo di contatto (senza backend)
1. Creare account gratuito su [formspree.io](https://formspree.io) con l'email della palestra.
2. Copiare l'ID del form e sostituire `TUO_ID_FORMSPREE` in `src/pages/contatti.astro`.
Fino ad allora WhatsApp, telefono ed email funzionano comunque.

## Deploy (gratis)

**Netlify / Cloudflare Pages**: collegare il repo → build command `npm run build`,
output `dist/`. HTTPS automatico. Aggiungere gli header di sicurezza creando
`public/_headers`:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

## SEO — cosa c'è già e cosa deve fare il cliente

Già nel codice: meta + Open Graph per pagina, canonical, sitemap automatica,
robots.txt, schema.org `ExerciseGym` (orari, geo, rating), `FAQPage` su /prezzi,
breadcrumb sui corsi, pagina dedicata per ogni corso ("corso boxe Torvaianica" ecc.),
font self-hosted, zero richieste esterne.

Il cliente deve (gratis, fondamentale per il locale):
1. **Google Business Profile**: reclamare la scheda, inserire il sito, foto, orari.
2. Verificare il dominio su **Google Search Console** e inviare la sitemap.
3. Mettere il link al sito nelle bio di Instagram e Facebook.

## Struttura

```
src/data/gym.js        ← TUTTI i contenuti (unica fonte di verità)
src/layouts/Base.astro ← SEO, schema.org, meta
src/scripts/main.js    ← animazioni GSAP
src/styles/global.css  ← design system
src/pages/             ← home, corsi (+4 schede), prezzi, chi-siamo, regolamento, contatti, 404
```
