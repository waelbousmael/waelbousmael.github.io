# WB Studio Editorial Refinement Design

**Date:** 2026-07-12  
**Status:** Approved visual direction; pending written-spec review  
**Selected direction:** Editorial refinement

## Objective

Refine WB Studio into a calmer, more distinctive, image-led architectural portfolio while keeping the path to a qualified enquiry immediately understandable. The work must strengthen founder credibility, project storytelling, mobile usability, and visual hierarchy without changing the established brand palette, typography, bilingual architecture, or core offer.

The primary conversion remains:

1. Free call to review the plot.
2. Free preliminary concept.
3. Paid agreement only after the direction is clear and aligned.

## Design Principles

- Treat whitespace, proportion, typography, imagery, and hairlines as the primary visual materials.
- Use asymmetric editorial grids where they clarify hierarchy.
- Keep architecture imagery free of text overlays.
- Make founder involvement and technical credibility visible earlier.
- Keep the primary contact action clear without floating widgets or repeated sales prompts.
- Preserve a single visual system across Arabic RTL and English LTR.
- Keep motion limited to the existing reveal fade and project-image hover scale.
- Remove the decorative hero-stamp entrance animation.

## Visual System

The locked palette remains unchanged:

- Warm white: `#faf8f4`
- Charcoal: `#1e1c19`
- Stone: `#f2eee7`
- Warm grey: `#857f74`
- Hairlines: approximately 13% charcoal

Typography remains:

- Arabic display: Amiri
- Arabic body: IBM Plex Sans Arabic
- English display: Cormorant Garamond
- English body: Inter

Arabic must never receive letterspacing. Uppercase and letterspacing effects remain restricted to `html[lang="en"]`.

The refinement introduces no gradients, shadows, rounded cards, saturated colors, floating action widgets, carousels, autoplay, or parallax.

## Shared Shell

### Header

- Retain the wordmark and existing navigation destinations.
- Refine vertical padding and type proportions so the header feels lighter.
- Keep the language switch visible beside the mobile menu trigger instead of hiding it inside the menu.
- Preserve accessible labels, `aria-current`, keyboard behavior, and the skip link.
- Keep contact available through the navigation; do not add a persistent sticky CTA.

### Section Language

- Standardize section introductions as a restrained eyebrow, display heading, optional short lead, and contextual text link.
- Prefer hairlines and spacing over boxed containers.
- Keep section gaps based on `--gap-section`; do not compress them to fit more content.

### Footer

- Retain navigation, contact information, phone directionality, credits, locations, and copyright.
- Simplify the visual hierarchy and reduce competition between the brand stamp, wordmark, and link columns.

## Homepage

### Hero

Desktop uses a two-column editorial composition: message and actions on one side, the existing architectural hero image on the other. The approved order is:

1. Location/service eyebrow.
2. Focused H1.
3. Shortened supporting positioning.
4. Core offer.
5. Primary WhatsApp action and secondary Work action.
6. Hero image.

On mobile, text and both actions appear before the image. The primary action must remain visible within or immediately adjacent to the first viewport at common 360–390 px widths.

### Credibility Strip

Place a compact credibility band immediately after the hero using existing factual claims:

- 12+ years of experience.
- Architect and BIM coordinator.
- Jeddah, Saudi Arabia, and GCC coverage.
- Concept through IFC/construction documentation.

Desktop presents four restrained columns; mobile collapses to a two-column grid. All visible labels must be bilingual data fields.

### Selected Work

- Present one lead project at larger scale and two secondary projects in an asymmetric composition on desktop.
- Use a single-column sequence on mobile.
- Keep project titles, locations, dates, and concept-study labels below images.
- Preserve 16:10 cover treatment and existing hover scale.

### Services

- Replace the dense five-card homepage grid with editorial service rows.
- Feature three broad client-facing themes: private villa design, privacy/hospitality/climate, and build-ready/BIM coordination.
- Retain discoverable links to all five SEO landing pages through the homepage and Services hub.
- Do not remove or merge the existing landing pages, schema, FAQs, or distinct search intent.

### Process and Founder

- Present the three-step offer as a numbered hairline sequence.
- Shorten the homepage founder introduction while retaining 12+ years, international project experience, and BIM coordination.
- Keep the portrait and link to the full About page.

### Closing Contact

- Retain the final contact band.
- Use one primary contact action and WhatsApp as the direct alternative.
- Keep the free-call, free-concept, paid-after-alignment promise explicit.

## Work Index

- Introduce a paced editorial grid: one lead project, paired secondary projects, followed by quieter single cards.
- Preserve array order, bilingual metadata, and placeholder/concept-study labels.
- Preserve the existing link to public image credits.
- Do not add filtering, carousels, or client-type categories.

## Project Detail Pages

- Lead with project title and cover image, followed by a compact facts table.
- Place project intent and design reasoning before the gallery.
- Use recorded image dimensions to create a deliberate landscape/portrait gallery rhythm.
- Preserve lazy loading, intrinsic dimensions, captions where present, credits, and next-project navigation.
- Do not invent project claims, client names, built status, or testimonials.

## Services Hub and SEO Landing Pages

- Keep all existing bilingual copy, metadata, schema, FAQs, internal links, and calls to action.
- Replace boxed-card density with editorial rows and stronger section introductions.
- Keep related projects and related services visually quieter than the main page content.
- Maintain one H1 and logical H2/H3 structure per page.
- Do not reduce local Jeddah, Saudi, Obhur, North Jeddah, or GCC relevance.

## Approach

- Present capabilities as a disciplined editorial list.
- Replace the circular workflow imagery and connector line with a numbered architectural sequence.
- Preserve the three-step offer and all existing service descriptions.
- Keep the page useful as both process explanation and trust-building content.

## About

- Balance portrait, founder biography, credentials, languages, geographic experience, and BIM expertise.
- Make direct founder involvement the central trust message.
- Avoid corporate-team language or visual cues that imply a large office.
- Preserve all existing factual claims.

## Journal

- Use a monograph-like reading layout with a narrow text measure, clearer date hierarchy, and restrained related links.
- Keep article metadata, Article schema, breadcrumbs, internal service links, and bilingual parity.
- Do not add sidebars, share widgets, or decorative reading-progress elements.

## Contact

- Preserve the FormSubmit endpoint and all required fields: name, phone, email, location, maps, and budget.
- Preserve the bilingual WhatsApp number and pre-filled message.
- Preserve the dormant `window.GOOGLE_MAPS_API_KEY` Places hook.
- Group the form visually into contact, plot, and budget information without changing submitted field names.
- Keep phone numbers and email addresses `dir="ltr"`.
- Use one decisive submit action with existing feedback behavior.

## Responsive Behavior

- Verify Arabic and English at 360 px, 390 px, tablet, standard desktop, and wide desktop widths.
- Use a 48 px minimum target for primary interactive controls.
- Prevent horizontal overflow in RTL and LTR.
- Avoid orphaned heading words where reasonable through responsive measures and type clamps.
- Keep project images single-column on mobile.
- Keep language access visible in the mobile header.
- Preserve content order between directions unless language semantics require otherwise.

## Architecture and Data Boundaries

Implementation remains within the existing static generator:

- `data/site.mjs` for any shortened or new bilingual visible labels.
- `data/projects.json` for project content and image metadata only.
- `scripts/build.mjs` for template structure.
- `assets/css/site.css` for the shared visual and responsive system.
- Existing dependency-free JavaScript only; no new libraries or scripts.

Generated HTML must never be edited by hand. All 46 pages and `sitemap.xml` are regenerated with `node scripts/build.mjs` and committed with their source changes.

## Accessibility and Performance

- Preserve semantic landmarks, one H1 per page, useful alt text, focus-visible states, and keyboard navigation.
- Preserve `prefers-reduced-motion` support.
- Keep image intrinsic dimensions, lazy loading below the fold, and eager loading only for the primary hero.
- Do not introduce layout-shifting media or blocking JavaScript.
- Maintain readable contrast using locked palette tokens.

## Explicit Non-Goals

- No new framework, dependency, CMS, analytics, or third-party site script.
- No new stock imagery or licensing changes.
- No color or font rebrand.
- No removal of SEO pages, bilingual alternates, structured data, contact fields, concept-study labels, or the core offer.
- No fabricated testimonials, client logos, awards, project status, or business claims.
- No changes to `404.html`, `CNAME`, `.nojekyll`, icons, manifest, or contact plumbing unless required to prevent a verified regression.

## Verification

Before release:

1. Run `node scripts/build.mjs` and confirm 46 pages plus `sitemap.xml` are generated.
2. Confirm the generated diff contains only intended structural/content changes plus regenerated output.
3. Validate canonical links, reciprocal `hreflang`, sitemap membership, metadata, and JSON-LD.
4. Serve locally and inspect Arabic and English homepage, Work, one project, one landing, About, Journal article, and Contact.
5. Check desktop, tablet, 390 px, and 360 px layouts.
6. Check RTL/LTR overflow, heading hierarchy, focus visibility, menu behavior, reduced motion, and image dimensions.
7. Verify the FormSubmit endpoint, field names, WhatsApp number/message, email, phone, and dormant Maps hook remain unchanged.
8. Confirm no external scripts, gradients, shadows, decorative rounded cards, or new unlicensed imagery were introduced.

## Delivery Sequence

1. Shared tokens, shell, and responsive primitives.
2. Homepage editorial structure.
3. Work index and project details.
4. Services hub, landing pages, and Approach.
5. About, Journal, Contact, and footer.
6. Full rebuild, bilingual visual QA, accessibility/performance checks, and final review.
