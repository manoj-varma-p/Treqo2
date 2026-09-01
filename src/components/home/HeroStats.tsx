import { heroStats } from "@/data/home";

export default function HeroStats() {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-border-subtle bg-surface/70 backdrop-blur-sm">
      <div className="grid min-w-140 grid-cols-4 divide-x divide-border-subtle sm:min-w-0">
        {heroStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="flex items-center gap-2.5 px-3 py-3.5 sm:gap-3 sm:px-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface-alt text-brand-primary sm:h-10 sm:w-10">
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
              </span>
              <div className="leading-tight">
                <p className="text-base font-extrabold text-text-primary sm:text-lg">{stat.value}</p>
                <p className="text-[10px] font-medium text-text-secondary sm:text-xs">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
