import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import HeroSection from "../Components/HeroSection";
import AboutMe from "../Components/AboutMe";
import Skills from "../Components/Skills";
import Projects from "../Components/Projects";
import Achievements from "../Components/Achievements";
import CollaborativeTool from "../Components/CollaborativeTool";
import ContactUs from "../Components/ContactUs";
import Loading from '../Components/Loading';

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
      <Skills />
      <Projects />
      <Achievements />
      <CollaborativeTool />
      <ContactUs />
    </div>
  );
}

export default HomePage;
