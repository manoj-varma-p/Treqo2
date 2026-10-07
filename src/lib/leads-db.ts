import fs from "fs";
import path from "path";
import { MongoClient, ObjectId } from "mongodb";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  normalizedPhone?: string;
  course: string;
  background: string;
  source: string;
  page?: string;
  pageUrl?: string;
  submittedAt: string;
}

import { getMongoDb } from "./mongodb";

// In-memory runtime cache
let memoryLeads: Lead[] = [];

export function normalizePhoneNumber(phone: string): string {
  if (!phone) return "";
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0") && digits.length === 11) {
    digits = digits.slice(1);
  } else if (digits.startsWith("91") && digits.length === 12) {
    digits = digits.slice(2);
  } else if (digits.length > 10) {
    digits = digits.slice(-10);
  }
  return digits;
}

export async function findLeadByPhone(phone: string): Promise<Lead | null> {
  const targetNorm = normalizePhoneNumber(phone);
  if (!targetNorm || targetNorm.length < 7) {
    return null;
  }

  // 1. Try MongoDB if configured
  const collection = await getMongoCollection();
  if (collection) {
    try {
      const doc = await collection.findOne({
        $or: [
          { normalizedPhone: targetNorm },
          { phone: phone.trim() },
          { phone: { $regex: targetNorm, $options: "i" } },
        ],
      });
      if (doc) {
        return {
          id: doc.id || String(doc._id),
          name: doc.name,
          email: doc.email,
          phone: doc.phone,
          normalizedPhone: doc.normalizedPhone || normalizePhoneNumber(doc.phone),
          course: doc.course,
          background: doc.background,
          source: doc.source,
          page: doc.page || "/",
          pageUrl: doc.pageUrl || "",
          submittedAt: doc.submittedAt,
        };
      }
    } catch (err) {
      console.warn("[MongoDB findLeadByPhone Notice]:", err);
    }
  }

  // 2. Check local memory & file storage
  const fileLeads = loadLeadsFromFile();
  const allLeads = [...memoryLeads, ...fileLeads];
  const matched = allLeads.find((l) => {
    if (l.normalizedPhone && l.normalizedPhone === targetNorm) return true;
    const lNorm = normalizePhoneNumber(l.phone);
    return lNorm === targetNorm;
  });

  return matched || null;
}

async function getMongoCollection() {
  try {
    const db = await getMongoDb();
    if (!db) return null;
    return db.collection<Lead>("leads");
  } catch (err) {
    console.warn("[MongoDB Collection Notice]:", err);
    return null;
  }
}

function getStoragePath(): string {
  const localDir = path.join(process.cwd(), "data");
  try {
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    return path.join(localDir, "leads.json");
  } catch {
    const tmpDir = "/tmp";
    return path.join(tmpDir, "treqo_leads.json");
  }
}

function loadLeadsFromFile(): Lead[] {
  try {
    const filePath = getStoragePath();
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(data) || [];
    }
  } catch (err) {
    console.error("[DB Read Error]:", err);
  }
  return [];
}

function saveLeadsToFile(leads: Lead[]) {
  try {
    const filePath = getStoragePath();
    fs.writeFileSync(filePath, JSON.stringify(leads, null, 2), "utf-8");
  } catch (err) {
    console.error("[DB Write Error]:", err);
  }
}

// Safely merges a new lead without ever erasing existing records
function saveLeadSafely(newLead: Lead) {
  try {
    const existing = loadLeadsFromFile();
    const map = new Map<string, Lead>();
    map.set(newLead.id, newLead);
    for (const l of existing) {
      if (!map.has(l.id)) {
        map.set(l.id, l);
      }
    }
    const merged = Array.from(map.values()).sort(
      (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );
    saveLeadsToFile(merged);
    memoryLeads = merged;
  } catch (err) {
    console.error("[saveLeadSafely Error]:", err);
  }
}

// Initialize memory from file
try {
  memoryLeads = loadLeadsFromFile();
} catch {
  memoryLeads = [];
}

export async function addLead(leadData: Omit<Lead, "id" | "submittedAt">): Promise<Lead> {
  const normalizedPhone = normalizePhoneNumber(leadData.phone);
  const newLead: Lead = {
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: leadData.name.trim(),
    email: leadData.email.trim().toLowerCase(),
    phone: leadData.phone.trim(),
    normalizedPhone,
    course: leadData.course.trim() || "New Age Digital Marketing",
    background: leadData.background?.trim() || "General Inquiry",
    source: leadData.source?.trim() || "Website Form",
    page: leadData.page?.trim() || "/",
    pageUrl: leadData.pageUrl?.trim() || "",
    submittedAt: new Date().toISOString(),
  };

  // 1. Save to MongoDB (Primary)
  let mongoSaved = false;
  const collection = await getMongoCollection();
  if (collection) {
    try {
      await collection.insertOne({ ...newLead });
      mongoSaved = true;
      console.log("[MongoDB] Lead inserted into collection successfully:", newLead.id);
    } catch (err) {
      console.error("[MongoDB Insert Error]:", err);
    }
  }

  // 2. Also safely update local file/memory backup without overwriting old items
  saveLeadSafely(newLead);

  if (!mongoSaved) {
    console.warn("[Leads Notice]: Saved to local fallback because MongoDB was unavailable.");
  }

  return newLead;
}

export async function getLeads(): Promise<Lead[]> {
  const collection = await getMongoCollection();
  if (collection) {
    try {
      const docs = await collection.find({}).sort({ submittedAt: -1 }).toArray();
      const mongoLeads: Lead[] = (docs || []).map((d) => ({
        id: d.id || String(d._id),
        name: d.name,
        email: d.email,
        phone: d.phone,
        normalizedPhone: d.normalizedPhone || normalizePhoneNumber(d.phone),
        course: d.course,
        background: d.background,
        source: d.source,
        page: d.page || "/",
        pageUrl: d.pageUrl || "",
        submittedAt: d.submittedAt,
      }));

      // Check for any offline/fallback file leads not yet in MongoDB and sync them
      const fileLeads = loadLeadsFromFile();
      if (fileLeads.length > 0) {
        const mongoIds = new Set(mongoLeads.map((m) => m.id));
        const missingLeads = fileLeads.filter((f) => !mongoIds.has(f.id));
        if (missingLeads.length > 0) {
          try {
            await collection.insertMany(missingLeads as any, { ordered: false }).catch(() => null);
            mongoLeads.push(...missingLeads);
            mongoLeads.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
          } catch (e) {
            console.warn("[MongoDB sync missing leads notice]:", e);
          }
        }
      }

      memoryLeads = mongoLeads;
      return mongoLeads;
    } catch (err) {
      console.error("[MongoDB Fetch Error]:", err);
    }
  }

  // Fallback to file storage if MongoDB is down
  const fileLeads = loadLeadsFromFile();
  memoryLeads = fileLeads.map((l) => ({
    ...l,
    normalizedPhone: l.normalizedPhone || normalizePhoneNumber(l.phone),
    page: l.page || "/",
    pageUrl: l.pageUrl || "",
  }));
  return memoryLeads;
}

export async function deleteLead(id: string): Promise<boolean> {
  const collection = await getMongoCollection();
  if (collection) {
    try {
      const deleteConditions: any[] = [{ id }, { _id: id }];
      if (ObjectId.isValid(id) && id.length === 24) {
        try {
          deleteConditions.push({ _id: new ObjectId(id) });
        } catch {}
      }
      await collection.deleteOne({ $or: deleteConditions });
      console.log("[MongoDB] Lead deleted successfully:", id);
    } catch (err) {
      console.error("[MongoDB Delete Error]:", err);
    }
  }

  const fileLeads = loadLeadsFromFile().filter((l) => l.id !== id);
  saveLeadsToFile(fileLeads);
  memoryLeads = memoryLeads.filter((l) => l.id !== id);
  return true;
}
