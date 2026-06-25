import { notFound } from "next/navigation";
import { getPostBySlug, getPosts } from "@/lib/api/posts";
import { siteConfig } from "@/lib/seo/site";
import { buildPostJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo/jsonld";
import JsonLd from "@/components/SEO/JsonLd";
import Thumbnail from "@/components/UI/Thumbnail";
import Breadcrumb from "@/components/UI/Breadcrumb";
import { splitParagraphs } from "@/lib/text";
import { formatDate } from "@/lib/date";

export async function generateStaticParams() {
  try {
    const { posts } = await getPosts({ limit: 100 });
    return posts.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const url = `${siteConfig.url}/posts/${post.slug}`;
  const description = post.content?.slice(0, 160);

  return {
    title: `${post.title} | Posts | ${siteConfig.name}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description,
      url,
      type: "article",
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      images: post.thumbnail ? [{ url: post.thumbnail }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: post.thumbnail ? [post.thumbnail] : undefined,
    },
  };
}

export default async function PostDetailPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-4 md:px-8 pt-32 pb-20">
      <JsonLd data={buildPostJsonLd(post)} />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", url: siteConfig.url },
          { name: "Posts", url: `${siteConfig.url}/posts` },
          { name: post.title, url: `${siteConfig.url}/posts/${post.slug}` },
        ])}
      />

      <article className="max-w-3xl mx-auto">
        <Breadcrumb
          items={[
            { name: "Home", href: "/" },
            { name: "Posts", href: "/posts" },
            { name: post.title, href: `/posts/${post.slug}` },
          ]}
        />
        <Thumbnail
          src={post.thumbnail}
          alt={post.title}
          className="w-full h-64 md:h-96 rounded-2xl mb-8"
        />

        <span className="text-lime-400 uppercase text-sm tracking-widest">
          {post.category}
        </span>
        <h1 className="text-4xl font-bold mt-2 mb-2">{post.title}</h1>
        <time
          dateTime={post.createdAt}
          className="text-gray-500 text-sm block mb-6"
        >
          {formatDate(post.createdAt)}
        </time>

        {splitParagraphs(post.content).map((paragraph, index) => (
          <p key={index} className="text-gray-300 mb-4 leading-relaxed">
            {paragraph}
          </p>
        ))}

        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-800 text-lime-400 text-sm px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </main>
  );
}
