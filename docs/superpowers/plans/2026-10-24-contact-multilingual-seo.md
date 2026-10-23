# Contact numbers and multilingual SEO implementation plan

**Goal:** Add the owner's German and Lebanese phone numbers, retain Saudi-only
WhatsApp routing, improve Arabic/English/German SEO, and integrate on local main.

**Architecture:** Keep phone data and translated country labels in `data/site.mjs`.
Render the same country-labeled links in contact pages and footers. Preserve the
primary Saudi business telephone and add Organization contact points. Extend the
shared head template with localized WebPage data and accessible image previews.
Keep current language routes, canonicals, and legal-draft indexing rules.

**Scope:** User approved implementation and integration into main in this turn.
The earlier German expansion is included in the merge. No external publishing,
new tracking, invented offices, or changes to form/WhatsApp destinations.

- [x] Add generated-output regression checks to `scripts/verify-seo.mjs` for all
  three phone links, Saudi-only WhatsApp, contact points, metadata uniqueness,
  localized page schema, and image preview text/dimensions. Run to observe missing
  phone/schema/preview failures before implementation.
- [x] Add phone records and concise, locally relevant core metadata in
  `data/site.mjs`; update `scripts/build.mjs` phone links, contact points,
  WebPage/ContactPage/AboutPage/CollectionPage and social image metadata. Keep
  existing specialized Service/Article/Breadcrumb/FAQ nodes.
- [x] Rebuild and adapt the exact Article and Service graph assertions in `scripts/verify.mjs`
  to allow the additional WebPage node while preserving all prior assertions.
- [x] Run all existing verification scripts, check browser contact layouts in
  German/English/Arabic and mobile, and save a review screenshot. Review diff.
- [x] Commit sources with generated pages on the existing feature branch, merge
  into local main without resetting or discarding changes, verify the merged
  tree, and report the commit and deployment status accurately.

References: Google Search Central title-link, localized-versions, and
Organization structured-data guidance checked on 24 October 2026.

Verification: the four new regression checks failed before implementation and
all 12 SEO checks passed afterward. Shared invariants, 5 locale checks, 6 menu
checks, 2 media checks, and 66-output reproducibility passed. Browser review
covered German/Arabic mobile and English desktop contact links and country
labels. Independent read-only code review reported no actionable findings.

The verification after merging exposed CRLF conversion during Windows checkout,
which changed asset hashes. A failing regression check reproduced this. Explicit
LF Git attributes for browser JS/CSS and normalization of the local asset files
correct the cause without changing browser behavior. The SEO suite now includes
13 checks, including this cross-platform asset invariant.
