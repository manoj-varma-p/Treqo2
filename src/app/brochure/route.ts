import { NextResponse } from "next/server";
import { getMongoDb } from "@/lib/mongodb";
import { GridFSBucket, ObjectId } from "mongodb";
import path from "path";
import fs from "fs";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = await getMongoDb();
    if (db) {
      const meta = await db.collection("settings").findOne({ _id: "brochure" as unknown as undefined });
      if (meta && meta.fileId) {
        const bucket = new GridFSBucket(db, { bucketName: "brochures" });
        const objectId = typeof meta.fileId === "string" ? new ObjectId(meta.fileId) : (meta.fileId as ObjectId);
        const downloadStream = bucket.openDownloadStream(objectId);

        const chunks: Buffer[] = [];
        for await (const chunk of downloadStream) {
          chunks.push(chunk as Buffer);
        }
        const fileBuffer = Buffer.concat(chunks);
        const filename = (meta.originalName || meta.filename || "Treqo_Student_Syllabus.pdf").replace(/[^\w\s.-]/gi, "_");

        return new NextResponse(fileBuffer, {
          status: 200,
          headers: {
            "Content-Type": meta.mimeType || "application/pdf",
            "Content-Disposition": `attachment; filename="${filename}"`,
            "Content-Length": fileBuffer.length.toString(),
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
            Pragma: "no-cache",
            Expires: "0",
          },
        });
      }
    }
  } catch (dbErr) {
    console.warn("[/brochure] DB lookup failed, falling back to local file:", dbErr);
  }

  // Fallback to local disk file
  const filePath = path.join(process.cwd(), "public", "curriculum", "new-age-digital-marketing-curriculum.pdf");
  if (fs.existsSync(filePath)) {
    const fileBuffer = fs.readFileSync(filePath);
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Treqo_Student_Syllabus.pdf"',
        "Content-Length": fileBuffer.length.toString(),
      },
    });
  }

  return NextResponse.redirect("/curriculum/new-age-digital-marketing-curriculum.pdf", 307);
}
