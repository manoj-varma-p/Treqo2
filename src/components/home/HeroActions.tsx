"use client";

import Link from "next/link";
import { Video } from "lucide-react";
import { heroContent } from "@/data/home";

export default function HeroActions() {
  const handleOpenVideo = () => {
    window.dispatchEvent(new CustomEvent("open-treqo-video"));
  };

  return (
    <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
      <Link
        href={heroContent.primaryCta.href}
        className="inline-flex items-center justify-center rounded-xl bg-[#3A1494] px-6 py-3.5 text-sm sm:text-base font-bold text-white shadow-xs transition-all hover:bg-[#2c0e78] active:scale-[0.98]"
      >
        {heroContent.primaryCta.label}
      </Link>

      <Link
        href={heroContent.secondaryCta.href}
        className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-800 shadow-2xs transition-all hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98]"
      >
        {heroContent.secondaryCta.label}
      </Link>

      {/* Mobile-only inline trigger so mobile users can still watch the reel without any floating overlay */}
      <button
        type="button"
        onClick={handleOpenVideo}
        className="lg:hidden inline-flex items-center justify-center gap-2 rounded-xl border border-purple-200 bg-purple-50/90 px-4 py-3 text-xs sm:text-sm font-bold text-[#3A1494] shadow-2xs hover:bg-purple-100 transition-all cursor-pointer"
      >
        <Video size={15} className="text-[#3A1494]" />
        <span>Watch Video</span>
      </button>
    </div>
  );
}
