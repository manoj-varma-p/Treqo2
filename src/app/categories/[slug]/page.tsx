import { redirect } from "next/navigation";
import { formatCourseSlug } from "@/lib/seo-utils";

export const dynamic = "force-dynamic";

const VALID_COURSE_SLUGS = new Set([
  "digital-marketing",
  "4m-program",
  "fundamentals",
  "pgdm",
  "founder-semester",
  "performance-growth",
]);

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const clean = formatCourseSlug(slug);
  if (clean && VALID_COURSE_SLUGS.has(clean)) {
    redirect(`/courses/${clean}`);
  }
  redirect("/courses/digital-marketing");
}
