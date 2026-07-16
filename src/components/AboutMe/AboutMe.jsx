"use client";

import {
  BookOpen,
  Download,
  Linkedin,
  GitHub,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Globe,
  MessageSquare,
} from "react-feather";
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

const SOCIAL_LINKS = [
  { key: "linkedin_link", icon: Linkedin, label: "LinkedIn" },
  { key: "github_link", icon: GitHub, label: "GitHub" },
  { key: "twitter_link", icon: Twitter, label: "Twitter / X" },
  { key: "facebook_link", icon: Facebook, label: "Facebook" },
  { key: "instagram_link", icon: Instagram, label: "Instagram" },
  { key: "whatsapp_link", icon: MessageSquare, label: "WhatsApp" },
  { key: "youtube_link", icon: Youtube, label: "YouTube" },
  { key: "website_link", icon: Globe, label: "Website" },
];

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
  const visibility = profile.visibility || {};
  const isVisible = (key) => visibility[key] !== false;

  const avatar = profile.avatar || fallbackAbout.avatar;
  const name = profile.full_name || fallbackAbout.full_name;
  const jobTitle = profile.job_title || fallbackAbout.job_title;

  const showAvatar = isVisible("avatar");
  const showYears = isVisible("years_of_experience");
  const showProjects =
    isVisible("projects_completed") && !!profile.projects_completed;
  const showStatsBadge = showYears || showProjects;

  const visibleSkills = isVisible("skills") ? profile.skills || [] : [];
  const visibleGallery = isVisible("gallery_images")
    ? profile.gallery_images || []
    : [];
  const visibleCustomFields = (profile.custom_fields || []).filter(
    (field) => field.visible !== false,
  );
  const visibleSocialLinks = SOCIAL_LINKS.filter(
    (social) => profile[social.key] && isVisible(social.key),
  );

  const infoItems = [
    isVisible("full_name") && { label: "Name", value: name },
    isVisible("phone") &&
      profile.phone && { label: "Phone", value: profile.phone },
    isVisible("email") &&
      profile.email && { label: "Email", value: profile.email },
    isVisible("location") &&
      profile.location && { label: "Location", value: profile.location },
    isVisible("linkedin_link") &&
      profile.linkedin_link && {
        label: "LinkedIn",
        value: getLinkedinLabel(profile.linkedin_link),
      },
    ...visibleCustomFields.map((field) => ({
      label: field.label,
      value: field.value,
    })),
  ].filter(Boolean);

  return (
    <div
      id="aboutme"
      className="h-full bg-gradient-to-br from-green-950 via-gray-900 to-black text-white py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            {showAvatar && (
              <div className="relative z-10 transition duration-300 animate-float-item-one">
                <div className="w-full max-w-md mx-auto aspect-square rounded-full bg-gradient-to-br from-blue-900/30 to-gray-900/30 flex items-end justify-center overflow-hidden">
                  <div className="w-full h-5/6 bg-gradient-to-t from-blue-400/20 to-transparent rounded-t-full flex items-center justify-center">
                    <div className="text-6xl">
                      {profile.short_name?.charAt(0) || name.charAt(0)}
                    </div>
                  </div>
                </div>
                <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
                  <Image
                    src={avatar}
                    alt={name}
                    width={300}
                    height={300}
                    className="rounded-full w-[450px] h-[450px] object-contain border-4 border-double border-gray-600"
                  />
                </div>
              </div>
            )}

            {showStatsBadge && (
              <div className="absolute left-8 bottom-32 z-20 bg-black/90 backdrop-blur-sm rounded-2xl p-6 border border-lime-500/50 shadow-2xl flex items-center gap-6">
                {showYears && (
                  <div className="text-center">
                    <div className="text-5xl font-bold text-white mb-1">
                      {formatYears(profile.years_of_experience)}
                    </div>
                    <div className="text-gray-300 text-sm">
                      Years Experience
                    </div>
                  </div>
                )}
                {showProjects && (
                  <div
                    className={`text-center ${showYears ? "border-l border-gray-700 pl-6" : ""}`}
                  >
                    <div className="text-5xl font-bold text-white mb-1">
                      {profile.projects_completed}+
                    </div>
                    <div className="text-gray-300 text-sm">Projects Done</div>
                  </div>
                )}
              </div>
            )}

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
              {isVisible("about_title") && profile.about_title && (
                <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                  {profile.about_title}
                </h2>
              )}
              {isVisible("about_description") && profile.about_description && (
                <p className="text-gray-300 text-sm md:text-md">
                  {profile.about_description}
                </p>
              )}
            </div>

            {infoItems.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-6 bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
                {infoItems.map((item) => (
                  <div key={item.label}>
                    <p className="text-gray-400 text-sm mb-1">{item.label}:</p>
                    <p className="text-white font-semibold break-words">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {visibleSkills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {visibleSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-semibold rounded-full bg-lime-400/10 border border-lime-500/30 text-lime-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            {visibleSocialLinks.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {visibleSocialLinks.map(({ key, icon: Icon, label }) => (
                  <a
                    key={key}
                    href={profile[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={label}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-900/60 border border-gray-700 text-gray-300 hover:text-lime-400 hover:border-lime-500/50 transition-colors"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            )}

            <div className="flex w-full items-center gap-3 gap-y-3 pt-2">
              <AppButton
                title="Read More"
                icon={BookOpen}
                className="bg-lime-400 text-black hover:bg-lime-300 px-4! py-3 text-sm font-semibold rounded-ful transition-colors"
              />
              {isVisible("resume_url") && profile.resume_url && (
                <a
                  href={profile.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-lime-400 hover:text-lime-300 transition-colors"
                >
                  <Download size={16} /> View Resume
                </a>
              )}
              {(showAvatar ||
                isVisible("full_name") ||
                (isVisible("job_title") && jobTitle)) && (
                <div className="flex items-center gap-3 sm:ml-auto sm:pl-6 sm:border-l sm:border-gray-800">
                  {showAvatar && (
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-lime-400 flex-shrink-0">
                      <Image
                        src={avatar}
                        alt={name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    {isVisible("full_name") && (
                      <h4 className="text-white font-bold text-base leading-tight">
                        {name}
                      </h4>
                    )}
                    {isVisible("job_title") && jobTitle && (
                      <p className="text-gray-400 text-xs">{jobTitle}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {visibleGallery.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-lime-500"></div>
              <span className="text-lime-400 font-medium">Gallery</span>
              <div className="h-px w-12 bg-lime-500"></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {visibleGallery.map((src, idx) => (
                <div
                  key={`${src}-${idx}`}
                  className="relative aspect-square rounded-2xl overflow-hidden border border-gray-800"
                >
                  <Image
                    src={src}
                    alt={`Gallery ${idx + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
