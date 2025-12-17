import React from "react";
import { footerSections } from "../data/footerData";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";
import { ChevronRight } from "lucide-react";
import logo from "../../assets/images/khalsa-logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#020617] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* LEFT INFO */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <img
              src={logo}
              alt="Dashmesh Khalsa College Logo"
              className="h-14 w-auto object-contain"
            />
          </div>

          <p className="text-sm leading-relaxed mb-6">
            Chandigarh–Patiala National Highway <br />
            Punjab 140 401
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4">
            {[
              FaFacebookF,
              FaXTwitter,
              FaLinkedinIn,
              FaInstagram,
              FaYoutube,
            ].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="w-9 h-9 rounded-full border border-blue-800
                             flex items-center justify-center
                             hover:bg-blue-700 hover:border-blue-700
                             transition-all duration-300"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* LINK SECTIONS */}
        {footerSections.map((section, index) => (
          <div key={index}>
            <h3 className="text-white font-semibold mb-6 relative">
              {section.title}
              <span className="absolute left-0 -bottom-2 w-16 h-[2px] bg-blue-600" />
            </h3>

            <ul className="space-y-4 text-sm">
              {section.links.map((link, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between group cursor-pointer"
                >
                  <span className="group-hover:text-blue-400 transition-colors">
                    {link}
                  </span>

                  <ChevronRight
                    size={16}
                    className="opacity-0 -translate-x-2
                               group-hover:opacity-100
                               group-hover:translate-x-0
                               text-blue-400 transition-all duration-300"
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-blue-900 py-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Dashmesh Khalsa College. All Rights
        Reserved.
      </div>
    </footer>
  );
}
