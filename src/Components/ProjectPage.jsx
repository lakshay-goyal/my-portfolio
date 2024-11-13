import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// import images
import myPortfolioImg from "../assets/img/Project/myPortfolio.png";
import DiscordCloneImg from "../assets/img/Project/DiscordClone.png";
import ImageGalleryImg from "../assets/img/Project/ImageGallery.png";
import ModernChairImg from "../assets/img/Project/ModernChair.png";
import ParallaxEffectImg from "../assets/img/Project/Parallax_Effect.png";
import PasswordGeneratorImg from "../assets/img/Project/PasswordGenerator.png";
import RazorpayCloneImg from "../assets/img/Project/RazorpayClone.png";
import TicTacToeImg from "../assets/img/Project/TicTacToe.png";
import WeatherAppImg from "../assets/img/Project/WeatherApp.png";
import RestaurantBookingSystemImg from "../assets/img/Project/RestaurantBookingSystem.png";
import OmegaBytesImg from "../assets/img/Project/OmegaBytes.png";
import LanguageTranslatorApplicationImg from "../assets/img/Project/LanguageTranslatorApplication.jpg";

// import videos
import DiscordCloneVideo from "../assets/video/DiscordClone.mp4";
import ImageGalleryVideo from "../assets/video/ImageGallery.mp4";
import ModernChairVideo from "../assets/video/ModernChair.mp4";
import ParallaxEffectVideo from "../assets/video/ParallaxEffect.mp4";
import PasswordGeneratorVideo from "../assets/video/PasswordGenerator.mp4";
import RazorpayCloneVideo from "../assets/video/RazorpayClone.mp4";
import TicTacToeVideo from "../assets/video/TicTacToe.mp4";
import WeatherAppVideo from "../assets/video/WeatherApp.mp4";
import RestaurantBookingSystemVideo from "../assets/video/RestaurantBookingSystem.mp4";
import myPortfolioVideo from "../assets/video/myPortfolio.mp4";
import OmegaBytesVideo from "../assets/video/OmegaBytes.mp4";

// ProjectPage Component for Filtered Views
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
        image: myPortfolioImg,
        technologies: ["React", "Tailwind CSS"],
        githubLink: "https://github.com/lakshay-goyal/my-portfolio",
        liveLink: "https://lakshay-portfolio-pi.vercel.app/",
        videoLink: myPortfolioVideo,
      },
      {
        id: 2,
        title: "Omega-Bytes",
        description:
          "The AI-powered calculator app simplifies math with smart.",
        image: OmegaBytesImg,
        technologies: ["React", "Tailwind CSS", "Python"],
        githubLink: "https://github.com/lakshay-goyal/Omega-Bytes",
        liveLink: "https://github.com/lakshay-goyal/Omega-Bytes",
        videoLink: OmegaBytesVideo
      },
      {
        id: 3,
        title: "Parallax Effect",
        description: "Dynamic parallax effect website for a restaurant. ",
        image: ParallaxEffectImg,
        technologies: ["HTML", "CSS"],
        githubLink: "https://github.com/lakshay-goyal/Parallax_Effect",
        liveLink: "https://lakshay-goyal.github.io/Parallax_Effect/",
        videoLink: ParallaxEffectVideo
      },
      {
        id: 4,
        title: "Image Gallery",
        description: "creating an image gallery website designed.",
        image: ImageGalleryImg,
        technologies: ["HTML", "CSS"],
        githubLink: "https://github.com/lakshay-goyal/ImageGallery",
        liveLink: "https://lakshay-goyal.github.io/ImageGallery/",
        videoLink: ImageGalleryVideo
      },
      {
        id: 5,
        title: "Modern Chair",
        description:
          "The ModernChair website is a platform designed to showcase Chair Products.",
        image: ModernChairImg,
        technologies: ["HTML", "CSS"],
        githubLink: "https://github.com/lakshay-goyal/ModernChair",
        liveLink: "https://lakshay-goyal.github.io/ModernChair/",
        videoLink: ModernChairVideo
      },
      {
        id: 6,
        title: "Razorpay Clone",
        description:
          "This project involves building the homepage UI for a Razorpay clone website.",
        image: RazorpayCloneImg,
        technologies: ["HTML", "Tailwind CSS"],
        githubLink: "https://github.com/lakshay-goyal/RazorpayClone",
        liveLink: "https://lakshay-goyal.github.io/RazorpayClone/",
        videoLink:RazorpayCloneVideo
      },
      {
        id: 7,
        title: "Discord Clone",
        description:
          "This project focuses on building the homepage UI for a Discord clone website.",
        image: DiscordCloneImg,
        technologies: ["HTML", "Tailwind CSS"],
        githubLink: "https://github.com/lakshay-goyal/DiscordClone",
        liveLink: "https://lakshay-goyal.github.io/DiscordClone/",
        videoLink: DiscordCloneVideo,
      },
      {
        id: 8,
        title: "Password Generator",
        description:
          "This project is a fully functional password generator website designed to create secure and random passwords for users.",
        image: PasswordGeneratorImg,
        technologies: ["HTML", "CSS", "JS"],
        githubLink: "https://github.com/lakshay-goyal/PasswordGenerator",
        liveLink: "https://lakshay-goyal.github.io/PasswordGenerator/",
        videoLink:PasswordGeneratorVideo
      },
      {
        id: 9,
        title: "Weather App",
        description:
          "This project involves creating a WeatherApp website that provides real-time weather updates based on the user’s location or a selected city. ",
        image: WeatherAppImg,
        technologies: ["HTML", "CSS", "JS"],
        githubLink: "https://github.com/lakshay-goyal/DiscordClone",
        liveLink: "https://lakshay-goyal.github.io/WeatherApp/",
        videoLink:WeatherAppVideo
      },
      {
        id: 7,
        title: "Tic Tac Toe",
        description:
          "This project involves creating a fully functional TicTacToe game website.",
        image: TicTacToeImg,
        technologies: ["HTML", "CSS", "JS"],
        githubLink: "https://github.com/lakshay-goyal/TicTacToe",
        liveLink: "https://lakshay-goyal.github.io/TicTacToe/",
        videoLink:TicTacToeVideo
      },
      {
        id: 7,
        title: "Restaurant Booking System",
        description: "This project focuses on building the homepage UI for a Discord clone website.",
        image: RestaurantBookingSystemImg,
        technologies: ["NextJS", "Shadcn"],
        githubLink: "https://github.com/lakshay-goyal/RestaurantBookingSystem",
        liveLink: "https://github.com/lakshay-goyal/RestaurantBookingSystem",
        videoLink: RestaurantBookingSystemVideo
      },
      // Add more web projects
    ],
    app: [
      {
        id: 1,
        title: "LanguageTranslator",
        description: "Mobile task management application",
        image: LanguageTranslatorApplicationImg,
        technologies: ["React Native", "Firebase"],
        githubLink: "https://github.com/lakshay-goyal/LanguageTranslator",
        liveLink: "https://github.com/lakshay-goyal/LanguageTranslator",
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
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  Live Demo →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
