import { NextRequest, NextResponse } from "next/server";
import { recordAnalyticsEvent } from "@/lib/analytics-db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { type, page, pageUrl, course, sessionId, referrer, userId, isReturning, visitCount } = body;

    const allowedTypes = ["page_view", "form_view", "form_start", "form_submit"];
    if (!type || !allowedTypes.includes(type)) {
      return NextResponse.json({ error: "Invalid event type" }, { status: 400 });
    }

    // Ignore localhost or admin route events at the API level
    const safeUrl = typeof pageUrl === "string" ? pageUrl : "";
    const safePage = typeof page === "string" ? page : "";
    if (safeUrl.includes("localhost") || safeUrl.includes("127.0.0.1") || safePage.startsWith("/admin")) {
      return NextResponse.json({ success: true, ignored: true });
    }

    const event = await recordAnalyticsEvent({
      type,
      page: safePage.slice(0, 200) || "/",
      pageUrl: safeUrl.slice(0, 500),
      course: typeof course === "string" ? course.slice(0, 100) : "",
      referrer: typeof referrer === "string" ? referrer.slice(0, 500) : "",
      sessionId: typeof sessionId === "string" ? sessionId.slice(0, 100) : "",
      userId: typeof userId === "string" ? userId.slice(0, 100) : "",
      isReturning: Boolean(isReturning),
      visitCount: typeof visitCount === "number" ? visitCount : 1,
    });

    return NextResponse.json({ success: true, eventId: event.id });
  } catch (err) {
    console.error("[POST /api/analytics/event Error]:", err);
    return NextResponse.json({ error: "Failed to record event" }, { status: 500 });
  }
}
