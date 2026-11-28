import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const script = fs.readFileSync(new URL('../assets/js/site.js', import.meta.url), 'utf8');
const contactScript = fs.readFileSync(new URL('../assets/js/contact.js', import.meta.url), 'utf8');
const consentKey = 'wb_measurement_consent';
const visitKey = 'wb_measurement_visit';

function storage() {
  const data = new Map();
  return {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, value),
    removeItem: (key) => data.delete(key)
  };
}

function browser({
  market = 'en', page = 'service', referrer = '', query = '', band,
  local = storage(), session = storage(), navigator = {}, blockStorage = false
} = {}) {
  const requests = [];
  const listeners = () => {
    const handlers = {};
    return {
      addEventListener(type, fn) { (handlers[type] ??= []).push(fn); },
      fire(type, event = {}) { for (const fn of handlers[type] ?? []) fn(event); }
    };
  };
  const control = () => ({
    ...listeners(), hidden: true,
    setAttribute(key, value) { this[key] = value; },
    focus() { document.activeElement = this; }
  });
  const dialog = control(), settings = control(), allow = control(), decline = control();
  const elements = { dialog, settings, allow, decline };
  const panel = {
    dataset: { endpoint: 'https://metrics.example/event', pageGroup: page },
    querySelector: (key) => elements[key.slice('[data-measurement-'.length, -1)]
  };
  const document = {
    ...listeners(), documentElement: { lang: market }, referrer,
    querySelector(selector) {
      if (selector === '[data-measurement]') return panel;
      if (selector === '#leadForm select[name="budget"]') {
        assert.notEqual(market, 'de', 'German free text must never be read');
        return { selectedOptions: [{ dataset: { budgetBand: band } }] };
      }
      return null;
    },
    getElementById: () => null, querySelectorAll: () => []
  };
  const window = {
    ...listeners(), localStorage: local, sessionStorage: session, matchMedia: () => ({ matches: true }),
    location: new URL('https://wbstudio.xyz/en/example/' + query)
  };
  if (blockStorage) {
    for (const key of ['localStorage', 'sessionStorage']) {
      Object.defineProperty(window, key, { get() { throw Error('blocked'); } });
    }
  }
  const fetch = (endpoint, options) => {
    assert.equal(endpoint, panel.dataset.endpoint);
    assert.equal(options.method, 'POST');
    assert.equal(options.credentials, 'omit');
    assert.equal(options.referrerPolicy, 'no-referrer');
    assert.equal(options.keepalive, true);
    assert.equal(options.headers['Content-Type'], 'text/plain');
    const body = JSON.parse(options.body);
    assert.deepEqual(Object.keys(body).sort(), ['event', 'market', 'channel', 'entry', 'page', 'budget'].sort());
    requests.push(body);
    return Promise.resolve();
  };
  vm.runInNewContext(script, { document, window, navigator, URL, fetch });
  function click(url) {
    const link = new URL(url);
    document.fire('click', { target: { closest: () => link } });
  }
  return { ...elements, click, document, requests, local, session, window, resetBudget() { band = undefined; } };
}

test('explicit consent controls collection, keyboard access and revocation', () => {
  const b = browser({ page: 'luxury_villa', referrer: 'https://images.google.com/search?private=secret' });
  assert.equal(b.dialog.hidden, false);
  assert.equal(b.settings.hidden, false);
  assert.equal(b.document.activeElement, undefined);
  b.click('tel:+123456789');
  assert.deepEqual(b.requests, []);
  assert.equal(b.local.getItem(consentKey), null);
  assert.equal(b.session.getItem(visitKey), null);
  b.allow.fire('click');
  assert.deepEqual(b.requests, [{ event: 'page_view', market: 'en', channel: 'organic_search', entry: 'luxury_villa', page: 'luxury_villa', budget: 'none' }]);
  assert.equal(b.local.getItem(consentKey), 'allow');
  assert.equal(b.settings['aria-expanded'], 'false');
  assert.equal(b.document.activeElement, b.settings);
  b.settings.fire('click');
  assert.equal(b.settings['aria-expanded'], 'true');
  assert.equal(b.document.activeElement, b.decline);
  b.dialog.fire('keydown', { key: 'Escape' });
  assert.equal(b.document.activeElement, b.settings);
  b.settings.fire('click');
  b.allow.fire('click');
  assert.equal(b.requests.length, 1);
  b.settings.fire('click');
  b.decline.fire('click');
  assert.equal(b.local.getItem(consentKey), 'decline');
  assert.equal(b.session.getItem(visitKey), null);
  b.click('https://wa.me/1111?text=private');
  b.document.fire('wb:inquiry-sent');
  assert.equal(b.requests.length, 1);
});

test('same-tab attribution reaches contact actions without contact data', () => {
  const landing = browser({ market: 'ar', page: 'luxury_villa', referrer: 'https://www.google.com.sa/' });
  landing.allow.fire('click');
  const b = browser({ market: 'ar', page: 'contact', session: landing.session, local: landing.local,
    referrer: 'https://wbstudio.xyz/luxury-villa-design-jeddah/', band: '2m_4m' });
  b.click('https://wa.me/1111?text=private');
  b.click('mailto:someone@example.com');
  b.click('tel:+123456789');
  b.click('https://example.com');
  b.document.fire('wb:inquiry-sent');
  assert.deepEqual(b.requests.map((e) => e.event), ['page_view', 'whatsapp_click', 'email_click', 'phone_click', 'inquiry_sent']);
  for (const e of b.requests) {
    assert.deepEqual(e, { event: e.event, market: 'ar', channel: 'organic_search', entry: 'luxury_villa',
      page: 'contact', budget: e.event === 'inquiry_sent' ? '2m_4m' : 'none' });
  }
  landing.local.setItem(consentKey, 'decline');
  b.window.fire('storage', { key: consentKey });
  b.click('mailto:another@example.com');
  assert.equal(b.requests.length, 5);
  assert.equal(b.session.getItem(visitKey), null);
});

test('only bounded market, page and budget values can be sent', () => {
  for (const band of ['under_1m', '1m_2m', '2m_4m', 'over_4m', undefined, 'private budget text']) {
    const b = browser({ market: 'en', page: 'contact', band });
    b.allow.fire('click');
    b.document.fire('wb:inquiry-sent');
    assert.equal(b.requests[1].budget, ['under_1m', '1m_2m', '2m_4m', 'over_4m'].includes(band) ? band : 'undeclared');
  }
  const german = browser({ market: 'de', page: 'contact' });
  german.allow.fire('click');
  german.document.fire('wb:inquiry-sent');
  assert.equal(german.requests[1].budget, 'none');
  const unknownPage = browser({ page: '/private/route' });
  unknownPage.allow.fire('click');
  unknownPage.document.fire('wb:inquiry-sent');
  assert.equal(unknownPage.requests.length, 1);
  assert.equal(unknownPage.requests[0].page, 'other');
  const unknownMarket = browser({ market: 'anything-private' });
  unknownMarket.allow.fire('click');
  assert.equal(unknownMarket.requests.length, 0);
});

test('the real submission handler emits once on acceptance, before the selected budget resets', async () => {
  for (const [ok, result, accepted] of [
    [true, { success: true }, true], [true, { success: 'true' }, true],
    [true, { success: false }, false], [true, { success: 'false' }, false],
    [true, {}, false], [true, null, false], [false, { success: true }, false]
  ]) {
    const b = browser({ page: 'contact', band: 'over_4m' });
    b.allow.fire('click');
    let handler, respond, attempts = 0, signals = 0;
    const button = { disabled: false }, fieldset = { disabled: false };
    const feedback = { dataset: {}, classList: { toggle() {} }, getAttribute: () => 'Localized message' };
    const form = {
      action: '/mock', method: 'post', checkValidity: () => true, reset: b.resetBudget,
      addEventListener(type, fn) { if (type === 'submit') handler = fn; },
      querySelector: (selector) => selector === '#phone' ? null : button, querySelectorAll: () => [fieldset]
    };
    b.document.getElementById = (id) => ({ leadForm: form, formFeedback: feedback })[id];
    b.document.dispatchEvent = (event) => {
      assert.equal(event.type, 'wb:inquiry-sent');
      assert.equal(event.detail, undefined);
      signals++;
      b.document.fire(event.type);
    };
    const fetch = () => {
      attempts++;
      return new Promise((resolve) => { respond = () => resolve({ ok, json: async () => result }); });
    };
    vm.runInNewContext(contactScript, { window: b.window, document: b.document, Event, FormData: class {}, fetch });
    const submit = { preventDefault() {} };
    const pending = handler(submit);
    assert.equal(button.disabled, true);
    assert.equal(fieldset.disabled, true);
    assert.equal(feedback.dataset.state, 'sending');
    await handler(submit);
    assert.equal(attempts, 1);
    assert.equal(signals, 0);
    respond();
    await pending;
    assert.equal(signals, Number(accepted));
    assert.equal(feedback.dataset.state, accepted ? 'success' : 'error');
    assert.equal(button.disabled, false);
    assert.equal(fieldset.disabled, false);
    assert.deepEqual(b.requests.filter((e) => e.event === 'inquiry_sent').map((e) => e.budget), accepted ? ['over_4m'] : []);
  }
});

test('source classification never forwards a URL, UTM or referrer', () => {
  for (const [referrer, query, channel] of [
    ['', '', 'direct'], ['', '?utm_medium=cpc', 'paid_search'],
    ['https://www.instagram.com/', '?utm_medium=cpc', 'social'],
    ['https://m.facebook.com/', '', 'social'], ['https://www.bing.com/search?q=test', '', 'organic_search'],
    ['https://google.com.private.example/', '', 'referral'], ['', '?utm_medium=private-value', 'unknown'],
    ['https://wbstudio.xyz/ar/', '?utm_medium=cpc', 'unknown']
  ]) {
    const b = browser({ page: 'guide', referrer, query, blockStorage: true });
    b.allow.fire('click');
    b.click('tel:1111');
    assert.equal(b.requests.length, 2);
    for (const e of b.requests) {
      assert.equal(e.channel, channel);
      assert.equal(e.entry, referrer.includes('wbstudio.xyz') ? 'other' : 'guide');
    }
  }
});

test('privacy signals and remembered refusal disable collection', () => {
  for (const navigator of [{ globalPrivacyControl: true }, { doNotTrack: '1' }]) {
    const local = storage(), session = storage();
    local.setItem(consentKey, 'allow');
    session.setItem(visitKey, JSON.stringify({ channel: 'social', entry: 'project' }));
    const b = browser({ local, session, navigator });
    b.allow.fire('click');
    b.document.fire('wb:inquiry-sent');
    assert.equal(b.settings.hidden, true);
    assert.equal(b.dialog.hidden, true);
    assert.equal(b.requests.length, 0);
    assert.equal(session.getItem(visitKey), null);
  }
  const b = browser();
  b.decline.fire('click');
  const next = browser({ local: b.local, session: b.session });
  assert.equal(next.dialog.hidden, true);
  assert.equal(next.requests.length, 0);
});
