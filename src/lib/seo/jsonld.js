import { siteConfig } from "./site";

export function buildBreadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildPostJsonLd(post) {
  const url = `${siteConfig.url}/posts/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.content?.slice(0, 160),
    image: post.thumbnail || undefined,
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    keywords: post.tags?.join(", ") || undefined,
    articleSection: post.category,
    author: { "@type": "Person", name: siteConfig.author },
    mainEntityOfPage: url,
    url,
  };
}

export function buildProjectJsonLd(project) {
  const url = `${siteConfig.url}/projects/${project.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description?.slice(0, 160),
    image: project.thumbnail || undefined,
    url: project.liveUrl || url,
    codeRepository: project.githubUrl || undefined,
    keywords: project.technologies?.join(", ") || undefined,
    genre: project.category,
    creator: { "@type": "Person", name: siteConfig.author },
    dateCreated: project.createdAt,
    dateModified: project.updatedAt,
    mainEntityOfPage: url,
  };
}

export function buildExperienceJsonLd(experience) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author,
    hasOccupation: [
      {
        "@type": "OrganizationRole",
        roleName: experience.position,
        startDate: experience.startDate,
        endDate: experience.endDate || undefined,
        worksFor: {
          "@type": "Organization",
          name: experience.company,
        },
      },
    ],
  };
}
