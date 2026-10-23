# Aley hillside villa presentation

**Goal:** Introduce the owner's villa in Aley District, Mount Lebanon as the
leading project in Arabic, English, and German, showing real construction
progress alongside clearly identified proposed-design visualizations.

**Design:** Use an owned exterior render in the homepage hero with a project
link and construction status. Put the new project first in every portfolio and
featured list. Its page pairs the current shell and proposed exterior, followed
by construction/interior images and cropped architectural drawings. No predicted
completion date, invented location claims, raw permit PDF, title blocks,
client names, parcel numbers, or site map are published.

**Sources:** Owner-supplied OCT2026 folder; JPG/JPEG construction photographs,
PNG renders, and a 13-page 2024 permit drawing set. Public title: Hillside Villa
— Aley. Scope is evidenced by architectural drawings and design visualization.

**Implementation:**

- [x] Extract optimized WebP media into `assets/projects/hillside-villa-aley/`;
  retain source material outside the published repository. Review each crop.
- [x] Add regression checks for leading position across languages, homepage
  promotion, honest construction/render labels, localized routes and metadata.
  Observe failures before changing the generator/data.
- [x] Add complete Arabic/English/German project data in `data/projects.json`;
  register provenance in `assets/licenses/LICENSES.md`.
- [x] Add optional project comparison and homepage spotlight support in
  `scripts/build.mjs` and data-driven labels in `data/site.mjs`. Keep the shared
  stylesheet, dependency-free scripts, phone/WhatsApp/form behavior, and design.
- [x] Use data order for all language portfolios; update credits to distinguish
  the owned homepage image from Unsplash concept-study imagery.
- [x] Prepare responsive assets, rebuild, run all locale/SEO/navigation/media
  and reproducibility checks, review desktop/mobile and Arabic RTL in browser.
- [x] Get source review, commit generated pages with sources, and integrate into
  local main for the owner. Do not push or deploy without a release request.

**Verification record:** Three Aley-specific checks passed after first failing
for absent pages/placement and the old homepage preview. Existing shared
invariants, 13 SEO checks, 5 locale checks, 6 navigation checks, and 2 media checks
passed. Rebuilding all 69 generated outputs was byte-identical. Browser review
covered the English desktop hero/comparison and German/Arabic mobile pages.
Eleven optimized source images and 21 responsive derivatives were added. Independent
source review found no blocking issues; optional spotlight comparison data is
guarded so older projects can also be selected in the future.

The owner selected `1.png` and confirmed it shows the opposite side of the same
villa. Their latest direction makes it the project cover and homepage image,
cropped to the required 16:10 ratio. Its full composition is also retained in
the gallery with a translated proposed/opposite-facade caption. The garden-side
`3.png` remains paired with the current construction photo in the comparison.
