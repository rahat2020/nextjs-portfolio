"use client";

import { BookOpen } from "react-feather";
import Image from "next/image";
import { MorphingBlob } from "../UI/svg/MorphingBlob";
import AppButton from "../UI/AppButton";

export default function AboutMe() {
  return (
    <div
      id="aboutme"
      className="h-full bg-gradient-to-br from-green-950 via-gray-900 to-black text-white py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative z-10 transition duration-300 animate-float-item-one">
              <div className="w-full max-w-md mx-auto aspect-square rounded-full bg-gradient-to-br from-blue-900/30 to-gray-900/30 flex items-end justify-center overflow-hidden">
                <div className="w-full h-5/6 bg-gradient-to-t from-blue-400/20 to-transparent rounded-t-full flex items-center justify-center">
                  <div className="text-6xl">👤</div>
                </div>
              </div>
              <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
                <Image
                  src="/assets/rahat.png"
                  alt="hero image"
                  width={300}
                  height={300}
                  className="rounded-full w-[450px] h-[450px] object-contain border-4 border-double border-gray-600"
                />
              </div>
            </div>
            <div className="absolute left-8 bottom-32 z-20 bg-black/90 backdrop-blur-sm rounded-2xl p-6 border border-lime-500/50 shadow-2xl">
              <div className="text-center">
                <div className="text-5xl font-bold text-white mb-1">02+</div>
                <div className="text-gray-300 text-sm">Years Experience</div>
              </div>
            </div>

            <div className="absolute left-30 bottom-25 w-50 h-64 rounded-3xl -z-0">
              <MorphingBlob width={400} height={400} variant="bubble" />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8">
            {/* Section Title */}
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-lime-500"></div>
              <span className="text-lime-400 font-medium">About Me</span>
              <div className="h-px w-12 bg-lime-500"></div>
            </div>

            {/* Main Heading */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Exploring Creativity to Shape a{" "}
                <span className="text-lime-400">Better Future.</span>
              </h2>
              <p className="text-gray-300 text-sm md:text-md">
                I transform imagination into impactful and meaningful designs
                that inspire change, spark innovation, and redefine digital
                creativity.
              </p>
            </div>

            {/* Contact Info Grid */}
            <div className="grid sm:grid-cols-2 gap-6 bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
              <div>
                <p className="text-gray-400 text-sm mb-1">Name:</p>
                <p className="text-white font-semibold">Kazi Rahat</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Phone:</p>
                <p className="text-white font-semibold">+880 1894103578</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Email:</p>
                <p className="text-white font-semibold">
                  kazimdboktiar2020@gmail.com
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Website :</p>
                <p className="text-white font-semibold">www.dribbble.com</p>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <AppButton
                title="Read More"
                icon={BookOpen}
                className="bg-lime-400 text-black hover:bg-lime-300"
              />
              {/* Profile Info */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-lime-400">
                  <Image
                    src="/assets/rahat-tiny.png"
                    alt="Kazi Rahat"
                    width={30}
                    height={30}
                    className="w-full h-full object-fill"
                  />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">Kazi Rahat</h4>
                  <p className="text-gray-400 text-sm">
                    Software Developer | Front-End Developer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
