import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, CalendarDays } from "lucide-react";
import Loading from "../Components/Loading";
import RouteShell from "../Components/RouteShell";

function extractFrontmatter(markdown) {
  if (markdown.startsWith("---")) {
    const end = markdown.indexOf("---", 3);
    if (end !== -1) {
      const fm = markdown.slice(3, end).trim();
      const lines = fm.split("\n");
      const data = {};
      lines.forEach((line) => {
        const [key, ...rest] = line.split(":");
        if (key && rest.length) data[key.trim()] = rest.join(":").trim();
      });
      return { frontmatter: data, content: markdown.slice(end + 3).trim() };
    }
  }
  return { frontmatter: {}, content: markdown };
}

function BlogDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [frontmatter, setFrontmatter] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/blog/${slug}.md`)
      .then((res) => {
        if (!res.ok) throw new Error("Blog not found");
        return res.text();
      })
      .then((text) => {
        const parsed = extractFrontmatter(text);
        setFrontmatter(parsed.frontmatter);
        setContent(parsed.content);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <Loading />;

  const title = frontmatter.title || slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <RouteShell
      eyebrow="article"
      title={error ? "Blog not found" : title}
      description={frontmatter.date ? `Published ${frontmatter.date}` : "Developer notes and implementation details."}
    >
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-sm font-semibold text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
      >
        <ArrowLeft size={15} />
        Back
      </button>

      {error ? (
        <div className="border border-red-400/20 bg-red-950/20 p-5 text-red-200">{error}</div>
      ) : (
        <article className="border border-white/10 bg-[#08090b]/95 p-5 sm:p-8">
          {frontmatter.date && (
            <div className="mb-6 flex items-center gap-2 font-mono text-xs text-zinc-600">
              <CalendarDays size={14} />
              {frontmatter.date}
            </div>
          )}
          <div className="prose prose-invert prose-zinc max-w-none prose-headings:tracking-[-0.03em] prose-a:text-white prose-a:underline prose-code:text-zinc-200 prose-pre:border prose-pre:border-white/10 prose-pre:bg-black/40">
            <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
          </div>
        </article>
      )}
    </RouteShell>
  );
}

export default BlogDetailsPage;
