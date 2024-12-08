import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  
  const words = ["WebDeveloper", "AppDeveloper", "DataAnalytics", "ML Learner"];
  const typingSpeed = 150;
  
  useEffect(() => {
    const currentWord = words[wordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1));
        
        if (text.length === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        setText(currentWord.substring(0, text.length - 1));
        
        if (text.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);
    
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex]);
  
  return (
    <section className="relative h-screen bg-zinc-900 flex items-center justify-center overflow-hidden" id='Home'>
      {/* Geometric Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,rgba(39,39,42,0.05)_25%,transparent_25%,transparent_50%,rgba(39,39,42,0.05)_50%,rgba(39,39,42,0.05)_75%,transparent_75%,transparent)] bg-[length:60px_60px]"></div>
      </div>

      {/* Floating Geometric Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

      {/* Main Content */}
      <div className="container mx-auto px-6 z-10 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            className="transform transition-all duration-700 ease-out"
            data-aos="fade-up"
          >
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-rose-500">
              Lakshay Goyal
            </h1>
          </div>

          <div className="text-3xl md:text-5xl text-gray-200 mb-8 flex justify-center items-center">
            <span className="mr-4 opacity-70">I'm a</span>
            <div className="relative inline-block">
              <span className="text-teal-300">
                {text}
                <span className="absolute -right-2 text-rose-400 animate-pulse">|</span>
              </span>
            </div>
          </div>

          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Bridging technology and creativity to craft transformative digital experiences that push the boundaries of innovation.
          </p>

          <div className="flex justify-center space-x-6">
            <a 
              href="#Project" 
              className="relative px-8 py-4 rounded-lg overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-teal-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></span>
              <span className="relative z-10 text-white font-semibold group-hover:text-white transition-colors duration-300">
                View Projects
              </span>
            </a>
            <a 
              href="#Contact" 
              className="relative px-8 py-4 border-2 border-gray-700 text-gray-300 rounded-lg overflow-hidden group"
            >
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></span>
              <span className="relative z-10 group-hover:text-zinc-900 transition-colors duration-300">
                Contact Me
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Subtle Animation Layer */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-zinc-900 to-transparent opacity-50"></div>
    </section>
  );
};

export default HeroSection;