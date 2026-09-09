import { NextResponse } from "next/server";
import { addLead, getLeads } from "@/lib/leads-db";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const course = typeof body.course === "string" ? body.course.trim().slice(0, 100) : "New Age Digital Marketing";
    const background = typeof body.background === "string" ? body.background.trim().slice(0, 150) : "General Inquiry";
    const source = typeof body.source === "string" ? body.source.trim().slice(0, 100) : "Website Form";

    // Validate Name
    if (!name || name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: "Please provide a valid full name (at least 2 characters)." },
        { status: 400 }
      );
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email.length > 120 || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Validate Phone (must contain at least 7 digits, e.g. excluding "+91 " prefix)
    const digitsOnly = phone.replace(/\D/g, "");
    if (!phone || digitsOnly.length < 7 || phone.length > 25) {
      return NextResponse.json(
        { error: "Please enter a valid phone number with your country/area code." },
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
