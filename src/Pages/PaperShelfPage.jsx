import { useEffect, useState } from "react";
import { ArrowUpRight, FileText } from "lucide-react";
import Loading from "../Components/Loading";
import RouteShell from "../Components/RouteShell";
import usePapersStore from "../store/zustand/usePapersStore";

function PaperShelfPage() {
  const papers = usePapersStore((state) => state.papers);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

  const groupedPapers = papers.reduce((acc, paper) => {
    if (!acc[paper.category]) acc[paper.category] = [];
    acc[paper.category].push(paper);
    return acc;
  }, {});

  return (
    <RouteShell
      eyebrow="research shelf"
      title="PaperShelf"
      description="Papers and technical references I keep coming back to."
    >
      <div className="space-y-5">
        {Object.entries(groupedPapers).map(([category, categoryPapers]) => (
          <section key={category} className="overflow-hidden border border-white/10 bg-white/10">
            <div className="flex items-center justify-between bg-[#08090b]/95 px-4 py-3">
              <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-500">{category}</h2>
              <span className="rounded border border-white/10 px-2 py-1 font-mono text-[11px] text-zinc-600">
                {categoryPapers.length} papers
              </span>
            </div>
            <div className="grid gap-px bg-white/10">
              {categoryPapers.map((paper) => (
                <a
                  key={paper.link}
                  href={paper.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-4 bg-[#08090b]/95 p-4 transition-colors hover:bg-[#101010] sm:flex-row"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-md border border-white/10 bg-white/[0.035] text-zinc-500">
                    <FileText size={19} />
                  </span>
                  <span>
                    <span className="block text-lg font-bold text-white">{paper.title}</span>
                    <span className="mt-1 block text-sm italic text-zinc-500">{paper.authors}</span>
                    <span className="mt-1 block font-mono text-xs text-zinc-600">
                      {paper.publication} / {paper.year}
                    </span>
                    <span className="mt-3 block text-sm leading-6 text-zinc-400">{paper.description}</span>
                  </span>
                  <span className="inline-flex items-center gap-2 self-center text-sm font-semibold text-zinc-500 transition-colors group-hover:text-white">
                    Read
                    <ArrowUpRight size={15} />
                  </span>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </RouteShell>
  );
}

export default PaperShelfPage;
