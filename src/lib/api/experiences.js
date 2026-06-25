import { apiFetch, ApiError } from "./client";

export async function getExperiences({ page, limit } = {}) {
  const { data, meta } = await apiFetch("/experiences", {
    params: { page, limit },
  });
  return { experiences: data, meta };
}

export async function getExperienceBySlug(slug) {
  try {
    const { data } = await apiFetch(`/experiences/${slug}`);
    return data;
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  }
}
