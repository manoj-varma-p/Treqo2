import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blogs";
import { learningSystemCourses } from "@/data/home";
import { megaMenuData } from "@/data/navigation";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://treqo.org";

  const categoryLinks = megaMenuData.columns.find((c) => c.title === "Learn by Category")?.links ?? [];
  const courseSlugs = learningSystemCourses.map((c) => c.href.replace("/categories/", ""));
  const catSlugs = categoryLinks.map((l) => l.href.replace("/categories/", ""));
  const allSlugs = Array.from(new Set([...courseSlugs, ...catSlugs]));

  const categoryRoutes: MetadataRoute.Sitemap = allSlugs.map((slug) => ({
    url: `${baseUrl}/categories/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: slug === "digital-marketing" || slug === "4m-program" ? 0.9 : 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt || new Date()),
    changeFrequency: "monthly",
    priority: post.featured ? 0.8 : 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...categoryRoutes,
    ...blogRoutes,
  ];
}
