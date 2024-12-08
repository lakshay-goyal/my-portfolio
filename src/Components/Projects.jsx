import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Smartphone, Brain } from 'lucide-react';

const Projects = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      title: 'Web Based Projects',
      description: 'Dynamic web applications and responsive websites',
      icon: Code,
      category: 'web',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      id: 2,
      title: 'Mobile App Projects',
      description: 'Cross-platform and native mobile applications',
      icon: Smartphone,
      category: 'app',
      gradient: 'from-green-400 to-teal-500'
    },
    {
      id: 3,
      title: 'Machine Learning Projects',
      description: 'AI and data-driven intelligent solutions',
      icon: Brain,
      category: 'ml',
      gradient: 'from-red-500 to-orange-500'
    }
  ];

  const handleProjectClick = (category) => {
    navigate(`/projects/${category}`);
  };

  return (
    <section id="Project" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 relative inline-block">
            My Projects
            <span className="absolute bottom-[-10px] left-0 w-full h-1 bg-indigo-500"></span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((project) => {
            const IconComponent = project.icon;
            return (
              <div 
                key={project.id}
                className={`bg-gradient-to-br ${project.gradient} rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
              >
                <div className="p-6 text-white">
                  <div className="flex items-center mb-4">
                    <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
                      <IconComponent size={36} />
                    </div>
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                  </div>
                  
                  <p className="mb-6 text-white text-opacity-80">
                    {project.description}
                  </p>
                  
                  <button
                    onClick={() => handleProjectClick(project.category)}
                    className="w-full bg-white text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center"
                  >
                    View Projects
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 ml-2" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;