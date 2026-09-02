import { heroStats } from "@/data/home";

export default function HeroStats() {
  return (
    <div className="w-full rounded-2xl border border-slate-200/90 bg-white shadow-xs">
      <div className="grid grid-cols-2 divide-y divide-slate-100 sm:grid-cols-4 sm:divide-y-0 sm:divide-x sm:divide-slate-200/80 py-6 sm:py-7">
        {heroStats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center p-3 text-center sm:px-6"
          >
            <span className="text-3xl sm:text-4xl lg:text-[2.6rem] font-black tracking-tight text-[#16213e]">
              {stat.value}
            </span>
            <span className="mt-1 text-xs sm:text-sm font-medium text-slate-500">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
