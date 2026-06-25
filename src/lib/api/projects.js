import { apiFetch, ApiError } from "./client";

export async function getProjects({ page, limit, isFeatured } = {}) {
  const { data, meta } = await apiFetch("/projects", {
    params: { page, limit, isFeatured },
  });
  return { projects: data, meta };
}

export async function getProjectBySlug(slug) {
  try {
    const { data } = await apiFetch(`/projects/${slug}`);
    return data;
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  }
}

export async function getFeaturedProjects(limit = 4) {
  const { projects } = await getProjects({ isFeatured: true, limit });
  return projects;
}
