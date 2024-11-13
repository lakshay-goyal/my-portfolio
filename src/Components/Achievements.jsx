import React from "react";
import poster_making from '../assets/img/poster_making.jpeg'

function Achievements() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <section id="Achievements" className="py-16 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 relative inline-block">
            Achievements
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 transform scale-x-0 transition-transform duration-300 hover:scale-x-100"></div>
          </h2>
        </div>

        {/* Research Paper Section */}
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </h4>
            <p className="text-gray-600 group-hover:text-blue-600 transition-colors duration-200">
              Design of Language Translator Headphone: The Future of Sustainable Communication
            </p>
          </a>
        </div>

        {/* Awards Section */}
        <div className="mb-16">
          <h4 className="text-xl font-semibold text-blue-600 mb-6">Awards</h4>
          <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div
              className="h-80 bg-contain bg-center relative"
              style={{
                backgroundImage: `url(${poster_making})`,
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 hover:bg-opacity-40">
                <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-white">
                  <h5 className="text-2xl font-bold mb-3">3rd Position in Poster Making</h5>
                  <p className="text-center text-lg">
                    Achieved 3rd place in a poster making competition at K.R.Mangalam University
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certificates Section */}
        <div>
          <h4 className="text-xl font-semibold text-blue-600 mb-6">Certificates</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Introduction to Python",
                image: "./img/IBM-certificate.png",
                href: "https://courses.ibmcep.cognitiveclass.ai/certificates/db92b6c486734aebb77f393dc81e6677"
              },
              {
                title: "Statistics using Python",
                image: "https://verify.netcredential.com/api/credential/roy8Qrvcja?view=image",
                href: "https://verify.netcredential.com/roy8Qrvcja"
              },
              {
                title: "R programming",
                image: "https://verify.netcredential.com/api/credential/roy8QnCxbD?view=image",
                href: "https://verify.netcredential.com/roy8QnCxbD"
              },
              {
                title: "Data Science & Analytics",
                image: "https://verify.netcredential.com/api/credential/roy84P0ZDT?view=image",
                href: "https://verify.netcredential.com/roy84P0ZDT"
              },
              {
                title: "Data Analysis",
                image: "https://verify.netcredential.com/api/credential/roy8N2dFPL?view=image",
                href: "https://verify.netcredential.com/roy8N2dFPL"
              }
            ].map((certificate, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <h2 className="font-bold text-lg text-gray-800 mb-4">
                    {certificate.title}
                    <div className="h-1 w-16 bg-blue-600 mt-2 rounded-full"></div>
                  </h2>
                  <div className="relative aspect-video mb-4">
                    <img
                      src={certificate.image}
                      alt={certificate.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
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