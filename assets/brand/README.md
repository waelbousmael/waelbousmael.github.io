# Brand assets

Current brand expression is intentionally minimal:

- **Wordmark** — the site uses a typographic wordmark ("WB STUDIO", uppercase,
  letterspaced, in the display font of each language) rendered as live text,
  not an image. There is no SVG logo dependency.
- **Icons** — favicon and app icons live in `/assets/icons/` and are referenced
  by `manifest.webmanifest` (do not rename without updating the manifest).
- **Palette** — defined once in `assets/css/site.css` under `:root`
  (warm white `#faf8f4`, charcoal `#1e1c19`, stone `#f2eee7`, warm grey `#857f74`).
- **Type** — AR: Amiri (display) + IBM Plex Sans Arabic (body).
  EN: Cormorant Garamond (display) + Inter (body). Loaded per-language from
  Google Fonts (see `fonts` in `data/site.mjs`).

Put any future brand files (SVG logo, social templates, print assets) in this
folder and record their origin in `assets/licenses/LICENSES.md` if external.
