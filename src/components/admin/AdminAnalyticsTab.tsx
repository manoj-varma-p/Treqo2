"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Users,
  Eye,
  FileCheck,
  TrendingDown,
  TrendingUp,
  RefreshCw,
  Calendar,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Activity,
  Layers,
} from "lucide-react";
import type { AnalyticsSummary } from "@/lib/analytics-db";

interface Props {
  adminPin: string;
}

export default function AdminAnalyticsTab({ adminPin }: Props) {
  const [range, setRange] = useState<"24h" | "7d" | "30d" | "all">("7d");
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/analytics?range=${range}`, {
        headers: { "x-admin-pin": adminPin },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch analytics data");
      }
      const json = await res.json();
      if (json.success && json.summary) {
        setData(json.summary);
      } else {
        throw new Error("Invalid analytics payload");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error loading analytics");
    } finally {
      setLoading(false);
    }
  }, [range, adminPin]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-[#3B0D3B]/10 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#3B0D3B]/10 text-[#3B0D3B] text-[11px] font-bold uppercase tracking-wider mb-1.5">
            <Activity className="h-3.5 w-3.5 text-[#3B0D3B]" />
            <span>Real-Time Funnel Intelligence</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0B0B0F] tracking-tight">
            Visitor &amp; Drop-Off Analytics
          </h2>
          <p className="text-xs sm:text-sm text-[#5A4A5A] mt-0.5">
            Track visitors who viewed courses but dropped off before submitting the application form.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Range Selector */}
          <div className="flex items-center rounded-xl bg-[#FAF5EE] border border-[#3B0D3B]/15 p-1">
            {(["24h", "7d", "30d", "all"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRange(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  range === r
                    ? "bg-[#3B0D3B] text-white shadow-xs"
                    : "text-[#5A4A5A] hover:text-[#0B0B0F]"
                }`}
              >
                {r === "24h" ? "24 Hours" : r === "7d" ? "7 Days" : r === "30d" ? "30 Days" : "All Time"}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={fetchAnalytics}
            disabled={loading}
            className="p-2 rounded-xl border border-[#3B0D3B]/15 bg-white text-[#3B0D3B] hover:bg-[#FAF5EE] transition-all cursor-pointer"
            title="Refresh analytics"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm font-medium">
          {error}
        </div>
      )}

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Page Visitors */}
        <div className="p-5 rounded-2xl bg-white border border-[#3B0D3B]/10 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#8C6A8C]">
            <span className="text-xs font-bold uppercase tracking-wider">Total Visitors</span>
            <Users className="h-4 w-4 text-[#3B0D3B]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#0B0B0F]">
            {loading ? "..." : (data?.totalVisitors ?? 0).toLocaleString()}
          </div>
          <div className="text-[11px] text-[#5A4A5A]">Unique page &amp; route sessions</div>
        </div>

        {/* Form Impressions */}
        <div className="p-5 rounded-2xl bg-white border border-[#3B0D3B]/10 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#8C6A8C]">
            <span className="text-xs font-bold uppercase tracking-wider">Form Views</span>
            <Eye className="h-4 w-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#0B0B0F]">
            {loading ? "..." : (data?.formImpressions ?? 0).toLocaleString()}
          </div>
          <div className="text-[11px] text-[#5A4A5A]">Opened or scrolled to admission form</div>
        </div>

        {/* Total Drop-offs */}
        <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-300 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-amber-800">
            <span className="text-xs font-bold uppercase tracking-wider">Form Drop-Offs</span>
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-950">
            {loading ? "..." : (data?.totalDropOffs ?? 0).toLocaleString()}
          </div>
          <div className="text-[11px] font-semibold text-amber-800">
            {loading ? "..." : `${data?.dropOffRate ?? 0}% abandoned without submitting`}
          </div>
        </div>

        {/* Leads Captured */}
        <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-300 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-emerald-800">
            <span className="text-xs font-bold uppercase tracking-wider">Leads Captured</span>
            <FileCheck className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-950">
            {loading ? "..." : (data?.formSubmissions ?? 0).toLocaleString()}
          </div>
          <div className="text-[11px] font-semibold text-emerald-800">
            {loading ? "..." : `${data?.conversionRate ?? 0}% overall conversion rate`}
          </div>
        </div>
      </div>

      {/* Visual Funnel Breakdown */}
      <div className="p-6 rounded-3xl bg-white border border-[#3B0D3B]/10 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-black text-[#0B0B0F]">
              Conversion &amp; Drop-Off Funnel
            </h3>
            <p className="text-xs text-[#5A4A5A]">
              Stage-by-stage progression from initial landing to final student lead submission.
            </p>
          </div>
          <span className="text-xs font-bold text-[#8C6A8C] bg-[#FAF5EE] px-3 py-1 rounded-full border border-[#3B0D3B]/10">
            Synchronized with Google Analytics 4
          </span>
        </div>

        <div className="space-y-4">
          {data?.funnelSteps.map((step, idx) => {
            const isLast = idx === data.funnelSteps.length - 1;
            return (
              <div key={step.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-bold text-[#0B0B0F]">{step.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-[#0B0B0F]">
                      {step.count.toLocaleString()} ({step.pctOfTotal}%)
                    </span>
                    {!isLast && step.dropOffCount > 0 && (
                      <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                        -{step.dropOffCount} dropped off ({step.dropOffRate}%)
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-3 w-full bg-[#FAF5EE] rounded-full overflow-hidden border border-[#3B0D3B]/10">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      idx === 0
                        ? "bg-[#3B0D3B]"
                        : idx === 1
                        ? "bg-blue-600"
                        : idx === 2
                        ? "bg-purple-600"
                        : "bg-emerald-600"
                    }`}
                    style={{ width: `${Math.max(step.pctOfTotal, 2)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Drop-Off Pages Table */}
      <div className="p-6 rounded-3xl bg-white border border-[#3B0D3B]/10 shadow-xs space-y-4">
        <div>
          <h3 className="text-base sm:text-lg font-black text-[#0B0B0F]">
            Top Pages with Abandoned Leads
          </h3>
          <p className="text-xs text-[#5A4A5A]">
            Pages where users visited and spent time, but left without completing the application.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#3B0D3B]/10 text-[#8C6A8C] uppercase tracking-wider text-[11px] font-bold">
                <th className="py-3 px-3">Page Route</th>
                <th className="py-3 px-3 text-right">Visitors</th>
                <th className="py-3 px-3 text-right">Form Views</th>
                <th className="py-3 px-3 text-right">Submissions</th>
                <th className="py-3 px-3 text-right text-amber-800">Dropped Off</th>
                <th className="py-3 px-3 text-right">Drop-Off %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3B0D3B]/5 font-medium">
              {!data?.topDropOffPages || data.topDropOffPages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#8C6A8C]">
                    No page drop-off events recorded in this period yet.
                  </td>
                </tr>
              ) : (
                data.topDropOffPages.map((p) => (
                  <tr key={p.page} className="hover:bg-[#FAF5EE]/60 transition-colors">
                    <td className="py-3 px-3 font-mono text-[#0B0B0F] font-bold truncate max-w-xs">
                      {p.page}
                    </td>
                    <td className="py-3 px-3 text-right font-mono">{p.visitors}</td>
                    <td className="py-3 px-3 text-right font-mono">{p.formViews}</td>
                    <td className="py-3 px-3 text-right font-mono text-emerald-700 font-bold">{p.submissions}</td>
                    <td className="py-3 px-3 text-right font-mono text-amber-800 font-bold">
                      {p.dropOffs}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-bold ${
                          p.dropOffRate > 80
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {p.dropOffRate}%
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sync Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#3B0D3B] to-[#5A2A5A] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-sm font-bold">Google Analytics 4 &amp; Meta Pixel Synchronized</div>
          <div className="text-xs text-white/80">
            Every page view, form open, and lead submission on Treqo is transmitted in real-time to Google Analytics (`first_visit`, `view_promotion`, `generate_lead`).
          </div>
        </div>
        <a
          href="https://analytics.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-[#3B0D3B] text-xs font-bold hover:bg-[#FAF5EE] transition-all shrink-0 cursor-pointer shadow-md"
        >
          <span>Open Full GA4 Console</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
