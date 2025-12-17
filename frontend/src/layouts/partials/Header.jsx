import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

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
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-bold text-2xl">DK</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800 leading-tight">
                DASMESH KHALSA COLLEGE
              </h1>
              <p className="text-xs md:text-sm text-gray-600">
                Zirakpur, Punjab | Affiliated to Punjabi University & PSEB
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="px-4 py-2 text-gray-700 font-medium hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all duration-300 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-orange-500 group-hover:w-3/4 transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Apply Now Button - Desktop */}
          <div className="hidden lg:block">
            <Link
              to="/apply"
              className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              APPLY NOW
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden text-gray-700 hover:text-orange-500 transition-colors p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden pb-4 animate-slideDown">
            <div className="flex flex-col gap-2">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-gray-700 font-medium hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all duration-300"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/apply"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mx-4 mt-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold rounded-full text-center hover:shadow-lg transition-all duration-300"
              >
                APPLY NOW
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
