# Drop your real project material here / ضع أعمالك الحقيقية هنا

This folder is the staging area for WB Studio's **own** project imagery
(renders, drawings, photos). Nothing in this folder is published — it is
ignored by every page until a project is wired into `data/projects.json`.

## How to publish a real project

1. Create a folder here named after the project slug, e.g. `_incoming/villa-x/`.
2. Put the images inside. Aim for:
   - `cover` — landscape, ideally 1800–2000px wide, ratio 16:10
   - `gallery-01 …` — 1400–1600px wide (landscape) or 1100–1200px (portrait)
   - WebP preferred (JPG also fine; convert when possible)
3. Move the folder up one level: `assets/projects/<slug>/`.
4. Add (or edit) the project entry in `data/projects.json` — copy an existing
   entry and fill in both `ar` and `en` for every text field.
   Set `"placeholder": false` so the «دراسة مفاهيمية / Concept study» tag and
   the imagery disclaimer disappear for that project.
5. Remove the replaced placeholder rows from `assets/licenses/LICENSES.md`.
6. Run `node scripts/build.mjs`, review locally, then commit and push.

Tip: you can also simply ask your coding agent —
"Publish the project in `assets/projects/_incoming/villa-x` with this info: …"
