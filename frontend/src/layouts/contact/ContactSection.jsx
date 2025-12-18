import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative h-72 sm:h-96 md:h-[28rem] bg-gradient-to-r from-slate-800 to-slate-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/80"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              'url("https://dashmeshkhalsacollege.org/revslider/images/16425pic.jpeg")',
          }}
        ></div>
      </div>

      {/* Contact Cards */}
      <div className="max-w-7xl mx-auto px-4 -mt-30 relative z-10 pb-16">
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {/* Address Card */}
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300">
            <div className="flex items-center justify-center w-16 h-16  bg-cyan-600 rounded-full mb-6 mx-auto">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4 text-center">
              Address
            </h3>
            <div className="text-slate-600 space-y-1 text-center text-sm sm:text-base">
              <p className="font-semibold">Dashmesh Khalsa College</p>
              <p>Near Nabha Gurudwara Sahib</p>
              <p>Dyalpura Road, Zirakpur, Punjab</p>
              <p>– India</p>
            </div>
          </div>

          {/* Office Card */}
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300">
            <div className="flex items-center justify-center w-16 h-16  bg-cyan-600 rounded-full mb-6 mx-auto">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4 text-center">
              Office
            </h3>
            <div className="text-slate-600 space-y-2 text-center text-lg">
              <a
                href="tel:9988095610"
                className="block font-semibold hover:text-cyan-600 transition-colors"
              >
                99880-95610
              </a>
              <a
                href="tel:8427754303"
                className="block font-semibold hover:text-cyan-600 transition-colors"
              >
                84277-54303
              </a>
            </div>
          </div>

          {/* Email Card */}
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300">
            <div className="flex items-center justify-center w-16 h-16  bg-cyan-600 rounded-full mb-6 mx-auto">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4 text-center">
              Email
            </h3>
            <div className="text-slate-600 text-center text-lg">
              <a
                href="mailto:dkczirakpur@gmail.com"
                className="font-semibold hover:text-cyan-600 transition-colors break-words"
              >
                dkczirakpur@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-8 text-center shadow-xl max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Get in Touch?
          </h2>
          <p className="text-white/90 mb-6 text-base sm:text-lg">
            Our team is here to answer your questions and provide the support
            you need. Reach out today!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-cyan-600 px-8 py-3 rounded-full font-semibold hover:bg-slate-100 transition-colors shadow-lg">
              Send Message
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">
              View Location
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
