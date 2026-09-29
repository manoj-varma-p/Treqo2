import { NextRequest, NextResponse } from "next/server";
import { getAnalyticsSummary } from "@/lib/analytics-db";
import { isAuthorizedRequest } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!isAuthorizedRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const range = (searchParams.get("range") || "7d") as "24h" | "7d" | "30d" | "all";
    const validRange = ["24h", "7d", "30d", "all"].includes(range) ? range : "7d";

    const summary = await getAnalyticsSummary(validRange);

    return NextResponse.json({
      success: true,
      range: validRange,
      summary,
    });
  } catch (err) {
    console.error("[GET /api/admin/analytics Error]:", err);
    return NextResponse.json({ error: "Failed to fetch analytics summary" }, { status: 500 });
  }
}
