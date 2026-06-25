import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/api/projects";
import { siteConfig } from "@/lib/seo/site";
import { buildProjectJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo/jsonld";
import JsonLd from "@/components/SEO/JsonLd";
import Thumbnail from "@/components/UI/Thumbnail";
import Breadcrumb from "@/components/UI/Breadcrumb";
import { splitParagraphs } from "@/lib/text";

export async function generateStaticParams() {
  try {
    const { projects } = await getProjects({ limit: 100 });
    return projects.map((project) => ({ slug: project.slug }));
  } catch {
    return [];
  }
}

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  const url = `${siteConfig.url}/projects/${project.slug}`;
  const description = project.description?.slice(0, 160);

  return {
    title: `${project.title} | Projects | ${siteConfig.name}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: project.title,
      description,
      url,
      type: "article",
      images: project.thumbnail ? [{ url: project.thumbnail }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
      images: project.thumbnail ? [project.thumbnail] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-4 md:px-8 pt-32 pb-20">
      <JsonLd data={buildProjectJsonLd(project)} />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", url: siteConfig.url },
          { name: "Projects", url: `${siteConfig.url}/projects` },
          { name: project.title, url: `${siteConfig.url}/projects/${project.slug}` },
        ])}
      />

      <article className="max-w-4xl mx-auto">
        <Breadcrumb
          items={[
            { name: "Home", href: "/" },
            { name: "Projects", href: "/projects" },
            { name: project.title, href: `/projects/${project.slug}` },
          ]}
        />
        <Thumbnail
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-64 md:h-96 rounded-2xl mb-8"
        />

        <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
        {project.category && (
          <p className="text-lime-400 uppercase text-sm tracking-widest mb-6">
            {project.category}
          </p>
        )}

        {splitParagraphs(project.description).map((paragraph, index) => (
          <p key={index} className="text-gray-300 mb-4 leading-relaxed">
            {paragraph}
          </p>
        ))}

        {project.technologies?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="bg-gray-800 text-lime-400 text-sm px-3 py-1 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-6 mt-8">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lime-400 hover:text-lime-300 font-semibold"
            >
              Live Site →
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lime-400 hover:text-lime-300 font-semibold"
            >
              Source Code →
            </a>
          )}
        </div>
      </article>
    </main>
  );
}
