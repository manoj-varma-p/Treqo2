import { heroStats } from "@/data/home";
import { cn } from "@/lib/utils";

interface HeroStatsProps {
  className?: string;
}

export default function HeroStats({ className }: HeroStatsProps) {
  return (
    <div
      className={cn(
        "w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs",
        className
      )}
    >
      <div className="grid grid-cols-3 divide-x divide-slate-200/80 py-3.5 sm:py-4">
        {heroStats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center p-2 text-center sm:px-4"
          >
            <span className="text-2xl sm:text-[1.75rem] font-black tracking-tight text-[#3A1494] leading-tight">
              {stat.value}
            </span>
            <span className="mt-1 text-[11px] sm:text-xs font-medium leading-tight text-slate-500 max-w-[130px]">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
