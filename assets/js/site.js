/* WB Studio — shared site behaviour (all pages).
   Scroll reveal, mobile menu, language-preference memory, footer year. */
(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── scroll reveal ── */
  const revealElements = document.querySelectorAll('[data-reveal]');
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -36px' });
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
