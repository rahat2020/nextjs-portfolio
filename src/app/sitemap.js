import { getProjects } from "@/lib/api/projects";
import { getPosts } from "@/lib/api/posts";
import { getExperiences } from "@/lib/api/experiences";
import { siteConfig } from "@/lib/seo/site";

function toSitemapEntries(items, basePath) {
  return items.map((item) => ({
    url: `${siteConfig.url}${basePath}/${item.slug}`,
    lastModified: new Date(item.updatedAt),
  }));
}

export default async function sitemap() {
  const staticRoutes = ["", "/projects", "/posts", "/experiences"].map(
    (path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: new Date(),
    })
  );

  try {
    const [{ projects }, { posts }, { experiences }] = await Promise.all([
      getProjects({ limit: 100 }),
      getPosts({ limit: 100 }),
      getExperiences({ limit: 100 }),
    ]);

    return [
      ...staticRoutes,
      ...toSitemapEntries(projects, "/projects"),
      ...toSitemapEntries(posts, "/posts"),
      ...toSitemapEntries(experiences, "/experiences"),
    ];
  } catch (err) {
    console.error("sitemap: failed to fetch dynamic routes", err);
    return staticRoutes;
  }
}
