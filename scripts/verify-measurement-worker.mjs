import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import worker from '../measurement/worker.mjs';

const origin = 'https://wbstudio.xyz';
const base = { event: 'page_view', market: 'ar', channel: 'organic_search', entry: 'luxury_villa', page: 'service', budget: 'none' };

function request(payload = base, headers = {}, method = 'POST', path = '/event') {
  return new Request('https://collector.example' + path, {
    method, headers: { Origin: origin, 'Content-Type': 'application/json', ...headers },
    body: method === 'POST' ? (typeof payload === 'string' ? payload : JSON.stringify(payload)) : undefined
  });
}

function database() {
  const writes = [];
  const COUNTS = { prepare: (sql) => ({ bind: (...args) => ({ run: async () => { writes.push({ sql, args }); } }) }) };
  return { writes, COUNTS };
}

test('accepts only same-site POST events and the required CORS preflight', async () => {
  const db = database();
  const preflight = await worker.fetch(request(base, {
    'Access-Control-Request-Method': 'POST', 'Access-Control-Request-Headers': 'content-type'
  }, 'OPTIONS'), db);
  assert.equal(preflight.status, 204);
  assert.equal(preflight.headers.get('Access-Control-Allow-Origin'), origin);
  assert.equal(preflight.headers.get('Access-Control-Allow-Credentials'), null);
  for (const bad of [request(base, { Origin: 'https://example.org' }), request(base, { Origin: '' }),
    request(base, { Cookie: 'session=example' }), request(base, { Authorization: 'Bearer example' }),
    request(base, {}, 'GET'), request(base, {}, 'GET', '/report'), request(base, {}, 'POST', '/event?name=example'),
    request(base, { 'Content-Type': 'application/x-www-form-urlencoded' })]) {
    const res = await worker.fetch(bad, db);
    assert.ok(res.status >= 400);
    assert.equal(await res.text(), '');
  }
  assert.equal(db.writes.length, 0);
});

test('discards opt-outs, malformed, identifying, oversized and out-of-scope payloads', async () => {
  const db = database();
  for (const header of ['DNT', 'Sec-GPC']) {
    assert.equal((await worker.fetch(request(base, { [header]: '1' }), db)).status, 204);
  }
  for (const invalid of [null, [], 'bad JSON', { ...base, email: 'example@example.org' },
    { ...base, market: null }, { ...base, event: 'unknown' }, { ...base, entry: '/work/' },
    { ...base, channel: 'google.com' }, { ...base, page: undefined }, { ...base, budget: 'under_1m' },
    { ...base, event: 'inquiry_sent', market: 'de', budget: 'over_4m' }]) {
    assert.equal((await worker.fetch(request(invalid), db)).status, 400);
  }
  assert.equal((await worker.fetch(request(' '.repeat(1000) + JSON.stringify(base)), db)).status, 413);
  assert.equal(db.writes.length, 0);
});

test('stores coarse categories and atomically aggregates daily counts and 30-day reports', async () => {
  const db = database();
  async function send(payload, country, headers = {}) {
    const req = request(payload, { 'Content-Type': 'text/plain;charset=UTF-8', ...headers });
    Object.defineProperty(req, 'cf', { value: { country, city: 'must-never-be-stored' } });
    assert.equal((await worker.fetch(req, db)).status, 204);
  }
  await send(base, 'SA');
  await send(base, 'SA');
  await send({ ...base, event: 'inquiry_sent', page: 'contact', budget: '2m_4m' }, 'SA');
  await send({ ...base, event: 'phone_click' }, 'DE');
  await send({ ...base, event: 'email_click' }, 'XX', { 'CF-IPCountry': 'SA' });
  await send({ ...base, event: 'whatsapp_click' }, undefined);
  assert.ok(db.writes.every(({ args }) => !args.includes('must-never-be-stored')));

  // Use the standard-library SQLite shipped with the site's Python verification runtime.
  const schema = readFileSync(new URL('../measurement/schema.sql', import.meta.url), 'utf8');
  const script = `
import json, sqlite3, sys
data = json.load(sys.stdin)
db = sqlite3.connect(':memory:')
db.executescript(data['schema'])
for write in data['writes']:
    db.execute(write['sql'], write['args'])
assert db.execute("SELECT sum(n), count(*) FROM daily_counts").fetchone() == (6, 5)
assert db.execute("SELECT distinct date FROM daily_counts").fetchall() == [db.execute("SELECT date('now', '+3 hours')").fetchone()]
assert db.execute("SELECT country_group, sum(n) FROM daily_counts GROUP BY country_group ORDER BY country_group").fetchall() == [('SA', 3), ('other', 1), ('unknown', 2)]
db.execute("INSERT INTO daily_counts SELECT date('now', '+3 hours', '-30 days'),event,market,channel,entry,page,budget,country_group,15 FROM daily_counts WHERE event='inquiry_sent'")
assert db.execute("SELECT page_views, inquiries FROM source_funnel_30d WHERE country_group='SA'").fetchall() == [(2, 1)]
assert db.execute("SELECT budget, inquiries FROM inquiry_budgets_30d").fetchall() == [('2m_4m', 1)]
`;
  const result = spawnSync(process.platform === 'win32' ? 'python' : 'python3', ['-c', script], {
    input: JSON.stringify({ schema, writes: db.writes }), encoding: 'utf8'
  });
  assert.equal(result.status, 0, result.error?.message || result.stderr);
});
