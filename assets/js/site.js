/* WB Studio — shared site behaviour (all pages).
   Scroll reveal, mobile menu, language-preference memory, footer year. */
(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── scroll reveal ── */
  const revealElements = document.querySelectorAll('[data-reveal]');
  if (prefersReducedMotion || typeof window.IntersectionObserver !== 'function') {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting || entry.boundingClientRect.bottom <= 0) {
          entry.target.classList.remove('reveal-pending');
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        } else {
          entry.target.classList.add('reveal-pending');
        }
      });
    });
    revealElements.forEach((el) => observer.observe(el));
  }

  /* ── mobile menu ── */
  const toggle = document.querySelector('[data-nav-toggle]');
  const closeBtn = document.querySelector('[data-nav-close]');
  const menu = document.getElementById('mobileMenu');
  const backgroundState = new Map();
  let previousOverflow = '';

  const openMenu = () => {
    if (!menu.hidden) return;
    menu.hidden = false;
    previousOverflow = document.body.style.overflow;
    Array.from(document.body.children).filter((el) => el !== menu).forEach((el) => {
      backgroundState.set(el, el.inert);
      el.inert = true;
    });
    document.body.style.overflow = 'hidden';
    toggle.setAttribute('aria-expanded', 'true');
    closeBtn.focus();
  };

  const closeMenu = () => {
    if (menu.hidden) return;
    menu.hidden = true;
    backgroundState.forEach((inert, el) => { el.inert = inert; });
    backgroundState.clear();
    document.body.style.overflow = previousOverflow;
    toggle.setAttribute('aria-expanded', 'false');
    requestAnimationFrame(() => requestAnimationFrame(() => toggle.focus()));
  };

  if (toggle && menu) {
    toggle.addEventListener('click', openMenu);
    closeBtn?.addEventListener('click', closeMenu);
    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 860 && !menu.hidden) closeMenu();
    });
    document.addEventListener('keydown', (event) => {
      if (menu.hidden) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
      }
      if (event.key === 'Tab') {
        const controls = menu.querySelectorAll('a[href], button:not([disabled])');
        const first = controls[0];
        const last = controls[controls.length - 1];
        const outside = !menu.contains(document.activeElement);
        if (event.shiftKey && (document.activeElement === first || outside)) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && (document.activeElement === last || outside)) {
          event.preventDefault();
          first.focus();
        }
      }
    });
  }

  /* ── remember language choice (mirrored /en/ pages; key kept from v1) ── */
  const languagePickers = document.querySelectorAll('[data-language-picker]');
  languagePickers.forEach((picker) => {
    picker.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && picker.open) {
        event.preventDefault();
        picker.open = false;
        picker.querySelector('summary').focus();
      }
    });
  });
  document.addEventListener('click', (event) => {
    languagePickers.forEach((picker) => {
      if (!picker.contains(event.target)) picker.open = false;
    });
  });
  document.querySelectorAll('[data-lang-switch]').forEach((link) => {
    link.addEventListener('click', () => {
      try { localStorage.setItem('wb_lang', link.dataset.langSwitch); } catch { /* private mode */ }
    });
  });

  /* ── footer year ── */
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();

(() => {
  const panel = document.querySelector('[data-measurement]');
  if (!panel) return;
  const endpoint = panel.dataset?.endpoint;
  if (!endpoint) return;

  const dialog = panel.querySelector('[data-measurement-dialog]');
  const settings = panel.querySelector('[data-measurement-settings]');
  const allow = panel.querySelector('[data-measurement-allow]');
  const decline = panel.querySelector('[data-measurement-decline]');
  const consentKey = 'wb_measurement_consent';
  const visitKey = 'wb_measurement_visit';
  const pages = ['home', 'luxury_villa', 'service', 'project', 'guide', 'contact', 'other'];
  const channels = ['organic_search', 'paid_search', 'social', 'referral', 'direct', 'unknown'];
  const market = document.documentElement.lang;
  const page = pages.includes(panel.dataset.pageGroup) ? panel.dataset.pageGroup : 'other';
  if (!['en', 'ar', 'de'].includes(market)) return;

  function read(store, key) {
    try { return window[store].getItem(key); } catch { return null; }
  }

  function save(store, key, value) {
    try {
      if (value === null) window[store].removeItem(key);
      else window[store].setItem(key, value);
    } catch { /* Keep this page usable when browser storage is blocked. */ }
  }

  const privacySignal = navigator.globalPrivacyControl === true ||
    [navigator.doNotTrack, window.doNotTrack, navigator.msDoNotTrack].some((v) => v === '1' || v === 'yes');
  if (privacySignal) {
    save('localStorage', consentKey, null);
    save('sessionStorage', visitKey, null);
    dialog.hidden = settings.hidden = true;
    return;
  }

  function entryChannel() {
    const medium = new URL(window.location.href).searchParams.get('utm_medium')?.trim().toLowerCase();
    const host = document.referrer ? new URL(document.referrer).hostname.toLowerCase() : '';
    if (host && host.replace(/^www\./, '') === window.location.hostname.replace(/^www\./, '')) return null;

    const socialHost = /(^|\.)(facebook\.com|instagram\.com|linkedin\.com|lnkd\.in|pinterest\.com|pin\.it|tiktok\.com|t\.co|x\.com|twitter\.com|youtube\.com|threads\.(net|com))$/.test(host);
    if (['social', 'social-media', 'organic_social', 'paid_social', 'social_network'].includes(medium)) return 'social';
    if (['cpc', 'ppc', 'paid_search', 'paidsearch', 'sem'].includes(medium)) return socialHost ? 'social' : 'paid_search';
    if (['organic', 'organic_search'].includes(medium)) return 'organic_search';
    if (medium === 'referral') return 'referral';
    if (socialHost) return 'social';
    const searchHost = /^(?:(?:www|images|lens)\.)?google\.(?:com|[a-z]{2}|(?:com|co)\.[a-z]{2})$/.test(host) ||
      /(^|\.)(bing\.com|duckduckgo\.com|search\.yahoo\.com|ecosia\.org|search\.brave\.com)$/.test(host) ||
      host === 'com.google.android.googlequicksearchbox';
    if (searchHost) return 'organic_search';
    if (host) return 'referral';
    return medium || document.referrer ? 'unknown' : 'direct';
  }

  function getVisit() {
    try {
      const saved = JSON.parse(read('sessionStorage', visitKey));
      if (channels.includes(saved?.channel) && pages.includes(saved.entry)) {
        return { channel: saved.channel, entry: saved.entry };
      }
    } catch { /* Discard an unusable saved visit. */ }
    let channel = null;
    try { channel = entryChannel(); } catch { /* An opaque referrer has no reliable source. */ }
    const visit = { channel: channel ?? 'unknown', entry: channel === null ? 'other' : page };
    save('sessionStorage', visitKey, JSON.stringify(visit));
    return visit;
  }

  let consent;
  let visit;
  let viewSent = false;
  function send(event, budget = 'none') {
    if (consent !== 'allow') return;
    visit ??= getVisit();
    const body = JSON.stringify({ event, market, channel: visit.channel, entry: visit.entry, page, budget });
    fetch(endpoint, {
      method: 'POST', headers: { 'Content-Type': 'text/plain' }, body,
      keepalive: true, credentials: 'omit', referrerPolicy: 'no-referrer'
    }).catch(() => {});
  }

  function showDialog(open) {
    dialog.hidden = !open;
    settings.setAttribute('aria-expanded', String(open));
  }

  function applyChoice(value) {
    consent = ['allow', 'decline'].includes(value) ? value : null;
    showDialog(!consent);
    if (consent === 'allow') {
      if (!viewSent) {
        send('page_view');
        viewSent = true;
      }
    } else {
      visit = null;
      if (consent === 'decline') save('sessionStorage', visitKey, null);
    }
  }

  settings.hidden = false;
  settings.addEventListener('click', () => {
    showDialog(dialog.hidden);
    if (!dialog.hidden) (consent === 'allow' ? decline : allow).focus();
  });
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      showDialog(false);
      settings.focus();
    }
  });
  for (const [button, value] of [[allow, 'allow'], [decline, 'decline']]) {
    button.addEventListener('click', () => {
      if (value === 'allow' && consent !== 'allow') save('sessionStorage', visitKey, null);
      save('localStorage', consentKey, value);
      applyChoice(value);
      settings.focus({ preventScroll: true });
    });
  }
  window.addEventListener('storage', (event) => {
    if (event.key === consentKey || event.key === null) {
      save('sessionStorage', visitKey, null);
      visit = null;
      applyChoice(read('localStorage', consentKey));
    }
  });
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) applyChoice(read('localStorage', consentKey));
  });
  applyChoice(read('localStorage', consentKey));

  document.addEventListener('click', (event) => {
    if (consent !== 'allow' || event.defaultPrevented) return;
    const link = event.target.closest?.('a[href]');
    if (!link) return;
    if (link.protocol === 'https:' && link.hostname === 'wa.me') send('whatsapp_click');
    else if (link.protocol === 'mailto:') send('email_click');
    else if (link.protocol === 'tel:') send('phone_click');
  });
  document.addEventListener('wb:inquiry-sent', () => {
    if (consent !== 'allow' || page !== 'contact') return;
    let budget = 'none';
    if (market !== 'de') {
      const selected = document.querySelector('#leadForm select[name="budget"]')?.selectedOptions[0];
      const band = selected?.dataset.budgetBand;
      budget = ['under_1m', '1m_2m', '2m_4m', 'over_4m'].includes(band) ? band : 'undeclared';
    }
    send('inquiry_sent', budget);
  });
})();
