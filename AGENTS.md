# AGENTS.md

Guidance for coding agents working on the WB Studio website (wbstudio.xyz).

## Mission

A minimal, premium, image-led bilingual portfolio for a solo architect serving
private villa clients in Jeddah / Saudi Arabia / GCC. Editorial restraint in
the spirit of high-end architecture studios — while keeping the conversion path
(free call → free preliminary concept → paid agreement) intact.

## Architecture (read before editing anything)

- Static site on GitHub Pages, custom domain via `CNAME`, `.nojekyll` present.
- **Generated pages.** All HTML pages are produced by `node scripts/build.mjs`
  from `data/site.mjs` (site copy/config) and `data/projects.json` (portfolio).
  Generated files carry a banner comment. **Never edit generated HTML by
  hand** — change the data or the templates in `scripts/build.mjs`, rebuild,
  and commit the regenerated output.
- Arabic (RTL) is canonical at the root; English (LTR) is mirrored under
  `/en/`. Every page links its alternate via `hreflang` and the header
  language toggle. `sitemap.xml` is generated with alternates.
- CSS: one file, `assets/css/site.css` — design tokens at the top, logical
  properties (`margin-inline`, `padding-block`, `inset-inline-start`) so RTL
  and LTR share all layout code. Do not introduce per-direction stylesheets.
- JS: `assets/js/site.js` (all pages), `assets/js/contact.js` (contact pages
  only). No build step for JS/CSS; keep them dependency-free.
- `404.html` is hand-maintained (not generated).

## Design rules

- Palette is locked to the tokens in `site.css`: warm white `#faf8f4`,
  charcoal `#1e1c19`, stone `#f2eee7`, warm grey `#857f74`, hairlines at
  ~13% ink. No saturated colors, no gradients, no shadows, no rounded corners.
- Type: AR display Amiri / body IBM Plex Sans Arabic; EN display Cormorant
  Garamond / body Inter. Never letterspace Arabic. Uppercase/letterspacing
  effects are gated behind `html[lang="en"]`.
- Whitespace is the main design material — section gaps use the
  `--gap-section` clamps; don't compress them to fit more content.
- Motion: only the existing reveal fade and image hover scale. Everything
  respects `prefers-reduced-motion`. No parallax, no carousels, no autoplay.
- Imagery: editorial, muted, architectural. Covers are 16:10. No stocky
  staged real-estate imagery, no loud skies, no watermarks.

## Bilingual rules

- Every visible string is a `{ ar, en }` pair in `data/site.mjs` or
  `data/projects.json`. No hardcoded visible text in templates.
- Arabic copy is the primary voice (approachable professional register —
  keep it; do not switch to stiff classical or to slangy marketing tone).
- Check both directions after layout changes: nav, cards, details rows,
  form, footer. Phone numbers and emails stay `dir="ltr"`.

## Asset rules

- Project images: `assets/projects/<slug>/cover.webp` + `gallery-NN.webp`,
  WebP, covers ≤ ~350 KB, gallery ≤ ~300 KB.
- Every external asset MUST be recorded in `assets/licenses/LICENSES.md`
  (and is surfaced on the public `/credits/` pages, generated from
  `data/projects.json` sourceIds). Only clearly free commercial licenses
  (Unsplash License, CC0, owned material). Never use imagery from other
  architecture studios' portfolios.
- Placeholder projects are labeled as concept studies via
  `"placeholder": true` — do not remove the labeling mechanism. When real
  work replaces placeholders, set it to `false` and clean the register.
- The owner stages real project material in `assets/projects/_incoming/`
  (see its README for the publishing workflow).

## Must preserve (untouchables)

- FormSubmit endpoint: `https://formsubmit.co/ajax/wael.bousmael@gmail.com`
  and the form's field set (name, phone, email, location, maps, budget).
- WhatsApp number `+966538060383` and the pre-filled bilingual message.
- Dormant Google Maps Places autocomplete (`window.GOOGLE_MAPS_API_KEY` hook).
- `manifest.webmanifest`, `/assets/icons/*`, `CNAME`, `.nojekyll`.
- JSON-LD business claims: phone, email, address (Jeddah), geo, opening hours
  (Sun–Thu 09:00–18:00), priceRange `$$$`, areaServed (Jeddah/SA/GCC).
- The core offer copy: free call → free preliminary concept → paid agreement
  only after alignment. This is the business's promise; restyle, never remove.
- The site stays script-free beyond its own two small JS files (owner's
  decision: no analytics).
- `skills/` folder (agent reference material).

## Workflow

1. Audit current state before editing; read this file and README.md.
2. Propose a concise plan for non-trivial changes.
3. Edit data/templates → `node scripts/build.mjs` → verify locally
   (`python -m http.server`, check AR + EN, desktop + mobile widths).
4. Keep diffs minimal; commit regenerated HTML together with its source change.

## Reusable skills

Consult when the task touches the domain (don't load all for minor tasks):

- `skills/seo-local-intent.md` — SEO, metadata, Saudi/GCC local intent.
- `skills/conversion-copywriting.md` — offer clarity, CTA flow, trust.
- `skills/frontend-ux-mobile.md` — visual hierarchy, mobile UX.
- `skills/performance-accessibility.md` — speed, a11y, media optimization.
- `skills/static-github-pages-architecture.md` — Pages constraints, forms.
