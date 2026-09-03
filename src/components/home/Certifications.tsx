"use client";

import React, { ReactNode } from "react";
import Image from "next/image";
import {
  Award,
  ShieldCheck,
  BadgeCheck,
  Star,
  Palette,
  ArrowRight,
  BarChart2,
  Search,
  Mail,
  Globe,
  Target,
  Zap,
} from "lucide-react";
import Container from "@/components/ui/Container";

/* ─────────────────────────────────────────────
   CERTIFICATE DATA — grouped by provider
───────────────────────────────────────────── */
interface CertItem {
  name: string;
  provider: "SEMrush" | "HubSpot" | "Google" | "Meta";
  icon: ReactNode;
  color: string;
  price?: string;
}

const semrush: CertItem[] = [
  { name: "PPC Fundamentals",   provider: "SEMrush", icon: <Target size={15} />, color: "#FF642D" },
  { name: "SEO Fundamentals",   provider: "SEMrush", icon: <Search size={15} />, color: "#FF642D" },
  { name: "Social Media",       provider: "SEMrush", icon: <Star size={15} />,   color: "#FF642D" },
  { name: "Content Marketing",  provider: "SEMrush", icon: <Award size={15} />,  color: "#FF642D" },
];

const hubspot: CertItem[] = [
  { name: "SEO Certification",      provider: "HubSpot", icon: <Search size={15} />, color: "#FF7A59" },
  { name: "Digital Marketing",      provider: "HubSpot", icon: <Globe size={15} />,  color: "#FF7A59" },
  { name: "Social Media Marketing", provider: "HubSpot", icon: <Star size={15} />,   color: "#FF7A59" },
  { name: "Email Marketing",        provider: "HubSpot", icon: <Mail size={15} />,   color: "#FF7A59" },
  { name: "Inbound Marketing",      provider: "HubSpot", icon: <Zap size={15} />,    color: "#FF7A59" },
  { name: "Content Marketing",      provider: "HubSpot", icon: <Award size={15} />,  color: "#FF7A59" },
];

const google: CertItem[] = [
  { name: "Google My Business",           provider: "Google", icon: <Globe size={15} />,     color: "#34A853" },
  { name: "Google Analytics (GA4)",       provider: "Google", icon: <BarChart2 size={15} />, color: "#4285F4" },
  { name: "Google Ads Shopping",          provider: "Google", icon: <Target size={15} />,    color: "#EA4335" },
  { name: "Performance Max",              provider: "Google", icon: <Zap size={15} />,       color: "#FBBC04" },
  { name: "Google Ads Video",             provider: "Google", icon: <Star size={15} />,      color: "#EA4335" },
  { name: "Google Ads Display",           provider: "Google", icon: <Award size={15} />,     color: "#34A853" },
  { name: "Fundamentals of Digital Mkt", provider: "Google", icon: <Globe size={15} />,     color: "#4285F4" },
  { name: "Google Ads Search",            provider: "Google", icon: <Search size={15} />,    color: "#FBBC04" },
];

const meta: CertItem[] = [
  { name: "Community Manager",        provider: "Meta", price: "$99",  icon: <Star size={15} />,       color: "#0082FB" },
  { name: "Creative Strategy Pro",    provider: "Meta", price: "$150", icon: <Palette size={15} />,   color: "#0082FB" },
  { name: "Media Planning Pro",       provider: "Meta", price: "$150", icon: <BarChart2 size={15} />,  color: "#0082FB" },
  { name: "Marketing Science Pro",    provider: "Meta", price: "$150", icon: <Award size={15} />,      color: "#0082FB" },
  { name: "Digital Marketing Assoc.", provider: "Meta", price: "$99",  icon: <BadgeCheck size={15} />, color: "#0082FB" },
  { name: "Media Buying Pro",         provider: "Meta", price: "$150", icon: <Target size={15} />,     color: "#0082FB" },
];

const providerBadge = {
  SEMrush: { bg: "#fff1eb", text: "#FF642D", border: "#ffded3" },
  HubSpot: { bg: "#fff2ee", text: "#FF7A59", border: "#fedbd1" },
  Google:  { bg: "#eff6ff", text: "#4285F4", border: "#dbeafe" },
  Meta:    { bg: "#eff6ff", text: "#0082FB", border: "#dbeafe" },
};

/* ─────────────────────────────────────────────
   COMPACT VERTICAL CARD (LIGHT THEME)
───────────────────────────────────────────── */
function CertCard({ cert }: { cert: CertItem }) {
  const badge = providerBadge[cert.provider] || { bg: "#f5f3ff", text: "#7c3aed", border: "#ede9fe" };

  return (
    <div className="group relative flex w-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-3.5 sm:p-4 shadow-xs transition-all duration-200 hover:border-slate-300 hover:shadow-md mb-3.5">
      {/* Subtle top accent gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(to right, ${cert.color}, transparent)` }}
      />

      {/* Icon + Provider badge row */}
      <div className="flex items-center justify-between mb-2.5">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105"
          style={{
            background: cert.color + "14",
            border: `1px solid ${cert.color}28`,
            color: cert.color,
          }}
        >
          {cert.icon}
        </div>
        <div
          className="rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider"
          style={{
            background: badge.bg,
            color: badge.text,
            border: `1px solid ${badge.border}`,
          }}
        >
          {cert.provider}
        </div>
      </div>

      {/* Certification name */}
      <p className="m-0 mb-2.5 text-xs font-bold text-slate-900 leading-snug line-clamp-1 group-hover:text-[#3A1494] transition-colors">
        {cert.name}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-2">
        {cert.price ? (
          <span
            className="rounded px-1.5 py-0.5 text-[9px] font-bold"
            style={{
              color: cert.color,
              background: cert.color + "14",
            }}
          >
            {cert.price} exam
          </span>
        ) : (
          <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-emerald-700">
            Included
          </span>
        )}
        <div
          className="flex items-center gap-1 text-[9px] font-extrabold uppercase transition-transform duration-200 group-hover:translate-x-0.5"
          style={{ color: cert.color }}
        >
          <span>View</span>
          <ArrowRight size={9} />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   VERTICAL INFINITE MARQUEE COLUMN (LIGHT THEME)
───────────────────────────────────────────── */
function VerticalInfiniteCol({
  certs,
  direction = "down",
  speed = 28,
}: {
  certs: CertItem[];
  direction?: "down" | "up";
  speed?: number;
}) {
  const loop = [...certs, ...certs, ...certs];

  return (
    <div className="overflow-hidden h-full">
      <div
        className="hover:[animation-play-state:paused]"
        style={{
          animation: `${direction === "down" ? "marquee-down" : "marquee-up"} ${speed}s linear infinite`,
        }}
      >
        {loop.map((cert, i) => (
          <CertCard key={`${cert.name}-${i}`} cert={cert} />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN SECTION (LIGHT THEME & SINGLE VIEWPORT)
───────────────────────────────────────────── */
export default function CertificationSection() {
  const col1Certs = [...google, ...meta];
  const col2Certs = [...hubspot, ...semrush];

  return (
    <section
      id="certs"
      data-stage="CERTS"
      className="relative bg-[#fafbfe] py-12 sm:py-16 lg:py-0 lg:min-h-screen lg:flex lg:items-center border-t border-slate-200/80 overflow-hidden"
    >
      {/* Subtle ambient light glow */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/3 h-96 w-96 rounded-full bg-radial from-[#3A1494]/5 via-[#7C3AED]/3 to-transparent blur-3xl"
        aria-hidden="true"
      />

      <Container className="w-full py-6 lg:py-8 relative z-10">
        {/* ── MAIN SECTION HEADER ── */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50/80 px-4 py-1 mb-3.5 shadow-2xs">
            <ShieldCheck size={12} className="text-[#3A1494]" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#3A1494]">
              Proof That Travels
            </span>
          </div>

          <h2 className="m-0 mb-3 leading-tight tracking-tight text-slate-950">
            <span className="block text-3xl sm:text-4xl lg:text-[2.85rem] font-black">
              Credentials Built For The{" "}
              <span className="italic font-serif font-black bg-gradient-to-r from-[#3A1494] to-[#7C3AED] bg-clip-text text-transparent">
                Real Market
              </span>
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed font-medium">
            Graduate with official revenue capstone validation, plus 30+ industry credentials recruiters actively search for.
          </p>
        </div>

        {/* ── 2-COLUMN GRID (50% / 50%) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* ── LEFT SIDE (50%): TREQO CERTIFICATION ── */}
          <div className="flex flex-col items-start w-full lg:col-span-6">
            {/* Header Info Left */}
            <div className="mb-4">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50/80 px-3 py-0.5 mb-2 shadow-2xs">
                <ShieldCheck size={12} className="text-[#3A1494]" />
                <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#3A1494]">
                  CAPSTONE REVENUE PROOF
                </span>
              </div>

              <h3 className="m-0 mb-1.5 text-xl sm:text-2xl font-black text-slate-950 leading-tight">
                TREQO Certification
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 m-0 leading-relaxed">
                Awarded on completion of your capstone project — a real campaign, built &amp; launched with real numbers attached.
              </p>
            </div>

            {/* Certificate Display Card (Light Theme) */}
            <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-md shadow-purple-950/5">
              {/* Top decorative accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px]"
                style={{ background: "linear-gradient(90deg, #3A1494 0%, #7C3AED 50%, #4285F4 100%)" }}
              />

              {/* REAL CERTIFICATE DISPLAY / EMBED CONTAINER */}
              <div className="relative overflow-hidden rounded-xl border border-slate-200/90 bg-[#fffdfa] p-2.5 shadow-xs">
                <img
                  src="/treqo-certificate.jpg"
                  alt="TREQO Official Certificate of Completion"
                  className="w-full h-auto rounded-lg block shadow-2xs"
                />
              </div>

              {/* Sub-caption below certificate */}
              <p className="text-[11px] text-slate-500 text-center mt-3 m-0 leading-relaxed font-medium">
                Shareable on LinkedIn &amp; directly reviewed by placement hiring managers.
              </p>
            </div>
          </div>

          {/* ── RIGHT SIDE (50%): OTHER INDUSTRY CERTIFICATION ── */}
          <div className="flex flex-col gap-4 w-full lg:col-span-6">
            {/* Header Info Right */}
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50/80 px-3 py-0.5 mb-2 shadow-2xs">
                <ShieldCheck size={12} className="text-[#3A1494]" />
                <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#3A1494]">
                  GLOBAL CREDENTIALS
                </span>
              </div>

              <h3 className="m-0 mb-1.5 text-xl sm:text-2xl font-black text-slate-950 leading-tight">
                Other Industry Certification
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 m-0 leading-relaxed">
                From Google &amp; Meta to HubSpot &amp; SEMrush — graduate with 30+ credentials recruiters look for.
              </p>

              {/* Provider Badges Row */}
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                {[
                  { name: "Google", bg: "#eff6ff", text: "#4285F4", count: "8 certs", border: "#dbeafe" },
                  { name: "Meta",   bg: "#eff6ff", text: "#0082FB", count: "6 certs", border: "#dbeafe" },
                  { name: "HubSpot",bg: "#fff2ee", text: "#FF7A59", count: "6 certs", border: "#fedbd1" },
                  { name: "SEMrush",bg: "#fff1eb", text: "#FF642D", count: "4 certs", border: "#ffded3" },
                ].map((p) => (
                  <div
                    key={p.name}
                    className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs"
                    style={{
                      background: p.bg,
                      border: `1px solid ${p.border}`,
                    }}
                  >
                    <span className="text-[10px] font-extrabold" style={{ color: p.text }}>
                      {p.name}
                    </span>
                    <span className="text-[9px] font-semibold text-slate-500">
                      {p.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── VERTICAL FLOWING MARQUEE (DUAL COLUMNS: DOWN & UP) ── */}
            <div
              className="relative grid grid-cols-2 gap-3.5 h-[340px] sm:h-[360px] overflow-hidden"
              style={{
                maskImage: "linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)",
              }}
            >
              {/* Column 1: Flows Downward (Top to Bottom) */}
              <VerticalInfiniteCol certs={col1Certs} direction="down" speed={26} />

              {/* Column 2: Flows Upward (Bottom to Top) */}
              <VerticalInfiniteCol certs={col2Certs} direction="up" speed={22} />
            </div>

            {/* Bottom Inclusions Banner with Glowing Green Dot */}
            <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-200/90 bg-emerald-50/80 px-3.5 py-2 text-xs font-semibold text-emerald-900 w-fit">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] sm:text-xs">
                Google, HubSpot &amp; SEMrush certifications included in fee.
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
