"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  Users,
  Download,
  Search,
  RefreshCw,
  Mail,
  Phone,
  Calendar,
  Sparkles,
  Trash2,
  CheckCircle2,
  Filter,
  ArrowLeft,
} from "lucide-react";
import type { Lead } from "@/lib/leads-db";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function fetchLeads() {
    setLoading(true);
    try {
      const res = await fetch("/api/leads");
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
      }
    } catch (err) {
      console.error("Failed to load leads:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLeads();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    try {
      const res = await fetch(`/api/leads?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }

  function handleCopy(text: string, id: string) {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  // Calculate Stats
  const stats = useMemo(() => {
    const total = leads.length;
    const today = new Date().toISOString().split("T")[0];
    const todayCount = leads.filter((l) => l.submittedAt.startsWith(today)).length;
    const flagshipCount = leads.filter((l) =>
      l.course.toLowerCase().includes("digital marketing")
    ).length;
    return { total, todayCount, flagshipCount };
  }, [leads]);

  // Unique course list for filtering
  const coursesList = useMemo(() => {
    const set = new Set(leads.map((l) => l.course).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [leads]);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      const matchesSearch =
        searchQuery === "" ||
        l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.phone.includes(searchQuery);

      const matchesCourse =
        selectedCourse === "All" || l.course === selectedCourse;

      return matchesSearch && matchesCourse;
    });
  }, [leads, searchQuery, selectedCourse]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Website
              </Link>
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <span>TREQO Leads Database</span>
              <span className="rounded-full bg-[#3A1494] px-3 py-1 text-xs font-bold text-white">
                {leads.length} Total
              </span>
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Real-time applications captured from website forms and Batch 2 modal.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchLeads}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-700 active:scale-95 transition-all cursor-pointer"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>

            <a
              href="/api/leads?format=csv"
              download
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4.5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-emerald-500 active:scale-95 transition-all cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>Export to Excel (CSV)</span>
            </a>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-800/40 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total Applications
            </p>
            <p className="mt-2 text-3xl font-black text-white">{stats.total}</p>
            <p className="mt-1 text-xs text-slate-500">Stored in database</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-800/40 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Today&apos;s Inquiries
            </p>
            <p className="mt-2 text-3xl font-black text-emerald-400">{stats.todayCount}</p>
            <p className="mt-1 text-xs text-slate-500">New leads today</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-800/40 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Digital Marketing Flagship
            </p>
            <p className="mt-2 text-3xl font-black text-[#FBBF24]">{stats.flagshipCount}</p>
            <p className="mt-1 text-xs text-slate-500">Flagship track inquiries</p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or phone..."
              className="w-full rounded-xl border border-slate-700 bg-slate-800/60 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:border-[#3A1494] focus:outline-none focus:ring-2 focus:ring-[#3A1494]/30"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="h-4 w-4 text-slate-400 shrink-0" />
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full sm:w-auto rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-xs sm:text-sm text-slate-200 focus:border-[#3A1494] focus:outline-none focus:ring-2 focus:ring-[#3A1494]/30 cursor-pointer"
            >
              {coursesList.map((c) => (
                <option key={c} value={c} className="bg-slate-900 text-white">
                  {c === "All" ? "All Programs" : c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Leads Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-800/40 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300">
              <thead className="bg-slate-800/90 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-700">
                <tr>
                  <th className="py-4 px-4 sm:px-6">Timestamp</th>
                  <th className="py-4 px-4 sm:px-6">Applicant</th>
                  <th className="py-4 px-4 sm:px-6">Phone</th>
                  <th className="py-4 px-4 sm:px-6">Program / Course</th>
                  <th className="py-4 px-4 sm:px-6">Background</th>
                  <th className="py-4 px-4 sm:px-6">Source</th>
                  <th className="py-4 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500">
                      {loading ? "Loading database..." : "No lead records found."}
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="hover:bg-slate-800/60 transition-colors"
                    >
                      {/* Timestamp */}
                      <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-xs text-slate-400 font-mono">
                        {new Date(lead.submittedAt).toLocaleString("en-IN", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>

                      {/* Name & Email */}
                      <td className="py-4 px-4 sm:px-6">
                        <p className="font-bold text-white">{lead.name}</p>
                        <button
                          type="button"
                          onClick={() => handleCopy(lead.email, `email_${lead.id}`)}
                          className="mt-0.5 inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 transition-colors"
                          title="Click to copy email"
                        >
                          <Mail className="h-3 w-3" />
                          <span>{lead.email}</span>
                          {copiedId === `email_${lead.id}` && (
                            <span className="text-[10px] text-emerald-400 font-bold ml-1">Copied!</span>
                          )}
                        </button>
                      </td>

                      {/* Phone */}
                      <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                        <a
                          href={`tel:${lead.phone.replace(/\s+/g, "")}`}
                          className="inline-flex items-center gap-1.5 font-semibold text-emerald-400 hover:underline"
                        >
                          <Phone className="h-3.5 w-3.5" />
                          <span>{lead.phone}</span>
                        </a>
                      </td>

                      {/* Course */}
                      <td className="py-4 px-4 sm:px-6">
                        <span className="inline-flex items-center rounded-lg bg-[#3A1494]/30 border border-[#3A1494]/50 px-2.5 py-1 text-xs font-semibold text-indigo-300">
                          {lead.course}
                        </span>
                      </td>

                      {/* Background */}
                      <td className="py-4 px-4 sm:px-6 text-xs text-slate-300">
                        {lead.background}
                      </td>

                      {/* Source */}
                      <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-xs text-slate-400">
                        <span className="rounded-md bg-slate-700/60 px-2 py-0.5 text-[11px] font-medium text-slate-300">
                          {lead.source}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleDelete(lead.id)}
                          className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                          title="Delete record"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
