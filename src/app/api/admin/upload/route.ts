import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { getMongoDb } from "@/lib/mongodb";
import { isAuthorizedRequest } from "@/lib/admin-auth";

const ALLOWED_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif", ".avif", ".ico"]);

// Check if we're running on Vercel (read-only filesystem)
function isVercel(): boolean {
  return Boolean(process.env.VERCEL || process.env.VERCEL_ENV);
}

// Store image in MongoDB and return a URL that serves it
async function storeImageInMongo(
  buffer: Buffer,
  mimeType: string,
  originalName: string,
  folder: string
): Promise<{ url: string; id: string } | null> {
  try {
    const db = await getMongoDb();
    if (!db) return null;

    const sanitizedName = originalName
      .toLowerCase()
      .replace(/[^a-z0-9._-]/g, "-")
      .slice(0, 60);

    const id = `${folder}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}-${sanitizedName}`;
    const base64 = buffer.toString("base64");
    const dataUrl = `data:${mimeType};base64,${base64}`;

    await db.collection("uploads").updateOne(
      { _id: id as unknown as undefined },
      {
        $set: {
          folder,
          originalName,
          mimeType,
          size: buffer.length,
          dataUrl,
          uploadedAt: new Date().toISOString(),
        },
      },
      { upsert: true }
    );

    console.log("[MongoDB Uploads] Image stored successfully:", id, "size:", buffer.length);
    return { url: `/api/admin/upload?id=${encodeURIComponent(id)}`, id };
  } catch (err) {
    console.error("[storeImageInMongo] error:", err);
    return null;
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthorizedRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const rawFolder = (formData.get("folder") as string) || "general";
    if (rawFolder.includes("..") || rawFolder.includes("/") || rawFolder.includes("\\")) {
      return NextResponse.json({ error: "Invalid folder parameter. Directory traversal is prohibited." }, { status: 400 });
    }
    const ALLOWED_FOLDERS = new Set(["general", "courses", "tutors", "blogs", "testimonials", "branding", "qa-test", "uploads"]);
    const sanitizedFolder = rawFolder.replace(/[^a-zA-Z0-9_-]/g, "");
    const folder = ALLOWED_FOLDERS.has(sanitizedFolder) ? sanitizedFolder : "general";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Determine extension and validate strictly
    const ext = path.extname(file.name).toLowerCase();
    const isImageMime = Boolean(file.type && file.type.startsWith("image/"));
    const hasImageExt = ALLOWED_EXTENSIONS.has(ext);

    if (!hasImageExt || !isImageMime) {
      return NextResponse.json(
        { error: "Only image files (PNG, JPG, JPEG, WEBP, SVG, GIF, AVIF, ICO) are allowed." },
        { status: 400 }
      );
    }

    // Validate size (max 8MB)
    const MAX_SIZE = 8 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File size exceeds 8MB limit." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Validate magic bytes for common image types
    if (ext === ".png" && (buffer.length < 8 || buffer[0] !== 0x89 || buffer[1] !== 0x50 || buffer[2] !== 0x4e || buffer[3] !== 0x47)) {
      return NextResponse.json({ error: "Corrupted or invalid PNG file signature." }, { status: 400 });
    }
    if ((ext === ".jpg" || ext === ".jpeg") && (buffer.length < 3 || buffer[0] !== 0xff || buffer[1] !== 0xd8 || buffer[2] !== 0xff)) {
      return NextResponse.json({ error: "Corrupted or invalid JPEG file signature." }, { status: 400 });
    }
    if (ext === ".gif" && (buffer.length < 4 || buffer.toString("ascii", 0, 3) !== "GIF")) {
      return NextResponse.json({ error: "Corrupted or invalid GIF file signature." }, { status: 400 });
    }
    if (ext === ".webp" && (buffer.length < 12 || buffer.toString("ascii", 0, 4) !== "RIFF" || buffer.toString("ascii", 8, 12) !== "WEBP")) {
      return NextResponse.json({ error: "Corrupted or invalid WEBP file signature." }, { status: 400 });
    }
    if (ext === ".svg") {
      const svgText = buffer.toString("utf-8").toLowerCase();
      if (!svgText.includes("<svg") || svgText.includes("<script") || svgText.includes("javascript:") || svgText.includes("onload=")) {
        return NextResponse.json({ error: "SVG contains disallowed active scripts or invalid structure." }, { status: 400 });
      }
    }
    const mimeType = file.type || `image/${ext.replace(".", "")}`;

    // 1. Primary storage: ALWAYS store image in MongoDB
    const mongoResult = await storeImageInMongo(buffer, mimeType, file.name, folder);

    // 2. Local mirror: write to disk if writable (for local dev convenience)
    let localDiskUrl: string | null = null;
    try {
      const sanitizedBase = file.name
        .replace(ext, "")
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, "-")
        .slice(0, 30);
      const uniqueFilename = `${sanitizedBase}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}${ext}`;
      const baseUploads = path.join(process.cwd(), "public", "uploads");
      const targetDir = path.join(baseUploads, folder);
      if (targetDir.startsWith(baseUploads)) {
        await fs.mkdir(targetDir, { recursive: true });
        await fs.writeFile(path.join(targetDir, uniqueFilename), buffer);
        localDiskUrl = `/uploads/${folder}/${uniqueFilename}`;
      }
    } catch {
      // Ignored if disk is read-only (e.g. serverless)
    }

    if (mongoResult) {
      return NextResponse.json({
        success: true,
        url: mongoResult.url,
        fileName: file.name,
        size: file.size,
      });
    }

    if (localDiskUrl) {
      return NextResponse.json({
        success: true,
        url: localDiskUrl,
        fileName: file.name,
        size: file.size,
      });
    }

    return NextResponse.json(
      { error: "Failed to store image in MongoDB database." },
      { status: 500 }
    );
  } catch (error) {
    console.error("[Upload POST Error]:", error);
    return NextResponse.json({ error: "Failed to save uploaded file. Please try again." }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  // Serve image by ID from MongoDB (for data-url stored images)
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    // No auth needed to serve public images
    try {
      const db = await getMongoDb();
      let doc = null;
      if (db) {
        doc = await db.collection("uploads").findOne({
          $or: [{ _id: id as unknown as undefined }, { id: id }, { originalName: id }],
        });
      }

      if (doc && doc.dataUrl) {
        const match = (doc.dataUrl as string).match(/^data:([^;]+);base64,(.+)$/);
        if (match) {
          const mimeType = match[1];
          const imageBuffer = Buffer.from(match[2], "base64");

          const responseHeaders: Record<string, string> = {
            "Content-Type": mimeType,
            "Cache-Control": "public, max-age=31536000, immutable",
            "Content-Length": imageBuffer.length.toString(),
            "X-Content-Type-Options": "nosniff",
          };

          if (mimeType.toLowerCase().includes("svg")) {
            responseHeaders["Content-Security-Policy"] = "default-src 'none'; style-src 'unsafe-inline'";
          }

          return new NextResponse(imageBuffer, {
            status: 200,
            headers: responseHeaders,
          });
        }
      }

      return new NextResponse("Not found", { status: 404 });
    } catch (err) {
      console.error("[Upload GET serve error]:", err);
      return new NextResponse("Internal server error", { status: 500 });
    }
  }

  // List uploaded files (admin only)
  if (!isAuthorizedRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const files: Array<{ url: string; name: string; size: number; mtime: number }> = [];

    // List from MongoDB
    const db = await getMongoDb();
    if (db) {
      const docs = await db
        .collection("uploads")
        .find({}, { projection: { _id: 1, originalName: 1, size: 1, uploadedAt: 1 } })
        .sort({ uploadedAt: -1 })
        .limit(200)
        .toArray();
      for (const doc of docs) {
        files.push({
          url: `/api/admin/upload?id=${encodeURIComponent(String(doc._id))}`,
          name: String(doc.originalName || doc._id),
          size: Number(doc.size || 0),
          mtime: new Date(String(doc.uploadedAt || 0)).getTime(),
        });
      }
    }

    // Also list local disk files (dev)
    if (!isVercel()) {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      async function scanDir(
        dir: string,
        baseRel = ""
      ): Promise<Array<{ url: string; name: string; size: number; mtime: number }>> {
        try {
          const entries = await fs.readdir(dir, { withFileTypes: true });
          const list: Array<{ url: string; name: string; size: number; mtime: number }> = [];
          for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            const rel = baseRel ? `${baseRel}/${entry.name}` : entry.name;
            if (entry.isDirectory()) {
              list.push(...(await scanDir(fullPath, rel)));
            } else if (entry.isFile() && entry.name !== ".gitkeep") {
              const fileExt = path.extname(entry.name).toLowerCase();
              if ([".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif"].includes(fileExt)) {
                const stat = await fs.stat(fullPath);
                list.push({
                  url: `/uploads/${rel.replace(/\\/g, "/")}`,
                  name: entry.name,
                  size: stat.size,
                  mtime: stat.mtimeMs,
                });
              }
            }
          }
          return list;
        } catch {
          return [];
        }
      }
      try {
        await fs.mkdir(uploadsDir, { recursive: true });
        files.push(...(await scanDir(uploadsDir)));
      } catch {
        // ignore
      }
    }

    files.sort((a, b) => b.mtime - a.mtime);
    return NextResponse.json({ success: true, files });
  } catch (error) {
    console.error("[Upload List Error]:", error);
    return NextResponse.json({ error: "Failed to list uploaded files." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorizedRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const filePath = searchParams.get("path");

    if (!id && !filePath) {
      return NextResponse.json({ error: "Provide either 'id' or 'path' to delete." }, { status: 400 });
    }

    let deletedMongo = false;
    let deletedDisk = false;

    // Delete from MongoDB
    if (id) {
      const db = await getMongoDb();
      if (db) {
        const res = await db.collection("uploads").deleteMany({
          $or: [{ _id: id as unknown as undefined }, { id: id }, { originalName: id }],
        });
        deletedMongo = res.deletedCount > 0;
      }
    }

    // Delete from local disk
    if (filePath) {
      const baseUploads = path.join(process.cwd(), "public");
      const normalized = path.normalize(filePath).replace(/^(\.\.[\/\\])+/, "");
      const fullPath = path.join(baseUploads, normalized);

      if (fullPath.startsWith(path.join(process.cwd(), "public", "uploads"))) {
        try {
          await fs.unlink(fullPath);
          deletedDisk = true;
        } catch {
          // file may not exist on disk
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Media asset deleted successfully",
      deletedMongo,
      deletedDisk,
    });
  } catch (error) {
    console.error("[Upload DELETE Error]:", error);
    return NextResponse.json({ error: "Failed to delete file." }, { status: 500 });
  }
}
