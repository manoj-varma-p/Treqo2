import { Atom, Braces, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { heroVisualCards } from "@/data/home";

const TECH_ICONS = [Code2, Atom, Braces];

export default function CurrentPathCard({ className }: { className?: string }) {
  const { currentPath } = heroVisualCards;

  return (
    <div
      className={cn(
        "w-42 rounded-2xl border border-border-subtle bg-surface p-4 shadow-[0_20px_40px_-16px_rgba(20,18,31,0.28)] sm:w-47.5 lg:w-53",
        className
      )}
    >
      <p className="text-[11px] font-semibold text-brand-primary">{currentPath.eyebrow}</p>
      <p className="mt-0.5 text-sm font-bold text-text-primary">{currentPath.title}</p>
      <div className="mt-2.5 h-1.5 w-full rounded-full bg-surface-alt">
        <div
          className="h-full rounded-full bg-brand-primary"
          style={{ width: `${currentPath.progressPercent}%` }}
        />
      </div>
      <p className="mt-1.5 text-[11px] text-text-secondary">{currentPath.progressLabel}</p>
      <div className="mt-2.5 flex gap-1.5" aria-hidden="true">
        {TECH_ICONS.map((Icon, index) => (
          <span
            key={index}
            className="flex h-6 w-6 items-center justify-center rounded-md bg-surface-alt text-brand-primary"
          >
            <Icon className="h-3.5 w-3.5" />
          </span>
        ))}
      </div>
    </div>
  );
}
