// ═══════════════════════════════════════════════════════════════
// Blog & Content Data — Edit this file to add/remove content
// ═══════════════════════════════════════════════════════════════
// In the future, replace this static data with an API call
// (e.g. YouTube Data API, CMS, or your own backend)
// The component will render whatever is returned from this file.
// ═══════════════════════════════════════════════════════════════

/**
 * Content types:
 *   "video"   → YouTube videos (renders embedded player)
 *   "article" → Blog articles (renders card with link)
 *
 * Required fields per type:
 *   video:   { type, id, title, thumbnail, youtubeId, date, tags }
 *   article: { type, id, title, excerpt, thumbnail, url, date, readTime, tags }
 */

export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@YourChannel";

export const blogContent = [
  // ── YouTube Videos ─────────────────────────────────────────
  {
    type: "video",
    id: "v1",
    title: "Building a Modern Portfolio with Next.js & Tailwind CSS",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    youtubeId: "dQw4w9WgXcQ",
    date: "2025-03-15",
    tags: ["Next.js", "Tutorial"],
  },
  {
    type: "video",
    id: "v2",
    title: "React Hooks Deep Dive — useEffect, useMemo & Custom Hooks",
    thumbnail: "https://img.youtube.com/vi/dpw9EHDh2bM/maxresdefault.jpg",
    youtubeId: "dpw9EHDh2bM",
    date: "2025-02-20",
    tags: ["React", "JavaScript"],
  },
  {
    type: "video",
    id: "v3",
    title: "Responsive Design Masterclass — Mobile First Approach",
    thumbnail: "https://img.youtube.com/vi/srvUrASNj0s/maxresdefault.jpg",
    youtubeId: "srvUrASNj0s",
    date: "2025-01-10",
    tags: ["CSS", "Design"],
  },

  // ── Blog Articles ──────────────────────────────────────────
  {
    type: "article",
    id: "a1",
    title: "Why Every Developer Should Learn TypeScript in 2025",
    excerpt:
      "TypeScript has become the industry standard for large-scale JavaScript applications. Here's why you should make the switch and how to get started.",
    thumbnail:
      "https://miro.medium.com/v2/resize:fit:1400/1*moJeTvW97yShLB7URRj5Kg.png",
    url: "https://medium.com/@yourblog/typescript-2025",
    date: "2025-03-01",
    readTime: "5 min read",
    tags: ["TypeScript", "Opinion"],
  },
  {
    type: "article",
    id: "a2",
    title: "Building Scalable Frontend Architecture for SaaS Products",
    excerpt:
      "Learn the patterns and best practices I use to architect frontend systems that scale from prototype to production.",
    thumbnail:
      "https://miro.medium.com/v2/resize:fit:1400/1*moJeTvW97yShLB7URRj5Kg.png",
    url: "https://medium.com/@yourblog/saas-frontend",
    date: "2025-02-14",
    readTime: "8 min read",
    tags: ["Architecture", "React"],
  },
  {
    type: "article",
    id: "a3",
    title: "From Junior to Mid-Level Developer — My Journey & Tips",
    excerpt:
      "A candid look at the skills, mindset shifts, and habits that helped me grow as a frontend developer over the past two years.",
    thumbnail:
      "https://miro.medium.com/v2/resize:fit:1400/1*moJeTvW97yShLB7URRj5Kg.png",
    url: "https://medium.com/@yourblog/junior-to-mid",
    date: "2025-01-25",
    readTime: "6 min read",
    tags: ["Career", "Growth"],
  },
];
