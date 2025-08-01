import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import HeroSection from "../Components/HeroSection";
import AboutMe from "../Components/AboutMe";
import Skills from "../Components/Skills";
import Achievements from "../Components/Achievements";
import CollaborativeTool from "../Components/CollaborativeTool";
import ContactUs from "../Components/ContactUs";
import Loading from '../Components/Loading';
import MajorProjects from "../Components/MajorProjects";
import ProjectCategory from '../Components/ProjectCategory';
import Experience from "../Components/Experience";

function HomePage() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600); // Simulate loading
    return () => clearTimeout(timer);
  }, []);
  if (loading) return <Loading />;
  return (
    <div>
      <NavBar />
      <HeroSection />
      <AboutMe />
      {/* <Experience /> */}
      {/* <MajorProjects /> */}
      <Skills />
      <ProjectCategory />
      <Achievements />
      <CollaborativeTool />
      <ContactUs />
    </div>
  );
}

export default HomePage;
