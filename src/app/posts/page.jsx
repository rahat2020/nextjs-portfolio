import Link from "next/link";
import { getPosts } from "@/lib/api/posts";
import { siteConfig } from "@/lib/seo/site";
import Thumbnail from "@/components/UI/Thumbnail";
import Pagination from "@/components/UI/Pagination";
import Breadcrumb from "@/components/UI/Breadcrumb";

export async function generateMetadata({ searchParams }) {
  const { page = "1" } = await searchParams;
  const url = `${siteConfig.url}/posts${page !== "1" ? `?page=${page}` : ""}`;
  const title = `Posts | ${siteConfig.name}`;
  const description = `Articles and guides written by ${siteConfig.name} on web development, ERP, and software engineering.`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
  };
}

export default async function PostsPage({ searchParams }) {
  const { page: pageParam = "1" } = await searchParams;
  const page = Number(pageParam) || 1;

  let posts = [];
  let meta = null;
  let failed = false;
  try {
    ({ posts, meta } = await getPosts({ page, limit: 9 }));
  } catch {
    failed = true;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-4 md:px-8 pt-32 pb-20">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb
          items={[
            { name: "Home", href: "/" },
            { name: "Posts", href: "/posts" },
          ]}
        />
        <h1 className="text-4xl md:text-5xl font-bold mb-12">Posts</h1>

        {failed && (
          <p className="text-gray-400">Posts are temporarily unavailable.</p>
        )}
        {!failed && posts.length === 0 && (
          <p className="text-gray-400">No posts published yet.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/posts/${post.slug}`}
              className="block bg-[#06080B] rounded-3xl border border-gray-700/50 hover:border-lime-400/50 transition-colors overflow-hidden"
            >
              <Thumbnail
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-48"
              />
              <div className="p-6">
                <span className="text-lime-400 text-xs uppercase tracking-widest">
                  {post.category}
                </span>
                <h2 className="text-xl font-bold mt-2 line-clamp-2">
                  {post.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>

        {meta && (
          <Pagination basePath="/posts" page={page} totalPages={meta.totalPages} />
        )}
      </div>
    </main>
  );
}
