#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import site from '../data/site.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (relative) => fs.readFileSync(path.join(ROOT, relative), 'utf8');
const has = (text, fragment, label) => assert.ok(text.includes(fragment), label);

const homeAr = read('index.html');
const homeEn = read('en/index.html');
const contactAr = read('contact/index.html');
const contactEn = read('en/contact/index.html');
const build = read('scripts/build.mjs');
const css = read('assets/css/site.css');
const siteJs = read('assets/js/site.js');
const contactJs = read('assets/js/contact.js');

has(homeAr, '<html lang="ar" dir="rtl">', 'Arabic root must use RTL Arabic markup');
has(homeEn, '<html lang="en" dir="ltr">', 'English mirror must use LTR English markup');

has(homeAr, '<link rel="canonical" href="https://wbstudio.xyz/" />', 'Arabic home canonical must target the root');
has(homeAr, '<link rel="alternate" hreflang="ar" href="https://wbstudio.xyz/" />', 'Arabic home must link its Arabic alternate');
has(homeAr, '<link rel="alternate" hreflang="en" href="https://wbstudio.xyz/en/" />', 'Arabic home must link its English alternate');
has(homeEn, '<link rel="canonical" href="https://wbstudio.xyz/en/" />', 'English home canonical must target /en/');
has(homeEn, '<link rel="alternate" hreflang="ar" href="https://wbstudio.xyz/" />', 'English home must link its Arabic alternate');
has(homeEn, '<link rel="alternate" hreflang="en" href="https://wbstudio.xyz/en/" />', 'English home must link its English alternate');

for (const [label, page] of [['Arabic', contactAr], ['English', contactEn]]) {
  has(page, 'action="https://formsubmit.co/ajax/wael.bousmael@gmail.com"', `${label} contact form must use FormSubmit`);
  for (const field of ['name', 'phone', 'email', 'location', 'maps', 'budget']) {
    has(page, `name="${field}"`, `${label} contact form must retain the ${field} field`);
  }
  has(page, 'window.GOOGLE_MAPS_API_KEY', `${label} contact page must retain the Google Maps hook`);
}

has(build, 'const waUrl =', 'The build must own the WhatsApp URL');
assert.equal(site.whatsappNumber, '966538060383', 'The WhatsApp number must remain unchanged');
assert.equal(site.formAction, 'https://formsubmit.co/ajax/wael.bousmael@gmail.com', 'The FormSubmit endpoint must remain unchanged');
has(siteJs, 'prefers-reduced-motion', 'Site motion must respect reduced-motion preferences');
has(contactJs, 'window.GOOGLE_MAPS_API_KEY', 'Contact JavaScript must retain the Google Maps hook');
assert.ok(!css.includes('linear-gradient'), 'CSS must not contain linear gradients');
assert.ok(!css.includes('radial-gradient'), 'CSS must not contain radial gradients');

console.log('Verification passed: bilingual shell, SEO alternates, contact plumbing, and motion invariants.');
