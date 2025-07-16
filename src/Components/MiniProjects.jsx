import React from 'react';
import { Code, Smartphone, Brain, Shield } from 'lucide-react';

const categories = [
  {
    id: 1,
    title: 'Web Development',
    description: 'Dynamic web applications and responsive websites.',
    icon: Code,
    category: 'web',
    accent: 'text-blue-500',
    bg: 'bg-blue-200',
    border: 'hover:border-blue-400',
  },
  {
    id: 2,
    title: 'App Development',
    description: 'Cross-platform and native mobile applications.',
    icon: Smartphone,
    category: 'app',
    accent: 'text-teal-500',
    bg: 'bg-teal-200',
    border: 'hover:border-teal-400',
  },
  {
    id: 3,
    title: 'AI & Machine Learning',
    description: 'AI-powered and data-driven intelligent solutions.',
    icon: Brain,
    category: 'ai',
    accent: 'text-pink-500',
    bg: 'bg-pink-200',
    border: 'hover:border-pink-400',
  },
  {
    id: 4,
    title: 'Blockchain Development',
    description: 'Decentralized apps and smart contract solutions.',
    icon: Shield,
    category: 'blockchain',
    accent: 'text-yellow-500',
    bg: 'bg-yellow-200',
    border: 'hover:border-yellow-400',
  },
];

const MiniProjects = () => {
  return (
    <section id="MiniProjects" className="py-20 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight relative inline-block">
            Mini Projects
            <span className="absolute left-1/2 -bottom-2 w-20 h-1 bg-blue-200 rounded-full -translate-x-1/2"></span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dive into my work across web, mobile, AI, and blockchain technologies.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((project) => {
            const IconComponent = project.icon;
            return (
              <div
                key={project.id}
                className={`relative group ${project.bg} border border-gray-200 rounded-2xl p-7 flex flex-col items-center justify-between min-h-[260px] shadow-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl ${project.border}`}
              >
                <div className="flex flex-col items-center mb-4">
                  <div className={`mb-3 p-3 rounded-full bg-white shadow ${project.accent}`}>
                    <IconComponent size={36} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-1">{project.title}</h3>
                </div>
                <p className="text-gray-600 text-sm text-center mb-6 flex-1">
                  {project.description}
                </p>
                {/* No navigation button in HomePage version */}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MiniProjects; 