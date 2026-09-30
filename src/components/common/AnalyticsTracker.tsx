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

// Check if current user is an admin or browsing in local development
function isInternalUser(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const host = window.location.hostname;
    // Don't track localhost or local loopbacks
    if (host === "localhost" || host === "127.0.0.1" || host.startsWith("192.168.")) {
      return true;
    }
    // Don't track admin users navigating the site
    if (
      window.location.pathname.startsWith("/admin") ||
      localStorage.getItem("treqo_admin_pin") ||
      localStorage.getItem("treqo_admin_authed") === "true"
    ) {
      return true;
    }
  } catch {
    // ignore
  }
  return false;
}

// Generate / retrieve a persistent unique visitor ID (survives tab & browser closes)
function getVisitorIdentity(): { userId: string; isReturning: boolean; visitCount: number; sessionId: string } {
  if (typeof window === "undefined") {
    return { userId: "", isReturning: false, visitCount: 1, sessionId: "" };
  }

  let uid = "";
  let visitCount = 1;
  let isReturning = false;

  try {
    uid = localStorage.getItem("treqo_uid") || "";
    visitCount = parseInt(localStorage.getItem("treqo_vc") || "0", 10);
    const hasActiveSession = sessionStorage.getItem("treqo_session_active");

    if (!uid) {
      uid = `u_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
      localStorage.setItem("treqo_uid", uid);
      visitCount = 1;
      localStorage.setItem("treqo_vc", "1");
      sessionStorage.setItem("treqo_session_active", "1");
      isReturning = false;
    } else {
      if (!hasActiveSession) {
        // New session from an existing known device -> Revisitor!
        visitCount = Math.max(1, visitCount) + 1;
        localStorage.setItem("treqo_vc", visitCount.toString());
        sessionStorage.setItem("treqo_session_active", "1");
      }
      isReturning = visitCount > 1;
    }
  } catch {
    uid = `u_${Date.now().toString(36)}`;
  }

  let sid = "";
  try {
    sid = sessionStorage.getItem("treqo_sid") || "";
    if (!sid) {
      sid = `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
      sessionStorage.setItem("treqo_sid", sid);
    }
  } catch {
    sid = uid;
  }

  return { userId: uid, isReturning, visitCount, sessionId: sid };
}

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string>("");

  // Track page views on route change
  useEffect(() => {
    if (!pathname || pathname === lastTrackedPath.current) return;
    lastTrackedPath.current = pathname;

    // Filter out internal developers and admin routes
    if (isInternalUser()) return;

    const { userId, isReturning, visitCount, sessionId } = getVisitorIdentity();

    // 1. Dispatch to Treqo Internal Analytics
    fetch("/api/analytics/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "page_view",
        page: pathname,
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
        referrer: typeof document !== "undefined" ? document.referrer : "",
        sessionId,
        userId,
        isReturning,
        visitCount,
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
      if (isInternalUser()) return;

      const { userId, isReturning, visitCount, sessionId } = getVisitorIdentity();
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
          sessionId,
          userId,
          isReturning,
          visitCount,
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
