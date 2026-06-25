import { apiFetch, ApiError } from "./client";

export async function getPosts({ page, limit } = {}) {
  const { data, meta } = await apiFetch("/posts", {
    params: { page, limit },
  });
  return { posts: data, meta };
}

export async function getPostBySlug(slug) {
  try {
    const { data } = await apiFetch(`/posts/${slug}`);
    return data;
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  }
}

export async function getLatestPosts(limit = 3) {
  const { posts } = await getPosts({ limit });
  return posts;
}
