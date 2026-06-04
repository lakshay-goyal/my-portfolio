import { ExternalLink, Github, PlayCircle } from "lucide-react";
import useMajorProjectsStore from "../store/zustand/useMajorProjectsStore";

function MajorProjects() {
  const projects = useMajorProjectsStore((state) => state.majorProjects);

  return (
    <div className="grid gap-px border-b border-white/10 bg-white/10">
      {projects.map((project, index) => (
        <article
          key={project.title}
          className="group bg-[#08090b]/95 p-4 transition-colors duration-300 hover:bg-[#101010] sm:p-5"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1">
              <div className="mb-3 flex items-center gap-3">
                <span className="font-mono text-xs text-zinc-600">{String(index + 1).padStart(2, "0")}</span>
                <span className="rounded border border-white/10 px-2 py-1 font-mono text-[11px] text-zinc-600">
                  {project.tech[0] || "Project"}
                </span>
              </div>
              <h2 className="text-xl font-bold tracking-[-0.02em] text-white">{project.title}</h2>
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-500">{project.description}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span key={tech} className="rounded border border-white/10 bg-white/[0.035] px-2.5 py-1 font-mono text-[11px] text-zinc-400">
                  {tech}
                </span>
              ))}
            </div>
            </div>

            <div className="flex gap-2 sm:w-52 sm:flex-col">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
              >
                <Github size={16} />
                Source
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
                >
                  <PlayCircle size={16} />
                  Live
                </a>
              )}
              {!project.live && (
                <span className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm text-zinc-600">
                  <ExternalLink size={16} />
                  Private
                </span>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default MajorProjects;
