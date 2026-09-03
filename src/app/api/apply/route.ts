import { NextResponse } from "next/server";

export interface LeadSubmission {
  name: string;
  email: string;
  phone: string;
  course: string;
  background?: string;
  source?: string;
  timestamp?: string;
}

// In-memory fallback cache for recent leads during runtime
const recentLeads: Array<LeadSubmission & { id: string; submittedAt: string }> = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, course, background, source } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields (name, email, phone)" },
        { status: 400 }
      );
    }

    const leadRecord = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      course: String(course || "New Age Digital Marketing").trim(),
      background: String(background || "General Inquiry").trim(),
      source: String(source || "Website Form").trim(),
      submittedAt: new Date().toISOString(),
    };

    // Store in recent memory log
    recentLeads.unshift(leadRecord);
    if (recentLeads.length > 200) {
      recentLeads.pop();
    }

    console.log("[New Lead Received]:", leadRecord);

    // Forward to configured external webhook (e.g. Power Automate, Zapier, Make, or Google Sheets script)
    const webhookUrl =
      process.env.LEADS_WEBHOOK_URL ||
      process.env.EXCEL_WEBHOOK_URL ||
      process.env.SHEET_WEBHOOK_URL;

    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(leadRecord),
        });
      } catch (webhookError) {
        console.error("[Webhook Forwarding Error]:", webhookError);
        // Do not fail the user's submission if webhook is temporarily unavailable
      }
    }

    return NextResponse.json({
      success: true,
      message: "Lead recorded successfully",
      leadId: leadRecord.id,
    });
  } catch (error) {
    console.error("[API Apply Error]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    total: recentLeads.length,
    leads: recentLeads,
  });
}
