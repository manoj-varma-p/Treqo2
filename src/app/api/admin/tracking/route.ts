import { NextRequest, NextResponse } from "next/server";
import { getTrackingSettingsFromDb, saveTrackingSettingsToDb, type TrackingSettings } from "@/lib/content-db";
import { isAuthorizedRequest } from "@/lib/admin-auth";
import { revalidatePublicSite } from "@/lib/revalidate";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // Public read of public tracking config (e.g. for cookie banner text and IDs) or admin
  try {
    const settings = await getTrackingSettingsFromDb();
    return NextResponse.json({ success: true, settings });
  } catch (err) {
    console.error("[GET /api/admin/tracking Error]:", err);
    return NextResponse.json({ error: "Failed to fetch tracking settings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthorizedRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const current = await getTrackingSettingsFromDb();

    const updated: TrackingSettings = {
      gaMeasurementId: typeof body.gaMeasurementId === "string" ? body.gaMeasurementId.trim() : current.gaMeasurementId,
      metaPixelId: typeof body.metaPixelId === "string" ? body.metaPixelId.trim() : current.metaPixelId,
      googleTagManagerId: typeof body.googleTagManagerId === "string" ? body.googleTagManagerId.trim() : current.googleTagManagerId,
      clarityProjectId: typeof body.clarityProjectId === "string" ? body.clarityProjectId.trim() : current.clarityProjectId,
      cookieBannerEnabled: typeof body.cookieBannerEnabled === "boolean" ? body.cookieBannerEnabled : current.cookieBannerEnabled,
      cookieBannerTitle: typeof body.cookieBannerTitle === "string" ? body.cookieBannerTitle.trim().slice(0, 100) : current.cookieBannerTitle,
      cookieBannerText: typeof body.cookieBannerText === "string" ? body.cookieBannerText.trim().slice(0, 500) : current.cookieBannerText,
      analyticsEnabled: typeof body.analyticsEnabled === "boolean" ? body.analyticsEnabled : current.analyticsEnabled,
      marketingEnabled: typeof body.marketingEnabled === "boolean" ? body.marketingEnabled : current.marketingEnabled,
    };

    await saveTrackingSettingsToDb(updated);
    revalidatePublicSite();

    return NextResponse.json({
      success: true,
      message: "Tracking and cookie settings updated successfully",
      settings: updated,
    });
  } catch (err) {
    console.error("[POST /api/admin/tracking Error]:", err);
    return NextResponse.json({ error: "Failed to update tracking settings" }, { status: 500 });
  }
}
