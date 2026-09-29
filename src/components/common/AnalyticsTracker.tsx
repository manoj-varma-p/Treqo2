"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    treqoTrack?: (type: "form_view" | "form_start" | "form_submit", details?: { course?: string; page?: string }) => void;
  }
}

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let sid = sessionStorage.getItem("treqo_sid");
  if (!sid) {
    sid = `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
    sessionStorage.setItem("treqo_sid", sid);
  }
  return sid;
}

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string>("");

  // Track page views on route change
  useEffect(() => {
    if (!pathname || pathname === lastTrackedPath.current) return;
    lastTrackedPath.current = pathname;

    const sid = getSessionId();

    // 1. Dispatch to Treqo Internal Analytics
    fetch("/api/analytics/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "page_view",
        page: pathname,
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
        referrer: typeof document !== "undefined" ? document.referrer : "",
        sessionId: sid,
      }),
    }).catch(() => {});

    // 2. Dispatch to GA4
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: pathname,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [pathname]);

  // Expose global tracker for form interactions
  useEffect(() => {
    window.treqoTrack = (type, details = {}) => {
      const sid = getSessionId();
      const currentPath = window.location.pathname || pathname || "/";
      const courseName = details.course || "";

      // 1. Internal Treqo DB
      fetch("/api/analytics/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          page: details.page || currentPath,
          pageUrl: window.location.href,
          course: courseName,
          sessionId: sid,
        }),
      }).catch(() => {});

      // 2. Google Analytics 4 sync
      if (typeof window.gtag === "function") {
        if (type === "form_view") {
          window.gtag("event", "view_promotion", {
            promotion_name: "Treqo Admission Form",
            creative_slot: currentPath,
            course: courseName,
          });
        } else if (type === "form_start") {
          window.gtag("event", "begin_checkout", {
            item_name: courseName || "Digital Marketing",
            page_path: currentPath,
          });
        } else if (type === "form_submit") {
          window.gtag("event", "generate_lead", {
            currency: "INR",
            value: 55000,
            course_applied: courseName,
            page_path: currentPath,
          });
        }
      }
    };
  }, [pathname]);

  return null;
}
