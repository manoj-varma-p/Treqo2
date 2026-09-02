"use client";

import { useState } from "react";
import { Flame, Trophy, ShieldAlert, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProgramHeroCard() {
  const [activeTab, setActiveTab] = useState<"master" | "model">("master");

  return (
    <div className="relative flex w-full flex-col justify-between overflow-hidden rounded-2xl border border-border-subtle bg-gradient-to-br from-[#18093d] via-[#260f5c] to-[#10062b] p-4 sm:p-7 shadow-[0_20px_50px_-20px_rgba(24,9,61,0.6)] text-white">
      {/* Mesh / Grid Glow overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* Header: Badge & Status */}
      <div className="relative z-10 flex items-center justify-between gap-2 border-b border-white/10 pb-3 sm:pb-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase text-white/90 backdrop-blur-xs">
          <Flame className="h-3 w-3 text-amber-400" aria-hidden="true" />
          12-Phase Curriculum
        </span>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Batch 2 Enrolling
        </span>
      </div>

      {/* Dynamic Tab Switcher */}
      <div className="relative z-10 mt-4 flex rounded-xl bg-white/5 p-1 backdrop-blur-xs border border-white/10">
        <button
          type="button"
          onClick={() => setActiveTab("master")}
          className={cn(
            "flex-1 rounded-lg py-1.5 text-xs font-bold transition-all text-center select-none active:scale-95",
            activeTab === "master"
              ? "bg-brand-primary text-white shadow-xs"
              : "text-white/70 hover:text-white"
          )}
        >
          What You Master
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("model")}
          className={cn(
            "flex-1 rounded-lg py-1.5 text-xs font-bold transition-all text-center select-none active:scale-95",
            activeTab === "model"
              ? "bg-brand-primary text-white shadow-xs"
              : "text-white/70 hover:text-white"
          )}
        >
          Live Review Model
        </button>
      </div>

      {/* Center Tab Content */}
      <div className="relative z-10 my-4 sm:my-6 flex flex-col gap-2.5">
        {activeTab === "master" ? (
          <div className="flex flex-col gap-2 animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400/20 text-amber-300">
                <Trophy className="h-4 w-4" aria-hidden="true" />
              </div>
              <h4 className="text-base sm:text-lg font-black tracking-tight text-white">
                Learn By Deploying Real Budgets
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
              No multiple choice exams or theoretical essays. You run real ad accounts, set up tracking pipelines, and optimize actual acquisition funnels.
            </p>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {["Meta Ads Manager", "GA4 Attribution", "Claude & AI", "SEO Systems"].map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white/90"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/20 text-emerald-300">
                <ShieldAlert className="h-4 w-4" aria-hidden="true" />
              </div>
              <h4 className="text-base sm:text-lg font-black tracking-tight text-white">
                The CEO Challenge Defense
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
              Every phase concludes with a live review. If the campaign didn&apos;t hit target unit economics, you dissect why with mentors who run live P&Ls.
            </p>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {["Live Defense", "Real Unit Economics", "No Sliding Pass", "Portfolio Graded"].map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300 border border-emerald-400/30"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Dynamic Urgency / Cohort Fill Progress */}
      <div className="relative z-10 rounded-xl bg-white/5 p-3 border border-white/10">
        <div className="flex items-center justify-between text-[11px] font-semibold">
          <span className="text-white/80">Batch 2 Cohort Capacity</span>
          <span className="font-bold text-amber-300">4 Seats Remaining</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-brand-primary to-amber-400" />
        </div>
      </div>

      {/* Bottom 3 Quick Metrics */}
      <div className="relative z-10 mt-3 grid grid-cols-3 gap-2 border-t border-white/10 pt-3">
        <div className="rounded-lg bg-white/5 p-1.5 sm:p-2 text-center backdrop-blur-xs">
          <p className="text-sm sm:text-base font-black text-amber-300">12</p>
          <p className="text-[9px] sm:text-[10px] font-semibold text-white/70">Phases</p>
        </div>
        <div className="rounded-lg bg-white/5 p-1.5 sm:p-2 text-center backdrop-blur-xs">
          <p className="text-sm sm:text-base font-black text-emerald-300">30+</p>
          <p className="text-[9px] sm:text-[10px] font-semibold text-white/70">Campaigns</p>
        </div>
        <div className="rounded-lg bg-white/5 p-1.5 sm:p-2 text-center backdrop-blur-xs">
          <p className="text-sm sm:text-base font-black text-sky-300">100%</p>
          <p className="text-[9px] sm:text-[10px] font-semibold text-white/70">Practical</p>
        </div>
      </div>
    </div>
  );
}
