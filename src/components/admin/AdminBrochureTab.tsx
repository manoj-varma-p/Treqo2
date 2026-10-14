"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FileText,
  Upload,
  Download,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Database,
  ExternalLink,
  ShieldCheck,
  FileCheck,
  Layers,
  ArrowRight,
} from "lucide-react";

interface BrochureMeta {
  filename: string;
  originalName: string;
  size: number;
  updatedAt: string;
  storedInMongo: boolean;
  downloadUrl: string;
}

interface Props {
  adminPin: string;
  onNavigateToCourses?: () => void;
}

export default function AdminBrochureTab({ adminPin, onNavigateToCourses }: Props) {
  const [meta, setMeta] = useState<BrochureMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    fetchBrochureMeta();
  }, []);

  async function fetchBrochureMeta() {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/brochure?_t=${Date.now()}`, {
        cache: "no-store",
      });
      const data = await res.json();
      if (data.success && data.brochure) {
        setMeta(data.brochure);
      }
    } catch (err) {
      console.error("Failed to load brochure metadata:", err);
    } finally {
      setIsLoading(false);
    }
  }

  function formatBytes(bytes: number, decimals = 2) {
    if (!bytes || bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  function handleFileSelected(file: File) {
    setFeedback(null);
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setFeedback({ type: "error", message: "Only PDF documents (.pdf) are supported." });
      return;
    }
    const MAX_SIZE = 50 * 1024 * 1024; // 50MB
    if (file.size > MAX_SIZE) {
      setFeedback({ type: "error", message: "File exceeds 50MB limit." });
      return;
    }
    setSelectedFile(file);
  }

  async function handleUpload() {
    if (!selectedFile) return;
    setIsUploading(true);
    setFeedback(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch("/api/admin/brochure", {
        method: "POST",
        headers: {
          "x-admin-pin": adminPin,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to upload brochure");
      }

      setFeedback({
        type: "success",
        message: `Success! New curriculum "${data.brochure?.originalName || selectedFile.name}" (${formatBytes(selectedFile.size)}) has been saved to MongoDB & deployed live.`,
      });
      setSelectedFile(null);
      await fetchBrochureMeta();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to upload file";
      setFeedback({ type: "error", message });
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-200">
      {/* Header Info */}
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B0D3B]/10 border border-[#3B0D3B]/20 text-[11px] font-bold text-[#3B0D3B] uppercase tracking-wider">
          <FileText className="h-3.5 w-3.5" />
          <span>Curriculum &amp; Syllabus Document Hub</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#0B0B0F] tracking-tight">
          Curriculum &amp; Brochure PDF Manager
        </h2>
        <p className="text-xs sm:text-sm text-[#5A4A5A] leading-relaxed">
          Manage and replace the official course syllabus PDF. Whenever a student clicks <strong>“Download Syllabus”</strong> or <strong>“Download Brochure”</strong> on the homepage, course pages, or popup forms, this exact file is instantly served.
        </p>
      </div>

      {/* Toast Feedback */}
      {feedback && (
        <div
          className={`flex items-start gap-3 rounded-2xl p-4 text-xs font-semibold shadow-sm transition-all ${
            feedback.type === "success"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-900"
              : "bg-red-50 border border-red-200 text-red-900"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <span className="block font-bold">{feedback.type === "success" ? "Updated Successfully" : "Upload Error"}</span>
            <span className="text-[11px] opacity-90 leading-relaxed">{feedback.message}</span>
          </div>
        </div>
      )}

      {/* Main Grid: Current File Card + Upload New Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Currently Live Brochure */}
        <div className="rounded-3xl border border-[#3B0D3B]/15 bg-white p-6 sm:p-7 shadow-xs space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#3B0D3B]/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-sm font-bold text-[#0B0B0F] uppercase tracking-wider">
                  Live Active Syllabus
                </h3>
              </div>
              <button
                type="button"
                onClick={fetchBrochureMeta}
                disabled={isLoading}
                className="text-[#8C6A8C] hover:text-[#3B0D3B] p-1 rounded-lg transition-colors cursor-pointer"
                title="Refresh File Info"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              </button>
            </div>

            {isLoading ? (
              <div className="py-12 flex flex-col items-center justify-center gap-2 text-center text-[#5A4A5A]">
                <RefreshCw className="h-6 w-6 animate-spin text-[#3B0D3B]" />
                <span className="text-xs font-semibold">Reading curriculum metadata...</span>
              </div>
            ) : meta ? (
              <div className="space-y-4">
                <div className="flex items-start gap-3.5 bg-[#FAF5EE]/70 p-4 rounded-2xl border border-[#3B0D3B]/10">
                  <div className="h-12 w-12 rounded-xl bg-[#3B0D3B] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="font-bold text-sm text-[#0B0B0F] truncate" title={meta.originalName}>
                      {meta.originalName || meta.filename}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#5A4A5A]">
                      <span className="font-mono font-semibold text-[#3B0D3B] bg-white px-2 py-0.5 rounded-md border border-[#3B0D3B]/10">
                        {formatBytes(meta.size)}
                      </span>
                      {meta.storedInMongo && (
                        <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          <Database className="h-3 w-3" />
                          <span>MongoDB GridFS</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-[#5A4A5A] bg-[#FAF5EE]/30 p-3.5 rounded-xl border border-[#3B0D3B]/10">
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#8C6A8C]">Last Updated:</span>
                    <span className="font-medium text-[#0B0B0F]">
                      {meta.updatedAt
                        ? new Date(meta.updatedAt).toLocaleString("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })
                        : "Synchronized"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#8C6A8C]">Public Live URL:</span>
                    <span className="font-mono text-[11px] text-[#3B0D3B]">/brochure</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#8C6A8C]">Browser Cache:</span>
                    <span className="font-semibold text-emerald-700">Strict Cache-Busted</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-[#5A4A5A]">
                No syllabus metadata found. Upload a PDF using the form on the right.
              </div>
            )}
          </div>

          <div className="pt-2">
            <a
              href="/brochure"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-[#3B0D3B]/20 hover:bg-[#FAF5EE] hover:border-[#3B0D3B] text-[#3B0D3B] py-3 text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>Test Download Live Curriculum PDF</span>
              <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
          </div>
        </div>

        {/* Card 2: Upload & Replace Form */}
        <div className="rounded-3xl border border-[#3B0D3B]/15 bg-white p-6 sm:p-7 shadow-xs space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#3B0D3B]/10 pb-3">
              <h3 className="text-sm font-bold text-[#0B0B0F] uppercase tracking-wider flex items-center gap-2">
                <Upload className="h-4 w-4 text-[#3B0D3B]" />
                <span>Replace Curriculum PDF</span>
              </h3>
              <span className="text-[10px] font-bold text-[#8C6A8C] uppercase tracking-wider">
                Max 50MB · PDF
              </span>
            </div>

            {/* Hidden Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFileSelected(f);
                e.target.value = "";
              }}
            />

            {/* Drop Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragActive(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setIsDragActive(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragActive(false);
                const f = e.dataTransfer.files?.[0];
                if (f) handleFileSelected(f);
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 min-h-[170px] ${
                isDragActive
                  ? "border-[#3B0D3B] bg-[#FAF5EE] scale-[1.01]"
                  : selectedFile
                  ? "border-emerald-500 bg-emerald-50/50"
                  : "border-[#3B0D3B]/20 bg-[#FAF5EE]/40 hover:bg-[#FAF5EE] hover:border-[#3B0D3B]"
              }`}
            >
              {selectedFile ? (
                <>
                  <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <FileCheck className="h-5 w-5" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-[#0B0B0F] max-w-[260px] truncate">
                      {selectedFile.name}
                    </div>
                    <div className="text-[11px] text-[#5A4A5A]">
                      {formatBytes(selectedFile.size)} · Ready to upload
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#3B0D3B] underline mt-1">
                    Click to choose different file
                  </span>
                </>
              ) : (
                <>
                  <div className="h-10 w-10 rounded-xl bg-[#3B0D3B]/10 text-[#3B0D3B] flex items-center justify-center">
                    <Upload className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#0B0B0F] block">
                      Click to upload new syllabus PDF
                    </span>
                    <span className="text-[11px] text-[#5A4A5A]">
                      or drag and drop your file here
                    </span>
                  </div>
                </>
              )}
            </div>

            <p className="text-[11px] text-[#5A4A5A] leading-relaxed">
              Replacing the brochure saves the new PDF directly into MongoDB GridFS and updates the server stream. All future student downloads immediately download the new document.
            </p>
          </div>

          <div className="pt-2 flex items-center gap-2.5">
            {selectedFile && (
              <button
                type="button"
                onClick={() => setSelectedFile(null)}
                disabled={isUploading}
                className="px-4 py-3 rounded-xl border border-[#3B0D3B]/15 text-xs font-semibold text-[#5A4A5A] hover:bg-[#FAF5EE] transition-colors cursor-pointer"
              >
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#3B0D3B] hover:bg-[#2A082A] text-white py-3 text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Uploading to Database...</span>
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  <span>Deploy New Curriculum PDF</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Cross-Link Card: Edit Text Phases in Course Studio */}
      <div className="rounded-3xl border border-[#3B0D3B]/10 bg-gradient-to-r from-[#FAF5EE] to-[#F5EDE0] p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[#3B0D3B] uppercase tracking-wider">
            <Layers className="h-4 w-4" />
            <span>Looking to edit the 12 text curriculum modules?</span>
          </div>
          <p className="text-xs text-[#5A4A5A] leading-relaxed max-w-xl">
            To edit the syllabus text, phase titles, and module deliverables displayed directly on the webpage accordion, open the Courses Studio.
          </p>
        </div>
        {onNavigateToCourses && (
          <button
            type="button"
            onClick={onNavigateToCourses}
            className="rounded-xl bg-[#3B0D3B] text-white px-4 py-2.5 text-xs font-bold hover:bg-[#2A082A] transition-all shadow-sm flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <span>Open Course Studio</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
