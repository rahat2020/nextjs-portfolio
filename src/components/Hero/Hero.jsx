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
import AppButton from "../UI/AppButton";
import { OrbitalRing } from "../UI/svg/OrbitalRing";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-black via-green-950 to-gray-950 overflow-hidden">
      <div className="hero-grid-bg pointer-events-none" />
      <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
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
              {/* Scroll Down Indicator */}
              <a
                href="#aboutme"
                className="group inline-flex items-center gap-4 pt-10 cursor-pointer"
              >
                {/* Mouse outline */}
                <div className="relative w-7 h-11 rounded-full border-2 border-lime-400/60 group-hover:border-lime-400 transition-colors duration-300 flex justify-center">
                  <div className="w-1.5 h-1.5 bg-lime-400 rounded-full mt-2 animate-scroll-wheel" />
                </div>

                {/* Text + Chevrons */}
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm font-medium tracking-wider uppercase group-hover:text-lime-400 transition-colors duration-300">
                    Scroll to explore
                  </span>
                  <div className="flex flex-col items-center -space-y-1.5 animate-bounce-slow">
                    <svg
                      width="14"
                      height="8"
                      viewBox="0 0 14 8"
                      fill="none"
                      className="text-lime-400/50"
                    >
                      <path
                        d="M1 1L7 7L13 1"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <svg
                      width="14"
                      height="8"
                      viewBox="0 0 14 8"
                      fill="none"
                      className="text-lime-400"
                    >
                      <path
                        d="M1 1L7 7L13 1"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </a>
            </div>
            {/* Right Content */}
            <div className="relative">
              <div className="relative mx-auto w-full max-w-[660px] h-[520px] sm:h-[620px]">
                {/* Small accent rings */}
                <div className="absolute top-2 right-36 sm:right-44 w-16 h-16 rounded-full border-4 border-lime-400 z-30" />
                <div className="absolute -top-2 right-22 sm:right-28 w-11 h-11 rounded-full border-4 border-yellow-500 z-30" />

                {/* Floating particle trails */}
                <span className="absolute top-5 left-0 w-1.5 h-1.5 rounded-full bg-lime-400 shadow-[0_0_8px_2px_rgba(157,230,0,0.7)] animate-twinkle" />
                <span className="absolute top-20 left-8 w-1 h-1 rounded-full bg-lime-300 shadow-[0_0_6px_2px_rgba(157,230,0,0.6)] animate-twinkle [animation-delay:0.6s]" />
                <span className="absolute bottom-20 left-2 w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-[0_0_8px_2px_rgba(234,179,8,0.6)] animate-twinkle [animation-delay:1.2s]" />
                <span className="absolute top-1/2 right-6 w-1 h-1 rounded-full bg-lime-400 shadow-[0_0_6px_2px_rgba(157,230,0,0.6)] animate-twinkle [animation-delay:1.8s]" />
                <span className="absolute top-10 right-10 w-1 h-1 rounded-full bg-lime-200 shadow-[0_0_6px_2px_rgba(157,230,0,0.6)] animate-twinkle [animation-delay:0.9s]" />
                <span className="absolute bottom-6 right-24 w-1 h-1 rounded-full bg-lime-200 shadow-[0_0_6px_2px_rgba(157,230,0,0.6)] animate-twinkle [animation-delay:1.5s]" />

                {/* Ring + photo + sphere group, offset lower-right */}
                <div className="absolute right-6 bottom-2 sm:right-12 sm:bottom-14 w-[270px] h-[270px] sm:w-[340px] sm:h-[340px]">
                  {/* Back half of the ring, threads behind the photo */}
                  <OrbitalRing
                    id="back"
                    tilt={-14}
                    part="back"
                    className="absolute -inset-20 sm:-inset-28 pointer-events-none animate-spin-slow z-10"
                  />

                  {/* Profile photo */}
                  <div className="absolute inset-0 rounded-full glass-frame shadow-[0_0_50px_-10px_rgba(157,230,0,0.4)] overflow-hidden z-20 animate-float-item-one">
                    <Image
                      src="/assets/rahat.png"
                      alt="hero image"
                      // fill
                      width={340}
                      height={340}
                      sizes="(max-width: 640px) 270px, 340px"
                      className="object-fit object-[center_18%] scale-[1.4]"
                    />
                  </div>

                  {/* Gold sphere, overlapping the ring's lower-right edge */}
                  <div className="absolute -bottom-4 -right-14 sm:-right-18 w-20 h-20 sm:w-24 sm:h-24 rounded-full gold-sphere shadow-[0_0_40px_-6px_rgba(212,160,23,0.7)] animate-float-item-two z-30" />

                  {/* Front half of the ring, threads in front of the photo */}
                  <OrbitalRing
                    id="front"
                    tilt={-14}
                    part="front"
                    className="absolute -inset-20 sm:-inset-28 pointer-events-none animate-spin-slow z-40"
                  />

                  {/* Social Media */}
                  <div className="absolute -bottom-9 -right-9 sm:-right-11 z-50 flex gap-2">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
