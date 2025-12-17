import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from "../../assets/images/khalsa-logo.png";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Academic', path: '/academic' },
    { name: 'Courses', path: '/courses' },
    { name: 'Facilities', path: '/facilities' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      
      {/* Main Header Container */}
      <div className="bg-[#24c5e5]">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 xl:px-15">
          
          <div className="flex items-center justify-between py-3 md:py-4 gap-4">

            {/* Logo Section */}
            <Link to="/" className="flex items-center flex-shrink-0">
              <img
                src={logo}
                alt="Khalsa College Logo"
                className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation - centered and flexible */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 flex-1 justify-center mx-2">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="px-2 xl:px-4 py-2 text-white font-medium text-sm xl:text-base
                             hover:text-[#020617]
                             rounded-lg transition-all duration-300
                             relative group whitespace-nowrap"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 
                                   -translate-x-1/2
                                   w-0 h-0.5 bg-[#3055ba]
                                   group-hover:w-3/4
                                   transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* Apply Now Button (Visible on md and larger screens) */}
            <div className="hidden lg:block flex-shrink-0">
              <Link
                to="/apply"
                className="px-4 lg:px-6 py-2 lg:py-2.5 bg-[#3055ba]
                           hover:bg-[#020617]
                           text-white font-semibold text-sm lg:text-base
                           rounded-full whitespace-nowrap
                           hover:shadow-lg hover:scale-105
                           transition-all duration-300 inline-block"
              >
                APPLY NOW
              </Link>
            </div>

            {/* Mobile Menu Toggle (Visible on screens smaller than lg) */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden text-white
                         hover:text-[#020617]
                         transition-colors p-2 flex-shrink-0"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="text-2xl sm:text-3xl" />
              ) : (
                <FaBars className="text-2xl sm:text-3xl" />
              )}
            </button>

          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="lg:hidden pb-4 border-t border-white/20 mt-2">
              <div className="flex flex-col gap-1 mt-3">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3
                               text-white font-medium text-base
                               hover:bg-white/20
                               rounded-lg
                               transition-all duration-300
                               active:bg-white/30"
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Mobile Apply Button */}
                <Link
                  to="/apply"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mx-4 mt-4 mb-1 px-6 py-3
                             bg-[#3055ba]
                             hover:bg-[#020617]
                             text-white font-semibold text-base
                             rounded-full text-center
                             hover:shadow-lg
                             active:scale-95
                             transition-all duration-300"
                >
                  APPLY NOW
                </Link>
              </div>
            </nav>
          )}

        </div>
      </div>
    </header>
  );
};

export default Header;