import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github, PlayCircle, X } from "lucide-react";
import Loading from "./Loading";
import RouteShell from "./RouteShell";
import useAllProjectsStore from "../store/zustand/useAllProjectsStore";

const labels = {
  web: "Web Projects",
  app: "Mobile App Projects",
  ai: "AI Projects",
  blockchain: "Blockchain Projects",
};

function ProjectPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const allProjects = useAllProjectsStore((state) => state.allProjects);
  const projects = allProjects[category] || [];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(timer);
  }, [category]);

  if (loading) return <Loading />;

  return (
    <RouteShell
      eyebrow="project collection"
      title={labels[category] || "Projects"}
      description="Open a live build, inspect source, or play a short preview where available."
    >
      {projects.length === 0 ? (
        <div className="border border-white/10 bg-[#08090b]/95 p-8 text-zinc-400">No projects found for this category.</div>
      ) : (
        <div className="grid gap-px border-b border-white/10 bg-white/10">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 bg-[#08090b]/95 px-4 py-3 text-sm font-semibold text-zinc-400 transition-colors hover:text-white"
          >
            <ArrowLeft size={15} />
            Back
          </button>
          {projects.map((project, index) => (
              <article key={project.id} className="group bg-[#08090b]/95 p-4 transition-colors hover:bg-[#101010] sm:p-5">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="font-mono text-xs text-zinc-600">{String(index + 1).padStart(2, "0")}</span>
                    <span className="rounded border border-white/10 px-2 py-1 font-mono text-[11px] text-zinc-600">
                      {project.technologies[0] || "Project"}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold tracking-[-0.02em] text-white">{project.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-zinc-500">{project.description}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="rounded border border-white/10 bg-white/[0.035] px-2.5 py-1 font-mono text-[11px] text-zinc-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:w-52 sm:flex-col">
                    {project.videoLink && (
                      <button
                        type="button"
                        onClick={() => setSelectedVideo(project.videoLink)}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
                      >
                        <PlayCircle size={16} />
                        Preview
                      </button>
                    )}
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
                    >
                      <Github size={16} />
                      Source
                    </a>
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
                      >
                        <ExternalLink size={16} />
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </article>
          ))}
        </div>
      )}

      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur">
          <div className="relative w-full max-w-4xl border border-white/10 bg-[#08090b] p-3">
            <button
              type="button"
              onClick={() => setSelectedVideo(null)}
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-md border border-white/10 bg-black/70 text-zinc-300 hover:text-white"
              aria-label="Close preview"
            >
              <X size={18} />
            </button>
            <video src={selectedVideo} controls autoPlay className="aspect-video w-full bg-black" />
          </div>
        </div>
      )}
    </RouteShell>
  );
}

export default ProjectPage;
