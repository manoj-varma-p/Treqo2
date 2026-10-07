import fs from "fs";
import path from "path";
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://maxvarma7676_db_user:QOVjNSCaKDGrxRPz@cluster0.ezye0cv.mongodb.net/treqo?retryWrites=true&w=majority";

function getAllFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach((f) => {
    const fp = path.join(dir, f);
    const s = fs.statSync(fp);
    if (s && s.isDirectory()) {
      results = results.concat(getAllFiles(fp));
    } else if (!f.endsWith(".gitkeep")) {
      results.push(fp);
    }
  });
  return results;
}

async function run() {
  const client = new MongoClient(uri);
  await client.connect();
  console.log("Connected to MongoDB");
  const db = client.db("treqo");
  const files = getAllFiles("public/uploads");
  console.log("Found local files to sync:", files.length);

  for (const f of files) {
    const buffer = fs.readFileSync(f);
    const ext = path.extname(f).toLowerCase();
    const mimeType = ext === ".png" ? "image/png" : ext === ".svg" ? "image/svg+xml" : ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : "image/webp";
    const name = path.basename(f);
    const folder = path.basename(path.dirname(f));
    const normalizedRelative = path.relative("public/uploads", f).replace(/\\/g, "/");
    const id = `${folder}-${name}`;
    const dataUrl = `data:${mimeType};base64,${buffer.toString("base64")}`;

    await db.collection("uploads").updateOne(
      { originalName: name },
      {
        $set: {
          _id: id,
          folder,
          originalName: name,
          relativePath: normalizedRelative,
          mimeType,
          size: buffer.length,
          dataUrl,
          uploadedAt: new Date().toISOString(),
        },
      },
      { upsert: true }
    );
    console.log("Synced to MongoDB:", name);
  }

  const count = await db.collection("uploads").countDocuments();
  console.log("Total uploads count in MongoDB now:", count);
  await client.close();
}

run().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
