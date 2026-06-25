"use client";

import { MapPin, Mail, Phone, MessageCircle } from "react-feather";
import AppButton from "../UI/AppButton";

export default function ContactMe() {
  const handleSubmit = () => {
    console.log("Form submitted");
  };

  return (
    <div
      id="contact"
      className="bg-gradient-to-bl from-gray-900 via-black to-green-950 flex items-center justify-center p-2"
    >
      <div className="w-full max-w-7xl">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Address Card */}
          <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-lime-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-3">Address</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Mirpur 12, Dhaka - Bangladesh
              <br />
              house of street
            </p>
          </div>

          {/* E-Mail Card */}
          <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-lime-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-3">E-Mail</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              kazimdboktiar2020@gmail.com
            </p>
          </div>

          {/* Call Me Card */}
          <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-lime-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-3">Call Me</h3>
            <p className="text-gray-400 text-sm leading-relaxed">01894103578</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-transparent rounded-lg p-8 md:p-12 transition-all duration-75 hover:border border-gray-900 border hover:border-lime-600">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Heading */}
            <div>
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-lime-500"></div>
                <span className="text-lime-400 font-medium capitalize">
                  GET IN TOUCH
                </span>
                <div className="h-px w-12 bg-lime-500"></div>
              </div>
              {/* <p className="text-lime-600 text-sm font-semibold mb-2 tracking-wider uppercase"></p> */}
              <h2 className="text-white text-4xl md:text-5xl font-bold mb-4">
                Elevate your brand
                <br />
                with Me
              </h2>
              <p className="text-gray-400 text-sm">
                islted fkct that a reader will be distrel acted slslrly
                <br />
                diting islted fkct that a reader will acted islted fkct
                <br />
                that a reader will be distrel acted
              </p>
            </div>

            {/* Right Side - Form */}
            <div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="bg-zinc-800 text-white px-4 py-3 rounded border border-zinc-700 focus:border-lime-600 focus:outline-none w-full"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="bg-zinc-800 text-white px-4 py-3 rounded border border-zinc-700 focus:border-lime-600 focus:outline-none w-full"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="bg-zinc-800 text-white px-4 py-3 rounded border border-zinc-700 focus:border-lime-600 focus:outline-none w-full"
                  />
                  <input
                    type="text"
                    placeholder="Subject"
                    className="bg-zinc-800 text-white px-4 py-3 rounded border border-zinc-700 focus:border-lime-600 focus:outline-none w-full"
                  />
                </div>

                <textarea
                  placeholder="Your Message"
                  rows="6"
                  className="bg-zinc-800 text-white px-4 py-3 rounded border border-zinc-700 focus:border-lime-600 focus:outline-none w-full resize-none"
                ></textarea>
                {/* 
                <button
                  className="w-full bg-lime-600 hover:bg-lime-700 text-white font-semibold py-4 rounded-full transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  Appointment Now
                  <span>→</span>
                </button> */}
                <AppButton
                  title="Appointment Now"
                  icon={MessageCircle}
                  className="bg-lime-400 text-black hover:bg-lime-300 w-full justify-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
