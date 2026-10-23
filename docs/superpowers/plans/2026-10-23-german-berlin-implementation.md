# German Berlin and navigation implementation plan

**Goal:** Deliver reviewable German pages and simpler navigation on
`codex/german-berlin`, serving English at the root for every visitor.

**Architecture:** Extend the existing dependency-free generator with explicit
published locale routes, German data, and shared UI. Preserve legacy Arabic and
English deep links. Root English, /ar/ Arabic home, /de/ German home; /en/ is an
English homepage alias canonicalized to root. No automatic locale detection.

**Tech stack:** Node ESM, static HTML, shared logical CSS, the existing two JS files.

- [x] Create separate branch and confirm the existing verification baseline.
- [x] Preserve previous fixes as a separate branch checkpoint.
- [x] Add German copy for the shared visitor journey, three real projects, two
  Berlin services, credits, and draft legal pages in the existing data sources.
- [x] Add failing route/locale tests for English root, explicit Arabic home,
  published counterparts, Berlin service isolation, German contact fields,
  metadata, and stable direct links.
- [x] Generalize `scripts/build.mjs` to use a published-route registry for headers,
  language selectors, canonical URLs, sitemap, project links, and German routes.
- [x] Simplify main navigation to five destinations, add an accessible language
  selector, strengthen primary contact actions, improve project-card affordance,
  and adapt mobile/long German text in `assets/css/site.css`.
- [x] Localize contact validation through data attributes without changing the
  form endpoint, field names, phone, existing WhatsApp messages, or Maps hook.
- [x] Adapt existing verification to the approved homepage routes and add
  meaningful checks for three-language navigation and missing counterparts.
- [x] Build all pages; run locale, navigation, SEO, media, and reproducibility
  checks. Check desktop/mobile and keyboard behavior in Arabic, English, German.
- [x] Review spec compliance and code quality; resolve important findings.
- [x] Save screenshots, update README/AGENTS route guidance, and commit the
  reviewable implementation on the feature branch. Do not merge or deploy.

## Data and publishing contract

Shared copy receives `de` fields in `data/site.mjs`. The three real projects
receive German fields in `data/projects.json`. German-only Berlin service data
is stored in `site.berlin.landings` using the existing landing shape; two home
service links live in `site.berlin.homeThemes`. Legal data lives in
`site.berlin.legal`, with `draft: true` until required owner details are supplied.
Legal drafts use noindex and are omitted from sitemap. German budget is an
optional free-text EUR field rather than invented price bands. Every template
string comes from data, and every published alternate must actually exist.

## Verification commands

Run `node scripts/build.mjs`, `node scripts/verify-locales.mjs`,
`node scripts/verify-navigation.mjs`, `node scripts/verify-seo.mjs`,
`node scripts/verify.mjs`, `python scripts/verify-media.py`, and
`node scripts/check-reproducible-build.mjs`. Expected: no failures and identical
repeated builds. Review root English, /ar/, /de/, both Berlin services, real
project pages, language-switch fallbacks, form validation, and legal drafts.

## Release facts still required

The owner's April 2025 ELSTER documents supplied the business designation and
registered address, which is also a residential address. These are used only in
the local draft for review. Confirm current details and complete the privacy
review before publication. Do not invent professional registration, VAT numbers,
Berlin coordinates, a local office, or authority to submit permit applications.

## Verification result

All checks passed on 24 October 2026: shared invariants, 5 locale tests,
6 navigation tests, 8 SEO tests, 2 media tests, and byte-identical rebuilding of
66 generated outputs. Browser review covered English, Arabic RTL, and German,
desktop/tablet/mobile layouts, German service/project journeys, and keyboard
navigation. Spec and code reviews completed; the Node 18-compatible test path
initialization was corrected after review. No inquiry was transmitted.
