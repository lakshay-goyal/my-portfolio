import React, { useEffect, useRef, useState } from "react";
import poster_making from "../assets/img/poster_making.jpeg";
import position_2nd from "../assets/img/2nd_positions.jpeg";
import { motion, AnimatePresence } from "framer-motion";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

// Add CSS modules
import "./Achievements.css";
import useCertificatesStore from '../store/zustand/useCertificatesStore';
import useAwardsStore from '../store/zustand/useAwardsStore';

const imageMap = {
  "poster_making.jpeg": poster_making,
  "2nd_positions.jpeg": position_2nd,
};

function Achievements() {
  const certificatesRef = useRef(null);
  const scrollInterval = useRef(null);
  const [activeAward, setActiveAward] = useState(0);
  const awards = useAwardsStore((state) => state.awards);

  const handleNext = () => {
    setActiveAward((prev) => (prev + 1) % awards.length);
  };

  const handlePrev = () => {
    setActiveAward((prev) => (prev - 1 + awards.length) % awards.length);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, []);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  // Certificates auto-scroll effect
  useEffect(() => {
    const startAutoScroll = () => {
      scrollInterval.current = setInterval(() => {
        if (certificatesRef.current) {
          certificatesRef.current.scrollLeft += 1;
          if (
            certificatesRef.current.scrollLeft >=
            certificatesRef.current.scrollWidth - certificatesRef.current.clientWidth
          ) {
            certificatesRef.current.scrollLeft = 0;
          }
        }
      }, 20);
    };

    startAutoScroll();

    return () => {
      if (scrollInterval.current) {
        clearInterval(scrollInterval.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
    }
  };

  const handleMouseLeave = () => {
    const startAutoScroll = () => {
      scrollInterval.current = setInterval(() => {
        if (certificatesRef.current) {
          certificatesRef.current.scrollLeft += 1;
          if (
            certificatesRef.current.scrollLeft >=
            certificatesRef.current.scrollWidth - certificatesRef.current.clientWidth
          ) {
            certificatesRef.current.scrollLeft = 0;
          }
        }
      }, 20);
    };
    startAutoScroll();
  };

  const certificates = useCertificatesStore((state) => state.certificates);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <section id="Achievements" className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 relative inline-block">
            Achievements
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 transform scale-x-0 transition-transform duration-300 hover:scale-x-100"></div>
          </h2>
        </div>

        <div className="mb-16 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
          <a
            href="https://www.researchgate.net/publication/374505664_Design_of_Language_Translator_Headphone_The_Future_of_Sustainable_Communication"
            target="_blank"
            className="block group"
            rel="noopener noreferrer"
          >
            <h4 className="text-xl font-semibold text-blue-600 mb-2 flex items-center">
              Research Paper
              <svg
                className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </h4>
            <p className="text-gray-600 group-hover:text-blue-600 transition-colors duration-200">
              Design of Language Translator Headphone: The Future of Sustainable
              Communication
            </p>
          </a>
        </div>

        <div className="mb-16">
          <h4 className="text-xl font-semibold text-blue-600 mb-6">Awards</h4>
          <div className="relative grid grid-cols-1 gap-8 md:gap-20 md:grid-cols-2">
            <div className="relative h-[400px] w-full">
              <AnimatePresence mode="wait">
                {awards.map((award, index) => (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      rotate: randomRotateY(),
                    }}
                    animate={{
                      opacity: index === activeAward ? 1 : 0,
                      scale: index === activeAward ? 1 : 0.95,
                      rotate: index === activeAward ? 0 : randomRotateY(),
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      rotate: randomRotateY(),
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0"
                  >
                    <div
                      className="h-full w-full rounded-3xl bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${imageMap[award.image]})`,
                      }}
                    >
                      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 hover:bg-opacity-40 rounded-3xl">
                        <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-white">
                          <h5 className="text-2xl font-bold mb-3">{award.title}</h5>
                          <p className="text-center text-lg">{award.description}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="flex flex-col justify-between py-4">
              <motion.div
                key={activeAward}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="h-full flex flex-col justify-center"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {awards[activeAward].title}
                </h3>
                <motion.p className="text-lg text-gray-600">
                  {awards[activeAward].description.split(" ").map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                      animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                        delay: 0.02 * index,
                      }}
                      className="inline-block"
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
                </motion.p>
              </motion.div>
              <div className="flex gap-4 mt-8">
                <button
                  onClick={handlePrev}
                  className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-blue-600 transition-colors duration-300"
                >
                  <IconArrowLeft className="h-6 w-6 text-gray-800 group-hover/button:text-white transition-transform duration-300 group-hover/button:rotate-12" />
                </button>
                <button
                  onClick={handleNext}
                  className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-blue-600 transition-colors duration-300"
                >
                  <IconArrowRight className="h-6 w-6 text-gray-800 group-hover/button:text-white transition-transform duration-300 group-hover/button:-rotate-12" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-blue-600 mb-6">
            Certificates
          </h4>
          <div
            ref={certificatesRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="flex overflow-x-auto gap-8 pb-4 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {certificates.map((certificate, index) => (
              <div
                key={index}
                className="flex-none w-80 bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <h2 className="font-bold text-lg text-gray-800 mb-2">
                    {certificate.title}
                    <div className="h-1 w-16 bg-blue-600 mt-2 rounded-full"></div>
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Issued by: {certificate.organization}
                  </p>
                  <div className="relative aspect-video mb-4">
                    <img
                      src={certificate.image}
                      alt={certificate.title}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                  {certificate.href === "" ? (
                    <p></p>
                  ) : (
                    <a
                      href={certificate.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-full"
                    >
                      <button className="w-full py-2 px-4 bg-gray-100 hover:bg-blue-600 text-gray-800 hover:text-white rounded-lg transition-colors duration-300 font-medium">
                        View Credential
                      </button>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Achievements;
