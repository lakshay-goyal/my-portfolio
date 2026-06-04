import { useEffect, useState } from "react";
import { ArrowUpRight, CalendarDays, Newspaper } from "lucide-react";
import Loading from "../Components/Loading";
import RouteShell from "../Components/RouteShell";

function BlogPage() {
  const [blogs, setBlogs] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("/blog/blog.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load blogs");
        return res.json();
      })
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;

  return (
    <RouteShell
      eyebrow="writing"
      title="Blog"
      description="Notes from building, deploying, and learning software."
    >
      {error ? (
        <div className="border border-red-400/20 bg-red-950/20 p-5 text-red-200">{error}</div>
      ) : Object.keys(blogs).length === 0 ? (
        <div className="border border-white/10 bg-[#08090b]/95 p-5 text-zinc-400">No blogs found.</div>
      ) : (
        <div className="space-y-5">
          {Object.entries(blogs).map(([category, blogArr]) => (
            <section key={category} className="overflow-hidden border border-white/10 bg-white/10">
              <div className="flex items-center justify-between gap-4 bg-[#08090b]/95 px-4 py-3">
                <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-500">{category}</h2>
                <span className="rounded border border-white/10 px-2 py-1 font-mono text-[11px] text-zinc-600">
                  {blogArr.length} posts
                </span>
              </div>
              <div className="grid gap-px bg-white/10">
                {blogArr.map((blog) => (
                  <a
                    key={blog.link}
                    href={blog.link}
                    className="group flex flex-col gap-3 bg-[#08090b]/95 px-4 py-4 transition-colors hover:bg-[#101010] sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="flex min-w-0 items-start gap-3">
                      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-md border border-white/10 bg-white/[0.035] text-zinc-500">
                        <Newspaper size={16} />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-lg font-bold text-white">{blog.title}</span>
                        {blog.date && (
                          <span className="mt-1 flex items-center gap-2 font-mono text-xs text-zinc-600">
                            <CalendarDays size={13} />
                            {blog.date}
                          </span>
                        )}
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-2 self-center justify-self-start text-sm font-semibold text-zinc-500 transition-colors group-hover:text-white sm:justify-self-end">
                      Read
                      <ArrowUpRight size={15} />
                    </span>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </RouteShell>
  );
}

export default BlogPage;
