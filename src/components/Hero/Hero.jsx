"use client";
import Image from "next/image";
import {
  Briefcase,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Play,
} from "react-feather";
import Link from "next/link";
import { MorphingBlob } from "../UI/svg/MorphingBlob";
import AppButton from "../UI/AppButton";

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-black via-green-950 to-gray-950">
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div>
                <p className="text-gray-300 text-sm md:text-lg font-semibold mb-2">
                  I'm
                </p>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  Kazi Rahat,
                </h1>
                <h2 className="text-5xl md:text-6xl font-bold text-lime-400 leading-tight">
                  Software Developer
                </h2>
              </div>
              <p className="text-gray-100 font-medium tracking-tight text-sm md:text-lg max-w-lg">
                I am Kazi Rahat, blending web design, SEO, and graphics to
                create unique digital experiences.
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <AppButton
                  title="Hire me now"
                  icon={Briefcase}
                  className="bg-lime-400 text-black hover:bg-lime-300"
                />
                <Link
                  href="https://www.youtube.com/@rahatwebdev"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="w-14 h-14 animate-pulse rounded-full cursor-pointer border-2 border-lime-400 flex items-center justify-center hover:bg-lime-400 hover:text-black transition">
                    <Play
                      size={20}
                      fill="currentColor"
                      className="animate-pulse"
                    />
                  </button>
                </Link>
              </div>
              {/* <div className="flex items-center gap-2 pt-8">
                <div className="w-10 h-10 rounded-full bg-yellow-600 flex items-center justify-center">
                  🌐
                </div>
                <span className="text-gray-400">www.roxthemes.com</span>
              </div> */}
            </div>
            {/* Right Content */}
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-20 flex gap-2">
                <div className="w-16 h-16 rounded-full border-4 border-lime-400"></div>
                <div className="w-16 h-16 rounded-full border-4 border-yellow-500"></div>
              </div>
              <div className="absolute bottom-32 right-0">
                <div className="w-12 h-12 rounded-full bg-yellow-500"></div>
              </div>

              {/* Profile Image Placeholder */}
              <div className="relative z-10 transition duration-300 animate-float-item-one">
                <div className="w-full max-w-md mx-auto aspect-square rounded-full bg-gradient-to-br from-blue-900/30 to-gray-900/30 flex items-end justify-center overflow-hidden">
                  <div className="w-full h-5/6 bg-gradient-to-t from-blue-400/20 to-transparent rounded-t-full flex items-center justify-center">
                    <div className="text-6xl">
                      <MorphingBlob width={400} height={400} variant="bubble" />
                    </div>
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
              {/* Info Card */}

              {/* <div className="absolute top-1/4 -left-8 bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-sm z-20">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-2 h-12 bg-lime-400 rounded"></div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Specialized In</p>
                    <h3 className="text-white font-bold text-lg leading-tight">
                      We are creating digital solutions to promote global brands
                      every day.
                    </h3>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-4">
                  I create websites, effective SEO, and creative graphics that
                  help brands grow.
                </p>

                <button className="flex items-center gap-2 text-white hover:text-lime-400 transition">
                  <span className="font-semibold">Download CV</span>
                  <Download size={18} />
                </button>
              </div> */}

              {/* Social Media */}
              <div className="absolute bottom-0 right-0 z-20">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-lime-400 flex items-center justify-center hover:bg-lime-300 transition"
                    >
                      <Facebook size={18} className="text-black" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-lime-400 flex items-center justify-center hover:bg-lime-300 transition"
                    >
                      <Twitter size={18} className="text-black" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-lime-400 flex items-center justify-center hover:bg-lime-300 transition"
                    >
                      <Linkedin size={18} className="text-black" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-lime-400 flex items-center justify-center hover:bg-lime-300 transition"
                    >
                      <Instagram size={18} className="text-black" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
