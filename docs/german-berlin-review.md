# German Berlin branch review

Branch: `codex/german-berlin`. No merge or deployment is included.

Run `python -m http.server 8123` from the repository and review:

- http://localhost:8123/ — English default, directly rendered for every visitor.
- http://localhost:8123/ar/ — explicit Arabic homepage.
- http://localhost:8123/de/ — German homepage for Berlin homeowners.
- http://localhost:8123/de/leistungen/ — two Berlin services.
- http://localhost:8123/de/hausplanung-berlin/ — private house planning.
- http://localhost:8123/de/hausumbau-berlin/ — renovation planning.
- http://localhost:8123/de/projekte/ — three real project presentations.
- http://localhost:8123/de/kontakt/ — localized inquiry with optional EUR budget.

The site keeps the palette and architectural typography, with five primary
navigation destinations, a visible language menu, clear project actions,
contact CTAs, and mobile/keyboard controls. Explicit language URLs always win;
there is no automatic country detection or browser-language redirect.

Language alternates only connect equivalent published pages. Distinct Berlin
services are not marked as translations of Jeddah services. Arabic and English
deep links remain at their existing URLs. `/en/` is retained as an English
homepage alias; its canonical URL and all default homepage links point to `/`.

## Legal copy for review

The German imprint uses the proprietor, business name, and registered business
address found in the owner's ELSTER transmission record from April 2025. That
record identifies the business address as also being a residential address.
No tax number, personal ID, private document, or unverified VAT number was
copied into the site. German text uses freelance-planner wording rather than
asserting architects' chamber registration or permit-submission authority.

The imprint and privacy text remain clearly identified as drafts, noindex, and
excluded from the sitemap. Confirm current business details and complete the
privacy review before publication. This does not block reviewing the German
pages, language behavior, or UI on this branch.

## Review checklist

- Home opens in English, even with German or Arabic device settings.
- Language menu switches translated core/project pages correctly.
- A missing translation has a clearly labeled homepage link.
- Services/projects can be found and contact reached within two navigation steps.
- Berlin wording, deliverables, international project locations, and offer are
  accurate and appropriate for your practice.
- Forms remain usable on mobile and in Arabic RTL; German budget is free text.
- Legal drafts are reviewed before an eventual release.

## After an approved release

Submit the generated sitemap through Search Console and monitor German-page
indexing, Germany impressions, Berlin-related queries, and qualified inquiries.
No analytics script has been added. A Google Business Profile is a separate
step based on the actual operating location and in-person service area.
