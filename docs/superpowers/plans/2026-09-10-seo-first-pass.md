# SEO first pass implementation plan

> Execute the user-approved audit recommendations in the current session. Review the completed changes with the requesting-code-review skill before delivery.

**Goal:** Reduce image transfer, improve article and service metadata, connect useful guides to relevant pages, and make contact actions easier to reach.

**Architecture:** Keep the existing bilingual static generator. Prepare optimized image files and a checked-in image manifest with Python/Pillow; use that manifest to render accurate dimensions and responsive sources in dependency-free HTML. Keep all new visible copy in bilingual data fields.

**Scope approval:** The user approved the recommended first pass on 2026-09-10. Preserve the existing palette, typography, section spacing, project status labels, business claims, contact fields/endpoints, WhatsApp messages and no-analytics policy. Pricing, new business claims, external accounts and deployment are outside this pass.

- [x] Add media regression checks and demonstrate failures for PNG content under WebP filenames, stale dimensions, oversized images and missing responsive variants.
- [x] Re-encode only invalid/oversized original images, preserve full compositions, correct project/source dimensions, and generate 640px/960px derivatives with a reproducible preparation command. Keep existing licenses and record derivative provenance.
- [x] Update the image helper with accurate dimensions, srcset and context-specific sizes. Keep eager hero loading and lazy gallery loading.
- [x] Add output checks for article authors, representative sharing images, working language-specific guide links and mailto links; demonstrate the missing behavior before implementation.
- [x] Complete article author/publisher metadata, add bilingual bylines, use relevant project images for article/service previews, correct stale landing image descriptions, and link relevant guides from services/projects.
- [x] Shorten bilingual homepage positioning while retaining the complete offer, use existing darker text tokens for small text, fix the full-bleed mobile overflow, and use standard email links.
- [x] Rebuild with `node scripts/build.mjs`. Run `python scripts/verify-media.py`, `node scripts/verify-seo.mjs`, `node scripts/verify.mjs`, and the reproducible build check. Update the latter's stale page-count assumption to the data-driven count.
- [x] Serve on localhost and inspect Arabic/English homepage, service, article, project and contact layouts at phone and desktop widths; verify image selection and links without submitting forms.
- [x] Request an independent code review and address material findings.
- [x] Commit sources and generated output together, and report measured image savings and validation.

## Verification results

- Media checks: 2 passing tests with subtests covering 41 source images and 80 responsive derivatives. The independent reviewer reproduced all 80 derivatives byte-for-byte and confirmed each is smaller than its source.
- SEO checks: 8 passing tests; existing bilingual shell, contact, metadata and motion checks pass.
- Two builds produce identical contents for all 51 generated outputs.
- Browser inspection covered 20 combinations: Arabic and English homepage, Jeddah villa service, cost article, Montashiri project and contact pages at 390px and 1440px widths. No horizontal overflow or broken loaded images. Responsive project covers select 640px images on phones. No form was submitted.
- Review findings about full-width image size hints and small-text contrast were corrected and re-reviewed with no remaining material issue.
- The final English homepage heading uses its available column; its primary contact button ends at 776px in the tested 1440 × 900 viewport.

## Measured image savings

These totals compare the original image files referenced by each page against Git revision `577e3b3`; they are not measurements of initial page load or Core Web Vitals. Responsive sources provide additional savings where the browser selects them.

| Page | Before | After | Reduction |
| --- | ---: | ---: | ---: |
| Work index | 6,228,613 bytes | 1,897,378 bytes | 69.5% |
| Montashiri Villa | 4,029,342 bytes | 451,160 bytes | 88.8% |
| Garden House | 6,401,705 bytes | 1,294,852 bytes | 79.8% |

Deployment remains outside this pass. Search Console and field performance data were unavailable, so no ranking or Core Web Vitals improvement is claimed.
