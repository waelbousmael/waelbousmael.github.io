# Performance Accessibility Skill

Reusable checklist for improving WB Studio website speed, technical quality, and accessibility without overengineering.

## Primary Goal

- Keep the site fast, stable, accessible, and GitHub Pages-friendly.
- Improve user trust and search visibility through better performance and inclusive usability.

## Performance Priorities

- Optimize images before adding or replacing media.
- Avoid heavy scripts and unnecessary dependencies.
- Reduce layout shift by reserving space for media and stable UI elements.
- Lazy-load non-critical media below the fold.
- Keep CSS maintainable, reusable, and easy to audit.
- Prefer simple static HTML, CSS, and JavaScript over complex tooling unless clearly justified.

## Accessibility Priorities

- Use semantic HTML for structure, navigation, sections, and forms.
- Maintain readable contrast across text, buttons, overlays, and backgrounds.
- Preserve keyboard navigation and visible focus states.
- Add descriptive alt text for meaningful images and empty alt text for decorative images.
- Use explicit form labels and helpful instructions.
- Keep heading order sensible and page structure easy to scan.

## Technical Quality

- Validate links and avoid broken anchors.
- Avoid console errors and fragile JavaScript.
- Preserve responsive behavior across mobile, tablet, and desktop.
- Keep code simple, readable, and compatible with GitHub Pages.
- Make performance and accessibility improvements support SEO, credibility, and conversion.

## Media Handling

- Compress new assets before use.
- Name assets clearly and consistently.
- Place new media in `assets/`.
- Reference assets with relative paths where possible.
- Avoid autoplay-heavy UX that hurts mobile performance or accessibility.

## Avoid

- Bloated frameworks, unnecessary backend services, inaccessible color combinations, and decorative features that slow the site.
- Changes that add complexity without a clear performance, accessibility, SEO, or conversion benefit.

## Self-Update Rule

- This skill may update itself when website changes, new assets, new media, new pages, performance findings, accessibility findings, or durable technical decisions make an update valuable. Keep updates concise and high-impact. Do not update the skill for temporary ideas, minor wording preferences, low-value observations, private data, credentials, or noise.
