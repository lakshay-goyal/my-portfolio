import React, { useState, useEffect } from "react";

const SocialIcon = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="transform transition-all duration-300 hover:scale-110 relative group"
    aria-label={label}
  >
    <div className="p-2 sm:p-3 md:p-4 bg-zinc-800/50 rounded-lg sm:rounded-xl hover:bg-zinc-700/50 group">
      <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8">
        {Icon}
      </div>
    </div>
    <span
      className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 
        transition-all duration-200 ease-out transform scale-95 group-hover:scale-100
        bg-indigo-600 text-white 
        px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-semibold tracking-wide min-w-max
        shadow-lg ring-1 ring-white/10
        before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2
        before:border-8 before:border-transparent before:border-t-indigo-600"
      role="tooltip"
    >
      {label}
    </span>
  </a>
);

const HeroSection = () => {
  const [text, setText] = useState("");
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

  const socialIcons = [
    {
      href: "https://github.com/lakshay-goyal",
      label: "GitHub",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full text-gray-400 group-hover:text-white"
        >
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      ),
    },
    {
      href: "https://www.linkedin.com/in/lakshay-goyal-9778a6246/",
      label: "LinkedIn",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full text-gray-400 group-hover:text-white"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      href: "https://x.com/lakshayg2004",
      label: "Twitter",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full text-gray-400 group-hover:text-white"
        >
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
      ),
    },
    {
      href: "https://leetcode.com/u/O8DoTmlJQa/",
      label: "LeetCode",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-full h-full text-gray-400 group-hover:text-white"
        >
          <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
        </svg>
      ),
    },
    {
      href: "https://www.geeksforgeeks.org/user/lakshaygnsrg/",
      label: "GeeksForGeeks",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-full h-full text-gray-400 group-hover:text-white"
        >
          <path d="M5.665 5.823c-.667 0-1.247.08-1.741.241-.495.161-.93.356-1.308.583l-.342-.566h-.666l-.075 4.132h.683a11.2 11.2 0 0 1 .433-1.341c.172-.445.394-.842.666-1.192a3.02 3.02 0 0 1 1-.833c.389-.21.855-.316 1.4-.316.594 0 1.124.122 1.59.366.467.24.873.597 1.217 1.075.339.461.6 1.036.783 1.724.184.69.275 1.458.275 2.308 0 .192-.006.38-.017.567H0v.608c.133.016.314.044.541.083.222.033.403.083.542.15a.748.748 0 0 1 .358.358c.067.15.1.328.1.534v.916c0 .666-.003 1.116-.008 1.35a22.14 22.14 0 0 1-.033.574 12.57 12.57 0 0 0 2.207.767 9.138 9.138 0 0 0 2.158.266c.755 0 1.483-.141 2.183-.425a5.46 5.46 0 0 0 1.832-1.208 5.815 5.815 0 0 0 1.258-1.924 6.09 6.09 0 0 0 .389-1.441h.946c.075.511.204.992.389 1.44.31.756.73 1.398 1.258 1.925a5.46 5.46 0 0 0 1.833 1.208c.7.284 1.427.425 2.182.425.705 0 1.425-.089 2.158-.266a12.57 12.57 0 0 0 2.208-.767c-.012-.15-.023-.341-.034-.575a66.751 66.751 0 0 1-.008-1.35v-.915c0-.206.033-.384.1-.534a.748.748 0 0 1 .358-.358c.14-.067.32-.117.542-.15.228-.039.408-.067.541-.083v-.608h-9.563a9.108 9.108 0 0 1-.017-.567c0-.85.092-1.619.275-2.308.183-.688.444-1.263.783-1.724.344-.478.75-.836 1.216-1.075.467-.244.997-.366 1.592-.366.544 0 1.01.105 1.399.316a3.02 3.02 0 0 1 1 .833c.272.35.494.747.666 1.192.172.439.317.886.433 1.341h.684l-.075-4.132h-.667l-.342.566a6.317 6.317 0 0 0-1.307-.583c-.495-.16-1.075-.241-1.742-.241a5.95 5.95 0 0 0-2.349.466 5.503 5.503 0 0 0-1.883 1.291 5.996 5.996 0 0 0-1.266 2.008 6.913 6.913 0 0 0-.442 2.5c0 .164.007.324.017.483h-.823c.01-.159.016-.32.016-.484 0-.9-.147-1.732-.441-2.499A5.996 5.996 0 0 0 9.897 7.58a5.503 5.503 0 0 0-1.882-1.29 5.953 5.953 0 0 0-2.35-.467zm-.483 7.356h4.32a7.714 7.714 0 0 1-.188.95 5.43 5.43 0 0 1-.792 1.716 3.76 3.76 0 0 1-1.291 1.166c-.517.283-1.103.425-1.758.425a3.77 3.77 0 0 1-1.333-.225c-.405-.15-.691-.308-.858-.475a5.749 5.749 0 0 1-.066-.875 36.8 36.8 0 0 1-.008-.75v-.65c0-.232.033-.438.1-.616a.648.648 0 0 1 .391-.4c.183-.083.433-.144.75-.183a9.87 9.87 0 0 1 .733-.083zm9.316 0h4.32c.178.01.422.039.733.083.317.039.567.1.75.183.2.084.33.217.392.4.066.178.1.384.1.617v.65c0 .205-.004.455-.009.75 0 .294-.022.585-.066.874-.167.167-.453.325-.858.475-.4.15-.845.225-1.333.225-.656 0-1.242-.142-1.758-.425a3.76 3.76 0 0 1-1.291-1.166 5.43 5.43 0 0 1-.792-1.717 7.712 7.712 0 0 1-.188-.95z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      className="relative min-h-screen bg-zinc-900 flex items-center justify-center overflow-hidden px-4 py-12 sm:py-16"
      id="Home"
    >
     {/* Background patterns and effects */}
     <div className="absolute inset-0 opacity-15">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,rgba(39,39,42,0.07)_25%,transparent_25%,transparent_50%,rgba(39,39,42,0.07)_50%,rgba(39,39,42,0.07)_75%,transparent_75%,transparent)] bg-[length:32px_32px] sm:bg-[length:48px_48px] md:bg-[length:64px_64px]"></div>
      </div>

      {/* Animated blobs */}
      <div className="absolute top-0 right-0 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-teal-500/10 rounded-full blur-2xl sm:blur-3xl animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-rose-500/10 rounded-full blur-2xl sm:blur-3xl animate-blob animation-delay-4000"></div>
      <div className="absolute top-1/2 left-1/4 w-36 h-36 sm:w-56 sm:h-56 md:w-72 md:h-72 bg-blue-500/10 rounded-full blur-2xl sm:blur-3xl animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-4 sm:px-6 z-10 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="transform transition-all duration-700 ease-out"
            data-aos="fade-up"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-4 sm:mb-6 md:mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-blue-500 to-rose-500">
              Lakshay Goyal
            </h1>
          </div>

          <div className="text-xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-200 mb-6 sm:mb-8 md:mb-10 flex flex-col sm:flex-row justify-center items-center">
            <span className="mr-0 sm:mr-4 opacity-70 mb-2 sm:mb-0">I'm a</span>
            <div className="relative inline-block">
              <span className="text-teal-300">
                {text}
                <span className="absolute -right-2 text-rose-400 animate-pulse">
                  |
                </span>
              </span>
            </div>
          </div>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 leading-relaxed px-4 sm:px-6">
            Bridging technology and creativity to craft transformative digital
            experiences that push the boundaries of innovation.
          </p>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12 px-2">
            {socialIcons.map((social, index) => (
              <SocialIcon
                key={index}
                href={social.href}
                icon={social.icon}
                label={social.label}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 md:h-24 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent"></div>

      {/* Decorative dots */}
      <div className="absolute inset-0 z-0">
        <div className="absolute h-1.5 w-1.5 sm:h-2 sm:w-2 bg-teal-500/20 rounded-full top-1/4 left-1/4 animate-pulse"></div>
        <div className="absolute h-1.5 w-1.5 sm:h-2 sm:w-2 bg-rose-500/20 rounded-full top-3/4 right-1/4 animate-pulse animation-delay-2000"></div>
        <div className="absolute h-1.5 w-1.5 sm:h-2 sm:w-2 bg-blue-500/20 rounded-full top-1/2 left-3/4 animate-pulse animation-delay-4000"></div>
      </div>
    </section>
  );
};

export default HeroSection;