const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://nextjs-portfolio-server.vercel.app/api/v1";

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

function buildUrl(path, params) {
  const url = new URL(`${API_BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, value);
      }
    });
  }
  return url;
}

export async function apiFetch(path, { revalidate = 3600, params, tags } = {}) {
  const url = buildUrl(path, params);
  const res = await fetch(url, { next: { revalidate, tags } });
  const json = await res.json().catch(() => null);

  if (!res.ok || !json?.success) {
    throw new ApiError(json?.message || "Request failed", res.status);
  }

  return json;
}
