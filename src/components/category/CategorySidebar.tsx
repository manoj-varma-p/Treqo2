import { Mail, Phone } from "lucide-react";
import Button from "@/components/ui/Button";
import type { CourseSidebar } from "@/types/home";
import { cn } from "@/lib/utils";

interface CategorySidebarProps {
  sidebar: CourseSidebar;
  className?: string;
}

const rows: { key: keyof CourseSidebar; label: string }[] = [
  { key: "batchLabel", label: "Batch" },
  { key: "starts", label: "Starts" },
  { key: "format", label: "Format" },
  { key: "seats", label: "Seats" },
];

export default function CategorySidebar({ sidebar, className }: CategorySidebarProps) {
  return (
    <aside className={cn("lg:sticky lg:top-36 lg:self-start", className)}>
      <div className="overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-[0_20px_45px_-30px_rgba(20,18,31,0.35)]">
        <div className="bg-brand-primary px-5 py-3.5 text-center text-sm font-bold text-white">
          {sidebar.batchLabel.split("—")[0].trim()} details
        </div>

        <div className="flex flex-col gap-4 px-5 py-5">
          {rows.map((row) => (
            <div key={row.key}>
              <p className="text-[11px] font-semibold tracking-wide text-text-secondary uppercase">{row.label}</p>
              <p className="mt-0.5 text-sm font-bold text-text-primary">{sidebar[row.key]}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 px-5 pb-5">
          <Button href="/start-learning" fullWidth>
            {sidebar.applyLabel}
          </Button>
          <Button href="/start-learning" variant="secondary" fullWidth>
            {sidebar.downloadLabel}
          </Button>
        </div>

        <div className="border-t border-border-subtle px-5 py-5">
          <p className="text-[11px] font-semibold tracking-wide text-text-secondary uppercase">Not sure yet?</p>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">{sidebar.admissionsNote}</p>
          <div className="mt-3 flex flex-col gap-1.5 text-sm font-semibold text-text-primary">
            <a href={`tel:${sidebar.phone.replace(/\s+/g, "")}`} className="flex items-center gap-2 hover:text-brand-primary">
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              {sidebar.phone}
            </a>
            <a href={`mailto:${sidebar.email}`} className="flex items-center gap-2 hover:text-brand-primary">
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              {sidebar.email}
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
