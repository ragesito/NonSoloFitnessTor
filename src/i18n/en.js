/** All site copy in English. Mirror structure of it.js. */
export default {
  code: 'en',
  htmlLang: 'en',
  label: 'English',
  switchTo: 'Italiano',
  switchToShort: 'IT',

  nav: {
    corsi: 'Classes',
    prezzi: 'Prices',
    'chi-siamo': 'About us',
    regolamento: 'Gym rules',
    contatti: 'Contact',
  },

  common: {
    ctaTry: 'Try the gym',
    ctaCourses: 'See the classes',
    ctaInfo: 'Ask about it',
    ctaWhatsapp: 'Message us on WhatsApp',
    ctaDirections: 'Take me there',
    ctaSignup: 'Sign up',
    ctaHome: 'Back to home',
    ctaContact: 'Contact us',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    skipToContent: 'Skip to content',
    mainNav: 'Main navigation',
    mobileNav: 'Mobile navigation',
    homeLabel: 'home',
    openNow: (h) => `Open now · until ${h}`,
    closedNow: 'Closed now · opening again soon',
    checkingHours: 'Checking hours…',
    today: '· today',
    ratingChip: (v, c) => `${v} on Google · ${c} reviews`,
    whatsappMessage: 'Hi! I’d like some information about memberships and classes.',
    whatsappCourse: (c) => `Hi! I’d like some information about the ${c} class.`,
    photoComing: 'REAL PHOTO COMING SOON',
  },

  hours: ['Monday – Friday', 'Saturday', 'Sunday'],

  stats: {
    rating: { suffix: '/5', label: 'rating on Google' },
    days: { suffix: '/7', label: 'days open every week' },
    sea: { suffix: 'm', label: 'from Torvaianica beach' },
    gear: { suffix: '%', label: 'latest-generation equipment' },
  },

  home: {
    seoTitle: 'Nonsolofitness Torvaianica — Gym, boxing and classes steps from the sea',
    seoDesc:
      'Gym in Torvaianica (Pomezia), Viale Spagna 62: weight room with latest-generation equipment, boxing and functional training classes. Open 7 days a week. ⭐ 4.5 on Google.',
    heroEyebrow: 'Viale Spagna 62 · Torvaianica · 30 m from the beach',
    heroSub: 'A latest-generation weight room, boxing and classes that feel like a party. Davide and Dominika’s gym, open',
    heroSubStrong: '7 days a week',
    heroSrOnly: '— gym in Torvaianica, Pomezia',
    stampText: 'GYM IN TORVAIANICA · OPEN 7 DAYS A WEEK ·',
    marquee: ['Weight room', 'Boxing', 'Functional', 'Open 7 days'],
    marqueeEnd: ['Try the gym', 'Open 7 days', 'Viale Spagna 62', '4.5 on Google'],

    s1Kicker: 'The gym',
    s1Title: 'A big-city gym. <span class="o">Around the corner.</span>',
    s1Body:
      'A wide, spotless floor, latest-generation equipment and a place that feels like home from day one. In Torvaianica, where the sea is waiting right after your session.',
    s1Link: 'Our story →',
    s1PhotoAlt: 'The weight room at Nonsolofitness Torvaianica lit by red neon, with resistance machines and benches',

    s2Kicker: 'Classes & floor',
    s2Title: 'Pick your <em class="it ac">round</em>',
    s2Note: 'Every class is included in every membership.',
    s2NoteLink: 'See the prices',

    s3Kicker: 'Weight room',
    s3Title: 'Serious iron, <span class="o">no queues</span>',
    s3Body:
      'Latest-generation machines, a barbell area, free weights and a floor designed so you can actually train even at peak hours. A personalised programme when you join, and instructors always on the floor.',
    s3List: [
      'Personalised programme with every membership',
      'Instructors on the floor during all opening hours',
      'Non-stop hours: come when you want, Sundays included',
    ],
    s3Cta: 'The weight room',
    s3VideoAlt: 'Video of the weight room at Nonsolofitness Torvaianica',

    s4Kicker: 'What people say',
    s4Title: 'Word of the <span class="o">neighbourhood</span>',
    s4Sub: (c) => `${c} reviews on Google`,
    s4Note: 'Verified reviews on the',
    s4NoteLink: 'gym’s Google profile',
    reviewGuide: (n) => `Local Guide · ${n} reviews`,
    reviewPlain: 'Google review',
    reviewEn: 'Originally written in English',
    starsLabel: (n) => `${n} out of 5 stars`,

    s5Kicker: 'Opening hours',
    s5Title: 'Open when <span class="o o--ac">you need us</span>',
    s5Note: 'Reduced hours on public holidays: check Instagram for updates.',

    s6Kicker: 'Where we are',
    s6Title: 'Just behind the sea<span class="ac">.</span>',
    s6Body: '— on the main avenue, with accessible parking and entrance.',
    mapLoad: 'Load the map',
    mapNote: 'Loading it means accepting Google Maps cookies.',
    mapPrivacy: 'Privacy',
    mapTitle: 'Google map',
  },

  courses: {
    seoTitle: 'Classes: boxing, functional training and weight room',
    seoDesc:
      'Classes at Nonsolofitness gym in Torvaianica: boxing, functional training and the weight room. All included in your membership.',
    kicker: 'Classes & activities',
    ghost: 'CLASSES',
    title: 'A name that’s a <em class="it o">promise</em>',
    intro:
      'It’s called <strong>Non solo fitness</strong> — “not only fitness” — for a reason: here the weight room is the starting point, not the finish line. Three classes, one membership, no extra costs.',
    discover: 'Discover →',
    labelBrief: 'At a glance',
    labelLevel: 'Level',
    labelWhen: 'When',
    labelWhere: 'Where',
    labelIncluded: 'Included in',
    includedIn: 'Every membership',
    detailTitle: 'What the class is like',
    detailNote: 'First session by appointment: message us on WhatsApp or drop by the front desk.',
    related: 'You might also like',
    seoDetail: (name, kicker, tagline, level) =>
      `${tagline} ${name} classes at Nonsolofitness gym in Torvaianica (Pomezia), Viale Spagna 62. ${level}.`,
  },

  courseData: {
    'sala-pesi': {
      name: 'Weight room',
      kicker: 'Body building & strength',
      tagline: 'The heart of the gym: latest-generation machines, barbells and no waiting around.',
      description:
        'A wide, spotless floor fitted with latest-generation machines for body building, powerlifting and body recomposition. You get a personalised programme when you join and instructors are always on the floor: here you never really train alone, even when you train alone.',
      bullets: ['Personalised programme included', 'Instructors always on the floor', 'Barbell area and free weights', 'Cardio overlooking the avenue'],
      schedule: 'Free access during all opening hours',
      level: 'All levels',
    },
    boxe: {
      name: 'Boxing',
      kicker: 'Pre-boxing training',
      tagline: 'Gloves, heavy bag and no breath left. The class that makes peace with your day.',
      description:
        'Pre-boxing classes for every level: fundamentals, heavy bag, pad work and ring-style conditioning, with no obligatory contact. You can burn up to 800 kcal a session while learning to move like a boxer. The most requested class among people who need to shake off the day.',
      bullets: ['Technique + athletic conditioning', 'No obligatory contact', 'Up to 800 kcal per session', 'From beginner to competitor'],
      schedule: 'Mon · Wed · Fri, evenings [times to be confirmed]',
      level: 'All levels',
    },
    funzionale: {
      name: 'Functional training',
      kicker: 'Functional training',
      tagline: 'Kettlebells, bodyweight and circuits. You sweat in company, you improve for real.',
      description:
        'High-intensity circuits with kettlebells, bars, rings and bodyweight. Strength, endurance and mobility in a single hour, with progressions that scale to any level: the beginner and the athlete do the same workout at different intensities.',
      bullets: ['Circuits that never repeat', 'Scalable to any level', 'Strength + cardio + mobility', 'A group that pushes hard'],
      schedule: 'Mon – Fri, several time slots [to be confirmed]',
      level: 'All levels',
    },
  },

  prices: {
    seoTitle: 'Prices and memberships',
    seoDesc:
      'Prices and memberships at Nonsolofitness gym in Torvaianica: from €65 a month, €155 for 3 months, €248 for 6 months and €335 a year with every class included. No hidden costs.',
    kicker: 'Clear pricing, no surprises',
    ghost: 'PRICES',
    title: 'What does it <em class="it o">cost</em>?',
    note: 'Updated price list available at the front desk · Seasonal deals and partnerships on our',
    noteLink: 'social channels',
    faqKicker: 'Frequently asked',
    faqTitle: 'Before you <span class="o">join</span>',
    faqCta: 'Still unsure?',
    faqCtaBtn: 'Ask us on WhatsApp',
    // Confirmed by the client: EVERY membership includes everything.
    // The only difference is the monthly price, which drops with duration.
    plansNote: 'Every membership includes everything: floor, classes, programme. The only thing that changes is what you pay per month.',
    plans: {
      m1: { name: '1 Month', period: 'per month', features: ['Unlimited floor access', 'All classes included', 'Personalised programme', 'Changing rooms and showers'] },
      m3: { name: '3 Months', period: 'every 3 months · ≈ €51.70/month', badge: 'Most popular', features: ['Unlimited floor access', 'All classes included', 'Personalised programme', 'Changing rooms and showers'] },
      m6: { name: '6 Months', period: 'every 6 months · ≈ €41.30/month', features: ['Unlimited floor access', 'All classes included', 'Personalised programme', 'Changing rooms and showers'] },
      y1: { name: 'Annual', period: 'per year · ≈ €27.90/month', badge: 'Best price', features: ['Unlimited floor access', 'All classes included', 'Personalised programme', 'Changing rooms and showers'] },
    },
    faqs: [
      {
        q: 'Are classes included in the membership?',
        a: 'Yes, always: every membership — 1, 3, 6 or 12 months — covers every service and every class, at no extra cost. The longer plans simply cost less per month.',
      },
      {
        q: 'Can I suspend my membership?',
        a: 'Yes, for up to 3 months, by presenting a medical certificate stating that you are unable to train. Annual members can suspend one single month, letting us know before that month begins.',
      },
      {
        q: 'Can I transfer my membership to someone else?',
        a: 'Yes, but only to someone who is not already a member. Refunds of amounts already paid are not available.',
      },
      {
        q: 'Can I try the gym before joining?',
        a: 'Of course: drop by Viale Spagna 62 or message us on WhatsApp to arrange a trial. We’ll show you around and help you find the right path.',
      },
    ],
  },

  about: {
    seoTitle: 'About us — the story of Davide and Dominika',
    seoDesc:
      'The story of Nonsolofitness Torvaianica: Davide and Dominika’s gym in Viale Spagna 62, born to bring Torvaianica a serious training floor with a family feel. Open 7 days a week.',
    kicker: 'Our story',
    ghost: 'FAMILY',
    title: 'One gym, <em class="it o">one family</em>',
    s1Kicker: 'Where we come from',
    s1Title: 'A gym run <span class="o">by a couple</span>, in the best sense',
    s1Body:
      'Nonsolofitness grew out of one idea from Davide and Dominika: bring Torvaianica a gym with the equipment of the big chains and the welcome of a home. The result is a welcoming place where the floor is always in order and Sunday morning has the same energy as Monday night.',
    s2Kicker: 'Who you’ll meet',
    s2Title: 'The <span class="o">team</span>',
    s2Note: (addr, city) => `Come and see us: ${addr}, ${city}. Open 7 days a week.`,
    s3Kicker: 'What we believe in',
    values: [
      ['Serious, but never grim', 'Real programmes, real plans, real results. But if nobody laughs at least once per session, something is off.'],
      ['Obsessive cleanliness', 'The review that comes up most often isn’t about biceps: it’s about how clean the place is. We’re proud of that.'],
      ['Doors open, always', 'Seven days a week, non-stop hours. Consistency comes easier when the gym fits your life, not the other way round.'],
    ],
    timeline: [
      { year: 'The idea', text: 'Davide and Dominika picture a different gym for Torvaianica: as serious as a city club, as welcoming as a home.' },
      { year: 'The opening', text: 'Nonsolofitness opens at Viale Spagna 62, in a former restaurant transformed from top to bottom. [year to be confirmed]' },
      { year: 'Growing', text: 'The classes arrive: pre-boxing and functional training. The name becomes a statement.' },
      { year: 'Today', text: 'A community training 7 days a week, 4.5 stars on Google and the same energy as day one.' },
    ],
    team: {
      davide: { role: 'Owner · Weight room', bio: 'Founder of the gym. On the floor every day: programming, technique and that extra word when you need it.' },
      dominica: { role: 'Owner · Front desk & classes', bio: 'The soul of the welcome. She runs the classes and sign-ups with the same care for everyone.' },
      sala: { name: 'Weight room instructor', role: 'Body building & powerlifting', bio: 'Placeholder: name, qualifications and photo to be added.' },
      boxe: { name: 'Boxing coach', role: 'Pre-boxing training', bio: 'Placeholder: name, qualifications and photo to be added.' },
      corsi: { name: 'Class instructor', role: 'Group classes', bio: 'Placeholder: name, qualifications and photo to be added.' },
    },
  },

  rules: {
    seoTitle: 'Gym rules',
    seoDesc:
      'The rules at Nonsolofitness Torvaianica: indoor-only shoes, towel required, membership suspension and transfer. A few common-sense rules so everyone trains well.',
    kicker: 'A few rules, all common sense',
    ghost: 'RULES',
    title: 'The floor <em class="it o">agreement</em>',
    intro:
      'Ten rules in total. Not for the sake of bureaucracy: because a gym where everyone respects the space, the equipment and each other is a gym where everyone trains better.',
    foot: '<strong>The rest comes down to one rule:</strong> treat the gym like your own home and the person training next to you like a guest. For anything else, Davide and Dominika are at the front desk.',
    list: [
      { title: 'Indoor-only shoes', text: 'You must wear shoes used exclusively inside the gym, never worn outdoors.' },
      { title: 'Towel required', text: 'You must lay a towel over the machines before using them.' },
      { title: 'Never barefoot', text: 'Training barefoot or in flip-flops is not allowed.' },
      { title: 'Valid membership', text: 'Entering with an expired membership is not allowed.' },
      { title: 'Transferring a membership', text: 'You may transfer your membership only to someone who is not already a member.' },
      { title: 'Suspension on medical grounds', text: 'Memberships can be suspended for up to 3 months by presenting a medical certificate in which the doctor states that, for health reasons, the member cannot train for the whole period requested.' },
      { title: 'Suspending an annual membership', text: 'Annual members may suspend one single month, letting us know before that month begins.' },
      { title: 'No refunds', text: 'Refunds of amounts already paid cannot be requested.' },
      { title: 'Locker padlocks', text: 'Padlocks must not be left on lockers outside opening hours: any padlock found at closing time will be removed.' },
      { title: 'What the fee covers', text: 'The membership fee covers all services and all classes. Class scheduling may change, move or pause for technical reasons entirely at the management’s discretion.' },
    ],
  },

  contact: {
    seoTitle: 'Contact — phone, WhatsApp and how to find us',
    seoDesc:
      'Get in touch with Nonsolofitness gym in Torvaianica: phone 06 9337 7766, WhatsApp, email and contact form. Viale Spagna 62, open 7 days a week.',
    kicker: 'We reply fast, promise',
    ghost: 'HELLO!',
    title: 'Let’s talk<span class="ac">?</span>',
    fastest: 'The <span class="o">fastest</span> way',
    waLabel: 'WhatsApp — our favourite',
    waValue: 'Message us now',
    waHint: 'Same-day reply, often within minutes',
    phoneLabel: 'Phone',
    phoneHint: 'During opening hours',
    emailLabel: 'Email',
    emailHint: 'For partnerships, companies and collaborations',
    followUs: 'Follow us',
    whereWeAre: 'Where we are',
    formKicker: 'Or write to us here',
    fName: 'Name',
    fNamePh: 'Your name',
    fContact: 'Email or phone',
    fContactPh: 'Where we can reach you',
    fTopic: 'I’m interested in',
    fTopics: ['Weight room membership', 'Boxing class', 'Functional training', 'Something else'],
    fMsg: 'Message',
    fMsgPh: 'Hi! I’d like to know…',
    fHoneypot: 'Do not fill in this field',
    fSubmit: 'Send the message',
    fPrivacy: 'By sending this you agree that your details will be used only to reply to you. No sneaky newsletters.',
    fSubject: 'New contact from the Nonsolofitness website',
  },

  footer: {
    kicker: 'We train on Sundays too. Do you?',
    headline: 'See you <em class="it o">on the floor</em><span class="ac">.</span>',
    sub: '— a short walk from the sea. Drop in whenever you like: the first chat commits you to nothing.',
    hours: 'Opening hours',
    hoursNote: 'Reduced hours on public holidays · updates on Instagram',
    where: 'Where we are',
    maps: 'Open in Google Maps',
    contacts: 'Contact',
    pages: 'Pages',
    follow: 'Follow us',
    socialNote: 'Deals and updates land on social first.',
    privacy: 'Privacy & cookies',
    backTop: 'Back to top ↑',
    backTopLabel: 'Back to the top of the page',
  },

  notFound: {
    seoTitle: 'Page not found',
    seoDesc: 'The page you’re looking for doesn’t exist. Head back to the Nonsolofitness Torvaianica home page.',
    title: 'Wrong exercise',
    body: 'This page doesn’t exist — even the best of us grab the wrong machine sometimes. Start again from the home page, or just come and see us.',
  },

  privacy: {
    seoTitle: 'Privacy and cookie policy',
    seoDesc:
      'Privacy and cookie policy of Nonsolofitness Torvaianica: what data we collect through the contact form, why, for how long, and how to exercise your rights.',
    updatedLabel: 'Last updated',
    updated: '27 July 2026',
    ghost: 'PRIVACY',
    title: 'Privacy &amp; <em class="it o">cookies</em>',
    index: 'On this page',
    intro: 'We handle your data the same way we run the gym: the bare minimum, explained so it actually makes sense.',
    sections: [
      {
        id: 'titolare',
        title: 'Data controller',
        body: [
          '{{LEGAL}} — {{ADDRESS}}, Italy.',
          'VAT number: [TO BE COMPLETED] · Legal representative: [TO BE COMPLETED].',
          'For anything concerning your data you can write to {{EMAIL}} or call {{PHONE}}.',
        ],
      },
      {
        id: 'dati',
        title: 'What data we collect',
        body: [
          'This is a showcase website: it requires no registration, creates no accounts and sells nothing online.',
          'We collect personal data only when you send it yourself through the contact form: name, email address or phone number, the class you are interested in and the text of your message.',
          'If you contact us via WhatsApp or by phone, your data is handled according to the terms of the service you use and the ordinary rules for managing a commercial enquiry.',
        ],
      },
      {
        id: 'finalita',
        title: 'Why we process it and for how long',
        body: [
          'We use the data from the form solely to answer your enquiry. We send no newsletters, we do no profiling and we do not pass data to third parties for marketing purposes.',
          'The legal basis is the performance of pre-contractual measures at your request (art. 6.1.b GDPR) and our legitimate interest in replying to people who contact us (art. 6.1.f GDPR).',
          'We keep messages for as long as it takes to handle the enquiry and in any case no longer than 24 months, unless the contact leads to a contractual relationship (a gym membership), in which case the retention periods required by tax and administrative obligations apply.',
        ],
      },
      {
        id: 'destinatari',
        title: 'Who it is shared with',
        body: ['Your data is never published. It may be processed on our behalf, as data processors, by the technical providers that make the site work:'],
        list: [
          '<strong>Formspree</strong> — the service that receives the contact form and forwards it to us by email. Data passes through servers in the United States, under the safeguards set out in art. 44 and following of the GDPR.',
          '<strong>Cloudflare, Inc.</strong> — hosting provider (Cloudflare Pages), which hosts the site’s pages and records ordinary technical access logs (IP address, date and time, page requested) for security and diagnostic purposes. Data may transit through servers in the United States, with the safeguards provided by Art. 44 et seq. of the GDPR.',
          '<strong>Google Ireland Ltd.</strong> — only if you choose to load the interactive map on the site (see the Cookies section).',
        ],
      },
      {
        id: 'cookie',
        title: 'Cookies',
        body: [
          '<strong>This site sets no profiling cookies, uses no analytics tools and does not track your browsing.</strong> There is no consent banner because, by default, there is nothing to ask you about.',
          'The one exception is the <strong>Google Maps map</strong> in the “Where we are” section of the home page: it does not load automatically. In its place you will find a static preview and a “Load the map” button. Only if you choose to press it does the map load, at which point Google may set technical and profiling cookies according to its own policy. The choice is entirely yours: if you do not press the button, no data is sent to Google.',
          'The site also uses the browser’s <strong>session storage</strong> for a single technical purpose: remembering, for as long as the tab stays open, that the opening animation has already been shown. It contains no identifiers, tracks nothing, and clears itself when the tab is closed.',
          'You can delete any cookies that have been set at any time from your browser settings.',
        ],
      },
      {
        id: 'diritti',
        title: 'Your rights',
        body: [
          'At any time you can ask us for access to your data, its correction or deletion, restriction of processing and portability, and you can object to processing based on legitimate interest (art. 15-22 GDPR).',
          'To exercise these rights simply write to {{EMAIL}}: we will reply within 30 days.',
          'If you believe the processing of your data breaches the regulations, you have the right to lodge a complaint with the Italian Data Protection Authority (www.garanteprivacy.it).',
        ],
      },
      {
        id: 'minori',
        title: 'Minors',
        body: ['This site is not intended for children under 14. If a minor wishes to join the gym, the request and the provision of data must be made by a parent or legal guardian.'],
      },
      {
        id: 'modifiche',
        title: 'Changes to this policy',
        body: ['We may update this page to reflect changes in the law or new services activated on the site. The date it was last updated is always shown at the top of the page.'],
      },
    ],
  },

  review: {
    seoTitle: 'Leave a review',
    seoDesc:
      'Tell people what training at Nonsolofitness Torvaianica is like. Two lines are enough: your Google review helps anyone looking for a gym nearby.',
    kicker: 'Two minutes, no more',
    ghost: 'THANKS',
    title: 'How was it<span class="ac">?</span>',
    intro:
      'Your opinion is the single most useful thing for someone looking for a gym in Torvaianica. No essay needed: two honest lines are worth more than a thousand words.',
    promptLabel: 'A prompt, if you’re not sure where to start',
    // Prompts rotate on every visit: they are NOT texts to copy (Google bans
    // pre-written reviews), they are questions to get the idea flowing.
    prompts: [
      'What struck you the first time you walked in?',
      'How do you get on with the equipment and the floor?',
      'Is there a class that won you over more than the others?',
      'What’s the atmosphere like when you train here?',
      'What would you tell a friend looking for a gym nearby?',
      'How has it been with Davide and Dominika?',
      'What keeps you coming back instead of switching gyms?',
      'Is there a moment of your gym week you look forward to?',
      'What has changed since you started training here?',
      'What do you make of the opening hours and the cleanliness?',
    ],
    newPrompt: 'Another prompt',
    cta: 'Leave your review',
    ctaNote: 'Google Maps opens: tap the stars and write in your own words.',
    ctaApp: 'Or write it from the browser',
    honest: 'Write what you genuinely think — if you have a suggestion for us, that’s worth more than a compliment.',
    backHome: 'Back to the site',
  },

  schema: {
    description:
      'Gym in Torvaianica (Pomezia): weight room with latest-generation equipment, boxing and functional training classes. Open 7 days a week at Viale Spagna 62.',
    wheelchair: 'Wheelchair accessible entrance',
    parking: 'Accessible parking',
    breadcrumbHome: 'Home',
    breadcrumbCourses: 'Classes',
  },
};
