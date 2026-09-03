/**
 * DATI DI FATTO della palestra — indipendenti dalla lingua.
 * I TESTI (descrizioni, regole, etichette) stanno in src/i18n/it.js e en.js.
 * Tutto ciò che è marcato [DA CONFERMARE] va verificato col cliente.
 */

export const gym = {
  name: 'Nonsolofitness Torvaianica',
  shortName: 'Nonsolofitness',
  // Ragione sociale (detta dal titolare): l'insegna e' "Non Solo Fitness",
  // ma l'attivita' e' registrata come California Fitness Torvaianica.
  // Confermato dal titolare (settembre 2026): NON e' un'attivita' commerciale,
  // e' un'A.S.D. (associazione sportiva dilettantistica). Quindi sul sito non
  // va la P.IVA ma il CODICE FISCALE dell'associazione.
  // [DA CHIEDERE a Davide] il C.F. esatto; e se l'ASD ha anche una P.IVA
  // (ce l'ha solo se fa attivita' commerciale) — in quel caso si mettono entrambi.
  legalName: 'A.S.D. California Fitness Torvaianica',
  foundingYear: 2021, // confermato dal titolare (settembre 2026)

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
  // WhatsApp reale del titolare, confermato ad agosto 2026.
  // Formato senza + né spazi, come vuole wa.me.
  whatsapp: '393477485951',
  whatsappDisplay: '+39 347 748 5951',

  /**
   * PREZZI NASCOSTI su richiesta del committente (agosto 2026).
   * false = la pagina /prezzi/ non viene generata, la voce sparisce da menu
   * e footer, i rimandi al listino puntano ai contatti e lo schema.org non
   * dichiara più la fascia di prezzo.
   * Per rimetterli online basta rimettere true: i dati del listino restano
   * qui sotto in `pricing`, intatti.
   */
  showPricing: false,
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
  // Apre la scheda nell'app di Google Maps (o sul web se l'app non c'è).
  // ATTENZIONE: va usato il formato ?cid=, NON ?q=place_id:… — quest'ultimo
  // funziona sul web ma l'app iOS lo cerca come se fosse testo e non trova
  // nulla (verificato su iPhone).
  googleMapsPlaceUrl: 'https://www.google.com/maps?cid=7776424977890128464',

  // Orari CONFERMATI dal committente (agosto 2026).
  // Formato 24h "HH:MM". closes null = chiuso.
  // L'etichetta dei giorni è tradotta (i18n → hours[i]).
  hours: [
    { dayNums: [1, 2, 3, 4, 5], opens: '08:00', closes: '22:30' },
    { dayNums: [6], opens: '09:00', closes: '19:00' },
    { dayNums: [0], opens: '09:00', closes: '13:00' },
  ],

  rating: { value: 4.5, count: 57 }, // Google Business Profile, luglio 2026

  // Nomi reali; ruoli e bio sono tradotti (i18n → team)
  owners: [{ id: 'davide', name: 'Davide' }, { id: 'dominica', name: 'Dominika' }],
  // Nomi reali dello staff, dettati dal titolare (settembre 2026).
  // [DA CONFERMARE] ruolo/qualifica di ognuno (chi segue sala, boxe, corsi?)
  // e le foto. placeholder: true = mostra "foto in arrivo".
  staff: [
    { id: 'alessandro', name: 'Alessandro', placeholder: true },
    { id: 'matia', name: 'Matia', placeholder: true },
    { id: 'shon', name: 'Shon', placeholder: true },
  ],

  // Valori numerici; etichette e suffissi sono tradotti (i18n → stats)
  stats: [
    { id: 'rating', value: 4.5, decimals: 1 },
    { id: 'days', value: 7 },
    { id: 'sea', value: 30 }, // confermato dal committente (agosto 2026)
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
  { slug: 'funzionale', accent: '#E8B620' },
  // Pilates e posturale confermati dal titolare (settembre 2026):
  // la palestra li fa eccome, con orari fissi.
  { slug: 'pilates', accent: '#3a86ff' },
  { slug: 'posturale', accent: '#2a9d8f' },
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
