import React from "react";
import Lakshay from '../assets/img/Lakshay.png'
import Resume from '../assets/pdf/Resume.pdf'

function AboutMe() {
  return (
    <>
      <section id="About" class="my-16">
        <div class="flex justify-center text-3xl font-semibold">
          <h2>
            About Me
            <div class="bg-black h-1 w-auto rounded my-1"></div>
          </h2>
        </div>
        <div class="flex flex-col-reverse bg-white mx-16 gap-9 md:mx-36 my-7 md:flex-row">
          <div class="flex flex-col space-y-7 sm:text-justify">
            <p>
              I'm Lakshay Goyal, a K.R. Mangalam University BCA student who has
              an enthusiasm for innovation and technology. My area of expertise
              is in online and app development, with a particular emphasis on
              using effective DevOps techniques and APIs to create seamless user
              experiences. I enjoy addressing challenging challenges, and my
              motivation comes from a desire to learn and use new technology.
              View my projects in my portfolio, and don't hesitate to get in
              touch if you'd want to work together or find out more.
            </p>
            <a
              class="border px-2 py-3 border-black rounded w-3/4 bg-indigo-500 text-white font-bold text-lg hover:bg-indigo-600 active:bg-indigo-700 sm:px-5 md:w-1/4"
              href={Resume}
              target="_blank"
            >
              Resume...
            </a>
          </div>
          <img
            class="rounded-lg object-contain w-96 md:w-1/4"
            src={Lakshay}
            alt="Lakshay"
          />
        </div>
      </section>
    </>
  );
}

export default AboutMe;
