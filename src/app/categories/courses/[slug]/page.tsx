import { redirect } from "next/navigation";
import { formatCourseSlug } from "@/lib/seo-utils";
import { getCoursesFromDb } from "@/lib/content-db";

export const dynamic = "force-dynamic";

export default async function CategoryCoursesRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const clean = formatCourseSlug(slug);
  const dbCourses = await getCoursesFromDb().catch(() => []);

  if (clean === "business" || clean === "4m-program") {
    const onCampus = dbCourses.find((c) => c.id === "4m-program");
    if (onCampus && !onCampus.isLocked) {
      redirect(onCampus.href || "/digital-marketing-on-campus");
    }
  }

  if (clean === "digital-marketing" || clean === "ai-automation") {
    const online = dbCourses.find((c) => c.id === "digital-marketing" || c.isFlagship);
    if (online && !online.isLocked) {
      redirect(online.href || "/new-digital-marketing-program");
    }
  }

  const matched = dbCourses.find((c) => c.id === clean || formatCourseSlug(c.href) === clean);
  // ONLY REDIRECT TO MATCHED COURSE IF UNLOCKED
  if (matched?.href && !matched.isLocked) {
    redirect(matched.href);
  }

  // If locked or not found, redirect to the live unlocked flagship course
  const online = dbCourses.find((c) => (c.id === "digital-marketing" || c.isFlagship) && !c.isLocked);
  redirect(online?.href || "/new-digital-marketing-program");
}
