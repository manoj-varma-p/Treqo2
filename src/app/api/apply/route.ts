import { NextResponse } from "next/server";
import { addLead, getLeads } from "@/lib/leads-db";

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

    // Save into database
    const savedLead = await addLead({
      name,
      email,
      phone,
      course,
      background,
      source,
    });

    console.log("[DB] Lead saved successfully:", savedLead);

    // Also forward to external webhook (Google Sheets / Excel / Power Automate)
    const webhookUrl =
      process.env.LEADS_WEBHOOK_URL ||
      process.env.EXCEL_WEBHOOK_URL ||
      process.env.SHEET_WEBHOOK_URL ||
      process.env.NEXT_PUBLIC_SHEET_WEBHOOK_URL ||
      "https://script.google.com/macros/s/AKfycbyBRWMwf1gKHjWziw_7qAfdc197IB5pMKjbe66TSqoFY0NYkJLcBPXcUmEIictBglbK/exec";

    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(savedLead),
          redirect: "follow",
        });
      } catch (webhookError) {
        console.error("[Webhook Forwarding Error]:", webhookError);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Lead recorded in database successfully",
      lead: savedLead,
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
  const leads = await getLeads();
  return NextResponse.json({
    total: leads.length,
    leads,
  });
}
