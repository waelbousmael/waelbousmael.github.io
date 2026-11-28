const siteOrigin = 'https://wbstudio.xyz';
const maxBytes = 512;
const pageTypes = ['luxury_villa', 'service', 'project', 'guide', 'contact', 'home', 'other'];
const dimensions = {
  event: ['page_view', 'whatsapp_click', 'phone_click', 'email_click', 'inquiry_sent'],
  market: ['en', 'ar', 'de'],
  channel: ['organic_search', 'paid_search', 'social', 'referral', 'direct', 'unknown'],
  entry: pageTypes,
  page: pageTypes,
  budget: ['none', 'undeclared', 'under_1m', '1m_2m', '2m_4m', 'over_4m']
};
const fields = Object.entries(dimensions);
const increment = `
  INSERT INTO daily_counts (date, event, market, channel, entry, page, budget, country_group, n)
  VALUES (date('now', '+3 hours'), ?1, ?2, ?3, ?4, ?5, ?6, ?7, 1)
  ON CONFLICT (date, event, market, channel, entry, page, budget, country_group)
  DO UPDATE SET n = daily_counts.n + 1`;

function validEvent(data) {
  if (!data || typeof data !== 'object' || Object.keys(data).length !== fields.length) return false;
  if (!fields.every(([key, allowed]) => Object.hasOwn(data, key) && allowed.includes(data[key]))) return false;
  return data.budget === 'none' || (data.event === 'inquiry_sent' && data.market !== 'de');
}

function countryGroup(country) {
  if (country === 'SA') return 'SA';
  return typeof country === 'string' && /^[A-Z]{2}$/.test(country) && country !== 'XX' ? 'other' : 'unknown';
}

async function readEvent(request) {
  if (Number(request.headers.get('Content-Length')) > maxBytes) return { status: 413 };
  if (!request.body) return { status: 400 };
  const reader = request.body.getReader();
  const bytes = new Uint8Array(maxBytes);
  let length = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      if (length + value.byteLength > maxBytes) {
        await reader.cancel();
        return { status: 413 };
      }
      bytes.set(value, length);
      length += value.byteLength;
    }
    const json = new TextDecoder('utf-8', { fatal: true }).decode(bytes.subarray(0, length));
    const data = JSON.parse(json);
    return validEvent(data) ? { data } : { status: 400 };
  } catch {
    return { status: 400 };
  } finally {
    reader.releaseLock();
  }
}

function reply(status, headers = {}) {
  return new Response(null, { status, headers: { 'Cache-Control': 'no-store', Vary: 'Origin', ...headers } });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== '/event' || url.search) return reply(404);
    if (request.headers.get('Origin') !== siteOrigin) return reply(403);
    const cors = { 'Access-Control-Allow-Origin': siteOrigin };
    if (request.method === 'OPTIONS') {
      if (request.headers.get('Access-Control-Request-Method') !== 'POST') return reply(405, cors);
      return reply(204, { ...cors, 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type' });
    }
    if (request.method !== 'POST') return reply(405, { ...cors, Allow: 'POST, OPTIONS' });
    if (request.headers.get('DNT') === '1' || request.headers.get('Sec-GPC') === '1') return reply(204, cors);
    if (request.headers.has('Cookie') || request.headers.has('Authorization')) return reply(403, cors);
    const mediaType = request.headers.get('Content-Type')?.split(';')[0].trim().toLowerCase();
    if (mediaType !== 'application/json' && mediaType !== 'text/plain') return reply(415, cors);

    const { data, status } = await readEvent(request);
    if (status) return reply(status, cors);
    const { event, market, channel, entry, page, budget } = data;
    try {
      await env.COUNTS.prepare(increment).bind(event, market, channel, entry, page, budget, countryGroup(request.cf?.country)).run();
    } catch {
      return reply(503, cors);
    }
    return reply(204, cors);
  }
};
