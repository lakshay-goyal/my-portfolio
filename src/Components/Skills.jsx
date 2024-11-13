import React from 'react';

const SkillCard = ({ title, image, skills }) => (
  <div className="transform hover:-translate-y-2 transition-all duration-300">
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl p-6">
      <div className="relative">
        <div className="aspect-square overflow-hidden rounded-lg mb-6">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
            {title}
          </span>
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {title}
          <div className="h-1 w-16 bg-blue-600 rounded-full mt-2 transform origin-left hover:scale-x-150 transition-transform duration-300"></div>
        </h3>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {skills.split(', ').map((skill, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

function Skills() {
  const skillsData = [
    {
      title: "Web Development",
      image: "https://png.pngtree.com/png-vector/20190611/ourmid/pngtree-web-development-illustration-modern-can-be-used-for-landing-pages-web-png-image_1496210.jpg",
      skills: "HTML, CSS, JavaScript, ReactJS, NextJS, NodeJS, MongoDB, Flask, Django, API Development"
    },
    {
      title: "DevOps",
      image: "https://img.freepik.com/free-vector/flat-design-devops-illustration_52683-84086.jpg",
      skills: "Linux, Git-Github, GitLab, Docker"
    },
    {
      title: "App Development",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlpuble9yMdpMhK_Cp6x1VzT84SPiRD65SdQ&s",
      skills: "Java, React-Native, Kotlin, API Connectivity"
    },
    {
      title: "Data Analytics",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlrtLDX5LwIhuIPaUsUjHMpG_bwHMPn23C_w&s",
      skills: "Python, R, Numpy, Pandas, Matplotlib, Seaborn, Beautiful soup, Selenium"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            My Skills
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <div className="h-1 w-24 bg-blue-600 rounded-full"></div>
            </div>
          </div>
          <p className="mt-8 text-xl text-gray-600">
            Expertise across various technologies and frameworks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillsData.map((skill, index) => (
            <SkillCard
              key={index}
              title={skill.title}
              image={skill.image}
              skills={skill.skills}
            />
          ))}
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {skillsData.map((skill, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center p-4 bg-white rounded-full shadow-lg mb-4">
                <svg 
                  className="w-8 h-8 text-blue-600" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" 
                  />
                </svg>
              </div>
              <div className="text-lg font-semibold text-gray-700">{skill.title}</div>
              <div className="text-sm text-gray-500">Expert Level</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;