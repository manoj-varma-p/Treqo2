"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck, X } from "lucide-react";

interface TrackingConfig {
  cookieBannerEnabled: boolean;
  cookieBannerTitle: string;
  cookieBannerText: string;
  gaMeasurementId: string;
  metaPixelId: string;
}

export default function CookieConsentBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<TrackingConfig>({
    cookieBannerEnabled: true,
    cookieBannerTitle: "We value your privacy",
    cookieBannerText: "We use cookies to analyze website traffic, optimize marketing performance, and personalize course recommendations.",
    gaMeasurementId: "G-BLPP9TW5NP",
    metaPixelId: "",
  });

  useEffect(() => {
    // 1. Fetch live admin tracking config
    fetch("/api/admin/tracking")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          setConfig({
            cookieBannerEnabled: data.settings.cookieBannerEnabled ?? true,
            cookieBannerTitle: data.settings.cookieBannerTitle || "We value your privacy",
            cookieBannerText: data.settings.cookieBannerText || "We use cookies to analyze website traffic, optimize marketing performance, and personalize course recommendations.",
            gaMeasurementId: data.settings.gaMeasurementId || "G-BLPP9TW5NP",
            metaPixelId: data.settings.metaPixelId || "",
          });
        }
      })
      .catch(() => {});

    // 2. Check if user already made a decision
    const saved = localStorage.getItem("treqo_cookie_consent");
    if (!saved) {
      // Delay display slightly so it doesn't jarringly block the initial hero load
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1200);
      return () => clearTimeout(timer);
    } else {
      applyConsent(saved === "accepted");
    }
  }, []);

  function applyConsent(accepted: boolean) {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: accepted ? "granted" : "denied",
        ad_storage: accepted ? "granted" : "denied",
      });
    }
  }

  function handleAccept() {
    localStorage.setItem("treqo_cookie_consent", "accepted");
    applyConsent(true);
    setIsOpen(false);
  }

  function handleDecline() {
    localStorage.setItem("treqo_cookie_consent", "declined");
    applyConsent(false);
    setIsOpen(false);
  }

  if (!isOpen || !config.cookieBannerEnabled) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-fade-up"
    >
      <div className="rounded-2xl border border-white/15 bg-[#0B0B0F]/95 backdrop-blur-xl p-5 text-white shadow-2xl shadow-black/40">
        <div className="flex items-start gap-3.5">
          <div className="h-9 w-9 shrink-0 rounded-xl bg-[#3B0D3B]/80 border border-white/10 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="flex-1 space-y-1.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white tracking-tight">
                {config.cookieBannerTitle}
              </h3>
              <button
                type="button"
                onClick={handleDecline}
                className="text-white/50 hover:text-white transition-colors"
                aria-label="Dismiss cookie notice"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-white/75 leading-relaxed font-normal">
              {config.cookieBannerText}{" "}
              <Link
                href="/privacy-policy"
                className="underline hover:text-white font-medium text-emerald-400"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-2.5 pt-2 border-t border-white/10">
          <button
            type="button"
            onClick={handleDecline}
            className="px-3.5 py-1.5 rounded-xl border border-white/20 text-xs font-semibold text-white/80 hover:bg-white/10 transition-all cursor-pointer"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="px-4 py-1.5 rounded-xl bg-white text-[#0B0B0F] text-xs font-bold hover:bg-[#FDFAF6] transition-all shadow-md active:scale-95 cursor-pointer"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
