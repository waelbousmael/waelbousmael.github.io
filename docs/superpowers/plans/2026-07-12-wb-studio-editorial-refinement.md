# WB Studio Editorial Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the approved editorial refinement across WB Studio while preserving the bilingual generator, SEO structure, contact plumbing, and conversion promise.

**Architecture:** Keep `data/site.mjs` and `data/projects.json` as canonical content, update page structure only in `scripts/build.mjs`, and implement the visual system in the single shared `assets/css/site.css`. Add one zero-dependency verification script that checks generated output and untouchable business behavior after every task.

**Tech Stack:** Node.js 18+ ESM, static HTML, dependency-free CSS and JavaScript, GitHub Pages.

---

## File Map

- Create `scripts/verify.mjs`: zero-dependency structural, bilingual, SEO, and contact-plumbing verification.
- Modify `data/site.mjs`: bilingual credibility-strip and homepage service-theme labels only.
- Modify `scripts/build.mjs`: shared header, homepage, Work, project, Services, Approach, About, Journal, and Contact markup.
- Modify `assets/css/site.css`: editorial layout, responsive behavior, typography rhythm, and removal of decorative stamp/workflow effects.
- Regenerate `index.html`, mirrored `en/` pages, all page directories, and `sitemap.xml` with `node scripts/build.mjs`.
- Do not modify `data/projects.json`, `assets/js/site.js`, `assets/js/contact.js`, `404.html`, `CNAME`, `.nojekyll`, `manifest.webmanifest`, or licensed imagery unless a failing verification proves a regression requires it.

## Task 1: Add the Zero-Dependency Verification Harness

**Files:**
- Create: `scripts/verify.mjs`

- [ ] **Step 1: Create the verification script**

```js
#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import site from '../data/site.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (relative) => fs.readFileSync(path.join(ROOT, relative), 'utf8');
const has = (text, fragment, label) => assert.ok(text.includes(fragment), label);

const arHome = read('index.html');
const enHome = read('en/index.html');
const arContact = read('contact/index.html');
const enContact = read('en/contact/index.html');
const build = read('scripts/build.mjs');
const css = read('assets/css/site.css');
const siteJs = read('assets/js/site.js');
const contactJs = read('assets/js/contact.js');

assert.match(arHome, /<html lang="ar" dir="rtl">/, 'Arabic root must be RTL');
assert.match(enHome, /<html lang="en" dir="ltr">/, 'English mirror must be LTR');
has(arHome, 'hreflang="en" href="https://wbstudio.xyz/en/"', 'Arabic home needs English alternate');
has(enHome, 'hreflang="ar" href="https://wbstudio.xyz/"', 'English home needs Arabic alternate');
has(arHome, '<link rel="canonical" href="https://wbstudio.xyz/"', 'Arabic canonical must remain stable');
has(enHome, '<link rel="canonical" href="https://wbstudio.xyz/en/"', 'English canonical must remain stable');

for (const html of [arContact, enContact]) {
  has(html, 'https://formsubmit.co/ajax/wael.bousmael@gmail.com', 'FormSubmit endpoint changed');
  for (const field of ['name="name"', 'name="phone"', 'name="email"', 'name="location"', 'name="maps"', 'name="budget"']) {
    has(html, field, `Missing contact field ${field}`);
  }
  has(html, 'window.GOOGLE_MAPS_API_KEY', 'Dormant Maps hook changed');
}

has(build, "const waUrl =", 'WhatsApp URL helper must remain generator-owned');
assert.equal(site.whatsappNumber, '966538060383', 'WhatsApp number changed');
assert.equal(site.formAction, 'https://formsubmit.co/ajax/wael.bousmael@gmail.com', 'FormSubmit config changed');
has(siteJs, 'prefers-reduced-motion', 'Reduced-motion behavior changed');
has(contactJs, 'window.GOOGLE_MAPS_API_KEY', 'Contact Maps hook changed');
assert.doesNotMatch(css, /linear-gradient|radial-gradient/, 'Gradients are not allowed');

console.log('Verification passed: bilingual shell, SEO alternates, contact plumbing, and motion invariants.');
```

- [ ] **Step 2: Run the baseline verifier**

Run: `node scripts/verify.mjs`  
Expected: `Verification passed: bilingual shell, SEO alternates, contact plumbing, and motion invariants.`

- [ ] **Step 3: Commit the verification harness**

```bash
git add scripts/verify.mjs
git commit -m "test: add static site verification harness"
```

## Task 2: Add Bilingual Homepage Editorial Data

**Files:**
- Modify: `scripts/verify.mjs`
- Modify: `data/site.mjs:63-103`

- [ ] **Step 1: Add failing bilingual-data assertions**

Append after the imports and file helpers in `scripts/verify.mjs`:

```js
const assertPair = (field, label) => {
  assert.equal(typeof field?.ar, 'string', `${label}.ar must be a string`);
  assert.equal(typeof field?.en, 'string', `${label}.en must be a string`);
  assert.ok(field.ar.trim(), `${label}.ar must not be empty`);
  assert.ok(field.en.trim(), `${label}.en must not be empty`);
};

assert.equal(site.home.trustItems.length, 4, 'Homepage needs four credibility items');
site.home.trustItems.forEach((item, index) => assertPair(item, `home.trustItems[${index}]`));
assert.equal(site.home.serviceThemes.length, 3, 'Homepage needs three editorial service themes');
site.home.serviceThemes.forEach((item, index) => {
  assertPair(item.title, `home.serviceThemes[${index}].title`);
  assertPair(item.text, `home.serviceThemes[${index}].text`);
  assert.equal(typeof item.href, 'string', `home.serviceThemes[${index}].href must be a path`);
});
```

- [ ] **Step 2: Run the verifier to prove the data is missing**

Run: `node scripts/verify.mjs`  
Expected: FAIL with `Cannot read properties of undefined` for `site.home.trustItems`.

- [ ] **Step 3: Add the approved bilingual data under `home`**

Add after `ctaWork` in `data/site.mjs`:

```js
    trustItems: [
      { ar: 'خبرة تتجاوز 12 عاماً', en: '12+ years of experience' },
      { ar: 'معماري ومنسق BIM', en: 'Architect & BIM coordinator' },
      { ar: 'جدة · السعودية · الخليج', en: 'Jeddah · Saudi Arabia · GCC' },
      { ar: 'من الفكرة إلى مخططات التنفيذ', en: 'From concept to construction documentation' }
    ],
    serviceThemes: [
      {
        title: { ar: 'تصميم فيلا خاصة في جدة', en: 'Private villa design in Jeddah' },
        text: { ar: 'من قراءة الأرض والاحتياجات إلى فكرة معمارية بهوية واضحة.', en: 'From reading the plot and brief to an architectural idea with a clear identity.' },
        href: '/villa-design-jeddah/'
      },
      {
        title: { ar: 'الخصوصية والضيافة والمناخ', en: 'Privacy, hospitality and climate' },
        text: { ar: 'فراغات توازن حياة العائلة واستقبال الضيوف والضوء والتظليل.', en: 'Spaces balancing family life, hospitality, daylight and shade.' },
        href: '/modern-villa-design-jeddah/'
      },
      {
        title: { ar: 'تصميم جاهز للتنفيذ وتنسيق BIM', en: 'Build-ready design & BIM coordination' },
        text: { ar: 'وضوح بين المعماري والإنشائي والميكانيكي قبل الوصول إلى الموقع.', en: 'Clarity across architectural, structural and MEP disciplines before site work.' },
        href: '/approach/'
      }
    ],
```

- [ ] **Step 4: Run the verifier**

Run: `node scripts/verify.mjs`  
Expected: PASS.

- [ ] **Step 5: Commit the bilingual data**

```bash
git add data/site.mjs scripts/verify.mjs
git commit -m "content: add editorial homepage trust data"
```

## Task 3: Implement the Shared Header and Homepage Structure

**Files:**
- Modify: `scripts/verify.mjs`
- Modify: `scripts/build.mjs:100-145`
- Modify: `scripts/build.mjs:330-420`
- Regenerate: `index.html`, `en/index.html`, `sitemap.xml`

- [ ] **Step 1: Add failing generated-markup assertions**

Append to `scripts/verify.mjs`:

```js
for (const [html, label] of [[arHome, 'Arabic'], [enHome, 'English']]) {
  has(html, 'class="mobile-lang-link"', `${label} mobile language link must stay visible`);
  has(html, 'class="home-hero-grid"', `${label} home needs split hero grid`);
  has(html, 'class="home-hero-copy"', `${label} home needs hero copy region`);
  has(html, 'class="home-hero-media"', `${label} home needs hero media region`);
  has(html, 'class="trust-strip"', `${label} home needs credibility strip`);
  has(html, 'class="home-work-grid"', `${label} home needs editorial work grid`);
  has(html, 'class="home-service-list"', `${label} home needs editorial service rows`);
  has(html, 'class="footer-grid footer-editorial"', `${label} needs simplified editorial footer`);
}
```

- [ ] **Step 2: Run the verifier to prove the approved structure is absent**

Run: `node scripts/verify.mjs`  
Expected: FAIL with `Arabic mobile language link must stay visible`.

- [ ] **Step 3: Add the visible mobile language switch to `header()`**

Replace the end of `.header-inner` with:

```js
    <div class="mobile-header-actions">
      ${langLink('mobile-lang-link')}
      <button class="nav-toggle" type="button" data-nav-toggle aria-expanded="false" aria-controls="mobileMenu" aria-label="${esc(t(n.menuOpen, lang))}">
        <span></span><span></span>
      </button>
    </div>
```

Remove `${langLink('lang-link')}` from `.mobile-links` so the switch is not duplicated in the mobile menu. Keep the desktop `.lang-link` in `.header-nav`.

In `footer()`, change `<div class="wrap footer-grid">` to `<div class="wrap footer-grid footer-editorial">`. Preserve all footer links, contact details, credits, locations, and direction attributes.

- [ ] **Step 4: Replace `renderHome()` hero and homepage content markup**

Use the existing `h`, `featured`, and `steps` variables, then render this structure inside `<main>`:

```js
  <section class="home-hero" data-reveal>
    <div class="wrap home-hero-grid">
      <div class="home-hero-copy">
        <p class="eyebrow">${esc(t(h.eyebrow, lang))}</p>
        <h1 class="display-xl">${esc(t(h.h1, lang))}</h1>
        <p class="lead">${esc(t(h.positioning, lang))}</p>
        <p class="offer">${esc(t(site.offer, lang))}</p>
        <div class="cta-row">
          <a class="btn btn-solid" href="${waUrl(lang)}" target="_blank" rel="noopener">${esc(t(h.ctaWhatsapp, lang))}</a>
          <a class="btn" href="${langPath(lang, '/work/')}">${esc(t(h.ctaWork, lang))}</a>
        </div>
      </div>
      <div class="home-hero-media">${img(h.heroImage, lang, { eager: true })}</div>
    </div>
  </section>
  <div class="wrap">
    <ul class="trust-strip" aria-label="${lang === 'ar' ? 'خبرة الاستوديو' : 'Studio credentials'}">
      ${h.trustItems.map((item) => `<li>${esc(t(item, lang))}</li>`).join('\n      ')}
    </ul>
  </div>

  <section class="section" data-reveal>
    <div class="wrap">
      <div class="section-head">
        <h2 class="display">${esc(t(h.selectedTitle, lang))}</h2>
        <a class="text-link" href="${langPath(lang, '/work/')}">${esc(t(h.allWork, lang))} ${arrow(lang)}</a>
      </div>
      <div class="home-work-grid">
        ${featured.map((p, i) => projectCard(p, lang, { wide: i === 0 })).join('\n        ')}
      </div>
    </div>
  </section>

  <section class="section home-services" data-reveal>
    <div class="wrap home-services-grid">
      <div>
        <p class="eyebrow">${esc(t(site.nav.services, lang))}</p>
        <h2 class="display">${esc(t(site.services.h1, lang))}</h2>
      </div>
      <div class="home-service-list">
        ${h.serviceThemes.map((item) => `<a href="${langPath(lang, item.href)}">
          <h3>${esc(t(item.title, lang))}</h3>
          <p>${esc(t(item.text, lang))}</p>
          <span aria-hidden="true">${arrow(lang)}</span>
        </a>`).join('\n        ')}
        <a class="home-services-all" href="${langPath(lang, '/services/')}">${esc(t(site.nav.services, lang))} ${arrow(lang)}</a>
      </div>
    </div>
  </section>
```

Retain the approved existing Approach, About, contact band, footer, and JSON-LD blocks after this replacement. Do not hardcode visible Arabic/English strings other than `aria-label`, consistent with existing generator practice.

- [ ] **Step 5: Rebuild and verify the generated markup**

Run: `node scripts/build.mjs`  
Expected final line: `Done: 46 pages + sitemap.xml`

Run: `node scripts/verify.mjs`  
Expected: PASS.

- [ ] **Step 6: Commit source and generated homepage output**

```bash
git add scripts/verify.mjs scripts/build.mjs index.html en/index.html sitemap.xml
git commit -m "feat: add editorial homepage structure"
```

## Task 4: Implement the Editorial Homepage CSS and Mobile Rules

**Files:**
- Modify: `scripts/verify.mjs`
- Modify: `assets/css/site.css:297-408`
- Modify: `assets/css/site.css:673-706`

- [ ] **Step 1: Add failing CSS assertions**

Append to `scripts/verify.mjs`:

```js
for (const selector of ['.home-hero-grid', '.trust-strip', '.home-work-grid', '.home-services-grid', '.mobile-header-actions']) {
  has(css, selector, `Missing editorial CSS selector ${selector}`);
}
assert.doesNotMatch(css, /animation:\s*stamp-in/, 'Decorative stamp entrance animation must be removed');
```

- [ ] **Step 2: Run the verifier to prove CSS is missing**

Run: `node scripts/verify.mjs`  
Expected: FAIL with `Missing editorial CSS selector .home-hero-grid`.

- [ ] **Step 3: Remove the stamp entrance animation and add editorial CSS**

Delete the `.stamp-hero` animation media block, change the three radius tokens to `0px`, and add:

```css
:root {
  --radius: 0px;
  --radius-sm: 0px;
  --radius-pill: 0px;
}

.mobile-header-actions { display: none; align-items: center; gap: 1rem; }
.mobile-lang-link { color: var(--ink); text-decoration: none; font-size: 0.85rem; }

.home-hero { padding-block: clamp(3rem, 7vw, 6rem) clamp(2rem, 5vw, 4rem); }
.home-hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
  align-items: end;
  gap: clamp(2.5rem, 6vw, 6rem);
}
.home-hero-copy .display-xl { max-width: 13ch; }
html[lang="ar"] .home-hero-copy .display-xl { max-width: 15ch; }
.home-hero-copy .lead { max-width: 54ch; }
.home-hero-copy .offer { max-width: 45ch; }
.home-hero-media img { width: 100%; height: clamp(460px, 58vw, 700px); object-fit: cover; }

.trust-strip {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-block: 1px solid var(--line);
}
.trust-strip li { padding: 1rem clamp(0.75rem, 2vw, 1.5rem); font-size: 0.85rem; }
.trust-strip li + li { border-inline-start: 1px solid var(--line); }

.home-work-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(260px, 0.75fr);
  gap: clamp(1.25rem, 3vw, 2.5rem);
}
.home-work-grid .project-card:first-child { grid-row: span 2; }
.home-work-grid .project-card:first-child .card-media img { aspect-ratio: 16 / 10; object-fit: cover; }
.home-work-grid .project-card:not(:first-child) .card-media img { aspect-ratio: 16 / 10; object-fit: cover; }
.home-work-grid .card-text { width: 100%; padding-inline: 0; }

.home-services { background: var(--surface); }
.home-services-grid { display: grid; grid-template-columns: minmax(240px, 0.8fr) minmax(0, 1.2fr); gap: clamp(2rem, 6vw, 6rem); }
.home-service-list { border-block-start: 1px solid var(--line-strong); }
.home-service-list a {
  display: grid;
  grid-template-columns: minmax(180px, 0.8fr) minmax(0, 1.2fr) auto;
  gap: 1rem;
  align-items: baseline;
  padding-block: 1.25rem;
  border-block-end: 1px solid var(--line);
  color: inherit;
  text-decoration: none;
}
.home-service-list h3, .home-service-list p { margin: 0; }
.home-service-list p { color: var(--ink-soft); font-size: 0.93rem; }
.home-service-list .home-services-all { display: inline-block; border: 0; color: var(--muted); font-size: 0.88rem; }
.footer-editorial { grid-template-columns: minmax(0, 1.8fr) minmax(150px, 0.8fr) minmax(180px, 0.8fr); }
.footer-editorial .stamp-footer { width: 56px; opacity: 0.75; }
```

- [ ] **Step 4: Add mobile behavior inside `@media (max-width: 860px)`**

```css
  .mobile-header-actions { display: flex; }
  .home-hero { padding-block-start: 2.5rem; }
  .home-hero-grid { grid-template-columns: 1fr; gap: 2rem; }
  .home-hero-copy .display-xl, html[lang="ar"] .home-hero-copy .display-xl { max-width: none; }
  .home-hero-media { width: 100vw; margin-inline: calc(50% - 50vw); }
  .home-hero-media img { height: auto; aspect-ratio: 16 / 10; }
  .trust-strip { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .trust-strip li:nth-child(3) { border-inline-start: 0; border-block-start: 1px solid var(--line); }
  .trust-strip li:nth-child(4) { border-block-start: 1px solid var(--line); }
  .home-work-grid { grid-template-columns: 1fr; gap: clamp(2.75rem, 9vw, 4rem); }
  .home-work-grid .project-card:first-child { grid-row: auto; }
  .home-services-grid { grid-template-columns: 1fr; }
  .home-service-list a { grid-template-columns: 1fr auto; }
  .home-service-list p { grid-column: 1 / -1; }
```

- [ ] **Step 5: Run verification**

Run: `node scripts/verify.mjs`  
Expected: PASS.

- [ ] **Step 6: Commit the homepage visual system**

```bash
git add assets/css/site.css scripts/verify.mjs
git commit -m "style: implement editorial homepage system"
```

## Task 5: Refine Work and Project Detail Layouts

**Files:**
- Modify: `scripts/verify.mjs`
- Modify: `scripts/build.mjs:199-210`
- Modify: `scripts/build.mjs:422-533`
- Modify: `assets/css/site.css:340-458`
- Regenerate: `work/**/index.html`, `en/work/**/index.html`, `sitemap.xml`

- [ ] **Step 1: Add failing Work/project assertions**

Append to `scripts/verify.mjs`:

```js
const arWork = read('work/index.html');
const enWork = read('en/work/index.html');
const arProject = read('work/montashiri-villa/index.html');
const enProject = read('en/work/montashiri-villa/index.html');
for (const [html, label] of [[arWork, 'Arabic Work'], [enWork, 'English Work']]) {
  has(html, 'class="work-editorial-grid"', `${label} needs editorial grid`);
}
for (const [html, label] of [[arProject, 'Arabic project'], [enProject, 'English project']]) {
  has(html, 'class="project-intro-grid"', `${label} needs project intro grid`);
  has(html, 'class="project-story"', `${label} needs design story region`);
}
```

- [ ] **Step 2: Run verifier and confirm failure**

Run: `node scripts/verify.mjs`  
Expected: FAIL with `Arabic Work needs editorial grid`.

- [ ] **Step 3: Update Work and project templates**

In `renderWork()`, replace the current Work grid wrapper with:

```js
      <div class="work-editorial-grid">
        ${projects.map((p, i) => projectCard(p, lang, { wide: i === 0, eager: i === 0 })).join('\n        ')}
      </div>
```

In `renderProject()`, keep the existing page heading and cover in that order. Replace the separate thesis, details, and body sections after the cover with:

```js
    <section class="section-sm" data-reveal>
      <div class="wrap project-intro-grid">
        <div class="project-story flow">
          <p class="thesis">${esc(t(p.thesis, lang))}</p>
          ${p.body.map((para) => `<p>${esc(t(para, lang))}</p>`).join('\n          ')}
        </div>
        <dl class="details">
          ${details.map(([label, value]) => `<div class="details-row"><dt>${esc(t(label, lang))}</dt><dd>${esc(value)}</dd></div>`).join('\n          ')}
        </dl>
      </div>
    </section>
```

Preserve all existing data fields, cover image, gallery figures, credits, and next-project navigation.

- [ ] **Step 4: Add editorial Work/project CSS**

```css
.work-editorial-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 4vw, 4rem); }
.work-editorial-grid .project-card:first-child { grid-column: 1 / -1; }
.work-editorial-grid .project-card:first-child .card-media img { aspect-ratio: 16 / 10; object-fit: cover; }
.work-editorial-grid .card-text { width: 100%; padding-inline: 0; }
.project-intro-grid { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr); gap: clamp(2rem, 6vw, 6rem); align-items: start; }
.project-story { max-width: 70ch; }
```

Inside the mobile media query:

```css
  .work-editorial-grid, .project-intro-grid { grid-template-columns: 1fr; }
  .work-editorial-grid .project-card:first-child { grid-column: auto; }
```

- [ ] **Step 5: Rebuild and verify**

Run: `node scripts/build.mjs`  
Expected: `Done: 46 pages + sitemap.xml`

Run: `node scripts/verify.mjs`  
Expected: PASS.

- [ ] **Step 6: Commit Work/project sources and generated pages**

```bash
git add scripts/verify.mjs scripts/build.mjs assets/css/site.css work en/work sitemap.xml
git commit -m "feat: refine portfolio and project layouts"
```

## Task 6: Refine Services and Approach Without Weakening SEO

**Files:**
- Modify: `scripts/verify.mjs`
- Modify: `scripts/build.mjs:314-326`
- Modify: `scripts/build.mjs:535-583`
- Modify: `scripts/build.mjs:764-864`
- Modify: `assets/css/site.css:391-419`
- Modify: `assets/css/site.css:461-540`
- Regenerate: `services/index.html`, five landing directories, `approach/index.html`, and English mirrors

- [ ] **Step 1: Add failing service/approach assertions**

Append to `scripts/verify.mjs`:

```js
const arServices = read('services/index.html');
const enServices = read('en/services/index.html');
const arLanding = read('villa-design-jeddah/index.html');
const enLanding = read('en/villa-design-jeddah/index.html');
const arApproach = read('approach/index.html');
const enApproach = read('en/approach/index.html');
for (const [html, label] of [[arServices, 'Arabic Services'], [enServices, 'English Services']]) {
  has(html, 'class="service-editorial-list"', `${label} needs editorial service list`);
}
for (const [html, label] of [[arLanding, 'Arabic landing'], [enLanding, 'English landing']]) {
  has(html, 'class="landing-content-grid"', `${label} needs editorial content grid`);
  has(html, 'FAQPage', `${label} must preserve FAQ schema`);
}
for (const [html, label] of [[arApproach, 'Arabic Approach'], [enApproach, 'English Approach']]) {
  has(html, 'class="approach-sequence"', `${label} needs numbered sequence`);
  assert.doesNotMatch(html, /class="workflow-media"/, `${label} must remove circular workflow media`);
}
```

- [ ] **Step 2: Run verifier and confirm failure**

Run: `node scripts/verify.mjs`  
Expected: FAIL with `Arabic Services needs editorial service list`.

- [ ] **Step 3: Change service cards to editorial rows**

Change `svcCard()` to:

```js
function svcCard(x, lang, tag = 'h2') {
  return `<a class="service-editorial-row" href="${langPath(lang, `/${x.slug}/`)}" data-reveal>
    <${tag}>${esc(t(x.label, lang))}</${tag}>
    <p>${esc(t(x.summary, lang))}</p>
    <span class="svc-more">${esc(t(site.services.explore, lang))} ${arrow(lang)}</span>
  </a>`;
}
```

Rename hub and related wrappers from `svc-list` to `service-editorial-list`. In `renderLanding()`, replace the section-copy wrapper and map with:

```js
    <div class="wrap landing-content-grid">
      ${l.sections.map((sec) => `<section class="landing-section-row">
        <h2 class="display">${esc(t(sec.heading, lang))}</h2>
        <p>${esc(t(sec.body, lang))}</p>
      </section>`).join('\n      ')}
    </div>
```

Do not alter metadata, `Service`, `FAQPage`, or `BreadcrumbList` graph construction.

- [ ] **Step 4: Replace the circular Approach workflow markup**

Render the existing `a.steps` content as:

```js
      <ol class="approach-sequence">
        ${a.steps.map((step, index) => `<li>
          <span class="step-num">0${index + 1}</span>
          <div><h3>${esc(t(step.title, lang))}</h3><p>${esc(t(step.text, lang))}</p></div>
        </li>`).join('\n        ')}
      </ol>
```

Remove `workflow-media` image output only; retain the underlying data for compatibility.

- [ ] **Step 5: Add editorial service and approach CSS**

```css
.service-editorial-list { border-block-start: 1px solid var(--line-strong); }
.service-editorial-row { display: grid; grid-template-columns: minmax(200px, 0.8fr) minmax(0, 1.2fr) auto; gap: 1.25rem; align-items: baseline; padding-block: 1.4rem; border-block-end: 1px solid var(--line); color: inherit; text-decoration: none; }
.service-editorial-row h2, .service-editorial-row h3, .service-editorial-row p { margin: 0; }
.service-editorial-row p { color: var(--ink-soft); }
.landing-content-grid { border-block-start: 1px solid var(--line-strong); }
.landing-section-row { display: grid; grid-template-columns: minmax(220px, 0.8fr) minmax(0, 1.2fr); gap: clamp(1.5rem, 5vw, 5rem); padding-block: 1.75rem; border-block-end: 1px solid var(--line); }
.landing-section-row h2, .landing-section-row p { margin: 0; }
.landing-section-row p { color: var(--ink-soft); }
.approach-sequence { list-style: none; margin: 2.5rem 0 0; padding: 0; border-block-start: 1px solid var(--line-strong); }
.approach-sequence li { display: grid; grid-template-columns: 5rem 1fr; gap: 1rem; padding-block: 1.5rem; border-block-end: 1px solid var(--line); }
.approach-sequence h3 { margin-block-end: 0.45rem; }
.approach-sequence p { color: var(--ink-soft); }
```

Inside the mobile media query:

```css
  .service-editorial-row { grid-template-columns: 1fr auto; }
  .service-editorial-row p { grid-column: 1 / -1; }
  .landing-section-row { grid-template-columns: 1fr; gap: 0.75rem; }
  .approach-sequence li { grid-template-columns: 3rem 1fr; }
```

Delete obsolete `.svc-list`, `.svc-card`, `.workflow`, `.workflow-media`, and connector-line CSS.

- [ ] **Step 6: Rebuild and verify**

Run: `node scripts/build.mjs`  
Expected: `Done: 46 pages + sitemap.xml`

Run: `node scripts/verify.mjs`  
Expected: PASS.

- [ ] **Step 7: Commit service/approach changes and generated output**

```bash
git add scripts/verify.mjs scripts/build.mjs assets/css/site.css services en/services villa-design-jeddah en/villa-design-jeddah luxury-villa-design-jeddah en/luxury-villa-design-jeddah modern-villa-design-jeddah en/modern-villa-design-jeddah obhur-villa-design en/obhur-villa-design modern-hijazi-villa-design en/modern-hijazi-villa-design approach en/approach sitemap.xml
git commit -m "feat: refine services and approach layouts"
```

## Task 7: Refine About, Journal, and Contact

**Files:**
- Modify: `scripts/verify.mjs`
- Modify: `data/site.mjs:286-325`
- Modify: `scripts/build.mjs:585-762`
- Modify: `scripts/build.mjs:866-944`
- Modify: `assets/css/site.css:542-666`
- Regenerate: About, Contact, Journal hub/articles, Credits, and English mirrors

- [ ] **Step 1: Add failing page-specific assertions**

Append to `scripts/verify.mjs`:

```js
const arAbout = read('about/index.html');
const enAbout = read('en/about/index.html');
const arJournal = read('journal/index.html');
const enJournal = read('en/journal/index.html');
const arArticle = read('journal/villa-design-cost-jeddah/index.html');
const enArticle = read('en/journal/villa-design-cost-jeddah/index.html');
for (const [html, label] of [[arAbout, 'Arabic About'], [enAbout, 'English About']]) has(html, 'class="founder-grid"', `${label} needs founder grid`);
for (const [html, label] of [[arJournal, 'Arabic Journal'], [enJournal, 'English Journal']]) has(html, 'class="journal-editorial-list"', `${label} needs editorial list`);
for (const [html, label] of [[arArticle, 'Arabic article'], [enArticle, 'English article']]) has(html, 'class="article-reading-column"', `${label} needs reading column`);
for (const key of ['contactGroupLabel', 'plotGroupLabel', 'budgetGroupLabel']) assertPair(site.form[key], `form.${key}`);
for (const [html, label] of [[arContact, 'Arabic Contact'], [enContact, 'English Contact']]) {
  has(html, 'class="contact-field-group"', `${label} needs visual field grouping`);
  has(html, 'https://formsubmit.co/ajax/wael.bousmael@gmail.com', `${label} FormSubmit endpoint changed`);
}
```

- [ ] **Step 2: Run verifier and confirm failure**

Run: `node scripts/verify.mjs`  
Expected: FAIL with `Arabic About needs founder grid`.

- [ ] **Step 3: Add semantic layout classes without changing content**

- Rename the primary About grid wrapper to `founder-grid`.
- Replace the Journal hub list with the following wrapper and item structure:

```js
      <ul class="journal-editorial-list">
        ${sorted.map((article) => `<li><a href="${langPath(lang, `/journal/${article.slug}/`)}">
          <time datetime="${article.date}">${fmtDate(article.date, lang)}</time>
          <div class="journal-entry-copy">
            <h2>${esc(t(article.h1, lang))}</h2>
            <p>${esc(t(article.desc, lang))}</p>
          </div>
          <span class="svc-more">${esc(t(j.readMore, lang))} ${arrow(lang)}</span>
        </a></li>`).join('\n        ')}
      </ul>
```

- In `renderArticle()`, change `<div class="wrap narrow flow">` around the article sections to `<div class="wrap article-reading-column flow">`.
- Add these bilingual fields inside `site.form` in `data/site.mjs`:

```js
    contactGroupLabel: { ar: 'بيانات التواصل', en: 'Contact details' },
    plotGroupLabel: { ar: 'بيانات الأرض', en: 'Plot details' },
    budgetGroupLabel: { ar: 'نطاق الميزانية', en: 'Budget range' },
```

- Wrap existing Contact fields in three `<fieldset class="contact-field-group">` elements for contact, plot, and budget information.
- Preserve every input `name`, `required`, `type`, autocomplete attribute, helper, endpoint, hidden field, submit feedback element, and Maps hook.

Contact grouping markup must follow this shape:

```js
<fieldset class="contact-field-group">
  <legend>${esc(t(f.contactGroupLabel, lang))}</legend>
  <!-- existing name, phone and email fields unchanged -->
</fieldset>
<fieldset class="contact-field-group">
  <legend>${esc(t(f.plotGroupLabel, lang))}</legend>
  <!-- existing location and maps fields unchanged -->
</fieldset>
<fieldset class="contact-field-group">
  <legend>${esc(t(f.budgetGroupLabel, lang))}</legend>
  <!-- existing budget field unchanged -->
</fieldset>
```

- [ ] **Step 4: Add page CSS**

```css
.founder-grid { display: grid; grid-template-columns: minmax(260px, 0.75fr) minmax(0, 1.25fr); gap: clamp(2.5rem, 7vw, 7rem); align-items: start; }
.journal-editorial-list { list-style: none; margin: 0; padding: 0; border-block-start: 1px solid var(--line-strong); }
.journal-editorial-list li { border-block-end: 1px solid var(--line); }
.journal-editorial-list a { display: grid; grid-template-columns: 8rem minmax(0, 1fr) auto; gap: 1rem; padding-block: 1.5rem; color: inherit; text-decoration: none; }
.journal-entry-copy h2 { margin: 0 0 0.4rem; }
.journal-entry-copy p { margin: 0; color: var(--ink-soft); }
.article-reading-column { max-width: 70ch; margin-inline: auto; }
.article-reading-column p { line-height: 1.9; }
.contact-field-group { border: 0; margin: 0; padding: 0; display: grid; gap: 1.4rem; }
.contact-field-group + .contact-field-group { margin-block-start: 1.5rem; padding-block-start: 1.5rem; border-block-start: 1px solid var(--line); }
.contact-field-group legend { width: 100%; margin-block-end: 1rem; color: var(--muted); font-size: 0.8rem; }
html[lang="en"] .contact-field-group legend { text-transform: uppercase; letter-spacing: 0.12em; }
```

Inside the mobile media query:

```css
  .founder-grid { grid-template-columns: 1fr; }
  .journal-editorial-list a { grid-template-columns: 1fr auto; }
  .journal-editorial-list p { grid-column: 1 / -1; }
```

- [ ] **Step 5: Rebuild and verify**

Run: `node scripts/build.mjs`  
Expected: `Done: 46 pages + sitemap.xml`

Run: `node scripts/verify.mjs`  
Expected: PASS.

- [ ] **Step 6: Commit source and generated pages**

```bash
git add data/site.mjs scripts/verify.mjs scripts/build.mjs assets/css/site.css about en/about contact en/contact journal en/journal credits en/credits sitemap.xml
git commit -m "feat: refine trust reading and contact pages"
```

## Task 8: Full Bilingual Build and Visual Verification

**Files:**
- Modify if required by verified defects: `data/site.mjs`, `scripts/build.mjs`, `assets/css/site.css`
- Regenerate: all generated HTML and `sitemap.xml`

- [ ] **Step 1: Extend verifier with final design-system checks**

Append to `scripts/verify.mjs`:

```js
const generatedFiles = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name === 'index.html') generatedFiles.push(full);
  }
};
walk(ROOT);
assert.equal(generatedFiles.length, 46, 'Expected 46 generated index pages');

for (const file of generatedFiles) {
  const html = fs.readFileSync(file, 'utf8');
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${path.relative(ROOT, file)} must have one H1`);
  has(html, '<link rel="canonical"', `${path.relative(ROOT, file)} needs canonical`);
  has(html, 'hreflang="ar"', `${path.relative(ROOT, file)} needs Arabic alternate`);
  has(html, 'hreflang="en"', `${path.relative(ROOT, file)} needs English alternate`);
  has(html, 'hreflang="x-default"', `${path.relative(ROOT, file)} needs x-default alternate`);
}

assert.doesNotMatch(css, /box-shadow\s*:/, 'Decorative shadows are not allowed');
for (const token of ['--radius: 0px', '--radius-sm: 0px', '--radius-pill: 0px']) {
  has(css, token, `Square-corner token missing: ${token}`);
}
```

- [ ] **Step 2: Run final clean build and automated checks**

Run: `node scripts/build.mjs`  
Expected: `Done: 46 pages + sitemap.xml`

Run: `node scripts/verify.mjs`  
Expected: PASS with no assertion failures.

Run: `git diff --check`  
Expected: no output and exit code 0.

- [ ] **Step 3: Serve the generated site**

Run: `python -m http.server 8123`  
Expected: local server available at `http://127.0.0.1:8123/`.

- [ ] **Step 4: Perform desktop bilingual visual QA**

At 1440×900 inspect:

- `/` and `/en/`
- `/work/` and `/en/work/`
- `/work/montashiri-villa/` and English mirror
- `/villa-design-jeddah/` and English mirror
- `/approach/`, `/about/`, one Journal article, and `/contact/` in both languages

Expected: editorial hierarchy matches the approved design; no clipping, overflow, missing content, direction-specific breakage, or image distortion.

- [ ] **Step 5: Perform mobile bilingual visual QA**

At 390×844 and 360×800 inspect the same representative pages.

Expected: visible language switch, primary homepage CTA before the hero image, minimum 48 px primary controls, single-column projects, readable headings, no horizontal overflow, and intact form grouping.

- [ ] **Step 6: Verify interaction and untouchables**

Check:

- Mobile menu opens, closes, restores focus, and marks the active page.
- Reduced-motion mode removes reveal and hover movement.
- WhatsApp links contain `966538060383` and the correct language-specific message.
- Contact form still includes name, phone, email, location, maps, and budget.
- Form action remains `https://formsubmit.co/ajax/wael.bousmael@gmail.com`.
- `window.GOOGLE_MAPS_API_KEY` hook remains dormant and present.
- `CNAME`, `.nojekyll`, manifest, and icons are unchanged.

- [ ] **Step 7: Commit final QA fixes and regenerated output**

```bash
git add data/site.mjs scripts/verify.mjs scripts/build.mjs assets/css/site.css index.html en work services villa-design-jeddah luxury-villa-design-jeddah modern-villa-design-jeddah obhur-villa-design modern-hijazi-villa-design approach journal about contact credits sitemap.xml
git commit -m "chore: complete bilingual editorial refinement QA"
```

## Task 9: Request Final Code Review

**Files:**
- Review the complete branch diff from the design-spec commit through Task 8.

- [ ] **Step 1: Record the review range**

Run: `git log --oneline --decorate -12`  
Expected: identify the design-spec commit as base and the Task 8 commit as head.

- [ ] **Step 2: Request review against the approved specification**

Review for:

- Exact compliance with `docs/superpowers/specs/2026-07-12-wb-studio-editorial-refinement-design.md`.
- Generated/source consistency.
- Arabic/English parity and visible-string data ownership.
- Contact, WhatsApp, Maps, JSON-LD, placeholder labels, and licensing preservation.
- Responsive, accessibility, and performance regressions.

- [ ] **Step 3: Run verification after any review fixes**

Run: `node scripts/build.mjs`  
Expected: `Done: 46 pages + sitemap.xml`

Run: `node scripts/verify.mjs`  
Expected: PASS.

Run: `git diff --check`  
Expected: no output.

- [ ] **Step 4: Commit approved review fixes**

```bash
git add -A
git commit -m "fix: address editorial refinement review"
```
