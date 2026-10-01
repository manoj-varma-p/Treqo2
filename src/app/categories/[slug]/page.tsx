import { redirect } from "next/navigation";
import { formatCourseSlug } from "@/lib/seo-utils";
import { getCoursesFromDb } from "@/lib/content-db";

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const clean = formatCourseSlug(slug);
  const dbCourses = await getCoursesFromDb().catch(() => []);

  if (clean === "business") {
    const onCampus = dbCourses.find((c) => c.id === "4m-program");
    redirect(onCampus?.href || "/digital-marketing-on-campus");
  }

  if (clean === "4m-program") {
    const onCampus = dbCourses.find((c) => c.id === "4m-program");
    redirect(onCampus?.href || "/digital-marketing-on-campus");
  }

  if (clean === "digital-marketing" || clean === "ai-automation") {
    const online = dbCourses.find((c) => c.id === "digital-marketing" || c.isFlagship);
    redirect(online?.href || "/new-digital-marketing-program");
  }

  const matched = dbCourses.find((c) => c.id === clean || formatCourseSlug(c.href) === clean);
  if (matched?.href) {
    redirect(matched.href);
  }

  redirect("/new-digital-marketing-program");
}
