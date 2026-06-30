"use client";

import { BookOpen } from "react-feather";
import Image from "next/image";
import { MorphingBlob } from "../UI/svg/MorphingBlob";
import AppButton from "../UI/AppButton";

const fallbackAbout = {
  full_name: "Kazi Rahat",
  short_name: "Rahat",
  job_title: "Software Developer | Front-End Developer",
  avatar: "/assets/rahat.png",
  email: "kazimdboktiar2020@gmail.com",
  phone: "+880 1894103578",
  location: "Mirpur 12, Dhaka - Bangladesh",
  about_title: "Exploring Creativity to Shape a Better Future.",
  about_description:
    "I transform imagination into impactful and meaningful designs that inspire change, spark innovation, and redefine digital creativity.",
  linkedin_link: "https://www.linkedin.com/in/kazi-rahat2020/",
  years_of_experience: 3,
};

function formatYears(value) {
  const years = Number(value || 0) || fallbackAbout.years_of_experience;
  return `${String(years).padStart(2, "0")}+`;
}

function getLinkedinLabel(link) {
  if (!link) return "@kazi-rahat2020/";

  try {
    const pathname = new URL(link).pathname.replace(/^\/|\/$/g, "");
    const handle = pathname.split("/").filter(Boolean).pop();
    return handle ? `@${handle}/` : link;
  } catch {
    return link;
  }
}

export default function AboutMe({ about }) {
  const profile = { ...fallbackAbout, ...about };
  const avatar = profile.avatar || fallbackAbout.avatar;
  const name = profile.full_name || fallbackAbout.full_name;
  const jobTitle = profile.job_title || fallbackAbout.job_title;
console.log('profile', profile)
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
                  <div className="text-6xl">{profile.short_name?.charAt(0) || name.charAt(0)}</div>
                </div>
              </div>
              <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
                <Image
                  src={fallbackAbout?.avatar || avatar}
                  alt={name}
                  width={300}
                  height={300}
                  className="rounded-full w-[450px] h-[450px] object-contain border-4 border-double border-gray-600"
                />
              </div>
            </div>
            <div className="absolute left-8 bottom-32 z-20 bg-black/90 backdrop-blur-sm rounded-2xl p-6 border border-lime-500/50 shadow-2xl">
              <div className="text-center">
                <div className="text-5xl font-bold text-white mb-1">
                  {formatYears(profile.years_of_experience)}
                </div>
                <div className="text-gray-300 text-sm">Years Experience</div>
              </div>
            </div>

            <div className="absolute left-30 bottom-25 w-50 h-64 rounded-3xl -z-0">
              <MorphingBlob width={400} height={400} variant="bubble" />
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-lime-500"></div>
              <span className="text-lime-400 font-medium">About Me</span>
              <div className="h-px w-12 bg-lime-500"></div>
            </div>

            <div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                {profile.about_title}
              </h2>
              <p className="text-gray-300 text-sm md:text-md">
                {profile.about_description}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
              <div>
                <p className="text-gray-400 text-sm mb-1">Name:</p>
                <p className="text-white font-semibold">{name}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Phone:</p>
                <p className="text-white font-semibold break-words">
                  {profile.phone}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Email:</p>
                <p className="text-white font-semibold break-words">
                  {profile.email}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">LinkedIn :</p>
                <p className="text-white font-semibold break-words">
                  {getLinkedinLabel(profile.linkedin_link)}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <AppButton
                title="Read More"
                icon={BookOpen}
                className="bg-lime-400 text-black hover:bg-lime-300"
              />
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-lime-400">
                  <Image
                    src={avatar}
                    alt={name}
                    width={30}
                    height={30}
                    className="w-full h-full object-fill"
                  />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">{name}</h4>
                  <p className="text-gray-400 text-sm">{jobTitle}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
