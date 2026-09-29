import fs from "fs";
import path from "path";
import { getMongoDb } from "./mongodb";

export interface AnalyticsEvent {
  id: string;
  type: "page_view" | "form_view" | "form_start" | "form_submit";
  page: string;
  pageUrl?: string;
  course?: string;
  referrer?: string;
  sessionId?: string;
  timestamp: string;
}

export interface FunnelStep {
  name: string;
  count: number;
  pctOfTotal: number;
  dropOffCount: number;
  dropOffRate: number;
}

export interface PageDropOff {
  page: string;
  visitors: number;
  formViews: number;
  submissions: number;
  dropOffs: number;
  dropOffRate: number;
}

export interface DailyMetric {
  date: string;
  visitors: number;
  formViews: number;
  submissions: number;
  dropOffs: number;
}

export interface AnalyticsSummary {
  totalVisitors: number;
  uniqueSessions: number;
  formImpressions: number;
  formStarts: number;
  formSubmissions: number;
  totalDropOffs: number;
  dropOffRate: number;
  conversionRate: number;
  funnelSteps: FunnelStep[];
  topDropOffPages: PageDropOff[];
  dailyTrend: DailyMetric[];
}

function getStoragePath(): string {
  const localDir = path.join(process.cwd(), "data");
  try {
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    return path.join(localDir, "analytics_events.json");
  } catch {
    return path.join("/tmp", "treqo_analytics_events.json");
  }
}

function loadEventsFromFile(): AnalyticsEvent[] {
  try {
    const filePath = getStoragePath();
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(data) || [];
    }
  } catch (err) {
    console.error("[Analytics Read Error]:", err);
  }
  return [];
}

function saveEventsToFile(events: AnalyticsEvent[]) {
  try {
    const filePath = getStoragePath();
    // Keep max 10,000 recent events in local storage to keep file light
    const trimmed = events.slice(0, 10000);
    fs.writeFileSync(filePath, JSON.stringify(trimmed, null, 2), "utf-8");
  } catch (err) {
    console.error("[Analytics Write Error]:", err);
  }
}

let inMemoryEvents: AnalyticsEvent[] = [];
try {
  inMemoryEvents = loadEventsFromFile();
} catch {
  inMemoryEvents = [];
}

export async function recordAnalyticsEvent(
  data: Omit<AnalyticsEvent, "id" | "timestamp">
): Promise<AnalyticsEvent> {
  const event: AnalyticsEvent = {
    id: `ev_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    type: data.type,
    page: data.page || "/",
    pageUrl: data.pageUrl || "",
    course: data.course || "",
    referrer: data.referrer || "",
    sessionId: data.sessionId || `sess_${Date.now().toString(36)}`,
    timestamp: new Date().toISOString(),
  };

  // Try MongoDB
  try {
    const db = await getMongoDb();
    if (db) {
      await db.collection("analytics_events").insertOne({ ...event });
    }
  } catch (err) {
    console.warn("[MongoDB Analytics Insert Error]:", err);
  }

  // File fallback
  inMemoryEvents.unshift(event);
  if (inMemoryEvents.length % 5 === 0) {
    saveEventsToFile(inMemoryEvents);
  }

  return event;
}

export async function getAnalyticsSummary(timeRange: "24h" | "7d" | "30d" | "all" = "7d"): Promise<AnalyticsSummary> {
  let allEvents: AnalyticsEvent[] = [];

  // Attempt fetch from Mongo
  try {
    const db = await getMongoDb();
    if (db) {
      const docs = await db
        .collection("analytics_events")
        .find({})
        .sort({ timestamp: -1 })
        .limit(10000)
        .toArray();

      if (docs && docs.length > 0) {
        allEvents = docs.map((d) => ({
          id: d.id || String(d._id),
          type: d.type,
          page: d.page,
          pageUrl: d.pageUrl,
          course: d.course,
          referrer: d.referrer,
          sessionId: d.sessionId,
          timestamp: d.timestamp,
        }));
      }
    }
  } catch (err) {
    console.warn("[MongoDB Analytics Summary Fetch Notice]:", err);
  }

  if (allEvents.length === 0) {
    allEvents = inMemoryEvents.length > 0 ? inMemoryEvents : loadEventsFromFile();
  }

  // Filter by time range
  const now = Date.now();
  const timeThresholds: Record<string, number> = {
    "24h": 24 * 60 * 60 * 1000,
    "7d": 7 * 24 * 60 * 60 * 1000,
    "30d": 30 * 24 * 60 * 60 * 1000,
    all: Infinity,
  };
  const maxAgeMs = timeThresholds[timeRange] ?? timeThresholds["7d"];
  const events = allEvents.filter((e) => {
    const age = now - new Date(e.timestamp).getTime();
    return age <= maxAgeMs;
  });

  const pageViews = events.filter((e) => e.type === "page_view");
  const formViews = events.filter((e) => e.type === "form_view");
  const formStarts = events.filter((e) => e.type === "form_start");
  const formSubmits = events.filter((e) => e.type === "form_submit");

  const uniqueSessions = new Set(events.map((e) => e.sessionId || e.id)).size;
  const totalVisitors = Math.max(pageViews.length, uniqueSessions);
  const formImpressions = formViews.length;
  const formStartsCount = formStarts.length;
  const formSubmissions = formSubmits.length;

  // Drop-offs: visitors who visited or opened form but never submitted
  const totalDropOffs = Math.max(0, totalVisitors - formSubmissions);
  const dropOffRate = totalVisitors > 0 ? Number(((totalDropOffs / totalVisitors) * 100).toFixed(1)) : 0;
  const conversionRate = totalVisitors > 0 ? Number(((formSubmissions / totalVisitors) * 100).toFixed(1)) : 0;

  // Funnel steps calculation
  const funnelSteps: FunnelStep[] = [
    {
      name: "1. Page Visitors",
      count: totalVisitors,
      pctOfTotal: 100,
      dropOffCount: Math.max(0, totalVisitors - formImpressions),
      dropOffRate: totalVisitors > 0 ? Number((((totalVisitors - formImpressions) / totalVisitors) * 100).toFixed(1)) : 0,
    },
    {
      name: "2. Form Viewed / Opened",
      count: formImpressions,
      pctOfTotal: totalVisitors > 0 ? Number(((formImpressions / totalVisitors) * 100).toFixed(1)) : 0,
      dropOffCount: Math.max(0, formImpressions - formSubmissions),
      dropOffRate: formImpressions > 0 ? Number((((formImpressions - formSubmissions) / formImpressions) * 100).toFixed(1)) : 0,
    },
    {
      name: "3. Form Started Typing",
      count: formStartsCount,
      pctOfTotal: totalVisitors > 0 ? Number(((formStartsCount / totalVisitors) * 100).toFixed(1)) : 0,
      dropOffCount: Math.max(0, formStartsCount - formSubmissions),
      dropOffRate: formStartsCount > 0 ? Number((((formStartsCount - formSubmissions) / formStartsCount) * 100).toFixed(1)) : 0,
    },
    {
      name: "4. Form Submitted (Lead)",
      count: formSubmissions,
      pctOfTotal: totalVisitors > 0 ? Number(((formSubmissions / totalVisitors) * 100).toFixed(1)) : 0,
      dropOffCount: 0,
      dropOffRate: 0,
    },
  ];

  // Top Drop-Off Pages breakdown
  const pagesMap = new Map<string, { visitors: number; formViews: number; submissions: number }>();
  for (const ev of events) {
    const rawPage = ev.page || "/";
    const current = pagesMap.get(rawPage) || { visitors: 0, formViews: 0, submissions: 0 };
    if (ev.type === "page_view") current.visitors++;
    if (ev.type === "form_view") current.formViews++;
    if (ev.type === "form_submit") current.submissions++;
    pagesMap.set(rawPage, current);
  }

  const topDropOffPages: PageDropOff[] = Array.from(pagesMap.entries())
    .map(([page, stats]) => {
      const dropOffs = Math.max(0, stats.visitors - stats.submissions);
      const rate = stats.visitors > 0 ? Number(((dropOffs / stats.visitors) * 100).toFixed(1)) : 0;
      return {
        page,
        visitors: stats.visitors,
        formViews: stats.formViews,
        submissions: stats.submissions,
        dropOffs,
        dropOffRate: rate,
      };
    })
    .sort((a, b) => b.dropOffs - a.dropOffs)
    .slice(0, 10);

  // Daily trend aggregation
  const dailyMap = new Map<string, { visitors: number; formViews: number; submissions: number }>();
  for (const ev of events) {
    const dateKey = ev.timestamp ? ev.timestamp.slice(0, 10) : new Date().toISOString().slice(0, 10);
    const curr = dailyMap.get(dateKey) || { visitors: 0, formViews: 0, submissions: 0 };
    if (ev.type === "page_view") curr.visitors++;
    if (ev.type === "form_view") curr.formViews++;
    if (ev.type === "form_submit") curr.submissions++;
    dailyMap.set(dateKey, curr);
  }

  const dailyTrend: DailyMetric[] = Array.from(dailyMap.entries())
    .map(([date, counts]) => ({
      date,
      visitors: counts.visitors,
      formViews: counts.formViews,
      submissions: counts.submissions,
      dropOffs: Math.max(0, counts.visitors - counts.submissions),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return {
    totalVisitors,
    uniqueSessions,
    formImpressions,
    formStarts: formStartsCount,
    formSubmissions,
    totalDropOffs,
    dropOffRate,
    conversionRate,
    funnelSteps,
    topDropOffPages,
    dailyTrend,
  };
}
