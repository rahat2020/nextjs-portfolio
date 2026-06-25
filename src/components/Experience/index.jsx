import Link from "next/link";
import { getExperiences } from "@/lib/api/experiences";
import { splitParagraphs } from "@/lib/text";
import { formatPeriod } from "@/lib/date";

export default async function Experience() {
  let experiences = [];
  try {
    ({ experiences } = await getExperiences({ limit: 5 }));
  } catch {
    experiences = [];
  }

  return (
    <div
      id="experience"
      className="h-full bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-20 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div>
          <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-lime-500"></div>
            <span className="text-lime-400 font-medium">Experience</span>
            <div className="h-px w-12 bg-lime-500"></div>
          </div>
          <div className="">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Exploring Creativity to Shape a{" "}
              <span className="text-lime-400">Better Future.</span>
            </h2>
            <p className="text-gray-300 text-sm md:text-md tracking-wider font-medium my-6">
              I’ve spent the last few years building scalable, high-quality
              interfaces for SaaS products — from API integrations to reusable
              components and optimized user flows. I bring both technical depth
              and a product-focused mindset to every project.
            </p>
          </div>
        </div>

        {experiences.length === 0 ? (
          <p className="text-gray-400">Experience details are coming soon.</p>
        ) : (
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <Link
                key={exp._id}
                href={`/experiences/${exp.slug}`}
                className="flex gap-6"
              >
                <div className="w-64 flex-shrink-0">
                  <h3 className="md:text-lg text-sm tracking-wider font-semibold text-white mb-1">
                    {exp.company}
                  </h3>
                  <p className="text-white md:text-md text-sm font-medium">
                    {formatPeriod(
                      exp.startDate,
                      exp.endDate,
                      exp.isCurrentlyWorking
                    )}
                  </p>
                </div>
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-4 h-4 bg-lime-500 rounded-full mt-1"></div>
                  {index < experiences.length - 1 && (
                    <div className="w-0.5 h-full bg-lime-500 mt-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-2">
                  <h3 className="md:text-xl text-sm tracking-wider font-semibold text-white mb-3">
                    {exp.position}
                  </h3>
                  <div className="space-y-2">
                    {splitParagraphs(exp.description).map((line, idx) => (
                      <p
                        key={idx}
                        className="text-white text-md tracking-wider font-medium leading-relaxed"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12">
          <Link
            href="/experiences"
            className="bg-lime-400 hover:bg-lime-500 text-black px-8 py-3 rounded-full font-semibold transition-all duration-300 inline-flex items-center gap-2"
          >
            <span className="mr-2">▶</span> View All
          </Link>
        </div>
      </div>
    </div>
  );
}
