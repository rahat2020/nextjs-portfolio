import Link from "next/link";
import { getExperiences } from "@/lib/api/experiences";
import { siteConfig } from "@/lib/seo/site";
import Pagination from "@/components/UI/Pagination";
import Breadcrumb from "@/components/UI/Breadcrumb";
import { formatPeriod } from "@/lib/date";

export async function generateMetadata({ searchParams }) {
  const { page = "1" } = await searchParams;
  const url = `${siteConfig.url}/experiences${page !== "1" ? `?page=${page}` : ""}`;
  const title = `Experience | ${siteConfig.name}`;
  const description = `Professional experience and work history of ${siteConfig.name}.`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
  };
}

export default async function ExperiencesPage({ searchParams }) {
  const { page: pageParam = "1" } = await searchParams;
  const page = Number(pageParam) || 1;

  let experiences = [];
  let meta = null;
  let failed = false;
  try {
    ({ experiences, meta } = await getExperiences({ page, limit: 9 }));
  } catch {
    failed = true;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-4 md:px-8 pt-32 pb-20">
      <div className="max-w-4xl mx-auto">
        <Breadcrumb
          items={[
            { name: "Home", href: "/" },
            { name: "Experience", href: "/experiences" },
          ]}
        />
        <h1 className="text-4xl md:text-5xl font-bold mb-12">Experience</h1>

        {failed && (
          <p className="text-gray-400">
            Experience details are temporarily unavailable.
          </p>
        )}
        {!failed && experiences.length === 0 && (
          <p className="text-gray-400">No experience published yet.</p>
        )}

        <div className="space-y-8">
          {experiences.map((experience) => (
            <Link
              key={experience._id}
              href={`/experiences/${experience.slug}`}
              className="block bg-[#06080B] rounded-3xl border border-gray-700/50 hover:border-lime-400/50 transition-colors p-6"
            >
              <h2 className="text-xl font-bold">{experience.position}</h2>
              <p className="text-lime-400">{experience.company}</p>
              <p className="text-gray-400 text-sm mt-1">
                {formatPeriod(
                  experience.startDate,
                  experience.endDate,
                  experience.isCurrentlyWorking
                )}
              </p>
            </Link>
          ))}
        </div>

        {meta && (
          <Pagination
            basePath="/experiences"
            page={page}
            totalPages={meta.totalPages}
          />
        )}
      </div>
    </main>
  );
}
