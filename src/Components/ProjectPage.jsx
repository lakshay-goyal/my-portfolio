import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from './Loading';

// import images
import LanguageTranslatorApplicationImg from "../assets/img/LanguageTranslatorApplication.jpg";
import useAllProjectsStore from '../store/zustand/useAllProjectsStore';

const ProjectPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  const allProjects = useAllProjectsStore((state) => state.allProjects);
  const projects = allProjects[category] || [];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [category]);

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 text-indigo-600 hover:text-indigo-800"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold">
          {category.toUpperCase()} Projects
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            {selectedVideo === project.videoLink ? (
              <div className="relative pb-9/16">
                <iframe
                  src={selectedVideo}
                  title="Project Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-64 rounded-md"
                />
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="absolute top-2 right-2 text-red-500 font-bold"
                >
                  Close ×
                </button>
              </div>
            ) : (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-contain cursor-pointer"
                onClick={() => setSelectedVideo(project.videoLink)}
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 px-2 py-1 rounded text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  GitHub →
                </a>
                {project.liveLink==""?
                  <p></p>:
                  <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  Live Demo →
                </a>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
