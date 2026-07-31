/**
 * Nonsolofitness Torvaianica — motore animazioni.
 * GSAP + ScrollTrigger + SplitText (inclusi nel core dal 3.13).
 * Tutto si re-inizializza ad ogni navigazione (Astro View Transitions)
 * e si spegne del tutto con prefers-reduced-motion.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Header: sfondo al scroll + hide on scroll down (una sola volta) ---------- */
function initHeader() {
  const header = document.getElementById('site-header');
  if (!header || header.dataset.bound) return;
  header.dataset.bound = 'true';

  // L'header resta sempre visibile: cambia solo lo sfondo quando si scrolla.
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('mobile-nav');
  if (!toggle || !nav) return;

  const close = () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', toggle.dataset.labelOpen || 'Menu');
    nav.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => { if (!nav.classList.contains('is-open')) nav.hidden = true; }, 400);
  };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    if (open) return close();
    nav.hidden = false;
    requestAnimationFrame(() => nav.classList.add('is-open'));
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', toggle.dataset.labelClose || 'Menu');
    document.body.style.overflow = 'hidden';
  });
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) close();
  });
  document.addEventListener('astro:before-swap', close);
}

/* ---------- Badge "aperto adesso" calcolato dagli orari reali ---------- */
function initOpenBadge() {
  document.querySelectorAll('[data-open-badge]').forEach((badge) => {
    let ranges;
    try {
      ranges = JSON.parse(badge.dataset.openBadge);
    } catch { return; }
    const update = () => {
      const now = new Date();
      const day = now.getDay();
      const minutes = now.getHours() * 60 + now.getMinutes();
      const toMin = (hhmm) => {
        const [h, m] = hhmm.split(':').map(Number);
        return h * 60 + m;
      };
      const today = ranges.find((r) => r.dayNums.includes(day) && r.closes);
      const open = !!today && minutes >= toMin(today.opens) && minutes < toMin(today.closes);
      badge.dataset.open = String(open);
      // le stringhe arrivano dal server già tradotte (data-open-tpl / data-closed-tpl)
      const label = badge.querySelector('[data-open-label]');
      if (label) {
        label.textContent = open
          ? (badge.dataset.openTpl || 'Open · {{H}}').replace('{{H}}', today.closes)
          : badge.dataset.closedTpl || 'Closed';
      }
    };
    update();
    setInterval(update, 60_000);
  });
}

/* ---------- Evidenzia la riga orari del giorno corrente ---------- */
function initTodayRow() {
  const today = new Date().getDay();
  document.querySelectorAll('.hours-row[data-days]').forEach((row) => {
    try {
      const days = JSON.parse(row.dataset.days);
      row.classList.toggle('is-today', days.includes(today));
    } catch { /* attributo malformato: nessuna evidenza */ }
  });
}

/* ---------- Intro di marca (una volta per sessione, solo home) ---------- */
// MODALITÀ SVILUPPO: true = l'intro parte ad OGNI ricarica (per ritoccarla).
// Rimettere a false prima del lancio!
const INTRO_OGNI_VOLTA = true;

function playIntro() {
  const intro = document.getElementById('intro');
  if (!intro) return 0;
  if (reducedMotion || (!INTRO_OGNI_VOLTA && sessionStorage.getItem('nsf-intro'))) {
    intro.remove();
    return 0;
  }
  sessionStorage.setItem('nsf-intro', '1');

  const bolt = intro.querySelector('.intro__bolt');
  const tag = intro.querySelector('.intro__tag');
  const hole = intro.querySelector('#intro-hole-path');
  const ring = intro.querySelector('.intro__hole-ring');
  const tl = gsap.timeline({ onComplete: () => intro.remove() });

  // il buco della maschera parte esattamente dov'è il fulmine rosso
  const cx = window.innerWidth / 2;
  // il centro visivo del fulmine (il gruppo ha anche la tag sotto: compensa)
  const boltRect = () => bolt.getBoundingClientRect();
  // scala finale: la sagoma (24x40 unità) deve coprire tutto lo schermo
  const endScale = Math.hypot(window.innerWidth, window.innerHeight) / 4;
  // stato dello zoom applicato come attributo transform puro (translate+scale)
  const zoom = { cx: window.innerWidth / 2, cy: window.innerHeight / 2, s: 0 };
  const applyZoom = () => {
    const t = `translate(${zoom.cx} ${zoom.cy}) scale(${zoom.s})`;
    hole.setAttribute('transform', t);
    ring.setAttribute('transform', t);
  };

  tl.to(bolt, { scale: 1, duration: 0.5, ease: 'back.out(2)' }, 0.1)
    .to(tag, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0.3)
    // scarica elettrica
    .to(bolt, { opacity: 0.15, duration: 0.05, yoyo: true, repeat: 3, ease: 'none' }, 0.85)
    // la tag si spegne, il fulmine si carica...
    .to(tag, { opacity: 0, y: -10, duration: 0.25, ease: 'power2.in' }, 1.05)
    .add(() => {
      // allinea buco e bordo al fulmine rosso scrivendo il transform SVG a mano:
      // GSAP applica correzioni d'origine sui path SVG che spostano la forma.
      const r = boltRect();
      zoom.cx = r.left + r.width / 2;
      zoom.cy = r.top + r.height / 2;
      zoom.s = r.width / 24;
      applyZoom();
    }, 1.05)
    // ...e la sua sagoma SI APRE: il fulmine diventa la finestra sulla pagina
    .to(bolt, { opacity: 0, scale: 1.15, duration: 0.2, ease: 'power1.in' }, 1.12)
    .to(zoom, { s: endScale, duration: 1.0, ease: 'power4.in', onUpdate: applyZoom }, 1.1)
    .to(intro, { opacity: 0, duration: 0.15 }, 2.05);

  // il hero parte in anticipo: i componenti entrano MENTRE il fulmine si apre
  return 1.5;
}

/* ---------- Mappa Google: caricata solo su consenso esplicito ---------- */
function initMapConsent() {
  document.querySelectorAll('[data-map-consent]').forEach((card) => {
    const btn = card.querySelector('[data-map-load]');
    if (!btn || card.dataset.mapBound) return;
    card.dataset.mapBound = 'true';

    btn.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = card.dataset.mapSrc;
      iframe.title = card.dataset.mapTitle;
      iframe.loading = 'lazy';
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      card.querySelector('.map-card__consent')?.remove();
      card.prepend(iframe);
    });
  });
}

/* ---------- Hero: timeline di ingresso ---------- */
function initHero(delay = 0) {
  const hero = document.querySelector('.hero, .page-hero');
  if (!hero) return;

  const lines = hero.querySelectorAll('.hero__line');
  const fades = hero.querySelectorAll('[data-hero-fade]');

  if (reducedMotion) {
    gsap.set([lines, fades], { opacity: 1, clearProps: 'transform' });
    return;
  }

  const tl = gsap.timeline({ delay, defaults: { ease: 'power4.out' } });

  // y in % sovrascrive il translateY(110%) iniziale del CSS (yPercent non lo farebbe)
  tl.fromTo(
    lines,
    { y: '110%', rotate: 3 },
    { y: '0%', rotate: 0, duration: 1.25, stagger: 0.12 },
    0.15
  ).fromTo(
    fades,
    { opacity: 0, y: 30 },
    // cascata leggibile: ogni componente entra al suo turno, non tutti insieme.
    // Parte MENTRE il titolo sta ancora atterrando: flusso continuo, senza pause.
    { opacity: 1, y: 0, duration: 0.75, stagger: 0.22, ease: 'power3.out' },
    '-=0.95'
  );

  // leggero parallax del titolo mentre si scrolla via (solo hero a schermo pieno)
  const title = hero.querySelector('.hero__title');
  if (title) {
    gsap.to(title, {
      yPercent: 18,
      opacity: 0.25,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
  }
}

/* ---------- Reveal generici al scroll ---------- */
function initReveals() {
  const items = document.querySelectorAll('[data-reveal]');
  if (reducedMotion) {
    gsap.set(items, { opacity: 1, clearProps: 'transform' });
    return;
  }
  items.forEach((el) => {
    const kind = el.dataset.reveal || 'up';
    const delay = parseFloat(el.dataset.revealDelay || '0');
    const from =
      kind === 'fade' ? { opacity: 0 } :
      kind === 'left' ? { opacity: 0, x: -48 } :
      kind === 'right' ? { opacity: 0, x: 48 } :
      kind === 'scale' ? { opacity: 0, scale: 0.92 } :
      { opacity: 0, y: 56 };

    gsap.fromTo(el, from, {
      opacity: 1, x: 0, y: 0, scale: 1,
      duration: 1.1, delay,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 86%', once: true },
    });
  });
}

/* ---------- Titoli sezione: parole che salgono ---------- */
function initSplitHeadings() {
  if (reducedMotion) return;
  document.querySelectorAll('[data-split]').forEach((el) => {
    const split = new SplitText(el, { type: 'words', wordsClass: 'split-word' });
    gsap.set(el, { opacity: 1 });
    gsap.from(split.words, {
      yPercent: 110,
      opacity: 0,
      rotate: 2,
      duration: 0.9,
      stagger: 0.05,
      ease: 'power4.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });
}

/* ---------- Contatori numerici ---------- */
function initCounters() {
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    if (reducedMotion) {
      el.textContent = target.toFixed(decimals).replace('.', ',');
      return;
    }
    const obj = { v: 0 };
    gsap.to(obj, {
      v: target,
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      onUpdate: () => {
        el.textContent = obj.v.toFixed(decimals).replace('.', ',');
      },
    });
  });
}

/* ---------- Parallax leggero su immagini ---------- */
function initParallax() {
  if (reducedMotion) return;
  document.querySelectorAll('[data-parallax]').forEach((el) => {
    const amount = parseFloat(el.dataset.parallax || '12');
    gsap.fromTo(el, { yPercent: -amount / 2 }, {
      yPercent: amount / 2,
      ease: 'none',
      scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });
}

/* ---------- Bottoni magnetici (solo pointer fine) ---------- */
function initMagnetic() {
  if (reducedMotion || !window.matchMedia('(pointer: fine)').matches) return;
  document.querySelectorAll('.btn').forEach((btn) => {
    if (btn.dataset.magnet) return;
    btn.dataset.magnet = 'true';
    const strength = 18;
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * strength;
      const y = ((e.clientY - r.top) / r.height - 0.5) * strength;
      gsap.to(btn, { x, y, duration: 0.4, ease: 'power3.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    });
  });
}

/* ---------- Video ambientali ----------
   iOS blocca l'autoplay in diversi casi che NON possiamo rilevare
   (Riproduci anteprime video off, Risparmio energetico, Risparmio dati).
   Se dopo un attimo il video non è partito, mostriamo un pulsante play:
   il tocco dell'utente è un gesto valido e sblocca sempre la riproduzione. */
function initAmbientVideos(deferSeconds = 0) {
  // Il video pesa quanto tutto il resto della pagina: se parte subito ritarda
  // l'evento load e quindi l'inizio dell'intro. Lo avviamo dopo l'intro,
  // quando la banda è libera (nel frattempo si vede il poster).
  if (deferSeconds > 0) {
    setTimeout(() => initAmbientVideos(0), deferSeconds * 1000);
    return;
  }
  const playBtn = document.querySelector('[data-video-play]');
  const bgVideo = document.querySelector('.hero__bg video');

  const offerManualPlay = () => {
    if (!playBtn || !bgVideo) return;
    playBtn.hidden = false;
    if (playBtn.dataset.bound) return;
    playBtn.dataset.bound = 'true';
    playBtn.addEventListener('click', () => {
      bgVideo.muted = true;
      if (!bgVideo.dataset.srcSet && bgVideo.dataset.src) {
        bgVideo.dataset.srcSet = '1';
        bgVideo.src = bgVideo.dataset.src;
      }
      if (bgVideo.error || !bgVideo.currentSrc) bgVideo.load();
      const p = bgVideo.play();
      if (p) {
        p.then(() => {
          playBtn.hidden = true;
          bgVideo.classList.add('is-playing');
        }).catch((err) => {
          // se nemmeno il tocco basta, il problema è il file/decoder:
          // lo diciamo invece di lasciare un pulsante che non fa nulla
          playBtn.classList.add('is-failed');
          const label = playBtn.querySelector('span');
          if (label) label.textContent = playBtn.dataset.labelFail || 'Video non disponibile';
          console.warn('[video] play() rifiutato:', err?.name, err?.message, '| mediaError:', bgVideo.error?.code);
        });
      }
    });
  };

  /* La sorgente NON è nell'HTML: i browser scaricano il file anche per i
     video nascosti da display:none, e la stessa clip finiva scaricata 3 volte
     (12 MB per aprire la home). La assegniamo solo al video davvero visibile. */
  const isHidden = (el) => el.offsetParent === null;
  const attachSource = (v) => {
    if (v.dataset.srcSet || !v.dataset.src) return false;
    v.dataset.srcSet = '1';
    v.src = v.dataset.src;
    v.load();
    return true;
  };

  document.querySelectorAll('video[data-ambient-video]').forEach((v) => {
    if (isHidden(v)) return; // card desktop su mobile, sfondo mobile su desktop

    // fuori dalla prima schermata: carica solo quando ci si avvicina
    const belowFold = v.getBoundingClientRect().top > window.innerHeight * 1.2;
    if (belowFold && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries, obs) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        obs.disconnect();
        attachSource(v);
        if (!reducedMotion) {
          v.muted = true;
          const p = v.play();
          if (p) p.catch(() => {});
        }
      }, { rootMargin: '300px' });
      io.observe(v);
      return;
    }

    attachSource(v);

    if (reducedMotion) {
      // rispettiamo la preferenza: non parte da solo, ma resta consultabile
      v.removeAttribute('autoplay');
      v.pause();
      if (v === bgVideo) offerManualPlay();
      return;
    }
    const rate = parseFloat(v.dataset.playback || '1');
    if (rate !== 1) {
      v.playbackRate = rate;
      // alcuni browser azzerano il rate quando il video ricomincia a caricare
      v.addEventListener('play', () => { v.playbackRate = rate; });
    }
    // fade-in dal poster appena il video parte davvero
    v.addEventListener('playing', () => v.classList.add('is-playing'), { once: true });
    if (!v.paused && v.currentTime > 0) v.classList.add('is-playing');
    // Dopo lo swap delle View Transitions Chromium scarta la sorgente del video
    // ("Media load rejected by URL safety check"): va ricaricata nel documento vivo.
    if (v.error) v.load();
    if (v.paused) {
      v.muted = true; // l'attributo HTML può perdersi nello swap: senza muted niente autoplay
      const p = v.play();
      // se il browser rifiuta (iOS: anteprime video off, risparmio energetico/dati)
      // offriamo il tocco manuale invece di lasciare un poster muto senza spiegazione
      if (p) p.catch(() => { if (v === bgVideo) offerManualPlay(); });
    }
  });

  // rete di sicurezza: alcuni browser non rifiutano la promise, semplicemente
  // non partono. Se dopo 1,5 s siamo ancora fermi, mostriamo il pulsante.
  if (bgVideo && !reducedMotion) {
    setTimeout(() => {
      if (bgVideo.isConnected && bgVideo.paused) offerManualPlay();
    }, 1500);
  }
}

/* Back/forward cache: al ripristino della pagina i video restano in pausa */
window.addEventListener('pageshow', (e) => {
  if (!e.persisted || reducedMotion) return;
  document.querySelectorAll('video[data-ambient-video]').forEach((v) => {
    if (v.paused) {
      const p = v.play();
      if (p) p.catch(() => {});
    }
  });
});

/* ---------- Bootstrap per ogni navigazione ---------- */
function init() {
  initHeader();
  initOpenBadge();
  initTodayRow();
  initMapConsent();
  const introDelay = playIntro();
  initAmbientVideos(introDelay);
  initHero(introDelay);
  initReveals();
  initSplitHeadings();
  initCounters();
  initParallax();
  initMagnetic();
  ScrollTrigger.refresh();
}

/* Alla PRIMA visita 'astro:page-load' scatta solo dopo window.load, cioè dopo
   il download di font e immagini: l'intro restava ferma per secondi. Partiamo
   appena il DOM è pronto e usiamo 'astro:page-load' per le navigazioni dopo. */
let booted = false;
function boot() {
  if (booted) return;
  booted = true;
  init();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}

document.addEventListener('astro:after-swap', () => { booted = false; });
document.addEventListener('astro:page-load', boot);
document.addEventListener('astro:before-swap', () => {
  ScrollTrigger.getAll().forEach((st) => st.kill());
});
