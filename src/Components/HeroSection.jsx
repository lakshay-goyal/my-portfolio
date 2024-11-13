import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  
  const words = ["Goyal", "Portfolio"];
  const typingSpeed = 200;
  
  useEffect(() => {
    const currentWord = words[wordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1));
        
        if (text.length === currentWord.length) {
          setIsDeleting(true);
          setTimeout(() => {}, 1000); // Pause at end
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
    <section className="h-screen bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="w-full h-full flex flex-col justify-center items-center space-x-0 space-y-4 md:flex-row md:space-x-5 md:space-y-0">
        <h1 className="text-5xl font-bold sm:text-7xl text-white">
          Lakshay
        </h1>
        <h1 className="text-5xl font-bold sm:text-7xl text-white">
          {text}
          <span className="animate-pulse">|</span>
        </h1>
      </div>
    </section>
  );
};

export default HeroSection;