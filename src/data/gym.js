/**
 * DATI DI FATTO della palestra — indipendenti dalla lingua.
 * I TESTI (descrizioni, regole, etichette) stanno in src/i18n/it.js e en.js.
 * Tutto ciò che è marcato [DA CONFERMARE] va verificato col cliente.
 */

export const gym = {
  name: 'Nonsolofitness Torvaianica',
  shortName: 'Nonsolofitness',
  legalName: 'Non Solo Fitness Torvaianica', // [DA CONFERMARE] ragione sociale esatta
  foundingYear: 2018, // [DA CONFERMARE] anno di apertura reale

  address: {
    street: 'Viale Spagna, 62',
    city: 'Torvaianica',
    municipality: 'Pomezia',
    province: 'RM',
    region: 'Lazio',
    zip: '00040',
    country: 'IT',
  },

  // Coordinate approssimative di Viale Spagna 62, Torvaianica. [DA CONFERMARE]
  geo: { lat: 41.62249, lng: 12.46236 },

  phone: '+39 06 9337 7766',
  phoneHref: '+390693377766',
  // [DA CONFERMARE] numero WhatsApp reale (ora è il fisso della palestra)
  whatsapp: '390693377766',
  // Email reale fornita dal cliente (luglio 2026)
  email: 'californiafitnesstorvaianica@gmail.com',

  social: {
    instagram: 'https://www.instagram.com/nonsolofitness.torvaianica/',
    facebook: 'https://www.facebook.com/nonsolofitnesstorvaianica/',
  },

  // Scheda Google della palestra. Il Place ID è stato verificato: il CID
  // corrispondente (7776424977890128464) è lo stesso delle directory pubbliche.
  googlePlaceId: 'ChIJhZZNW6WVJRMRULKd7VBp62s',
  // Apre direttamente il riquadro "scrivi una recensione" — richiede però
  // di essere già loggati a Google NEL BROWSER.
  // [DA MIGLIORARE] Il link ufficiale del Profilo dell'attività
  // (https://g.page/r/.../review) apre invece l'APP di Google Maps, dove
  // l'utente è sempre loggato: chiederlo a Davide e sostituirlo qui.
  // I QR puntano al sito, quindi cambiarlo NON richiede di ristampare nulla.
  googleReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJhZZNW6WVJRMRULKd7VBp62s',
  // Ripiego: apre la scheda nell'app di Google Maps (o sul web se non c'è
  // l'app). Utile a chi nel browser non ha la sessione Google attiva.
  googleMapsPlaceUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJhZZNW6WVJRMRULKd7VBp62s',

  // [DA CONFERMARE] due fonti pubbliche discordano (8–23 tutti i giorni vs
  // orari ridotti nel weekend). Formato 24h "HH:MM". closes null = chiuso.
  // L'etichetta dei giorni è tradotta (i18n → hours[i]).
  hours: [
    { dayNums: [1, 2, 3, 4, 5], opens: '08:30', closes: '22:30' },
    { dayNums: [6], opens: '09:00', closes: '18:30' },
    { dayNums: [0], opens: '09:00', closes: '13:00' },
  ],

  rating: { value: 4.5, count: 57 }, // Google Business Profile, luglio 2026

  // Nomi reali; ruoli e bio sono tradotti (i18n → team)
  owners: [{ id: 'davide', name: 'Davide' }, { id: 'dominica', name: 'Dominica' }],
  // [DA CONFERMARE] staff tecnico reale: nomi, qualifiche, foto
  staff: [{ id: 'sala', placeholder: true }, { id: 'boxe', placeholder: true }, { id: 'corsi', placeholder: true }],

  // Valori numerici; etichette e suffissi sono tradotti (i18n → stats)
  stats: [
    { id: 'rating', value: 4.5, decimals: 1 },
    { id: 'days', value: 7 },
    { id: 'sea', value: 300 }, // [DA CONFERMARE] distanza reale dal mare
    { id: 'gear', value: 100 },
  ],
};

/** PREZZI reali — listino fornito dal cliente (luglio 2026). Testi in i18n. */
export const pricing = [
  { id: 'm1', price: 65, featured: false },
  { id: 'm3', price: 155, featured: true },
  { id: 'm6', price: 248, featured: false },
  { id: 'y1', price: 335, featured: false },
];

/** CORSI — slug e colore. Nomi e descrizioni in i18n. */
export const courses = [
  { slug: 'sala-pesi', accent: '#d90429' },
  { slug: 'boxe', accent: '#d90429' },
  { slug: 'pilates-yoga', accent: '#E8B620' },
  { slug: 'funzionale', accent: '#d90429' },
];

/**
 * RECENSIONI REALI dal profilo Google (luglio 2026).
 * I testi NON si traducono mai: sono parole degli utenti.
 * [DA VERIFICARE] copiare il testo originale esatto da Google.
 */
export const reviews = [
  {
    name: 'daniele danny',
    lang: 'it',
    guide: 74,
    text: 'Il meglio della zona, macchinari di ultima generazione, ampia e pulita, di primissimo livello.',
    stars: 5,
  },
  {
    name: 'Eszter Fenyvesi',
    lang: 'en',
    text: 'The gym is well equipped, you can find everything from strength training to cardio. They also offer classes. I went twice while on vacation and both occasions the staff very very friendly and professional.',
    stars: 5,
  },
  {
    name: 'Prin Cess',
    lang: 'it',
    guide: 397,
    text: 'Ampia e con tanta attrezzatura.',
    stars: 5,
  },
  {
    name: 'Giulia',
    lang: 'it',
    text: 'Che figata! Andateci.',
    stars: 5,
  },
];
