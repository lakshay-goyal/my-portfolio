import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// import images
import LanguageTranslatorApplicationImg from "../assets/img/LanguageTranslatorApplication.jpg";

const ProjectPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState(null);

  const allProjects = {
    web: [
        {
          id: 1,
          title: "Portfolio Website",
          description: "Personal portfolio built with React",
          image: "https://res.cloudinary.com/dkiktv5ur/image/upload/v1734670441/ekftfhtrsbueajzfquwn.png",
          technologies: ["React", "Tailwind CSS"],
          githubLink: "https://github.com/lakshay-goyal/my-portfolio",
          liveLink: "https://lakshay-portfolio-pi.vercel.app/",
          videoLink: "https://res.cloudinary.com/dkiktv5ur/video/upload/v1734677822/myPortfolioVideo_zj1kgy.webm",
        },
        {
          id: 2,
          title: "Restaurant Booking System",
          description: "Allows users to book restaurant seats in advance with GPS-based notifications.",
          image: "https://res.cloudinary.com/dkiktv5ur/image/upload/v1734674355/RestaurantBookingSystemImg_dsmcs4.png",
          technologies: ["NextJS", "Flask", "MySQL"],
          githubLink: "https://github.com/lakshay-goyal/RestaurantBookingSystem",
          liveLink: "",
          videoLink: "https://res.cloudinary.com/dkiktv5ur/video/upload/v1734674987/ncft1tboixr9a8nrqcnp.webm",
        },
        {
          id: 3,
          title: "Resume Generator",
          description: "A tool to create professional resumes effortlessly.",
          image: "https://res.cloudinary.com/dkiktv5ur/image/upload/v1734670439/fb46cirgmckzjlkbyl2i.png",
          technologies: ["React"],
          githubLink: "https://github.com/lakshay-goyal/resume-generator",
          liveLink: "https://resume-generator-vert.vercel.app/",
          videoLink: "https://res.cloudinary.com/dkiktv5ur/video/upload/v1734677818/ResumeGeneratorVideo_hpzhqo.webm",
        },
        {
          id: 4,
          title: "DSA Problem Tracker",
          description: "Tracks and organizes DSA problems for efficient preparation.",
          image: "https://res.cloudinary.com/dkiktv5ur/image/upload/v1734670439/hyvcsz14h1qzb8sr1bun.png",
          technologies: ["React"],
          githubLink: "https://github.com/lakshay-goyal/DSAProblemTracker",
          liveLink: "https://dsa-problem-tracker.vercel.app/",
          videoLink: "https://res.cloudinary.com/dkiktv5ur/video/upload/v1734677805/DSAProblemTrackerVideo_kkfdbc.webm",
        },
        {
          id: 5,
          title: "Testimonials",
          description: "A collection of user testimonials displayed in a beautiful layout.",
          image: "https://res.cloudinary.com/dkiktv5ur/image/upload/v1734673902/TestimonialImg_vfedwh.png",
          technologies: ["React"],
          githubLink: "https://github.com/lakshay-goyal/Testimonials",
          liveLink: "https://testimonials-umber.vercel.app/",
          videoLink: "https://res.cloudinary.com/dkiktv5ur/video/upload/v1734677815/TestimonialVideo_thuvqw.webm",
        },
        {
          id: 6,
          title: "Blogs App",
          description: "A full-stack blog application to manage and post blogs.",
          image: "https://res.cloudinary.com/dkiktv5ur/image/upload/v1734674095/BlogAppImg_zwi6gm.png",
          technologies: ["React"],
          githubLink: "https://github.com/lakshay-goyal/BlogWebsite",
          liveLink: "https://blog-website-six-kohl.vercel.app/",
          videoLink: "https://res.cloudinary.com/dkiktv5ur/video/upload/v1734677805/BlogAppVideo_ukrpf6.webm",
        },
        {
          id: 7,
          title: "Todo App",
          description: "A basic to-do list app with CRUD functionality.",
          image: "https://res.cloudinary.com/dkiktv5ur/image/upload/v1734670440/jgdgwkbtetgcer71tayx.png",
          technologies: ["React", "NodeJS", "MongoDB"],
          githubLink: "https://github.com/lakshay-goyal/TodoApp",
          liveLink: "https://todoapp-1-g66a.onrender.com/",
          videoLink: "https://res.cloudinary.com/dkiktv5ur/video/upload/v1734677816/TodoAppVideo_tg5was.webm",
        },
        {
          id: 8,
          title: "Shopping Cart",
          description: "An e-commerce shopping cart demo.",
          image: "https://res.cloudinary.com/dkiktv5ur/image/upload/v1734670438/nrpjodcprlgioxdvnozn.png",
          technologies: ["React"],
          githubLink: "https://github.com/lakshay-goyal/ShoppingCart",
          liveLink: "https://shopping-cart-chi-blush.vercel.app/",
          videoLink: "https://res.cloudinary.com/dkiktv5ur/video/upload/v1734678295/ShoppingCartVideo_fwcsys.webm",
        },
        {
          id: 10,
          title: "Random GIF Generator",
          description: "Generates random GIFs using an API.",
          image: "https://res.cloudinary.com/dkiktv5ur/image/upload/v1734670438/abgnyqragf33oiunkuou.png",
          technologies: ["React"],
          githubLink: "https://github.com/lakshay-goyal/RandomGIF",
          liveLink: "https://random-gif-psi-seven.vercel.app/",
          videoLink: "https://res.cloudinary.com/dkiktv5ur/video/upload/v1734677813/RandomGifVideo_lzmtym.webm",
        },
        {
          id: 11,
          title: "React Form Demo",
          description: "A demonstration of React forms and validation.",
          image: "https://res.cloudinary.com/dkiktv5ur/image/upload/v1734670440/gwjcgbkh50qnxpmy83pa.png",
          technologies: ["React"],
          githubLink: "https://github.com/lakshay-goyal/ReactForm",
          liveLink: "https://react-form-delta-teal.vercel.app/",
          videoLink: "https://res.cloudinary.com/dkiktv5ur/video/upload/v1734677813/ReactFormVideo_bs89td.webm",
        },
        {
          id: 13,
          title: "Todo",
          description: "A Simple Todo Application for maintain all Tasks",
          image: "https://res.cloudinary.com/dkiktv5ur/image/upload/v1736707316/TodoImg_iwohqx.png",
          technologies: ["HTML", "CSS", "JavaScript"],
          githubLink: "https://github.com/lakshay-goyal/Todo",
          liveLink: "https://lakshay-goyal.github.io/Todo/",
          videoLink: "https://res.cloudinary.com/dkiktv5ur/video/upload/v1736707377/TodoVideo_v3gl2s.webm",
        },
        {
          id: 14,
          title: "TicTacToe Game",
          description: "Classic TicTacToe game implemented with JavaScript.",
          image: "https://res.cloudinary.com/dkiktv5ur/image/upload/v1734670440/bfvhzc4uvvi2dmdgratr.png",
          technologies: ["HTML", "CSS", "JavaScript"],
          githubLink: "https://github.com/lakshay-goyal/TicTacToe",
          liveLink: "https://lakshay-goyal.github.io/TicTacToe/",
          videoLink: "https://res.cloudinary.com/dkiktv5ur/video/upload/v1734677815/TicTacToeVideo_deceao.webm",
        },
        {
          id: 15,
          title: "Weather App",
          description: "A weather forecast application built with JavaScript.",
          image: "https://res.cloudinary.com/dkiktv5ur/image/upload/v1734670447/zy53iwxxo99v6bzul7aw.png",
          technologies: ["HTML", "CSS", "JavaScript"],
          githubLink: "https://github.com/lakshay-goyal/WeatherApp",
          liveLink: "https://lakshay-goyal.github.io/WeatherApp/",
          videoLink: "https://res.cloudinary.com/dkiktv5ur/video/upload/v1734677817/WeatherAppVideo_cadrkt.webm",
        },
        {
          id: 16,
          title: "Password Generator",
          description: "Generates secure random passwords.",
          image: "https://res.cloudinary.com/dkiktv5ur/image/upload/v1734670438/jmsmho0wlyi2tbznqxzc.png",
          technologies: ["HTML", "CSS", "JavaScript"],
          githubLink: "https://github.com/lakshay-goyal/PasswordGenerator",
          liveLink: "https://lakshay-goyal.github.io/PasswordGenerator/",
          videoLink: "https://res.cloudinary.com/dkiktv5ur/video/upload/v1734677807/PasswordGeneratorVideo_n5icgr.webm",
        },
        {
          id: 17,
          title: "Discord Clone",
          description: "A clone of Discord's interface and basic features.",
          image: "https://res.cloudinary.com/dkiktv5ur/image/upload/v1734670436/goxc2ejcvrcfmcmjcujt.png",
          technologies: ["HTML", "Tailwind CSS"],
          githubLink: "https://github.com/lakshay-goyal/DiscordClone",
          liveLink: "https://lakshay-goyal.github.io/DiscordClone/",
          videoLink: "https://res.cloudinary.com/dkiktv5ur/video/upload/v1734677806/DiscordCloneVideo_x5ur1a.webm",
        },
        {
          id: 18,
          title: "Razorpay Clone",
          description: "A clone of the Razorpay payment interface.",
          image: "https://res.cloudinary.com/dkiktv5ur/image/upload/v1734670437/q6nzwzrbw8xqbxldq4iw.png",
          technologies: ["HTML", "Tailwind CSS"],
          githubLink: "https://github.com/lakshay-goyal/RazorpayClone",
          liveLink: "https://razorpay-clone-gray-two.vercel.app/",
          videoLink: "https://res.cloudinary.com/dkiktv5ur/video/upload/v1734677823/RazorpayCloneVideo_syfdeb.webm",
        },
        {
          id: 19,
          title: "Modern Chair",
          description: "A modern chair e-commerce website.",
          image: "https://res.cloudinary.com/dkiktv5ur/image/upload/v1735485895/ModernChair_kewiau.png",
          technologies: ["HTML", "CSS"],
          githubLink: "https://github.com/lakshay-goyal/ModernChair",
          liveLink: "https://lakshay-goyal.github.io/ModernChair/",
          videoLink: "https://res.cloudinary.com/dkiktv5ur/video/upload/v1735485955/ModernChairVideo_f1xkve.webm",
        },
        {
          id: 20,
          title: "Image Gallery",
          description: "A responsive image gallery application.",
          image: "https://res.cloudinary.com/dkiktv5ur/image/upload/v1734670437/gmood0s89fqprxxwmxjf.png",
          technologies: ["HTML", "CSS"],
          githubLink: "https://github.com/lakshay-goyal/ImageGallery",
          liveLink: "https://lakshay-goyal.github.io/ImageGallery/",
          videoLink: "https://res.cloudinary.com/dkiktv5ur/video/upload/v1734677808/ImageGalleryVideo_qiu8zf.webm",
        },
        {
          id: 21,
          title: "Parallax Website",
          description: "A website showcasing parallax scrolling effects.",
          image: "https://res.cloudinary.com/dkiktv5ur/image/upload/v1734670445/zsvhvk9y0pjcmh1q7acd.png",
          technologies: ["HTML", "CSS"],
          githubLink: "https://github.com/lakshay-goyal/Parallax_Effect",
          liveLink: "https://lakshay-goyal.github.io/Parallax_Effect/",
          videoLink: "https://res.cloudinary.com/dkiktv5ur/video/upload/v1734677815/ParallaxEffectVideo_bt6vni.webm",
        },      
        {
          id: 22,
          title: "VS Code Clone",
          description: "Create a UI clone of the Visual Studio Code (VSCode) Homepage.",
          image: "https://res.cloudinary.com/dkiktv5ur/image/upload/v1735223903/VSCode_Clone_hdcgzm.png",
          technologies: ["HTML", "CSS"],
          githubLink: "https://github.com/lakshay-goyal/VSCode_Clone",
          liveLink: "https://lakshay-goyal.github.io/VSCode_Clone/",
          videoLink: "https://res.cloudinary.com/dkiktv5ur/video/upload/v1735223806/VSCode_Clone_d0mzaa.webm",
        }, {
          id: 23,
          title: "Zerodha Clone",
          description: "Create a UI clone of the Zerodha Website Homepage.",
          image: "https://res.cloudinary.com/dkiktv5ur/image/upload/v1735223903/Zerodha_Clone_nejlj8.png",
          technologies: ["HTML", "CSS"],
          githubLink: "https://github.com/lakshay-goyal/Zerodha_Clone",
          liveLink: "https://lakshay-goyal.github.io/Zerodha_Clone/",
          videoLink: "https://res.cloudinary.com/dkiktv5ur/video/upload/v1735223797/Zerodha_Clone_umqxsh.webm",
        }, 

    ],
    app: [
      {
        id: 1,
        title: "LanguageTranslator",
        description: "Mobile task management application",
        image: LanguageTranslatorApplicationImg,
        technologies: ["React Native", "Firebase"],
        githubLink: "https://github.com/lakshay-goyal/LanguageTranslator",
        liveLink: "",
        videoLink: "https://res.cloudinary.com/dkiktv5ur/video/upload/v1734678623/mzbbpuilsl9yxmsapomd.mp4",
      },
      // Add more app projects
    ],
    ml: [
      // {
      //   id: 1,
      //   title: 'Image Classification',
      //   description: 'ML model for image classification',
      //   image: Project_1,
      //   technologies: ['Python', 'TensorFlow'],
      //   githubLink: 'https://github.com/yourusername/project3',
      //   liveLink: 'https://project3.com'
      // },
      // Add more ML projects
    ],
  };

  const projects = allProjects[category] || [];

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
