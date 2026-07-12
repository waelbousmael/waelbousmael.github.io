#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import site from '../data/site.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (relative) => fs.readFileSync(path.join(ROOT, relative), 'utf8');
const has = (text, fragment, label) => assert.ok(text.includes(fragment), label);
const assertPair = (field, label) => {
  assert.equal(typeof field?.ar, 'string', `${label}.ar must be a string`);
  assert.ok(field.ar.trim(), `${label}.ar must not be empty`);
  assert.equal(typeof field?.en, 'string', `${label}.en must be a string`);
  assert.ok(field.en.trim(), `${label}.en must not be empty`);
};
const withoutBlockComments = (text) => text.replace(/\/\*[\s\S]*?\*\//g, '');
const leadForm = (page, label) => {
  const match = page.match(/<form id="leadForm"(?=[\s>])[\s\S]*?<\/form>/);
  assert.ok(match, `${label} contact page must contain the lead form`);
  return match[0];
};

const homeAr = read('index.html');
const homeEn = read('en/index.html');
const contactAr = read('contact/index.html');
const contactEn = read('en/contact/index.html');
const css = read('assets/css/site.css');
const siteJs = read('assets/js/site.js');
const contactJs = read('assets/js/contact.js');

assert.ok(Array.isArray(site.home.trustItems), 'Homepage trust items must be an array');
assert.equal(site.home.trustItems.length, 4, 'Homepage must have exactly four trust items');
site.home.trustItems.forEach((item, index) => assertPair(item, `Homepage trust item ${index + 1}`));

assert.ok(Array.isArray(site.home.serviceThemes), 'Homepage service themes must be an array');
assert.equal(site.home.serviceThemes.length, 3, 'Homepage must have exactly three service themes');
site.home.serviceThemes.forEach((theme, index) => {
  const label = `Homepage service theme ${index + 1}`;
  assertPair(theme.title, `${label} title`);
  assertPair(theme.text, `${label} text`);
  assert.equal(typeof theme.href, 'string', `${label} href must be a string`);
});

has(homeAr, '<html lang="ar" dir="rtl">', 'Arabic root must use RTL Arabic markup');
has(homeEn, '<html lang="en" dir="ltr">', 'English mirror must use LTR English markup');

has(homeAr, '<link rel="canonical" href="https://wbstudio.xyz/" />', 'Arabic home canonical must target the root');
has(homeAr, '<link rel="alternate" hreflang="ar" href="https://wbstudio.xyz/" />', 'Arabic home must link its Arabic alternate');
has(homeAr, '<link rel="alternate" hreflang="en" href="https://wbstudio.xyz/en/" />', 'Arabic home must link its English alternate');
has(homeEn, '<link rel="canonical" href="https://wbstudio.xyz/en/" />', 'English home canonical must target /en/');
has(homeEn, '<link rel="alternate" hreflang="ar" href="https://wbstudio.xyz/" />', 'English home must link its Arabic alternate');
has(homeEn, '<link rel="alternate" hreflang="en" href="https://wbstudio.xyz/en/" />', 'English home must link its English alternate');

const whatsappHrefAr = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.waMessage.ar)}`;
const whatsappHrefEn = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.waMessage.en)}`;
has(homeAr, `href="${whatsappHrefAr}"`, 'Arabic home must contain its generated WhatsApp href');
has(homeEn, `href="${whatsappHrefEn}"`, 'English home must contain its generated WhatsApp href');

has(contactAr, '<link rel="canonical" href="https://wbstudio.xyz/contact/" />', 'Arabic contact canonical must target /contact/');
has(contactAr, '<link rel="alternate" hreflang="ar" href="https://wbstudio.xyz/contact/" />', 'Arabic contact must link its Arabic alternate');
has(contactAr, '<link rel="alternate" hreflang="en" href="https://wbstudio.xyz/en/contact/" />', 'Arabic contact must link its English alternate');
has(contactEn, '<link rel="canonical" href="https://wbstudio.xyz/en/contact/" />', 'English contact canonical must target /en/contact/');
has(contactEn, '<link rel="alternate" hreflang="ar" href="https://wbstudio.xyz/contact/" />', 'English contact must link its Arabic alternate');
has(contactEn, '<link rel="alternate" hreflang="en" href="https://wbstudio.xyz/en/contact/" />', 'English contact must link its English alternate');

for (const [label, page] of [['Arabic', contactAr], ['English', contactEn]]) {
  const form = leadForm(page, label);
  has(form, 'action="https://formsubmit.co/ajax/wael.bousmael@gmail.com"', `${label} contact form must use FormSubmit`);
  for (const field of ['name', 'phone', 'email', 'location', 'maps', 'budget']) {
    has(form, `name="${field}"`, `${label} contact form must retain the ${field} field`);
  }
  has(page, 'window.GOOGLE_MAPS_API_KEY', `${label} contact page must retain the Google Maps hook`);
}

assert.equal(site.whatsappNumber, '966538060383', 'The WhatsApp number must remain unchanged');
assert.equal(site.formAction, 'https://formsubmit.co/ajax/wael.bousmael@gmail.com', 'The FormSubmit endpoint must remain unchanged');
assert.match(withoutBlockComments(siteJs), /const\s+prefersReducedMotion\s*=\s*window\.matchMedia\(\s*(['"])\(prefers-reduced-motion:\s*reduce\)\1\s*\)\.matches\s*;[\s\S]*?if\s*\(\s*prefersReducedMotion\b[\s\S]*?\)\s*\{\s*revealElements\.forEach\s*\(/, 'Reduced-motion preference must control the reveal fallback');
assert.match(withoutBlockComments(contactJs), /const\s+apiKey\s*=\s*typeof\s+window\.GOOGLE_MAPS_API_KEY\s*===\s*(['"])string\1[\s\S]*?;[\s\S]*?loadGoogleMapsPlaces\(\s*apiKey\s*\)/, 'The Google Maps API key must flow into the Places loader');
assert.doesNotMatch(withoutBlockComments(css), /(?:repeating-)?(?:linear|radial|conic)-gradient\s*\(/i, 'CSS must not contain gradients');

console.log('Verification passed: bilingual shell, SEO alternates, contact plumbing, and motion invariants.');
