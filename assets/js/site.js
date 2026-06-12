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

  const openMenu = () => {
    menu.hidden = false;
    document.body.style.overflow = 'hidden';
    toggle.setAttribute('aria-expanded', 'true');
  };

  const closeMenu = () => {
    menu.hidden = true;
    document.body.style.overflow = '';
    toggle.setAttribute('aria-expanded', 'false');
  };

  if (toggle && menu) {
    toggle.addEventListener('click', openMenu);
    closeBtn?.addEventListener('click', closeMenu);
    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 860 && !menu.hidden) closeMenu();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !menu.hidden) closeMenu();
    });
  }

  /* ── remember language choice (mirrored /en/ pages; key kept from v1) ── */
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
