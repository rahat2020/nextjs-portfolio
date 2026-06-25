import Link from "next/link";
import { getProjects } from "@/lib/api/projects";
import { siteConfig } from "@/lib/seo/site";
import Thumbnail from "@/components/UI/Thumbnail";
import Pagination from "@/components/UI/Pagination";
import Breadcrumb from "@/components/UI/Breadcrumb";

export async function generateMetadata({ searchParams }) {
  const { page = "1" } = await searchParams;
  const url = `${siteConfig.url}/projects${page !== "1" ? `?page=${page}` : ""}`;
  const title = `Projects | ${siteConfig.name}`;
  const description = `Browse projects built by ${siteConfig.name} — web, ERP, and full-stack development work.`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
  };
}

export default async function ProjectsPage({ searchParams }) {
  const { page: pageParam = "1" } = await searchParams;
  const page = Number(pageParam) || 1;

  let projects = [];
  let meta = null;
  let failed = false;
  try {
    ({ projects, meta } = await getProjects({ page, limit: 9 }));
  } catch {
    failed = true;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-4 md:px-8 pt-32 pb-20">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb
          items={[
            { name: "Home", href: "/" },
            { name: "Projects", href: "/projects" },
          ]}
        />
        <h1 className="text-4xl md:text-5xl font-bold mb-12">Projects</h1>

        {failed && (
          <p className="text-gray-400">Projects are temporarily unavailable.</p>
        )}
        {!failed && projects.length === 0 && (
          <p className="text-gray-400">No projects published yet.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link
              key={project._id}
              href={`/projects/${project.slug}`}
              className="block bg-[#06080B] rounded-3xl border border-gray-700/50 hover:border-lime-400/50 transition-colors overflow-hidden"
            >
              <Thumbnail
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-48"
              />
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{project.title}</h2>
                <p className="text-gray-400 line-clamp-2">
                  {project.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {meta && (
          <Pagination
            basePath="/projects"
            page={page}
            totalPages={meta.totalPages}
          />
        )}
      </div>
    </main>
  );
}
