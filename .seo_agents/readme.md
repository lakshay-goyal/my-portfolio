# On-page SEO inventory (schema 2.0)

Generated under `seo_reports/onpage/`. Each file has a category, extraction
coverage and pages identified by route URL and source template. Evidence includes
source file, line and source_id. Relative hrefs remain intact; target_url resolves
relative internal destinations against their page route. No production domain is
invented. Absolute links remain unclassified without an authoritative site origin.

- content.json: full literal text fragments, UI labels, word counts and references
  to corresponding link/media records. Text is not limited to an excerpt.
- page_structure.json: heading text/levels and semantic landmarks.
- internal_links.json: anchors, original hrefs, normalized destinations, rel/target.
- metadata.json: exact HTML declarations and literal title/description exports,
  including ancestor layout declarations. Runtime merge semantics remain unknown.
- media.json: per-page image/video/audio/source/track/iframe declarations, alt,
  source, local bytes, PNG/GIF/JPEG/SVG dimensions when readable, declared size,
  responsive attributes, preload/priority and loading defaults.
- urls.json: route templates, dynamic patterns, depths and query links.
- eeat.json: visible candidate evidence for authorship, experience, expertise,
  trust, reviews and dates, plus policy links and possible external citations.
  Candidates do not verify credentials, authenticity or reputation.

## Coverage

This is a static inventory, not a rendered browser crawl. Local components and
ancestor Next.js layouts are followed. Literal constants and local asset imports
are resolved. Runtime expressions, component props, unsupported aliases, nested
React Router configurations, dynamic route instances and data from APIs/CMS need
further resolution. Check each page's coverage before interpreting absence.
Source order per file is retained; composed rendered order is not established.
Images outside public/ or literal imports may be unresolved. Remote bytes and
optimized transfer bytes are unknown. The 200 KiB source-size budget is a review
heuristic; displayed dimensions and placement are needed to judge undersizing.
Empty alt may correctly identify a decorative image. E-E-A-T relevance depends
on the purpose of the page; missing candidate signals are not universal failures.

## Analyze saved JSON only

With seo-agents installed, run:

```sh
python -m seo_agents.exploration.checks.json_analysis seo_reports/onpage
```

This emits evidence-linked review findings without reading application source,
calling an LLM or accessing the network. No aggregate-only AI summary is embedded
in the inventory. The schema is incompatible with the old count/excerpt reports.
