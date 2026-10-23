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
const locales = [
  { lang: 'en', home: '/', work: '/en/work/', project: `/en/work/${slug}/`, current: 'Under construction', future: 'Proposed design' },
  { lang: 'ar', home: '/ar/', work: '/work/', project: `/work/${slug}/`, current: 'قيد التنفيذ', future: 'التصميم المقترح' },
  { lang: 'de', home: '/de/', work: '/de/projekte/', project: `/de/projekte/${slug}/`, current: 'Im Bau', future: 'Geplanter Entwurf' }
];

test('Aley villa leads the real portfolio in every language', () => {
  assert.equal(projects[0].slug, slug);
  assert.equal(projects[0].placeholder, false);
  assert.equal(projects[0].featured, true);
  for (const locale of locales) {
    for (const url of [locale.home, locale.work]) {
      const first = read(url).match(/<a class="project-card[^>]*href="([^"]+)"/);
      assert.equal(first?.[1], locale.project, `${locale.lang} ${url}: villa must be first`);
    }
  }
});

test('homepage spotlight links the actual villa and identifies its design image', () => {
  for (const locale of locales) {
    const hero = read(locale.home).match(/<div class="home-hero-media">([\s\S]*?)<\/div>/)?.[1];
    assert.ok(hero?.includes(`href="${locale.project}"`), `${locale.lang}: homepage image needs project link`);
    assert.ok(hero.includes('/assets/projects/hillside-villa-aley/cover.webp'));
    assert.ok(hero.includes(locale.current));
    assert.ok(hero.includes(locale.future));
    assert.ok(read(locale.home).includes('property="og:image" content="https://wbstudio.xyz/assets/projects/hillside-villa-aley/cover.webp"'));
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
