import { apiFetch, ApiError } from "./client";

export async function getAbout() {
  try {
    const { data } = await apiFetch("/about");
    return data;
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  }
}
