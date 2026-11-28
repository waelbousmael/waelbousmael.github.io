/* WB Studio — contact page behaviour.
   Lead form (FormSubmit AJAX) + optional Google Maps Places autocomplete.
   The Maps hook stays dormant until window.GOOGLE_MAPS_API_KEY is set. */
(() => {
  const form = document.getElementById('leadForm');
  const feedback = document.getElementById('formFeedback');

  const renderFeedback = (state) => {
    if (!feedback) return;
    feedback.textContent = feedback.getAttribute(`data-msg-${state}`);
    feedback.dataset.state = state;
    feedback.classList.toggle('error', state === 'error');
  };

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submit = form.querySelector('button[type="submit"]');
    if (submit.disabled) return;

    const phoneInput = form.querySelector('#phone');
    const phonePattern = /^[+\d\s]{7,}$/;
    if (phoneInput) {
      const validPhone = phonePattern.test(phoneInput.value.trim());
      phoneInput.setCustomValidity(validPhone ? '' : form.dataset.msgPhone);
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const body = new FormData(form);
    const fields = form.querySelectorAll('fieldset:not(:disabled)');
    fields.forEach((group) => { group.disabled = true; });
    submit.disabled = true;
    renderFeedback('sending');
    try {
      const response = await fetch(form.action, {
        method: form.method,
        headers: { Accept: 'application/json' },
        body
      });

      if (!response.ok) throw new Error('Submission failed');
      const result = await response.json();
      if (result.success !== true && result.success !== 'true') throw new Error('Submission declined');

      renderFeedback('success');
      document.dispatchEvent(new Event('wb:inquiry-sent'));
      form.reset();
    } catch {
      renderFeedback('error');
    } finally {
      fields.forEach((group) => { group.disabled = false; });
      submit.disabled = false;
    }
  });

  /* ── Google Maps Places autocomplete (dormant without an API key) ── */
  const loadGoogleMapsPlaces = (apiKey) => {
    if (!apiKey) return Promise.resolve(false);
    if (window.google?.maps?.places) return Promise.resolve(true);

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
})();
