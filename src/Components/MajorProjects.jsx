import React, { useState, useEffect } from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import Loading from './Loading';
import useMajorProjectsStore from '../store/zustand/useMajorProjectsStore';

function MajorProjects() {
  const majorProjects = useMajorProjectsStore((state) => state.majorProjects);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);
  if (loading) return <Loading />;
  return (
    <section className="py-20 bg-[#fafafa] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            <span className="relative inline-block">
              <span className="relative z-10">Projects</span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-indigo-200/50 -rotate-1 -z-0"></span>
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Each project tells a story of problem-solving and technical craftsmanship
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {majorProjects.map((project, idx) => (
            <div 
              key={idx}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200/70 hover:border-indigo-200"
            >
              <div className="relative h-60 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-all duration-500"></div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-contain transition-all duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/400x300?text=Project+Preview';
                  }}
                />
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
                  <span className="text-xs font-mono bg-gray-100 text-gray-500 px-2 py-1 rounded">
                    0{idx + 1}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-5">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium hover:bg-indigo-100 hover:text-indigo-700 transition-all"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3 border-t border-gray-100 pt-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors group/link"
                  >
                    <span className="relative">
                      <FiGithub className="text-lg" />
                      <span className="absolute -left-1 -top-1 w-5 h-5 bg-indigo-100 rounded-full opacity-0 group-hover/link:opacity-100 -z-10 transition-all"></span>
                    </span>
                    <span>Source Code</span>
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors group/link"
                    >
                      <span className="relative">
                        <FiExternalLink className="text-lg" />
                        <span className="absolute -left-1 -top-1 w-5 h-5 bg-indigo-100 rounded-full opacity-0 group-hover/link:opacity-100 -z-10 transition-all"></span>
                      </span>
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MajorProjects;