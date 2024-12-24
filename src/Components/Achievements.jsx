import React from "react";
import poster_making from "../assets/img/poster_making.jpeg";

function Achievements() {
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
          <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div
              className="h-80 bg-contain bg-center relative"
              style={{
                backgroundImage: `url(${poster_making})`,
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 hover:bg-opacity-40">
                <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-white">
                  <h5 className="text-2xl font-bold mb-3">
                    3rd Position in Poster Making
                  </h5>
                  <p className="text-center text-lg">
                    Achieved 3rd place in a poster making competition at
                    K.R.Mangalam University
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-blue-600 mb-6">
            Certificates
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Introduction to Python",
                organization: "IBM",
                image:
                  "https://res.cloudinary.com/dkiktv5ur/image/upload/v1735051659/IBM_Certicate_1_v4g6bg.png",
                href: "https://courses.ibmcep.cognitiveclass.ai/certificates/db92b6c486734aebb77f393dc81e6677",
              },
              {
                title: "Python 101 for Data Science",
                organization: "IBM",
                image:
                  "https://res.cloudinary.com/dkiktv5ur/image/upload/v1735051659/IBM_Certicate_2_pwysnq.png",
                href: "https://courses.yl-ptech.skillsnetwork.site/certificates/a684249dd3d74b3baaf4b8a92d84d163",
              },
              {
                title: "Data Visualization with Python",
                organization: "IBM",
                image:
                  "https://res.cloudinary.com/dkiktv5ur/image/upload/v1735051659/IBM_Certicate_3_ep2llo.png",
                href: "https://courses.yl-ptech.skillsnetwork.site/certificates/bb81af532a4e4c20a892887e477c4623",
              },
              {
                title: "Data Analysis with Python",
                organization: "IBM",
                image:
                  "https://res.cloudinary.com/dkiktv5ur/image/upload/v1735051659/IBM_Certicate_4_xkbtqs.png",
                href: "https://courses.yl-ptech.skillsnetwork.site/certificates/81ed0de5f4f440f09814a2bdc3bb9e4d",
              },
              {
                title: "Big Data Engineer",
                organization: "IBM",
                image:
                  "https://res.cloudinary.com/dkiktv5ur/image/upload/v1735051659/IBM_Certicate_5_d4nscm.png",
                href: "https://courses.ibmcep.cognitiveclass.ai/certificates/d1e4961722a141a09031d9a287c0ac07",
              },
              {
                title: "Statistics using Python",
                organization: "Samatrix Consulting Pvt Ltd",
                image:
                  "https://res.cloudinary.com/dkiktv5ur/image/upload/v1735062219/Statistics_using_Python_spwy3d.jpg",
                href: "https://verify.netcredential.com/roy8Qrvcja",
              },
              {
                title: "R Programming For Data Science",
                organization: "Samatrix Consulting Pvt Ltd",
                image:
                  "https://res.cloudinary.com/dkiktv5ur/image/upload/v1735062219/R_Programming_For_Data_Science_jo4y8b.jpg",
                href: "https://verify.netcredential.com/roy8QnCxbD",
              },
              {
                title: "Data Analysis Using Python",
                organization: "Samatrix Consulting Pvt Ltd",
                image:
                  "https://res.cloudinary.com/dkiktv5ur/image/upload/v1735062219/Data_Analysis_Using_Python_qlp2mf.jpg",
                href: "https://verify.netcredential.com/roy8N2dFPL",
              },
              {
                title: "FoundationTo AI & Data Science",
                organization: "Samatrix Consulting Pvt Ltd",
                image:
                  "https://res.cloudinary.com/dkiktv5ur/image/upload/v1735062219/FoundationTo_AI_Data_Science_fvntkm.jpg",
                href: "https://verify.netcredential.com/roy84P0ZDT",
              },

              {
                title: "Programming using Java",
                organization: "Infosys Springboard",
                image:
                  "https://res.cloudinary.com/dkiktv5ur/image/upload/v1735054087/Programming_using_Java_kq0jek.png",
                href: "",
              },
              {
                title: "Object Oriented Programming using Python",
                organization: "Infosys Springboard",
                image:
                  "https://res.cloudinary.com/dkiktv5ur/image/upload/v1735054087/Object_Oriented_Programming_using_Python_u7wp7k.png",
                href: "",
              },
              {
                title: "Data Structures and Algorithms using Python - PART1",
                organization: "Infosys Springboard",
                image:
                  "https://res.cloudinary.com/dkiktv5ur/image/upload/v1735054087/Data_Structures_and_Algorithms_using_Python_-_Part_1_dffssa.png",
                href: "",
              },
              {
                title: "Data Structures and Algorithms using Python - PART2",
                organization: "Infosys Springboard",
                image:
                  "https://res.cloudinary.com/dkiktv5ur/image/upload/v1735054087/Data_Structures_and_Algorithms_using_Python_-_Part_2_zxolib.png",
                href: "",
              },
            ].map((certificate, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
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
                  {certificate.href == "" ? (
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
