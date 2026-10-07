import { NextRequest, NextResponse } from "next/server";
import { getLeads, deleteLead } from "@/lib/leads-db";
import { isAuthorizedRequest } from "@/lib/admin-auth";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export { POST } from "@/app/api/apply/route";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  if (!isAuthorizedRequest(request as unknown as NextRequest)) {
    return NextResponse.json(
      { error: "Unauthorized. Administrator credentials required." },
      { status: 401 }
    );
  }

  const format = searchParams.get("format");
  const query = searchParams.get("q")?.toLowerCase();

  let leads = await getLeads();

  if (query) {
    leads = leads.filter(
      (l) =>
        l.name.toLowerCase().includes(query) ||
        l.email.toLowerCase().includes(query) ||
        l.phone.includes(query) ||
        l.course.toLowerCase().includes(query)
    );
  }

  // Export as CSV for one-click Excel download
  if (format === "csv") {
    const sanitizeCsvCell = (raw: string | undefined | null): string => {
      if (!raw) return '""';
      const str = String(raw).trim();
      // Neutralize formula triggers in Excel, LibreOffice, and Google Sheets
      const safeStr = /^[=+\-@\t\r]/.test(str) ? `'${str}` : str;
      return `"${safeStr.replace(/"/g, '""')}"`;
    };

    const csvHeaders = "Timestamp,Full Name,Email,Phone,Applied Course,Origin Page,Source,Background\n";
    const csvRows = leads
      .map((l) =>
        [
          `"${new Date(l.submittedAt).toLocaleString("en-IN")}"`,
          sanitizeCsvCell(l.name),
          sanitizeCsvCell(l.email),
          sanitizeCsvCell(l.phone),
          sanitizeCsvCell(l.course),
          sanitizeCsvCell(l.page || "/"),
          sanitizeCsvCell(l.source),
          sanitizeCsvCell(l.background),
        ].join(",")
      )
      .join("\n");

    return new Response(csvHeaders + csvRows, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="treqo-leads-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  }

  return NextResponse.json(
    {
      total: leads.length,
      leads,
    },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
        Pragma: "no-cache",
        Expires: "0",
      },
    }
  );
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);

  if (!isAuthorizedRequest(request as unknown as NextRequest)) {
    return NextResponse.json(
      { error: "Unauthorized. Administrator credentials required." },
      { status: 401 }
    );
  }

  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing lead id" }, { status: 400 });
  }

  await deleteLead(id);
  return NextResponse.json({ success: true, message: "Lead deleted" });
}
