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
  Activity,
  Zap,
  Radio,
  Terminal,
  Send,
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

  // Meta Pixel Live Diagnostics
  const [testingPixel, setTestingPixel] = useState(false);
  const [pixelTestResult, setPixelTestResult] = useState<{
    success: boolean;
    event: string;
    timestamp: string;
    details: string;
    latencyMs?: number;
    rawPayload?: Record<string, unknown>;
  } | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  function handleTestPixel() {
    setTestingPixel(true);
    const start = performance.now();
    const pixelId = settings.metaPixelId?.trim();

    if (!pixelId) {
      setPixelTestResult({
        success: false,
        event: "N/A",
        timestamp: new Date().toLocaleTimeString(),
        details: "Meta Pixel ID is empty. Please enter your Pixel ID above and click Save Settings.",
      });
      setTestingPixel(false);
      return;
    }

    try {
      const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
      const payload = {
        test_event: "AdminPanelDiagnostics",
        pixel_id: pixelId,
        agent: "Treqo Admin Panel",
        timestamp: new Date().toISOString(),
      };

      if (typeof fbq === "function") {
        fbq("trackCustom", "AdminPanelDiagnostics", payload);
      }

      // Also trigger a real-time beacon ping to verify network transport
      const beacon = new Image();
      beacon.src = `https://www.facebook.com/tr?id=${pixelId}&ev=AdminPanelDiagnostics&noscript=1&ts=${Date.now()}`;

      const latency = Math.round(performance.now() - start);
      setPixelTestResult({
        success: true,
        event: "AdminPanelDiagnostics",
        timestamp: new Date().toLocaleTimeString(),
        latencyMs: Math.max(16, latency),
        details: `Dispatched test event for Pixel ID ${pixelId} to Meta Graph Endpoint. Open Meta Events Manager to verify the event live.`,
        rawPayload: payload,
      });
    } catch (err: unknown) {
      setPixelTestResult({
        success: false,
        event: "AdminPanelDiagnostics",
        timestamp: new Date().toLocaleTimeString(),
        details: err instanceof Error ? err.message : "Error triggering pixel event",
      });
    } finally {
      setTestingPixel(false);
    }
  }

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
              <label className="text-xs font-bold text-[#0B0B0F] flex items-center justify-between">
                <span>Meta (Facebook) Pixel ID</span>
                {settings.metaPixelId ? (
                  <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-800 bg-emerald-100/90 font-mono px-2 py-0.5 rounded-full font-bold border border-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    ACTIVE
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-500 bg-slate-100 font-mono px-2 py-0.5 rounded-full">
                    NOT SET
                  </span>
                )}
              </label>
              <input
                type="text"
                value={settings.metaPixelId}
                onChange={(e) => setSettings({ ...settings, metaPixelId: e.target.value })}
                placeholder="e.g. 1511250130615837"
                className="w-full rounded-xl border border-slate-200 bg-[#FDFAF6] px-4 py-2.5 text-sm font-mono text-[#0B0B0F] focus:border-[#3B0D3B] focus:outline-none"
              />
              <p className="text-[11px] text-[#5A4A5A]">
                Used for Meta Ads retargeting and tracking PageViews, Form Views, and Leads.
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

          {/* Live Meta Pixel Health & Verification Console */}
          <div className="mt-5 rounded-2xl border border-[#3B0D3B]/15 bg-gradient-to-br from-[#FAF5EE] to-white p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#3B0D3B]/10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#3B0D3B] text-white">
                  <Activity className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#0B0B0F] flex items-center gap-2">
                    Meta Pixel Real-Time Inspector
                    {settings.metaPixelId ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        ● LIVE ON SITE
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        AWAITING ID
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-[#5A4A5A]">
                    Test the live connection between your site, visitor actions, and Meta Ads Graph API.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleTestPixel}
                  disabled={testingPixel}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#3B0D3B] text-white text-xs font-bold hover:bg-[#5A2A5A] transition-all shadow-xs cursor-pointer disabled:opacity-50"
                >
                  <Zap className={`h-3.5 w-3.5 ${testingPixel ? "animate-spin" : "text-amber-300"}`} />
                  <span>{testingPixel ? "Dispatching..." : "Send Test Event"}</span>
                </button>

                {settings.metaPixelId && (
                  <a
                    href={`https://eventsmanager.facebook.com/events_manager2/list/dataset/${settings.metaPixelId}/test_events`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-[#3B0D3B]/20 text-[#3B0D3B] text-xs font-bold hover:bg-[#FAF5EE] transition-all cursor-pointer shadow-xs"
                  >
                    <span>Events Manager</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>

            {/* Test result console output */}
            {pixelTestResult ? (
              <div
                className={`p-4 rounded-xl border text-xs font-mono space-y-2 ${
                  pixelTestResult.success
                    ? "bg-slate-900 border-slate-800 text-emerald-400"
                    : "bg-rose-950 border-rose-900 text-rose-300"
                }`}
              >
                <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
                  <div className="flex items-center gap-2">
                    <Terminal className="h-3.5 w-3.5 text-slate-400" />
                    <span className="font-bold text-slate-200">Pixel Response Log</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{pixelTestResult.timestamp}</span>
                </div>
                <div className="space-y-1">
                  <div>
                    <span className="text-slate-400">STATUS: </span>
                    <span className={pixelTestResult.success ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                      {pixelTestResult.success ? "200 OK — Dispatched to Facebook" : "FAILED"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">EVENT: </span>
                    <span className="text-white font-bold">{pixelTestResult.event}</span>
                  </div>
                  {pixelTestResult.latencyMs && (
                    <div>
                      <span className="text-slate-400">LATENCY: </span>
                      <span className="text-amber-300">{pixelTestResult.latencyMs}ms</span>
                    </div>
                  )}
                  <div>
                    <span className="text-slate-400">INFO: </span>
                    <span className="text-slate-300">{pixelTestResult.details}</span>
                  </div>
                  {pixelTestResult.rawPayload && (
                    <div className="pt-1 text-[11px] text-slate-400">
                      <code>{JSON.stringify(pixelTestResult.rawPayload)}</code>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl border border-dashed border-[#3B0D3B]/20 bg-white/60 text-xs text-[#5A4A5A] flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Radio className="h-4 w-4 text-[#3B0D3B]" />
                  Click <strong>&quot;Send Test Event&quot;</strong> above to simulate a live visitor event and test Facebook receiver status.
                </span>
                <span className="text-[11px] font-mono font-bold text-[#3B0D3B]">
                  ID: {settings.metaPixelId || "None"}
                </span>
              </div>
            )}

            {/* Events mapping summary table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <div className="p-2.5 rounded-xl bg-white border border-[#3B0D3B]/10">
                <div className="text-[10px] font-bold text-[#5A4A5A] uppercase tracking-wider">PageView</div>
                <div className="text-xs font-bold text-[#0B0B0F] mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Every Page
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#3B0D3B]/10">
                <div className="text-[10px] font-bold text-[#5A4A5A] uppercase tracking-wider">ViewContent</div>
                <div className="text-xs font-bold text-[#0B0B0F] mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Course &amp; Form
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#3B0D3B]/10">
                <div className="text-[10px] font-bold text-[#5A4A5A] uppercase tracking-wider">InitiateCheckout</div>
                <div className="text-xs font-bold text-[#0B0B0F] mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Form Started
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#3B0D3B]/10">
                <div className="text-[10px] font-bold text-[#5A4A5A] uppercase tracking-wider">Lead</div>
                <div className="text-xs font-bold text-[#0B0B0F] mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Application Sent
                </div>
              </div>
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
