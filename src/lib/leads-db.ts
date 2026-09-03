import fs from "fs";
import path from "path";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  background: string;
  source: string;
  submittedAt: string;
}

// In-memory runtime cache
let memoryLeads: Lead[] = [];

function getStoragePath(): string {
  // Use persistent project directory if writable, otherwise /tmp for serverless Vercel
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

// Initialize memory from file
try {
  memoryLeads = loadLeadsFromFile();
} catch {
  memoryLeads = [];
}

export async function addLead(leadData: Omit<Lead, "id" | "submittedAt">): Promise<Lead> {
  const newLead: Lead = {
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: leadData.name.trim(),
    email: leadData.email.trim().toLowerCase(),
    phone: leadData.phone.trim(),
    course: leadData.course.trim() || "New Age Digital Marketing",
    background: leadData.background?.trim() || "General Inquiry",
    source: leadData.source?.trim() || "Website Form",
    submittedAt: new Date().toISOString(),
  };

  // Prepend new lead
  memoryLeads.unshift(newLead);
  saveLeadsToFile(memoryLeads);

  return newLead;
}

export async function getLeads(): Promise<Lead[]> {
  // Reload to ensure fresh sync
  const fileLeads = loadLeadsFromFile();
  if (fileLeads.length > 0) {
    memoryLeads = fileLeads;
  }
  return memoryLeads;
}

export async function deleteLead(id: string): Promise<boolean> {
  memoryLeads = memoryLeads.filter((l) => l.id !== id);
  saveLeadsToFile(memoryLeads);
  return true;
}
