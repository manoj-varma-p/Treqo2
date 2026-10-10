"use client";

import React, { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Save,
  CheckCircle2,
  AlertCircle,
  LayoutTemplate,
  Activity,
  BookOpen,
  Award,
  Compass,
  Users,
  ShieldCheck,
  Sliders,
  HelpCircle,
  Megaphone,
  Sparkles,
  ExternalLink,
  Check,
  RefreshCw,
} from "lucide-react";
import {
  type SectionVisibilitySettings,
  defaultSectionVisibility,
} from "@/types/home";

interface Props {
  initialData?: SectionVisibilitySettings;
  adminPin: string;
  onSaved: (updated: SectionVisibilitySettings) => void;
  onNavigateTab?: (tab: string) => void;
}

interface SectionDefinition {
  key: keyof SectionVisibilitySettings;
  name: string;
  badge: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  targetTab?: string;
  previewNote: string;
}

const SECTION_DEFINITIONS: SectionDefinition[] = [
  {
    key: "announcementBanner",
    name: "Top Announcement Bar",
    badge: "Sticky Header",
    description: "Notice bar displayed at the very top of the page with batch dates and registration link.",
    icon: Megaphone,
    targetTab: "banner",
    previewNote: "e.g. 'BATCH 2 · 50 SEATS · Enrollments close on 4th October 2026'",
  },
  {
    key: "hero",
    name: "Hero Section",
    badge: "Fold 1",
    description: "Main headline, action buttons, image carousel/poster, and intro video trigger.",
    icon: LayoutTemplate,
    targetTab: "hero",
    previewNote: "e.g. 'Leave with Skills you can implement. Not just a certificate'",
  },
  {
    key: "keywordsTicker",
    name: "Keywords Marquee Ticker",
    badge: "SEO / Transition",
    description: "Dynamic scrolling ticker displaying core high-intent industry topics and keywords.",
    icon: Activity,
    previewNote: "e.g. 'digital marketing course in Hyderabad · online marketing classes...'",
  },
  {
    key: "courses",
    name: "Learning System & Programs",
    badge: "Core Offer",
    description: "Comprehensive 3-tier program cards, interactive roadmap, and curriculum phase tabs.",
    icon: BookOpen,
    targetTab: "courses",
    previewNote: "Interactive course cards and phase breakdowns (#courses)",
  },
  {
    key: "govCerts",
    name: "Government Accreditations",
    badge: "Compliance & Trust",
    description: "Startup India, DPIIT, and MSME national recognition credentials and certificate badges.",
    icon: Award,
    targetTab: "govCerts",
    previewNote: "Official Government of India recognized skill certificates (#gov-certs)",
  },
  {
    key: "whyTreqqo",
    name: "CEO Challenge & Defense Method",
    badge: "Pedagogy",
    description: "4-submission criteria framework and Phase 4 Wall proof standard with live brand prompts.",
    icon: Compass,
    targetTab: "whyTreqqo",
    previewNote: "The 4 submissions defense standard & methodology (#why-treqo)",
  },
  {
    key: "mentors",
    name: "Practitioner Mentors & Faculty",
    badge: "Mentorship",
    description: "Operator profiles, active account management proofs, and 1:1 defense guarantees.",
    icon: Users,
    targetTab: "tutors",
    previewNote: "Active brand operators and practitioner faculty members (#tutors)",
  },
  {
    key: "certifications",
    name: "Industry & Tool Certifications",
    badge: "Badges",
    description: "SEMrush, HubSpot, Google, and Meta certifications included in the curriculum.",
    icon: ShieldCheck,
    targetTab: "certifications",
    previewNote: "HubSpot, Google & SEMrush certification badging (#certs)",
  },
  {
    key: "sixDecisions",
    name: "Six Decisions Framework",
    badge: "Why Us",
    description: "Interactive comparative breakdown highlighting what sets the program apart from colleges.",
    icon: Sliders,
    targetTab: "sixDecisions",
    previewNote: "Side-by-side comparison matrix for prospective students (#decisions)",
  },
  {
    key: "faqs",
    name: "Frequently Asked Questions",
    badge: "Admissions FAQ",
    description: "Categorized accordion covering admissions, eligibility, schedule, tools, and fees.",
    icon: HelpCircle,
    targetTab: "faqs",
    previewNote: "Interactive expandable answers to top questions (#faq)",
  },
  {
    key: "finalCta",
    name: "Final Call-to-Action Card",
    badge: "Conversion",
    description: "Bottom high-impact enrollment invitation card with contact and application options.",
    icon: Sparkles,
    previewNote: "Bottom closing banner driving final application submissions",
  },
];

export default function AdminSectionVisibilityTab({
  initialData,
  adminPin,
  onSaved,
  onNavigateTab,
}: Props) {
  const [settings, setSettings] = useState<Required<SectionVisibilitySettings>>({
    ...defaultSectionVisibility,
    ...(initialData || {}),
  });
  const [isSaving, setIsSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    if (initialData) {
      setSettings({
        ...defaultSectionVisibility,
        ...initialData,
      });
    }
  }, [initialData]);

  const toggleSection = (key: keyof SectionVisibilitySettings) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      setHasUnsavedChanges(true);
      return next;
    });
  };

  const handleShowAll = () => {
    const allVisible = Object.keys(defaultSectionVisibility).reduce((acc, k) => {
      acc[k as keyof SectionVisibilitySettings] = true;
      return acc;
    }, {} as Required<SectionVisibilitySettings>);
    setSettings(allVisible);
    setHasUnsavedChanges(true);
  };

  const handleSave = async (dataToSave?: Required<SectionVisibilitySettings>) => {
    setIsSaving(true);
    setStatusMsg(null);
    const payloadData = dataToSave || settings;

    try {
      // 1. Fetch current home content to avoid overwriting other fields
      let currentHomeContent: Record<string, unknown> = {};
      try {
        const getRes = await fetch(`/api/admin/content?_t=${Date.now()}`, {
          headers: { "x-admin-pin": adminPin },
        });
        if (getRes.ok) {
          const fetched = await getRes.json();
          currentHomeContent = fetched.homeContent || fetched.home || {};
        }
      } catch (err) {
        console.warn("[AdminSectionVisibilityTab] Read failed, will send partial:", err);
      }

      // 2. Merge sectionVisibility and save to DB
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-pin": adminPin,
        },
        body: JSON.stringify({
          type: "home",
          data: {
            ...currentHomeContent,
            sectionVisibility: payloadData,
          },
        }),
      });

      if (res.ok) {
        onSaved(payloadData);
        setHasUnsavedChanges(false);
        setStatusMsg({
          type: "success",
          text: "Section visibility settings saved and published to live website immediately!",
        });
      } else {
        setStatusMsg({
          type: "error",
          text: "Failed to save section visibility. Please verify your admin PIN.",
        });
      }
    } catch {
      setStatusMsg({
        type: "error",
        text: "Network error occurred while saving section visibility.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const visibleCount = Object.values(settings).filter(Boolean).length;
  const hiddenCount = SECTION_DEFINITIONS.length - visibleCount;

  return (
    <div className="space-y-6">
      {/* Top Banner & Control Bar */}
      <div className="rounded-2xl border border-[#3B0D3B]/10 bg-white p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black tracking-widest text-[#8C6A8C] uppercase">
                Live Site Architecture
              </span>
            </div>
            <h2 className="mt-1 text-xl sm:text-2xl font-black text-[#1A0A1A]">
              Homepage Section Visibility
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#5A4A5A] max-w-2xl leading-relaxed">
              Toggle any section ON or OFF. Turning a switch OFF completely removes that section from the public website in real time without altering your saved texts, images, or code.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleShowAll}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#3B0D3B]/15 bg-[#FDFAF6] hover:bg-[#F5EDE0] px-3.5 py-2 text-xs font-bold text-[#3B0D3B] transition-all cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Show All Sections</span>
            </button>

            <button
              type="button"
              onClick={() => handleSave()}
              disabled={isSaving}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all cursor-pointer disabled:opacity-50 ${
                hasUnsavedChanges
                  ? "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 ring-2 ring-emerald-500/20"
                  : "bg-[#3B0D3B] hover:bg-[#2A082A]"
              }`}
            >
              {isSaving ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : hasUnsavedChanges ? (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save Changes (Unsaved)</span>
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  <span>Settings Saved</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-[#3B0D3B]/5 pt-4">
          <div className="rounded-xl bg-[#FDFAF6] border border-[#3B0D3B]/10 p-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6A8C] block">
              Total Managed Sections
            </span>
            <span className="text-xl font-black text-[#1A0A1A]">
              {SECTION_DEFINITIONS.length}
            </span>
          </div>

          <div className="rounded-xl bg-emerald-50/60 border border-emerald-200/60 p-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
              Live &amp; Visible
            </span>
            <span className="text-xl font-black text-emerald-700">
              {visibleCount}
            </span>
          </div>

          <div className="col-span-2 sm:col-span-1 rounded-xl bg-amber-50/60 border border-amber-200/60 p-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
              Completely Hidden
            </span>
            <span className="text-xl font-black text-amber-700">
              {hiddenCount}
            </span>
          </div>
        </div>

        {/* Status Alert Banner */}
        {statusMsg && (
          <div
            className={`mt-4 flex items-center gap-2.5 rounded-xl p-3.5 text-xs font-semibold ${
              statusMsg.type === "success"
                ? "bg-emerald-50 border border-emerald-200 text-emerald-900"
                : "bg-rose-50 border border-rose-200 text-rose-900"
            }`}
          >
            {statusMsg.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
            )}
            <span>{statusMsg.text}</span>
          </div>
        )}
      </div>

      {/* Grid of Section Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SECTION_DEFINITIONS.map((def) => {
          const isVisible = settings[def.key] !== false;
          const Icon = def.icon;

          return (
            <div
              key={def.key}
              className={`rounded-2xl border transition-all duration-200 p-5 flex flex-col justify-between ${
                isVisible
                  ? "bg-white border-[#3B0D3B]/10 shadow-xs hover:border-[#3B0D3B]/20"
                  : "bg-[#F7F4F0]/80 border-dashed border-[#D2C8BC] opacity-80"
              }`}
            >
              <div>
                {/* Header row with Icon, Info and Toggle */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                        isVisible
                          ? "bg-[#3B0D3B]/5 border-[#3B0D3B]/15 text-[#3B0D3B]"
                          : "bg-slate-200/70 border-slate-300 text-slate-500"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className={`text-base font-black ${isVisible ? "text-[#1A0A1A]" : "text-slate-600 line-through"}`}>
                          {def.name}
                        </h3>
                        <span className="inline-flex items-center rounded-md bg-[#3B0D3B]/5 border border-[#3B0D3B]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#3B0D3B]">
                          {def.badge}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-[#5A4A5A] leading-relaxed">
                        {def.description}
                      </p>
                    </div>
                  </div>

                  {/* Switch Toggle */}
                  <button
                    type="button"
                    role="switch"
                    aria-checked={isVisible}
                    onClick={() => toggleSection(def.key)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#3B0D3B]/20 ${
                      isVisible ? "bg-emerald-600" : "bg-slate-300"
                    }`}
                  >
                    <span className="sr-only">Toggle {def.name}</span>
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        isVisible ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Preview snippet */}
                <div className="mt-3.5 rounded-lg bg-[#FDFAF6] border border-[#3B0D3B]/5 px-3 py-2 text-[11px] text-[#7A6A7A] italic">
                  {def.previewNote}
                </div>
              </div>

              {/* Bottom status & edit shortcut */}
              <div className="mt-4 pt-3 border-t border-[#3B0D3B]/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  {isVisible ? (
                    <>
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span className="font-bold text-emerald-700 text-[11px] tracking-wide uppercase">
                        Visible on Live Site
                      </span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="h-3.5 w-3.5 text-slate-400" />
                      <span className="font-bold text-slate-500 text-[11px] tracking-wide uppercase">
                        Completely Hidden
                      </span>
                    </>
                  )}
                </div>

                {def.targetTab && onNavigateTab && (
                  <button
                    type="button"
                    onClick={() => onNavigateTab(def.targetTab!)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#3B0D3B] hover:underline cursor-pointer"
                  >
                    <span>Edit Content</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Save Reminder if unsaved changes */}
      {hasUnsavedChanges && (
        <div className="sticky bottom-6 z-30 rounded-2xl border border-emerald-300 bg-white p-4 shadow-xl flex items-center justify-between gap-4 ring-4 ring-emerald-500/10">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs sm:text-sm font-bold text-[#1A0A1A]">
              You have unsaved section visibility changes. Click publish to apply them live.
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleSave()}
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all cursor-pointer disabled:opacity-50 shrink-0"
          >
            <Save className="h-4 w-4" />
            <span>{isSaving ? "Saving..." : "Publish Visibility Changes"}</span>
          </button>
        </div>
      )}
    </div>
  );
}
