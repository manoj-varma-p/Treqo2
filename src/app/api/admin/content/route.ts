import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { revalidatePublicSite } from "@/lib/revalidate";
import {
  getGeneralSettingsFromDb,
  saveGeneralSettingsToDb,
  getLayoutSettingsFromDb,
  saveLayoutSettingsToDb,
  getNavigationSettingsFromDb,
  saveNavigationSettingsToDb,
  getHomePageContentFromDb,
  saveHomePageContentToDb,
  getAllBlogsFromDb,
  getCoursesFromDb,
  saveCoursesToDb,
  getTutorsFromDb,
  saveTutorsToDb,
  getTestimonialsFromDb,
  saveTestimonialsToDb,
  getAlertSettingsFromDb,
  saveAlertSettingsToDb,
  getFormSettingsFromDb,
  saveFormSettingsToDb,
  getPageSeoSettingsFromDb,
  savePageSeoSettingsToDb,
} from "@/lib/content-db";

import { isAuthorizedRequest } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  if (!isAuthorizedRequest(req)) {
    return NextResponse.json(
      { error: "Unauthorized. Administrator credentials required." },
      { status: 401 }
    );
  }

  try {
    const [settings, layoutSettings, navigation, homeContent, blogs, courses, tutors, testimonials, alerts, forms, pageSeo] =
      await Promise.all([
        getGeneralSettingsFromDb(),
        getLayoutSettingsFromDb(),
        getNavigationSettingsFromDb(),
        getHomePageContentFromDb(),
        getAllBlogsFromDb(),
        getCoursesFromDb(),
        getTutorsFromDb(),
        getTestimonialsFromDb(),
        getAlertSettingsFromDb(),
        getFormSettingsFromDb(),
        getPageSeoSettingsFromDb(),
      ]);

    return NextResponse.json({
      success: true,
      settings,
      layoutSettings,
      navigation,
      homeContent,
      blogs,
      courses,
      tutors,
      testimonials,
      alerts,
      forms,
      pageSeo,
    });
  } catch (error) {
    console.error("[GET /api/admin/content Error]:", error);
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthorizedRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { type, data } = body;
    const extraPaths: string[] = [];

    if (type === "settings") {
      await saveGeneralSettingsToDb(data);
    } else if (type === "layout" || type === "layoutSettings") {
      await saveLayoutSettingsToDb(data);
    } else if (type === "pageSeo" || type === "page-seo") {
      await savePageSeoSettingsToDb(data);
      if (Array.isArray(data)) {
        for (const item of data) {
          if (item?.path) extraPaths.push(item.path);
        }
      }
    } else if (type === "navigation") {
      await saveNavigationSettingsToDb(data);
    } else if (type === "home") {
      await saveHomePageContentToDb(data);
    } else if (type === "courses") {
      await saveCoursesToDb(data);
      if (Array.isArray(data)) {
        for (const c of data) {
          if (c?.href) extraPaths.push(c.href);
          if (c?.actionHref) extraPaths.push(c.actionHref);
          if (c?.id) {
            extraPaths.push(`/courses/${c.id}`);
            extraPaths.push(`/programs/${c.id}`);
          }
        }
      }
    } else if (type === "tutors") {
      await saveTutorsToDb(data);
    } else if (type === "testimonials") {
      await saveTestimonialsToDb(data);
    } else if (type === "alerts") {
      await saveAlertSettingsToDb(data);
    } else if (type === "forms") {
      await saveFormSettingsToDb(data);
    } else {
      return NextResponse.json({ error: "Unknown content type" }, { status: 400 });
    }

    // Immediately bust Next.js cache so changes are permanently live for every user
    revalidatePublicSite(extraPaths);

    return NextResponse.json({ success: true, message: `${type} updated successfully` });
  } catch (error) {
    console.error("[POST /api/admin/content Error]:", error);
    return NextResponse.json(
      { error: "Failed to save content" },
      { status: 500 }
    );
  }
}
