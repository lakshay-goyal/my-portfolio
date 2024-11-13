import React from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';

// Main Projects Component
const Projects = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      title: 'Web Based Project',
      image: "https://png.pngtree.com/png-vector/20190611/ourmid/pngtree-web-development-illustration-modern-can-be-used-for-landing-pages-web-png-image_1496210.jpg",
      category: 'web'
    },
    {
      id: 2,
      title: 'App Based Project',
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlpuble9yMdpMhK_Cp6x1VzT84SPiRD65SdQ&s",
      category: 'app'
    },
    {
      id: 3,
      title: 'ML Based Project',
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlrtLDX5LwIhuIPaUsUjHMpG_bwHMPn23C_w&s",
      category: 'ml'
    },
  ];

  const handleProjectClick = (category) => {
    navigate(`/projects/${category}`);
  };

  return (
    <section id="Project" className="my-11">
      <div className="flex justify-center text-3xl font-semibold">
        <h2>
          My Projects
          <div className="bg-black h-1 w-auto rounded my-1"></div>
        </h2>
      </div>

      <div className="flex flex-wrap justify-center my-16">
        {categories.map((project) => (
          <div
            key={project.id}
            className="border mx-9 my-3 rounded border-black w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-3 text-center hover:shadow-lg transition-shadow duration-300"
          >
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-48 object-cover rounded mb-4" 
            />
            <p className="text-lg font-medium mb-4">{project.title}</p>
            <button
              onClick={() => handleProjectClick(project.category)}
              className="border border-black rounded p-2 bg-indigo-500 font-semibold text-white px-4 hover:bg-indigo-600 active:bg-indigo-700 transition-colors duration-300"
            >
              View Projects
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Projects;