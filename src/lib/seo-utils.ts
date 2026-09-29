import type { PageSeoItem, CourseItem } from "@/lib/content-db";

/**
 * Format any course URL slug or title into a clean, canonical slug.
 * e.g. "/categories/new-age-digital-marketing/" -> "new-age-digital-marketing"
 * e.g. "Digital Marketing 2026!" -> "digital-marketing-2026"
 */
export function formatCourseSlug(input?: string): string {
  if (!input) return "";
  return input
    .toLowerCase()
    .trim()
    .replace(/^\/+/, "")
    .replace(/^(courses|categories|programs)\//, "")
    .replace(/^(courses|categories|programs)\//, "")
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Automatically synchronizes Page SEO settings with active courses.
 * If a course title or slug is changed, the corresponding item in Page SEO
 * is immediately updated with the new name, path, and meta title.
 */
export function syncPageSeoWithCourses(
  pageSeoList: PageSeoItem[] = [],
  courses: CourseItem[] = []
): PageSeoItem[] {
  if (!courses || courses.length === 0) return pageSeoList;

  const result: PageSeoItem[] = [...pageSeoList];

  for (const course of courses) {
    if (!course || !course.title) continue;

    const rawSlug = formatCourseSlug(course.href) || formatCourseSlug(course.id);
    if (!rawSlug) continue;

    const canonicalPath =
      course.href && course.href.startsWith("/")
        ? course.href
        : `/courses/${rawSlug}`;


    // Find existing SEO item for this course
    const existingIndex = result.findIndex((p) => {
      const pSlug = formatCourseSlug(p.path) || formatCourseSlug(p.id);
      return (
        p.id === course.id ||
        p.id === rawSlug ||
        pSlug === rawSlug ||
        formatCourseSlug(p.path) === rawSlug ||
        (rawSlug === "digital-marketing" && (p.id === "new-age-dm" || p.id === "digital-marketing"))
      );
    });

    const activeKeywords =
      Array.isArray(course.metaKeywords) && course.metaKeywords.length > 0
        ? course.metaKeywords
        : existingIndex >= 0 && Array.isArray(result[existingIndex].metaKeywords) && result[existingIndex].metaKeywords.length > 0
        ? result[existingIndex].metaKeywords
        : [];

    const activeDescription =
      course.metaDescription ||
      course.description ||
      (existingIndex >= 0 ? result[existingIndex].metaDescription : "") ||
      "";

    const activeTitle =
      course.metaTitle ||
      (existingIndex >= 0 && result[existingIndex].title && !result[existingIndex].title?.includes("| TREQO")
        ? result[existingIndex].title
        : `${course.title} | TREQO`);

    if (existingIndex >= 0) {
      const existing = result[existingIndex];
      result[existingIndex] = {
        ...existing,
        id: course.id || existing.id,
        name: course.title,
        path: canonicalPath,
        category: "Courses",
        title: activeTitle,
        metaTitle: activeTitle,
        metaDescription: activeDescription,
        metaKeywords: activeKeywords,
        updatedAt: new Date().toISOString(),
      };
    } else {
      result.push({
        id: course.id || rawSlug,
        path: canonicalPath,
        name: course.title,
        category: "Courses",
        title: activeTitle,
        metaTitle: activeTitle,
        metaDescription: activeDescription,
        metaKeywords: activeKeywords,
        updatedAt: new Date().toISOString(),
      });
    }
  }

  return result;
}
