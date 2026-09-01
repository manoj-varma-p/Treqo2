import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import { heroVisualCards } from "@/data/home";

export default function ProjectCard({ className }: { className?: string }) {
  const { project } = heroVisualCards;

  return (
    <div
      className={cn(
        "w-[196px] rounded-2xl border border-border-subtle bg-surface p-4 shadow-[0_20px_40px_-16px_rgba(20,18,31,0.28)] sm:w-[216px]",
        className
      )}
    >
      <p className="text-[11px] font-semibold text-brand-primary">{project.eyebrow}</p>
      <p className="mt-0.5 text-sm font-bold text-text-primary">{project.title}</p>
      <div className="mt-2.5 flex items-center gap-2">
        <div className="flex -space-x-2" aria-hidden="true">
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-surface bg-brand-secondary/30 text-brand-primary"
            >
              <User className="h-3 w-3" />
            </span>
          ))}
        </div>
        <span className="text-[11px] font-medium text-text-secondary">+{project.collaborators} more</span>
      </div>
    </div>
  );
}
