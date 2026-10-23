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

test('content-versioned browser assets retain LF bytes across Windows checkouts', () => {
  for (const file of ['assets/js/site.js', 'assets/js/contact.js', 'assets/css/site.css']) {
    assert.ok(!fs.readFileSync(path.join(root, file), 'utf8').includes('\r\n'), `${file}: checkout changed the bytes used in generated asset hashes`);
  }
  const rules = fs.readFileSync(path.join(root, '.gitattributes'), 'utf8');
  assert.match(rules, /^assets\/js\/\*\.js text eol=lf$/m);
  assert.match(rules, /^assets\/css\/\*\.css text eol=lf$/m);
});

test('country-labeled phone contacts retain Saudi-only WhatsApp routing in every language', () => {
  for (const [url, html] of pages) {
    for (const number of ['+966538060383', '+4917683223821', '+9613038248']) {
      assert.ok(html.includes(`href="tel:${number}" dir="ltr"`), `${url}: missing phone ${number}`);
    }
    for (const match of html.matchAll(/href="https:\/\/wa\.me\/([^?"/]+)/g)) {
      assert.equal(match[1], '966538060383', `${url}: WhatsApp must use the Saudi number`);
    }
    const lang = html.match(/<html lang="([^"]+)"/)[1];
    for (const label of { en: ['Saudi Arabia', 'Germany', 'Lebanon'], ar: ['السعودية', 'ألمانيا', 'لبنان'], de: ['Saudi-Arabien', 'Deutschland', 'Libanon'] }[lang]) {
      assert.match(html, new RegExp(`class="phone-country"[^>]*>${label}<`), `${url}: missing country label ${label}`);
    }
  }
});

test('organization contact points expose the owner-approved numbers without adding offices', () => {
  for (const url of ['/', '/ar/', '/de/']) {
    const organization = graph(page(url)).find((node) => node['@type'] === 'Organization');
    assert.equal(organization.telephone, '+966538060383');
    assert.ok(Array.isArray(organization.contactPoint), `${url}: missing additional contact points`);
    assert.deepEqual(organization.contactPoint.map((point) => point.telephone).sort(),
      ['+4917683223821', '+9613038248', '+966538060383'].sort());
    assert.ok(organization.contactPoint.every((point) => !point.address && !point.areaServed), 'A phone country does not establish an office or service area');
  }
});

test('indexable pages have distinct metadata and localized canonical page entities', () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const [url, html] of pages) {
    const title = html.match(/<title>(.*?)<\/title>/)[1];
    const desc = [...html.matchAll(/<meta\b[^>]*>/g)].map((m) => attributes(m[0])).find((m) => m.name === 'description').content;
    assert.ok(!titles.has(title), `${url}: duplicate title`);
    assert.ok(!descriptions.has(desc), `${url}: duplicate description`);
    titles.add(title); descriptions.add(desc);
    const entity = graph(html).find((node) => node['@id'] === site.domain + url + '#webpage');
    assert.ok(entity, `${url}: missing canonical page entity`);
    assert.equal(entity.url, site.domain + url);
    assert.equal(entity.inLanguage, html.match(/<html lang="([^"]+)"/)[1]);
    assert.equal(entity.isPartOf['@id'], site.domain + '/#website');
    if (url.endsWith('/kontakt/') || url.endsWith('/contact/')) assert.equal(entity['@type'], 'ContactPage');
    assert.equal(entity.primaryImageOfPage.url, [...html.matchAll(/<meta\b[^>]*>/g)].map((m) => attributes(m[0])).find((m) => m.property === 'og:image').content);
  }
});

test('sharing previews describe the actual image with dimensions in every language', () => {
  for (const [url, html] of pages) {
    const meta = [...html.matchAll(/<meta\b[^>]*>/g)].map((m) => attributes(m[0]));
    const value = (key) => meta.find((m) => m.property === key || m.name === key)?.content;
    assert.ok(value('og:image:alt')?.trim(), `${url}: missing localized image description`);
    assert.equal(value('twitter:image:alt'), value('og:image:alt'));
    assert.ok(Number(value('og:image:width')) > 0, `${url}: missing image width`);
    assert.ok(Number(value('og:image:height')) > 0, `${url}: missing image height`);
    assert.equal(value('og:title'), html.match(/<title>(.*?)<\/title>/)[1]);
  }
});

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
    const fullBleed = [...html.matchAll(/<div class="wrap full-bleed"[^>]*>([\s\S]*?)<\/div>/g)].map((match) => match[1]).join('\n');
    for (const match of fullBleed.matchAll(/<img\b[^>]*>/g)) {
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
