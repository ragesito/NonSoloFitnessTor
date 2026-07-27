/**
 * Genera public/og.jpg (1200x630) — l'immagine mostrata quando il sito
 * viene condiviso su WhatsApp/Facebook/Instagram.
 * Uso: node scripts/make-og.mjs
 * Da rigenerare quando ci sarà una foto reale della palestra.
 */
import sharp from 'sharp';

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <radialGradient id="glow" cx="88%" cy="0%" r="95%">
      <stop offset="0%" stop-color="#d90429" stop-opacity="0.55"/>
      <stop offset="55%" stop-color="#d90429" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#0d0d10" stop-opacity="0"/>
    </radialGradient>
    <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse">
      <circle cx="3" cy="3" r="1.8" fill="#f2eee5" opacity="0.07"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="#0d0d10"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect width="1200" height="630" fill="url(#dots)"/>
  <text x="76" y="150" font-family="Arial Black, Arial" font-weight="900" font-size="58" fill="#f2eee5" letter-spacing="1">NONSOLO<tspan fill="#d90429">✱</tspan>FITNESS</text>
  <text x="76" y="330" font-family="Arial Black, Arial" font-weight="900" font-size="128" fill="none" stroke="#f2eee5" stroke-width="3">PALESTRA A</text>
  <text x="76" y="470" font-family="Arial Black, Arial" font-weight="900" font-size="122" fill="#d90429">TORVAIANICA</text>
  <text x="78" y="560" font-family="Arial" font-size="34" fill="#f2eee5" opacity="0.85">Sala pesi · Boxe · Pilates · Funzionale — Viale Spagna 62, aperti 7 su 7</text>
</svg>`;

await sharp(Buffer.from(svg), { density: 150 })
  .resize(1200, 630)
  .jpeg({ quality: 88 })
  .toFile('public/og.jpg');

console.log('✓ public/og.jpg generata (1200x630)');
