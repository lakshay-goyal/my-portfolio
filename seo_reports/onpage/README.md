# On-page SEO proposals (`seo_reports/onpage/`)

Generated from the exploration JSON only (`seo_reports/site_model/`, `repo_context.json`); no client
source was read or changed. Review each change, then apply the ones you approve in the codebase.

- `index.json` - run metadata, the checklist, one row per page with change counts and checklist scores.
- `site.json` - site-wide proposals (robots.txt, sitemap.xml, llms.txt), duplicates, topic clusters.
- `pages/<id>.json` - every proposed change for one URL:
  - `current`  : what is served today (from the exploration JSON)
  - `expected` : the proposed content
  - `reference`: where to change it (`edit.kind/file/line/pointer` from the exploration model;
                 `method: add` means insert at the given target)
  - `expected_html`: ready-to-paste semantic HTML, when relevant
  - `facts`    : fact-check result (`needs_verification` lists numbers/claims not found in the JSON)
  - `status`   : `proposed | needs_verification | needs_review`
- `pages/<id>.expected.html` - the full expected page (H1, direct answer, sections, FAQ, author box, JSON-LD)
  for side-by-side review with the live page.

`[VERIFY: ...]` placeholders mark facts only the site owner can supply. Nothing is invented.
