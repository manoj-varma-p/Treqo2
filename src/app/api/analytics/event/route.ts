import { NextRequest, NextResponse } from "next/server";
import { recordAnalyticsEvent } from "@/lib/analytics-db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { type, page, pageUrl, course, sessionId, referrer } = body;

    const allowedTypes = ["page_view", "form_view", "form_start", "form_submit"];
    if (!type || !allowedTypes.includes(type)) {
      return NextResponse.json({ error: "Invalid event type" }, { status: 400 });
    }

    const event = await recordAnalyticsEvent({
      type,
      page: typeof page === "string" ? page.slice(0, 200) : "/",
      pageUrl: typeof pageUrl === "string" ? pageUrl.slice(0, 500) : "",
      course: typeof course === "string" ? course.slice(0, 100) : "",
      referrer: typeof referrer === "string" ? referrer.slice(0, 500) : "",
      sessionId: typeof sessionId === "string" ? sessionId.slice(0, 100) : "",
    });

    return NextResponse.json({ success: true, eventId: event.id });
  } catch (err) {
    console.error("[POST /api/analytics/event Error]:", err);
    return NextResponse.json({ error: "Failed to record event" }, { status: 500 });
  }
}
