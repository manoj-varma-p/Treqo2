import { NextRequest, NextResponse } from "next/server";
import { getMongoDb } from "@/lib/mongodb";
import { isAuthorizedRequest } from "@/lib/admin-auth";
import { GridFSBucket, ObjectId } from "mongodb";
import path from "path";
import fs from "fs";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const download = searchParams.get("download") === "true";

  try {
    const db = await getMongoDb();
    let meta: Record<string, any> | null = null;

    if (db) {
      meta = (await db.collection("settings").findOne({ _id: "brochure" as unknown as undefined })) as Record<string, any> | null;
    }

    // If download requested, stream or return the PDF file
    if (download) {
      const fileNameToDownload = meta?.originalName || meta?.filename || "Treqo_Student_Syllabus.pdf";
      const sanitizedDownloadName = fileNameToDownload.replace(/[^\w\s.-]/gi, "_");

      if (db && meta?.fileId) {
        try {
          const bucket = new GridFSBucket(db, { bucketName: "brochures" });
          const objectId = typeof meta.fileId === "string" ? new ObjectId(meta.fileId) : (meta.fileId as ObjectId);
          const downloadStream = bucket.openDownloadStream(objectId);

          const chunks: Buffer[] = [];
          for await (const chunk of downloadStream) {
            chunks.push(chunk as Buffer);
          }
          const fileBuffer = Buffer.concat(chunks);

          return new NextResponse(fileBuffer, {
            status: 200,
            headers: {
              "Content-Type": meta.mimeType || "application/pdf",
              "Content-Disposition": `attachment; filename="${sanitizedDownloadName}"`,
              "Content-Length": fileBuffer.length.toString(),
            },
          });
        } catch (streamErr) {
          console.warn("[Admin Brochure GET] GridFS stream error, falling back to disk:", streamErr);
        }
      }

      // Fallback to local disk file
      const localPath = path.join(process.cwd(), "public", "curriculum", "new-age-digital-marketing-curriculum.pdf");
      if (fs.existsSync(localPath)) {
        const fileBuffer = fs.readFileSync(localPath);
        return new NextResponse(fileBuffer, {
          status: 200,
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="${sanitizedDownloadName}"`,
            "Content-Length": fileBuffer.length.toString(),
          },
        });
      }

      return NextResponse.json({ error: "Brochure file not found" }, { status: 404 });
    }

    // Return JSON metadata
    const localPath = path.join(process.cwd(), "public", "curriculum", "new-age-digital-marketing-curriculum.pdf");
    const localExists = fs.existsSync(localPath);
    const localSize = localExists ? fs.statSync(localPath).size : 0;

    return NextResponse.json({
      success: true,
      brochure: {
        filename: meta?.filename || "Treqo_Student_Syllabus.pdf",
        originalName: meta?.originalName || "Treqo Student Syllabus.pdf",
        size: meta?.size || localSize,
        updatedAt: meta?.updatedAt || (localExists ? fs.statSync(localPath).mtime.toISOString() : new Date().toISOString()),
        storedInMongo: Boolean(db && meta?.fileId),
        downloadUrl: "/api/admin/brochure?download=true",
      },
    });
  } catch (err: unknown) {
    console.error("[Admin Brochure GET error]:", err);
    return NextResponse.json({ error: "Failed to fetch brochure details" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthorizedRequest(req)) {
    return NextResponse.json({ error: "Unauthorized. Administrator credentials required." }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No PDF file provided." }, { status: 400 });
    }

    const originalName = file.name || "Treqo_Student_Syllabus.pdf";
    const ext = path.extname(originalName).toLowerCase();

    if (ext !== ".pdf") {
      return NextResponse.json({ error: "Invalid file type. Please upload a PDF file (.pdf)." }, { status: 400 });
    }

    // Validate size (max 50MB)
    const MAX_SIZE = 50 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File size exceeds 50MB limit." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Validate magic bytes for PDF signature (%PDF-)
    if (buffer.length < 5 || buffer.toString("utf8", 0, 5) !== "%PDF-") {
      return NextResponse.json({ error: "Corrupted or invalid PDF file signature." }, { status: 400 });
    }

    const db = await getMongoDb();
    let fileId: ObjectId | null = null;

    if (db) {
      const bucket = new GridFSBucket(db, { bucketName: "brochures" });

      // Clean up previous files in the bucket
      try {
        const oldFiles = await db.collection("brochures.files").find({}).toArray();
        for (const old of oldFiles) {
          await bucket.delete(old._id).catch(() => {});
        }
      } catch (cleanErr) {
        console.warn("[Admin Brochure POST] Cleanup warning:", cleanErr);
      }

      // Upload to GridFS
      const sanitizedName = originalName.replace(/[^a-zA-Z0-9._-]/g, "_");
      const uploadStream = bucket.openUploadStream(sanitizedName, {
        metadata: {
          originalName,
          contentType: "application/pdf",
          uploadedAt: new Date().toISOString(),
          size: buffer.length,
        },
      });

      await new Promise<void>((resolve, reject) => {
        uploadStream.on("error", reject);
        uploadStream.on("finish", () => resolve());
        uploadStream.end(buffer);
      });

      fileId = uploadStream.id;

      // Update settings metadata
      await db.collection("settings").updateOne(
        { _id: "brochure" as unknown as undefined },
        {
          $set: {
            fileId,
            filename: sanitizedName,
            originalName,
            mimeType: "application/pdf",
            size: buffer.length,
            updatedAt: new Date().toISOString(),
          },
        },
        { upsert: true }
      );
    }

    // Also sync to local public folders for direct file serving
    try {
      const publicCurriculumDir = path.join(process.cwd(), "public", "curriculum");
      const publicDir = path.join(process.cwd(), "public");

      if (!fs.existsSync(publicCurriculumDir)) {
        fs.mkdirSync(publicCurriculumDir, { recursive: true });
      }

      fs.writeFileSync(path.join(publicCurriculumDir, "new-age-digital-marketing-curriculum.pdf"), buffer);
      fs.writeFileSync(path.join(publicCurriculumDir, "treqo-student-syllabus.pdf"), buffer);
      fs.writeFileSync(path.join(publicDir, "new-age-digital-marketing-curriculum.pdf"), buffer);
      fs.writeFileSync(path.join(publicDir, "treqo-student-syllabus.pdf"), buffer);
      fs.writeFileSync(path.join(publicDir, "treqo-curriculum.pdf"), buffer);
    } catch (fsErr) {
      console.warn("[Admin Brochure POST] Local filesystem sync warning (non-fatal if on read-only cloud):", fsErr);
    }

    return NextResponse.json({
      success: true,
      message: "Brochure updated and stored in database successfully!",
      brochure: {
        filename: originalName,
        originalName,
        size: buffer.length,
        updatedAt: new Date().toISOString(),
        storedInMongo: Boolean(db && fileId),
      },
    });
  } catch (err: unknown) {
    console.error("[Admin Brochure POST error]:", err);
    return NextResponse.json({ error: "Failed to upload brochure to database" }, { status: 500 });
  }
}
