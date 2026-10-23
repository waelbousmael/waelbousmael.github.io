#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (url) => fs.readFileSync(path.join(root, url, 'index.html'), 'utf8');
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const canonical = (html) => [...html.matchAll(/<link\b[^>]*>/g)].map((m) => attrs(m[0])).find((a) => a.rel === 'canonical')?.href;
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>https:\/\/wbstudio.xyz([^<]*)<\/loc>/g)].map((m) => m[1]);

test('English is served directly at root, with explicit Arabic and German homes', () => {
  assert.match(read('/'), /<html lang="en" dir="ltr">/);
  assert.equal(canonical(read('/')), 'https://wbstudio.xyz/');
  assert.match(read('/ar/'), /<html lang="ar" dir="rtl">/);
  assert.match(read('/de/'), /<html lang="de" dir="ltr">/);
  assert.equal(canonical(read('/en/')), 'https://wbstudio.xyz/');
  assert.ok(!urls.includes('/en/'), 'Alias should not duplicate the canonical homepage in sitemap');
  const js = fs.readFileSync(path.join(root, 'assets/js/site.js'), 'utf8');
  assert.doesNotMatch(js, /navigator\.(?:language|languages|geolocation)|location\.(?:replace|assign)|CF-IPCountry/);
});

test('German journey and Berlin services are complete and retain local intent', () => {
  for (const url of ['/de/', '/de/projekte/', '/de/leistungen/', '/de/ablauf/', '/de/ueber-uns/', '/de/kontakt/', '/de/bildnachweise/', '/de/hausplanung-berlin/', '/de/hausumbau-berlin/']) {
    const html = read(url);
    assert.match(html, /<html lang="de" dir="ltr">/, url);
    assert.doesNotMatch(html, /\bundefined\b|\[object Object\]/, url);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, url);
    assert.equal(canonical(html), `https://wbstudio.xyz${url}`);
    assert.ok(urls.includes(url), url);
    const header = html.match(/<header[\s\S]*?<\/header>/)[0];
    assert.match(header, /data-language-picker/, url);
    assert.match(header, /Deutsch/, url);
  }
  assert.match(read('/de/hausplanung-berlin/'), /Berlin/);
  assert.doesNotMatch(read('/de/hausplanung-berlin/').split('</head>')[0], /hreflang="(?:ar|en)"/, 'Distinct Berlin service is not a Jeddah translation');
  assert.ok(!urls.some((u) => /^\/de\/(?:villa-|obhur-|modern-|luxury-)/.test(u)));
});

test('language alternates resolve, identify their language, and link back', () => {
  for (const url of urls) {
    const html = read(url);
    for (const tag of html.matchAll(/<link\b[^>]*hreflang="(?:ar|en|de)"[^>]*>/g)) {
      const a = attrs(tag[0]);
      const otherPath = new URL(a.href).pathname;
      const other = read(otherPath);
      assert.match(other, new RegExp(`<html lang="${a.hreflang}"`), `${url} -> ${otherPath}`);
      assert.ok(other.includes(`href="https://wbstudio.xyz${url}"`), `${otherPath} must link back to ${url}`);
    }
  }
});

test('German form uses the existing fields with LTR contact data and no invented price bands', () => {
  const html = read('/de/kontakt/');
  assert.match(html, /action="https:\/\/formsubmit.co\/ajax\/wael.bousmael@gmail.com"/);
  for (const id of ['name', 'phone', 'email', 'location', 'maps', 'budget']) assert.match(html, new RegExp(`name="${id}"`));
  for (const id of ['phone', 'email', 'maps']) {
    const input = [...html.matchAll(/<input\b[^>]*>/g)].map((m) => attrs(m[0])).find((a) => a.id === id);
    assert.equal(input.dir, 'ltr');
  }
  assert.match(html, /EUR/);
  assert.match(html, /data-msg-phone=/);
  assert.doesNotMatch(html, /SAR|when Google Maps is enabled/);
});

test('draft legal pages stay out of the sitemap and search index', () => {
  for (const url of ['/de/impressum/', '/de/datenschutz/']) {
    const html = read(url);
    if (html.includes('data-legal-draft')) {
      assert.match(html, /name="robots" content="noindex, follow"/);
      assert.ok(!urls.includes(url));
    }
  }
});
