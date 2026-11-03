# SEO exploration output

## `seo_reports/site_model/` (primary)

- `index.json`: planning view; load this first (one row per URL, coverage counts).
- `site.json`: site-wide facts (robots, sitemaps, redirects, headers, i18n, link graph).
- `pages/<id>.json`: everything known about one URL. Each value has
  `{value, method, edit, confidence}`; `edit.kind` is one of
  `literal | json | yaml | markdown | i18n | prop | computed | cms | add`.
  `computed`/`cms` mean a source edit alone may not change the value.

Methods: `rendered` (browser DOM), `raw-html` (HTTP response without JS) or
`source-*` (static analysis). Absence of a value is only meaningful when the
page's coverage state for that field is `measured`.

## `seo_reports/repo_context.json`

Deterministic repository signals (routes, rendering hints, crawl control, security
headers, structured data, i18n, performance causes) with file/line references.

## `seo_reports/onpage/` (optional, legacy)

Seven schema-2.0 category reports produced by the LLM extraction agents when they
run. Analyze them offline with:

```sh
python -m seo_agents.exploration.repo_analysis.json_analysis seo_reports/onpage
```
