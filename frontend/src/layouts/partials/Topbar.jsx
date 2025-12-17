import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaWhatsapp, FaPhone } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Topbar = () => {
  // This will be controlled by admin in the future
  const admissionText = "Admission open for the year 2026-27";
  const phoneNumber = "9988095610";

  const socialLinks = [
    { icon: FaFacebook, url: '#', label: 'Facebook' },
    { icon: FaInstagram, url: '#', label: 'Instagram' },
    { icon: FaYoutube, url: '#', label: 'YouTube' },
    { icon: FaLinkedin, url: '#', label: 'LinkedIn' },
    { icon: FaWhatsapp, url: '#', label: 'WhatsApp' }
  ];

  return (
    <div className="bg-[#3055ba] text-white py-2">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between text-sm">
          
          {/* Left Section - Online Payment */}
          <div className="flex items-center gap-4">
            <Link
              to="/online-payment"
              className="font-medium hover:text-white/90 cursor-pointer transition-colors"
            >
              Online Payment
            </Link>
          </div>

          {/* Center Section - Admission Notice */}
          <div className="flex-1 text-center px-4">
            <span className="font-semibold animate-pulse">
              {admissionText}
            </span>
          </div>

          {/* Right Section - Contact & Social Links */}
          {/* Hidden below 700px */}
          <div className="flex items-center gap-4 max-[700px]:hidden">
            
            {/* Phone Number */}
            <a
              href={`tel:${phoneNumber}`}
              className="flex items-center gap-2 hover:text-white/90 transition-colors"
            >
              <FaPhone className="text-xs" />
              <span className="font-medium">{phoneNumber}</span>
            </a>

            {/* Divider */}
            <div className="h-4 w-px bg-white/30"></div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="hover:scale-110 transition-transform duration-200"
                >
                  <social.icon className="text-base" />
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Topbar;
