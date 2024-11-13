import React from 'react'
import NavBar from '../Components/NavBar'
import HeroSection from '../Components/HeroSection'
import AboutMe from '../Components/AboutMe'
import Skills from '../Components/Skills'
import Projects from '../Components/Projects'
import Achievements from '../Components/Achievements'
import CollaborativeTool from '../Components/CollaborativeTool'
import ContactUs from '../Components/ContactUs'

function Home() {
  return (
    <div>
      <NavBar />
        <HeroSection/>

        <AboutMe/>
        <Skills/>

        <Projects/>

      <Achievements/>
    <CollaborativeTool/>
    <ContactUs/>
  

    </div>
  )
}

export default Home
