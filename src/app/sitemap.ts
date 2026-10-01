import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blogs";
import { learningSystemCourses } from "@/data/home";
import { getCoursesFromDb } from "@/lib/content-db";
import { formatCourseSlug } from "@/lib/seo-utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://treqo.org";

  // Dynamic courses from DB — ONLY include UNLOCKED courses!
  const dbCourses = await getCoursesFromDb().catch(() => []);
  const unlockedDbCourses = dbCourses.filter((c) => !c.isLocked);

  const dbRoutes: MetadataRoute.Sitemap = unlockedDbCourses.map((c) => {
    const href = c.href && c.href.startsWith("/") ? c.href : `/courses/${formatCourseSlug(c.href) || c.id}`;
    return {
      url: `${baseUrl}${href}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: c.isFlagship ? 0.9 : 0.7,
    };
  });

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt || new Date()),
    changeFrequency: "monthly" as const,
    priority: post.featured ? 0.8 : 0.6,
  }));

  // Dedup by URL
  const allCourseUrls = new Map<string, MetadataRoute.Sitemap[number]>();
  dbRoutes.forEach((r) => allCourseUrls.set(r.url, r));

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
    ...Array.from(allCourseUrls.values()),
    ...blogRoutes,
  ];
}

