"use client";

import { useEffect, useState } from "react";
import {
  Cookie,
  ShieldCheck,
  Save,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  Code2,
  Sliders,
  Sparkles,
} from "lucide-react";
import type { TrackingSettings } from "@/lib/content-db";

interface Props {
  adminPin: string;
}

export default function AdminCookiesTrackingTab({ adminPin }: Props) {
  const [settings, setSettings] = useState<TrackingSettings>({
    gaMeasurementId: "G-BLPP9TW5NP",
    metaPixelId: "",
    googleTagManagerId: "",
    clarityProjectId: "",
    cookieBannerEnabled: true,
    cookieBannerTitle: "We value your privacy",
    cookieBannerText:
      "We use cookies to analyze website traffic, optimize marketing performance, and personalize course recommendations.",
    analyticsEnabled: true,
    marketingEnabled: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/tracking", {
        headers: { "x-admin-pin": adminPin },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.settings) {
          setSettings(data.settings);
        }
      }
    } catch {
      setError("Failed to load tracking settings");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("/api/admin/tracking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-pin": adminPin,
        },
        body: JSON.stringify(settings),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setMessage("Tracking IDs and Cookie settings updated successfully!");
        setTimeout(() => setMessage(null), 4000);
      } else {
        throw new Error(data.error || "Failed to update tracking settings");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error saving settings");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-[#3B0D3B]/10 shadow-xs">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#3B0D3B]/10 text-[#3B0D3B] text-[11px] font-bold uppercase tracking-wider mb-1.5">
          <Cookie className="h-3.5 w-3.5 text-[#3B0D3B]" />
          <span>Compliance &amp; Tag Manager</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-[#0B0B0F] tracking-tight">
          Cookie Consent &amp; Tracking Configuration
        </h2>
        <p className="text-xs sm:text-sm text-[#5A4A5A] mt-0.5">
          Manage your third-party tracking scripts (GA4, Meta Pixel, Clarity) and customize user cookie consent.
        </p>
      </div>

      {message && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-bold flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Tracking Scripts Section */}
        <div className="p-6 rounded-3xl bg-white border border-[#3B0D3B]/10 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#3B0D3B]/10">
            <Code2 className="h-5 w-5 text-[#3B0D3B]" />
            <div>
              <h3 className="text-base font-black text-[#0B0B0F]">Third-Party Tracking Tags</h3>
              <p className="text-xs text-[#5A4A5A]">
                Enter IDs to automatically inject scripts into the website header.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Google Analytics 4 */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0B0B0F] flex items-center justify-between">
                <span>Google Analytics 4 (GA4) ID</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-100 font-mono px-2 py-0.5 rounded-full font-bold">
                  Active
                </span>
              </label>
              <input
                type="text"
                value={settings.gaMeasurementId}
                onChange={(e) => setSettings({ ...settings, gaMeasurementId: e.target.value })}
                placeholder="G-XXXXXXXXXX"
                className="w-full rounded-xl border border-slate-200 bg-[#FDFAF6] px-4 py-2.5 text-sm font-mono text-[#0B0B0F] focus:border-[#3B0D3B] focus:outline-none"
              />
              <p className="text-[11px] text-[#5A4A5A]">
                Measurement ID from Google Analytics web data stream.
              </p>
            </div>

            {/* Meta (Facebook) Pixel */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0B0B0F]">
                Meta (Facebook) Pixel ID
              </label>
              <input
                type="text"
                value={settings.metaPixelId}
                onChange={(e) => setSettings({ ...settings, metaPixelId: e.target.value })}
                placeholder="e.g. 123456789012345"
                className="w-full rounded-xl border border-slate-200 bg-[#FDFAF6] px-4 py-2.5 text-sm font-mono text-[#0B0B0F] focus:border-[#3B0D3B] focus:outline-none"
              />
              <p className="text-[11px] text-[#5A4A5A]">
                Used to run retargeting ads to visitors who dropped off without applying.
              </p>
            </div>

            {/* Microsoft Clarity */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0B0B0F]">
                Microsoft Clarity Project ID
              </label>
              <input
                type="text"
                value={settings.clarityProjectId}
                onChange={(e) => setSettings({ ...settings, clarityProjectId: e.target.value })}
                placeholder="e.g. k793qvwxyz"
                className="w-full rounded-xl border border-slate-200 bg-[#FDFAF6] px-4 py-2.5 text-sm font-mono text-[#0B0B0F] focus:border-[#3B0D3B] focus:outline-none"
              />
              <p className="text-[11px] text-[#5A4A5A]">
                Enables heatmaps and session replays of user behavior.
              </p>
            </div>

            {/* Google Tag Manager */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0B0B0F]">
                Google Tag Manager (GTM) ID
              </label>
              <input
                type="text"
                value={settings.googleTagManagerId}
                onChange={(e) => setSettings({ ...settings, googleTagManagerId: e.target.value })}
                placeholder="GTM-XXXXXXX"
                className="w-full rounded-xl border border-slate-200 bg-[#FDFAF6] px-4 py-2.5 text-sm font-mono text-[#0B0B0F] focus:border-[#3B0D3B] focus:outline-none"
              />
              <p className="text-[11px] text-[#5A4A5A]">
                Optional GTM container ID if managing tags through Tag Manager.
              </p>
            </div>
          </div>
        </div>

        {/* Cookie Banner Configuration Section */}
        <div className="p-6 rounded-3xl bg-white border border-[#3B0D3B]/10 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#3B0D3B]/10">
            <ShieldCheck className="h-5 w-5 text-[#3B0D3B]" />
            <div>
              <h3 className="text-base font-black text-[#0B0B0F]">Cookie Consent Banner</h3>
              <p className="text-xs text-[#5A4A5A]">
                Controls whether the floating privacy consent popup is displayed on the public website.
              </p>
            </div>
          </div>

          {/* Toggle Banner */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAF5EE] border border-[#3B0D3B]/10">
            <div>
              <div className="text-sm font-bold text-[#0B0B0F]">Enable Cookie Consent Popup</div>
              <div className="text-xs text-[#5A4A5A]">
                Display a non-intrusive floating consent banner to first-time visitors.
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.cookieBannerEnabled}
                onChange={(e) => setSettings({ ...settings, cookieBannerEnabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B0D3B]"></div>
            </label>
          </div>

          {settings.cookieBannerEnabled && (
            <div className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0B0B0F]">Banner Headline</label>
                <input
                  type="text"
                  value={settings.cookieBannerTitle}
                  onChange={(e) => setSettings({ ...settings, cookieBannerTitle: e.target.value })}
                  placeholder="We value your privacy"
                  className="w-full rounded-xl border border-slate-200 bg-[#FDFAF6] px-4 py-2.5 text-sm text-[#0B0B0F] focus:border-[#3B0D3B] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0B0B0F]">Banner Explanation Message</label>
                <textarea
                  rows={3}
                  value={settings.cookieBannerText}
                  onChange={(e) => setSettings({ ...settings, cookieBannerText: e.target.value })}
                  placeholder="We use cookies to analyze traffic and customize recommendations..."
                  className="w-full rounded-xl border border-slate-200 bg-[#FDFAF6] px-4 py-2.5 text-sm text-[#0B0B0F] focus:border-[#3B0D3B] focus:outline-none"
                />
              </div>

              {/* Consent Category Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#3B0D3B]/10 bg-[#FDFAF6]">
                  <div>
                    <span className="text-xs font-bold text-[#0B0B0F]">Analytics Cookies</span>
                    <p className="text-[10px] text-[#5A4A5A]">Google Analytics &amp; Funnel metrics</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.analyticsEnabled}
                    onChange={(e) => setSettings({ ...settings, analyticsEnabled: e.target.checked })}
                    className="h-4 w-4 rounded text-[#3B0D3B] focus:ring-[#3B0D3B]"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#3B0D3B]/10 bg-[#FDFAF6]">
                  <div>
                    <span className="text-xs font-bold text-[#0B0B0F]">Marketing Cookies</span>
                    <p className="text-[10px] text-[#5A4A5A]">Meta Pixel &amp; Retargeting</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.marketingEnabled}
                    onChange={(e) => setSettings({ ...settings, marketingEnabled: e.target.checked })}
                    className="h-4 w-4 rounded text-[#3B0D3B] focus:ring-[#3B0D3B]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Submit Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#3B0D3B] text-white text-xs font-bold hover:bg-[#5A2A5A] transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            <span>{saving ? "Saving Changes..." : "Save Tracking & Cookie Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
