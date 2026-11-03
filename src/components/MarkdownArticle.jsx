import { useEffect, useId, useState } from "react";

// Renders the blog Markdown written by seo-agents (and the older hand-written posts):
// frontmatter, # / ## / ### headings, "- " bullets, "1. " steps, pipe tables, ![alt](src "caption") images,
// ```mermaid diagrams, > quotes, and inline [links](/path), **bold**, *italic*, `code`.

const text = {
  h1: "mb-3 text-2xl font-medium leading-9 tracking-[-.02em] text-zinc-900",
  h2: "mt-12 mb-4 text-lg font-medium leading-7 text-zinc-900",
  h3: "mt-8 mb-3 text-base font-medium leading-7 text-zinc-900",
  body: "mb-5 text-base leading-[1.7] text-zinc-500",
  meta: "mb-8 font-mono text-sm leading-6 text-zinc-400",
  link: "font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-2 hover:decoration-zinc-500",
};

export function parseFrontmatter(source) {
  const match = /^---\s*\n([\s\S]*?)\n---\s*\n/.exec(source || "");
  if (!match) return { meta: {}, body: source || "" };
  const meta = {};
  for (const line of match[1].split("\n")) {
    const at = line.indexOf(":");
    if (at < 1) continue;
    const key = line.slice(0, at).trim();
    const raw = line.slice(at + 1).trim();
    try { meta[key] = JSON.parse(raw); } catch { meta[key] = raw; }
  }
  return { meta, body: source.slice(match[0].length) };
}

export function tagSlug(tag) {
  return String(tag).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const INLINE = /\[((?:\[[^\]]*\]|[^\]])+)\]\(([^)\s]+)(?:\s+"[^"]*")?\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`/g;

function Inline({ children }) {
  const source = String(children || "");
  const parts = [];
  let last = 0;
  for (const match of source.matchAll(INLINE)) {
    if (match.index > last) parts.push(source.slice(last, match.index));
    const key = parts.length;
    if (match[1] !== undefined) {
      const external = match[2].startsWith("http");
      parts.push(<a key={key} className={text.link} href={match[2]} target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}><Inline>{match[1]}</Inline></a>);
    } else if (match[3] !== undefined) parts.push(<strong key={key} className="font-medium text-zinc-900">{match[3]}</strong>);
    else if (match[4] !== undefined) parts.push(<em key={key}>{match[4]}</em>);
    else parts.push(<code key={key} className="font-mono text-sm">{match[5]}</code>);
    last = match.index + match[0].length;
  }
  if (last < source.length) parts.push(source.slice(last));
  return <>{parts}</>;
}

function Mermaid({ code, alt }) {
  const id = "m" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const [svg, setSvg] = useState(null);
  useEffect(() => {
    let alive = true;
    import("mermaid")
      .then(({ default: mermaid }) => {
        mermaid.initialize({ startOnLoad: false, theme: "neutral" });
        return mermaid.render(id, code);
      })
      .then((result) => { if (alive) setSvg(result.svg); })
      .catch(() => { if (alive) setSvg(""); });
    return () => { alive = false; };
  }, [code, id]);
  if (svg) return <div role="img" aria-label={alt} className="flex justify-center" dangerouslySetInnerHTML={{ __html: svg }} />;
  return <pre aria-label={alt} className="overflow-x-auto font-mono text-sm text-zinc-500">{code}</pre>;
}

function cells(line) {
  return line.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim());
}

export function parseBlocks(body) {
  const lines = (body || "").split("\n");
  const blocks = [];
  let i = 0;
  const caption = () => {
    const next = (lines[i] || "").trim();
    const found = /^\*(.+?)\*(?:\s*<!--\s*alt:\s*(.*?)\s*-->)?$/.exec(next);
    if (found) { i += 1; return { caption: found[1], alt: found[2] }; }
    return {};
  };
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed || (trimmed.startsWith("<!--") && trimmed.endsWith("-->"))) { i += 1; continue; }
    if (trimmed.startsWith("```")) {
      const lang = trimmed.slice(3).trim();
      const code = [];
      i += 1;
      while (i < lines.length && !lines[i].trim().startsWith("```")) { code.push(lines[i]); i += 1; }
      i += 1;
      blocks.push({ type: lang === "mermaid" ? "mermaid" : "code", code: code.join("\n"), ...caption() });
      continue;
    }
    const heading = /^(#{1,3})\s+(.*)$/.exec(trimmed);
    if (heading) { blocks.push({ type: "h" + heading[1].length, text: heading[2] }); i += 1; continue; }
    const image = /^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/.exec(trimmed);
    if (image) {
      i += 1;
      const extra = caption();
      blocks.push({ type: "image", alt: image[1], src: image[2], caption: extra.caption || image[3] });
      continue;
    }
    const group = (test) => { const out = []; while (i < lines.length && test(lines[i].trim())) { out.push(lines[i].trim()); i += 1; } return out; };
    if (/^- /.test(trimmed)) { blocks.push({ type: "ul", items: group((l) => /^- /.test(l)).map((l) => l.slice(2)) }); continue; }
    if (/^\d+\. /.test(trimmed)) { blocks.push({ type: "ol", items: group((l) => /^\d+\. /.test(l)).map((l) => l.replace(/^\d+\. /, "")) }); continue; }
    if (trimmed.startsWith("|")) {
      const rows = group((l) => l.startsWith("|")).filter((l) => !/^\|\s*-{3}/.test(l)).map(cells);
      const last = blocks[blocks.length - 1];
      const tableCaption = last && last.type === "p" && /^\*[^*].*\*$/.test(last.text) ? blocks.pop().text.slice(1, -1) : null;
      blocks.push({ type: "table", header: rows[0], rows: rows.slice(1), caption: tableCaption });
      continue;
    }
    if (trimmed.startsWith("> ")) { blocks.push({ type: "quote", text: group((l) => l.startsWith("> ")).map((l) => l.slice(2)).join(" ") }); continue; }
    const para = group((l) => l && !/^(#{1,3}\s|- |\d+\. |\||> |```|!\[)/.test(l) && !l.startsWith("<!--"));
    if (para.length) blocks.push({ type: "p", text: para.join(" ") });
    else i += 1;
  }
  return blocks;
}

export default function MarkdownArticle({ body }) {
  return parseBlocks(body).map((block, index) => {
    switch (block.type) {
      case "h1": return <h1 key={index} className={text.h1}>{block.text}</h1>;
      case "h2": return <h2 key={index} className={text.h2}>{block.text}</h2>;
      case "h3": return <h3 key={index} className={text.h3}>{block.text}</h3>;
      case "ul": return <ul key={index} className={`list-disc pl-5 ${text.body}`}>{block.items.map((item, j) => <li key={j} className="mb-1"><Inline>{item}</Inline></li>)}</ul>;
      case "ol": return <ol key={index} className={`list-decimal pl-5 ${text.body}`}>{block.items.map((item, j) => <li key={j} className="mb-1"><Inline>{item}</Inline></li>)}</ol>;
      case "quote": return <blockquote key={index} className={`border-l-2 border-zinc-200 pl-4 ${text.body}`}><Inline>{block.text}</Inline></blockquote>;
      case "image": return (
        <figure key={index} className="mb-6">
          <img className="mx-auto block h-auto max-h-[420px] w-auto max-w-full rounded border border-zinc-200" src={block.src} alt={block.alt} loading="lazy" decoding="async" />
          {block.caption && <figcaption className="mt-2 text-center text-sm text-zinc-400"><Inline>{block.caption}</Inline></figcaption>}
        </figure>
      );
      case "mermaid": return (
        <figure key={index} className="mb-6">
          <Mermaid code={block.code} alt={block.alt || block.caption || "Diagram"} />
          {block.caption && <figcaption className="mt-2 text-sm text-zinc-400"><Inline>{block.caption}</Inline></figcaption>}
        </figure>
      );
      case "code": return <pre key={index} className="mb-5 overflow-x-auto font-mono text-sm text-zinc-500">{block.code}</pre>;
      case "table": return (
        <div key={index} className="mb-6 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm text-zinc-500">
            {block.caption && <caption className="mb-2 text-left text-sm text-zinc-400"><Inline>{block.caption}</Inline></caption>}
            <thead><tr>{block.header.map((cell, j) => <th key={j} className="border-b border-zinc-200 py-2 pr-4 font-medium text-zinc-900"><Inline>{cell}</Inline></th>)}</tr></thead>
            <tbody>{block.rows.map((row, r) => <tr key={r}>{row.map((cell, j) => <td key={j} className="border-b border-zinc-100 py-2 pr-4 align-top"><Inline>{cell}</Inline></td>)}</tr>)}</tbody>
          </table>
        </div>
      );
      default: {
        if (/^\*Last updated:/.test(block.text)) return <p key={index} className={text.meta}>{block.text.replace(/\*/g, "")}</p>;
        return <p key={index} className={text.body}><Inline>{block.text}</Inline></p>;
      }
    }
  });
}

// Per-route head for client-rendered posts: title, description, canonical, Open Graph, JSON-LD.
export function useArticleHead(meta, jsonLd) {
  useEffect(() => {
    if (!meta || !meta.title) return undefined;
    const previous = document.title;
    document.title = meta.title;
    const set = (selector, create, attr, value) => {
      let node = document.head.querySelector(selector);
      if (!node) { node = create(); document.head.appendChild(node); }
      node.setAttribute(attr, value);
      return node;
    };
    const meta_ = (name, attr = "name") => () => { const m = document.createElement("meta"); m.setAttribute(attr, name); return m; };
    if (meta.description) {
      set('meta[name="description"]', meta_("description"), "content", meta.description);
      set('meta[property="og:description"]', meta_("og:description", "property"), "content", meta.description);
    }
    set('meta[property="og:title"]', meta_("og:title", "property"), "content", meta.title);
    set('meta[property="og:type"]', meta_("og:type", "property"), "content", "article");
    if (meta.url) {
      const href = window.location.origin + meta.url;
      set('link[rel="canonical"]', () => { const l = document.createElement("link"); l.setAttribute("rel", "canonical"); return l; }, "href", href);
      set('meta[property="og:url"]', meta_("og:url", "property"), "content", href);
    }
    let script = null;
    if (jsonLd) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
    return () => { document.title = previous; if (script) script.remove(); };
  }, [meta, jsonLd]);
}
