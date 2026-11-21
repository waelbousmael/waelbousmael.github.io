#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (url) => fs.readFileSync(path.join(root, url, 'index.html'), 'utf8');
const { projects } = JSON.parse(fs.readFileSync(path.join(root, 'data/projects.json'), 'utf8'));
const slug = 'hillside-villa-aley';
const featuredSlug = 'khamis-mushait-villa';
const nightImage = `/assets/projects/${featuredSlug}/gallery-02.webp`;
const locales = [
  { lang: 'en', home: '/', work: '/en/work/', contact: '/en/contact/', project: `/en/work/${slug}/`, current: 'Under construction', future: 'Proposed design' },
  { lang: 'ar', home: '/ar/', work: '/work/', contact: '/contact/', project: `/work/${slug}/`, current: 'قيد التنفيذ', future: 'التصميم المقترح' },
  { lang: 'de', home: '/de/', work: '/de/projekte/', contact: '/de/kontakt/', project: `/de/projekte/${slug}/`, current: 'Im Bau', future: 'Geplanter Entwurf' }
];

test('Khamis Mushait Villa leads the real portfolio in every language', () => {
  assert.equal(projects[0].slug, featuredSlug);
  assert.equal(projects[0].placeholder, false);
  assert.equal(projects[0].featured, true);
  for (const locale of locales) {
    for (const url of [locale.home, locale.work]) {
      const first = read(url).match(/<a class="project-card[^>]*href="([^"]+)"/);
      assert.equal(first?.[1], `${locale.work}${featuredSlug}/`, `${locale.lang} ${url}: villa must be first`);
    }
  }
});

test('the opening night view offers a blank WhatsApp conversation and the localized inquiry form', () => {
  for (const locale of locales) {
    for (const url of locale.lang === 'en' ? [locale.home, '/en/'] : [locale.home]) {
      const html = read(url);
      const hero = html.match(/<main\b[^>]*>\s*<section\b[^>]*class="home-hero"[^>]*>([\s\S]*?)<\/section>/)?.[1];
      assert.ok(hero, `${url}: opening section must contain the hero`);
      const firstImage = hero.match(/<img\b[^>]*>/)?.[0] || '';
      assert.ok(firstImage.includes(`src="${nightImage}"`), `${url}: show the night rendering first`);
      assert.match(firstImage, /\bsizes="\(max-width: \d+px\) max\(100vw, [^"]+\), 100vw"/,
        `${url}: request enough image detail for the mobile crop and full desktop width`);
      assert.match(firstImage, /\bfetchpriority="high"/);
      assert.ok(hero.includes(`href="${locale.work}${featuredSlug}/"`), `${url}: open the pictured villa's case study`);
      const actions = hero.match(/<div class="hero-actions">([\s\S]*?)<\/div>/)?.[1] || '';
      const targets = [...actions.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)].map((match) => match[1]);
      assert.deepEqual(targets, ['https://wa.me/966538060383', `${locale.contact}#leadForm`], `${url}: hero actions`);
      assert.match(read(locale.contact), /<form\b[^>]*\bid="leadForm"/);
      assert.ok(html.includes(`property="og:image" content="https://wbstudio.xyz${nightImage}"`));
    }
  }
});

test('localized pages distinguish construction photographs from future design', () => {
  const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
  for (const locale of locales) {
    const html = read(locale.project);
    assert.ok(sitemap.includes(`https://wbstudio.xyz${locale.project}`));
    assert.match(html, new RegExp(`<html lang="${locale.lang}"`));
    assert.ok(html.includes('data-project-comparison'));
    const comparison = html.match(/<section\b[^>]*data-project-comparison[^>]*>([\s\S]*?)<\/section>/)?.[1];
    assert.equal((comparison.match(/<img\b/g) || []).length, 2);
    assert.ok(comparison.includes(`/assets/projects/${slug}/gallery-01.webp`));
    assert.ok(comparison.includes(`/assets/projects/${slug}/gallery-02.webp`));
    assert.ok(html.includes(locale.current));
    assert.ok(html.includes(locale.future));
    assert.ok(html.includes('2026'));
    assert.ok(html.includes(locale.lang === 'ar' ? 'قضاء عاليه، جبل لبنان' : locale.lang === 'de' ? 'Bezirk Aley, Libanongebirge' : 'Aley District, Mount Lebanon'));
    assert.doesNotMatch(html, /Villa Shaya_Permit|BADGHAN_695|href="[^"]+\.pdf"/);
    for (const alternate of locales) assert.ok(html.includes(`href="https://wbstudio.xyz${alternate.project}"`));
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
  }
});
