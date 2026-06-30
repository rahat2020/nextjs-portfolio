import HomePage from "../components/HomePage";
import JsonLd from "../components/SEO/JsonLd";
import { getAbout } from "@/lib/api/about";
import { buildPersonJsonLd } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/seo/site";

async function loadAbout() {
  try {
    return await getAbout();
  } catch {
    return null;
  }
}

export async function generateMetadata() {
  const about = await loadAbout();
  const title = about?.meta_title || `${siteConfig.name} - Portfolio`;
  const description = about?.meta_description || siteConfig.description;
  const image = about?.avatar
    ? [{ url: about.avatar, alt: about.full_name || siteConfig.name }]
    : [];

  return {
    title,
    description,
    alternates: { canonical: siteConfig.url },
    openGraph: {
      title,
      description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      type: "website",
      images: image,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: about?.avatar ? [about.avatar] : [],
    },
  };
}

export default async function Main() {
  const about = await loadAbout();

  return (
    <>
      <HomePage about={about} />
      <JsonLd data={buildPersonJsonLd(about)} />
    </>
  );
}
