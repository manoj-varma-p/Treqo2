"use client";

import { useState } from "react";
import { Flame, Trophy, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgramHeroCardProps {
  slug?: string;
}

export default function ProgramHeroCard({ slug }: ProgramHeroCardProps) {
  const [activeTab, setActiveTab] = useState<"master" | "fit">("master");

  const isOnlineFlagship = slug === "digital-marketing";

  const fitContent = isOnlineFlagship
    ? {
        heading: "Best Fit For Your Ambition",
        description:
          "Engineered for aspiring graduates and entrepreneurs looking to build high-converting acquisition channels and scale modern ventures.",
        tags: [
          "Aspiring Graduates",
          "Entrepreneurs",
          "Career Switchers",
          "Growth Marketers",
        ],
      }
    : {
        heading: "Best Fit For Your Career Stage",
        description:
          "Engineered for graduates, 3-1 / 4-1 & final year college students, and ambitious career switchers looking to build an unassailable proof-of-work portfolio.",
        tags: [
          "Graduates",
          "3-1, 4-1 & Final Year Students",
          "Career Switchers",
          "Aspiring Marketers",
        ],
      };

  return (
    <div className="relative w-full">
      {/* Ambient shadow glow background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-1.5 sm:-inset-2 rounded-3xl sm:rounded-[28px] bg-gradient-to-tr from-[#3A1494]/25 via-purple-600/15 to-amber-500/10 blur-xl sm:blur-2xl opacity-80"
      />

      {/* Main Card with elevated shadow */}
      <div className="relative flex w-full flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white/95 backdrop-blur-md p-5 sm:p-7 shadow-[0_20px_50px_-12px_rgba(58,20,148,0.18),0_10px_25px_-5px_rgba(0,0,0,0.06)] transition-all">
        {/* Top subtle brand accent line */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#3A1494] via-[#8b5cf6] to-[#fbbf24]"
        />

        {/* Header: Badge & Status */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 sm:pb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-[11px] font-bold text-[#3A1494]">
            <Flame className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />
            12-Phase Curriculum
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Batch 2 Enrolling
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="mt-4 sm:mt-5 flex rounded-xl border border-slate-200 bg-slate-100/80 p-1">
          <button
            type="button"
            onClick={() => setActiveTab("master")}
            className={cn(
              "flex-1 rounded-lg py-2 text-xs font-bold transition-all text-center select-none cursor-pointer",
              activeTab === "master"
                ? "bg-[#3A1494] text-white shadow-md shadow-purple-950/20"
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            What You Master
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("fit")}
            className={cn(
              "flex-1 rounded-lg py-2 text-xs font-bold transition-all text-center select-none cursor-pointer",
              activeTab === "fit"
                ? "bg-[#3A1494] text-white shadow-md shadow-purple-950/20"
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            Who It&apos;s For
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-5 flex flex-col gap-3">
          {activeTab === "master" ? (
            <div className="flex flex-col gap-2.5 animate-in fade-in duration-200">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 border border-amber-200/80 text-amber-600 shrink-0 shadow-xs">
                  <Trophy className="h-4.5 w-4.5" aria-hidden="true" />
                </div>
                <h4 className="text-base sm:text-lg font-bold tracking-tight text-slate-900">
                  Learn By Deploying Real Budgets
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                No multiple choice exams or theoretical essays. You run real ad accounts, set up tracking pipelines, and optimize actual acquisition funnels.
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {["Meta Ads Manager", "GA4 Attribution", "Claude & AI", "SEO Systems"].map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-slate-200/90 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow-2xs"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5 animate-in fade-in duration-200">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 border border-purple-200/80 text-[#3A1494] shrink-0 shadow-xs">
                  <GraduationCap className="h-4.5 w-4.5" aria-hidden="true" />
                </div>
                <h4 className="text-base sm:text-lg font-bold tracking-tight text-slate-900">
                  {fitContent.heading}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {fitContent.description}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {fitContent.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-slate-200/90 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow-2xs"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
