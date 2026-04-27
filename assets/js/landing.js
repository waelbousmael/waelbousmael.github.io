const revealElements = document.querySelectorAll('[data-reveal]');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealElements.forEach((el) => el.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((el) => observer.observe(el));
}

const brandHeader = document.querySelector('.brand-header');

const syncHeaderMotion = () => {
  if (!brandHeader) return;
  const shift = Math.min(window.scrollY * 0.12, 22);
  brandHeader.style.setProperty('--header-shift', `${shift.toFixed(2)}`);
};

if (!prefersReducedMotion) {
  window.addEventListener('scroll', syncHeaderMotion, { passive: true });
  syncHeaderMotion();
}

const form = document.getElementById('leadForm');
const feedback = document.getElementById('formFeedback');

const getI18nMessage = (key) => {
  const isArabic = document.documentElement.lang === 'ar';
  const messages = {
    success: isArabic
      ? 'تم إرسال طلبك بنجاح. سنعاود التواصل معك خلال يومين عمل.'
      : 'Your request was sent successfully. We’ll get back to you within 2 business days.',
    error: isArabic
      ? 'تعذر إرسال الطلب حالياً. الرجاء المحاولة مرة أخرى.'
      : 'We could not submit your request right now. Please try again.'
  };

  return messages[key];
};

const renderFeedback = (state) => {
  if (!feedback) return;
  feedback.textContent = getI18nMessage(state);
  feedback.dataset.state = state;
  feedback.classList.add('visible');
  feedback.classList.toggle('error', state === 'error');
};

form?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const phoneInput = form.querySelector('#phone');
  const phonePattern = /^[+\d\s]{7,}$/;
  if (phoneInput) {
    const validPhone = phonePattern.test(phoneInput.value.trim());
    phoneInput.setCustomValidity(validPhone ? '' : (document.documentElement.lang === 'ar'
      ? 'يرجى إدخال رقم هاتف صالح.'
      : 'Please enter a valid phone number.'));
  }

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

    renderFeedback('success');
    form.reset();
  } catch (error) {
    renderFeedback('error');
  }
});

const loadGoogleMapsPlaces = (apiKey) => {
  if (!apiKey) return Promise.resolve(false);

  if (window.google?.maps?.places) {
    return Promise.resolve(true);
  }

  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(Boolean(window.google?.maps?.places));
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
};

const initLocationAutocomplete = async () => {
  const locationInput = document.getElementById('location');
  const mapsInput = document.getElementById('maps');
  const apiKey = typeof window.GOOGLE_MAPS_API_KEY === 'string' ? window.GOOGLE_MAPS_API_KEY.trim() : '';

  if (!locationInput || !mapsInput) return;

  const loaded = await loadGoogleMapsPlaces(apiKey);
  if (!loaded) return;

  const autocomplete = new window.google.maps.places.Autocomplete(locationInput, {
    fields: ['name', 'formatted_address', 'place_id', 'geometry'],
    types: ['geocode']
  });

  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    if (!place) return;

    const placeId = place.place_id;
    if (placeId) {
      mapsInput.value = `https://www.google.com/maps/search/?api=1&query_place_id=${encodeURIComponent(placeId)}`;
      return;
    }

    const label = place.formatted_address || place.name || locationInput.value;
    if (label) {
      mapsInput.value = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(label)}`;
    }
  });
};

initLocationAutocomplete();

const bioToggle = document.getElementById('bioToggle');
const bioPanel = document.getElementById('bioPanel');

bioToggle?.addEventListener('click', () => {
  const isOpen = bioToggle.getAttribute('aria-expanded') === 'true';
  bioToggle.setAttribute('aria-expanded', String(!isOpen));
  bioPanel?.setAttribute('aria-hidden', String(isOpen));

  const lang = document.documentElement.lang === 'en' ? 'en' : 'ar';
  const readText = lang === 'en' ? 'Read Full Bio' : 'قراءة النبذة';
  const hideText = lang === 'en' ? 'Hide Bio' : 'إخفاء النبذة';
  bioToggle.textContent = isOpen ? readText : hideText;
});
