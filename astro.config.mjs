import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Dominio confermato dal cliente. Se cambiasse, modificare SOLO questa riga:
// sitemap, canonical, Open Graph e schema.org si aggiornano da soli.
export default defineConfig({
  site: 'https://www.nonsolofitnesstorvaianica.com',
  integrations: [sitemap()],
  compressHTML: true,
});
