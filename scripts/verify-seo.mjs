#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import site from '../data/site.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const page = (urlPath) => fs.readFileSync(path.join(root, urlPath, 'index.html'), 'utf8');
const attributes = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const graph = (html) => JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
const sitemapPaths = [...fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const pages = new Map(sitemapPaths.map((url) => [url, page(url)]));

test('all content images have responsive sources and accurate markup', () => {
  for (const [url, html] of pages) {
    for (const match of html.matchAll(/<img\b[^>]*>/g)) {
      const image = attributes(match[0]);
      if (image.src.startsWith('/assets/icons/')) continue;
      if (Number(image.width) > 640) {
        assert.ok(image.srcset, `${url}: ${image.src} needs responsive sources`);
        assert.ok(image.sizes, `${url}: responsive sources need a layout size`);
        const candidates = image.srcset.split(',').map((item) => item.trim().split(/\s+/));
        assert.ok(candidates.some(([src]) => src === image.src), 'Fallback source must be in the candidate set');
        for (const [src, width] of candidates) {
          assert.match(width, /^\d+w$/);
          assert.ok(fs.existsSync(path.join(root, src)), `${url}: missing image ${src}`);
        }
      }
    }
  }
});

for (const lang of ['ar', 'en']) {
  const prefix = lang === 'ar' ? '' : '/en';
  test(`${lang}: articles identify authors and have useful incoming links`, () => {
    for (const article of site.journal) {
      const url = `${prefix}/journal/${article.slug}/`;
      const html = pages.get(url);
      const schema = graph(html).find((item) => item['@type'] === 'Article');
      assert.equal(schema.author['@type'], 'Person');
      assert.equal(schema.author.name, 'Wael Bousmael');
      assert.equal(schema.author.url, `${site.domain}${prefix}/about/`);
      assert.equal(schema.publisher.name, site.brand);
      assert.ok(html.includes('class="article-byline"'), `${url}: missing visible author byline`);
      assert.notEqual(schema.image, site.ogImage, `${url}: needs a representative image`);
      assert.ok(html.includes('property="og:type" content="article"'));
      const inbound = [...pages].filter(([other, content]) => other !== url &&
        (lang === 'en' ? other.startsWith('/en/') : !other.startsWith('/en/')) && content.includes(`href="${url}"`));
      assert.ok(inbound.length >= 2, `${url}: only ${inbound.length} same-language incoming page(s)`);
    }
  });
  test(`${lang}: landing previews represent the service`, () => {
    for (const landing of site.landings) {
      const html = pages.get(`${prefix}/${landing.slug}/`);
      const image = [...html.matchAll(/<meta\b[^>]*>/g)].map((m) => attributes(m[0])).find((m) => m.property === 'og:image');
      assert.equal(image.content, site.domain + landing.image.src);
    }
  });
}

test('email links work with the visitor\'s email client', () => {
  for (const [url, html] of pages) {
    assert.ok(html.includes(`href="mailto:${site.email}"`), `${url}: missing standard email link`);
    assert.ok(!html.includes('href="https://mail.google.com/'), `${url}: email still requires Gmail`);
  }
});

test('edge-to-edge project imagery requests full-width sources', () => {
  for (const [url, html] of pages) {
    if (!html.includes('data-page="project"') && !html.includes('data-page="landing"')) continue;
    for (const match of html.matchAll(/<img\b[^>]*>/g)) {
      const image = attributes(match[0]);
      if (!image.src.startsWith('/assets/projects/')) continue;
      assert.ok(image.sizes.startsWith('100vw') || image.sizes.startsWith('(max-width: 860px) 100vw'), `${url}: full-bleed image ${image.src} underestimates its display width`);
    }
  }
});

test('generated internal links and language alternates resolve', () => {
  for (const [url, html] of pages) {
    for (const match of html.matchAll(/\bhref="(\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
      const target = match[1];
      const file = path.join(root, target, target.endsWith('/') ? 'index.html' : '');
      assert.ok(fs.existsSync(file), `${url}: broken link to ${target}`);
    }
    assert.equal((html.match(/<h1\b/g) || []).length, 1, `${url}: expected one H1`);
    const canonical = [...html.matchAll(/<link\b[^>]*>/g)].map((m) => attributes(m[0])).find((l) => l.rel === 'canonical');
    assert.equal(canonical.href, site.domain + url);
  }
});
