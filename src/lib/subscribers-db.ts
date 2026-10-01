import fs from "fs";
import path from "path";
import { getMongoDb } from "./mongodb";

export interface Subscriber {
  id: string;
  email: string;
  source: string;
  status: "active" | "unsubscribed";
  subscribedAt: string;
}

let memorySubscribers: Subscriber[] = [];

function getStoragePath(): string {
  const localDir = path.join(process.cwd(), "data");
  try {
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    return path.join(localDir, "subscribers.json");
  } catch {
    return path.join("/tmp", "treqo_subscribers.json");
  }
}

function loadSubscribersFromFile(): Subscriber[] {
  try {
    const filePath = getStoragePath();
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(data) || [];
    }
  } catch (err) {
    console.error("[Subscribers DB Read Error]:", err);
  }
  return [];
}

function saveSubscribersToFile(list: Subscriber[]) {
  try {
    const filePath = getStoragePath();
    fs.writeFileSync(filePath, JSON.stringify(list, null, 2), "utf-8");
  } catch (err) {
    console.error("[Subscribers DB Write Error]:", err);
  }
}

// Initialize memory from local file
try {
  memorySubscribers = loadSubscribersFromFile();
} catch {
  memorySubscribers = [];
}

async function getMongoCollection() {
  try {
    const db = await getMongoDb();
    if (!db) return null;
    return db.collection<Subscriber>("subscribers");
  } catch (err) {
    console.warn("[MongoDB Subscribers Collection Notice]:", err);
    return null;
  }
}

export async function addSubscriber(
  email: string,
  source: string = "blog_newsletter"
): Promise<{ subscriber: Subscriber; isNew: boolean }> {
  const cleanEmail = email.trim().toLowerCase();
  const now = new Date().toISOString();

  // 1. Try MongoDB
  const collection = await getMongoCollection();
  if (collection) {
    try {
      const existing = await collection.findOne({ email: cleanEmail });
      if (existing) {
        return {
          subscriber: {
            id: existing.id || String(existing._id),
            email: existing.email,
            source: existing.source || source,
            status: existing.status || "active",
            subscribedAt: existing.subscribedAt || now,
          },
          isNew: false,
        };
      }

      const newSubscriber: Subscriber = {
        id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        email: cleanEmail,
        source,
        status: "active",
        subscribedAt: now,
      };

      await collection.insertOne(newSubscriber as any);
      return { subscriber: newSubscriber, isNew: true };
    } catch (err) {
      console.warn("[MongoDB addSubscriber Error, falling back to local]:", err);
    }
  }

  // 2. Local File / Memory Fallback
  const fileSubscribers = loadSubscribersFromFile();
  const existing = fileSubscribers.find((s) => s.email.toLowerCase() === cleanEmail);
  if (existing) {
    return { subscriber: existing, isNew: false };
  }

  const newSub: Subscriber = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    email: cleanEmail,
    source,
    status: "active",
    subscribedAt: now,
  };

  fileSubscribers.unshift(newSub);
  memorySubscribers = fileSubscribers;
  saveSubscribersToFile(fileSubscribers);

  return { subscriber: newSub, isNew: true };
}

export async function getAllSubscribers(): Promise<Subscriber[]> {
  const collection = await getMongoCollection();
  if (collection) {
    try {
      const docs = await collection.find({}).sort({ subscribedAt: -1 }).toArray();
      return docs.map((d) => ({
        id: d.id || String(d._id),
        email: d.email,
        source: d.source,
        status: d.status,
        subscribedAt: d.subscribedAt,
      }));
    } catch (err) {
      console.warn("[MongoDB getAllSubscribers Error]:", err);
    }
  }

  return loadSubscribersFromFile();
}
