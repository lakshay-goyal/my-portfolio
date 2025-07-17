import React, { useState } from "react";
import Logo from '../assets/img/logo.png';

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Project" },
    { href: "/blog", label: "Blog" },
    { href: "/bookshelf", label: "Bookshelf" },
    { href: "/papershelf", label: "PaperShelf" }
  ];

  const socialLinks = [
    {
      href: "https://x.com/lakshayg2004",
      icon: "https://img.freepik.com/premium-vector/twitter-new-logo-twitter-icons-new-twitter-logo-x-2023_929078-218.jpg",
      label: "Twitter",
    },
    {
      href: "https://www.linkedin.com/in/lakshay-goyal-9778a6246/",
      icon: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
      label: "LinkedIn",
    },
    {
      href: "https://github.com/lakshay-goyal",
      icon: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
      label: "Github",
    },
  ];

  return (
    <nav className="bg-gray-900 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              className="h-12 w-12 object-contain rounded-full ring-2 ring-blue-500 hover:ring-blue-400 transition-all duration-300"
              src={Logo}
              alt="Lakshay"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social Links - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-110 transition-transform duration-200"
              >
                <img
                  className="h-8 w-8 rounded-full hover:ring-2 hover:ring-blue-500 transition-all duration-200"
                  src={social.icon}
                  alt={social.label}
                />
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden bg-gray-900 shadow-lg`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="px-5 pt-4 pb-6 border-t border-gray-700">
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-110 transition-transform duration-200"
              >
                <img
                  className="h-8 w-8 rounded-full hover:ring-2 hover:ring-blue-500 transition-all duration-200"
                  src={social.icon}
                  alt={social.label}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;