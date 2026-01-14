// Mobile nav
const navToggle = document.getElementById('navToggle');
const navClose = document.getElementById('navClose');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileLinks = document.querySelectorAll('.navigation-mobile-link');

const openMenu = () => {
  mobileOverlay.classList.add('is-active');
  document.body.style.overflow = 'hidden';
  navToggle.setAttribute('aria-expanded', 'true');
};

const closeMenu = () => {
  mobileOverlay.classList.remove('is-active');
  document.body.style.overflow = '';
  navToggle.setAttribute('aria-expanded', 'false');
};

if (navToggle) navToggle.addEventListener('click', openMenu);
if (navClose) navClose.addEventListener('click', closeMenu);
mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

window.addEventListener('resize', () => {
  if (window.innerWidth > 767 && mobileOverlay.classList.contains('is-active')) closeMenu();
});

// File input label
const fileInput = document.getElementById('plotFile');
if (fileInput) {
  fileInput.addEventListener('change', (e) => {
    const fileName = e.target.files[0]?.name || 'Upload PDF/CAD (Optional)';
    const labelSpan = e.target.nextElementSibling.querySelector('span');
    if (labelSpan) labelSpan.textContent = fileName;
  });
}

// Light scroll reveal
const sections = document.querySelectorAll('section');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    section.style.opacity = '0.95';
    section.style.transform = 'translateY(8px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
}
