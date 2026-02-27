const revealElements = document.querySelectorAll('[data-reveal]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach((el) => observer.observe(el));

const brandHeader = document.querySelector('.brand-header');

const syncHeaderMotion = () => {
  if (!brandHeader) return;
  const shift = Math.min(window.scrollY * 0.12, 22);
  brandHeader.style.setProperty('--header-shift', `${shift.toFixed(2)}`);
};

window.addEventListener('scroll', syncHeaderMotion, { passive: true });
syncHeaderMotion();

const form = document.getElementById('leadForm');
const success = document.getElementById('formSuccess');

form?.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  try {
    const response = await fetch(form.action, {
      method: form.method,
      headers: {
        Accept: 'application/json'
      },
      body: new FormData(form)
    });

    if (!response.ok) {
      throw new Error('Form endpoint is not configured yet.');
    }

    success?.classList.add('visible');
    success?.classList.remove('error');
    form.reset();
  } catch (error) {
    if (success) {
      const arabic = document.documentElement.lang === 'ar';
      success.textContent = arabic
        ? 'تعذر إرسال الطلب حالياً. الرجاء المحاولة مرة أخرى.'
        : 'We could not submit your request right now. Please try again.';
      success.classList.add('visible', 'error');
    }
  }
});
