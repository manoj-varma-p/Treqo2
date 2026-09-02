"use client";

import { useState } from "react";
import {
  Award,
  ShieldCheck,
  BarChart3,
  CheckCircle2,
  Zap,
  Globe,
  Layers,
  Calendar,
  Sparkles,
  Search,
  ExternalLink,
} from "lucide-react";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type Provider = "All" | "Meta" | "HubSpot" | "Google" | "SEMrush";

interface CertItem {
  id: string;
  title: string;
  provider: "Meta" | "HubSpot" | "Google" | "SEMrush";
  badgeColor: string;
  cost: string;
  isIncluded?: boolean;
  icon: "barchart" | "award" | "check" | "zap" | "layers" | "search";
}

const certTabs = [
  { id: "All" as Provider, label: "All", count: "30+" },
  { id: "Google" as Provider, label: "Google", count: "8 certs" },
  { id: "Meta" as Provider, label: "Meta", count: "6 certs" },
  { id: "HubSpot" as Provider, label: "HubSpot", count: "8 certs" },
  { id: "SEMrush" as Provider, label: "SEMrush", count: "4 certs" },
];

const certificationsList: CertItem[] = [
  // Meta
  {
    id: "meta-media-planning",
    title: "Media Planning Pro",
    provider: "Meta",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    cost: "$150 exam",
    icon: "barchart",
  },
  {
    id: "meta-marketing-science",
    title: "Marketing Science Pro",
    provider: "Meta",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    cost: "$150 exam",
    icon: "award",
  },
  {
    id: "meta-dm-assoc",
    title: "Digital Marketing Assoc.",
    provider: "Meta",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    cost: "$99 exam",
    icon: "check",
  },
  // HubSpot
  {
    id: "hubspot-inbound",
    title: "Inbound Marketing",
    provider: "HubSpot",
    badgeColor: "bg-orange-50 text-orange-700 border-orange-200",
    cost: "INCLUDED",
    isIncluded: true,
    icon: "zap",
  },
  {
    id: "hubspot-content",
    title: "Content Marketing",
    provider: "HubSpot",
    badgeColor: "bg-orange-50 text-orange-700 border-orange-200",
    cost: "INCLUDED",
    isIncluded: true,
    icon: "award",
  },
  {
    id: "hubspot-email",
    title: "Email Marketing",
    provider: "HubSpot",
    badgeColor: "bg-orange-50 text-orange-700 border-orange-200",
    cost: "INCLUDED",
    isIncluded: true,
    icon: "check",
  },
  // Google
  {
    id: "google-search-ads",
    title: "Google Search Ads Pro",
    provider: "Google",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    cost: "INCLUDED",
    isIncluded: true,
    icon: "search",
  },
  {
    id: "google-ga4",
    title: "Google Analytics 4 (GA4)",
    provider: "Google",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    cost: "INCLUDED",
    isIncluded: true,
    icon: "barchart",
  },
  // SEMrush
  {
    id: "semrush-seo",
    title: "SEO Toolkit & Strategy",
    provider: "SEMrush",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
    cost: "INCLUDED",
    isIncluded: true,
    icon: "layers",
  },
  {
    id: "semrush-keyword",
    title: "Competitive Research",
    provider: "SEMrush",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
    cost: "INCLUDED",
    isIncluded: true,
    icon: "search",
  },
];

export default function Certifications() {
  const [activeTab, setActiveTab] = useState<Provider>("All");

  const filteredCerts =
    activeTab === "All"
      ? certificationsList
      : certificationsList.filter((c) => c.provider === activeTab);

  return (
    <section id="certifications" className="bg-[#fafbfe] py-16 sm:py-20 lg:py-24 border-t border-slate-200/80">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14 items-start">
          {/* ========================================================================= */}
          {/* Left Column: TREQO Certification (Light Theme) */}
          {/* ========================================================================= */}
          <div className="flex flex-col items-start lg:col-span-6">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#3A1494] shadow-2xs">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              <span>CAPSTONE REVENUE PROOF</span>
            </div>

            {/* Heading */}
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[2.65rem] font-black leading-[1.12] tracking-tight text-slate-950">
              TREQO Certification
            </h2>

            {/* Subtitle */}
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 max-w-xl">
              Awarded on completion of your capstone project — a real campaign, built &amp; launched with real numbers attached.
            </p>

            {/* Certificate Display Card */}
            <div className="mt-8 w-full overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-lg shadow-purple-950/5">
              {/* Inner Certificate Parchment */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200/80 bg-[#fffdfa] p-6 sm:p-8 shadow-inner">
                {/* Decorative Top-Left & Bottom-Right Corner Ribbon Ornaments */}
                <div
                  className="pointer-events-none absolute -top-12 -left-12 h-28 w-28 rounded-full bg-gradient-to-br from-[#3A1494] via-[#5c2bc7] to-amber-400 opacity-90 blur-[1px]"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute -bottom-14 -right-14 h-32 w-32 rounded-full bg-gradient-to-tl from-[#3A1494] via-[#6d39db] to-amber-400 opacity-90 blur-[1px]"
                  aria-hidden="true"
                />

                {/* Inner Border Frame */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Brand Header */}
                  <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#3A1494] select-none">
                    TREQO
                  </span>
                  <span className="mt-0.5 text-[9px] font-bold tracking-[0.25em] text-slate-400 uppercase">
                    Elevate · Educate · Empower
                  </span>

                  {/* Certificate Title */}
                  <div className="mt-5 w-full flex items-center justify-center gap-3">
                    <div className="h-px w-12 bg-amber-400/60" />
                    <h3 className="font-serif text-lg sm:text-xl font-bold tracking-widest text-slate-800 uppercase">
                      Certificate of Completion
                    </h3>
                    <div className="h-px w-12 bg-amber-400/60" />
                  </div>

                  <p className="mt-3 font-serif text-xs italic text-slate-500">
                    This is to certify that
                  </p>

                  {/* Candidate Name (Script Style) */}
                  <div className="my-2 border-b border-amber-300/80 pb-1 px-8">
                    <span className="font-serif text-2xl sm:text-3xl font-bold italic text-slate-900">
                      Your Name
                    </span>
                  </div>

                  <p className="mt-1.5 text-[11px] font-medium text-slate-500">
                    has successfully completed the course
                  </p>

                  {/* Course Name */}
                  <h4 className="mt-1 text-base sm:text-lg font-black tracking-wider text-[#3A1494] uppercase">
                    Digital Marketing
                  </h4>

                  <p className="mt-1.5 max-w-sm text-[10.5px] leading-relaxed text-slate-500">
                    offered by Treqo and has demonstrated the knowledge and skills required to complete the course.
                  </p>

                  {/* Badges & Signatures Row */}
                  <div className="mt-6 grid grid-cols-3 items-end gap-3 w-full border-t border-slate-200/70 pt-4">
                    {/* Left: Date & ID */}
                    <div className="flex flex-col items-start text-left text-[9px] text-slate-500 leading-tight">
                      <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                        <Calendar className="h-2.5 w-2.5 text-[#3A1494]" /> 25 Sep 2026
                      </span>
                      <span className="mt-0.5 text-[8px] text-slate-400">TRQ-DM-2026-0518</span>
                    </div>

                    {/* Center: Gold Foil Seal Badge */}
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-200 p-0.5 shadow-md">
                        <div className="flex h-full w-full items-center justify-center rounded-full border border-amber-600 bg-amber-500/90 text-center text-white">
                          <span className="text-[7px] font-black uppercase tracking-tighter leading-none">
                            ★ VERIFIED ★<br />TREQO
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Signature with Seal */}
                    <div className="flex flex-col items-end text-right">
                      <span className="font-serif text-xs italic font-bold text-slate-800">
                        Rahul Varma
                      </span>
                      <span className="text-[8px] font-semibold text-slate-500">
                        CEO, Treqo
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sub-note */}
              <p className="mt-3.5 text-center text-xs font-medium text-slate-500">
                Shareable on LinkedIn &amp; directly reviewed by placement hiring managers.
              </p>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* Right Column: Other Industry Certification (Light Theme) */}
          {/* ========================================================================= */}
          <div className="flex flex-col items-start lg:col-span-6">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#3A1494] shadow-2xs">
              <Globe className="h-3.5 w-3.5" aria-hidden="true" />
              <span>GLOBAL CREDENTIALS</span>
            </div>

            {/* Heading */}
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[2.65rem] font-black leading-[1.12] tracking-tight text-slate-950">
              Other Industry Certification
            </h2>

            {/* Subtitle */}
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 max-w-xl">
              From Google &amp; Meta to HubSpot &amp; SEMrush — graduate with 30+ credentials recruiters look for.
            </p>

            {/* Category Filter Tabs */}
            <div className="mt-6 flex flex-wrap gap-2">
              {certTabs.map((tab) => {
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-150 cursor-pointer",
                      isSelected
                        ? "bg-[#3A1494] text-white shadow-xs"
                        : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                    )}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={cn(
                        "rounded-full px-1.5 py-0.2 text-[10px] font-bold",
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 text-slate-600"
                      )}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Certifications 2-Column Grid */}
            <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2 w-full">
              {filteredCerts.map((cert) => (
                <div
                  key={cert.id}
                  className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs transition-all duration-200 hover:border-[#3A1494]/40 hover:shadow-md"
                >
                  {/* Top Row: Icon + Provider Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-700 group-hover:bg-[#f0ecfc] group-hover:text-[#3A1494] transition-colors">
                      {cert.icon === "barchart" && <BarChart3 className="h-4 w-4" />}
                      {cert.icon === "award" && <Award className="h-4 w-4" />}
                      {cert.icon === "check" && <CheckCircle2 className="h-4 w-4" />}
                      {cert.icon === "zap" && <Zap className="h-4 w-4" />}
                      {cert.icon === "layers" && <Layers className="h-4 w-4" />}
                      {cert.icon === "search" && <Search className="h-4 w-4" />}
                    </div>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase",
                        cert.badgeColor
                      )}
                    >
                      {cert.provider}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="mt-3 text-sm sm:text-base font-bold text-slate-900 tracking-tight group-hover:text-[#3A1494] transition-colors">
                    {cert.title}
                  </h4>

                  {/* Bottom Row: Cost / Included Tag + View Link */}
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                    {cert.isIncluded ? (
                      <span className="inline-flex items-center rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-black tracking-wide text-emerald-700 uppercase">
                        INCLUDED
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-slate-500">
                        {cert.cost}
                      </span>
                    )}

                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#3A1494] group-hover:translate-x-0.5 transition-transform">
                      VIEW &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Inclusions Banner with Green Pulse Dot */}
            <div className="mt-6 flex w-full items-center gap-2.5 rounded-2xl border border-emerald-200/80 bg-emerald-50/70 p-3.5 text-xs font-semibold text-emerald-900">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span>Google, HubSpot &amp; SEMrush certifications included in fee.</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
