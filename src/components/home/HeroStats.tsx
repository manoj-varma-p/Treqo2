import { heroStats } from "@/data/home";
import { cn } from "@/lib/utils";

interface HeroStatsProps {
  className?: string;
}

export default function HeroStats({ className }: HeroStatsProps) {
  return (
    <div
      className={cn(
        "w-full max-w-[490px] overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all hover:border-[#3A1494]/30 hover:shadow-sm",
        className
      )}
    >
      <div className="grid grid-cols-3 divide-x divide-slate-200/80 py-3 sm:py-3.5">
        {heroStats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center px-2 py-0.5 text-center sm:px-3"
          >
            <span className="text-2xl sm:text-[1.65rem] font-black tracking-tight text-[#3A1494] leading-tight">
              {stat.value}
            </span>
            <span className="mt-1 text-[11px] sm:text-xs font-semibold leading-tight text-slate-500 text-balance">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
