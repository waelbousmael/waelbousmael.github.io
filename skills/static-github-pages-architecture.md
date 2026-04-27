# Static GitHub Pages Architecture Skill

Reusable checklist for keeping the WB Studio website clean, scalable, and compatible with GitHub Pages.

## Primary Goal

- Keep the site simple, maintainable, and deployable through GitHub Pages.
- Prefer durable static-site choices that improve clarity without adding unnecessary tooling.

## Architecture Priorities

- Use static HTML, CSS, and JavaScript first.
- Keep the folder structure clear and easy to audit.
- Reference assets with relative paths where possible.
- Avoid adding a build system unless there is a clear maintenance, performance, or scaling benefit.
- Keep shared styles and scripts readable, minimal, and reusable.

## Folder Logic

- Keep core pages clear at the root when appropriate.
- Place images, media, icons, and related static files in `assets/`.
- Use `about/` or `pages/` only when a separate page structure is needed.
- Preserve `CNAME`, `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, and `.nojekyll`.
- Avoid absolute local Windows paths and broken GitHub Pages routing.

## Form Strategy

- GitHub Pages cannot process backend forms alone.
- Use WhatsApp, FormSubmit, Formspree, Netlify Forms alternative, or another static-friendly endpoint.
- Do not invent a backend unless there is a clearly justified business or technical need.

## SEO File Discipline

- Update `sitemap.xml`, `robots.txt`, canonical URLs, and Open Graph metadata when pages or URLs change.
- Keep internal links, anchors, and page paths consistent with the deployed GitHub Pages structure.
- Ensure URL changes support search visibility, sharing previews, and user trust.

## Deployment Discipline

- Make small commits around clean checkpoints.
- Test locally when possible before deploying.
- Push only clean checkpoints when explicitly asked or when deployment is part of the agreed workflow.
- Verify the live page after push when feasible.

## Avoid

- Hidden backend assumptions, unnecessary frameworks, absolute local Windows paths, and broken GitHub Pages routing.
- Structural changes that add complexity without improving maintainability, SEO, performance, conversion, or deployment reliability.

## Self-Update Rule

- This skill may update itself when website structure changes, new assets, new media, new pages, deployment findings, or durable architecture decisions make an update valuable. Keep updates concise and high-impact. Do not update the skill for temporary ideas, minor wording preferences, low-value observations, private data, credentials, or noise.
