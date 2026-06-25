import { notFound } from "next/navigation";
import { getExperienceBySlug, getExperiences } from "@/lib/api/experiences";
import { siteConfig } from "@/lib/seo/site";
import { buildExperienceJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo/jsonld";
import JsonLd from "@/components/SEO/JsonLd";
import Breadcrumb from "@/components/UI/Breadcrumb";
import { splitParagraphs } from "@/lib/text";
import { formatPeriod } from "@/lib/date";

export async function generateStaticParams() {
  try {
    const { experiences } = await getExperiences({ limit: 100 });
    return experiences.map((experience) => ({ slug: experience.slug }));
  } catch {
    return [];
  }
}

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const experience = await getExperienceBySlug(slug);
  if (!experience) return {};

  const url = `${siteConfig.url}/experiences/${experience.slug}`;
  const description = experience.description?.slice(0, 160);

  return {
    title: `${experience.position} at ${experience.company} | ${siteConfig.name}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${experience.position} at ${experience.company}`,
      description,
      url,
      type: "profile",
    },
  };
}

export default async function ExperienceDetailPage({ params }) {
  const { slug } = await params;
  const experience = await getExperienceBySlug(slug);
  if (!experience) notFound();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-4 md:px-8 pt-32 pb-20">
      <JsonLd data={buildExperienceJsonLd(experience)} />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", url: siteConfig.url },
          { name: "Experience", url: `${siteConfig.url}/experiences` },
          {
            name: `${experience.position} at ${experience.company}`,
            url: `${siteConfig.url}/experiences/${experience.slug}`,
          },
        ])}
      />

      <article className="max-w-3xl mx-auto">
        <Breadcrumb
          items={[
            { name: "Home", href: "/" },
            { name: "Experience", href: "/experiences" },
            {
              name: `${experience.position} at ${experience.company}`,
              href: `/experiences/${experience.slug}`,
            },
          ]}
        />
        <h1 className="text-4xl font-bold mb-2">{experience.position}</h1>
        <p className="text-lime-400 text-xl mb-1">{experience.company}</p>
        <p className="text-gray-400 mb-1">{experience.location}</p>
        <p className="text-gray-500 text-sm mb-8">
          {formatPeriod(
            experience.startDate,
            experience.endDate,
            experience.isCurrentlyWorking
          )}
        </p>

        {splitParagraphs(experience.description).map((paragraph, index) => (
          <p key={index} className="text-gray-300 mb-4 leading-relaxed">
            {paragraph}
          </p>
        ))}

        {experience.technologies?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="bg-gray-800 text-lime-400 text-sm px-3 py-1 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </article>
    </main>
  );
}
