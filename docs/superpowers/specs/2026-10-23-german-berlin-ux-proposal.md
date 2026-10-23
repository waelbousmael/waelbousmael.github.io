# German Berlin launch and navigation improvement — proposal

Status: proposed design for owner review. Planning only; no implementation,
commit, merge, DNS change, or publication is authorized by this document.

## Goal and confirmed business context

Attract private homeowners in Berlin who need house design or renovation
planning, and make it easy to understand the offer, inspect relevant work,
and request a conversation on mobile or desktop.

- WB Studio is registered as a freelance planning practice in Germany.
- Consultations are remote, with on-site visits by prior arrangement.
- The exact German professional designation must match the owner's registration;
  German chamber membership and permit-submission authority are not established.
- Preserve the free call → free preliminary concept → paid agreement after
  alignment offer, the current visual identity, and existing contact plumbing.
- Existing Arabic and English content continues serving Saudi/GCC clients.

## Proposed first release

Create a focused German section under /de/ with German content for Berlin
homeowners. This is a complete visitor journey, not an automatic translation
of the current Jeddah-specific services and guides.

| Page | Proposed URL | Purpose |
| --- | --- | --- |
| Home | /de/ | Introduce the Berlin offer and the next step |
| Projects | /de/projekte/ | Present real work and explain each project clearly |
| Services | /de/leistungen/ | Explain scope and link to the two Berlin services |
| House planning | /de/hausplanung-berlin/ | New-home concepts, layouts, and agreed drawings |
| Renovation planning | /de/hausumbau-berlin/ | Existing-home layouts and renovation planning |
| Process | /de/ablauf/ | Explain the three-step offer and deliverables |
| About | /de/ueber-uns/ | Explain founder experience and working arrangements |
| Contact | /de/kontakt/ | Request a call or discuss an appointment |
| Three real projects | /de/projekte/<project-slug>/ | Translate the actual work, locations, status, and roles |
| Credits | /de/bildnachweise/ | Distinguish reference imagery from studio work |
| Imprint | /de/impressum/ | Publish confirmed business and applicable professional details |
| Privacy | /de/datenschutz/ | Describe the actual website's data handling |

This scope is 14 German pages. Further German articles and translations can
follow after the launch. Keywords are candidates, not verified search-volume
claims. Final service wording must match the owner's actual services.

## Navigation and visitor experience

- Use five clear main destinations: Projects, Services, Process, About, Contact,
  with natural German labels. Put the journal and utility links in the footer.
- Keep a visible language selector with Deutsch, English, and العربية on desktop
  and mobile. Show the current language and remember an explicit choice.
- Give each page one primary action: request a free initial conversation.
  Provide email and WhatsApp as clear contact alternatives.
- Explain service, audience, Berlin availability, and next action in the first
  screen. Keep architectural imagery and generous spacing, with less repetition.
- Prefer relevant real residential work on the German homepage. Show each
  project's actual country, status, and the owner's role; do not imply a Berlin
  portfolio where none is supplied.
- Make project cards obvious links, with understandable titles and concise
  descriptions. Project pages connect to an appropriate service and contact.
- Preserve the form's name, phone, email, location, maps, and budget fields.
  German labels should accommodate both a building plot and an existing house.
  Use owner-approved EUR budget ranges for German visitors.
- Keep German validation, confirmation, failure messages, and WhatsApp copy
  consistent. Explain the two-business-day response expectation already offered.
- Maintain accessible menus, clear focus, readable contrast, large touch targets,
  reduced-motion behavior, and logical layouts for Arabic and Latin languages.

## Automatic language selection

Requested behavior: a first-time homepage visitor identified as being in Germany
opens the German homepage by default.

Proposed priority:

1. An explicit page URL or explicit language selection is respected.
2. On an otherwise unqualified homepage visit, honor the saved language choice.
3. With no saved choice and a Germany country result, open /de/.
4. Otherwise use the first supported browser language: de, en, or ar.
5. If country detection fails, use the browser-language rule. If no supported
   preference is available, retain the existing Arabic homepage as fallback.

Apply automatic selection only at the bare homepage. Do not redirect project,
service, or contact URLs based on country. A manual Arabic selection must keep
the Arabic root homepage accessible even to a visitor in Germany. Language
selector links need an explicit preference mechanism so this works without loops.

Country detection should use approximate IP country, not precise device location
or a location-permission prompt. An IP result can differ from physical location,
for example when a visitor uses a VPN. The language selector remains authoritative.

### Routing options

| Option | Germany default | Main trade-off |
| --- | --- | --- |
| Country-aware edge routing, e.g. Cloudflare | Yes, using IP country | Requires domain/proxy configuration and a compatible feature/plan |
| Browser language only | Only for German-language devices | Simplest, but does not meet the country requirement for all visitors |
| Browser-side IP country lookup | Yes, if lookup succeeds | Adds an external request, privacy consideration, latency, and possible language flash |

Recommendation: evaluate country-aware edge routing while retaining GitHub Pages
as the origin. Confirm the domain's current DNS provider and feature availability
before choosing the implementation. Keep routing temporary and visitor-specific;
ensure cached decisions cannot send visitors to the wrong language. A saved
preference must be readable by the chosen routing layer, rather than relying
only on the site's existing localStorage value.

## Berlin search plan

- Write useful German content around the two distinct service intents; validate
  candidate phrases such as Hausplanung Berlin and Hausumbau Berlin.
- Give pages distinct titles, descriptions, headings, and useful internal links.
- Explain service scope, required starting information, deliverables, working
  arrangements, and free versus paid stages in clear German.
- Generalize the current two-language generator to a locale/page registry with
  explicit published URLs. Generate only complete German pages.
- Give every published language page its own canonical URL. Generate reciprocal
  hreflang links only between equivalent pages; Berlin services are not alternate
  translations of the Jeddah services. Keep explicit crawlable language links.
- Include all published pages in the sitemap. Maintain the Arabic root URLs and
  current English URLs; avoid an unrelated URL migration.
- Keep existing Jeddah business claims intact. Add German language and Berlin
  service information only where supported; do not invent a Berlin office,
  local phone number, coordinates, opening hours, registration, or partner.
- Assess a service-area Google Business Profile against the actual operating
  base and in-person service area. Website search work can proceed independently.
- Establish a Search Console baseline and monitor German-page indexing,
  impressions, relevant queries, clicks, and qualified inquiries. Country filters
  identify Germany, not Berlin city; use Berlin-related queries and inquiry
  records to assess local relevance. Keep the site's no-analytics policy.
- Review German business/privacy information against the actual FormSubmit,
  font, WhatsApp, hosting, and optional Maps integrations before publication.

## Implementation sequence after design approval

1. Create an isolated development branch. Preserve the earlier uncommitted fixes
   and keep them separate from this expansion in the eventual review history.
2. Finalize German page content, service scope, contact wording, professional
   designation, legal details, and the two service-page keyword targets.
3. Extend locale-aware data, templates, navigation, contact messages, and sitemap.
   Add the German content without changing the site's static architecture.
4. Apply the navigation and homepage hierarchy improvements across all three
   languages, checking long German labels and Arabic direction.
5. Build and test the site locally. Prepare a reviewable preview and source diff.
6. Configure country routing only after the infrastructure approach is agreed.
   Test the routing separately before release.
7. Review the complete result before any merge to main or publication.
8. After an approved release, submit the sitemap and check indexing and inquiries.

## Acceptance checks

- First unqualified homepage visit from Germany, with no saved preference:
  German opens even if the browser's language is English.
- A saved Arabic or English choice overrides the Germany default on later visits.
- A German-language device outside Germany receives German on first arrival.
- Explicit German, English, and Arabic content links retain their requested
  language regardless of the visitor's country.
- Country lookup failure, unavailable storage, unsupported languages, and missing
  translations leave a usable page without loops or blank content.
- Changing language on a translated project opens its actual counterpart.
  When a counterpart is absent, any homepage fallback is labeled clearly.
- Every published language can be discovered through ordinary links and sitemap;
  canonical and language-alternate targets resolve and do not cross service intent.
- At mobile and desktop widths, a visitor can find a relevant service or project
  and reach contact in no more than two deliberate navigation actions.
- Keyboard, mobile menu, forms, image loading, RTL/LTR, long German text, and
  reduced-motion behavior pass verification in all three languages.
- Existing contact endpoint, field names, Saudi contact details, business claims,
  placeholder labels, asset licensing, and protected deployment files are preserved.
- Existing verification suites, new locale/routing checks, media verification,
  and reproducible generation pass before review.

## Decisions to confirm before implementation

- Approve the focused 14-page German launch and navigation structure, or expand
  the German content scope.
- Confirm whether the domain can use country-aware edge routing. The exact
  provider/feature selection follows a read-only DNS/configuration assessment.
- Supply the exact registered German designation and business details for
  publication, approved EUR ranges, and any German-market project evidence.

## Research

- Google multilingual website guidance:
  https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites
- Google locale-adaptive crawling:
  https://developers.google.com/search/docs/specialty/international/locale-adaptive-pages
- Google language alternates:
  https://developers.google.com/search/docs/specialty/international/localized-versions
- Google Business Profile representation and service areas:
  https://support.google.com/business/answer/3038177?hl=en
- Google Search Console reporting:
  https://support.google.com/webmasters/answer/10268906?hl=en
- Cloudflare country routing example and feature requirements:
  https://developers.cloudflare.com/rules/snippets/examples/country-code-redirect/
  https://developers.cloudflare.com/rules/snippets/
