import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github, PlayCircle, X } from "lucide-react";
import Loading from "./Loading";
import RouteShell from "./RouteShell";
import useAllProjectsStore from "../store/zustand/useAllProjectsStore";
import LanguageTranslatorApplicationImg from "../assets/img/LanguageTranslatorApplication.jpg";

const labels = {
  web: "Web Projects",
  app: "Mobile App Projects",
  ai: "AI Projects",
  blockchain: "Blockchain Projects",
};

const getProjectImage = (image) => {
  if (!image) return "https://res.cloudinary.com/dkiktv5ur/image/upload/v1734670441/ekftfhtrsbueajzfquwn.png";
  if (image === "LanguageTranslatorApplicationImg") {
    return LanguageTranslatorApplicationImg;
  }
  return image;
};

function ProjectCard({ project, index, onVideoClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article className="group flex flex-col bg-[#08090b]/95 transition-colors hover:bg-[#101010]">
      {/* Media Container */}
      <div
        className="relative aspect-video w-full overflow-hidden bg-black/40 border-b border-white/10 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => project.videoLink && onVideoClick(project.videoLink)}
      >
        {isHovered && project.videoLink ? (
          <video
            src={project.videoLink}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        ) : (
          <img
            src={getProjectImage(project.image)}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        )}
        
        {project.videoLink && (
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <div className="bg-black/60 backdrop-blur rounded-full p-3 border border-white/20 transform scale-90 group-hover:scale-100 transition-all duration-300">
              <PlayCircle className="text-white w-8 h-8" />
            </div>
          </div>
        )}
      </div>

      {/* Details Container */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-3">
            <span className="font-mono text-xs text-zinc-600">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="rounded border border-white/10 px-2 py-0.5 font-mono text-[10px] text-zinc-500">
              {project.technologies[0] || "Project"}
            </span>
          </div>
          <h2 className="text-lg font-bold tracking-tight text-white line-clamp-1 group-hover:text-emerald-300 transition-colors">
            {project.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-500 line-clamp-3">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded border border-white/10 bg-white/[0.02] px-2 py-0.5 font-mono text-[10px] text-zinc-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex gap-2">
          {project.videoLink && (
            <button
              type="button"
              onClick={() => onVideoClick(project.videoLink)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-white/10 px-3 py-2 text-xs text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
            >
              <PlayCircle size={14} />
              Preview
            </button>
          )}
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-white/10 px-3 py-2 text-xs text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
          >
            <Github size={14} />
            Source
          </a>
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-white px-3 py-2 text-xs font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
            >
              <ExternalLink size={14} />
              Live
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

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
      description="Hover over a project preview video to play inline, or click it to view in fullscreen."
    >
      {projects.length === 0 ? (
        <div className="border border-white/10 bg-[#08090b]/95 p-8 text-zinc-400">
          No projects found for this category.
        </div>
      ) : (
        <div className="flex flex-col border-b border-white/10 bg-white/10 gap-px">
          <div className="bg-[#08090b]/95 px-4 py-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 transition-colors hover:text-white"
            >
              <ArrowLeft size={15} />
              Back
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onVideoClick={setSelectedVideo}
              />
            ))}
          </div>
        </div>
      )}

      {selectedVideo &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md">
            <div className="relative bg-black p-1 rounded-lg shadow-2xl flex flex-col items-center max-w-full">
              <button
                type="button"
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-10 right-0 p-1 text-zinc-400 hover:text-white transition-colors"
                aria-label="Close preview"
              >
                <X size={24} />
              </button>
              <video
                src={selectedVideo}
                controls
                autoPlay
                className="max-h-[85vh] max-w-[90vw] md:max-h-[88vh] w-auto object-contain bg-black rounded"
              />
            </div>
          </div>,
          document.body
        )}
    </RouteShell>
  );
}

export default ProjectPage;
