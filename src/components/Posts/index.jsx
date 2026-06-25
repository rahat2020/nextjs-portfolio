import Link from "next/link";
import { ArrowUpRight } from "react-feather";
import { getLatestPosts } from "@/lib/api/posts";
import Thumbnail from "../UI/Thumbnail";

export default async function Posts() {
  let posts = [];
  try {
    posts = await getLatestPosts(3);
  } catch {
    posts = [];
  }

  return (
    <div
      id="posts"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-20 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-8 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-16 h-0.5 bg-lime-400"></div>
            <span className="text-lime-400 text-sm tracking-widest uppercase">
              Posts
            </span>
            <div className="w-16 h-0.5 bg-lime-400"></div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Thoughts, Guides &amp;{" "}
            <span className="text-lime-400">Latest Writing.</span>
          </h2>
          <Link
            href="/posts"
            className="bg-lime-400 hover:bg-lime-500 text-black px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 group"
          >
            <span className="mr-2">▶</span> View All
          </Link>
        </div>

        {posts.length === 0 ? (
          <p className="text-gray-400">Posts are coming soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/posts/${post.slug}`}
                className="group relative bg-[#06080B] rounded-3xl border border-gray-700/50 hover:border-lime-400/50 transition-all duration-500 overflow-hidden"
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
                  <h3 className="text-xl font-bold mt-2 mb-4 line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-lime-400 transition-colors">
                    Read more <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
