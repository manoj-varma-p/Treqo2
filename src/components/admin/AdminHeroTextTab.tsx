"use client";

import { useState, useEffect } from "react";
import {
  Save,
  Plus,
  Trash2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Eye,
  Type,
  Link as LinkIcon,
  BarChart3,
  Video,
  ArrowUpRight,
} from "lucide-react";
import type { HomePageContent, HeroContent } from "@/lib/content-db";

interface Props {
  initialContent: HomePageContent;
  adminPin: string;
  onSaved: (updated: HomePageContent) => void;
}

export default function AdminHeroTextTab({ initialContent, adminPin, onSaved }: Props) {
  // Hero text state
  const [eyebrow, setEyebrow] = useState(
    initialContent?.hero?.eyebrow || "COHORT ADMISSIONS OPEN · 2026"
  );
  const [headlineLines, setHeadlineLines] = useState<string[]>(
    initialContent?.hero?.headlineLines && initialContent.hero.headlineLines.length > 0
      ? initialContent.hero.headlineLines
      : ["Leave with Skills", "you can implement.", "Not just a certificate"]
  );
  const [description, setDescription] = useState(
    initialContent?.hero?.description ||
      "Build practical marketing skills by working on real business problems, campaigns, and measurable projects, not just watching tutorials."
  );
  const [highlightText, setHighlightText] = useState(
    initialContent?.hero?.highlightText || "Online or Offline. Choose What Works for You."
  );
  const [primaryCtaLabel, setPrimaryCtaLabel] = useState(
    initialContent?.hero?.primaryCtaLabel || "Browse Courses"
  );
  const [primaryCtaHref, setPrimaryCtaHref] = useState(
    initialContent?.hero?.primaryCtaHref || "#courses"
  );
  const [secondaryCtaLabel, setSecondaryCtaLabel] = useState(
    initialContent?.hero?.secondaryCtaLabel || "Book a demo"
  );
  const [watchVideoLabel, setWatchVideoLabel] = useState(
    initialContent?.hero?.watchVideoLabel || "Watch Video"
  );

  // Stats state
  const [stats, setStats] = useState(
    initialContent?.stats && initialContent.stats.length > 0
      ? initialContent.stats
      : [
          { value: "100%", label: "Live Brand Work", detail: "Real ad spends, not simulations" },
          { value: "12", label: "Structured Phases", detail: "Zero to full-stack marketer" },
          { value: "1:1", label: "Direct Mentorship", detail: "Every student assigned a coach" },
          { value: "30+", label: "Verified Tools", detail: "Hands-on mastery guaranteed" },
        ]
  );

  const [isSaving, setIsSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  // Sync if initialContent updates
  useEffect(() => {
    if (initialContent?.hero) {
      if (initialContent.hero.eyebrow !== undefined) setEyebrow(initialContent.hero.eyebrow);
      if (initialContent.hero.headlineLines) setHeadlineLines(initialContent.hero.headlineLines);
      if (initialContent.hero.description !== undefined) setDescription(initialContent.hero.description);
      if (initialContent.hero.highlightText !== undefined) setHighlightText(initialContent.hero.highlightText);
      if (initialContent.hero.primaryCtaLabel !== undefined) setPrimaryCtaLabel(initialContent.hero.primaryCtaLabel);
      if (initialContent.hero.primaryCtaHref !== undefined) setPrimaryCtaHref(initialContent.hero.primaryCtaHref);
      if (initialContent.hero.secondaryCtaLabel !== undefined) setSecondaryCtaLabel(initialContent.hero.secondaryCtaLabel);
      if (initialContent.hero.watchVideoLabel !== undefined) setWatchVideoLabel(initialContent.hero.watchVideoLabel);
    }
    if (initialContent?.stats) {
      setStats(initialContent.stats);
    }
  }, [initialContent]);

  // Headline line handlers
  function handleAddHeadlineLine() {
    setHeadlineLines((prev) => [...prev, "New headline line"]);
  }

  function handleHeadlineLineChange(index: number, value: string) {
    setHeadlineLines((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  }

  function handleRemoveHeadlineLine(index: number) {
    if (headlineLines.length <= 1) return;
    setHeadlineLines((prev) => prev.filter((_, i) => i !== index));
  }

  // Stat item handlers
  function handleStatChange(index: number, field: "value" | "label" | "detail", text: string) {
    setStats((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: text };
      return updated;
    });
  }

  function handleAddStat() {
    setStats((prev) => [...prev, { value: "NEW", label: "Metric Title", detail: "Short context" }]);
  }

  function handleRemoveStat(index: number) {
    if (stats.length <= 1) return;
    setStats((prev) => prev.filter((_, i) => i !== index));
  }

  // Save handler
  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    setStatusMsg(null);

    const updatedHero: HeroContent = {
      ...(initialContent?.hero || {}),
      eyebrow: eyebrow.trim(),
      headlineLines: headlineLines.map((l) => l.trim()).filter(Boolean),
      description: description.trim(),
      highlightText: highlightText.trim(),
      primaryCtaLabel: primaryCtaLabel.trim(),
      primaryCtaHref: primaryCtaHref.trim(),
      secondaryCtaLabel: secondaryCtaLabel.trim(),
      watchVideoLabel: watchVideoLabel.trim(),
      desktopImage: initialContent?.hero?.desktopImage || "/images/maiiin.webp",
      mobileImage: initialContent?.hero?.mobileImage || "/images/mainnnn-bg.webp",
    };

    const updatedHomeContent: HomePageContent = {
      ...initialContent,
      hero: updatedHero,
      stats: stats.map((s) => ({
        value: s.value.trim(),
        label: s.label.trim(),
        detail: s.detail?.trim() || "",
      })),
    };

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-pin": adminPin,
        },
        body: JSON.stringify({ type: "home", data: updatedHomeContent }),
      });

      if (res.ok) {
        setStatusMsg({
          type: "success",
          text: "Homepage hero text and metrics updated successfully!",
        });
        onSaved(updatedHomeContent);
      } else {
        const d = await res.json().catch(() => ({}));
        setStatusMsg({
          type: "error",
          text: d.error || "Failed to save hero text.",
        });
      }
    } catch {
      setStatusMsg({ type: "error", text: "Network error saving hero text." });
    } finally {
      setIsSaving(false);
      setTimeout(() => setStatusMsg(null), 5000);
    }
  }

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#3B0D3B]/10 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 rounded-lg bg-[#3B0D3B]/10 px-2.5 py-1 text-xs font-bold text-[#3B0D3B]">
            <Type className="h-3.5 w-3.5" />
            <span>Homepage Section</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0B0B0F] tracking-tight mt-1">
            Hero Section Editor (Text Only)
          </h2>
          <p className="text-xs sm:text-sm text-[#5A4A5A] mt-0.5">
            Edit the live headline, eyebrow badge, paragraph description, CTA button labels, and hero stats.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3B0D3B] hover:bg-[#2A082A] px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md active:scale-95 transition-all cursor-pointer disabled:opacity-50 shrink-0"
        >
          <Save className="h-4 w-4" />
          <span>{isSaving ? "Saving Live Copy..." : "Save Hero Text"}</span>
        </button>
      </div>

      {/* Notification Banner */}
      {statusMsg && (
        <div
          className={`flex items-center gap-3 rounded-2xl p-4 text-xs sm:text-sm font-bold shadow-sm transition-all animate-in fade-in ${
            statusMsg.type === "success"
              ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
              : "bg-red-50 text-red-900 border border-red-200"
          }`}
        >
          {statusMsg.type === "success" ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
          )}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Main Grid: Left Editor Fields | Right Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: 7 cols */}
        <form onSubmit={handleSave} className="lg:col-span-7 space-y-6">
          {/* 1. Eyebrow Badge */}
          <div className="rounded-2xl border border-[#3B0D3B]/10 bg-white p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-bold text-[#0B0B0F] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-[#3B0D3B]" />
                  <span>Eyebrow Pill Badge</span>
                </label>
                <p className="text-[11px] text-[#5A4A5A] mt-0.5">
                  The small pill banner with the pulsing green dot above the main headline.
                </p>
              </div>
            </div>

            <input
              type="text"
              value={eyebrow}
              onChange={(e) => setEyebrow(e.target.value)}
              placeholder="e.g. COHORT ADMISSIONS OPEN · 2026"
              className="w-full rounded-xl border border-[#3B0D3B]/15 bg-white px-4 py-2.5 text-sm font-semibold text-[#0B0B0F] focus:border-[#3B0D3B] focus:ring-1 focus:ring-[#3B0D3B] focus:outline-none transition-all"
            />
          </div>

          {/* 2. Main Headline Lines */}
          <div className="rounded-2xl border border-[#3B0D3B]/10 bg-white p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-bold text-[#0B0B0F] uppercase tracking-wider flex items-center gap-1.5">
                  <Type className="h-3.5 w-3.5 text-[#3B0D3B]" />
                  <span>Main Headline Lines</span>
                </label>
                <p className="text-[11px] text-[#5A4A5A] mt-0.5">
                  Each line appears stacked. The final line automatically receives the brand purple accent and curve underline.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddHeadlineLine}
                className="inline-flex items-center gap-1 rounded-lg border border-[#3B0D3B]/20 bg-[#FAF5EE] hover:bg-[#F3ECE0] px-2.5 py-1 text-[11px] font-bold text-[#3B0D3B] cursor-pointer transition-colors"
              >
                <Plus className="h-3 w-3" />
                <span>Add Line</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {headlineLines.map((line, idx) => {
                const isLast = idx === headlineLines.length - 1;
                return (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#FAF5EE] text-[11px] font-bold text-[#3B0D3B] border border-[#3B0D3B]/10">
                      {idx + 1}
                    </span>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={line}
                        onChange={(e) => handleHeadlineLineChange(idx, e.target.value)}
                        placeholder={`Line ${idx + 1}`}
                        className={`w-full rounded-xl border px-3.5 py-2 text-sm font-bold focus:outline-none focus:ring-1 transition-all ${
                          isLast
                            ? "border-[#5A2A5A]/30 text-[#5A2A5A] bg-[#5A2A5A]/[0.02] focus:border-[#5A2A5A] focus:ring-[#5A2A5A]"
                            : "border-[#3B0D3B]/15 text-[#0B0B0F] bg-white focus:border-[#3B0D3B] focus:ring-[#3B0D3B]"
                        }`}
                      />
                      {isLast && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#5A2A5A] bg-[#5A2A5A]/10 px-2 py-0.5 rounded pointer-events-none">
                          Accent Underline
                        </span>
                      )}
                    </div>
                    {headlineLines.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveHeadlineLine(idx)}
                        className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                        title="Delete line"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Hero Paragraph Description */}
          <div className="rounded-2xl border border-[#3B0D3B]/10 bg-white p-5 sm:p-6 shadow-xs space-y-3">
            <div>
              <label className="text-xs font-bold text-[#0B0B0F] uppercase tracking-wider">
                Hero Description
              </label>
              <p className="text-[11px] text-[#5A4A5A] mt-0.5">
                The supporting paragraph text displayed beneath the headline.
              </p>
            </div>

            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter hero paragraph..."
              className="w-full rounded-xl border border-[#3B0D3B]/15 bg-white p-3.5 text-sm font-medium text-[#1A0A1A] leading-relaxed focus:border-[#3B0D3B] focus:ring-1 focus:ring-[#3B0D3B] focus:outline-none transition-all"
            />
          </div>

          {/* 4. Highlighted Text (After Subtitle) */}
          <div className="rounded-2xl border border-[#3B0D3B]/10 bg-white p-5 sm:p-6 shadow-xs space-y-3">
            <div>
              <label className="text-xs font-bold text-[#0B0B0F] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#5A2A5A]" />
                <span>Highlighted Text (After Subtitle)</span>
              </label>
              <p className="text-[11px] text-[#5A4A5A] mt-0.5">
                Appears immediately after the subtitle description as bold highlighted text (no surrounding box).
              </p>
            </div>

            <input
              type="text"
              value={highlightText}
              onChange={(e) => setHighlightText(e.target.value)}
              placeholder="e.g. Online or Offline. Choose What Works for You."
              className="w-full rounded-xl border border-[#3B0D3B]/15 bg-white px-4 py-2.5 text-sm font-extrabold text-[#3B0D3B] focus:border-[#3B0D3B] focus:ring-1 focus:ring-[#3B0D3B] focus:outline-none transition-all"
            />

            {/* Quick Text Preview */}
            <div className="pt-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Live Typography Preview:</span>
              <p className="mt-1 text-sm font-extrabold text-[#3B0D3B]">
                {highlightText || "Online or Offline. Choose What Works for You."}
              </p>
            </div>
          </div>

          {/* 5. Action Buttons (CTAs) */}
          <div className="rounded-2xl border border-[#3B0D3B]/10 bg-white p-5 sm:p-6 shadow-xs space-y-4">
            <div>
              <label className="text-xs font-bold text-[#0B0B0F] uppercase tracking-wider flex items-center gap-1.5">
                <LinkIcon className="h-3.5 w-3.5 text-[#3B0D3B]" />
                <span>Action Buttons (CTAs)</span>
              </label>
              <p className="text-[11px] text-[#5A4A5A] mt-0.5">
                Configure the labels and links for the buttons in the hero section.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold text-[#0B0B0F]">Primary Button Text</label>
                <input
                  type="text"
                  value={primaryCtaLabel}
                  onChange={(e) => setPrimaryCtaLabel(e.target.value)}
                  placeholder="e.g. Browse Courses"
                  className="mt-1 w-full rounded-xl border border-[#3B0D3B]/15 bg-white px-3.5 py-2 text-sm font-semibold text-[#0B0B0F] focus:border-[#3B0D3B] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#0B0B0F]">Primary Button Link</label>
                <input
                  type="text"
                  value={primaryCtaHref}
                  onChange={(e) => setPrimaryCtaHref(e.target.value)}
                  placeholder="e.g. #courses"
                  className="mt-1 w-full rounded-xl border border-[#3B0D3B]/15 bg-white px-3.5 py-2 text-sm font-semibold text-[#0B0B0F] focus:border-[#3B0D3B] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#0B0B0F]">Secondary Button Text</label>
                <input
                  type="text"
                  value={secondaryCtaLabel}
                  onChange={(e) => setSecondaryCtaLabel(e.target.value)}
                  placeholder="e.g. Book a demo"
                  className="mt-1 w-full rounded-xl border border-[#3B0D3B]/15 bg-white px-3.5 py-2 text-sm font-semibold text-[#0B0B0F] focus:border-[#3B0D3B] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#0B0B0F]">Watch Video Button Text</label>
                <input
                  type="text"
                  value={watchVideoLabel}
                  onChange={(e) => setWatchVideoLabel(e.target.value)}
                  placeholder="e.g. Watch Video"
                  className="mt-1 w-full rounded-xl border border-[#3B0D3B]/15 bg-white px-3.5 py-2 text-sm font-semibold text-[#0B0B0F] focus:border-[#3B0D3B] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 5. Highlight Stats */}
          <div className="rounded-2xl border border-[#3B0D3B]/10 bg-white p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-bold text-[#0B0B0F] uppercase tracking-wider flex items-center gap-1.5">
                  <BarChart3 className="h-3.5 w-3.5 text-[#3B0D3B]" />
                  <span>Hero Highlight Stats</span>
                </label>
                <p className="text-[11px] text-[#5A4A5A] mt-0.5">
                  Key metric proof points shown under the action buttons.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddStat}
                className="inline-flex items-center gap-1 rounded-lg border border-[#3B0D3B]/20 bg-[#FAF5EE] hover:bg-[#F3ECE0] px-2.5 py-1 text-[11px] font-bold text-[#3B0D3B] cursor-pointer transition-colors"
              >
                <Plus className="h-3 w-3" />
                <span>Add Stat</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 space-y-2 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase text-[#3B0D3B]/60 tracking-wider">
                      Stat #{idx + 1}
                    </span>
                    {stats.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveStat(idx)}
                        className="text-slate-400 hover:text-red-600 transition-colors p-1"
                        title="Remove stat"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-1">
                      <label className="text-[10px] font-bold text-slate-500">Value</label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => handleStatChange(idx, "value", e.target.value)}
                        placeholder="e.g. 100%"
                        className="mt-0.5 w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-black text-[#3B0D3B] focus:border-[#3B0D3B] focus:outline-none"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-[10px] font-bold text-slate-500">Label</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => handleStatChange(idx, "label", e.target.value)}
                        placeholder="e.g. Live Brand Work"
                        className="mt-0.5 w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-900 focus:border-[#3B0D3B] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500">Sub-Detail</label>
                    <input
                      type="text"
                      value={stat.detail || ""}
                      onChange={(e) => handleStatChange(idx, "detail", e.target.value)}
                      placeholder="e.g. Real ad spends, not simulations"
                      className="mt-0.5 w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-600 focus:border-[#3B0D3B] focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Save Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#3B0D3B] hover:bg-[#2A082A] py-3 text-sm font-bold text-white shadow-md active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              <span>{isSaving ? "Publishing Changes..." : "Save and Publish Hero Text"}</span>
            </button>
          </div>
        </form>

        {/* Right Panel: Live Visual Preview: 5 cols */}
        <div className="lg:col-span-5 sticky top-6 space-y-4">
          <div className="rounded-2xl border border-[#3B0D3B]/15 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#3B0D3B]/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-[#3B0D3B]" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#0B0B0F]">
                  Live Real-Time Preview
                </span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                Live Mirror
              </span>
            </div>

            {/* Mock Hero Container */}
            <div className="rounded-2xl border border-[#3B0D3B]/15 bg-[#FDFAF6] p-5 sm:p-6 text-[#1A0A1A] relative overflow-hidden shadow-inner">
              {/* Subtle Grid Pattern */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(59, 13, 59, 0.045) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(59, 13, 59, 0.045) 1px, transparent 1px)
                  `,
                  backgroundSize: "10px 10px",
                }}
              />

              <div className="relative z-10 space-y-4">
                {/* Preview Eyebrow */}
                <div className="inline-flex items-center gap-2 rounded-full border border-[#3B0D3B]/15 bg-white/90 px-3 py-0.5 text-[11px] font-extrabold text-[#1A0A1A] shadow-2xs">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0CA30C] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0CA30C]" />
                  </span>
                  <span>{eyebrow || "COHORT ADMISSIONS OPEN · 2026"}</span>
                </div>

                {/* Preview Headline */}
                <h1 className="text-2xl sm:text-3xl font-black leading-[1.15] tracking-tight">
                  {headlineLines.map((line, idx) => {
                    const isLast = idx === headlineLines.length - 1;
                    if (!isLast) {
                      return (
                        <span key={idx} className="block text-[#1A0A1A]">
                          {line}
                        </span>
                      );
                    }
                    return (
                      <span key={idx} className="relative inline-block mt-0.5 text-[#5A2A5A]">
                        <span>{line}</span>
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 320 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="absolute -bottom-1 left-0 w-full text-[#8C6A8C] opacity-80"
                        >
                          <path
                            d="M2 9C90 3.5 230 3 318 8"
                            stroke="currentColor"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    );
                  })}
                </h1>

                {/* Preview Description */}
                <p className="text-xs leading-relaxed text-[#5A4A5A] font-medium">
                  {description}
                </p>

                {/* Preview Highlight Callout - pure text without box */}
                {highlightText && (
                  <p className="text-xs font-extrabold text-[#3B0D3B]">
                    {highlightText}
                  </p>
                )}

                {/* Preview Buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <div className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#3B0D3B] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs">
                    <span>{primaryCtaLabel || "Browse Courses"}</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </div>
                  <div className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-800">
                    <span>{secondaryCtaLabel || "Book a demo"}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-slate-50 px-2.5 py-1.5 text-[11px] font-bold text-slate-800">
                    <Video className="h-3 w-3 text-[#3B0D3B]" />
                    <span>{watchVideoLabel || "Watch Video"}</span>
                  </div>
                </div>

                {/* Preview Stats Grid */}
                <div className="pt-3 border-t border-[#3B0D3B]/10 grid grid-cols-2 gap-2">
                  {stats.slice(0, 4).map((st, i) => (
                    <div key={i} className="rounded-lg bg-white/70 border border-[#3B0D3B]/10 p-2">
                      <div className="text-base font-black text-[#3B0D3B] leading-none">
                        {st.value}
                      </div>
                      <div className="text-[10px] font-bold text-slate-900 mt-1 leading-tight">
                        {st.label}
                      </div>
                      {st.detail && (
                        <div className="text-[9px] text-[#8C6A8C] truncate mt-0.5">
                          {st.detail}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-[#5A4A5A] px-1">
              <span>* Preview updates instantaneously as you type</span>
              <span>Desktop & Mobile synchronized</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
