/** Tutti i testi del sito in italiano. Struttura gemella di en.js. */
export default {
  code: 'it',
  htmlLang: 'it',
  label: 'Italiano',
  switchTo: 'English',
  switchToShort: 'EN',

  nav: {
    corsi: 'Corsi',
    prezzi: 'Prezzi',
    'chi-siamo': 'Chi siamo',
    regolamento: 'Regolamento',
    contatti: 'Contatti',
  },

  common: {
    ctaTry: 'Prova la palestra',
    ctaCourses: 'Scopri i corsi',
    ctaInfo: 'Chiedi info',
    ctaWhatsapp: 'Scrivici su WhatsApp',
    ctaDirections: 'Portami lì',
    ctaSignup: 'Iscriviti',
    ctaHome: 'Torna alla home',
    ctaContact: 'Contattaci',
    openMenu: 'Apri il menu',
    closeMenu: 'Chiudi il menu',
    skipToContent: 'Vai al contenuto',
    mainNav: 'Navigazione principale',
    mobileNav: 'Navigazione mobile',
    homeLabel: 'home',
    openNow: (h) => `Aperto adesso · fino alle ${h}`,
    closedNow: 'Chiuso adesso · riapre presto',
    checkingHours: 'Controllo orari…',
    today: '· oggi',
    ratingChip: (v, c) => `${v} su Google · ${c} recensioni`,
    whatsappMessage: 'Ciao! Vorrei informazioni sugli abbonamenti e i corsi.',
    whatsappCourse: (c) => `Ciao! Vorrei informazioni sul corso di ${c}.`,
    photoComing: 'FOTO REALE IN ARRIVO',
  },

  hours: ['Lunedì – Venerdì', 'Sabato', 'Domenica'],

  stats: {
    rating: { suffix: '/5', label: 'valutazione su Google' },
    days: { suffix: 'su7', label: 'giorni aperti a settimana' },
    sea: { suffix: 'm', label: 'dal mare di Torvaianica' },
    gear: { suffix: '%', label: 'macchinari di ultima generazione' },
  },

  home: {
    seoTitle: 'Nonsolofitness Torvaianica — Palestra, boxe e corsi a due passi dal mare',
    seoDesc:
      'Palestra a Torvaianica (Pomezia) in Viale Spagna 62: sala pesi con macchinari di ultima generazione, corsi di boxe, pilates e allenamento funzionale. Aperta 7 giorni su 7. ⭐ 4,5 su Google.',
    heroEyebrow: 'Viale Spagna 62 · Torvaianica · a 300 m dal mare',
    heroSub: 'Sala pesi di ultima generazione, boxe, pilates e corsi che sembrano una festa. La palestra di Davide e Dominica, aperta',
    heroSubStrong: '7 giorni su 7',
    heroSrOnly: '— palestra a Torvaianica, Pomezia',
    stampText: 'PALESTRA A TORVAIANICA · APERTI 7 GIORNI SU 7 ·',
    marquee: ['Sala pesi', 'Boxe', 'Pilates', 'Funzionale', 'Aperti 7 su 7'],
    marqueeEnd: ['Prova la palestra', 'Aperti 7 su 7', 'Viale Spagna 62', '4,5 su Google'],

    s1Kicker: 'La palestra',
    s1Title: 'Il livello di una palestra di città. <span class="o">Sotto casa.</span>',
    s1Body:
      'Niente catene anonime, niente abbonamenti-trappola. Una sala ampia e pulita, macchinari di ultima generazione e due titolari che ti chiamano per nome dal secondo giorno. A Torvaianica, dove dopo l’allenamento c’è il mare.',
    s1Link: 'La nostra storia →',
    s1PhotoAlt: 'La sala pesi di Nonsolofitness Torvaianica illuminata dai neon rossi, con macchinari isotonici e panche',

    s2Kicker: 'Corsi & sala',
    s2Title: 'Scegli il tuo <em class="it ac">round</em>',
    s2Note: 'Dai 3 mesi in su, tutti i corsi sono inclusi nella quota.',
    s2NoteLink: 'Vedi i prezzi',

    s3Kicker: 'Sala pesi',
    s3Title: 'Ghisa seria, <span class="o">zero attese</span>',
    s3Body:
      'Macchinari di ultima generazione, area bilancieri, ghisa libera e uno spazio pensato per allenarsi davvero anche nelle ore di punta. Scheda personalizzata all’iscrizione e istruttori sempre presenti in sala.',
    s3List: [
      'Scheda personalizzata inclusa in ogni abbonamento',
      'Istruttori in sala in tutti gli orari di apertura',
      'Orario continuato: vieni quando vuoi, anche domenica',
    ],
    s3Cta: 'La sala pesi',
    s3VideoAlt: 'Video della sala pesi di Nonsolofitness Torvaianica',

    s4Kicker: 'Dicono di noi',
    s4Title: 'Parola di <span class="o">quartiere</span>',
    s4Sub: (c) => `${c} recensioni su Google`,
    s4Note: 'Recensioni verificate sul',
    s4NoteLink: 'profilo Google della palestra',
    reviewGuide: (n) => `Local Guide · ${n} recensioni`,
    reviewPlain: 'Recensione Google',
    reviewEn: 'Recensione originale in inglese',
    starsLabel: (n) => `${n} stelle su 5`,

    s5Kicker: 'Orari',
    s5Title: 'Aperti quando <span class="o o--ac">serve a te</span>',
    s5Note: 'Festivi con orario ridotto: controlla Instagram per gli aggiornamenti.',

    s6Kicker: 'Dove siamo',
    s6Title: 'Dietro al mare<span class="ac">.</span>',
    s6Body: '— sul viale principale, con parcheggio e ingresso accessibili.',
    mapLoad: 'Carica la mappa',
    mapNote: 'Caricandola accetti i cookie di Google Maps.',
    mapPrivacy: 'Privacy',
    mapTitle: 'Mappa Google',
  },

  courses: {
    seoTitle: 'Corsi: boxe, pilates, funzionale e sala pesi',
    seoDesc:
      'I corsi della palestra Nonsolofitness a Torvaianica: boxe e prepugilistica, pilates e posturale, allenamento funzionale e sala pesi. Tutti inclusi nella quota di abbonamento.',
    kicker: 'Corsi & attività',
    ghost: 'CORSI',
    title: 'Un nome, un <em class="it o">programma</em>',
    intro:
      'Si chiama <strong>Non solo fitness</strong> per un motivo: qui la sala pesi è il punto di partenza, non il punto di arrivo. Quattro corsi, un solo abbonamento, zero costi extra.',
    discover: 'Scopri →',
    labelBrief: 'In breve',
    labelLevel: 'Livello',
    labelWhen: 'Quando',
    labelWhere: 'Dove',
    labelIncluded: 'Incluso in',
    includedIn: 'Abbonamento da 3 mesi',
    detailTitle: 'Com’è il corso',
    detailNote: 'Prima lezione su prenotazione: scrivici su WhatsApp o passa in reception.',
    related: 'Potrebbe piacerti anche',
    seoDetail: (name, kicker, tagline, level) =>
      `${tagline} Corso di ${name.toLowerCase()} alla palestra Nonsolofitness di Torvaianica (Pomezia), Viale Spagna 62. ${level}.`,
  },

  courseData: {
    'sala-pesi': {
      name: 'Sala pesi',
      kicker: 'Body building & strength',
      tagline: 'Il cuore della palestra: macchinari di ultima generazione, bilancieri e zero attese.',
      description:
        'Una sala ampia, pulita e attrezzata con macchinari di ultima generazione per body building, powerlifting e ricomposizione corporea. Scheda personalizzata all’iscrizione e istruttori sempre presenti in sala: qui non ti alleni mai da solo, nemmeno quando ti alleni da solo.',
      bullets: ['Scheda personalizzata inclusa', 'Istruttori sempre in sala', 'Area bilancieri e ghisa libera', 'Cardio con vista sul viale'],
      schedule: 'Accesso libero in tutti gli orari di apertura',
      level: 'Tutti i livelli',
    },
    boxe: {
      name: 'Boxe',
      kicker: 'Prepugilistica',
      tagline: 'Guantoni, sacco e fiato corto. Il corso che ti rimette in pace col mondo.',
      description:
        'Corso di prepugilistica per tutti i livelli: tecnica di base, sacco, colpitori e preparazione atletica da ring, senza contatto obbligatorio. Bruci fino a 800 kcal a lezione e impari a muoverti come un pugile. Il corso più richiesto da chi vuole scaricare la giornata.',
      bullets: ['Tecnica + preparazione atletica', 'Nessun contatto obbligatorio', 'Fino a 800 kcal a lezione', 'Dal principiante all’agonista'],
      schedule: 'Lun · Mer · Ven, fascia serale [orari da confermare]',
      level: 'Tutti i livelli',
    },
    'pilates-yoga': {
      name: 'Pilates & Posturale',
      kicker: 'Corpo & respiro',
      tagline: 'Schiena nuova, spalle giù dalle orecchie. Lento fuori, fortissimo dentro.',
      description:
        'Lezioni di pilates matwork e ginnastica posturale in piccoli gruppi: mobilità, core e respirazione per chi passa troppe ore seduto o vuole compensare il lavoro pesante in sala. L’ora più silenziosa e più difficile della settimana.',
      bullets: ['Piccoli gruppi, seguiti davvero', 'Ideale per mal di schiena da scrivania', 'Complementare alla sala pesi', 'Tappetini e props inclusi'],
      schedule: 'Mar · Gio, mattina e sera [orari da confermare]',
      level: 'Tutti i livelli',
    },
    funzionale: {
      name: 'Allenamento funzionale',
      kicker: 'Functional training',
      tagline: 'Kettlebell, corpo libero e circuiti. Sudi in compagnia, migliori sul serio.',
      description:
        'Circuiti ad alta intensità con kettlebell, sbarre, anelli e corpo libero. Forza, resistenza e mobilità in un’unica ora, con progressioni scalabili per ogni livello: il principiante e l’atleta fanno lo stesso workout, a intensità diverse.',
      bullets: ['Circuiti sempre diversi', 'Scalabile su ogni livello', 'Forza + fiato + mobilità', 'Gruppo che spinge forte'],
      schedule: 'Lun – Ven, più fasce orarie [da confermare]',
      level: 'Tutti i livelli',
    },
  },

  prices: {
    seoTitle: 'Prezzi e abbonamenti',
    seoDesc:
      'Prezzi e abbonamenti della palestra Nonsolofitness di Torvaianica: da 65€ al mese, 155€ per 3 mesi, 248€ per 6 mesi e 335€ l’anno con tutti i corsi inclusi. Senza costi nascosti.',
    kicker: 'Listino chiaro, zero sorprese',
    ghost: 'PREZZI',
    title: 'Quanto <em class="it o">costa</em>?',
    note: 'Listino aggiornato disponibile in reception · Convenzioni e promo stagionali sui nostri',
    noteLink: 'canali social',
    faqKicker: 'Domande frequenti',
    faqTitle: 'Prima di <span class="o">iscriverti</span>',
    faqCta: 'Altri dubbi?',
    faqCtaBtn: 'Chiedici su WhatsApp',
    plans: {
      m1: { name: '1 Mese', period: 'al mese', features: ['Accesso sala pesi', 'Spogliatoi e docce', '1 corso a scelta'] },
      m3: { name: '3 Mesi', period: 'ogni 3 mesi', badge: 'Il più scelto', features: ['Accesso illimitato', 'Tutti i corsi inclusi', 'Consulenza iniziale', 'Spogliatoi e docce'] },
      m6: { name: '6 Mesi', period: 'ogni 6 mesi', features: ['Accesso illimitato', 'Tutti i corsi inclusi', 'Consulenza inclusa', 'Spogliatoi e docce', 'Priorità prenotazioni'] },
      y1: { name: 'Annuale', period: 'all’anno · €27,90 al mese', features: ['Accesso illimitato', 'Tutti i corsi inclusi', 'Personal training incluso', 'Priorità prenotazioni', 'Miglior prezzo garantito'] },
    },
    faqs: [
      {
        q: 'I corsi sono inclusi nell’abbonamento?',
        a: 'Sì: dai 3 mesi in su la quota comprende tutti i servizi e tutti i corsi — boxe, pilates e posturale, allenamento funzionale — senza costi aggiuntivi. L’abbonamento da 1 mese include un corso a scelta.',
      },
      {
        q: 'Posso sospendere l’abbonamento?',
        a: 'Sì, fino a un massimo di 3 mesi presentando un certificato medico che attesti l’impossibilità di allenarsi. Chi ha l’abbonamento annuale può sospendere un solo mese, avvisando prima dell’inizio dello stesso.',
      },
      {
        q: 'Posso cedere il mio abbonamento a qualcun altro?',
        a: 'Sì, ma solo a una persona non ancora iscritta in palestra. Non è invece possibile richiedere il rimborso delle somme versate.',
      },
      {
        q: 'Posso provare la palestra prima di iscrivermi?',
        a: 'Certo: passa in Viale Spagna 62 o scrivici su WhatsApp per fissare una prova. Ti facciamo vedere la sala e ti consigliamo il percorso giusto.',
      },
    ],
  },

  about: {
    seoTitle: 'Chi siamo — la storia di Davide e Dominica',
    seoDesc:
      'La storia di Nonsolofitness Torvaianica: la palestra di Davide e Dominica in Viale Spagna 62, nata per portare a Torvaianica una sala seria e un ambiente di famiglia. Aperta 7 giorni su 7.',
    kicker: 'La nostra storia',
    ghost: 'FAMIGLIA',
    title: 'Qui nessuno è un <em class="it o">numero</em>',
    s1Kicker: 'Da dove veniamo',
    s1Title: 'Una palestra <span class="o">di coppia</span>, nel senso buono',
    s1Body:
      'Nonsolofitness nasce dall’idea di Davide e Dominica: portare a Torvaianica una palestra con l’attrezzatura delle grandi catene e l’accoglienza di casa. Il risultato è un posto dove ti chiamano per nome, la sala è sempre in ordine e la domenica mattina trovi la stessa energia del lunedì sera.',
    s2Kicker: 'Chi trovi in sala',
    s2Title: 'Il <span class="o">team</span>',
    s2Note: (addr, city) => `Ti aspettiamo in sala: ${addr}, ${city}. Aperti 7 giorni su 7.`,
    s3Kicker: 'In cosa crediamo',
    values: [
      ['Serietà senza musi lunghi', 'Programmi veri, schede vere, risultati veri. Ma se non si ride almeno una volta ad allenamento, qualcosa non va.'],
      ['Pulizia maniacale', 'La recensione che torna più spesso non parla di bicipiti: parla di quanto è pulita la sala. Ne andiamo fieri.'],
      ['Porte aperte, sempre', '7 giorni su 7, orario continuato. La costanza è più facile quando la palestra si adatta alla tua vita, non il contrario.'],
    ],
    timeline: [
      { year: 'L’idea', text: 'Davide e Dominica immaginano una palestra diversa per Torvaianica: seria come un centro di città, accogliente come una casa.' },
      { year: 'L’apertura', text: 'Nasce Nonsolofitness in Viale Spagna 62, negli spazi di un ex ristorante completamente trasformato. [anno da confermare]' },
      { year: 'La crescita', text: 'Arrivano i corsi: prepugilistica, pilates e posturale, allenamento funzionale. Il nome diventa un programma.' },
      { year: 'Oggi', text: 'Una community che si allena 7 giorni su 7, 4,5 stelle su Google e la stessa regola del primo giorno: qui nessuno è un numero.' },
    ],
    team: {
      davide: { role: 'Titolare · Sala pesi', bio: 'Fondatore della palestra. In sala tutti i giorni: programmazione, tecnica e quella parola in più quando serve.' },
      dominica: { role: 'Titolare · Accoglienza & corsi', bio: 'L’anima dell’accoglienza. Gestisce corsi, iscrizioni e fa in modo che nessuno resti mai un numero.' },
      sala: { name: 'Istruttore sala pesi', role: 'Body building & powerlifting', bio: 'Segnaposto: nome, qualifica e foto da inserire.' },
      boxe: { name: 'Maestro di boxe', role: 'Prepugilistica', bio: 'Segnaposto: nome, qualifica e foto da inserire.' },
      corsi: { name: 'Insegnante corsi', role: 'Pilates & posturale', bio: 'Segnaposto: nome, qualifica e foto da inserire.' },
    },
  },

  rules: {
    seoTitle: 'Regolamento della palestra',
    seoDesc:
      'Il regolamento di Nonsolofitness Torvaianica: scarpe dedicate, asciugamano obbligatorio, sospensioni e cessione abbonamento. Poche regole di buon senso per allenarsi bene tutti.',
    kicker: 'Poche regole, tutte di buon senso',
    ghost: 'REGOLE',
    title: 'Il <em class="it o">patto</em> di sala',
    intro:
      'Dieci regole in tutto. Non per burocrazia: perché una sala dove tutti rispettano spazi, attrezzi e persone è una sala dove ci si allena meglio.',
    foot: '<strong>Il resto è una regola sola:</strong> trattare la palestra come casa tua e chi si allena accanto a te come un ospite. Per tutto il resto ci sono Davide e Dominica in reception.',
    list: [
      { title: 'Scarpe dedicate', text: 'È obbligatorio usare scarpe riservate esclusivamente alla palestra, non utilizzate all’esterno.' },
      { title: 'Asciugamano obbligatorio', text: 'È obbligatorio stendere un asciugamano sopra i macchinari prima di utilizzarli.' },
      { title: 'Mai scalzi', text: 'È vietato allenarsi scalzi o con le ciabatte.' },
      { title: 'Abbonamento valido', text: 'È vietato entrare con l’abbonamento scaduto.' },
      { title: 'Cessione abbonamento', text: 'È possibile cedere il proprio abbonamento solo a una persona non ancora iscritta.' },
      { title: 'Sospensione per motivi di salute', text: 'L’abbonamento si può sospendere per un massimo di 3 mesi, presentando un certificato medico in cui il dottore dichiara che per motivi di salute l’atleta non può allenarsi per tutto il periodo richiesto.' },
      { title: 'Sospensione abbonamento annuale', text: 'Chi ha l’abbonamento annuale può sospendere un solo mese, avvisando prima dell’inizio dello stesso.' },
      { title: 'Nessun rimborso', text: 'Non è possibile richiedere il rimborso delle somme versate.' },
      { title: 'Lucchetti degli armadietti', text: 'È vietato lasciare il lucchetto sull’armadietto fuori dall’orario di apertura: i lucchetti trovati alla chiusura verranno rimossi.' },
      { title: 'Cosa comprende la quota', text: 'La quota d’ingresso comprende tutti i servizi e i corsi. La programmazione dei corsi può subire variazioni, cambi d’orario o fermi tecnici a totale discrezione della direzione.' },
    ],
  },

  contact: {
    seoTitle: 'Contatti — telefono, WhatsApp e come raggiungerci',
    seoDesc:
      'Contatta la palestra Nonsolofitness di Torvaianica: telefono 06 9337 7766, WhatsApp, email e modulo di contatto. Viale Spagna 62, aperti 7 giorni su 7.',
    kicker: 'Rispondiamo in fretta, promesso',
    ghost: 'CIAO!',
    title: 'Parliamo<span class="ac">?</span>',
    fastest: 'Il canale <span class="o">più veloce</span>',
    waLabel: 'WhatsApp — il preferito',
    waValue: 'Scrivici ora',
    waHint: 'Risposta in giornata, spesso in minuti',
    phoneLabel: 'Telefono',
    phoneHint: 'Negli orari di apertura',
    emailLabel: 'Email',
    emailHint: 'Per convenzioni, aziende e collaborazioni',
    followUs: 'Seguici',
    whereWeAre: 'Dove siamo',
    formKicker: 'Oppure scrivici da qui',
    fName: 'Nome',
    fNamePh: 'Il tuo nome',
    fContact: 'Email o telefono',
    fContactPh: 'Dove possiamo risponderti',
    fTopic: 'Ti interessa',
    fTopics: ['Abbonamento sala pesi', 'Corso di boxe', 'Pilates / posturale', 'Funzionale', 'Altro'],
    fMsg: 'Messaggio',
    fMsgPh: 'Ciao! Vorrei sapere…',
    fHoneypot: 'Non compilare questo campo',
    fSubmit: 'Invia il messaggio',
    fPrivacy: 'Inviando accetti che i tuoi dati vengano usati solo per risponderti. Niente newsletter a tradimento.',
    fSubject: 'Nuovo contatto dal sito Nonsolofitness',
  },

  footer: {
    kicker: 'Ci alleniamo anche domenica. Tu?',
    headline: 'Ci vediamo <em class="it o">in sala</em><span class="ac">.</span>',
    sub: '— a due passi dal mare. Passa quando vuoi: la prima chiacchierata non impegna.',
    hours: 'Orari',
    hoursNote: 'Festivi con orario ridotto · aggiornamenti su Instagram',
    where: 'Dove siamo',
    maps: 'Apri in Google Maps',
    contacts: 'Contatti',
    pages: 'Pagine',
    follow: 'Seguici',
    socialNote: 'Promo e aggiornamenti passano prima dai social.',
    privacy: 'Privacy & cookie',
    backTop: 'Torna su ↑',
    backTopLabel: 'Torna all’inizio della pagina',
  },

  notFound: {
    seoTitle: 'Pagina non trovata',
    seoDesc: 'La pagina che cerchi non esiste. Torna alla home di Nonsolofitness Torvaianica.',
    title: 'Hai sbagliato esercizio',
    body: 'Questa pagina non esiste — capita anche ai migliori di sbagliare macchinario. Riparti dalla home o vieni direttamente in sala.',
  },

  privacy: {
    seoTitle: 'Privacy e cookie policy',
    seoDesc:
      'Informativa privacy e cookie policy di Nonsolofitness Torvaianica: quali dati raccogliamo dal modulo di contatto, perché, per quanto tempo e come esercitare i tuoi diritti.',
    updatedLabel: 'Ultimo aggiornamento',
    updated: '27 luglio 2026',
    ghost: 'PRIVACY',
    title: 'Privacy &amp; <em class="it o">cookie</em>',
    index: 'In questa pagina',
    intro: 'Trattiamo i tuoi dati con lo stesso criterio con cui gestiamo la palestra: il minimo indispensabile, spiegato in modo che si capisca.',
    sections: [
      {
        id: 'titolare',
        title: 'Titolare del trattamento',
        body: [
          '{{LEGAL}} — {{ADDRESS}}, Italia.',
          'P.IVA: [DA COMPLETARE] · Legale rappresentante: [DA COMPLETARE].',
          'Per qualsiasi questione relativa ai tuoi dati puoi scrivere a {{EMAIL}} o telefonare al {{PHONE}}.',
        ],
      },
      {
        id: 'dati',
        title: 'Quali dati raccogliamo',
        body: [
          'Questo sito è un sito vetrina: non richiede registrazione, non crea account e non effettua vendite online.',
          'Raccogliamo dati personali solo quando sei tu a inviarli tramite il modulo di contatto: nome, indirizzo email o numero di telefono, il corso di interesse e il testo del messaggio.',
          'Se ci contatti via WhatsApp o telefono, il trattamento dei dati avviene secondo le condizioni del servizio che utilizzi e le normali regole di gestione di una richiesta commerciale.',
        ],
      },
      {
        id: 'finalita',
        title: 'Perché li trattiamo e per quanto tempo',
        body: [
          'Utilizziamo i dati del modulo esclusivamente per rispondere alla tua richiesta di informazioni. Non inviamo newsletter, non facciamo profilazione e non cediamo i dati a terzi per finalità di marketing.',
          'La base giuridica del trattamento è l’esecuzione di misure precontrattuali su tua richiesta (art. 6.1.b GDPR) e il nostro legittimo interesse a rispondere a chi ci contatta (art. 6.1.f GDPR).',
          'Conserviamo i messaggi ricevuti per il tempo necessario a gestire la richiesta e, comunque, non oltre 24 mesi, salvo che dal contatto nasca un rapporto contrattuale (iscrizione in palestra): in quel caso valgono i termini di conservazione previsti dagli obblighi fiscali e amministrativi.',
        ],
      },
      {
        id: 'destinatari',
        title: 'A chi vengono comunicati',
        body: ['I dati non vengono diffusi. Possono essere trattati, per nostro conto e in qualità di responsabili del trattamento, dai fornitori tecnici che rendono possibile il funzionamento del sito:'],
        list: [
          '<strong>Formspree</strong> — servizio che riceve il modulo di contatto e ce lo recapita via email. I dati transitano su server negli Stati Uniti, con le garanzie previste dagli artt. 44 e seguenti del GDPR.',
          '<strong>Fornitore di hosting</strong> — [DA COMPLETARE: Netlify / Cloudflare Pages], che ospita le pagine del sito e registra i normali log tecnici di accesso (indirizzo IP, data e ora, pagina richiesta) per finalità di sicurezza e diagnostica.',
          '<strong>Google Ireland Ltd.</strong> — solo se scegli di caricare la mappa interattiva presente sul sito (vedi la sezione Cookie).',
        ],
      },
      {
        id: 'cookie',
        title: 'Cookie',
        body: [
          '<strong>Questo sito non installa cookie di profilazione, non usa strumenti di analytics e non traccia la tua navigazione.</strong> Non trovi banner di consenso perché, di base, non c’è nulla per cui chiedertelo.',
          'L’unica eccezione riguarda la <strong>mappa di Google Maps</strong> nella sezione “Dove siamo” della home: non viene caricata automaticamente. Al suo posto trovi un’anteprima statica e un pulsante “Carica la mappa”. Solo se decidi di premerlo, la mappa viene caricata e Google può installare cookie tecnici e di profilazione secondo la propria informativa. È una tua scelta libera: se non premi il pulsante, nessun dato viene inviato a Google.',
          'Puoi in ogni momento eliminare i cookie eventualmente installati dalle impostazioni del tuo browser.',
        ],
      },
      {
        id: 'diritti',
        title: 'I tuoi diritti',
        body: [
          'In qualunque momento puoi chiederci l’accesso ai tuoi dati, la loro rettifica o cancellazione, la limitazione del trattamento, la portabilità, e puoi opporti al trattamento fondato sul legittimo interesse (artt. 15-22 GDPR).',
          'Per esercitare questi diritti è sufficiente scrivere a {{EMAIL}}: ti risponderemo entro 30 giorni.',
          'Se ritieni che il trattamento dei tuoi dati violi la normativa, hai diritto di proporre reclamo al Garante per la protezione dei dati personali (www.garanteprivacy.it).',
        ],
      },
      {
        id: 'minori',
        title: 'Minori',
        body: ['Il sito non è destinato a minori di 14 anni. Se un minore desidera iscriversi in palestra, la richiesta e il conferimento dei dati devono avvenire tramite un genitore o chi ne esercita la responsabilità genitoriale.'],
      },
      {
        id: 'modifiche',
        title: 'Modifiche a questa informativa',
        body: ['Possiamo aggiornare questa pagina per adeguarla a modifiche normative o a nuovi servizi attivati sul sito. La data di ultimo aggiornamento è sempre indicata in cima alla pagina.'],
      },
    ],
  },

  review: {
    seoTitle: 'Lascia una recensione',
    seoDesc:
      'Racconta com’è allenarsi da Nonsolofitness Torvaianica. Bastano due righe: la tua recensione su Google aiuta chi cerca una palestra in zona.',
    kicker: 'Due minuti, non di più',
    ghost: 'GRAZIE',
    title: 'Com’è andata<span class="ac">?</span>',
    intro:
      'La tua opinione è la cosa che aiuta di più chi sta cercando una palestra a Torvaianica. Non serve scrivere un tema: due righe sincere valgono più di mille parole.',
    promptLabel: 'Uno spunto, se non sai da dove partire',
    // Spunti che ruotano a ogni visita: NON sono testi da copiare (Google
    // vieta le recensioni preconfezionate), sono domande per far partire l'idea.
    prompts: [
      'Cosa ti ha colpito la prima volta che sei entrato?',
      'Come ti trovi con i macchinari e con la sala?',
      'C’è un corso che ti ha conquistato più degli altri?',
      'Com’è l’atmosfera quando ti alleni qui?',
      'Cosa diresti a un amico che cerca una palestra in zona?',
      'Come ti sei trovato con Davide e Dominica?',
      'Cosa ti fa tornare, invece di cambiare palestra?',
      'C’è un momento della tua settimana in palestra che aspetti?',
      'Cosa è cambiato da quando ti alleni qui?',
      'Cosa apprezzi degli orari e della pulizia?',
    ],
    newPrompt: 'Un altro spunto',
    cta: 'Lascia la recensione',
    ctaNote: 'Si apre Google Maps: tocca le stelle e scrivi con parole tue.',
    ctaApp: 'Oppure scrivi dal browser',
    honest: 'Scrivi quello che pensi davvero — anche se hai un consiglio da darci, ci serve più di un complimento.',
    backHome: 'Torna al sito',
  },

  schema: {
    description:
      'Palestra a Torvaianica (Pomezia): sala pesi con macchinari di ultima generazione, corsi di boxe, pilates e allenamento funzionale. Aperta 7 giorni su 7 in Viale Spagna 62.',
    wheelchair: 'Accesso per sedie a rotelle',
    parking: 'Parcheggio accessibile',
    breadcrumbHome: 'Home',
    breadcrumbCourses: 'Corsi',
  },
};
