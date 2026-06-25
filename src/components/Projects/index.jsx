import Link from "next/link";
import { ArrowUpRight } from "react-feather";
import { getFeaturedProjects } from "@/lib/api/projects";
import Thumbnail from "../UI/Thumbnail";

export default async function Projects() {
  let projects = [];
  try {
    projects = await getFeaturedProjects(4);
  } catch {
    projects = [];
  }

  return (
    <div
      id="projects"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-8"
    >
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex items-center gap-8 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-16 h-0.5 bg-lime-400"></div>
            <span className="text-lime-400 text-sm tracking-widest uppercase">
              Projects
            </span>
            <div className="w-16 h-0.5 bg-lime-400"></div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Delivering Excellence
              <br />
              Through <span className="text-yellow-400">Experience.</span>
            </h1>
          </div>

          <div className="flex flex-col items-start md:items-end gap-6">
            <p className="text-gray-400 max-w-md text-right">
              With years of hands-on expertise, I craft innovative, high-quality
              digital solutions that drive lasting success.
            </p>
            <Link
              href="/projects"
              className="bg-lime-400 hover:bg-lime-500 text-black px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 group"
            >
              <span className="mr-2">▶</span> View All
            </Link>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <p className="max-w-7xl mx-auto text-gray-400">
          Projects are coming soon.
        </p>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <Link
              key={project._id}
              href={`/projects/${project.slug}`}
              className="group relative bg-[#06080B] rounded-3xl px-2 border border-gray-700/50 hover:border-lime-400/50 transition-all duration-500 hover:transform"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6 p-2">
                <div className="flex items-center gap-3">
                  <div className="grid grid-cols-3 gap-1">
                    {[...Array(9)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-lime-400"
                      ></div>
                    ))}
                  </div>
                </div>
                <span className="text-6xl font-bold text-gray-700/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Title and Description */}
              <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
              <p className="text-gray-400 mb-8 line-clamp-2">
                {project.description}
              </p>

              {/* Thumbnail */}
              <Thumbnail
                src={project.thumbnail}
                alt={project.title}
                className="mb-6 w-full h-[200px] rounded-bl-2xl"
              />

              {/* Arrow Button */}
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-[#06080B] rounded-full flex items-center justify-center transition-all duration-300">
                <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center group-hover:bg-lime-500 transition-colors duration-300 cursor-pointer">
                  <ArrowUpRight className="w-4 h-4 text-black" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
