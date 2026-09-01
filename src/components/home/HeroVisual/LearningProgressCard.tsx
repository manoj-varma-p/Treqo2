import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { heroVisualCards } from "@/data/home";

const RADIUS = 34;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function LearningProgressCard({ className }: { className?: string }) {
  const { journey } = heroVisualCards;

  return (
    <div
      className={cn(
        "w-[148px] rounded-2xl border border-border-subtle bg-surface p-4 text-center shadow-[0_20px_40px_-16px_rgba(20,18,31,0.28)] sm:w-[166px]",
        className
      )}
    >
      <p className="text-[11px] font-semibold text-text-secondary">{journey.title}</p>
      <div className="relative mx-auto mt-2.5 h-[72px] w-[72px]">
        <svg viewBox="0 0 80 80" className="h-[72px] w-[72px] -rotate-90">
          <circle cx="40" cy="40" r={RADIUS} fill="none" stroke="var(--surface-alt)" strokeWidth="8" />
          <circle
            cx="40"
            cy="40"
            r={RADIUS}
            fill="none"
            stroke="var(--brand-primary)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - journey.percent / 100)}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-extrabold text-text-primary">
          {journey.percent}%
        </span>
      </div>
      <p className="mt-2 flex items-center justify-center gap-1 text-[11px] font-semibold text-brand-accent">
        <Flame className="h-3.5 w-3.5" aria-hidden="true" />
        {journey.note}
      </p>
    </div>
  );
}
