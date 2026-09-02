import Link from "next/link";
import { heroContent } from "@/data/home";

export default function HeroActions() {
  return (
    <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
      <Link
        href={heroContent.primaryCta.href}
        className="inline-flex items-center justify-center rounded-xl bg-[#16213e] px-6 py-3.5 text-sm sm:text-base font-bold text-white shadow-xs transition-all hover:bg-slate-800 active:scale-[0.98]"
      >
        {heroContent.primaryCta.label}
      </Link>

      <Link
        href={heroContent.secondaryCta.href}
        className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-800 shadow-2xs transition-all hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98]"
      >
        {heroContent.secondaryCta.label}
      </Link>
    </div>
  );
}
